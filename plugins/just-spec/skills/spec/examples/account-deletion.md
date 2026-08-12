---
title: Recoverable account deletion
slug: account-deletion
status: ready
created: 2026-08-09
updated: 2026-08-09
---

# Goal

Allow a signed-in user to request account deletion without making accidental deletion immediately irreversible.

## Context

The product already supports sign-out and stores user-authored content. It does not currently expose an account deletion flow.

## Requirements

- **R1:** A signed-in user can request deletion of their own account.
- **R2:** A deletion request schedules permanent deletion after a 14-day recovery period.
- **R3:** The user loses active sessions immediately after requesting deletion.
- **R4:** Signing in during the recovery period cancels the pending deletion after explicit confirmation.
- **R5:** After permanent deletion, authentication and profile access no longer succeed.

## Acceptance Criteria

- **AC1:** Given an active account, when its owner confirms deletion, then the account becomes pending deletion and all active sessions are invalidated.
- **AC2:** Given an account pending deletion for fewer than 14 days, when its owner signs in and confirms recovery, then deletion is cancelled and normal access is restored.
- **AC3:** Given an account pending deletion for at least 14 days, when deletion processing completes, then sign-in and profile retrieval fail without exposing retained internal identifiers.
- **AC4:** A user cannot request deletion of another user's account.

## Completion

This section is fixed. Keep it in every spec: it is what carries the rules into a run that nobody is watching.

- Completion means every AC is `PASS` with executed evidence, reported as a per-AC evidence table (AC / result / evidence). Partial satisfaction—"the main ACs are met"—is not completion.
- Expected results come from this spec, never from the current implementation or from observed output: verification is contract-derived. Evidence names the check that was run, its command, and what it printed; a check that was not executed is never reported as `PASS`.
- If satisfying one AC necessarily violates another AC or a Constraint, do not declare completion. Report the conflict and what was attempted, then stop.
- If the same AC keeps failing, stop instead of retrying indefinitely. Report what was attempted, the detector output, and the suspected cause, framed as the question the human must decide: change the spec, or relax the constraint.
- On completion, set this spec's `status` to `verified` when every AC is `PASS`, and to `partial` otherwise.

## Decisions

- **D1:** Deletion uses a 14-day recovery period rather than immediate hard deletion — this reduces accidental irreversible loss.
- **D2:** Recovery requires explicit confirmation after authentication — signing in alone does not silently cancel deletion.

## Constraints

- Existing authorization boundaries remain in force.
- Retention required by law or audit policy is outside the user-visible account and must not restore access.

## Out of Scope

- Administrator-initiated deletion.
- Exporting user data before deletion.
- Changing the organization's legal retention policy.

## Dependencies and Shared Contracts

None.

## Open Questions

None.
