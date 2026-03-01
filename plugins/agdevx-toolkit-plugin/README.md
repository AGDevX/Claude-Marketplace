# agdevx-toolkit-plugin

Branch protection hooks, NUL file cleanup, PR summaries, code explanation, and clipboard utilities for Claude Code.

## Hooks

### protect-main-branch (PreToolUse)

Prevents accidental modifications to protected branches (`main`, `master`, `production`, `prod`, `release`). Blocks file writes, dangerous git commands, and branch deletion on protected branches. Provides context-aware branch name suggestions with Jira issue ID integration.

### delete-nul-files (PostToolUse)

Automatically detects and removes NUL files that Windows sometimes creates when a reserved device name is inadvertently used as a filename. Runs after `Write`, `Edit`, `MultiEdit`, and `Bash` operations.

## Skills

### /pr-summary

Analyzes the current branch's changes and generates a concise PR summary ready to paste into GitHub.

### /explain-code

Explains code using analogies, ASCII diagrams, step-by-step walkthroughs, and gotcha callouts.

### /copy-to-clipboard

Copies content to the system clipboard. Cross-platform (Windows, macOS, Linux).

### /read-relevant-docs

Detects the project's tech stack and loads matching documentation from `~/.claude/docs/`.

## Prerequisites

- Node.js (for hook scripts)

## License

[MIT](LICENSE)
