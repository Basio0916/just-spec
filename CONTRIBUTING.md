# Contributing

Just Spec is deliberately small. Contributions should preserve the experiment rather than gradually rebuild a full SDD framework.

## Guardrails

A core change should not add, by default:

- persistent design or implementation-plan artifacts;
- persistent task decomposition;
- mandatory per-phase approvals;
- subagent orchestration;
- per-task independent review;
- a CLI, database, dashboard, or state machine not required by evidence;
- questions about reversible implementation details;
- mandatory Test First, TDD, or test-plan phases for ordinary feature work;
- tests whose expected behavior is justified only by the implementation under test.

Optional rigor may be proposed only with a concrete use case and a reason it cannot remain outside the two-command core.

## Development

```bash
npm test
npm run package
```

Prompt changes should update structural assertions when they alter an invariant. Keep each core `SKILL.md` under the enforced word budget so invocation cost remains bounded.

## Pull requests

Explain:

- the failure mode being addressed;
- why the current contract/ambiguity/evidence mechanisms are insufficient;
- the expected token and human-attention cost;
- how the change will be evaluated.
