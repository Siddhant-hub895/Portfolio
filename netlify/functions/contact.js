import { clientIp, rateLimit, sendContactEmail, validateContact } from "../../backend/contactCore.js";

export default async (request) => {
  if (request.method !== "POST") {
    return Response.json({ ok: false, error: "Method not allowed" }, { status: 405 });
  }

  try {
    const headers = Object.fromEntries(request.headers.entries());
    rateLimit(clientIp(headers));
    const body = await request.json().catch(() => ({}));
    const result = validateContact(body);
    if (result.ignored) return Response.json({ ok: true });
    if (!result.ok) {
      return Response.json({ ok: false, error: result.error, fields: result.fields }, { status: 400 });
    }
    await sendContactEmail(result.data);
    return Response.json({ ok: true });
  } catch (error) {
    const status = error.status || 500;
    const message =
      status === 429
        ? "Too many messages. Please try again later."
        : "Something went wrong. Please try again or email me directly.";
    return Response.json({ ok: false, error: message }, { status });
  }
};
