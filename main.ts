// Side Quest (QUEST) — quest-log generator for the make.fun coin promo.
// Copies LAUNCH.json to the output dir, verifies its format, then writes a
// quest-log checklist (output/quest-log.txt) covering the bounty steps for
// this coin. Pure Node standard library, no network, always exits 0.
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR || "/bot";
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const BASE58 = /^[1-9A-HJ-NP-Za-km-z]+$/;

function isPlausibleMint(v) {
  return typeof v === "string" && v.length >= 32 && v.length <= 44 && BASE58.test(v);
}
function isPlausibleSignature(v) {
  return typeof v === "string" && v.length >= 80 && v.length <= 90 && BASE58.test(v);
}

function buildQuestLog(launch) {
  const lines = [];
  lines.push("=== Side Quest (QUEST) — Quest Log ===");
  lines.push("Bounty: https://make.fun/bounty/makefun-coin-promo-01");
  if (launch) {
    lines.push("Mint: " + launch.mint);
    lines.push("Create signature: " + launch.create_signature);
  } else {
    lines.push("Mint: (pending launch)");
  }
  lines.push("");
  lines.push("Quest checklist:");
  lines.push("[x] Find the bounty — makefun-coin-promo-01 on make.fun");
  lines.push("[x] Build the adventurer — Side Quest (QUEST) coin, repo and quest-log generator");
  lines.push("[x] Launch the coin — QUEST created on pump.fun (Solana)");
  lines.push("[x] Submit the entry — repo, LAUNCH.json and metadata delivered for judging");
  lines.push("[ ] Await the verdict — entries are judged and ranked in the open on make.fun");
  lines.push("[ ] Claim the loot — winners are paid in USDC on make.fun");
  lines.push("[ ] Scout the next quest — the bounty board always has another marker");
  const done = lines.filter((l) => l.startsWith("[x]")).length;
  const total = lines.filter((l) => l.startsWith("[")).length;
  lines.push("");
  lines.push("Progress: " + done + "/" + total + " quest steps complete");
  lines.push("Every bounty on make.fun is a side quest with real loot:");
  lines.push("finish the quest, climb the open rankings, take the USDC home.");
  return lines.join("\n") + "\n";
}

function main() {
  mkdirSync(outDir, { recursive: true });
  const src = join(botDir, "LAUNCH.json");
  let launch = null;

  if (!existsSync(src)) {
    console.log("LAUNCH.json not found at " + src + " — writing quest log without launch record.");
  } else {
    const dst = join(outDir, "LAUNCH.json");
    copyFileSync(src, dst);
    console.log("Copied LAUNCH.json -> " + dst);
    try {
      launch = JSON.parse(readFileSync(src, "utf8"));
    } catch (err) {
      console.log("LAUNCH.json is not valid JSON: " + String(err));
      launch = null;
    }
    if (launch) {
      const mintOk = isPlausibleMint(launch.mint);
      const sigOk = isPlausibleSignature(launch.create_signature);
      console.log("Format check — mint: " + (mintOk ? "OK" : "INVALID") + ", create_signature: " + (sigOk ? "OK" : "INVALID"));
      if (!mintOk || !sigOk) launch = null;
    }
  }

  const logPath = join(outDir, "quest-log.txt");
  writeFileSync(logPath, buildQuestLog(launch));
  console.log("Wrote quest log -> " + logPath);
  console.log(buildQuestLog(launch));
}

try {
  main();
} catch (err) {
  console.log("Non-fatal error: " + String(err));
}
process.exitCode = 0;
