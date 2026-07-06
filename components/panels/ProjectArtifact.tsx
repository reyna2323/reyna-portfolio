import { ExternalLink, GitBranch } from "lucide-react";
import type { Project } from "@/lib/content";

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
const CHIP: Record<"light" | "dark", string> = {
  light: "border-ink-muted/30 text-ink-muted",
  dark: "border-glass-muted/30 text-glass-muted",
};
const BUTTON: Record<"light" | "dark", string> = {
  light: "border-ink-muted/30 text-ink-soft hover:bg-ink-strong/5",
  dark: "border-glass-muted/30 text-glass-soft hover:bg-glass-strong/10",
};

/** Renders a single project as a stylized artifact whose look depends on `project.artifact`. */
export function ProjectArtifact({ project }: { project: Project }) {
  const surface = ARTIFACT_SURFACE[project.artifact];
  const fam = surface.family;
  return (
    <article className={`relative rounded-lg border p-4 ${surface.bg} ${fam === "dark" ? "font-mono" : ""}`}>
      <span className={`absolute right-3 top-3 rounded-full border px-2 py-0.5 text-[0.6rem] uppercase tracking-wide ${CHIP[fam]}`}>
        {ARTIFACT_LABEL[project.artifact]}
      </span>
      <p className={`pr-20 text-desk-micro uppercase tracking-wide ${META[fam]}`}>
        {project.category}
        {project.period ? ` · ${project.period}` : ""}
      </p>
      <h4 className={`mt-1 font-hand text-hand-xl leading-tight ${surface.accent}`}>{project.title}</h4>
      <p className={`mt-2 text-sm leading-relaxed ${BODY[fam]}`}>{project.description}</p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {project.stack.map((s) => (
          <span key={s} className={`rounded-full border px-2 py-0.5 text-[0.68rem] ${CHIP[fam]}`}>
            {s}
          </span>
        ))}
      </div>

      <dl className="mt-3 space-y-2 text-sm">
        <div>
          <dt className={`text-[0.68rem] font-semibold uppercase tracking-wide ${META[fam]}`}>What I built</dt>
          <dd className={BODY[fam]}>{project.built}</dd>
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
        </div>
        <div>
          <dt className={`text-[0.68rem] font-semibold uppercase tracking-wide ${META[fam]}`}>Why it mattered</dt>
          <dd className={BODY[fam]}>{project.mattered}</dd>
        </div>
      </dl>

      <div className="mt-3 flex gap-2">
        <a
          href={project.github ?? "#"}
          target="_blank"
          rel="noreferrer"
          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs transition-colors ${BUTTON[fam]}`}
        >
          <GitBranch size={12} aria-hidden /> GitHub
        </a>
        <a
          href={project.demo ?? "#"}
          target="_blank"
          rel="noreferrer"
          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs transition-colors ${BUTTON[fam]}`}
        >
          <ExternalLink size={12} aria-hidden /> Demo
        </a>
      </div>
    </article>
  );
}
