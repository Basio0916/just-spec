# Just Spec

[日本語版はこちら / Japanese](./README.ja.md)

**Persistent What. Ephemeral How.**

Just Spec is a spec-driven development plugin for Claude Code that concentrates human review on the one artifact worth reviewing: the spec.

```text
Request
   ↓
/just-spec:spec
   ↓
Behavioral Contract   ← the one thing you review
   ↓
/just-spec:build
   ↓
Implementation + AC Evidence
```

A typical workflow spreads your attention across requirements, design, tasks, and generated code. Reviewing code costs more as more code is generated. Reviewing a spec costs the same one screen every time. Just Spec moves your attention from the place that scales with output to the place that does not.

Three things follow from that:

- **The spec is the single review point.** There is no plan and no task list to approve, so nothing competes with the contract for your attention.
- **Done means the contract is satisfied, not that a plan was executed.** The acceptance criteria are the detectors; the build runs against them and reports evidence for each one.
- **You are the decision maker, not a document reviewer.** Just Spec brings each material decision to you with options and a recommendation, and you choose. It does not create a step where you go hunting through a document for problems.

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

The model decides how to implement the change from the current codebase when it builds.

## Two Commands

Just Spec has only two skills.

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

### `/just-spec:build`

Implements a ready Just Spec contract.

```text
/just-spec:build <spec-path-or-slug>
```

The model may plan internally as needed, but the implementation plan remains ephemeral and is not persisted as an artifact.

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

At the end of the build, Just Spec reports evidence for each Acceptance Criterion.

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

## Just Spec and Plan Mode

Plan Mode is a permission mode: Claude Code investigates and proposes before it is allowed to edit, and you approve the proposal.

Just Spec is not a permission mode, and the difference is not one of capability. It is a difference in artifact protocol — what gets persisted, what you are asked, and what counts as done.

| | Plan Mode | Just Spec |
|---|---|---|
| What persists | The approved plan, for as long as you keep it | A behavioral contract committed to the repository |
| What you are asked | To approve an implementation approach before editing begins | To decide material ambiguity, offered as options with a recommendation |
| What "done" means | Whatever you judge it to be, as usual | Evidence that every Acceptance Criterion is satisfied |

The two compose. Plan Mode governs when Claude Code may edit; Just Spec governs what the change has to satisfy.

Detailed planning remains valuable for long-running autonomous work, large migrations, complex parallel execution, or changes where coordination itself is the hard problem.

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

Once the spec is ready:

```text
/just-spec:build account-deletion
```

The build finishes with an implementation summary and evidence for each Acceptance Criterion.

## When Not to Use Just Spec

Just Spec is not trying to be the right workflow for every kind of development. Deciding whether it fits is your call, not the tool's — it will not refuse a request. These are the cases where a more rigorous planning and review process tends to be a better fit:

- Long-running unattended execution
- Large-scale migrations
- Multi-agent parallel development
- Security-critical changes
- Complex architectural changes
- Work requiring strong audit or approval processes

Just Spec does not argue that those workflows are unnecessary. It explores a narrower question:

> **If human review is concentrated on one contract, is that enough for everyday development with frontier models?**

## Status

Just Spec is currently experimental.

It deliberately exposes only two commands:

```text
/just-spec:spec
/just-spec:build
```

The goal is not to add more workflow. The goal is to keep human attention on the one document where spending it changes the outcome.

## License

MIT
