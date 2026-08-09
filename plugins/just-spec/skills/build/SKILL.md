---
name: build
description: Implement one ready Just Spec as a coherent change, derive verification from the contract rather than the implementation, and report evidence for every acceptance criterion. Use explicitly after /just-spec:spec.
disable-model-invocation: true
argument-hint: <spec path or slug>
---

# Just Spec: Build

Input: `$ARGUMENTS`

Implement one ready behavioral contract and verify every AC with evidence. Decide implementation details internally; do not persist or ask approval for an implementation plan.

## Principles

- The spec is the source of truth for **what**; the implementation plan is ephemeral **how**.
- Verify behavior compliance, not plan completion.
- Tests come from the contract, not the implementation. Expected results must not come from production internals or observed current output.
- Test order is not a quality gate. Test First, TDD, and Red-Green-Refactor are optional for feature work.
- Do not create `plan.md`, `design.md`, `tasks.md`, `test-plan.md`, microtask queues, or separate review artifacts. Do not invoke subagents by default.
- Decide reversible implementation details autonomously. Ask only when a discovery changes the behavioral contract materially.
- Preserve unrelated working-tree changes. Do not commit, push, or open a PR unless explicitly asked.

Read `${CLAUDE_SKILL_DIR}/references/verification.md` only when the evidence boundary, test doubles, existing-test conflicts, or oracle independence is unclear.

## Workflow

### 1. Resolve the spec and protect the worktree

Resolve `$ARGUMENTS` as an explicit path or a slug under `.just-spec/specs/`. If multiple specs match, ask which one; never choose the newest silently.

Return to `/just-spec:spec` without implementing when:

- status is not `ready` or `partial`;
- material open questions remain;
- ACs lack implementation-independent success conditions; or
- the request combines multiple independently verifiable specs.

Inspect the worktree before editing. Read repository guidance and only the code, tests, public interfaces, and stable domain boundaries relevant to this contract. Do not discard, overwrite, stage, or revert unrelated user changes.

### 2. Derive ephemeral verification obligations

Before accepting changed production code as correct, derive a verification map from the Spec/ACs. Keep it internal and do not request approval.

For every AC identify:

- preconditions and representative inputs;
- action or event;
- observable output, state change, side effect, invariant, or prohibited behavior;
- contract-justified boundary and negative cases;
- the strongest practical evidence boundary; and
- the test or command needed to execute it.

You may inspect public interfaces, test frameworks, fixtures, helpers, and integration points. Do not use private methods, internal branches, class structure, chosen algorithms, mock call order, or current production output as the reason an expected result is correct.

### 3. Implement and verify as one coherent pass

Follow existing conventions and change only what the contract requires. Keep execution strategy ephemeral; do not output a detailed plan.

Tests may be written before, during, or after production code. In every case:

- inputs, cases, and expected results must trace to the contract or a recorded material decision;
- prefer the highest stable boundary that directly proves the AC at reasonable cost;
- focused unit tests are valid for pure domain rules behind stable interfaces;
- fakes, stubs, and mocks may control external boundaries, but wiring assertions are not a substitute for behavioral proof;
- do not replace expected values with observed implementation output, remove cases, weaken assertions, or mutate fixtures merely to obtain green tests; and
- for regressions, reproduce the reported failure before the fix when practical; otherwise report the limitation.

Run focused checks while working, then the broadest practical tests, lint, type checks, or build checks. Fix failures introduced by this change.

### 4. Handle discoveries

Resolve implementation discoveries—file placement, helper shape, local refactoring, test mechanics—autonomously.

Stop only for contract discoveries such as new user-visible behavior, public/shared contracts, authorization, retention, destructive behavior, compatibility, or another costly-to-reverse decision.

Ask one material question with a recommendation and options. After the answer, update the spec and affected ACs, recompute verification obligations, and continue without creating a separate plan.

### 5. Review against the contract

Review the final diff and tests together. Confirm:

- all Requirements, ACs, Decisions, Constraints, and Invariants are satisfied;
- no unrelated or out-of-scope changes remain;
- security, privacy, data-loss, and compatibility risks are addressed;
- each test expectation can be explained from the contract rather than production internals;
- tests survive behavior-preserving internal refactors and catch plausible contract-breaking implementations; and
- existing tests were not silently weakened to match the implementation.

Fix issues in the same build. Do not create another review phase.

### 6. Report AC evidence

Classify every AC:

- `PASS` — executed evidence directly supports it;
- `PARTIAL` — only part is verified;
- `FAIL` — implementation or evidence contradicts it;
- `NOT RUN` — required verification could not be executed.

Evidence must name the test, command, and observed result. Never report an unexecuted test as passing, and do not treat a code diff alone as sufficient runtime evidence.

Set the spec to `status: verified` only when every required AC is `PASS`; otherwise set `status: partial`. Update the date without appending execution logs or test plans.

Report:

- implemented behavior;
- key changed files;
- checks actually run and their results;
- an AC result/evidence table;
- verification limitations;
- remaining risks; and
- final spec status.
