---
name: pr-summary
description: Analyze git branch changes and generate a comprehensive PR summary. Use when creating pull requests or summarizing branch work.
allowed-tools: Bash, Read, Grep, Glob
disable-model-invocation: true
argument-hint: [target-branch]
---

# PR Summary Generator

Generate a comprehensive pull request summary for the current branch.

## Instructions

1. **Get branch information:**
   - Current branch: `git branch --show-current`
   - Target branch: Use $ARGUMENTS if provided, otherwise use 'main'
   - Commits: `git log <target-branch>..HEAD --oneline`

2. **Analyze changes:**
   - Changed files: `git diff --name-status <target-branch>..HEAD`
   - Statistics: `git diff --stat <target-branch>..HEAD`
   - Detailed diff for context: `git diff <target-branch>..HEAD`

3. **Identify change categories:**
   - New features (A = added files, major new functionality)
   - Bug fixes (files with 'fix', 'bug' in commits)
   - Refactoring (modified files with structural changes)
   - Documentation (\*.md, docs/, README changes)
   - Tests (test files, spec files)
   - Configuration (config files, package.json, etc.)

4. **Read key changed files** to understand context:
   - Focus on files with significant changes (>50 lines changed)
   - Read files to understand what actually changed
   - Look for patterns across changes

5. **Generate PR summary with this structure:**

See `./templates/pr-template.md` file for output structure.
See `./templates/pr-template-example.md` file for an example of the output.

## Output Format

- Use markdown formatting
- Be concise but complete
- Focus on WHAT changed and WHY, not just HOW
- Group related changes together
- Highlight important or risky changes
- Skip sections that don't apply (e.g., if no tests changed, omit Tests section)

## Notes

- If no target branch provided, compare against 'main'
- Read actual file contents to understand changes, don't just rely on diffs
- Be honest about scope - don't inflate minor changes
- Flag any potential risks or areas needing review
