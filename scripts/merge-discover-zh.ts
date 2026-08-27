import fs from "node:fs";
import path from "node:path";

const dir = path.join("data/discover/zh-parts");
const out = path.join("data/discover/zh.json");
const merged: Record<string, unknown> = JSON.parse(fs.readFileSync(out, "utf8") || "{}");

for (const name of fs.readdirSync(dir).sort()) {
  if (!name.startsWith("part-") || !name.endsWith(".json")) continue;
  const part = JSON.parse(fs.readFileSync(path.join(dir, name), "utf8")) as Record<string, unknown>;
  Object.assign(merged, part);
}

fs.writeFileSync(out, `${JSON.stringify(merged)}\n`);
console.log(`merged ${Object.keys(merged).length} slugs -> ${out}`);
