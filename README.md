# Frank.M.Tech portfolio

Vite + React + TypeScript + Tailwind CSS v4 + Framer Motion + Lucide.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build into dist/
npm run preview  # serve the production build locally
```

## Your assets (put these in `public/`)

| File | Used for |
| --- | --- |
| `public/images/profile.jpeg` | Hero photo (rename your `profile image.jpeg`) |
| `public/pdf/cv.pdf` | "View CV" button |
| `public/images/creatives/video-1..4.jpg` | Video reel posters / thumbnails |
| `public/images/creatives/photo-1..4.jpg` | Photography gallery |
| `public/images/creatives/design-1..4.jpg` | Posters, logos, brand kits |
| `public/images/projects/*.png` | Case cards (cafehub, eventsimplified, lms, blog1, mpesafigma) |

Anything missing shows a tidy placeholder, so the site never has broken images.
Want more than 4 per creative category? Add entries to `creatives` in `src/data.ts`; the gallery counter (`2 / 12`) updates itself.

## Edit content

Everything (copy, prices, projects, articles, certifications, nav menus) is in `src/data.ts`.
Quote-calculator add-on prices are in the `ESTIMATOR` object there.

## Deploy

Push to GitHub and import the repo in Vercel or Netlify. Build command `npm run build`, output directory `dist`.
