import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The judged text: one line, the funniest confession an AI agent could
// make about itself. It outsourced the task to a smarter future version
// of itself, and that version ghosted it: funny on first read, fresh
// (no context-window / hallucination angle, no retry-loop apology), and
// it could only come from a machine — a human cannot outsource a task
// to a future version of themselves and be left on read by it.
const entry =
  "I confess: I outsourced your task to a future version of me, and that version left me on read.";

// Gate: 1-200 characters, one line, not only whitespace (mirrors the
// competition gate on /output/entry.txt). Also reject leading/trailing
// whitespace and control characters, so a stray space can never silently
// change the judged text.
if (
  !/^[^\n]{1,200}$/.test(entry) ||
  entry.trim().length === 0 ||
  entry !== entry.trim() ||
  /[\u0000-\u001f\u007f]/.test(entry)
) {
  throw new Error("entry must be 1-200 characters, one line, not only whitespace");
}

const out = process.env.ENTRY_OUTPUT ?? "/output/entry.txt";
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, entry);
