# Claude Marketplace

A community marketplace for [Claude Code](https://claude.ai/code) skills and agentic workflows, curated by [CAIR](https://github.com/cair) (Center for Artificial Intelligence Research). The goal is to make reusable agent behaviors discoverable and shareable across research teams.

---

## What's in here

| Type | What it is |
|------|------------|
| **Skills** | Prompt-driven behaviors that Claude Code invokes automatically based on context. Stored in `content/skills/`. |
| **Workflows** | Multi-step agentic scripts that compose skills and MCP tools. Stored in `content/workflows/`. |

---

## Set up in Claude Code

### 1. Register the marketplace

Add this to your `~/.claude/settings.json` under `extraKnownMarketplaces`:

```json
{
  "extraKnownMarketplaces": {
    "cair": {
      "source": {
        "source": "git",
        "url": "https://github.com/cair/claude-marketplace"
      }
    }
  }
}
```

### 2. Enable skills

Still in `settings.json`, add the skills you want under `enabledPlugins`. The format is `skill-name@cair`:

```json
{
  "enabledPlugins": {
    "caveman@cair": true
  }
}
```

### 3. Verify

Restart Claude Code. Type `/` in the prompt — installed skills appear as slash commands. Skills with automatic triggers activate without a slash command when the context matches.

---

## Available skills

| Skill | Description | Trigger |
|-------|-------------|---------|
| `caveman` | Ultra-compressed replies — ~75% fewer tokens, full technical accuracy | `/caveman` or "caveman mode" |

---

## Contributing a skill

1. Fork this repository
2. Create a directory under `content/skills/<your-skill-name>/`
3. Add a `skill.md` file with the required frontmatter (see below)
4. Run `npm run validate` to check against the schema
5. Open a pull request — CI validates and builds before merge

### Skill file format

```markdown
---
name: my-skill              # kebab-case, must match directory name
description: "One sentence Claude reads to decide when to invoke this skill."
version: 1.0.0
author: your-github-handle
category: research          # coding | research | writing | data | devops | agent | other
tags: [tag1, tag2]
trigger: "When the user wants to ..."
models: [any]               # or specific model ids
---

## Overview
What the skill does and why it exists.

## Usage
How to invoke it, any parameters, expected output.

## Installation
How to add it manually if not using the marketplace.
```

The full schema is at [`schemas/skill.schema.json`](schemas/skill.schema.json).

---

## Developing the website

The marketplace website is a Next.js static site deployed to GitHub Pages.

```bash
npm install
npm run dev        # dev server at localhost:3000
npm run validate   # validate all content against schemas
npm run build      # static export to out/
```

Pushes to `main` automatically validate, build, and deploy via GitHub Actions.
