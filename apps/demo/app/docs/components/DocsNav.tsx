import DocsNavLink from "@/app/docs/components/DocsNavLink";
import DocsNavSection from "@/app/docs/components/DocsNavSection";
import cn from "@/lib/helpers/cn";
import type { StyleableFC } from "@/lib/types";
import { Card, CardHeader } from "@suankularb-components/react";

const DocsNav: StyleableFC<{
  open?: boolean;
}> = ({ open, className, style }) => (
  <nav
    aria-label="Documentation"
    className={cn("space-y-2", className)}
    style={style}
  >
    <Card appearance="outlined">
      <CardHeader title="@suankularb-components/react" subtitle="v4.0.0" />
    </Card>

    <DocsNavSection
      title="Guides"
      open // First section is always open
    >
      <DocsNavLink href="/docs/guides/getting-started">
        Getting started
      </DocsNavLink>
      <DocsNavLink href="/docs/guides/nextjs">Next.js</DocsNavLink>
      <DocsNavLink href="/docs/guides/tailwindcss">Tailwind CSS</DocsNavLink>
      <DocsNavLink href="/docs/guides/localization">Localization</DocsNavLink>
      <DocsNavLink href="/docs/guides/theming">Theming</DocsNavLink>
    </DocsNavSection>

    <DocsNavSection title="Migrations" open={open}>
      <DocsNavLink href="/docs/migrations/v4">Migrating to v4</DocsNavLink>
      <DocsNavLink href="/docs/migrations/v3.3">Migrating to v3.3</DocsNavLink>
    </DocsNavSection>

    <DocsNavSection title="Inputs" open={open}>
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
  </nav>
);

export default DocsNav;
