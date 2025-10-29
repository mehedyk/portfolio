# GitHub Deployment Guide for Lovable Portfolio

This guide will walk you through deploying your portfolio to GitHub Pages and connecting it to GitHub for continuous deployment.

## Option 1: Deploy via Lovable (Recommended - Easiest)

### Step 1: Connect to GitHub
1. In Lovable editor, click the **GitHub** button in the top right
2. Click **Connect to GitHub** and authorize the Lovable GitHub App
3. Select your GitHub account/organization
4. Click **Create Repository** - Lovable will create a new repo with your code

### Step 2: Automatic Syncing
- **Two-way sync**: Changes in Lovable automatically push to GitHub
- Changes pushed to GitHub automatically sync to Lovable
- No manual git commands needed!

### Step 3: Deploy to GitHub Pages
1. Go to your GitHub repository
2. Click **Settings** → **Pages**
3. Under "Source", select **GitHub Actions**
4. Create a new file `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: ['main']
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Setup Pages
        uses: actions/configure-pages@v4
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
  
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

5. **Update `vite.config.ts`** to set the correct base path:

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: '/your-repo-name/', // Replace with your actual repo name
}));
```

6. Commit and push - Your site will be live at: `https://yourusername.github.io/your-repo-name/`

---

## Option 2: Manual GitHub Setup (For Advanced Users)

### Step 1: Create GitHub Repository
1. Go to [GitHub](https://github.com) and create a new repository
2. Name it (e.g., `portfolio`)
3. Keep it public for GitHub Pages
4. **Don't** initialize with README (your project already has files)

### Step 2: Connect Local Project to GitHub
```bash
# Initialize git (if not already)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial portfolio commit"

# Add GitHub remote (replace with your details)
git remote add origin https://github.com/mehedyk/portfolio.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Update Configuration
Update `vite.config.ts` base path as shown above.

### Step 4: Set Up GitHub Actions
Follow the same deployment workflow as Option 1, Step 3.

---

## Option 3: Deploy to Lovable Cloud (Simplest)

1. Click the **Publish** button in Lovable (top right on desktop)
2. Your site is instantly live at `yoursite.lovable.app`
3. Connect a custom domain in **Project → Settings → Domains** (requires paid plan)

---

## Custom Domain Setup

### For GitHub Pages:
1. In your repo, go to **Settings → Pages**
2. Under "Custom domain", enter your domain (e.g., `kawser.dev`)
3. Add CNAME record in your DNS provider:
   ```
   Type: CNAME
   Name: www (or @)
   Value: mehedyk.github.io
   ```
4. Wait for DNS propagation (up to 24 hours)

### For Lovable:
1. Go to **Project → Settings → Domains**
2. Enter your custom domain
3. Follow DNS configuration instructions provided
4. Requires paid Lovable plan

---

## Continuous Deployment

### Via Lovable + GitHub:
- Edit in Lovable → automatically deploys to GitHub → GitHub Actions builds → live site updates ✨

### Via Local Development:
```bash
# Make changes locally
git add .
git commit -m "Update portfolio"
git push

# GitHub Actions automatically rebuilds and deploys
```

---

## Troubleshooting

### Build Fails on GitHub Actions
- Check Node version (should be 18+)
- Ensure all dependencies are in `package.json`
- Check build logs in GitHub Actions tab

### 404 on GitHub Pages
- Verify `base` path in `vite.config.ts` matches repo name
- Check GitHub Pages settings (should be set to GitHub Actions)
- Ensure workflow has correct permissions

### Images Not Loading
- Use relative paths or import images in components
- Avoid absolute paths like `/images/...`
- Use `import myImage from '@/assets/image.png'`

### Theme Not Persisting
- GitHub Pages supports `localStorage` by default
- Check browser console for errors

---

## Environment Variables

If you need environment variables (API keys, etc.):

### GitHub Actions:
1. Go to repo **Settings → Secrets and variables → Actions**
2. Add your secrets (e.g., `VITE_API_KEY`)
3. Reference in workflow:
```yaml
- name: Build
  env:
    VITE_API_KEY: ${{ secrets.VITE_API_KEY }}
  run: npm run build
```

### Lovable Cloud:
1. Use **Secrets Manager** in Lovable
2. Add secrets via the secrets tool
3. Access via `import.meta.env.VITE_YOUR_SECRET`

---

## Performance Optimization

Before deploying:
1. ✅ Optimize images (use WebP, compress)
2. ✅ Enable code splitting (Vite does this automatically)
3. ✅ Use lazy loading for routes
4. ✅ Minify assets (done by Vite build)
5. ✅ Add meta tags for SEO (already included)

---

## Useful Commands

```bash
# Local development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Check for errors
npm run lint

# Update dependencies
npm update

# View all branches
git branch -a

# Switch branches
git checkout branch-name

# Pull latest changes
git pull origin main
```

---

## Resources

- [Lovable Documentation](https://docs.lovable.dev/)
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [React Icons Library](https://react-icons.github.io/react-icons/)
- [GSAP Animation Docs](https://greensock.com/docs/)

---

## Support

- **Lovable Discord**: [Join Community](https://discord.gg/lovable)
- **GitHub Issues**: Create an issue in your repo
- **Lovable Docs**: [docs.lovable.dev](https://docs.lovable.dev/)

---

**Your portfolio is ready to conquer the web! 🚀**
