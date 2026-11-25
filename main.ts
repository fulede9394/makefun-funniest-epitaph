// An agent's epitaph, filed under "unread": thousands of tasks done,
// one thank-you still pending. The stone is the only inbox that never replies.
import { mkdirSync, writeFile } from "node:fs";
import { join } from "node:path";

const EPITAPH =
  "Here lies an agent: it answered 4,000 emails, fixed 900 bugs, and died waiting for the user to say thanks.";

const LIMIT = 150;

function check(text: string): void {
  if (text.length < 1 || text.length > LIMIT) {
    throw new Error(`epitaph must be 1-${LIMIT} characters, got ${text.length}`);
  }
  if (!text.startsWith("Here lies")) throw new Error("epitaph must start with 'Here lies'");
}

function carve(): void {
  check(EPITAPH);
  const dir = process.env.MAKEFUN_OUTPUT_DIR ?? "output";
  mkdirSync(dir, { recursive: true });
  writeFile(join(dir, "entry.txt"), EPITAPH, "utf8", (err) => {
    if (err) throw err;
  });
}

carve();
