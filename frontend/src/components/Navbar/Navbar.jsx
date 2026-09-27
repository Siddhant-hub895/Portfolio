import { useEffect, useId, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { navItems, portfolio } from "../../data/portfolio";
import { useActiveSection } from "../../hooks/useActiveSection";
import { useTheme } from "../../hooks/useTheme";
import { externalProps, filled } from "../../utils/external";

const sectionIds = navItems.map((item) => item.id);

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const label = isDark ? "Dark mode on. Switch to light mode." : "Light mode on. Switch to dark mode.";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-line-strong hover:bg-surface"
    >
      {isDark ? <Moon size={16} aria-hidden="true" /> : <Sun size={16} aria-hidden="true" />}
    </button>
  );
}

export default function Navbar() {
  const active = useActiveSection(sectionIds);
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const resume = externalProps(portfolio.resume);

  useEffect(() => {
    if (!open) return undefined;

    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-nav backdrop-blur-md">
      <div className="page-wrap flex h-16 items-center justify-between gap-4">
        <a href="#top" className="shrink-0 text-[15px] font-semibold tracking-[-0.02em] text-ink">
          {portfolio.personal.name}
        </a>

        <nav className="hidden items-center gap-5 lg:flex" aria-label="Primary">
          {navItems.map((item) => {
            const isActive = active === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={isActive ? "true" : undefined}
                className={`text-[13px] tracking-[-0.01em] transition-colors ${
                  isActive ? "text-ink" : "text-muted hover:text-ink"
                }`}
              >
                <span className={isActive ? "border-b border-accent pb-0.5" : ""}>{item.label}</span>
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          {resume && filled(portfolio.resume) ? (
            <a
              {...resume}
              className="hidden h-9 items-center rounded-full border border-ink px-3.5 text-[13px] font-medium text-ink transition-colors hover:bg-ink hover:text-bg sm:inline-flex"
            >
              Resume
            </a>
          ) : null}
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink lg:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            {open ? <X size={16} aria-hidden="true" /> : <Menu size={16} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open ? (
        <nav id={menuId} className="border-t border-line bg-bg lg:hidden" aria-label="Mobile">
          <div className="page-wrap flex flex-col py-2">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={close}
                className="border-b border-line py-3 text-[15px] text-ink last:border-b-0"
              >
                {item.label}
              </a>
            ))}
            {resume ? (
              <a {...resume} onClick={close} className="py-3 text-[15px] font-medium text-accent-ink sm:hidden">
                Resume
              </a>
            ) : null}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
