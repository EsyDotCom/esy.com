---
title: "Structured Output"
category: "output"
description: "AI-generated content delivered in a predefined, typed format — not free-form text — with consistent schema, metadata, and audit information."
tldr: "Structured output means the AI doesn't just produce text — it produces a typed artifact with a defined schema: sections, metadata, citation chains, QA scores. The format is predictable, parseable, and auditable. This is what makes AI output usable in production systems."
inEsy: "Every Esy artifact is structured output. Templates define the output schema — sections, metadata, citation format, QA requirements — before the workflow runs. The result is a consistent, typed artifact, not a chat response."
relatedTerms: ["agentic-workflow", "pipeline-orchestration", "citation-verification"]
workflowStages:
  - id: "schema"
    label: "Schema"
    sublabel: "Define Structure"
  - id: "generate"
    label: "Generate"
    sublabel: "Agent Output"
  - id: "validate"
    label: "Validate"
    sublabel: "Type Check"
  - id: "enrich"
    label: "Enrich"
    sublabel: "Metadata & QA"
  - id: "artifact"
    label: "Artifact"
    sublabel: "Typed Document"
    isFinal: true
---

## What "structured" means

In the context of AI systems, **structured output** is the opposite of free-form text generation. Instead of producing an arbitrary string, the model (or pipeline) produces output that conforms to a predefined schema.

This means:

- **Typed sections** — the output has named, ordered sections (introduction, analysis, conclusion) rather than a single text blob
- **Metadata** — the output carries data about itself: source count, verification status, generation timestamp, template version
- **Consistent format** — every artifact from the same template has the same structure, making them comparable and processable
- **Machine-readable** — the output can be parsed, stored, indexed, and transformed programmatically

## Why it matters

Free-form AI output is inherently unpredictable. The same prompt can produce wildly different structures, lengths, and formats across runs. This makes it unsuitable for:

- **Batch processing** — you can't process 500 artifacts if each has a different structure
- **Quality assurance** — you can't run consistent QA checks on inconsistent output
- **Downstream systems** — you can't feed unpredictable text into databases, APIs, or publishing pipelines
- **Audit** — you can't verify what you can't parse

Structured output solves all of these by constraining the output space before generation begins.

## Structured output vs. JSON mode

Many LLM providers offer "JSON mode" or "function calling" — these are related but narrower concepts. They constrain the *format* of a single model response.

Structured output in the context of agentic workflows is broader:

| Feature | JSON Mode | Structured Output (Agentic) |
|---------|-----------|---------------------------|
| Scope | Single API call | Entire pipeline output |
| Schema | JSON object | Multi-section artifact |
| Metadata | None | Verification, QA, provenance |
| Consistency | Per-call | Across all artifacts from a template |

## How templates enforce structure

In a template-driven system, the output structure is defined before any agent runs:

1. **Template schema** — defines required sections, metadata fields, and format constraints
2. **Agent instructions** — each agent in the pipeline knows what section it's producing and what schema to follow
3. **Validation** — post-generation validation checks that the output conforms to the schema
4. **Assembly** — sections are assembled into the final artifact with proper ordering and metadata attachment

> The template is the contract. It guarantees that every artifact looks the same, carries the same metadata, and can be processed the same way — regardless of the specific content.

## Audit metadata

Structured output naturally supports audit trails because the structure itself carries provenance information:

- **Source chain** — which sources were used, where they were cited, whether they passed verification
- **Agent log** — which agents ran, what decisions they made, what errors they caught
- **QA scores** — per-section quality scores from the QA agent
- **Version** — which template version and agent versions produced this artifact

This metadata is what makes the difference between "AI-generated content" and "auditable AI-generated content."
