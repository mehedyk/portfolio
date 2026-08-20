# Portfolio Customization Guide

This guide covers everything you need to know to customize and adapt this portfolio template for your own use.

## 1. Project Structure Overview

```text
portfolio/
├── public/                 # Static assets
│   ├── images/             # Profile photos, project screenshots
│   └── locales/            # i18n translation files (if any)
├── src/                    # Source code
│   ├── components/         # React components
│   │   ├── sections/       # Major page sections (Hero, About, Projects, etc.)
│   │   ├── ui/             # Reusable UI components (shadcn/ui)
│   │   └── ...             # Other components (CursorEffects, GhostChatbot, etc.)
│   ├── data/               # Data files (projects, skills, etc.)
│   ├── hooks/              # Custom React hooks
│   ├── i18n/               # Internationalization setup
│   ├── stores/             # Zustand state management stores
│   ├── styles/             # Global styles and tailwind directives
│   ├── utils/              # Helper functions
│   ├── App.tsx             # Main application component
│   └── main.tsx            # Application entry point
├── index.html              # HTML template
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite bundler configuration
```

## 2. Personal Information

To make this portfolio your own, you'll need to update the personal information throughout the site:

*   **Name, Title, Description:** Edit `src/components/sections/Hero.tsx`. Look for the main heading and paragraph tags.
*   **Social Links:** The links are located in `src/components/Navigation.tsx` (for the header/menu) and `src/components/sections/Contact.tsx`. (Note: Do not modify the actual links in the template unless instructed, just update them in your own copy).
*   **Email Address:** Update the `href="mailto:..."` attributes in `src/components/sections/Contact.tsx` and `src/components/Footer.tsx`.
*   **Profile Photo:** Replace the image file at `/public/images/mehedyk.jpg` with your own, or update the image path in `src/components/sections/Hero.tsx` and `src/components/sections/About.tsx`.

## 3. Projects

Projects are driven by a data file, making it easy to add or remove them without changing component code.

*   **File:** `src/data/projectsData.ts`

**Project Interface:**
```typescript
export interface Project {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  image: string;
  tags: string[];
  type: 'web' | 'exe' | 'other' | 'Apk';
  featured?: boolean;
  links: {
    github?: string;
    live?: string;
    demo?: string;
  };
}
```

**Template for adding a new project:**
```typescript
{
  id: 'my-new-project',
  title: 'My Awesome Project',
  description: 'A detailed description of the project, what it does, and the problem it solves. Can be multiple sentences.',
  shortDescription: 'A quick summary for the project card.',
  image: '/images/projects/my-project.jpg', // Make sure this image exists in public/
  tags: ['React', 'TypeScript', 'Tailwind'],
  type: 'web', // Options: 'web', 'exe', 'other', 'Apk'
  featured: true, // Set to true to highlight this project on the home page
  links: {
    github: 'https://github.com/yourusername/project',
    live: 'https://myproject.com',
  },
}
```
*   **Featured Projects:** Projects with `featured: true` will often be displayed more prominently or in a dedicated "Featured" section, depending on the layout configuration.

## 4. Themes

The portfolio supports multiple themes. There are 5 current themes defined.

*   **Files:** `src/stores/themeStore.ts` (state management) and `src/index.css` (CSS variables).

**How to add a new theme (Step-by-step):**

1.  **Add to `ThemeType` union:** Open `src/stores/themeStore.ts` and add your new theme name (e.g., `'cyberpunk'`) to the `ThemeType` type definition.
2.  **Add to `themes` array:** In the same file, add your theme object to the `themes` array so it appears in the theme switcher UI.
    ```typescript
    { id: 'cyberpunk', name: 'Cyberpunk', color: '#ff00ff' }
    ```
3.  **Add CSS variables block:** Open `src/index.css` and add a new `.theme-[your-theme-name]` class with the HSL color variables.
    *   **Important:** Use HSL values *without* the `hsl()` wrapper or commas (e.g., `220 20% 10%`).
    ```css
    .theme-cyberpunk {
      --background: 300 100% 5%;
      --foreground: 300 100% 95%;
      --primary: 300 100% 50%;
      /* ... define other standard shadcn/ui variables ... */
    }
    ```
4.  **Add cursor trail color:** If using the cursor trail effect, update `src/components/CursorTrail.tsx` to handle the new theme color in its switch statement or color mapping.
5.  **Add accent color:** Update `src/components/CursorEffects.tsx` to ensure the specific cursor effects use appropriate colors for your new theme.

## 5. Ghost Chatbot

The portfolio includes an AI chatbot powered by Groq.

*   **API Key Setup:** To make the AI work in production, you need a Groq API key. Set this as an environment variable named `VITE_GROQ_API_KEY`. In Netlify, you configure this in Site Settings > Environment Variables.
*   **System Prompt:** The prompt that dictates how the AI behaves and what information it knows is located in `src/components/GhostChatbot.tsx`. Edit the `systemPrompt` variable to change its personality or specific knowledge about you.
*   **Fallback Knowledge Base:** If the API fails or is not configured, the bot falls back to local knowledge. Modify this fallback logic in `src/components/GhostChatbot.tsx` (usually an array of predefined Q&A or a simple switch statement based on keywords).
*   **Chatbot Model:** The specific LLM model (e.g., `llama3-8b-8192`) is specified in the API call within `GhostChatbot.tsx`. You can change this to any supported Groq model.

## 6. Cursor Effects

The site features 14 different interactive cursor effects.

*   **Adding a new effect:**
    1.  Create a new component for your effect (e.g., `src/components/effects/MyNewCursor.tsx`).
    2.  Use Framer Motion or standard DOM event listeners (`mousemove`) to track cursor position and update your effect's state.
    3.  Import and add the effect to the `CursorEffects.tsx` manager component, updating the UI to allow selecting it.
*   **Ayatul Qursi Sword Effect:** This specific effect renders a stylized sword shape that follows the cursor, integrating a meaningful symbol into the visual experience. It's built using custom SVG rendering or complex DOM manipulation tracking the pointer.

## 7. Terminal / CLI Theme

The portfolio includes an interactive terminal-like interface.

*   **Adding new commands:** Open `src/components/CliTheme.tsx`. Locate the `COMMANDS` map or object. Add a new key-value pair where the key is the command name and the value is a function that returns the output string or React node.
    ```typescript
    const COMMANDS = {
      // ... existing commands
      skills: () => "Frontend: React, Vue, Svelte\nBackend: Node, Python, Go",
    };
    ```
*   **CLI Styles:** The terminal interface supports different visual styles: `classic` (green on black), `amber` (amber on black), and `hacker` (customized retro). These are typically toggled via state and CSS classes.

## 8. Translations / i18n

The site supports internationalization (i18n) for 8 languages.

*   **File:** `src/i18n/translations.ts`
*   **How to add a new language:**
    1.  Open `src/i18n/translations.ts`.
    2.  Find the main translation object/dictionary.
    3.  Add a new top-level key for your language code (e.g., `'fr'` for French).
    4.  Copy the structure from an existing language (like `'en'`) and translate all the string values.
    5.  Update the language switcher UI component to include the new language option.

## 9. SEO (Search Engine Optimization)

*   **Meta Tags:** Update the standard SEO tags (`title`, `meta name="description"`, OpenGraph tags) in the `<head>` section of `index.html`.
*   **Security Headers:** The `netlify.toml` file (if deploying to Netlify) contains crucial security and caching headers. Ensure you review and update these, especially Content Security Policy (CSP), to match your specific domain and external resources.

## 10. Deployment

This Vite-based project is easily deployed to Netlify.

*   **Netlify Deployment Steps:**
    1.  Push your code to a GitHub, GitLab, or Bitbucket repository.
    2.  Log in to Netlify and click "Add new site" -> "Import an existing project".
    3.  Connect your repository.
    4.  Netlify should automatically detect the Vite build settings:
        *   Build command: `npm run build`
        *   Publish directory: `dist`
    5.  Click "Deploy site".
*   **Environment Variables:** Don't forget to configure essential environment variables in the Netlify dashboard before deploying:
    *   `VITE_GROQ_API_KEY`: Required for the Ghost Chatbot.
