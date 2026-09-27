import { useState } from "react";

function RoamlyVisual() {
  return (
    <div className="flex h-full min-h-56 flex-col bg-bg-elevated p-4 sm:p-6" aria-hidden="true">
      <div className="mb-4 flex items-center justify-between">
        <div className="h-2 w-16 bg-line-strong" />
        <div className="h-6 w-20 border border-line" />
      </div>
      <div className="grid flex-1 gap-3 sm:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-3">
          {[0, 1, 2].map((row) => (
            <div key={row} className="grid grid-cols-[72px_1fr] gap-3 border border-line bg-surface p-2">
              <div className="h-14 bg-accent-soft" />
              <div className="space-y-2 py-1">
                <div className="h-2 w-2/3 bg-line-strong" />
                <div className="h-2 w-1/2 bg-line" />
                <div className="h-2 w-1/3 bg-line" />
              </div>
            </div>
          ))}
        </div>
        <div className="relative min-h-36 border border-line bg-surface">
          <div className="absolute inset-4 border border-dashed border-line-strong" />
          <div className="absolute top-1/3 left-1/4 h-2 w-2 rounded-full bg-accent" />
          <div className="absolute top-1/2 right-1/3 h-2 w-2 rounded-full bg-accent" />
          <div className="absolute bottom-1/3 left-1/2 h-2 w-2 rounded-full bg-ink" />
          <p className="absolute bottom-3 left-3 font-mono text-[10px] tracking-[0.14em] text-faint uppercase">Map</p>
        </div>
      </div>
    </div>
  );
}

function GenericVisual({ name }) {
  return (
    <div className="flex h-full min-h-48 items-end bg-bg-elevated p-6" aria-hidden="true">
      <p className="font-mono text-[11px] tracking-[0.14em] text-faint uppercase">{name}</p>
    </div>
  );
}

export default function ProjectMedia({ project }) {
  const [failed, setFailed] = useState(false);
  const showImage = project.image && !failed;

  return (
    <div className="h-full min-h-72 overflow-hidden border border-line bg-[#121417]">
      {showImage ? (
        <img
          src={project.image}
          alt={project.imageAlt || project.name}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full min-h-72 w-full object-contain object-center transition-transform duration-500 group-hover:scale-[1.03]"
        />
      ) : project.visual === "roamly" ? (
        <RoamlyVisual />
      ) : (
        <GenericVisual name={project.name} />
      )}
    </div>
  );
}
