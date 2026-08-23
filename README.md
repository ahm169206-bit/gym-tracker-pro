# IRON TRACK — Workout Tracker

A professional gym workout planner and tracker built with React + Vite. Dark, athletic, red/black theme.
Created by **Ahmed Yasser**.

## Features
- Weekly workout program starting with 7 days, unlimited "+ Add Day"
- Rename/delete/edit days, add unlimited exercises per day
- Per-exercise sets with weight (KG, decimals supported), reps, and notes
- Auto-save to LocalStorage — no save button, "Changes saved automatically" badge
- Dashboard with live stats: total days, exercises, sets, completion %
- Day and exercise completion tracking with progress bars
- Global exercise search + filter (all / pending / completed)
- Export/import your program as JSON, with validation
- Reset-to-default with confirmation modal (never deletes accidentally)
- Toast notifications, confirmation dialogs before every delete
- Installable PWA with offline support (manifest + service worker)
- Fully responsive: sidebar on desktop, bottom nav on mobile

## Run locally
```bash
npm install
npm run dev
```

## Build for production
```bash
npm run build
npm run preview
```

## Deploy to Vercel
1. Push this project to a GitHub repo (or use GitHub Desktop, as you already do).
2. Go to vercel.com → New Project → import the repo.
3. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`.
4. Deploy — no backend or server config needed.

## Install as a PWA
Open the deployed URL on your phone → browser menu → "Add to Home Screen" / "Install app".

## Customize
- **Colors/theme**: edit the CSS variables at the top of `src/index.css` (`--bg`, `--red`, `--blue`, etc).
- **Default days**: edit `defaultDays()` in `src/utils/helpers.js`.
- **App name/branding**: `index.html` `<title>`, `public/manifest.json`, and `src/components/Sidebar.jsx`.
- **Icons**: replace the PNGs in `public/icons/` (keep the same filenames/sizes).

## Data storage
All data lives in the browser's LocalStorage under the key `iron-track:days`. Nothing is sent to a server, so export regularly if you switch browsers or devices.

---
© 2026 Ahmed Yasser — All Rights Reserved.
