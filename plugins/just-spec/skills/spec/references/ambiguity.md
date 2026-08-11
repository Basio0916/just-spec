# Material ambiguity reference

Read this only when a decision is difficult to classify, interview order is unclear, or decomposition is disputed.

## Material vs. implementation detail

A choice is material when focused inspection leaves multiple plausible answers and the choice either has externally observable impact—behavior, a public/shared contract, authorization, security/privacy, retention/deletion/migration, compatibility, business policy—or is hard to reverse.

Hard to reverse means overturning the choice later costs a lot even though nothing externally observable differs today:

- transaction boundaries;
- event publication shape and timing;
- locking and concurrency control;
- cache coherence strategy;
- schema design.

Usually decide without asking:

- filenames, type names, helper shape, and directory placement;
- use of established framework/library patterns;
- internal data structures with no contract effect;
- test organization and mocking mechanics;
- reversible refactors and implementation sequence.

Do not record these as material decisions.

## Dynamic interview

There is no fixed question limit. Maintain a provisional ambiguity map, ask the highest-leverage unresolved question, apply the answer, then recompute the map. Remove obsolete questions and reshape dependent ones.

Ask through `AskUserQuestion`. For a simple confirmation the options alone are enough:

```text
When membership is removed, what happens to old notifications?
A. Keep them; links return access denied (recommended)
B. Hide them

This changes retention and authorization behavior.
```

For a hard-to-reverse choice, put the comparison in the message and keep the options short:

```text
Recommended: A — retention stays auditable and revocation stays in one place.

A. Keep and deny. Upside: the audit trail survives a membership change.
   Downside: users see entries they can no longer open.
B. Hide. Upside: the list always matches current access.
   Downside: removal silently rewrites what the user already saw.

This changes retention and authorization behavior.
```

Ask exactly one question and accept a custom answer. Never require free text.

## Recording the choice

Write the chosen option, the main rejected option, and the rationale you already presented—marked `🤖`, since it is your reasoning rather than the human's. Add an invariant or a revisit condition only when one exists. Do not ask the human to justify a choice; when they go against the recommendation, an optional one-line note is the most you may request.

For long interviews, summarize `Resolved` and `Still material`. A checkpoint is orientation, not an approval gate.

## Decomposition

Never split merely because many questions, files, layers, or edge cases are involved.

Split when capabilities have distinct goals and independently meaningful ACs and can be changed, shipped, rejected, or verified independently. Separate ownership, lifecycle, authorization, or a clear shared contract are useful signals.

Example that stays cohesive: recoverable account deletion may involve recovery duration, session revocation, content retention, subscriptions, audit records, and re-registration. These jointly define one user journey.

Example that splits: account deletion and administrator compliance export have different goals, permissions, and verification surfaces.

If a cohesive capability is too large for one bounded build and no independent slice exists, narrow the release outcome or use a long-horizon workflow. Do not invent technical-layer specs.

## Readiness

Ready means the goal and observable behavior are clear, ACs are testable, required material decisions and cross-boundary invariants are resolved, and no open ambiguity can change whether the implementation is correct. The number of questions asked is not a readiness signal.
