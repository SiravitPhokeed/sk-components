import browserslist from "browserslist";
import { browserslistToTargets, transform } from "lightningcss";
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC_DIR = join(__dirname, "src");
const DIST_DIR = join(__dirname, "dist");
const LAYER = "skc";

const log = {
  info: (msg) => console.log(`○ ${msg}`),
  success: (msg) => console.log(`\x1b[92m✓\x1b[0m ${msg}`),
  error: (msg) => console.error(`\x1b[91m×\x1b[0m ${msg}`),
};

/** Resolve browser targets from the project's browserslist config. */
function getTargets() {
  const queries = browserslist.loadConfig({ path: __dirname });
  if (queries) return browserslistToTargets(browserslist(queries));
  // Fallback if no browserslist config exists
  return browserslistToTargets(browserslist(["last 2 versions", "not dead"]));
}

/**
 * Collect all .css files recursively from a directory.
 * @param {string} dir
 * @returns {Promise<string[]>}
 */
async function collectFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) return collectFiles(full);
      if (entry.name.endsWith(".css")) return [full];
      return [];
    }),
  );
  return files.flat();
}

/**
 * Process a single CSS file.
 * @param {string} filePath - Absolute path to source file
 * @param {ReturnType<getTargets>} targets
 */
async function processFile(filePath, targets) {
  const code = await readFile(filePath);
  const relativePath = relative(SRC_DIR, filePath);
  const dest = join(DIST_DIR, relativePath);

  const result = transform({
    filename: relativePath,
    code,
    minify: false,
    targets,
    errorRecovery: true,
  });

  // Wrap output in @layer skc { ... }
  const css = result.code.toString().trim();
  const output = css
    ? `@layer ${LAYER} {\n\n${css}\n\n}\n`
    : `@layer ${LAYER}{}\n`;

  await mkdir(dirname(dest), { recursive: true });
  await writeFile(dest, output);

  return { src: relativePath, dest: relativePath };
}

async function build() {
  const start = performance.now();

  // Ensure dist directory exists
  await mkdir(DIST_DIR, { recursive: true });

  const targets = getTargets();
  const files = await collectFiles(SRC_DIR);

  log.info(`Processing ${files.length} CSS files...`);

  const results = await Promise.all(files.map((f) => processFile(f, targets)));

  const elapsed = (performance.now() - start).toFixed(1);
  log.success(
    `Done — ${results.length} files written to dist/ in ${elapsed}ms\n`,
  );
}

// --watch mode
const WATCH_FLAG = "--watch";
if (process.argv.includes(WATCH_FLAG)) {
  let running = false;

  async function watchBuild() {
    const start = performance.now();
    const targets = getTargets();
    const files = await collectFiles(SRC_DIR);
    await Promise.all(files.map((f) => processFile(f, targets)));
    const elapsed = (performance.now() - start).toFixed(1);
    log.success(`Rebuilt ${files.length} files in ${elapsed}ms`);
  }

  // Initial build
  await watchBuild();

  // Watch for changes recursively
  const { watch } = await import("node:fs");
  log.info("Watching for changes...");

  // Watch the src directory tree
  async function watchDir(dir) {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) {
        await watchDir(full);
      }
    }

    watch(dir, { recursive: false }, async (eventType, filename) => {
      if (!filename || !filename.endsWith(".css")) return;
      if (running) return;
      running = true;
      // Debounce slightly
      await new Promise((r) => setTimeout(r, 50));
      try {
        await watchBuild();
      } catch (err) {
        log.error(`Build error: ${err.message}`);
      }
      running = false;
    });
  }

  await watchDir(SRC_DIR);
} else {
  build().catch((err) => {
    log.error(`Build failed: ${err.message}\n`);
    process.exit(1);
  });
}
