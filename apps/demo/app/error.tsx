"use client";

import {
  Actions,
  Button,
  MaterialIcon,
  Text,
} from "@suankularb-components/react";
import { useState } from "react";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  const [retrying, setRetrying] = useState(false);

  return (
    <main className="body:bg-surface-container flex h-screen w-screen flex-col items-center justify-center gap-2 p-4 pb-8">
      <div className="bg-surface-bright max-w-80 rounded-xl p-6 text-balance">
        <MaterialIcon
          icon="warning"
          size={40}
          className="text-secondary mb-4"
        />
        <Text type="headline-small" element="h1" className="mb-2">
          This page couldn&rsquo;t load
        </Text>
        <Text
          type="body-medium"
          element="p"
          className="text-on-surface-variant mb-8"
        >
          A server error occurred. Reload to try again.
        </Text>

        <Actions align="left">
          <Button
            appearance="filled"
            loading={retrying}
            onClick={() => {
              setRetrying(true);
              // Attempt to recover by re-fetching and re-rendering the segment.
              unstable_retry();
            }}
          >
            Try again
          </Button>
          <Button
            appearance="outlined"
            disabled={retrying}
            href="https://github.com/suankularb-wittayalai-school/sk-components/issues"
            element={(props) => <a {...props} target="_blank" />}
          >
            Report
          </Button>
        </Actions>
      </div>

      <Text type="label-large" className="text-on-surface-variant mt-4 grid">
        <code>
          {error.name} • {error.digest}
        </code>
      </Text>
    </main>
  );
}
