"use client";

import download from "@/lib/helpers/download";
import {
  Actions,
  Button,
  Card,
  CardHeader,
  MaterialIcon,
  Text,
} from "@suankularb-components/react";
import { snackbar } from "@suankularb-components/react/helpers";
import { try as tryCatch } from "radash";
import type { FC, ReactNode } from "react";

const PromptCard: FC<{
  children: ReactNode;
  title: string;
  prompt: string;
}> = ({ children, title, prompt }) => {
  async function handleCopy() {
    const [error] = await tryCatch(() =>
      navigator.clipboard.writeText(prompt),
    )();
    if (error) snackbar.push("Failed to copy prompt");
    else snackbar.push("Prompt copied to clipboard");
  }

  async function handleDownload() {
    const blob = new Blob([prompt], { type: "text/markdown" });
    await download(blob, "skcom-v3-to-v4-migration.md", "text/markdown");
    snackbar.push("Prompt downloaded");
  }

  return (
    <Card
      appearance="filled"
      className="text-on-surface/80 before:from-secondary before:to-primary from-secondary-container to-primary-container **:[h2,p]:light:mix-blend-plus-darker relative my-4 bg-linear-135 before:absolute before:inset-0 before:-z-10 before:bg-linear-135 before:opacity-60 before:blur-md before:[animation-duration:3s] before:motion-safe:animate-pulse contrast-more:bg-none **:[h2,p]:dark:opacity-75 **:[h2,p]:dark:mix-blend-plus-lighter"
    >
      <CardHeader
        icon={<MaterialIcon icon="robot_2" className="text-secondary" />}
        title={title}
        level={2}
      />
      <Text
        type="title-medium"
        element="div"
        className="p-4 pt-0 md:text-balance"
      >
        {children}
        <Actions className="mt-4 sm:grid sm:justify-stretch md:flex md:justify-end">
          <Button
            appearance="outlined"
            icon={<MaterialIcon icon="download" />}
            onClick={handleDownload}
          >
            Download
          </Button>
          <Button
            appearance="filled"
            icon={<MaterialIcon icon="content_copy" />}
            onClick={handleCopy}
          >
            Copy prompt
          </Button>
        </Actions>
      </Text>
    </Card>
  );
};

export default PromptCard;
