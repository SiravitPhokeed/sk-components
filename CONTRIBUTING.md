# Contributing to SK Components

Thank you for your interest in contributing to SK Components.

> Below are guidelines for contributing to the SK Components monorepo. If you
> just want to report an issue or request a feature, use the
> [issue tracker](https://github.com/suankularb-wittayalai-school/sk-components/issues).
> Thank you!

## Style guidelines

- Run Prettier before committing. Use `pn format`.
- Use Title Case when referring to components in documentation and commit
  messages.
  - e.g. Full-screen Dialog, not FullscreenDialog or full-screen dialog.
- Use Sentence case for headers.
- Put prop names in codeblocks in documentation.
  - e.g. `onClick` instead of onClick.
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
- Use the present tense (“Add feature” not “Added feature”).
- Don’t use backticks.

### Pull requests and changelogs

- For pull requests and `CHANGELOG.md` entries, follow [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) guidelines.
- SKCom Styles and ReSKCom use the changelog at the root.
- The demo app uses its own changelog in `apps/demo/CHANGELOG.md`.

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
  - The JSDoc on the component, for each prop, must use the first few sentences of the JSDoc in the interface, verbatim. Remove line wraps.

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
