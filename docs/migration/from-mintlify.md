---
title: From Mintlify
tag: Migration
readtime: 4 min read
---

# Migrate from Mintlify

DocsLit can automatically convert a Mintlify documentation project. The import command reads your `mint.json`, converts MDX components to DocsLit equivalents, and generates a ready-to-use project.

## Run the migration

<wc-var name="MINTLIFY_DIR" default="my-mintlify-docs"></wc-var>

```bash
npx docslit import {{MINTLIFY_DIR}}
```

This creates a `{{MINTLIFY_DIR}}-docslit/` directory with your converted documentation.

<wc-callout type="tip" title="Preview before committing">
Run `--dry-run` first to see what the import will do without writing any files:

```bash
npx docslit import {{MINTLIFY_DIR}} --dry-run
```

</wc-callout>

## What gets converted

The import command handles these transformations automatically:

### Component mapping

<wc-table>
[
  { "Mintlify": "<Note>", "DocsLit": "<wc-callout type=\"info\">" },
  { "Mintlify": "<Info>", "DocsLit": "<wc-callout type=\"info\">" },
  { "Mintlify": "<Warning>", "DocsLit": "<wc-callout type=\"warning\">" },
  { "Mintlify": "<Tip>", "DocsLit": "<wc-callout type=\"tip\">" },
  { "Mintlify": "<Check>", "DocsLit": "<wc-callout type=\"success\">" },
  { "Mintlify": "<Card>", "DocsLit": "<wc-card>" },
  { "Mintlify": "<CardGroup>", "DocsLit": "<wc-tiles>" },
  { "Mintlify": "<Tabs> / <Tab>", "DocsLit": "<wc-tabs> / <wc-tab>" },
  { "Mintlify": "<Accordion>", "DocsLit": "<wc-accordion>" },
  { "Mintlify": "<Steps> / <Step>", "DocsLit": "<wc-steps> / <wc-step>" },
  { "Mintlify": "<CodeGroup>", "DocsLit": "<wc-code-group>" },
  { "Mintlify": "<Frame>", "DocsLit": "<wc-frame>" },
  { "Mintlify": "<ParamField>", "DocsLit": "<wc-field>" }
]
</wc-table>

### Other transformations

- **MDX imports and exports** — Stripped automatically
- **JSX props** — Converted to HTML attributes
- **Font Awesome icons** — Mapped to built-in Lucide equivalents (50+ mappings)
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
npx docslit dev
```

Preview every page and check that components render correctly.

</wc-step>
<wc-step title="Run validation">

```bash
npx docslit validate
```

This catches broken links, missing pages, and unknown component tags.

</wc-step>
<wc-step title="Fix manual items">

Some components do not have a direct equivalent and need manual attention. The import report flags these as "needs review".

</wc-step>
</wc-steps>

## Custom output directory

```bash
npx docslit import {{MINTLIFY_DIR}} --out my-new-docs
```
