"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import type { SectionId } from "@/lib/content";
import { sections } from "@/lib/content";
import { ParallaxProvider, ParallaxLayer } from "./Parallax";
import { DeskObject } from "./DeskObject";
import { Atmosphere } from "./Atmosphere";
import { NotebookArt } from "./art/Notebook";
import { PiBoardArt } from "./art/PiBoard";
import { OscilloscopeArt } from "./art/Oscilloscope";
import { LaptopArt } from "./art/Laptop";
import { BreadboardArt } from "./art/Breadboard";
import { StickyNotesArt } from "./art/StickyNotes";
import { AwardsShelfArt } from "./art/AwardsShelf";
import { CaseFileTabArt } from "./art/CaseFileTab";
import { ContactCardArt } from "./art/ContactCard";
import { PencilArt } from "./art/Pencil";
import { WiresArt } from "./art/Wires";
import { USCMugArt } from "./art/USCMug";
import { OrreryArt } from "./art/Orrery";
import { DeskClutterArt } from "./art/DeskClutter";

const stagger = {
  hidden: { opacity: 0, y: 26, scale: 0.92 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: 0.15 * i, type: "spring" as const, stiffness: 180, damping: 18 },
  }),
};

function label(id: SectionId) {
  return sections.find((s) => s.id === id)!.hand;
}

export function DeskScene({ onOpen }: { onOpen: (id: SectionId) => void }) {
  const [mugExcited, setMugExcited] = useState(false);
  const mugTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pokeMug = () => {
    setMugExcited(true);
    if (mugTimeout.current) clearTimeout(mugTimeout.current);
    mugTimeout.current = setTimeout(() => setMugExcited(false), 1500);
  };

  return (
    <ParallaxProvider className="relative h-full w-full overflow-hidden bg-gradient-to-br from-deepplum via-[#301c3a] to-plum">
      <Atmosphere />
      <WiresArt className="left-0 top-[8%] h-[40%] w-full opacity-70" />
      <WiresArt className="bottom-0 left-0 h-[35%] w-full rotate-180 opacity-50" />

      {/* desk mat */}
      <div className="graph-paper pointer-events-none absolute inset-x-[4%] bottom-[4%] top-[12%] rounded-[2.5rem] bg-black/10 opacity-40" />

      {/* washi tape + paperclips, torn off and left in the empty margin above the notebook */}
      <div className="pointer-events-none absolute left-[23%] top-[2%] z-0 w-[10vw] max-w-[130px] opacity-80">
        <ParallaxLayer depth={0.7}>
          <DeskClutterArt />
        </ParallaxLayer>
      </div>

      {/* USC coffee mug — cold by now, kept anyway, tucked at the far edge
          beside the laptop. Quietly clickable: a small reward for anyone
          curious enough to poke at something that looks purely decorative. */}
      <div className="absolute left-[0.5%] top-[68%] z-0 w-[6vw] max-w-[78px]">
        <ParallaxLayer depth={1}>
          <div className="anim-float" style={{ animationDelay: "2s" }}>
            <button
              type="button"
              onClick={pokeMug}
              aria-label="It's just a mug. Or is it?"
              className="block cursor-pointer transition-transform hover:scale-105 active:scale-95"
            >
              <USCMugArt excited={mugExcited} />
            </button>
          </div>
        </ParallaxLayer>
      </div>

      {/* tiny orrery paperweight, an old gift, orbiting quietly between the shelf and the case file */}
      <div className="pointer-events-none absolute right-[9%] top-[59%] z-0 w-[6.5vw] max-w-[84px]">
        <ParallaxLayer depth={1.2}>
          <div className="anim-float" style={{ animationDelay: "0.6s" }}>
            <OrreryArt />
          </div>
        </ParallaxLayer>
      </div>

      {/* centerpiece notebook — About */}
      <motion.div
        custom={0}
        variants={stagger}
        initial="hidden"
        animate="show"
        className="absolute left-1/2 top-1/2 z-10 w-[42vw] max-w-[640px] -translate-x-1/2 -translate-y-[52%]"
      >
        <ParallaxLayer depth={0.5}>
          <div className="anim-float">
            <DeskObject label={label("about")} ariaLabel="Open About section" onOpen={() => onOpen("about")} tilt={0.6}>
              <NotebookArt />
            </DeskObject>
          </div>
          <div className="anim-sway mt-2 w-[30%] translate-x-[55%]">
            <PencilArt />
          </div>
        </ParallaxLayer>
      </motion.div>

      {/* Raspberry Pi — Hardware */}
      <motion.div
        custom={1}
        variants={stagger}
        initial="hidden"
        animate="show"
        className="absolute left-[6%] top-[14%] z-10 w-[17vw] max-w-[220px]"
      >
        <ParallaxLayer depth={1.6}>
          <div className="anim-float" style={{ animationDelay: "0.4s" }}>
            <DeskObject label={label("hardware")} ariaLabel="Open Hardware section" onOpen={() => onOpen("hardware")} tilt={-3}>
              <PiBoardArt />
            </DeskObject>
          </div>
        </ParallaxLayer>
      </motion.div>

      {/* breadboard — decorative, sits near hardware */}
      <div className="pointer-events-none absolute left-[5%] top-[46%] z-0 w-[16vw] max-w-[200px] opacity-90">
        <ParallaxLayer depth={1.1}>
          <div className="anim-float" style={{ animationDelay: "1.1s" }}>
            <BreadboardArt />
          </div>
        </ParallaxLayer>
      </div>

      {/* Oscilloscope — Machine Learning / Data */}
      <motion.div
        custom={2}
        variants={stagger}
        initial="hidden"
        animate="show"
        className="absolute right-[6%] top-[12%] z-10 w-[17vw] max-w-[230px]"
      >
        <ParallaxLayer depth={1.4}>
          <div className="anim-float" style={{ animationDelay: "0.7s" }}>
            <DeskObject label={label("ml")} ariaLabel="Open Machine Learning and Data section" onOpen={() => onOpen("ml")} tilt={2.4}>
              <OscilloscopeArt />
            </DeskObject>
          </div>
        </ParallaxLayer>
      </motion.div>

      {/* Awards shelf — top far right */}
      <motion.div
        custom={3}
        variants={stagger}
        initial="hidden"
        animate="show"
        className="absolute right-[3%] top-[42%] z-10 w-[9vw] max-w-[120px]"
      >
        <ParallaxLayer depth={2}>
          <div className="anim-float" style={{ animationDelay: "1.4s" }}>
            <DeskObject label={label("awards")} ariaLabel="Open Awards section" onOpen={() => onOpen("awards")} tilt={-4} labelBelow>
              <AwardsShelfArt />
            </DeskObject>
          </div>
        </ParallaxLayer>
      </motion.div>

      {/* Laptop — Software */}
      <motion.div
        custom={4}
        variants={stagger}
        initial="hidden"
        animate="show"
        className="absolute bottom-[10%] left-[8%] z-10 w-[22vw] max-w-[320px]"
      >
        <ParallaxLayer depth={1.2}>
          <div className="anim-float" style={{ animationDelay: "0.3s" }}>
            <DeskObject label={label("software")} ariaLabel="Open Software section" onOpen={() => onOpen("software")} tilt={-1.6} labelBelow={false}>
              <LaptopArt />
            </DeskObject>
          </div>
        </ParallaxLayer>
      </motion.div>

      {/* Sticky notes — Teaching
          bottom-[11%] keeps the stack clear of the dock below and the
          notebook's bottom-right corner above; verified against real
          bounding boxes, not just eyeballed percentages. */}
      <motion.div
        custom={5}
        variants={stagger}
        initial="hidden"
        animate="show"
        className="absolute bottom-[11%] left-[34%] z-10 w-[10vw] max-w-[130px]"
      >
        <ParallaxLayer depth={1.8}>
          <DeskObject label={label("teaching")} ariaLabel="Open Teaching and Leadership section" onOpen={() => onOpen("teaching")} tilt={5}>
            <StickyNotesArt />
          </DeskObject>
        </ParallaxLayer>
      </motion.div>

      {/* Case file — Resume
          labelBelow keeps the hover text below the object and away from the notebook. */}
      <motion.div
        custom={6}
        variants={stagger}
        initial="hidden"
        animate="show"
        className="absolute bottom-[10%] right-[24%] z-10 w-[15vw] max-w-[200px]"
      >
        <ParallaxLayer depth={1.3}>
          <div className="anim-float" style={{ animationDelay: "0.9s" }}>
            <DeskObject label={label("resume")} ariaLabel="Open Resume section" onOpen={() => onOpen("resume")} tilt={-2}>
              <CaseFileTabArt />
            </DeskObject>
          </div>
        </ParallaxLayer>
      </motion.div>

      {/* Contact card — bottom right.
          labelBelow was dropped here: with the dock's real footprint measured,
          a below-object tooltip landed underneath the dock's higher z-index
          and got clipped. Label-above has clear space above it instead. */}
      <motion.div
        custom={7}
        variants={stagger}
        initial="hidden"
        animate="show"
        className="absolute bottom-[10%] right-[5%] z-10 w-[14vw] max-w-[180px]"
      >
        <ParallaxLayer depth={1.7}>
          <div className="anim-float" style={{ animationDelay: "1.6s" }}>
            <DeskObject label={label("contact")} ariaLabel="Open Contact section" onOpen={() => onOpen("contact")} tilt={3}>
              <ContactCardArt />
            </DeskObject>
          </div>
        </ParallaxLayer>
      </motion.div>
    </ParallaxProvider>
  );
}
