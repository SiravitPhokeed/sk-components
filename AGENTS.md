# SK Components

pnpm monorepo with `packages/` (css, react) and `apps/` (demo).

## Conventions

- **Commits:** [conventional commits](https://www.conventionalcommits.org/),
  subject ≤50 chars.

  Types: `build` `chore` `ci` `docs` `feat` `fix` `perf` `refactor` `revert` `style` `test` `merge`.

  Don’t use PascalCase for component names in commit messages.
  For example, use “Full-screen Dialog” instead of “FullscreenDialog”.

- **Formatting:** Prettier with `prettier-plugin-css-order` and
  `prettier-plugin-tailwindcss`. Run `pnpm format`.

## Wiki

If the user has the `.wiki` directory in their repo, you should check it
(`/wiki:query`) for project research, decisions, and background before major
changes. If the user does not have a `.wiki` directory, you can ignore this
step.
