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
            className="rtl:flip-x -mt-1 inline-block"
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
    <Card
      appearance="filled"
      element="blockquote"
      className="font-display [&_code]:bg-surface-bright [&_strong]:text-on-surface my-4 px-4 *:*:first:mt-3 *:*:last:mb-3"
    >
      <Text type="title-medium" {...props} />
    </Card>
  ),
  pre: ({ className, ...props }) => (
    <Card
      appearance="filled"
      element={(props) => <pre {...props} dir="ltr" />}
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
        // Explicitly state font features for Firefox.
        "font-features-['ss01','ss02','ss03','ss04','ss05'] tracking-normal",
        className,
      )}
      {...props}
    />
  ),
  hr: () => <Divider className="my-3" />,
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
