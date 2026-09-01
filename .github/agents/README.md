# Foxory Agent Team

Foxory repositories use a small set of specialized GitHub Copilot custom agents.

## Team

| Agent | Owns | Hands off to |
|---|---|---|
| **Foxory Builder** | Features, fixes, refactoring, tests | Reviewer; n8n for workflow-heavy work |
| **Foxory n8n** | n8n workflow architecture, JSON, retries, dedupe, credential safety | Reviewer |
| **Foxory Reviewer** | Correctness, security, privacy, regressions, test quality | Docs when clear |
| **Foxory Docs** | README, setup, examples, architecture, troubleshooting | Release |
| **Foxory Release** | Versioning, changelog, release notes, release readiness | Maintainer / merge |

## Normal workflow

```text
Issue / requirement
       |
       v
Foxory Builder -----------+
       |                   |
       | workflow work     v
       +------------> Foxory n8n
                            |
                            v
                    Foxory Reviewer
                            |
                            v
                       Foxory Docs
                            |
                            v
                     Foxory Release
```

A task may begin directly with Foxory n8n when it is entirely workflow-focused.

## How to use the agents

When assigning a task to a custom agent, state the desired outcome and the relevant issue/PR. Avoid prescribing every implementation detail unless it is a hard requirement.

Examples:

- **Foxory Builder:** `Implement configurable source-specific parsing for Bayt alerts. Preserve generic fallback parsing and add tests.`
- **Foxory n8n:** `Review the workflow's duplicate handling and make it restart-safe without adding paid dependencies.`
- **Foxory Reviewer:** `Audit this PR for secrets, personal data, broken scoring, unsafe IMAP behavior, and regression risks.`
- **Foxory Docs:** `Update setup and troubleshooting to match the merged IMAP changes. Do not document features that are not implemented.`
- **Foxory Release:** `Prepare the next patch release from reviewed changes. Verify sanitized workflow export and document known limitations.`

## Shared rules

All agents follow `.github/copilot-instructions.md`.

Key rules:

- Public Foxory tools stay generic and UAE-wide.
- No credentials, private data, personal email addresses, tokens, chat IDs, or real application history in commits.
- Job sites are not scraped or automated by this project; the core product processes alerts delivered to inboxes users control.
- The core path remains free to self-host and does not require an AI API.
- n8n workflow exports must remain importable, sanitized, deterministic, and documented.

## Handoff standard

Each agent should leave enough context for the next agent to continue without rediscovering the task:

1. What changed or was reviewed.
2. Files/areas affected.
3. Tests or checks performed.
4. Remaining blockers or known limitations.
5. Recommended next agent.

The goal is not to simulate hierarchy. The goal is to create repeatable quality gates around implementation, automation, review, documentation, and releases.
