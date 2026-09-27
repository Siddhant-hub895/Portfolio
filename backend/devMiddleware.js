import { clientIp, rateLimit, sendContactEmail, validateContact } from "./contactCore.js";

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => {
      const raw = Buffer.concat(chunks).toString("utf8");
      if (!raw) return resolve({});
      try {
        resolve(JSON.parse(raw));
      } catch (error) {
        reject(error);
      }
    });
    req.on("error", reject);
  });
}

function errorMessage(status) {
  return status === 429
    ? "Too many messages. Please try again later."
    : "Something went wrong. Please try again or email me directly.";
}

export function contactDevApi() {
  return {
    name: "contact-dev-api",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const path = req.url?.split("?")[0];
        if (path !== "/api/contact") return next();

        res.setHeader("Content-Type", "application/json");
        if (req.method !== "POST") {
          res.statusCode = 405;
          res.end(JSON.stringify({ ok: false, error: "Method not allowed" }));
          return;
        }

        try {
          rateLimit(clientIp(req.headers));
          const body = await readBody(req);
          const result = validateContact(body);
          if (result.ignored) {
            res.statusCode = 200;
            res.end(JSON.stringify({ ok: true }));
            return;
          }
          if (!result.ok) {
            res.statusCode = 400;
            res.end(JSON.stringify({ ok: false, error: result.error, fields: result.fields }));
            return;
          }
          await sendContactEmail(result.data);
          res.statusCode = 200;
          res.end(JSON.stringify({ ok: true }));
        } catch (error) {
          const status = error.status || 500;
          res.statusCode = status;
          res.end(JSON.stringify({ ok: false, error: errorMessage(status) }));
        }
      });
    },
  };
}
