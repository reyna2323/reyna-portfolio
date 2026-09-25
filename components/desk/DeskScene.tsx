"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import type { PageId, SectionId } from "@/lib/content";
import { sections, startPage } from "@/lib/content";
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
import { MagnifyingGlassArt } from "./art/MagnifyingGlass";
import { RobotCompanionArt } from "./art/RobotCompanion";

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

/** "01" to "07": the same page numbers the contents page and page footers use. */
function num(id: SectionId) {
  return String(sections.findIndex((s) => s.id === id) + 1).padStart(2, "0");
}

function aria(id: SectionId) {
  const s = sections.find((x) => x.id === id)!;
  return `Open page ${Number(num(id))}: ${s.label}`;
}

export function DeskScene({ onOpen }: { onOpen: (id: PageId) => void }) {
  const [mugExcited, setMugExcited] = useState(false);
  const mugTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [orrerySpun, setOrrerySpun] = useState(false);
  const orreryTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [pencilDoodling, setPencilDoodling] = useState(false);
  const pencilTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pokeMug = () => {
    setMugExcited(true);
    if (mugTimeout.current) clearTimeout(mugTimeout.current);
    mugTimeout.current = setTimeout(() => setMugExcited(false), 1500);
  };

  const spinOrrery = () => {
    setOrrerySpun(true);
    if (orreryTimeout.current) clearTimeout(orreryTimeout.current);
    orreryTimeout.current = setTimeout(() => setOrrerySpun(false), 1400);
  };

  const nudgePencil = () => {
    setPencilDoodling(true);
    if (pencilTimeout.current) clearTimeout(pencilTimeout.current);
    pencilTimeout.current = setTimeout(() => setPencilDoodling(false), 1200);
  };

  const [robotWaving, setRobotWaving] = useState(false);
  const robotTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wakeRobot = () => {
    setRobotWaving(true);
    if (robotTimeout.current) clearTimeout(robotTimeout.current);
    robotTimeout.current = setTimeout(() => setRobotWaving(false), 1600);
  };

  return (
    <ParallaxProvider className="relative h-full w-full overflow-hidden bg-gradient-to-br from-deepplum via-[#301c3a] to-plum">
      <Atmosphere />
      <WiresArt className="left-0 top-[8%] h-[40%] w-full opacity-70" />
      <WiresArt className="bottom-0 left-0 h-[35%] w-full rotate-180 opacity-50" />

      {/* desk mat */}
      <div className="graph-paper pointer-events-none absolute inset-x-[4%] bottom-[4%] top-[12%] rounded-[2.5rem] bg-black/10 opacity-40" />

      {/* a slow beam of light drifting across the whole desk, like sun
          moving past a window over the course of a very long afternoon */}
      <div
        className="anim-sunbeam pointer-events-none absolute inset-y-0 left-0 z-0 w-[22%] opacity-0"
        style={{ background: "linear-gradient(100deg, transparent, rgba(255,240,220,0.09) 45%, transparent 90%)" }}
        aria-hidden
      />

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

      {/* a small robot companion, idling in the open patch of desk mat below
          the notebook — verified clear of the sticky notes, resume, notebook
          shadow, and dock via real bounding boxes. Quietly clickable. */}
      <div className="absolute left-[49%] top-[72%] z-0 w-[6vw] max-w-[80px]">
        <ParallaxLayer depth={1.1}>
          <div className="anim-float" style={{ animationDelay: "1.1s" }}>
            <button
              type="button"
              onClick={wakeRobot}
              aria-label="Say hi to the little robot"
              className="block cursor-pointer transition-transform hover:scale-105 active:scale-95"
            >
              <RobotCompanionArt waving={robotWaving} />
            </button>
          </div>
        </ParallaxLayer>
      </div>

      {/* tiny orrery paperweight, an old gift, orbiting quietly between the
          shelf and the case file. Also quietly clickable. */}
      <div className="absolute right-[9%] top-[59%] z-0 w-[6.5vw] max-w-[84px]">
        <ParallaxLayer depth={1.2}>
          <div className="anim-float" style={{ animationDelay: "0.6s" }}>
            <button
              type="button"
              onClick={spinOrrery}
              aria-label="A little paperweight. Give it a spin?"
              className="block cursor-pointer transition-transform hover:scale-105 active:scale-95"
            >
              <OrreryArt spun={orrerySpun} />
            </button>
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
            <DeskObject label={label("about")} index={num("about")} ariaLabel={aria("about")} onOpen={() => onOpen("about")} tilt={0.6}>
              <NotebookArt />
            </DeskObject>
          </div>
          <div className="anim-sway mt-2 w-[30%] translate-x-[55%]">
            <button
              type="button"
              onClick={nudgePencil}
              aria-label="Nudge the pencil"
              className="block w-full cursor-pointer text-left"
            >
              <PencilArt doodling={pencilDoodling} />
            </button>
          </div>
        </ParallaxLayer>
      </motion.div>

      {/* pink circuit board — Skills */}
      <motion.div
        custom={1}
        variants={stagger}
        initial="hidden"
        animate="show"
        className="absolute left-[6%] top-[14%] z-10 w-[17vw] max-w-[220px]"
      >
        <ParallaxLayer depth={1.6}>
          <div className="anim-float" style={{ animationDelay: "0.4s" }}>
            <DeskObject label={label("skills")} index={num("skills")} ariaLabel={aria("skills")} onOpen={() => onOpen("skills")} tilt={-3}>
              <PiBoardArt />
            </DeskObject>
          </div>
        </ParallaxLayer>
      </motion.div>

      {/* magnifying glass, resting in the gap between the Pi and the
          breadboard — verified clear of both via real bounding boxes.
          for anyone who takes "the more you look" literally */}
      <div className="pointer-events-none absolute left-[7%] top-[32%] z-0 w-[5vw] max-w-[62px] opacity-90">
        <ParallaxLayer depth={0.9}>
          <div className="anim-float" style={{ animationDelay: "1.8s" }}>
            <MagnifyingGlassArt />
          </div>
        </ParallaxLayer>
      </div>

      {/* breadboard — decorative, sits near hardware */}
      <div className="pointer-events-none absolute left-[5%] top-[46%] z-0 w-[16vw] max-w-[200px] opacity-90">
        <ParallaxLayer depth={1.1}>
          <div className="anim-float" style={{ animationDelay: "1.1s" }}>
            <BreadboardArt />
          </div>
        </ParallaxLayer>
      </div>

      {/* Oscilloscope — Research (it's reading a heartbeat, like the lab's data) */}
      <motion.div
        custom={2}
        variants={stagger}
        initial="hidden"
        animate="show"
        className="absolute right-[6%] top-[12%] z-10 w-[17vw] max-w-[230px]"
      >
        <ParallaxLayer depth={1.4}>
          <div className="anim-float" style={{ animationDelay: "0.7s" }}>
            <DeskObject label={label("research")} index={num("research")} ariaLabel={aria("research")} onOpen={() => onOpen("research")} tilt={2.4}>
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
            <DeskObject label={label("awards")} index={num("awards")} ariaLabel={aria("awards")} onOpen={() => onOpen("awards")} tilt={-4} labelBelow>
              <AwardsShelfArt />
            </DeskObject>
          </div>
        </ParallaxLayer>
      </motion.div>

      {/* Laptop — Projects */}
      <motion.div
        custom={4}
        variants={stagger}
        initial="hidden"
        animate="show"
        className="absolute bottom-[10%] left-[8%] z-10 w-[22vw] max-w-[320px]"
      >
        <ParallaxLayer depth={1.2}>
          <div className="anim-float" style={{ animationDelay: "0.3s" }}>
            <DeskObject label={label("projects")} index={num("projects")} ariaLabel={aria("projects")} onOpen={() => onOpen("projects")} tilt={-1.6} labelBelow={false}>
              <LaptopArt />
            </DeskObject>
          </div>
        </ParallaxLayer>
      </motion.div>

      {/* Sticky notes — Start here (the contents page, for anyone who wants a map)
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
          <DeskObject
            label={startPage.hand}
            ariaLabel="Open the Start here page"
            onOpen={() => onOpen("start")}
            tilt={5}
            labelClassName="-translate-x-[72%]"
          >
            <StickyNotesArt />
          </DeskObject>
        </ParallaxLayer>
      </motion.div>

      {/* Case file — Experience
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
            <DeskObject label={label("experience")} index={num("experience")} ariaLabel={aria("experience")} onOpen={() => onOpen("experience")} tilt={-2}>
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
            <DeskObject label={label("contact")} index={num("contact")} ariaLabel={aria("contact")} onOpen={() => onOpen("contact")} tilt={3}>
              <ContactCardArt />
            </DeskObject>
          </div>
        </ParallaxLayer>
      </motion.div>
    </ParallaxProvider>
  );
}
