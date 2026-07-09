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
