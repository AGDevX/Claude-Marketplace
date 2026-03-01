---
name: pr-summary
description: Analyze git branch changes and generate a comprehensive PR summary. Use when creating pull requests or summarizing branch work.
---

# PR Summary Generator

Generate a pull request summary that reviewers will actually read.

## Guiding Principle

Brevity is respect for the reviewer's time. Every sentence must earn its place. Do not repeat information GitHub and Azure DevOps already shows (file lists, commit lists, raw diffs).

## Instructions

1. **Get branch information:**
   - Current branch: `git branch --show-current`
   - Target branch: Use $ARGUMENTS if provided, otherwise use 'main'
   - Commits: `git log <target-branch>..HEAD --oneline`

2. **Analyze changes:**
   - Changed files: `git diff --name-status <target-branch>..HEAD`
   - Statistics: `git diff --stat <target-branch>..HEAD`
   - Detailed diff for context: `git diff <target-branch>..HEAD`

3. **Read key changed files** to understand context:
   - Focus on files with significant changes (>50 lines changed)
   - Read files to understand what actually changed
   - Look for patterns across changes

4. **Generate PR summary using the template:**

See `./templates/pr-template.md` for output structure.
See `./templates/pr-template-example.md` for an example.

5. **Use the copy-to-clipboard tool to copy the PR summary to the clipboard**

## Output Rules

- The entire summary should fit on one screen (~30 lines max)
- Use markdown formatting
- Focus on WHAT changed and WHY — the diff already shows HOW
- Skip sections that don't apply
- Bullet points over paragraphs
- One-liner sections are fine and encouraged
- Do NOT list files changed or commits — GitHub and Azure DevOps show these better than you can

## Notes

- If no target branch provided, compare against 'main'
- Read actual file contents to understand changes, don't just rely on diffs
- Be honest about scope — don't inflate minor changes
- Flag potential risks or areas needing review
