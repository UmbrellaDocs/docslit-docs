---
title: Migrate from Mintlify
description: Migrate your Mintlify documentation project to DocsLit with a single command that converts MDX to Markdown.
tag: Migration
readtime: 4 min read
---

# Migrate from Mintlify

DocsLit can automatically convert a Mintlify documentation project. The import command reads your `mint.json`, converts MDX components to DocsLit equivalents, and generates a ready-to-use project.

## Run the migration

<wc-var name="MINTLIFY_DIR" default="my-mintlify-docs"></wc-var>

```bash
docslit import {{MINTLIFY_DIR}}
```

This creates a `{{MINTLIFY_DIR}}-docslit/` directory with your converted documentation.

<wc-callout type="tip" title="Preview before committing">
Run `--dry-run` first to see what the import will do without writing any files:

```bash
docslit import {{MINTLIFY_DIR}} --dry-run
```

</wc-callout>

## What gets converted

The import command handles these transformations automatically:

### Component mapping

| Mintlify | DocsLit |
|---|---|
| `<Note>`, `<Info>` | `<wc-callout type="info">` |
| `<Warning>`, `<Caution>` | `<wc-callout type="warning">` |
| `<Danger>` | `<wc-callout type="error">` |
| `<Tip>` | `<wc-callout type="tip">` |
| `<Check>`, `<Success>` | `<wc-callout type="success">` |
| `<Card>` | `<wc-card>` (`icon` becomes `icon-name`; `color` is dropped) |
| `<CardGroup>` | `<wc-tiles>` |
| `<Tabs>` / `<Tab>` | `<wc-tabs>` / `<wc-tab>` (`title` becomes `label`) |
| `<Accordion>` / `<AccordionGroup>` | `<wc-accordion>` / `<wc-accordion-group>` |
| `<Steps>` / `<Step>` | `<wc-steps>` / `<wc-step>` |
| `<CodeGroup>` | `<wc-code-group>` |
| `<Frame>` | `<wc-frame>` (`type` is dropped) |
| `<Badge>` | `<wc-badge>` (`color` becomes `variant`: green is `success`, red is `danger`, orange and yellow are `warning`, blue is `info`, gray is `neutral`) |
| `<Expandable>` | `<wc-expandable>` (`defaultOpen` becomes `open`) |
| `<Update>` | `<wc-update>` (`label` becomes `version`) |
| `<ParamField>` | `<wc-field>` (`path`, `query`, `body` or `header` becomes `name` plus `in`) |
| `<ResponseField>` | `<wc-field>` |
| `<Tooltip>` | Plain text |
| `<Icon>` | Removed |

### Other transformations

- **MDX imports and exports** — Stripped automatically
- **JSX props** — Converted to HTML attributes
- **Font Awesome icons** — Mapped to built-in icon names where a match exists
- **Sidebar structure** — Generated from `mint.json` navigation
- **Static assets** — Copied to the output directory

## After migration

<wc-steps>
<wc-step title="Review the output">

The import prints a report showing converted pages, items needing manual review, and any errors.

</wc-step>
<wc-step title="Start the dev server">

```bash
cd {{MINTLIFY_DIR}}-docslit
docslit dev
```

Preview every page and check that components render correctly.

</wc-step>
<wc-step title="Run validation">

```bash
docslit validate
```

This catches broken links, missing pages, and unknown component tags.

</wc-step>
<wc-step title="Fix manual items">

Some components do not have a direct equivalent and need manual attention. The import report flags these as "needs review".

</wc-step>
</wc-steps>

## Custom output directory

```bash
docslit import {{MINTLIFY_DIR}} --out my-new-docs
```
