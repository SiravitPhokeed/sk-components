# Docs clarity pass — remaining items

Branch: `docs/4.0.0/clarity-and-consistency`

## Applied (committed)

- [x] **Phase 1 — Bug fixes**: Header children, Filter Chip copy-paste, Checkbox
      broken link, List false limit
- [x] **Phase 2 — Clarity**: Terse openings (13 files), jargon fixes, wordiness,
      contradiction fixes
- [x] **Phase 3 — Consistency**: TanStack casing, state layer, elevation warnings,
      locale tone, Nav Bar naming, Root Layout children, Split Layout ratio
- [x] **Shared props guide**: New page + PropsTable + commandfor casing + link
      from all 71 component pages

---

## Guides section (not yet started)

### getting-started

- [x] Dense opening paragraph — complete rewrite
- [x] v4 callout moved to top-of-page banner (Pattern 1)
- [x] Next.js/Tailwind redirect moved near top, right after library list
- [x] Usage bullet list restructured with sub-headings
- [x] Peer dependency explanation expanded
- [x] Opening now highlights M3 foundation + React, mentions Suankularb
      secondarily, emphasizes checking M3 docs/style guide, notes
      per-component Material links

### localization

- [x] 7 repetitive disclosure cards consolidated into a reference table
- [x] Thai text in live example now explained with caption
- [x] Version changes — skipped, too pedantic for practical use
- [x] "keep this page open" tip rephrased to be more encouraging
- [x] Added react-intl and LinguiJS to library table

### theming

- [x] 302-line CSS dump collapsed into a disclosure card
- [x] Custom theme effort now honestly explained with Theme Builder caveats
- [x] Suankularb school linked for context
- [x] `StyleableFC` replaced with plain language
- [x] v4 version note now links to the migration guide for the full mapping

### modals

- [x] Snackbar exclusion note comes too early, confuses overview
- [x] Invoker Commands API named but not explained in friendly terms
- [x] "Notice how" callout placed after code instead of integrated
- [x] "Learn about how to" → "Learn how to"

### disabling-elements

- [x] "Learn when to make" → "Learn how to make"
- [x] Caption doesn't explicitly state which side is the recommendation
- [x] `ActionableProps` type name used without link to shared-props guide

### nextjs-app

- [x] FAB code example assumes Root Layout context — add note
- [x] Icon font download instructions in bold read like a warning
- [x] `ElementCustomizableProps` type name used without link

### nextjs-pages

- [x] `_app.tsx` not explained for readers unfamiliar with Pages Router
- [x] Layout section has redundancy between prose and code comments
- [x] `ElementCustomizableProps` type name used without link

### tailwindcss-v3

- [x] "If you are still using" frames v3 as outdated
- [x] 230-line config block with minimal structural explanation
- [x] Upgrade-to-v4 prompt takes real estate on v3 page

### tailwindcss-v4

- [x] 230-line config block with minimal structural explanation
- [x] `@theme inline` tip explains what but not why
- [x] `@utility` directive assumes reader knows Tailwind v4 API

---

## Repetitive boilerplate (cross-cutting)

- [x] "This function triggers when the user…" — identical in 7+ files
- [x] "Learn when to disable something" link text — dry, identical in 5+ files
- [x] "You are encouraged to use Material Icon" — overused in 5+ files

---

## Smaller one-offs

### inputs/

- [x] Chip Field: overly long 30-line usage example — justified complexity, keeping
- [x] Chip Field: "The behavior expected to be implemented by the developer" — too formal
- [x] Form Group: "element of the underlying `<legend>` element" — circular
- [x] Segmented Button: "2-5 Buttons" — too terse
- [x] Switch: "Thumb" capitalized unnecessarily
- [x] Text Field: email alignment example confusing
- [x] Toggle Button: "Just in case" too casual
- [x] Toggle Button: "Like unmuting" as dangerous action example
- [x] Actions: "Actions contains Buttons" → "Actions contain Buttons"
- [x] Select: "Separate different appearances by region" unexplained

### layout/

- [x] Nav Bar: "Navigation Bar/Rail" awkward slash phrasing
- [x] Nav Bar Item: "Navigation Bar/Rail" references (was Nav Bar Item, not Nav Bar)
- [x] Nav Drawer Item: "Should be a child" → "Always place inside" (was Nav Drawer Item, not Nav Drawer)
- [x] Nav Drawer: `children` description repetitive
- [x] Theme Provider: valuable info hidden in version changelog — already fine, main description covers it
- [x] Tab: missing DemoCard — deferred, feature addition not clarity fix

### data/

- [x] Data Table: "colSpans" note buried after 100-line code example
- [x] Data Table: humorous sample data — KEEP (user: target demo is 13-18 year olds)
- [x] List: "Uses Columns under the hood" — explained inline now but could be better

### overlays/

- [x] Menu: "Menus display a list of choices on temporary surfaces" — jargon

---

## Information hierarchy (cross-cutting)

- [x] 4 components have no Usage section — deferred, feature addition not clarity fix
- [x] Usage section depth varies wildly — observation, not actionable in this pass
- [x] Shared types linking in guides prose — already linked in all guide pages

---

## Sync pending

- [ ] Sync doc improvements to CSS files (`packages/css/src/`)
- [ ] Sync doc improvements to React source JSDoc (`packages/react/src/`)
- [ ] Regenerate dist files

---

## Deferred / needs user decision

- [x] Data Table sample data humor — keep (user confirmed)
- [x] Redundant `required` info — keep as-is (user confirmed)
- [x] Behaviour vs behavior — use American English, added to CONTRIBUTING.md
- [x] `_app.tsx` → `layout.tsx` — fixed in nextjs-app, reviewed
