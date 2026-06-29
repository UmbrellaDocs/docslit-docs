---
title: From Fern
description: Migrate your Fern documentation project to DocsLit with automatic component and configuration conversion.
tag: Migration
readtime: 3 min read
---

# Migrate from Fern

DocsLit can import documentation from a Fern project. The import command reads your Fern configuration, converts the content, and generates a DocsLit project.

## Run the migration

<wc-var name="FERN_DIR" default="my-fern-docs"></wc-var>

```bash
docslit import {{FERN_DIR}}
```

DocsLit detects Fern projects by looking for `fern/fern.config.json` in the source directory.

<wc-callout type="tip" title="Dry run first">
Use `--dry-run` to preview the migration without writing files:

```bash
docslit import {{FERN_DIR}} --dry-run
```

</wc-callout>

## What gets converted

- **Markdown content** — Copied and cleaned up
- **MDX components** — Converted to `<wc-*>` equivalents
- **Import/export statements** — Stripped
- **Sidebar structure** — Generated from the Fern navigation config
- **Static assets** — Copied to the output directory

## After migration

<wc-steps>
<wc-step title="Preview your site">

```bash
cd {{FERN_DIR}}-docslit
docslit dev
```

</wc-step>
<wc-step title="Validate">

```bash
docslit validate
```

Fix any broken links or unknown component tags.

</wc-step>
<wc-step title="Review flagged items">

Check the migration report for any pages marked as "needs review". These contain components or syntax that require manual conversion.

</wc-step>
</wc-steps>

## Custom output directory

```bash
docslit import {{FERN_DIR}} --out my-new-docs
```
