# Portfolio v4.0 — Rewrite

**React 18 + Vite + TypeScript + Tailwind + Supabase**

---

## What's new vs v3

| Feature | v3 | v4 |
|---|---|---|
| Backend | ❌ None | ✅ Supabase |
| Admin panel | ❌ | ✅ `/admin` route |
| CLI theme | ❌ | ✅ 3 sub-styles (Classic, Amber, Hacker) |
| Cursor effects | 1 (trail) | 12 effects + panel |
| Total themes | 13 | 14 |

---

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Supabase

1. Go to [supabase.com](https://supabase.com) → New project
2. Copy your **Project URL** and **anon key** (Settings → API)
3. Run the migration SQL:
   - Open Supabase → SQL Editor
   - Paste contents of `supabase/migrations/001_portfolio_schema.sql`
   - Click Run
4. Create your admin user:
   - Supabase → Authentication → Users → Invite User
   - Use your own email + password

### 3. Environment variables — Netlify only, never in code

**No `.env` file needed anywhere.** Set these only in Netlify:

Netlify → Site → Site configuration → Environment variables → Add variable

| Variable | Where to get it |
|---|---|
| `VITE_SUPABASE_URL` | Supabase → Settings → API → Project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase → Settings → API → anon / public key |

Locally the portfolio runs on static fallback data (your real projects, skills, etc hardcoded in `src/lib/supabase.ts`). On Netlify, after the build, it uses live Supabase data. The repo can be fully public with no secrets exposed.

### 4. Run

```bash
npm run dev
```

---

## Admin Panel

Go to `/admin` in your browser. Login with the Supabase user you created.

You can edit:
- **Hero / Meta** — name, photo, CV link, stats, social links
- **Projects** — add/edit/delete, toggle visibility, mark featured
- **Timeline** — career events, types (education/work/achievement)
- **Blog** — posts with tags, read time, draft/published toggle
- **Testimonials** — client quotes with star ratings
- **Services** — service cards with feature lists

---

## CLI Theme

Select the **Terminal** theme (💻) from the theme picker.

Inside the terminal:
- `ls` — list all sections
- `ls -la` — detailed listing
- `cat <section>` — describe a section
- `open <section>` — scroll to that section
- `whoami` — show portfolio owner info
- `help` — show all commands
- Tab completion works for section names
- Arrow keys cycle through command history

Three sub-styles available via the style picker in the terminal titlebar:
- **Linux/Bash** — classic black + green
- **Amber/CRT** — retro amber glow
- **Dark Hacker** — dark glass + cyan

---

## Cursor Effects

The **Wand** button (🪄) appears top-right, just below the nav bar.

12 effects + off:
- **Beacon** — pulsing sonar rings (default)
- **Comet** — smooth particle tail
- **Pixelate** — dissolving pixel blocks
- **Magnetic** — nearby elements pulled toward cursor
- **Ink Bleed** — ink splatter that fades
- **Firefly** — glowing orbiting dots
- **Wormhole** — swirling spiral
- **Rain** — vertical streaks
- **Constellation** — connected star map
- **Glitch** — RGB split duplicates
- **Ghost** — fading afterimage
- **Matrix** — falling characters

Clicking anywhere always fires a beacon pulse regardless of active effect.

---

## Themes (14 total)

📄 True Classic · ◼️ Sin City · 🏛️ Classical · ⚡ FARD · 🔴 Matrix  
🟣 Fifth Element · 🌊 Abyss · 🌅 Dune · 💖 Ex Machina · 🟢 Alien  
❄️ Interstellar · ⭐ Star Wars · 🌆 Blade Runner 2049 · 💻 Terminal

---

## Stack

- **Frontend:** React 18, Vite, TypeScript, Tailwind CSS
- **Animation:** Framer Motion, GSAP
- **State:** Zustand (persisted)
- **Backend:** Supabase (PostgreSQL + Auth + RLS)
- **Images:** Cloudinary (optional, add URL in admin)
- **i18n:** EN + BN (Bengali)
- **Routing:** React Router v6

---

## Deployment (Netlify — mehedy.netlify.app)

1. Push to GitHub (safe — no secrets in repo)
2. Netlify → Site configuration → Environment variables → add:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Trigger a redeploy — Netlify injects the vars at build time
4. Also set your site URL in Supabase → Authentication → URL Configuration:
   - Site URL: `https://mehedy.netlify.app`
   - Redirect URLs: `https://mehedy.netlify.app/**`

---

Made by Mehedy Kawser · [github.com/mehedyk](https://github.com/mehedyk)
