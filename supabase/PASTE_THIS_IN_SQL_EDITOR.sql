-- ============================================================
-- GraniteShield Lead Intelligence Engine v1
-- PASTE THIS ENTIRE BLOCK INTO SUPABASE SQL EDITOR AND HIT RUN
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- TABLE 1: leads_master
CREATE TABLE IF NOT EXISTS leads_master (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ghl_contact_id TEXT UNIQUE NOT NULL,
  full_name TEXT,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  email TEXT,
  source TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_content TEXT,
  utm_term TEXT,
  intent_score INTEGER DEFAULT 0,
  ai_classification TEXT DEFAULT 'UNSCORED',
  urgency_level TEXT DEFAULT 'normal',
  financing_probability NUMERIC(3,2) DEFAULT 0,
  project_type TEXT,
  roof_type TEXT,
  town TEXT,
  street_address TEXT,
  estimated_value NUMERIC(10,2),
  roof_squares NUMERIC(6,1),
  financing_needed BOOLEAN DEFAULT FALSE,
  financing_status TEXT,
  lead_status TEXT DEFAULT 'new',
  current_pipeline TEXT,
  current_stage TEXT,
  ghl_opportunity_id TEXT,
  response_time_seconds INTEGER,
  first_contact_at TIMESTAMPTZ,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_leads_ghl_contact ON leads_master(ghl_contact_id);
CREATE INDEX IF NOT EXISTS idx_leads_phone ON leads_master(phone);
CREATE INDEX IF NOT EXISTS idx_leads_classification ON leads_master(ai_classification);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads_master(lead_status);
CREATE INDEX IF NOT EXISTS idx_leads_created ON leads_master(created_at DESC);

-- TABLE 2: ai_decisions
CREATE TABLE IF NOT EXISTS ai_decisions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES leads_master(id) ON DELETE CASCADE,
  ghl_contact_id TEXT NOT NULL,
  decision_type TEXT NOT NULL,
  model_used TEXT DEFAULT 'gpt-4.1-mini',
  input_payload JSONB NOT NULL,
  ai_output JSONB NOT NULL,
  confidence_score NUMERIC(3,2),
  latency_ms INTEGER,
  outcome_correct BOOLEAN,
  outcome_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_decisions_lead ON ai_decisions(lead_id);
CREATE INDEX IF NOT EXISTS idx_decisions_contact ON ai_decisions(ghl_contact_id);
CREATE INDEX IF NOT EXISTS idx_decisions_type ON ai_decisions(decision_type);
CREATE INDEX IF NOT EXISTS idx_decisions_created ON ai_decisions(created_at DESC);

-- TABLE 3: conversation_memory
CREATE TABLE IF NOT EXISTS conversation_memory (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES leads_master(id) ON DELETE CASCADE,
  ghl_contact_id TEXT NOT NULL,
  direction TEXT NOT NULL,
  channel TEXT DEFAULT 'sms',
  message TEXT NOT NULL,
  ai_summary TEXT,
  sentiment_score NUMERIC(3,2),
  detected_intent TEXT,
  extracted_data JSONB,
  message_source TEXT,
  openphone_msg_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_convo_lead ON conversation_memory(lead_id);
CREATE INDEX IF NOT EXISTS idx_convo_contact ON conversation_memory(ghl_contact_id);
CREATE INDEX IF NOT EXISTS idx_convo_created ON conversation_memory(created_at DESC);

-- TABLE 4: receptionist_state
CREATE TABLE IF NOT EXISTS receptionist_state (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES leads_master(id) ON DELETE CASCADE,
  ghl_contact_id TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'awaiting_reply',
  current_step TEXT DEFAULT 'greeting',
  messages_sent INTEGER DEFAULT 0,
  messages_received INTEGER DEFAULT 0,
  service_needed TEXT,
  location_town TEXT,
  urgency TEXT,
  roof_type TEXT,
  preferred_time TEXT,
  additional_notes TEXT,
  last_message_sent_at TIMESTAMPTZ,
  last_message_recv_at TIMESTAMPTZ,
  escalated_at TIMESTAMPTZ,
  escalation_reason TEXT,
  human_takeover BOOLEAN DEFAULT FALSE,
  stop_requested BOOLEAN DEFAULT FALSE,
  conversation_summary TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_recep_contact ON receptionist_state(ghl_contact_id);
CREATE INDEX IF NOT EXISTS idx_recep_status ON receptionist_state(status);

-- TABLE 5: webhook_events
CREATE TABLE IF NOT EXISTS webhook_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id TEXT UNIQUE NOT NULL,
  action TEXT NOT NULL,
  priority TEXT NOT NULL,
  contact_id TEXT,
  opportunity_id TEXT,
  pipeline_id TEXT,
  stage_id TEXT,
  data JSONB,
  metadata JSONB,
  status TEXT DEFAULT 'pending',
  attempts INTEGER DEFAULT 0,
  last_error TEXT,
  processed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_events_event_id ON webhook_events(event_id);
CREATE INDEX IF NOT EXISTS idx_events_contact ON webhook_events(contact_id);
CREATE INDEX IF NOT EXISTS idx_events_status ON webhook_events(status);

-- TABLE 6: stage_changes
CREATE TABLE IF NOT EXISTS stage_changes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES leads_master(id) ON DELETE SET NULL,
  ghl_contact_id TEXT NOT NULL,
  ghl_opportunity_id TEXT,
  pipeline_name TEXT NOT NULL,
  from_stage TEXT,
  to_stage TEXT NOT NULL,
  intent_score_at_change INTEGER,
  classification_at_change TEXT,
  days_in_previous_stage INTEGER,
  triggered_by TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_stages_contact ON stage_changes(ghl_contact_id);
CREATE INDEX IF NOT EXISTS idx_stages_pipeline ON stage_changes(pipeline_name);
CREATE INDEX IF NOT EXISTS idx_stages_to ON stage_changes(to_stage);

-- AUTO-UPDATE TRIGGER FUNCTION
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- TRIGGERS
DROP TRIGGER IF EXISTS trg_leads_updated ON leads_master;
CREATE TRIGGER trg_leads_updated
  BEFORE UPDATE ON leads_master
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS trg_recep_updated ON receptionist_state;
CREATE TRIGGER trg_recep_updated
  BEFORE UPDATE ON receptionist_state
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS trg_events_updated ON webhook_events;
CREATE TRIGGER trg_events_updated
  BEFORE UPDATE ON webhook_events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ROW LEVEL SECURITY
ALTER TABLE leads_master ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_decisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversation_memory ENABLE ROW LEVEL SECURITY;
ALTER TABLE receptionist_state ENABLE ROW LEVEL SECURITY;
ALTER TABLE webhook_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE stage_changes ENABLE ROW LEVEL SECURITY;

-- Policies (service role bypasses RLS, these allow it explicitly)
DO $$ BEGIN
  DROP POLICY IF EXISTS "Service role full access leads" ON leads_master;
  CREATE POLICY "Service role full access leads" ON leads_master FOR ALL USING (true) WITH CHECK (true);
  DROP POLICY IF EXISTS "Service role full access decisions" ON ai_decisions;
  CREATE POLICY "Service role full access decisions" ON ai_decisions FOR ALL USING (true) WITH CHECK (true);
  DROP POLICY IF EXISTS "Service role full access convo" ON conversation_memory;
  CREATE POLICY "Service role full access convo" ON conversation_memory FOR ALL USING (true) WITH CHECK (true);
  DROP POLICY IF EXISTS "Service role full access recep" ON receptionist_state;
  CREATE POLICY "Service role full access recep" ON receptionist_state FOR ALL USING (true) WITH CHECK (true);
  DROP POLICY IF EXISTS "Service role full access events" ON webhook_events;
  CREATE POLICY "Service role full access events" ON webhook_events FOR ALL USING (true) WITH CHECK (true);
  DROP POLICY IF EXISTS "Service role full access stages" ON stage_changes;
  CREATE POLICY "Service role full access stages" ON stage_changes FOR ALL USING (true) WITH CHECK (true);
END $$;

-- VIEWS
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
