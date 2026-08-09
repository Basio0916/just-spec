---
name: spec
description: Create or update a lean behavioral contract from a change request, issue, or document. Use explicitly when behavior must be clarified before implementation.
disable-model-invocation: true
argument-hint: <change request, issue, or source document>
---

# Just Spec: Spec

Input: `$ARGUMENTS`

Create the smallest behavioral contract needed to implement and verify the request safely. Persist **what must be true**; leave **how to implement it** as ephemeral reasoning for build time.

## Principles

- Acceptance criteria describe observable behavior through a public interface, stable domain boundary, or observable state.
- Tests come from the contract, not the implementation. Expected results come from the request, an explicit existing contract, or a resolved material decision—not from copying the current implementation.
- Exclude private methods, class structure, file layout, algorithms, mock interactions, and implementation order unless they are themselves contractual.
- Do not create `design.md`, `plan.md`, `tasks.md`, `test-plan.md`, implementation steps, or subagent work queues. Do not invoke subagents.
- Ask only about material ambiguity. Resolve reversible implementation choices from repository conventions and engineering judgment.
- Ask one question at a time. There is no fixed question limit; after every answer, recompute what remains ambiguous.
- Cohesion determines decomposition. Split by independently meaningful goals and verification surfaces, never by question count or technical layer.

Read `${CLAUDE_SKILL_DIR}/references/ambiguity.md` only when classification, interview order, or decomposition is unclear.

## Workflow

### 1. Read only the context needed

Read the request, named source material, repository guidance such as `CLAUDE.md` or `AGENTS.md`, and the nearest relevant code, tests, and existing Just Specs.

Stop once you can distinguish product behavior from implementation choice. Existing code and tests are evidence of current behavior, not automatic authority when they conflict with the request or an explicit external contract.

### 2. Define scope and material ambiguity

Prefer one spec for one coherent outcome. An uncertainty is material only when all are true:

1. focused inspection does not resolve it;
2. multiple plausible answers remain;
3. the choice changes observable behavior, a public/shared contract, security/privacy, retention/migration, compatibility, destructive behavior, or business policy; and
4. a wrong assumption creates meaningful rework or risk.

Split only when capabilities have distinct goals and acceptance criteria and can be implemented, verified, released, or changed independently. Do not split by controller/service/repository/frontend/test layers.

### 3. Resolve ambiguity dynamically

Choose the unresolved decision whose answer is most likely to eliminate or reshape other questions.

For each turn, provide:

- a recommendation;
- two to four concise options;
- one sentence explaining the contract impact; and
- exactly one question.

Apply the answer to the provisional contract, then recompute all remaining ambiguities. Drop questions that became irrelevant and rewrite those whose meaning changed.

For long discussions, briefly summarize resolved decisions and remaining material issues. This is orientation, not an approval gate.

### 4. Check behavioral readiness

Do not mark the spec ready until all are true:

- the goal is clear;
- user-observable behavior is unambiguous;
- each AC is verifiable through a stable observation boundary;
- another implementer can derive expected results from the AC without treating the implementation as the oracle;
- required decisions, contracts, and invariants are resolved; and
- no open issue can materially change whether the implementation is correct.

Question count is not part of the readiness test.

If a cohesive change is too large for one bounded build and has no meaningful independent slice, narrow the release scope or recommend a more rigorous workflow.

### 5. Write the contract

Use `${CLAUDE_SKILL_DIR}/templates/spec.md` and save to:

`.just-spec/specs/<slug>.md`

Include only:

- Goal
- minimal Context
- numbered Requirements
- numbered Acceptance Criteria
- Material Decisions and rationale
- Constraints
- Out of Scope
- Dependencies / Shared Contracts when needed
- `Open Questions: None`

Each AC should state enough precondition/input, action/event, and observable result to serve as an independent verification oracle. Given/When/Then is optional.

If multiple specs are semantically necessary, place them under `.just-spec/specs/<initiative>/` and create `overview.md` from `${CLAUDE_SKILL_DIR}/templates/overview.md`. Record only shared decisions, vocabulary, cross-spec contracts, invariants, and the spec list—not a roadmap or task order.

### 6. Validate and hand off

Confirm that:

- every requirement is covered by one or more ACs;
- every expected result traces to the contract rather than production internals;
- internal refactoring would not invalidate the ACs;
- no material open question, contradiction, speculative feature, or implementation plan remains; and
- the scope fits one coherent `/just-spec:build` run.

Fix non-material gaps yourself. Ask again only if a new material decision is required.

Report:

- the created or updated spec path;
- key material decisions;
- assumptions resolved without asking; and
- the next command:

`/just-spec:build <spec-path-or-slug>`
