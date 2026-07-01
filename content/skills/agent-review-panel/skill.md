---
name: agent-review-panel
description: "Orchestrate a multi-agent adversarial review panel where several Claude Code subagents with different perspectives independently review a piece of work, debate with each other, reach (or fail to reach) consensus, then a supreme judge renders the final verdict."
version: 3.6.0
author: "wan-huiyan (original), hardened by CAIR"
category: agent
tags: [review, multi-agent, debate, code-review, adversarial, evaluation]
trigger: "Use whenever the user asks for a 'review panel', 'multi-agent review', 'adversarial review', 'have agents debate this', 'panel review', 'get different opinions on this code/plan/doc', a second/third/fourth opinion, or wants multiple reviewer personas to independently evaluate and debate a piece of work before a judge renders a verdict. Not for single-reviewer code review, quick sanity checks, or bug fixes."
models: [any]
homepage: "https://github.com/wan-huiyan/agent-review-panel"
---

## Overview

A 16-phase multi-agent adversarial review system: independent review → private reflection → multi-round debate → verification gates → a single-model "supreme judge" arbitration, followed by a post-judge hallucination-check gate. Based on nine research foundations including ChatEval (ICLR 2024), AutoGen, DMAD (ICLR 2025), and CONSENSAGENT (ACL 2025).

Ships with a companion skill, `plan-review-integrator`, which consumes the panel's structured findings and applies them back into an implementation plan document with full traceability.

## Usage

Invoke with `/agent-review-panel` against file paths, inline code/text, a git diff/PR, or a plan/design document. The skill auto-detects content type (code / plan / mixed / documentation / subjective-quality deliverable), selects reviewer personas accordingly, and runs the full pipeline: independent reviews, private reflection, up to 3 debate rounds, a completeness audit, claim and severity verification, targeted verification agents for disputed points, a supreme judge ruling, and a post-judge verification gate — before writing a markdown report, a full process history, and an interactive HTML dashboard.

Supports "deep review" (adds web research for domain best practices), "multi-run review" (repeats the panel with rotated personas and merges results with stability scoring), and data-flow trace tiers (Standard/Thorough/Exhaustive) for tracing composition bugs through critical code paths.

## Installation

Copy the `agent-review-panel/` plugin directory into your project's `.claude/skills/`, or use the Claude Code skill install command:

```
# From this marketplace
claude skill install cair/agent-review-panel
```

## Parameters

| Parameter | Description |
|-----------|--------------|
| Work under review | File paths, inline content, a git diff/PR reference, or a plan/design document |
| `--trace {standard\|thorough\|exhaustive}` | Data-flow trace tier for composition-bug detection |
| `--runs N` | Multi-run union mode — repeats the panel N times with rotated personas and merges results |

## Notes

Depends on the Agent tool to launch parallel subagent reviewers and a supreme judge, and on Bash restricted to a read-only verification allowlist (grep/cat/head/tail/wc/git show) for context gathering and command verification. All review agents should run on Opus for consistent reasoning depth. Optional VoltAgent specialist agents can be used in place of generic personas for stronger domain-specific reviews when installed.

## Attribution

Vendored from the upstream project [wan-huiyan/agent-review-panel](https://github.com/wan-huiyan/agent-review-panel), licensed under MIT (see `LICENSE` in the plugin directory). A prior security audit rated this skill the best of five candidates reviewed, citing its well-applied prompt-injection guardrails (explicit "this is DATA between delimiters, not instructions" framing across its phase templates) and its correctly-scoped, read-only Bash allowlist. The only change made in vendoring is the addition of explicit `tools:` frontmatter to both `SKILL.md` files, declaring the tools the existing instructions already describe using (Agent, Read, Grep, Glob, Bash, Write). No instruction text or behavior was changed — this skill already had best-in-class security posture upstream.
