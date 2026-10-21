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

The `dist/` folder is a static site, so you can deploy it to Netlify, Vercel, GitHub Pages or any static host.

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
  assets/work/          optimised portfolio images (brand, social, print, logos, illustration) — 137 pieces
```

## Editing content

Everything you'd normally change lives in `src/data/`. Text in `[square brackets]` is placeholder content. Replace it with real details, or delete the entry.

- **Contact details and social links:** fill in `contact` and `socials` in `profile.js`. Empty values are hidden, so nothing invented is shown.
- **Contact form:** the form validates input on the page. To actually deliver messages, either
  - set `contact.formEndpoint` to a [Formspree](https://formspree.io) (or similar) endpoint, or
  - set `contact.email`, and the form will open the visitor's email app with the message pre-filled.

  Until one of these is set, submitting shows a "not connected yet" message.
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
     category: 'brand',                 // brand | social | print | logos | illustration
     image: work('brand/my-campaign.webp'),
     tags: ['Jewellery', 'Story'],
     featured: true,                    // optional: show in the "Featured" tab
     link: 'https://behance.net/…',     // optional: otherwise the card opens a full-size view
   },
   ```
If a path is mistyped, the dev server shows a clear "Image not found" error instead of a broken image.

The hero collage and About image are set by `heroImages` and `aboutImage` at the bottom of `projects.js`.

### Optimising images
Original exports (often 5000px+ PNGs) are much too large for the web. Resize them to about 1400px on the long edge and convert to WebP before adding them. With ImageMagick:

```bash
convert "input.png" -resize '1400x1400>' -strip -quality 78 output.webp
```

All 137 unique pieces from the original 263 MB folder were reduced to about 12 MB this way. (8 files that were byte-identical "(1)" copies, and one WhatsApp re-export of an existing poster, were left out.)

## Accessibility and motion

- Semantic landmarks, a skip link, labelled form fields with inline errors, and keyboard-accessible menu, filters and lightbox (Esc to close, ← → to browse).
- Animations respect the operating system's "reduce motion" setting, through Framer Motion's `MotionConfig` and a CSS media query.
