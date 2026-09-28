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
  PenLine,
  Database,
  Users,
  Server,
  ChevronDown,
  Copy,
  Check,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { LucideIcon } from "lucide-react";
import type { PageId, RoleKind, ResearchArea, ResearchItem } from "@/lib/content";
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
import { useVisited } from "@/lib/visited";

export const PANEL_META: Record<PageId, { variant: PanelVariant; icon: LucideIcon; wide?: boolean }> = {
  start: { variant: "notebook", icon: Compass },
  about: { variant: "notebook", icon: Heart },
  experience: { variant: "folder", icon: Briefcase },
  research: { variant: "window", icon: Activity, wide: true },
  projects: { variant: "window", icon: Sparkles },
  skills: { variant: "schematic", icon: Cpu },
  awards: { variant: "folder", icon: Trophy },
  contact: { variant: "casefile", icon: Mail },
};

const pad = (n: number) => String(n).padStart(2, "0");

/* ------------------------------------------------------------ start here */

/** Who Reyna is, then her research up front. Shared by the desktop contents page and the mobile landing. */
export function StartIntro({ tone = "light" }: { tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  const f = intro.featured;
  return (
    <div className="space-y-3.5">
      <div>
        <p className={`font-hand text-hand-xl leading-none ${dark ? "text-pink" : "text-rose-ink"}`}>{intro.greeting}</p>
        <p className={`mt-2 text-[0.95rem] leading-relaxed ${dark ? "text-glass-soft" : "text-ink-strong"}`}>
          {intro.summary}
        </p>
      </div>

      {/* the spotlight: a little oscilloscope screen set into the page */}
      <section
        aria-labelledby="featured-research"
        className="relative overflow-hidden rounded-xl border border-pink/40 bg-gradient-to-br from-[#2a1830] to-deepplum p-4 shadow-[0_14px_30px_-16px_rgba(42,24,48,0.8)]"
      >
        <svg viewBox="0 0 400 60" className="pointer-events-none absolute inset-x-0 bottom-0 h-16 w-full opacity-25" preserveAspectRatio="none" aria-hidden>
          <path
            d="M0 40 H120 L135 40 L145 12 L158 56 L170 28 L180 40 H260 L272 40 L282 18 L294 52 L304 40 H400"
            fill="none"
            stroke="var(--led)"
            strokeWidth="2"
            className="anim-pulse-glow"
          />
        </svg>
        <p className="relative flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-pink">
          <span className="anim-led h-1.5 w-1.5 rounded-full bg-mintled" aria-hidden />
          {f.kicker}
        </p>
        <h3 id="featured-research" className="relative mt-1 font-hand text-hand-lg leading-tight text-glass-strong">
          {f.title}
        </h3>
        <p className="relative mt-1 text-sm leading-snug text-glass-soft">{f.detail}</p>
        <div className="relative mt-3 flex flex-wrap items-end justify-between gap-3">
          <dl className="flex flex-wrap gap-x-5 gap-y-1">
            {f.stats.map((st) => (
              <div key={st.label} className="flex items-baseline gap-1.5">
                <dt className="sr-only">{st.label}</dt>
                <dd className="font-mono text-lg font-semibold text-circuit">{st.value}</dd>
                <dd className="text-xs text-glass-muted" aria-hidden>
                  {st.label}
                </dd>
              </div>
            ))}
          </dl>
          <PageLink
            to="research"
            className="inline-flex items-center gap-2 rounded-full bg-pink px-4 py-2 text-sm font-semibold text-deepplum shadow-sm transition-colors hover:bg-blush"
          >
            Read my research <ArrowRight size={15} aria-hidden />
          </PageLink>
        </div>
      </section>
    </div>
  );
}

/** Desktop landing page: intro, a table of contents mapping pages to desk objects, and two clear ways in. */
export function StartHerePanel() {
  const visited = useVisited();
  return (
    <div className="space-y-5">
      <StartIntro />

      <nav aria-labelledby="contents-heading">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3">
          <h3 id="contents-heading" className="hand-underline font-hand text-hand-lg text-rose-ink">
            contents
          </h3>
          <p className="text-xs text-ink-muted">
            click an object on the desk, use the dock, or flip through in order. a few unlabeled things are clickable too ♡
          </p>
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
                    <span className="font-semibold text-ink-strong group-hover:text-rose-ink">
                      {s.label}
                      {s.featured && (
                        <span className="ml-1.5 rounded-full bg-hotpink/15 px-1.5 py-0.5 align-middle text-[0.65rem] font-semibold uppercase tracking-wide text-rose-ink">
                          featured
                        </span>
                      )}
                      {visited.includes(s.id) && (
                        <span className="ml-1.5 align-middle text-[0.7rem] font-semibold text-copper-ink">✓ read</span>
                      )}
                    </span>
                    <span className="truncate font-hand text-hand-sm text-ink-muted">{s.object}</span>
                  </span>
                  <span className="block truncate text-xs text-ink-soft">{s.blurb}</span>
                </span>
              </PageLink>
            </li>
          ))}
        </ol>
      </nav>

    </div>
  );
}

/* ----------------------------------------------------------------- about */

export function AboutPanel() {
  return (
    <div className="space-y-5">
      <p className="font-hand text-hand-xl text-rose-ink">{about.greeting}</p>
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

const AREA_ICON: Record<ResearchArea, LucideIcon> = {
  data: Database,
  analysis: LineChart,
  people: Users,
  comms: PenLine,
  infra: Server,
};

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function ResearchCard({ item, showArea = true }: { item: ResearchItem; showArea?: boolean }) {
  const Icon = AREA_ICON[item.area];
  return (
    <li className="flex flex-col rounded-lg border border-lavender/25 bg-white/[0.05] p-3.5 transition-colors hover:border-pink/50 hover:bg-white/[0.08]">
      {showArea && (
        <p className="mb-1 flex items-center gap-1.5 text-xs font-medium text-glass-muted">
          <Icon size={13} className="text-lavender" aria-hidden />
          {research.areas[item.area]}
        </p>
      )}
      <h4 className=" text-[0.95rem] font-semibold leading-snug text-glass-strong">{item.title}</h4>
      <p className="mt-1 text-sm leading-snug text-glass-soft">{item.detail}</p>
      <div className="mt-auto flex flex-wrap gap-1 pt-2.5">
        {item.skills.map((sk) => (
          <span key={sk} className="rounded border border-circuit/30 px-1.5 py-0.5 font-mono text-[0.7rem] text-circuit">
            {sk}
          </span>
        ))}
      </div>
    </li>
  );
}

export function ResearchPanel() {
  const highlights = research.items.filter((i) => i.featured);
  const areas = Object.keys(research.areas) as ResearchArea[];
  const moreCount = research.items.length - highlights.length;
  return (
    <div className="space-y-6">
      {/* headline */}
      <header>
        <p className="text-xs font-semibold uppercase tracking-wide text-glass-muted">
          {research.lab} · {research.role} · {research.period}
        </p>
        <p className="mt-1.5 font-hand text-hand-xl leading-tight text-glass-strong">{research.headline}</p>
        <p className="mt-2 text-sm leading-relaxed text-glass-soft">{research.intro}</p>
      </header>

      {/* at a glance */}
      <dl className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {research.stats.map((st) => (
          <div key={st.label} className="flex flex-col-reverse justify-end rounded-lg border border-circuit/25 bg-[#150c1c] p-3">
            <dt className="mt-1.5 text-xs leading-snug text-glass-soft">{st.label}</dt>
            <dd className="font-mono text-2xl font-semibold leading-none text-circuit">{st.value}</dd>
          </div>
        ))}
      </dl>

      {/* on this page */}
      <nav aria-label="On this page" className="flex flex-wrap items-center gap-2 text-sm">
        <span className="font-hand text-hand-md text-glass-muted">jump to:</span>
        {[
          ["research-flow", "How it fits together"],
          ["research-pubs", "Publications"],
          ["research-highlights", "Highlights"],
          ["research-more", `Everything else (${moreCount})`],
        ].map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => scrollToId(id)}
            className="rounded-full border border-lavender/35 px-2.5 py-0.5 text-glass-soft transition-colors hover:border-pink hover:text-glass-strong"
          >
            {label}
          </button>
        ))}
      </nav>

      {/* the signal chain, drawn like probes along a trace */}
      <section id="research-flow" aria-labelledby="research-flow-h" className="scroll-mt-4">
        <h3 id="research-flow-h" className="hand-underline mb-2 font-hand text-hand-lg text-pink">
          how it fits together
        </h3>
        <ol className="grid gap-2 sm:grid-cols-5">
          {research.flow.map((f, i) => (
            <li key={f.step} className="relative rounded-lg border border-pink/30 bg-white/[0.04] p-2.5">
              <p className="flex items-center gap-1.5 font-mono text-xs text-circuit">
                <span className="grid h-4 w-4 place-items-center rounded-full bg-circuit/15 text-[0.65rem]">{i + 1}</span>
                {f.step}
              </p>
              <p className="mt-1 text-xs leading-snug text-glass-soft">{f.detail}</p>
              {i < research.flow.length - 1 && (
                <span
                  aria-hidden
                  className="absolute -right-2 top-1/2 z-10 hidden -translate-y-1/2 text-sm text-pink sm:block"
                >
                  ›
                </span>
              )}
            </li>
          ))}
        </ol>
      </section>

      {/* publications */}
      <section id="research-pubs" aria-labelledby="research-pubs-h" className="scroll-mt-4">
        <h3 id="research-pubs-h" className="hand-underline mb-2 font-hand text-hand-lg text-pink">
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
        <p className="mt-2 text-sm text-glass-soft">{research.publicationTopics}</p>
      </section>

      {/* the 8 strongest pieces of work */}
      <section id="research-highlights" aria-labelledby="research-highlights-h" className="scroll-mt-4">
        <h3 id="research-highlights-h" className="hand-underline mb-2 font-hand text-hand-lg text-pink">
          highlights
        </h3>
        <ul className="grid gap-2.5 sm:grid-cols-2">
          {highlights.map((item) => (
            <ResearchCard key={item.title} item={item} />
          ))}
        </ul>
      </section>

      {/* everything else, folded by area so the page stays skimmable */}
      <section id="research-more" aria-labelledby="research-more-h" className="scroll-mt-4">
        <h3 id="research-more-h" className="hand-underline font-hand text-hand-lg text-pink">
          everything else, by area
        </h3>
        <p className="mb-2 text-sm text-glass-muted">Tap an area to open it.</p>
        <div className="space-y-2">
          {areas.map((area) => {
            const items = research.items.filter((i) => i.area === area && !i.featured);
            if (items.length === 0) return null;
            const Icon = AREA_ICON[area];
            return (
              <details key={area} className="group rounded-lg border border-lavender/25 open:bg-white/[0.03]">
                <summary className="flex cursor-pointer list-none items-center gap-2.5 rounded-lg px-3 py-2.5 transition-colors hover:bg-white/[0.06] [&::-webkit-details-marker]:hidden">
                  <Icon size={16} className="shrink-0 text-lavender" aria-hidden />
                  <span className="flex-1 text-sm font-semibold text-glass-strong">{research.areas[area]}</span>
                  <span className="font-mono text-xs text-glass-muted">{items.length}</span>
                  <ChevronDown size={15} className="text-glass-muted transition-transform group-open:rotate-180" aria-hidden />
                </summary>
                <ul className="grid gap-2.5 px-3 pb-3 sm:grid-cols-2">
                  {items.map((item) => (
                    <ResearchCard key={item.title} item={item} showArea={false} />
                  ))}
                </ul>
              </details>
            );
          })}
        </div>
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

/** Copies the address for anyone without a mail app set up (mailto: links do nothing there). */
function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(t);
  }, [copied]);
  return (
    <button
      type="button"
      onClick={() => navigator.clipboard?.writeText(text).then(() => setCopied(true), () => {})}
      aria-label={copied ? `${label} copied` : `Copy ${label}`}
      className="inline-flex shrink-0 items-center gap-1 rounded-md border border-hotpink/25 bg-blush/30 px-2.5 text-xs font-semibold text-ink-soft transition-colors hover:bg-blush/60 hover:text-ink-strong"
    >
      {copied ? <Check size={13} aria-hidden /> : <Copy size={13} aria-hidden />}
      <span aria-live="polite">{copied ? "copied" : "copy"}</span>
    </button>
  );
}

export function ContactPanel() {
  return (
    <div className="space-y-4">
      <p className="text-sm leading-relaxed text-ink-soft">{contact.intro}</p>
      <ul className="space-y-2">
        {contact.lines.map((l) => (
          <li key={l.label} className="flex items-stretch gap-2">
            <a
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="flex min-w-0 flex-1 items-center justify-between gap-3 rounded-md border border-hotpink/25 bg-blush/30 px-3 py-2.5 text-sm transition-colors hover:bg-blush/60"
            >
              <span className="font-semibold text-ink-strong">{l.label}</span>
              <span className="truncate text-ink-soft">{l.value}</span>
              {l.href.startsWith("http") && <span className="sr-only"> (opens in a new tab)</span>}
            </a>
            {l.href.startsWith("mailto:") && <CopyButton text={l.value} label={`${l.label.toLowerCase()} address`} />}
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
  const { open, close } = usePageNav();
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
      ) : id === "start" && !onStart ? (
        <button
          type="button"
          onClick={close}
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${btn}`}
        >
          Explore the desk ✦
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
