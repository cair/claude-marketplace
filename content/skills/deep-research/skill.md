---
name: deep-research
description: "Deep research harness — fan-out web searches, fetch sources, adversarially verify claims, synthesize a cited report."
version: 1.0.0
author: CAIR
category: research
tags: [research, web-search, synthesis, citations]
trigger: "When the user wants a deep, multi-source, fact-checked research report on any topic."
models: [any]
---

## Overview

Fans out parallel web searches across multiple query angles, fetches and reads primary sources, adversarially verifies key claims, then synthesizes a cited report.

## Usage

Invoke with `/deep-research <question>`. The skill will ask 2–3 clarifying questions if the topic is underspecified before launching the search.

## Installation

Copy `skill.md` into your project's `.claude/skills/deep-research/` directory, or use the Claude Code skill install command:

```
# From this marketplace
claude skill install cair/deep-research
```

## Parameters

| Parameter | Description |
|-----------|-------------|
| `question` | The research question or topic |

## Notes

Works best with Claude Sonnet or Opus. Requires internet access via a search MCP.
