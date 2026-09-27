import { ArrowUpRight } from "lucide-react";
import { portfolio } from "../../data/portfolio";
import { externalProps, filled } from "../../utils/external";
import Reveal from "../UI/Reveal";
import SectionHeading from "../UI/SectionHeading";

export default function Certifications() {
  const items = portfolio.certifications ?? [];

  return (
    <section id="certifications" className="py-20 md:py-28">
      <div className="page-wrap">
        <Reveal>
          <SectionHeading
            index="06"
            eyebrow="Certifications"
            title="Credentials."
            description={items.length ? "Credentials I can verify." : "I haven't added certifications yet."}
          />
        </Reveal>
        {items.length ? (
          <ul className="grid gap-4 sm:grid-cols-2">
            {items.map((item) => {
              const link = externalProps(item.url);
              return (
                <li key={item.id} className="border border-line bg-surface p-5">
                  <h3 className="text-lg font-semibold tracking-[-0.02em] text-ink">{item.name}</h3>
                  {filled(item.issuer) ? <p className="mt-1 text-sm text-muted">{item.issuer}</p> : null}
                  <p className="mt-3 font-mono text-[11px] text-faint">
                    {[item.date, filled(item.credentialId) ? `ID ${item.credentialId}` : ""]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                  {link ? (
                    <a {...link} className="mt-4 inline-flex items-center gap-1 text-sm text-ink underline-offset-4 hover:underline">
                      Verify
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  ) : null}
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="border-t border-line pt-6 text-sm text-muted">No certifications added.</p>
        )}
      </div>
    </section>
  );
}
