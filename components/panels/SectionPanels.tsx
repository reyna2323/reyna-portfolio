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
  BriefcaseBusiness,
  CodeXml,
  ArrowUpRight,
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
  validationStudy,
} from "@/lib/content";
import { PageLink, usePageNav } from "@/lib/pageNav";
import { ProjectArtifact } from "./ProjectArtifact";
import { CountUp } from "./CountUp";
import { ValidationCaseStudy } from "./ValidationCaseStudy";
import { useVisited } from "@/lib/visited";

export const PANEL_META: Record<PageId, { variant: PanelVariant; icon: LucideIcon; wide?: boolean }> = {
  start: { variant: "notebook", icon: Compass },
  // the deep dive is a page of the engineering notebook, and wide enough for its figures
  validation: { variant: "notebook", icon: BadgeCheck, wide: true },
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
            click any labeled object on the desk, use the dock, or flip through in order. a few unlabeled things are clickable too ♡
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
            <span key={c} className="rounded-full bg-ink-strong/[0.07] px-2 py-0.5 text-xs text-ink-muted">
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
        Current roles first, research leading. A glowing green LED means I&apos;m still in that role today.
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
                <span className="rounded-full bg-copper/15 px-2 py-0.5 text-copper-ink">{KIND_LABEL[r.kind]}</span>
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

/* one colour per area, all readable on the dark research window */
const AREA_TONE: Record<ResearchArea, { text: string; border: string; top: string; fill: string }> = {
  data: { text: "text-circuit", border: "border-circuit/40", top: "border-t-circuit/70", fill: "bg-circuit/75" },
  analysis: { text: "text-lavender", border: "border-lavender/40", top: "border-t-lavender/70", fill: "bg-lavender/75" },
  people: { text: "text-pink", border: "border-pink/40", top: "border-t-pink/70", fill: "bg-pink/75" },
  comms: { text: "text-rosegold", border: "border-rosegold/40", top: "border-t-rosegold/70", fill: "bg-rosegold/75" },
  infra: { text: "text-blush", border: "border-blush/35", top: "border-t-blush/60", fill: "bg-blush/65" },
};

const RESEARCH_AREAS = Object.keys(research.areas) as ResearchArea[];

/* every skill used across the lab work, with how often it shows up and the
   area it belongs to most, for the skills map */
const SKILL_INDEX = (() => {
  const found = new Map<string, { count: number; byArea: Partial<Record<ResearchArea, number>> }>();
  for (const item of research.items) {
    for (const sk of item.skills) {
      const entry = found.get(sk) ?? { count: 0, byArea: {} };
      entry.count += 1;
      entry.byArea[item.area] = (entry.byArea[item.area] ?? 0) + 1;
      found.set(sk, entry);
    }
  }
  return [...found].map(([name, { count, byArea }]) => ({
    name,
    count,
    area: RESEARCH_AREAS.reduce((best, a) => ((byArea[a] ?? 0) > (byArea[best] ?? 0) ? a : best), RESEARCH_AREAS[0]),
  }));
})();

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}


/* four live traces for the signals tile, each a different shape of body data */
const SIGNAL_WAVES = [
  { label: "HR", d: "M0 6 H6 L8 1 L10 11 L12 6 H26 L28 1 L30 11 L32 6 H40", color: "var(--led)" },
  { label: "EDA", d: "M0 9 C8 9 10 3 16 3 S26 8 32 5 S38 6 40 9", color: "var(--lavender)" },
  { label: "TEMP", d: "M0 7 Q10 4 20 6 T40 7", color: "var(--rosegold)" },
  { label: "SpO₂", d: "M0 4 H12 Q14 8 16 4 H32 Q34 8 36 4 H40", color: "var(--circuit)" },
];

/** The little instrument drawn on each research stat tile, showing the number instead of just saying it. */
function StatViz({ kind }: { kind?: string }) {
  if (kind === "people") {
    // one dot per participant, lighting up in turn
    return (
      <span aria-hidden className="grid grid-cols-10 gap-[3px]">
        {Array.from({ length: 20 }, (_, i) => (
          <span key={i} className="pip h-[5px] w-[5px] rounded-full bg-circuit" style={{ animationDelay: `${i * 0.09}s` }} />
        ))}
      </span>
    );
  }
  if (kind === "services") {
    // six services chained together, with a pulse of data running through them
    return (
      <span aria-hidden className="relative flex items-center gap-[7px] py-1">
        <span className="absolute inset-x-1 top-1/2 h-px -translate-y-1/2 bg-circuit/45" />
        <span className="svc-pulse absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-led shadow-[0_0_6px_var(--led)]" />
        {Array.from({ length: 6 }, (_, i) => (
          <span key={i} className="relative h-2 w-2 rounded-[2px] border border-circuit/80 bg-[#150c1c]" />
        ))}
      </span>
    );
  }
  if (kind === "signals") {
    return (
      <span aria-hidden className="flex flex-col gap-[2px]">
        {SIGNAL_WAVES.map((w) => (
          <span key={w.label} className="flex items-center gap-1">
            <span className="w-6 text-right font-mono text-[0.5rem] leading-none text-glass-muted">{w.label}</span>
            <svg viewBox="0 0 40 12" className="h-2.5 w-12 overflow-hidden">
              <g className="wave-scroll">
                {[0, 40].map((dx) => (
                  <path key={dx} d={w.d} transform={`translate(${dx} 0)`} fill="none" stroke={w.color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                ))}
              </g>
            </svg>
          </span>
        ))}
      </span>
    );
  }
  // three papers, each with a pink "in review" light
  return (
    <span aria-hidden className="flex items-end gap-1.5 pr-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="relative flex h-6 w-[18px] flex-col gap-[3px] rounded-[2px] bg-petal/90 p-[3px] shadow-[0_2px_6px_rgba(0,0,0,0.4)]"
          style={{ transform: `rotate(${(i - 1) * 7}deg)` }}
        >
          <span className="h-px w-full bg-plum/45" />
          <span className="h-px w-3/4 bg-plum/45" />
          <span className="h-px w-full bg-plum/45" />
          <span
            className="anim-pulse-glow absolute -right-1 -top-1 h-1.5 w-1.5 rounded-full bg-pink shadow-[0_0_6px_var(--pink)]"
            style={{ animationDelay: `${i * 0.5}s` }}
          />
        </span>
      ))}
    </span>
  );
}

const REVIEW_STEPS = ["written", "submitted", "under review", "decision"];

/** Where a paper is in the review process: done steps in mint, the current one pulsing pink. */
function ReviewPipeline({ current = 2 }: { current?: number }) {
  return (
    <ol aria-label={`Status: ${REVIEW_STEPS[current]}`} className="mt-1.5 flex flex-wrap items-center gap-y-1">
      {REVIEW_STEPS.map((step, i) => (
        <li key={step} className="flex items-center">
          {i > 0 && <span aria-hidden className={`mx-1 h-px w-3 sm:w-5 ${i <= current ? "bg-circuit/60" : "bg-white/15"}`} />}
          <span
            className={`flex items-center gap-1 whitespace-nowrap font-mono text-[0.65rem] ${
              i < current ? "text-circuit" : i === current ? "font-semibold text-pink" : "text-glass-muted"
            }`}
          >
            <span
              aria-hidden
              className={`h-1.5 w-1.5 rounded-full ${
                i < current
                  ? "bg-circuit"
                  : i === current
                    ? "anim-pulse-glow bg-pink shadow-[0_0_6px_var(--pink)]"
                    : "border border-glass-muted/70"
              }`}
            />
            {step}
            {i < current && <span aria-hidden>✓</span>}
          </span>
        </li>
      ))}
    </ol>
  );
}

/** A scope-style channel tag for each section heading on the research page. */
function ChannelTag({ n }: { n: number }) {
  return (
    <span
      aria-hidden
      className="mr-2 inline-block -translate-y-0.5 rounded border border-circuit/45 bg-[#150c1c] px-1.5 py-px align-middle font-mono text-[0.62rem] font-semibold not-italic tracking-wide text-circuit"
    >
      CH{n}
    </span>
  );
}

/** Where I sit in a paper's author list, as a little strip of dots with mine lit. */
function AuthorStrip({ position }: { position: number }) {
  return (
    <span aria-hidden className="flex items-center gap-[3px]">
      {Array.from({ length: position }, (_, i) =>
        i === position - 1 ? (
          <span key={i} className="anim-pulse-glow h-2.5 w-2.5 rounded-full bg-pink shadow-[0_0_8px_var(--pink)]" />
        ) : (
          <span key={i} className="h-1.5 w-1.5 rounded-full bg-lavender/45" />
        ),
      )}
    </span>
  );
}

function SkillChip({
  name,
  active,
  onSkill,
  className = "",
}: {
  name: string;
  active: boolean;
  onSkill: (sk: string) => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onSkill(name)}
      aria-pressed={active}
      title={active ? "Clear this filter" : `Show all work using ${name}`}
      className={`rounded border px-1.5 py-0.5 font-mono text-[0.7rem] transition-colors ${
        active ? "border-pink bg-pink text-deepplum" : `border-circuit/55 text-circuit hover:border-pink hover:bg-pink/10 hover:text-glass-strong`
      } ${className}`}
    >
      {name}
    </button>
  );
}

function ResearchCard({
  item,
  showArea = true,
  activeSkill,
  onSkill,
  index,
}: {
  item: ResearchItem;
  showArea?: boolean;
  activeSkill: string | null;
  onSkill: (sk: string) => void;
  index?: number;
}) {
  const Icon = AREA_ICON[item.area];
  const tone = AREA_TONE[item.area];
  return (
    <li
      className={`relative flex flex-col rounded-lg border border-t-2 border-lavender/25 ${tone.top} bg-white/[0.05] p-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-pink/50 hover:bg-white/[0.08] hover:shadow-[0_12px_28px_-10px_rgba(236,143,189,0.45)]`}
    >
      {index !== undefined && (
        <span aria-hidden className="absolute right-3 top-2.5 font-mono text-[0.7rem] text-glass-muted">
          {String(index).padStart(2, "0")}
        </span>
      )}
      {showArea && (
        <p className={`mb-1 flex items-center gap-1.5 text-xs font-medium ${tone.text}`}>
          <Icon size={13} aria-hidden />
          {research.areas[item.area]}
        </p>
      )}
      <h4 className="text-[0.95rem] font-semibold leading-snug text-glass-strong">{item.title}</h4>
      <p className="mt-1 text-sm leading-snug text-glass-soft">{item.detail}</p>
      <div className="mt-auto flex flex-wrap gap-1 pt-2.5">
        {item.skills.map((sk) => (
          <SkillChip key={sk} name={sk} active={sk === activeSkill} onSkill={onSkill} />
        ))}
      </div>
    </li>
  );
}

export function ResearchPanel() {
  const highlights = research.items.filter((i) => i.featured);
  const moreCount = research.items.length - highlights.length;
  const [skill, setSkill] = useState<string | null>(null);
  const matches = skill ? research.items.filter((i) => i.skills.includes(skill)) : [];

  const pickSkill = (sk: string) => {
    const next = sk === skill ? null : sk;
    setSkill(next);
    if (next) requestAnimationFrame(() => scrollToId("research-skills"));
  };

  return (
    <div className="scope-grid space-y-7">
      {/* headline, with a heartbeat sweeping across behind it like the lab's monitors */}
      <header className="relative">
        <svg
          viewBox="0 0 400 60"
          preserveAspectRatio="none"
          className="pointer-events-none absolute -top-2 right-0 h-14 w-full opacity-30 sm:w-3/5"
          aria-hidden
        >
          <path
            className="ecg-sweep"
            pathLength={1}
            d="M0 36 H90 L102 36 L110 12 L122 54 L132 26 L140 36 H230 L240 36 L248 18 L258 50 L266 36 H400"
            fill="none"
            stroke="var(--led)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ filter: "drop-shadow(0 0 4px var(--led))" }}
          />
        </svg>
        <p className="relative text-xs font-semibold uppercase tracking-wide text-glass-muted">
          {research.lab} · {research.role} · {research.period}
          <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-circuit/10 px-2 py-0.5 align-middle text-[0.65rem] normal-case tracking-normal text-circuit">
            <span aria-hidden className="anim-led h-1.5 w-1.5 rounded-full bg-mintled shadow-[0_0_6px_var(--mintled)]" />
            current role
          </span>
        </p>
        <p className="relative mt-1.5 font-hand text-hand-xl leading-tight text-glass-strong">{research.headline}</p>
        <p className="relative mt-2 text-sm leading-relaxed text-glass-soft">{research.intro}</p>
      </header>

      {/* at a glance: the numbers count up as the page opens */}
      <dl className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {research.stats.map((st) => (
          <div
            key={st.label}
            className="relative flex flex-col-reverse justify-end overflow-hidden rounded-lg border border-circuit/25 bg-[#150c1c] p-3 shadow-[inset_0_0_24px_rgba(125,232,194,0.06)]"
          >
            <dt className="mt-2 text-xs leading-snug text-glass-soft">{st.label}</dt>
            <dd className="flex items-start justify-between gap-2">
              <span className="font-mono text-3xl font-semibold leading-none text-circuit" style={{ textShadow: "0 0 14px rgba(125,232,194,0.45)" }}>
                <CountUp value={st.value} />
              </span>
              <StatViz kind={st.viz} />
            </dd>
            <span aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-circuit/60 to-transparent" />
          </div>
        ))}
      </dl>

      {/* the deep dive: a notebook page tucked into the research window */}
      <PageLink
        to="validation"
        className="group relative block -rotate-[0.4deg] rounded-md border border-pink/40 bg-paper px-5 pb-4 pt-5 text-left shadow-[0_18px_36px_-18px_rgba(0,0,0,0.8)] transition-transform graph-paper hover:-translate-y-0.5 hover:rotate-0"
      >
        <span aria-hidden className="absolute -top-2 left-10 h-5 w-20 rotate-[-4deg] rounded-sm bg-lavender/70" />
        <span className="block text-xs font-semibold uppercase tracking-wide text-rose-ink">case study · the validation layer</span>
        <span className="mt-1 block font-hand text-hand-lg leading-tight text-ink-strong">{validationStudy.title}</span>
        <span className="mt-1.5 block text-sm text-ink-soft">
          Six failure modes, the one that fooled me first, and interactive plots where you can break the pipeline yourself.
        </span>
        <span className="mt-2 flex flex-wrap items-center justify-between gap-2">
          <span className="font-hand text-[1.15rem] text-rose-ink">&ldquo;{validationStudy.lesson}&rdquo;</span>
          <span className="inline-flex items-center gap-1 rounded-full border border-ink-soft/60 px-3 py-1 text-xs font-semibold text-ink-strong transition-colors group-hover:border-ink-strong group-hover:bg-ink-strong/10">
            read the case study <ArrowRight size={13} aria-hidden />
          </span>
        </span>
      </PageLink>

      {/* on this page */}
      <nav aria-label="On this page" className="flex flex-wrap items-center gap-2 text-sm">
        <span className="font-hand text-hand-md text-glass-muted">jump to:</span>
        {[
          ["research-flow", "How it fits together"],
          ["research-pubs", "Publications"],
          ["research-skills", `Skills map (${SKILL_INDEX.length})`],
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

      {/* the signal chain: a live trace with a pulse of data travelling through each stage */}
      <section id="research-flow" aria-labelledby="research-flow-h" className="scroll-mt-4">
        <h3 id="research-flow-h" className="hand-underline mb-3 font-hand text-hand-lg text-pink">
          <ChannelTag n={1} />
          how it fits together
        </h3>
        <ol className="relative grid gap-4 sm:grid-cols-5 sm:gap-2">
          <span aria-hidden className="signal-trace" />
          <span aria-hidden className="signal-packet" />
          {research.flow.map((f, i) => (
            <li key={f.step} className="relative flex gap-3 sm:flex-col sm:items-center sm:gap-2 sm:text-center">
              <span
                className="signal-node relative z-10 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-circuit/60 bg-[#150c1c] font-mono text-[0.7rem] text-circuit"
                style={{ animationDelay: `${i * 0.7}s` }}
              >
                {i + 1}
              </span>
              <div className="min-w-0">
                <p className="font-mono text-xs font-semibold uppercase tracking-wide text-circuit">{f.step}</p>
                <p className="mt-0.5 text-xs leading-snug text-glass-soft">{f.detail}</p>
                <div className="mt-1.5 flex flex-wrap gap-1 sm:justify-center">
                  {f.tools.map((t) => (
                    <span key={t} className="rounded-full bg-white/[0.06] px-1.5 py-px font-mono text-[0.65rem] text-glass-muted">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* publications, each with where I sit in the author list */}
      <section id="research-pubs" aria-labelledby="research-pubs-h" className="scroll-mt-4">
        <h3 id="research-pubs-h" className="hand-underline mb-2 font-hand text-hand-lg text-pink">
          <ChannelTag n={2} />
          publications
        </h3>
        <ul className="divide-y divide-white/10 rounded-lg border border-lavender/25 bg-white/[0.02]">
          {research.publications.map((p) => (
            <li key={p.venue} className="flex items-start gap-3 px-3 py-3">
              <PenLine size={15} className="mt-0.5 shrink-0 text-lavender" aria-hidden />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5">
                  <p className="text-sm font-semibold text-glass-strong">{p.venue}</p>
                  <span className="flex shrink-0 items-center gap-2.5">
                    <AuthorStrip position={p.position} />
                    <span className="rounded-full bg-pink/15 px-2.5 py-0.5 text-xs font-medium text-glass-strong">{p.role}</span>
                  </span>
                </div>
                <ReviewPipeline />
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-2 text-sm text-glass-soft">{research.publicationTopics}</p>
      </section>

      {/* every skill from the lab work, grouped by area; pick one to see where it was used */}
      <section id="research-skills" aria-labelledby="research-skills-h" className="scroll-mt-4">
        <h3 id="research-skills-h" className="hand-underline font-hand text-hand-lg text-pink">
          <ChannelTag n={3} />
          skills map
        </h3>
        <p className="mb-3 mt-1 text-sm text-glass-muted">
          {`${SKILL_INDEX.length} skills across ${research.items.length} pieces of lab work. Pick one to see everywhere I've used it.`}
        </p>
        <div className="space-y-3 rounded-xl border border-lavender/20 bg-[#150c1c]/70 p-3.5">
          {/* how the skills split across the five areas */}
          <div aria-hidden className="flex h-2 gap-[3px] overflow-hidden rounded-full">
            {RESEARCH_AREAS.map((area, i) => (
              <span
                key={area}
                className={`grow-x h-full first:rounded-l-full last:rounded-r-full ${AREA_TONE[area].fill}`}
                style={{ width: `${(SKILL_INDEX.filter((sk) => sk.area === area).length / SKILL_INDEX.length) * 100}%`, animationDelay: `${i * 0.12}s` }}
              />
            ))}
          </div>
          {RESEARCH_AREAS.map((area) => {
            const Icon = AREA_ICON[area];
            const tone = AREA_TONE[area];
            const inArea = SKILL_INDEX.filter((sk) => sk.area === area).sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
            return (
              <div key={area} className="grid gap-1.5 sm:grid-cols-[13.5rem_1fr] sm:items-start sm:gap-3">
                <p className={`flex items-center gap-1.5 pt-1 text-xs font-semibold ${tone.text}`}>
                  <Icon size={14} aria-hidden />
                  {research.areas[area]}
                  <span className="font-mono font-normal opacity-70">{inArea.length}</span>
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {inArea.map((sk) => {
                    const active = sk.name === skill;
                    return (
                      <button
                        key={sk.name}
                        type="button"
                        onClick={() => pickSkill(sk.name)}
                        aria-pressed={active}
                        className={`rounded-full border px-2.5 py-1 transition-all ${
                          sk.count > 2 ? "text-sm font-semibold" : sk.count > 1 ? "text-[0.8rem] font-medium" : "text-xs"
                        } ${
                          active
                            ? "border-pink bg-pink text-deepplum shadow-[0_0_14px_rgba(236,143,189,0.55)]"
                            : `${tone.border} ${tone.text} hover:-translate-y-px hover:bg-white/[0.08]`
                        }`}
                      >
                        {sk.name}
                        {sk.count > 1 && <span className="ml-1 font-mono text-[0.65rem] opacity-75">×{sk.count}</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div aria-live="polite">
          {skill && (
            <div className="anim-fade-up mt-3 rounded-xl border border-pink/40 bg-pink/[0.06] p-3.5">
              <div className="mb-2.5 flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm text-glass-soft">
                  <span className="font-semibold text-glass-strong">{skill}</span> shows up in {matches.length}{" "}
                  {matches.length === 1 ? "piece" : "pieces"} of work
                </p>
                <button
                  type="button"
                  onClick={() => setSkill(null)}
                  className="rounded-full border border-lavender/35 px-2.5 py-0.5 text-xs text-glass-soft transition-colors hover:border-pink hover:text-glass-strong"
                >
                  clear ✕
                </button>
              </div>
              <ul className="grid gap-2.5 sm:grid-cols-2">
                {matches.map((item) => (
                  <ResearchCard key={item.title} item={item} activeSkill={skill} onSkill={pickSkill} />
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* the 8 strongest pieces of work */}
      <section id="research-highlights" aria-labelledby="research-highlights-h" className="scroll-mt-4">
        <h3 id="research-highlights-h" className="hand-underline mb-2 font-hand text-hand-lg text-pink">
          <ChannelTag n={4} />
          highlights
        </h3>
        <ul className="grid gap-2.5 sm:grid-cols-2">
          {highlights.map((item, i) => (
            <ResearchCard key={item.title} item={item} index={i + 1} activeSkill={skill} onSkill={pickSkill} />
          ))}
        </ul>
      </section>

      {/* everything else, folded by area so the page stays skimmable */}
      <section id="research-more" aria-labelledby="research-more-h" className="scroll-mt-4">
        <h3 id="research-more-h" className="hand-underline font-hand text-hand-lg text-pink">
          <ChannelTag n={5} />
          everything else, by area
        </h3>
        <p className="mb-2 text-sm text-glass-muted">Tap an area to open it.</p>
        <div className="space-y-2">
          {RESEARCH_AREAS.map((area) => {
            const items = research.items.filter((i) => i.area === area && !i.featured);
            if (items.length === 0) return null;
            const Icon = AREA_ICON[area];
            return (
              <details key={area} className="group rounded-lg border border-lavender/25 open:bg-white/[0.03]">
                <summary className="flex cursor-pointer list-none items-center gap-2.5 rounded-lg px-3 py-2.5 transition-colors hover:bg-white/[0.06] [&::-webkit-details-marker]:hidden">
                  <Icon size={16} className={`shrink-0 ${AREA_TONE[area].text}`} aria-hidden />
                  <span className="flex-1 text-sm font-semibold text-glass-strong">{research.areas[area]}</span>
                  <span className="font-mono text-xs text-glass-muted">{items.length}</span>
                  <ChevronDown size={15} className="text-glass-muted transition-transform group-open:rotate-180" aria-hidden />
                </summary>
                <ul className="grid gap-2.5 px-3 pb-3 sm:grid-cols-2">
                  {items.map((item) => (
                    <ResearchCard key={item.title} item={item} showArea={false} activeSkill={skill} onSkill={pickSkill} />
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

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const TODAY = new Date();
const THIS_MONTH = TODAY.getFullYear() * 12 + TODAY.getMonth();
/** "Jan 2025 to May 2025" (or "... to Present") -> month numbers counted from
 *  year 0, so spans can be laid on one axis; ongoing ones run to this month */
function monthSpan(period?: string): { span: [number, number]; ongoing: boolean } | null {
  const m = period?.match(/^(\w{3}) (\d{4}) to (?:(\w{3}) (\d{4})|Present)$/);
  if (!m) return null;
  const from = Number(m[2]) * 12 + MONTHS.indexOf(m[1]);
  if (!m[3]) return { span: [from, THIS_MONTH + 1], ongoing: true };
  return { span: [from, Number(m[4]) * 12 + MONTHS.indexOf(m[3]) + 1], ongoing: false };
}

const TIMELINE_BAR: Record<string, string> = {
  datasheet: "bg-rosegold",
  polaroid: "bg-pink",
  notebook: "bg-lavender",
  terminal: "bg-mintled",
};

/** A Gantt-style strip of every project over time; each row jumps to its card. */
function ProjectTimeline() {
  const rows = projects.flatMap((p) => {
    const parsed = monthSpan(p.period);
    return parsed ? [{ p, span: parsed.span, ongoing: parsed.ongoing }] : [];
  });
  if (rows.length === 0) return null;
  const start = Math.floor(Math.min(...rows.map((r) => r.span[0])) / 12) * 12;
  const end = Math.max(...rows.map((r) => r.span[1]));
  const total = end - start;
  const years = Array.from({ length: Math.ceil(total / 12) }, (_, i) => start / 12 + i);
  const pct = (month: number) => `${((month - start) / total) * 100}%`;

  const jump = (id: string) => {
    const card = document.getElementById(`project-${id}`);
    card?.scrollIntoView({ behavior: "smooth", block: "start" });
    card?.animate(
      [{ boxShadow: "0 0 0 0 rgba(236,143,189,0)" }, { boxShadow: "0 0 0 4px rgba(236,143,189,0.7)" }, { boxShadow: "0 0 0 0 rgba(236,143,189,0)" }],
      { duration: 1400, delay: 350, easing: "ease-out" },
    );
  };

  return (
    <section aria-label="Project timeline" className="rounded-xl border border-lavender/20 bg-[#150c1c]/70 p-3.5">
      <p className="mb-2 flex items-baseline justify-between font-hand text-hand-md text-glass-muted">
        <span>the timeline</span>
        <span className="font-sans text-xs">tap a bar to jump to it</span>
      </p>
      <div className="relative">
        {/* year gridlines */}
        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-[6.5rem] right-0">
          {years.map((y) => (
            <span key={y} className="absolute inset-y-0 border-l border-white/10" style={{ left: pct(y * 12) }}>
              <span className="absolute -top-0.5 left-1 font-mono text-[0.62rem] text-glass-muted">{y}</span>
            </span>
          ))}
        </div>
        <ul className="relative space-y-1.5 pt-4">
          {rows.map(({ p, span, ongoing }, i) => (
            <li key={p.id}>
              <button
                type="button"
                onClick={() => jump(p.id)}
                className="group grid w-full grid-cols-[6.5rem_1fr] items-center rounded text-left"
                aria-label={`${p.title}, ${p.period}. Jump to project.`}
              >
                <span className="truncate pr-2 text-xs font-medium text-glass-soft transition-colors group-hover:text-glass-strong">
                  {p.short ?? p.title}
                </span>
                <span className="relative h-4">
                  <span
                    className={`grow-x absolute inset-y-0 border border-white/35 ${TIMELINE_BAR[p.artifact]} opacity-80 transition-opacity group-hover:opacity-100 group-hover:shadow-[0_0_12px_rgba(236,143,189,0.6)] ${
                      ongoing ? "rounded-l-full border-r-0 [mask-image:linear-gradient(to_right,black_70%,transparent)]" : "rounded-full"
                    }`}
                    style={{ left: pct(span[0]), width: `${((span[1] - span[0]) / total) * 100}%`, animationDelay: `${i * 0.12}s` }}
                  />
                  {/* still going: a live dot at the end of the bar */}
                  {ongoing && (
                    <span
                      aria-hidden
                      className={`anim-pulse-glow absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full ${TIMELINE_BAR[p.artifact]} shadow-[0_0_8px_rgba(227,165,139,0.9)]`}
                      style={{ left: pct(span[1]) }}
                    />
                  )}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ProjectsPanel() {
  return (
    <div className="space-y-4">
      <p className="text-sm leading-relaxed text-glass-soft">{projectsIntro}</p>
      <ProjectTimeline />
      <div className="grid gap-4">
        {projects.map((p, i) => (
          <ProjectArtifact key={p.id} project={p} index={i} />
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
      <PageLink
        to="research"
        className="group flex items-center justify-between gap-3 rounded-lg border border-circuit/45 bg-circuit/[0.06] px-3.5 py-2.5 text-sm transition-colors hover:border-circuit hover:bg-circuit/10"
      >
        <span className="text-glass-soft">
          <span className="font-semibold text-circuit">Want to see them in action?</span> The Research page maps {SKILL_INDEX.length} of
          my skills to the lab work they came from.
        </span>
        <ArrowRight size={16} aria-hidden className="shrink-0 text-circuit transition-transform group-hover:translate-x-0.5" />
      </PageLink>
      <div className="space-y-3.5">
        {skills.groups.map((g) => (
          <section key={g.label} aria-label={g.label}>
            <h3 className="mb-1.5 font-mono text-xs font-semibold uppercase tracking-wide text-circuit">{g.label}</h3>
            <div className="flex flex-wrap gap-1.5">
              {g.items.map((s) => (
                <span key={s} className="rounded bg-circuit/10 px-2 py-0.5 text-sm text-glass-soft">
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
              className="inline-flex items-center gap-1.5 rounded-full bg-white/45 px-2.5 py-1 text-sm text-ink-soft"
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

const CONTACT_ICON: Record<string, LucideIcon> = { Email: Mail, LinkedIn: BriefcaseBusiness, GitHub: CodeXml };

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
              className="group flex min-w-0 flex-1 items-center gap-3 rounded-md border border-hotpink/40 bg-blush/30 px-3 py-2.5 text-sm transition-colors hover:border-hotpink/70 hover:bg-blush/60"
            >
              {(() => {
                const Icon = CONTACT_ICON[l.label] ?? Mail;
                return <Icon size={16} aria-hidden className="shrink-0 text-rose-ink" />;
              })()}
              <span className="font-semibold text-ink-strong">{l.label}</span>
              <span className="ml-auto truncate text-ink-soft">{l.value}</span>
              <ArrowUpRight
                size={15}
                aria-hidden
                className="shrink-0 text-rose-ink transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
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
  // the case study sits outside the numbered order: it flips back to Research
  // and forward to whatever follows Research
  const anchor = id === "validation" ? "research" : id;
  const i = pageOrder.indexOf(anchor);
  const prev = id === "validation" ? "research" : i > 0 ? pageOrder[i - 1] : null;
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
        {id === "start" ? "contents" : id === "validation" ? "case study" : `page ${i} of ${sections.length}`}
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
  validation: ValidationCaseStudy,
  about: AboutPanel,
  experience: ExperiencePanel,
  research: ResearchPanel,
  projects: ProjectsPanel,
  skills: SkillsPanel,
  awards: AwardsPanel,
  contact: ContactPanel,
};
