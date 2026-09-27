import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const hits = new Map();

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function stripTags(value) {
  return String(value ?? "")
    .replace(/<[^>]*>/g, "")
    .trim();
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function clientIp(headers = {}) {
  const forwarded = headers["x-forwarded-for"] || headers["X-Forwarded-For"] || "";
  return String(forwarded).split(",")[0].trim() || "local";
}

export function rateLimit(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((time) => now - time < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) {
    hits.set(ip, recent);
    const error = new Error("Too many messages. Please try again later.");
    error.status = 429;
    throw error;
  }
  recent.push(now);
  hits.set(ip, recent);
}

export function validateContact(body = {}) {
  if (stripTags(body.website)) {
    return { ok: true, ignored: true };
  }

  const data = {
    name: stripTags(body.name).slice(0, 80),
    email: stripTags(body.email).slice(0, 120),
    subject: stripTags(body.subject).slice(0, 120),
    message: stripTags(body.message).slice(0, 2000),
  };

  const fields = {};
  if (data.name.length < 2) fields.name = "Please enter your name.";
  if (!EMAIL_PATTERN.test(data.email)) fields.email = "Enter a valid email address.";
  if (data.subject.length < 2) fields.subject = "Add a short subject.";
  if (data.message.length < 10) fields.message = "Message should be at least 10 characters.";

  if (Object.keys(fields).length) {
    return { ok: false, error: "Please check the form and try again.", fields };
  }

  return { ok: true, data };
}

function cleanEnv(value) {
  return String(value ?? "")
    .trim()
    .replace(/^['"]|['"]$/g, "")
    .replace(/^Bearer\s+/i, "");
}

function localEnv(name) {
  const filePath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../.env");
  let fromFile = "";
  if (fs.existsSync(filePath)) {
    const line = fs
      .readFileSync(filePath, "utf8")
      .split(/\r?\n/)
      .find((entry) => entry.trim().startsWith(`${name}=`));
    if (line) fromFile = line.slice(line.indexOf("=") + 1);
  }
  return cleanEnv(fromFile || process.env[name]);
}

export async function sendContactEmail(data) {
  const apiKey = localEnv("RESEND_API_KEY");
  const to = localEnv("CONTACT_EMAIL");
  const from = localEnv("FROM_EMAIL");

  if (!apiKey || !to || !from) {
    const error = new Error("Email service is not configured. Add RESEND_API_KEY, CONTACT_EMAIL, and FROM_EMAIL to .env, then restart the dev server.");
    error.status = 500;
    throw error;
  }

  const text = [
    "New portfolio contact",
    "",
    `From: ${data.name}`,
    `Email: ${data.email}`,
    `Subject: ${data.subject}`,
    "",
    "Message:",
    data.message,
  ].join("\n");

  const html = `
    <div style="font-family: Georgia, serif; color: #1c1916; line-height: 1.5;">
      <p style="font-size: 18px; margin: 0 0 16px;">New portfolio contact</p>
      <p style="margin: 0 0 8px;"><strong>From</strong><br>${escapeHtml(data.name)}</p>
      <p style="margin: 0 0 8px;"><strong>Email</strong><br>${escapeHtml(data.email)}</p>
      <p style="margin: 0 0 8px;"><strong>Subject</strong><br>${escapeHtml(data.subject)}</p>
      <p style="margin: 16px 0 8px;"><strong>Message</strong></p>
      <p style="white-space: pre-wrap; margin: 0;">${escapeHtml(data.message)}</p>
    </div>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: data.email,
      subject: `New portfolio contact — ${data.subject}`,
      text,
      html,
    }),
  });

  if (!response.ok) {
    await response.text();
    const invalidKey = response.status === 401 || response.status === 403;
    const error = new Error(
      invalidKey
        ? "Email is not set up yet. You can reach me directly by email."
        : "Email provider rejected the message.",
    );
    error.status = invalidKey ? 500 : 502;
    throw error;
  }
}
