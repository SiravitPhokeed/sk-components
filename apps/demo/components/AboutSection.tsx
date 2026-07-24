import { Columns, Header, Section, Text } from "@suankularb-components/react";
import Image from "next/image";
import type { FC } from "react";

const AboutSection: FC = () => (
  <Columns columns={6}>
    <Image
      src="/images/logo.svg"
      width={48}
      height={48}
      priority
      alt="SK Components logo: blue square with text “SKC” with decorations"
      className="drop-shadow-5 mx-4 w-20 sm:mx-0 sm:w-full"
    />

    <Section className="col-span-2 sm:col-span-3 md:col-span-5">
      <Header>What is SKCom?</Header>
      <Text type="body-large" element="p">
        <strong>
          SK Components (“SKCom”) is a component library built on{" "}
          <a href="https://m3.material.io/" target="_blank" className="link">
            Material Design 3
          </a>
          .
        </strong>{" "}
        It provides components that follow Material Design principles, and was
        originally created for{" "}
        <a href="https://www.sk.ac.th/" target="_blank" className="link">
          Suankularb Wittayalai School
        </a>
        &rsquo;s family of applications.
      </Text>
      <Text type="body-large" element="p">
        There are currently 2 official SKCom libraries:{" "}
        <strong>SK Component Styles</strong> (
        <code className="code">@suankularb-components/css</code>) and{" "}
        <strong>React SK Components</strong> (
        <code className="code">@suankularb-components/react</code>
        ).
      </Text>
    </Section>
  </Columns>
);

export default AboutSection;
