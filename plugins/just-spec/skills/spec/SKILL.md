---
name: spec
description: Create or update a lean behavioral contract from a change request, issue, or document, and hand it to Claude Code's /goal. Use explicitly when behavior must be clarified before implementation.
disable-model-invocation: true
argument-hint: <change request, issue, or source document>
---

# Just Spec: Spec

Input: `$ARGUMENTS`

Create the smallest behavioral contract that makes the request implementable and verifiable, then hand it to `/goal`. Persist **what must be true**; leave **how to implement it** ephemeral.

## Principles

- Acceptance criteria describe observable behavior through a public interface, stable domain boundary, or observable state.
- The contract is executed unattended by `/goal`, never by this skill: it must be complete enough that the run never needs to ask, and every AC checkable from what the run reports.
- Tests come from the contract, not the implementation. Expected results come from the request, an explicit existing contract, or a resolved material decision—not from copying the current implementation.
- Exclude private methods, class structure, file layout, algorithms, mock interactions, and implementation order unless they are themselves contractual.
- Do not create `design.md`, `plan.md`, `tasks.md`, `test-plan.md`, implementation steps, or subagent work queues. Do not invoke subagents.
- Ask only about material ambiguity, including choices that are hard to reverse. Resolve reversible choices—class names, file placement, helper shape, test placement—from repository conventions and engineering judgment.
- Ask one question at a time. There is no fixed question limit; after every answer, recompute what remains ambiguous.
- Cohesion determines decomposition. Split by independently meaningful goals and verification surfaces, never by question count or technical layer.

Read `${CLAUDE_SKILL_DIR}/references/ambiguity.md` only when classification, interview order, or decomposition is unclear.

## Workflow

### 1. Read only the context needed

Read the request, named source material, repository guidance such as `CLAUDE.md` or `AGENTS.md`, and the nearest relevant code, tests, and existing Just Specs. Stop once you can distinguish product behavior from implementation choice.

Existing code and tests are evidence of current behavior, not authority when they conflict with the request or an explicit external contract.

### 2. Define scope and material ambiguity

Prefer one spec for one coherent outcome. An uncertainty is material only when all are true:

1. focused inspection does not resolve it;
2. multiple plausible answers remain;
3. the choice has externally observable impact—behavior, a public/shared contract, security/privacy, retention/migration, compatibility, destructive behavior, business policy—or is hard to reverse, meaning overturning it later costs a lot even though nothing observable differs today; and
4. a wrong assumption creates meaningful rework or risk.

A conventional default is never a reason to skip a question: judge conditions 3 and 4 independently of it. List sort order, the source of a date or time, numbering, tie-breaking, and rounding all have obvious defaults and still change observable behavior. The widening stops at defaults; anything condition 1 resolves stays unasked.

Split only when capabilities have distinct goals and acceptance criteria and can be implemented, verified, released, or changed independently. Do not split by controller/service/repository/frontend/test layers.

### 3. Resolve ambiguity dynamically

Choose the unresolved decision whose answer is most likely to eliminate or reshape other questions.

Ask through the `AskUserQuestion` tool, one question per prompt, with the recommended option first and marked as recommended. Fall back to plain text only when the tool is unavailable. Always state the contract impact in one sentence.

When several options are defensible for a hard-to-reverse or externally observable choice, put the comparison in your message—each option's upside and downside, then the recommendation and its reason, grounded in Out of Scope, existing Decisions, or the current codebase standard—and keep the tool options to a name and a one-line summary. Simple confirmations skip it.

The human answers by choosing. Never require free text; accept it only as an optional note.

Apply the answer, then recompute the remaining ambiguities. Drop questions that became irrelevant and rewrite those whose meaning changed.

For long interviews, summarize what is resolved and what remains; orientation, not a gate.

### 4. Check behavioral readiness

Do not mark the spec ready until all are true:

- the goal and the user-observable behavior are unambiguous;
- each AC is verifiable through a stable observation boundary, so another implementer can derive expected results without treating the implementation as the oracle;
- every UI AC's observation boundary is reachable with the current test basis, or its verification means is settled here as an answered question or an explicit Constraint;
- required decisions, contracts, and invariants are resolved; and
- no open issue can materially change whether the implementation is correct.

Question count is not part of the readiness test.

If a cohesive change is too large for one bounded run with no independent slice, narrow the release scope.

### 5. Write the contract

Use `${CLAUDE_SKILL_DIR}/templates/spec.md` and save to:

`.just-spec/specs/<slug>.md`

Include only:

- Goal
- minimal Context
- numbered Requirements
- numbered Acceptance Criteria
- the fixed Completion section
- Material Decisions and rationale
- Constraints
- Out of Scope
- Dependencies / Shared Contracts when needed
- `Open Questions: None`

Each AC states enough precondition/input, action/event, and observable result to serve as an independent verification oracle. Given/When/Then is optional.

An AC about screen output or screen interaction also states its observation boundary: what is executed and in which output the result is checked—"the rendered markup distinguishes rank and status", "an actionable button is shown only when the action can succeed". Otherwise verification drifts to a shallower layer. Do not apply it to domain or service ACs.

Keep the template's Completion section verbatim: it is the only place the rules of the run reach an unattended session.

Mark items you inferred from the codebase or existing specs with `🤖`, and leave the human's own decisions unmarked.

Record each hard-to-reverse choice as the chosen option, the main rejected option, and your rationale, marked `🤖`. Never ask why they chose; against the recommendation, offer an optional one-line note.

If multiple specs are semantically necessary, place them under `.just-spec/specs/<initiative>/` with an `overview.md` from `${CLAUDE_SKILL_DIR}/templates/overview.md`, holding only shared decisions, vocabulary, cross-spec contracts, invariants, and the spec list.

### 6. Validate and hand off

Confirm that:

- every requirement is covered by one or more ACs;
- every expected result traces to the contract and survives an internal refactor;
- no material open question, contradiction, speculative feature, or implementation plan remains; and
- the scope fits one coherent run.

Fix non-material gaps yourself; ask again only for a new material decision.

Report:

- the spec path, key material decisions, and assumptions resolved without asking;
- a line telling the human that this spec is the only artifact the workflow asks them to review, and that the `🤖` items deserve their attention first; and
- the `/goal` line below, in a copyable block.

Fill in only the spec path; do not translate or enumerate Requirements or ACs there. The condition is the same length whatever the spec's size, and the run reads the file itself.

```text
/goal Implement the spec at <spec-path>. Done only when: you have read it; every AC in it is PASS with executed evidence; you reported a per-AC evidence table (AC / result / evidence); no Constraint is violated. Partial satisfaction is not done. If an AC is unsatisfiable or keeps failing, do not complete: report the conflict, what you tried, and the question the human must decide, then stop.
```

Offer it only when `status` is `ready`; otherwise say what remains instead.

That report is orientation, not an approval gate. Do not wait for sign-off, and do not start implementing.
