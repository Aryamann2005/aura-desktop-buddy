import { cn } from "@/lib/utils";
import type { AssistantStateName } from "./types";

type Props = {
  state: AssistantStateName;
  contextMessage?: string | undefined;
};

const COPY: Record<AssistantStateName, { title: string; sub?: string }> = {
  idle: {
    title: "How can I help?",
    sub: "Press Ctrl + Space or speak to AURA",
  },
  listening: { title: "Listening..." },
  thinking: { title: "Thinking..." },
  executing: { title: "Working on it" },
  speaking: { title: "Speaking..." },
  completed: { title: "Done." },
};

export function AssistantState({ state, contextMessage }: Props) {
  const copy = COPY[state];
  const sub = state === "executing" ? contextMessage : copy.sub;

  return (
    <div key={state} className="animate-rise text-center">
      <h1
        className={cn(
          "font-display text-[2rem] leading-tight font-light tracking-tight 2xl:text-[2.4rem]",
          "text-foreground",
        )}
        style={
          state === "idle"
            ? undefined
            : { textShadow: "0 0 28px var(--aura-glow)" }
        }
      >
        {copy.title}
      </h1>
      <p className="mt-2 h-5 text-[13px] font-medium tracking-wide text-muted-foreground">
        {sub ?? ""}
      </p>
    </div>
  );
}
