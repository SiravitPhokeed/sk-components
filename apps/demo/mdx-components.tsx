import CodeBlock from "@/app/docs/components/CodeBlock";
import cn from "@/lib/helpers/cn";
import {
  Card,
  Divider,
  Header,
  MaterialIcon,
  Text,
} from "@suankularb-components/react";
import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { list } from "radash";

const components: MDXComponents = {
  a: ({ children, ...props }) => {
    const isExternal = props.href?.startsWith("http");
    const Element = isExternal ? "a" : Link;
    return (
      <Element
        className="link"
        {...(isExternal && { target: "_blank" })}
        {...props}
      >
        {children}
        {isExternal && (
          <MaterialIcon
            icon="arrow_outward"
            size={20}
            directional
            className="-mt-1 inline-block"
          />
        )}
      </Element>
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
    <code
      className={cn(
        language
          ? "py-3.5"
          : "bg-surface-variant rounded-xs px-1.5 text-[0.9em]",
        // Explicitly state font features for Firefox.
        "font-features-['ss01','ss02','ss03','ss04','ss05'] leading-normal tracking-normal",
        className,
      )}
      {...props}
    />
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
