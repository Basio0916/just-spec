---
title: <outcome-oriented title>
slug: <kebab-case-slug>
status: ready
created: <YYYY-MM-DD>
updated: <YYYY-MM-DD>
---

> `🤖` marks an item inferred from the codebase or existing specs rather than confirmed by your answer. Review those first; unmarked items came from your own decisions.

# Goal

<One observable outcome and why it matters.>

## Context

<Only the background needed to interpret the contract.>

## Requirements

- **R1:** <Externally meaningful behavioral rule.>
- **R2:** 🤖 <Rule inferred from existing behavior rather than answered — confirm it.>

## Acceptance Criteria

- **AC1:** <Observable success or failure behavior through a public or stable contract boundary.>
- **AC2:** <Observable boundary, invariant, state transition, or prohibited behavior.>

Each expected outcome must come from the request, an established contract, or a resolved material decision—not from the current implementation. Do not mention private methods, classes, algorithms, mock calls, file layout, or implementation order unless explicitly contractual.

For an AC about screen output or screen interaction, state the observation boundary in the AC itself—what is executed and in which output the result is checked. Domain and service ACs do not carry it.

## Completion

This section is fixed. Keep it in every spec: it is what carries the rules into a run that nobody is watching.

- Completion means every AC is `PASS` with executed evidence, reported as a per-AC evidence table (AC / result / evidence). Partial satisfaction—"the main ACs are met"—is not completion.
- Expected results come from this spec, never from the current implementation or from observed output: verification is contract-derived. Evidence names the check that was run, its command, and what it printed; a check that was not executed is never reported as `PASS`.
- If satisfying one AC necessarily violates another AC or a Constraint, do not declare completion. Report the conflict and what was attempted, then stop.
- If the same AC keeps failing, stop instead of retrying indefinitely. Report what was attempted, the detector output, and the suspected cause, framed as the question the human must decide: change the spec, or relax the constraint.
- On completion, set this spec's `status` to `verified` when every AC is `PASS`, and to `partial` otherwise.

## Decisions

- **D1:** <Material decision> — <brief rationale>.
- **D2:** <Chosen option for a hard-to-reverse choice.>
  - Rejected: <the main alternative that was compared>
  - 🤖 Rationale: <carried over from the comparison presented at question time>
  - Invariant: <what must hold for this to remain valid>
  - Revisit when: <the condition that should reopen this>

Omit any line that does not apply; not every decision needs all of them. When the human picked another option and skipped the optional note, record `chose against the recommendation (no reason given)`. Never ask them to justify a choice.

Use `None` when no material decision was required.

## Constraints

- <A real behavioral, compatibility, security, or technical constraint.>

Use `None` when no constraint applies.

## Out of Scope

- <Explicit exclusion that prevents scope drift.>

## Dependencies and Shared Contracts

- <Only external/spec dependencies or shared contracts.>

Use `None` when there are none.

## Open Questions

None.
