import { clientIp, rateLimit, sendContactEmail, validateContact } from "../backend/contactCore.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  try {
    rateLimit(clientIp(req.headers));
    const result = validateContact(req.body || {});
    if (result.ignored) return res.status(200).json({ ok: true });
    if (!result.ok) return res.status(400).json({ ok: false, error: result.error, fields: result.fields });
    await sendContactEmail(result.data);
    return res.status(200).json({ ok: true });
  } catch (error) {
    const status = error.status || 500;
    const message =
      status === 429
        ? "Too many messages. Please try again later."
        : "Something went wrong. Please try again or email me directly.";
    return res.status(status).json({ ok: false, error: message });
  }
}
