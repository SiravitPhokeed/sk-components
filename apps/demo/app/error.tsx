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
  const isClientError = !error.digest;
  const splitDigest = error.digest
    ? // XXXX XXX XXX …
      [
        error.digest.slice(0, 4),
        ...(error.digest.slice(4).match(/.{1,3}/g) || []),
      ].join(" ")
    : null;

  return (
    <main className="body:bg-surface-container flex h-screen w-screen flex-col items-center justify-center gap-2 p-4">
      <div className="bg-surface-bright mb-4 max-w-80 rounded-xl p-6 text-balance">
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
          A {isClientError ? "client error" : "server error"} occurred. Reload
          to try again.
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

      {isClientError ? (
        <details className="text-on-surface-variant px-48 not-open:mb-8">
          <Text
            type="title-small"
            element="summary"
            className="relative z-10 cursor-default text-center text-balance marker:hidden"
          >
            <code className="text-[0.9em]">{error.name}</code>: {error.message}
          </Text>
          <Text
            type="body-small"
            element="pre"
            className="-mt-3 max-h-100 overflow-y-auto mask-y-from-transparent mask-y-from-0 mask-y-to-black mask-y-to-6 py-6 font-mono leading-normal whitespace-pre-wrap"
          >
            {error.stack}
          </Text>
        </details>
      ) : (
        <Text type="title-small" className="text-on-surface-variant mb-8 block">
          <code>ERROR • {splitDigest}</code>
        </Text>
      )}
    </main>
  );
}
