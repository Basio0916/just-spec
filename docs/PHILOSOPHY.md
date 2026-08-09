# Philosophy

## The hypothesis

Frontier coding models can often hold and execute a coherent implementation strategy for a bounded feature. Persisting every implementation step may duplicate model reasoning, create review burden, age quickly as code changes, and force repeated rereading.

A durable behavioral contract may retain the high-value information instead:

- intended outcome;
- observable rules;
- acceptance criteria;
- material decisions;
- constraints and exclusions;
- shared contracts.

## Persistent What, Ephemeral How

“What” changes more slowly than “how.” The same behavior can survive refactors, renamed files, different libraries, and improved internal decomposition. An implementation plan is often useful while coding but need not become a permanent artifact.

Just Spec does not forbid planning. It refuses to make detailed planning a mandatory persistent phase.

## Human judgment is reserved for material ambiguity

The model should not ask the human to choose a filename, class structure, or obvious repository convention. It should ask when two plausible answers change user behavior, security, data lifecycle, compatibility, business policy, or another costly-to-reverse contract.

Questions consume human attention. Zero questions is a good result when the answer is already present in the context. A longer interview is also valid when one cohesive capability genuinely contains several material decisions.

## Dynamic questions over fixed questionnaires

Just Spec has no fixed numerical cap on questions. It asks one high-leverage question, applies the answer, and recomputes what remains ambiguous. This avoids asking questions that an earlier answer has made irrelevant.

The goal is not “few questions” in isolation. The goal is minimum necessary human attention without leaving correctness-changing assumptions unresolved.

## Cohesion determines decomposition

Question count, file count, and technical layers do not define spec boundaries. A request is split only when it contains independently meaningful goals, acceptance surfaces, ownership/lifecycle boundaries, or explicit contracts between capabilities.

Complexity does not automatically imply decomposition. A single coherent user journey may require many decisions and still belong in one spec.

## Behavior compliance over plan compliance

Completing a list of planned edits does not prove correctness. Just Spec terminates against acceptance criteria and evidence. A changed file is an implementation fact; a passing behavior test is contract evidence only when the test itself traces to the contract.

## Tests come from the contract, not the implementation

Implementation and verification are sibling derivations of the same contract:

```text
                 ┌─→ implementation
Spec / AC ───────┤
                 └─→ verification
```

The order in which files are authored is secondary. Tests may come before, during, or after code. Expected results must not be copied from production output, internal branches, private methods, or the implementation structure being judged.

This is oracle independence, not a claim that one model becomes fully independent by changing prompts. Correlated misunderstanding is still possible. The lightweight default improves information flow and AC traceability; higher-risk work may justify separate agents, hidden tests, or human review.

## TDD is optional, not forbidden

Red-Green-Refactor can help humans discover design incrementally. Just Spec does not require that externalized microprocess for bounded feature work with frontier models. A repository may still mandate TDD, and bug fixes should reproduce the failure before the fix when practical to validate the regression oracle.

The prototype tests whether clear contracts and contract-derived verification preserve quality without making test order another approval phase.

## Coherent work over microtasks

Fine-grained tasks can help weak models, parallel work, resumability, and long autonomous runs. They also multiply context reloads, orchestration, reviews, and token cost. Just Spec gives one bounded behavioral contract to one frontier-model session by default.

## Ceremony must earn its cost

A new artifact, phase, reviewer, agent, mandatory question, testing order, or arbitrary numerical threshold should be added only when evidence shows it prevents more cost or risk than it creates. Optional rigor belongs outside the prototype core until then.

## Scope boundary

Just Spec is not designed to replace rigorous workflows for:

- multi-day unattended work;
- complex irreversible migrations;
- many-agent parallel implementation;
- regulated or safety-critical assurance;
- formal architecture approval;
- programs too large for a bounded contract and session.

The project tests a narrower claim about normal day-to-day feature development.
