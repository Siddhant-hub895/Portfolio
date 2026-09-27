import { useState } from "react";
import { portfolio } from "../../data/portfolio";
import { GitHubIcon, InstagramIcon, LinkedInIcon } from "../UI/BrandIcons";
import { externalProps, filled } from "../../utils/external";
import Reveal from "../UI/Reveal";

const initial = { name: "", email: "", subject: "", message: "", website: "" };

function validate(values) {
  const fields = {};
  if (values.name.trim().length < 2) fields.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) fields.email = "Enter a valid email address.";
  if (values.subject.trim().length < 2) fields.subject = "Add a short subject.";
  if (values.message.trim().length < 10) fields.message = "Message should be at least 10 characters.";
  return fields;
}

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block font-mono text-[11px] tracking-[0.12em] text-faint uppercase">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm text-accent-ink" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

const inputClass =
  "w-full border-b border-line bg-transparent py-3 text-base text-ink outline-none transition-colors placeholder:text-faint focus:border-accent";

export default function Contact() {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [formError, setFormError] = useState("");
  const { personal, social, resume } = portfolio;
  const resumeLink = externalProps(resume);

  const socials = [
    { key: "github", label: "GitHub", Icon: GitHubIcon },
    { key: "linkedin", label: "LinkedIn", Icon: LinkedInIcon },
    { key: "instagram", label: "Instagram", Icon: InstagramIcon },
  ];

  function update(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  }

  async function onSubmit(event) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setFormError("");
    if (Object.keys(nextErrors).length) return;

    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          subject: values.subject.trim(),
          message: values.message.trim(),
          website: values.website,
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.ok) {
        if (data.fields) setErrors(data.fields);
        throw new Error(data.error || "Request failed");
      }
      setStatus("success");
      setValues(initial);
    } catch {
      setStatus("error");
      setFormError("Something went wrong. Please try again or email me directly.");
    }
  }

  return (
    <section id="contact" className="border-t border-line py-20 md:py-28">
      <div className="page-wrap grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
        <Reveal>
          <p className="mb-3 font-mono text-[11px] tracking-[0.16em] text-accent-ink uppercase">07 — Contact</p>
          <h2 className="max-w-md text-3xl leading-tight font-semibold tracking-[-0.03em] text-ink sm:text-4xl">
            Have a role or a project in mind?
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
            I'm looking for software developer internships and graduate roles. A short message is enough.
          </p>
          <ul className="mt-8 space-y-3 text-sm">
            {filled(personal.email) ? (
              <li>
                <a className="text-ink underline-offset-4 hover:underline" href={`mailto:${personal.email}`}>
                  {personal.email}
                </a>
              </li>
            ) : null}
            {filled(personal.location) ? <li className="text-muted">{personal.location}</li> : null}
            {socials.map(({ key, label, Icon }) => {
              const link = externalProps(social[key]);
              if (!link) return null;
              return (
                <li key={key}>
                  <a {...link} className="inline-flex items-center gap-2 text-ink hover:underline">
                    <Icon className="h-4 w-4" />
                    {label}
                  </a>
                </li>
              );
            })}
            {resumeLink ? (
              <li>
                <a {...resumeLink} className="text-ink underline-offset-4 hover:underline">
                  Resume
                </a>
              </li>
            ) : null}
          </ul>
        </Reveal>

        <Reveal>
          <form onSubmit={onSubmit} noValidate className="relative space-y-6">
            <div className="absolute -left-[9999px] h-0 overflow-hidden" aria-hidden="true">
              <label>
                Website
                <input name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={update} />
              </label>
            </div>
            <Field id="name" label="Name" error={errors.name}>
              <input
                id="name"
                name="name"
                autoComplete="name"
                value={values.name}
                onChange={update}
                placeholder="Your name"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-error" : undefined}
                className={inputClass}
              />
            </Field>
            <Field id="email" label="Email" error={errors.email}>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={values.email}
                onChange={update}
                placeholder="you@email.com"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={inputClass}
              />
            </Field>
            <Field id="subject" label="Subject" error={errors.subject}>
              <input
                id="subject"
                name="subject"
                value={values.subject}
                onChange={update}
                placeholder="Internship, role, or project"
                aria-invalid={Boolean(errors.subject)}
                aria-describedby={errors.subject ? "subject-error" : undefined}
                className={inputClass}
              />
            </Field>
            <Field id="message" label="Message" error={errors.message}>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={values.message}
                onChange={update}
                placeholder="What would you like to talk about?"
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "message-error" : undefined}
                className={`${inputClass} resize-y`}
              />
            </Field>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex h-11 items-center rounded-full bg-accent px-5 text-sm font-medium text-on-accent disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "sending" ? "Sending..." : "Send message"}
              </button>
              {status === "success" ? (
                <p role="status" className="text-sm text-ink">
                  Message sent successfully.
                </p>
              ) : null}
              {status === "error" ? (
                <p role="alert" className="text-sm text-accent-ink">
                  {formError}
                </p>
              ) : null}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
