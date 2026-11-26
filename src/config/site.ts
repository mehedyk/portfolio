/**
 * Single source of truth for identity + contact details.
 * Change something here and it changes everywhere (nav, footer, contact, SEO helpers).
 */
export const SITE = {
  name: 'S.M. Mehedy Kawser',
  shortName: 'Mehedy',
  handle: 'mehedyk',
  role: 'Software Engineering Student',
  tagline: 'Full-Stack Developer',
  url: 'https://mehedy.netlify.app',
  location: 'Dhaka, Bangladesh',

  // ⚠️ DIU mail accounts often get deactivated after graduation (Dec 2026).
  //    Swap this for a personal address before then — it's the only place to change.
  email: 'kawser2305341202@diu.edu.bd',

  cvUrl: '/Mehedy_Kawser_CV.pdf',
  cvFileName: 'Mehedy_Kawser_CV.pdf',

  social: {
    github: 'https://github.com/mehedyk',
    linkedin: 'https://www.linkedin.com/in/mehedyk/',
    codeforces: 'https://codeforces.com/profile/mehedyk',
    leetcode: 'https://leetcode.com/u/mehedyk/',
    hackerrank: 'https://www.hackerrank.com/profile/mehedyk',
    x: 'https://x.com/MahdiKawser',
    instagram: 'https://www.instagram.com/mahdi_kawser/',
    facebook: 'https://www.facebook.com/mahdi.kawser',
  },
} as const;

/** Where the serverless endpoints live (Netlify Functions). */
export const API = {
  content: '/.netlify/functions/content',
  contact: '/.netlify/functions/contact',
  chat: '/.netlify/functions/chat',
} as const;
