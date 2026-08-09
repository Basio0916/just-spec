# Release checklist

1. Run `npm test`.
2. When Claude Code is available, run `claude plugin validate .`.
3. Test local marketplace installation in a clean Claude Code profile.
4. Exercise `/just-spec:spec` on at least one tiny request, one cohesive request requiring more than five material decisions, and one semantically multi-spec request.
5. Confirm the interview recomputes ambiguities after each answer, does not split by question count, and uses checkpoints without approval gates.
6. Exercise `/just-spec:build` and verify honest AC evidence on both passing and unavailable-test cases.
7. Confirm feature tests may be written after implementation but derive expected outcomes from ACs, not changed code.
8. Confirm a practical bug-fix regression test fails on the unfixed baseline.
9. Review new/changed tests for private-structure coupling and copied production logic.
10. Update `CHANGELOG.md`, plugin manifest version, marketplace entry version, and `package.json` together.
11. Run `npm run package` and inspect the ZIP.
12. Tag `v<version>` after the GitHub default branch contains the release.
