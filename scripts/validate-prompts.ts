import { useCases } from "../data/use-cases";

const placeholderPattern = /(^|[\s:,(=\-])\[([A-Za-z][A-Za-z0-9 ,/&'().:+\-]{0,80})\]/gm;

const failures = useCases.flatMap((useCase) => {
  placeholderPattern.lastIndex = 0;
  return placeholderPattern.test(useCase.prompt) ? [useCase.slug] : [];
});

if (failures.length > 0) {
  throw new Error(
    `These workflows still expose fill-in-the-blank placeholders: ${failures.join(", ")}`,
  );
}

console.log(`Validated ${useCases.length} copy-ready workflow prompts.`);
