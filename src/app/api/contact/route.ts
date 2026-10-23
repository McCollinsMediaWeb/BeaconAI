import { NextResponse } from "next/server";
import { LeadPayload, SubmissionResponse } from "@/lib/types";
import { pushToHubspot } from "@/lib/hubspot";
import { sendLeadNotificationEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, message: "Invalid request payload." },
        { status: 400 }
      );
    }

    const {
      name,
      email,
      phone,
      company,
      role,
      size,
      focus,
      systems,
      source,
    } = body;

    // Field validations
    const errors: Record<string, string> = {};
    if (!name || typeof name !== "string" || !name.trim()) {
      errors.name = "Full name is required.";
    }
    if (
      !email ||
      typeof email !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())
    ) {
      errors.email = "A valid work email is required.";
    }
    if (!phone || typeof phone !== "string" || phone.replace(/[^\d]/g, "").length < 8) {
      errors.phone = "A valid phone number is required.";
    }
    if (!company || typeof company !== "string" || !company.trim()) {
      errors.company = "Company name is required.";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill in all required fields accurately.",
          errors,
        },
        { status: 400 }
      );
    }

    const lead: LeadPayload = {
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      phone: String(phone).trim(),
      company: String(company).trim(),
      role: role ? String(role).trim() : "",
      size: size ? String(size).trim() : "",
      focus: Array.isArray(focus) ? focus : [],
      systems: systems ? String(systems).trim() : "",
      source: source ? String(source).trim() : "Beacon AI Form",
      submittedAt: new Date().toISOString(),
    };

    // Execute HubSpot submission and Email notification concurrently
    const [hubspotResult, emailResult] = await Promise.allSettled([
      pushToHubspot(lead),
      sendLeadNotificationEmail(lead),
    ]);

    const hubspotData =
      hubspotResult.status === "fulfilled"
        ? hubspotResult.value
        : {
            success: false,
            method: "UNKNOWN",
            error:
              hubspotResult.reason instanceof Error
                ? hubspotResult.reason.message
                : String(hubspotResult.reason),
          };

    const emailData =
      emailResult.status === "fulfilled"
        ? emailResult.value
        : {
            success: false,
            method: "UNKNOWN",
            recipient: process.env.LEAD_NOTIFICATION_EMAIL || "not-configured",
            error:
              emailResult.reason instanceof Error
                ? emailResult.reason.message
                : String(emailResult.reason),
          };

    const responsePayload: SubmissionResponse = {
      success: true,
      message: "Your audit call request has been received.",
      hubspot: {
        success: hubspotData.success,
        method: hubspotData.method,
        error: hubspotData.error,
      },
      email: {
        success: emailData.success,
        recipient: emailData.recipient,
        method: emailData.method,
        error: emailData.error,
      },
    };

    console.log("[POST /api/contact Result]:", {
      hubspot: hubspotData,
      email: emailData,
    });

    return NextResponse.json(responsePayload, { status: 200 });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error("[POST /api/contact Error]:", errorMsg);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred while processing your request.",
        error: errorMsg,
      },
      { status: 500 }
    );
  }
}
