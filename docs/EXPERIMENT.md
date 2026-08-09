# Experiment: Just Spec versus ordinary Plan Mode

## Research question

For bounded everyday development tasks, can an ambiguity-resolved behavioral contract preserve implementation quality while reducing elapsed time, token use, and human review burden compared with a persistent detailed implementation plan—and can contract-derived verification avoid tests that merely ratify the generated implementation?

## Hypothesis

Compared with ordinary Plan Mode, `/just-spec:spec` followed by `/just-spec:build` will:

- use fewer total input/output tokens;
- finish faster;
- produce fewer documents and less text for the human to review;
- derive test cases and expected behavior from ACs rather than production internals;
- have no meaningful increase in acceptance-criteria misses, incorrect assumptions, review findings, or rework.

The hypothesis does not require tests to be authored before production code. It requires expected behavior to be independently traceable to the contract.

## Paired design

Select 8–12 representative changes from the same codebase:

- small feature additions;
- normal CRUD/business-rule changes;
- one bounded refactor with preserved behavior;
- one cross-boundary change;
- one regression fix;
- a few deliberately ambiguous requests;
- at least one combinatorial or state-transition rule where implementation-shaped tests are a realistic risk.

For each change, create equivalent clean branches or repository snapshots and run both conditions:

- **A — ordinary Plan Mode:** investigate, persist a detailed implementation plan, approve it, then implement and test using the agent's normal workflow.
- **B — Just Spec:** resolve material ambiguity, persist only the behavioral contract, derive ephemeral verification obligations from the ACs, then implement and test in any order.

Randomize which condition runs first. Use the same model/version, repository state, permissions, and test environment. Do not let one run see artifacts or fixes from the other.

## Evaluation oracle

Create the target AC set before comparing implementations. When practical, prepare evaluator-owned hidden tests or executable checks directly from those ACs. Workflow-generated tests must not be the sole quality metric because implementation and tests may share the same mistaken interpretation.

Reviewers should not know which workflow produced the branch when practical.

## Measurements

Record per run:

- model and version;
- input, cache-read, cache-write, and output tokens when available;
- wall-clock time;
- number of human questions;
- number of human decisions actually required;
- questions made unnecessary by earlier answers, when observable;
- semantic splits proposed and whether reviewers judged them coherent;
- words the human was expected to review;
- number and size of persistent artifacts;
- tests/checks created and run;
- whether each generated test maps to an AC or established contract;
- number of expectations whose only apparent source is production implementation;
- number of white-box assertions without a contractual reason;
- tests weakened, deleted, or changed to accommodate implementation;
- regression tests observed failing before a bug fix, when practical;
- ACs PASS/PARTIAL/FAIL/NOT RUN;
- hidden/evaluator test results;
- incorrect behavioral assumptions;
- independent code-review findings by severity;
- rework turns after initial implementation;
- final diff size as context, not as a quality score.

## Quality evaluation

Classify findings:

- contract miss;
- regression;
- security/data-loss risk;
- maintainability issue;
- unnecessary scope;
- implementation-coupled test;
- stale or weakened test;
- style-only issue.

The main quality outcome is material contract misses plus high/medium review findings and hidden-test failures, not raw comment count or raw generated-test pass rate.

For generated tests, ask:

1. Can the expected result be explained from the AC without citing production internals?
2. Would a plausible contract-breaking implementation fail the test?
3. Does the test use a stable enough boundary to survive an internal refactor?
4. Was any expectation changed after observing implementation output without another contractual source?

## Success criteria for the prototype

The prototype is promising when:

1. the dynamic interview leaves no material ambiguity while avoiding questions made obsolete by earlier answers;
2. semantic decomposition is judged coherent rather than driven by question count;
3. median token use and elapsed time are materially lower;
4. human review words and required approvals are lower;
5. material quality outcomes are not worse beyond a pre-agreed tolerance;
6. generated tests are predominantly contract-derived and do not merely mirror implementation;
7. hidden/evaluator checks do not reveal a systematic shared-error problem;
8. users report lower cognitive load;
9. failures reveal specific missing contract or verification rules rather than a general need for persistent microtasks or mandatory TDD.

## Log template

```markdown
| Task | Workflow | Tokens | Time | Questions | Decisions | Review words | AC misses | Hidden failures | Contract-derived tests | Impl-coupled tests | High/Med findings | Rework |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| T01 | Plan | | | | | | | | | | | |
| T01 | Just Spec | | | | | | | | | | | |
```

## Interpretation

A failure does not automatically justify restoring the full SDD or TDD pipeline. Identify the minimal missing safeguard: better AC, one extra material question, a narrower spec, a stronger evidence boundary, evaluator-owned tests, or a risk-triggered optional review. Add ceremony only when the evidence supports it.
