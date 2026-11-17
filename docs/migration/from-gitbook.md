---
title: Migrate from GitBook
description: Move a GitBook project to DocsLit with one command that turns SUMMARY.md into a sidebar and GitBook hints, tabs, steppers, embeds and files into DocsLit components.
tag: Migration
readtime: 5 min read
---

# Migrate from GitBook

DocsLit imports a GitBook project that is synced to a Git repository. The importer reads `SUMMARY.md` for the structure, converts GitBook's block tags into `wc-*` components, copies your assets, validates the result and writes a report of everything that needs a human.

## Quick start

<wc-var name="GITBOOK_DIR" default="my-gitbook-docs"></wc-var>

```bash
docslit import {{GITBOOK_DIR}}
```

DocsLit detects GitBook from a `SUMMARY.md` or a `.gitbook.yaml` file, including the `root:` setting in `.gitbook.yaml`, and writes the new project to `{{GITBOOK_DIR}}-docslit/`. Use `--out` to choose another folder, and `--dry-run` to see the report without writing anything:

```bash
docslit import {{GITBOOK_DIR}} --dry-run
```

Then preview and validate:

```bash
cd {{GITBOOK_DIR}}-docslit
docslit dev
docslit validate
```

Work through `MIGRATION.md` in the output. See [the import reference](import-reference#the-migration-report) for its format.

## What is converted

| GitBook | DocsLit |
|---|---|
| `SUMMARY.md` | The `sidebar` in `docslit.json`. Headings become groups, and nested lists become nested groups. A page with children becomes a group whose title links to the page. |
| An external link in `SUMMARY.md` | A link entry in the sidebar |
| `.gitbook.yaml` `root` | The folder the pages are read from |
| `{% hint style="info" %}` (and `warning`, `danger`, `success`) | `wc-callout` with the matching type |
| `{% tabs %}` and `{% tab title="..." %}` | `wc-tabs` and `wc-tab` |
| `{% stepper %}` and `{% step %}` | `wc-steps` and `wc-step`. The first heading in a step becomes its title. |
| `{% code title="..." lineNumbers="true" overflow="wrap" %}` | The fence options `title`, `lines` and `wrap` |
| `{% embed url="..." %}` | A `wc-embed` for YouTube, Vimeo, Loom, Figma, CodePen, Miro, CodeSandbox and Wistia links, and a plain link for any other URL |
| `{% file src="..." %}` | A [download link](../components/file-trees#download-links) |
| `<figure>` with `<figcaption>` | `wc-frame` with a caption |
| `<details>` | Kept as it is. DocsLit styles it. |
| Images and files | Copied to the output, with paths rewritten |

The result uses the `folio` theme, a book-style look with a narrow reading column and serif headings, which suits GitBook content. Change it with `--theme`, or skip it with `--no-theme`. See [Themes](../customization/theming).

## Before and after

A GitBook page:

````markdown
{% tabs %}
{% tab title="macOS" %}
Use Homebrew:

```bash
brew install lantern
```
{% endtab %}
{% endtabs %}

{% hint style="warning" %}
Check your firewall.
{% endhint %}
````

becomes DocsLit Markdown:

````markdown
<wc-tabs>

<wc-tab label="macOS">

Use Homebrew:

```bash
brew install lantern
```

</wc-tab>

</wc-tabs>

<wc-callout type="warning">

Check your firewall.

</wc-callout>
````

## Known limits

- **Blocks with no equivalent are removed, and the content is kept.** An unsupported `{% ... %}` tag is dropped with a warning in the report. `{% content-ref %}` cards are removed too, and a link in the text is a better fit.
- **API blocks.** `{% openapi %}` and `{% swagger %}` blocks become a pointer callout. Add your spec with `docslit openapi scaffold` to generate API pages. See [OpenAPI integration](../integrations/openapi).
- **Site settings are not in the repository.** GitBook keeps the domain, visibility and customization in its app, so the importer cannot read them. Set the name, logo and colors in `docslit.json`. See [Logo](../customization/logo) and [Palettes and brand colors](../customization/palettes-and-brand).

## Enhance the content

GitBook content is plain Markdown plus a few blocks, so a migrated site is a good starting point for DocsLit's richer components:

- Use [`wc-code-group`](../components/code-blocks) for multi-language examples.
- Add [cards and tiles](../components/cards-and-tiles) to landing pages.
- Group related files with a [file tree](../components/file-trees).
- Add [tabs and anchors](../customization/tabs-and-anchors) when the book grows into several sections.

## Other Markdown folders

If the source is not Mintlify, Fern or GitBook, DocsLit reports "Markdown folder" and imports every `.md` and `.mdx` file, converts the MDX components it knows and sets `"sidebar": "auto"`, so the sidebar follows your folders. Use `--from` to name the format yourself when detection guesses wrong:

```bash
docslit import ./any-markdown-folder
docslit import ./site --from gitbook
```

## Next steps

- Learn every importer flag and the report format in [the import reference](import-reference)
- Use an agent for the rest with [Migrate with your AI agent](migrate-with-ai)
- Choose the look in [Themes](../customization/theming)
