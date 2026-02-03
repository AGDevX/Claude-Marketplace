# Claude Marketplace

A custom-developed collection of plugins, hooks, and skills for [Claude Code](https://claude.com/claude-code).

## What is This?

This marketplace provides reusable extensions for Claude Code that add functionality through:

- **Hooks**: Automated actions triggered by events (e.g., session start)
- **Skills**: Custom commands you can invoke with `/skill-name`
- **Plugins**: Bundled collections of hooks, skills, and agents

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

A collection of useful skills, hooks, and agents to streamline your Claude Code experience.

### Features

#### Skills Included

- **`/read-claude-md`** - Reads your `~/.claude/CLAUDE.md` configuration file. Useful after clearing or compacting context.
  - Loads your personal Claude instructions and preferences
  - Ensures Claude always follows your coding standards and workflows

- **`/read-git-docs`** - Reads your `~/.claude/docs/git.md` documentation. Useful after clearing or compacting context.
  - Loads your git workflow guidelines and best practices
  - Helps Claude follow your team's git conventions

- **`/read-relevant-docs`** - Intelligently loads project-specific documentation. Useful after clearing or compacting context.
  - Reads relevant docs from `~/.claude/docs/*` based on your project's technology stack
  - Write MD files containing information about technologies you want Claude to know about when working with them
  - Name the files after the technology (e.g., .NET_C#.md, JavaScript_TypeScript.md, Docker.md)
  - Ensures Claude understands your project-specific conventions

- **`/pr-summary`** - Generates comprehensive pull request summaries
  - Analyzes git branch changes and commits
  - Creates structured PR descriptions with changes categorized by type
  - Automatically copies the summary to your clipboard
  - Usage: `/pr-summary [target-branch]` (defaults to 'main' if not specified)

- **`/copy-to-clipboard`** - Copy content to the system clipboard
  - Cross-platform support (Windows, macOS, Linux)
  - Handles multi-line content, code snippets, and command output
  - Usage: `/copy-to-clipboard [content]` or ask Claude to "copy this to clipboard"

- **`/explain-code`** - Explains code with visual diagrams and analogies
  - Uses ASCII art diagrams to visualize code flow and structure
  - Provides everyday analogies to make complex concepts accessible
  - Includes step-by-step walkthroughs and common gotchas
  - Perfect for learning codebases or teaching others

#### Hooks Included

- **`protect-main-branch`** - Prevents accidental modifications to protected branches
  - Blocks direct commits to main, master, production, prod, and release branches
  - Provides intelligent branch name suggestions based on file context
  - Extracts Jira issue IDs from git context for branch naming
  - Prevents dangerous git commands (force push, hard reset, etc.)
  - Allows read-only operations (Read, Grep, Glob) on protected branches

- **`auto-load-core-skills`** - Automatically loads essential skills at session start
  - Currently loads `/read-claude-md` automatically when Claude starts
  - Note: Temporarily disabled pending Claude Code issue resolution

## Using Skills

Type `/skill-name` to run a specific skill:

```bash
# Load your personal Claude configuration
/read-claude-md

# Load your git workflow documentation
/read-git-docs

# Load project-specific documentation
/read-relevant-docs

# Generate a PR summary (copies to clipboard)
/pr-summary
/pr-summary main
/pr-summary develop

# Copy content to clipboard
/copy-to-clipboard "npm install express"

# Explain code with diagrams and analogies
/explain-code
```

You can also ask Claude naturally, and it will use the appropriate skill:

- "Copy this to my clipboard"
- "Explain how this authentication flow works"
- "Read my git docs"

## Managing Plugins

The marketplace configuration is stored in `.claude-plugin/marketplace.json`. Plugins are registered there and automatically discovered by Claude Code.

# License

MIT License - see [LICENSE](LICENSE) for details

Copyright (c) 2026 AGDevX

---

**Note:** This marketplace is designed for [Claude Code](https://claude.com/claude-code). Make sure you have Claude Code installed to use these plugins.
