import { useMemo } from "react";
import { cn } from "@/lib/utils";
import type { AssistantStateName } from "./types";

const PARTICLES = 18;

type Props = {
  state: AssistantStateName;
  className?: string;
};

/**
 * Layered, living AI orb. Pure CSS/SVG so it stays cheap to animate.
 * Layers: ambient halo -> outer rings -> glass sphere -> drifting gradient
 * blobs -> specular highlight -> particles -> waveform (listening).
 */
export function AuraOrb({ state, className }: Props) {
  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLES }, (_, i) => {
        const angle = (i / PARTICLES) * Math.PI * 2 + i * 0.37;
        const dist = 120 + ((i * 37) % 90);
        return {
          px: `${(Math.cos(angle) * dist).toFixed(1)}px`,
          py: `${(Math.sin(angle) * dist).toFixed(1)}px`,
          delay: `${(i * 0.31) % 4}s`,
          dur: `${3.4 + ((i * 13) % 22) / 10}s`,
          size: i % 4 === 0 ? 3 : 2,
        };
      }),
    [],
  );

  const active = state !== "idle";
  const energetic = state === "executing" || state === "listening";

  return (
    <div
      className={cn(
        "relative grid place-items-center transition-[transform,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
        state === "listening" && "scale-[1.06]",
        state === "executing" && "scale-[1.04]",
        state === "completed" && "scale-[1.02]",
        className,
      )}
      aria-hidden="true"
    >
      {/* ambient light wash */}
      <div
        className="pointer-events-none absolute size-[240%] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--aura-glow) 0%, transparent 62%)",
          animation: `aura-halo ${active ? "3.2s" : "6s"} ease-in-out infinite`,
        }}
      />

      {/* expanding rings */}
      {(state === "listening" || state === "completed") &&
        [0, 1, 2].map((i) => (
          <div
            key={i}
            className="pointer-events-none absolute size-full rounded-full border"
            style={{
              borderColor: "oklch(0.85 0.13 200 / 30%)",
              animation: `aura-ring-out ${state === "completed" ? "1.1s" : "2.6s"} ease-out ${i * 0.55}s infinite`,
            }}
          />
        ))}

      {/* rotating orbit ring */}
      <div
        className="pointer-events-none absolute size-[118%] rounded-full opacity-50"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg, var(--aura-cyan) 40deg, transparent 120deg, var(--aura-violet) 220deg, transparent 300deg)",
          mask: "radial-gradient(circle, transparent 68%, #000 69%, #000 70.5%, transparent 71.5%)",
          animation: `aura-spin-slow ${state === "thinking" ? "6s" : "22s"} linear infinite`,
        }}
      />
      <div
        className="pointer-events-none absolute size-[132%] rounded-full opacity-30"
        style={{
          background:
            "conic-gradient(from 180deg, transparent 0deg, var(--aura-blue) 60deg, transparent 160deg)",
          mask: "radial-gradient(circle, transparent 72%, #000 73%, #000 74%, transparent 75%)",
          animation: `aura-spin-rev ${state === "thinking" ? "9s" : "34s"} linear infinite`,
        }}
      />

      {/* the sphere */}
      <div
        className="relative size-full overflow-hidden rounded-full"
        style={{
          background:
            "radial-gradient(circle at 32% 28%, oklch(0.38 0.07 265) 0%, oklch(0.2 0.04 268) 55%, oklch(0.13 0.03 266) 100%)",
          boxShadow:
            "inset 0 0 60px oklch(0.7 0.16 250 / 25%), inset 0 -30px 60px oklch(0 0 0 / 55%), 0 0 90px -18px var(--aura-glow)",
          animation: `aura-breathe ${state === "listening" ? "1.6s" : state === "speaking" ? "1.05s" : state === "executing" ? "1.3s" : "5.2s"} ease-in-out infinite`,
        }}
      >
        {/* drifting gradient blobs = fluid movement */}
        <div
          className="absolute inset-[-30%] rounded-full blur-2xl"
          style={{
            background:
              "radial-gradient(circle at 40% 40%, var(--aura-blue) 0%, transparent 60%)",
            opacity: 0.55,
            animation: `aura-drift ${energetic ? "8s" : "16s"} ease-in-out infinite`,
          }}
        />
        <div
          className="absolute inset-[-30%] rounded-full blur-2xl"
          style={{
            background:
              "radial-gradient(circle at 60% 60%, var(--aura-violet) 0%, transparent 58%)",
            opacity: 0.5,
            animation: `aura-drift ${energetic ? "11s" : "21s"} ease-in-out infinite reverse`,
          }}
        />
        <div
          className="absolute inset-[-20%] rounded-full blur-xl"
          style={{
            background:
              "radial-gradient(circle at 50% 30%, var(--aura-cyan) 0%, transparent 45%)",
            opacity: state === "thinking" ? 0.5 : 0.32,
            animation: `aura-drift ${energetic ? "6.5s" : "13s"} ease-in-out infinite`,
          }}
        />

        {/* light distortion / refraction bands */}
        <div
          className="absolute inset-0 rounded-full mix-blend-screen opacity-25"
          style={{
            background:
              "repeating-conic-gradient(from 0deg, oklch(1 0 0 / 8%) 0deg 6deg, transparent 6deg 16deg)",
            animation: `aura-spin-slow ${state === "thinking" ? "12s" : "40s"} linear infinite`,
            maskImage:
              "radial-gradient(circle, #000 30%, transparent 78%)",
          }}
        />

        {/* glass shell + specular highlight */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 30% 22%, oklch(1 0 0 / 40%) 0%, oklch(1 0 0 / 6%) 18%, transparent 42%)",
          }}
        />
        <div
          className="absolute inset-0 rounded-full"
          style={{
            boxShadow: "inset 0 0 0 1px oklch(1 0 0 / 12%)",
          }}
        />

        {/* voice waveform inside orb */}
        <div
          className={cn(
            "absolute inset-x-0 bottom-1/2 flex translate-y-1/2 items-center justify-center gap-[3px] transition-opacity duration-500",
            state === "listening" || state === "speaking"
              ? "opacity-90"
              : "opacity-0",
          )}
        >
          {Array.from({ length: 13 }, (_, i) => (
            <span
              key={i}
              className="w-[3px] rounded-full"
              style={{
                height: `${18 + (i % 2 === 0 ? 26 : 12) + Math.abs(6 - i) * -2}px`,
                background:
                  "linear-gradient(180deg, var(--aura-cyan), var(--aura-violet))",
                animation: `aura-bar ${state === "speaking" ? 0.6 : 0.85}s ease-in-out ${i * 0.07}s infinite`,
              }}
            />
          ))}
        </div>
      </div>

      {/* particles */}
      <div className="pointer-events-none absolute inset-0 grid place-items-center">
        {particles.map((p, i) => (
          <span
            key={i}
            className="absolute rounded-full transition-opacity duration-500"
            style={
              {
                width: p.size,
                height: p.size,
                background:
                  i % 3 === 0 ? "var(--aura-cyan)" : "var(--aura-blue)",
                boxShadow: "0 0 8px currentColor",
                opacity: active ? 1 : 0.35,
                "--px": p.px,
                "--py": p.py,
                animation: `aura-particle ${p.dur} ease-out ${p.delay} infinite`,
                animationDuration: active ? p.dur : `calc(${p.dur} * 1.9)`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
}
