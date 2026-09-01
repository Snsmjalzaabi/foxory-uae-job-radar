# Setup

## Requirements

- n8n with the Email Trigger (IMAP), Code, Switch, Telegram, and Google Sheets nodes
- An email account that receives job alerts and supports IMAP
- Optional: a Telegram bot and a private chat or group
- Optional: a Google Sheet or writable local path for tracking

The template does not require an AI API.

## 1. Import

Download `workflows/foxory-uae-job-radar.json`, then in n8n choose **Import from
File**. Save the workflow before configuring credentials.

## 2. Configure preferences

Open **Load Configuration**. Edit only the `config` object near the top of the
code. The structure mirrors `config/config.example.json`.

Use `locations.mode: "all_uae"` to accept any detected emirate, or
`"selected"` with a smaller `locations.emirates` list. Set the UAE National
mode to:

- `include`: treat it as a bonus but accept other roles
- `only`: reject jobs without a UAE National keyword
- `exclude`: reject explicitly UAE National-only jobs
- `ignore`: do not use this signal

## 3. Connect email

Open **Job Alert Inbox**, create/select an IMAP credential, and choose the folder
receiving alerts. See [email setup](email-setup.md).

The **Manual Test** branch does not use your mailbox. Run it first to verify the
parser, scoring, routing, and message formatting.

## 4. Connect Telegram

Open **Send Telegram Alert**, select a Telegram API credential, and put the chat
ID in **Load Configuration**. See [Telegram setup](telegram-setup.md).

If you do not want Telegram, disable that node and use only tracker output.

## 5. Choose tracking

The workflow always builds a normalized tracker row. The included Google Sheets
node is disabled until configured. See [tracking](tracking.md) for Sheets and CSV.

## 6. Test safely

1. Run **Manual Test**.
2. Inspect **Score Job** and confirm the extracted fields and reasons.
3. Temporarily change thresholds to test high, medium, and low routes.
4. Send a synthetic email based on `examples/sample-job-alert.eml`.
5. Confirm a repeated alert is suppressed by **Remove Recent Duplicates**.
6. Restore your intended thresholds.

## 7. Activate

Activate only after the tests pass. Start with a dedicated mailbox folder and
leave automatic moving/deleting off. Review executions during the first week.

