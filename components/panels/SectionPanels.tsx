"use client";

import {
  Cpu,
  Activity,
  Briefcase,
  Compass,
  GraduationCap,
  Trophy,
  Mail,
  Heart,
  Sparkles,
  BadgeCheck,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  LineChart,
  BellRing,
  Waves,
  PenLine,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { PageId, RoleKind } from "@/lib/content";
import type { PanelVariant } from "./PanelShell";
import {
  intro,
  about,
  education,
  experience,
  research,
  projects,
  projectsIntro,
  skills,
  awards,
  certifications,
  contact,
  sections,
  pageOrder,
  pageMeta,
} from "@/lib/content";
import { PageLink, usePageNav } from "@/lib/pageNav";
import { ProjectArtifact } from "./ProjectArtifact";

export const PANEL_META: Record<PageId, { variant: PanelVariant; icon: LucideIcon }> = {
  start: { variant: "notebook", icon: Compass },
  about: { variant: "notebook", icon: Heart },
  experience: { variant: "folder", icon: Briefcase },
  research: { variant: "window", icon: Activity },
  projects: { variant: "window", icon: Sparkles },
  skills: { variant: "schematic", icon: Cpu },
  awards: { variant: "folder", icon: Trophy },
  contact: { variant: "casefile", icon: Mail },
};

const pad = (n: number) => String(n).padStart(2, "0");

/* ------------------------------------------------------------ start here */

/** Who Reyna is in three lines. Shared by the desktop contents page and the mobile landing. */
export function StartIntro({ tone = "light" }: { tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <div className="space-y-3.5">
      <div>
        <p className={`font-hand text-hand-xl leading-none ${dark ? "text-pink" : "text-hotpink"}`}>{intro.greeting}</p>
        <p className={`mt-2 text-[0.95rem] leading-relaxed ${dark ? "text-glass-soft" : "text-ink-strong"}`}>
          {intro.summary}
        </p>
      </div>
      <div
        className={`rounded-lg border px-3.5 py-3 ${
          dark ? "border-pink/25 bg-white/[0.06]" : "border-hotpink/25 bg-white/60"
        }`}
      >
        <p
          className={`mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide ${
            dark ? "text-glass-muted" : "text-rose-ink"
          }`}
        >
          <span className="anim-led h-1.5 w-1.5 rounded-full bg-mintled" aria-hidden />
          right now
        </p>
        <dl className="space-y-1">
          {intro.now.map((n) => (
            <div key={n.label} className="flex flex-col gap-x-3 sm:flex-row sm:items-baseline">
              <dt className={`w-24 shrink-0 font-hand text-hand-md leading-tight ${dark ? "text-pink" : "text-rose-ink"}`}>
                {n.label}
              </dt>
              <dd className={`text-sm leading-snug ${dark ? "text-glass-soft" : "text-ink-soft"}`}>{n.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

/** Desktop landing page: intro, a table of contents mapping pages to desk objects, and two clear ways in. */
export function StartHerePanel() {
  const { open, close } = usePageNav();
  return (
    <div className="space-y-5">
      <StartIntro />

      <nav aria-labelledby="contents-heading">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3">
          <h3 id="contents-heading" className="font-hand text-hand-lg text-rose-ink">
            contents
          </h3>
          <p className="text-xs text-ink-muted">click an object on the desk, use the dock, or flip through in order</p>
        </div>
        <ol className="mt-1.5 grid grid-cols-1 gap-x-4 sm:grid-cols-2">
          {sections.map((s, i) => (
            <li key={s.id} className="border-t border-ink-strong/10">
              <PageLink
                to={s.id}
                className="group -mx-1.5 flex gap-2.5 rounded px-1.5 py-1.5 transition-colors hover:bg-white/60"
              >
                <span className="pt-0.5 font-mono text-xs text-rose-ink">{pad(i + 1)}</span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-baseline justify-between gap-2">
                    <span className="font-semibold text-ink-strong group-hover:text-rose-ink">{s.label}</span>
                    <span className="truncate font-hand text-hand-sm text-ink-muted">{s.object}</span>
                  </span>
                  <span className="block truncate text-xs text-ink-soft">{s.blurb}</span>
                </span>
              </PageLink>
            </li>
          ))}
        </ol>
      </nav>

      <div className="flex flex-wrap items-center gap-2.5">
        <button
          type="button"
          onClick={() => open("about")}
          className="inline-flex items-center gap-2 rounded-full bg-rose-ink px-4 py-2 text-sm font-semibold text-petal shadow-sm transition-colors hover:bg-plum"
        >
          Start reading <ArrowRight size={15} aria-hidden />
        </button>
        <button
          type="button"
          onClick={close}
          className="inline-flex items-center gap-2 rounded-full border border-rose-ink/40 bg-white/40 px-4 py-2 text-sm font-semibold text-rose-ink transition-colors hover:bg-white/70"
        >
          Explore the desk ✦
        </button>
        <p className="font-hand text-hand-sm text-ink-muted">psst: a few unlabeled things are clickable too ♡</p>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------- about */

export function AboutPanel() {
  return (
    <div className="space-y-5">
      <p className="font-hand text-hand-xl text-hotpink">{about.greeting}</p>
      <div className="space-y-3">
        {about.paragraphs.map((p, i) => (
          <p key={i} className="text-sm leading-relaxed text-ink-soft">
            {p}
          </p>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {about.stickies.map((s, i) => (
          <span
            key={s}
            className={`rounded-sm bg-blush px-2.5 py-1.5 font-hand text-hand-sm text-ink-strong shadow-sm ${
              i % 2 === 0 ? "-rotate-2" : "rotate-2"
            }`}
          >
            {s}
          </span>
        ))}
      </div>

      <section aria-labelledby="edu-heading" className="rounded-lg border border-pink/30 bg-white/40 p-3.5">
        <div className="flex items-center gap-2 text-ink-strong">
          <GraduationCap size={16} aria-hidden />
          <h3 id="edu-heading" className="text-sm font-semibold">
            {education.school}
          </h3>
        </div>
        <p className="mt-1 text-sm text-ink-soft">{education.degree}</p>
        <p className="text-sm text-ink-muted">
          {education.location} · {education.period}
        </p>
        <p className="mt-2.5 text-xs font-semibold uppercase tracking-wide text-ink-muted">Relevant coursework</p>
        <div className="mt-1 flex flex-wrap gap-1.5">
          {education.coursework.map((c) => (
            <span key={c} className="rounded-full border border-ink-muted/25 px-2 py-0.5 text-xs text-ink-muted">
              {c}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------ experience */

const KIND_LABEL: Record<RoleKind, string> = {
  research: "Research",
  software: "Software",
  teaching: "Teaching",
  hardware: "Hardware",
  media: "AV & broadcast",
};

export function ExperiencePanel() {
  return (
    <div className="space-y-4">
      <p className="text-sm leading-relaxed text-ink-soft">
        Newest first. A glowing green LED means I&apos;m still in that role today.
      </p>
      <p className="rounded-md border border-copper/25 bg-white/40 px-3 py-2 text-sm text-ink-soft">
        <span className="font-semibold text-ink-strong">Education:</span> {education.school}, {education.degree} ({education.period}).{" "}
        <PageLink to="about" className="font-semibold text-rose-ink underline decoration-rose-ink/40 underline-offset-2">
          more on About
        </PageLink>
      </p>

      {/* the timeline is a copper trace; each role is a solder point on it */}
      <ol className="relative ml-1.5 space-y-4 border-l-2 border-copper/45 pl-5">
        {experience.map((r) => (
          <li key={r.id} className="relative">
            <span
              aria-hidden
              className={`absolute -left-[27px] top-4 h-3 w-3 rounded-full ring-[3px] ring-folder ${
                r.current ? "anim-led bg-mintled" : "bg-copper"
              }`}
            />
            <article className="rounded-md border border-copper/25 bg-white/45 p-3.5">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                <h3 className="text-[0.95rem] font-semibold text-ink-strong">{r.title}</h3>
                <p className="text-xs font-medium text-ink-muted">
                  {r.current && <span className="sr-only">Current role, </span>}
                  {r.period}
                </p>
              </div>
              <p className="text-sm font-semibold text-copper-ink">{r.org}</p>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-ink-muted">
                <span>{r.location}</span>
                <span className="rounded-full border border-copper/35 px-2 py-0.5 text-copper-ink">{KIND_LABEL[r.kind]}</span>
              </div>
              <ul className="mt-2 space-y-1">
                {r.bullets.map((b) => (
                  <li key={b} className="flex gap-2 text-sm leading-snug text-ink-soft">
                    <span className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-copper" aria-hidden />
                    {b}
                  </li>
                ))}
              </ul>
              {r.more && (
                <PageLink
                  to={r.more.to}
                  className="mt-2.5 inline-flex items-center gap-1 font-hand text-hand-md text-rose-ink hover:underline"
                >
                  {r.more.label} <ArrowRight size={14} aria-hidden />
                </PageLink>
              )}
            </article>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* -------------------------------------------------------------- research */

const WORK_ICONS: LucideIcon[] = [Waves, LineChart, BellRing];

export function ResearchPanel() {
  return (
    <div className="space-y-5">
      <p className="text-sm leading-relaxed text-glass-soft">{research.intro}</p>
      <p className="text-sm text-glass-muted">
        <span className="font-semibold text-glass-strong">{research.lab}</span> · Undergraduate Researcher · {research.period}
      </p>

      <section aria-labelledby="research-work">
        <h3 id="research-work" className="mb-2 font-hand text-hand-lg text-pink">
          what I work on
        </h3>
        <ul className="space-y-2.5">
          {research.work.map((w, i) => {
            const Icon = WORK_ICONS[i % WORK_ICONS.length];
            return (
              <li key={w.title} className="flex gap-3 rounded-lg border border-lavender/25 bg-white/[0.05] p-3">
                <Icon size={18} className="mt-0.5 shrink-0 text-lavender" aria-hidden />
                <div>
                  <p className="text-sm font-semibold text-glass-strong">{w.title}</p>
                  <p className="text-sm leading-snug text-glass-soft">{w.detail}</p>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {research.tools.map((t) => (
            <span key={t} className="rounded-full border border-lavender/40 px-2.5 py-0.5 text-xs text-glass-muted">
              {t}
            </span>
          ))}
        </div>
      </section>

      <section aria-labelledby="research-pubs">
        <h3 id="research-pubs" className="mb-2 font-hand text-hand-lg text-pink">
          publications
        </h3>
        <ul className="divide-y divide-white/10 rounded-lg border border-lavender/25">
          {research.publications.map((p) => (
            <li key={p.venue} className="flex items-center gap-3 px-3 py-2.5">
              <PenLine size={15} className="shrink-0 text-lavender" aria-hidden />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-glass-strong">{p.venue}</p>
                <p className="text-xs text-glass-muted">{p.status}</p>
              </div>
              <span className="shrink-0 rounded-full bg-pink/15 px-2.5 py-0.5 text-xs font-medium text-glass-strong">
                {p.role}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <p className="text-sm text-glass-soft">
        Earlier research: predicting exoplanet orbital periods from NASA stellar flux data (92% accuracy).{" "}
        <PageLink to="projects" className="font-semibold text-pink underline decoration-pink/40 underline-offset-2">
          see it in Projects
        </PageLink>
      </p>
    </div>
  );
}

/* -------------------------------------------------------------- projects */

export function ProjectsPanel() {
  return (
    <div className="space-y-4">
      <p className="text-sm leading-relaxed text-glass-soft">{projectsIntro}</p>
      <div className="grid gap-3">
        {projects.map((p) => (
          <ProjectArtifact key={p.id} project={p} />
        ))}
      </div>
      <p className="text-sm text-glass-soft">
        The EDMA event app I built as an intern lives on the{" "}
        <PageLink to="experience" className="font-semibold text-pink underline decoration-pink/40 underline-offset-2">
          Experience page
        </PageLink>
        .
      </p>
    </div>
  );
}

/* ---------------------------------------------------------------- skills */

export function SkillsPanel() {
  return (
    <div className="space-y-4">
      <p className="text-sm leading-relaxed text-glass-soft">{skills.intro}</p>
      <div className="space-y-3.5">
        {skills.groups.map((g) => (
          <section key={g.label} aria-label={g.label}>
            <h3 className="mb-1.5 font-mono text-xs font-semibold uppercase tracking-wide text-circuit">{g.label}</h3>
            <div className="flex flex-wrap gap-1.5">
              {g.items.map((s) => (
                <span key={s} className="rounded border border-circuit/35 px-2 py-0.5 text-sm text-glass-soft">
                  {s}
                </span>
              ))}
            </div>
          </section>
        ))}
        <section aria-label="Coursework">
          <h3 className="mb-1.5 font-mono text-xs font-semibold uppercase tracking-wide text-circuit">Coursework</h3>
          <ul className="grid grid-cols-1 gap-1 text-sm text-glass-soft sm:grid-cols-2">
            {education.coursework.map((c) => (
              <li key={c} className="flex items-start gap-1.5">
                <span className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-circuit" aria-hidden /> {c}
              </li>
            ))}
          </ul>
        </section>
      </div>
      <p className="text-sm text-glass-soft">
        Certifications are on the{" "}
        <PageLink to="awards" className="font-semibold text-circuit underline decoration-circuit/40 underline-offset-2">
          Awards page
        </PageLink>
        .
      </p>
    </div>
  );
}

/* ---------------------------------------------------------------- awards */

export function AwardsPanel() {
  return (
    <div className="space-y-4">
      <ul className="space-y-3">
        {awards.map((a) => (
          <li key={a.title} className="flex items-start justify-between gap-3 rounded-md border border-copper/30 bg-white/40 p-3">
            <div>
              <p className="text-sm font-semibold text-ink-strong">{a.title}</p>
              <p className="text-sm text-ink-muted">{a.org}</p>
            </div>
            <div className="shrink-0 text-right">
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-semibold uppercase tracking-wide ${
                  a.tier === "national" ? "bg-hotpink/15 text-rose-ink" : "bg-orchid/15 text-copper-ink"
                }`}
              >
                {a.tier}
              </span>
              <p className="mt-1 text-xs text-ink-muted">{a.year}</p>
            </div>
          </li>
        ))}
      </ul>

      <section aria-labelledby="certs-heading">
        <h3 id="certs-heading" className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-ink-muted">
          Certifications
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {certifications.map((c) => (
            <span
              key={c}
              className="inline-flex items-center gap-1.5 rounded-full border border-copper/35 bg-white/40 px-2.5 py-1 text-sm text-ink-soft"
            >
              <BadgeCheck size={13} className="text-copper-ink" aria-hidden />
              {c}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}

/* --------------------------------------------------------------- contact */

export function ContactPanel() {
  return (
    <div className="space-y-4">
      <p className="text-sm leading-relaxed text-ink-soft">{contact.intro}</p>
      <ul className="space-y-2">
        {contact.lines.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="flex items-center justify-between gap-3 rounded-md border border-hotpink/25 bg-blush/30 px-3 py-2.5 text-sm transition-colors hover:bg-blush/60"
            >
              <span className="font-semibold text-ink-strong">{l.label}</span>
              <span className="truncate text-ink-soft">{l.value}</span>
            </a>
          </li>
        ))}
      </ul>
      <p className="font-hand text-hand-md text-rose-ink">reach out anytime, I love a good project idea ♡</p>
    </div>
  );
}

/* ----------------------------------------------------- page-flip footer */

/** Notebook-style page turner: previous page, "page n of 7", next page. */
export function PageFooter({
  id,
  family,
  onStart,
}: {
  id: PageId;
  family: "light" | "dark";
  /** where "back to start" goes; mobile has no contents page, so it closes instead */
  onStart?: () => void;
}) {
  const { open } = usePageNav();
  const i = pageOrder.indexOf(id);
  const prev = i > 0 ? pageOrder[i - 1] : null;
  const next = i < pageOrder.length - 1 ? pageOrder[i + 1] : null;
  const goStart = onStart ?? (() => open("start"));

  const btn =
    family === "light"
      ? "text-ink-soft hover:bg-ink-strong/[0.07] hover:text-ink-strong"
      : "text-glass-soft hover:bg-white/10 hover:text-glass-strong";
  const muted = family === "light" ? "text-ink-muted" : "text-glass-muted";

  return (
    <nav
      aria-label="Page navigation"
      className={`flex items-center justify-between gap-2 border-t px-3 py-2 ${
        family === "light" ? "border-ink-strong/10" : "border-white/10"
      }`}
    >
      {prev ? (
        <button
          type="button"
          onClick={() => (prev === "start" ? goStart() : open(prev))}
          className={`inline-flex min-w-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${btn}`}
        >
          <ArrowLeft size={14} aria-hidden className="shrink-0" />
          <span className="truncate">{prev === "start" ? "Start" : pageMeta(prev).label}</span>
        </button>
      ) : (
        <span />
      )}
      <span className={`shrink-0 font-hand text-hand-sm ${muted}`}>
        {id === "start" ? "contents" : `page ${i} of ${sections.length}`}
      </span>
      {next ? (
        <button
          type="button"
          onClick={() => open(next)}
          className={`inline-flex min-w-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold transition-colors ${btn}`}
        >
          <span className="truncate">{pageMeta(next).label}</span>
          <ArrowRight size={14} aria-hidden className="shrink-0" />
        </button>
      ) : (
        <button
          type="button"
          onClick={goStart}
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold transition-colors ${btn}`}
        >
          <RotateCcw size={13} aria-hidden /> Back to start
        </button>
      )}
    </nav>
  );
}

export const PANEL_CONTENT: Record<PageId, React.ComponentType> = {
  start: StartHerePanel,
  about: AboutPanel,
  experience: ExperiencePanel,
  research: ResearchPanel,
  projects: ProjectsPanel,
  skills: SkillsPanel,
  awards: AwardsPanel,
  contact: ContactPanel,
};
