---
name: copy-to-clipboard
description: Copy content to the system clipboard. Use when the user asks to copy text, code, or command output to clipboard.
---

# Clipboard Operations

Copy content to the system clipboard using platform-specific commands.

## Platform-Specific Commands

### Windows

Piping from bash to PowerShell mangles Unicode (UTF-8 bytes decoded as Windows-1252). Use a temp file to preserve encoding:

```bash
# Write content to temp file, copy with explicit UTF-8 encoding, clean up
printf '%s' "content" > /tmp/cb_tmp.txt && powershell.exe -Command "Set-Clipboard -Value (Get-Content -Path '$(cygpath -w /tmp/cb_tmp.txt)' -Raw -Encoding UTF8)" && rm /tmp/cb_tmp.txt
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
   # Windows (write heredoc to temp file, then copy)
   cat <<'EOF' > /tmp/cb_tmp.txt
   Line 1
   Line 2
   Line 3
   EOF
   powershell.exe -Command "Set-Clipboard -Value (Get-Content -Path '$(cygpath -w /tmp/cb_tmp.txt)' -Raw -Encoding UTF8)" && rm /tmp/cb_tmp.txt

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
   # Windows (capture to temp file, then copy)
   git status > /tmp/cb_tmp.txt && powershell.exe -Command "Set-Clipboard -Value (Get-Content -Path '$(cygpath -w /tmp/cb_tmp.txt)' -Raw -Encoding UTF8)" && rm /tmp/cb_tmp.txt

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
printf '%s' 'npm install express' > /tmp/cb_tmp.txt && powershell.exe -Command "Set-Clipboard -Value (Get-Content -Path '$(cygpath -w /tmp/cb_tmp.txt)' -Raw -Encoding UTF8)" && rm /tmp/cb_tmp.txt

# macOS
echo 'npm install express' | pbcopy

# Linux
echo 'npm install express' | xclip -selection clipboard
```

### Copy file contents:

```bash
# Windows
cp package.json /tmp/cb_tmp.txt && powershell.exe -Command "Set-Clipboard -Value (Get-Content -Path '$(cygpath -w /tmp/cb_tmp.txt)' -Raw -Encoding UTF8)" && rm /tmp/cb_tmp.txt

# macOS
cat package.json | pbcopy

# Linux
cat package.json | xclip -selection clipboard
```

### Copy multi-line code:

```bash
# Windows
cat <<'EOF' > /tmp/cb_tmp.txt
function hello() {
  console.log("Hello, world!");
}
EOF
powershell.exe -Command "Set-Clipboard -Value (Get-Content -Path '$(cygpath -w /tmp/cb_tmp.txt)' -Raw -Encoding UTF8)" && rm /tmp/cb_tmp.txt

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
git log --oneline -10 > /tmp/cb_tmp.txt && powershell.exe -Command "Set-Clipboard -Value (Get-Content -Path '$(cygpath -w /tmp/cb_tmp.txt)' -Raw -Encoding UTF8)" && rm /tmp/cb_tmp.txt

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

- Windows: Write to temp file, then use `powershell.exe` with `Get-Content -Encoding UTF8` and `Set-Clipboard`. Piping directly from bash to PowerShell mangles non-ASCII characters due to code page mismatch.
- macOS: `pbcopy` is always available
- Linux: May need to install `xclip` or `xsel`

If clipboard command fails, inform the user and suggest installation:

- Linux: `sudo apt-get install xclip` or `sudo yum install xclip`
