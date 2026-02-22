/**
 * GHL Action Executor
 * 
 * Executes actions on GoHighLevel based on AI decisions.
 * Supabase decides → this module actuates.
 * 
 * CAPABILITIES:
 * - Add/remove tags on contacts
 * - Update pipeline stage
 * - Create tasks assigned to Justin
 * - Send SMS via GHL Conversations API
 * - Update contact custom fields
 */

const GHL_API_KEY = process.env.GHL_API_KEY || '';
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID || 'WN9muDg6rCcc3qk631Hz';
const GHL_BASE = 'https://services.leadconnectorhq.com';
const GHL_VERSION = '2021-07-28';

// Pipeline & Stage IDs
const PIPELINE_IDS = {
  sales: 'c9lGKfy5zm44dKNx0UOE',
  production: 'TpIiibuvqy8ZTzetykrk',
  billing: 'BJcnnQhs6UTNfnYPGPCC',
} as const;

const SALES_STAGE_IDS: Record<string, string> = {
  'New Lead': '129ded03-c562-4ca2-b0a2-12ce2ed57dd0',
  'Contacted': 'e77a9d6b-3af9-4a30-80d6-0b2f01dac060',
  'Qualified': '6aa3addb-adba-47f4-957f-e71e6a41a8a2',
  'Inspection Scheduled': 'b63b1e82-a5eb-425d-929a-145fbec1c2d5',
  'Inspection Completed': '6279fd5a-b6f4-4617-878a-830864f3d224',
  'Quoted': 'f99cdc09-b86d-4568-8361-22c00bc1bdad',
  'Financing': 'cb1d8fef-0248-4f4f-8a7a-ad9abc289602',
  'Won': 'ee857fc3-86c1-4d73-8261-3c5acb80a145',
  'Lost': 'f8398884-2586-47d8-81a9-19f69fb357eb',
};

// ============================================================================
// HEADERS
// ============================================================================

function ghlHeaders(): Record<string, string> {
  return {
    'Authorization': `Bearer ${GHL_API_KEY}`,
    'Version': GHL_VERSION,
    'Content-Type': 'application/json',
  };
}

// ============================================================================
// ADD TAGS
// ============================================================================

export async function addTagsToContact(
  contactId: string,
  tags: string[]
): Promise<{ success: boolean; error?: string }> {
  if (!tags.length) return { success: true };

  try {
    // First get existing tags
    const getResp = await fetch(`${GHL_BASE}/contacts/${contactId}`, {
      headers: ghlHeaders(),
    });

    if (!getResp.ok) {
      return { success: false, error: `Failed to get contact: ${getResp.status}` };
    }

    const contactData = await getResp.json();
    const existingTags: string[] = contactData.contact?.tags || [];
    const mergedTags = Array.from(new Set([...existingTags, ...tags]));

    // Update with merged tags
    const resp = await fetch(`${GHL_BASE}/contacts/${contactId}`, {
      method: 'PUT',
      headers: ghlHeaders(),
      body: JSON.stringify({ tags: mergedTags }),
    });

    if (!resp.ok) {
      const body = await resp.text();
      return { success: false, error: `Tag update failed: ${resp.status} ${body}` };
    }

    console.log(`[GHL] Added tags [${tags.join(', ')}] to contact ${contactId}`);
    return { success: true };
  } catch (err: any) {
    return { success: false, error: `Tag update error: ${err.message}` };
  }
}

// ============================================================================
// UPDATE PIPELINE STAGE
// ============================================================================

export async function updateOpportunityStage(
  opportunityId: string,
  stageName: string,
  pipelineKey: keyof typeof PIPELINE_IDS = 'sales'
): Promise<{ success: boolean; error?: string }> {
  const stageId = SALES_STAGE_IDS[stageName];
  if (!stageId) {
    return { success: false, error: `Unknown stage name: ${stageName}` };
  }

  try {
    const resp = await fetch(`${GHL_BASE}/opportunities/${opportunityId}`, {
      method: 'PUT',
      headers: ghlHeaders(),
      body: JSON.stringify({
        stageId,
        pipelineId: PIPELINE_IDS[pipelineKey],
      }),
    });

    if (!resp.ok) {
      const body = await resp.text();
      return { success: false, error: `Stage update failed: ${resp.status} ${body}` };
    }

    console.log(`[GHL] Moved opportunity ${opportunityId} to stage "${stageName}"`);
    return { success: true };
  } catch (err: any) {
    return { success: false, error: `Stage update error: ${err.message}` };
  }
}

// ============================================================================
// CREATE TASK
// ============================================================================

export async function createTask(
  contactId: string,
  title: string,
  description: string,
  dueInMinutes: number = 15
): Promise<{ success: boolean; taskId?: string; error?: string }> {
  const dueDate = new Date(Date.now() + dueInMinutes * 60 * 1000).toISOString();

  try {
    const resp = await fetch(`${GHL_BASE}/contacts/${contactId}/tasks`, {
      method: 'POST',
      headers: ghlHeaders(),
      body: JSON.stringify({
        title,
        body: description,
        dueDate,
        completed: false,
        assignedTo: GHL_LOCATION_ID, // Assigned to location (Justin)
      }),
    });

    if (!resp.ok) {
      const body = await resp.text();
      return { success: false, error: `Task creation failed: ${resp.status} ${body}` };
    }

    const result = await resp.json();
    console.log(`[GHL] Created task "${title}" for contact ${contactId}, due in ${dueInMinutes}min`);
    return { success: true, taskId: result.task?.id };
  } catch (err: any) {
    return { success: false, error: `Task creation error: ${err.message}` };
  }
}

// ============================================================================
// SEND SMS VIA GHL CONVERSATIONS
// ============================================================================

export async function sendSmsViaGhl(
  contactId: string,
  message: string
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const resp = await fetch(`${GHL_BASE}/conversations/messages`, {
      method: 'POST',
      headers: ghlHeaders(),
      body: JSON.stringify({
        type: 'SMS',
        contactId,
        message,
      }),
    });

    if (!resp.ok) {
      const body = await resp.text();
      return { success: false, error: `GHL SMS failed: ${resp.status} ${body}` };
    }

    const result = await resp.json();
    console.log(`[GHL] Sent SMS to contact ${contactId}: "${message.substring(0, 50)}..."`);
    return { success: true, messageId: result.messageId || result.id };
  } catch (err: any) {
    return { success: false, error: `GHL SMS error: ${err.message}` };
  }
}

// ============================================================================
// GET CONTACT BY ID
// ============================================================================

export async function getContact(
  contactId: string
): Promise<{ success: boolean; contact?: any; error?: string }> {
  try {
    const resp = await fetch(`${GHL_BASE}/contacts/${contactId}`, {
      headers: ghlHeaders(),
    });

    if (!resp.ok) {
      return { success: false, error: `Get contact failed: ${resp.status}` };
    }

    const data = await resp.json();
    return { success: true, contact: data.contact };
  } catch (err: any) {
    return { success: false, error: `Get contact error: ${err.message}` };
  }
}

// ============================================================================
// SEARCH CONTACT BY PHONE
// ============================================================================

export async function searchContactByPhone(
  phone: string
): Promise<{ success: boolean; contactId?: string; contact?: any; error?: string }> {
  try {
    const resp = await fetch(
      `${GHL_BASE}/contacts/search/duplicate?locationId=${GHL_LOCATION_ID}&number=${encodeURIComponent(phone)}`,
      { headers: ghlHeaders() }
    );

    if (!resp.ok) {
      return { success: false, error: `Search failed: ${resp.status}` };
    }

    const data = await resp.json();
    const contact = data.contact;
    if (contact) {
      return { success: true, contactId: contact.id, contact };
    }
    return { success: false, error: 'Contact not found' };
  } catch (err: any) {
    return { success: false, error: `Search error: ${err.message}` };
  }
}

// ============================================================================
// SEND INTERNAL NOTIFICATION SMS TO JUSTIN
// ============================================================================

const JUSTIN_PHONE = '2077303467'; // Justin's phone

export async function notifyJustin(
  message: string
): Promise<{ success: boolean; error?: string }> {
  // Use OpenPhone to send internal notification
  const OPENPHONE_API_KEY = process.env.OPENPHONE_API_KEY || '';
  const OPENPHONE_PHONE_NUMBER_ID = process.env.OPENPHONE_PHONE_NUMBER_ID || 'PN2tbRauxF';

  if (!OPENPHONE_API_KEY) {
    console.warn('[GHL] OpenPhone not configured for internal notifications');
    return { success: false, error: 'OpenPhone not configured' };
  }

  try {
    const resp = await fetch('https://api.openphone.com/v1/messages', {
      method: 'POST',
      headers: {
        'Authorization': OPENPHONE_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: message,
        to: [`+1${JUSTIN_PHONE}`],
        from: OPENPHONE_PHONE_NUMBER_ID,
      }),
    });

    if (!resp.ok) {
      const body = await resp.text();
      return { success: false, error: `Notification failed: ${resp.status} ${body}` };
    }

    console.log(`[GHL] Internal notification sent to Justin`);
    return { success: true };
  } catch (err: any) {
    return { success: false, error: `Notification error: ${err.message}` };
  }
}

// ============================================================================
// EXPORTS
// ============================================================================

export { PIPELINE_IDS, SALES_STAGE_IDS };
