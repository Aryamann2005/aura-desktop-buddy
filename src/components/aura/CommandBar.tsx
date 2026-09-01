import { forwardRef, useState } from "react";
import { ArrowUp, Mic, Square } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  onMic: () => void;
  listening: boolean;
  busy: boolean;
};

export const CommandBar = forwardRef<HTMLInputElement, Props>(
  function CommandBar(
    { value, onChange, onSubmit, onMic, listening, busy },
    ref,
  ) {
    const [focused, setFocused] = useState(false);

    return (
      <div className="mx-auto w-full max-w-[46rem]">
        <div
          className={cn(
            "glass relative flex items-center gap-2 rounded-2xl px-3 py-2.5 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            focused && "scale-[1.012]",
          )}
          style={
            focused || listening
              ? {
                  boxShadow:
                    "var(--shadow-float), 0 0 0 1px oklch(0.72 0.15 245 / 35%), 0 0 48px -12px var(--aura-glow)",
                }
              : undefined
          }
        >
          {/* animated top hairline */}
          <span
            className={cn(
              "pointer-events-none absolute inset-x-6 top-0 h-px transition-opacity duration-500",
              focused || listening ? "opacity-100" : "opacity-0",
            )}
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--aura-cyan), var(--aura-violet), transparent)",
              backgroundSize: "200% 100%",
              animation: "aura-sheen 4s linear infinite",
            }}
          />

          <input
            ref={ref}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter") onSubmit();
            }}
            placeholder={listening ? "Listening..." : "Ask AURA anything..."}
            aria-label="Ask AURA anything"
            className="h-9 flex-1 bg-transparent px-3 text-[15px] text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
          />

          <button
            type="button"
            onClick={onMic}
            aria-label={listening ? "Stop listening" : "Start voice input"}
            className={cn(
              "grid size-9 place-items-center rounded-xl border border-transparent text-muted-foreground transition-all duration-300 hover:bg-surface-strong hover:text-foreground",
              listening &&
                "border-aura-cyan/30 bg-aura-cyan/10 text-aura-cyan",
            )}
          >
            {listening ? (
              <Square className="size-3.5 fill-current" />
            ) : (
              <Mic className="size-[18px]" />
            )}
          </button>

          <button
            type="button"
            onClick={onSubmit}
            disabled={busy || !value.trim()}
            aria-label="Send command"
            className="grid size-9 place-items-center rounded-xl text-primary-foreground transition-all duration-300 disabled:opacity-35"
            style={{
              background:
                "linear-gradient(135deg, var(--aura-cyan), var(--aura-blue) 55%, var(--aura-violet))",
              boxShadow: "0 6px 20px -8px var(--aura-glow)",
            }}
          >
            <ArrowUp className="size-[18px]" strokeWidth={2.4} />
          </button>
        </div>

        <p className="mt-3 text-center text-[11px] tracking-wide text-muted-foreground/60">
          <kbd className="rounded-md border border-hairline bg-surface px-1.5 py-0.5 font-sans text-[10px]">
            Ctrl
          </kbd>{" "}
          +{" "}
          <kbd className="rounded-md border border-hairline bg-surface px-1.5 py-0.5 font-sans text-[10px]">
            Space
          </kbd>{" "}
          to talk
        </p>
      </div>
    );
  },
);
