import browserslist from "browserslist";
import { browserslistToTargets, transform } from "lightningcss";
import { mkdir, readdir, readFile, watch, writeFile } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC_DIR = join(__dirname, "src");
const DIST_DIR = join(__dirname, "dist");
const LAYER = "skc";

const log = {
  info: (msg) => console.warn(`\x1b[97m-\x1b[0m ${msg}`),
  process: (msg) => console.log(`\x1b[97m○\x1b[0m ${msg}`),
  success: (msg) => console.log(`\x1b[92m✓\x1b[0m ${msg}`),
  error: (msg) => console.error(`\x1b[91m×\x1b[0m ${msg}`),
};

/** Resolve browser targets from the project's browserslist config. */
function getTargets() {
  const queries = browserslist.loadConfig({ path: __dirname });
  if (queries) return browserslistToTargets(browserslist(queries));
  log.info("No browserslist config found, using fallback targets");
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
    entries.map((entry) => {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) return collectFiles(full);
      return entry.name.endsWith(".css") ? [full] : [];
    }),
  );
  return files.flat();
}

/** Wrap CSS content in an `@layer` block. */
function wrapLayer(css) {
  if (!css) return `@layer ${LAYER}{}\n`;
  return `@layer ${LAYER} {\n\n${css}\n\n}\n`;
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

  for (const warning of result.warnings) {
    log.info(`${relativePath}: ${warning.message}`);
  }

  const output = wrapLayer(result.code.toString().trim());

  await mkdir(dirname(dest), { recursive: true });
  await writeFile(dest, output);

  return { src: relativePath, dest: relativePath };
}

/**
 * Run a full build and return timing info.
 * @returns {Promise<{count: number, elapsed: number}>}
 */
async function runBuild() {
  const start = performance.now();
  await mkdir(DIST_DIR, { recursive: true });

  const targets = getTargets();
  const files = await collectFiles(SRC_DIR);
  const results = await Promise.all(files.map((f) => processFile(f, targets)));

  return { count: results.length, elapsed: performance.now() - start };
}

// ── Watch mode ───────────────────────────────────────────────────────────────

/**
 * Set up a watcher on a directory tree. Registers a recursive `fs.watch`
 * listener on each subdirectory found under `dir`.
 * @param {string} dir
 * @param {(filename: string) => void} onChange
 */
async function watchDirs(dir, onChange) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) await watchDirs(full, onChange);
  }

  const watcher = watch(dir, { recursive: false });
  for await (const event of watcher) {
    if (event.filename?.endsWith(".css")) onChange(event.filename);
  }
}

async function watchMode() {
  let dirty = false;
  let running = false;

  async function rebuild() {
    const { count, elapsed } = await runBuild();
    log.success(`Rebuilt ${count} files in ${elapsed.toFixed(1)}ms`);
  }

  await rebuild();
  log.process("Watching for changes...");

  await watchDirs(SRC_DIR, async () => {
    if (running) {
      dirty = true;
      return;
    }
    running = true;
    await new Promise((r) => setTimeout(r, 50));
    do {
      dirty = false;
      try {
        await rebuild();
      } catch (err) {
        log.error(`Build error: ${err.message}`);
      }
    } while (dirty);
    running = false;
  });
}

// ── One-shot build ───────────────────────────────────────────────────────────

async function oneShot() {
  const { count, elapsed } = await runBuild();
  log.process(`Processing CSS files...`);
  log.success(
    `Done — ${count} files written to dist/ in ${elapsed.toFixed(1)}ms\n`,
  );
}

// ── Entry ────────────────────────────────────────────────────────────────────

if (process.argv.includes("--watch")) {
  watchMode().catch((err) => {
    log.error(`Watch failed: ${err.message}\n`);
    process.exit(1);
  });
} else {
  oneShot().catch((err) => {
    log.error(`Build failed: ${err.message}\n`);
    process.exit(1);
  });
}
