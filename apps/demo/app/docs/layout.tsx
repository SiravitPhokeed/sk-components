import DocsNavLink from "@/app/docs/components/DocsNavLink";
import DocsNavSection from "@/app/docs/components/DocsNavSection";
import PageHeader from "@/components/PageHeader";
import {
  Card,
  CardHeader,
  SplitLayout,
  Text,
} from "@suankularb-components/react";
import type { FC, ReactNode } from "react";

const DocsLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <>
    <PageHeader>Documentation</PageHeader>
    <SplitLayout ratio="list-detail">
      <nav aria-label="Documentation" className="space-y-2">
        <Card appearance="outlined">
          <CardHeader title="@suankularb-components/react" subtitle="v4.0.0" />
        </Card>

        <DocsNavSection title="Guides" open>
          <DocsNavLink href="/docs/guides/getting-started">Getting started</DocsNavLink>
          <DocsNavLink href="/docs/guides/nextjs">Next.js</DocsNavLink>
          <DocsNavLink href="/docs/guides/tailwindcss">Tailwind CSS</DocsNavLink>
          <DocsNavLink href="/docs/guides/localization">Localization</DocsNavLink>
          <DocsNavLink href="/docs/guides/theming">Theming</DocsNavLink>
        </DocsNavSection>

        <DocsNavSection title="Migrations">
          <DocsNavLink href="/docs/migrations/v4">Migrating to v4</DocsNavLink>
          <DocsNavLink href="/docs/migrations/v3.3">Migrating to v3.3</DocsNavLink>
        </DocsNavSection>

        <DocsNavSection title="Inputs">
          <DocsNavLink href="/docs/inputs/button">Button</DocsNavLink>
          <DocsNavLink href="/docs/inputs/segmented-button">
            Segmented Button
          </DocsNavLink>
          <DocsNavLink href="/docs/inputs/toggle-button">
            Toggle Button
          </DocsNavLink>
          <DocsNavLink href="/docs/inputs/floating-action-button">
            Floating Action Button
          </DocsNavLink>
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
      <Text type="body-large" element="article" className="pt-0">
        {children}
      </Text>
    </SplitLayout>
  </>
);

// Ideas for pages
// /docs/components/{data,inputs,layout,overlays}
// /docs/guides: Next.js, Tailwind CSS, Localization
// /docs/migations: Migrating to v3, Migrating to v4
// /docs/changelog/4.0.0

export default DocsLayout;
