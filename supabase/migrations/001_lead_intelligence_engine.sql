-- ============================================================================
-- GraniteShield Lead Intelligence Engine v1
-- Migration 001: Core Schema
-- 
-- TABLES:
--   leads_master        — Single source of truth for every lead
--   ai_decisions         — Every AI scoring/classification decision logged
--   conversation_memory  — Full SMS conversation history with AI summaries
--   receptionist_state   — AI Receptionist session state machine
--   webhook_events       — Outbox event audit trail
--   stage_changes        — Feedback loop: every GHL stage change recorded
--
-- DESIGN PRINCIPLES:
--   - Supabase is the BRAIN (stores all intelligence)
--   - OpenAI is the REASONING LAYER (scores, classifies, generates)
--   - GHL is the ACTUATOR (sends SMS, moves stages, creates tasks)
--   - Every decision is logged for model improvement
--   - Idempotent: safe to re-run
-- ============================================================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- TABLE 1: leads_master
-- Single source of truth for every lead that enters the system.
-- Synced from GHL but enriched with AI-generated intelligence.
-- ============================================================================
CREATE TABLE IF NOT EXISTS leads_master (
  id                      UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ghl_contact_id          TEXT UNIQUE NOT NULL,
  full_name               TEXT,
  first_name              TEXT,
  last_name               TEXT,
  phone                   TEXT,
  email                   TEXT,
  source                  TEXT,                -- meta_ads, google_ads, organic, referral, direct
  utm_source              TEXT,
  utm_medium              TEXT,
  utm_campaign            TEXT,
  utm_content             TEXT,
  utm_term                TEXT,
  
  -- AI-generated intelligence
  intent_score            INTEGER DEFAULT 0,   -- 1-100
  ai_classification       TEXT DEFAULT 'UNSCORED', -- HOT / WARM / COLD / UNSCORED
  urgency_level           TEXT DEFAULT 'normal',   -- emergency / urgent / normal / low
  financing_probability   NUMERIC(3,2) DEFAULT 0,  -- 0.00 to 1.00
  
  -- Project details
  project_type            TEXT,                -- repair, ice_dam, replacement, siding, metal
  roof_type               TEXT,                -- shingle, metal, flat, tile
  town                    TEXT,
  street_address          TEXT,
  estimated_value         NUMERIC(10,2),
  roof_squares            NUMERIC(6,1),
  
  -- Financing
  financing_needed        BOOLEAN DEFAULT FALSE,
  financing_status        TEXT,                -- none, interested, applied, approved, declined
  
  -- Pipeline tracking
  lead_status             TEXT DEFAULT 'new',  -- new, contacted, qualified, scheduled, quoted, won, lost
  current_pipeline        TEXT,                -- sales, production, billing
  current_stage           TEXT,                -- maps to GHL stage name
  ghl_opportunity_id      TEXT,
  
  -- Speed metrics
  response_time_seconds   INTEGER,             -- time from lead creation to first SMS
  first_contact_at        TIMESTAMPTZ,
  
  -- Tags synced from GHL
  tags                    TEXT[] DEFAULT '{}',
  
  -- Timestamps
  created_at              TIMESTAMPTZ DEFAULT NOW(),
  updated_at              TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for fast lookups
CREATE INDEX IF NOT EXISTS idx_leads_ghl_contact ON leads_master(ghl_contact_id);
CREATE INDEX IF NOT EXISTS idx_leads_phone ON leads_master(phone);
CREATE INDEX IF NOT EXISTS idx_leads_classification ON leads_master(ai_classification);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads_master(lead_status);
CREATE INDEX IF NOT EXISTS idx_leads_created ON leads_master(created_at DESC);

-- ============================================================================
-- TABLE 2: ai_decisions
-- Every AI scoring, classification, or generation decision is logged here.
-- This is the training data for future model improvements.
-- ============================================================================
CREATE TABLE IF NOT EXISTS ai_decisions (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id           UUID REFERENCES leads_master(id) ON DELETE CASCADE,
  ghl_contact_id    TEXT NOT NULL,
  
  decision_type     TEXT NOT NULL,        -- lead_score, intent_classify, sms_generate, escalation, tag_recommend
  model_used        TEXT DEFAULT 'gpt-4.1-mini',
  
  input_payload     JSONB NOT NULL,       -- what was sent to OpenAI
  ai_output         JSONB NOT NULL,       -- what OpenAI returned
  
  confidence_score  NUMERIC(3,2),         -- 0.00 to 1.00
  latency_ms        INTEGER,              -- how long the AI call took
  
  -- Feedback loop (filled in later when outcome is known)
  outcome_correct   BOOLEAN,              -- was the AI decision correct?
  outcome_notes     TEXT,                 -- human notes on decision quality
  
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_decisions_lead ON ai_decisions(lead_id);
CREATE INDEX IF NOT EXISTS idx_decisions_contact ON ai_decisions(ghl_contact_id);
CREATE INDEX IF NOT EXISTS idx_decisions_type ON ai_decisions(decision_type);
CREATE INDEX IF NOT EXISTS idx_decisions_created ON ai_decisions(created_at DESC);

-- ============================================================================
-- TABLE 3: conversation_memory
-- Full SMS conversation history. Every inbound and outbound message logged.
-- AI summaries generated after each exchange for context window efficiency.
-- ============================================================================
CREATE TABLE IF NOT EXISTS conversation_memory (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id           UUID REFERENCES leads_master(id) ON DELETE CASCADE,
  ghl_contact_id    TEXT NOT NULL,
  
  direction         TEXT NOT NULL,         -- inbound / outbound
  channel           TEXT DEFAULT 'sms',    -- sms, email, call, chat
  message           TEXT NOT NULL,
  
  -- AI analysis of this message
  ai_summary        TEXT,                  -- one-line summary
  sentiment_score   NUMERIC(3,2),          -- -1.00 (angry) to 1.00 (happy)
  detected_intent   TEXT,                  -- question, objection, ready_to_book, emergency, stop
  extracted_data    JSONB,                 -- structured data pulled from message (town, timeline, etc.)
  
  -- Metadata
  message_source    TEXT,                  -- ai_receptionist, human, ghl_workflow
  openphone_msg_id  TEXT,
  
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_convo_lead ON conversation_memory(lead_id);
CREATE INDEX IF NOT EXISTS idx_convo_contact ON conversation_memory(ghl_contact_id);
CREATE INDEX IF NOT EXISTS idx_convo_created ON conversation_memory(created_at DESC);

-- ============================================================================
-- TABLE 4: receptionist_state
-- AI Receptionist session state machine. Tracks where each lead is in the
-- qualification flow, enforces guardrails, and prevents duplicate messages.
-- ============================================================================
CREATE TABLE IF NOT EXISTS receptionist_state (
  id                    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id               UUID REFERENCES leads_master(id) ON DELETE CASCADE,
  ghl_contact_id        TEXT UNIQUE NOT NULL,
  
  -- Conversation flow state
  status                TEXT DEFAULT 'awaiting_reply',  -- awaiting_reply, in_progress, scheduled, escalated, completed, stopped, stale
  current_step          TEXT DEFAULT 'greeting',        -- greeting, needs_assessment, location, timeline, roof_type, booking, confirmation
  messages_sent         INTEGER DEFAULT 0,              -- total AI messages sent (guardrail: max 6)
  messages_received     INTEGER DEFAULT 0,
  
  -- Collected qualification data
  service_needed        TEXT,               -- repair, ice_dam, replacement, siding, metal
  location_town         TEXT,
  urgency               TEXT,               -- emergency, this_week, this_month, just_looking
  roof_type             TEXT,               -- shingle, metal, flat
  preferred_time        TEXT,               -- morning, afternoon, flexible
  additional_notes      TEXT,
  
  -- Guardrails
  last_message_sent_at  TIMESTAMPTZ,        -- rate limit: 1 msg per minute
  last_message_recv_at  TIMESTAMPTZ,
  escalated_at          TIMESTAMPTZ,
  escalation_reason     TEXT,
  human_takeover        BOOLEAN DEFAULT FALSE,
  stop_requested        BOOLEAN DEFAULT FALSE,
  
  -- Conversation summary (compressed context for OpenAI)
  conversation_summary  TEXT,               -- rolling AI summary of full conversation
  
  created_at            TIMESTAMPTZ DEFAULT NOW(),
  updated_at            TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_recep_contact ON receptionist_state(ghl_contact_id);
CREATE INDEX IF NOT EXISTS idx_recep_status ON receptionist_state(status);

-- ============================================================================
-- TABLE 5: webhook_events (Outbox Audit Trail)
-- Every webhook event processed by the automation system.
-- ============================================================================
CREATE TABLE IF NOT EXISTS webhook_events (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id        TEXT UNIQUE NOT NULL,
  action          TEXT NOT NULL,
  priority        TEXT NOT NULL,
  contact_id      TEXT,
  opportunity_id  TEXT,
  pipeline_id     TEXT,
  stage_id        TEXT,
  data            JSONB,
  metadata        JSONB,
  status          TEXT DEFAULT 'pending',  -- pending, processing, completed, failed, dead_letter
  attempts        INTEGER DEFAULT 0,
  last_error      TEXT,
  processed_at    TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_events_event_id ON webhook_events(event_id);
CREATE INDEX IF NOT EXISTS idx_events_contact ON webhook_events(contact_id);
CREATE INDEX IF NOT EXISTS idx_events_status ON webhook_events(status);

-- ============================================================================
-- TABLE 6: stage_changes (Feedback Loop)
-- Every GHL pipeline stage change is recorded here.
-- This feeds back into AI scoring to learn what actually converts.
-- ============================================================================
CREATE TABLE IF NOT EXISTS stage_changes (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id           UUID REFERENCES leads_master(id) ON DELETE SET NULL,
  ghl_contact_id    TEXT NOT NULL,
  ghl_opportunity_id TEXT,
  
  pipeline_name     TEXT NOT NULL,         -- Sales, Production, Billing
  from_stage        TEXT,
  to_stage          TEXT NOT NULL,
  
  -- Context at time of change
  intent_score_at_change  INTEGER,
  classification_at_change TEXT,
  days_in_previous_stage  INTEGER,
  
  -- Who/what triggered the change
  triggered_by      TEXT,                  -- automation, human, ai_receptionist
  
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_stages_contact ON stage_changes(ghl_contact_id);
CREATE INDEX IF NOT EXISTS idx_stages_pipeline ON stage_changes(pipeline_name);
CREATE INDEX IF NOT EXISTS idx_stages_to ON stage_changes(to_stage);

-- ============================================================================
-- AUTO-UPDATE TRIGGERS
-- ============================================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_leads_updated
  BEFORE UPDATE ON leads_master
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_recep_updated
  BEFORE UPDATE ON receptionist_state
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_events_updated
  BEFORE UPDATE ON webhook_events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- Service role key bypasses RLS. Anon key gets nothing.
-- ============================================================================
ALTER TABLE leads_master ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_decisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversation_memory ENABLE ROW LEVEL SECURITY;
ALTER TABLE receptionist_state ENABLE ROW LEVEL SECURITY;
ALTER TABLE webhook_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE stage_changes ENABLE ROW LEVEL SECURITY;

-- Service role can do everything (our backend uses service role key)
CREATE POLICY "Service role full access" ON leads_master FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON ai_decisions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON conversation_memory FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON receptionist_state FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON webhook_events FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON stage_changes FOR ALL USING (true) WITH CHECK (true);

-- ============================================================================
-- VIEWS (for quick dashboards)
-- ============================================================================

-- Active receptionist sessions
CREATE OR REPLACE VIEW v_active_sessions AS
SELECT 
  rs.ghl_contact_id,
  lm.full_name,
  lm.phone,
  rs.status,
  rs.current_step,
  rs.messages_sent,
  rs.service_needed,
  rs.location_town,
  lm.ai_classification,
  lm.intent_score,
  rs.updated_at
FROM receptionist_state rs
JOIN leads_master lm ON rs.lead_id = lm.id
WHERE rs.status IN ('awaiting_reply', 'in_progress')
ORDER BY rs.updated_at DESC;

-- AI decision accuracy (for model tuning)
CREATE OR REPLACE VIEW v_ai_accuracy AS
SELECT 
  decision_type,
  COUNT(*) as total_decisions,
  COUNT(outcome_correct) as reviewed,
  SUM(CASE WHEN outcome_correct = true THEN 1 ELSE 0 END) as correct,
  ROUND(AVG(confidence_score)::numeric, 2) as avg_confidence,
  ROUND(AVG(latency_ms)::numeric, 0) as avg_latency_ms
FROM ai_decisions
GROUP BY decision_type;

-- Lead conversion funnel
CREATE OR REPLACE VIEW v_conversion_funnel AS
SELECT 
  ai_classification,
  lead_status,
  COUNT(*) as count,
  ROUND(AVG(intent_score)::numeric, 0) as avg_score,
  ROUND(AVG(response_time_seconds)::numeric, 0) as avg_response_time
FROM leads_master
GROUP BY ai_classification, lead_status
ORDER BY ai_classification, lead_status;
