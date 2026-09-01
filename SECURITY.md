# Security policy

## Supported versions

Security fixes are applied to the latest release on the default branch.

## Reporting a vulnerability

Please use GitHub's private vulnerability reporting feature for this repository.
Do not open a public issue containing credentials, personal data, exploitable
deployment details, or copies of real job-alert emails.

Include the affected workflow/node, impact, reproduction steps using synthetic
data, and a suggested mitigation if available.

## Deployment checklist

- Keep n8n current and follow its official hardening guidance.
- Use HTTPS and do not expose the editor publicly without authentication.
- Store IMAP, Telegram, and Google credentials only in n8n's credential manager.
- Use separate, least-privilege accounts where practical.
- Restrict workflow and execution-log access; email bodies may contain personal data.
- Set an execution-data retention policy appropriate to your privacy needs.
- Back up encrypted credentials and the n8n encryption key separately.
- Do not paste secrets into **Load Configuration**, Git history, issues, or logs.
- Verify links before applying; job-alert email is untrusted input.
- Keep automatic link opening, job-site login, scraping, and application submission disabled.

## Threat model notes

Incoming email is untrusted. The workflow treats its contents as text and sends
URLs only as inert notification/tracker fields. It does not fetch those URLs.
Telegram and spreadsheet outputs disclose selected job data to their respective
providers; enable only the destinations you accept.

The lightweight duplicate store may contain hashes and timestamps. Tracker rows
can reveal employment interests and should be handled as personal data.

