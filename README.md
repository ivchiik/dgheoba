# dgheoba

დღეობა — event photo sharing. Expo SDK 57, managed workflow, iOS/Android only (no web),
expo-router, TypeScript strict.

```bash
npm install
cp .env.example .env
npm run ios      # or: npm run android
```

## Scripts

| Script              | What it does                               |
| ------------------- | ------------------------------------------ |
| `npm start`         | Dev server, cache reset                    |
| `npm run ios`       | Dev server + iOS simulator                 |
| `npm run android`   | Dev server + Android emulator              |
| `npm run lint`      | ESLint (flat config, Expo + Prettier)      |
| `npm run format`    | Prettier over the repo                     |
| `npm run typecheck` | `tsc` — `expo lint` does **not** typecheck |
| `npm run clean`     | Nuke `node_modules` and reinstall          |

`husky` + `lint-staged` run `eslint --fix` then `prettier --write` on staged files.

## Layout

```
src/
  navigation/   everything routing
    app/        expo-router routes — one line each, mapping a URL to a screen
    routes.ts   ROUTES registry
    screenOptions.ts
  screens/      one folder per screen: ScreenName.tsx + Name.styles.ts + container/useName.ts
  components/   App*-prefixed primitives, one folder each, flat barrel
  theme/        colour tokens + useTheme
  i18n/         i18next bootstrap + locales
  api/          axios client + query client
  storage/      never-throw KV wrapper
  hooks/        cross-cutting hooks
  types/        module augmentations (i18next typed keys)
```

### Conventions

- **Container/presenter.** Every screen's logic lives in `container/use<Name>.ts` and returns
  one flat object of state + handlers. The `.tsx` stays near-pure JSX.
- **Styles.** `_styles = (theme) => StyleSheet.create({...})` in `Name.styles.ts`, consumed as
  `const { styles, theme } = useTheme(_styles)`. `useTheme()` with no argument returns just
  the theme, for dynamic values like icon colours. Styles never hardcode a hex — always
  `theme.color.x`.
- **No theme provider.** There is one static light theme (the designs have no dark variant and
  no appearance switcher), so `useTheme` reads a module constant. It keeps the hook name so
  call sites don't change if a second theme ever arrives.
- **Barrels.** One named-export barrel per layer, with a trailing `// types` section. Import
  across layers through the barrel (`@/components`), not deep paths.
- **Text and i18n.** `AppText` owns text policy — theme font, ink colour, no font scaling —
  and treats a string child as a translation key, so screens write
  `<AppText>home.title</AppText>`. Already-resolved values (names, amounts) get translated at
  the call site instead. Sizes and weights come from the caller's own style, not a variant
  prop. `en.ts` is the source of truth — other locales are typed against it, so a missing key
  is a compile error.
- **Routes.** `ROUTES` in `src/navigation/routes.ts` is `satisfies Record<string, Href>`, so a
  path that doesn't exist in `src/app/` fails to compile. Nothing passes a literal to
  `router.push`.
- **Language.** Defaults to Georgian. The device locale is deliberately **not** consulted —
  only a previously saved choice overrides the default.

## Assets

Everything static lives in `assets/` at the project root (not `src/`), reachable as
`@/assets/*`:

```
assets/
  icons/        .svg — imported as React components
  images/       .png/.jpg — app icon, splash, adaptive icons
  fonts/        .ttf/.otf (not created yet)
```

SVGs are imported as components, not as image sources:

```tsx
import QRScanner from "@/assets/icons/QRScanner.svg";

<QRScanner width={64} height={64} color={theme.color.textPrimary} />;
```

That needs two pieces working together, so if an SVG import ever breaks, check both:
`metro.config.js` moves `.svg` from `assetExts` to `sourceExts` and runs it through
`react-native-svg-transformer`, and `src/types/svg.d.ts` declares the module for TypeScript.
Metro caches transformer config aggressively — restart with `npm start` (which already passes
`--reset-cache`) after touching `metro.config.js`.

Raster images keep the normal `require()` form, and `@2x`/`@3x` variants are picked up
automatically.

## Colour tokens

`src/theme/colors.ts` holds a `palette` of ramp steps, spread into purpose tokens on top.
Values come from the Figma file: `ink`, `muted`, `subtle`, `ink-inverse` and `dark/canvas` are
bound variables; the cream canvas, warm hairline and crimson were sampled from the rendered
frames because they are raw fills.

Only steps that actually appear in the design exist — there is no filler between them. Add a
step when a screen needs it.

No breakpoints: every frame in the Figma `UI DESIGN` page is 393×852, so there is nothing to
branch on yet.

## Things that will bite you

- **No `babel.config.js`.** `babel-preset-expo` injects `react-native-worklets/plugin` and the
  React Compiler plugin itself. Adding one, or adding `react-native-reanimated/plugin`
  (renamed in Reanimated 4), breaks the build.
- **No `SafeAreaProvider`.** expo-router mounts one; a second gives wrong insets. Use the
  `Screen` component or `useSafeAreaInsets`.
- **`GestureHandlerRootView` is mounted by hand** in `AppProviders` — expo-router does not add
  it, and gestures silently no-op without it.
- **`import "intl-pluralrules"` must stay the first line of `src/i18n/i18n.ts`.** Hermes has no
  `Intl.PluralRules` and i18next 26 has no fallback.
- **Tabs come from `expo-router/js-tabs`.** The `Tabs` re-export on `expo-router` is deprecated
  in SDK 57. `@react-navigation/*` is not a dependency — expo-router vendors it, so navigator
  option types come from `expo-router` / `expo-router/js-tabs`.
- **`process.env.EXPO_PUBLIC_*` is inlined by literal text substitution.** Destructuring or
  bracket access yields `undefined`. Every value is readable in the shipped bundle — no
  secrets.
- **Route types are generated**, into gitignored `.expo/types`. On a fresh clone or in CI, run
  the dev server once before `npm run typecheck`, or `ROUTES` won't resolve.
- **The routes directory is not auto-detected.** expo-router looks for `./app` or `./src/app`;
  ours lives at `src/navigation/app`, set via the `root` prop on the `expo-router` plugin in
  `app.json` (it lands in `extra.router.root`). If you move it again, update that prop, delete
  `.expo/types`, and restart the dev server — Fast Refresh will not pick it up.

## Known gaps

- **Nothing is actually uploaded.** The dropzone on `/upload` opens the system gallery and
  collects the chosen assets, but there is no API to send them to, so they only live in
  `src/store/mediaStore.ts` for the session. `container/useUpload.ts` marks where the upload
  call goes. The list resets on reload, and the design's counter label says "photos" while
  videos can also be picked.

- **No video thumbnails in the album grid.** Videos show a play glyph instead of a still
  frame. Both routes to a real thumbnail have a cost: `expo-video-thumbnails` gives a plain
  cacheable file URI but is deprecated, while `player.generateThumbnailsAsync` is the
  supported path yet returns a native ref that only `expo-image` can render, needs a
  throwaway player per video, and cannot be cached across launches.

- **Download on `/media/[id]` is a stub.** Saving to the photo library needs
  `expo-media-library`, and every item currently in the store already came from this device.

- **Delete has no confirmation.** It removes and navigates back immediately.

- **FiraGo is not loaded.** `theme.fontFamily` is `"FiraGo-Regular"`, but there are no font
  files and no `useFonts()` call — iOS silently falls back to the system face. Drop the
  `.ttf`s into `assets/fonts/`, then load them in `src/app/_layout.tsx` and gate on
  `loaded || error` (on `error` too, or a failed font blanks the app forever).
- **Georgian type has no weight axis** — pick a family (`FiraGo-Bold`) rather than setting
  `fontWeight`. That is why the theme carries no weight scale.

## Not included

Deliberately left out until there's a reason:

- **Zustand.** Add it when there's cross-cutting UI state that isn't server state.
- **Auth interceptor / token refresh.** The guest token from redeem is stored but not yet sent;
  the `Authorization` interceptor lands with the first authenticated query. The token lives in
  kv-store, not `expo-secure-store`: it is event-scoped, expires within 12 h, and anyone holding
  the code (stored beside it) can mint another, so secure storage would protect nothing.
- **Query hooks.** `ENDPOINTS` registry → `<domain>Service` method → `use<Domain>Mutations` hook
  → barrel export is in use for redeem; queries follow the same chain via `use<Domain>Queries`.
- **Forms.** `AppInput` is standalone. Wiring `react-hook-form` means adding `name`/`rules`
  props and a `Controller` inside it.
- **Toasts, modals, selects.** No `AppToast` / `AppModal` / `AppSelect` yet.
- **Tests.** No test setup.

## Screens

`/` is the QR entry screen (design 01), outside the tabs. `ალბომში შესვლა` navigates to
`/home`. The `home` and `settings` tabs are still placeholders — `settings` exists to prove
the i18n layer is wired and can go once real screens land.

`/scan` is the QR scanner, pushed on top of the entry screen so the typed name survives.
It hands the scanned code back through a one-slot module in
`screens/qrEntry/container/scannedCode.ts` — expo-router cannot pass params on `router.back()`,
and replacing the entry route would discard the name.

**The camera only works on a physical device.** expo-camera is documented as
"Android (device only), iOS (device only)", so on a simulator you get the permission screen or
a black frame. Test scanning through Expo Go on a real phone.

Other notes on the scanner:

- `onBarcodeScanned` fires on every frame the code is visible, so the container holds a `ref`
  lock and ignores everything after the first hit.
- Torch is `enableTorch` (a boolean). `flash` is for still capture and will not light a scan.
- `scanFromURLAsync` is a top-level export of `expo-camera`, not a static on `CameraView`. It
  returns an empty array rather than throwing when nothing is found, and on Android the QR
  must fill most of the image.
- The gallery picker needs **no** permission request in SDK 57 — the system picker runs
  out-of-process.
- Permission strings in `app.json` are inert in Expo Go; it shows Expo Go's own copy. They
  only take effect in a dev/production build.

Entry screen gaps: the redeem field names are guesses (`TODO(swagger)`), and the format check in
`utils/parseAccessCode.ts` is deliberately loose until the backend confirms the code's alphabet
and length. The wordmark is styled text, not the real logo asset.
