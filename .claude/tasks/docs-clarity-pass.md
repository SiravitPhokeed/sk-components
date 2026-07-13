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

- [ ] 302-line CSS dump → collapse into a disclosure card
- [ ] "create a CSS file with the same variables" understates effort
- [ ] Suankularb school colors link assumes reader knows the school
- [ ] `StyleableFC` used instead of simpler explanation
- [ ] v4 version change note vague about old variable names

### modals

- [ ] Snackbar exclusion note comes too early, confuses overview
- [ ] Invoker Commands API named but not explained in friendly terms
- [ ] "Notice how" callout placed after code instead of integrated
- [ ] "Learn about how to" → "Learn how to"

### disabling-elements

- [ ] "Learn when to make" → "Learn how to make"
- [ ] Caption doesn't explicitly state which side is the recommendation
- [ ] `ActionableProps` type name used without link to shared-props guide

### nextjs-app

- [ ] FAB code example assumes Root Layout context — add note
- [ ] Icon font download instructions in bold read like a warning
- [ ] `ElementCustomizableProps` type name used without link

### nextjs-pages

- [ ] `_app.tsx` not explained for readers unfamiliar with Pages Router
- [ ] Layout section has redundancy between prose and code comments
- [ ] `ElementCustomizableProps` type name used without link

### tailwindcss-v3

- [ ] "If you are still using" frames v3 as outdated
- [ ] 230-line config block with minimal structural explanation
- [ ] Upgrade-to-v4 prompt takes real estate on v3 page

### tailwindcss-v4

- [ ] 230-line config block with minimal structural explanation
- [ ] `@theme inline` tip explains what but not why
- [ ] `@utility` directive assumes reader knows Tailwind v4 API

---

## Repetitive boilerplate (cross-cutting)

- [ ] "This function triggers when the user…" — identical in 7+ files
- [ ] "Learn when to disable something" link text — dry, identical in 5+ files
- [ ] "You are encouraged to use Material Icon" — overused in 5+ files

---

## Smaller one-offs

### inputs/

- [ ] Chip Field: overly long 30-line usage example
- [ ] Chip Field: "The behavior expected to be implemented by the developer" — too formal
- [ ] Form Group: "element of the underlying `<legend>` element" — circular
- [ ] Segmented Button: "2-5 Buttons" — too terse
- [ ] Switch: "Thumb" capitalized unnecessarily
- [ ] Text Field: email alignment example confusing
- [ ] Toggle Button: "Just in case" too casual
- [ ] Toggle Button: "Like unmuting" as dangerous action example
- [ ] Actions: "Actions contains Buttons" → "Actions contain Buttons"
- [ ] Select: "Separate different appearances by region" unexplained

### layout/

- [ ] Nav Bar: "Navigation Bar/Rail" awkward slash phrasing
- [ ] Nav Bar Item: "for, for instance" awkward
- [ ] Nav Drawer: "Should be a child" → "Always place inside"
- [ ] Nav Drawer: `children` description repetitive
- [ ] Theme Provider: valuable info hidden in version changelog
- [ ] Tab: missing DemoCard (every other component has one)

### data/

- [ ] Data Table: "colSpans" note buried after 100-line code example
- [ ] Data Table: humorous sample data ("Clean the entity", "Mow cats")
- [ ] List: "Uses Columns under the hood" — explained inline now but could be better

### overlays/

- [ ] Menu: "Menus display a list of choices on temporary surfaces" — jargon

---

## Information hierarchy (cross-cutting)

- [ ] 4 components have no Usage section: Segmented Button, Text Field, Toggle
      Button, Select
- [ ] Usage section depth varies wildly (Button has 4 guidelines + live examples,
      Chip Field has full stateful example, some have nothing)
- [ ] Shared types (`StyleableProps` etc.) now link to shared-props guide but in
      guides prose, the type names are still bare (nextjs-app, nextjs-pages,
      theming, disabling-elements)

---

## Sync pending

- [ ] Sync doc improvements to CSS files (`packages/css/src/`)
- [ ] Sync doc improvements to React source JSDoc (`packages/react/src/`)
- [ ] Regenerate dist files

---

## Deferred / needs user decision

- [ ] Data Table sample data humor — keep or replace?
- [ ] Redundant `required` info (attribute + bullet say same thing) — scope too large
- [ ] Behaviour vs behavior inconsistency across directories — British vs American
- [ ] `_app.tsx` → `layout.tsx` was fixed in nextjs-app but needs review
