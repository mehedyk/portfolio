# 🌟 Portfolio Walkthrough & Feature Guide

## 📖 Overview
Welcome to the interactive portfolio! This portfolio showcases various projects, skills, and experiences with unique, engaging features, including dynamic themes, a 3D ghost chatbot, interactive terminal, and more. 

## 🎨 Themes
The portfolio features 5 distinct themes, each offering a unique visual experience:
1. **Fard (Default)** 🌙 — Dark slate panels, lime green (`#baff2e`) accent, and pink secondary colors.
2. **True Classic** ☀️ — Warm eggshell light theme with dark navy text.
3. **Sin City** ♟️ — High-contrast black & white monochrome design.
4. **Nordic Light** ❄️ — Cool blue-tinted minimalist light theme.
5. **Terminal** 💻 — Kali Linux terminal interface with GNOME window chrome, available in three styles (classic/amber/hacker).

**How to switch:** Use the Theme dropdown (🎨 palette icon) or the Theme cycle button (✨ sparkles icon).

## 🌍 Multi-Lingual Preloader
Experience a unique entrance! The preloader cycles through greetings in 10 languages with an elegant SVG curve exit animation:
- Hello, Bonjour, Ciao, Olà, سلام, やあ, Hallå, Guten tag, Hallo, স্বাগতম

## 👻 Ghost Chatbot
- A translucent, eyeless 3D spectral ghost autonomously wanders the viewport.
- Click or tap the ghost to open the AI chat drawer.
- Powered by the **Groq API** (`llama-3.3-70b-versatile`) with automatic offline fallback.
- Features suggestion pills for quick conversation starters.
- The ghost reappears on every page refresh.

## ⚔️ Ayatul Qursi Sword Mode
- Select this unique mode from the cursor effects panel (🗡️ icon).
- Your cursor transforms into a golden crosshair leaving a luminous spark trail.
- Click near the wandering ghost to trigger a celestial slash burst!
- The ghost vanishes and safely docks as a calm glowing orb above the language button.
- It remains peacefully docked until the next page refresh.

## 🪄 Cursor Effects (14 total)
Customize your interaction with 14 unique cursor effects:
1. None, Beacon, Comet, Pixelate, Magnetic, Ink Bleed, Firefly, Wormhole, Rain, Constellation, Glitch, Ghost, Matrix, Ayatul Qursi.

## ⌨️ Terminal Commands
When using the Terminal theme, you have access to a full interactive Kali Linux terminal emulator:
- **Commands:** `help`, `neofetch`, `ls`, `cd <section>`, `clear`, `whoami`, `uname -a`, `pwd`, `date`, `cat /etc/issue`, `ip a`, `nmap`, `msfconsole`, `sqlmap`, `history`, `theme <style>`
- **Features:** 
  - Tab completion for commands
  - Arrow key command history support
  - `Ctrl+L` to quickly clear the terminal
  - Three distinct styles: `classic`, `amber`, `hacker`
  - Mobile quick-action chips for easy touch interaction

## ⌨️ Keyboard Shortcuts
- `Ctrl+K` — Open Command palette
- `↑↑↓↓←→←→BA` — Easter egg (Konami code)
- `Tab` — Auto-complete in terminal
- `Ctrl+L` — Clear terminal

## 🧭 Navigation
- **Floating panel navbar** with a stylish blur backdrop.
- **8 section links:** About, Timeline, Skills, Projects, Services, Blog, Testimonials, Contact.
- **Social links:** Facebook, Codeforces, LinkedIn, GitHub, LeetCode.
- **Languages:** 
  - Quick-toggle (EN ↔ BN)
  - Full language selector located at the bottom-left (supports 8+ languages).

## 🚀 Projects
- **22 real projects** with type filtering (All, Web App, Desktop App, Other).
- Featured projects are prominently highlighted.
- Includes links to Live demos, Source code, and Video demos.
- Special **FuseSW** project showcase banner.

## 📦 Deployment
Step-by-step Netlify deployment guide:
1. **Push to GitHub** — Ensure your latest code is on the main branch.
2. **Connect on Netlify** — Import your repository into Netlify.
3. **Set build command:** `npm run build`
4. **Set publish directory:** `dist`
5. **Add environment variable:** Key: `VITE_GROQ_API_KEY`, Value: Your API Key.
6. **Deploy** — Hit deploy and watch your portfolio go live!
