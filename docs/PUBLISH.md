# Publish to GitHub

The repository is prepared for `Basio0916/just-spec`, with both marketplace and plugin named `just-spec`.

## Prerequisites

- GitHub CLI (`gh`)
- an authenticated account with permission to create `Basio0916/just-spec`
- Claude Code for the final marketplace validation

## Prepare a local Git repository

If you cloned the provided Git bundle, the repository and commits already exist:

```bash
git clone just-spec-0.5.0.bundle just-spec
cd just-spec
git remote remove origin  # the bundle path is only a temporary clone source
```

If you extracted the source ZIP instead, initialize it first:

```bash
cd just-spec
git init -b main
git add .
git commit -m "Initial Just Spec prototype"
```

## Create and push the public repository

From the repository root:

```bash
gh auth status
gh repo create Basio0916/just-spec \
  --public \
  --description "Turn ambiguous requests into verifiable completion conditions for Claude Code's /goal — through disciplined dialogue, not templates." \
  --source . \
  --remote origin \
  --push
```

The local repository uses `main` and contains the prototype history.

## Validate from the published source

```bash
claude plugin validate .
claude plugin marketplace add Basio0916/just-spec
claude plugin install just-spec@just-spec --scope user
```

Inside an existing Claude Code session:

```text
/reload-plugins
/just-spec:spec Add a bounded feature to this repository
```

## Release tag

After the clean-install check succeeds:

```bash
git tag -a v0.5.0 -m "Just Spec 0.5.0"
git push origin v0.5.0
```

## Repository settings

Recommended topics:

```text
claude-code, claude-code-plugin, spec-driven-development,
acceptance-criteria, ai-coding, frontier-models
```

Enable Issues for experiment reports. Do not enable GitHub Pages or package publishing for the prototype unless documentation needs grow.
