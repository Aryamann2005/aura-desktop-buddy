import { useCallback, useEffect, useRef, useState } from "react";
import { Settings } from "lucide-react";
import { AuraOrb } from "./AuraOrb";
import { AssistantState } from "./AssistantState";
import { CommandBar } from "./CommandBar";
import { Conversation } from "./Conversation";
import { QuickActions } from "./QuickActions";
import { RecentCommands } from "./RecentCommands";
import { SettingsPanel } from "./SettingsPanel";
import { StatusIndicator } from "./StatusIndicator";
import { SystemStatus } from "./SystemStatus";
import type { AssistantStateName, Message, RecentItem } from "./types";

const INITIAL_RECENT: RecentItem[] = [
  { id: "r1", label: "Opened Visual Studio Code", time: "Just now" },
  { id: "r2", label: "Checked system status", time: "5 minutes ago" },
  { id: "r3", label: "Opened YouTube", time: "12 minutes ago" },
  { id: "r4", label: "Searched files for “Q3 report”", time: "26 minutes ago" },
];

/** Mock intent resolution — replaced later by the real agent. */
function resolve(command: string): { action: string; reply: string } {
  const c = command.toLowerCase();
  if (c.includes("code"))
    return {
      action: "Opening Visual Studio Code...",
      reply: "Opening Visual Studio Code.",
    };
  if (c.includes("screenshot"))
    return { action: "Capturing your screen...", reply: "Screenshot saved to Pictures." };
  if (c.includes("status") || c.includes("system"))
    return { action: "Reading system telemetry...", reply: "CPU 24%, RAM 61%, battery 84%. All healthy." };
  if (c.includes("file") || c.includes("search"))
    return { action: "Searching indexed files...", reply: "Found 3 matching files in Documents." };
  if (c.includes("youtube") || c.includes("browser"))
    return { action: "Launching your browser...", reply: "Opening YouTube in Edge." };
  return { action: `Working on “${command}”...`, reply: "Done — anything else?" };
}

export function AuraApp() {
  const [state, setState] = useState<AssistantStateName>("idle");
  const [contextMessage, setContextMessage] = useState<string>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [recent, setRecent] = useState(INITIAL_RECENT);
  const [input, setInput] = useState("");
  const [settingsOpen, setSettingsOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  useEffect(() => clearTimers, []);

  const after = (ms: number, fn: () => void) => {
    timers.current.push(setTimeout(fn, ms));
  };

  const run = useCallback((command: string) => {
    const text = command.trim();
    if (!text) return;
    clearTimers();
    setInput("");
    const { action, reply } = resolve(text);

    setMessages((m) => [
      ...m,
      { id: `${Date.now()}-u`, role: "user", text },
    ]);
    setState("thinking");

    after(1100, () => {
      setContextMessage(action);
      setState("executing");
    });
    after(2400, () => {
      setMessages((m) => [
        ...m,
        { id: `${Date.now()}-a`, role: "aura", text: reply },
      ]);
      setState("speaking");
    });
    after(4000, () => setState("completed"));
    after(5100, () => {
      setState("idle");
      setContextMessage(undefined);
      setRecent((r) => [
        { id: `${Date.now()}`, label: text, time: "Just now" },
        ...r,
      ].slice(0, 8));
    });
  }, []);

  const toggleListening = useCallback(() => {
    if (state === "listening") {
      run("Open Visual Studio Code");
      return;
    }
    clearTimers();
    setState("listening");
    after(2600, () => run("Open Visual Studio Code"));
  }, [state, run]);

  // Ctrl + Space global shortcut
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.code === "Space") {
        e.preventDefault();
        toggleListening();
      }
      if (e.key === "Escape") setSettingsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggleListening]);

  const conversationVisible = messages.length > 0 && state !== "idle";

  return (
    <main className="relative flex h-screen w-full flex-col overflow-hidden bg-background">
      {/* ambient background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(90rem 60rem at 50% -10%, oklch(0.32 0.08 268 / 55%) 0%, transparent 60%), radial-gradient(60rem 40rem at 12% 105%, oklch(0.3 0.09 295 / 35%) 0%, transparent 60%), radial-gradient(60rem 40rem at 92% 100%, oklch(0.3 0.08 210 / 30%) 0%, transparent 62%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(1 0 0 / 60%) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 60%) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(circle at 50% 40%, #000 0%, transparent 72%)",
        }}
      />

      {/* title bar */}
      <header className="relative z-20 flex items-center justify-between px-8 py-5">
        <div className="flex items-center gap-4">
          <span className="font-display text-[15px] font-semibold tracking-[0.42em] text-foreground">
            AURA
          </span>
          <span className="h-4 w-px bg-hairline" />
          <StatusIndicator state={state} />
        </div>
        <button
          type="button"
          onClick={() => setSettingsOpen(true)}
          aria-label="Open settings"
          className="grid size-9 place-items-center rounded-xl text-muted-foreground transition-all duration-300 hover:rotate-45 hover:bg-surface-strong hover:text-foreground"
        >
          <Settings className="size-[18px]" />
        </button>
      </header>

      {/* stage */}
      <section className="relative z-10 flex flex-1 flex-col items-center justify-center px-8">
        <AuraOrb
          state={state}
          className="size-[220px] xl:size-[260px] 2xl:size-[300px]"
        />

        <div className="mt-12 xl:mt-14">
          <AssistantState state={state} contextMessage={contextMessage} />
        </div>

        <div className="mt-8 h-28 w-full">
          <Conversation messages={messages} visible={conversationVisible} />
        </div>
      </section>

      {/* side panels */}
      <div className="pointer-events-none absolute inset-x-8 top-24 z-20 flex justify-between">
        <div className="pointer-events-auto">
          <RecentCommands items={recent} />
        </div>
        <div className="pointer-events-auto">
          <SystemStatus />
        </div>
      </div>

      {/* bottom dock */}
      <footer className="relative z-20 px-8 pb-8">
        <div className="mb-5">
          <QuickActions onRun={run} />
        </div>
        <CommandBar
          ref={inputRef}
          value={input}
          onChange={setInput}
          onSubmit={() => run(input)}
          onMic={toggleListening}
          listening={state === "listening"}
          busy={state !== "idle" && state !== "listening"}
        />
      </footer>

      <SettingsPanel open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </main>
  );
}
