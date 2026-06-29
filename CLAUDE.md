# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Purpose

A community marketplace for Claude Code skills and agentic workflows, hosted under the [CAIR](https://github.com/cair) GitHub organization and targeting AI researchers.

## Commands

```bash
npm install          # install dependencies
npm run dev          # start dev server (localhost:3000)
npm run build        # static export to out/
npm run validate     # validate all content against schemas
npm run lint         # ESLint
```

## Architecture

**Content-driven static site.** Skills and workflows live as markdown files in `content/`; the Next.js app reads them at build time and exports a static site (`output: "export"`) deployed to GitHub Pages via `.github/workflows/ci.yml`.

### Content layer

- `content/skills/<slug>/skill.md` — each file's YAML frontmatter is validated against `schemas/skill.schema.json`
- `content/workflows/<slug>/workflow.md` — validated against `schemas/workflow.schema.json`
- `scripts/validate-content.js` — runs `npm run validate`; also runs in CI before build

### Web layer (`src/`)

- `src/lib/content.ts` — reads and parses all markdown files (called at build time only, uses `fs`)
- `src/lib/types.ts` — shared TypeScript types for `Skill` and `Workflow`
- `src/app/` — Next.js App Router; pages generate static params from content at build time

### Adding a skill or workflow

1. Create `content/skills/<name>/skill.md` (or `content/workflows/<name>/workflow.md`)
2. Add required YAML frontmatter matching the schema
3. Run `npm run validate` to check
4. Open a pull request — CI validates and builds before merge

### Schemas

`schemas/` defines the required frontmatter fields. The `name` field must be kebab-case and match the directory name. The `trigger` field is the natural-language description shown to Claude Code when deciding whether to invoke the skill.
