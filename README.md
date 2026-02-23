# Claude Marketplace

A custom-developed collection of plugins, hooks, and skills for [Claude Code](https://claude.com/claude-code).

## What is This?

This marketplace provides reusable extensions for Claude Code that add functionality through:

- **Skills**: Slash commands you invoke with `/skill-name`
- **Hooks**: Automated actions triggered by events (e.g., before a tool runs)
- **Plugins**: Bundled collections of skills and hooks

## Requirements

- Node.js
- Claude Code

## Installation

1. Install the marketplace:

```bash
claude plugin marketplace add agdevx/claude-marketplace
```

2. Install the plugin:

```bash
claude plugin install agdevx-toolkit-plugin
```

## AGDevX Toolkit Plugin

**Version:** 0.0.1
**Location:** `./plugins/agdevx-toolkit-plugin`

A collection of useful skills and hooks to streamline your Claude Code experience.

### Skills

- **`/pr-summary [target-branch]`** — Generates a concise PR summary from your branch changes, grouped by area. Copies to clipboard. Defaults to comparing against `main`.

- **`/explain-code`** — Explains code with ASCII diagrams, everyday analogies, step-by-step walkthroughs, and common gotchas.

- **`/copy-to-clipboard`** — Cross-platform clipboard support (Windows, macOS, Linux). Works with multi-line content, code snippets, and command output.

- **`/read-relevant-docs`** — Detects your project's tech stack and loads matching documentation from `~/.claude/docs/*`. Useful after clearing or compacting context.

### Hooks

- **`protect-main-branch`** *(PreToolUse)* — Prevents accidental modifications to protected branches (`main`, `master`, `production`, `prod`, `release`). Blocks writes and dangerous git commands, suggests branch names based on file context, and extracts Jira issue IDs for branch naming. Read-only operations are allowed.

## Managing Plugins

The marketplace configuration is in `.claude-plugin/marketplace.json`. Plugins are registered there and automatically discovered by Claude Code.

# License

MIT License - see [LICENSE](LICENSE) for details

Copyright (c) 2026 AGDevX

---

**Note:** This marketplace is designed for [Claude Code](https://claude.com/claude-code). Make sure you have Claude Code installed to use these plugins.
