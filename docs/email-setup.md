# Email and job-alert setup

## Recommended pattern

Create job alerts at services you already use and route them into a dedicated
mail folder, such as `Job Alerts`. Point the n8n IMAP trigger at that folder.
This limits unrelated email exposure and makes troubleshooting easier.

Common sources include LinkedIn, Indeed, Bayt, GulfTalent, Naukrigulf, employer
career sites, and recruitment agencies. Support depends on the email content,
not the website: the workflow never signs in to or scrapes those services.

## Credential safety

- Prefer provider OAuth when the n8n node supports it.
- Otherwise use an app password, not your primary mailbox password.
- Store it only in n8n's credential manager.
- Use the minimum mailbox scope and a dedicated account/folder where practical.
- Never export or commit n8n credentials.

Exact IMAP host, port, TLS, and app-password requirements are provider-specific;
use your provider's current official documentation.

## Archiving and read state

The public template leaves messages in place. Provider folder semantics differ,
and moving mail automatically can hide or lose alerts if misconfigured.

Safer options:

1. Use a mailbox rule to place alerts in `Job Alerts`, and let n8n read that folder.
2. After a successful test period, set the Email Trigger post-processing action
   to mark messages read if your installed n8n version supports it.
3. For moving to an archive folder, create a provider-specific copy of the
   workflow and verify it on synthetic mail before enabling it.

Never delete source messages during initial setup.

## Parser behavior

The generic parser combines subject, sender, plain text, and HTML-derived text.
It extracts the first plausible job URL and uses keyword/alias detection. When a
source changes layout, add a synthetic fixture and adjust **Score Job** without
including a real message in a public issue.

