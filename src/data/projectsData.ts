export type ProjectType = 'web' | 'exe' | 'other' | 'Apk';

export interface ProjectVideo {
  title: string;
  youtubeUrl: string;
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  type: ProjectType;
  liveUrl?: string;
  downloadUrl?: string;
  checksum?: string;
  repoUrl?: string;
  hasPublicRepo: boolean;
  tech: string[];
  highlights: string[];
  screenshots: string[];
  videos: ProjectVideo[];
  featured: boolean;
}

export const PROJECTS: Project[] = [
  {
    slug: 'numerical-analysis',
    title: 'Numerical Analysis Workbench',
    tagline: 'Root-finding, drawn out step by step.',
    description:
      'An interactive workbench for numerical methods — starting with the bisection method, with false position, Newton-Raphson, and more on the way. Type an equation, set a bracket, and watch the interval close in on the root with every approximation and error logged along the way.',
    type: 'web',
    liveUrl: 'https://mehedyk.github.io/Numerical-Analysis/',
    repoUrl: 'https://github.com/mehedyk/Numerical-Analysis',
    hasPublicRepo: true,
    tech: ['JavaScript', 'Math parser', 'GitHub Pages'],
    highlights: [
      'Type any equation and get live root-finding, no setup',
      'Every iteration logged — approximation, error, and interval',
      'Bisection method live now, more methods on the way',
    ],
    screenshots: ['/screenshots/numerical-analysis001.png'],
    videos: [
      {
        title: 'Numerical Analysis Workbench — Walkthrough',
        youtubeUrl: 'https://www.youtube.com/watch?v=KBs5DitzTOA&list=PLQ3P98ibnNKY',
      },
    ],
    featured: true,
  },
  {
    slug: 'portfolio-builder',
    title: 'Portfolio Builder',
    tagline: 'Create a professional portfolio in minutes.',
    description:
      'A tool for generating a professional portfolio quickly — built to take the friction out of putting together a polished personal site.',
    type: 'web',
    liveUrl: 'https://portfolio-by-galacticos.vercel.app/',
    hasPublicRepo: false,
    tech: ['React', 'Vercel'],
    highlights: [
      'Guided flow from blank page to a finished portfolio',
      'No design experience required to get a clean result',
    ],
    screenshots: [],
    videos: [
      {
        title: 'Portfolio Builder — Free Portfolios, Customizable Templates, no Coding Required',
        youtubeUrl:
          'https://www.youtube.com/watch?v=LCoFNWh0-JQ&list=PLEj5S5IAAswCJ-jDga_F-P6ESqbsWF4y4',
      },
    ],
    featured: true,
  },
  {
    slug: 'fard-vault',
    title: 'Fard Vault',
    tagline: 'Your secrets. Your control. Zero knowledge.',
    description:
      "A zero-knowledge password manager — every entry is encrypted on your device with AES-256-GCM before it ever leaves the browser, with Argon2id doing the key derivation. The server never sees a plaintext password, and if you forget your master password, there's no back door: not even the person who built it can recover your vault.",
    type: 'web',
    liveUrl: 'https://fard-vault.vercel.app/',
    hasPublicRepo: false,
    tech: ['AES-256-GCM', 'Argon2id', 'Next.js', 'Vercel'],
    highlights: [
      'Client-side AES-256-GCM encryption — the server only ever stores ciphertext',
      'Argon2id key derivation, bot detection, and brute-force rate limiting',
      'Encrypted or plaintext export whenever you want your data back',
    ],
    screenshots: [],
    videos: [],
    featured: true,
  },
  {
    slug: 'sirr-connect',
    title: 'Sirr — Encrypted Messenger',
    tagline: 'End-to-end encrypted. Zero knowledge. Yours alone.',
    description:
      "An end-to-end encrypted messenger built around X25519 key exchange and AES-256-GCM, so messages are unreadable to anyone but the two people in the conversation — including the server relaying them. سرّ means \"secret\" in Arabic, which is the whole design brief in one word.",
    type: 'web',
    liveUrl: 'https://sirr-connect.vercel.app/',
    hasPublicRepo: false,
    tech: ['X25519', 'AES-256-GCM', 'Next.js', 'Vercel'],
    highlights: [
      'X25519 key exchange with AES-256-GCM message encryption',
      'Zero-knowledge design — the server cannot read what it relays',
      'Dark, minimal interface built for a single job: private conversation',
    ],
    screenshots: [],
    videos: [],
    featured: true,
  },
  {
    slug: 'jomimap',
    title: 'JomiMap',
    tagline: 'Measure land straight off a map — no survey crew required.',
    description:
      'A bilingual (English & বাংলা) land measurement tool built for Bangladesh — upload a map PDF or image, trace a boundary, and get area and distance readings in the units that actually get used on the ground: bigha, katha, decimal, alongside the metric standards.',
    type: 'web',
    liveUrl: 'https://jomimap.vercel.app/',
    hasPublicRepo: false,
    tech: ['Next.js', 'Canvas', 'Bangla i18n'],
    highlights: [
      'Measure area and distance from any map PDF or image',
      'Bangladeshi land units — bigha, katha, decimal — alongside metric',
      'Fully bilingual interface, English and বাংলা',
    ],
    screenshots: [],
    videos: [],
    featured: true,
  },
  {
    slug: 'fard-password-generator',
    title: 'Fard — Password Generator',
    tagline: "Uniqueness isn't special. It's expected.",
    description:
      "A password generator with fine-grained control over length and character sets, plus a feature most generators skip: embedding a word or phrase intact at a chosen position, so the result stays memorable-ish without giving up entropy. Pairs directly with Fard Vault for storage.",
    type: 'web',
    liveUrl: 'https://fard-pw.netlify.app/',
    hasPublicRepo: false,
    tech: ['JavaScript', 'Netlify'],
    highlights: [
      'Configurable length and character-type mix, including symbol exclusion',
      'Optional phrase embedding — keep a word intact, anywhere in the password',
      'One click through to Fard Vault to store what you just generated',
    ],
    screenshots: [],
    videos: [],
    featured: false,
  },
  {
    slug: 'hadi-quran-guide',
    title: 'হাদি — Quran Reference',
    tagline: 'Verified ayat, tafsir, and search — in Bangla.',
    description:
      'A Quran reference tool built around verified text: ayat lookup, tafsir, and search, presented in Bangla for readers who want a fast, trustworthy reference rather than a full app suite.',
    type: 'web',
    liveUrl: 'https://hadi-quran-guide.vercel.app/',
    hasPublicRepo: false,
    tech: ['Next.js', 'Bangla i18n'],
    highlights: [
      'Verified ayat text with tafsir alongside',
      'Search built for how people actually look things up',
      'Bangla-first interface end to end',
    ],
    screenshots: [],
    videos: [],
    featured: false,
  },
  {
    slug: 'taqaddum',
    title: 'Taqaddum — Islamic Task Tracker',
    tagline: 'Progress — Salah, habits, fitness, and team accountability, in one place.',
    description:
      "Taqaddum (تقدّم — \"progress\") is a daily tracker built for Muslims who want consistency, not perfection: Salah, Islamic habits, fitness, academics, and team accountability, all logged in one app instead of scattered across notes and reminders.",
    type: 'web',
    liveUrl: 'https://task-tracker-taqaddum.vercel.app/',
    hasPublicRepo: false,
    tech: ['Next.js', 'PWA', 'Vercel'],
    highlights: [
      'Daily Salah and Islamic-habit tracking',
      'Fitness and academic goals alongside spiritual ones',
      'Team accountability — track progress with others, not just yourself',
    ],
    screenshots: [],
    videos: [],
    featured: false,
  },
  {
    slug: 'algo-visualizer',
    title: 'Algo Visualizer',
    tagline: 'Sorting, graphs, trees, and pathfinding — watched in 3D.',
    description:
      "A 3D algorithm visualizer covering sorting, graph traversal, trees, dynamic programming, and pathfinding, with real step-by-step playback instead of a single jump-to-the-end animation — built for actually understanding what's happening at each step, not just watching bars swap.",
    type: 'web',
    liveUrl: 'https://algorithm-visualizer-seven-blue.vercel.app/',
    hasPublicRepo: false,
    tech: ['Three.js', 'JavaScript', 'Vercel'],
    highlights: [
      'Sorting, graphs, trees, DP, and pathfinding in one visualizer',
      'Real step-by-step playback — pause, rewind, and inspect each step',
      'Rendered in 3D rather than flat bar charts',
    ],
    screenshots: [],
    videos: [],
    featured: false,
  },
  {
    slug: 'mealon',
    title: 'MealON',
    tagline: 'Mess management for Bangladeshi students, without the spreadsheet headache.',
    description:
      'Smart mess management built for the shared-house reality of Bangladeshi students and young professionals: track meals, shared expenses, and members, so the monthly "who owes what" reconciliation stops being a manual spreadsheet job.',
    type: 'web',
    liveUrl: 'https://mealon.vercel.app/',
    hasPublicRepo: false,
    tech: ['Next.js', 'Vercel'],
    highlights: [
      'Per-member meal and expense tracking',
      'Automatic cost splitting across the mess',
      'Built specifically around how Bangladeshi shared messes actually run',
    ],
    screenshots: [],
    videos: [],
    featured: false,
  },
  {
    slug: 'study-globe',
    title: 'StudyGlobe',
    tagline: 'A study-abroad preparation system, from shortlist to visa.',
    description:
      'A study-abroad preparation system built to organize the parts of the process that usually live across a dozen browser tabs and a messy notes app — university shortlisting, application tracking, and the steps in between.',
    type: 'web',
    liveUrl: 'https://study-globe-system.vercel.app/',
    hasPublicRepo: false,
    tech: ['Next.js', 'Vercel'],
    highlights: [
      'Centralized tracking for the study-abroad application process',
      'Built for students juggling multiple university applications at once',
    ],
    screenshots: [],
    videos: [],
    featured: false,
  },
  {
    slug: 'sukuun',
    title: 'Sukuun — 3D Particle System',
    tagline: 'A calming 3D particle field you can lose a few minutes in.',
    description:
      'سكون — "stillness." A generative 3D particle system built as a small, contained piece of calm: no goal, no score, just a field of particles responding to motion in real time.',
    type: 'web',
    liveUrl: 'https://sukuun.netlify.app/',
    repoUrl: 'https://github.com/mehedyk/Sukuun--3D-Particle-System',
    hasPublicRepo: true,
    tech: ['Three.js', 'WebGL', 'Vite', 'Tailwind CSS'],
    highlights: [
      'Real-time generative particle field, GPU-driven',
      'Built as a small, self-contained interactive art piece',
    ],
    screenshots: [],
    videos: [],
    featured: false,
  },
  {
    slug: 'qiyambreak',
    title: 'QiyamBreak',
    tagline: 'A break reminder that also cares about your prayers.',
    description:
      'A Muslim-focused wellness break reminder for Windows and Linux — tracks sitting time and fires a fullscreen break overlay before it turns into hours, filled with duas, Islamic reminders, break tasks, and five small mini-games. Zero telemetry, zero network requests: the only file it writes is a local settings JSON.',
    type: 'exe',
    repoUrl: 'https://github.com/mehedyk/QiyamBreak',
    hasPublicRepo: true,
    tech: ['Python', 'PyQt6', 'PyInstaller'],
    highlights: [
      'Configurable sitting timer with a fullscreen, un-skippable break overlay',
      '13 overlay themes, 15 curated duas, and 12 Islamic reminders',
      '5 break mini-games — typing, reflex, mental math, breathing, posture check',
      'Zero telemetry — no network requests, ever',
    ],
    screenshots: [],
    videos: [],
    featured: false,
  },
  {
    slug: 'hospital-management',
    title: 'Hospital Management System',
    tagline: 'A hospital admin/doctor/patient system, built to study encryption, not to go live.',
    description:
      'An academic hospital-management build with separate admin, doctor, and patient dashboards — patients, appointments, and billing — used as a hands-on study of One-Time Pad encryption concepts for session data. A learning project, not a production system: it ships with demo credentials on purpose.',
    type: 'web',
    liveUrl: 'https://mehedyk.github.io/Hospital-Management/',
    repoUrl: 'https://github.com/mehedyk/Hospital-Management',
    hasPublicRepo: true,
    tech: ['JavaScript', 'One-Time Pad encryption', 'GitHub Pages'],
    highlights: [
      'Three role-based dashboards — admin, doctor, patient',
      'Patient records, appointment scheduling, and billing',
      'Built as an applied study of One-Time Pad encryption',
    ],
    screenshots: [],
    videos: [],
    featured: false,
  },
  {
    slug: 'chira-incident',
    title: 'The Chira Incident — Case #0001',
    tagline: 'A deadpan forensic chemistry report on a jar that should never have been opened.',
    description:
      'A fully bilingual (English & বাংলা), footnoted, dead-serious "forensic report" on what happens when fermented chira sits sealed in a plastic jar for months — real biochemistry (butyric acid, putrescine, cadaverine, skatole), real citations, written with the tone of an actual incident report about the most mundane household disaster imaginable.',
    type: 'other',
    liveUrl: 'https://mehedyk.github.io/Chira-Report/',
    repoUrl: 'https://github.com/mehedyk/Chira-Report',
    hasPublicRepo: true,
    tech: ['HTML/CSS', 'Bangla/English bilingual'],
    highlights: [
      'Real chemistry — every compound and reaction is cited',
      'Fully bilingual, English and বাংলা, throughout',
      'A straight-faced forensic report about fermented rice in a jar',
    ],
    screenshots: [],
    videos: [],
    featured: false,
  },
  {
    slug: 'weaponization-of-liberation',
    title: 'The Weaponization of Liberation',
    tagline: 'A data-visualization essay on family, crime, and welfare statistics in Bangladesh.',
    description:
      'A scroll-driven data-visualization essay compiling Bangladeshi social statistics — divorce rates, sexual-violence case and conviction data, elderly-care infrastructure, and colonial-era economic history — from sources including BBS, ASK, PMC, UNICEF, and Pew Research into a single sourced argument. An opinion and research piece by the author, not a neutral reference site — every figure is cited to its original source.',
    type: 'other',
    liveUrl: 'https://mehedyk.github.io/The-Weaponization-of-Liberation/',
    repoUrl: 'https://github.com/mehedyk/The-Weaponization-of-Liberation',
    hasPublicRepo: true,
    tech: ['Data visualization', 'Research', 'HTML/CSS'],
    highlights: [
      'Every statistic sourced and linked to its original publication',
      'Scroll-driven narrative across six data sections',
      'An argumentative research essay, not a neutral database',
    ],
    screenshots: [],
    videos: [],
    featured: false,
  },
  {
    slug: 'marine-dreamer',
    title: 'Marine Dreamer',
    tagline: "Admission coaching for Bangladesh's marine academies.",
    description:
      "A client site for an admission-coaching course preparing candidates for Bangladesh Marine Academy and National Maritime Institute entry, run by former cadets.",
    type: 'web',
    liveUrl: 'https://marinedreamer.netlify.app/',
    hasPublicRepo: false,
    tech: ['HTML/CSS', 'Netlify'],
    highlights: [
      'Course and admission information for marine academy candidates',
      'Built for a client — ex-cadet-run coaching center',
    ],
    screenshots: [],
    videos: [],
    featured: false,
  },
  {
    slug: 'dristy-computer-training',
    title: 'Dristy Computer Training Center',
    tagline: 'A government-approved computer training institute in Gopalpur, online.',
    description:
      'A client site for a Bangladesh Technical Education Board–approved computer training institute in Gopalpur, Tangail — course listings, pricing, and enrollment information for 3-month, 6-month, and 1-year programs.',
    type: 'web',
    liveUrl: 'https://dristy-institute.netlify.app/',
    hasPublicRepo: false,
    tech: ['HTML/CSS', 'Netlify'],
    highlights: [
      'Course catalog for a technical-board-approved training center',
      'Built for a client — local computer training institute',
    ],
    screenshots: [],
    videos: [],
    featured: false,
  },
  {
    slug: 'ai-lab-diu',
    title: 'AI Lab — DIU',
    tagline: 'Research site for the Artificial Intelligence Lab, EEE Dept., Daffodil International University.',
    description:
      "A research-group site for the Artificial Intelligence Lab in the Department of EEE at Daffodil International University — covering the lab's research areas (LLMs, deep learning, reinforcement learning, signal processing, explainable AI), members, publications, and awards.",
    type: 'web',
    liveUrl: 'https://team-ai-diu.github.io/Artificial-Intelligence-Lab/',
    hasPublicRepo: false,
    tech: ['HTML/CSS', 'GitHub Pages'],
    highlights: [
      'Built for a university research lab — members, publications, awards',
      'Covers LLMs, deep learning, RL, signal processing, and explainable AI',
    ],
    screenshots: [],
    videos: [],
    featured: false,
  },
  {
    slug: 'salami',
    title: 'Salami',
    tagline: 'A SaaS platform, currently gated behind account login.',
    description:
      "An early-stage SaaS product, currently behind a login screen — more detail lands here once it's further along.",
    type: 'web',
    liveUrl: 'https://salami-saas.vercel.app/login',
    hasPublicRepo: false,
    tech: ['Next.js', 'Vercel'],
    highlights: ['Early-stage — live, but not yet publicly documented'],
    screenshots: [],
    videos: [],
    featured: false,
  },
  {
    slug: 'supershop-cli',
    title: 'GALACTICOs Super Shop',
    tagline: 'A CLI shop-management system in plain C — admin, employee, and customer roles.',
    description:
      'A command-line retail management system written in pure C with no external dependencies — role-based access for admin, employee, and customer accounts, product and employee management, and automatic bill generation. Written early on as a learning project, later refined.',
    type: 'other',
    repoUrl: 'https://github.com/mehedyk/supershop-c-cli',
    hasPublicRepo: true,
    tech: ['C', 'GCC'],
    highlights: [
      'Three role-based access levels — admin, employee, customer',
      'Inventory, employee, and customer management with automatic billing',
      'Pure C, no external dependencies',
    ],
    screenshots: [],
    videos: [],
    featured: false,
  },
  {
    slug: 'library-management-java',
    title: 'Library Management System',
    tagline: 'A desktop library system built with Java Swing.',
    description:
      'A desktop library management system built with Java Swing for the interface — cataloguing, issuing, and returning books through a role-based GUI.',
    type: 'other',
    repoUrl: 'https://github.com/mehedyk/library-management-system-java-gui',
    hasPublicRepo: true,
    tech: ['Java', 'Swing'],
    highlights: [
      'Book cataloguing, issue, and return workflows',
      'Built as a Java OOP and GUI coursework project',
    ],
    screenshots: [],
    videos: [],
    featured: false,
  },
];

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured);

export const PROJECT_TYPE_LABELS: Record<ProjectType, string> = {
  web: 'Web App',
  exe: 'Desktop App',
  other: 'Other',
  Apk: 'Android App',
};

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
