import "server-only";

type EmailPayload = {
  subject: string;
  text: string;
  html?: string;
};

export async function sendAdminEmail(payload: EmailPayload) {
  const receiver = process.env.CONTACT_RECEIVER_EMAIL || "ddc.democratie@gmail.com";
  const provider = (process.env.EMAIL_PROVIDER || "").toLowerCase();

  if (provider === "resend") {
    const apiKey = process.env.EMAIL_API_KEY;
    const from = process.env.EMAIL_FROM;

    if (!apiKey || !from) {
      return { ok: false, skipped: true, reason: "Resend non configuré" };
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from,
        to: [receiver],
        subject: payload.subject,
        text: payload.text,
        html: payload.html
      })
    });

    if (!response.ok) {
      return { ok: false, skipped: false, reason: await response.text() };
    }

    return { ok: true, skipped: false };
  }

  return { ok: false, skipped: true, reason: "Aucun provider email configuré" };
}
