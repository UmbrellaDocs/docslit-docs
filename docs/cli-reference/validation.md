---
title: Validation
description: Run docslit validate to check for broken links, missing assets, invalid components, and other project issues.
tag: CLI reference
readtime: 3 min read
---

# Validation

The `docslit validate` command checks your project for common errors — broken links, missing pages, unknown components, and incomplete frontmatter.

## Run validation

```bash
docslit validate
```

The output shows errors, warnings, and informational messages with colored indicators.

## What gets checked

<wc-table>
[
  { "Check": "Config file exists", "Level": "Error", "Description": "docslit.json must exist and parse as valid JSON" },
  { "Check": "Sidebar structure", "Level": "Error", "Description": "The sidebar array must exist in the config" },
  { "Check": "Page files exist", "Level": "Error", "Description": "Every slug in the sidebar must have a matching .md file in docs/" },
  { "Check": "Internal links", "Level": "Error", "Description": "Links to other pages must point to valid page slugs" },
  { "Check": "Asset references", "Level": "Error", "Description": "Image and file references must resolve to existing files" },
  { "Check": "Page titles", "Level": "Warning", "Description": "Every page should have a title in its frontmatter" },
  { "Check": "Component tags", "Level": "Warning", "Description": "All wc-* tags must be built-in or defined in components/" },
  { "Check": "Duplicate slugs", "Level": "Warning", "Description": "Each page slug should appear only once in the sidebar" },
  { "Check": "Orphaned pages", "Level": "Info", "Description": "Markdown files in docs/ that are not listed in the sidebar" }
]
</wc-table>

## Strict mode

By default, `validate` exits with code 0 if there are only warnings. Use `--strict` to treat warnings as errors:

```bash
docslit validate --strict
```

This is useful in CI pipelines where you want to enforce documentation quality:

```yaml filename=".github/workflows/validate.yml"
- run: npm install -g docslit
- name: Validate docs
  run: docslit validate --strict
```

## Exit codes

<wc-fields header="Exit codes">
<wc-field name="0" type="number">
No errors found. Warnings may be present in non-strict mode.
</wc-field>
<wc-field name="1" type="number">
Errors found, or warnings found in strict mode.
</wc-field>
</wc-fields>

## Custom components and validation

The validator scans your `components/` directory for `customElements.define` calls. Any `<wc-*>` tag that matches a custom component definition is treated as valid. Tags that are neither built-in nor custom trigger a warning.

<wc-callout type="tip" title="Run validation before deploying">
Add `docslit validate --strict` to your CI pipeline to catch broken links and missing pages before they reach production.
</wc-callout>
