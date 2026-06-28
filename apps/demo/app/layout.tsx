import "@/app/globals.css";
import NavBar from "@/components/NavBar";
import NavDrawer from "@/components/NavDrawer";
import cn from "@/lib/helpers/cn";
import {
  RootLayout as SKCRootLayout,
  ThemeProvider,
} from "@suankularb-components/react";
import type { Metadata } from "next";
import {
  Fira_Code,
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
const monoFont = Fira_Code({ subsets: ["latin"] });

// Icon font
const iconFont = localFont({
  src: "../public/fonts/material-symbols.woff2",
  weight: "100 700",
  style: "normal",
  variable: "--font-icon",
});

export const metadata: Metadata = {
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
        monoFont.className,
        iconFont.variable,
        "antialiased",
      )}
    >
      <head>
        <ThemeProvider />
      </head>
      <SKCRootLayout className="bg-background font-body text-on-background leading-5 tracking-[0.25px]">
        <NavBar />
        <NavDrawer />
        {children}
      </SKCRootLayout>
    </html>
  );
};

export default RootLayout;
