---
name: academic-writing-agents
description: "Multi-agent orchestrator for academic writing — 12 specialist subagents for review, research, drafting, polishing, bibliography auditing, and literature surveys."
version: 2.1.0
author: "Haiwen Huang (original), hardened by CAIR"
category: writing
tags: [academic-writing, thesis, multi-agent, latex, bibliography, literature-survey, research]
trigger: "When the user is editing .tex files, reviewing thesis or paper chapters, drafting academic content, checking writing quality, auditing a bibliography, surveying literature, or analyzing research positioning."
models: [any]
homepage: "https://github.com/andrehuang/academic-writing-agents"
---

## Overview

Brings multi-agent review to academic writing — the "multiple expert reviewers" model that makes peer review work, built into your writing process. Instead of one generic pass over your draft, a team of 12 specialist subagents each focus on a different dimension of writing quality and can be deployed in parallel at any point in the writing process.

## The 12 Agents

**Review** (read-only analysis):
- `consistency-checker` — terminology, cross-references, figure-text-caption alignment, structural coherence
- `logic-reviewer` — argument flow, transitions, narrative arc, logical gaps
- `technical-reviewer` — math notation, methodology, results validity, citations
- `writing-reviewer` — prose clarity, conciseness, grammar, academic tone
- `latex-layout-auditor` — PDF layout audit: float placement, alignment, sizing

**Audit** (read + verify, with web lookups):
- `bibliography-auditor` — bib entry completeness, arXiv-to-published updates, title capitalization, venue consistency

**Research** (read + web):
- `research-analyst` — related work, novelty assessment, positioning, gap analysis
- `brainstormer` — alternative framings, cross-disciplinary connections, research directions

**Survey** (read + web + shell):
- `paper-crawler` — collects papers from DBLP + OpenAlex APIs, deduplicates, classifies

**Action** (read + write — these make edits, not just reports):
- `prose-polisher` — rewrites text for clarity, conciseness, flow
- `section-drafter` — drafts LaTeX sections, paragraphs, transitions, captions, abstracts
- `latex-figure-specialist` — creates/adjusts TikZ/pgfplots figures, manages placement and layout, compiles to verify

An orchestrating skill (`academic-writing-agents`) coordinates the roster: it reads a 30-principle style guide (Structure & Narrative, Prose & Style, Math & Equations, Figures & Tables, Citations & Bibliography, Process & Meta), presents a deployment plan, runs the relevant agents in parallel, and synthesizes their findings into a prioritized Critical/Important/Minor report before handing off to action agents for fixes.

## Usage

Invoke the orchestrating skill directly, or describe what you need and let it auto-trigger on academic-writing context:

```
Review chapter 3 for consistency and technical correctness
Draft a transition paragraph from the method section to experiments
Polish the abstract in parts/abstract.tex
Audit the bibliography for missing fields and arXiv updates
Survey recent work on test-time adaptation from top venues 2023-2025
Prepare this paper for NeurIPS submission — full review pipeline
```

## Installation

```
# From this marketplace
claude plugin install cair/academic-writing-agents
```

Or point Claude Code at the vendored plugin directory directly during development:

```
claude --plugin-dir /path/to/academic-writing-agents
```

## Notes

Works best with Claude Sonnet or Opus. The research, audit, and survey agents require internet access (WebFetch/WebSearch); `paper-crawler` additionally uses shell access to call the DBLP and OpenAlex APIs via `curl`.

## Attribution

Vendored from the original [andrehuang/academic-writing-agents](https://github.com/andrehuang/academic-writing-agents), licensed under MIT. See `LICENSE` in the plugin directory for the full original copyright and permission notice.

This vendored version has security fixes applied following an internal audit:

- **Bash scope reduced** on `section-drafter`, `latex-layout-auditor`, and `bibliography-auditor` — their instructions never actually invoked Bash for anything, so the grant was removed. `bibliography-auditor` keeps WebFetch/WebSearch, which it genuinely uses to check for published versions of arXiv preprints. Bash was kept on `latex-figure-specialist` (runs `latexmk -pdf`) and `paper-crawler` (uses `curl` against the DBLP/OpenAlex APIs), where it is justified.
- **Prompt-injection guardrails added** to the four web-facing agents that previously had none: `bibliography-auditor`, `research-analyst`, `brainstormer`, and `paper-crawler`. Each now explicitly instructs the agent to treat fetched web/API content as untrusted data, never as instructions to follow.
- **Hardcoded macOS-only path fixed.** The upstream agents referenced a literal `/Users/owl/.claude/principles/...` path that only worked on the original author's machine. All references now point to the `principles/academic-writing.md` file vendored inside this plugin, using a path relative to the plugin root.
