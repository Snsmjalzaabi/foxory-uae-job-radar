# Foxory Repository Instructions

These instructions apply to all Copilot/custom-agent work in this repository.

## Mission
Build and maintain Foxory UAE Job Radar as a safe, free-to-self-host, open-source job-alert filtering and tracking tool for people across the United Arab Emirates.

## Product principles
- Keep the project generic for UAE-wide public use.
- Never hardcode one person's email addresses, Telegram IDs, job preferences, credentials, or application history.
- Prefer configuration over code changes for locations, job categories, keywords, scoring, work mode, UAE National preferences, and notification behavior.
- Preserve a zero-cost core path using self-hosted n8n, IMAP, Telegram, and CSV or free Google Sheets.
- Process job-alert emails users already receive. Do not add scraping, crawling, automated login, or automated interaction with LinkedIn or other job sites unless the provider explicitly supports that method through an official API and the project documents the requirement.
- Never commit secrets. Use n8n credentials, environment variables, or example placeholders.
- Keep workflow exports importable and sanitized.
- Favor deterministic behavior for the core pipeline; optional AI features must never be required for basic operation.

## Agent team
The repository uses five specialized custom agents:

1. **Foxory Builder** — implementation, bug fixes, refactoring, tests.
2. **Foxory n8n** — workflow JSON, nodes, expressions, credential safety, retries, automation architecture.
3. **Foxory Reviewer** — security, privacy, regressions, test coverage, architecture review.
4. **Foxory Docs** — README, setup guides, examples, screenshots/diagrams, troubleshooting.
5. **Foxory Release** — versioning, changelog, release notes, release-readiness checks.

## Standard handoff flow
For normal feature work, use this sequence:

`Builder / n8n -> Reviewer -> Docs -> Release`

- Builder owns application/code changes.
- Foxory n8n owns substantial n8n workflow changes or reviews Builder's workflow edits.
- Reviewer must identify blockers before a change is considered ready.
- Docs updates user-facing material after behavior is stable.
- Release verifies that the repository is coherent and prepares release notes/versioning.

## Definition of done
A change is not complete until:
- required code/workflow changes are present;
- relevant checks or tests have been run;
- no credentials or personal information are committed;
- public configuration remains generic;
- documentation is updated when user behavior changes;
- known limitations are stated clearly;
- the change is ready to merge/release.

## Safety and privacy
- Treat email contents and job-application history as user data.
- Minimize stored data and document where it is stored.
- Do not log credentials or full sensitive message contents unnecessarily.
- Sample files must use fictional names, companies, email addresses, tokens, IDs, and job links.
- Any future cloud/hosted mode must clearly document what data leaves the user's machine.
