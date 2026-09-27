import { ArrowUpRight } from "lucide-react";
import { portfolio } from "../../data/portfolio";
import { externalProps } from "../../utils/external";
import Reveal from "../UI/Reveal";
import SectionHeading from "../UI/SectionHeading";
import ProjectMedia from "./ProjectMedia";

function Links({ project }) {
  const items = [
    { label: "Live", link: externalProps(project.live) },
    { label: "Code", link: externalProps(project.github) },
    { label: "Case study", link: externalProps(project.caseStudy) },
  ].filter((item) => item.link);

  if (!items.length) return null;

  return (
    <div className="flex flex-wrap gap-4">
      {items.map((item) => (
        <a
          key={item.label}
          {...item.link}
          className="inline-flex items-center gap-1 text-sm font-medium text-ink underline-offset-4 hover:underline"
        >
          {item.label}
          <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}

function Tags({ technologies }) {
  if (!technologies?.length) return null;
  return (
    <ul className="flex flex-wrap gap-2">
      {technologies.map((tech) => (
        <li key={tech} className="border border-line px-2 py-1 font-mono text-[11px] text-muted">
          {tech}
        </li>
      ))}
    </ul>
  );
}

function FeaturedProject({ project }) {
  return (
    <article className="group grid border border-line bg-surface lg:grid-cols-[1.15fr_0.85fr]">
      <ProjectMedia project={project} />
      <div className="flex flex-col gap-5 p-6 sm:p-8">
        <p className="font-mono text-[11px] tracking-[0.14em] text-accent-ink uppercase">Featured</p>
        <div>
          <h3 className="text-2xl font-semibold tracking-[-0.03em] text-ink sm:text-3xl">{project.name}</h3>
          <p className="mt-3 text-sm leading-6 text-muted">{project.description}</p>
        </div>
        {project.features?.length ? (
          <ul className="space-y-1.5">
            {project.features.map((feature) => (
              <li key={feature} className="text-sm leading-6 text-ink">
                {feature}
              </li>
            ))}
          </ul>
        ) : null}
        <Tags technologies={project.technologies} />
        <Links project={project} />
      </div>
    </article>
  );
}

function ProjectCard({ project }) {
  return (
    <article className="group grid border border-line bg-surface md:grid-cols-[0.9fr_1.1fr]">
      <ProjectMedia project={project} />
      <div className="flex flex-col gap-4 p-5 sm:p-6">
        <h3 className="text-xl font-semibold tracking-[-0.02em] text-ink">{project.name}</h3>
        <p className="text-sm leading-6 text-muted">{project.description}</p>
        {project.features?.length ? (
          <ul className="space-y-1">
            {project.features.map((feature) => (
              <li key={feature} className="text-sm text-ink">
                {feature}
              </li>
            ))}
          </ul>
        ) : null}
        <Tags technologies={project.technologies} />
        <Links project={project} />
      </div>
    </article>
  );
}

export default function Projects() {
  const projects = portfolio.projects ?? [];
  const featured = projects.filter((project) => project.featured);
  const rest = projects.filter((project) => !project.featured);

  return (
    <section id="projects" className="border-t border-line py-20 md:py-28">
      <div className="page-wrap">
        <Reveal>
          <SectionHeading
            index="03"
            eyebrow="Projects"
            title="Things I've built."
            description="A full-stack accommodation booking platform."
          />
        </Reveal>
        <div className="space-y-6">
          {featured.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.04}>
              <FeaturedProject project={project} />
            </Reveal>
          ))}
          {rest.map((project) => (
            <Reveal key={project.id}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
