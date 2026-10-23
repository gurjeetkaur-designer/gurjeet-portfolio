# gurjeet-portfolio
# Gurjeet Kaur — Portfolio

A responsive portfolio site for Gurjeet Kaur, a graphic designer and illustrator. Built with React, Vite, Framer Motion and Lucide icons, styled with plain modern CSS.

## Run it

Requires Node.js 18+ (20+ recommended).

```bash
npm install
npm run dev       # dev server at http://localhost:5173
npm run build     # production build in dist/
npm run preview   # serve the production build locally
```

The `dist/` folder is a static site that any static host can serve.

## Deployment (GitHub Pages)

Every push to `main` builds the site and publishes it through `.github/workflows/deploy.yml` to:

**https://rohitthakurattri.github.io/gurjeet-portfolio/**

One-time setup: on GitHub, go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.

### Password

The deployed page is encrypted with [StatiCrypt](https://github.com/robinmoisson/staticrypt), so visitors have to enter a password before the site shows. The password comes from the `STATICRYPT_PASSWORD` repository secret (**Settings → Secrets and variables → Actions**). To change it, update the secret and re-run the deploy workflow. `.staticrypt.json` holds the salt, which isn't secret. Keep it so "Remember me" keeps working across deploys.

This protects the page itself, but the image and video files in `assets/` can still be opened by anyone who has their direct URL.

Production builds use the base path `/gurjeet-portfolio/` (see `vite.config.js`). If you rename the repo or move to a custom domain, update that path.

## Project structure

```
src/
  App.jsx               page layout (section order lives here)
  main.jsx              entry point
  data/                 ← all editable content
    profile.js          name, intro, about text, photo, contact, social links
    skills.js           skill cards and tools
    projects.js         portfolio items, filter categories, hero/about images
    experience.js       experience and education timeline
    navigation.js       navbar links
  sections/             Hero, About, Skills, Projects, Experience, Contact, Footer
  components/           Navbar, ProjectCard, Lightbox, Reveal, SocialLinks, …
  styles/
    base.css            design tokens (colours, fonts), shared UI, nav, footer
    sections.css        section styles and responsive breakpoints
  assets/work/          optimised portfolio media (social, brand, motion, reels, invitations, print, illustration, logos) — 222 pieces
```

## Editing content

Everything you'd normally change lives in `src/data/`. Text in `[square brackets]` is placeholder content. Replace it with real details, or delete the entry.

- **Contact details and social links:** fill in `contact` and `socials` in `profile.js`. Empty values are hidden, so nothing invented is shown.
- **Colours and fonts:** edit the variables at the top of `src/styles/base.css`.

## Replacing images

### Profile photo
1. Save the photo as `src/assets/profile.webp` (a square or 4:5 crop, about 800px wide).
2. In `src/data/profile.js`, add `import photo from '../assets/profile.webp';` at the top and set `photo: photo`.

The photo then replaces the "GK" monogram in the hero, the About section and the About badge.

### Project images
1. Drop the image into the right folder under `src/assets/work/`, e.g. `src/assets/work/brand/my-campaign.webp`.
2. Add an entry to `projects` in `src/data/projects.js`:
   ```js
   {
     title: 'My Campaign',
     description: 'One or two lines about the piece.',
     category: 'brand',                 // social | brand | motion | reels | invitations | print | illustration | logos
     image: work('brand/my-campaign.webp'),
     tags: ['Jewellery', 'Story'],
     featured: true,                    // optional: show in the "Featured" tab
     link: 'https://behance.net/…',     // optional: otherwise the card opens a full-size view
   },
   ```
For a video, save the `.mp4` and a poster frame with the same name (`motion/holi.mp4` + `motion/holi.webp`) and use `...clip('motion/holi')` instead of `image`. For a multi-slide post, use `...carousel(['reels/carousel/1', 'reels/carousel/2'])`.

If a path is mistyped, the dev server shows a clear "File not found" error instead of a broken image.

The hero collage and About image are set by `heroImages` and `aboutImage` at the bottom of `projects.js`.

### Optimising images
Original exports (often 5000px+ PNGs) are much too large for the web. Resize them to about 1400px on the long edge and convert to WebP before adding them. With ImageMagick:

```bash
convert "input.png" -resize '1400x1400>' -strip -quality 78 output.webp
```

Images were resized to 1600px on the long edge and saved as WebP. Videos were scaled to 540×960 H.264 with a poster frame taken from the video, which brought the 1.5 GB source folder down to about 220 MB:

```bash
ffmpeg -i input.mp4 -vf scale=540:-2 -c:v libx264 -preset slow -crf 28 -maxrate 1500k -bufsize 3000k \
  -pix_fmt yuv420p -c:a aac -b:a 96k -movflags +faststart output.mp4
ffmpeg -ss 6 -i output.mp4 -frames:v 1 -c:v libwebp -quality 80 output.webp
```

Byte-identical "(1)" copies and two badges that were visual duplicates were left out.

## Accessibility and motion

- Semantic landmarks, a skip link, and keyboard-accessible menu, filters and lightbox (Esc to close, ← → to browse).
- Animations respect the operating system's "reduce motion" setting, through Framer Motion's `MotionConfig` and a CSS media query.
