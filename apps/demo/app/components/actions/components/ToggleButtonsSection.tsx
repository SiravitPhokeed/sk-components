"use client";

import {
  Actions,
  Header,
  MaterialIcon,
  Section,
  ToggleButton,
} from "@suankularb-components/react";
import { useState, type FC } from "react";

const ToggleButtonsSection: FC = () => {
  const [favorite, setFavorite] = useState(false);
  const [mic, setMic] = useState(false);
  const [cloud, setCloud] = useState(false);
  const [eco, setEco] = useState(false);
  const [star, setStar] = useState(false);

  return (
    <Section>
      <Header level={3}>Toggle Button</Header>
      <Actions align="left">
        <ToggleButton
          appearance="filled"
          icon={<MaterialIcon icon="favorite" />}
          alt="Favorite"
          tooltip="Save to favorites"
          value={favorite}
          onChange={setFavorite}
        />
        <ToggleButton
          appearance="filled"
          icon={<MaterialIcon icon="mic" />}
          alt="Microphone"
          tooltip="Toggle microphone"
          dangerous
          value={mic}
          onChange={setMic}
        />
        <ToggleButton
          appearance="tonal"
          icon={<MaterialIcon icon="cloud_upload" />}
          alt="Upload to cloud"
          tooltip="Toggle upload to cloud"
          value={cloud}
          onChange={setCloud}
        />
        <ToggleButton
          appearance="outlined"
          icon={<MaterialIcon icon="eco" />}
          alt="Eco mode"
          tooltip="Toggle eco mode"
          value={eco}
          onChange={setEco}
        />
        <ToggleButton
          appearance="standard"
          icon={<MaterialIcon icon="star" />}
          alt="Star"
          tooltip="Star"
          value={star}
          onChange={setStar}
        />
      </Actions>
    </Section>
  );
};

export default ToggleButtonsSection;
