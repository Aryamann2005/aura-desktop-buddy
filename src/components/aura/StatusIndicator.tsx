import { cn } from "@/lib/utils";
import type { AssistantStateName } from "./types";

const LABEL: Record<AssistantStateName, string> = {
  idle: "Ready",
  listening: "Listening",
  thinking: "Thinking",
  executing: "Executing",
  speaking: "Speaking",
  completed: "Done",
};

export function StatusIndicator({ state }: { state: AssistantStateName }) {
  return (
    <span className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.14em] text-muted-foreground uppercase">
      <span className="relative flex size-1.5">
        <span
          className={cn(
            "absolute inline-flex size-full rounded-full bg-aura-cyan opacity-60",
            state !== "idle" && "animate-ping",
          )}
        />
        <span
          className={cn(
            "relative inline-flex size-1.5 rounded-full",
            state === "idle" ? "bg-aura-cyan" : "bg-aura-violet",
          )}
        />
      </span>
      {LABEL[state]}
    </span>
  );
}
