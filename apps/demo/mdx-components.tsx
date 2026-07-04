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
      className="font-display my-4 px-4 py-1 [&_strong]:text-primary"
    >
      <Text type="title-medium" {...props} />
    </Card>
  ),
  pre: ({ className, ...props }) => (
    <Card
      appearance="filled"
      element="pre"
      className={cn("my-4 block overflow-x-auto p-4 text-base", className)}
      {...props}
    />
  ),
  code: ({ "data-language": dataLanguage, className, ...props }) =>
    dataLanguage ? (
      <code className={className} {...props} />
    ) : (
      <code
        className={cn(
          "bg-surface-variant rounded-xs px-1.5 font-mono text-[0.9em]",
          className,
        )}
        {...props}
      />
    ),
  ul: (props) => <ul className="list-disc ps-6" {...props} />,
  li: (props) => <li className="mb-1" {...props} />,
  p: (props) => <p className="my-2" {...props} />,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
