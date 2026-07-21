import "@/app/styles/globals.css";
import NavBar from "@/components/NavBar";
import NavDrawer from "@/components/NavDrawer";
import { BASE_URL } from "@/lib/constants";
import cn from "@/lib/helpers/cn";
import {
  RootLayout as SKCRootLayout,
  ThemeProvider,
} from "@suankularb-components/react";
import type { Metadata } from "next";
import {
  IBM_Plex_Sans_Thai,
  Inter,
  Sarabun,
  Space_Grotesk,
} from "next/font/google";
import localFont from "next/font/local";
import type { FC, ReactNode } from "react";

// English fonts
const bodyFontEN = Inter({ subsets: ["latin"] });
const displayFontEN = Space_Grotesk({ subsets: ["latin"] });

// Thai fonts
const bodyFontTH = Sarabun({
  weight: ["300", "400", "500", "700"],
  subsets: ["thai"],
});
const displayFontTH = IBM_Plex_Sans_Thai({
  weight: ["300", "400", "500", "700"],
  subsets: ["thai"],
});

// Mono font
const monoFont = localFont({
  src: "../public/fonts/commit-mono.woff2",
  style: "normal",
  variable: "--font-mono",
});

// Icon font
const iconFont = localFont({
  src: "../public/fonts/material-symbols.woff2",
  weight: "100 700",
  style: "normal",
  variable: "--font-icon",
  display: "block",
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "SK Components",
    template: "%s - SK Components",
  },
  description: "Demo of @suankularb-components/react",
};

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <html
      lang="en"
      className={cn(
        bodyFontEN.className,
        displayFontEN.className,
        bodyFontTH.className,
        displayFontTH.className,
        monoFont.variable,
        // Use locally installed Material Symbols font in development, as the
        // optimized `localFont` does not have all icons, which is annoying for
        // development.
        (process.env.NODE_ENV === "production" ||
          // Set ALWAYS_USE_OPTIMIZED_ICON_FONT to "true" to force the optimized
          // font even in development.
          process.env.ALWAYS_USE_OPTIMIZED_ICON_FONT === "true") &&
          iconFont.variable,
        "antialiased",
      )}
    >
      <head>
        <ThemeProvider />
      </head>
      <SKCRootLayout>
        <NavBar />
        <NavDrawer />
        {children}
      </SKCRootLayout>
    </html>
  );
};

export default RootLayout;
