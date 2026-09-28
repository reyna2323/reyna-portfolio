"use client";

import { useState } from "react";
import { validationStudy as study, type FailureId } from "@/lib/content";
import { PageLink } from "@/lib/pageNav";

/* The validation-layer case study: a page from the engineering notebook.
   Every plot is simulated (real study data stays private) and says so. */

const INK = "var(--ink-strong)";
const MUTED = "var(--ink-muted)";
const ROSE = "var(--rose-ink)";
const COPPER = "var(--copper-ink)";

function Figure({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <figure className="rounded-lg border border-ink-strong/15 bg-white/70 p-3.5 shadow-[0_8px_20px_-14px_rgba(42,24,48,0.5)]">
      {children}
      <figcaption className="mt-2 text-xs text-ink-muted">
        <span className="font-hand text-[1rem] text-rose-ink">fig. {n}</span> {title}{" "}
        <span className="italic">{study.simulatedLabel}</span>
      </figcaption>
    </figure>
  );
}

function Toggle({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className={`rounded-full border px-2.5 py-1 text-xs font-semibold transition-colors pointer-coarse:px-3.5 pointer-coarse:py-2 ${
        on ? "border-rose-ink bg-rose-ink text-petal" : "border-ink-soft/50 text-ink-soft hover:border-ink-strong hover:bg-ink-strong/5"
      }`}
    >
      {children}
    </button>
  );
}

/* ------------------------------------------------ pipeline + failure sim */

function PipelineSim() {
  const [failure, setFailure] = useState<FailureId | null>("invalid");
  const [validated, setValidated] = useState(true);
  const f = study.failures.find((x) => x.id === failure) ?? null;
  const broken = f && !validated; // slips through to the end
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="mr-1 font-hand text-[1.05rem] text-ink-muted">break something:</span>
        {study.failures.map((x, i) => (
          <Toggle key={x.id} on={failure === x.id} onClick={() => setFailure(failure === x.id ? null : x.id)}>
            {i + 1}. {x.short}
          </Toggle>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <span className="font-hand text-[1.05rem] text-ink-muted">validation layer:</span>
        <Toggle on={validated} onClick={() => setValidated((v) => !v)}>
          {validated ? "on" : "off"}
        </Toggle>
      </div>

      {/* the five stages; the failing stage lights up */}
      <ol className="grid gap-2 sm:grid-cols-5" aria-label="Pipeline stages">
        {study.stages.map((stage, i) => {
          const isStage = f?.stage === i;
          const caughtHere = isStage && validated;
          const passedBad = broken && i >= (f?.stage ?? 99);
          const last = i === study.stages.length - 1;
          return (
            <li
              key={stage}
              className={`relative rounded-md border-2 p-2 text-center text-xs font-semibold transition-colors ${
                caughtHere
                  ? "border-copper-ink bg-folder/60 text-ink-strong"
                  : passedBad
                    ? "border-rose-ink/70 bg-blush/60 text-rose-ink"
                    : "border-ink-strong/15 bg-white/60 text-ink-soft"
              }`}
            >
              <span className="block font-mono text-[0.65rem] text-ink-muted">stage {i + 1}</span>
              {stage}
              {caughtHere && <span className="mt-1 block font-hand text-[0.95rem] font-normal text-copper-ink">caught here ✓</span>}
              {passedBad && !last && <span className="mt-1 block font-hand text-[0.95rem] font-normal text-rose-ink">slips through ×</span>}
              {last && f && (
                <span className={`mt-1 block font-hand text-[0.95rem] font-normal ${broken ? "text-rose-ink" : "text-copper-ink"}`}>
                  {broken ? "misleading ×" : "trustworthy ✓"}
                </span>
              )}
            </li>
          );
        })}
      </ol>

      <p aria-live="polite" className={`rounded-md border-l-4 px-3 py-2 text-sm ${broken ? "border-rose-ink bg-blush/40 text-ink-strong" : "border-copper-ink bg-folder/35 text-ink-strong"}`}>
        {!f ? "Pick a failure mode to send it through the pipeline." : broken ? <>Without validation: {f.unchecked}</> : <>With validation: {f.caught}</>}
      </p>
    </div>
  );
}

/* -------------------------------------------------- fig: raw vs validated */

type CedaScenario = "good" | "nocontact" | "invalid" | "buffer";
const CEDA_SCENARIOS: { id: CedaScenario; label: string; range: [number, number] | null; reason: string }[] = [
  { id: "good", label: "Good signal", range: null, reason: "" },
  { id: "nocontact", label: "No contact", range: [22, 34], reason: "no sensor contact" },
  { id: "invalid", label: "Invalid feature", range: [28, 50], reason: "valid_ceda_feats = false" },
  { id: "buffer", label: "Buffer incomplete", range: [0, 14], reason: "ceda_buffer_filled = false" },
];
const N = 60;
const bump = (t: number, c: number, w: number) => Math.exp(-((t - c) ** 2) / (2 * w * w));
const BASE = Array.from({ length: N }, (_, t) => 205 + 12 * bump(t, 18, 4) + 16 * bump(t, 38, 5) + 7 * bump(t, 48, 2) + 1.5 * Math.sin(t * 1.3));

function CedaPlot() {
  const [scenario, setScenario] = useState<CedaScenario>("invalid");
  const [validated, setValidated] = useState(false);
  const s = CEDA_SCENARIOS.find((x) => x.id === scenario)!;
  const raw = BASE.map((v, t) => (s.id === "nocontact" && s.range && t >= s.range[0] && t < s.range[1] ? 158 + 4 * Math.sin(t * 2.7) : v));
  const W = 600;
  const H = 170;
  const x = (t: number) => 34 + (t / (N - 1)) * (W - 44);
  const y = (v: number) => H - 22 - ((v - 150) / 90) * (H - 40);
  const bad = (t: number) => validated && s.range !== null && t >= s.range[0] && t < s.range[1];
  const path = (pred: (t: number) => boolean) =>
    raw.reduce((d, v, t) => {
      if (!pred(t)) return d;
      const prevIn = t > 0 && pred(t - 1);
      return d + `${prevIn ? "L" : "M"}${x(t).toFixed(1)} ${y(v).toFixed(1)} `;
    }, "");
  const usable = validated && s.range ? N - (s.range[1] - s.range[0]) : N;

  return (
    <Figure n="2" title="Raw vs. validated cEDA.">
      <div className="mb-2 flex flex-wrap items-center gap-1.5">
        {CEDA_SCENARIOS.map((c) => (
          <Toggle key={c.id} on={scenario === c.id} onClick={() => setScenario(c.id)}>
            {c.label}
          </Toggle>
        ))}
        <span className="mx-1 h-4 w-px bg-ink-strong/20" aria-hidden />
        <Toggle on={validated} onClick={() => setValidated((v) => !v)}>
          {validated ? "✓ quality validation applied" : "apply quality validation →"}
        </Toggle>
      </div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full"
        role="img"
        aria-label={`Simulated cEDA over 60 minutes, ${s.label.toLowerCase()} scenario, ${validated ? `after quality validation: ${usable} of 60 samples usable` : "raw sensor output, all 60 samples look usable"}.`}
      >
        <defs>
          <pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="6" stroke={ROSE} strokeWidth="1.2" opacity="0.35" />
          </pattern>
        </defs>
        <line x1="34" y1={H - 22} x2={W - 10} y2={H - 22} stroke={MUTED} strokeWidth="0.8" opacity="0.5" />
        <line x1="34" y1="10" x2="34" y2={H - 22} stroke={MUTED} strokeWidth="0.8" opacity="0.5" />
        <text x="4" y="16" fontSize="10" fill={MUTED} fontFamily="ui-monospace, monospace">cEDA</text>
        <text x={W - 10} y={H - 6} textAnchor="end" fontSize="10" fill={MUTED} fontFamily="ui-monospace, monospace">time →</text>
        {bad(s.range?.[0] ?? -1) && s.range && (
          <g>
            <rect x={x(s.range[0])} y="10" width={x(s.range[1] - 1) - x(s.range[0])} height={H - 32} fill="url(#hatch)" />
            <text x={(x(s.range[0]) + x(s.range[1] - 1)) / 2} y="24" textAnchor="middle" fontSize="11" fill={ROSE} fontWeight="bold">
              INVALID · {s.reason}
            </text>
          </g>
        )}
        {/* invalid stretch: kept visible but faded, never silently deleted */}
        <path d={path((t) => bad(t))} fill="none" stroke={ROSE} strokeWidth="1.6" strokeDasharray="3 4" opacity="0.45" />
        <path d={path((t) => !bad(t))} fill="none" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
        {raw.map((v, t) => (bad(t) && t % 3 === 0 ? <text key={t} x={x(t)} y={y(v) + 4} textAnchor="middle" fontSize="11" fill={ROSE}>×</text> : null))}
        {validated && s.range && (
          <text x="40" y={H - 30} fontSize="11" fill={COPPER} fontFamily="ui-monospace, monospace">VALID</text>
        )}
      </svg>
      <p className="mt-1 font-mono text-xs text-ink-soft" aria-live="polite">
        raw samples: {N} · usable after validation: {validated ? usable : "not checked yet"}
      </p>
    </Figure>
  );
}

/* ---------------------------------------------- fig: session alignment */

const PHASES = [
  { name: "Cognitive", from: 60, to: 80 },
  { name: "PMR", from: 80, to: 100 },
  { name: "Box breathing", from: 100, to: 120 },
];
const T = 180; // minutes shown: 13:00 to 16:00
const HR = Array.from({ length: T }, (_, t) => 78 + 6 * bump(t, 70, 6) - 11 * bump(t, 110, 5) + 1.2 * Math.sin(t * 0.9));
const GAPS: [number, number][] = [
  [40, 46],
  [130, 134],
];

function AlignmentPlot() {
  const [offset, setOffset] = useState(false);
  const shift = offset ? 60 : 0;
  const W = 600;
  const x = (t: number) => 90 + (t / T) * (W - 100);
  // where the biggest heart-rate drop lands once shifted
  const dipAt = 110 + shift;
  const phase = PHASES.find((p) => dipAt >= p.from && dipAt < p.to);
  const hrPath = HR.reduce((d, v, t) => {
    const tt = t + shift;
    if (tt >= T) return d;
    return d + `${d ? "L" : "M"}${x(tt).toFixed(1)} ${(58 - (v - 66) * 2.2).toFixed(1)} `;
  }, "");
  return (
    <Figure n="3" title="Session alignment: the CBT phases vs. when the physiology says it happened.">
      <div className="mb-2 flex flex-wrap items-center gap-1.5">
        <Toggle on={offset} onClick={() => setOffset((o) => !o)}>
          {offset ? "✓ +1 hour timezone error" : "introduce a +1 hour timezone error"}
        </Toggle>
      </div>
      <svg
        viewBox={`0 0 ${W} 190`}
        className="h-auto w-full"
        role="img"
        aria-label={`Simulated session timeline. The largest heart-rate drop lands in ${phase ? phase.name : "no CBT phase: it falls after the session ends"}.`}
      >
        {[0, 60, 120, 180].map((m) => (
          <g key={m}>
            <line x1={x(m)} y1="6" x2={x(m)} y2="182" stroke={MUTED} strokeWidth="0.6" strokeDasharray="2 4" opacity="0.5" />
            <text x={x(m)} y="188" textAnchor="middle" fontSize="9" fill={MUTED} fontFamily="ui-monospace, monospace">
              {13 + m / 60}:00
            </text>
          </g>
        ))}
        {/* heart rate */}
        <text x="4" y="40" fontSize="10" fill={MUTED} fontFamily="ui-monospace, monospace">heart rate</text>
        <path d={hrPath} fill="none" stroke={ROSE} strokeWidth="1.8" strokeLinejoin="round" style={{ transition: "d 0.6s ease" }} />
        {/* CBT session */}
        <text x="4" y="104" fontSize="10" fill={MUTED} fontFamily="ui-monospace, monospace">CBT session</text>
        {PHASES.map((p, i) => (
          <g key={p.name}>
            <rect x={x(p.from)} y="92" width={x(p.to) - x(p.from) - 2} height="18" rx="3" fill={["#e6ddf5", "#f6d3e3", "#e9c7a4"][i]} stroke={MUTED} strokeWidth="0.6" />
            <text x={(x(p.from) + x(p.to)) / 2} y="104" textAnchor="middle" fontSize="9" fill={INK}>
              {p.name}
            </text>
          </g>
        ))}
        {/* Fitbit + valid data, both carried by the (possibly wrong) timestamps */}
        <text x="4" y="134" fontSize="10" fill={MUTED} fontFamily="ui-monospace, monospace">Fitbit</text>
        <rect x={x(shift)} y="124" width={x(T) - x(shift)} height="12" rx="2" fill={INK} opacity="0.75" />
        <text x="4" y="160" fontSize="10" fill={MUTED} fontFamily="ui-monospace, monospace">valid data</text>
        <rect x={x(shift)} y="150" width={x(T) - x(shift)} height="12" rx="2" fill={COPPER} opacity="0.8" />
        {GAPS.map(([a, b]) =>
          a + shift < T ? <rect key={a} x={x(a + shift)} y="150" width={x(Math.min(b + shift, T)) - x(a + shift)} height="12" fill="#faf3e8" /> : null,
        )}
      </svg>
      <p aria-live="polite" className={`mt-1 text-sm ${phase?.name === "Box breathing" ? "text-ink-strong" : "font-semibold text-rose-ink"}`}>
        Largest heart-rate drop lands in: <span className="font-semibold">{phase ? phase.name : "no phase at all: after the session ended"}</span>
        {offset && <> · the signal didn&apos;t change, but the scientific conclusion did.</>}
      </p>
    </Figure>
  );
}

/* -------------------------------------------------------------- the page */

export function ValidationCaseStudy() {
  return (
    <div className="space-y-7 text-ink-soft">
      <header>
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{study.kicker}</p>
        <h3 className="mt-1 font-hand text-hand-xl leading-tight text-ink-strong">{study.title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed">{study.thesis}</p>
        {/* the lesson, highlighted like a line you'd go back over in pen */}
        <p className="mt-3 inline-block -rotate-1 rounded-sm px-2 py-1 font-hand text-[1.45rem] leading-tight text-ink-strong" style={{ background: "linear-gradient(transparent 38%, rgba(236,143,189,0.45) 38%, rgba(236,143,189,0.45) 88%, transparent 88%)" }}>
          {study.lesson}
        </p>
      </header>

      <section aria-labelledby="val-pipeline">
        <h3 id="val-pipeline" className="hand-underline mb-2 font-hand text-hand-lg text-rose-ink">
          the pipeline, and where each failure breaks it
        </h3>
        <Figure n="1" title="Raw wearable data → quality validation → timestamp validation → session alignment → analysis-ready physiology.">
          <PipelineSim />
        </Figure>
      </section>

      <section aria-labelledby="val-story" className="relative">
        <div className="-rotate-[0.6deg] rounded-sm bg-blush px-5 pb-5 pt-6 shadow-[0_14px_28px_-16px_rgba(42,24,48,0.6)] surface-blush">
          <span aria-hidden className="absolute -top-2 left-8 h-5 w-20 rotate-[-4deg] rounded-sm bg-lavender/70" />
          <h3 id="val-story" className="font-hand text-hand-lg text-rose-ink">
            {study.firstFooled.heading}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-strong">{study.firstFooled.body}</p>
        </div>
      </section>

      <section aria-labelledby="val-figs" className="space-y-4">
        <h3 id="val-figs" className="hand-underline font-hand text-hand-lg text-rose-ink">
          see it happen
        </h3>
        <CedaPlot />
        <AlignmentPlot />
      </section>

      <section aria-labelledby="val-modes">
        <h3 id="val-modes" className="hand-underline mb-2 font-hand text-hand-lg text-rose-ink">
          six failure modes
        </h3>
        <p className="mb-3 text-sm">
          Together they cover sensor validation, derived-feature validation, metadata validation, and multimodal alignment.
        </p>
        <ol className="grid gap-3 sm:grid-cols-2">
          {study.failures.map((f, i) => (
            <li key={f.id} className="rounded-lg border border-ink-strong/15 bg-white/65 p-3.5">
              <p className="flex items-baseline justify-between gap-2">
                <span className="font-semibold text-ink-strong">
                  <span className="mr-1.5 font-mono text-xs text-rose-ink">{String(i + 1).padStart(2, "0")}</span>
                  {f.title}
                </span>
                <span className="shrink-0 rounded-full bg-ink-strong/[0.07] px-2 py-0.5 text-[0.65rem] text-ink-muted">stage {f.stage + 1}</span>
              </p>
              <p className="mt-1.5 text-sm leading-snug">
                <span className="font-semibold text-ink-strong">What it looked like: </span>
                {f.looked}
              </p>
              <p className="mt-1.5 text-sm leading-snug">
                <span className="font-semibold text-copper-ink">How it&apos;s caught: </span>
                {f.check}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="val-code">
        <h3 id="val-code" className="hand-underline mb-2 font-hand text-hand-lg text-rose-ink">
          simplified validation logic
        </h3>
        <div className="grid gap-3 sm:grid-cols-[3fr_2fr]">
          <pre className="overflow-x-auto rounded-lg bg-[#150c1c] p-3.5 font-mono text-[0.78rem] leading-relaxed text-glass-soft" tabIndex={0} aria-label="Simplified validation logic, Python">
            <code>{study.code}</code>
          </pre>
          <pre className="overflow-x-auto rounded-lg bg-[#150c1c] p-3.5 font-mono text-[0.78rem] leading-relaxed text-circuit" tabIndex={0} aria-label="Example: a raw value that validation rejects">
            <code>{study.codeDemo}</code>
          </pre>
        </div>
        <p className="mt-2 text-sm italic">{study.codeCaption}</p>
        <p className="mt-1 text-xs text-ink-muted">A sketch of the idea, not the lab&apos;s production code.</p>
      </section>

      <p className="text-sm">
        <PageLink to="research" className="font-semibold text-rose-ink underline decoration-rose-ink/40 underline-offset-2">
          ← back to Research
        </PageLink>
      </p>
    </div>
  );
}
