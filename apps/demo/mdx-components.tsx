import CodeBlock from "@/app/docs/components/CodeBlock";
import cn from "@/lib/helpers/cn";
import { Card, Divider, Header, Text } from "@suankularb-components/react";
import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { list } from "radash";

const components: MDXComponents = {
  a: ({ href, ...props }) => {
    const isExternal = href?.startsWith("http");
    const Element = isExternal ? "a" : Link;
    return (
      <Element
        className="link"
        href={href}
        {...(isExternal && { target: "_blank" })}
        {...props}
      />
    );
  },
  ...Object.fromEntries(
    list(2, 6).map((level) => [
      `h${level}`,
      (props) => <Header level={level} className="mt-6 mb-3" {...props} />,
    ]),
  ),
  blockquote: (props) => (
    <Card appearance="filled" element="blockquote" className="blockquote">
      <Text type="title-medium" {...props} />
    </Card>
  ),
  code: ({ "data-language": language, className, ...props }) => (
    <code className={cn(!language && "code", className)} {...props} />
  ),
  hr: () => <Divider className="my-3" />,
  ul: (props) => <ul className="ul" {...props} />,
  ol: (props) => <ol className="ol" {...props} />,
  p: (props) => <p className="my-2" {...props} />,
  figure: (props) => <CodeBlock {...props} />,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
