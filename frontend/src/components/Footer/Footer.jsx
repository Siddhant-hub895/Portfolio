import { navItems, portfolio } from "../../data/portfolio";
import { GitHubIcon, InstagramIcon, LinkedInIcon } from "../UI/BrandIcons";
import { externalProps, filled } from "../../utils/external";

export default function Footer() {
  const { personal, social } = portfolio;
  const year = new Date().getFullYear();
  const links = [
    { label: "GitHub", link: externalProps(social.github), Icon: GitHubIcon },
    { label: "LinkedIn", link: externalProps(social.linkedin), Icon: LinkedInIcon },
    { label: "Instagram", link: externalProps(social.instagram), Icon: InstagramIcon },
  ].filter((item) => item.link);

  return (
    <footer className="border-t border-line">
      <div className="page-wrap grid gap-10 py-14 md:grid-cols-[minmax(0,1.3fr)_auto_auto] md:gap-16">
        <div>
          <p className="text-lg font-semibold tracking-[-0.02em] text-ink">{personal.name}</p>
          <p className="mt-3 max-w-xs text-sm leading-6 text-muted">
            Full-stack developer. Final-year E&TC student.
          </p>
        </div>
        <nav aria-label="Footer">
          <p className="font-mono text-[11px] tracking-[0.14em] text-faint uppercase">Navigation</p>
          <ul className="mt-3 space-y-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="text-sm text-muted hover:text-ink">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="font-mono text-[11px] tracking-[0.14em] text-faint uppercase">Connect</p>
          <ul className="mt-3 space-y-2">
            {links.map(({ label, link, Icon }) => (
              <li key={label}>
                <a {...link} className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink">
                  <Icon className="h-3.5 w-3.5" />
                  {label}
                </a>
              </li>
            ))}
            {filled(social.email) ? (
              <li>
                <a href={`mailto:${social.email}`} className="text-sm text-muted hover:text-ink">
                  Email
                </a>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="page-wrap flex flex-col gap-2 py-5 text-xs text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {personal.name}</p>
          <p>Built with React</p>
        </div>
      </div>
    </footer>
  );
}
