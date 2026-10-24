# CareConnect React PWA — Implementation notes

## Run

```bash
npm install
npm run dev
npm run typecheck
npm run lint
npm run build
npm run preview
npm run start:prod   # build + preview in one step (use this for Lighthouse)
npm run dev
```

Node.js 20.19+ or 22.12+ is recommended for Vite 8. Install dependencies before running checks.

## Source structure

```
src/
├── main.tsx                     Entry: Redux <Provider> + <App />, registers service worker
├── App.tsx                      PreferencesProvider + RouterProvider (nothing else)
├── serviceWorker.ts             PWA registration (production only)
├── routes/
│   ├── paths.ts                 PATHS constants – every URL lives here
│   ├── router.tsx               Route tree (createBrowserRouter) – diagram in file
│   └── guards/                  RequireAuth, RequireRole
├── layouts/                     PublicLayout, AppLayout (header + nav + <Outlet />)
├── navigation/navItems.ts       Sidebar links + role filtering
├── pages/                       One file per screen; composition only (18–69 lines each)
├── components/
│   ├── ui/                      Generic, app-agnostic building blocks:
│   │                            Button, Card, StatusBadge, TextField, TextAreaField,
│   │                            SelectField, ChoiceGroup, FilterButtons, Switch, PageHeading
│   ├── layout/                  BrandHeader, Sidebar
│   ├── appointments/            AppointmentCard, AppointmentListItem, AppointmentEditor
│   ├── notes/                   NoteCard, NoteComposer
│   ├── contacts/                ContactCard, ShareContactsCard
│   ├── activity/                ActivityTimeline
│   ├── dashboard/               SummaryGrid, ScheduleCard
│   ├── roles/                   RoleCard
│   └── settings/                VoiceReadingSettings
├── hooks/                       Custom hooks (see below)
├── context/                     Preferences context + provider
├── store/                       Redux Toolkit
│   ├── index.ts                 configureStore, typed hooks, persistence subscription
│   ├── careSlice.ts             Reducers / actions
│   ├── selectors.ts             selectAppointments, selectNotes, …
│   ├── persistence.ts           localStorage load / save
│   ├── seed.ts                  Demo data
│   └── types.ts                 Role, Appointment, Note, Activity, …
├── data/                        Static demo data (contacts, dashboard)
└── constants/icons.ts           Icon asset paths
```

### Adding a page

1. Create `src/pages/MyPage.tsx` (render content only – the layout supplies header/sidebar).
2. Add its URL to `PATHS` in `src/routes/paths.ts`.
3. Add a route under the right layout/guard in `src/routes/router.tsx`.
4. If it belongs in the sidebar, add it to `src/navigation/navItems.ts` (use `roles` to restrict it).

## Lighthouse (Performance, Accessibility, Best Practices, SEO ≥ 90)

**Always audit the production build, never `npm run dev`.** The dev server serves hundreds of unbundled, unminified modules plus React's development build, so Lighthouse reports FCP/LCP of 9–16 s there. That number says nothing about the real app.

1. Stop `npm run dev` (Ctrl+C in its terminal).
2. `npm run start:prod` — builds, then serves `dist/` with gzip on **http://localhost:4173** and opens it.
   The dev server is on **8443**, the production preview on **4173**. If the port shows 8443, you are auditing the dev server.
3. Copy the 4173 URL into a **Chrome Incognito window** (extensions slow pages down and skew the score).
4. DevTools → Lighthouse → Mode *Navigation*, Device *Mobile*, all four categories → *Analyze page load*.

How to tell which server Lighthouse audited: in the report, open *View Treemap* or the "Reduce unused JavaScript" audit. Files like `/src/main.tsx`, `/@vite/client` or `node_modules/.vite/deps/…` mean the dev server. A production build shows a few hashed files such as `/assets/index-3f9a1c.js`.

What was done to reach ≥ 90:

| Area | Change |
|---|---|
| SEO | `.figma/make/site.json` had `robots.index: false`, which added `<meta name="robots" content="noindex, nofollow">` and a `robots.txt` blocking all crawlers (Lighthouse: "Page is blocked from indexing"). Now `true`, with `public/robots.txt` allowing crawlers. Descriptive `<title>`, meta description, `lang="en"`, `<noscript>` fallback. |
| Performance | Route-level code splitting: only the sign-in page ships in the main bundle; every other page loads on first visit (`lazy` routes in `src/routes/router.tsx`). Vendor chunks (`vendor-react`, `vendor-router`, `vendor-redux`) are split in `vite.config.ts` so they stay cached across releases. No web-font download. Explicit `width`/`height` on images (no layout shift). |

Measured on the production build at `/signin` with Lighthouse's mobile settings (412 px, 4× CPU slowdown, 150 ms RTT, 1.6 Mbps): **FCP 1.2 s, LCP 1.2 s, TBT 0 ms, CLS 0** (est. Performance 100; 97 under the harsher DevTools "Slow 4G" preset). All automated SEO audits pass.

## Code quality

| Check | How | Result |
|---|---|---|
| **ESLint** | `npm run lint` → `eslint src --max-warnings 0`. Config adds `react-hooks` (rules-of-hooks, exhaustive-deps as **error**), `no-console`, `eqeqeq`, `consistent-type-imports` on top of the JS + typescript-eslint recommended sets. | 0 errors, 0 warnings |
| **TypeScript** | `npm run typecheck` (strict mode) | 0 errors |
| **Console** | Every page and interaction for both roles at 1440 / 768 / 375 px (132 steps: sign-in, navigation, drawer/rail, filters, copy, settings, add/edit/delete appointment, add note, reload) in a React **development** build and a **production** build with the service worker. | No errors, warnings or logs |

**Component structure** — pages only compose components and call hooks; no page talks to Redux or `localStorage` directly. Generic UI lives in `components/ui/`, feature components in `components/<feature>/`. Each file exports one component.

**Reusable components** — e.g. `StatusBadge` (appointments, notes, schedule), `TextField` (sign-in + appointment editor), `FilterButtons` (with `aria-pressed`), `Switch` (`role="switch"`), `Button` (button / router link / external link with `rel="noopener noreferrer"`).

**Custom hooks**

| Hook | Responsibility |
|---|---|
| `useSession` | Signed-in state + role, sign in/out |
| `useAppointments`, `useNotes`, `useActivityLog` (`useCareData.ts`) | Domain data + actions; hide Redux selectors/dispatch and id generation |
| `useAppointmentEditor` | Draft state, validation, save/delete for the appointment form |
| `useNavigationDrawer` | Drawer/rail open state, Escape, focus, scroll lock, close on route change |
| `useMediaQuery` + `BREAKPOINTS` | Subscribe to CSS breakpoints (`useSyncExternalStore`) |
| `usePersistentState` | `useState` backed by `localStorage`, with validation |
| `useSpeechReader` | Read page aloud / stop (speech synthesis) |
| `useCopyToClipboard` | Copy text, `copied` flag that auto-resets |
| `usePreferences` | Access the preferences context |

Fonts: the Figma-only `static.figma.com` web fonts were removed (they fail outside Figma and caused console errors and lost bold weights). The app uses Inter when installed, otherwise the system UI font — no font download, so it also works offline.

## Responsive behavior

Breakpoints live in `src/index.css` and are mirrored in `src/hooks/useMediaQuery.ts` (`BREAKPOINTS`).

| Width | Navigation | Layout |
|---|---|---|
| **Mobile** `< 768px` (tested at 375) | Hamburger in the header opens an off-canvas drawer with a backdrop. Closes on link tap, backdrop tap, Escape, or resize. Page scroll is locked and focus moves into the drawer while it is open. | Single column; full-width action buttons; 2-up summary tiles; settings choices stacked; header shows "Listen" instead of "Listen to this page". |
| **Tablet** `768–1023px` (tested at 768) | 73px icon rail (labels kept for screen readers and as tooltips). The rail toggle expands it **over** the content with a backdrop, so the page never squashes. | Two-column grids where they fit; dashboard schedule stacks; appointment editor moves under the list ("Edit" scrolls to it). |
| **Desktop** `≥ 1024px` (tested at 1024 / 1440) | Full sticky sidebar with labels; "Sign out" pinned to the bottom. | Multi-column grids; sticky appointment editor; wider sidebar and content at ≥1440px. |

**Touch vs click targets** use `--target`, set per input device rather than per screen width:

- Mouse / trackpad (`pointer: fine`): `--target: 40px`, 8px spacing, hover effects enabled.
- Touch (`pointer: coarse`): `--target: 48px` (above the WCAG 2.5.5 44px minimum), 12px spacing between adjacent targets, hover effects disabled (they "stick" after a tap) and replaced with press feedback.

Buttons, nav links, header links, phone links, form fields, the voice switch and the menu toggles all use `--target`. Animations respect `prefers-reduced-motion`. New pages start at the top (`<ScrollRestoration />`).

**How to test:** Chrome DevTools → Toggle device toolbar (Ctrl+Shift+M). Use *Responsive* at 375, 768 and 1440 widths. Pick a touch device (e.g. iPad Mini, iPhone SE) to see the 48px touch targets; in plain *Responsive* mode with a mouse you get the 40px click targets.

## Implemented

- React Router role-based navigation and protected pages.
- Redux Toolkit store for appointments, care notes, activity, and demonstration session state.
- Local-only persistence of appointments, notes and activity via localStorage.
- Demo login: `joyce@example.com` / `careconnect` (NOT production authentication).
- Caregiver appointment create, edit, delete with required-field validation.
- Caregiver note submission and priority selection; activity filtering.
- Contact dial links and copy-to-clipboard; map directions links.
- PWA manifest with install icons, offline HTML fallback, service worker and runtime caching of static assets in production.
- Existing accessibility preferences and speech synthesis.

## Important limitations

- This is a **front-end demonstration**; it does not include a server, database, real account authentication, or secure role enforcement. Do not store real patient information in browser localStorage.
- PWA service worker registers only in production builds (`npm run build && npm run preview`). The initial online visit is required to cache resources. Browser storage can be cleared or evicted; offline support is best effort.
- Local-only edits do not synchronize across devices; offline edits remain on the same device.
- Mobile/desktop native app code was not supplied, so feature parity with those apps cannot be verified.
- Dependencies could not be installed in this execution environment, so lint, typecheck, build, and browser-based viewport tests must be run locally.

## Manual verification checklist

1. Test at 375, 768, and 1440 CSS px (see *Responsive behavior*). Open/close the mobile drawer and tablet rail; confirm no horizontal scrolling and 48px touch targets in touch emulation.
2. Sign in using demo credentials; verify invalid credentials are rejected; switch between roles.
3. Create, edit and delete appointments as caregiver; refresh and confirm persistence.
4. Add notes; refresh; filter activity; copy contacts; launch telephone/map links.
5. Build and preview, visit once online, turn off network, and revisit cached routes. Confirm offline fallback and update behavior.
6. Run `npm run lint`, `npm run typecheck`, and `npm run build`; open DevTools → Console and click through both roles — it should stay empty.

##
