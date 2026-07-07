"use client";

import download from "@/lib/helpers/download";
import {
  Button,
  Card,
  ChipField,
  ChipSet,
  FullscreenDialog,
  InputChip,
  MaterialIcon,
  Text,
} from "@suankularb-components/react";
import { snackbar } from "@suankularb-components/react/helpers";
import Link from "next/link";
import { unique } from "radash";
import type { FC } from "react";
import { useState } from "react";

/**
 * List of icon names that are used internally in SK Components.
 *
 * These icons will always be included in the downloaded font, even if the user
 * does not specify them.
 */
const ICON_NAMES_USED_INTERNALLY = [
  "arrow_back", // Page Header
  "arrow_drop_down", // Select
  "apps", // App Drawer
  "check_small", // Checkbox
  "close", // Dialog, Chips
  "done", // Button
  "menu", // Nav Bar
  "search", // Search
];

const IconFontDialog: FC = () => {
  const [iconNames, setIconNames] = useState<string[]>([]);
  const [iconNamesInput, setIconNamesInput] = useState("");

  async function handleDownload() {
    const stylesheetUrl = new URL("https://fonts.googleapis.com/css2");
    stylesheetUrl.searchParams.set(
      "family",
      "Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,300..600,0..1,-25..0",
    );
    stylesheetUrl.searchParams.set(
      "icon_names",
      unique([ICON_NAMES_USED_INTERNALLY, iconNames].flat()).sort().join(","),
    );

    let css = "";
    try {
      const response = await fetch(stylesheetUrl);
      css = await response.text();
    } catch (_) {
      snackbar.push("Failed to download font");
      return;
    }

    // Find the URL of the font file in the CSS.
    const fontUrlMatch = css.match(/url\(([^)]+)\)/);
    if (!fontUrlMatch) {
      snackbar.push("Failed to download font");
      return;
    }

    // Download the font file and save it as "material-symbols.woff2".
    await download(fontUrlMatch[1], "material-symbols.woff2", "font/woff2");
    snackbar.push("Font downloaded");
  }

  return (
    <FullscreenDialog
      id="icon-font-dialog"
      title="Download icon font"
      action={
        <Button appearance="text" onClick={handleDownload}>
          Download
        </Button>
      }
      width={600}
    >
      <Card appearance="filled" className="gap-6 p-4 pb-10 sm:-m-2">
        <Text type="body-medium" element="section" className="mb-3 space-y-2">
          <p>
            To use{" "}
            <Link href="/docs/data/material-icon" className="link">
              Material Icon
            </Link>
            , you need to download the Material Symbols font and include it in
            your project.
          </p>
          <p>
            <strong>
              Enter the names of the icons you want to include in your project.
            </strong>{" "}
            You can find the names of the icons on{" "}
            <Link
              href="https://fonts.google.com/icons"
              className="link"
              target="_blank"
            >
              Google Fonts
              <MaterialIcon
                icon="arrow_outward"
                size={20}
                className="-mt-1 inline-block"
              />
            </Link>
            .
          </p>
        </Text>

        <ChipField
          label="Icon names"
          value={iconNamesInput}
          onChange={setIconNamesInput}
          onNewEntry={(name) => {
            name = name.toLowerCase().replace(/[- ]/g, "_");
            if (iconNames.includes(name)) snackbar.push("Icon already added");
            else if (!/[a-z0-9_]+/.test(name))
              snackbar.push("Invalid icon name");
            else setIconNames([...iconNames, name].sort());
          }}
          onDeleteLast={() => setIconNames(iconNames.slice(0, -1))}
          entrySeparators={[",", ";", "Enter"]}
          helperMsg="Comma-separated list"
          placeholder="Enter icon name"
        >
          <ChipSet>
            {iconNames.map((name) => (
              <InputChip
                key={name}
                onDelete={() => {
                  setIconNames(iconNames.filter((n) => n !== name));
                }}
              >
                <code>{name}</code>
              </InputChip>
            ))}
          </ChipSet>
        </ChipField>
      </Card>

      <section aria-labelledby="header-internal-icons" className="mt-6">
        <Text
          id="header-internal-icons"
          type="title-medium"
          element="h3"
          className="mb-1"
        >
          Already included
        </Text>
        <Text type="body-medium" element="p" className="mb-3">
          These icons will automatically be included in the downloaded font.
        </Text>
        <ul role="list" className="grid gap-2 sm:grid-cols-3">
          {ICON_NAMES_USED_INTERNALLY.map((name) => (
            <div key={name} className="flex items-center gap-1">
              <MaterialIcon icon={name} size={20} className="text-secondary" />
              <code>{name}</code>
            </div>
          ))}
        </ul>
      </section>

      <section className="text-on-surface-variant mt-3 space-y-2">
        <MaterialIcon icon="info" size={20} />
        <Text type="body-small" element="p">
          Downloading every icon in the font can result in massive bundle sizes.
          To reduce the size of your project, you can select only the icons you
          need and download them as a custom font.
        </Text>
      </section>
    </FullscreenDialog>
  );
};

export default IconFontDialog;
