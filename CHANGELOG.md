# Changelog

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
