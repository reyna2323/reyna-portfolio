import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/* The preview card that shows up when someone shares the site (LinkedIn,
   iMessage, Slack, ...): the same plum night sky, constellation and heartbeat
   as the desk, with the name in the notebook's handwriting. */

export const alt = "Reyna Patel: undergraduate researcher at the USC Viterbi Interaction Lab";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const STARS: [number, number][] = [
  [0, 70],
  [70, 26],
  [150, 56],
  [222, 8],
  [300, 44],
  [376, 18],
  [446, 60],
];

export default async function Image() {
  const [caveat, geist] = await Promise.all([
    readFile(join(process.cwd(), "assets/Caveat-SemiBold.ttf")),
    readFile(join(process.cwd(), "assets/Geist-Regular.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "linear-gradient(135deg, #1f0f27 0%, #301c3a 55%, #4a2a52 100%)",
          fontFamily: "Geist",
          color: "#fdf2f7",
        }}
      >
        {/* soft glows */}
        <div
          style={{
            position: "absolute",
            left: -160,
            top: -200,
            width: 720,
            height: 720,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(154,92,208,0.45), transparent 68%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: -200,
            bottom: -260,
            width: 780,
            height: 780,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(236,143,189,0.38), transparent 68%)",
          }}
        />

        {/* the reading constellation, fully lit */}
        <svg width="470" height="90" viewBox="-6 -6 470 90" style={{ position: "absolute", right: 70, top: 64 }}>
          {STARS.slice(0, -1).map(([x, y], i) => (
            <line key={i} x1={x} y1={y} x2={STARS[i + 1][0]} y2={STARS[i + 1][1]} stroke="#ec8fbd" strokeWidth="2" opacity="0.8" />
          ))}
          {STARS.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="5" fill="#fdf2f7" />
          ))}
        </svg>

        {/* heartbeat trace along the bottom */}
        <svg width="1200" height="120" viewBox="0 0 1200 120" style={{ position: "absolute", left: 0, bottom: 6 }}>
          <path
            d="M0 84 H380 L410 84 L430 50 L456 114 L478 66 L496 84 H760 L782 84 L800 58 L822 108 L840 84 H1200"
            fill="none"
            stroke="#ff79c6"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.55"
          />
        </svg>

        <div style={{ display: "flex", flexDirection: "column", padding: "150px 80px 0 88px" }}>
          <div style={{ display: "flex", fontFamily: "Caveat", fontSize: 150, lineHeight: 1, color: "#f6d3e3" }}>Reyna Patel</div>
          <div style={{ display: "flex", marginTop: 22, fontSize: 38, color: "#fdf2f7" }}>
            Undergraduate researcher · USC Viterbi Interaction Lab
          </div>
          <div style={{ display: "flex", marginTop: 14, fontSize: 30, color: "#c3a8e8" }}>
            Wearable data + ML for a robot that helps people through anxiety
          </div>
          <div style={{ display: "flex", marginTop: 34, gap: 14 }}>
            {["3 papers under review", "NIH-funded study", "USC CECS + Math · '28"].map((t) => (
              <div
                key={t}
                style={{
                  display: "flex",
                  padding: "10px 22px",
                  borderRadius: 9999,
                  border: "2px solid rgba(236,143,189,0.55)",
                  background: "rgba(31,15,39,0.55)",
                  fontSize: 24,
                  color: "#fdf2f7",
                }}
              >
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Caveat", data: caveat, style: "normal", weight: 600 },
        { name: "Geist", data: geist, style: "normal", weight: 400 },
      ],
    },
  );
}
