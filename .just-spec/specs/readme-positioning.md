---
title: 名前の読みの確定とタグラインの更新
slug: readme-positioning
status: verified
created: 2026-08-12
updated: 2026-08-12
---

> `🤖` はあなたの回答ではなくコードベースや既存 spec からの推論で書いた項です。ここから先に確認してください。印のない項はあなたの決定です。

# Goal

Just Spec の名乗りを、確定した立ち位置に揃える。README（英日）の冒頭で "just" の読みを「spec だけあればいい（just the spec）」に確定させ、説明を「`/goal` が実行し、Just Spec はその完了条件を対話で作る」という関係が冒頭部だけで伝わる形にする。あわせて、GitHub リポジトリの description とプラグイン表面（マーケットプレイス／プラグインのマニフェストと README、公開手順の description 例）から「軽量な SDD ツール」と要約されうる自己紹介を取り除く。

## Context

Just Spec は Claude Code のプラグインマーケットプレイスで、実体は `plugins/just-spec/skills/spec/` 配下のスキル文書・テンプレート・リファレンスと、README（英日）・`docs/` のドキュメント群である。`scripts/validate.mjs` が必須ファイル・必須不変フレーズ・語数予算・3マニフェストのバージョン一致を CI で検査する。

直前のリリース 0.7.0 で build コマンドは廃止され、実行は Claude Code 公式の `/goal` に委譲済みである。README（英日）はその際に大部分が書き換えられており、`/goal` との関係も *just the spec* の読みも本文にはすでに存在する。ただし読みは冒頭ではなく本文中（`README.md:11` / `README.ja.md:11`）にあり、タイトル直下は標語のみである。

「軽量」を主語とした自己紹介は README からは除かれているが、次の場所に残っている。

- GitHub リポジトリの description: `Low-ceremony behavioral contracts with adaptive ambiguity resolution and contract-derived verification — a Claude Code plugin marketplace`
- `.claude-plugin/marketplace.json`: 同文の description と、`tags` の `low-ceremony`
- `plugins/just-spec/.claude-plugin/plugin.json`: `lean behavioral contracts` を含む description（かつ「実装と検証を導出する」という build 前提の記述）と、`tags` の `low-ceremony`
- `plugins/just-spec/README.md`: `lean, observable behavioral contract`
- `docs/PUBLISH.md`: `gh repo create --description "... low-ceremony spec-to-build workflow ..."` の例

また、README（英日）には 2 コマンド時代の残滓として `## Two Commands` / `## 2つのコマンド` の見出しと "only two skills" / 「2つのスキルしかありません」の記述が残っており、公開しているコマンドが `/just-spec:spec` の1つだけである実態と食い違っている。

`docs/PHILOSOPHY.md` の `lightweight default` はオラクル独立性の議論であり、自己紹介ではない。

## Requirements

### 名前の読みの確定

- **R1:** `README.md` のタイトル `# Just Spec` の直下（言語リンクの行を挟んでよい）に、名前の読みを宣言する一文を置く。文案は `Just the spec — that's all your agent needs.`（既存の文体に合わせた調整は可、ただし *just the spec* の読みが明示されること）。
- **R2:** `README.ja.md` も同じ位置に読みを宣言する一文を置く。文案は「必要なのは、specだけ。」（同様に *just the spec* の読みが明示されること）。
- **R3:** 標語 `**Persistent What. Ephemeral How.**` は冒頭から削除せず、読みの一文の下に置く。
- **R4:** 読みの宣言に続けて、名前の由来を1〜2文で述べる。趣旨は「plan も task も実行機構も持たない。対話で確定した spec を1つ作り、それをそのまま `/goal` に渡す。だから "Just Spec" は spec だけあればいいという意味である」。
- **R5:** 名前の説明に「軽量」「余計な工程を省いた」およびその英語相当（lightweight / low-ceremony / lean）を使わない。

### 説明の立ち位置への整合

- **R6:** README（英日）の冒頭部（最初の `##` 見出しより前）に、次の3要素をこの関係が読み取れる形で含める。
  - (a) `/goal` は完了条件を満たすまでエージェントが自律的に働く Claude Code 公式の機能であり、その成否は条件の質で決まること。
  - (b) Just Spec は、その条件を即席のプロンプトではなく対話の規律で作るツールであること。規律の内訳として、正しさを左右する曖昧さだけを質問すること（4条件）、高コストな分岐は選択肢と推奨で提示すること、AI の推定には `🤖` を付けること、判断は捨てた案とともに記録すること、AC 別の Evidence 報告と充足不能時の停止を spec 自体に織り込むこと。
  - (c) できあがった spec を `/goal` に渡せば、実行は無人で完了まで進むこと。
- **R7:** 冒頭部だけで、`/goal` が実行する側・Just Spec が条件を作る側という役割分担が分かるようにする。
- **R8:** README（英日）から 2 コマンド時代の残滓（`Two Commands` / 「2つのコマンド」の見出し、"only two skills" / 「2つのスキルしかありません」）を、公開コマンドが `/just-spec:spec` の1つである実態に合わせて是正する。
- **R9:** 🤖 README（英日）の全文に、旧立ち位置の残滓（build を現存するコマンドとして扱う記述、実行フェーズに人間の同席を前提とする記述、レビュー集中を主軸とした自己紹介）を残さない。build の廃止経緯と移行方法を案内する既存の節は、移行案内として維持する。

### プラグイン表面の語彙統制

- **R10:** GitHub リポジトリの description を立ち位置に合わせて更新する。文言は `Turn ambiguous requests into verifiable completion conditions for Claude Code's /goal — through disciplined dialogue, not templates.` とする。
- **R11:** `.claude-plugin/marketplace.json` のマーケットプレイス description とプラグインエントリの description を、`/goal` の上流という立ち位置を述べる文に更新する。
- **R12:** `plugins/just-spec/.claude-plugin/plugin.json` の description を同様に更新し、build 前提の記述（実装と検証を導出する、の趣旨）を残さない。
- **R13:** `.claude-plugin/marketplace.json` と `plugins/just-spec/.claude-plugin/plugin.json` の `tags` から `low-ceremony` を除く。
- **R14:** `plugins/just-spec/README.md` のコマンド説明から `lean` を主語とした表現を除き、立ち位置に合わせた説明にする。
- **R15:** `docs/PUBLISH.md` の `gh repo create --description` の例を R10 の文言に合わせる。
- **R16:** 語彙統制は「軽量」を主張の主語にしないことであり、限界を開示する既存の節（`What This Does Not Catch` / 「このワークフローが検出できないもの」など）や、成果としての簡潔さへの言及そのものを禁じるものではない。主張の中心は「spec が `/goal` に対して必要十分な契約であること」に置く。

### リリース

- **R17:** 🤖 バージョンを 0.7.1 に上げ、`package.json` / `.claude-plugin/marketplace.json`（マーケットプレイスとプラグインエントリの両方）/ `plugins/just-spec/.claude-plugin/plugin.json` を揃えて `CHANGELOG.md` に 0.7.1 のエントリを追記する。
- **R18:** `node scripts/validate.mjs` が成功する状態を保つ。

## Acceptance Criteria

すべての AC は、対象ファイルの該当箇所の引用、`gh` コマンドの出力、または `node scripts/validate.mjs` の実行結果で確認できる。引用と実行結果を報告に出力することが、そのまま Evidence となる。

### 名前の読み

- **AC1:** `README.md` において、`# Just Spec` の後、最初の `##` 見出しより前で、名前の読みを宣言する一文が標語 `**Persistent What. Ephemeral How.**` より上の行にあり、その文が *just the spec* の読みを明示している（該当行の引用と行番号で示せる）。
- **AC2:** `README.ja.md` において、同じ位置関係で読みを宣言する一文があり、日本語で「spec だけあればいい」旨と *just the spec* の表記の両方を含む。
- **AC3:** 英日いずれの冒頭部にも、名前の由来として「plan も task も実行機構も持たない」「対話で確定した spec を1つ作り、それをそのまま `/goal` に渡す」の両方の趣旨を述べる文がある。
- **AC4:** 標語 `**Persistent What. Ephemeral How.**` が英日いずれの冒頭部にも残っている。

### 説明の立ち位置

- **AC5:** `README.md` の冒頭部（最初の `##` 見出しより前）に、R6 の (a)(b)(c) に対応する記述がすべてある。(b) については、4条件による質問の絞り込み・選択肢と推奨・`🤖`・捨てた案の記録・AC 別 Evidence と充足不能時の停止の5点それぞれに対応する記述がある。
- **AC6:** `README.ja.md` の冒頭部が AC5 と同じ要素を同じ立ち位置で述べている。
- **AC7:** 英日いずれの冒頭部にも、`/goal` が実行する側であること、Just Spec がその完了条件を作る側であることを明示する文がある。
- **AC8:** `README.md` と `README.ja.md` に、`Two Commands` / 「2つのコマンド」の見出しと "only two skills" / 「2つのスキルしかありません」に相当する記述が存在しない（対象語の検索結果0件で示せる）。
- **AC9:** `README.md` と `README.ja.md` に、`/just-spec:build` を現存するコマンドとして扱う記述、および実行フェーズに人間の同席を前提とする記述が存在しない。build の廃止経緯と移行方法を案内する節は残っている。
- **AC10:** `README.md` と `README.ja.md` の冒頭部が、「レビューを spec に集中させる」を主軸とした自己紹介になっていない（冒頭部の全文を引用して示せる）。

### 語彙統制

- **AC11:** `README.md`・`README.ja.md`・`plugins/just-spec/README.md`・`.claude-plugin/marketplace.json`・`plugins/just-spec/.claude-plugin/plugin.json`・`docs/PUBLISH.md` の6ファイルに、大文字小文字を無視して `low-ceremony` / `lightweight` / `lean` / `軽量` のいずれも出現しない（この6ファイルに対する検索結果0件で示せる）。他のファイルは対象外とする。
- **AC12:** 上記6ファイルに「削った」「省いた」を Just Spec の説明の主語として用いた文がない。

### プラグイン表面と GitHub

- **AC13:** `.claude-plugin/marketplace.json` のマーケットプレイス description とプラグインエントリの description が、いずれも `/goal` に渡す完了条件を対話で作るという立ち位置を述べている。
- **AC14:** `plugins/just-spec/.claude-plugin/plugin.json` の description が同じ立ち位置を述べ、実装や検証を Just Spec が導出するという記述を含まない。
- **AC15:** `.claude-plugin/marketplace.json` と `plugins/just-spec/.claude-plugin/plugin.json` の `tags` 配列に `low-ceremony` が含まれない。
- **AC16:** `plugins/just-spec/README.md` のコマンド説明が、`/just-spec:spec` が `/goal` の起動行で終わることを述べたうえで、`lean` を主語としない表現になっている。
- **AC17:** `docs/PUBLISH.md` の `gh repo create --description` の例が R10 の文言と一致する。
- **AC18:** `gh repo view Basio0916/just-spec --json description` の出力に含まれる description が R10 の文言と一致する。

### リリース

- **AC19:** `package.json` / `.claude-plugin/marketplace.json`（マーケットプレイスとプラグインエントリの両方）/ `plugins/just-spec/.claude-plugin/plugin.json` のバージョンが `0.7.1` で一致し、`CHANGELOG.md` に 0.7.1 のエントリがある。
- **AC20:** `node scripts/validate.mjs` が終了コード0で成功する。
- **AC21:** `plugins/just-spec/skills/` 配下のファイルが、この変更で1つも変更されていない（`git diff --name-only` の出力に当該パスが現れないことで示せる）。

## Completion

この節は固定です。無人で実行されても契約が完結しているよう、各 spec に残します。

- 完了とは、全 AC が実行済みの根拠つきで `PASS` であり、AC 別の Evidence 表（AC / 結果 / 根拠）が報告されていることです。部分充足（「主要な AC は満たした」等）は完了ではありません。
- 期待結果は spec から導きます。現在の実装や観測された出力を根拠にしません。根拠には実行した検査の名前・コマンド・観測結果を示し、実行していない検査を `PASS` として報告しません。
- ある AC を満たすと別の AC または Constraint に必ず違反する場合、完了を宣言せず、矛盾の内容とそれまでの試行を報告して停止します。
- 同一 AC への修正が繰り返し失敗する場合、無際限に試行せず、試行の経緯・検出器の出力・原因の仮説を添えて停止します。報告は失敗の宣言ではなく、仕様を変えるか制約を緩めるかという人間が判断すべき点を明示した質問として構成します。
- 完了時に、この spec の `status` を全 AC PASS なら `verified`、そうでなければ `partial` に更新します。

## Decisions

- **D1:** 語彙統制の適用範囲をプラグイン表面まで広げる。README（英日）と GitHub description に加え、`marketplace.json` / `plugin.json` の description と `low-ceremony` タグ、`plugins/just-spec/README.md`、`docs/PUBLISH.md` の description 例を対象とする。
  - 捨てた主要案: ハンドオフの文言どおり README と GitHub description 欄のみを更新し、マニフェスト類は据え置く案。
  - 🤖 根拠: プラグイン一覧やマーケットプレイスに表示されるのはマニフェストの description であり、そこが「Low-ceremony」のままだと、README を読む前の最初の自己紹介が旧立ち位置のまま残る。
- **D2:** README 冒頭は「読みの一文 → 標語」の順とし、標語を冒頭から外さない。
  - 捨てた主要案: 冒頭の標語を読みの一文に置き換え、標語は設計思想の節と `docs/PHILOSOPHY.md` でのみ維持する案。
  - 🤖 根拠: 標語は 0.7.0 でも明示的に維持された不変項で、`scripts/validate.mjs` は検査していないぶん、削れば静かに失われる。
- **D3:** GitHub リポジトリ description の反映を実行に含め、`gh repo view --json description` の出力を AC18 の根拠とする。
  - 捨てた主要案: spec には確定文言だけを記録し、反映は人間が別途行う案。
  - 🤖 根拠: description の変更は上書きするだけで元に戻せるため、外部への書き込みとしては影響が小さく、反映済みであることを実行の報告から確認できる利点が上回る。
- **D4:** 🤖 バージョンを 0.7.1 に上げる — マニフェストの description と tags が変わり、プラグイン一覧に表示される文言が変わるため、全リリースでバージョンを上げるこのリポジトリの慣習と `validate.mjs` の3マニフェスト一致検査に従う。ドキュメントとメタデータのみの変更であるためパッチ版とする。
  - 捨てた主要案: ドキュメントのみの変更としてバージョンを据え置く案。
- **D5:** 🤖 `Two Commands` / 「2つのコマンド」見出しの是正を範囲に含める — 2コマンド時代の残滓であり、ハンドオフの検証手順2が求める「旧立ち位置の残滓が冒頭以外に残っていないかの全文確認」の対象に該当する。
- **D6:** 🤖 GitHub description はハンドオフの参考文案をそのまま採用する — 121 文字で GitHub の上限に収まり、短縮の必要がない。

## Constraints

- `README.md` と `README.ja.md` は同等の内容を保つ。
- 標語 `Persistent What. Ephemeral How.` を維持する。
- 既存の節構成を壊さない。特に `What This Does Not Catch` / 「このワークフローが検出できないもの」、Plan Mode との対比、「向いていない場面」、`🤖` の読み方の説明は維持する。
- README に他ツール・他手法との新たな比較表を追加しない。公式機能への言及は `/goal` と、既存の Plan Mode の対比に限る。
- README に経緯の物語を書かない。README は現在形の定義に限る。
- `plugins/just-spec/skills/` 配下（`SKILL.md`・`templates/`・`references/`・`examples/`）を変更しない。スキルとコマンドの挙動は変えない。
- `scripts/validate.mjs` の既存検査を満たし続ける。特に `README.md` が契約由来検証の原則（`contract-derived` または `Tests come from the contract, not the implementation`）を保持すること。
- `.just-spec/specs/` 配下の既存 spec を書き換えない。

## Out of Scope

- "Just Spec" の改名、および `/just-spec:spec` のコマンド名変更。
- スキル・コマンドの挙動変更。
- 読み替えの経緯を物語として書くこと。別の記事で行う。
- 他ツール・他手法との比較表の追加。
- `docs/PHILOSOPHY.md`・`docs/INTERVIEW.md`・`docs/VERIFICATION.md`・`docs/EXPERIMENT.md`・`docs/RELEASE.md` の書き換え（`docs/PUBLISH.md` の description 例を除く）。
- `docs/PHILOSOPHY.md` の `lightweight default`（オラクル独立性の議論）の書き換え。
- GitHub リポジトリのトピック・homepage など description 以外の設定変更。

## Dependencies and Shared Contracts

- `gh` CLI が認証済みで、`Basio0916/just-spec` の description を編集できること。編集できない場合は AC18 を PASS にせず、停止して報告する。
- GitHub リポジトリの description は 350 文字以内。

## Open Questions

None.
