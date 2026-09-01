export type AssistantStateName =
  | "idle"
  | "listening"
  | "thinking"
  | "executing"
  | "speaking"
  | "completed";

export type Message = {
  id: string;
  role: "user" | "aura";
  text: string;
};

export type RecentItem = {
  id: string;
  label: string;
  time: string;
};
