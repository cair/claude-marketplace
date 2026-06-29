---
name: literature-review
description: "End-to-end academic literature review: search, collect, summarize, and gap-analyze a research topic."
version: 1.0.0
author: CAIR
category: research
tags: [research, academic, literature, zotero]
skills_used: [deep-research]
requires_mcp: [zotero]
---

## Overview

Orchestrates a full literature review workflow: search for papers on a topic, collect them into Zotero, generate per-paper summaries, identify research gaps, and produce a structured review document.

## Steps

1. Run `deep-research` to identify key papers and search terms
2. Add papers to Zotero via MCP
3. Generate a structured summary for each paper
4. Cross-reference to identify gaps and contradictions
5. Output a review document with citations

## Usage

```
/literature-review <topic>
```

## Requirements

- Zotero MCP server configured
- `deep-research` skill installed
