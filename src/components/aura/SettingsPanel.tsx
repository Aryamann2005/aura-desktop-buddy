import { useState } from "react";
import {
  Bot,
  Lock,
  Mic2,
  Settings2,
  ShieldCheck,
  X,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PermissionPill, Row, Select, Slider, Toggle } from "./controls";

type SectionKey = "general" | "voice" | "ai" | "permissions" | "privacy";

const SECTIONS: { key: SectionKey; label: string; icon: LucideIcon }[] = [
  { key: "general", label: "General", icon: Settings2 },
  { key: "voice", label: "Voice", icon: Mic2 },
  { key: "ai", label: "AI", icon: Bot },
  { key: "permissions", label: "Permissions", icon: ShieldCheck },
  { key: "privacy", label: "Privacy", icon: Lock },
];

export function SettingsPanel({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [section, setSection] = useState<SectionKey>("general");

  const [launchOnStartup, setLaunchOnStartup] = useState(true);
  const [shortcut, setShortcut] = useState("Ctrl + Space");
  const [appearance, setAppearance] = useState("Midnight (Dark)");
  const [micDevice, setMicDevice] = useState("Realtek Microphone Array");
  const [micLevel, setMicLevel] = useState(72);
  const [voice, setVoice] = useState("Aura — Calm");
  const [wakeWord, setWakeWord] = useState(true);
  const [model, setModel] = useState("Aura Core 2.5");
  const [style, setStyle] = useState("Concise");
  const [memory, setMemory] = useState(true);
  const [perms, setPerms] = useState({
    apps: true,
    files: true,
    screen: false,
    system: true,
  });
  const [history, setHistory] = useState(true);
  const [voiceData, setVoiceData] = useState(false);
  const [local, setLocal] = useState(true);

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 transition-opacity duration-400",
        open ? "opacity-100" : "pointer-events-none opacity-0",
      )}
      role="dialog"
      aria-modal="true"
      aria-label="AURA settings"
    >
      <div
        className="absolute inset-0 bg-background/55 backdrop-blur-xl"
        onClick={onClose}
      />

      <div
        className={cn(
          "glass absolute top-1/2 left-1/2 flex h-[min(80vh,640px)] w-[min(92vw,940px)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          open ? "scale-100 opacity-100" : "scale-[0.97] opacity-0",
        )}
      >
        {/* sidebar */}
        <aside className="w-56 shrink-0 border-r border-hairline p-4">
          <p className="px-3 pt-2 pb-4 font-display text-[13px] tracking-[0.22em] text-muted-foreground uppercase">
            Settings
          </p>
          <nav className="space-y-1">
            {SECTIONS.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                type="button"
                onClick={() => setSection(key)}
                className={cn(
                  "flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-[13.5px] transition-all duration-300",
                  section === key
                    ? "bg-surface-strong text-foreground"
                    : "text-muted-foreground hover:bg-surface hover:text-foreground/90",
                )}
              >
                <Icon
                  className={cn(
                    "size-4",
                    section === key && "text-aura-cyan",
                  )}
                />
                {label}
              </button>
            ))}
          </nav>
        </aside>

        {/* content */}
        <div className="scrollbar-thin flex-1 overflow-y-auto p-6">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <h2 className="font-display text-xl font-light tracking-tight">
                {SECTIONS.find((s) => s.key === section)?.label}
              </h2>
              <p className="mt-1 text-[12.5px] text-muted-foreground">
                Configure how AURA behaves on this device.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close settings"
              className="grid size-8 place-items-center rounded-lg text-muted-foreground transition-colors duration-300 hover:bg-surface-strong hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          </div>

          <div key={section} className="animate-soft-fade space-y-1">
            {section === "general" && (
              <>
                <Row label="Launch AURA on startup" hint="Starts silently in the system tray">
                  <Toggle
                    label="Launch on startup"
                    checked={launchOnStartup}
                    onChange={setLaunchOnStartup}
                  />
                </Row>
                <Row label="Keyboard shortcut" hint="Global hotkey to summon AURA">
                  <Select
                    label="Keyboard shortcut"
                    value={shortcut}
                    onChange={setShortcut}
                    options={["Ctrl + Space", "Alt + A", "Win + Shift + A"]}
                  />
                </Row>
                <Row label="Appearance">
                  <Select
                    label="Appearance"
                    value={appearance}
                    onChange={setAppearance}
                    options={["Midnight (Dark)", "Nebula", "Graphite"]}
                  />
                </Row>
              </>
            )}

            {section === "voice" && (
              <>
                <Row label="Microphone">
                  <Select
                    label="Microphone"
                    value={micDevice}
                    onChange={setMicDevice}
                    options={[
                      "Realtek Microphone Array",
                      "Blue Yeti USB",
                      "Headset Mic",
                    ]}
                  />
                </Row>
                <Row label="Input sensitivity">
                  <Slider label="Input sensitivity" value={micLevel} onChange={setMicLevel} />
                </Row>
                <Row label="Voice selection" hint="Used for spoken responses">
                  <Select
                    label="Voice selection"
                    value={voice}
                    onChange={setVoice}
                    options={["Aura — Calm", "Aura — Bright", "Aura — Low"]}
                  />
                </Row>
                <Row label="Wake word" hint={'Respond to "Hey AURA"'}>
                  <Toggle label="Wake word" checked={wakeWord} onChange={setWakeWord} />
                </Row>
              </>
            )}

            {section === "ai" && (
              <>
                <Row label="AI model">
                  <Select
                    label="AI model"
                    value={model}
                    onChange={setModel}
                    options={["Aura Core 2.5", "Aura Fast", "Aura Reasoning"]}
                  />
                </Row>
                <Row label="Response style">
                  <Select
                    label="Response style"
                    value={style}
                    onChange={setStyle}
                    options={["Concise", "Balanced", "Detailed"]}
                  />
                </Row>
                <Row
                  label="Conversation memory"
                  hint="Remember context between sessions"
                >
                  <Toggle label="Conversation memory" checked={memory} onChange={setMemory} />
                </Row>
              </>
            )}

            {section === "permissions" && (
              <>
                <Row label="Applications" hint="Launch and control desktop apps">
                  <PermissionPill
                    label="Applications"
                    granted={perms.apps}
                    onToggle={() => setPerms((p) => ({ ...p, apps: !p.apps }))}
                  />
                </Row>
                <Row label="Files" hint="Search and open local files">
                  <PermissionPill
                    label="Files"
                    granted={perms.files}
                    onToggle={() => setPerms((p) => ({ ...p, files: !p.files }))}
                  />
                </Row>
                <Row label="Screen access" hint="Capture and read the screen">
                  <PermissionPill
                    label="Screen access"
                    granted={perms.screen}
                    onToggle={() => setPerms((p) => ({ ...p, screen: !p.screen }))}
                  />
                </Row>
                <Row label="System controls" hint="Volume, power, network settings">
                  <PermissionPill
                    label="System controls"
                    granted={perms.system}
                    onToggle={() => setPerms((p) => ({ ...p, system: !p.system }))}
                  />
                </Row>
              </>
            )}

            {section === "privacy" && (
              <>
                <Row label="Conversation history" hint="Keep transcripts on this device">
                  <Toggle label="Conversation history" checked={history} onChange={setHistory} />
                </Row>
                <Row label="Voice data" hint="Store audio snippets to improve accuracy">
                  <Toggle label="Voice data" checked={voiceData} onChange={setVoiceData} />
                </Row>
                <Row label="Local processing" hint="Prefer on-device inference when possible">
                  <Toggle label="Local processing" checked={local} onChange={setLocal} />
                </Row>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
