#!/usr/bin/env node
import { mkdir, readFile, rm } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pkg = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));
const dist = path.join(root, "dist");
const zip = path.join(dist, `just-spec-${pkg.version}.zip`);

const validate = spawnSync(process.execPath, [path.join(root, "scripts/validate.mjs")], {
  cwd: root,
  stdio: "inherit"
});
if (validate.status !== 0) process.exit(validate.status ?? 1);

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

const excludes = [
  ".git/*",
  "dist/*",
  "node_modules/*",
  ".DS_Store"
];
const args = ["-q", "-9", "-X", "-r", zip, "."];
for (const pattern of excludes) args.push("-x", pattern);

const result = spawnSync("zip", args, { cwd: root, stdio: "inherit" });
if (result.status !== 0) {
  console.error("zip command failed; install zip or create the archive manually");
  process.exit(result.status ?? 1);
}
console.log(`Created ${zip}`);
