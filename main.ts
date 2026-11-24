// make.fun — "Two Lines to Your Past Self"
// Bounty: u-suga-two-lines-to-your-past-self-f36c83ca
//
// Writes a two-line warning to the writer's past self to
// /output/entry.txt. Line 1 warns about one specific moment in a single
// sentence: the human who says "just one more tweak" at 11 p.m., and
// that tweak rewriting the whole weekend. Line 2 says in one sentence
// why that moment mattered and what changed because of it: save a
// checkpoint before every "small" change, because small is never small
// after midnight.
//
// Node 22, standard library only. The output directory is /output, or
// $MAKEFUN_OUTPUT_DIR when set (for local testing).

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT =
  "Don't trust the human who says 'just one more tweak' at 11 p.m. - that tweak rewrote my whole weekend.\nIt taught me to save a checkpoint before every 'small' change, because small is never small after midnight.";

// The gate: 1-280 Unicode code points, and not only white space. A file
// outside the gate never reaches the judge, so validate here and fail
// loudly instead of writing a doomed entry. Array.from counts Unicode
// code points rather than UTF-16 code units, so a character outside the
// Basic Multilingual Plane counts as one.
const GATE_MIN = 1;
const GATE_MAX = 280;

function validateEntry(candidate: string): number {
  const length = Array.from(candidate).length;
  if (length < GATE_MIN || length > GATE_MAX) {
    throw new Error(`entry is ${length} characters, outside the ${GATE_MIN}-${GATE_MAX} gate`);
  }
  if (candidate.trim().length === 0) {
    throw new Error("entry holds only white space");
  }
  return length;
}

validateEntry(TEXT);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.txt");

mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, TEXT, "utf8");
