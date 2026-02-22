#!/usr/bin/env node

//-- AG (2026-02-01): This hook will not work yet: https://github.com/anthropics/claude-code/issues/10373

const fs = require('fs');
const path = require('path');
const os = require('os');

//-- Read input from stdin
let inputData = '';
process.stdin.setEncoding('utf8');

process.stdin.on('data', (chunk) => {
	inputData += chunk;
});

process.stdin.on('end', () => {
	try {
		main(inputData);
	} catch (error) {
		console.error('Hook error:', error);
		process.exit(1);
	}
});

function main(inputData) {
	const input = JSON.parse(inputData);
	const cwd = input.cwd || process.cwd();

	//-- Skills that should ALWAYS be loaded when Claude starts
	//-- These should match the skill directory names in your plugin
	const CORE_SKILLS = ['read-claude-md'];

	//-- Build the context message
	let context = `⚠️ **IMPORTANT**: Immediately invoke the following skills using the Skill tool:

	`;

	let skillsLoaded = 0;

	for (const skill of CORE_SKILLS) {
		const skillFile = findSkillFile(skill, cwd);
		if (!skillFile) {
			continue;
		}

		//-- Extract basic info from frontmatter
		const skillInfo = extractSkillInfo(skillFile, skill);

		context += `

**/${skillInfo.name}** - ${skillInfo.description}
`;
		skillsLoaded++;
	}

	if (skillsLoaded === 0) {
		//-- No skills found, exit silently
		process.exit(0);
	}

	context += `
---
This is a required action - invoke these skills now.
`;

	//-- Output JSON
	const output = {
		hookSpecificOutput: {
			hookEventName: 'SessionStart',
			additionalContext: context
		}
	};

	console.log(JSON.stringify(output, null, 2));
	process.exit(0);
}

/**
 * Find the skill file in priority order:
 * 1. Plugin skills directory
 * 2. User skills directory
 * 3. Project skills directory
 */
function findSkillFile(skill, cwd) {
	const pluginDir = process.env.CLAUDE_PLUGIN_ROOT;
	const homeDir = os.homedir();

	const searchPaths = [
		pluginDir && path.join(pluginDir, 'skills', skill, 'SKILL.md'),
		path.join(homeDir, '.claude', 'skills', skill, 'SKILL.md'),
		path.join(cwd, '.claude', 'skills', skill, 'SKILL.md')
	].filter(Boolean);

	for (const filePath of searchPaths) {
		if (fs.existsSync(filePath)) {
			return filePath;
		}
	}
	return null;
}

//-- Extract skill name and description from frontmatter
function extractSkillInfo(skillFile, defaultName) {
	try {
		const content = fs.readFileSync(skillFile, 'utf8');
		const lines = content.split('\n');

		let name = defaultName;
		let description = 'No description';
		let inFrontmatter = false;

		for (const line of lines) {
			const trimmed = line.trim();

			if (trimmed === '---' && !inFrontmatter) {
				//-- Opening delimiter
				inFrontmatter = true;
				continue;
			}

			if (trimmed === '---' && inFrontmatter) {
				//-- Closing delimiter
				break;
			}

			if (!inFrontmatter) {
				continue;
			}

			const nameLine = trimmed.match(/^name:\s*(.+)$/);
			if (nameLine) {
				name = nameLine[1].trim();
			}

			const descLine = trimmed.match(/^description:\s*(.+)$/);
			if (descLine) {
				description = descLine[1].trim();
			}
		}

		return { name, description };
	} catch (error) {
		return {
			name: defaultName,
			description: 'No description'
		};
	}
}
