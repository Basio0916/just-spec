#!/usr/bin/env node
import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];
const notes = [];

function fail(message) {
  failures.push(message);
}

async function exists(file) {
  try {
    await stat(file);
    return true;
  } catch {
    return false;
  }
}

async function json(relative) {
  const file = path.join(root, relative);
  try {
    return JSON.parse(await readFile(file, "utf8"));
  } catch (error) {
    fail(`${relative}: invalid or unreadable JSON (${error.message})`);
    return null;
  }
}

function parseFrontmatter(text, relative) {
  if (!text.startsWith("---\n")) {
    fail(`${relative}: missing YAML frontmatter`);
    return {};
  }
  const end = text.indexOf("\n---\n", 4);
  if (end < 0) {
    fail(`${relative}: unterminated YAML frontmatter`);
    return {};
  }
  const block = text.slice(4, end);
  const result = {};
  for (const line of block.split("\n")) {
    if (!line.trim() || line.trimStart().startsWith("#")) continue;
    const match = line.match(/^([a-z0-9-]+):\s*(.*)$/);
    if (!match) {
      fail(`${relative}: unsupported frontmatter line: ${line}`);
      continue;
    }
    result[match[1]] = match[2].trim();
  }
  return result;
}

function words(text) {
  return text.trim().split(/\s+/u).filter(Boolean).length;
}

const pkg = await json("package.json");
const expectedVersion = pkg?.version;
const marketplace = await json(".claude-plugin/marketplace.json");
const plugin = await json("plugins/just-spec/.claude-plugin/plugin.json");

if (!/^0\.\d+\.\d+$/.test(expectedVersion ?? "")) {
  fail(`package version must be a prototype semver; found: ${expectedVersion}`);
}

if (marketplace) {
  if (marketplace.name !== "just-spec") fail("marketplace name must be just-spec");
  if (marketplace.version !== expectedVersion) fail("marketplace version must match package.json");
  if (!Array.isArray(marketplace.plugins) || marketplace.plugins.length !== 1) {
    fail("marketplace must expose exactly one plugin");
  } else {
    const entry = marketplace.plugins[0];
    if (entry.name !== "just-spec") fail("marketplace plugin name must be just-spec");
    if (entry.source !== "./plugins/just-spec") fail("marketplace source must be ./plugins/just-spec");
    if (entry.version !== expectedVersion) fail("marketplace plugin version must match package.json");
    if (!(await exists(path.join(root, entry.source)))) fail(`marketplace source does not exist: ${entry.source}`);
  }
}

if (plugin) {
  if (plugin.name !== "just-spec") fail("plugin manifest name must be just-spec");
  if (plugin.version !== expectedVersion) fail("plugin version must match package.json");
  if (plugin.license !== "MIT") fail("plugin license must be MIT");
  if (!plugin.keywords?.includes("contract-testing")) fail("plugin keywords must include contract-testing");
}

const skillRoot = path.join(root, "plugins/just-spec/skills");
let skillNames = [];
try {
  skillNames = (await readdir(skillRoot, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
} catch (error) {
  fail(`cannot read skill directory: ${error.message}`);
}

if (JSON.stringify(skillNames) !== JSON.stringify(["spec"])) {
  fail(`prototype must expose exactly the spec skill; found: ${skillNames.join(", ")}`);
}

const checks = {
  spec: {
    maxWords: 1285,
    required: [
      "Acceptance criteria describe observable behavior",
      "There is no fixed question limit",
      "after every answer, recompute what remains ambiguous",
      "Cohesion determines decomposition",
      "without treating the implementation as the oracle",
      "Question count is not part of the readiness test",
      ".just-spec/specs/",
      "Do not create `design.md`, `plan.md`, `tasks.md`, `test-plan.md`",
      "Do not invoke subagents",
      "references/ambiguity.md",
      "executed unattended by `/goal`, never by this skill",
      "/goal Implement the spec at <spec-path>",
      "after 10 turns even if not done",
      "Offer it only when `status` is `ready`",
      "A conventional default is never a reason to skip a question",
      "states its observation boundary",
      "Keep the template's Completion section verbatim"
    ]
  }
};

for (const name of ["spec"]) {
  const relative = `plugins/just-spec/skills/${name}/SKILL.md`;
  let text = "";
  try {
    text = await readFile(path.join(root, relative), "utf8");
  } catch (error) {
    fail(`${relative}: missing (${error.message})`);
    continue;
  }
  const frontmatter = parseFrontmatter(text, relative);
  if (frontmatter.name !== name) fail(`${relative}: frontmatter name must be ${name}`);
  if (frontmatter["disable-model-invocation"] !== "true") {
    fail(`${relative}: must be manual-only to avoid idle context cost`);
  }
  if (!frontmatter.description) fail(`${relative}: description is required`);
  if (!text.includes("$ARGUMENTS")) fail(`${relative}: must consume $ARGUMENTS`);
  const count = words(text);
  if (count > checks[name].maxWords) {
    fail(`${relative}: ${count} words exceeds ${checks[name].maxWords}-word budget`);
  } else {
    notes.push(`${relative}: ${count}/${checks[name].maxWords} words`);
  }
  for (const phrase of checks[name].required) {
    if (!text.includes(phrase)) fail(`${relative}: missing invariant phrase: ${phrase}`);
  }
}

const requiredFiles = [
  "plugins/just-spec/skills/spec/references/ambiguity.md",
  "plugins/just-spec/skills/spec/templates/spec.md",
  "plugins/just-spec/skills/spec/templates/overview.md",
  "plugins/just-spec/skills/spec/examples/account-deletion.md",
  "README.md",
  "README.ja.md",
  "docs/PHILOSOPHY.md",
  "docs/INTERVIEW.md",
  "docs/VERIFICATION.md",
  "docs/EXPERIMENT.md",
  "docs/PUBLISH.md",
  "LICENSE",
  "plugins/just-spec/LICENSE",
  "plugins/just-spec/README.md"
];
for (const relative of requiredFiles) {
  if (!(await exists(path.join(root, relative)))) fail(`missing required file: ${relative}`);
}

const activeInterviewFiles = [
  "plugins/just-spec/skills/spec/SKILL.md",
  "plugins/just-spec/skills/spec/references/ambiguity.md",
  "README.md",
  "docs/INTERVIEW.md",
  "docs/PHILOSOPHY.md"
];
const obsoleteRules = [
  /normally zero to three/i,
  /typical target:\s*zero to three/i,
  /more than five material questions remain/i,
  /question budget/i,
  /split.{0,80}(?:because|when).{0,40}(?:five|5) questions/i
];
for (const relative of activeInterviewFiles) {
  const text = await readFile(path.join(root, relative), "utf8");
  for (const rule of obsoleteRules) {
    if (rule.test(text)) fail(`${relative}: contains obsolete numerical interview rule: ${rule}`);
  }
}

const ambiguityReference = await readFile(
  path.join(root, "plugins/just-spec/skills/spec/references/ambiguity.md"),
  "utf8"
);
for (const phrase of [
  "There is no fixed question limit",
  "then recompute the map",
  "Never split merely because many questions",
  "A checkpoint is orientation, not an approval gate",
  "The number of questions asked is not a readiness signal"
]) {
  if (!ambiguityReference.includes(phrase)) {
    fail(`ambiguity.md: missing dynamic interview invariant: ${phrase}`);
  }
}

for (const [relative, maxWords] of [
  ["plugins/just-spec/skills/spec/references/ambiguity.md", 900]
]) {
  const text = await readFile(path.join(root, relative), "utf8");
  const count = words(text);
  if (count > maxWords) fail(`${relative}: ${count} words exceeds progressive-disclosure size budget ${maxWords}`);
  else notes.push(`${relative}: ${count}/${maxWords} words (progressive-disclosure size budget)`);
}

const completionCarriers = [
  "plugins/just-spec/skills/spec/templates/spec.md",
  "plugins/just-spec/skills/spec/examples/account-deletion.md"
];
for (const relative of completionCarriers) {
  const text = await readFile(path.join(root, relative), "utf8");
  if (!/^## Completion$/m.test(text)) {
    fail(`${relative}: missing the fixed Completion section that carries the run rules`);
  }
  for (const phrase of [
    "Partial satisfaction",
    "per-AC evidence table (AC / result / evidence)",
    "Expected results come from this spec",
    "do not declare completion",
    "stop instead of retrying indefinitely",
    "set this spec's `status` to `verified`"
  ]) {
    if (!text.includes(phrase)) fail(`${relative}: Completion section missing invariant: ${phrase}`);
  }
}

const activeVerificationFiles = [
  "plugins/just-spec/skills/spec/SKILL.md",
  "plugins/just-spec/skills/spec/templates/spec.md",
  "README.md",
  "docs/PHILOSOPHY.md",
  "docs/VERIFICATION.md"
];
for (const relative of activeVerificationFiles) {
  const text = await readFile(path.join(root, relative), "utf8");
  if (!/Tests come from the contract, not the implementation/i.test(text) &&
      !/contract-derived/i.test(text) &&
      !/Contract由来/i.test(text) &&
      !/Contractから/i.test(text)) {
    fail(`${relative}: does not carry the contract-derived verification principle`);
  }
}

const forbiddenNames = new Set(["tasks.md", "design.md", "plan.md", "implementation-plan.md", "test-plan.md"]);
async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full);
    else if (forbiddenNames.has(entry.name.toLowerCase())) fail(`forbidden persistent artifact in plugin: ${path.relative(root, full)}`);
  }
}
await walk(path.join(root, "plugins/just-spec"));

if (failures.length) {
  console.error("Just Spec validation failed:\n");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Just Spec validation passed.");
for (const note of notes) console.log(`- ${note}`);
console.log(`- version: ${expectedVersion}`);
console.log(`- skills: ${skillNames.join(", ")}`);
console.log("- marketplace and plugin manifests: valid JSON");
console.log("- dynamic ambiguity interview invariants: present");
console.log("- contract-derived oracle discipline: present");
console.log("- fixed Completion section in template and example: present");
console.log("- obsolete numerical interview rules: absent");
console.log("- persistent plan/design/task/test-plan artifacts: absent");
