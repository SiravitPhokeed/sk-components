# Changelog (Demo app)

All notable changes to the demo application will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Versions track the root library releases.

## [Unreleased]

### Added

- **Documentation site** at `/docs` with component reference, guides, and
  migration guides rendered from MDX
- **Text Field demo** uses the new `name` prop for uncontrolled form submission
  with `<form>` and `FormData`

### Changed

- **Migrated from Pages Router to App Router** — all routes moved under `app/`
- **Component demos** updated to the v4 API and reorganized into 4 categorized
  pages (Layout & navigation, Inputs, Data display, Overlays)
- **Search example** updated to match the new look introduced in MySK v0.12.0
  (June 2024)
- **Next.js** upgraded from 13.5 to 16.2 and **React** from 18 to 19
- **Tailwind CSS** upgraded from v3 to v4; PostCSS and ESLint configs updated
  accordingly

### Removed

- **Pages Router** route files (`pages/`)
- **Contexts:** `NavDrawerContext`, `SnackbarContext`, `PreviousRouteContext`
  (state now managed by SKCom)
- **Layout wrapper**, old utilities, and old styles (replaced by App Router
  equivalents)

## [3.3.0] - 2024-04-08

### Changed

- Replaced deprecated `sectionAttr` prop usage with `element` prop in example
  pages

## [3.2.0] - 2023-08-08

### Changed

- Migrated to new Page Header and Text components

## [3.1.0] - 2023-05-14

### Fixed

- Lookup example throwing an error
- Back Button in demo Page Header rendered as wrong HTML element

## [3.0.4] - 2023-04-29

### Fixed

- Contact Card example opening in same tab instead of a new one

## [3.0.2] - 2023-04-07

### Fixed

- External links in demo opening in same page

## [3.0.1] - 2023-03-18

### Changed

- Replaced `aria-label` with `sr-only` utility class for hidden labels

### Fixed

- Search placeholder text in Split Layout demo

## [3.0.0] - 2023-03-16

### Added

- Initial demo application showcasing all components and their variants
- Full-page example: Lookup (list-detail view) built with Split Layout
- Communications showcase page (Dialog, Snackbar)
- Snackbar context for app-level feedback
- Page load indicator using Progress component
- Routing hooks in preparation for spatially-coherent page transitions
