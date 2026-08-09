# Contract-derived verification reference

Read this only when choosing an evidence boundary, using test doubles, reconciling existing tests, or judging oracle independence.

```text
                 ┌─→ implementation
Spec / AC ───────┤
                 └─→ verification and tests
```

The same agent may create both in one session. This is not formal independence; it is information-flow discipline. Expected behavior must still come from the contract.

## Evidence boundary

Prefer the highest stable boundary that directly proves the AC at acceptable cost:

1. end-user or public API behavior;
2. meaningful contract/integration behavior;
3. persisted state or emitted message observable to another component;
4. stable domain/module interface for pure rules;
5. static inspection only when execution is impractical, labeled as limited evidence.

A unit test may be behavioral; an integration test may still be implementation-coupled. Judge the source of expectations and stability of the boundary, not the test label.

## Test doubles

Fakes, stubs, and mocks may control nondeterministic or external boundaries. Prefer assertions about resulting behavior. Interaction assertions are strong evidence only when the interaction itself is contractual, such as emitting a defined event or forbidding an external call.

## Reject implementation-derived tests

Repair tests that:

- mirror private branches without a contract reason;
- assert helper/class shape instead of the accepted outcome;
- snapshot current output without an independent source;
- copy the production algorithm into the expected result;
- prove only that mocks were called;
- weaken expectations, remove cases, or alter fixtures solely to get green; or
- pass for a plausible contract-breaking implementation.

## Existing-test conflicts

When a ready spec and an existing test disagree:

1. decide whether the test represents an established external contract missing from the spec;
2. return to the ambiguity gate if the intended behavior is materially unresolved;
3. update the contract before changing expected behavior; and
4. explain why the prior test is stale or why the spec was corrected.

Never silently rewrite a test to match the new implementation.

## Bug fixes

Reproduce the reported failure before applying the fix when practical. This validates the regression oracle; it is not a requirement to discover design through TDD. If reproduction is unavailable, report the limitation.

## Oracle review

Before calling an AC `PASS`, ask:

- Can the expectation be explained without citing production internals?
- Would a plausible wrong implementation fail?
- Would a behavior-preserving refactor keep the test valid?
- Was any test weakened solely for the implementation?
- Does the evidence prove the whole AC?

A separate agent, evaluator-owned hidden tests, or human review can provide stronger independence for high-risk work. Just Spec does not add that ceremony by default. If implementation and test share the same mistaken interpretation, passing tests alone do not prove the contract.

## Evidence honesty

An assertion that was never reached is not evidence. A mocked unit test does not prove an integration boundary. An unavailable environment is `NOT RUN`, not `PASS`. Separate pre-existing failures from failures introduced by the change.
