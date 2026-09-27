import { portfolio } from "../../data/portfolio";
import Reveal from "../UI/Reveal";
import SectionHeading from "../UI/SectionHeading";

export default function Skills() {
  const groups = Object.entries(portfolio.skills ?? {});

  return (
    <section id="skills" className="py-20 md:py-28">
      <div className="page-wrap">
        <Reveal>
          <SectionHeading
            index="04"
            eyebrow="Skills"
            title="What I work with."
            description="Grouped by where I use them. No percentages — those don't say much."
          />
        </Reveal>
        <div className="border-t border-line">
          {groups.map(([group, items]) => (
            <div
              key={group}
              className="grid gap-3 border-b border-line py-5 md:grid-cols-[160px_minmax(0,1fr)] md:items-start md:gap-8"
            >
              <h3 className="font-mono text-[11px] tracking-[0.14em] text-faint uppercase">{group}</h3>
              <ul className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <li
                    key={item}
                    className="border border-line bg-surface px-3 py-1.5 text-sm text-ink transition-colors hover:border-line-strong"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
