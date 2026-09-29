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

/** Every page a visitor can open: the contents page, each section, and the
 *  validation case study (a deep dive off Research, outside the numbered flip order). */
export type PageId = "start" | "validation" | SectionId;

export interface Section {
  id: SectionId;
  label: string; // plain nav label (dock, headers, contents page)
  hand: string; // handwritten tag shown on the desk object
  object: string; // which desk object opens it, shown on the contents page
  blurb: string; // one-liner shown in headers and on the contents page
  featured?: boolean; // gets the spotlight treatment on the desk and contents page
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
  short?: string; // short name for the project timeline
  figures?: { kind: "qr" | "dashboard" | "sprout" | "donate" | "transit"; caption: string }[]; // little animated figures on the card
  specs?: { value: string; label: string }[]; // readouts that count up on the card
}

/* ---------------------------------------------------------------- identity */

export const site = {
  name: "Reyna Patel",
  role: "Computer Engineering & Computer Science @ USC",
  tagline: "hardware, software & the intersection between",
  email: "reynapat@usc.edu",
  linkedin: "https://www.linkedin.com/in/reynapatelegv",
  github: "https://github.com/reyna2323",
  // put your résumé PDF in /public and set its path here (e.g. "/Reyna-Patel-Resume.pdf")
  // to show a "PDF ↗" link in the quick nav; leave it empty to hide the link
  resumePdf: "/Reyna-Patel-Resume.pdf" as string,
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
  { id: "research", label: "Research", hand: "my research", object: "the oscilloscope", blurb: "wearable-data pipelines, ML & 3 papers", featured: true },
  { id: "experience", label: "Experience", hand: "experience", object: "the résumé folder", blurb: "every role, current ones first" },
  { id: "projects", label: "Projects", hand: "projects", object: "the laptop", blurb: "a club platform, apps & exoplanets" },
  { id: "skills", label: "Skills", hand: "skills & tools", object: "the pink circuit board", blurb: "languages, cloud, research methods" },
  { id: "about", label: "About", hand: "about me ♡", object: "the notebook", blurb: "who I am and where I study" },
  { id: "awards", label: "Awards", hand: "awards", object: "the trophy shelf", blurb: "awards & certifications" },
  { id: "contact", label: "Contact", hand: "contact", object: "the envelope", blurb: "email, LinkedIn & GitHub" },
];

/** Reading order for page-flip buttons: contents page first, then each section. */
export const pageOrder: PageId[] = ["start", ...sections.map((s) => s.id)];

/** The deep technical page, linked from Research. */
export const validationPage = {
  id: "validation" as const,
  label: "Case study: the validation layer",
  hand: "case study",
  object: "the research page",
  blurb: "when real-world sensor data can actually be trusted",
};

export function pageMeta(id: PageId) {
  if (id === "start") return startPage;
  if (id === "validation") return validationPage;
  return sections.find((s) => s.id === id)!;
}

export function isPageId(value: string): value is PageId {
  return value === "validation" || (pageOrder as string[]).includes(value);
}

/* -------------------------------------------------------------- start here */

export const intro = {
  greeting: "hi, I'm Reyna ♡",
  summary:
    "I'm an undergraduate researcher at the USC Viterbi Interaction Lab, and I study Computer Engineering & Computer Science with a Mathematics minor at USC (class of 2028).",
  featured: {
    kicker: "featured · my research",
    title: "Wearable data + ML for a robot that helps with anxiety",
    detail:
      "I build the data pipelines, analyses, and human-centered research behind a socially assistive robot that coaches people through CBT, in an NIH-funded study.",
    stats: [
      { value: "3", label: "manuscripts under review" },
      { value: "~20", label: "study participants" },
      { value: "6", label: "AWS services in my pipeline" },
    ],
  },
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
      "Second author on two manuscripts and eleventh author on a third, all under review in human-computer interaction and robotics",
    ],
    more: { to: "research", label: "see all 20+ things I work on in the lab" },
  },
  {
    id: "fsn-club",
    title: "Programming Chair, Executive Board",
    org: "USC Food Science & Nutrition Club",
    location: "Los Angeles, CA",
    period: "Jan 2026 to Present",
    current: true,
    kind: "software",
    bullets: [
      "Independently built a full-stack React/Firebase web app for the club, including a role-based admin dashboard with 15 sections for managing events, attendance, finances, committees and new-member applications",
      "Built QR-code attendance check-in with real-time Firebase sync, and an offline-first data layer that falls back to local storage",
      "Designed an animated, responsive public site with Framer Motion, including an events calendar, a blog with reading progress, an interest form with live validation, and an AI chatbot trained on club content",
    ],
    more: { to: "projects", label: "see the full project" },
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

export type ResearchArea = "data" | "analysis" | "people" | "comms" | "infra";

export interface ResearchItem {
  title: string;
  detail: string;
  skills: string[];
  area: ResearchArea;
  featured?: boolean; // the 8 highlights at the top of the page
}

export const research = {
  lab: "USC Viterbi Interaction Lab",
  role: "Undergraduate Researcher",
  period: "Sep 2025 to Present",
  headline: "I build the data systems and research behind a robot that helps people through anxiety.",
  intro:
    "The lab runs an NIH-funded study where a socially assistive robot (SAR) guides people through cognitive behavioral therapy (CBT) exercises while they wear Fitbits. I own a lot of what happens to that data: getting it off the wrist and into the cloud, checking it, lining it up with each session, analyzing it, and writing it up. I also work on the human side, analyzing what therapists and students actually want from a robot like this.",
  // viz = the little instrument drawn on each stat tile
  stats: [
    { value: "3", label: "manuscripts under review in human-computer interaction and robotics", viz: "papers" },
    { value: "~20", label: "participants in a longitudinal NIH-funded study", viz: "people" },
    { value: "6", label: "AWS services in my automated data pipeline", viz: "services" },
    { value: "4+", label: "physiological signals aligned to sessions: HR, EDA, skin temp, SpO₂", viz: "signals" },
  ],
  // the signal chain, left to right, drawn as a flow on the research page
  flow: [
    { step: "Collect", detail: "Fitbit API (OAuth) + Google Takeout exports", tools: ["Fitbit API", "OAuth", "REST"] },
    { step: "Ingest", detail: "Lambda + EventBridge on a schedule, into S3", tools: ["Lambda", "EventBridge", "S3", "KMS"] },
    { step: "Clean", detail: "QC gates, UTC to local time, session alignment", tools: ["Python", "QA/QC", "time sync"] },
    { step: "Analyze", detail: "windowed features, exercise comparisons, forecasting", tools: ["features", "statistics", "modeling"] },
    { step: "Share", detail: "figures, papers, and one day, robot behavior", tools: ["Matplotlib", "writing", "posters"] },
  ],
  publications: [
    // position = where I appear in the author list (drawn as a little strip of dots; leave it out if not settled)
    // status = where the paper is: "writing" or "under review"
    { venue: "Manuscript in human-computer interaction", role: "Second author", position: 2, status: "under review" },
    { venue: "Manuscript in human-robot interaction", role: "Second author", position: 2, status: "under review" },
    { venue: "Manuscript in robotics", role: "Eleventh author", position: 11, status: "under review" },
    {
      venue: "Probing Internal Representations in Video-Language Models",
      status: "writing",
      question: "How do prompts change what a model represents internally?",
      detail:
        "Investigating how prompting changes the internal representations of video-language models. Using LLaVA-NeXT-Video, I extract hidden representations across transformer layers and train linear probes to measure how emotion-related information is encoded under different prompt conditions. By comparing these representations with the model's final predictions, this work examines whether prompts change what a model internally represents even when those changes are not visible from output accuracy alone.",
      tools: ["PyTorch", "LLaVA-NeXT-Video", "Linear probing", "Representation analysis", "Python"],
    },
    {
      venue: "Modeling Stress as a Dynamical System",
      kind: "Scoping review",
      status: "writing",
      question: "Can stress be modeled as a trajectory instead of a label?",
      detail:
        "Investigating how computational models capture the way stress and emotion regulation evolve over time from wearable physiological signals. I am conducting a scoping review of dynamical-systems approaches, including recurrent neural networks, continuous hidden Markov models, POMDPs, nonlinear time-series methods, and related state-based models. The review maps which models have been paired with signals such as heart rate, HRV, electrodermal activity, and respiration, how regulation trajectories are defined and validated, and whether these models are used for passive inference or adaptive closed-loop interventions.",
      tools: ["Dynamical systems", "Wearable sensing", "Affective computing", "Time-series modeling", "Stress regulation"],
      toolsLabel: "focus",
    },
  ] as {
    venue: string;
    kind?: string; // e.g. "Scoping review", shown next to the title
    role?: string;
    position?: number;
    status: "writing" | "under review";
    question?: string; // the research question, shown as a handwritten hook
    detail?: string;
    tools?: string[];
    toolsLabel?: string; // defaults to "tools"
  }[],
  publicationTopics:
    "The two second-author papers cover wearable physiological data during robot-guided CBT, and participatory design with therapists and university students.",
  areas: {
    data: "Data & cloud engineering",
    analysis: "Data science & modeling",
    people: "Human-centered research",
    comms: "Scientific communication",
    infra: "Infrastructure & operations",
  } satisfies Record<ResearchArea, string>,
  items: [
    /* ----- the 8 highlights ----- */
    {
      featured: true,
      area: "data",
      title: "Automated AWS pipeline for longitudinal Fitbit data",
      detail:
        "Designed a scheduled pipeline that retrieves and processes each participant's physiological data using Lambda, EventBridge, and S3, with tokens and credentials secured in Secrets Manager and KMS, and notifications through SES.",
      skills: ["AWS Lambda", "EventBridge", "S3", "Secrets Manager", "KMS", "SES"],
    },
    {
      featured: true,
      area: "data",
      title: "Wearable-sensor preprocessing pipeline",
      detail:
        "Python pipeline that parses raw Fitbit and Google Takeout JSON into analysis-ready datasets: UTC to local time conversion, timestamp alignment, session-window filtering, and structured CSV and pickle outputs.",
      skills: ["Python", "ETL", "JSON", "Time-series", "Reproducibility"],
    },
    {
      featured: true,
      area: "data",
      title: "Study-compliance monitoring",
      detail:
        "Classifies every participant-day as compliant or non-compliant from heart-rate timestamps and wear-time coverage, and drives the automated reminder emails that keep the study on track.",
      skills: ["Python", "Rule-based systems", "Data validation", "SES"],
    },
    {
      featured: true,
      area: "data",
      title: "Participant compensation automation",
      detail:
        "Python and openpyxl tooling that maps compliance histories into the lab's existing Excel compensation workbook, preserving formatting, finding payment and offboarding boundaries, making backups, and telling missing data apart from days outside the paid window.",
      skills: ["Python", "openpyxl", "Data reconciliation", "Edge cases"],
    },
    {
      featured: true,
      area: "analysis",
      title: "Physiology during robot-guided CBT",
      detail:
        "Segmented sessions into cognitive exercises, progressive muscle relaxation, and box breathing, compared physiological patterns across them with windowed sensor data, and checked where wearable signals agreed (or didn't) with momentary self-reported stress.",
      skills: ["Time-series analysis", "Multimodal data", "Statistics", "Behavioral data"],
    },
    {
      featured: true,
      area: "analysis",
      title: "Stress-trajectory forecasting",
      detail:
        "Contributed to modeling work that predicts how stress changes during SAR-supported CBT, with the goal of eventually informing how the robot behaves in the moment.",
      skills: ["Predictive modeling", "Sequential data", "Human-AI systems"],
    },
    {
      featured: true,
      area: "analysis",
      title: "Probing internal representations in video-language models",
      detail:
        "Research in progress, paper in the writing stage. When a task is described differently to a video-language model, does it represent the task differently inside, even if its answer looks the same? I extract LLaVA-NeXT-Video's hidden representations across transformer layers under different prompt conditions and train linear probes to see where emotion information appears, comparing that with the model's final predictions.",
      skills: ["PyTorch", "LLaVA-NeXT-Video", "Linear probing", "Representation analysis", "Python", "Interpretability"],
    },
    {
      featured: true,
      area: "analysis",
      title: "Scoping review: modeling stress as a dynamical system",
      detail:
        "Paper in the writing stage. Can stress be modeled as a trajectory instead of a label? I'm mapping how dynamical-systems approaches (RNNs, continuous HMMs, POMDPs, nonlinear time-series methods) pair with wearable signals like HR, HRV, EDA, and respiration, how regulation trajectories are defined and validated, and whether models only infer state or drive closed-loop interventions.",
      skills: ["Dynamical systems", "Wearable sensing", "Affective computing", "Time-series modeling", "Stress regulation", "Literature review"],
    },
    {
      featured: true,
      area: "people",
      title: "Inductive-deductive thematic analysis",
      detail:
        "Analyzed participatory-design sessions with therapists and university students with elevated anxiety: refined themes, organized supporting evidence, reconciled findings with the research questions, and iterated with the team.",
      skills: ["Qualitative analysis", "Thematic coding", "User research", "Synthesis"],
    },
    {
      featured: true,
      area: "infra",
      title: "Interaction Lab website",
      detail:
        "Maintain the lab's production website through a Firebase and GitHub pull-request workflow: personnel, research bios, contact and alumni pages, plus debugging an intermittent people-page image-loading issue and an alumni-timeline feature.",
      skills: ["Firebase", "Git/GitHub", "Pull requests", "Web debugging"],
    },

    /* ----- everything else, grouped by area ----- */
    {
      area: "data",
      title: "Fitbit API integration",
      detail:
        "Retrieved participant data through the Fitbit API with OAuth, and investigated how API, Takeout, and Fitbit-derived data sources differ.",
      skills: ["REST APIs", "OAuth", "Third-party data"],
    },
    {
      area: "data",
      title: "Sensor data quality control",
      detail:
        "Wear and contact gating, confidence thresholds, invalid-feature detection, and HRV quality gates, producing cleaned raw and Fitbit-derived datasets for analysis.",
      skills: ["Data QA/QC", "Anomaly detection", "Validation"],
    },
    {
      area: "data",
      title: "Multimodal alignment with study sessions",
      detail:
        "Matched Fitbit measurements to SAR-CBT session timestamps and verified the availability and quality of heart rate, EDA, skin temperature, SpO₂, and derived features for each participant.",
      skills: ["Time-series sync", "Multimodal data", "Experimental data"],
    },
    {
      area: "data",
      title: "Tracking down missing sensor data",
      detail:
        "Diagnosed where raw versus derived HRV was actually available across Fitbit exports, using find, grep, and archive inspection on Google Takeout datasets.",
      skills: ["Root-cause analysis", "Linux/CLI", "Data provenance"],
    },
    {
      area: "analysis",
      title: "Feature engineering for wearables",
      detail:
        "Minute buckets, baseline statistics, z-scores, session position, signal aggregation, and exercise-level frames over 30-second and multi-minute windows.",
      skills: ["Feature engineering", "Normalization", "Python"],
    },
    {
      area: "analysis",
      title: "Sequential modeling methods explored",
      detail:
        "Researched dynamical-systems models, Hidden Markov Models, and recurrent neural networks as candidate approaches for changing physiological and behavioral states.",
      skills: ["HMMs", "RNNs", "Dynamical systems", "Literature review"],
    },
    {
      area: "people",
      title: "Stakeholder needs into design requirements",
      detail:
        "Turned themes on personalization, engagement, trust and rapport, CBT homework, context awareness, comorbidity, and skill transfer into concrete ways a robot could fit clinical workflows, including where therapists and students wanted different things.",
      skills: ["Requirements", "UX research", "Product thinking"],
    },
    {
      area: "people",
      title: "Research-question development",
      detail:
        "Helped refine questions about gaps in current CBT practice, therapist agency, and how robots should integrate into treatment instead of replacing it.",
      skills: ["Problem framing", "Research design"],
    },
    {
      area: "comms",
      title: "Writing up results",
      detail:
        "Turned large amounts of sensor data and qualitative evidence into concise, defensible findings, and kept every claim traceable to the participant evidence behind it.",
      skills: ["Technical writing", "Evidence management", "Communicating uncertainty"],
    },
    {
      area: "comms",
      title: "Research visualizations",
      detail:
        "Matplotlib figures of Fitbit data across full-day, session, and exercise-level windows, time-aligned and ready for papers.",
      skills: ["Matplotlib", "Data visualization", "Figure design"],
    },
    {
      area: "comms",
      title: "Posters & presentations",
      detail:
        "Explained SAR-CBT, wearable sensing, and physiological analysis to audiences outside the implementation team.",
      skills: ["Presentation design", "Research communication"],
    },
    {
      area: "infra",
      title: "Maintainable research codebase",
      detail:
        "Reorganized the lab's code into a pipeline architecture with separate ingestion, alignment, filtering, visualization, diagnostics, and configuration, versioned with Git branches and pull requests.",
      skills: ["Software architecture", "Modular design", "Git/GitHub"],
    },
    {
      area: "infra",
      title: "Shared Linux & GPU computing",
      detail:
        "Run pipelines and manage Python environments on the lab's Blackwell server, and set up an audio-video transcription pipeline with FFmpeg, CUDA, and Hugging Face, diagnosing missing recordings before transcription.",
      skills: ["Linux", "CUDA", "FFmpeg", "Hugging Face"],
    },
    {
      area: "infra",
      title: "Study operations & on-call",
      detail:
        "Help run the technical side of multiple concurrent studies, including on-call coverage and coordinating with researchers and clinicians when issues come up.",
      skills: ["Ownership", "Troubleshooting", "Cross-functional teamwork"],
    },
  ] satisfies ResearchItem[] as ResearchItem[],
};

/* ------------------------------------------------ validation case study */

export type FailureId = "contact" | "invalid" | "buffer" | "timing" | "sources" | "timezone";

/* The deep-dive page off Research. Plots on the page use simulated signals:
   real participant data from the study stays private. No participant IDs. */
export const validationStudy = {
  kicker: "case study · from the lab notebook",
  title: "When can real-world sensor data actually be trusted?",
  thesis: "Building a trustworthy physiological-data pipeline, not just a pipeline that runs.",
  lesson: "A value can be present, plausible, and still invalid.",
  simulatedLabel: "Simulated signal based on failure patterns observed during pipeline development.",
  // the path every sample takes; each failure mode breaks one stage
  stages: ["Raw wearable data", "Quality validation", "Timestamp validation", "Session alignment", "Analysis-ready physiology"],
  failures: [
    {
      id: "contact",
      short: "No contact",
      title: "Missing / no-contact wearable data",
      stage: 1,
      looked:
        "The Fitbit may not record usable physiology when the device is off-wrist, poorly positioned, or has insufficient sensor contact. A timestamp existing doesn't mean the measurement behind it is usable.",
      check: "Wear and contact gating: a sample only counts when the device reports real sensor contact.",
      unchecked: "Minutes when the watch lost contact are treated as real readings.",
      caught: "Off-wrist and no-contact minutes are flagged and kept out of the analysis.",
    },
    {
      id: "invalid",
      short: "Invalid feature",
      title: "Vendor-invalid physiological features",
      stage: 1,
      looked:
        "Raw sensor values can exist while Fitbit's quality flags mark the derived feature invalid. With cEDA, raw values were there but valid_ceda_feats was false, so the cleaned cEDA became NaN.",
      check: "Carry the vendor's quality flags (like valid_ceda_feats) through preprocessing instead of trusting the raw number.",
      unchecked: "Plausible-looking cEDA values enter the analysis even though Fitbit marked them invalid.",
      caught: "Feature dropped: valid_ceda_feats = false.",
    },
    {
      id: "buffer",
      short: "Buffer incomplete",
      title: "Incomplete sensor buffers",
      stage: 1,
      looked:
        "Some features need enough consecutive sensor samples before they can be calculated reliably. ceda_buffer_filled: false meant measurements appeared in the raw data, but there wasn't enough valid information to accept the feature.",
      check: "Require the buffer-filled flag before a derived feature is accepted.",
      unchecked: "A feature computed from too few samples is treated as reliable.",
      caught: "Rejected until ceda_buffer_filled = true.",
    },
    {
      id: "timing",
      short: "Session timing",
      title: "Session-timing / phase-boundary inconsistencies",
      stage: 3,
      looked:
        "AWS session metadata could be incomplete or internally inconsistent: session events out of chronological order, or an end_exercise2_time missing even though two exercises occurred. That makes aligning physiology to CBT phases nontrivial.",
      check: "Validate the session log itself: events in order, and every CBT phase has both a start and an end before physiology is assigned to it.",
      unchecked: "Physiology gets assigned to a CBT phase whose boundaries were never recorded.",
      caught: "Session flagged: events out of order or a phase end missing.",
    },
    {
      id: "sources",
      short: "Missing sources",
      title: "Missing data sources during multimodal alignment",
      stage: 3,
      looked:
        "A participant can have Fitbit data but be missing the matching AWS session or tracker information. One participant had no usable AWS session; another lacked the expected tracker row.",
      check: "Audit every join, and label \"the metadata needed to align this is missing\" separately from \"no physiological response.\"",
      unchecked: "Missing metadata looks exactly like \"no physiological response.\"",
      caught: "Labeled \"alignment metadata missing,\" not \"no response.\"",
    },
    {
      id: "timezone",
      short: "Timezone offset",
      title: "Timezone / timestamp alignment errors",
      stage: 2,
      looked:
        "Fitbit, AWS, participant trackers, and session logs can represent time differently. A timezone offset or parsing error shifts otherwise valid physiology into the wrong CBT phase, and the data still looks perfectly reasonable.",
      check: "Normalize every source to UTC, convert to study-local time once, and check the result against known session windows.",
      unchecked: "Valid physiology lands in the wrong CBT phase, and nothing looks wrong.",
      caught: "Every source normalized to UTC; alignment checked against the session window.",
    },
  ] satisfies { id: FailureId; short: string; title: string; stage: number; looked: string; check: string; unchecked: string; caught: string }[],
  firstFooled: {
    heading: "the one that fooled me first",
    body: "One of the most misleading failures was seeing a physiological signal that looked like real data but was not actually valid for analysis. For one participant, the raw Fitbit/BSA output contained dozens of cEDA measurements with plausible numeric values, so at first glance the signal appeared usable. However, after applying Fitbit's quality information, the entire cleaned cEDA feature became missing. Tracing the discrepancy showed that the device had marked the cEDA features as invalid and reported that the required sensor buffer had not been filled. That changed how I approached validation: I stopped treating the presence of a numeric value as evidence that a measurement was usable and instead propagated sensor-quality flags through the preprocessing pipeline.",
  },
  code: `def validate_signal(row):
    """Simplified sketch of wearable quality checks."""

    if not row["sensor_contact"]:
        return None

    if not row["feature_valid"]:
        return None

    if not row["buffer_filled"]:
        return None

    return row["value"]`,
  codeDemo: `raw_value = 219.0

validated_value = validate_signal(sample)

# raw_value exists
# validated_value -> None`,
  codeCaption:
    "The difficult cases were not always missing measurements. Sometimes a measurement existed, but the surrounding quality metadata showed that it should never enter the analysis.",
};

/* ---------------------------------------------------------------- projects */

export const projectsIntro =
  "Four things I built outside of a job description: a full-stack platform that runs a USC club, an AI plant-care app, a clothing-donation nonprofit with its own website and app, and a model that finds the rhythm of other worlds in starlight.";

export const projects: Project[] = [
  {
    id: "fsn-club",
    title: "USC Food Science & Nutrition Club",
    category: "Programming Chair · Full-Stack Web App",
    period: "Jan 2026 to Present",
    artifact: "datasheet",
    description:
      "The club's public website and the admin portal its leaders run it from: events, blog posts, attendance, finances, committees and new-member applications, synced in real time through Firebase. I designed and built it independently as the executive board's programming chair.",
    stack: ["React 19", "Vite", "Firebase Realtime Database", "React Router", "Framer Motion", "CSS", "Botpress", "Vercel"],
    built:
      "An animated public site (events with countdowns, RSVPs and a calendar, a blog with reading progress, a join form with live validation, a ⌘K search palette and an AI chat assistant trained on club content) plus a role-based admin dashboard of about 3,000 lines.",
    highlights: [
      "Admin, Executive and General roles with different permissions across 15 dashboard sections, behind protected routes",
      "QR-code attendance: a leader starts a session and members check in from their phones, updating live in Firebase",
      "An offline-first data layer that uses Firebase when it's configured and falls back to local storage, with a one-time migration of existing data",
      "Analytics drawn by hand in SVG and CSS with no chart library: attendance bars, a task-completion ring, finance breakdowns and a member leaderboard",
      "Prospective-member tracking (search, filter, sort, pending → contacted → accepted) and member profiles with photo cropping and committee badges",
    ],
    mattered:
      "A student club usually runs on group chats and a dozen spreadsheets. This gave the whole exec board one live place to run events, attendance, money and recruiting, and gave members a site worth sending people to.",
    github: "https://github.com/reyna2323/usc-nutrition-site",
    short: "Nutrition Club",
    figures: [
      { kind: "qr", caption: "fig. 1a: QR check-in, syncing live" },
      { kind: "dashboard", caption: "fig. 1b: analytics, hand-drawn in SVG" },
    ],
    specs: [
      { value: "15", label: "dashboard sections" },
      { value: "3", label: "user roles" },
      { value: "52", label: "commits" },
    ],
  },
  {
    id: "sproutsy",
    title: "Sproutsy",
    category: "Full-Stack AI App",
    period: "Jan 2025 to Dec 2025",
    artifact: "polaroid",
    description:
      "A plant-care companion that actually knows where you live: camera input, geolocation, and live weather feed an AI care engine.",
    stack: ["React", "Firebase", "External APIs", "Geolocation", "Camera input", "Weather data"],
    built:
      "A full-stack, AI-integrated React and Firebase app with custom plant-layout logic that combines geolocation, camera input, and weather tracking.",
    highlights: ["Created and presented a full marketing plan for a hypothetical public release"],
    mattered:
      "Every houseplant guide assumes an average climate that nobody lives in. Sproutsy made the advice local, visual, and hard to ignore.",
    github: "https://github.com/reyna2323/Sproutsy_React_App",
    short: "Sproutsy",
    figures: [{ kind: "sprout", caption: "fig. 2: advice that grows with the weather" }],
    specs: [{ value: "3", label: "live inputs: camera, location, weather" }],
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
    short: "Recycode",
    figures: [{ kind: "donate", caption: "fig. 3: every drive, sorted and sent" }],
    specs: [{ value: "5,000+", label: "lbs of clothing donated" }],
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
    short: "Astro ML",
    figures: [{ kind: "transit", caption: "fig. 4: a planet dimming its star" }],
    specs: [{ value: "92%", label: "accuracy on orbital periods" }],
  },
];

/* ------------------------------------------------------------------ skills */

export const skills = {
  intro: "What I reach for, grouped by where it shows up in my work. Most of it gets daily use in the lab.",
  groups: [
    { label: "Languages", items: ["Python", "Java", "C/C++", "TypeScript", "JavaScript", "SQL", "HTML", "CSS"] },
    { label: "Cloud & data engineering", items: ["AWS Lambda", "EventBridge", "S3", "Secrets Manager", "KMS", "SES", "REST APIs", "OAuth", "openpyxl"] },
    { label: "ML & data science", items: ["PyTorch", "TensorFlow", "Time-series analysis", "Feature engineering", "Statistical modeling", "Matplotlib"] },
    { label: "Research methods", items: ["Thematic analysis", "Participatory design", "Multimodal sensor data", "Scientific writing"] },
    { label: "Frameworks & platforms", items: ["React", "React Native", "Firebase", "Supabase", "Vite", "React Router", "Framer Motion", "Vercel", "Hugging Face"] },
    { label: "Tools", items: ["Linux", "Git/GitHub", "CUDA", "FFmpeg", "LaTeX", "Vim"] },
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

/* terminal commands auto-typed on the desk laptop, each with the real
   result it "prints" (all drawn from the résumé) */
export const terminalScript: { cmd: string; out: string }[] = [
  { cmd: "ssh reyna@lab", out: "connected: USC Interaction Lab ♡" },
  { cmd: "python hr_model.py", out: "✓ HR · EDA · temp · SpO₂ aligned" },
  { cmd: "python forecast.py", out: "✓ stress trajectories modeled" },
  { cmd: "vercel --prod", out: "✓ nutrition club site deployed" },
  { cmd: "npx expo start", out: "✓ Recycode app is live" },
  { cmd: "git push origin main", out: "✓ shipped, 5,000+ lbs donated" },
  { cmd: "python kepler.py", out: "✓ orbital periods: 92% accuracy" },
];

/* readouts that cycle on the oscilloscope screen, like live measurements */
export const scopeReadouts = ["3 papers in review", "n≈20 participants", "6 AWS services", "HR·EDA·TEMP·SpO₂"];

/* at-a-glance facts on the little index card that appears when you hover a
   desk object: the headline of each page before you open it */
export const peeks: Record<PageId, string[]> = {
  start: ["who I am + a map of this desk", "7 pages, research first"],
  research: ["3 manuscripts under review in HCI and robotics", "NIH-funded study, ~20 participants", "6-service AWS data pipeline"],
  experience: ["7 roles, 3 current", "USC Interaction Lab, USC DEN + a club exec board", "research · software · teaching · hardware"],
  projects: ["USC nutrition club: site + admin portal", "Sproutsy: AI plant-care app", "Recycode: 5,000+ lbs of clothing donated", "exoplanet periods at 92% accuracy"],
  skills: ["Python · C/C++ · TypeScript · Java", "AWS · PyTorch · React Native", "7 toolkits, from code to hardware"],
  about: ["USC CECS + Math minor, class of 2028", "CS TA, Arduino curriculum, STEM camp", "if I can't draw it, I don't know it yet"],
  awards: ["National Merit Scholarship Winner", "BPA national finalist: cybersecurity", "+ 2 certifications"],
  contact: ["reynapat@usc.edu", "github.com/reyna2323", "in/reynapatelegv"],
  validation: ["six failure modes", "a value can be present, plausible, and still invalid"],
};
