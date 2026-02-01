# Claude Marketplace

A custom-developed collection of plugins, hooks, and skills for [Claude Code](https://claude.com/claude-code).

## What is This?

This marketplace provides reusable extensions for Claude Code that add functionality through:

- **Hooks**: Automated actions triggered by events (e.g., session start)
- **Skills**: Custom commands you can invoke with `/skill-name`
- **Plugins**: Bundled collections of hooks, skills, and agents

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

A collection of useful skills, hooks, and agents to streamline your Claude Code experience.

### Features

**Skills Included:**

- **`/read-claude-md`** - Reads your `~/.claude/CLAUDE.md` configuration file
  - Automatically loads your personal Claude instructions at session start
  - Ensures Claude always follows your preferences and coding standards

- **`/pr-summary`** - Generates comprehensive pull request summaries
  - Analyzes git branch changes and commits
  - Creates structured PR descriptions with changes categorized by type
  - Helps you quickly understand what changed and why
  - Usage: `/pr-summary [target-branch]` (defaults to 'main' if not specified)

## Using Skills

Type `/skill-name` to run a specific skill

```
/read-claude-md
/pr-summary
/pr-summary main
```

## Managing Plugins

The marketplace configuration is stored in `.claude-plugin/marketplace.json`. Plugins are registered there and automatically discovered by Claude Code.

# License

MIT License - see [LICENSE](LICENSE) for details

Copyright (c) 2026 AGDevX

---

**Note:** This marketplace is designed for [Claude Code](https://claude.com/claude-code). Make sure you have Claude Code installed to use these plugins.
