"use client";

import {
  Button,
  Columns,
  Header,
  MaterialIcon,
  MenuItem,
  Section,
  SegmentedButton,
  Select,
  TextField,
  type TextFieldProps,
} from "@suankularb-components/react";
import type { FC } from "react";
import { useState } from "react";

const TEXT_FIELD_TYPES: TextFieldProps["type"][] = [
  "color",
  "date",
  "datetime-local",
  "email",
  "month",
  "number",
  "password",
  "search",
  "tel",
  "text",
  "time",
  "url",
  "week",
];

const TextFieldSection: FC = () => {
  const [appearance, setAppearance] =
    useState<TextFieldProps["appearance"]>("outlined");

  const [name, setName] = useState("");
  const [partyList, setPartyList] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [weight, setWeight] = useState("");
  const [_document, setDocument] = useState<File>();
  const [birthdate, setBirthdate] = useState("");
  const [policies, setPolicies] = useState("");

  const [type, setType] = useState<TextFieldProps["type"]>("datetime-local");

  return (
    <Section>
      <Header>Text Field</Header>

      <section className="mb-4 space-y-3">
        <SegmentedButton alt="Text Field appearance">
          <Button
            appearance="outlined"
            selected={appearance === "outlined"}
            onClick={() => setAppearance("outlined")}
          >
            Outlined
          </Button>
          <Button
            appearance="outlined"
            selected={appearance === "filled"}
            onClick={() => setAppearance("filled")}
          >
            Filled
          </Button>
        </SegmentedButton>

        <p className="text-balance">
          For demonstration purposes only. Real Text Fields should not change
          appearance once rendered.
        </p>
      </section>

      <Columns columns={3} className="gap-y-8! pb-8">
        <TextField<string>
          appearance={appearance}
          label="Candidate name"
          leading={<MaterialIcon icon="person" />}
          helperMsg="Full name and surname of candidate"
          required
          value={name}
          onChange={setName}
        />
        <TextField<string>
          appearance={appearance}
          label="Email"

          align="right"
          leading={<MaterialIcon icon="email" />}
          trailing="@student.sk.ac.th"
          required
          error={email.includes("@")}
          value={email}
          onChange={(value) => setEmail(value.replace("@student.sk.ac.th", ""))}
          inputAttr={{ autoCorrect: "off", autoCapitalize: "none" }}
        />
        <TextField<string>
          appearance={appearance}
          label="Tel."
          type="tel"
          leading={<MaterialIcon icon="phone" />}
          value={phone}
          onChange={setPhone}
        />
        <TextField<string>
          appearance={appearance}
          label="Facebook"
          leading={<MaterialIcon icon="forum" />}
          disabled
        />
        <TextField<string>
          appearance={appearance}
          label="Candidate weight"
          type="number"
          leading={<MaterialIcon icon="monitor_weight" />}
          trailing="kg"
          error={Number.isNaN(Number(weight)) || Number(weight) < 0}
          value={weight}
          onChange={setWeight}
          inputAttr={{ step: 0.5, min: 0 }}
        />
        <TextField<string>
          appearance={appearance}
          label="Birthdate"
          type="date"
          leading={<MaterialIcon icon="cake" />}
          value={birthdate}
          onChange={setBirthdate}
        />
        <TextField<File>
          appearance={appearance}
          label="Founding document"
          type="file"
          leading={<MaterialIcon icon="attach_file" />}
          onChange={setDocument}
          inputAttr={{
            accept:
              "application/msword, \
              application/vnd.openxmlformats-officedocument.wordprocessingml.document, \
              application/pdf",
          }}
        />
        <TextField<string>
          appearance={appearance}
          label="Party list"
          behavior="multi-line"
          leading={<MaterialIcon icon="groups" />}
          helperMsg="Full name and surname of Kornor candidates"
          value={partyList}
          onChange={setPartyList}
          className="col-start-1 sm:col-end-3"
        />
        <TextField<string>
          appearance={appearance}
          label="Policies"
          behavior="textarea"
          helperMsg="A full list of this party’s policies"
          value={policies}
          onChange={setPolicies}
          className="sm:col-span-2"
        />
      </Columns>

      <p className="mb-4 text-balance">
        Choose a Text Field type to see how it looks. Note that some types may
        not be supported on all browsers, in which case a placeholder message
        and a validation pattern will take effect instead.
      </p>

      <Columns columns={3} className="gap-y-8!">
        <Select<Required<TextFieldProps>["type"]>
          appearance={appearance}
          label="Text Field type"
          value={type}
          onChange={setType}
          className="[&_.skc-select\_\_value]:font-mono!"
        >
          {TEXT_FIELD_TYPES.map((itrType) => (
            <MenuItem
              key={itrType}
              selected={itrType === type}
              value={itrType}
              className="[&_.skc-menu-item\_\_label]:font-mono!"
            >
              {itrType}
            </MenuItem>
          ))}
        </Select>
        <TextField appearance={appearance} label="Label" type={type} />
      </Columns>
    </Section>
  );
};

export default TextFieldSection;
