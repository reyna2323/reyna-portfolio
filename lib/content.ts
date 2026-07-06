/* =============================================================================
   REYNA — THIS IS YOUR CONTENT FILE. Edit everything about the site here:
   your bio, education, work history, project write-ups, links, awards,
   certifications, and section labels.

   • Theme COLORS + text tokens live in app/globals.css (look for
     "THEME COLORS — EDIT HERE"). Text tokens are deliberately separate
     from decorative colors — don't dim a token with opacity, add a new
     token instead.
   • Your resume PDF: drop the real file at  public/resume.pdf  (the Download
     button already points there).
   • GitHub links marked "placeholder" below are dead on purpose — replace
     them with real repo URLs when ready. No phone number is published
     anywhere on the site by design — keep it that way.
   ============================================================================= */

export type SectionId =
  | "about"
  | "hardware"
  | "software"
  | "ml"
  | "teaching"
  | "awards"
  | "resume"
  | "contact";

export interface Section {
  id: SectionId;
  label: string; // dock / tab label
  hand: string; // handwritten label shown on hover over desk objects
  blurb: string; // one-liner shown in panel headers
}

export interface Project {
  id: string;
  title: string;
  category: string;
  period?: string; // e.g. "Sep 2025 to Present"
  artifact: "terminal" | "casefile" | "datasheet" | "notebook" | "polaroid";
  description: string;
  stack: string[];
  built: string; // "what I built"
  highlights?: string[]; // extra bullets, rendered under "what I built"
  mattered: string; // "why it mattered"
  github?: string; // replace placeholder URLs with real repos
  demo?: string;
}

/* ---------------------------------------------------------------- identity */

export const site = {
  name: "Reyna Patel",
  role: "Computer Engineering & Computer Science @ USC",
  tagline: "hardware, software & everything soldered in between",
  email: "reynapat@usc.edu",
  linkedin: "https://linkedin.com/in/reynapatelegv",
  github: "https://github.com/reyna2323",
  resumeUrl: "/resume.pdf",
};

/* ---------------------------------------------------------------- sections */

export const sections: Section[] = [
  { id: "about", label: "About", hand: "about me ♡", blurb: "the engineer behind the desk" },
  { id: "hardware", label: "Hardware", hand: "hardware & embedded", blurb: "pins, protocols & pink PCBs" },
  { id: "software", label: "Software", hand: "software & apps", blurb: "full-stack builds that ship" },
  { id: "ml", label: "ML / Data", hand: "ml & data", blurb: "signals, stars & statistics" },
  { id: "teaching", label: "Teaching", hand: "teaching & leading", blurb: "passing the soldering iron" },
  { id: "awards", label: "Awards", hand: "shiny things ✧", blurb: "trophies for the shelf" },
  { id: "resume", label: "Resume", hand: "my résumé", blurb: "the whole story on one page" },
  { id: "contact", label: "Contact", hand: "say hi!", blurb: "wired for new connections" },
];

/* ------------------------------------------------------------------- about */

export const about = {
  greeting: "hi, I'm Reyna ♡",
  paragraphs: [
    "I'm a rising sophomore at USC studying Computer Engineering & Computer Science with a minor in Mathematics, which is a long way of saying I refuse to pick between the soldering iron and the compiler.",
    "I build complete systems: robots that read sensor data on embedded Linux, mobile apps with real-time backends, ML pipelines that turn messy physiological signals into predictions, and the design layer that makes it all feel human. If it has pins, an API, or a dataset, I want to wire it together.",
    "The throughline is curiosity with follow-through. I like owning a project from the breadboard sketch to the deployed build, and making it a little prettier than it strictly needs to be.",
  ],
  stickies: [
    "USC · CECS + Math minor",
    "happiest with a logic analyzer open",
    "will absolutely color-code the wiring",
    "currently: robots that care back",
  ],
  alsoOnCampus: {
    role: "Camera & Network Operator, USC Distance Education Network at Viterbi",
    period: "Aug 2025 to Present",
    detail:
      "I run the cameras and AV network equipment for graduate engineering lectures at Viterbi. That means setting up gear, monitoring quality for live and recorded sessions, and troubleshooting on the spot with instructors.",
  },
};

export const education = {
  school: "University of Southern California",
  degree: "B.S. Computer Engineering & Computer Science, Minor in Mathematics",
  location: "Los Angeles, CA",
  period: "Expected May 2029",
  coursework: [
    "Embedded Systems",
    "Data Structures",
    "Object-Oriented Programming (C/C++)",
    "Discrete Structures",
    "Linear Algebra & Linear Differential Equations",
  ],
};

/* ---------------------------------------------------------------- hardware */

export const hardware = {
  intro:
    "My hardware world runs from bare GPIO pins to full system deployments: research robots on embedded Linux and racks of machines rebuilt by hand.",
  buses: ["UART", "I2C", "SPI", "PWM", "ADC", "GPIO"],
  skills: [
    "Raspberry Pi & embedded Linux",
    "C/C++ & Python for firmware and tooling",
    "Sensor & actuator control",
    "Hardware validation & debugging",
    "Oscilloscope & signal analysis",
    "BIOS configuration & diagnostics",
    "CPU / RAM / drive / peripheral upgrades",
  ],
  projectIds: ["sar-robot", "revcor"],
};

/* ---------------------------------------------------------------- software */

export const software = {
  intro:
    "Full-stack means the whole stack: React Native front ends, TypeScript backends, auth, real-time data, and the APIs that glue it all together.",
  languages: ["JavaScript", "TypeScript", "HTML", "CSS", "Java", "C#", "SQL", "Kotlin", "SwiftUI"],
  projectIds: ["edma", "recycode", "sproutsy"],
};

/* --------------------------------------------------------------- ml / data */

export const ml = {
  intro:
    "I like ML where it touches the physical world: biosignals from real people, light curves from real stars. Python pipelines, honest statistics, plots you can defend.",
  tools: ["Python", "PyTorch", "TensorFlow", "pandas / NumPy", "statistical analysis", "data visualization"],
  projectIds: ["stress-ml", "astro-ml"],
};

/* ---------------------------------------------------------------- teaching */

export interface TeachingRole {
  title: string;
  org: string;
  period: string;
  detail: string;
  highlights?: string[];
  note: string;
}

export const teaching: { intro: string; roles: TeachingRole[] } = {
  intro: "The fastest way to understand a system is to teach it to someone who's never seen it.",
  roles: [
    {
      title: "Computer Science Teaching Assistant",
      org: "James B. Conant High School",
      period: "Aug 2024 to May 2025",
      detail:
        "Earned EDU201 dual credit working as a TA in the AP CS A classroom. I tutored students across all CS courses and built a full Arduino curriculum from scratch for future years: C/C++ firmware examples, GPIO, PWM, ADC, and interrupt-driven control.",
      highlights: [
        "Debugged hardware-software integration issues via serial monitoring and signal inspection alongside students",
        "Graded projects and assessments, and created review guides and structured test procedures",
      ],
      note: "java + jumper wires",
    },
    {
      title: "Instructor",
      org: "Sylvan Learning",
      period: "Feb 2025 to Aug 2025",
      detail:
        "Tutored K-12 students in math, English, and test prep, and led the Sylvan InZone STEM summer camp at Harper College: Lego Bot Labs, Coding Fundamentals, Python Programming, and STEM challenges in sustainable energy.",
      note: "tiny robots, big ideas",
    },
  ],
};

/* ------------------------------------------------------------------ awards */

export const awards = [
  { title: "National Merit Scholarship Winner", year: "2025", org: "National Merit Scholarship Corporation", tier: "national" },
  { title: "National Finalist in Cybersecurity & Digital Forensics", year: "2024", org: "Business Professionals of America", tier: "national" },
  { title: "National Qualifier in HTML Web Design", year: "2025", org: "Business Professionals of America", tier: "national" },
  { title: "State Finalist in Python Programming", year: "2024", org: "Business Professionals of America", tier: "state" },
];

export const certifications = [
  "Certiport IT Specialist: HTML and CSS",
  "CITI Research HIPAA",
  "American Heart Association CPR & AED",
];

/* ------------------------------------------------------------------ resume */

export const resume = {
  intro:
    "One page, no fluff: education, research, engineering work, and the projects from this desk, in a format recruiters can skim in 30 seconds.",
  highlights: [
    "USC: B.S. Computer Engineering & Computer Science, Math minor, expected May 2029",
    "Undergraduate researcher at USC Viterbi Interaction Lab: assistive robotics + ML on physiological signals, contributing to publications",
    "IT hardware engineering at Revcor: 80+ systems configured and deployed",
    "Full-stack mobile apps: EDMA, Recycode, Sproutsy",
    "ML research: stress-trajectory prediction & exoplanet detection (92% acc.), authored paper + seminar talk",
    "CS Teaching Assistant (dual credit) + Sylvan STEM instructor",
  ],
};

/* ----------------------------------------------------------------- contact */

export const contact = {
  intro:
    "Whether it's research, an internship, a hackathon team, or just trading favorite debugging war stories, my inbox is open.",
  lines: [
    { label: "Email", value: "reynapat@usc.edu", href: "mailto:reynapat@usc.edu" },
    { label: "LinkedIn", value: "linkedin.com/in/reynapatelegv", href: "https://linkedin.com/in/reynapatelegv" },
    { label: "GitHub", value: "github.com/reyna2323", href: "https://github.com/reyna2323" },
  ],
};

/* ---------------------------------------------------------------- projects */

export const projects: Record<string, Project> = {
  "sar-robot": {
    id: "sar-robot",
    title: "Socially Assistive Robotics Research",
    category: "USC Viterbi Interaction Lab · Undergraduate Researcher",
    period: "Sep 2025 to Present",
    artifact: "casefile",
    description:
      "A Raspberry Pi-based platform for socially assistive robot research: sensing, actuation, and behavior all running on embedded Linux.",
    stack: ["Raspberry Pi", "Embedded Linux", "Python", "GPIO / PWM / ADC", "UART · I2C · SPI"],
    built:
      "I prototyped the Raspberry Pi hardware stack for these robots: sensors, actuators, and control logic running on embedded Linux, with each signal path verified on the oscilloscope before trusting it in a study.",
    highlights: [
      "Built data collection and preprocessing pipelines from hardware devices to support downstream ML modeling",
      "Validated every signal path with an oscilloscope before trusting it in a study",
    ],
    mattered:
      "Robots meant to support people have to be reliable around people. Careful hardware validation turned a research prototype into a platform the team could actually run sessions on.",
    github: "https://github.com/reynapatel", // placeholder
  },
  revcor: {
    id: "revcor",
    title: "Revcor IT Hardware Engineering",
    category: "IT Technician",
    period: "Jun 2024 to Aug 2024",
    artifact: "datasheet",
    description:
      "Hands-on hardware work at scale: configuring, upgrading, and deploying 80+ machines across an industrial organization.",
    stack: ["CPU / RAM / storage upgrades", "BIOS configuration", "Peripheral integration", "Diagnostics"],
    built:
      "Rebuilt and deployed 80+ systems from scratch: CPUs, RAM, drives, and peripherals swapped in, BIOS tuned, and structured diagnostics run to catch failures before users did.",
    mattered:
      "Eighty machines is where 'it works on one box' stops counting. I learned repeatable process, careful documentation, and respect for static wrist straps.",
  },
  edma: {
    id: "edma",
    title: "USC EDMA App",
    category: "Software Engineering Intern",
    period: "Aug 2025 to Dec 2025",
    artifact: "terminal",
    description:
      "Official app for USC's Electronic Dance & Music Association. Events, member info, and announcements all in one place.",
    stack: ["React Native", "TypeScript", "Supabase", "Realtime subscriptions"],
    built:
      "A React Native app with a TypeScript backend, Supabase auth, and real-time event updates. New shows and lineup changes push to every member's phone the moment they go up.",
    highlights: [
      "Designed intuitive UI components and social features that help students connect around shared music preferences",
      "Implemented RESTful APIs and backend logic for async workflows, keeping the architecture modular",
    ],
    mattered:
      "A student org lives or dies on turnout. Real-time updates replaced a chain of groupchat screenshots with one source of truth.",
    github: "https://github.com/reynapatel", // placeholder
    demo: "#",
  },
  recycode: {
    id: "recycode",
    title: "Project Recycode",
    category: "Full-Stack Mobile · Sustainability",
    artifact: "notebook",
    description:
      "A mobile platform that makes recycling legible: scan, learn, and act, powered by external environmental APIs.",
    stack: ["React Native", "Supabase", "Softr.io", "External APIs"],
    built:
      "The React Native client and Supabase data layer, wired to Softr.io tooling and third-party APIs so users get accurate, local recycling guidance instead of generic rules.",
    mattered:
      "Most recycling fails at the bin. Putting the right answer one tap away turns good intentions into correctly sorted plastic.",
    github: "https://github.com/reynapatel", // placeholder
  },
  sproutsy: {
    id: "sproutsy",
    title: "Sproutsy",
    category: "AI-Integrated Web App",
    artifact: "polaroid",
    description:
      "A plant-care companion that actually knows where you live: camera input, geolocation, and live weather feed an AI care engine.",
    stack: ["React", "Firebase", "AI-assisted logic", "Geolocation", "Camera input", "Weather APIs"],
    built:
      "An AI-integrated React and Firebase app with custom plant-layout logic that combines geolocation, camera input, and live weather tracking to give plants care schedules tuned to their actual conditions, not a generic label.",
    highlights: ["Created and presented a marketing plan for a hypothetical public release"],
    mattered:
      "Every houseplant guide assumes an average climate that nobody lives in. Sproutsy made the advice local, visual, and hard to ignore.",
    github: "https://github.com/reynapatel", // placeholder
    demo: "#",
  },
  "stress-ml": {
    id: "stress-ml",
    title: "Stress-Trajectory Prediction",
    category: "USC Viterbi Interaction Lab · Undergraduate Researcher",
    period: "Sep 2025 to Present",
    artifact: "casefile",
    description:
      "Python ML pipelines over physiological signals, predicting how a person's stress will evolve. The goal is systems that can respond before the spike happens.",
    stack: ["Python", "PyTorch", "TensorFlow", "AWS", "Signal processing", "Statistical analysis"],
    built:
      "Built and refined Python ML pipelines to model physiological signals and forecast stress trajectories. AWS handles data storage; the work is contributing to publications.",
    highlights: [
      "Built secure study interfaces that weave CBT exercises into the data collection flow",
      "Cleaned and windowed raw physiological time-series, engineered features, and evaluated trajectory models",
    ],
    mattered:
      "Predicting how stress unfolds over time, not just a single snapshot, is what lets a system help before things get bad. The pipeline made that question testable, and safe by default.",
  },
  "astro-ml": {
    id: "astro-ml",
    title: "AI in Astrophysics",
    category: "ML · Space Data",
    artifact: "notebook",
    description:
      "Predicting exoplanet orbital periods from NASA stellar flux data: 92% accuracy from raw light curves.",
    stack: ["Python", "TensorFlow", "NASA flux datasets", "Data visualization"],
    built:
      "A model that ingests stellar flux time-series from NASA data and predicts exoplanet orbital periods, with the preprocessing, training, and evaluation to back a 92% accuracy claim.",
    highlights: ["Authored a paper and delivered a formal presentation and seminar on AI's role in astrophysics research"],
    mattered:
      "Transit signals are needles in noisy starlight. Getting a model to find the rhythm of another world in that noise is the whole reason I fell for ML.",
    github: "https://github.com/reynapatel", // placeholder
  },
};

/* terminal commands auto-typed on the desk laptop */
export const terminalScript = [
  "ssh reyna@robot-lab",
  "python train.py --signal hrv",
  "i2cdetect -y 1",
  "npx expo start",
  "git push origin main",
  "minicom -D /dev/ttyUSB0",
];
