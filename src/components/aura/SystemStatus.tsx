import { useEffect, useState } from "react";
import {
  BatteryMedium,
  ChevronDown,
  Cpu,
  HardDrive,
  MemoryStick,
  Wifi,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Metric = {
  key: string;
  label: string;
  value: number;
  icon: typeof Cpu;
  suffix?: string;
};

const BASE: Metric[] = [
  { key: "cpu", label: "CPU", value: 24, icon: Cpu },
  { key: "ram", label: "RAM", value: 61, icon: MemoryStick },
  { key: "storage", label: "Storage", value: 72, icon: HardDrive },
  { key: "battery", label: "Battery", value: 84, icon: BatteryMedium },
];

export function SystemStatus() {
  const [open, setOpen] = useState(false);
  const [metrics, setMetrics] = useState(BASE);

  // mock live drift
  useEffect(() => {
    const id = setInterval(() => {
      setMetrics((prev) =>
        prev.map((m) =>
          m.key === "cpu" || m.key === "ram"
            ? {
                ...m,
                value: Math.min(
                  96,
                  Math.max(8, m.value + Math.round((Math.random() - 0.5) * 9)),
                ),
              }
            : m,
        ),
      );
    }, 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="glass w-64 overflow-hidden rounded-2xl">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between px-4 py-3 text-left transition-colors duration-300 hover:bg-surface"
      >
        <span className="text-[11px] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
          System
        </span>
        <span className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground/80">
            <Wifi className="size-3.5 text-aura-cyan" />
            Online
          </span>
          <ChevronDown
            className={cn(
              "size-4 text-muted-foreground transition-transform duration-400",
              open && "rotate-180",
            )}
          />
        </span>
      </button>

      <div
        className="grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ gridTemplateRows: open ? "1fr" : "0fr", opacity: open ? 1 : 0 }}
      >
        <div className="overflow-hidden">
          <div className="space-y-3 px-4 pb-4">
            {metrics.map(({ key, label, value, icon: Icon }) => (
              <div key={key}>
                <div className="mb-1.5 flex items-center justify-between text-[12px]">
                  <span className="inline-flex items-center gap-2 text-muted-foreground">
                    <Icon className="size-3.5" />
                    {label}
                  </span>
                  <span className="font-medium tabular-nums text-foreground/85">
                    {value}%
                  </span>
                </div>
                <div className="h-[3px] overflow-hidden rounded-full bg-surface-strong">
                  <div
                    className="h-full rounded-full transition-[width] duration-700 ease-out"
                    style={{
                      width: `${value}%`,
                      background:
                        "linear-gradient(90deg, var(--aura-cyan), var(--aura-violet))",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
