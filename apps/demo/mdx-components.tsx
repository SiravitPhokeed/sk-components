import cn from "@/lib/helpers/cn";
import { Card, Header, Text } from "@suankularb-components/react";
import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { list } from "radash";

const components: MDXComponents = {
  a: (props) => {
    const Element = props.href?.startsWith("/") ? Link : "a";
    return <Element className="text-primary font-bold underline" {...props} />;
  },
  ...Object.fromEntries(
    list(2, 6).map((level) => [
      `h${level}`,
      (props) => <Header level={level} className="mt-6 mb-3" {...props} />,
    ]),
  ),
  blockquote: (props) => (
    <Card
      appearance="filled"
      element="blockquote"
      className="font-display [&_code]:bg-surface-bright [&_strong]:text-primary my-4 px-4 py-1"
    >
      <Text type="title-medium" {...props} />
    </Card>
  ),
  pre: ({ className, ...props }) => (
    <Card
      appearance="filled"
      element="pre"
      className={cn(
        "my-4 block overflow-x-auto text-base [&_code]:bg-transparent",
        className,
      )}
      {...props}
    />
  ),
  code: ({ "data-language": language, className, ...props }) => (
    <code
      className={cn(
        language
          ? "w-fit p-4"
          : "bg-surface-variant rounded-xs px-1.5 text-[0.9em]",
        "tracking-normal",
        className,
      )}
      {...props}
    />
  ),
  ul: (props) => (
    <ul className="*:marker:text-outline list-disc ps-6" {...props} />
  ),
  ol: (props) => (
    <ol
      className="*:marker:text-on-surface-variant *:marker:font-display list-decimal ps-6"
      {...props}
    />
  ),
  li: (props) => <li className="mb-1" {...props} />,
  p: (props) => <p className="my-2" {...props} />,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
