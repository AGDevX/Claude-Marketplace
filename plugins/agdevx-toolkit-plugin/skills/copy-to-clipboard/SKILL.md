---
name: copy-to-clipboard
description: Copy content to the system clipboard. Use when the user asks to copy text, code, or command output to clipboard.
---

# Clipboard Operations

Copy content to the system clipboard using platform-specific commands.

## Platform-Specific Commands

### Windows

```bash
# Pipe content through PowerShell for proper Unicode support (emdashes, etc.)
echo "content" | powershell.exe -Command '$input | Set-Clipboard'
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
   # Windows
   cat <<'EOF' | powershell.exe -Command '$input | Set-Clipboard'
   Line 1
   Line 2
   Line 3
   EOF

   # macOS
   cat <<'EOF' | pbcopy
   Line 1
   Line 2
   Line 3
   EOF

   # Linux
   cat <<'EOF' | xclip -selection clipboard
   Line 1
   Line 2
   Line 3
   EOF
   ```

3. **Piping command output:**

   ```bash
   # Windows
   git status | powershell.exe -Command '$input | Set-Clipboard'

   # macOS
   git status | pbcopy

   # Linux
   git status | xclip -selection clipboard
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
# Windows
echo 'npm install express' | powershell.exe -Command '$input | Set-Clipboard'

# macOS
echo 'npm install express' | pbcopy

# Linux
echo 'npm install express' | xclip -selection clipboard
```

### Copy file contents:

```bash
# Windows
cat package.json | powershell.exe -Command '$input | Set-Clipboard'

# macOS
cat package.json | pbcopy

# Linux
cat package.json | xclip -selection clipboard
```

### Copy multi-line code:

```bash
# Windows
cat <<'EOF' | powershell.exe -Command '$input | Set-Clipboard'
function hello() {
  console.log("Hello, world!");
}
EOF

# macOS
cat <<'EOF' | pbcopy
function hello() {
  console.log("Hello, world!");
}
EOF

# Linux
cat <<'EOF' | xclip -selection clipboard
function hello() {
  console.log("Hello, world!");
}
EOF
```

### Copy command output:

```bash
# Windows
git log --oneline -10 | powershell.exe -Command '$input | Set-Clipboard'

# macOS
git log --oneline -10 | pbcopy

# Linux
git log --oneline -10 | xclip -selection clipboard
```

## Confirmation

After copying to clipboard, confirm with a message like:

- "Copied to clipboard."
- "Copied `<command>` to clipboard."
- "Copied <N> lines to clipboard."

## Platform Detection

To detect the platform, check the current OS:

- Windows: `powershell.exe` with `Set-Clipboard` (handles Unicode correctly; `clip` mangles non-ASCII characters)
- macOS: `pbcopy` is always available
- Linux: May need to install `xclip` or `xsel`

If clipboard command fails, inform the user and suggest installation:

- Linux: `sudo apt-get install xclip` or `sudo yum install xclip`
