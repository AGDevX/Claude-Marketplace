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

**Auto-Load Hook**

- Automatically loads core skills when you start a new Claude Code session
- No manual activation needed - your essential tools are always ready

**Skills Included:**

- **`/read-claude-md`** - Reads your `~/.claude/CLAUDE.md` configuration file
  - Automatically loads your personal Claude instructions at session start
  - Ensures Claude always follows your preferences and coding standards

# Usage

## Using Skills

Once the marketplace is installed, skills are automatically loaded at session start. You can:

1. **Let Claude use them automatically** - Claude will invoke skills proactively when appropriate
2. **Invoke manually** - Type `/skill-name` to run a specific skill
   ```
   /read-claude-md
   ```

## Managing Plugins

The marketplace configuration is stored in `.claude-plugin/marketplace.json`. Plugins are registered there and automatically discovered by Claude Code.

# License

MIT License - see [LICENSE](LICENSE) for details

Copyright (c) 2026 AGDevX

---

**Note:** This marketplace is designed for [Claude Code](https://claude.com/claude-code). Make sure you have Claude Code installed to use these plugins.
