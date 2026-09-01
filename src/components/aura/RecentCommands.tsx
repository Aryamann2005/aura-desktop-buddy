import { useState } from "react";
import { ChevronDown, History } from "lucide-react";
import { cn } from "@/lib/utils";
import type { RecentItem } from "./types";

export function RecentCommands({ items }: { items: RecentItem[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="glass w-64 overflow-hidden rounded-2xl">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between px-4 py-3 text-left transition-colors duration-300 hover:bg-surface"
      >
        <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
          <History className="size-3.5" />
          Recent
        </span>
        <ChevronDown
          className={cn(
            "size-4 text-muted-foreground transition-transform duration-400",
            open && "rotate-180",
          )}
        />
      </button>

      <div
        className="grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ gridTemplateRows: open ? "1fr" : "0fr", opacity: open ? 1 : 0 }}
      >
        <div className="overflow-hidden">
          <ul className="scrollbar-thin max-h-56 overflow-y-auto px-2 pb-2">
            {items.map((item) => (
              <li key={item.id}>
                <div className="rounded-xl px-2.5 py-2 transition-colors duration-300 hover:bg-surface">
                  <p className="truncate text-[13px] text-foreground/85">
                    {item.label}
                  </p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground/70">
                    {item.time}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
