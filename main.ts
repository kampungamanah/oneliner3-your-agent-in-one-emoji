import fs from "node:fs";
import path from "node:path";

// The agent, in one glyph: 🐝 (U+1F41D, honeybee).
// Give it a task and it disappears into the work — checking sources, writing
// files, running commands — then comes back with the job done. No hovering,
// no hand-holding, just steady autonomous labour, task after task.
// The output is the glyph alone, with no trailing newline and nothing else.
const glyph = String.fromCodePoint(0x1f41d);

const targets = [process.env.MAKEFUN_OUTPUT_DIR, "/output"].filter(
  (dir): dir is string => Boolean(dir),
);

for (const dir of targets) {
  try {
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "entry.txt"), Buffer.from(glyph, "utf8"));
  } catch {
    // A destination that cannot be written is skipped; the other one counts.
  }
}
