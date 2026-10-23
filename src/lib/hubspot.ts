import { LeadPayload } from "./types";

interface HubspotResult {
  success: boolean;
  method: string;
  error?: string;
  data?: unknown;
}

/**
 * Split a single full name string into First Name and Last Name for HubSpot.
 */
function splitName(fullName: string): { firstName: string; lastName: string } {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) {
    return { firstName: parts[0], lastName: "" };
  }
  const firstName = parts[0];
  const lastName = parts.slice(1).join(" ");
  return { firstName, lastName };
}

/**
 * Pushes lead data to HubSpot using available credentials:
 * 1. Private App Access Token (CRM Contacts API v3)
 * 2. Forms API v3 (Portal ID + Form ID)
 * 3. Custom HubSpot Webhook URL
 */
export async function pushToHubspot(lead: LeadPayload): Promise<HubspotResult> {
  const accessToken = process.env.HUBSPOT_ACCESS_TOKEN;
  const portalId =
    process.env.HUBSPOT_PORTAL_ID ||
    process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID;
  const formId =
    process.env.HUBSPOT_FORM_ID ||
    process.env.NEXT_PUBLIC_HUBSPOT_FORM_ID;
  const region = process.env.HUBSPOT_REGION;
  const webhookUrl = process.env.HUBSPOT_WEBHOOK_URL;

  const { firstName, lastName } = splitName(lead.name);
  const focusAreas = Array.isArray(lead.focus) ? lead.focus.join(", ") : String(lead.focus || "");
  const noteContent = `Source: ${lead.source || "Beacon AI Form"}\nFocus Areas: ${focusAreas}\nCurrent Systems: ${lead.systems || "None specified"}\nTeam Size: ${lead.size}\nSubmitted: ${lead.submittedAt || new Date().toISOString()}`;

  // Method 1: HubSpot CRM Contacts API v3 (Recommended if private token provided)
  if (accessToken) {
    try {
      const response = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          properties: {
            email: lead.email,
            firstname: firstName,
            lastname: lastName,
            phone: lead.phone,
            company: lead.company,
            jobtitle: lead.role,
            numemployees: lead.size,
            message: noteContent,
          },
        }),
      });

      const data = await response.json().catch(() => ({}));

      // If contact already exists (409 Conflict), update the existing contact
      if (response.status === 409 && data?.message) {
        const idMatch = data.message.match(/Existing ID: (\d+)/i);
        if (idMatch && idMatch[1]) {
          const existingId = idMatch[1];
          const updateRes = await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/${existingId}`, {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              properties: {
                phone: lead.phone,
                company: lead.company,
                jobtitle: lead.role,
                numemployees: lead.size,
                message: noteContent,
              },
            }),
          });
          if (updateRes.ok) {
            return {
              success: true,
              method: "CRM_API_V3_UPDATED",
              data: { updatedContactId: existingId },
            };
          }
        }
      }

      if (!response.ok) {
        const errMsg = data?.message || `HubSpot CRM API error: ${response.statusText}`;
        console.error("[HubSpot CRM API Error]:", data);
        return { success: false, method: "CRM_API_V3", error: errMsg };
      }

      return { success: true, method: "CRM_API_V3", data };
    } catch (err: unknown) {
      const errorStr = err instanceof Error ? err.message : String(err);
      console.error("[HubSpot CRM API Exception]:", errorStr);
      return { success: false, method: "CRM_API_V3", error: errorStr };
    }
  }

  // Method 2: HubSpot Forms API v3 (Submissions API - Portal + Form ID)
  if (portalId && formId) {
    try {
      const host = region === "eu1" ? "api-eu1.hsforms.com" : "api.hsforms.com";
      const url = `https://${host}/submissions/v3/integration/submit/${portalId}/${formId}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: [
            { objectTypeId: "0-1", name: "firstname", value: firstName },
            { objectTypeId: "0-1", name: "lastname", value: lastName },
            { objectTypeId: "0-1", name: "email", value: lead.email },
            { objectTypeId: "0-1", name: "phone", value: lead.phone },
            { objectTypeId: "0-1", name: "company", value: lead.company },
            { objectTypeId: "0-1", name: "jobtitle", value: lead.role },
            { objectTypeId: "0-1", name: "numemployees", value: lead.size },
            { objectTypeId: "0-1", name: "message", value: noteContent },
          ],
          context: {
            pageUri: "https://beacon.ai",
            pageName: `Beacon AI - ${lead.source || "Website Form"}`,
          },
        }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        const errMsg = data?.message || `HubSpot Forms API error: ${response.statusText}`;
        console.error("[HubSpot Forms API Error]:", data);
        return { success: false, method: "FORMS_API_V3", error: errMsg };
      }

      return { success: true, method: "FORMS_API_V3", data };
    } catch (err: unknown) {
      const errorStr = err instanceof Error ? err.message : String(err);
      console.error("[HubSpot Forms API Exception]:", errorStr);
      return { success: false, method: "FORMS_API_V3", error: errorStr };
    }
  }

  // Method 3: Custom Webhook URL
  if (webhookUrl) {
    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
      if (!response.ok) {
        return {
          success: false,
          method: "WEBHOOK",
          error: `Webhook returned status ${response.status}`,
        };
      }
      return { success: true, method: "WEBHOOK" };
    } catch (err: unknown) {
      const errorStr = err instanceof Error ? err.message : String(err);
      console.error("[HubSpot Webhook Exception]:", errorStr);
      return { success: false, method: "WEBHOOK", error: errorStr };
    }
  }

  // Development / Mock mode warning when credentials aren't set yet
  console.warn(
    "[HubSpot Notice] No HubSpot credentials (HUBSPOT_ACCESS_TOKEN or HUBSPOT_PORTAL_ID + HUBSPOT_FORM_ID) found in environment variables. Lead logged locally:",
    {
      name: lead.name,
      email: lead.email,
      company: lead.company,
      phone: lead.phone,
    }
  );

  return {
    success: true,
    method: "DEV_MOCK",
    error: "No HubSpot credentials configured. Logged to console.",
  };
}
