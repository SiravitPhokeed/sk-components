# Contributing to SK Components

Thank you for your interest in contributing to SK Components.

> Below are guidelines for contributing to the SK Components monorepo. If you
> just want to report an issue or request a feature, use the
> [issue tracker](https://github.com/suankularb-wittayalai-school/sk-components/issues).
> Thank you!

## Getting started

This project is a [pnpm](https://pnpm.io/) monorepo.

Install dependencies for the monorepo first. To use the demo app, also install
the [Material Symbols Outlined font](https://fonts.google.com/download?family=Material%20Symbols%20Outlined)
onto your system.

```bash
pnpm install
```

**When developing, run this command to watch for changes in the packages** and
rebuild them automatically. Changes in `packages/css` and `packages/react` will
be reflected in the demo app.

> [!WARNING]
>
> The development build marks all components as Client Components.

```bash
pnpm dev
```

<details>
  <summary>
    <strong>
      Material Icons aren’t showing up?
    </strong>
  </summary>
  <p>
    Your browser may be blocking locally installed fonts from loading in an
    effort to prevent fingerprinting.
  </p>
  <ul>
    <li>Set the environment variable
      <code>ALWAYS_USE_OPTIMIZED_ICON_FONT=true</code> to use the optimized
      icon font instead of the local font.
    </li>
    <li>
      Run `pnpm demo:icons` to generate the optimized icon font.
    </li>
  </ul>
</details>

**To work on the documentation,** build the packages first, then start just the
Next.js server for the demo app.

```bash
pnpm build
pnpm demo:dev
```

To view a production build of the demo app, run the following.

```bash
pnpm build
pnpm demo:start
```

> [!IMPORTANT]
>
> The icon file is optimized to include only the icons used in the library or
> demo app. If you add or remove icons, run `pnpm demo:icons` to update the icon
> file.

## Style guidelines

- Run Prettier before committing. Use `pnpm format`.
- Use Title Case when referring to components in documentation and commit
  messages.
  - e.g. Full-screen Dialog, not FullscreenDialog or full-screen dialog.
- Use Sentence case for headers.
- Put prop names in codeblocks in documentation.
  - e.g. `onClick` instead of onClick.
- Use American English in documentation and commit messages.
  - e.g. behavior, not behaviour.
- Use smart quotes in documentation and commit messages. In JSX, escape them
  with `&ldquo;`, `&rdquo;`, etc.
  - e.g. `isn’t` instead of `isn't` (notice the apostrophe).

### Git commit messages

- Follow the
  [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
  specification.
- Prefix your commit message with one of
  [this list of commit types](https://github.com/pvdlg/conventional-changelog-metahub/blob/master/README.md#commit-types).
  - e.g. `feat: add Button` or `fix: disabled Button still fires onClick`.
- Use the `merge:` prefix for merge commits.
  - e.g. `merge: pull request #123` or `merge: update from main`
- Add a scope after the commit type, if applicable.
  - `(css)` for SKCom Styles changes.
  - `(react)` for ReSKCom changes.
  - `(demo)` for demo app changes.
  - `(docs)` for documentation changes inside the demo app.
  - e.g. `feat(css): add hover state to Button`
- Keep the subject line not exceeding 50 characters.
  - If you need to add more information, add a body after the subject line.
- Use the present tense (“add feature” not “added feature”).
- Don’t use backticks.

### Changelogs

- For `CHANGELOG.md` entries, follow [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
  guidelines.
- SKCom Styles and ReSKCom use the changelog at the root.
- The demo app uses its own changelog in `apps/demo/CHANGELOG.md`.

### Pull requests

- Use version branches as the base branch for your pull request.
- The pull request title should start with the version number and use “Title Case.” Keep it short.
  - e.g. `[4.0.1] Button`.
- If the pull request is not a feature, use the full name of a commit type.
  - e.g. `[4.0.1] Documentation: Button Usage`.
- The pull request body should follow Keep a Changelog guidelines.
  - Unlike the codebase, PR bodies do not need to wrap at 80 characters.
- When a version is ready to be released, create a pull request to merge the version branch into
  `main`.
  - e.g. `Release 4.0.1`.

### ReSKCom guidelines

- Use PascalCase for component names in code.
  - e.g. `Button`, not `button`.
- `className` comes before `style`.
- Create a `STRINGS` object with keys `en-US` and `th` for all string constants in the component.

```ts
const STRINGS = {
  "en-US": {
    loading: "Loading…",
  },
  th: {
    loading: "กำลังโหลด…",
  },
};
```

## Documentation

- Component documentation is stored in four places:
  - In SKCom Styles:
    - The top of the component’s CSS file.
  - In ReSKCom:
    - The JSDoc for each prop in the component’s props interface.
    - The JSDoc for the component itself.
  - In the demo app:
    - The component documentation page in the `docs` folder.
- **Keep the documentation in sync across all four places.** If you need to
  update the documentation, update it in all four places.
  - The JSDoc in the interface and the component documentation must exactly
    match, _verbatim_ (except for line wraps).
  - The JSDoc on the component, for each prop, must use the first few sentences
    of the JSDoc in the interface, verbatim. Remove line wraps.
  - **Exception:** The “Usage” section in the component documentation page in
    the demo app is _not_ synced.

## Templates

```tsx
import cn from "@/lib/helpers/cn";
import type { ElementCustomizableProps, StyleableFC } from "@/lib/types";
import "@suankularb-components/css/button.css";
import type { ReactNode } from "react";

/**
 * Props for {@link Button}.
 */
export interface ButtonProps extends ElementCustomizableProps {
  /**
   * The text displayed inside the Button.
   *
   * - Must be a React Node, e.g., a string or an element.
   * - Always required.
   */
  children?: ReactNode;
}

const STRINGS = {};

/**
 * Button helps users take action, whether it’s logging in, liking a post, or
 * going to a page.
 *
 * @param children The text displayed inside the Button.
 */
export const Button: StyleableFC<ButtonProps> = ({
  children,
  element: Element = "button",
  className,
  style,
}) => (
  <Element className={cn("skc-button", className)} style={style}>
    {children}
  </Element>
);
```
