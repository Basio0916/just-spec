# Dynamic material-ambiguity interview

Just Spec does not optimize for a small absolute number of questions. It optimizes for the smallest amount of human attention that still produces a correct, buildable contract.

## Why there is no fixed question limit

A question count is not a proxy for scope or quality. One cohesive capability may have many policy decisions, while two separate capabilities may each have only one ambiguity. Automatically splitting at a numerical threshold can fragment one user journey, duplicate shared context, and weaken end-to-end acceptance criteria.

The governing rule is:

> Ask as many questions as necessary, and no more than necessary. Cohesion determines decomposition.

## The interview is adaptive

At any moment the skill maintains a provisional contract and a set of unresolved material ambiguities. It does not expose or persist that set as a task list.

After every answer it:

1. updates the provisional behavioral contract;
2. re-evaluates what is still unresolved;
3. removes decisions made irrelevant by the answer;
4. reshapes dependent questions;
5. selects the next highest-leverage decision.

This matters because early answers often collapse later branches. For example, choosing immediate irreversible deletion eliminates recovery-window questions; choosing recoverable deletion creates them.

## Highest-leverage questions

Prefer a question when its answer:

- determines the boundary or scope of the capability;
- resolves several dependent edge cases;
- defines a destructive, authorization, retention, or compatibility contract;
- enables multiple ACs to become concrete;
- prevents high-cost rework.

Do not ask lower-level edge-case questions before a higher-level decision may make them irrelevant.

## Semantic decomposition

Split only when the result is easier to understand and verify as independently coherent capabilities. Useful signals include distinct goals, separate release or ownership boundaries, different permission models, independently valuable ACs, and explicit contracts between the parts.

Do not split based on question count, implementation layers, file count, or perceived coding effort.

### Cohesive despite many decisions

Recoverable account deletion may include recovery duration, login behavior, active sessions, subscriptions, authored content, audit records, re-registration, and external deletion processors. These decisions can belong to one spec when together they define one account-deletion journey.

### Split despite few decisions

“Delete my account and let administrators export organization audit archives” should usually become separate specs. The actors, goals, permissions, lifecycle, and verification surfaces are distinct even if only two questions are needed.

## Checkpoints without gates

A long interview may include short checkpoints listing resolved decisions and remaining material topics. They help the user stay oriented but do not require an approval ceremony. The next turn remains one high-leverage question unless the user changes direction.

## Completion condition

The interview ends when the contract is behaviorally ready: its goal, observable rules, ACs, decisions, and shared contracts are clear enough that different reasonable implementers should agree on what success means.
