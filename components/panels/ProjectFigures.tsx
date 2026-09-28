"use client";

import { useId, type ReactElement } from "react";
import type { Project } from "@/lib/content";
import { usePrefersReducedMotion } from "@/lib/useMediaQuery";

/* Little animated figures, one per project, drawn like figures in a lab
   notebook. Purely illustrative (hidden from screen readers); the caption
   underneath carries the meaning. Everything holds still for reduced motion. */

type Figure = NonNullable<Project["figures"]>[number];
type Kind = Figure["kind"];

const INK = "#2a1830";
const ROSE = "#b52f76";
const LED = "#ff79c6";
const MINT = "#7de8c2";
const LAVENDER = "#c3a8e8";
const ROSEGOLD = "#e3a58b";
const COPPER = "#b8703f";
const FOLDER = "#e9c7a4";
const PETAL = "#fdf2f7";

/* ---------------------------------------------------------- QR check-in */

const QR_N = 21;
const QR_CELL = 3;
function qrDark(x: number, y: number) {
  const finder = (fx: number, fy: number) => {
    const dx = x - fx;
    const dy = y - fy;
    if (dx < 0 || dy < 0 || dx > 6 || dy > 6) return null;
    const ring = dx === 0 || dy === 0 || dx === 6 || dy === 6;
    const core = dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4;
    return ring || core;
  };
  const f = finder(0, 0) ?? finder(QR_N - 7, 0) ?? finder(0, QR_N - 7);
  if (f !== null) return f;
  if ((x === 7 || y === 7) && (x < 8 || y < 8)) return false; // quiet zone around finders
  return (x * 7 + y * 13 + x * y * 3) % 5 < 2;
}
const QR_CELLS = Array.from({ length: QR_N * QR_N }, (_, i) => [i % QR_N, Math.floor(i / QR_N)] as const).filter(([x, y]) => qrDark(x, y));

function QrFigure() {
  const qx = 14;
  const qy = 18;
  const size = QR_N * QR_CELL;
  return (
    <svg viewBox="0 0 160 100" className="h-full w-full" aria-hidden>
      {/* the code a leader puts up at a meeting */}
      <rect x={qx - 4} y={qy - 4} width={size + 8} height={size + 8} rx="3" fill="#fff" stroke="rgba(42,24,48,0.15)" />
      {QR_CELLS.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={qx + x * QR_CELL} y={qy + y * QR_CELL} width={QR_CELL} height={QR_CELL} fill={INK} />
      ))}
      {/* scanner beam sweeping the code */}
      <g className="qr-beam">
        <rect x={qx - 6} y={qy - 1} width={size + 12} height="2.4" rx="1.2" fill={LED} style={{ filter: `drop-shadow(0 0 3px ${LED})` }} />
      </g>
      {/* a dotted hop from code to phone */}
      <path d={`M${qx + size + 8} 50 H104`} stroke={ROSE} strokeWidth="1.2" strokeDasharray="2 3" className="anim-dash" opacity="0.6" />
      {/* the member's phone checking in */}
      <rect x="106" y="12" width="40" height="76" rx="7" fill={INK} />
      <rect x="109" y="18" width="34" height="62" rx="3" fill="#fdf9f3" />
      <circle cx="126" cy="84" r="1.6" fill="rgba(253,242,247,0.5)" />
      <g className="checkin-pop">
        <rect x="112" y="24" width="28" height="12" rx="6" fill={MINT} />
        <path d="M118 30 l2.5 2.5 l4.5 -5" stroke={INK} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="127" y="28.5" width="9" height="2.4" rx="1.2" fill={INK} opacity="0.6" />
      </g>
      {/* members filling in as they arrive */}
      {Array.from({ length: 12 }, (_, i) => (
        <circle
          key={i}
          className="member-dot"
          cx={115 + (i % 4) * 7}
          cy={48 + Math.floor(i / 4) * 8}
          r="2.4"
          fill={i % 3 === 0 ? ROSE : i % 3 === 1 ? LAVENDER : ROSEGOLD}
          style={{ animationDelay: `${i * 0.4}s` }}
        />
      ))}
      {/* live sync light */}
      <circle cx="14" cy="8" r="2.2" fill={MINT} className="anim-led" />
      <text x="19" y="10.5" fontSize="7" fontFamily="ui-monospace, monospace" fill={INK} opacity="0.7">
        live · firebase
      </text>
    </svg>
  );
}

/* ------------------------------------------------ analytics dashboard */

const BARS = [22, 34, 28, 44, 38, 52];

function DashboardFigure() {
  return (
    <svg viewBox="0 0 160 100" className="h-full w-full" aria-hidden>
      {/* attendance by week: bars grow in, hold, then settle back */}
      <text x="10" y="13" fontSize="6.5" fontFamily="ui-monospace, monospace" fill={INK} opacity="0.7">
        attendance
      </text>
      <line x1="10" y1="84" x2="84" y2="84" stroke="rgba(42,24,48,0.25)" strokeWidth="0.8" />
      {BARS.map((h, i) => (
        <rect
          key={i}
          className="bar-grow"
          x={13 + i * 12}
          y={84 - h}
          width="8"
          height={h}
          rx="1.5"
          fill={i === BARS.length - 1 ? ROSE : i % 2 ? LAVENDER : ROSEGOLD}
          style={{ animationDelay: `${i * 0.12}s` }}
        />
      ))}
      {["w1", "w2", "w3", "w4", "w5", "w6"].map((w, i) => (
        <text key={w} x={17 + i * 12} y="92" textAnchor="middle" fontSize="5" fontFamily="ui-monospace, monospace" fill={INK} opacity="0.5">
          {w}
        </text>
      ))}

      {/* task-completion ring */}
      <circle cx="122" cy="30" r="15" fill="none" stroke="rgba(42,24,48,0.12)" strokeWidth="5" />
      <circle
        className="ring-fill"
        cx="122"
        cy="30"
        r="15"
        fill="none"
        stroke={MINT}
        strokeWidth="5"
        strokeLinecap="round"
        pathLength={1}
        transform="rotate(-90 122 30)"
        style={{ filter: "drop-shadow(0 0 0.6px rgba(42,24,48,0.6))" }}
      />
      <path d="M116.5 30 l3.5 3.5 l6 -7" stroke={INK} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <text x="122" y="54" textAnchor="middle" fontSize="5.5" fontFamily="ui-monospace, monospace" fill={INK} opacity="0.6">
        tasks
      </text>

      {/* member leaderboard */}
      {[
        { w: 38, c: ROSE },
        { w: 30, c: LAVENDER },
        { w: 22, c: ROSEGOLD },
      ].map((row, i) => (
        <g key={i}>
          <circle cx="101" cy={66 + i * 9} r="3" fill={row.c} />
          <rect className="bar-grow-x" x="107" y={64 + i * 9} width={row.w} height="4" rx="2" fill={row.c} opacity="0.75" style={{ animationDelay: `${0.4 + i * 0.15}s` }} />
        </g>
      ))}
      <text x="101" y="60" textAnchor="middle" fontSize="6" fill={LED}>
        ✦
      </text>
    </svg>
  );
}

/* --------------------------------------------------------------- sprout */

function SproutFigure() {
  return (
    <svg viewBox="0 0 160 100" className="h-full w-full" aria-hidden>
      {/* sun */}
      <g className="anim-rotate-slow" style={{ transformBox: "fill-box", transformOrigin: "center" }}>
        {Array.from({ length: 8 }, (_, i) => {
          const a = (i / 8) * Math.PI * 2;
          return (
            <line
              key={i}
              x1={134 + Math.cos(a) * 11}
              y1={20 + Math.sin(a) * 11}
              x2={134 + Math.cos(a) * 15}
              y2={20 + Math.sin(a) * 15}
              stroke={ROSEGOLD}
              strokeWidth="2"
              strokeLinecap="round"
            />
          );
        })}
      </g>
      <circle cx="134" cy="20" r="7.5" fill={ROSEGOLD} />
      {/* cloud + rain */}
      <g fill={LAVENDER}>
        <circle cx="26" cy="20" r="7" />
        <circle cx="35" cy="16" r="9" />
        <circle cx="45" cy="20" r="7" />
        <rect x="26" y="20" width="19" height="7" />
      </g>
      {[28, 36, 44].map((x, i) => (
        <line
          key={x}
          className="rain-drop"
          x1={x}
          y1="30"
          x2={x - 1.5}
          y2="35"
          stroke={LAVENDER}
          strokeWidth="1.8"
          strokeLinecap="round"
          style={{ animationDelay: `${i * 0.35}s` }}
        />
      ))}
      {/* the seedling: stem draws up, leaves unfurl, then a bud */}
      <path
        className="sprout-stem"
        pathLength={1}
        d="M80 73 C80 64 76 58 80 50 C83 43 80 37 80 30"
        stroke={MINT}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        style={{ filter: "drop-shadow(0 0 0.6px rgba(42,24,48,0.6))" }}
      />
      <path
        className="sprout-leaf"
        d="M79 55 C70 54 64 48 63 42 C71 42 77 47 79 55Z"
        fill={MINT}
        stroke="rgba(42,24,48,0.35)"
        style={{ transformOrigin: "79px 55px", animationDelay: "0.35s" }}
      />
      <path
        className="sprout-leaf"
        d="M81 43 C89 42 95 36 96 30 C88 30 82 35 81 43Z"
        fill={MINT}
        stroke="rgba(42,24,48,0.35)"
        style={{ transformOrigin: "81px 43px", animationDelay: "0.55s" }}
      />
      <circle className="sprout-leaf" cx="80" cy="29" r="3.4" fill={LED} style={{ transformOrigin: "80px 29px", animationDelay: "0.75s" }} />
      {/* pot */}
      <ellipse cx="80" cy="74" rx="20" ry="3" fill="#4a3350" />
      <rect x="57" y="70" width="46" height="7" rx="2" fill={ROSEGOLD} />
      <path d="M60 77 H100 L95 95 H65Z" fill={COPPER} />
      <text x="80" y="89" textAnchor="middle" fontSize="7" fill={PETAL} opacity="0.85">
        ♡
      </text>
    </svg>
  );
}

/* ------------------------------------------------------------- donation */

function Shirt({ fill }: { fill: string }) {
  return <path d="M-7 -5 L-3 -8 Q0 -6 3 -8 L7 -5 L5 -1 L3.5 -2 V7 H-3.5 V-2 L-5 -1Z" fill={fill} stroke="rgba(42,24,48,0.35)" strokeWidth="0.6" />;
}

function DonateFigure() {
  return (
    <svg viewBox="0 0 160 100" className="h-full w-full" aria-hidden>
      {/* clothes dropping into the box, one after another */}
      {[
        { x: 70, fill: LED, delay: 0 },
        { x: 84, fill: LAVENDER, delay: 0.9 },
        { x: 94, fill: ROSEGOLD, delay: 1.8 },
      ].map((s) => (
        <g key={s.x} transform={`translate(${s.x} 0)`}>
          <g className="shirt-drop" style={{ animationDelay: `${s.delay}s` }}>
            <Shirt fill={s.fill} />
          </g>
        </g>
      ))}
      {/* the box: back flaps, then the front face drawn over the clothes */}
      <path d="M52 58 L40 46 L64 46 L70 58Z" fill={FOLDER} stroke={COPPER} strokeWidth="1" />
      <path d="M108 58 L120 46 L96 46 L90 58Z" fill={FOLDER} stroke={COPPER} strokeWidth="1" />
      <rect x="52" y="58" width="56" height="34" rx="2" fill={FOLDER} stroke={COPPER} strokeWidth="1.2" />
      <path d="M52 58 H108" stroke={COPPER} strokeWidth="1.2" />
      <text x="80" y="79" textAnchor="middle" fontSize="9" fill={ROSE} fontFamily="ui-monospace, monospace">
        ♡ donate
      </text>
      {/* sorted piles waiting on either side */}
      <g transform="translate(24 84)">
        <Shirt fill={LAVENDER} />
      </g>
      <g transform="translate(24 76)">
        <Shirt fill={LED} />
      </g>
      <g transform="translate(136 84)">
        <Shirt fill={ROSEGOLD} />
      </g>
      <text x="24" y="67" textAnchor="middle" fontSize="6" fill={INK} opacity="0.6" fontFamily="ui-monospace, monospace">
        sorted ✓
      </text>
      <text x="136" y="75" textAnchor="middle" fontSize="6" fill={INK} opacity="0.6" fontFamily="ui-monospace, monospace">
        sent →
      </text>
    </svg>
  );
}

/* -------------------------------------------------------------- transit */

const CURVE = "M10 74 H56 C62 74 64 88 70 88 H90 C96 88 98 74 104 74 H150";

function TransitFigure() {
  const reduced = usePrefersReducedMotion();
  const gid = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 160 100" className="h-full w-full" aria-hidden>
      <defs>
        <radialGradient id={`star-${gid}`}>
          <stop offset="0%" stopColor={PETAL} />
          <stop offset="55%" stopColor={ROSEGOLD} />
          <stop offset="100%" stopColor={LED} />
        </radialGradient>
      </defs>
      {/* background stars */}
      {[
        [12, 10],
        [30, 44],
        [128, 8],
        [146, 40],
        [110, 50],
        [44, 14],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="0.9" fill={PETAL} className="anim-twinkle" style={{ animationDelay: `${(x % 5) * 0.4}s` }} />
      ))}
      {/* the star, and a planet crossing in front of it */}
      <line x1="20" y1="30" x2="140" y2="30" stroke={LAVENDER} strokeWidth="0.6" strokeDasharray="1.5 3" opacity="0.5" />
      <circle cx="80" cy="30" r="17" fill={`url(#star-${gid})`} style={{ filter: `drop-shadow(0 0 6px ${ROSEGOLD})` }} />
      <g transform={reduced ? "translate(80 0)" : undefined}>
        {!reduced && <animateTransform attributeName="transform" type="translate" from="30 0" to="130 0" dur="4s" repeatCount="indefinite" />}
        <circle cx="0" cy="30" r="4.6" fill="#1f0f27" stroke={LAVENDER} strokeWidth="0.8" />
      </g>
      {/* its light curve: flux dips exactly while the planet is in front */}
      <line x1="10" y1="94" x2="150" y2="94" stroke="rgba(179,160,196,0.35)" strokeWidth="0.6" />
      <path d={CURVE} stroke={MINT} strokeWidth="1.4" fill="none" strokeLinejoin="round" opacity="0.9" />
      <circle r="2.4" fill={LED} style={{ filter: `drop-shadow(0 0 3px ${LED})` }} cx={reduced ? 80 : 0} cy={reduced ? 88 : 0}>
        {!reduced && <animateMotion dur="4s" repeatCount="indefinite" path={CURVE} />}
      </circle>
      <text x="10" y="68" fontSize="6" fill="#b3a0c4" fontFamily="ui-monospace, monospace">
        flux
      </text>
      <text x="150" y="68" textAnchor="end" fontSize="6" fill="#b3a0c4" fontFamily="ui-monospace, monospace">
        time →
      </text>
    </svg>
  );
}

const FIGURES: Record<Kind, () => ReactElement> = {
  qr: QrFigure,
  dashboard: DashboardFigure,
  sprout: SproutFigure,
  donate: DonateFigure,
  transit: TransitFigure,
};

export function ProjectFigure({ figure, dark }: { figure: Figure; dark: boolean }) {
  const Art = FIGURES[figure.kind];
  return (
    <figure className="w-full">
      <div
        className={`relative aspect-[16/10] w-full overflow-hidden rounded-md border ${
          dark ? "border-mintled/25 bg-black/30" : "border-ink-strong/10 bg-white/55"
        }`}
      >
        <Art />
      </div>
      <figcaption className={`mt-1 text-center font-hand text-[0.95rem] leading-tight ${dark ? "text-glass-muted" : "text-ink-muted"}`}>
        {figure.caption}
      </figcaption>
    </figure>
  );
}
