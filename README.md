# Foxory UAE Job Radar

Open-source job-alert filtering, scoring, notification, and tracking for job
seekers across the United Arab Emirates.

Foxory UAE Job Radar is an importable **n8n workflow** that processes job-alert
emails you already receive. It extracts useful fields, detects the emirate and
work mode, scores the opportunity against your preferences, suppresses recent
duplicates, sends strong matches to Telegram, and prepares a clean tracking
row for Google Sheets or CSV.

> **No scraping:** this project does not sign in to, crawl, scrape, or automate
> LinkedIn or any other job website. It processes email notifications delivered
> to an inbox you control. You are responsible for following each source's
> terms and applicable law.

[Explore the interactive architecture](docs/architecture.html) ·
[Read setup instructions](docs/setup.md) ·
[Configure matching](docs/customization.md)

## What it supports

- All seven emirates: Abu Dhabi, Dubai, Sharjah, Ajman, Umm Al Quwain,
  Ras Al Khaimah, and Fujairah
- All-UAE or selected-emirate matching
- On-site, hybrid, and remote roles
- Full-time, part-time, contract, and internship keywords
- Optional UAE National / Emiratisation role preference
- Include and exclude role keywords
- Preferred-company and salary-text signals
- Weighted 0–100 match scoring
- Duplicate detection using a stable URL/content fingerprint and retention window
- Telegram alerts above a configurable score
- Tracker-ready rows for Google Sheets or CSV
- LinkedIn, Indeed, Bayt, GulfTalent, Naukrigulf, company alerts, recruiters,
  and generic email alerts (format-dependent)
- No AI API or paid service required by the core workflow

## How it works

```text
Job-alert email
      ↓
Normalize and extract fields
      ↓
Detect UAE location, work mode, employment type, URL, and role signals
      ↓
Score against your editable preferences
      ↓
Suppress recent duplicates
      ↓
High score → Telegram + tracking row
Medium score → tracking row only
Low score → ignored summary
```

The included workflow uses n8n workflow static data for lightweight duplicate
detection. For multi-instance or high-volume deployments, replace it with a
shared datastore; see [limitations](#limitations).

## Quick start

1. Install or open an n8n instance you control.
2. Import [`workflows/foxory-uae-job-radar.json`](workflows/foxory-uae-job-radar.json).
3. Open **Load Configuration** and replace its sample preferences.
4. Create an IMAP credential in n8n and select it on **Job Alert Inbox**.
5. Create a Telegram bot credential, select it on **Send Telegram Alert**, and
   set your chat ID in **Load Configuration**.
6. Run **Manual Test** and confirm the sample item reaches the expected route.
7. Follow [tracking setup](docs/tracking.md) if you want Google Sheets or CSV.
8. Activate the workflow.

Credentials are selected inside n8n after import. The exported workflow has no
email address, password, token, chat ID, OAuth secret, or credential record.

## Match scoring

The default weights add up to 100:

| Signal | Default |
|---|---:|
| Included role keyword | +35 |
| Selected UAE location | +25 |
| Allowed work mode | +10 |
| UAE National signal, when enabled | +15 |
| Preferred company | +10 |
| Salary mentioned | +5 |
| Excluded keyword | −60 |

Scores are clamped between 0 and 100. By default, scores of 70+ notify and
track, scores of 45–69 track only, and lower scores are ignored. Every matched
signal is included in the output so the score is explainable.

## Repository map

```text
config/       Copyable configuration and keyword presets
docs/         Setup, security, tracking, customization, and architecture
examples/     Synthetic email, notification, and CSV tracker examples
scripts/      Dependency-free project validation
workflows/    Sanitized n8n workflow export
```

## Privacy and security

- Keep credentials in n8n's credential manager, never in workflow fields.
- Use a dedicated mailbox or folder and the minimum permissions required.
- Treat job emails, names, URLs, and tracker rows as personal data.
- Do not commit exported credentials, `.env` files, production CSVs, or actual
  job-alert messages.
- Review [`SECURITY.md`](SECURITY.md) before exposing n8n to the internet.

## Limitations

- Email layouts change. The generic parser is intentionally conservative and
  may need source-specific extraction rules for some alerts.
- Salary data is often absent or unstructured; the workflow detects displayed
  text and does not guarantee salary normalization.
- Static-data deduplication is local to one workflow and is best for personal,
  single-instance use. Queue mode, multiple replicas, or high volumes need a
  shared database or n8n Data Table.
- The Google Sheets node is included as an optional, disabled template and needs
  a credential plus sheet selection. CSV tracking needs filesystem access on
  self-hosted n8n or a manual export.
- Automatic inbox archiving is not enabled by default because IMAP move behavior
  varies by provider and can unexpectedly relocate mail. Safe options are in
  [email setup](docs/email-setup.md).
- This project helps prioritize alerts; it does not verify employers, vacancies,
  compensation, eligibility, or application outcomes.

## Project status

Version `0.1.0` is a public template and reference implementation. Test it with
your own alert formats before relying on it. Contributions for Arabic content,
additional email layouts, accessibility, and datastore integrations are welcome.

## License

MIT. See [`LICENSE`](LICENSE). n8n itself is separate software governed by its
own license and terms; this repository does not redistribute n8n.

