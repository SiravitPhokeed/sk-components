import { Columns, Header, Section, Text } from "@suankularb-components/react";
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
      <Text type="body-medium" element="p">
        <strong>SK Components (“SKCom”) is a design system</strong> consisting
        of tokens and components created with the goal of a{" "}
        <strong>
          consistent and harmonious experience across all Suankularb features
        </strong>{" "}
        and applications.
      </Text>
      <Text
        type="body-medium"
        element="p"
        className="[&_code]:bg-surface-variant [&_code]:rounded-xs [&_code]:px-1 [&_code]:font-bold"
      >
        There are currently 2 official SKCom libraries:{" "}
        <strong>SK Component Styles</strong> (
        <code>@suankularb-components/css</code>) and{" "}
        <strong>React SK Components</strong> (
        <code>@suankularb-components/react</code>
        ).
      </Text>
    </Section>
  </Columns>
);

export default AboutSection;
