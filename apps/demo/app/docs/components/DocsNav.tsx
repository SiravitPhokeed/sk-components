import DocsNavLink from "@/app/docs/components/DocsNavLink";
import DocsNavSection from "@/app/docs/components/DocsNavSection";
import cn from "@/lib/helpers/cn";
import type { StyleableFC } from "@/lib/types";
import { Card, CardHeader } from "@suankularb-components/react";

const DocsNav: StyleableFC = ({ className, style }) => (
  <nav
    aria-label="Documentation"
    className={cn("space-y-2", className)}
    style={style}
  >
    <Card appearance="outlined">
      <CardHeader title="@suankularb-components/react" subtitle="v4.0.0" />
    </Card>

    <DocsNavSection title="Guides" open>
      <DocsNavLink href="/docs/guides/getting-started">
        Getting started
      </DocsNavLink>
      <DocsNavLink href="/docs/guides/nextjs-app">
        Next.js App Router
      </DocsNavLink>
      <DocsNavLink href="/docs/guides/nextjs-pages">
        Next.js Pages Router
      </DocsNavLink>
      <DocsNavLink href="/docs/guides/tailwindcss-v4">
        Tailwind CSS v4
      </DocsNavLink>
      <DocsNavLink href="/docs/guides/tailwindcss-v3">
        Tailwind CSS v3
      </DocsNavLink>
      <DocsNavLink href="/docs/guides/localization">Localization</DocsNavLink>
      <DocsNavLink href="/docs/guides/theming">Theming</DocsNavLink>
    </DocsNavSection>

    <DocsNavSection title="Migrations">
      <DocsNavLink href="/docs/migrations/v4">Migrating to v4</DocsNavLink>
      <DocsNavLink href="/docs/migrations/v3.3">Migrating to v3.3</DocsNavLink>
    </DocsNavSection>

    <DocsNavSection title="Layout & navigation">
      <DocsNavLink href="/docs/layout/root-layout">Root Layout</DocsNavLink>
      <DocsNavLink href="/docs/layout/content-layout">
        Content Layout
      </DocsNavLink>
      <DocsNavLink href="/docs/layout/split-layout">Split Layout</DocsNavLink>
      <DocsNavLink href="/docs/layout/columns">Columns</DocsNavLink>
      <DocsNavLink href="/docs/layout/section">Section</DocsNavLink>
      <DocsNavLink href="/docs/layout/nav-bar">Nav Bar</DocsNavLink>
      <DocsNavLink href="/docs/layout/nav-bar-item">Nav Bar Item</DocsNavLink>
      <DocsNavLink href="/docs/layout/nav-drawer">Nav Drawer</DocsNavLink>
      <DocsNavLink href="/docs/layout/nav-drawer-section">
        Nav Drawer Section
      </DocsNavLink>
      <DocsNavLink href="/docs/layout/nav-drawer-item">
        Nav Drawer Item
      </DocsNavLink>
      <DocsNavLink href="/docs/layout/side-sheet">Side Sheet</DocsNavLink>
      <DocsNavLink href="/docs/layout/app-drawer">App Drawer</DocsNavLink>
      <DocsNavLink href="/docs/layout/app-drawer-segment">
        App Drawer Segment
      </DocsNavLink>
      <DocsNavLink href="/docs/layout/app-drawer-item">
        App Drawer Item
      </DocsNavLink>
      <DocsNavLink href="/docs/layout/tabs-container">
        Tabs Container
      </DocsNavLink>
      <DocsNavLink href="/docs/layout/tab">Tab</DocsNavLink>
      <DocsNavLink href="/docs/layout/theme-provider">
        Theme Provider
      </DocsNavLink>
      <DocsNavLink href="/docs/layout/anchor">Anchor</DocsNavLink>
    </DocsNavSection>

    <DocsNavSection title="Inputs">
      <DocsNavLink href="/docs/inputs/button">Button</DocsNavLink>
      <DocsNavLink href="/docs/inputs/segmented-button">
        Segmented Button
      </DocsNavLink>
      <DocsNavLink href="/docs/inputs/toggle-button">Toggle Button</DocsNavLink>
      <DocsNavLink href="/docs/inputs/fab">Floating Action Button</DocsNavLink>
      <DocsNavLink href="/docs/inputs/actions">Actions</DocsNavLink>
      <DocsNavLink href="/docs/inputs/checkbox">Checkbox</DocsNavLink>
      <DocsNavLink href="/docs/inputs/radio">Radio</DocsNavLink>
      <DocsNavLink href="/docs/inputs/switch">Switch</DocsNavLink>
      <DocsNavLink href="/docs/inputs/select">Select</DocsNavLink>
      <DocsNavLink href="/docs/inputs/chip-field">Chip Field</DocsNavLink>
      <DocsNavLink href="/docs/inputs/text-field">Text Field</DocsNavLink>
      <DocsNavLink href="/docs/inputs/search">Search</DocsNavLink>
      <DocsNavLink href="/docs/inputs/form-group">Form Group</DocsNavLink>
      <DocsNavLink href="/docs/inputs/form-item">Form Item</DocsNavLink>
    </DocsNavSection>

    <DocsNavSection title="Data display">
      <DocsNavLink href="/docs/data/table">Table</DocsNavLink>
      <DocsNavLink href="/docs/data/table-head">Table Head</DocsNavLink>
      <DocsNavLink href="/docs/data/table-body">Table Body</DocsNavLink>
      <DocsNavLink href="/docs/data/table-foot">Table Foot</DocsNavLink>
      <DocsNavLink href="/docs/data/table-row">Table Row</DocsNavLink>
      <DocsNavLink href="/docs/data/table-cell">Table Cell</DocsNavLink>
      <DocsNavLink href="/docs/data/data-table">Data Table</DocsNavLink>
      <DocsNavLink href="/docs/data/data-table-search">
        Data Table Search
      </DocsNavLink>
      <DocsNavLink href="/docs/data/data-table-filters">
        Data Table Filters
      </DocsNavLink>
      <DocsNavLink href="/docs/data/data-table-content">
        Data Table Content
      </DocsNavLink>
      <DocsNavLink href="/docs/data/data-table-head">
        Data Table Head
      </DocsNavLink>
      <DocsNavLink href="/docs/data/data-table-body">
        Data Table Body
      </DocsNavLink>
      <DocsNavLink href="/docs/data/data-table-pagination">
        Data Table Pagination
      </DocsNavLink>
      <DocsNavLink href="/docs/data/list">List</DocsNavLink>
      <DocsNavLink href="/docs/data/list-item">List Item</DocsNavLink>
      <DocsNavLink href="/docs/data/list-item-content">
        List Item Content
      </DocsNavLink>
      <DocsNavLink href="/docs/data/card">Card</DocsNavLink>
      <DocsNavLink href="/docs/data/card-header">Card Header</DocsNavLink>
      <DocsNavLink href="/docs/data/card-content">Card Content</DocsNavLink>
      <DocsNavLink href="/docs/data/assist-chip">Assist Chip</DocsNavLink>
      <DocsNavLink href="/docs/data/filter-chip">Filter Chip</DocsNavLink>
      <DocsNavLink href="/docs/data/input-chip">Input Chip</DocsNavLink>
      <DocsNavLink href="/docs/data/suggestion-chip">
        Suggestion Chip
      </DocsNavLink>
      <DocsNavLink href="/docs/data/chip-set">Chip Set</DocsNavLink>
      <DocsNavLink href="/docs/data/text">Text</DocsNavLink>
      <DocsNavLink href="/docs/data/header">Header</DocsNavLink>
      <DocsNavLink href="/docs/data/page-header">Page Header</DocsNavLink>
      <DocsNavLink href="/docs/data/avatar">Avatar</DocsNavLink>
      <DocsNavLink href="/docs/data/material-icon">Material Icon</DocsNavLink>
      <DocsNavLink href="/docs/data/divider">Divider</DocsNavLink>
      <DocsNavLink href="/docs/data/interactive">Interactive</DocsNavLink>
    </DocsNavSection>

    <DocsNavSection title="Overlays">
      <DocsNavLink href="/docs/overlays/dialog">Dialog</DocsNavLink>
      <DocsNavLink href="/docs/overlays/dialog-header">
        Dialog Header
      </DocsNavLink>
      <DocsNavLink href="/docs/overlays/dialog-content">
        Dialog Content
      </DocsNavLink>
      <DocsNavLink href="/docs/overlays/fullscreen-dialog">
        Full-screen Dialog
      </DocsNavLink>
      <DocsNavLink href="/docs/overlays/menu">Menu</DocsNavLink>
      <DocsNavLink href="/docs/overlays/menu-item">Menu Item</DocsNavLink>
      <DocsNavLink href="/docs/overlays/snackbar">Snackbar</DocsNavLink>
      <DocsNavLink href="/docs/overlays/progress">Progress</DocsNavLink>
    </DocsNavSection>
  </nav>
);

export default DocsNav;
