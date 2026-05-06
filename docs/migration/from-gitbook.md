---
title: From GitBook
tag: Migration
readtime: 3 min read
---

# Migrate from GitBook

DocsLit can import documentation from a GitBook project. The import command reads your `SUMMARY.md` and auto-discovers all Markdown files.

## Run the migration

<wc-var name="GITBOOK_DIR" default="my-gitbook-docs"></wc-var>

```bash
npx docslit import {{GITBOOK_DIR}}
```

DocsLit detects GitBook projects by looking for a `SUMMARY.md` file in the source directory.

<wc-callout type="tip" title="Dry run first">
Preview the migration without writing files:

```bash
npx docslit import {{GITBOOK_DIR}} --dry-run
```

</wc-callout>

## What gets converted

- **SUMMARY.md** — Parsed to generate the sidebar structure in `docslit.json`
- **Markdown files** — Copied with any MDX syntax cleaned up
- **Nested directories** — Flattened into page slugs
- **Static assets** — Images and files copied to the output directory

## After migration

<wc-steps>
<wc-step title="Preview your site">

```bash
cd {{GITBOOK_DIR}}-docslit
npx docslit dev
```

</wc-step>
<wc-step title="Validate">

```bash
npx docslit validate
```

Check for broken internal links — GitBook's linking style may need adjustment.

</wc-step>
<wc-step title="Enhance with components">

GitBook content is plain Markdown. After migration, enhance your pages with DocsLit components:

- Add `<wc-callout>` for important notes
- Use `<wc-tabs>` for platform-specific content
- Add `<wc-steps>` for procedures
- Use `<wc-code-group>` for multi-language code examples

</wc-step>
</wc-steps>

## Generic imports

If your source does not match Mintlify, Fern, or GitBook, DocsLit falls back to a generic import mode. It reads all `.md` and `.mdx` files, infers a sidebar from the folder structure, and converts any recognized MDX components.

```bash
npx docslit import ./any-markdown-folder
```

## Custom output directory

```bash
npx docslit import {{GITBOOK_DIR}} --out my-new-docs
```
