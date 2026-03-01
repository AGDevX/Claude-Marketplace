---
name: copy-to-clipboard
description: Copy content to the system clipboard. Use when the user asks to copy text, code, or command output to clipboard.
---

# Clipboard Operations

Copy content to the system clipboard using platform-specific commands.

## Platform-Specific Commands

### Windows

```bash
echo "content" | clip
```

### macOS

```bash
echo "content" | pbcopy
```

### Linux

```bash
# Using xclip (most common)
echo "content" | xclip -selection clipboard

# Or using xsel (alternative)
echo "content" | xsel --clipboard
```

## Important Guidelines

1. **Always use proper quoting:**
   - Use single quotes for literal strings
   - Use double quotes when variables need expansion
   - For multi-line content, use heredoc syntax

2. **Heredoc for multi-line content:**

   ```bash
   cat <<'EOF' | clip
   Line 1
   Line 2
   Line 3
   EOF
   ```

3. **Piping command output:**

   ```bash
   # Copy command output directly
   git status | clip
   cat file.txt | clip
   ```

4. **When to use clipboard:**
   - User explicitly asks to "copy to clipboard"
   - User says "copy this", "clipboard", "ctrl+c this"
   - User wants to paste content elsewhere

5. **What NOT to copy:**
   - Don't automatically copy without being asked
   - Don't copy sensitive data (passwords, keys, tokens) unless explicitly requested
   - Don't copy if the user just wants to see the content

## Examples

### Copy a single line:

```bash
echo 'npm install express' | clip
```

### Copy file contents:

```bash
cat package.json | clip
```

### Copy multi-line code:

```bash
cat <<'EOF' | clip
function hello() {
  console.log("Hello, world!");
}
EOF
```

### Copy command output:

```bash
git log --oneline -10 | clip
```

## Confirmation

After copying to clipboard, confirm with a message like:

- "Copied to clipboard."
- "Copied `<command>` to clipboard."
- "Copied <N> lines to clipboard."

## Platform Detection

To detect the platform, check the current OS:

- Windows: `clip` is always available
- macOS: `pbcopy` is always available
- Linux: May need to install `xclip` or `xsel`

If clipboard command fails, inform the user and suggest installation:

- Linux: `sudo apt-get install xclip` or `sudo yum install xclip`
