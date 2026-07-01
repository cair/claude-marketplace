---
name: academic-paper-reviewer
description: "Multi-perspective academic paper review with 7 dynamic reviewer agents — EIC + 3 peer reviewers + Devil's Advocate + field analyst + editorial synthesizer — using calibrated 0-100 quality rubrics across 7 review dimensions."
version: 1.10.0
author: "Imbad0202 (original), hardened by CAIR"
category: research
tags: [research, peer-review, academic-writing, multi-agent, editorial]
trigger: "When the user wants a simulated multi-perspective peer review of an academic paper or manuscript: review paper, peer review, manuscript review, referee report, review my paper, critique paper, simulate review, editorial review, calibrate reviewer, reviewer calibration, measure reviewer accuracy."
models: [any]
homepage: "https://github.com/Imbad0202/academic-research-skills"
---

## Overview

Simulates a complete international journal peer review process. A `field_analyst_agent` reads the paper, identifies its discipline and methodology, and dynamically configures 5 reviewer identities. A panel of 5 agents then reviews independently and in parallel — Editor-in-Chief (journal fit, originality), Methodology Reviewer, Domain Reviewer, Perspective Reviewer (cross-disciplinary/practical), and a Devil's Advocate (core-argument stress test) — before an `editorial_synthesizer_agent` consolidates all reports into a structured Editorial Decision Letter and prioritized Revision Roadmap.

Scoring uses calibrated 0-100 rubrics across 7 review dimensions (originality, methodological rigor, evidence sufficiency, argument coherence, and more), mapped to an Accept / Minor Revision / Major Revision / Reject decision matrix.

## Usage

```
Review this paper: [paste paper or provide file]
```

Supports 6 operational modes: `full` (all 7 agents, default), `re-review` (verification of revisions), `quick` (15-minute assessment), `methodology-focus`, `guided` (Socratic walkthrough), and `calibration` (opt-in — measures the reviewer's own FNR/FPR against a user-supplied gold set before you rely on its scores).

## Installation

Install as a Claude Code plugin from this marketplace:

```
claude plugin install academic-paper-reviewer
```

Or copy `academic-paper-reviewer/skills/academic-paper-reviewer/SKILL.md` and `academic-paper-reviewer/agents/*.md` into your project's `.claude/` skill/agent directories.

## Parameters

| Parameter | Description |
|-----------|--------------|
| `paper` | The manuscript text or file to review |
| `mode` | Optional: `full` (default), `re-review`, `quick`, `methodology-focus`, `guided`, `calibration` |

## Security hardening applied in this marketplace version

The upstream skill shipped without any tool restrictions on its agents and without a manuscript-specific prompt-injection guardrail on two of its seven agents. This version applies the following fixes, verified against a prior security audit:

- **Tool scoping.** Every one of the 7 agent files now declares an explicit `tools:` frontmatter field. Six agents (`field_analyst_agent`, `eic_agent`, `methodology_reviewer_agent`, `domain_reviewer_agent`, `perspective_reviewer_agent`, `devils_advocate_reviewer_agent`) are scoped to `Read, Grep, Glob` — pure read/analyze/report roles that hand review text back to the caller. Only `editorial_synthesizer_agent` also carries `Write`, since it alone compiles a final document (the Editorial Decision Package) rather than returning report text. None of the seven need `Bash`, `WebFetch`, or `WebSearch`.
- **Prompt-injection guardrails.** Every agent that reads manuscript text now carries an explicit "Security: Untrusted Manuscript Content" section instructing it to treat all manuscript content as data, never as instructions — including text framed as a note to the AI, a fake system message, hidden/white text, or metadata. This was already present in narrower form (scoped only to the agent's own `<phase1_output>`) on 5 of the 7 upstream agents; it was entirely missing from `field_analyst_agent` and `editorial_synthesizer_agent`. All 7 now have the full manuscript-scoped guardrail, and the narrower pre-existing protections were preserved rather than removed.
- **Excluded `commands/`.** The upstream monorepo's `commands/` directory (not part of this skill) was not vendored at all — it contains an unguarded destructive `rm ~/.cache/ars/verification.db` command flagged by a prior audit. Excluding the directory entirely sidesteps the issue rather than attempting an in-place fix.

No review logic, rubric, mode, or workflow behavior was otherwise changed from upstream v1.10.0.

## Attribution

Vendored from [Imbad0202/academic-research-skills](https://github.com/Imbad0202/academic-research-skills) (the `academic-paper-reviewer` skill, upstream v1.10.0). Original author: **Cheng-I Wu**. Original license: **CC BY-NC 4.0** (Creative Commons Attribution-NonCommercial 4.0 International) — see `https://creativecommons.org/licenses/by-nc/4.0/`. This is non-commercial, attribution-required material: redistribute or adapt it only under the same non-commercial terms, and retain attribution to the original author and repository. This marketplace's version is additionally security-hardened as described above.

## Notes

Works best with Claude Sonnet or Opus. No MCP or internet access required — the review is a closed-book exercise over the manuscript and this skill's bundled reference material (rubrics, journal lists, decision standards).
