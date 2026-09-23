@AGENTS.md

# dgheoba

დღეობა — event photo sharing. A guest scans the QR code on their table, types their name, and
lands in a shared album they can upload photos and videos to.

Expo SDK 57, managed workflow, expo-router, React 19.2 / RN 0.86, TypeScript strict.
**iOS and Android only** — there is no web target and no `react-native-web`. Never add web code.

`README.md` holds the long-form rationale (where colours came from, per-screen design notes,
known gaps). This file is the working contract: what to follow, what will bite you.

## Commands

```bash
npm run ios          # dev server + iOS simulator
npm run android
npm start            # dev server, always --reset-cache
npm run lint         # eslint — does NOT typecheck
npm run typecheck    # tsc; run this, `expo lint` will not catch type errors
npm run format       # prettier over the repo
```

`husky` + `lint-staged` run `eslint --fix` then `prettier --write` on staged files.
No test setup exists.

## Distribution

EAS project is `@ivchiik/dgheoba`. Bundle id / package is `com.dgheoba.app` on both platforms —
permanent once anything ships, do not change it casually. `eas.json` has three profiles:
`development` (dev client), `preview` (internal, Android builds an APK), `production` (store).

```bash
eas build -p android --profile preview   # installable APK link, no Apple account needed
eas build -p ios --profile production    # then `eas submit -p ios` for TestFlight
eas update --branch preview -m "..."     # OTA push, no rebuild
```

EAS Update is wired (`expo-updates`, `updates.url` in `app.json`), with
`runtimeVersion: { policy: "fingerprint" }`. **JS, style and asset changes ship over the air;
anything that changes native code — a new native dependency, a plugin, an SDK bump — changes the
fingerprint and needs a fresh build.** Clients pick an update up on the next cold start, not the
launch that downloads it.

## Layout

```
src/
  navigation/   app/ (expo-router routes), routes.ts, screenOptions.ts, AppTabBar
  screens/      one folder per screen
  components/   App*-prefixed primitives, one folder each
  providers/    AppProviders — the whole-tree wrapper
  theme/        colour tokens + useTheme
  i18n/         i18next bootstrap + locales
  api/          axios client + React Query client
  storage/      never-throw KV wrapper
  store/        session media list (stand-in for server state)
  utils/        one exported function per file, filename = function name
  hooks/        cross-cutting hooks
  types/        module augmentations (i18next keys, *.svg)
assets/         icons/ images/ — root-level, reachable as @/assets/*
```

Routes live at `src/navigation/app`, **not** `src/app`. expo-router only auto-detects `./app`
or `./src/app`; ours is set by the `root` prop on the `expo-router` plugin in `app.json`.
Route files are one line each — `export { XScreen as default } from "@/screens"`.

## Conventions

**Container/presenter.** Every screen's logic lives in `container/use<Name>.ts` and returns one
flat object of state + handlers. The `.tsx` stays near-pure JSX. Handlers are `handleX` inside,
`onX` as props; booleans are `isX`; refs are `xRef`.

**Styles.** `export const _styles = (theme: Theme) => StyleSheet.create({...})` in
`Name.styles.ts`, consumed as `const { styles, theme } = useTheme(_styles)`. `useTheme()` with no
argument returns just the theme, for dynamic values (icon tints). Styles never hardcode a hex —
always `theme.color.x`. State variants are sibling keys composed with `&&` in a style array. Only
`AppProviders` and `+not-found` use a bare `StyleSheet.create`, because they have no theme needs.

**Theme.** One static light theme, no provider, no dark variant, no breakpoints (every Figma frame
is 393×852). `useTheme` reads a module constant but keeps the hook shape so call sites survive if
a second theme ever arrives. Add a palette step only when a screen needs it.

**Barrels.** One named-export barrel per layer, with a trailing `// types` section using
`export type`. Import across layers through the barrel (`@/components`, `@/store`), never a deep
path. Within a folder, import the sibling file directly.

**Import order** is manual (`organizeImports` is off in `.vscode/settings.json`), blank line
between groups: react / react-native / native third-party / expo-\* → `@/` aliases (alphabetical)
→ relative.

**Text and i18n.** `AppText` owns text policy — theme font, ink colour, `allowFontScaling={false}`
— and treats a **string child as a translation key**, so screens write `<AppText>album.title</AppText>`.
Values already resolved (names, counts) get translated at the call site with `t(...)` in the
container and passed down as strings. `AppInput` does the same for `placeholder`. Sizes and weights
come from the caller's style, not a variant prop. `en.ts` is the source of truth; `ka.ts` is typed
`typeof en`, so a missing key is a compile error. Never hardcode a user-facing string.
Default language is Georgian and the device locale is deliberately **not** consulted.

**Routes.** `ROUTES` in `src/navigation/routes.ts` is `satisfies Record<string, Href>`, so a path
that doesn't exist fails to compile. Dynamic routes go through the `mediaRoute(id)` helper — under
typed routes a dynamic pathname must stay a template with params passed separately. Nothing passes
a literal to `router.push`.

**State, three tiers.** React Query for server state (none yet); `src/store/mediaStore.ts` for the
session's media list; `storage` (`expo-sqlite/kv-store`) for durable primitives, keys registered in
`STORAGE_KEYS`. Note this project deliberately differs from the usual blueprint: **no zustand**
(the one shared list is a hand-rolled module store + `useSyncExternalStore`) and **no MMKV**
(`expo-sqlite/kv-store` instead, sync API, every call wrapped so it can never throw).

**Keep the scaffold minimal.** Build what's needed now; document the pattern instead of
pre-building it. That is why there is no auth interceptor yet (nothing authenticated is called),
no react-hook-form, no toast/modal/select primitives. Add each when a real screen needs it.
`src/api` has the `ENDPOINTS` → `<domain>Service` → `use<Domain>Mutations` chain for one call so
far: redeem.

## Things that will bite you

- **No `babel.config.js`, and don't add one.** `babel-preset-expo` injects
  `react-native-worklets/plugin` and the React Compiler plugin itself. Adding a config, or adding
  `react-native-reanimated/plugin` (renamed in Reanimated 4), breaks the build.
- **React Compiler is on** (`experiments.reactCompiler`). Don't add `useMemo`/`useCallback`/`memo`
  by reflex. `AlbumTile` is the single memoised component in the app — FlatList rows are where it
  pays — with a comparator over exactly the fields that change what renders.
- **No `SafeAreaProvider`.** expo-router mounts one; a second gives wrong insets. Use the `Screen`
  component or `useSafeAreaInsets`.
- **`GestureHandlerRootView` is mounted by hand** in `AppProviders` — expo-router does not add it,
  and gestures silently no-op without it.
- **`import "intl-pluralrules"` must stay the first line of `src/i18n/i18n.ts`.** Hermes has no
  `Intl.PluralRules` and i18next 26 has no fallback.
- **Tabs come from `expo-router/js-tabs`.** The `Tabs` re-export on `expo-router` is deprecated in
  SDK 57. `@react-navigation/*` is not a dependency — expo-router vendors it, so navigator option
  types come from `expo-router` / `expo-router/js-tabs`.
- **`process.env.EXPO_PUBLIC_*` is inlined by literal text substitution.** Destructuring or bracket
  access yields `undefined`. Every value ships readable in the bundle — no secrets.
- **Route types are generated** into gitignored `.expo/types`. On a fresh clone or in CI, run the
  dev server once before `npm run typecheck` or `ROUTES` won't resolve. If you move the routes
  directory, update the plugin `root` in `app.json`, delete `.expo/types`, and restart — Fast
  Refresh will not pick it up.
- **SVGs are components, not image sources** (`import Icon from "@/assets/icons/X.svg"`). That
  needs `metro.config.js` (moves `.svg` to `sourceExts`, runs `react-native-svg-transformer`) and
  `src/types/svg.d.ts` together. Metro caches transformer config hard — restart via `npm start`.
- **The camera only works on a physical device.** On a simulator expo-camera gives a black frame.
  `onBarcodeScanned` fires every frame, so `useQrScanner` holds a ref lock. Torch is `enableTorch`,
  not `flash`. `scanFromURLAsync` is a top-level export of `expo-camera` and returns `[]` rather
  than throwing. Permission strings in `app.json` are inert in Expo Go.
- **expo-video: pause in the effect body, never a cleanup.** `useVideoPlayer` releases the native
  player in its own cleanup, which runs first, so pausing from a cleanup hits a released object and
  throws. See the comment in `mediaDetail/VideoStage.tsx`. Fullscreen is
  `fullscreenOptions={{ enable: true }}` in SDK 57, not the old `allowsFullscreen` boolean.

## Current state

Flow: `/` (QR entry, outside the tabs) → `/scan` → back to `/` → `/upload` and `/album` tabs →
`/media/[id]`. `/settings` is a stack route that exists to prove the i18n layer works.

`/scan` hands the scanned code back through a one-slot module
(`screens/qrEntry/container/scannedCode.ts`) — expo-router cannot pass params on `router.back()`,
and replacing the entry route would discard the typed name.

Entry redeems the code at `POST /api/v1/access/redeem` and stores the guest token under
`STORAGE_KEYS.guestToken`; nothing sends it yet. The request/response field names are guesses
marked `TODO(swagger)`, and without a reachable `EXPO_PUBLIC_API_URL` (the repo has no `.env`)
nobody gets past `/`. This is the first slice of the backend integration; the auth header,
gallery, upload, download and join link are not started.

Stubbed, with a `TODO` at the seam: **uploading** (assets only reach `mediaStore`, never a server)
and **download** on the detail screen (needs `expo-media-library`).
Delete has no confirmation. FiraGo is referenced by `theme.fontFamily` but no font files are loaded,
so iOS falls back to the system face. Icon and splash are the DGEOBA mark on `#B40000` /
`#F3ECDF` (`red500` / `cream100`); they are native resources, so a change ships only with a build.
