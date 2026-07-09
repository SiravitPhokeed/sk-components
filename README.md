# Suankularb Components

<p>
<picture>
  <source
    srcset="https://github.com/user-attachments/assets/4cbbe01a-12a7-4544-9444-71ea7a42803e"
    media="(prefers-color-scheme: dark)"
  >
  <img alt="" src="https://github.com/user-attachments/assets/d27c5edb-3803-49ff-bf0d-d59b1eb47811">
</picture>
</p>

SK Components is a design system consisting of tokens and components created
with the goal of a consistent and harmonious experience across all Suankularb
features and applications.

This repository is a monorepo consisting of the SKCom libraries and a demo
application. You can find those in the directories listed below:

| Library/Application | Location         |
| ------------------- | ---------------- |
| Demo application    | `apps/demo`      |
| SKCom Styles (CSS)  | `packages/css`   |
| ReSKCom (React)     | `packages/react` |

## Resources

- [The full API reference for ReSKCom](https://sk-components-demo.mysk.school/docs).
- Interact with the examples from the documentation with the
  [demo app](#demo-application).

## Using SKCom

> [!NOTE]
>
> SKCom Styles is not designed to be installed in apps. Below is how
> you can use ReSKCom in a React project.

### Installation

You can install ReSKCom in a React project with the following:

```bash
npm install @suankularb-components/react
```

```bash
pnpm add @suankularb-components/react
```

### Setup

> [!TIP]
>
> If you’re using the
> [Suankularb Next.js Template](https://github.com/suankularb-wittayalai-school/sk-nextjs-template),
> ReSKCom is already installed and set up.

**Check out the
[getting started guide](https://sk-components-demo.mysk.school/docs/guides/getting-started)
for more information** on how to set up ReSKCom in your project. If you are
using Next.js, see the
[App Router guide](https://sk-components-demo.mysk.school/docs/guides/nextjs-app)
or the
[Pages Router guide](https://sk-components-demo.mysk.school/docs/guides/nextjs-pages).
Tailwind CSS users: check out the
[Tailwind CSS guide](https://sk-components-demo.mysk.school/docs/guides/tailwindcss-v4).

To summarize, you need to:

- Make sure you are on React 18 or higher.
- Fonts are not included in the library. If you are using the default theme,
  install [Inter](https://fonts.google.com/specimen/Inter),
  [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk),
  [Sarabun](https://fonts.google.com/specimen/Sarabun), and
  [IBM Plex Sans Thai](https://fonts.google.com/specimen/IBM+Plex+Sans+Thai)
  from Google Fonts.
- Install the Material Symbols Outlined font. The
  [getting started guide](https://sk-components-demo.mysk.school/docs/guides/getting-started)
  has a tool to download the font.
- To use the default theme, simply add `<ThemeProvider />` to your app.
- Root Layout must enclose all pages.

### Example

```tsx
import {
  Button,
  ContentLayout,
  PageHeader,
  RootLayout,
  Text,
  ThemeProvider,
} from "@suankularb-components/react";
import { snackbar } from "@suankularb-components/react/helpers";

const App = () => (
  <>
    <ThemeProvider />
    <RootLayout>
      <PageHeader>Hello world!</PageHeader>
      <ContentLayout>
        <Text type="body-large">Welcome to SK Components.</Text>
        <Button
          appearance="filled"
          onClick={() => snackbar.push("Hello, world!")}
        >
          Click me!
        </Button>
      </ContentLayout>
    </RootLayout>
  </>
);
```

## Developing SKCom

Install dependencies for the monorepo first.

```bash
pnpm install
```

**When developing, run this command to watch for changes in the packages** and
rebuild them automatically. Changes in `packages/css` and `packages/react` will
be reflected in the demo app.

```bash
pnpm dev
```

If you need to build the packages individually, you can run the following commands.

```bash
pnpm --filter @suankularb-components/css build
pnpm --filter @suankularb-components/react build
```

**To work on the documentation,** build the packages first, then start just the
Next.js server for the demo app.

```bash
pnpm build
pnpm --filter demo dev
```

To view a production build of the demo app, run the following.

```bash
pnpm build
pnpm --filter demo start
```

### Demo application

<p>
<picture>
  <source
    srcset="https://github.com/user-attachments/assets/2c2f3cb9-ac66-41ae-bf2a-b5630050039d"
    media="(prefers-color-scheme: dark)"
  >
  <img
    alt="A screenshot of the About page of the demo application."
    src="https://github.com/user-attachments/assets/c46eeb00-3b1c-44af-a9f8-6208c1cd5589"
  >
</picture>
</p>

After starting the development server, you can access the demo application
locally. Go to [`http://localhost:3000/`](http://localhost:3000/).

You can interact with the examples in the documentation here, or dive deeper
into how the examples are created by studying `apps/demo`.
