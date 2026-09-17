import { runSubmitIndexNow } from "./lib/indexnow.mjs";

try {
  const result = await runSubmitIndexNow({
    argv: process.argv.slice(2),
    log: (message) => console.log(message),
  });
  process.exit(result.posted || result.dryRun ? 0 : 1);
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(message);
  process.exit(1);
}
