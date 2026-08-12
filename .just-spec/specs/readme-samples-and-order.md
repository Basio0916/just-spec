---
title: README に実物のサンプルを載せ、導入に届く節順に組み替える
slug: readme-samples-and-order
status: verified
created: 2026-08-12
updated: 2026-08-12
---

> `🤖` はあなたの回答ではなくコードベースや既存 spec からの推論で書いた項です。ここから先に確認してください。印のない項はあなたの決定です。

# Goal

README（英日）を、読み手がインストール前に「使うと何が起きるか」を目で確認できる形にする。対話の規律を説明している箇所に実際の質問の形を、実行の説明をしている箇所に実際の AC 別 Evidence 表を1つずつ挿入し、節順を「一行の定義 → 実例 → インストール → 使い方 → 原則 → 限界」に組み替える。あわせて、末尾の探究する問いと冒頭のスローガンを、無人実行を標準の経路とする現在の立ち位置に揃える。

## Context

README.md（283行）と README.ja.md（283行）は、直前の 0.7.1 で立ち位置の転換（`/goal` への実行委譲、build の廃止、*just the spec* の読み）を反映済みで、文章そのものは概ね完成している。今回はドキュメントのみの変更であり、スキルの挙動は変えない。

現在の `##` 節順は、冒頭部 → What Just Spec Persists → The Command → Principles → What This Does Not Catch → Just Spec and Plan Mode → Installation → Usage → When Not to Use Just Spec → Status → License である。インストール手順が思想をすべて読み終えた後にしか現れない。

README は対話の規律を繰り返し記述しているが（`README.md:86` の「Questions arrive one at a time...」、`README.md:110-127` の実行の説明）、その対話と成果物の実物を一度も見せていない。

冒頭には太字のスローガンが2行重なっている（`README.md:5,7` / `README.ja.md:5,7`）。`**Persistent What. Ephemeral How.**` は README.md では Principles 節の小見出し `### Persistent What, Ephemeral How`（`README.md:145`）にも現れるが、README.ja.md では7行目にしか存在せず、日本語の対応する小見出しは「「何が正しいか」は残し、「どう作るか」は残さない」である。

「When Not to Use Just Spec」節は、無人実行が標準の経路である旨を述べたうえで、節末の問いだけが旧立ち位置（レビュー集中・日常開発）のまま残っている（`README.md:267` / `README.ja.md:267`）。

`scripts/validate.mjs` は README.md が契約由来検証の原則（`contract-derived` または `Tests come from the contract, not the implementation`）を保持していることを検査する。README のみの変更は、このリポジトリでは `cc18fd4` と `64d63a0` のようにバージョンを上げずに入っている。

## Requirements

### サンプルの挿入

- **R1:** README.md の `### /just-spec:spec` 節、「Questions arrive one at a time」で始まる段落の直後に、選択肢と推奨からなる質問のサンプルを1つ挿入する。題材は図書館アプリの貸出可否判定における、延滞判定と貸出冊数上限の判定順序とする。案A は既存の判定順の末尾に冊数上限を追加する案、案B は延滞を先に判定する案、推奨は案B、推奨の理由は「冊数上限は他の本を返せば解消できるが、延滞は延滞している本を返すまで解消できない」趣旨とする。
- **R2:** 質問サンプルは、実行時に人間が実際に見るものと同じ2部構成にする。すなわち (a) 各案の利点と欠点、および推奨とその理由を述べる本文、(b) 推奨案を先頭に置き、推奨であることが分かる印を付けた選択肢の一覧（各案はラベルと1行の要約）。テキストのコードブロックで表し、画像は使わない。
- **R3:** README.md の「Running the spec」節にある `Behavioral Contract` から `AC Evidence` に至る実行フロー図の直後に、AC 別 Evidence 表のサンプルを1つ挿入する。列は AC・結果・根拠の3列、データ行は5行、結果はすべて `PASS` とする。
- **R4:** Evidence 表の根拠列には、自動テスト由来のもの（テスト名またはコマンドと、その出力）と、実機または画面での確認由来のものを混在させる。同じ `PASS` でも根拠の強度に差があることが読み取れる形にする。
- **R5:** Evidence 表サンプルの題材は、R1 の質問サンプルと同じ図書館アプリとする。
- **R6:** 各サンプルは1画面に収める。質問サンプルはコードブロックの中身を30行以内、Evidence 表は見出し行と区切り行を含めて10行以内とする。
- **R7:** サンプルの前後に、既存の説明文と内容が重複する前置きを付けない。
- **R8:** README.ja.md にも、同じ位置・同じ題材・同じ構造のサンプルを2つ挿入する。サンプル内の文言は、表の列見出しを含めて日本語とする。

### 節順の入れ替え

- **R9:** README.md の `##` 節を次の順に並べ替える。冒頭部（見出しなし）→ The Command → Installation → Usage → What Just Spec Persists → Principles → What This Does Not Catch → Just Spec and Plan Mode → When Not to Use Just Spec → Status → License。
- **R10:** The Command 節の下位見出し（`### /just-spec:spec`、`### Reading a Spec`、`### Running the spec`、`#### Where /just-spec:build went`）は、現在の順序を保ったまま The Command 節とともに移動する。
- **R11:** 節の移動、本 spec が指定するサンプルの挿入・スローガンの移動・問いの差し替え、および並べ替えによって向きが合わなくなった前方参照・後方参照の接続の修正を除き、本文の内容を変更しない。
- **R12:** 冒頭部（`# Just Spec` から最初の `##` 見出しの直前まで）の分量を、現状より増やさない。
- **R13:** README.ja.md の節順と下位見出しの順を、README.md と対応させる。

### 末尾の問いの差し替え

- **R14:** README.md の「When Not to Use Just Spec」節末の引用の問いを `Is one contract, settled in conversation, enough of a reference signal for a loop nobody is watching?` に差し替える。
- **R15:** README.ja.md の同じ位置の問いを「対話で確定させた一つの契約は、誰も見ていないループの参照信号として十分か。」に差し替える。
- **R16:** 差し替え後の問いが、同じ節にある「無人実行は向いていない場面の一覧に入らず、`/goal` が回すいまは標準の経路である」という既存の記述と同じ軸で書かれている状態にする。

### 冒頭スローガンの整理

- **R17:** README.md の冒頭部に置く太字のスローガンを `**Just the spec — that's all your agent needs.**` の1つだけにし、`**Persistent What. Ephemeral How.**` の行を冒頭部から削除する。
- **R18:** README.md の Principles 節にある小見出し `### Persistent What, Ephemeral How` はそのまま残す。
- **R19:** README.ja.md の冒頭部に置く太字のスローガンを `**必要なのは、specだけ。**` の1つだけにし、`**Persistent What. Ephemeral How.**` の行を冒頭部から削除する。
- **R20:** README.ja.md の設計思想節の最初の小見出し「「何が正しいか」は残し、「どう作るか」は残さない」の直下に、`**Persistent What. Ephemeral How.**` の行を置く。

### 全体の整合

- **R21:** 変更後の README（英日）の全文に、旧立ち位置の残滓を残さない。すなわち、build を現存するコマンドとして扱う記述、実行フェーズに人間の同席を前提とする記述、レビュー集中を主軸とした自己紹介。build の廃止経緯と移行方法を案内する既存の節、および `/goal` が使えない環境向けの案内は、そのまま残す。
- **R22:** 🤖 `node scripts/validate.mjs` が成功する状態を保つ。

## Acceptance Criteria

すべての AC は、対象箇所の引用、`grep` の結果、変更前後の差分、または `node scripts/validate.mjs` の実行結果で確認できる。引用と実行結果を報告に出力することが、そのまま Evidence となる。

### サンプル

- **AC1:** README.md の `### /just-spec:spec` 節において、「Questions arrive one at a time」を含む段落の直後に質問サンプルのコードブロックが1つある。そのサンプルには、案A・案Bそれぞれの利点と欠点、推奨が案B であること、推奨の理由（冊数上限は他の本を返せば解消でき、延滞は延滞している本を返すまで解消できない趣旨）、および推奨案が先頭に置かれ推奨と分かる印の付いた選択肢一覧が、すべて含まれる。
- **AC2:** README.ja.md の対応する位置に、同じ題材・同じ構成の質問サンプルがあり、本文と選択肢一覧のいずれも日本語で書かれている。
- **AC3:** 質問サンプルのコードブロックの中身が、英日いずれも30行以内である（行数を数えて示せる）。
- **AC4:** README.md の「Running the spec」節において、`Behavioral Contract` から `AC Evidence` に至る実行フロー図の直後に、AC・結果・根拠の3列で構成された Markdown の表がある。データ行は5行で、すべての結果が `PASS` である。
- **AC5:** AC4 の表の根拠列のうち、少なくとも1行がテスト名またはコマンドとその出力を示す自動テスト由来の根拠であり、少なくとも1行が実機または画面での確認由来の根拠である。
- **AC6:** README.ja.md の対応する位置に同じ構造の表があり、列見出しと各セルが日本語である。
- **AC7:** Evidence 表が、英日いずれも見出し行と区切り行を含めて10行以内である。
- **AC8:** 2つのサンプルの題材が、英日いずれも図書館アプリで一致している。

### 節順

- **AC9:** README.md の `##` 見出しの出現順が、The Command → Installation → Usage → What Just Spec Persists → Principles → What This Does Not Catch → Just Spec and Plan Mode → When Not to Use Just Spec → Status → License である（`grep -n '^## ' README.md` の出力で示せる）。
- **AC10:** README.ja.md の `##` 見出しの出現順が、AC9 の各節に1対1で対応する順である（同じ検査の出力で示せる）。
- **AC11:** 英日いずれも、`### /just-spec:spec` → `### Reading a Spec`（日本語版は対応する見出し）→ `### Running the spec` → `#### Where /just-spec:build went` の順が保たれ、これら4つがすべて Installation の見出しより前にある。
- **AC12:** 英日いずれも、Installation 節が Principles 節より前にある。
- **AC13:** 並べ替え前後の各 `##` 節の本文を比較したとき、本 spec がサンプル挿入・スローガンの移動・問いの差し替えを指定した箇所を除いて、本文が文字列として一致する。一致しない箇所がある場合は、その差分が並べ替えに伴う参照の向きの修正に限られることを、差分の引用で示す。
- **AC14:** 冒頭部（`# Just Spec` から最初の `##` 見出しの直前まで）の行数が、英日いずれも変更前と同じかそれ以下である。

### スローガン

- **AC15:** README.md の冒頭部にある太字だけの行が1行であり、その内容が `**Just the spec — that's all your agent needs.**` である。
- **AC16:** README.ja.md の冒頭部にある太字だけの行が1行であり、その内容が `**必要なのは、specだけ。**` である。
- **AC17:** README.md に `### Persistent What, Ephemeral How` の小見出しが Principles 節内に残っている。
- **AC18:** README.ja.md の設計思想節の最初の小見出しの直下に `**Persistent What. Ephemeral How.**` の行がある。

### 問いと整合

- **AC19:** README.md の「When Not to Use Just Spec」節末の引用が `Is one contract, settled in conversation, enough of a reference signal for a loop nobody is watching?` であり、README.md 全文に `If human review is concentrated on one contract` の文字列が存在しない。
- **AC20:** README.ja.md の対応する節末の引用が「対話で確定させた一つの契約は、誰も見ていないループの参照信号として十分か。」であり、README.ja.md 全文に「人間のレビューを1つの契約に集中させたとき」の文字列が存在しない。
- **AC21:** 英日いずれも、その問いを含む節に「無人実行は向いていない場面の一覧に入らず、`/goal` が回すいまは標準の経路である」旨の既存の記述が残っている（節全文の引用で示せる）。
- **AC22:** 変更後の README（英日）全文に、build を現存するコマンドとして扱う記述、実行フェーズに人間の同席を前提とする記述（`/goal` が使えない環境向けの案内を除く）、およびレビュー集中を主軸とした自己紹介が存在しない。build の廃止経緯と移行方法を案内する節は残っている（全文の通読結果として、該当箇所の引用または不在の報告で示せる）。

### 影響範囲

- **AC23:** `node scripts/validate.mjs` が終了コード0で成功する。
- **AC24:** この変更で更新されたファイルが、`README.md`・`README.ja.md`・この spec ファイルの3つだけである（`git diff --name-only` と `git status --porcelain` の出力で示せる）。

## Completion

この節は固定です。無人で実行されても契約が完結しているよう、各 spec に残します。

- 完了とは、全 AC が実行済みの根拠つきで `PASS` であり、AC 別の Evidence 表（AC / 結果 / 根拠）が報告されていることです。部分充足（「主要な AC は満たした」等）は完了ではありません。
- 期待結果は spec から導きます。現在の実装や観測された出力を根拠にしません。根拠には実行した検査の名前・コマンド・観測結果を示し、実行していない検査を `PASS` として報告しません。
- ある AC を満たすと別の AC または Constraint に必ず違反する場合、完了を宣言せず、矛盾の内容とそれまでの試行を報告して停止します。
- 同一 AC への修正が繰り返し失敗する場合、無際限に試行せず、試行の経緯・検出器の出力・原因の仮説を添えて停止します。報告は失敗の宣言ではなく、仕様を変えるか制約を緩めるかという人間が判断すべき点を明示した質問として構成します。
- 完了時に、この spec の `status` を全 AC PASS なら `verified`、そうでなければ `partial` に更新します。

## Decisions

- **D1:** README.ja.md では、冒頭から外した標語を設計思想節の最初の小見出しの直下に併記して残す。
  - 捨てた主要案: 冒頭から削除するだけとし、日本語版には標語を残さない案。
  - 🤖 根拠: 英日の構成を一致させるという共通事項に従うと、英語版で標語を担っているのは Principles 節の小見出しであり、日本語版の対応する位置に置くのが同じ構成になる。日本語版に標語がまったく残らない状態は、これまでのリリースで明示的に維持されてきた不変項が日本語面から静かに失われることを意味する。
- **D2:** 🤖 Evidence 表サンプルの題材を、質問サンプルと同じ図書館アプリに揃える。
  - 捨てた主要案: README の Usage 節で使っているアカウント削除を題材にする案。
  - 🤖 根拠: 同じ題材で質問と Evidence を並べると、「答えた選択がどの受け入れ基準の根拠になるか」を読者が1本の線で追える。題材が変わると、サンプル2つがそれぞれ独立した図解になる。
- **D3:** 🤖 Evidence 表サンプルの挿入位置を、「Running the spec」節の実行フロー図の直後とする。
  - 捨てた主要案: 末尾の完了報告に言及している Usage 節末に置く案。
  - 🤖 根拠: 節順の入れ替え後、Usage は The Command より後ろに来る。フロー図の直後に置けば、読者はインストールに到達する前に成果物の実物を見られる。
- **D4:** 🤖 バージョンを上げず、`CHANGELOG.md` にもエントリを追加しない。
  - 捨てた主要案: 0.7.2 として同時にリリースする案。
  - 🤖 根拠: マニフェストにもスキルにも変更が及ばない README のみの変更である。このリポジトリでは README のみの変更（`cc18fd4`、`64d63a0`）はバージョンを上げずに入っており、0.7.1 でバージョンを上げたのはマニフェストの description と tags が変わったためである。
- **D5:** 🤖 質問サンプルを、比較を述べる本文と推奨を先頭に置いた選択肢一覧の2部構成とする。
  - 🤖 根拠: 実行時に人間が見るのはこの2つであり、片方だけでは「答えることは選ぶことだ」が伝わらない。選択肢一覧だけでは推奨の理由が消え、本文だけでは選ぶ形式が見えない。

## Constraints

- `README.md` と `README.ja.md` は同等の内容と同じ節構成を保つ。
- この変更で触れるファイルは `README.md` と `README.ja.md` のみとする（本 spec 自身の `status` 更新を除く）。`package.json`・`CHANGELOG.md`・マニフェスト類は変更しない。
- `plugins/just-spec/skills/` 配下（`SKILL.md`・`templates/`・`references/`・`examples/`）を変更しない。スキルとコマンドの挙動は変えない。
- 思想節（Principles / 設計思想、What This Does Not Catch / このワークフローが検出できないもの）の本文を書き換えない。移動のみとする。
- `scripts/validate.mjs` の既存検査を満たし続ける。特に `README.md` が契約由来検証の原則（`contract-derived` または `Tests come from the contract, not the implementation`）を保持すること。
- README に他ツール・他手法との新たな比較表を追加しない。既存の Plan Mode との対比は維持する。
- README に経緯の物語を書かない。README は現在形の定義に限る。
- サンプルは画像を使わず、テキストのコードブロックと Markdown の表で表す。
- `.just-spec/specs/` 配下の既存 spec を書き換えない。

## Out of Scope

- スキル・コマンドの挙動変更。
- 思想節（Principles、What This Does Not Catch）の内容の書き換え。今回は配置の移動のみ。
- 競合・代替手段との比較の追加。
- スクリーンショット画像の作成。
- 読み替えの経緯を記事として物語化すること。別途行う。
- バージョンの更新と `CHANGELOG.md` への追記。
- `docs/` 配下および `plugins/just-spec/README.md` の更新。
- サンプルの題材となる図書館アプリの実装。

## Dependencies and Shared Contracts

None.

## Open Questions

None.
