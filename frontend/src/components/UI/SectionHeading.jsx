export default function SectionHeading({ index, eyebrow, title, description }) {
  return (
    <div className="mb-10 max-w-2xl md:mb-14">
      <p className="mb-3 font-mono text-[11px] tracking-[0.16em] text-accent-ink uppercase">
        {index} — {eyebrow}
      </p>
      <h2 className="text-[1.7rem] leading-tight font-semibold tracking-[-0.03em] text-ink sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">{description}</p>
      ) : null}
    </div>
  );
}
