#!/usr/bin/env node

/**
 * Scans all MaterialIcon uses across the React library and demo app, then
 * downloads an optimized Material Symbols font containing only the icons
 * that are actually used.
 *
 * Run via: `pnpm run icons` (in apps/demo) or `pnpm run demo:icons` (root).
 */

import { createWriteStream } from "node:fs";
import {
  mkdir,
  readFile,
  readdir,
  rename,
  stat,
  unlink,
} from "node:fs/promises";
import { extname, join, resolve } from "node:path";
import { pipeline } from "node:stream/promises";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const REPO_ROOT = resolve(import.meta.dirname, "../../..");
const SCAN_DIRS = [
  join(REPO_ROOT, "packages/react/src"),
  join(REPO_ROOT, "apps/demo"),
];
const OUTPUT = join(
  REPO_ROOT,
  "apps/demo/public/fonts",
  "material-symbols.woff2",
);

const GOOGLE_FONTS_FAMILY =
  "Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,300..600,0..1,-25..0";

/** File extensions we scan. */
const SCAN_EXTS = new Set([".tsx", ".ts", ".mdx"]);

/** Directories to skip during the walk. */
const SKIP_DIRS = new Set(["node_modules", ".next", ".turbo", ".git", "dist"]);

const CONFIG_PATH = join(import.meta.dirname, "icons.config.json");

// ---------------------------------------------------------------------------
// CLI flags
// ---------------------------------------------------------------------------

const args = process.argv.slice(2);
const cliIncludes = [];
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--include" || args[i] === "-i") {
    cliIncludes.push(
      ...(args[++i] ?? "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    );
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const B = (s) => `\x1b[96m${s}\x1b[0m`;
const Y = (s) => `\x1b[93m${s}\x1b[0m`;

/** Non-zero exit with a message. */
function fail(message) {
  console.error(`\x1b[31merror\x1b[0m ${message}`);
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Step 1 – Walk source trees and extract icon names from Material Icon uses
// ---------------------------------------------------------------------------

/**
 * Recursively walk `dir`, returning every file whose extension is in
 * `SCAN_EXTS`.
 */
async function* walk(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      yield* walk(full);
    } else if (entry.isFile() && SCAN_EXTS.has(extname(entry.name))) {
      yield full;
    }
  }
}

/**
 * Return every unique MaterialIcon icon name found in `text`.
 *
 * Matches patterns like:
 *   `<MaterialIcon icon="arrow_back" />`,
 *   `icon={<MaterialIcon icon="close" />}`,
 *   `<MaterialIcon size={20} icon="info" />`
 */
function extractIcons(text) {
  const names = new Set();

  // Match icon="arrow_back" (JSX string attribute) and
  // icon={'arrow_back'} (JSX expression wrapping a literal).
  const patterns = [
    /MaterialIcon[^>]*?\bicon="([a-z0-9_]+)"/g,
    /MaterialIcon[^>]*?\bicon=\{["']([a-z0-9_]+)["']\}/g,
  ];

  for (const re of patterns) {
    let m;
    while ((m = re.exec(text)) !== null) {
      names.add(m[1]);
    }
  }

  return names;
}

async function scanIcons() {
  console.log("Scanning for Material Icon uses…");

  const scanned = new Set();

  for (const dir of SCAN_DIRS) {
    for await (const file of walk(dir)) {
      const text = await readFile(file, "utf-8");
      for (const name of extractIcons(text)) {
        scanned.add(name);
      }
    }
  }

  // Merge in icons from the config file.
  let configNames = [];
  try {
    const raw = await readFile(CONFIG_PATH, "utf-8");
    configNames = JSON.parse(raw).include ?? [];
  } catch {}

  // Merge all sources: scanned ∪ config ∪ CLI.
  const allNames = new Set([...scanned, ...configNames, ...cliIncludes]);

  const sorted = [...allNames].sort();
  const extra = [...allNames].filter((n) => !scanned.has(n)).length;
  const breakdown =
    extra > 0 ? ` (${scanned.size} scanned + ${extra} from config)` : "";
  console.log(
    `  Found ${sorted.length} unique icon${sorted.length === 1 ? "" : "s"}${breakdown}:`,
  );

  // Print in a balanced column grid that fits the terminal.
  const termWidth = Math.max(1, process.stdout.columns || 80);
  const gap = 3;

  // Try column counts from many down to 1; pick the most that fit.
  let colCount = 1;
  for (let n = Math.min(sorted.length, 6); n > 1; n--) {
    const rows = Math.ceil(sorted.length / n);
    let total = 0;
    for (let c = 0; c < n; c++) {
      const start = c * rows;
      const slice = sorted.slice(start, start + rows);
      total += Math.max(...slice.map((s) => s.length));
    }
    if (total + (n - 1) * gap <= termWidth) {
      colCount = n;
      break;
    }
  }

  const rowCount = Math.ceil(sorted.length / colCount);
  for (let r = 0; r < rowCount; r++) {
    const line = [];
    for (let c = 0; c < colCount; c++) {
      const idx = c * rowCount + r;
      const name = sorted[idx] ?? "";
      const start = c * rowCount;
      const colMax = Math.max(
        ...sorted.slice(start, start + rowCount).map((s) => s.length),
      );
      const isExtra = name && !scanned.has(name);
      const cell = name.padEnd(colMax);
      line.push(!name ? cell : isExtra ? Y(cell) : B(cell));
    }
    console.log(`    ${line.join(" ".repeat(gap))}`);
  }

  return sorted;
}

// ---------------------------------------------------------------------------
// Step 2 – Download the optimized font from Google Fonts
// ---------------------------------------------------------------------------

async function downloadFont(iconNames) {
  const url = new URL("https://fonts.googleapis.com/css2");
  url.searchParams.set("family", GOOGLE_FONTS_FAMILY);
  url.searchParams.set("icon_names", iconNames.join(","));

  // Google Fonts rejects percent-encoded URLs — decode back to plain text.
  const cssUrl = decodeURIComponent(url.toString());

  console.log("\nFetching CSS from Google Fonts…");
  const cssResponse = await fetch(cssUrl);
  if (!cssResponse.ok) {
    fail(`Google Fonts returned HTTP ${cssResponse.status}`);
  }
  const css = await cssResponse.text();

  // Extract the font-file URL from the CSS `url(…)` rule.
  const match = css.match(/url\(([^)]+)\)/);
  if (!match) fail("Could not find font URL in CSS response.");

  const fontUrl = match[1];
  console.log(`  Font URL: ${B(fontUrl)}`);

  // Download to a temp file so we can atomically replace the output.
  const tmpDir = join(REPO_ROOT, "apps/demo", ".tmp");
  await mkdir(tmpDir, { recursive: true });
  const tmpFile = join(tmpDir, "material-symbols.woff2");

  console.log("Downloading font file…");
  const fontResponse = await fetch(fontUrl);
  if (!fontResponse.ok) {
    fail(`Font download returned HTTP ${fontResponse.status}`);
  }

  await mkdir(join(OUTPUT, ".."), { recursive: true });

  // Write to temp, then atomically move into place.
  const tmpStream = createWriteStream(tmpFile);
  await pipeline(fontResponse.body, tmpStream);
  await rename(tmpFile, OUTPUT);

  // Clean up temp directory (rmdir fails if not empty; that's fine).
  await unlink(tmpFile).catch(() => {});

  // Print file size.
  const info = await stat(OUTPUT);
  const kb = (info.size / 1024).toFixed(1);
  console.log(`  Done — ${kb} KB written to ${B(OUTPUT)}`);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const iconNames = await scanIcons();
await downloadFont(iconNames);

console.log("\nOptimized icon font is ready.");
