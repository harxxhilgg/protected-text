import { Kbd, KbdGroup } from "./ui/kbd";

export default function KbdUi() {
  return (
    <div className="w-full max-w-md space-y-4">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span className="w-16 shrink-0">Save</span>

        <div className="ml-auto flex items-center gap-2">
          <KbdGroup>
            <Kbd>Cmd</Kbd>
            <Kbd>S</Kbd>
          </KbdGroup>

          <span>/</span>

          <KbdGroup>
            <Kbd>Ctrl</Kbd>
            <Kbd>S</Kbd>
          </KbdGroup>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span className="w-16 shrink-0">Lock</span>

        <div className="ml-auto flex items-center gap-2">
          <KbdGroup>
            <Kbd>Cmd</Kbd>
            <Kbd>L</Kbd>
          </KbdGroup>

          <span>/</span>

          <KbdGroup>
            <Kbd>Ctrl</Kbd>
            <Kbd>L</Kbd>
          </KbdGroup>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span className="w-16 shrink-0">Reload</span>

        <div className="ml-auto flex items-center gap-2">
          <KbdGroup>
            <Kbd>Cmd</Kbd>
            <Kbd>Shift</Kbd>
            <Kbd>R</Kbd>
          </KbdGroup>

          <span>/</span>

          <KbdGroup>
            <Kbd>Ctrl</Kbd>
            <Kbd>Shift</Kbd>
            <Kbd>R</Kbd>
          </KbdGroup>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span className="w-16 shrink-0">Find</span>

        <div className="ml-auto flex items-center gap-2">
          <KbdGroup>
            <Kbd>Cmd</Kbd>
            <Kbd>F</Kbd>
          </KbdGroup>

          <span>/</span>

          <KbdGroup>
            <Kbd>Ctrl</Kbd>
            <Kbd>F</Kbd>
          </KbdGroup>
        </div>
      </div>
    </div>
  );
};