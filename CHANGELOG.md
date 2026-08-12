# Changelog

## 0.7.2 — 2026-08-12

Added the one element the offered `/goal` condition was missing: a turn cap, so a run that fails to converge on a defective spec burns a bounded number of turns instead of looping forever.

- Extended the `/goal` line that `/just-spec:spec` offers with a hard-coded 10-turn cap and a cap-stop report: stop after 10 turns even if not done, declare nothing complete, and report which ACs are PASS, which are not and why, and a summary of what was done. The line remains a fixed template — the only variable part is the spec path.
- The cap is a runaway guard, not a target: a complete spec normally finishes in far fewer turns, and 10 is set so that normal work splitting, environment hiccups, and an escalation report never reach it. Both READMEs now say so next to the sample, and the attended-session fallback request carries the same cap.
- Guarded the clause in CI: `scripts/validate.mjs` now requires the cap phrase in the skill, and the skill's word budget rose by the minimal amount the clause costs (1250 → 1285).
- The interview flow, the spec template, and the question rules are unchanged.

## 0.7.1 — 2026-08-12

Settled how the name reads and aligned every surface that introduces the project with the position it now holds: `/goal` runs the loop, and Just Spec makes the condition it runs on.

- Moved the reading of the name to the top of README (English and Japanese): *just the spec* — no plan, no task list, no execution machinery, one spec handed straight to `/goal`. `Persistent What. Ephemeral How.` stays directly below it.
- Rewrote the opening so the division of labour is clear before the first section heading: `/goal` runs unattended until its condition holds, Just Spec builds that condition through the discipline of the interview — four materiality conditions, options with a recommendation, `🤖` on inferred items, rejected options recorded with the reason, and per-AC evidence plus a stop-with-question written into the spec itself.
- Corrected the two-command leftovers: the section is now `The Command` / 「ひとつのコマンド」, and the plugin exposes one skill.
- Replaced the "low-ceremony" self-description everywhere it introduced the project — the GitHub repository description, `marketplace.json`, `plugin.json`, `plugins/just-spec/README.md`, and the publish example in `docs/PUBLISH.md` — and dropped the `low-ceremony` tag from both manifests. Lightness was never the claim; the claim is that the spec is a sufficient contract for `/goal`.
- Left the skills, templates, and references untouched. This release changes documentation and metadata only.

## 0.7.0 — 2026-08-12

Repositioned Just Spec as the upstream half of loop engineering: execution moved to Claude Code's `/goal`, the `build` command was removed, and the spec phase was raised to the standard an unattended run requires.

- Removed `/just-spec:build` and its verification reference. The plugin now exposes one command, and the loop — driving, retrying, judging completion — is Claude Code's own `/goal`.
- Made `/just-spec:spec` end by offering a copyable `/goal` line for a `ready` spec. The condition points at the spec path, is the same length whatever the spec's size, and requires reading the spec, every AC `PASS`, a per-AC evidence table, no Constraint violation, and a stop-with-question instead of completion when an AC is unsatisfiable.
- Moved the rules of the run into the spec: `templates/spec.md` now carries a fixed Completion section covering the definition of done, contract-derived expected results, honest evidence, unsatisfiable ACs, repeatedly failing fixes, and the closing `status` update.
- Stopped a conventional default from excusing a question. The existence of a default and the materiality of the decision are judged separately, with list sort order, the source of a date or time, numbering, tie-breaking, and rounding called out as the types that slip through.
- Required UI acceptance criteria to state their observation boundary — what is executed and in which output the result is checked — and to settle the verification means during the spec phase when the repository lacks the test basis. Domain and service ACs are unchanged.
- Rewrote README (English and Japanese) around the upstream position, added the attended-session request for environments without `/goal`, documented where `build` went, removed unattended execution from the list of things Just Spec is not for, and stated that the evaluator cannot tell an honest evidence table from a dishonest one.
- Updated `scripts/validate.mjs` for the single-skill surface and added checks that the fixed Completion section survives in the template and the example.
- Kept the spec file layout, contract-derived verification, and `Persistent What. Ephemeral How.` unchanged.

## 0.6.0 — 2026-08-11

Repositioned Just Spec from a lighter spec-driven workflow to one that concentrates human review on the spec, and strengthened what reaches the human and what the spec records.

- Extended the third materiality condition to cover hard-to-reverse choices such as transaction boundaries, event publication, concurrency control, cache coherence, and schema design, without widening it to reversible day-to-day choices.
- Moved questions to the `AskUserQuestion` tool, one per prompt, recommended option first, with plain text as the fallback.
- Added a comparison format for hard-to-reverse branches: each option's upside and downside plus a recommendation grounded in Out of Scope, existing Decisions, or the current codebase standard. Simple confirmations keep the plain option list.
- Extended Material Decisions to record the chosen option, the main rejected option, the model-authored rationale, and optional invariant and revisit conditions. The human is never asked to justify a choice; going against the recommendation offers an optional, skippable note.
- Added the `🤖` mark for items inferred from the codebase, so spec review can separate confirming a decision from checking an inference.
- Added a handoff line pointing the human at the spec and the marked items, as orientation rather than an approval gate.
- Rewrote README, `docs/PHILOSOPHY.md`, and `docs/INTERVIEW.md` around review concentration, reframed the Plan Mode comparison as permission mode versus artifact protocol, and stated plainly that detectors cannot catch a missing contract.
- Kept the two-command surface, the spec file layout, and `Persistent What. Ephemeral How.` unchanged.

## 0.5.0 — 2026-08-09

Prepared the prototype for public release under `Basio0916/just-spec`.

- Changed the marketplace name from `just-spec-marketplace` to `just-spec`, so installation is `just-spec@just-spec`.
- Updated repository and author URLs to `Basio0916/just-spec`.
- Replaced the long README with a concise Japanese public-facing overview focused on value, usage, Plan Mode differentiation, scope, and experimental status.
- Kept the two-skill workflow and runtime-context reductions from v0.4.0 unchanged.

## 0.4.0 — 2026-08-09

Reduced runtime context without changing the two-command workflow or its behavioral guarantees.

- Cut both active `SKILL.md` files to their normal execution path and removed repeated rationale and prohibitions.
- Moved uncommon ambiguity, decomposition, test-double, existing-test-conflict, and oracle-independence guidance behind progressive-disclosure references.
- Renamed `ambiguity-gate.md` to the shorter `ambiguity.md` and removed duplication between skill and reference text.
- Tightened validator word budgets and added checks for progressive-disclosure references.
- Kept dynamic material-ambiguity resolution, semantic decomposition, ephemeral planning, contract-derived tests, and AC evidence unchanged.

## 0.3.0 — 2026-08-09

Changed verification from generic “add tests and report AC evidence” to explicit contract-derived oracle discipline without adding another command or mandatory phase.

- Added `Tests come from the contract, not the implementation` as a core principle.
- Made test-file timing flexible; Test First, TDD, and Red-Green-Refactor are not mandatory for feature work.
- Added ephemeral verification obligations derived from each AC before changed production code is accepted as correct.
- Strengthened AC authoring to require observable outcomes that remain stable across internal refactors.
- Added rules against snapshotting current output, implementation-shaped assertions, copied production logic, weakened expectations, and test mutation solely for green.
- Added fail-before-fix guidance for regressions when practical, framed as oracle validation rather than design TDD.
- Added oracle-independence self-review and explicit verification limitations in the final report.
- Added `docs/VERIFICATION.md`, evaluator/hidden-test experiment metrics, and validation assertions.

## 0.2.0 — 2026-08-09

Changed the material-ambiguity interview from a numerical question budget to an adaptive readiness process.

- Removed the “normally zero to three / more than five means split” behavior.
- Added high-leverage question ordering and full ambiguity recomputation after every answer.
- Made behavioral readiness, not question count, the interview completion condition.
- Made semantic cohesion the only decomposition rule; many questions no longer imply multiple specs.
- Added non-blocking conversation checkpoints for longer interviews.
- Added `docs/INTERVIEW.md` and validation assertions for the new invariants.

## 0.1.0 — 2026-08-09

Initial prototype.

- Added `/just-spec:spec` with a material ambiguity gate and human-readable behavioral contracts.
- Added `/just-spec:build` with ephemeral planning, coherent implementation, and AC evidence.
- Added Claude Code marketplace and plugin manifests.
- Added paired Plan Mode evaluation protocol.
- Kept the default surface to two manually invoked skills with no subagents or persistent task/design artifacts.
