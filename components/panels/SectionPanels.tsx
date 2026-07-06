import {
  Cpu,
  Brain,
  GraduationCap,
  Trophy,
  FileText,
  Mail,
  Heart,
  Sparkles,
  BadgeCheck,
  Video,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { SectionId } from "@/lib/content";
import type { PanelVariant } from "./PanelShell";
import {
  site,
  about,
  education,
  hardware,
  software,
  ml,
  teaching,
  awards,
  certifications,
  contact,
  projects,
  sections,
} from "@/lib/content";
import { ProjectArtifact } from "./ProjectArtifact";

export const PANEL_META: Record<SectionId, { variant: PanelVariant; icon: LucideIcon }> = {
  about: { variant: "notebook", icon: Heart },
  hardware: { variant: "schematic", icon: Cpu },
  software: { variant: "window", icon: Sparkles },
  ml: { variant: "window", icon: Brain },
  teaching: { variant: "notebook", icon: GraduationCap },
  awards: { variant: "folder", icon: Trophy },
  resume: { variant: "folder", icon: FileText },
  contact: { variant: "casefile", icon: Mail },
};

function sectionMeta(id: SectionId) {
  return sections.find((s) => s.id === id)!;
}

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

      <div className="rounded-lg border border-pink/30 bg-white/40 p-3.5">
        <div className="flex items-center gap-2 text-ink-strong">
          <GraduationCap size={16} aria-hidden />
          <p className="text-sm font-semibold">{education.school}</p>
        </div>
        <p className="mt-1 text-sm text-ink-soft">{education.degree}</p>
        <p className="text-desk-label text-ink-muted">
          {education.location} · {education.period}
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {education.coursework.map((c) => (
            <span key={c} className="rounded-full border border-ink-muted/25 px-2 py-0.5 text-[0.68rem] text-ink-muted">
              {c}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-start gap-2.5 rounded-lg border border-lavender/30 bg-lilac/30 p-3.5">
        <Video size={16} className="mt-0.5 shrink-0 text-orchid" aria-hidden />
        <div>
          <p className="text-sm font-semibold text-ink-strong">{about.alsoOnCampus.role}</p>
          <p className="text-desk-label text-ink-muted">{about.alsoOnCampus.period}</p>
          <p className="mt-1 text-sm leading-relaxed text-ink-soft">{about.alsoOnCampus.detail}</p>
        </div>
      </div>
    </div>
  );
}

export function HardwarePanel() {
  return (
    <div className="space-y-4">
      <p className="text-sm leading-relaxed text-glass-soft">{hardware.intro}</p>
      <div className="flex flex-wrap gap-1.5">
        {hardware.buses.map((b) => (
          <span key={b} className="rounded border border-circuit/40 px-2 py-0.5 font-mono text-xs text-circuit">
            {b}
          </span>
        ))}
      </div>
      <ul className="grid grid-cols-1 gap-1.5 text-sm text-glass-soft sm:grid-cols-2">
        {hardware.skills.map((s) => (
          <li key={s} className="flex items-start gap-1.5">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-circuit" /> {s}
          </li>
        ))}
      </ul>
      <div className="grid gap-3">
        {hardware.projectIds.map((id) => (
          <ProjectArtifact key={id} project={projects[id]} />
        ))}
      </div>
    </div>
  );
}

export function SoftwarePanel() {
  return (
    <div className="space-y-4">
      <p className="text-sm leading-relaxed text-glass-soft">{software.intro}</p>
      <div className="flex flex-wrap gap-1.5">
        {software.languages.map((l) => (
          <span key={l} className="rounded-full border border-glass-muted/35 px-2.5 py-0.5 text-xs text-glass-muted">
            {l}
          </span>
        ))}
      </div>
      <div className="grid gap-3">
        {software.projectIds.map((id) => (
          <ProjectArtifact key={id} project={projects[id]} />
        ))}
      </div>
    </div>
  );
}

export function MLPanel() {
  return (
    <div className="space-y-4">
      <p className="text-sm leading-relaxed text-glass-soft">{ml.intro}</p>
      <div className="flex flex-wrap gap-1.5">
        {ml.tools.map((t) => (
          <span key={t} className="rounded-full border border-lavender/40 px-2.5 py-0.5 text-xs text-glass-muted">
            {t}
          </span>
        ))}
      </div>
      <div className="grid gap-3">
        {ml.projectIds.map((id) => (
          <ProjectArtifact key={id} project={projects[id]} />
        ))}
      </div>
    </div>
  );
}

export function TeachingPanel() {
  return (
    <div className="space-y-4">
      <p className="text-sm leading-relaxed text-ink-soft">{teaching.intro}</p>
      <div className="space-y-3">
        {teaching.roles.map((r) => (
          <div key={r.title} className="rounded-md border border-pink/30 bg-blush/40 p-3.5">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
              <p className="font-hand text-hand-lg text-ink-strong">{r.title}</p>
              <p className="text-desk-label text-ink-muted">{r.period}</p>
            </div>
            <p className="text-desk-label font-semibold text-rose-ink">{r.org}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{r.detail}</p>
            {r.highlights && r.highlights.length > 0 && (
              <ul className="mt-1.5 space-y-1">
                {r.highlights.map((h) => (
                  <li key={h} className="flex gap-1.5 text-sm text-ink-soft">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-copper" />
                    {h}
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-2 font-hand text-hand-md text-hotpink">{r.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AwardsPanel() {
  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {awards.map((a) => (
          <div key={a.title} className="flex items-start justify-between gap-3 rounded-md border border-copper/30 bg-white/40 p-3">
            <div>
              <p className="text-sm font-semibold text-ink-strong">{a.title}</p>
              <p className="text-desk-label text-ink-muted">{a.org}</p>
            </div>
            <div className="text-right">
              <span
                className={`rounded-full px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide ${
                  a.tier === "national" ? "bg-hotpink/15 text-rose-ink" : "bg-orchid/15 text-orchid"
                }`}
              >
                {a.tier}
              </span>
              <p className="mt-1 text-desk-micro text-ink-muted">{a.year}</p>
            </div>
          </div>
        ))}
      </div>

      <div>
        <p className="mb-1.5 text-desk-label font-semibold uppercase tracking-wide text-ink-muted">Certifications</p>
        <div className="flex flex-wrap gap-1.5">
          {certifications.map((c) => (
            <span
              key={c}
              className="inline-flex items-center gap-1.5 rounded-full border border-copper/35 bg-white/40 px-2.5 py-1 text-xs text-ink-soft"
            >
              <BadgeCheck size={12} className="text-copper-ink" aria-hidden />
              {c}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ResumePanel() {
  return (
    <div className="space-y-5">

      {/* header */}
      <div className="border-b border-copper/22 pb-4 text-center">
        <p className="font-hand text-hand-xl text-ink-strong">{site.name}</p>
        <p className="text-desk-label text-ink-muted">{site.role}</p>
        <div className="mt-1.5 flex flex-wrap justify-center gap-x-3 gap-y-1 font-mono text-xs text-copper-ink">
          <span>{site.email}</span>
          <span>linkedin.com/in/reynapatelegv</span>
          <span>github.com/reyna2323</span>
        </div>
      </div>

      {/* education */}
      <div>
        <p className="mb-2 font-hand text-hand-lg text-rose-ink">Education</p>
        <div className="rounded-md border border-copper/25 bg-white/40 p-3">
          <div className="flex items-baseline justify-between gap-2">
            <p className="text-sm font-semibold text-ink-strong">{education.school}</p>
            <p className="shrink-0 text-desk-micro text-ink-muted">{education.period}</p>
          </div>
          <p className="text-sm text-ink-soft">{education.degree}</p>
          <p className="text-desk-label text-ink-muted">{education.location}</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {education.coursework.map((c) => (
              <span key={c} className="rounded-full border border-ink-muted/25 px-2 py-0.5 text-[0.68rem] text-ink-muted">
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* research */}
      <div>
        <p className="mb-2 font-hand text-hand-lg text-rose-ink">Research</p>
        <div className="rounded-md border border-copper/25 bg-white/40 p-3">
          <div className="flex items-baseline justify-between gap-2">
            <p className="text-sm font-semibold text-ink-strong">Undergraduate Researcher</p>
            <p className="shrink-0 text-desk-micro text-ink-muted">Sep 2025 – Present</p>
          </div>
          <p className="text-desk-label font-semibold text-rose-ink">USC Viterbi Interaction Lab</p>
          <ul className="mt-1.5 space-y-1 text-sm text-ink-soft">
            <li className="flex gap-1.5">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-copper" />
              Socially assistive robotics on a Raspberry Pi: embedded Linux, GPIO, I2C, sensor pipelines
            </li>
            <li className="flex gap-1.5">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-copper" />
              ML pipelines for physiological stress-trajectory prediction, contributing to publications
            </li>
          </ul>
        </div>
      </div>

      {/* experience */}
      <div>
        <p className="mb-2 font-hand text-hand-lg text-rose-ink">Experience</p>
        <div className="space-y-2.5">
          <div className="rounded-md border border-copper/25 bg-white/40 p-3">
            <div className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-0.5">
              <p className="text-sm font-semibold text-ink-strong">Camera &amp; Network Operator</p>
              <p className="shrink-0 text-desk-micro text-ink-muted">Aug 2025 – Present</p>
            </div>
            <p className="text-desk-label font-semibold text-rose-ink">USC Distance Education Network · Viterbi</p>
            <p className="mt-1 text-sm text-ink-soft">
              I run cameras and AV network equipment for live and recorded grad engineering lectures. Monitor quality, handle accessibility, and troubleshoot with instructors on the fly.
            </p>
          </div>

          <div className="rounded-md border border-copper/25 bg-white/40 p-3">
            <div className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-0.5">
              <p className="text-sm font-semibold text-ink-strong">IT Hardware Technician</p>
              <p className="shrink-0 text-desk-micro text-ink-muted">Jun – Aug 2024</p>
            </div>
            <p className="text-desk-label font-semibold text-rose-ink">Revcor</p>
            <p className="mt-1 text-sm text-ink-soft">
              Configured and deployed 80+ systems from scratch: CPU, RAM, and drive upgrades, BIOS tuning, diagnostics, and hardware validation.
            </p>
          </div>

          <div className="rounded-md border border-copper/25 bg-white/40 p-3">
            <div className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-0.5">
              <p className="text-sm font-semibold text-ink-strong">
                CS Teaching Assistant <span className="font-normal text-ink-muted">&amp; STEM Instructor</span>
              </p>
              <p className="shrink-0 text-desk-micro text-ink-muted">2024 – 2025</p>
            </div>
            <p className="text-desk-label font-semibold text-rose-ink">Conant High School · Sylvan Learning</p>
            <ul className="mt-1.5 space-y-1 text-sm text-ink-soft">
              <li className="flex gap-1.5">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-copper" />
                AP CS A TA + Arduino curriculum design: C/C++ firmware, GPIO/PWM/ADC, dual-credit EDU201
              </li>
              <li className="flex gap-1.5">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-copper" />
                Sylvan STEM summer camp: Lego Bot Labs, Python Programming, sustainable energy challenges
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* projects */}
      <div>
        <p className="mb-2 font-hand text-hand-lg text-rose-ink">Projects</p>
        <div className="grid gap-1.5">
          {Object.values(projects).map((p) => (
            <div key={p.id} className="flex items-start gap-2 rounded border border-copper/20 bg-white/30 px-2.5 py-1.5">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-copper" />
              <div className="min-w-0">
                <span className="text-sm font-semibold text-ink-strong">{p.title}</span>
                <span className="ml-1.5 text-desk-micro text-ink-muted">{p.category}</span>
                <div className="mt-0.5 flex flex-wrap gap-1">
                  {p.stack.slice(0, 4).map((s) => (
                    <span key={s} className="rounded border border-copper/25 px-1 py-0.5 font-mono text-[0.6rem] text-copper-ink">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* technical skills */}
      <div>
        <p className="mb-2 font-hand text-hand-lg text-rose-ink">Technical Skills</p>
        <div className="space-y-2.5">
          {[
            {
              label: "Languages",
              items: ["Python", "C/C++", "JavaScript", "TypeScript", "Java", "C#", "SQL", "Kotlin", "SwiftUI", "HTML/CSS"],
            },
            {
              label: "Hardware",
              items: ["Raspberry Pi", "Embedded Linux", "UART / I2C / SPI / PWM / ADC", "Oscilloscope", "BIOS config"],
            },
            {
              label: "ML / Data",
              items: ["PyTorch", "TensorFlow", "pandas / NumPy", "AWS", "Signal processing"],
            },
            {
              label: "Frameworks",
              items: ["React Native", "React", "Next.js", "Firebase", "Supabase", "Git"],
            },
          ].map(({ label, items }) => (
            <div key={label}>
              <p className="mb-1 text-desk-label font-semibold uppercase tracking-wide text-ink-muted">{label}</p>
              <div className="flex flex-wrap gap-1.5">
                {items.map((s) => (
                  <span key={s} className="rounded-full border border-copper/30 bg-white/40 px-2 py-0.5 text-xs text-ink-soft">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* awards */}
      <div>
        <p className="mb-2 font-hand text-hand-lg text-rose-ink">Awards &amp; Certifications</p>
        <div className="space-y-1.5">
          {awards.map((a) => (
            <div key={a.title} className="flex items-start justify-between gap-3 rounded border border-copper/20 bg-white/30 px-2.5 py-1.5">
              <div>
                <p className="text-sm font-semibold text-ink-strong">{a.title}</p>
                <p className="text-desk-micro text-ink-muted">{a.org}</p>
              </div>
              <div className="shrink-0 text-right">
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wide ${
                    a.tier === "national" ? "bg-hotpink/12 text-rose-ink" : "bg-orchid/12 text-orchid"
                  }`}
                >
                  {a.tier}
                </span>
                <p className="mt-0.5 text-desk-micro text-ink-muted">{a.year}</p>
              </div>
            </div>
          ))}
          <div className="mt-2 flex flex-wrap gap-1.5">
            {certifications.map((c) => (
              <span
                key={c}
                className="inline-flex items-center gap-1.5 rounded-full border border-copper/30 bg-white/40 px-2.5 py-1 text-xs text-ink-soft"
              >
                <BadgeCheck size={11} className="text-copper-ink" aria-hidden />
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      <p className="text-center font-hand text-hand-md text-rose-ink">
        open to research, internships &amp; interesting problems ♡
      </p>
    </div>
  );
}

export function ContactPanel() {
  return (
    <div className="space-y-4">
      <p className="text-sm leading-relaxed text-ink-soft">{contact.intro}</p>
      <div className="space-y-2">
        {contact.lines.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target={l.href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            className="flex items-center justify-between rounded-md border border-hotpink/25 bg-blush/30 px-3 py-2 text-sm transition-colors hover:bg-blush/60"
          >
            <span className="font-semibold text-ink-strong">{l.label}</span>
            <span className="text-ink-soft">{l.value}</span>
          </a>
        ))}
      </div>
      <p className="font-hand text-hand-md text-rose-ink">reach out anytime, I love a good project idea ♡</p>
    </div>
  );
}

export const PANEL_CONTENT: Record<SectionId, React.ComponentType> = {
  about: AboutPanel,
  hardware: HardwarePanel,
  software: SoftwarePanel,
  ml: MLPanel,
  teaching: TeachingPanel,
  awards: AwardsPanel,
  resume: ResumePanel,
  contact: ContactPanel,
};

export { sectionMeta };
