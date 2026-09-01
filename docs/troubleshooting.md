# Troubleshooting

## Nothing is triggered

Check the IMAP host, TLS/port, selected folder, app password/OAuth scope, and
whether the message is new after the workflow was activated. Test on a dedicated
folder with one synthetic message.

## Everything scores too low

Inspect `normalizedText`, `matchedSignals`, and `matchedRoleKeywords` in **Score
Job**. Add specific role/location aliases or lower thresholds gradually. Do not
award points merely because the alert footer lists many cities.

## Duplicate test does not persist

n8n may not persist workflow static data during manual/test executions. Activate
the workflow and test with two new synthetic emails. Production persistence also
depends on a successful execution. For multiple n8n workers, use a shared store.

## Telegram fails

Confirm the bot token is stored in an n8n credential, the bot can access the
destination, the chat ID is correct, and the Telegram node has that credential
selected. Do not paste the token into an issue.

## Google Sheets is skipped

The template node ships disabled. Configure its credential, spreadsheet, sheet,
and column mapping, then enable it.

## A job URL looks suspicious

Do not open it from the notification. Check the employer's official career site
independently. The workflow extracts links but does not validate employer identity
or safety.

