# Migrate SK Components v3 → v4

Your task is to migrate this codebase from `@suankularb-components/react` v3 to
v4. Work through each phase in order. Run the build after each phase and fix any
type errors before proceeding.

The full migration guide is at:
https://sk-components-demo.mysk.school/docs/migrations/v4

---

## Phase 0 — Pre-flight

Before making any changes, verify the project is ready for v4.

### 0.1 Identify the package manager

Check which lock file exists in the project root:

```
ls package-lock.json yarn.lock pnpm-lock.yaml bun.lock bun.lockb 2>/dev/null
```

| Lock file                | Package manager | Install command |
| ------------------------ | --------------- | --------------- |
| `package-lock.json`      | npm             | `npm install`   |
| `yarn.lock`              | yarn            | `yarn add`      |
| `pnpm-lock.yaml`         | pnpm            | `pnpm add`      |
| `bun.lock` / `bun.lockb` | bun             | `bun add`       |

### 0.2 Verify the project depends on SKCom

```
grep -r "\"@suankularb-components/react\"" package.json
```

If this returns nothing, the project doesn't use SKCom — nothing to migrate.

### 0.3 Update to v4

Install the latest version using the package manager from step 0.1:

```
<manager> install @suankularb-components/react@latest
```

Run the build after upgrading to see initial type errors — these will guide the
migration.

### 0.4 Check React version

v4 requires React 18 or later. Verify the project has a compatible version:

```
grep "\"react\"" package.json
```

If the project uses React 17, upgrade to React 18 before proceeding.

---

## Phase 1 — Remove deleted props (safe, mechanical)

These props were removed entirely. Delete them wherever they appear.

### 1.1 Remove `alt` prop

**Affected components:** ChipField, DialogHeader, FormGroup, FormItem,
FullscreenDialog, ListItemContent, NavBarItem, NavDrawerSection, PageHeader,
Search, Select, Tab, TabsContainer, TextField

**Find:**

```
grep -rn " alt=" --include="*.tsx" --include="*.ts"
```

**Action:** Delete the `alt` prop from any of the affected components.

**Before:**

```tsx
<PageHeader alt="About">About</PageHeader>
<TextField alt="Name" label="Name" />
```

**After:**

```tsx
<PageHeader>About</PageHeader>
<TextField label="Name" />
```

**Exception:** `MaterialIcon` **gained** an `alt` prop — do NOT remove `alt` from MaterialIcon.

**Verify:**

```
grep -rn "\<\(ChipField\|DialogHeader\|FormGroup\|FormItem\|FullscreenDialog\|ListItemContent\|NavBarItem\|NavDrawerSection\|PageHeader\|Search\|Select\|TabsContainer\|TextField\)[^>]* alt=" --include="*.tsx"
should return nothing.
```

### 1.2 Remove `*Attr` passthrough props

**Affected components and props:**

- Card: `aAttr`, `buttonAttr`
- PageHeader: `backAttr`
- Switch: `buttonAttr`
- Header: `hAttr`
- Checkbox, Radio: `inputAttr`
- FormItem: `labelAttr`
- FormGroup: `legendAttr`
- Select: `menuAttr`
- Section: `sectionAttr`
- TableCell: `tdAttr`

**Find:**

```
grep -rn "aAttr\|buttonAttr\|backAttr\|hAttr\|inputAttr\|labelAttr\|legendAttr\|menuAttr\|sectionAttr\|tdAttr" --include="*.tsx"
```

**Action:** Delete the prop.

**Exception:** TextField's `inputAttr` was NOT removed — leave it alone.

**Verify:** Same grep should return nothing (except TextField's usage).

### 1.3 Remove `layout` and `layoutID` (Framer Motion)

**Affected components:**

- Card: `layoutID`
- InputChip: `layoutID`
- DataTable: `layout`

**Find:**

```
grep -rn "layoutID\| layout=" --include="*.tsx"
```

**Action:** Delete the prop from the SKCom component. If you need layout animations,
wrap the component in a motion element instead — see Phase 5.3.

### 1.4 Remove InputChip edit mode props

**Affected props:** `editable`, `value` (when used with editable), `onChange` (when used with editable), `onEditExit`

**Find:**

```
grep -rn "editable\|onEditExit" --include="*.tsx"
```

**Action:** Delete `editable`, `onEditExit`, and any `value`/`onChange` that only existed to support edit mode.

**Before:**

```tsx
<InputChip
  editable
  value={chipValue}
  onChange={setChipValue}
  onEditExit={handleExit}
>
  {name}
</InputChip>
```

**After:**

```tsx
<InputChip tooltip={name}>{name}</InputChip>
```

### 1.5 Remove other deleted props

**Find and delete each of these:**

- TextField: `canClear`
- NavBar: `brand`, `fab`
- NavBarItem: `badge`
- FilterChip: `onMenuToggle`
- TableCell: `menu`, `onMenuToggle`
- FAB: `stateOnScroll`
- AppDrawer: `onOpen`
- Search: `children` (suggestion dropdown removed)
- PageHeader: `title`, `brand`, `homeURL`, `icon`
- Tab: `containerID`
- Select, MaterialIcon: `element`

**Find:**

```
grep -rn "canClear\| brand=\| fab=\| badge=\|onMenuToggle\|stateOnScroll\| onOpen=\|containerID\| element=" --include="*.tsx"
# Also search for these individually (too common to grep broadly):
#   PageHeader: title, homeURL, icon
#   Search: children (look for <Search> with children prop)
#   TableCell: menu (look for menu prop on <TableCell>)
```

### 1.6 Remove Snackbar and NavDrawer state management

These components no longer accept `open`/`onClose`. Snackbar also lost `onExitComplete`.

**Find:**

```
grep -rn "\<Snackbar[^>]* open=\|\<NavDrawer[^>]* open=" --include="*.tsx"
```

**Action for Snackbar:** Delete the `<Snackbar>` JSX entirely (it mounts automatically).
Replace imperative opens with `snackbar.push()` or `snackbar.promise()`.

**Before:**

```tsx
const [open, setOpen] = useState(false);
<Snackbar open={open} onClose={() => setOpen(false)}>
  Message
</Snackbar>;
```

**After:**

```tsx
import { snackbar } from "@suankularb-components/react/helpers";
snackbar.push("Message");
```

**Action for custom `useSnackbar` hooks:** If the codebase has a custom `useSnackbar` hook or React Context for managing Snackbar state, remove it entirely. Replace all usages with the `snackbar` helper from SKCom.

**Find:**

```
grep -rn "useSnackbar\|SnackbarContext\|SnackbarProvider" --include="*.tsx" --include="*.ts"
```

**Before:**

```tsx
// contexts/snackbar.tsx
const SnackbarContext = createContext(...);
export const useSnackbar = () => useContext(SnackbarContext);
// usage:
const { setSnackbar } = useSnackbar();
setSnackbar(<Snackbar>Message</Snackbar>);
```

**After:**

```tsx
import { snackbar } from "@suankularb-components/react/helpers";
snackbar.push("Message");
```

Delete the entire Snackbar context/provider/hook file once all usages are migrated.

**Action for NavDrawer:** Remove `open`/`onClose`. Include `<NavDrawer>` as a direct child of `<RootLayout>` and use Invoker Commands to open it, if needed.

**Before:**

```tsx
<NavDrawer open={open} onClose={() => setOpen(false)}>
  ...
</NavDrawer>
```

**After:**

```tsx
<RootLayout>
  <NavBar>...</NavBar>
  <NavDrawer>...</NavDrawer>
</RootLayout>
// To open programmatically:
<Button command="show-modal" commandfor="nav-drawer">Open</Button>
```

---

## Phase 2 — Type changes

### 2.1 `value` type narrowed: `any` → `string`

**Affected:** Select, MenuItem

**Action:** If you were passing non-string values (numbers, objects) to `value`,
convert them to strings. Update `onChange` handlers accordingly.

**Before:**

```tsx
<Select value={42} onChange={(v) => setValue(Number(v))}>
```

**After:**

```tsx
<Select value="42" onChange={(v) => setValue(Number(v))}>
```

### 2.2 Update Text `type` values

**Removed types:** `"button"`, `"caption"`, `"overline"`

**Find:**

```
grep -rn '\<Text[^>]* type="button\|\<Text[^>]* type="caption\|\<Text[^>]* type="overline"' --include="*.tsx"
```

> **Note:** The pattern above scopes the search to `<Text` components. The simpler
> `type="button"` grep would also match `<button type="button">` and other
> non-Text usages. Only change the `type` prop on `<Text>` components.

**Replacements:**

- `"button"` → `"label-large"` (closest match)
- `"caption"` → `"body-small"`
- `"overline"` → `"label-small"`

### 2.3 Rename: `onBlur` → `onClose` (Menu)

**Before:**

```tsx
<Menu onBlur={() => setOpen(false)}>
```

**After:**

```tsx
<Menu onClose={() => setOpen(false)}>
```

### 2.4 Rename: `showRightOnMobile` → `prefer` (SplitLayout)

**Before:**

```tsx
<SplitLayout showRightOnMobile>
```

**After:**

```tsx
<SplitLayout prefer="both">
```

Options: `"left"`, `"right"`, `"both"`.

### 2.5 `NavBar.onNavToggle` is now optional

**Action:** You can remove the `onNavToggle` prop unless you need the callback.
Its type changed from `() => any` (required) to `() => void` (optional).

### 2.6 Migrate TextField `inputAttr.type` to `type`

In v3, you set the native input type via `inputAttr={{ type: "email" }}`.
In v4, TextField has a direct `type` prop.

**Find:**

```
grep -rn "inputAttr.*type" --include="*.tsx"
```

**Before:**

```tsx
<TextField label="Email" inputAttr={{ type: "email" }} />
```

**After:**

```tsx
<TextField label="Email" type="email" />
```

### 2.7 Select `onChange` type change

Select's `onChange` is now generic: `(value: Value) => any` where `Value extends string`.

**Before:**

```tsx
<Select value={value} onChange={(v) => setValue(v)}>
```

**After:**

```tsx
<Select value={value} onChange={(v: string) => setValue(v)}>
```

### 2.8 Radio: `value`, `checked`, and `onChange` changes

In v3, `value` was a boolean for the toggle state. In v4, `value` is a string
(the submitted value, like `<input type="radio">`) and a new `checked` prop
takes over the boolean toggle role. `onChange` now passes the string `value`
instead of a boolean.

**Find:**

```
grep -rn "\<Radio[^>]* value=" --include="*.tsx"
```

**Before:**

```tsx
<Radio value={selected} onChange={(v: boolean) => setSelected(v)} />
```

**After:**

```tsx
<Radio value="option-id" checked={selected} onChange={(v: string) => setSelected(v)} />
```

> **Note for native form submission:** v4 form controls (Checkbox, Radio,
> Select, Switch, TextField) gained `name` props for native `<form>` submission
> via `FormData`. If the project uses a form library or manual state, no changes
> are needed — `name` is optional. If the project uses native `<form>`
> submission, notify the user that they can adopt the `name` prop, but do NOT
> auto-migrate — form wiring is too project-specific for mechanical changes.

### 2.9 Other type narrowings

These components had their `children` or other props narrowed. Run the build
and fix any resulting type errors:

- **ChipField**: `children` narrowed to `ReactElement<typeof ChipSet>`
- **FormItem**: `children` narrowed to `ReactElement<typeof Checkbox | typeof Radio | typeof Switch>`
- **NavBar**: `end` widened from `JSX.Element` to `ReactNode` (more permissive)
- **PageHeader**: `appDrawer` narrowed to `ReactElement<typeof AppDrawer>`
- **DataTableBody**: `rowActions` type changed
- **TableRow**: `actions` narrowed to `ReactElement<typeof SegmentedButton>`

---

## Phase 3 — CSS variable renames

SKCom's CSS variables were renamed in v4 to align with Tailwind CSS v4's theme
variable conventions. If your project references these variables in custom CSS or
Tailwind config, update them.

### 3.1 Detect CSS variable usage

```
grep -rn "var(--font-\|var(--rounded-\|var(--motion-\|var(--easing-\|var(--primary\|var(--on-primary\|var(--secondary\|var(--on-secondary\|var(--tertiary\|var(--on-tertiary\|var(--error\|var(--on-error\|var(--background\|var(--on-background\|var(--surface\|var(--on-surface" --include="*.css" --include="*.scss" --include="*.tsx" --include="*.ts" --include="*.js"
```

Also check Tailwind config files for references to the old names:

```
grep -rn "font-\|rounded-\|motion-\|easing-\|--primary\|--on-primary" tailwind.config.* 2>/dev/null
```

### 3.2 Apply renames

| v3 | v4 |
| --- | --- |
| `--font-*` (weight only) | `--font-weight-*` |
| `--rounded-*` | `--radius-*` |
| `--motion-*` | `--duration-*` |
| `--easing-*` | `--ease-*` |
| `--primary` | `--color-primary` |
| `--on-primary` | `--color-on-primary` |
| `--primary-container` | `--color-primary-container` |
| `--on-primary-container` | `--color-on-primary-container` |
| `--secondary` | `--color-secondary` |
| `--on-secondary` | `--color-on-secondary` |
| `--secondary-container` | `--color-secondary-container` |
| `--on-secondary-container` | `--color-on-secondary-container` |
| `--tertiary` | `--color-tertiary` |
| `--on-tertiary` | `--color-on-tertiary` |
| `--tertiary-container` | `--color-tertiary-container` |
| `--on-tertiary-container` | `--color-on-tertiary-container` |
| `--error` | `--color-error` |
| `--on-error` | `--color-on-error` |
| `--error-container` | `--color-error-container` |
| `--on-error-container` | `--color-on-error-container` |
| `--background` | `--color-background` |
| `--on-background` | `--color-on-background` |
| `--surface` | `--color-surface` |
| `--on-surface` | `--color-on-surface` |
| `--surface-variant` | `--color-surface-variant` |
| `--on-surface-variant` | `--color-on-surface-variant` |
| `--outline` | `--color-outline` |
| `--outline-variant` | `--color-outline-variant` |
| (plus all tonal-palette and fixed/surface-dim variants) |

The full mapping is at:
https://sk-components-demo.mysk.school/docs/guides/theming

---

## Phase 4 — Behavioral changes (Invoker Commands API)

### 4.1 ThemeProvider is no longer a wrapper

**Action:** Remove the `<ThemeProvider>` wrapper from around your app. Just include `<ThemeProvider />` once anywhere in the tree.

**Before:**

```tsx
<ThemeProvider>
  <App />
</ThemeProvider>
```

**After:**

```tsx
<ThemeProvider />
<App />
```

### 4.2 Convert Dialog and FullscreenDialog to uncontrolled mode

**Before:**

```tsx
const [open, setOpen] = useState(false);
<Button onClick={() => setOpen(true)}>Open</Button>
<Dialog open={open} onClose={() => setOpen(false)}>...</Dialog>
```

**After (preferred — uncontrolled):**

```tsx
<Button command="show-modal" commandfor="my-dialog">Open</Button>
<Dialog id="my-dialog">...</Dialog>
```

**Controlled mode still works** if you need it — just keep `open`/`onClose`.

### 4.3 Convert Menu to Anchor + uncontrolled mode

**Before:**

```tsx
const [open, setOpen] = useState(false);
<div style={{ position: "relative" }}>
  <Button onClick={() => setOpen(true)}>Open</Button>
  <Menu open={open} onBlur={() => setOpen(false)}>
    ...
  </Menu>
</div>;
```

**After:**

```tsx
<Anchor>
  <Button command="show-popover" commandfor="my-menu">
    Open
  </Button>
  <Menu id="my-menu">...</Menu>
</Anchor>
```

### 4.4 Move FAB from NavBar to RootLayout

**Before:**

```tsx
<NavBar fab={<FAB icon={<MaterialIcon icon="add" />} />}>...</NavBar>
```

**After:**

```tsx
<RootLayout>
  <NavBar>...</NavBar>
  <FAB icon={<MaterialIcon icon="add" />} />
</RootLayout>
```

### 4.5 Interactive component changes

**Removed:** `attr` prop, no longer generic (`Interactive<HTMLAnchorElement>`)

**Before:**

```tsx
<Interactive<HTMLAnchorElement> attr={{ target: "_blank" }} href="/page">
```

**After:**

```tsx
<Interactive href="/page" target="_blank">
```

---

## Phase 5 — Framer Motion replacement

SKCom no longer wraps or re-exports framer-motion.

### 5.1 `useRipple()` → Interactive

**Before:**

In v3, consumers who needed a ripple effect on custom elements had to wire up
`useRipple()` manually — managing a ref, spreading listeners, and rendering a
`<motion.span>` for the ripple visual:

```tsx
import { useRipple } from "@suankularb-components/react";
import { motion } from "framer-motion";

const buttonRef = useRef(null);
const { rippleListeners, rippleControls, rippleStyle } = useRipple(buttonRef);

<button ref={buttonRef} {...rippleListeners}>
  Click me
  <motion.span
    aria-hidden
    initial={{ scale: 0, opacity: 0.36 }}
    animate={rippleControls}
    className="skc-interactive__ripple"
    style={rippleStyle}
  />
</button>;
```

**After:**

```tsx
<Interactive>Click me</Interactive>
```

### 5.2 Removed exports

These SKCom exports are gone. If you need them, copy the code below:

- `DURATION`, `EASING` — animation constants
- `transition()` helper
- `useAnimationConfig()` — use motion's `animate` directly
- `useBreakpoint()` — implement yourself if needed

**Replacement for `DURATION` and `EASING`:**

```ts
import type { BezierDefinition } from "motion";

export const DURATION = {
  short1: 0.05,
  short2: 0.1,
  short3: 0.15,
  short4: 0.2,
  medium1: 0.25,
  medium2: 0.3,
  medium3: 0.35,
  medium4: 0.4,
  long1: 0.45,
  long2: 0.5,
  long3: 0.55,
  long4: 0.6,
  extraLong1: 0.7,
  extraLong2: 0.8,
  extraLong3: 0.9,
  extraLong4: 1,
};

export const EASING = {
  linear: [0, 0, 1, 1] as BezierDefinition,
  standard: [0.2, 0, 0, 1] as BezierDefinition,
  standardAccelerate: [0.3, 0, 1, 1] as BezierDefinition,
  standardDecelerate: [0, 0, 0, 1] as BezierDefinition,
  emphasized: [0.2, 0, 0, 1] as BezierDefinition,
  emphasizedAccelerate: [0.3, 0, 0.8, 0.15] as BezierDefinition,
  emphasizedDecelerate: [0.05, 0.7, 0.1, 1] as BezierDefinition,
};
```

**Replacement for `transition()` helper:**

```ts
import type { Tween } from "motion";
export function transition(
  duration: Tween["duration"],
  easing: Tween["ease"],
): Tween {
  return { type: "tween", duration, ease: easing };
}
```

**Breakpoints for custom `useBreakpoint()`:**

```ts
{ sm: 600, md: 905, lg: 1440 }
```

### 5.3 `layoutID` → wrap in `<motion.div>`

The `layoutID` prop was removed from Card and InputChip. To keep layout
animations, lift the `layoutId` to a motion wrapper around the component.

**Before:**

```tsx
<Card layoutID={item.id}>{item.name}</Card>
```

**After:**

```tsx
import { motion } from "motion";
<motion.div layoutId={item.id}>
  <Card>{item.name}</Card>
</motion.div>;
```

This also works for lists — wrap each item in a motion element with a unique
`layoutId`:

```tsx
{
  items.map((item) => (
    <motion.div key={item.id} layoutId={item.id}>
      <Card>{item.name}</Card>
    </motion.div>
  ));
}
```

---

## Phase 6 — New props (optional additions)

These are new capabilities you may want to use:

- **All actionable components** (Button, Card, MenuItem, ListItem, FAB, Tab,
  NavBarItem, InputChip, AppDrawerItem, AssistChip, NavDrawerItem,
  SuggestionChip) gained `command` and `commandfor` for Invoker Commands
- **Button**: `autoFocus`, `type` (`"submit" | "reset" | "button"`, defaults to `"button"`)
- **InputChip**: `tooltip`, `deleteCommand`, `deleteCommandfor`, `locale`
- **Snackbar**: `persistent`, `autoDismissDurationMs`
- **TextField**: `type` (now supports `"color"`, `"date"`, `"datetime-local"`, `"email"`, `"file"`, `"month"`, `"number"`, `"password"`, `"search"`, `"tel"`, `"text"`, `"time"`, `"url"`, `"week"`)
- **Search**: `hotkey` (keyboard shortcut to focus)
- **Dialog, FullscreenDialog, Menu, Snackbar, SideSheet**: `id` for Invoker Commands (auto-generated if omitted)
- **FullscreenDialog**: `locale` (`"en-US"` | `"th"`)
- **SideSheet**: `attach` (`"left"` | `"right"`, defaults to `"right"`)
- **Menu**: `anchor` (CSS anchor name, auto-resolved from `<Anchor>` context)
- **DataTableBody, DataTableHead**: `align`
- **DataTableHead**: `colSpans`
- **TableCell**: `colSpan`, `rowSpan`
- **ChipField**: `required`, `onNewEntries` (receives all values when pasting or pressing a separator key; replaces singular `onNewEntry`)
- **ContentLayout**: `id`
- **Checkbox, FormGroup, FormItem, Radio, Select, Switch, TextField**: `name` for form submission
- **Radio**: `checked` (replaces the old boolean `value` for toggle state)
- **ListItem**: `containerElement`
- **MaterialIcon**: `alt` (accessibility label), `directional` (flips icon horizontally in RTL)
- **SplitLayout**: `prefer`
- **Interactive, Button**: `command`, `commandfor`
- **MenuItem**: `containerElement`, `dangerous`
- **Text**: `id` (HTML id attribute)

---

## Phase 7 — Tailwind CSS v4 compatibility (optional)

These steps are NOT required for SKCom to work. Run them only if the project uses
Tailwind CSS v4.

### 7.1 Detect Tailwind v4

Check if the project uses Tailwind v4:

```
grep -r "\"tailwindcss\"" package.json
grep -r "@import.*tailwindcss" --include="*.css"
```

If both return results, the project uses Tailwind v4. If it uses Tailwind v3
(`tailwind.config.*` file), skip step 7.3 (layers) but continue with step 7.2
(variable renames) — Tailwind v3 config files also reference SKCom CSS variables.

### 7.2 Update CSS variable references in Tailwind config (v3 only)

Phase 3 already covers `*.css` files (including Tailwind v4 `@theme` blocks).
For Tailwind v3 projects, also search `tailwind.config.*` files for references
to the old CSS variable names:

```
grep -rn "var(--font-\|var(--rounded-\|var(--motion-\|var(--easing-\|var(--" tailwind.config.* 2>/dev/null
```

Apply the same renames as Phase 3.2 — the variable names are identical whether
they appear in custom CSS or a Tailwind config translation layer.

### 7.3 Add `skc` layer (Tailwind v4 only)

In the CSS file that contains `@import "tailwindcss"`, add an `@layer` directive
before the import to place SKCom styles correctly in the cascade:

```
grep -rn '@import "tailwindcss"' --include="*.css"
```

**Before:**

```css
@import "tailwindcss";
```

**After:**

```css
@layer theme, base, skc, components, utilities;
@import "tailwindcss";
```

### 7.4 Theme variables and state layer (inform the user)

Two more setup steps are available at:
https://sk-components-demo.mysk.school/docs/integrations/tailwindcss-v4

These let you use Tailwind utility classes with SKCom design tokens (e.g.,
`bg-primary`, `text-on-surface`). Ask the user if they want these applied —
they involve adding a large `@theme inline` block and a `@utility` directive,
which are project-specific decisions.

---

## Phase 8 — Next.js App Router (if applicable)

These steps are only needed if the project uses Next.js with the App Router.

### 8.1 Detect Next.js

```
grep -r "\"next\"" package.json
```

If this returns nothing, skip this phase.

### 8.2 Set up Root Layout

Create or update `app/layout.tsx` with `<ThemeProvider />` and `<RootLayout>`:

```tsx
// app/layout.tsx
import {
  RootLayout as SKCRootLayout,
  ThemeProvider,
} from "@suankularb-components/react";
import type { ReactNode } from "react";

const RootLayout = ({ children }: { children: ReactNode }) => (
  <html lang="en">
    <body>
      <ThemeProvider />
      <SKCRootLayout>{children}</SKCRootLayout>
    </body>
  </html>
);

export default RootLayout;
```

Import the Navigation Bar and Navigation Drawer into the layout:

```tsx
import NavBar from "@/components/NavBar";
import NavDrawer from "@/components/NavDrawer";

<SKCRootLayout>
  <NavBar />
  <NavDrawer />
  {children}
</SKCRootLayout>
```

### 8.3 Client Component awareness

Some SKCom components are now Client Components (marked `"use client"`). If you
pass a non-serializable prop (like `next/link`) to a SKCom component, mark the
parent as a Client Component with `"use client"`.

In v3, consumers had to re-export SKCom components from a `"use client"` wrapper
file to use them in the App Router. In v4, this is no longer needed — the
components that require it already carry the directive. Remove those wrapper
files and update imports to pull from `@suankularb-components/react` directly.

**Find:**

```
grep -rn "use client" --include="*.tsx" | grep -v node_modules | grep -v ".next"
```

**Action:** If a file only re-exports SKCom components (e.g.
`export { Button } from "@suankularb-components/react"`), delete the file and
update all imports that referenced it to import from
`@suankularb-components/react` directly.

### 8.4 Use `element` for Next.js Link

Many interactive components accept an `element` prop. Use it with `next/link`
instead of wrapping:

```tsx
import Link from "next/link";

<Button href="/about" element={Link}>About</Button>
<NavBarItem icon={<MaterialIcon icon="home" />} label="Home" href="/" element={Link} />
```

### 8.5 Fonts (opportunistic)

If the project doesn't use `next/font` yet, consider loading the required fonts.
SKCom uses Inter and Space Grotesk for English, IBM Plex Sans Thai and Sarabun
for Thai, plus the Material Symbols icon font.

See the full setup at:
https://sk-components-demo.mysk.school/docs/integrations/nextjs-app

---

## After migration

1. Run `npm run build` (or `tsc --noEmit`) and fix remaining type errors
2. Run your test suite
3. Visually test modals and navigation
4. Check the migration guide for details on any component not covered here:
   https://sk-components-demo.mysk.school/docs/migrations/v4
