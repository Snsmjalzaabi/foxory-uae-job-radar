# Contributing

Thanks for helping make UAE job alerts less noisy.

## Good first contributions

- Add a synthetic fixture for a new email-alert layout.
- Improve location aliases for UAE cities and districts.
- Add Arabic documentation or accessible interface improvements.
- Add an optional shared-datastore deduplication example.
- Clarify setup instructions for an email provider without adding credentials.

## Ground rules

1. Never commit real job-alert emails, applicant information, tokens, passwords,
   chat IDs, OAuth exports, session cookies, or live tracking data.
2. Use `example.invalid` for synthetic email addresses and links.
3. Do not add web scraping, browser automation, credential sharing, application
   submission, or other automation against job websites.
4. Keep the core workflow useful without a paid AI API.
5. Explain new scoring signals and keep scores bounded and interpretable.

## Development

No dependencies are required for validation beyond Node.js 18 or newer.

```bash
npm run validate
```

Before opening a pull request:

- Import the workflow into a non-production n8n instance.
- Run **Manual Test** and confirm all three routing paths.
- Check that your export contains no credential object.
- Run the project validator.
- Update documentation for any visible behavior change.

## Pull requests

Keep changes focused. Describe the alert format or scenario tested, expected
routing, privacy impact, and any n8n version assumptions. Synthetic fixtures are
preferred over screenshots containing real names or job-search history.

