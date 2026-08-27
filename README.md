# 🌌 S. M. Mehedy Kawser - Portfolio

[![Portfolio Website](https://img.shields.io/badge/Portfolio-mehedy.netlify.app-00C7B1?style=for-the-badge&logo=netlify)](https://mehedy.netlify.app/)
[![GitHub](https://img.shields.io/badge/GitHub-mehedyk-181717?style=for-the-badge&logo=github)](https://github.com/mehedyk)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-mehedyk-0A66C2?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/mehedyk)

Welcome to the source code of my personal portfolio website. This is a highly interactive, performance-optimized, and feature-rich portfolio built with modern web technologies, showcasing a unique blend of creative design, AI integration, and authentic terminal emulation.

---

## ✨ Features

- **🌐 Multi-lingual Preloader:** Engaging startup experience spanning 10 languages.
- **🤖 3D Wandering Ghost AI Chatbot:** An interactive Groq API-powered assistant with auto-fallback capabilities that wanders around the screen.
- **⚔️ Ayatul Qursi Luminous Sword Cursor:** A unique interactive cursor mode that, when striking the ghost, docks it back to its place.
- **🖱️ 14 Dynamic Cursor Effects:** Choose from an extensive array of cursor styles including Beacon, Comet, Pixelate, Magnetic, Ink, Firefly, Wormhole, Rain, Constellation, Glitch, Ghost, Matrix, and Ayatul-Qursi.
- **💻 Authentic Kali Linux Terminal Theme:** An immersive terminal experience complete with commands like `neofetch`, `nmap`, `msfconsole`, `sqlmap`, and full tab completion.
- **📂 Extensive Project Showcase:** 22 real projects categorized with type filtering (Web App, Desktop App, Other) and deep integration with FuseSW project showcase.
- **🌍 Internationalization (i18n):** Support for 8+ languages including English (EN), Bengali (BN), Arabic (AR), Spanish (ES), German (DE), Portuguese (PT), Japanese (JA), and Turkish (TR).
- **⌨️ Command Palette:** Quick navigation and actions triggered via `Ctrl+K`.
- **🎮 Easter Egg:** A hidden surprise for those who know the Konami code!
- **📜 Scroll Progress Indicator:** Visual cue for page reading progress.
- **🔍 SEO Optimized:** Fully configured with OpenGraph, Twitter Cards, and JSON-LD for maximum discoverability.
- **🛡️ Secure:** Hardened with security headers configured via `netlify.toml`.

## 🎨 5 Unique Themes

Experience the portfolio in five distinct visual styles:

| Theme Name | Description |
| :--- | :--- |
| **Fard (Default)** | Dark mode with striking lime and pink accents. |
| **True Classic** | An elegant eggshell light mode. |
| **Sin City** | A bold, high-contrast monochrome design. |
| **Nordic Light** | A crisp, cool blue light mode. |
| **Terminal** | An authentic Kali Linux terminal aesthetic. |

## 🛠️ Tech Stack

- **Framework:** [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/) & [GSAP](https://gsap.com/)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Backend/Database:** [Supabase](https://supabase.com/) (Optional)

---

## 🚀 Quick Start

To get a local copy up and running, follow these simple steps:

### Prerequisites
Make sure you have Node.js (v18+ recommended) and npm installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mehedyk/portfolio.git
   cd portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add the following keys:
   ```env
   # Required: Groq API key for the AI chatbot (Get it free at console.groq.com)
   VITE_GROQ_API_KEY=your_groq_api_key_here

   # Optional: Supabase integration
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```

---

## 📁 Project Structure

Here's a brief overview of the key directories and files:

```text
portfolio/
├── public/                 # Static assets (images, fonts, robots.txt)
├── src/
│   ├── assets/             # Project-specific images and global styles
│   ├── components/         # Reusable React components (UI, layout, features)
│   │   └── ui/             # shadcn/ui components
│   ├── hooks/              # Custom React hooks
│   ├── i18n/               # Internationalization configuration and translations
│   ├── lib/                # Utility functions and library wrappers
│   ├── store/              # Zustand state stores
│   ├── App.tsx             # Main application component
│   └── main.tsx            # Entry point
├── netlify.toml            # Netlify deployment and security headers config
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
└── package.json            # Project dependencies and scripts
```

---

## ☁️ Deployment (Netlify)

Deploying this portfolio on Netlify is straightforward:

1. Push your code to a GitHub repository.
2. Log in to [Netlify](https://www.netlify.com/) and click **"Add new site"** -> **"Import an existing project"**.
3. Connect your GitHub account and select this repository.
4. Set the build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Go to **"Advanced build settings"** and add your environment variables (`VITE_GROQ_API_KEY`, etc.).
6. Click **"Deploy site"**.

Your security headers will be automatically applied via the `netlify.toml` file.

---

## 📬 Contact

I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.

- **Email:** [kawser2305341202@diu.edu.bd](mailto:kawser2305341202@diu.edu.bd)
- **LinkedIn:** [mehedyk](https://linkedin.com/in/mehedyk)
- **GitHub:** [mehedyk](https://github.com/mehedyk)

---

## 📄 License

**All Rights Reserved © 2026 S. M. Mehedy Kawser.**

This repository and its source code are the intellectual property of S.M. Mehedy Kawser. You may not reproduce, distribute, or create derivative works without explicit written permission.