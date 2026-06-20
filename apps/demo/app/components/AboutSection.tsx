import { Columns, Header, Section } from "@suankularb-components/react";
import Image from "next/image";
import type { FC } from "react";

const AboutSection: FC = () => (
  <Columns columns={6}>
    {/* Left side: logo (not shown on mobile) */}
    <Image
      src="/images/logo.svg"
      width={48}
      height={48}
      priority
      alt="SK Components logo: blue square with text “SKC” with decorations"
      className="drop-shadow-5 hidden w-full sm:block"
    />

    {/* Right side: text */}
    <Section className="col-span-2 sm:col-span-3 md:col-span-5">
      <Header>What is SKCom?</Header>
      <p>
        <strong>SK Components (“SKCom”) is a design system</strong> consisting
        of tokens and components created with the goal of a{" "}
        <strong>
          consistent and harmonious experience across all Suankularb features
        </strong>{" "}
        and applications.
      </p>
      <p>
        There are currently 2 official SKCom libraries:{" "}
        <strong>SK Component Styles</strong> (
        <code className="bg-surface-variant text-on-surface-variant rounded-xs px-1 font-mono">
          @suankularb-components/css
        </code>
        ) and <strong>React SK Components</strong> (
        <code className="bg-surface-variant text-on-surface-variant rounded-xs px-1 font-mono">
          @suankularb-components/react
        </code>
        ).
      </p>
    </Section>
  </Columns>
);

export default AboutSection;
