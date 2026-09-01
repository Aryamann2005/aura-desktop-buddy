import { createFileRoute } from "@tanstack/react-router";
import { AuraApp } from "@/components/aura/AuraApp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AURA — Futuristic AI Assistant for Windows" },
      {
        name: "description",
        content:
          "AURA is a premium AI voice assistant for Windows: a living AI orb, natural conversation, instant app control and system awareness.",
      },
      { property: "og:title", content: "AURA — AI Assistant for Windows" },
      {
        property: "og:description",
        content:
          "A next-generation native desktop AI assistant: voice-first, cinematic, and beautifully minimal.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AuraApp,
});
