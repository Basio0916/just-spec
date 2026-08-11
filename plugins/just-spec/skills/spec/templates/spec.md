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
