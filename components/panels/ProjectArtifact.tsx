import { ExternalLink, GitBranch } from "lucide-react";
import type { Project } from "@/lib/content";
import { CountUp } from "./CountUp";
import { ProjectFigure } from "./ProjectFigures";

const ARTIFACT_LABEL: Record<Project["artifact"], string> = {
  terminal: "terminal log",
  casefile: "case file",
  datasheet: "datasheet",
  notebook: "lab page",
  polaroid: "polaroid",
};

/* Each artifact type owns a background + a matching text-token trio.
   "light" artifacts (casefile/datasheet/notebook/polaroid) use the
   ink tokens; "dark" artifacts (terminal) use the glass tokens plus the
   circuit accent. Never dim these with opacity — swap the token if
   something needs to recede. */
const ARTIFACT_SURFACE: Record<Project["artifact"], { bg: string; family: "light" | "dark"; accent: string }> = {
  terminal: { bg: "bg-[#150c1c] border-mintled/25", family: "dark", accent: "text-circuit" },
  casefile: { bg: "bg-folder border-copper/40", family: "light", accent: "text-copper-ink" },
  datasheet: { bg: "bg-[#fdf9f3] border-ink-strong/15", family: "light", accent: "text-rose-ink" },
  notebook: { bg: "graph-paper bg-paper border-pink/40", family: "light", accent: "text-rose-ink" },
  polaroid: { bg: "bg-petal border-white/60 shadow-[0_10px_20px_-8px_rgba(0,0,0,0.35)]", family: "light", accent: "text-rose-ink" },
};

const BODY: Record<"light" | "dark", string> = { light: "text-ink-soft", dark: "text-glass-soft" };
const META: Record<"light" | "dark", string> = { light: "text-ink-muted", dark: "text-glass-muted" };
/* labels are flat tints (not clickable); buttons are outlined (clickable) */
const CHIP: Record<"light" | "dark", string> = {
  light: "bg-ink-strong/[0.07] text-ink-muted",
  dark: "bg-white/[0.08] text-glass-muted",
};
const BUTTON: Record<"light" | "dark", string> = {
  light: "border-ink-soft/60 font-semibold text-ink-strong hover:border-ink-strong hover:bg-ink-strong/10",
  dark: "border-glass-soft/60 font-semibold text-glass-strong hover:border-glass-strong hover:bg-glass-strong/10",
};

/* small touches that make each artifact look like the real object */
function ArtifactDetails({ artifact }: { artifact: Project["artifact"] }) {
  if (artifact === "polaroid") {
    // a strip of washi tape holding the photo down
    return <span aria-hidden className="absolute -top-2.5 left-1/2 h-5 w-24 -translate-x-1/2 rotate-[-3deg] rounded-sm bg-lavender/70 shadow-sm" />;
  }
  if (artifact === "notebook") {
    // binder holes down the left edge
    return (
      <span aria-hidden className="absolute inset-y-4 left-1.5 flex flex-col justify-around">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="h-2.5 w-2.5 rounded-full bg-deepplum/25 shadow-[inset_0_1px_2px_rgba(0,0,0,0.35)]" />
        ))}
      </span>
    );
  }
  if (artifact === "terminal") {
    // window chrome
    return (
      <span aria-hidden className="mb-3 flex items-center gap-1.5 border-b border-mintled/15 pb-2">
        <span className="h-2 w-2 rounded-full bg-hotpink" />
        <span className="h-2 w-2 rounded-full bg-rosegold" />
        <span className="h-2 w-2 rounded-full bg-mintled" />
        <span className="ml-2 text-[0.7rem] text-glass-muted">~/research/kepler</span>
      </span>
    );
  }
  if (artifact === "datasheet") {
    // a rubber stamp in the corner
    return (
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-4 right-4 rotate-[-8deg] rounded border-2 border-rose-ink/60 px-2 py-0.5 font-mono text-xs font-bold uppercase tracking-widest text-rose-ink/70"
      >
        shipped ✓
      </span>
    );
  }
  return null;
}

/** Renders a single project as a stylized artifact whose look depends on `project.artifact`. */
export function ProjectArtifact({ project, index = 0 }: { project: Project; index?: number }) {
  const surface = ARTIFACT_SURFACE[project.artifact];
  const fam = surface.family;
  return (
    <article
      id={`project-${project.id}`}
      className={`anim-fade-up relative scroll-mt-4 rounded-lg border p-4 transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_16px_30px_-14px_rgba(0,0,0,0.45)] ${surface.bg} ${fam === "dark" ? "font-mono" : ""} ${project.artifact === "notebook" ? "pl-7" : ""}`}
      style={{ animationDelay: `${index * 90}ms` }}
    >
      <ArtifactDetails artifact={project.artifact} />
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <div className="min-w-0 flex-1">
          <p className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-xs uppercase tracking-wide ${META[fam]}`}>
            <span aria-hidden className={`rounded-full px-2 py-0.5 text-[0.65rem] ${CHIP[fam]}`}>
              {ARTIFACT_LABEL[project.artifact]}
            </span>
            <span>
              {project.category}
              {project.period ? ` · ${project.period}` : ""}
            </span>
          </p>
          <h3 className={`mt-1.5 font-hand text-hand-xl leading-tight ${surface.accent}`}>{project.title}</h3>
          <p className={`mt-2 text-sm leading-relaxed ${BODY[fam]}`}>{project.description}</p>
          {/* readouts that count up, like the research stats */}
          {project.specs && (
            <dl className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
              {project.specs.map((s) => (
                <div key={s.label} className="flex flex-col-reverse">
                  <dt className={`text-xs ${META[fam]}`}>{s.label}</dt>
                  <dd className={`font-mono text-2xl font-semibold leading-none ${surface.accent}`}>
                    <CountUp value={s.value} />
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>
        {project.figures && project.figures.length > 0 && (
          <div className="mx-auto flex w-full max-w-[15rem] shrink-0 flex-col gap-3 sm:mx-0 sm:w-56">
            {project.figures.map((f) => (
              <ProjectFigure key={f.kind} figure={f} dark={fam === "dark"} />
            ))}
          </div>
        )}
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {project.stack.map((s) => (
          <span key={s} className={`rounded-full px-2 py-0.5 text-xs ${CHIP[fam]}`}>
            {s}
          </span>
        ))}
      </div>

      <dl className="mt-3 space-y-2 text-sm">
        <div>
          <dt className={`text-xs font-semibold uppercase tracking-wide ${META[fam]}`}>What I built</dt>
          <dd className={BODY[fam]}>
            {project.built}
            {project.highlights && project.highlights.length > 0 && (
              <ul className="mt-1.5 space-y-1">
                {project.highlights.map((h) => (
                  <li key={h} className={`flex gap-1.5 text-sm ${BODY[fam]}`}>
                    <span className={`mt-1.5 h-1 w-1 shrink-0 rounded-full ${fam === "light" ? "bg-copper" : "bg-mintled"}`} />
                    {h}
                  </li>
                ))}
              </ul>
            )}
          </dd>
        </div>
        <div>
          <dt className={`text-xs font-semibold uppercase tracking-wide ${META[fam]}`}>Why it mattered</dt>
          <dd className={BODY[fam]}>{project.mattered}</dd>
        </div>
      </dl>

      {(project.github || project.demo) && (
        <div className="mt-3 flex gap-2">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs transition-colors ${BUTTON[fam]}`}
            >
              <GitBranch size={12} aria-hidden /> GitHub ↗
              <span className="sr-only"> for {project.title} (opens in a new tab)</span>
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs transition-colors ${BUTTON[fam]}`}
            >
              <ExternalLink size={12} aria-hidden /> Demo ↗
              <span className="sr-only"> of {project.title} (opens in a new tab)</span>
            </a>
          )}
        </div>
      )}
    </article>
  );
}
