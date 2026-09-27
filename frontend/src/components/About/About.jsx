import { portfolio } from "../../data/portfolio";
import Reveal from "../UI/Reveal";
import SectionHeading from "../UI/SectionHeading";

export default function About() {
  const { about } = portfolio;

  return (
    <section id="about" className="border-t border-line py-20 md:py-28">
      <div className="page-wrap">
        <Reveal>
          <SectionHeading index="01" eyebrow="About" title={about.heading} />
        </Reveal>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <Reveal>
            <p className="font-mono text-[11px] tracking-[0.14em] text-faint uppercase">Background</p>
          </Reveal>
          <div className="space-y-5">
            {about.paragraphs.map((paragraph) => (
              <Reveal key={paragraph}>
                <p className="max-w-xl text-base leading-7 text-muted">{paragraph}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <dl className="mt-14 grid border-y border-line sm:grid-cols-2 lg:grid-cols-4">
          {about.facts.map((fact) => (
            <div key={fact.label} className="border-b border-line px-0 py-5 sm:px-5 sm:first:pl-0 lg:border-b-0 lg:border-r lg:last:border-r-0">
              <dt className="font-mono text-[11px] tracking-[0.14em] text-faint uppercase">{fact.label}</dt>
              <dd className="mt-2 text-lg font-medium tracking-[-0.02em] text-ink">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
