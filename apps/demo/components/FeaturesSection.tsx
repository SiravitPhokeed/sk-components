"use client";

import {
  Card,
  CardContent,
  CardHeader,
  Columns,
  Header,
  MaterialIcon,
  Section,
  Switch,
  Text,
} from "@suankularb-components/react";
import type { FC } from "react";
import { useEffect, useState } from "react";

const FeaturesSection: FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isRtl, setIsRtl] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    // Setting it directly in `useState` causes a hydration error, so we set it
    // in `useEffect` instead.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsDarkMode(prefersDark);
  }, []);
  const handleSchemeChange = (isDark: boolean) => {
    setIsDarkMode(isDark);
    document.documentElement.classList.remove("scheme-light", "scheme-dark");
    document.documentElement.classList.add(
      isDark ? "scheme-dark" : "scheme-light",
    );
  };
  const handleDirectionChange = (isRtl: boolean) => {
    setIsRtl(isRtl);
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
  };

  return (
    <Section>
      <Header>Features</Header>
      <Columns
        columns={3}
        className="[&_code]:bg-surface-variant items-stretch! [&_code]:rounded-xs [&_code]:px-1"
      >
        <Card appearance="outlined" className="sm:col-span-2 md:col-span-1">
          <CardHeader icon={<MaterialIcon icon="palette" />} title="Theming" />
          <CardContent>
            <p>
              Import the Theme Provider component and get Suankularb&rsquo;s
              pink-and-blue theme, or create your own by studying the{" "}
              <a
                href="https://github.com/suankularb-wittayalai-school/sk-components/tree/main/packages/css/src/_theme.css"
                target="_blank"
                className="text-primary font-bold"
              >
                <code>_theme.css</code>
              </a>{" "}
              file and importing it into your project.
            </p>
          </CardContent>
        </Card>
        <Card appearance="outlined" className="relative">
          <CardHeader
            icon={<MaterialIcon icon="dark_mode" />}
            title="Dark mode"
          />
          <Switch
            value={isDarkMode}
            onChange={handleSchemeChange}
            className="absolute! inset-e-4 top-2"
          />
          <CardContent>
            <p>
              Light and dark color schemes are supported both through user
              preferences and programmatically with <code>scheme-light</code>{" "}
              and <code>scheme-dark</code> classes.
            </p>
            <Text type="body-small" className="text-on-surface-variant">
              High contrast mode is also supported through the{" "}
              <code>prefers-contrast</code> media query.
            </Text>
          </CardContent>
        </Card>
        <Card appearance="outlined" className="relative">
          <CardHeader
            icon={<MaterialIcon icon="language" />}
            title="RTL support"
          />
          <Switch
            value={isRtl}
            onChange={handleDirectionChange}
            className="absolute! inset-e-4 top-2"
          />
          <CardContent>
            <p>
              Right-to-left (RTL) languages are also fully supported. Try the
              Switch above to see how the layout changes when the{" "}
              <code>dir</code> attribute is set to <code>rtl</code>.
            </p>
          </CardContent>
        </Card>
      </Columns>
    </Section>
  );
};

export default FeaturesSection;
