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

This repo has **two parallel structures** for every skill. They serve different consumers and both must be kept in sync — a skill added to only one of them is incomplete.

1. **Website content** (`content/`) — markdown read by the Next.js site at build time, for browsing/documentation only. Not read by Claude Code itself.
2. **Installable plugin** (root-level `<name>/` dirs + `.claude-plugin/marketplace.json`) — the actual Claude Code plugin format. This is what `claude plugin marketplace add` / `extraKnownMarketplaces` reads. A skill missing from here is invisible to Claude Code even if it's fully documented on the website.

### Content layer (website only)

- `content/skills/<slug>/skill.md` — frontmatter validated against `schemas/skill.schema.json`
- `content/workflows/<slug>/workflow.md` — validated against `schemas/workflow.schema.json`
- `scripts/validate-content.js` — runs `npm run validate`; also runs in CI before build

### Plugin layer (installable)

- `.claude-plugin/marketplace.json` — root registry; every installable plugin must have an entry here with a `source` pointing at its directory
- `<name>/.claude-plugin/plugin.json` — plugin manifest (`name`, `description`, `version`, `author`)
- `<name>/skills/<name>/SKILL.md` — the actual skill definition Claude Code loads. Frontmatter is just `name` + `description` (the `description` doubles as the trigger condition); no `category`/`tags`/`models` fields here — those are website-only concepts

### Web layer (`src/`)

- `src/lib/content.ts` — reads and parses all markdown files under `content/` (called at build time only, uses `fs`)
- `src/lib/types.ts` — shared TypeScript types for `Skill` and `Workflow`
- `src/app/` — Next.js App Router; pages generate static params from content at build time

### Adding a new skill

Do both halves — skipping either leaves the skill either undocumented or uninstallable:

1. **Website entry**: create `content/skills/<name>/skill.md` with full frontmatter (see `schemas/skill.schema.json` for required fields: `name`, `description`, `version`, `author`, `category`, `trigger`, etc.)
2. **Plugin entry**:
   - Create `<name>/.claude-plugin/plugin.json` (`name`, `description`, `version`, `author`)
   - Create `<name>/skills/<name>/SKILL.md` with the real skill instructions (frontmatter: `name` + `description` only)
   - Add an entry for `<name>` to the `plugins` array in `.claude-plugin/marketplace.json`
3. Run `npm run validate` to check the website content
4. Sanity-check `.claude-plugin/marketplace.json` is valid JSON (e.g. `node -e "JSON.parse(require('fs').readFileSync('.claude-plugin/marketplace.json'))"`)
5. Open a pull request — CI validates and builds before merge

### Adding a new workflow

Workflows currently only exist in the website content layer — create `content/workflows/<name>/workflow.md` matching `schemas/workflow.schema.json` and run `npm run validate`.

### Schemas

`schemas/` defines the required frontmatter fields for the website content layer. The `name` field must be kebab-case and match the directory name. The `trigger` field (website layer) / `description` field (plugin layer) is the natural-language description used to decide when to invoke the skill.
