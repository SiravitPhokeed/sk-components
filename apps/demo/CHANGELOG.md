# Changelog (Demo app)

All notable changes to the demo application will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added

- **Sitemap and robots.txt** generated at build time — the sitemap lists every
  page discovered in `app/`, and robots.txt points crawlers to it
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

## [0.1.0] - 2023-03-16

### Added

- Initial demo application showcasing all components and their variants
- Full-page example: Lookup (list-detail view) built with Split Layout
- Communications showcase page (Dialog, Snackbar)
- Snackbar context for app-level feedback
- Page load indicator using Progress component
- Routing hooks in preparation for spatially-coherent page transitions
