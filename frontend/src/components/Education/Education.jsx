import { portfolio } from "../../data/portfolio";
import { filled } from "../../utils/external";
import Reveal from "../UI/Reveal";
import SectionHeading from "../UI/SectionHeading";

export default function Education() {
  const items = portfolio.education ?? [];

  return (
    <section id="education" className="border-t border-line py-20 md:py-28">
      <div className="page-wrap">
        <Reveal>
          <SectionHeading index="05" eyebrow="Education" title="Where I'm studying." />
        </Reveal>
        <div className="border-t border-line">
          {items.map((item) => (
            <article key={item.id} className="grid gap-6 border-b border-line py-8 md:grid-cols-[minmax(0,1fr)_140px] md:items-end">
              <div>
                {filled(item.duration) ? (
                  <p className="font-mono text-xs text-muted">{item.duration}</p>
                ) : null}
                <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-ink">{item.degree}</h3>
                <p className="mt-2 text-base text-muted">{item.field}</p>
                {filled(item.institution) ? <p className="mt-1 text-sm text-ink">{item.institution}</p> : null}
                {item.coursework?.length ? (
                  <p className="mt-4 max-w-xl text-sm leading-6 text-muted">{item.coursework.join(" · ")}</p>
                ) : null}
              </div>
              {filled(item.score) ? (
                <p className="md:text-right">
                  <span className="block font-mono text-[11px] tracking-[0.14em] text-faint uppercase">{item.scoreLabel}</span>
                  <span className="mt-1 block text-3xl font-semibold tracking-[-0.04em] text-ink">{item.score}</span>
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
