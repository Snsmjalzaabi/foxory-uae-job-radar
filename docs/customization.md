# Customization

## Locations

Every emirate has aliases in **Score Job** (for example, Al Ain maps to Abu Dhabi
and RAK maps to Ras Al Khaimah). Use `all_uae` for UAE-wide matching or `selected`
for the list in `locations.emirates`. `allowUnspecifiedUae` accepts alerts that
say only UAE/United Arab Emirates when no emirate is detected.

Remote roles are scored through `workModes`; location remains a separate signal.

## Role keywords

Use specific phrases where possible. A broad term such as `manager` will match
many unrelated roles. Exclusions are penalties rather than hidden deletion, so
the output remains explainable. Set the penalty to 100 for a hard rejection.

`config/keywords.example.json` contains starter presets for common sectors. Copy
only the terms relevant to you.

## UAE National roles

The workflow detects common English forms: UAE National, Emirati,
Emiratisation, and Emiratization. Add Arabic or employer-specific wording to the
keywords array if needed. Keyword detection is a convenience, not a legal or
eligibility determination.

## Salary

The parser recognizes common `AED`/`د.إ` text patterns. It records the displayed
text and can award a small signal when salary appears. `minimumAed` is intended
for future normalized parsing and is not enforced in version 0.1.0 because job
emails express monthly, annual, ranges, and benefits inconsistently.

## Thresholds

- `notifyAt`: Telegram plus tracking
- `trackAt`: tracking without Telegram
- below `trackAt`: ignored summary

Keep `notifyAt` greater than or equal to `trackAt`. The validator in **Load
Configuration** stops the workflow if these values are inconsistent.

## Add a source-specific parser

For an email layout the generic parser misses:

1. Make a fully synthetic `.eml` fixture.
2. Add a small source detector based on sender domain or stable footer text.
3. Extract only fields present in the email; do not fetch the job page.
4. Fall back to the generic parser when the layout does not match.
5. Preserve `dedupeKey`, `matchedSignals`, and the tracker field names.

