# TaskFlow Pro — Frontend

Live demo: https://taskflowprova.netlify.app/

A polished task manager frontend built with React, Vite and Tailwind CSS. This repository contains a small monorepo-style layout where the actual app lives in the `taskflow-pro/` folder.

Key features
- Task creation, editing, priority, tags and completion toggles
- Filters and analytics dashboard
- Light / dark theme with persistent preference
- Responsive, modern UI components (Cards, Modals, Inputs)

Tech stack
- React 18 + JSX
- Vite (dev server and build)
- Tailwind CSS for styling
- PostCSS + Autoprefixer

Repository layout
- `taskflow-pro/` — The actual Vite + React app (contains `package.json`, `src/`, etc.)
- `netlify.toml` — Root-level Netlify config (build base set to `taskflow-pro`)

Quick start (local development)

Prerequisites
- Node 18+ (Node 20 works too) and Yarn

1. Clone the repo

```bash
git clone <your-repo-url>
cd react-js-jsx-and-css-mastering-front-end-development-Ab494/taskflow-pro
```

2. Install dependencies

```bash
yarn install
```

3. Run the dev server

```bash
yarn dev
# Open http://localhost:3000 (Vite output will show the exact URL)
```

Production build

```bash
yarn build
# The production-ready files are written to `dist/`.
```

Serve the build locally (optional)

```bash
npx serve dist
# then open the host and port shown by `serve` (e.g. http://localhost:3000)
```

Deploying to Netlify

This project is configured to deploy from the repository root to Netlify. The root `netlify.toml` instructs Netlify to use the `taskflow-pro` subfolder as the build base.

Netlify settings (if you prefer UI configuration):
- Base directory: `taskflow-pro`
- Build command: `yarn build`
- Publish directory: `dist`
- Environment variable (optional): `NODE_VERSION=18`

Alternatively, you can drag-and-drop the `taskflow-pro/dist` folder into Netlify for a quick manual deploy.

Common issues and notes
- Case-sensitive imports: development environments on Linux/CI are case-sensitive. The app expects `src/context/ThemeContext.jsx` and `src/context/TaskContext.jsx` (watch for incorrect casing such as `Themecontext.jsx`).
- Tailwind/PostCSS: If you see errors about unknown utilities or PostCSS config, ensure `postcss.config.cjs` (CommonJS) or an ESM `postcss.config.js` that matches `package.json` (`type: "module"`) is present in `taskflow-pro/` and that `tailwindcss` and `autoprefixer` are installed as devDependencies.
- Node engines: The project requests Node >=18. Netlify builds can be forced to use Node 18 via `netlify.toml` or the `NODE_VERSION` site environment variable.

Files added to support CI/CD
- `netlify.toml` (root) — directs Netlify to build inside `taskflow-pro` and publish `dist`

Contributing
- Fixes, improvements and bug reports are welcome. Open a PR against `main` with a clear description and a reproducer when relevant.

License
- This repository does not include a license file by default. Add one (for example MIT) if you plan to publish or share the code publicly.

Questions or help?
- Paste any build logs or errors here and I can help diagnose and fix them.
