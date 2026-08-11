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

## Two reasons a decision belongs to the human

A decision reaches the human when it has externally observable impact, **or** when it is hard to reverse.

The second reason is easy to lose. Transaction boundaries, event publication shape and timing, locking and concurrency control, cache coherence, and schema design frequently produce identical external behavior across the plausible options. Nothing distinguishes them on the day they are chosen. The cost appears later, when one of them has to be undone, and by then the choice is spread across the codebase.

Reversible choices stay with the model. Class names, file placement, helper shape, and test placement do not become questions merely because more than one answer exists.

## Highest-leverage questions

Prefer a question when its answer:

- determines the boundary or scope of the capability;
- resolves several dependent edge cases;
- defines a destructive, authorization, retention, or compatibility contract;
- locks in a structural choice that would be expensive to reverse;
- enables multiple ACs to become concrete;
- prevents high-cost rework.

Do not ask lower-level edge-case questions before a higher-level decision may make them irrelevant.

## How a question is presented

Questions arrive through the `AskUserQuestion` tool, one at a time, with the recommended option first. The human answers by choosing. Free text is never required, only accepted.

When the decision is hard to reverse and several options are genuinely defensible, the message carries the comparison — each option's upside and downside, then the recommendation and the reason for it, grounded in Out of Scope, an existing Decision, or the current standard in the codebase. The options themselves stay short: a name and a one-line summary.

This is not a design phase returning under another name. In practice the part of a design document that carried weight was rarely the detailed description; it was the comparison of alternatives and the recommendation. That part is worth keeping, and it fits inside a question.

Simple confirmations and factual checks skip the comparison and offer the options alone. Turning every question into a comparison would spend the attention the format is meant to save.

## Recording the outcome

The chosen option, the main rejected option, and the rationale go into Material Decisions. The rationale is the one the model already presented, and it is marked as model-authored, because the human selected an option rather than writing a justification.

The model never asks why a choice was made. The single exception is a choice that goes against the recommendation: that signals the human knows something the comparison did not contain, so an optional one-line note is offered. Skipping it is a valid answer and the entry still stands.

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
