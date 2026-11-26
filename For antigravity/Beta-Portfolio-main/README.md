# Personal Portfolio

This is a personalized Next.js portfolio prepared for deployment on Netlify.

## Personalize

Edit `app/_data/profile.js` to update the name, title, intro, bio, contact details, social links, and featured project labels.

The current media uses the original Cloudinary demo assets. Replace `heroImage`, `profileImage`, and project image/video IDs when you want your own visuals.

## Netlify

Netlify can build this project directly from the source.

- Build command: `pnpm build`
- Publish directory: `.next`
- Required environment variable: `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dwar5imga`
