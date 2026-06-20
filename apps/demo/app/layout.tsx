import "@/app/globals.css";
import cn from "@/lib/helpers/cn";
import "@suankularb-components/css/tokens.css";
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
        iconFont.className,
        "antialiased",
      )}
    >
      <body className="bg-background font-body">{children}</body>
    </html>
  );
};

export default RootLayout;
