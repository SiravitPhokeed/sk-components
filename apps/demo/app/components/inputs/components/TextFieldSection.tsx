"use client";

import {
  Actions,
  Button,
  Card,
  CardContent,
  Columns,
  Header,
  MaterialIcon,
  MenuItem,
  Section,
  SegmentedButton,
  Select,
  Text,
  TextField,
  type TextFieldProps,
} from "@suankularb-components/react";
import type { FC, SubmitEventHandler } from "react";
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

  const [type, setType] = useState<TextFieldProps["type"]>("datetime-local");

  const [submitted, setSubmitted] = useState<Record<
    string,
    FormDataEntryValue
  > | null>(null);
  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const obj: Record<string, FormDataEntryValue> = {};
    data.forEach((value, key) => (obj[key] = value));
    setSubmitted(obj);
  };

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

        <Text type="body-medium" element="p" className="text-balance">
          For demonstration purposes only. Real Text Fields should not change
          appearance once rendered.
        </Text>
      </section>

      <form onSubmit={handleSubmit}>
        <Columns columns={3} className="gap-y-8 pb-8">
          <TextField<string>
            name="candidate-name"
            appearance={appearance}
            label="Candidate name"
            leading={<MaterialIcon icon="person" />}
            helperMsg="Full name and surname of candidate"
            required
          />
          <TextField<string>
            name="email"
            appearance={appearance}
            label="Email"
            align="right"
            leading={<MaterialIcon icon="email" />}
            trailing="@student.sk.ac.th"
            required
            inputAttr={{
              autoCorrect: "off",
              autoCapitalize: "none",
              pattern: "^(?!.*@).*$",
            }}
          />
          <TextField<string>
            name="phone"
            appearance={appearance}
            label="Tel."
            type="tel"
            leading={<MaterialIcon icon="phone" />}
            inputAttr={{
              pattern: "^(\\+66|0)[0-9]{8,9}$",
              inputMode: "numeric",
            }}
          />
          <TextField<string>
            name="facebook"
            appearance={appearance}
            label="Facebook"
            leading={<MaterialIcon icon="forum" />}
            disabled
          />
          <TextField<string>
            name="weight"
            appearance={appearance}
            label="Candidate weight"
            type="number"
            leading={<MaterialIcon icon="monitor_weight" />}
            trailing="kg"
            inputAttr={{ step: 0.5, min: 0 }}
          />
          <TextField<string>
            name="birthdate"
            appearance={appearance}
            label="Birthdate"
            type="date"
            leading={<MaterialIcon icon="cake" />}
          />
          <TextField<File>
            name="document"
            appearance={appearance}
            label="Founding document"
            type="file"
            leading={<MaterialIcon icon="attach_file" />}
            inputAttr={{
              accept: [
                "application/msword",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                "application/pdf",
              ].join(", "),
            }}
          />
          <TextField<string>
            name="party-list"
            appearance={appearance}
            label="Party list"
            behavior="multi-line"
            leading={<MaterialIcon icon="groups" />}
            helperMsg="Full name and surname of Kornor candidates"
            className="col-start-1 sm:col-end-3"
          />
          <TextField<string>
            name="policies"
            appearance={appearance}
            label="Policies"
            behavior="textarea"
            helperMsg="A full list of this party's policies"
            className="sm:col-span-2"
          />
          <Actions className="col-span-full">
            <Button
              appearance="outlined"
              type="reset"
              onClick={() => setSubmitted(null)}
            >
              Reset
            </Button>
            <Button appearance="filled" type="submit">
              Submit
            </Button>
          </Actions>
        </Columns>
      </form>

      {submitted && (
        <Card appearance="filled" className="mb-8">
          <CardContent className="font-mono whitespace-pre-wrap">
            {JSON.stringify(submitted, null, 2)}
          </CardContent>
        </Card>
      )}

      <Text type="body-medium" element="p" className="mb-4">
        Choose a Text Field type to see how it looks. Note that some types may
        not be supported on all browsers, in which case a placeholder message
        and a validation pattern will take effect instead.
      </Text>

      <Columns columns={3} className="gap-y-8!">
        <Select<Required<TextFieldProps>["type"]>
          appearance={appearance}
          label="Text Field type"
          value={type}
          onChange={setType}
          className="[&_.skc-select\_\_value]:font-mono"
        >
          {TEXT_FIELD_TYPES.map((itrType) => (
            <MenuItem
              key={itrType}
              selected={itrType === type}
              value={itrType}
              className="[&_.skc-menu-item\_\_label]:font-mono"
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
