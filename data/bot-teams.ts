export type BotTeamRoleId =
  | "coordinator"
  | "inbox"
  | "calendar"
  | "briefing"
  | "researcher"
  | "writer"
  | "visual"
  | "publisher"
  | "account-research"
  | "outreach"
  | "crm"
  | "product-manager"
  | "engineering-manager"
  | "builders"
  | "reviewer"
  | "scouts"
  | "analyst"
  | "archivist"
  | "general-manager"
  | "finance"
  | "operations"
  | "support"
  | "life-door"
  | "family-calendar"
  | "shopping"
  | "travel";

export type BotTeam = {
  slug: string;
  rank: number;
  roleIds: readonly BotTeamRoleId[];
  templateIds: readonly string[];
  exampleSlugs: readonly string[];
};

export const botTeams: readonly BotTeam[] = [
  {
    slug: "executive-team",
    rank: 1,
    roleIds: ["coordinator", "inbox", "calendar", "briefing"],
    templateIds: [
      "XjQ-AZTMrGLmQOTeMu3LF",
      "Nmv2fCQEcQc3EHzVXJZKN",
      "yH2UttxbMwMugweZrigHT",
      "tttQVA2UtlNwCzITNCIr0",
    ],
    exampleSlugs: [
      "ridark-eth-i-gave-elon-musks-new-grok-bot-an-org-chart-inst",
      "firstmate-kun-chen",
    ],
  },
  {
    slug: "content-team",
    rank: 2,
    roleIds: ["coordinator", "researcher", "writer", "visual", "publisher"],
    templateIds: [
      "37ZOM10GzlSOQpMjRp7KB",
      "bjsbaj_a2ds2pQY1YiXqE",
      "JZAccYtlRFvDSU2CnMnkZ",
      "Do4CujP_kqnnc1KYnpOfI",
    ],
    exampleSlugs: [
      "beamnxw-i-gave-grok-bot-one-simple-job-run-a-viral-conte",
      "izriel100k-spent-the-day-building-out-a-full-grok-bot-team",
    ],
  },
  {
    slug: "sales-team",
    rank: 3,
    roleIds: ["coordinator", "account-research", "outreach", "crm"],
    templateIds: [
      "fcJJMM58AdXSTBdW3xWyW",
      "_OlL8LPI6lc2xi82F4Gf7",
      "YkmZEZYBk-BqylyQbM3kq",
      "xF12c5y4LVe7nf7IFguWI",
    ],
    exampleSlugs: [
      "startupideaspod-grok-bot-is-my-head-of-sales-for-my-newsletter",
      "three-employees-scotty-beam",
    ],
  },
  {
    slug: "product-engineering-team",
    rank: 4,
    roleIds: ["product-manager", "engineering-manager", "builders", "reviewer"],
    templateIds: [
      "FU-Ev6_Ju4lFGWwWRD0GD",
      "sQDD87Gp6VLT0m99tFpzu",
      "rt629UEZFtE4Wz0A_0c37",
      "Bu2sEQqu0hEjpbzN_07D3",
    ],
    exampleSlugs: [
      "n2parko-cos-em-five-eng-ics-databricks-pm",
      "duyet-i-am-turning-grok-bot-into-a-small-team-where-ea",
      "88n77n-i-left-grok-bot-with-one-side-project-at-80-six",
    ],
  },
  {
    slug: "research-team",
    rank: 5,
    roleIds: ["coordinator", "scouts", "analyst", "archivist"],
    templateIds: [
      "Nn0ykGa3vJ6YS7ib7F6yH",
      "W4Z5pvEm6UgCml48Ig4dT",
      "12Gbp1lPVsfTVAHPXKd3B",
      "rthl9MdskO2f-JCzmyINP",
    ],
    exampleSlugs: ["gippp69-grok-bot-a-second-auditor-bot-is-basically-a-tin"],
  },
  {
    slug: "business-operations-team",
    rank: 6,
    roleIds: ["general-manager", "finance", "operations", "support"],
    templateIds: [
      "fkM4b8n4RqZTbrq5fw5L_",
      "CEtFUY1_kkn78AJSNINHI",
      "-kO6HrXokJZANVwUOMZO9",
      "gCWYD009F66A3XDEYdZgf",
    ],
    exampleSlugs: [
      "webjuice-ie-11-seats-multi-seat-grok-bot-fleet-i-talk-to-coo",
      "0x-anni-grok-bot-is-the-first-ai-thing-that-changed-what",
      "sebastianroehl-seeing-the-bots-in-bot-communicate-and-work-toge",
    ],
  },
  {
    slug: "personal-family-team",
    rank: 7,
    roleIds: ["life-door", "family-calendar", "shopping", "travel"],
    templateIds: [
      "uY_7s1TZILVzUeJ9lLOx9",
      "3U6zxtPa1b8GbWheaIr4J",
      "6I-yjMRU1BmiYNfZgWXBK",
      "m7sSNlYWSxqrsHrMiEnsh",
    ],
    exampleSlugs: [
      "sir-kaz-cow-weve-just-setup-grok-bot-s-one-as-chief-of-staff",
      "household-bots-blake-king",
    ],
  },
];

export function getBotTeam(slug: string) {
  return botTeams.find((team) => team.slug === slug);
}
