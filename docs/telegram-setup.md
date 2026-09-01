# Telegram setup

## Create a bot

Use Telegram's official BotFather account to create a bot and obtain its token.
Create a Telegram API credential in n8n and paste the token there. Do not put the
token in the workflow configuration or repository.

## Find the destination chat ID

1. Start a private conversation with the bot, or add it to a private group.
2. Send a test message.
3. Use a trusted method documented by Telegram/n8n to obtain the numeric chat ID.
4. Replace `REPLACE_WITH_YOUR_CHAT_ID` in **Load Configuration**.

Chat IDs are identifiers and should not be committed to a public repository.

## Test

Select the credential on **Send Telegram Alert**, run **Manual Test**, and check
the destination. The workflow uses plain text and disables rich link previews by
default to reduce accidental requests to untrusted job URLs.

If Telegram is not desired, disable **Send Telegram Alert**. The tracker path can
still be used independently.

