# CLAUDE.md — TactiForge

Working context for Claude Code. Kept up to date as the refactor proceeds.
Last updated: 2026-07-17 (Block 3 — package cleanup, 0 vulnerabilities; ready for redesign).

> **Conventions (agreed with owner):**
> - Code comments, commit messages, and docs → **English**. UI copy stays **Ukrainian**.
> - Refactor scope: **frontend only** (backend was fully removed in Block 2).
> - Stack: **keep it** (React/Redux/Babylon/Tailwind). Remove unused deps and improve within the current stack; no framework swaps or large migrations.
> - Bugs: **fix adjacent obvious bugs proactively**, and call them out in the summary.
> - Open item: canonical brand name — repo says `TactiForge`, UI says `DigitalArmsLab` (unresolved).

---

## 1. What this is

**TactiForge** (branded `DigitalArmsLab` in the UI — ⚠️ mismatch) is an educational web app
for interactive 3D study of weapons. Ukrainian-language UI. Voice "guide" (audio narration),
3D weapon models (Babylon.js), assembly/disassembly animations, and side-by-side comparison
of Soviet vs NATO analogues arranged in "pairs".

**Now a pure frontend app** (no backend, no database). All weapon data lives in a bundled
JSON file; all media (models/audio/previews) is served statically from `public/assets`.
Deployed as a static site on Vercel.

> Owner note: the codebase is dated and was written by a near-beginner. Goal is an incremental
> refactor of architecture and design (tasks arrive one at a time).

---

## 2. Repository layout

Single frontend project (backend removed in Block 2):

```
e:\TactiForge
├─ frontend/   Vite + React 18 + TS
└─ README.md   (near-empty: "# TactiForge")
```

### Commands
- `cd frontend && npm run dev` (Vite) · `npm run build` (`tsc -b && vite build`) · `npm run lint` · `npm run preview`

---

## 3. Frontend

**Stack:** Vite 6, React 18.3, TypeScript 5.6 (strict), React Router 6, Redux Toolkit,
Babylon.js 7 (`@babylonjs/core` + loaders), CSS Modules (+ PostCSS/autoprefixer),
framer-motion, react-icons, clsx.
(Block 3: removed dead Tailwind and react-loader-spinner. Styling is **CSS Modules only** —
a clean base for the upcoming redesign. `npm install` / `npm audit` → 0 vulnerabilities.)

### Entry & routing
- [main.tsx](frontend/src/main.tsx): `BrowserRouter` → `Provider(store)` → `<App/>`, StrictMode.
- [App.tsx](frontend/src/components/App/App.tsx): all pages are `lazy()` + `<Suspense>`.
  Routes:
  - `/` → `LandingPage`
  - `/laboratory` → `LaboratoryPage`
  - `/weapons/:id` → `WeaponPage`
  - No catch-all `*` / 404 route.

### Pages (`src/pages`)
- **LandingPage** — pure composition: `LandingModelScene(media="mavic2")` + `AppBar` + `Hero` + `Numbers` + `Features` + `Partners`.
- **LaboratoryPage** — app core. Loads all weapon pairs (`fetchAllWeaponPairs`); local state:
  `pairNumber` (persisted to `localStorage`), `animation`, `chatOpen`, `animatedWeapon`,
  `loading`, `error`, `weaponsData: WeaponPairType[]`. Two columns: `HomeWrapper` (pair cards)
  and `SoldierScene` (3D soldier) wrapping `Chat`.
- **WeaponPage** — single-weapon detail (`fetchWeaponWithId(id)`): `WeaponScene` (3D model),
  `WeaponLabel`, `WeaponSideBar` (specs / operation / sources), `ButtonsList`
  (rotation / disassembly / theory). Unknown id → `error` → `ErrorMessage`.
  Disassembly animation is hardcoded to `ak74` only.

### State & data
- **Redux** ([store.ts](frontend/src/redux/store.ts)): a single `audio` slice (`audioSrc`, `isPlaying`),
  wrapped by [useAudio.ts](frontend/src/hooks/useAudio.ts). All other state is local `useState` in pages.
- **Data layer** ([services/weapons.ts](frontend/src/services/weapons.ts)): reads the bundled
  [src/data/weaponPairs.json](frontend/src/data/weaponPairs.json) (4 pairs, 8 weapons — snapshot
  of the old MongoDB collections). Functions stay `async` to preserve the pages' loading/error flow:
  - `fetchAllWeaponPairs(): Promise<WeaponPairType[]>` — returns all pairs.
  - `fetchWeaponWithId(id): Promise<WeaponType | undefined>` — flattens pairs, finds by `_id`.
  - No network, no axios, no API base URL. `_id` strings are the original Mongo ObjectIds (kept because routing/keys/animation rely on them).
- **Types** ([Weapon.types.ts](frontend/src/types/Weapon.types.ts)): `WeaponPairType`, `WeaponType`, `Characteristic`.

### Babylon.js scenes (3 separate, duplicated logic)
Each scene creates its own `Engine`/`Scene`, loads a `.glb` via `SceneLoader.ImportMesh`,
sets up cameras/lights, and disposes in its `useEffect` cleanup. Lots of shared code —
prime candidate for a shared hook/scene factory.
- [SoldierScene.tsx](frontend/src/components/SoldierScene/SoldierScene.tsx) — soldier + animations (`Idle`/`Talking`); takes `children` (renders `Chat`).
- [WeaponScene.tsx](frontend/src/components/WeaponScene/WeaponScene.tsx) — weapon model; rotation; animations `idle`/`assemble`/`diassemble` (⚠️ typo `diassemble`, matches the `.glb` clip names).
- [LandingModelScene.tsx](frontend/src/components/LandingModelScene/LandingModelScene.tsx) — landing-page drone reacting to scroll/wheel; own `requestAnimationFrame` loop.

### Assets (`frontend/public/assets`) → served at `/assets/...`
`models/*.glb`, `previews/*.png`, `audio/*.mp3`, `partners/*`, `soldier.glb`, `logo.svg`.
Weapons match on the `media` field (e.g. `ak74`) → `/assets/models/ak74.glb`,
`/assets/previews/ak74.png`, `/assets/audio/ak74.mp3`.

**Asset coverage vs data** (8 weapons): all have a model and a preview.
⚠️ **Audio missing for `fpv` and `mavic`** (the "Дрони" pair) — no `fpv.mp3` / `mavic.mp3`.
Clicking their narration button plays nothing (the `.play()` error is caught; no crash). Pre-existing
content gap, unrelated to the backend removal. Needs the two files, or hide narration for audio-less weapons.

### Key component tree
```
LaboratoryPage
├─ AppBar → Navigation
├─ HomeWrapper → WeaponPair → WeaponCard (Link → /weapons/:id)
└─ SoldierScene
   └─ Chat → QuestionsList
WeaponPage
├─ WeaponScene
├─ WeaponLabel
├─ WeaponSideBar → WeaponTable
└─ ButtonsList
```

---

## 4. Data (no backend)

There is **no server and no database**. Backend was deleted entirely in Block 2.

- Source of truth: [frontend/src/data/weaponPairs.json](frontend/src/data/weaponPairs.json) —
  imported directly (`resolveJsonModule`), so it is bundled into the JS build (no runtime fetch).
- Shape: array of pairs `{ _id, name, weapons: WeaponType[] }`; each weapon
  `{ _id, name, country, year, media, shortText, characteristics[], operation, sources[] }`.
- To edit content: edit the JSON. (No admin UI — it was removed in Block 1.)

---

## 5. Known tech debt / bugs (registry)

_Resolved: Block 1 removed all auth/email/admin/dead-code. Block 2 removed the entire backend
and moved data to local JSON (dropped axios + hardcoded `apiDomain`)._

**Frontend**
- [CustomLoader.tsx](frontend/src/components/CustomLoader/CustomLoader.tsx): `setInterval` runs on every render with no cleanup → leaking/accumulating intervals; the `currentMessage > 3` logic is off-by-one.
- Duplicated Babylon logic across the 3 scenes (no shared abstraction).
- `ErrorMessage` is just the text "Unknown error" (no styling/context).
- Magic numbers/hardcodes: disassembly animation only for `ak74`; 250/500 ms timeouts for transitions.
- Typo `diassemble` (frontend animation name; matches the `.glb` animation clips).
- ⚠️ Missing audio assets: `fpv.mp3`, `mavic.mp3` — left as-is by owner decision (Block 3).
- Lint: 4 pre-existing `react-hooks/exhaustive-deps` warnings (0 errors) in the 3 Babylon scenes + WeaponPage.

---

## 6. Work log

| Date | Task | Status |
|------|------|--------|
| 2026-07-17 | Initial architecture analysis, CLAUDE.md created; conventions agreed | ✅ |
| 2026-07-17 | **Block 1 — dead-code removal.** BE: deleted auth (register/login/refresh/logout), email/SMTP, `user`/`session` models, `authenticate`/`validateBody`, `constants`, `profile`; pruned deps + `.env.example`; `/weapons` was the only router. FE: deleted AdminPage, HelpPage, AuthNav/UserNav/Footer/Socials/Fog; removed `/admin` & `/help` routes + help nav link + `addWeapon`; pruned deps (elevenlabs, react-babylonjs, formik, yup, stale @types). | ✅ |
| 2026-07-17 | **Block 2 — backend removed.** Snapshotted live `/weapons` data into [src/data/weaponPairs.json](frontend/src/data/weaponPairs.json) (4 pairs / 8 weapons). Rewrote `services/weapons.ts` to read the JSON (dropped axios + `constants.ts`/`apiDomain`); typed `weaponsData`; WeaponPage shows `ErrorMessage` on unknown id; enabled `resolveJsonModule`. **Deleted the entire `backend/` folder.** Verified: `npm run build` clean; `vite preview` serves all routes + models/audio/previews/soldier at 200 (audio for fpv/mavic 404→SPA-fallback = the known gap). | ✅ |
| 2026-07-17 | **Block 3 — package cleanup + security.** Synced lockfile with pruned deps (`npm install` removed ~82 extraneous pkgs). Removed dead **Tailwind** (`tailwindcss` + `tailwind.config.js`, cleaned `postcss.config.js` to autoprefixer-only) and **react-loader-spinner** (replaced `Triangle` with a CSS spinner in `Loader.tsx`/`Loader.module.css`; this also dropped the transitive `styled-components`). `npm audit fix` bumped `picomatch` 2.3.1→2.3.2 (lockfile only). Result: **0 vulnerabilities**, `npm run build` + `npm run lint` clean (0 errors). Styling is now CSS Modules only — ready for the redesign. | ✅ |
