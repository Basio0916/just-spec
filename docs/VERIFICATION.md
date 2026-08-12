# Contract-derived verification

## The claim

Just Spec does not treat Test First as the essential safeguard for AI-generated code. The essential safeguard is that tests are derived from the Behavioral Contract rather than reverse-engineered from the implementation.

```text
Bad information flow

implementation → tests that describe the implementation → green

Desired information flow

                 ┌→ implementation
Spec / AC ───────┤
                 └→ verification/tests
                         ↓
                compare observable behavior
```

The test files can be written before, during, or after production code. Their timing does not establish independence. Their source of expected behavior does.

## Why TDD is not mandatory here

Red-Green-Refactor is valuable for many human developers because it bounds change, supports incremental design discovery, and creates frequent feedback. Just Spec is testing a different hypothesis: a frontier model can often design and implement a bounded feature coherently from an ambiguity-resolved contract without persisting or externally enforcing those microsteps.

This does not make TDD wrong. It makes it optional rather than ceremonial. A project may still require TDD through its own repository instructions.

## What independence means in one-agent workflow

One model writing both production code and tests is not statistically or organizationally independent. Correlated misunderstanding remains possible. Just Spec therefore makes a narrower claim about **oracle independence**:

- expected outputs and cases trace to ACs, established contracts, and material decisions;
- production internals do not define their own expected result;
- tests use stable observable boundaries where practical;
- the final report exposes evidence per AC rather than treating “all generated tests passed” as sufficient.

Before editing, the run derives an ephemeral verification map from the contract. Nothing is persisted as a test plan, nothing waits for approval, and no test file has to exist first.

## Good and bad examples

Contract:

```text
An unknown email and a wrong password must return indistinguishable login failures.
```

Contract-derived verification:

```text
call the public login boundary with both cases
assert equal status, response shape, and externally visible side effects
```

Implementation-derived verification:

```text
assert AuthService catches UserNotFoundError
assert mapAuthError() was called once
```

The second test may describe current wiring while failing to prove the accepted behavior.

Contract:

```text
When a pending deletion reaches 14 days, sign-in and profile retrieval fail.
```

Contract-derived verification uses controlled time, triggers the supported deletion processing boundary, and checks sign-in/profile behavior. A test that calls a new private `hardDeleteExpiredUsers()` helper directly and asserts internal repository calls is weaker unless that helper is itself a supported contract.

## Existing code is still readable context

“Do not derive tests from implementation” does not mean “never read code.” The agent must understand public interfaces, test setup, fixtures, dependency boundaries, and established conventions. It may also learn that an existing behavior is contractual from tests or documentation.

The constraint is narrower: current implementation structure and output cannot be the sole reason an expectation is considered correct.

## Test levels

Choose the strongest practical boundary, not a universal test pyramid rule:

- public/API/UI behavior for user-visible ACs;
- contract or integration tests for component boundaries;
- persisted state or emitted messages for observable side effects;
- stable domain interfaces for combinatorial pure logic;
- static inspection only when execution is unavailable, reported as limited evidence.

Unit tests remain useful. They should test contract-derived inputs and outputs, not private decomposition for its own sake.

## Bug fixes

Regression work is the main ordering exception. Reproducing the failure before the fix demonstrates that the proposed oracle captures the reported bug. This is recommended when practical, but its purpose is evidence validation—not mandatory TDD-based design discovery.

## Test doubles

Fakes, stubs, and mocks may control nondeterministic or external boundaries. Prefer assertions about the resulting behavior. An interaction assertion is strong evidence only when the interaction is itself contractual, such as emitting a defined event or forbidding an external call. Wiring assertions are not a substitute for behavioral proof.

## Protecting tests from the implementation

The spec's Completion section rejects:

- snapshotting current output and declaring it expected;
- changing fixtures or expected values just to get green;
- weakening or deleting a failing test without a contract-backed reason;
- mock call assertions presented as proof of external behavior;
- line coverage presented as AC coverage.

When a current test conflicts with the ready spec, the run must determine whether the spec omitted an established behavior or the test is stale. A material change goes back to `/just-spec:spec` and updates the contract first; a test is never silently rewritten to match the new implementation.

## Limits

For security-critical, regulated, destructive, or high-cost changes, one-agent oracle discipline may be insufficient. Independent hidden tests, a separate reviewer, formal analysis, or a more rigorous workflow may be warranted.

One session writing both the code and its tests can share a single mistaken interpretation, and passing tests alone do not disprove that. Just Spec keeps the heavier safeguards outside the default so their cost is paid only when risk justifies it.
