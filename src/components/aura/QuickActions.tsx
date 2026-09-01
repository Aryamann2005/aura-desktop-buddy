import {
  Activity,
  Camera,
  Globe,
  LayoutGrid,
  Search,
  type LucideIcon,
} from "lucide-react";

export type QuickAction = { label: string; icon: LucideIcon; command: string };

const ACTIONS: QuickAction[] = [
  { label: "Open App", icon: LayoutGrid, command: "Open Visual Studio Code" },
  { label: "Search Files", icon: Search, command: "Search files for report" },
  { label: "Screenshot", icon: Camera, command: "Take a screenshot" },
  { label: "System Status", icon: Activity, command: "Check system status" },
  { label: "Browser", icon: Globe, command: "Open YouTube" },
];

export function QuickActions({ onRun }: { onRun: (command: string) => void }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {ACTIONS.map(({ label, icon: Icon, command }) => (
        <button
          key={label}
          type="button"
          onClick={() => onRun(command)}
          className="glass-soft group inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[12.5px] font-medium text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-aura-blue/30 hover:text-foreground"
        >
          <Icon className="size-3.5 transition-colors duration-300 group-hover:text-aura-cyan" />
          {label}
        </button>
      ))}
    </div>
  );
}
