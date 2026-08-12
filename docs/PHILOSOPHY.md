# Philosophy

## Upstream of the loop

Claude Code's `/goal` supplies the loop: a completion condition, an evaluator that checks it after every turn, and a session that keeps going until it holds. What a loop cannot produce for itself is its reference signal. Just Spec occupies that upstream position — it manufactures detectors, in conversation with a human, and hands them to the loop.

Execution is therefore not part of this tool. There is no build command, no iteration rule, and no stop condition of its own; reimplementing them would be reinventing an official feature, and the official one is the one worth trusting when nobody is watching.

Two things follow. The spec must be complete enough to be executed without anyone present, because nothing in the loop can ask a question on the human's behalf. And the rules of the run have to travel inside the spec, because the spec and a short condition are the only things that reach the session.

The evaluator judges from what the run wrote into the conversation. It does not run commands or open files. So an acceptance criterion is only useful when its result surfaces in the transcript, and the per-AC evidence table is how that happens.

## Where human review belongs

Human attention is the scarce resource in AI-assisted development, and a conventional workflow spends it in the worst possible place. Reviewing generated code costs more as more code is generated. Reviewing a contract costs one screen, no matter how much code the contract produces.

Just Spec therefore concentrates human review on the spec. Removing the plan and the task list is not the point; it is what makes the concentration possible, because every additional artifact is another claim on the same attention.

## The hypothesis

Frontier coding models can often hold and execute a coherent implementation strategy for a bounded feature. A durable behavioral contract retains the information worth persisting:

- intended outcome;
- observable rules;
- acceptance criteria;
- material decisions;
- constraints and exclusions;
- shared contracts.

## Persistent What, Ephemeral How

“What” changes more slowly than “how.” The same behavior can survive refactors, renamed files, different libraries, and improved internal decomposition. An implementation plan is often useful while coding but need not become a permanent artifact.

Just Spec does not forbid planning. It refuses to make detailed planning a mandatory persistent phase.

The How that stays ephemeral is the sequence of edits. The reason behind a choice that would be expensive to overturn is a different thing, and it is persisted as a Material Decision together with the option that was rejected. Code records what was chosen; nothing in the repository records what was rejected and why.

## Human judgment is reserved for material ambiguity

The model should not ask the human to choose a filename, class structure, or obvious repository convention. It should ask when two plausible answers change user behavior, security, data lifecycle, compatibility, business policy — or when the choice is simply hard to reverse.

Reversibility is a separate axis from observability. Transaction boundaries, event publication, concurrency control, cache coherence, and schema design can look identical from outside on the day they are chosen, and still be the most expensive decisions in the change. Those belong to the human.

Having a plausible default is a third thing, and it is not an excuse. The sort order of a list, whether a date comes from the business current date or the real clock, tie-breaking, rounding: each has an answer that looks natural enough to pass unnoticed, and each changes what users observe. Under unattended execution nobody is there to catch the inferred one, so the default's existence and the decision's materiality are judged separately.

The human is a decision maker here, not a document reviewer. The model carries each decision to them with options and a recommendation, and they choose. Just Spec does not create a step where a human reads a document looking for problems.

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

## Where a criterion is observed

An acceptance criterion that says what must hold, but not where it is observed, lets verification drift to whichever layer is cheapest to check. The same spec, implemented twice, was verified once against rendered markup and once at the service layer; the service-layer run never noticed a button that failed every time it was pressed.

So an AC about screen output or interaction carries its observation boundary in its own text. Domain and service criteria do not: applying it everywhere would be ceremony, and the drift it prevents is specific to the surface where rendering and interaction live.

## Coherent work over microtasks

Fine-grained tasks can help weak models, parallel work, and resumability. They also multiply context reloads, orchestration, reviews, and token cost. Just Spec gives one bounded behavioral contract to one frontier-model session, and lets `/goal` decide when that session is finished.

## Ceremony must earn its cost

A new artifact, phase, reviewer, agent, mandatory question, testing order, or arbitrary numerical threshold should be added only when evidence shows it prevents more cost or risk than it creates. Optional rigor belongs outside the prototype core until then.

## What the detectors cannot see

Acceptance criteria are detectors, and the run is a loop against them. A detector can establish that an implementation is faithful to the contract. It cannot establish that the contract is complete.

A missing acceptance criterion produces no failing test, no error, and no review finding. It is indistinguishable from success at every point after the spec is written. The residual risk of the whole workflow therefore collects in one place: the human reading the spec before the run starts.

The evaluator adds a second blind spot of the same shape. It reads the run's own report, so an evidence table that claims `PASS` for a check nobody executed satisfies it exactly as well as an honest one.

This is a deliberate bet rather than an oversight, and the marking of inferred items exists to make that reading cheaper. The bet should be stated plainly in the documentation instead of being hidden behind the parts that are automated.

## Scope boundary

Just Spec is not designed to replace rigorous workflows for:

- complex irreversible migrations;
- many-agent parallel implementation;
- regulated or safety-critical assurance;
- formal architecture approval;
- programs too large for a bounded contract and session.

Unattended execution is not among them. It is the standard path once `/goal` drives the run; what governs whether it holds up is whether the spec was finished to the point where the run never needs to ask.

The project tests a narrower claim about normal day-to-day feature development.
