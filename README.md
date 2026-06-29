# Claude Marketplace

A community marketplace for [Claude Code](https://claude.ai/code) skills and agentic workflows, curated by [CAIR](https://github.com/cair).

## What's here

| Type | Location | Description |
|------|----------|-------------|
| Skills | `content/skills/` | Reusable Claude Code skill definitions |
| Workflows | `content/workflows/` | Multi-step agentic workflow compositions |

## Contributing

1. Fork this repository
2. Create `content/skills/<your-skill-name>/skill.md` (see [schemas/skill.schema.json](schemas/skill.schema.json) for required fields)
3. Run `npm run validate` locally
4. Open a pull request

### Skill frontmatter example

```yaml
---
name: my-skill
description: "One-line description Claude uses to decide when to invoke this skill."
version: 1.0.0
author: your-name
category: research
tags: [tag1, tag2]
trigger: "When the user wants to ..."
models: [any]
---
```

## Development

```bash
npm install
npm run dev
```

The site is a Next.js static export deployed to GitHub Pages on every push to `main`.
