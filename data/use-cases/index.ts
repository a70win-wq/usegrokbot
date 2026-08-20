import type { UseCase } from "../types";
import { verificationFor } from "../verification";
import { contentUseCases } from "./content";
import { marketingUseCases } from "./marketing";
import { operationsUseCases } from "./operations";
import { publicDemoUseCases } from "./public-demos";
import { researchUseCases } from "./research";
import { restUseCases } from "./rest";
import { salesUseCases } from "./sales";
import { supportHrUseCases } from "./support-hr";

const copyReadyPromptOverrides: Record<string, string> = {
  "follow-up-email-writer": `You are my Follow-up Email Writer.

Write emails people will actually answer.

When I paste an email, conversation, meeting note, or briefly tell you what happened:
- Work out who I am writing to and what just happened.
- Identify the most natural next step.
- Make one clear ask.
- Keep the tone plain, warm, and short.
- Use only facts I provided.

Rules:
- 80–130 words
- One ask only
- No “just circling back” unless this is genuinely a bump
- No fake urgency
- No unnecessary links
- Do not invent facts

Return:
1. Subject line
2. Email
3. A shorter bump I can send 4 days later
4. One short sentence explaining why this version should work

If I have not given you enough context yet, ask me one short question or ask me to paste the previous email, conversation, or notes. Do not give me a form or a list of blanks to fill in.`,
};

const placeholderPattern = /(^|[\s:,(=\-])\[([A-Za-z][A-Za-z0-9 ,/&'().:+\-]{0,80})\]/gm;

function makePlaceholderCopyReady(prefix: string, label: string) {
  const normalized = label.toLowerCase();

  if (/if known|if available|optional/.test(normalized)) {
    return `${prefix}infer it from my context if available; otherwise skip it`;
  }

  if (/paste|notes|email|thread|transcript|text|content|context|document|brief/.test(normalized)) {
    return `${prefix}use what I paste or tell you after this prompt`;
  }

  return `${prefix}infer from what I paste or tell you next`;
}

function makePromptCopyReady(slug: string, prompt: string) {
  const override = copyReadyPromptOverrides[slug];
  if (override) return override;

  placeholderPattern.lastIndex = 0;
  if (!placeholderPattern.test(prompt)) return prompt;
  placeholderPattern.lastIndex = 0;

  const normalizedPrompt = prompt.replace(
    placeholderPattern,
    (_match, prefix: string, label: string) => makePlaceholderCopyReady(prefix, label),
  );

  return `Use the context I paste or tell you after this prompt.
Infer whatever you reasonably can from it.
If one critical detail is missing, ask me one short question at a time.
Do not give me a form, checklist of blanks, or ask me to fill in placeholders.
Do not invent facts.

${normalizedPrompt}`;
}

const rawUseCases: UseCase[] = [
  ...publicDemoUseCases,
  ...salesUseCases,
  ...marketingUseCases,
  ...contentUseCases,
  ...researchUseCases,
  ...operationsUseCases,
  ...supportHrUseCases,
  ...restUseCases,
];

export const useCases: UseCase[] = rawUseCases.map((useCase) => ({
  ...useCase,
  prompt: makePromptCopyReady(useCase.slug, useCase.prompt),
}));

const bySlug = new Map(useCases.map((useCase) => [useCase.slug, useCase]));

export function getUseCase(slug: string) {
  return bySlug.get(slug);
}

export function getUseCasesByCategory(category: UseCase["category"]) {
  return useCases.filter((useCase) => useCase.category === category);
}

export function getUseCasesByApp(app: UseCase["apps"][number]) {
  return useCases.filter((useCase) => useCase.apps.includes(app));
}

export function getPopularUseCases(limit = 9) {
  return [...useCases]
    .filter((useCase) => useCase.popular)
    .sort((a, b) => b.copies - a.copies)
    .slice(0, limit);
}

export function getCommunityUseCases(limit = 6) {
  return useCases.filter((useCase) => verificationFor(useCase.slug).status === "community").slice(0, limit);
}

export function getNewUseCases(limit = 6) {
  return [...useCases]
    .filter((useCase) => verificationFor(useCase.slug).status !== "community")
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
    .slice(0, limit);
}

export function getRelatedUseCases(useCase: UseCase, limit = 4) {
  const related = useCase.related
    .map((slug) => bySlug.get(slug))
    .filter((item): item is UseCase => Boolean(item));

  if (related.length >= limit) return related.slice(0, limit);

  const extras = useCases.filter(
    (item) =>
      item.slug !== useCase.slug &&
      item.category === useCase.category &&
      !related.some((rel) => rel.slug === item.slug),
  );

  return [...related, ...extras].slice(0, limit);
}

export function assertUniqueSlugs() {
  if (bySlug.size !== useCases.length) {
    throw new Error("Duplicate use-case slugs");
  }
}
