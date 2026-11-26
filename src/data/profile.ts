import type { IconType } from 'react-icons';
import type { LucideIcon } from 'lucide-react';
import {
  SiJavascript, SiTypescript, SiPython, SiOpenjdk, SiC, SiCplusplus, SiPhp, SiGnubash,
  SiReact, SiNextdotjs, SiVite, SiHtml5, SiCss, SiTailwindcss,
  SiNodedotjs, SiSupabase, SiPostgresql, SiMysql, SiMongodb,
  SiVercel, SiNetlify, SiRailway, SiGithubactions, SiGit, SiGithub,
  SiNumpy, SiPandas, SiJupyter, SiGooglecolab,
  SiLinux, SiKalilinux, SiUbuntu, SiAndroid,
} from 'react-icons/si';
import { FaWindows } from 'react-icons/fa6';
import {
  BrainCircuit, Code2, GraduationCap, FlaskConical, Trophy, ShieldCheck, Rocket, Layers, Cloud, Users,
} from 'lucide-react';
import { PROJECTS } from '@/data/projectsData';

/* ─────────────────────────── Hero stats (all verifiable from the CV) ─────────────────────────── */
export interface Stat { icon: LucideIcon; value: string; labelKey: string }
export const STATS: Stat[] = [
  { icon: Layers,        value: String(PROJECTS.length), labelKey: 'hero.stats.projects' },
  { icon: Trophy,        value: '3',                     labelKey: 'hero.stats.hackathons' },
  { icon: GraduationCap, value: '3.50',                  labelKey: 'hero.stats.cgpa' },
  { icon: Rocket,        value: 'Dec 2026',              labelKey: 'hero.stats.graduating' },
];

/* ─────────────────────────── Timeline (education, research, competitions) ─────────────────────────── */
export type TimelineKind = 'education' | 'research' | 'achievement';
export interface TimelineEvent {
  year: string; title: string; organization: string; description: string;
  kind: TimelineKind; icon: LucideIcon;
}
export const TIMELINE: TimelineEvent[] = [
  {
    year: 'Dec 2026', kind: 'education', icon: GraduationCap,
    title: 'B.Sc. in Software Engineering — expected graduation',
    organization: 'Daffodil International University',
    description: 'Final year, CGPA 3.50 / 4.00.',
  },
  {
    year: '2026', kind: 'achievement', icon: Trophy,
    title: 'AI Hackathon, AI Dev Fest 2026',
    organization: 'DIU CPC, Department of CSE',
    description: 'Built Prohori, a mobile-wallet scam shield (Track 01: Trust & Risk). Certificate of Appreciation, 7 October 2026.',
  },
  {
    year: '2026', kind: 'achievement', icon: Trophy,
    title: 'LandTech Innovation Hackathon 2026',
    organization: 'Team Ardh — Departments of CSE and Law, DIU',
    description: 'Built a rule-based engine that flags suspicious land-transfer chains and double-selling, with an officer dashboard and a bilingual citizen page.',
  },
  {
    year: '2026', kind: 'achievement', icon: Trophy,
    title: 'DIU AI Project Competition 2026',
    organization: 'Department of CIS, DIU',
    description: 'Selected for the final round.',
  },
  {
    year: '2026 – now', kind: 'research', icon: FlaskConical,
    title: 'Undergraduate thesis — deepfake detection',
    organization: 'Supervisor: Afsana Begum, DIU',
    description: 'A lightweight CNN using four forensic cues (error level analysis, noise residual, blending boundary, DCT frequency) on a consent-based Bangladeshi-context dataset.',
  },
  {
    year: '2023', kind: 'education', icon: GraduationCap,
    title: 'Started B.Sc. in Software Engineering',
    organization: 'Daffodil International University',
    description: 'Began the degree in Dhaka, with a focus on full-stack development and secure software.',
  },
  {
    year: '2021', kind: 'education', icon: GraduationCap,
    title: 'Higher Secondary Certificate (HSC)',
    organization: 'Notre Dame College, Mymensingh',
    description: 'GPA 4.92 / 5.00.',
  },
  {
    year: '2019', kind: 'education', icon: GraduationCap,
    title: 'Secondary School Certificate (SSC)',
    organization: 'Suti VM Pilot Model Government High School',
    description: 'GPA 4.86 / 5.00.',
  },
];

/* ─────────────────────────── Skills (straight from the CV, no made-up percentages) ─────────────────────────── */
export interface Skill { name: string; icon: IconType | LucideIcon }
export interface SkillGroup { key: string; titleKey: string; skills: Skill[] }
export const SKILL_GROUPS: SkillGroup[] = [
  { key: 'languages', titleKey: 'skills.category.languages', skills: [
    { name: 'JavaScript', icon: SiJavascript }, { name: 'TypeScript', icon: SiTypescript },
    { name: 'Python', icon: SiPython }, { name: 'Java', icon: SiOpenjdk },
    { name: 'C', icon: SiC }, { name: 'C++', icon: SiCplusplus },
    { name: 'PHP', icon: SiPhp }, { name: 'Bash', icon: SiGnubash },
  ]},
  { key: 'frontend', titleKey: 'skills.category.frontend', skills: [
    { name: 'React', icon: SiReact }, { name: 'Next.js', icon: SiNextdotjs },
    { name: 'Vite', icon: SiVite }, { name: 'HTML5', icon: SiHtml5 },
    { name: 'CSS3', icon: SiCss }, { name: 'Tailwind CSS', icon: SiTailwindcss },
  ]},
  { key: 'backend', titleKey: 'skills.category.backend', skills: [
    { name: 'Node.js', icon: SiNodedotjs }, { name: 'MongoDB', icon: SiMongodb },
    { name: 'PostgreSQL', icon: SiPostgresql }, { name: 'MySQL', icon: SiMysql },
    { name: 'Supabase', icon: SiSupabase },
  ]},
  { key: 'devops', titleKey: 'skills.category.devops', skills: [
    { name: 'Vercel', icon: SiVercel }, { name: 'Netlify', icon: SiNetlify },
    { name: 'Railway', icon: SiRailway }, { name: 'GitHub Actions', icon: SiGithubactions },
    { name: 'Git', icon: SiGit }, { name: 'GitHub', icon: SiGithub },
  ]},
  { key: 'data', titleKey: 'skills.category.dataai', skills: [
    { name: 'NumPy', icon: SiNumpy }, { name: 'Pandas', icon: SiPandas },
    { name: 'Jupyter', icon: SiJupyter }, { name: 'Google Colab', icon: SiGooglecolab },
    { name: 'CNNs', icon: BrainCircuit },
  ]},
  { key: 'systems', titleKey: 'skills.category.tools', skills: [
    { name: 'Linux', icon: SiLinux }, { name: 'Kali Linux', icon: SiKalilinux },
    { name: 'Ubuntu', icon: SiUbuntu }, { name: 'Windows', icon: FaWindows },
    { name: 'Android', icon: SiAndroid }, { name: 'Secure development', icon: ShieldCheck },
  ]},
];

/* ─────────────────────────── Services (only things the CV backs up) ─────────────────────────── */
export interface Service { icon: LucideIcon; titleKey: string; descKey: string; features: string[] }
export const SERVICES: Service[] = [
  { icon: Code2, titleKey: 'services.webdev.title', descKey: 'services.webdev.desc',
    features: ['React / Next.js front ends', 'REST APIs with Node.js', 'Auth and database integration', 'Responsive, accessible UI'] },
  { icon: ShieldCheck, titleKey: 'services.secure.title', descKey: 'services.secure.desc',
    features: ['Role-based / row-level access rules', 'Input validation and XSS protection', 'Secrets kept out of the browser', 'Light security review of your app'] },
  { icon: Layers, titleKey: 'services.sites.title', descKey: 'services.sites.desc',
    features: ['Portfolio and landing pages', 'SEO basics and fast loading', 'Contact forms that just work', 'Easy to update later'] },
  { icon: Cloud, titleKey: 'services.deploy.title', descKey: 'services.deploy.desc',
    features: ['Vercel, Netlify and Railway', 'GitHub Actions pipelines', 'Environment and secret setup', 'Custom domains and HTTPS'] },
];

/** Re-exported so About can show a leadership icon without importing lucide twice. */
export const LEADERSHIP_ICON = Users;
