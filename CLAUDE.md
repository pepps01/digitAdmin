# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — dev server on http://localhost:3000
- `npm run build` / `npm start` — production build / serve
- `npm run lint` — `next lint` (extends `next`)
- No test runner is configured.

Both `package-lock.json` and `yarn.lock` exist; CI (`.github/workflows/staging.yaml`) uses `yarn install` + `yarn build`, then runs the app under pm2 on port 4000 on push to `main`. Prefer yarn to stay consistent with CI.

## Architecture

Next.js 13 **Pages Router** + TypeScript (strict) + Tailwind + MUI, an admin dashboard for two products sharing one backend (`https://easy.unikmarketing.org/api`):

- `pages/cue/*` — ride-hailing admin (riders, drivers, trips, SOS, live tracking)
- `pages/flip/*` — marketplace admin (merchants, consumers, products, services, orders, jobs, withdrawals, approvals)
- `pages/dashboard/*` — shared/general admin (users, transactions, proposals, audit, media, settings)
- `pages/index.tsx`, `earn-with-cue`, `faq`, `support`, `privacy`, `terms` — public marketing site (blue `cue` theme colors in tailwind config), built from `src/components/public/`; no auth needed
- `pages/admin/index.tsx` — admin sign-in

Imports use `baseUrl: "."`, so modules are imported as `src/...` (e.g. `src/Hooks/use-redux`). The `@/actions`, `@/box`, `@/forms`, `@/modal` aliases in tsconfig point at `components/...` (not `src/components/...`), so they likely don't resolve; use `src/components/...` paths.

### App shell
`pages/_app.tsx` renders only after mount, redirects to `/admin` if `sessionStorage.accessToken` is missing on `/dashboard`, `/cue` or `/flip` routes (auth is client-side only), wraps everything in the Redux `Provider`, and mounts global `Toast`, `DrawerCard`, `Modal`, `Loader`. Those are driven by `ui-slice` (`uiActions.openToastAndSetContent`, `openLoader`, `openModal`, `opendrawer`, etc.), so pages trigger UI via dispatch rather than local state. Pages wrap content in `src/components/ParentContainer` (SideNav/TopNav, loads the admin profile, and subscribes to Firestore `driver` collection to push live driver locations into the user slice).

### Data flow
- Redux Toolkit store in `src/redux/store/index.tsx`; one slice per domain in `src/redux/store/features/*-slice.tsx` plus `auth-slice` and `ui-slice`. Use the typed hooks in `src/Hooks/use-redux.tsx`.
- Slices define `createAsyncThunk`s that call the API with axios, reading the token from `sessionStorage.accessToken` inside each thunk. Typical page pattern: `useEffect` dispatches a fetch thunk and reacts to `loading`/`error`/`success`/`message` from the slice by dispatching `uiActions` (loader, toast, close modal/drawer) and `clearError`/`clearMessage`.
- API base URLs are constants in `src/components/api.js` (note: `api.js`, not under a config dir). Some thunks hardcode URLs instead.
- `src/Hooks/use-http{get,post,delete}.tsx` are an alternative non-Redux request helper that toasts errors via `uiActions`.
- Firebase (`firebase.ts` at repo root, Firestore project `cue-rider`) is used for realtime driver/trip location data (`TrackingMap`, `ParentContainer`); everything else goes through the REST API.

### UI layout
`src/components/` is flat, with subfolders: `tables/` (per-entity table components built on react-table / react-data-table-component), `Forms/` (Formik + Yup forms, usually shown in the drawer/modal), `BoxComponents/` (detail-page info panels), `ModalContent/`, `ActionMenu/`. Shared types are in `src/@types`; helpers and column definitions in `src/utils`. Dynamic detail routes are `[xId].tsx` next to each list `index.tsx`.

### Config notes
- `next.config.js` `images.remotePatterns` must whitelist any new remote image host/path used with `next/image`.
- Custom font ClashDisplay lives in `src/assets/fonts`.
