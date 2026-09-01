import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function Row({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-6 rounded-xl px-3 py-3 transition-colors duration-300 hover:bg-surface">
      <div className="min-w-0">
        <p className="text-[13.5px] text-foreground/90">{label}</p>
        {hint ? (
          <p className="mt-0.5 text-[11.5px] text-muted-foreground/75">{hint}</p>
        ) : null}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

export function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative h-[22px] w-[40px] rounded-full border transition-all duration-300",
        checked
          ? "border-transparent"
          : "border-hairline bg-surface-strong",
      )}
      style={
        checked
          ? {
              background:
                "linear-gradient(135deg, var(--aura-cyan), var(--aura-blue))",
              boxShadow: "0 0 18px -6px var(--aura-glow)",
            }
          : undefined
      }
    >
      <span
        className={cn(
          "absolute top-1/2 size-[14px] -translate-y-1/2 rounded-full transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          checked
            ? "left-[22px] bg-background"
            : "left-[4px] bg-muted-foreground",
        )}
      />
    </button>
  );
}

export function Slider({
  value,
  onChange,
  label,
}: {
  value: number;
  onChange: (v: number) => void;
  label: string;
}) {
  return (
    <div className="flex w-44 items-center gap-3">
      <div className="relative h-[3px] flex-1 rounded-full bg-surface-strong">
        <div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            width: `${value}%`,
            background:
              "linear-gradient(90deg, var(--aura-cyan), var(--aura-violet))",
          }}
        />
        <div
          className="absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground shadow"
          style={{ left: `${value}%` }}
        />
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          aria-label={label}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 h-4 w-full -translate-y-1/2 cursor-pointer opacity-0"
          style={{ top: "50%" }}
        />
      </div>
      <span className="w-8 text-right text-[12px] tabular-nums text-muted-foreground">
        {value}
      </span>
    </div>
  );
}

export function Select({
  value,
  options,
  onChange,
  label,
}: {
  value: string;
  options: string[];
  onChange: (v: string) => void;
  label: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        type="button"
        aria-label={label}
        onClick={() => setOpen((o) => !o)}
        className="glass-soft inline-flex w-48 items-center justify-between rounded-lg px-3 py-1.5 text-[13px] text-foreground/90 transition-colors duration-300 hover:bg-surface-strong"
      >
        <span className="truncate">{value}</span>
        <ChevronDown
          className={cn(
            "size-3.5 text-muted-foreground transition-transform duration-300",
            open && "rotate-180",
          )}
        />
      </button>
      {open ? (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <ul className="glass animate-soft-fade absolute right-0 z-20 mt-2 w-48 rounded-xl p-1">
            {options.map((opt) => (
              <li key={opt}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(opt);
                    setOpen(false);
                  }}
                  className="flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-[13px] text-foreground/85 transition-colors duration-200 hover:bg-surface-strong"
                >
                  {opt}
                  {opt === value ? (
                    <Check className="size-3.5 text-aura-cyan" />
                  ) : null}
                </button>
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </div>
  );
}

export function PermissionPill({
  granted,
  onToggle,
  label,
}: {
  granted: boolean;
  onToggle: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={`${label}: ${granted ? "allowed" : "blocked"}`}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11.5px] font-medium transition-all duration-300",
        granted
          ? "border-aura-cyan/30 bg-aura-cyan/10 text-aura-cyan"
          : "border-hairline bg-surface text-muted-foreground",
      )}
    >
      <span
        className={cn(
          "size-1.5 rounded-full",
          granted ? "bg-aura-cyan" : "bg-muted-foreground/60",
        )}
      />
      {granted ? "Allowed" : "Blocked"}
    </button>
  );
}
