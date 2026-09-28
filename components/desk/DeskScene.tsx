"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import type { PageId, SectionId } from "@/lib/content";
import { peeks, sections, startPage } from "@/lib/content";
import { ParallaxProvider, ParallaxLayer } from "./Parallax";
import { announceEgg } from "./EasterEggs";
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
    announceEgg("The USC mug perks right up ♡");
    setMugExcited(true);
    if (mugTimeout.current) clearTimeout(mugTimeout.current);
    mugTimeout.current = setTimeout(() => setMugExcited(false), 1500);
  };

  const spinOrrery = () => {
    announceEgg("The little planets spin around their orbits ✦");
    setOrrerySpun(true);
    if (orreryTimeout.current) clearTimeout(orreryTimeout.current);
    orreryTimeout.current = setTimeout(() => setOrrerySpun(false), 1400);
  };

  const nudgePencil = () => {
    announceEgg("The pencil starts doodling ✎");
    setPencilDoodling(true);
    if (pencilTimeout.current) clearTimeout(pencilTimeout.current);
    pencilTimeout.current = setTimeout(() => setPencilDoodling(false), 1200);
  };

  const [lookingCloser, setLookingCloser] = useState(false);
  const lookTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lookCloser = () => {
    setLookingCloser(true);
    if (lookTimeout.current) clearTimeout(lookTimeout.current);
    lookTimeout.current = setTimeout(() => setLookingCloser(false), 3200);
    announceEgg("You found a note: the more you look, the more you find.");
  };

  const [circuitOn, setCircuitOn] = useState(false);
  const circuitTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeCircuit = () => {
    setCircuitOn(true);
    if (circuitTimeout.current) clearTimeout(circuitTimeout.current);
    circuitTimeout.current = setTimeout(() => setCircuitOn(false), 2600);
    announceEgg("Circuit closed. The breadboard lights up.");
  };

  const [robotWaving, setRobotWaving] = useState(false);
  const robotTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wakeRobot = () => {
    announceEgg("The little robot waves hi!");
    setRobotWaving(true);
    if (robotTimeout.current) clearTimeout(robotTimeout.current);
    robotTimeout.current = setTimeout(() => setRobotWaving(false), 1600);
  };

  return (
    <ParallaxProvider className="desk-scale relative h-full w-full overflow-hidden bg-gradient-to-br from-deepplum via-[#301c3a] to-plum">
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
      <div className="pointer-events-none absolute left-[23%] top-[2%] z-0 w-[calc(var(--su)*10)] opacity-80">
        <ParallaxLayer depth={0.7}>
          <DeskClutterArt />
        </ParallaxLayer>
      </div>

      {/* Objects below are in page order (Start, then 01 to 07, then the easter
          eggs) so Tab walks the desk the way the contents page reads. Their
          positions are absolute, so this order doesn't move anything. */}
      {/* Sticky notes — Start here (the contents page, for anyone who wants a map)
          bottom-[11%] keeps the stack clear of the dock below and the
          notebook's bottom-right corner above; verified against real
          bounding boxes, not just eyeballed percentages. */}
      <motion.div
        custom={5}
        variants={stagger}
        initial="hidden"
        animate="show"
        className="pointer-events-none absolute bottom-[max(11%,92px)] left-[34%] z-[11] w-[calc(var(--su)*10)]"
      >
        <ParallaxLayer depth={1.8}>
          <DeskObject
            label={startPage.hand}
            ariaLabel="Open the Start here page"
            onOpen={() => onOpen("start")}
            peek={peeks.start}
            tilt={5}
            labelClassName="-translate-x-[72%]"
          >
            <StickyNotesArt />
          </DeskObject>
        </ParallaxLayer>
      </motion.div>

      {/* Oscilloscope — Research (it's reading a heartbeat, like the lab's data) */}
      <motion.div
        custom={2}
        variants={stagger}
        initial="hidden"
        animate="show"
        className="pointer-events-none absolute right-[5%] top-[12%] z-10 w-[calc(var(--su)*19)]"
      >
        <ParallaxLayer depth={1.4}>
          <div className="anim-float" style={{ animationDelay: "0.7s" }}>
            <DeskObject label={label("research")} index={num("research")} ariaLabel={`${aria("research")} (featured)`} onOpen={() => onOpen("research")} peek={peeks.research} peekSide="left" tilt={2.4} featured>
              <OscilloscopeArt />
            </DeskObject>
          </div>
        </ParallaxLayer>
      </motion.div>

      {/* Case file — Experience
          labelBelow keeps the hover text below the object and away from the notebook. */}
      <motion.div
        custom={6}
        variants={stagger}
        initial="hidden"
        animate="show"
        className="pointer-events-none absolute bottom-[max(10%,88px)] right-[24%] z-10 w-[calc(var(--su)*15)]"
      >
        <ParallaxLayer depth={1.3}>
          <div className="anim-float" style={{ animationDelay: "0.9s" }}>
            <DeskObject label={label("experience")} index={num("experience")} ariaLabel={aria("experience")} onOpen={() => onOpen("experience")} peek={peeks.experience} peekSide="left" tilt={-2}>
              <CaseFileTabArt />
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
        className="pointer-events-none absolute bottom-[max(10%,88px)] left-[8%] z-10 w-[calc(var(--su)*22)]"
      >
        <ParallaxLayer depth={1.2}>
          <div className="anim-float" style={{ animationDelay: "0.3s" }}>
            <DeskObject label={label("projects")} index={num("projects")} ariaLabel={aria("projects")} onOpen={() => onOpen("projects")} peek={peeks.projects} peekSide="right" tilt={-1.6} labelBelow={false}>
              <LaptopArt />
            </DeskObject>
          </div>
        </ParallaxLayer>
      </motion.div>

      {/* pink circuit board — Skills
          the px floor keeps its tag below the name/subtitle header on short windows */}
      <motion.div
        custom={1}
        variants={stagger}
        initial="hidden"
        animate="show"
        className="pointer-events-none absolute left-[6%] top-[max(14%,166px)] z-10 w-[calc(var(--su)*17)]"
      >
        <ParallaxLayer depth={1.6}>
          <div className="anim-float" style={{ animationDelay: "0.4s" }}>
            <DeskObject label={label("skills")} index={num("skills")} ariaLabel={aria("skills")} onOpen={() => onOpen("skills")} peek={peeks.skills} peekSide="right" tilt={-3}>
              <PiBoardArt />
            </DeskObject>
          </div>
        </ParallaxLayer>
      </motion.div>

      {/* magnifying glass, resting in the gap between the Pi and the
          breadboard — verified clear of both via real bounding boxes.
          for anyone who takes "the more you look" literally: click it and it
          leans in and turns up a note hidden on the desk. */}
      <div className="pointer-events-none absolute left-[7%] top-[max(33.5%,320px)] z-[1] w-[calc(var(--su)*5)] opacity-90">
        <ParallaxLayer depth={0.9}>
          <div className="anim-float" style={{ animationDelay: "1.8s" }}>
            <button
              type="button"
              onClick={lookCloser}
              aria-label="A magnifying glass. Take a closer look?"
              className="pointer-events-auto relative block w-full cursor-pointer"
            >
              <span
                className="block transition-transform duration-500 ease-out"
                style={{ transform: lookingCloser ? "rotate(-24deg) scale(1.35) translate(12%, -8%)" : undefined }}
              >
                <span aria-hidden className="block"><MagnifyingGlassArt /></span>
              </span>
            </button>
          </div>
        </ParallaxLayer>
      </div>

      {/* breadboard — sits near the hardware. Click it and the circuit closes:
          it lights up mint, like the first LED you ever got to blink. */}
      <div className="pointer-events-none absolute left-[5%] top-[46%] z-0 w-[calc(var(--su)*16)] opacity-90">
        <ParallaxLayer depth={1.1}>
          <div className="anim-float" style={{ animationDelay: "1.1s" }}>
            <button
              type="button"
              onClick={closeCircuit}
              aria-label="A breadboard. Close the circuit?"
              className="pointer-events-auto relative block w-full cursor-pointer transition-[filter] duration-300"
              style={{ filter: circuitOn ? "drop-shadow(0 0 14px rgba(125,232,194,0.75)) brightness(1.08)" : undefined }}
            >
              <span aria-hidden className="block"><BreadboardArt /></span>
            </button>
          </div>
        </ParallaxLayer>
      </div>

      {/* centerpiece notebook — About. One layer below the other objects so their
          tags, which sit near its edges on smaller desks, always stay clickable. */}
      <motion.div
        custom={0}
        variants={stagger}
        initial="hidden"
        animate="show"
        className="pointer-events-none absolute left-1/2 top-1/2 z-[9] w-[calc(var(--su)*44)] -translate-x-1/2 -translate-y-[54%]"
      >
        <ParallaxLayer depth={0.5}>
          <div className="anim-float">
            <DeskObject label={label("about")} index={num("about")} ariaLabel={aria("about")} onOpen={() => onOpen("about")} peek={peeks.about} peekSide="right" tilt={0.6}>
              <NotebookArt />
            </DeskObject>
          </div>
          <div className="anim-sway mt-2 w-[30%] translate-x-[55%]">
            <button
              type="button"
              onClick={nudgePencil}
              aria-label="Nudge the pencil"
              className="group relative pointer-events-auto block w-full cursor-pointer text-left"
            >
              <span aria-hidden className="block"><PencilArt doodling={pencilDoodling} /></span>
            </button>
          </div>
        </ParallaxLayer>
      </motion.div>

      {/* Awards shelf — top far right */}
      <motion.div
        custom={3}
        variants={stagger}
        initial="hidden"
        animate="show"
        className="pointer-events-none desk-awards absolute right-[3%] top-[42%] z-10 w-[calc(var(--su)*9)]"
      >
        <ParallaxLayer depth={2}>
          <div className="anim-float" style={{ animationDelay: "1.4s" }}>
            <DeskObject label={label("awards")} index={num("awards")} ariaLabel={aria("awards")} onOpen={() => onOpen("awards")} peek={peeks.awards} peekSide="left" tilt={-4} labelBelow>
              <AwardsShelfArt />
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
        className="pointer-events-none absolute bottom-[max(10%,88px)] right-[5%] z-10 w-[calc(var(--su)*14)]"
      >
        <ParallaxLayer depth={1.7}>
          <div className="anim-float" style={{ animationDelay: "1.6s" }}>
            <DeskObject label={label("contact")} index={num("contact")} ariaLabel={aria("contact")} onOpen={() => onOpen("contact")} peek={peeks.contact} peekSide="left" tilt={3}>
              <ContactCardArt />
            </DeskObject>
          </div>
        </ParallaxLayer>
      </motion.div>
      {/* USC coffee mug — cold by now, kept anyway, tucked at the far edge
          beside the laptop. Quietly clickable: a small reward for anyone
          curious enough to poke at something that looks purely decorative. */}
      <div className="pointer-events-none absolute left-[0.5%] top-[68%] z-0 w-[calc(var(--su)*6)]">
        <ParallaxLayer depth={1}>
          <div className="anim-float" style={{ animationDelay: "2s" }}>
            <button
              type="button"
              onClick={pokeMug}
              aria-label="It's just a mug. Or is it?"
              className="group relative pointer-events-auto block cursor-pointer transition-transform hover:scale-105 active:scale-95"
            >
              <span aria-hidden className="block"><USCMugArt excited={mugExcited} /></span>
            </button>
          </div>
        </ParallaxLayer>
      </div>

      {/* a small robot companion, idling in the open patch of desk mat below
          the notebook — verified clear of the sticky notes, resume, notebook
          shadow, and dock via real bounding boxes. Quietly clickable. */}
      <div className="pointer-events-none absolute left-[49%] top-[72%] z-0 w-[calc(var(--su)*6)]">
        <ParallaxLayer depth={1.1}>
          <div className="anim-float" style={{ animationDelay: "1.1s" }}>
            <button
              type="button"
              onClick={wakeRobot}
              aria-label="Say hi to the little robot"
              className="group relative pointer-events-auto block cursor-pointer transition-transform hover:scale-105 active:scale-95"
            >
              <span aria-hidden className="block"><RobotCompanionArt waving={robotWaving} /></span>
            </button>
          </div>
        </ParallaxLayer>
      </div>

      {/* tiny orrery paperweight, an old gift, orbiting quietly between the
          shelf and the case file. Also quietly clickable. */}
      <div className="pointer-events-none absolute right-[13%] top-[56%] z-0 w-[calc(var(--su)*6.5)]">
        <ParallaxLayer depth={1.2}>
          <div className="anim-float" style={{ animationDelay: "0.6s" }}>
            <button
              type="button"
              onClick={spinOrrery}
              aria-label="A little paperweight. Give it a spin?"
              className="group relative pointer-events-auto block cursor-pointer transition-transform hover:scale-105 active:scale-95"
            >
              <span aria-hidden className="block"><OrreryArt spun={orrerySpun} /></span>
            </button>
          </div>
        </ParallaxLayer>
      </div>

    </ParallaxProvider>
  );
}
