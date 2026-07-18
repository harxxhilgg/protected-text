import { Kbd, KbdGroup } from "./ui/kbd";
import { Label } from "./ui/label";

export default function KbdUi() {
  return (
    <div className="w-full max-w-md space-y-4">
      {/* Shortcuts Heading */}
      <div className="flex justify-end mb-7">
        <Label about="shortcut-heading" className="text-muted-foreground/80">Shortcuts</Label>
      </div>

      {/* Save */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span className="w-16 shrink-0">Save</span>

        <div className="ml-auto flex items-center gap-2">
          <KbdGroup>
            <Kbd className="text-xl pt-px">⌘</Kbd>
            <Kbd>S</Kbd>
          </KbdGroup>

          <span>/</span>

          <KbdGroup>
            <Kbd>Ctrl</Kbd>
            <Kbd>S</Kbd>
          </KbdGroup>
        </div>
      </div>

      {/* Find */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span className="w-16 shrink-0">Find</span>

        <div className="ml-auto flex items-center gap-2">
          <KbdGroup>
            <Kbd className="text-xl pt-px">⌘</Kbd>
            <Kbd>F</Kbd>
          </KbdGroup>

          <span>/</span>

          <KbdGroup>
            <Kbd>Ctrl</Kbd>
            <Kbd>F</Kbd>
          </KbdGroup>
        </div>
      </div>

      {/* Lock */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span className="w-16 shrink-0">Lock</span>

        <div className="ml-auto flex items-center gap-2">
          <KbdGroup>
            <Kbd className="text-xl pt-px">⌘</Kbd>
            <Kbd>Shift</Kbd>
            <Kbd>L</Kbd>
          </KbdGroup>

          <span>/</span>

          <KbdGroup>
            <Kbd>Ctrl</Kbd>
            <Kbd>Shift</Kbd>
            <Kbd>L</Kbd>
          </KbdGroup>
        </div>
      </div>

      {/* Reload */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span className="w-16 shrink-0">Reload</span>

        <div className="ml-auto flex items-center gap-2">
          <KbdGroup>
            <Kbd className="text-xl pt-px">⌘</Kbd>
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
    </div>
  );
};