"use client";

// This file is used to re-export Server Components from
// @suankularb-components/react as Client Components for the MDX files in this
// app.

// Only use this file for components not marked as "use client" in the library.
// Components that are already Client Components can be imported directly from
// @suankularb-components/react.

// Other parts of the demo app can import the components directly from
// @suankularb-components/react.

export {
  Actions,
  Card,
  Columns,
  FormItem,
  Progress,
  Section,
  SegmentedButton,
} from "@suankularb-components/react";
