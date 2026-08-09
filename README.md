# Just Spec

[日本語版はこちら / Japanese](./README.ja.md)

**Persistent What. Ephemeral How.**

Just Spec is a lightweight spec-driven development plugin for Claude Code.

Instead of creating detailed design documents, implementation plans, or fine-grained task breakdowns, Just Spec focuses on one thing before implementation:

**Define what must be true for the change to be correct.**

```text
Request
   ↓
/just-spec:spec
   ↓
Behavioral Contract
   ↓
/just-spec:build
   ↓
Implementation + AC Evidence
```

> What if frontier models don't need detailed implementation plans, as long as they have an unambiguous behavioral contract?

Just Spec is a small workflow for exploring that idea in everyday software development.

## Why Just Spec?

Many spec-driven development workflows introduce multiple stages such as design, planning, task decomposition, and review.

These can be valuable for long-running autonomous work or large-scale changes. But for everyday development, the workflow itself can add significant time, token usage, and cognitive overhead.

Just Spec does **not** create these by default:

- Design documents
- Persistent implementation plans
- Fine-grained task decomposition
- Task-by-task reviews
- Test plans
- Subagent orchestration

Instead, it keeps only the contract needed to determine whether the implementation is correct:

```text
Goal
Requirements
Acceptance Criteria
Material Decisions
Constraints
Out of Scope
```

The model decides how to implement the change from the current codebase when it builds.

## Two Commands

Just Spec has only two skills.

### `/just-spec:spec`

Creates a Behavioral Contract from your request and the existing codebase.

```text
/just-spec:spec <change request>
```

Just Spec does not ask questions that can reasonably be answered from the codebase, existing behavior, or established conventions.

It asks only about **material ambiguity** — decisions that can change whether the implementation is correct.

Examples include:

- User-visible behavior
- Public or shared contracts
- Authorization
- Data retention
- Backward compatibility
- Destructive behavior
- Business policy

Questions are asked one at a time.

After every answer, Just Spec reevaluates the remaining ambiguities instead of blindly following a predefined questionnaire.

There is no fixed question limit.

Specs are split based on cohesive goals and independently verifiable outcomes, not on the number of questions or technical layers.

The resulting spec is stored at:

```text
.just-spec/specs/<slug>.md
```

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

### Resolve Material Ambiguity, Not Implementation Detail

Humans should decide things that materially affect correctness.

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

## Why Not Plan Mode?

Plan Mode and Just Spec solve different problems.

| | Plan Mode | Just Spec |
|---|---|---|
| Primary question | How should we implement this? | What must be true for this to be correct? |
| Main artifact | Implementation Plan | Behavioral Contract |
| How | Explicitly planned | Decided during implementation |
| What | Usually embedded in the request or plan | Explicit Spec / AC |
| Human input | Review implementation direction | Resolve material ambiguity |
| Completion | Plan execution | Evidence against AC |

Just Spec is not intended to replace Plan Mode.

Detailed planning can still be valuable for long-running autonomous work, large migrations, complex parallel execution, or changes where coordination itself is the hard problem.

Just Spec focuses on **everyday software development with frontier models**, where less scaffolding may be enough.

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

Just Spec is not trying to be the right workflow for every kind of development.

A more rigorous planning and review process may be a better fit for:

- Long-running unattended execution
- Large-scale migrations
- Multi-agent parallel development
- Security-critical changes
- Complex architectural changes
- Work requiring strong audit or approval processes

Just Spec does not argue that those workflows are unnecessary.

It explores a narrower question:

> **For everyday development, can frontier models maintain quality with much less scaffolding?**

## Status

Just Spec is currently experimental.

For now, it deliberately focuses on only two commands:

```text
/just-spec:spec
/just-spec:build
```

The goal is not to add more workflow.

The goal is to find out how much workflow we can remove while still preserving correctness.

## License

MIT
