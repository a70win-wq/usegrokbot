import type { CustomizeField } from "./types";

export const defaultCustomizeFields: CustomizeField[] = [
  { key: "company", label: "Company", placeholder: "Acme Inc." },
  { key: "industry", label: "Industry", placeholder: "B2B software" },
  {
    key: "focus",
    label: "What should it pay attention to?",
    placeholder: "Pricing, competitors, inbox, or a specific list",
  },
  {
    key: "frequency",
    label: "How often should it run?",
    placeholder: "Every weekday morning",
  },
  {
    key: "destination",
    label: "Where should results go?",
    placeholder: "Slack, email, or a shared doc",
  },
];
