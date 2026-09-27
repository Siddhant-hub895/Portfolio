import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { portfolio } from "../../data/portfolio";
import { GitHubIcon, InstagramIcon, LinkedInIcon } from "../UI/BrandIcons";
import { externalProps, filled } from "../../utils/external";

const socials = [
  { key: "github", label: "GitHub", Icon: GitHubIcon },
  { key: "linkedin", label: "LinkedIn", Icon: LinkedInIcon },
  { key: "instagram", label: "Instagram", Icon: InstagramIcon },
];

export default function Hero() {
  const reduce = useReducedMotion();
  const { personal, heroNotes, social, resume } = portfolio;
  const resumeLink = externalProps(resume);

  const motionProps = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
      };

  return (
    <section id="top" className="page-wrap pt-14 pb-20 md:pt-20 md:pb-28">
      <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] lg:gap-16">
        <motion.div {...motionProps}>
          <p className="mb-8 inline-flex items-center gap-2 text-sm text-muted">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            {personal.status}
          </p>
          <p className="font-mono text-[11px] tracking-[0.16em] text-accent-ink uppercase">{personal.role}</p>
          <h1 className="mt-3 max-w-xl text-[2.6rem] leading-[0.95] font-semibold tracking-[-0.045em] text-ink sm:text-6xl lg:text-[4.4rem]">
            {personal.name}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink sm:text-xl">{personal.tagline}</p>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-muted">{personal.description}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="inline-flex h-11 items-center rounded-full bg-accent px-5 text-sm font-medium text-on-accent transition-transform hover:-translate-y-px"
            >
              View projects
            </a>
            <a
              href="#contact"
              className="inline-flex h-11 items-center gap-1.5 rounded-full border border-line-strong px-5 text-sm font-medium text-ink transition-colors hover:border-ink"
            >
              Get in touch
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
            {resumeLink ? (
              <a {...resumeLink} className="inline-flex h-11 items-center px-2 text-sm text-muted underline-offset-4 hover:text-ink hover:underline">
                Resume
              </a>
            ) : null}
          </div>

          <ul className="mt-8 flex flex-wrap items-center gap-4">
            {socials.map(({ key, label, Icon }) => {
              const link = externalProps(social[key]);
              if (!link) return null;
              return (
                <li key={key}>
                  <a {...link} aria-label={label} className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink">
                    <Icon className="h-4 w-4" />
                    {label}
                  </a>
                </li>
              );
            })}
            {filled(social.email) ? (
              <li>
                <a href={`mailto:${social.email}`} className="text-sm text-muted hover:text-ink">
                  Email
                </a>
              </li>
            ) : null}
          </ul>
        </motion.div>

        <motion.aside
          {...(reduce
            ? {}
            : {
                initial: { opacity: 0, y: 16 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] },
              })}
          className="border border-line bg-surface"
          aria-label="Current focus"
        >
          <div className="flex items-center justify-between border-b border-line px-5 py-3">
            <p className="font-mono text-[11px] tracking-[0.14em] text-faint uppercase">Now</p>
            <p className="font-mono text-[11px] text-faint">2026</p>
          </div>
          <dl>
            {heroNotes.map((note, index) => (
              <div
                key={note.label}
                className={`grid gap-1 px-5 py-4 sm:grid-cols-[140px_1fr] sm:gap-4 ${
                  index < heroNotes.length - 1 ? "border-b border-line" : ""
                }`}
              >
                <dt className="font-mono text-[11px] tracking-[0.12em] text-faint uppercase">{note.label}</dt>
                <dd className="text-sm leading-relaxed text-ink">{note.value}</dd>
              </div>
            ))}
          </dl>
        </motion.aside>
      </div>
    </section>
  );
}
