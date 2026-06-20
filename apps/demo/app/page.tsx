import { Button, MaterialIcon } from "@suankularb-components/react";

export default function Home() {
  return (
    <main className="p-4">
      <div className="flex flex-wrap gap-2">
        <Button appearance="filled">Button</Button>
        <Button appearance="filled" icon={<MaterialIcon icon="add" />}>
          Button
        </Button>
        <Button appearance="filled" dangerous>
          Button
        </Button>
        <Button appearance="filled" disabled>
          Button
        </Button>
        <Button appearance="tonal">Button</Button>
        <Button appearance="tonal" dangerous>
          Button
        </Button>
        <Button appearance="tonal" disabled>
          Button
        </Button>
        <Button appearance="outlined">Button</Button>
        <Button appearance="outlined" dangerous>
          Button
        </Button>
        <Button appearance="outlined" disabled>
          Button
        </Button>
        <Button appearance="text">Button</Button>
        <Button appearance="text" dangerous>
          Button
        </Button>
        <Button appearance="text" disabled>
          Button
        </Button>
      </div>
    </main>
  );
}
