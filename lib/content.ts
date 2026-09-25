/* =============================================================================
   REYNA — THIS IS YOUR CONTENT FILE. Edit everything about the site here:
   your bio, education, work history, research, project write-ups, links,
   awards, certifications, and section labels.

   • The site reads like a notebook: a "Start here" page, then numbered
     pages in the order of `sections` below. Reorder that array to reorder
     the whole site (dock, contents page, page-flip buttons, mobile list).
   • Theme COLORS + text tokens live in app/globals.css (look for
     "THEME COLORS — EDIT HERE"). Text tokens are deliberately separate
     from decorative colors — don't dim a token with opacity, add a new
     token instead.
   • No resume download and no phone number anywhere on the site, by design.
   ============================================================================= */

export type SectionId =
  | "about"
  | "experience"
  | "research"
  | "projects"
  | "skills"
  | "awards"
  | "contact";

/** Every page a visitor can open: the contents page plus each section. */
export type PageId = "start" | SectionId;

export interface Section {
  id: SectionId;
  label: string; // plain nav label (dock, headers, contents page)
  hand: string; // handwritten tag shown on the desk object
  object: string; // which desk object opens it, shown on the contents page
  blurb: string; // one-liner shown in headers and on the contents page
}

export interface Project {
  id: string;
  title: string;
  category: string;
  period?: string; // e.g. "Jan 2025 to May 2025"
  artifact: "terminal" | "casefile" | "datasheet" | "notebook" | "polaroid";
  description: string;
  stack: string[];
  built: string; // "what I built"
  highlights?: string[]; // extra bullets, rendered under "what I built"
  mattered: string; // "why it mattered"
  github?: string; // link to a real repo; the button hides when unset
  demo?: string; // link to a live demo; the button hides when unset
}

/* ---------------------------------------------------------------- identity */

export const site = {
  name: "Reyna Patel",
  role: "Computer Engineering & Computer Science @ USC",
  tagline: "hardware, software & the intersection between",
  email: "reynapat@usc.edu",
  linkedin: "https://www.linkedin.com/in/reynapatelegv",
  github: "https://github.com/reyna2323",
};

/* ---------------------------------------------------------------- sections */

export const startPage = {
  id: "start" as const,
  label: "Start here",
  hand: "start here ✦",
  object: "the sticky notes",
  blurb: "who I am + a map of this desk",
};

export const sections: Section[] = [
  { id: "about", label: "About", hand: "about me ♡", object: "the notebook", blurb: "who I am and where I study" },
  { id: "experience", label: "Experience", hand: "experience", object: "the résumé folder", blurb: "every role, newest first" },
  { id: "research", label: "Research", hand: "research", object: "the oscilloscope", blurb: "ML on heart-rate signals + 3 papers" },
  { id: "projects", label: "Projects", hand: "projects", object: "the laptop", blurb: "an app, a nonprofit & exoplanets" },
  { id: "skills", label: "Skills", hand: "skills & tools", object: "the pink circuit board", blurb: "languages, frameworks & coursework" },
  { id: "awards", label: "Awards", hand: "shiny things ✧", object: "the trophy shelf", blurb: "awards & certifications" },
  { id: "contact", label: "Contact", hand: "say hi!", object: "the envelope", blurb: "email, LinkedIn & GitHub" },
];

/** Reading order for page-flip buttons: contents page first, then each section. */
export const pageOrder: PageId[] = ["start", ...sections.map((s) => s.id)];

export function pageMeta(id: PageId) {
  return id === "start" ? startPage : sections.find((s) => s.id === id)!;
}

export function isPageId(value: string): value is PageId {
  return (pageOrder as string[]).includes(value);
}

/* -------------------------------------------------------------- start here */

export const intro = {
  greeting: "hi, I'm Reyna ♡",
  summary:
    "I study Computer Engineering & Computer Science at USC with a minor in Mathematics. I build ML pipelines for research, full-stack apps that people actually use, and the curriculum that teaches the next kid how an Arduino works.",
  now: [
    { label: "researching", value: "physiological ML for a socially assistive robot at the USC Viterbi Interaction Lab" },
    { label: "publishing", value: "second author on 2 manuscripts submitted to CHI 2027 and HRI 2027" },
    { label: "graduating", value: "May 2028, B.S. CECS + Math minor" },
  ],
};

/* ------------------------------------------------------------------- about */

export const about = {
  greeting: "hi, I'm Reyna ♡",
  paragraphs: [
    "I'm studying Computer Engineering & Computer Science at USC with a minor in Mathematics, which is a long way of saying I refuse to pick between the soldering iron and the compiler.",
    "I build complete systems: ML pipelines that turn messy heart-rate signals into stress forecasts, mobile apps with real-time backends, and a nonprofit's website and app built from scratch. If it has pins, an API, or a dataset, I want to wire it together.",
    "Teaching keeps me honest. I've been a CS TA, written an Arduino curriculum, and run a STEM summer camp, and I still believe that if I can't draw it, I don't know it yet.",
  ],
  stickies: [
    "USC · CECS + Math minor",
    "happiest with a dataset open",
    "will absolutely color-code the wiring",
    "currently: robots that care back",
  ],
};

export const education = {
  school: "University of Southern California",
  degree: "B.S. Computer Engineering & Computer Science, Minor in Mathematics",
  location: "Los Angeles, CA",
  period: "Expected May 2028",
  coursework: [
    "Algorithms and Theory of Computing",
    "Principles of Software Development",
    "Data Structures",
    "Object-Oriented Programming",
    "Distributed Systems for the IoT",
    "Embedded Systems",
    "Discrete Structures",
    "Linear Algebra & Linear Differential Equations",
  ],
};

/* -------------------------------------------------------------- experience */

export type RoleKind = "research" | "software" | "teaching" | "hardware" | "media";

export interface Role {
  id: string;
  title: string;
  org: string;
  location: string;
  period: string;
  current?: boolean;
  kind: RoleKind;
  bullets: string[];
  more?: { to: SectionId; label: string }; // cross-link to a deeper page
}

export const experience: Role[] = [
  {
    id: "interaction-lab",
    title: "Undergraduate Researcher",
    org: "USC Viterbi School of Engineering, Interaction Lab",
    location: "Los Angeles, CA",
    period: "Sep 2025 to Present",
    current: true,
    kind: "research",
    bullets: [
      "Building Python ML pipelines to preprocess and model physiological heart-rate signals across hundreds of sessions",
      "Automating Fitbit compliance tracking and reminder emails (Python, AWS SES) for a 20-participant NIH-funded study",
      "Developing statistical analysis models forecasting stress trajectories for a socially assistive robot delivering CBT exercises",
      "Second author on 2 research manuscripts submitted to CHI 2027 and HRI 2027; contributor to a manuscript submitted to IEEE T-RO",
    ],
    more: { to: "research", label: "read about the research" },
  },
  {
    id: "den",
    title: "Camera Operator / Network Operator",
    org: "USC Distance Education Network @ Viterbi",
    location: "Los Angeles, CA",
    period: "Aug 2025 to Present",
    current: true,
    kind: "media",
    bullets: [
      "Operating professional broadcast equipment to record graduate-level engineering lectures for USC's Distance Education Network",
      "Monitoring live and recorded sessions to ensure audio/visual quality, continuity, and accessibility for remote students",
      "Coordinating with instructors and technical staff to troubleshoot equipment and keep course delivery smooth",
    ],
  },
  {
    id: "edma",
    title: "Software Engineering Intern",
    org: "USC Electronic Dance & Music Association",
    location: "Los Angeles, CA",
    period: "Aug 2025 to Sep 2025",
    kind: "software",
    bullets: [
      "Developed a React Native mobile app for the USC Electronic Dance & Music Association to streamline event discovery",
      "Implemented a TypeScript backend with a Supabase database for user authentication and real-time event updates",
      "Implemented RESTful APIs and backend logic for asynchronous workflows while keeping the architecture modular",
    ],
  },
  {
    id: "sylvan",
    title: "Instructor",
    org: "Sylvan Learning",
    location: "Schaumburg, IL",
    period: "Feb 2025 to Aug 2025",
    kind: "teaching",
    bullets: [
      "Tutored K-12 students in math, English, and SAT/ACT/AP test prep using Sylvan's adaptive curriculum",
      "Led STEM courses for Sylvan's InZone summer camp at Harper College: Lego Bot Labs, Coding Fundamentals, Python Programming, and STEM Challenges in Sustainable Energy",
    ],
  },
  {
    id: "conant",
    title: "Computer Science Teaching Assistant",
    org: "James B. Conant High School",
    location: "Hoffman Estates, IL",
    period: "Aug 2024 to May 2025",
    kind: "teaching",
    bullets: [
      "Earned EDU201 dual credit assisting an AP Computer Science A class and tutoring all computer science students",
      "Developed the full curriculum for a new Arduino-focused unit used in following academic years",
      "Debugged student code, graded projects and assessments, and created review guides",
    ],
  },
  {
    id: "revcor",
    title: "IT Technician",
    org: "Revcor",
    location: "Carpentersville, IL",
    period: "Jun 2024 to Aug 2024",
    kind: "hardware",
    bullets: [
      "Configured and deployed 80+ computer systems with updated software, resolving hardware-software integration issues",
      "Installed and upgraded CPUs, RAM, drives, and peripherals in existing company equipment to optimize workstations",
    ],
  },
];

/* ---------------------------------------------------------------- research */

export const research = {
  intro:
    "I like ML where it touches real people. At the Interaction Lab I work on the data side of a socially assistive robot that guides people through CBT exercises: turning raw heart-rate signals into something the robot can act on.",
  lab: "USC Viterbi Interaction Lab",
  period: "Sep 2025 to Present",
  work: [
    {
      title: "Heart-rate ML pipelines",
      detail: "Python pipelines that clean, window, and model physiological heart-rate signals across hundreds of study sessions.",
    },
    {
      title: "Stress-trajectory forecasting",
      detail: "Statistical models that forecast how a participant's stress evolves, so the robot can respond before the spike instead of after it.",
    },
    {
      title: "Study automation",
      detail: "Fitbit compliance tracking and automated reminder emails (Python, AWS SES) that keep a 20-participant NIH-funded study on track.",
    },
  ],
  tools: ["Python", "ML pipelines", "Statistical modeling", "Time-series signals", "AWS SES", "Fitbit data"],
  publications: [
    { venue: "CHI 2027", role: "Second author", status: "manuscript submitted" },
    { venue: "HRI 2027", role: "Second author", status: "manuscript submitted" },
    { venue: "IEEE Transactions on Robotics (T-RO)", role: "Contributor", status: "manuscript submitted" },
  ],
};

/* ---------------------------------------------------------------- projects */

export const projectsIntro =
  "Three things I built outside of a job description: an AI plant-care app, a clothing-donation nonprofit with its own website and app, and a model that finds the rhythm of other worlds in starlight.";

export const projects: Project[] = [
  {
    id: "sproutsy",
    title: "Sproutsy",
    category: "Full-Stack AI App",
    period: "Jan 2025 to May 2025",
    artifact: "polaroid",
    description:
      "A plant-care companion that actually knows where you live: camera input, geolocation, and live weather feed an AI care engine.",
    stack: ["React", "Firebase", "External APIs", "Geolocation", "Camera input", "Weather data"],
    built:
      "A full-stack, AI-integrated React and Firebase app with custom plant-layout logic that combines geolocation, camera input, and weather tracking.",
    highlights: ["Created and presented a full marketing plan for a hypothetical public release"],
    mattered:
      "Every houseplant guide assumes an average climate that nobody lives in. Sproutsy made the advice local, visual, and hard to ignore.",
  },
  {
    id: "recycode",
    title: "Project Recycode",
    category: "Co-founder · Nonprofit + App",
    period: "Jan 2024 to May 2025",
    artifact: "notebook",
    description:
      "A local clothing-donation organization I co-founded: we collected over 5,000 pounds of clothing from libraries and schools and sent it where it was needed.",
    stack: ["React Native", "Supabase", "Softr.io", "External APIs"],
    built:
      "The organization's website and app, built with React Native, Supabase, Softr.io, and several external API integrations to coordinate drives and donations.",
    highlights: [
      "Collected, sorted, and donated 5,000+ lbs of clothing to homeless shelters and fabric recycling firms",
    ],
    mattered:
      "Good intentions pile up in closets. Recycode gave them a pickup point, a sorting process, and a place to go.",
  },
  {
    id: "astro-ml",
    title: "AI in Astrophysics",
    category: "Research Project · ML",
    period: "Jun 2024 to Apr 2025",
    artifact: "terminal",
    description:
      "Predicting exoplanet orbital periods from NASA stellar flux data, with 92% accuracy.",
    stack: ["Python", "Regression", "Feature engineering", "NASA flux data"],
    built:
      "A machine learning model that predicts exoplanet orbital periods from NASA stellar flux data, using regression analysis, data normalization, and feature engineering to push accuracy to 92%.",
    highlights: ["Authored a paper and delivered a formal presentation and seminar on the role of AI in astrophysics research"],
    mattered:
      "Transit signals are needles in noisy starlight. Getting a model to find another world's rhythm in that noise is the whole reason I fell for ML.",
  },
];

/* ------------------------------------------------------------------ skills */

export const skills = {
  intro: "What I reach for, grouped by where it shows up in my work.",
  groups: [
    { label: "Languages", items: ["Python", "Java", "C/C++", "TypeScript", "JavaScript", "SQL", "HTML", "CSS"] },
    { label: "ML & data", items: ["PyTorch", "TensorFlow", "Statistical modeling", "Regression", "Feature engineering"] },
    { label: "Frameworks & platforms", items: ["React", "React Native", "Firebase", "Supabase", "AWS SES", "REST APIs"] },
    { label: "Tools", items: ["Linux", "Git", "LaTeX", "Vim"] },
    { label: "Hardware", items: ["Arduino", "Embedded systems", "PC builds & upgrades", "Broadcast AV equipment"] },
  ],
};

/* ------------------------------------------------------------------ awards */

export const awards = [
  { title: "National Merit Scholarship Winner", year: "2025", org: "National Merit Scholarship Corporation", tier: "national" },
  { title: "National Finalist in Cybersecurity & Digital Forensics", year: "2024", org: "Business Professionals of America", tier: "national" },
  { title: "National Qualifier in Fundamentals of HTML Web Design", year: "2025", org: "Business Professionals of America", tier: "national" },
  { title: "State Finalist in Python Programming", year: "2024", org: "Business Professionals of America", tier: "state" },
];

export const certifications = ["Certiport IT Specialist: HTML and CSS", "CITI Research HIPAA"];

/* ----------------------------------------------------------------- contact */

export const contact = {
  intro:
    "Whether it's research, an internship, a hackathon team, or just trading favorite debugging war stories, my inbox is open.",
  lines: [
    { label: "Email", value: "reynapat@usc.edu", href: "mailto:reynapat@usc.edu" },
    { label: "LinkedIn", value: "linkedin.com/in/reynapatelegv", href: "https://www.linkedin.com/in/reynapatelegv" },
    { label: "GitHub", value: "github.com/reyna2323", href: "https://github.com/reyna2323" },
  ],
};

/* terminal commands auto-typed on the desk laptop */
export const terminalScript = [
  "ssh reyna@lab",
  "python hr_model.py",
  "python forecast.py",
  "npx expo start",
  "git push origin main",
  "python kepler.py",
];
