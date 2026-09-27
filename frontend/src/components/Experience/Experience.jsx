import { portfolio } from "../../data/portfolio";
import { filled } from "../../utils/external";
import Reveal from "../UI/Reveal";
import SectionHeading from "../UI/SectionHeading";

function ExperienceItem({ item }) {
  return (
    <article className="grid gap-4 border-t border-line py-8 md:grid-cols-[180px_minmax(0,1fr)] md:gap-10">
      <div>
        {filled(item.duration) ? <p className="font-mono text-xs text-muted">{item.duration}</p> : null}
        {filled(item.type) ? <p className="mt-2 text-sm text-muted">{item.type}</p> : null}
        {filled(item.location) ? <p className="text-sm text-faint">{item.location}</p> : null}
      </div>
      <div>
        <div className="flex items-start gap-4">
          {filled(item.logo) ? (
            <img src={item.logo} alt={`${item.company} logo`} className="h-12 w-12 shrink-0 rounded-full border border-line bg-white object-contain" />
          ) : null}
          <div>
            <h3 className="text-xl font-semibold tracking-[-0.02em] text-ink">{item.role}</h3>
            <p className="mt-1 text-sm text-muted">{item.company}</p>
          </div>
        </div>
        {item.points?.length ? (
          <ul className="mt-4 space-y-2">
            {item.points.map((point) => (
              <li key={point} className="grid grid-cols-[12px_1fr] gap-2 text-sm leading-6 text-muted">
                <span className="mt-2 h-1 w-1 rounded-full bg-accent" aria-hidden="true" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        ) : null}
        {item.technologies?.length ? (
          <ul className="mt-5 flex flex-wrap gap-2">
            {item.technologies.map((tech) => (
              <li key={tech} className="border border-line px-2 py-1 font-mono text-[11px] text-muted">
                {tech}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
}

export default function Experience() {
  const items = portfolio.experience ?? [];

  return (
    <section id="experience" className="py-20 md:py-28">
      <div className="page-wrap">
        <Reveal>
          <SectionHeading
            index="02"
            eyebrow="Experience"
            title="Work so far."
            description="A full-stack internship at DRDO, and a UI/UX internship before that."
          />
        </Reveal>
        {items.length ? (
          <div className="border-b border-line">
            {items.map((item, index) => (
              <Reveal key={item.id} delay={index * 0.05}>
                <ExperienceItem item={item} />
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted">Experience will be listed here.</p>
        )}
      </div>
    </section>
  );
}
