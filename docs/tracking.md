# Google Sheets and CSV tracking

The workflow produces one normalized object per accepted job with these columns:

`dedupe_key`, `date_found`, `company`, `job_title`, `location`, `work_mode`,
`employment_type`, `source`, `match_score`, `uae_national_role`,
`application_url`, `status`, `date_applied`, `interview_date`, and `notes`.

## Google Sheets

1. Create a sheet and copy the header row from `examples/tracker-template.csv`.
2. In n8n, open **Append to Google Sheets (optional)**.
3. Select a Google Sheets credential with access only to the target sheet.
4. Choose the spreadsheet and `Jobs` tab; map columns by name.
5. Enable the node and run **Manual Test**.

The exported node intentionally contains no spreadsheet ID or credential.

## CSV on self-hosted n8n

For local CSV tracking, add these nodes after **Build Tracker Row**:

1. **Convert to File** (CSV), with header fields matching the template.
2. **Read/Write Files from Disk**, writing to a dedicated persistent data path.

Appending safely varies by n8n version and deployment. Confirm whether the file
node overwrites or appends before using production data. Container users must
mount a persistent directory and restrict permissions. Never write under the
workflow/repository directory or commit the resulting file.

For modest personal use, Google Sheets is easier. For privacy-sensitive or
high-volume use, prefer a database with access control and backups.

## Status workflow

The automation writes new rows with `status = New`. Update later fields manually
or in a separate workflow: `Applied`, `Interview`, `Offer`, `Rejected`, or
`Withdrawn`. Keeping application actions separate prevents an email parser from
submitting anything on your behalf.

