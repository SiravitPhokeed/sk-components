"use client";

import {
  ChipField,
  ChipSet,
  Header,
  InputChip,
  Section,
} from "@suankularb-components/react";
import { snackbar } from "@suankularb-components/react/helpers";
import type { FC } from "react";
import { useState } from "react";

const ChipFieldSection: FC = () => {
  const [value, setValue] = useState("");
  const [classes, setClasses] = useState<number[]>([501, 502, 504]);

  const [loading, setLoading] = useState(false);

  return (
    <Section>
      <Header>Chip Field</Header>
      <ChipField
        label="Classes learning this subject"
        helperMsg="Comma-separated list"
        required
        value={value}
        onChange={setValue}
        onNewEntries={(values) => {
          setLoading(true);
          setTimeout(() => {
            let error: string | null = null;
            const newClasses: number[] = [];
            for (const value of values) {
              const newClass = Number(value);
              if (classes.includes(newClass)) error = "Class already added";
              if (!/[1-6](0[1-9]|1[0-9])/.test(value))
                error = "Enter a valid class number (e.g. 501, 602)";
              if (error) {
                snackbar.push(error, undefined, { persistent: true });
                break;
              } else newClasses.push(newClass);
            }
            if (newClasses.length) setClasses([...classes, ...newClasses]);
            setLoading(false);
          }, 500);
        }}
        onDeleteLast={() => setClasses(classes.slice(0, -1))}
        placeholder="Enter class number"
        loading={loading}
      >
        <ChipSet>
          {classes.map((classItem) => (
            <InputChip
              key={classItem}
              onDelete={() =>
                setClasses(classes.filter((item) => classItem !== item))
              }
            >
              {`M.${classItem}`}
            </InputChip>
          ))}
        </ChipSet>
      </ChipField>
    </Section>
  );
};

export default ChipFieldSection;
