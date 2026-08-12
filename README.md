# Just Spec

[日本語版はこちら / Japanese](./README.ja.md)

**Just the spec — that's all your agent needs.**

**Persistent What. Ephemeral How.**

Just Spec has no plan, no task list, and no execution machinery. It settles a single spec with you in conversation and hands that spec straight to `/goal`. That is how the name reads: *just the spec*.

Claude Code's `/goal` is the official loop. You give it a completion condition, an evaluator checks that condition after every turn, and the session keeps working until it holds — nobody has to sit with it. What decides whether the run stops where you wanted is the condition itself. A loop cannot supply its own reference signal, and a condition improvised at the prompt is where an unattended run goes wrong.

Just Spec is the side that makes the condition; `/goal` is the side that runs it. The condition comes out of a disciplined conversation rather than a template:

- Only material ambiguity reaches you. Four conditions decide what counts, and the existence of a conventional default is not one of them.
- Expensive branches arrive as options with a recommendation, each with its upside and downside, so answering is a choice rather than an essay.
- Anything inferred rather than answered is marked `🤖`, so reading the spec separates confirming your own decision from checking a guess.
- A hard-to-reverse choice is recorded together with the option that was rejected and the reason for choosing against it — the part code never shows.
- The rules of the run are written into the spec itself: evidence reported per acceptance criterion, and a stop with a question instead of a completion when a criterion turns out to be unsatisfiable.

Hand the finished spec to `/goal` and the run goes to completion unattended, reporting evidence for every acceptance criterion.

```text
Request
   ↓
/just-spec:spec        ← you decide material ambiguity here
   ↓
Behavioral Contract    ← the completion condition
   ↓
/goal <one line>       ← Claude Code's own loop runs it
   ↓
Implementation + AC Evidence
```

What follows from that:

- **The spec is both the output of the conversation and the input to the loop.** You read it, and so does the evaluator, so its acceptance criteria have to be checkable from what the run reports.
- **Done means the contract is satisfied, not that a plan was executed.** The acceptance criteria are the detectors; the run reports evidence for each one, and partial satisfaction is not completion.

## What Just Spec Persists

Just Spec keeps only the contract needed to decide whether the implementation is correct:

```text
Goal
Requirements
Acceptance Criteria
Material Decisions
Constraints
Out of Scope
```

There is no design document, implementation plan, task breakdown, or test plan. That is a consequence of where review happens rather than a goal in itself: every additional artifact is another place your attention has to go.

The model decides how to implement the change from the current codebase at implementation time.

## The Command

Just Spec exposes one skill.

### `/just-spec:spec`

Creates a Behavioral Contract from your request and the existing codebase.

```text
/just-spec:spec <change request>
```

Just Spec does not ask questions that can reasonably be answered from the codebase, existing behavior, or established conventions.

It asks about **material ambiguity** — decisions that can change whether the implementation is correct, and decisions that would be expensive to overturn later:

- User-visible behavior
- Public or shared contracts
- Authorization
- Data retention
- Backward compatibility
- Destructive behavior
- Business policy
- Hard-to-reverse implementation choices such as transaction boundaries, event publication, concurrency control, cache coherence, and schema design

That last group matters because nothing externally observable distinguishes the options today. The cost arrives later, when the choice has to be undone.

A decision is also not skipped just because a conventional default exists. List sort order, whether a date comes from the business current date or the real clock, tie-breaking, rounding — they look settled and still change what people see. Nobody is watching the run, so an inferred default has no second chance to be noticed.

Questions arrive one at a time, as a selection with a recommendation. When several options are genuinely defensible, you also get each option's upside and downside and the reason behind the recommendation, so answering is a choice rather than an essay.

After every answer, Just Spec reevaluates the remaining ambiguities instead of following a predefined questionnaire. There is no fixed question limit.

Specs are split based on cohesive goals and independently verifiable outcomes, not on the number of questions or technical layers.

The resulting spec is stored at:

```text
.just-spec/specs/<slug>.md
```

### Reading a Spec

Two kinds of content live in a spec: decisions you confirmed by answering, and statements Just Spec inferred from the codebase. Confirming your own decision is quick. Checking an inference is the part that actually needs you, so inferences are marked:

```text
- **R4:** 🤖 Deletion is rejected while a payout is still pending.
```

`🤖` means Just Spec inferred this item and recommends you confirm it. Unmarked items came from your answers.

### Running the spec

When the spec is ready, `/just-spec:spec` ends by handing you a line to run. It points at the spec file and stays the same length whether the spec has two acceptance criteria or thirty — the run reads the file itself.

```text
/goal Implement the spec at .just-spec/specs/<slug>.md. Done only when: you have read it; every AC in it is PASS with executed evidence; you reported a per-AC evidence table (AC / result / evidence); no Constraint is violated. Partial satisfaction is not done. If an AC is unsatisfiable or keeps failing, do not complete: report the conflict, what you tried, and the question the human must decide, then stop.
```

From there the loop is Claude Code's. Nobody has to sit with it: the evaluator checks the condition after every turn and the session continues until it holds.

```text
Behavioral Contract
      │
      ├──────────────▶ Implementation
      │
      └──────────────▶ Verification
                              │
                              ▼
                         AC Evidence
```

The model may plan internally as needed, but the implementation plan remains ephemeral. No plan and no task list are produced.

Where `/goal` is unavailable — an older Claude Code, or goals turned off — ask for the same thing in an attended session. The definition of done does not change:

```text
Implement .just-spec/specs/<slug>.md. Follow its Completion section: every AC PASS with
executed evidence, a per-AC evidence table, no Constraint violated, and stop with a question
instead of completing if an AC turns out to be unsatisfiable.
```

#### Where `/just-spec:build` went

Earlier versions shipped a `build` command that implemented the spec itself. Execution now belongs to `/goal`, which is the official loop and the one worth trusting when no one is watching, so `build` was removed rather than kept as a wrapper around it. If you were using it, run the line offered at the end of `/just-spec:spec` instead; for a spec written before this change, the same line works with its path.

## Principles

### Persistent What, Ephemeral How

Persist **what must be true**.

Let the model decide **how to make it true** from the current state of the codebase.

File-by-file implementation plans and task sequences become stale quickly. Behavioral contracts tend to remain useful even when the implementation changes.

Implementation steps stay ephemeral. The reasoning behind a hard-to-reverse choice does not: it is recorded as a Material Decision, together with the option that was rejected. Code shows what was chosen. It never shows what was rejected, or why.

### Resolve Material Ambiguity, Not Implementation Detail

Humans should decide things that materially affect correctness, or that would be costly to reverse.

Reversible implementation choices — class names, file placement, helper structure, internal abstractions — are left to the model.

### Behavior Compliance, Not Plan Compliance

Completion is not:

> Did we execute every step in the plan?

Completion is:

> Does the implementation satisfy the Acceptance Criteria?

Just Spec verifies behavior against the contract and reports evidence for each AC.

### Tests Come From the Contract, Not the Implementation

Just Spec does not require Test First, TDD, or Red-Green-Refactor.

The important constraint is not **when** tests are written. It is **where their expected behavior comes from**.

```text
              ┌── Implementation
Spec / AC ────┤
              └── Tests
```

Implementation and verification should both be derived from the same Behavioral Contract.

Tests should verify observable behavior through stable boundaries rather than mirror private implementation details.

## What This Does Not Catch

Tests are detectors for a contract. They can show that an implementation is faithful to the acceptance criteria. They cannot show that an acceptance criterion is missing.

A missing contract produces no failing test, no error, and no review finding. It looks exactly like success. The only place it can be caught is the spec, while you are reading it.

That is the bet this workflow makes, and it is why spec review is the one review Just Spec asks you for. Everything else is arranged so that you still have the attention left to do it.

The evaluator has a blind spot of the same shape. It judges the run from what the run wrote into the conversation, so it never checks whether the evidence table is honest. A `PASS` recorded for a check that was never executed reads exactly like one that was, and passes.

## Just Spec and Plan Mode

Plan Mode is a permission mode: Claude Code investigates and proposes before it is allowed to edit, and you approve the proposal.

Just Spec is not a permission mode, and the difference is not one of capability. It is a difference in artifact protocol — what gets persisted, what you are asked, and what counts as done.

| | Plan Mode | Just Spec |
|---|---|---|
| What persists | The approved plan, for as long as you keep it | A behavioral contract committed to the repository |
| What you are asked | To approve an implementation approach before editing begins | To decide material ambiguity, offered as options with a recommendation |
| What "done" means | Whatever you judge it to be, as usual | Evidence that every Acceptance Criterion is satisfied |

The two compose. Plan Mode governs when Claude Code may edit; Just Spec governs what the change has to satisfy.

Detailed planning remains valuable for large migrations, complex parallel execution, or changes where coordination itself is the hard problem.

## Installation

Add the marketplace in Claude Code:

```text
/plugin marketplace add Basio0916/just-spec
```

Install Just Spec:

```text
/plugin install just-spec@just-spec
```

Reload plugins if necessary:

```text
/reload-plugins
```

## Usage

Create a spec:

```text
/just-spec:spec Add account deletion with a 14-day recovery window
```

If there is material ambiguity, Just Spec asks only the questions required to make the behavior unambiguous.

Once the spec is ready, Just Spec prints the `/goal` line for it. Run that line, and the session works until every acceptance criterion is satisfied:

```text
/goal Implement the spec at .just-spec/specs/account-deletion.md. Done only when: ...
```

The run finishes with an implementation summary and evidence for each Acceptance Criterion.

## When Not to Use Just Spec

Just Spec is not trying to be the right workflow for every kind of development. Deciding whether it fits is your call, not the tool's — it will not refuse a request. These are the cases where a more rigorous planning and review process tends to be a better fit:

- Large-scale migrations
- Multi-agent parallel development
- Security-critical changes
- Complex architectural changes
- Work requiring strong audit or approval processes

Unattended execution is not on that list. With `/goal` driving the run it is the normal path, and what decides whether it goes well is whether the spec is complete enough to be executed without asking you anything mid-run. That is why the spec phase asks about decisions that have a plausible default, and why acceptance criteria for screen behavior say which output they are checked in.

Just Spec does not argue that those workflows are unnecessary. It explores a narrower question:

> **If human review is concentrated on one contract, is that enough for everyday development with frontier models?**

## Status

Just Spec is currently experimental.

It deliberately exposes one command:

```text
/just-spec:spec
```

Execution is Claude Code's `/goal`. The goal is not to add more workflow. The goal is to keep human attention on the one document where spending it changes the outcome, and to leave the loop to the tool that already has one.

## License

MIT
