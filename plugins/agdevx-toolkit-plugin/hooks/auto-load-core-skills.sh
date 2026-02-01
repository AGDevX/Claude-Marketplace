#!/bin/bash
#
# Auto-Load Core Skills Hook
# Loads a predefined set of core skills every session
#

input=$(cat)
cwd=$(echo "$input" | jq -r '.cwd')

#-- Skills that should ALWAYS be loaded when Claude starts
CORE_SKILLS=(
  "read-claude-md"
)

# Build the context message
context="🎯 Core Skills Activated

Your essential skills are now active:

"

skills_loaded=0

for skill in "${CORE_SKILLS[@]}"; do
  # Try multiple locations
  SKILL_FILE=""

  if [[ -f "$HOME/.claude/skills/$skill/SKILL.md" ]]; then
    SKILL_FILE="$HOME/.claude/skills/$skill/SKILL.md"
  elif [[ -f "$cwd/.claude/skills/$skill/SKILL.md" ]]; then
    SKILL_FILE="$cwd/.claude/skills/$skill/SKILL.md"
  fi

  if [[ -z "$SKILL_FILE" ]]; then
    continue
  fi

  # Extract basic info from frontmatter
  skill_name=$(awk '/^name:/ {print $2; exit}' "$SKILL_FILE")
  skill_desc=$(awk '/^description:/ {$1=""; print substr($0,2); exit}' "$SKILL_FILE")

  context+="
**/$skill_name** - $skill_desc
"

  skills_loaded=$((skills_loaded + 1))
done

if [[ $skills_loaded -eq 0 ]]; then
  # No skills found, exit silently
  exit 0
fi

context+="

---

💡 **Quick Tip**: These skills are proactively available. I'll use them automatically when appropriate, or you can invoke them directly with /$skill_name.
"

# Output JSON
cat << EOF
{
  "hookSpecificOutput": {
    "hookEventName": "SessionStart",
    "additionalContext": $(echo "$context" | jq -Rs .)
  }
}
EOF

exit 0