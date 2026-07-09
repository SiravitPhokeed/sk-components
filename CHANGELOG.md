# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
From v3.3.0 onwards, this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Changes to the demo app are documented in
[apps/demo/CHANGELOG.md](apps/demo/CHANGELOG.md).

## [Unreleased]

## [3.3.2] - 2024-04-30

### Changed

- Revised color palette

### Fixed

- Button width stability while in loading state

## [3.3.1] - 2024-04-21

### Added

- Contrast mode adaptations for components

### Fixed

- Button losing its width while loading
- Selected Nav Bar Item label color
- Selected Menu Item background not being applied
- Contrast palettes not applied in some cases
- Chip trailing Button color
- `FixedBackgroundBlobs` invalid prop warnings

## [3.3.0] - 2024-04-08

### Added

- `DURATION` and `EASING` animation constants
- Selected state color for Menu Item
- Avatar support in Input Chip
- Custom element support extended to all components
- New Material color palette (`surface-3` and related tokens)

### Changed

- Improved modal open/close animations
- CSS migrated to new color palette
- Line endings standardized to LF

### Fixed

- `onNewEntry` called on every keystroke in Chip Field
- Focus landing on first Nav Drawer Item instead of the selected one
- Page Header intercepting pointer events
- Search Button squished in Split Layout
- Emphasized type definitions flipped

## [3.2.3] - 2023-08-21

### Fixed

- Circular Progress value not updating after initial render

## [3.2.2] - 2023-08-16

### Fixed

- File input sending only the file path to `onChange` instead of the File object

## [3.2.1] - 2023-08-14

### Added

- Helper text support for Chip Field

### Fixed

- Text breaking out of Page Header
- Snackbar appearing behind Dialog
- List Item Content using wrong CSS class
- App Drawer relying on Tailwind CSS utility classes

## [3.2.0] - 2023-08-08

### Added

- **App Drawer** component
- **Text** component for typography (replaces type utility classes)
- Page Header minimize on scroll
- Translucent variant for Nav Drawer
- Drop shadow support
- Scheme mixin now also applies to CSS classes
- Non-grouped type style tokens

### Changed

- Actions component no longer uses `!important` overrides

### Fixed

- Buttons stretching inside Page Header
- Split Layout height when used with new Page Header
- Chip Set selector resolution in Chip Field
- Loading Button expanding wildly inside Actions
- Root-level Progress not fixed to viewport
- Content Layout padding inconsistencies
- Full-width Actions alignment
- Page Header text margin
- Button loading state detection for `undefined` values
- Chips and Button element defaulting to `<div>` instead of proper elements

### Removed

- Text utility classes (replaced by Text component)

## [3.1.1] - 2023-05-16

### Fixed

- Full-screen Dialog actions now optional
- Interactive component allowing overflow when appropriate
- Interactive event-handling edge cases

## [3.1.0] - 2023-05-14

### Added

- **Interactive** component for unified press/hover/focus/ripple behavior
- `element` prop on the `SKComponent` interface
- `element` prop support across most components
- Form Item support for Switch
- Nav Drawer Item `onClick` support
- Button support for Card
- Custom entry separators for Chip Field
- Configurable disable behavior for Interactive
- State layer and ripple effects on Interactive
- Ref forwarding support in Interactive

### Changed

- Interactive replaces ad-hoc interaction handling in Button, Card, Chips (all variants), Nav Bar Item, and Toggle Button

### Fixed

- Interactive missing attributes on rendered elements
- Card ripple color leaking to child elements
- Assist Chip and Button defaulting to wrong HTML element
- Disabled Link inside Button throwing errors
- Native tap highlight on mobile for interactive elements
- Nested Section in Dialog causing large gaps
- Layout prop required in Data Table
- All Icons in Table Cell using outline color
- Table Row state layer spanning entire screen width in Safari

### Removed

- References to `.skc-button__ripple` (replaced by Interactive)
- Unused parts of `DataTableColumnDef`
- Text and icon animation from Page Header

## [3.0.4] - 2023-04-29

### Added

- Row actions for Data Table
- Row actions for Table
- Optional layout animation for Data Table
- Drop shadow support
- Per-component build output
- Improved Page Header scroll animations

### Changed

- Extended `ColumnDef` in preparation for table editing features

### Fixed

- Row actions row typed as implicit `any`
- Dialog warped rounded corners
- FAB warped rounded corners
- Dialog off-center when viewport size changes
- Scrim incorrectly included in Section margin
- Data Table header cells missing bottom border
- Data Table warped rounded corners
- Table Head CSS not injected
- Nav Rail Items jumping on page navigation
- Overly wide selectors in Table Cell, Navigation Rail, FAB, and Chip Field
- Contextual adaptations not applied to Select
- Nav Drawer appearing behind Scrim
- Dialog layering (stacked dialogs)
- Split Layout scroll behavior
- FAB minimize animation not playing
- Minimized Page Header padding inconsistent with default state

## [3.0.3] - 2023-04-07

### Fixed

- `dist` folder not published to NPM

## [3.0.2] - 2023-04-07

### Added

- FAB minimize animation
- Contextual adaptations for Avatar (adapts appearance based on parent context)
- Contextual adaptations for filled Card
- Contextual adaptations for selected Chips
- Contextual adaptations for input components
- Loading state for Chip Field
- Generic type parameter for Text Field
- Attribute passthrough support for Card

### Fixed

- CSS `dist` files not gitignored
- FAB disappear state not working
- `z-index` layer organization across components
- Snackbar positioning when Nav Bar is absent
- Form Item always overwriting its child's `id`
- Checkbox animation inconsistent with Radio
- Stacked Dialogs (Dialog on Dialog) rendering at wrong `z-index`
- Components not rendering when child is not an Element
- Dialog Header with icon not center-aligned
- Chip Field and Select shrinking on focus
- Missing excludes in CSSComb config

## [3.0.1] - 2023-03-18

### Added

- `aria-hidden` on ripple elements to prevent screen reader interference

### Changed

- Replaced `createRef` with `useRef` for better performance

### Fixed

- Build errors in production bundling
- Minified build output
- Missing GitHub config files
- Removed stale `reskcom` workspace from monorepo config

## [3.0.0] - 2023-03-16

### Added

- Monorepo with npm workspaces: `packages/skcom-css` (SKCom Styles), `packages/skcom-react` (ReSKCom), and `apps/demo`
- Theme Provider component for centralized design token import
- `useScrollDirection` hook
- Page transition support via Root Layout
- **Actions:** Actions, Button, Segmented Button, Toggle Button
- **Chips:** Assist Chip, Filter Chip, Input Chip, Suggestion Chip, Chip Field, Chip Set
- **Data display:** Avatar, Card (with Card Header, Card Content), Data Table (with Search, Filters, Content, Head, Body, Pagination), List (with List Item, List Item Content), Table (with Table Head, Body, Foot, Row, Cell)
- **Forms:** Checkbox, Form Group, Form Item, Radio, Search, Select, Switch, Text Field
- **Layout:** Columns, Content Layout, Divider, Header, Page Header, Root Layout, Section, Split Layout
- **Navigation:** Navigation Bar (with Navigation Bar Item), Navigation Drawer (with Navigation Drawer Section, Navigation Drawer Item)
- **Feedback:** Dialog (with Dialog Header, Dialog Content), Full-screen Dialog, FAB, Progress, Snackbar
- **Other:** Material Icon, Menu (with Menu Item), Tabs Container (with Tab)

### Changed

- Complete rewrite from v2; CSS framework and React components now ship as separate packages
- Ripple animation (press feedback) on interactive components, using `getBoundingClientRect` for correct positioning
- CSS abstracts restructured: `@mixin`/`@include` replace `@extend`

### Removed

- Tailwind Preflight dependency; the library no longer requires Tailwind CSS to function

## [2.8.1] - 2022-10-03

### Added

- Data Table component

## [2.8.0] - 2022-07-28

### Added

- Monorepo with npm workspaces, merging three repositories into one:
  - `packages/skcom-css` — CSS framework (from `sk-components`)
  - `packages/skcom-react` — React components (from `react-sk-components`)
  - `apps/docs` — documentation site (from `skcom-doc`)
- CSS: Checklist, Radio Group (refactored), Range, Radio Range, Form Element wrapper
- React: 28 components brought over from `react-sk-components` (Actions, Banner, Button, Card, CardList, Checklist, Chip, ChipList, Dialog, FAB, FormButton, FormElement, Header, Icon, Input, LayoutGridCols, LinkButton, Navigation, Noticebar, RadioGroup, RadioRange, Range, Section, Snackbar, Table, Title, XScrollContent)
- Storybook for component development

### Fixed

- CSS not loading in the React package

## [2.7.4] - 2022-07-12

### Fixed

- Font imports conflicting with consumer app font imports
- Outlined Button with Icon had too much left padding
- Text Button with Icon had too much left padding

## [2.7.3] - 2022-07-11

_Version bump only._

## [2.7.2] - 2022-07-11

### Fixed

- Page Layout not extending to full screen height

## [2.7.1] - 2022-07-10

### Added

- Actions component
- Banner component
- Noticebar component

### Changed

- Fixed Title is now opt-in; Title scrolls with the page by default

### Fixed

- Main Section not behaving like Regular Layout
- Table lacking scrollbar on desktop
- Selected Chip state layer not fully covering the Chip

## [2.7.0] - 2022-07-08

### Added

- Scroll snapping in X Scroll Content

### Changed

- Icons migrated to Material Symbols

### Fixed

- iOS compatibility issues
- Chip List contrast issues when placed inside Dialog

## [2.6.0] - 2022-05-12

### Added

- Radio component
- Checkbox component
- Range slider component
- Radio Range component (scale selector)
- Required field indicator on form inputs
- Manual error state class for Input

### Fixed

- Input button not changing cursor to pointer on hover

## [2.5.1] - 2022-05-08

### Added

- Snackbar component

## [2.5.0] - 2022-05-08

_Version bump only._

## [2.4.5] - 2022-05-03

### Fixed

- Dialog Columns gap not adjustable for Input children

## [2.4.4] - 2022-05-01

### Added

- Auto input messages (automatically switches between helper and error text based on validity)

### Fixed

- Helper and error messages wrapping when they shouldn't

## [2.4.3] - 2022-05-01

### Added

- Disabled state for all Button variants (filled, tonal, outlined, text)
- Disabled utility class

## [2.4.2] - 2022-04-30

### Added

- Transparent Navigation variant
- Error indicator (red underline) on Input
- Error message text on Input
- Helper message text on Input

### Fixed

- Title line-height too large on desktop
- Subtitle in Title not using lighter weight
- Dropdown Options appearing behind Label

## [2.4.1] - 2022-04-06

### Added

- Input Chip component
- Button Chip (Icon Chip) component

### Fixed

- Icon having no fixed height

## [2.4.0] - 2022-03-30

### Added

- List Layout support on mobile
- Scroll Desktop utility (replaces X Scroll Content)

### Fixed

- Icon in Button with Icon too large
- Layout Grid Columns mis-categorized as utilities

## [2.3.1] - 2022-03-28

### Added

- Text Stroke utility (adds outline to text)

### Fixed

- Dialog overflow issues
- Dropdown issues

## [2.3.0] - 2022-03-25

### Added

- Dialog Content wrapper component
- No Transition modifier for Dialog (for use with animation libraries)

### Changed

- **Breaking:** Dialog Header, Dialog Section, and Dialog List must now be wrapped in Dialog Content

### Fixed

- Dialog incompatible with Framer Motion
- Dialog padding incorrect

## [2.2.5] - 2022-03-22

### Added

- Card action area support (clickable cards)
- New `z-index` system

### Fixed

- Card action styling issues

## [2.2.4] - 2022-03-19

### Added

- Error (danger) Button variants for all styles
- Error variant for Has Action utility

### Fixed

- Dropdown height inconsistent with Input
- Dialog List Item height inconsistent

## [2.2.3] - 2022-03-18

### Added

- Dialog Hero support for large Dialogs
- Icon Button for filled, outlined, and tonal Button variants

### Fixed

- Icons having unpredictable display behavior
- Text inside Button flowing to multiple lines
- Dialog Hero and Dialog List padding
- Dropdown Options `z-index`

## [2.2.2] - 2022-03-17

_Version bump only._

## [2.2.1] - 2022-03-11

### Fixed

- Chip Icon lacking `display: flex`

## [2.2.0] - 2022-03-10

### Added

- Chip component (selected/unselected states, outlined/elevated appearances, with icon/avatar variants)
- Chip List (regular and radio group modes)
- "Sora" as the display font for Latin glyphs

### Fixed

- State layer hover transition on Has Action elements
- Input width not modifiable
- Icon Button having too little padding
- Outlined Button larger than Filled Button
- Button with Icon having incorrect padding

## [2.1.2] - 2022-03-07

_Version bump only._

## [2.1.1] - 2022-03-06

### Added

- List Layout component
- X Scroll Content component
- Has Action utility class
- Layout Grid Columns utility class
- Support for manual light/dark mode classes

### Changed

- Title transforms into Top App Bar on mobile

### Fixed

- Unwanted focus outlines on elements that don't need them
- Card Header spacing incorrect

## [2.1.0] - 2022-03-06

_Version bump only._

## [2.0.0] - 2022-03-02

First stable release of the Suankularb Components CSS framework (`@suankularb-components/css`). A complete rewrite from v1 with a new layout grid, state layers, and expanded component set.

### Added

- **Components:** Button (filled, outlined, text, icon), Navigation Bar, Header, Icon, Card (with Header, Body, Horizontal, and Stacked variants), Full-screen Dialog, List Layout, Page Layout, Search, Input (with Persistent, Dropdown variants), Table, Dialog, TextArea, Monogram, FAB (small, normal, large, extended), FAB Group, Mobile Navigation
- State layers on interactive components
- Max lines text overflow utility
- Scroll bar utility

### Changed

- Components aligned to a shared layout grid
- Card revamped; Card List removed in favor of Horizontal and Stacked variants
- Header renamed to Title, redesigned
- Content Layout restructured

### System

- Color palette, typography scale, responsive breakpoints, CSS reset
- Utility classes: colors, shadows

### Infrastructure

- npm publishing via Rollup, PostCSS build pipeline, CI/CD
