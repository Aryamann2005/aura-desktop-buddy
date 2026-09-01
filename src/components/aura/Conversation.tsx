import { cn } from "@/lib/utils";
import type { Message } from "./types";

export function Conversation({
  messages,
  visible,
}: {
  messages: Message[];
  visible: boolean;
}) {
  const shown = messages.slice(-4);

  return (
    <div
      className={cn(
        "pointer-events-none mx-auto flex w-full max-w-2xl flex-col items-center gap-3 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      {shown.map((m, i) => (
        <div
          key={m.id}
          className="animate-rise w-full text-center"
          style={{
            opacity: 0.35 + (i + 1) / shown.length / 1.55,
          }}
        >
          <span className="mr-2 text-[10px] font-semibold tracking-[0.18em] text-muted-foreground/70 uppercase">
            {m.role === "user" ? "You" : "AURA"}
          </span>
          <span
            className={cn(
              "text-[15px] leading-relaxed",
              m.role === "user"
                ? "text-foreground/80"
                : "text-foreground",
            )}
          >
            {m.text}
          </span>
        </div>
      ))}
    </div>
  );
}
