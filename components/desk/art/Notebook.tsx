import { site } from "@/lib/content";

/** The open engineering notebook — centerpiece of the desk. Pure CSS/SVG art. */
export function NotebookArt() {
  return (
    <div className="relative aspect-[13/8.6] w-full">
      {/* ground shadow */}
      <div className="absolute inset-x-4 -bottom-2 h-6 rounded-[50%] bg-black/40 blur-lg" />

      <div className="absolute inset-0 flex">

        {/* ═══════════════════ LEFT PAGE ═══════════════════ */}
        {/* No overflow-hidden so washi tape can extend slightly outside */}
        <div className="graph-paper shimmer relative w-1/2 rounded-l-xl rounded-r-sm border border-pink/30 bg-paper shadow-[inset_-14px_0_24px_-16px_rgba(64,40,74,0.35)]">

          {/* coffee stain — two overlapping translucent rings */}
          <div className="pointer-events-none absolute bottom-[17%] left-[4%] h-[13%] w-[13%]">
            <div
              className="absolute inset-0 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(108,58,18,0.13) 58%, rgba(108,58,18,0.05) 76%, transparent 100%)" }}
            />
            <div
              className="absolute inset-[14%] rounded-full"
              style={{ background: "radial-gradient(circle, transparent 52%, rgba(108,58,18,0.09) 56%, rgba(108,58,18,0.04) 72%, transparent 100%)" }}
            />
          </div>

          {/* washi tape strip — inside page edge so it doesn't get clipped */}
          <div
            className="pointer-events-none absolute left-0 top-[5%] h-[4.5%] w-[20%] -rotate-[7deg] rounded-r-sm shadow-sm"
            style={{ background: "linear-gradient(135deg, rgba(230,200,240,0.72), rgba(195,168,232,0.62))" }}
          />

          {/* paperclip pinching the top corner of the page — idle sway */}
          <svg
            viewBox="0 0 20 34"
            className="anim-tag-swing pointer-events-none absolute left-[1.5%] top-[-2%] w-[6%] opacity-80"
            aria-hidden
          >
            <path
              d="M10 3 a5.5 5.5 0 0 1 5.5 5.5 v16 a3.6 3.6 0 0 1 -7.2 0 v-14 a1.8 1.8 0 0 1 3.6 0 v14"
              fill="none"
              stroke="#b8bec4"
              strokeWidth="2.1"
              strokeLinecap="round"
            />
          </svg>

          {/* page number — mirrors right page's pg. 47 */}
          <p className="pointer-events-none absolute left-[5%] top-[2%] font-hand text-desk-micro text-ink-muted" style={{ opacity: 0.38 }} aria-hidden>pg. 46</p>

          {/* mint sticky tab on left edge — mirrors right page's pink tab */}
          <div
            className="pointer-events-none absolute -left-px rounded-l-sm"
            style={{ top: "42%", width: "3.5%", height: "7%", background: "rgba(125,232,194,0.72)", borderTop: "1px solid rgba(60,200,120,0.28)", borderLeft: "1px solid rgba(60,200,120,0.22)", borderBottom: "1px solid rgba(60,200,120,0.28)" }}
          />

          {/* op-amp / inverting-amp circuit sketch — lower left margin */}
          <div className="pointer-events-none absolute bottom-[6%] left-[3%] w-[26%]" style={{ opacity: 0.44 }}>
            <svg viewBox="0 0 64 36" className="w-full" aria-hidden>
              {/* op-amp triangle */}
              <polygon points="8,4 8,32 36,18" fill="none" stroke="var(--copper-ink)" strokeWidth="1.4" strokeLinejoin="round" />
              {/* V+ input */}
              <line x1="0" y1="11" x2="8" y2="11" stroke="var(--copper-ink)" strokeWidth="1.1" />
              {/* V- input */}
              <line x1="0" y1="25" x2="8" y2="25" stroke="var(--copper-ink)" strokeWidth="1.1" />
              {/* output */}
              <line x1="36" y1="18" x2="50" y2="18" stroke="var(--copper-ink)" strokeWidth="1.1" />
              {/* feedback R */}
              <path d="M50 18 V6 H2 V11" fill="none" stroke="var(--copper-ink)" strokeWidth="1" />
              {/* labels */}
              <text x="1" y="10" fontFamily="var(--font-caveat)" fontSize="5" fill="var(--ink-muted)">+</text>
              <text x="1" y="27" fontFamily="var(--font-caveat)" fontSize="5" fill="var(--ink-muted)">−</text>
              <text x="52" y="20" fontFamily="var(--font-caveat)" fontSize="5" fill="var(--ink-muted)">Vout</text>
              {/* ground symbol doodle, the little margin habit of every EE notebook */}
              <line x1="0" y1="30.5" x2="7" y2="30.5" stroke="var(--copper-ink)" strokeWidth="1" />
              <line x1="1.4" y1="32.3" x2="5.6" y2="32.3" stroke="var(--copper-ink)" strokeWidth="0.8" />
              <line x1="2.6" y1="34" x2="4.4" y2="34" stroke="var(--copper-ink)" strokeWidth="0.6" />
              <text x="9" y="33.5" fontFamily="var(--font-caveat)" fontSize="4" fill="var(--ink-muted)" opacity="0.6">gnd</text>
            </svg>
          </div>

          {/* exoplanet transit light curve sketch — drawn BEHIND the main content
              column (same trick as the op-amp sketch above) so its faint lines
              and caption never compete with the real "currently" text on top. */}
          <div className="pointer-events-none absolute left-[3%] top-[46%] w-[28%]" style={{ opacity: 0.32 }}>
            <svg viewBox="0 0 66 42" className="w-full" aria-hidden>
              <line x1="5" y1="3" x2="5" y2="33" stroke="var(--copper-ink)" strokeWidth="0.9" />
              <line x1="5" y1="33" x2="61" y2="33" stroke="var(--copper-ink)" strokeWidth="0.9" />
              <path d="M5 13 H18 Q20 13 22 19 Q25 26 31 26 Q37 26 40 19 Q42 13 44 13 H61"
                fill="none" stroke="var(--lavender)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M18 13 Q20 13 22 19 Q25 26 31 26 Q37 26 40 19 Q42 13 44 13 L44 33 H18 Z"
                fill="rgba(155,27,48,0.05)" />
              <text x="33" y="40" textAnchor="middle" fontFamily="var(--font-caveat)" fontSize="5.5" fill="var(--ink-muted)">exoplanet transit</text>
              <text x="3" y="20" fontFamily="var(--font-caveat)" fontSize="4.5" fill="var(--ink-muted)" transform="rotate(-90 3 20)">flux</text>
            </svg>
          </div>

          {/* I²C timing sketch — drawn BEHIND the main content column, same
              trick as the other margin sketches, since the checklist
              reference item and the currently-list both run through here */}
          <div className="pointer-events-none absolute left-[27%] top-[67%] w-[20%]" style={{ opacity: 0.3 }}>
            <svg viewBox="0 0 58 30" className="w-full" aria-hidden>
              <text x="0" y="6.5" fontFamily="var(--font-caveat)" fontSize="4.5" fill="var(--copper-ink)">SCL</text>
              <text x="0" y="20.5" fontFamily="var(--font-caveat)" fontSize="4.5" fill="var(--orchid)">SDA</text>
              <path d="M12 3 H16 V8 H21 V3 H26 V8 H31 V3 H36 V8 H41 V3 H46 V8 H51 V3 H57"
                fill="none" stroke="var(--copper-ink)" strokeWidth="0.9" strokeLinecap="square" />
              <path d="M12 17 H15 V22 H20 V17 H27 V22 H32 V17 H36 V22 H42 V17 H47 V22 H51 V17 H57"
                fill="none" stroke="var(--orchid)" strokeWidth="0.9" strokeLinecap="square" />
              <line x1="12" y1="3" x2="12" y2="22" stroke="var(--rose-ink)" strokeWidth="0.65" strokeDasharray="1.5 1" />
              <text x="12" y="27.5" textAnchor="middle" fontFamily="var(--font-caveat)" fontSize="4" fill="var(--rose-ink)">S</text>
              <text x="38" y="28" textAnchor="middle" fontFamily="var(--font-caveat)" fontSize="5" fill="var(--ink-muted)">I²C · 0x68</text>
            </svg>
          </div>

          {/* warm highlight strip behind name */}
          <div
            className="pointer-events-none absolute"
            style={{ left: "5.5%", top: "4.8%", width: "68%", height: "5.2%", background: "rgba(255,210,80,0.11)", borderRadius: "3px" }}
          />
          {/* left-margin vertical label */}
          <p
            className="pointer-events-none absolute font-hand text-rose-ink"
            style={{ left: "0.4%", top: "18%", fontSize: "max(4px, 0.3vw)", opacity: 0.3, writingMode: "vertical-rl", transform: "rotate(180deg)", letterSpacing: "0.12em" }}
            aria-hidden
          >spring &apos;26 · vol. II</p>

          {/* main content column */}
          <div className="flex h-full flex-col justify-between p-[6%]">

            {/* header */}
            <div>
              <p className="text-display font-hand leading-none text-ink-strong">{site.name}</p>
              <p className="mt-[1.5%] font-hand text-hand-md text-rose-ink">
                engineering notebook · vol. 02
              </p>
              {/* academic credentials */}
              <div className="mt-[3.5%] max-w-[58%] space-y-[0.5%] border-l-2 border-orchid/28 pl-[4%]">
                <p className="font-hand text-hand-sm text-ink-muted">University of Southern California</p>
                <p className="font-hand text-desk-label leading-tight text-ink-muted">B.S. Computer Engineering</p>
                <p className="font-hand text-desk-label leading-tight text-ink-muted">&amp; Computer Science</p>
                <p className="font-hand text-desk-label text-ink-muted">Minor in Mathematics</p>
                <p className="font-hand text-desk-micro text-copper-ink" style={{ opacity: 0.50 }}>└ yes, all three ✓</p>
              </div>
            </div>

            {/* currently section — capped width so long lines never reach the polaroid margin */}
            <div className="max-w-[62%] space-y-[1.5%]">
              <p className="font-hand text-desk-label text-rose-ink" style={{ opacity: 0.78 }}>currently →</p>
              <p className="font-hand text-desk-micro text-ink-muted">· SAR robot + stress trajectory ML</p>
              <p className="font-hand text-desk-micro text-ink-muted">· exoplanet paper draft v2</p>
              <p className="font-hand text-desk-micro text-copper-ink" style={{ opacity: 0.58 }}>· this portfolio (meta, I know)</p>
              <p className="font-hand text-desk-micro text-ink-muted line-through" style={{ opacity: 0.42 }}>· do it all in assembly <span className="text-copper-ink no-underline">(so much no)</span></p>
            </div>

            {/* circuit-heartbeat with a PROPER heart shape */}
            <svg viewBox="0 0 120 64" className="w-[68%] self-center" aria-hidden>
              {/* left wire + EKG heartbeat pulse */}
              <path
                d="M10 31 H28 l3 -10 5 20 4 -10 H46"
                fill="none"
                stroke="var(--copper)"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* proper heart shape — bezier curves, entry at (46,31) exit at (90,31) */}
              <path
                d="M68 50 C60 44 48 38 46 31 C44 22 52 13 62 13 C66 12 68 18 68 18 C68 18 70 12 74 13 C84 13 92 22 90 31 C88 38 76 44 68 50 Z"
                fill="rgba(236,143,189,0.08)"
                stroke="var(--copper)"
                strokeWidth="2.2"
                strokeLinejoin="round"
              />
              {/* right wire */}
              <path
                d="M90 31 H110"
                fill="none"
                stroke="var(--copper)"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              {/* LED current — left wire */}
              <path
                d="M10 31 H28 l3 -10 5 20 4 -10 H46"
                fill="none"
                stroke="var(--led)"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeDasharray="5 40"
                className="anim-dash"
              />
              {/* LED current — heart */}
              <path
                d="M68 50 C60 44 48 38 46 31 C44 22 52 13 62 13 C66 12 68 18 68 18 C68 18 70 12 74 13 C84 13 92 22 90 31 C88 38 76 44 68 50 Z"
                fill="none"
                stroke="var(--led)"
                strokeWidth="1.8"
                strokeDasharray="5 80"
                className="anim-dash"
                style={{ animationDelay: "0.8s" }}
              />
              {/* LED current — right wire */}
              <path
                d="M90 31 H110"
                fill="none"
                stroke="var(--led)"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeDasharray="5 40"
                className="anim-dash"
                style={{ animationDelay: "1.6s" }}
              />
              {/* node labels */}
              <text x="2" y="46" fontFamily="var(--font-caveat)" fontSize="5.5" fill="var(--ink-muted)">curiosity</text>
              <text x="36" y="16" fontFamily="var(--font-caveat)" fontSize="5.5" fill="var(--ink-muted)">code</text>
              <text x="68" y="36" textAnchor="middle" fontFamily="var(--font-caveat)" fontSize="5.5" fill="var(--ink-muted)">impact</text>
              <text x="90" y="46" fontFamily="var(--font-caveat)" fontSize="5.5" fill="var(--ink-muted)">purpose</text>
              {/* terminal nodes */}
              <circle cx="10" cy="31" r="2.8" fill="var(--copper)" />
              <circle cx="110" cy="31" r="2.8" fill="var(--copper)" />
            </svg>

            {/* caption */}
            <p className="font-hand text-hand-sm text-ink-muted">
              current flows toward whatever I&apos;m curious about →
            </p>
          </div>

          {/* ── Astronomy Polaroid — taped over the page ── */}
          <div className="anim-paper-flutter pointer-events-none absolute right-[3%] top-[29%] w-[26%] rotate-[6deg]">
            {/* tape strip */}
            <div
              className="absolute -top-[8%] left-1/2 h-[7%] w-[48%] -translate-x-1/2 rounded-sm"
              style={{ background: "rgba(210,188,238,0.68)" }}
            />
            <div className="bg-white px-[5%] pb-[14%] pt-[5%] shadow-md">
              {/* starfield */}
              <div
                className="relative w-full overflow-hidden"
                style={{ aspectRatio: "1", background: "linear-gradient(155deg, #080220 0%, #140830 45%, #060118 100%)" }}
              >
                <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 58% 48%, rgba(136,76,212,0.42) 0%, rgba(58,8,92,0.14) 55%, transparent 80%)" }} />
                <div className="absolute h-[2.5%] w-[2.5%] rounded-full bg-white/90" style={{ top: "13%", left: "22%" }} />
                <div className="absolute h-[2%] w-[2%] rounded-full bg-white/68" style={{ top: "30%", left: "66%" }} />
                <div className="absolute h-[3%] w-[3%] rounded-full" style={{ top: "50%", left: "36%", background: "rgba(196,170,232,0.9)", filter: "blur(0.5px)" }} />
                <div className="absolute h-[1.5%] w-[1.5%] rounded-full bg-white/75" style={{ top: "67%", left: "79%" }} />
                <div className="absolute h-[3.5%] w-[3.5%] rounded-full" style={{ top: "38%", left: "11%", background: "rgba(236,143,190,0.58)", filter: "blur(1px)" }} />
                <div className="absolute h-[2%] w-[2%] rounded-full bg-white/58" style={{ top: "20%", left: "84%" }} />
                <div className="absolute h-[2.5%] w-[2.5%] rounded-full bg-white/85" style={{ top: "62%", left: "53%" }} />
                <div className="absolute h-[1.5%] w-[1.5%] rounded-full bg-white/48" style={{ top: "43%", left: "75%" }} />
                <div className="absolute h-[2%] w-[2%] rounded-full" style={{ top: "79%", left: "28%", background: "rgba(246,210,228,0.78)", filter: "blur(0.5px)" }} />
                <div className="absolute h-[1.5%] w-[1.5%] rounded-full bg-white/64" style={{ top: "9%", left: "51%" }} />
              </div>
              <p className="mt-[6%] text-center font-hand text-ink-muted" style={{ fontSize: "max(5.5px, 0.44vw)", lineHeight: 1.3 }}>
                NGC 224 · Andromeda
              </p>
              <p className="text-center font-hand text-ink-muted" style={{ fontSize: "max(4.5px, 0.37vw)", opacity: 0.75 }}>
                2.537 Mly away
              </p>
            </div>
          </div>

          {/* constellation sketch — bottom right corner */}
          <div className="pointer-events-none absolute bottom-[5%] right-[4%] w-[16%]" style={{ opacity: 0.75 }}>
            <svg viewBox="0 0 56 52" className="w-full" aria-hidden>
              <circle cx="12" cy="9" r="1.3" fill="var(--lavender)" className="anim-twinkle" />
              <circle cx="27" cy="5" r="1.6" fill="var(--lavender)" className="anim-twinkle" style={{ animationDelay: "0.6s" }} />
              <circle cx="43" cy="10" r="1.1" fill="var(--lavender)" className="anim-twinkle" style={{ animationDelay: "1.2s" }} />
              <circle cx="18" cy="23" r="1.3" fill="var(--lavender)" className="anim-twinkle" style={{ animationDelay: "1.8s" }} />
              <circle cx="35" cy="25" r="1.6" fill="var(--lavender)" className="anim-twinkle" style={{ animationDelay: "0.3s" }} />
              <circle cx="22" cy="37" r="1.1" fill="var(--lavender)" className="anim-twinkle" style={{ animationDelay: "0.9s" }} />
              <circle cx="47" cy="35" r="1.3" fill="var(--lavender)" className="anim-twinkle" style={{ animationDelay: "1.5s" }} />
              <line x1="12" y1="9" x2="27" y2="5" stroke="var(--lavender)" strokeWidth="0.5" opacity="0.4" />
              <line x1="27" y1="5" x2="43" y2="10" stroke="var(--lavender)" strokeWidth="0.5" opacity="0.4" />
              <line x1="12" y1="9" x2="18" y2="23" stroke="var(--lavender)" strokeWidth="0.5" opacity="0.4" />
              <line x1="43" y1="10" x2="35" y2="25" stroke="var(--lavender)" strokeWidth="0.5" opacity="0.4" />
              <line x1="18" y1="23" x2="35" y2="25" stroke="var(--lavender)" strokeWidth="0.5" opacity="0.4" />
              <line x1="22" y1="37" x2="47" y2="35" stroke="var(--lavender)" strokeWidth="0.5" opacity="0.4" />
              <text x="0" y="50" fontFamily="var(--font-caveat)" fontSize="6.5" fill="var(--ink-muted)" opacity="0.72">Orion?</text>
            </svg>
          </div>

          {/* USC shield illustration */}
          <div className="pointer-events-none absolute right-[4%] top-[11%] w-[19%]" style={{ opacity: 0.84 }}>
            <svg viewBox="0 0 44 54" className="w-full" aria-hidden>
              <path d="M3,3 H41 V30 Q22,46 3,30 Z" fill="rgba(155,27,48,0.13)" stroke="var(--rose-ink)" strokeWidth="1.8" strokeLinejoin="round" />
              <text x="22" y="22" textAnchor="middle" fontFamily="var(--font-caveat)" fontSize="14" fontWeight="700" fill="var(--rose-ink)">USC</text>
              <line x1="9" y1="49" x2="35" y2="49" stroke="var(--copper-ink)" strokeWidth="0.7" opacity="0.45" />
              <text x="22" y="53" textAnchor="middle" fontFamily="var(--font-caveat)" fontSize="6.5" fill="var(--copper-ink)">fight on ✌</text>
            </svg>
          </div>

          {/* Euler identity box */}
          <div className="pointer-events-none absolute right-[3%] top-[57%] w-[22%]" style={{ opacity: 0.48 }}>
            <svg viewBox="0 0 54 30" className="w-full" aria-hidden>
              <rect x="1" y="1" width="52" height="22" rx="3" fill="rgba(246,211,227,0.35)" stroke="var(--pink)" strokeWidth="0.8" strokeDasharray="2.5 2" />
              <text x="27" y="15" textAnchor="middle" fontFamily="var(--font-caveat)" fontSize="9.5" fill="var(--rose-ink)">e^iπ + 1 = 0</text>
              <text x="27" y="28" textAnchor="middle" fontFamily="var(--font-caveat)" fontSize="5" fill="var(--ink-muted)">beautiful ♡</text>
            </svg>
          </div>

          {/* lily of the valley — a small pressed-flower sketch tucked in the
              one genuinely open gap on this page (between the Euler box and
              the constellation), swaying very slightly like a real pressed
              stem catching a draft. */}
          <div className="anim-sway pointer-events-none absolute right-[4%] top-[69%] w-[16%]" style={{ opacity: 0.75, transformOrigin: "bottom center" }}>
            <svg viewBox="0 0 50 50" className="w-full" aria-hidden>
              {/* leaves */}
              <path d="M22 38 Q10 30 14 16 Q20 26 24 38 Z" fill="rgba(125,232,194,0.14)" stroke="var(--mintled)" strokeWidth="0.9" />
              <path d="M28 38 Q38 28 32 14 Q28 25 26 38 Z" fill="rgba(125,232,194,0.14)" stroke="var(--mintled)" strokeWidth="0.9" />
              {/* stem */}
              <path d="M25 38 Q23 24 27 8" fill="none" stroke="var(--mintled)" strokeWidth="1" />
              {/* nodding bells, each a tiny scalloped cup */}
              {[
                [27.6, 10],
                [26.8, 15.5],
                [27.9, 21],
                [26.6, 26.5],
              ].map(([cx, cy], i) => (
                <g key={i} transform={`translate(${cx} ${cy})`}>
                  <path d="M-3 0 Q-3 4 0 4.5 Q3 4 3 0 Z" fill="var(--petal)" stroke="var(--ink-muted)" strokeWidth="0.6" opacity="0.9" />
                  <path d="M-2 0.5 Q0 1.6 2 0.5" fill="none" stroke="var(--ink-muted)" strokeWidth="0.4" opacity="0.5" />
                </g>
              ))}
              <text x="25" y="9" textAnchor="middle" fontFamily="var(--font-caveat)" fontSize="4.5" fill="var(--ink-muted)" opacity="0.7">✦</text>
              <text x="25" y="47" textAnchor="middle" fontFamily="var(--font-caveat)" fontSize="4.8" fill="var(--ink-muted)">lily of the valley</text>
            </svg>
          </div>

          {/* sparkle */}
          <span
            className="pointer-events-none absolute text-orchid anim-sparkle"
            style={{ right: "6%", top: "8%", fontSize: "max(7px, 0.5vw)", opacity: 0.38, animationDelay: "1.3s" }}
            aria-hidden
          >✦</span>
        </div>

        {/* ═══════════════════ RIGHT PAGE ═══════════════════ */}
        <div className="ruled-lines shimmer relative w-1/2 rounded-r-xl rounded-l-sm border border-pink/30 bg-paper shadow-[inset_14px_0_24px_-16px_rgba(64,40,74,0.35)]">
          {/* washi tape corner */}
          <div className="absolute -right-2 -top-2 h-[9%] w-[26%] rotate-[8deg] rounded-sm bg-lavender/70 shadow-sm" />

          {/* page corner that lifts slightly on hover, like it's about to turn */}
          <div
            className="pointer-events-none absolute bottom-0 right-0 h-[9%] w-[9%] origin-bottom-right transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:-translate-x-1 group-hover:rotate-[-8deg]"
            style={{
              background: "linear-gradient(315deg, rgba(255,255,255,0.65), rgba(255,255,255,0) 65%)",
              clipPath: "polygon(100% 100%, 0 100%, 100% 0)",
              borderRadius: "0 0 4px 0",
            }}
            aria-hidden
          />

          <p className="pointer-events-none absolute right-[5%] top-[2%] font-hand text-desk-micro text-ink-muted" style={{ opacity: 0.38 }}>pg. 47</p>

          {/* orchid highlight behind "lab notes" */}
          <div
            className="pointer-events-none absolute"
            style={{ left: "5%", top: "7.2%", width: "54%", height: "5%", background: "rgba(192,132,252,0.14)", borderRadius: "3px" }}
          />
          {/* left-margin vertical label */}
          <p
            className="pointer-events-none absolute font-hand text-orchid"
            style={{ left: "0.5%", top: "13%", fontSize: "max(4px, 0.3vw)", opacity: 0.26, writingMode: "vertical-rl", transform: "rotate(180deg)", letterSpacing: "0.1em" }}
            aria-hidden
          >· lab notes ·</p>

          {/* tiny margin joke — the one sliver of open space beside the heading */}
          <p
            className="pointer-events-none absolute rotate-[3deg] font-hand text-ink-muted"
            style={{ left: "62%", top: "8%", width: "15%", fontSize: "max(4.5px, 0.34vw)", lineHeight: 1.2, opacity: 0.55 }}
            aria-hidden
          >
            ideas &gt; sleep
          </p>
          {/* sticky tab */}
          <div
            className="pointer-events-none absolute -right-px rounded-r-sm"
            style={{ top: "30%", width: "3.5%", height: "7%", background: "rgba(246,211,227,0.85)", borderTop: "1px solid rgba(236,100,140,0.3)", borderRight: "1px solid rgba(236,100,140,0.25)", borderBottom: "1px solid rgba(236,100,140,0.3)" }}
          />

          {/* mini telescope + Saturn sketches — drawn BEHIND the checklist
              (same trick as the left page's op-amp doodle) since the
              checklist's last two lines run right through this vertical
              band; opaque checkbox glyphs stay legible on top either way. */}
          <div className="pointer-events-none absolute right-[3%] top-[38%] w-[20%]" style={{ opacity: 0.34 }}>
            <svg viewBox="0 0 48 38" className="w-full" aria-hidden>
              <rect x="5" y="13" width="28" height="10" rx="2.5" fill="none" stroke="var(--copper-ink)" strokeWidth="1.6" />
              <rect x="31" y="15" width="10" height="6" rx="1.5" fill="var(--copper-ink)" opacity="0.62" />
              <rect x="2" y="10" width="6" height="14" rx="2" fill="none" stroke="var(--copper-ink)" strokeWidth="1.6" />
              <line x1="12" y1="23" x2="8" y2="34" stroke="var(--ink-muted)" strokeWidth="1.3" />
              <line x1="22" y1="23" x2="22" y2="34" stroke="var(--ink-muted)" strokeWidth="1.3" />
              <line x1="32" y1="23" x2="36" y2="34" stroke="var(--ink-muted)" strokeWidth="1.3" />
              <circle cx="10" cy="10" r="1.2" fill="var(--lavender)" className="anim-twinkle" style={{ animationDelay: "0.7s" }} />
              <circle cx="17" cy="7" r="0.9" fill="var(--lavender)" className="anim-twinkle" style={{ animationDelay: "1.5s" }} />
            </svg>
          </div>
          <div className="pointer-events-none absolute left-[4%] top-[40%] w-[18%]" style={{ opacity: 0.3 }}>
            <svg viewBox="0 0 44 28" className="w-full" aria-hidden>
              <circle cx="22" cy="14" r="7" fill="none" stroke="var(--copper-ink)" strokeWidth="1.3" />
              <ellipse cx="22" cy="14" rx="15" ry="4.5" fill="none" stroke="var(--copper-ink)" strokeWidth="1" />
              <circle cx="40" cy="7" r="2" fill="none" stroke="var(--lavender)" strokeWidth="0.9" className="anim-twinkle" style={{ animationDelay: "0.5s" }} />
              <text x="22" y="26" textAnchor="middle" fontFamily="var(--font-caveat)" fontSize="5" fill="var(--ink-muted)">Saturn?</text>
            </svg>
          </div>

          <div className="flex h-full flex-col p-[6%] pt-[8%]">
            <p className="font-hand text-hand-lg text-ink-strong">lab notes ✎</p>

            {/* authentic engineering checklist */}
            <ul className="mt-[3%] space-y-[2%] font-hand text-hand-sm leading-snug">
              <li className="flex items-start gap-[2%]">
                <span className="shrink-0 text-orchid">☑</span>
                <span className="text-ink-muted line-through" style={{ opacity: 0.52 }}>flash Pi firmware + GPIO test</span>
              </li>
              <li className="flex items-start gap-[2%]">
                <span className="shrink-0 text-orchid">☑</span>
                <span className="text-ink-muted line-through" style={{ opacity: 0.52 }}>train HRV → stress trajectory</span>
              </li>
              <li className="flex items-start gap-[2%]">
                <span className="shrink-0 text-orchid">☑</span>
                <span className="text-ink-muted line-through" style={{ opacity: 0.52 }}>debug I2C addr <span className="font-mono text-desk-micro text-copper-ink">0x68</span></span>
              </li>
              <li className="flex items-start gap-[2%]">
                <span className="shrink-0 text-ink-muted">☐</span>
                <span className="text-ink-soft">model Kepler-452b light curve <span className="text-orchid">★</span></span>
              </li>
              <li className="flex items-start gap-[2%]">
                <span className="shrink-0 text-ink-muted">☐</span>
                <span className="text-ink-soft">Kepler paper draft v2</span>
              </li>
              <li className="text-rose-ink">→ click anything on my desk!</li>
            </ul>
            <p className="mt-[1.5%] font-hand text-desk-micro italic text-orchid" style={{ opacity: 0.58 }}>
              ✦ everything is figure-outable
            </p>

            {/* math scribble */}
            <div className="mt-[3.5%] border-l border-copper/25 pl-[3%]">
              <p className="font-hand text-desk-micro italic text-ink-muted">f(x) = σ(Wx + b)</p>
              <p className="font-hand text-desk-micro italic text-ink-muted">∂L/∂θ ← gradient descent</p>
              <p className="font-hand text-desk-micro text-copper-ink" style={{ opacity: 0.48 }}>← see loss curve →</p>
            </div>

            {/* Kepler's transit depth note — tiny reminder */}
            <div
              className="mt-[3%] w-[55%] -rotate-[1deg] rounded-sm p-[2%] shadow-sm"
              style={{ background: "rgba(246,211,227,0.68)" }}
            >
              <p className="font-hand text-ink-muted" style={{ fontSize: "max(5px, 0.38vw)", lineHeight: 1.3 }}>
                transit depth = (Rp/Rs)²
              </p>
              <p className="font-hand text-ink-muted" style={{ fontSize: "max(4px, 0.32vw)" }}>
                ↑ Kepler reminder
              </p>
            </div>

            {/* three concept diagrams, laid out as real flow content (not
                absolute guesses) so they can never collide with the text
                above or the footer row below, no matter how tall this
                page's content runs. */}
            <div className="mt-[3%] mb-[3%] grid grid-cols-3 items-end gap-x-[3%]">
              <div style={{ opacity: 0.6 }}>
                <svg viewBox="0 0 82 32" className="w-full" aria-hidden>
                  <rect x="0" y="8" width="18" height="11" rx="2" fill="none" stroke="var(--copper-ink)" strokeWidth="1" />
                  <text x="9" y="16.5" textAnchor="middle" fontFamily="var(--font-caveat)" fontSize="5.5" fill="var(--copper-ink)">HRV</text>
                  <line x1="18" y1="13.5" x2="23" y2="13.5" stroke="var(--ink-muted)" strokeWidth="0.9" />
                  <path d="M21 11.5 L23 13.5 L21 15.5" fill="none" stroke="var(--ink-muted)" strokeWidth="0.9" />
                  <rect x="23" y="8" width="20" height="11" rx="2" fill="none" stroke="var(--orchid)" strokeWidth="1" />
                  <text x="33" y="16.5" textAnchor="middle" fontFamily="var(--font-caveat)" fontSize="5.5" fill="var(--orchid)">model</text>
                  <line x1="43" y1="13.5" x2="48" y2="13.5" stroke="var(--ink-muted)" strokeWidth="0.9" />
                  <path d="M46 11.5 L48 13.5 L46 15.5" fill="none" stroke="var(--ink-muted)" strokeWidth="0.9" />
                  <rect x="48" y="8" width="24" height="11" rx="2" fill="none" stroke="var(--hotpink)" strokeWidth="1" />
                  <text x="60" y="16.5" textAnchor="middle" fontFamily="var(--font-caveat)" fontSize="5.5" fill="var(--hotpink)">predict</text>
                  <text x="41" y="30" textAnchor="middle" fontFamily="var(--font-caveat)" fontSize="5" fill="var(--ink-muted)">stress trajectory</text>
                </svg>
              </div>
              <div style={{ opacity: 0.55 }}>
                <svg viewBox="0 0 52 34" className="w-full" aria-hidden>
                  <line x1="6" y1="2" x2="6" y2="26" stroke="var(--ink-muted)" strokeWidth="0.9" />
                  <line x1="6" y1="26" x2="50" y2="26" stroke="var(--ink-muted)" strokeWidth="0.9" />
                  <path d="M6 3 Q12 5 18 10 Q28 18 38 23 Q44 25 50 25.5"
                    fill="none" stroke="var(--rose-ink)" strokeWidth="1.4" strokeLinecap="round" />
                  <path d="M6 25.5 Q12 24 18 20 Q28 13 38 7 Q44 5 50 4"
                    fill="none" stroke="var(--orchid)" strokeWidth="1.4" strokeLinecap="round" />
                  <text x="8" y="9" fontFamily="var(--font-caveat)" fontSize="4.5" fill="var(--rose-ink)">loss↓</text>
                  <text x="8" y="18" fontFamily="var(--font-caveat)" fontSize="4.5" fill="var(--orchid)">acc↑</text>
                  <text x="17" y="33" textAnchor="middle" fontFamily="var(--font-caveat)" fontSize="5" fill="var(--ink-muted)">epoch →</text>
                </svg>
              </div>
              <div style={{ opacity: 0.6 }}>
                <svg viewBox="0 0 56 38" className="w-full" aria-hidden>
                  <circle cx="21" cy="15" r="12" fill="rgba(178,132,80,0.07)" stroke="var(--copper-ink)" strokeWidth="0.9" strokeDasharray="2 1.5" />
                  <circle cx="35" cy="15" r="12" fill="rgba(192,132,252,0.07)" stroke="var(--orchid)" strokeWidth="0.9" strokeDasharray="2 1.5" />
                  <circle cx="28" cy="26" r="12" fill="rgba(196,170,232,0.07)" stroke="var(--lavender)" strokeWidth="0.9" strokeDasharray="2 1.5" />
                  <text x="9" y="10" textAnchor="middle" fontFamily="var(--font-caveat)" fontSize="5" fill="var(--copper-ink)">HW</text>
                  <text x="47" y="10" textAnchor="middle" fontFamily="var(--font-caveat)" fontSize="5" fill="var(--orchid)">SW</text>
                  <text x="28" y="37" textAnchor="middle" fontFamily="var(--font-caveat)" fontSize="5" fill="var(--lavender)">math</text>
                  <text x="28" y="19.5" textAnchor="middle" fontFamily="var(--font-caveat)" fontSize="5.5" fill="var(--rose-ink)">me ♡</text>
                </svg>
              </div>
            </div>

            <div className="mt-auto flex items-end justify-between">
              <div>
                <p className="font-hand text-desk-label text-ink-muted">est. USC · CECS</p>
                <p className="font-hand text-desk-micro text-ink-muted" style={{ opacity: 0.52 }}>* scope beats printf debug</p>
                <p className="font-hand text-desk-micro text-ink-muted" style={{ opacity: 0.42 }}>☕ this week: |||| |</p>
              </div>
              {/* robot doodle */}
              <svg viewBox="0 0 44 44" className="w-[22%]" aria-hidden>
                <rect x="10" y="14" width="24" height="18" rx="4" fill="none" stroke="var(--orchid)" strokeWidth="2" />
                <circle cx="18" cy="22" r="2" fill="var(--hotpink)" />
                <circle cx="28" cy="22" r="2" fill="var(--hotpink)" />
                <path d="M18 28 q4 3 8 0" fill="none" stroke="var(--orchid)" strokeWidth="2" strokeLinecap="round" />
                <path d="M22 14 V8" stroke="var(--orchid)" strokeWidth="2" strokeLinecap="round" />
                <circle cx="22" cy="6" r="5" fill="none" stroke="var(--led)" strokeWidth="1" className="anim-ring-pulse" style={{ transformOrigin: "22px 6px" }} />
                <circle cx="22" cy="6" r="2" fill="var(--led)" className="anim-led" />
                <path d="M10 20 H4 M34 20 h6" stroke="var(--orchid)" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* neural network diagram */}
          <div className="pointer-events-none absolute right-[2%] bottom-[28%] w-[30%]" style={{ opacity: 0.5 }}>
            <svg viewBox="0 0 72 52" className="w-full" aria-hidden>
              {/* connections input -> hidden */}
              <line x1="12" y1="12" x2="38" y2="18" stroke="var(--orchid)" strokeWidth="0.7" opacity="0.6" />
              <line x1="12" y1="12" x2="38" y2="34" stroke="var(--orchid)" strokeWidth="0.7" opacity="0.6" />
              <line x1="12" y1="26" x2="38" y2="18" stroke="var(--orchid)" strokeWidth="0.7" opacity="0.6" />
              <line x1="12" y1="26" x2="38" y2="34" stroke="var(--orchid)" strokeWidth="0.7" opacity="0.6" />
              <line x1="12" y1="40" x2="38" y2="18" stroke="var(--orchid)" strokeWidth="0.7" opacity="0.6" />
              <line x1="12" y1="40" x2="38" y2="34" stroke="var(--orchid)" strokeWidth="0.7" opacity="0.6" />
              {/* connections hidden -> output */}
              <line x1="42" y1="18" x2="62" y2="26" stroke="var(--hotpink)" strokeWidth="0.9" opacity="0.7" />
              <line x1="42" y1="34" x2="62" y2="26" stroke="var(--hotpink)" strokeWidth="0.9" opacity="0.7" />
              {/* input layer */}
              <circle cx="12" cy="12" r="4" fill="none" stroke="var(--orchid)" strokeWidth="1.1" />
              <circle cx="12" cy="26" r="4" fill="none" stroke="var(--orchid)" strokeWidth="1.1" />
              <circle cx="12" cy="40" r="4" fill="none" stroke="var(--orchid)" strokeWidth="1.1" />
              {/* hidden layer */}
              <circle cx="38" cy="18" r="4" fill="none" stroke="var(--hotpink)" strokeWidth="1.1" />
              <circle cx="38" cy="34" r="4" fill="none" stroke="var(--hotpink)" strokeWidth="1.1" />
              {/* output node */}
              <circle cx="62" cy="26" r="4.5" fill="var(--led)" opacity="0.55" stroke="var(--led)" strokeWidth="1" />
              <text x="36" y="50" textAnchor="middle" fontFamily="var(--font-caveat)" fontSize="5.5" fill="var(--ink-muted)">stress → label</text>
            </svg>
          </div>

          {/* tiny sticky flag peeking off the bottom-right edge — a reminder to self */}
          <div
            className="anim-tag-swing pointer-events-none absolute -right-[2%] bottom-[3%] w-[15%] rotate-[3deg] rounded-sm p-[3%] shadow-sm"
            style={{ background: "rgba(198,232,210,0.82)", transformOrigin: "top center" }}
          >
            <p className="font-hand text-ink-muted" style={{ fontSize: "max(4.5px, 0.36vw)", lineHeight: 1.25 }}>
              buy more solder ⚡
            </p>
          </div>

          {/* self-stamped "verified" mark, tucked beside the lab-notes heading */}
          <div
            className="pointer-events-none absolute -rotate-[14deg] rounded-full border-2 px-[2%] py-[0.5%]"
            style={{ right: "8%", top: "9%", borderColor: "rgba(178,132,80,0.55)", opacity: 0.72 }}
          >
            <p className="font-hand text-copper-ink" style={{ fontSize: "max(4.5px, 0.36vw)", letterSpacing: "0.05em" }}>
              verified ✓
            </p>
          </div>

          {/* sparkle glyphs */}
          <span
            className="pointer-events-none absolute text-orchid anim-sparkle"
            style={{ left: "7%", top: "6%", fontSize: "max(7px, 0.52vw)", opacity: 0.44, animationDelay: "0.9s" }}
            aria-hidden
          >✦</span>
          <span
            className="pointer-events-none absolute text-lavender anim-sparkle"
            style={{ right: "5%", bottom: "14%", fontSize: "max(6px, 0.43vw)", opacity: 0.36, animationDelay: "2.2s" }}
            aria-hidden
          >✧</span>
          <span
            className="pointer-events-none absolute text-pink anim-twinkle"
            style={{ left: "48%", top: "4%", fontSize: 6, animationDelay: "1.4s" }}
            aria-hidden
          >⋆</span>
        </div>
      </div>

      {/* copper spiral binding */}
      <div className="absolute left-1/2 top-[3%] flex h-[94%] -translate-x-1/2 flex-col justify-between">
        {Array.from({ length: 9 }).map((_, i) => (
          <span
            key={i}
            className="block h-[2.5%] min-h-1.5 w-[1.6vw] rounded-full border-2 border-copper bg-deepplum/20 shadow-[0_1px_2px_rgba(0,0,0,0.4)]"
          />
        ))}
      </div>
    </div>
  );
}
