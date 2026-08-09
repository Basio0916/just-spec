# Just Spec

[English](./README.md)

**Persistent What. Ephemeral How.**

Just Specは、Claude Code向けの軽量なSpec駆動開発プラグインです。

詳細なDesign、Implementation Plan、細粒度なTask分割を作る代わりに、実装前に**「何を満たせば正しいのか」だけを明確にします。**

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

> フロンティアモデルに必要なのは、詳細なImplementation Planではなく、曖昧さのないBehavioral Contractではないか？

Just Specは、この仮説を日常的なソフトウェア開発で試すための小さなワークフローです。

## Why Just Spec?

AIコーディングのためのSpec駆動開発には、Design、Plan、Tasks、Reviewなどを段階的に作成するワークフローがあります。

これらは長時間の自律開発や大規模な変更では有効です。一方、普段の機能開発では、工程そのものが時間・トークン・人間の認知負荷を増やすことがあります。

Just Specでは、次のものをデフォルトでは作りません。

- Design document
- Persistent implementation plan
- Fine-grained task decomposition
- Task-by-task review
- Test plan
- Subagent orchestration

代わりに残すのは、実装の正しさを判断するためのContractです。

```text
Goal
Requirements
Acceptance Criteria
Material Decisions
Constraints
Out of Scope
```

実装方法は、その時点のコードベースを見てモデル自身が判断します。

## Two commands

Just Specには2つのSkillしかありません。

### `/just-spec:spec`

要求とコードベースを確認し、Behavioral Contractを作成します。

```text
/just-spec:spec <変更要求>
```

AIがコードや既存仕様から推論できることは質問しません。

人間に確認するのは、正しさを左右する **Material Ambiguity** だけです。たとえば、ユーザーから見える振る舞い、Public / Shared Contract、Authorization、Data retention、Backward compatibility、Destructive behavior、Business policyなどです。

質問は一度に1つ行い、回答を得るたびに残っている曖昧さを再評価します。質問数に固定上限はありません。Specの分割も質問数ではなく、独立したGoalとAcceptance Criteriaを持つかどうかで判断します。

生成されたSpecは次に保存されます。

```text
.just-spec/specs/<slug>.md
```

### `/just-spec:build`

ReadyになったSpecを実装します。

```text
/just-spec:build <spec-path-or-slug>
```

実装に必要なPlanは内部で一時的に考えますが、artifactとして保存しません。

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

実装後は、各Acceptance Criterionについて実行済みのEvidenceを報告します。

## Principles

### Persistent What, Ephemeral How

永続化するのは「何が正しいか」です。

「どのファイルを変更するか」「どの順番で実装するか」といったHowは、その時点のコードを見てAIが判断します。

### Resolve material ambiguity, not implementation detail

人間に聞くのは、正しさを左右するDecisionだけです。

Class名、File配置、Helperの形など、可逆なImplementation DetailはAIに任せます。

### Behavior compliance, not plan compliance

「Planをすべて実行したか」ではなく、**Acceptance Criteriaを満たしたか**で完了を判断します。

### Tests come from the contract, not the implementation

Test FirstやTDDは必須ではありません。

重要なのはTestを書く順番ではなく、期待結果のSource of Truthです。

```text
              ┌── Implementation
Spec / AC ────┤
              └── Tests
```

TestとImplementationは、どちらも同じBehavioral Contractから導出します。Production codeの内部構造や現在の出力を正解としてTestを作らないことを重視します。

## Why not Plan Mode?

Plan ModeとJust Specは、扱う問題が異なります。

| | Plan Mode | Just Spec |
|---|---|---|
| 主な問い | どう実装するか？ | 何を満たせば正しいか？ |
| 主成果物 | Implementation Plan | Behavioral Contract |
| How | 明示的に計画する | AIが実装時に判断する |
| What | PromptやPlanに含まれる | Spec / ACとして明示する |
| 人間への確認 | Planや実装方針 | Material Ambiguityのみ |
| 完了判定 | Planの実行 | ACに対するEvidence |

Just SpecはPlan Modeを置き換えることを目的としていません。

長時間の自律開発、大規模なMigration、複雑な並列実装などでは、詳細なPlanが有効な場合があります。

Just Specが対象にしているのは、**フロンティアモデルを使った日常的なソフトウェア開発**です。

## Installation

Claude CodeでMarketplaceを追加します。

```text
/plugin marketplace add Basio0916/just-spec
```

Just Specをインストールします。

```text
/plugin install just-spec@just-spec
```

必要に応じてPluginを再読み込みします。

```text
/reload-plugins
```

## Usage

まずSpecを作ります。

```text
/just-spec:spec ユーザーがアカウントを削除できるようにしたい
```

Material Ambiguityがあれば、Just Specが必要なことだけを確認します。

SpecがReadyになったら実装します。

```text
/just-spec:build account-deletion
```

Build完了時には、Implementation SummaryとAcceptance CriteriaごとのEvidenceが報告されます。

## When not to use Just Spec

Just Specは、すべての開発に最適なワークフローを目指しているわけではありません。

以下のような作業では、より厳密なPlanningやReviewが適している場合があります。

- 長時間の無人実行
- 大規模なMigration
- 複数Agentによる並列開発
- Security-criticalな変更
- 複雑なArchitecture変更
- 高い監査性や承認プロセスが必要な開発

Just Specは、こうしたワークフローを否定するものではありません。

**日常的な開発では、もっと少ないScaffoldingで十分ではないか？**

という仮説を検証するプロジェクトです。

## Status

Just Specは現在Experimentalです。

まずClaude Code向けの小さなPluginとして、次の2つだけに集中しています。

```text
/just-spec:spec
/just-spec:build
```

機能を増やすことより、少ないCeremonyで品質を維持できるかを優先して検証しています。

## License

MIT
