/* =============================================================
   EVERYTHING YOU WILL EVER NEED TO EDIT LIVES IN THIS FILE.
   The components just render what is here.

   Lines marked  // TODO  are placeholders — fix those first.
   ============================================================= */

export const person = {
  name: "Kaavya Dhir",
  kicker: "Software engineer · Backend & applied AI",
  tagline: "I build systems that know when not to answer.",
  blurb:
    "Final-year Computer Science student at Thapar Institute. I build backends, data pipelines and retrieval-augmented systems — FastAPI, SQL, Docker, AWS — tested and running in CI. Most of my recent work is on decision systems: an LLM reads the policy, deterministic code makes the call, and the system escalates rather than guessing, because a decision you cannot audit is worth very little.",
  email: "dhirkaavya@gmail.com",
  github: "https://github.com/kaavyadhir",
  linkedin: "https://www.linkedin.com/in/kaavya-dhir/",
  // Named so it downloads as "Kaavya-Dhir-Resume.pdf" rather than "resume.pdf".
  // To update: overwrite public/Kaavya-Dhir-Resume.pdf, then commit and push.
  resume: "/Kaavya-Dhir-Resume.pdf",
  location: "Patiala, India",
};

/* -------------------------------------------------------------
   THE FEATURED PROJECT
   ------------------------------------------------------------- */

export const featured = {
  name: "Prior Authorization Copilot",
  kicker: "Featured — live",
  line: "An LLM reads the policy. A rule engine makes the call.",
  live: "https://kaavya-copilot.duckdns.org/",
  repo: "https://github.com/kaavyadhir/Prior-auth-copilot",
  stats: [
    { value: "37", label: "tests" },
    { value: "3", label: "real CMS policies" },
    { value: "CI", label: "green on main" },
    { value: "EC2", label: "Docker, non-root" },
  ],
  body: [
    "A retrieval-augmented system over real CMS National Coverage Determinations — 100.1 bariatric surgery, 240.4 CPAP, 240.4.1 sleep testing. Policy documents are embedded and searched for the passage closest to the incoming request. Below a 0.35 similarity floor the system refuses to answer rather than guess; above it, the request is judged against that passage and returned as approve, deny or route-to-human with the governing text quoted.",
    "The language model does judgement only: per criterion, met / not met / unknown. A deterministic rule engine makes the decision. That split is the whole point — approval requires every criterion explicitly met, so no prompt can talk the system into approving. A documented not-met outranks an unknown, because a denial is a better answer than an escalation.",
    "It over-escalates on conditional policy text — a CPAP footnote whose precondition the note never states lands as unknown. The fix is a second pass asking whether each criterion's triggering circumstance applies at all, not more prompting.",
  ],
  stack: [
    "FastAPI",
    "Pydantic v2",
    "RAG",
    "Gemini",
    "Embeddings",
    "NumPy",
    "pytest",
    "Docker",
    "GitHub Actions",
    "AWS EC2",
  ],
};

/* -------------------------------------------------------------
   THE INTERACTIVE DEMO
   One sentence leaves the note; the verdict changes.

   VERIFY THESE AGAINST YOUR REAL PRESETS before you deploy —
   check the demo presets in the repo and make the text match
   word for word. The numbers below are your verified run.
   ------------------------------------------------------------- */

export const demo = {
  policy: "CMS NCD 100.1 — Bariatric Surgery",
  request: "Laparoscopic sleeve gastrectomy",
  note: {
    before:
      "42-year-old patient, BMI 41.2, with type 2 diabetes mellitus (HbA1c 8.4%). ",
    toggled:
      "Completed a 7-month physician-supervised weight management programme in 2024 without achieving sustained weight loss. ",
    after:
      "No prior bariatric procedure. Requesting laparoscopic sleeve gastrectomy.",
  },
  toggleLabel: "Remove the supervised-diet sentence",
  states: {
    approve: {
      verdict: "APPROVE",
      tone: "ok",
      confidence: 73,
      resolved: "3/3",
      criteria: [
        { text: "BMI ≥ 35", status: "met" },
        { text: "At least one co-morbidity", status: "met" },
        { text: "Previously unsuccessful medical treatment", status: "met" },
      ],
      explain:
        "Every criterion is explicitly met in the note, so the rule engine may approve.",
    },
    escalate: {
      verdict: "SEND TO HUMAN",
      tone: "warn",
      confidence: 49,
      resolved: "2/3",
      criteria: [
        { text: "BMI ≥ 35", status: "met" },
        { text: "At least one co-morbidity", status: "met" },
        { text: "Previously unsuccessful medical treatment", status: "unknown" },
      ],
      explain:
        "One criterion is now undocumented — not contradicted, just absent. Unknown is not a denial, so the request goes to a human, and the system names which criterion is missing.",
    },
  },
};

/* -------------------------------------------------------------
   OTHER PROJECTS
   ------------------------------------------------------------- */

export const projects = [
  {
    name: "Denial Intelligence",
    line: "326 insurers in, 5 findings out. No language model anywhere.",
    live: "https://kaavyadhir.github.io/Denial-intelligence/",
    liveLabel: "Read the report",
    repo: "https://github.com/kaavyadhir/denial-intelligence",
    stats: [
      { value: "86", label: "tests" },
      { value: "289", label: "eligible issuers of 326" },
      { value: "5", label: "findings" },
    ],
    points: [
      "SQL computes every rate; Python decides which rates are unusual. Nothing in the pipeline is generative.",
      "Compare within market, not across. Dental's median denial rate is 32.3% against medical's 18.3% — ranking across markets finds the market, not the outlier.",
      "Median and MAD instead of mean and standard deviation. Outliers inflate the SD, raising the very threshold meant to catch them. Against six planted issuers at 45–58%, MAD caught 6 of 6 and an ordinary z-score caught none.",
      "Missing is not zero. A blank appeals report must not become a 0% overturn rate, which would read as good. 166 of 326 issuers have no computable overturn rate and are labelled unverifiable rather than ranked.",
    ],
    stack: ["Python", "SQLite", "NumPy", "openpyxl", "pytest", "ruff"],
  },
  {
    name: "HumanMotion AI",
    line: "Text in, animated 3D human motion out.",
    live: "", // no live URL — model weights are too heavy to host free
    repo: "https://github.com/kaavyadhir/HumanMotion-AI",
    stats: [
      { value: "4×", label: "faster per request" },
      { value: "22", label: "joint skeleton" },
    ],
    points: [
      "A React + FastAPI application wrapped around the T2M research model (Guo et al., CVPR 2022, trained on HumanML3D), which originally ran only from the command line.",
      "Profiling found that 37 seconds of each 48-second request was model loading, not inference. Loading once at startup made it roughly four times faster.",
      "Custom rendering layer draws the 22-joint skeleton frame by frame with ground plane and root trajectory, exported as a GIF.",
      "Brought 2022 research code back to life on current libraries — NumPy 1.24 removals, Matplotlib read-only properties, FFmpeg dependency dropped, CPU-only inference.",
    ],
    stack: ["React", "Vite", "Tailwind", "FastAPI", "PyTorch", "Matplotlib"],
  },
];

/* -------------------------------------------------------------
   SKILLS — edit freely, keep it honest
   ------------------------------------------------------------- */

/* Kept deliberately in step with the resume — if you add a skill to one,
   add it to the other, or an interviewer will notice the gap. */
export const skills = [
  { group: "Languages", items: ["Python", "C++", "C", "JavaScript", "SQL"] },
  {
    group: "AI & ML",
    items: [
      "RAG (retrieval-augmented generation)",
      "Vector embeddings",
      "Google Gemini API",
      "Prompt engineering",
      "PyTorch",
      "NumPy",
    ],
  },
  {
    group: "Backend & APIs",
    items: ["FastAPI", "REST APIs", "Pydantic", "Node.js", "Express.js"],
  },
  { group: "Frontend", items: ["React", "HTML", "CSS", "Tailwind CSS"] },
  {
    group: "Cloud & DevOps",
    items: ["AWS EC2", "Docker", "GitHub Actions", "Linux", "Git", "pytest"],
  },
  {
    group: "Databases & Data",
    items: ["SQL", "SQLite", "MySQL", "MongoDB", "Pandas"],
  },
  {
    group: "Core CS",
    items: [
      "Data structures & algorithms",
      "OOP",
      "DBMS",
      "Operating systems",
      "Computer networks",
      "System design",
    ],
  },
];

/* -------------------------------------------------------------
   EDUCATION & ACHIEVEMENTS
   ------------------------------------------------------------- */

export const education = [
  {
    school: "Thapar Institute of Engineering & Technology",
    detail: "B.Tech, Computer Science & Engineering",
    meta: "2023 – 2027 · CGPA 7.40",
  },
  {
    school: "Delhi Public School, Meerut",
    detail: "Class XII — 90% · Class X — 98%",
    meta: "CBSE",
  },
];

export const achievements = [
  "LeetCode contest rating 1743 — top 10.17% globally",
  "Runner-up, BIOS Hackathon, Thapar — November 2025",
  "Dynamic Programming Camp, AlgoUniversity — matrix exponentiation, SQRT decomposition",
  "R&D member, Echoes Society, Thapar — 2023 to 2025",
];
