import { MaterialIcon, Text } from "@suankularb-components/react";
import type { FC } from "react";

const NotFound: FC = () => (
  <main className="body:bg-surface-container grid h-screen w-screen place-items-center p-4 pb-20">
    <div className="bg-surface-bright max-w-80 rounded-xl p-6 text-balance">
      <MaterialIcon icon="error" size={40} className="text-secondary mb-4" />
      <Text type="headline-small" element="h1" className="mb-2">
        Page not found
      </Text>
      <Text
        type="body-medium"
        element="p"
        className="text-on-surface-variant mb-4"
      >
        The page you are looking for does not exist.
      </Text>
      <Text type="body-medium">
        <a
          href="https://github.com/suankularb-wittayalai-school/sk-components/issues"
          target="_blank"
          className="link"
        >
          Report broken link
        </a>
      </Text>
    </div>
  </main>
);

export default NotFound;
