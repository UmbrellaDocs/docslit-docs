---
title: Data display
description: Render tables, key-value lists, color swatches, and Mermaid diagrams from structured data in your docs.
tag: Components
readtime: 5 min read
---

# Data display

Components for displaying structured data — tables, diagrams, colors, and version-specific content.

## Tables

DocsLit supports three table styles:

- **Markdown (GFM)** — small, simple tables in plain Markdown
- **`wc-table`** — a table from JSON in two attributes, with sticky headers
- **`wc-asciidoc-table`** — AsciiDoc syntax for spans, column specs, multi-line cells, and CSV/DSV — see [AsciiDoc tables](asciidoc-tables)

`wc-table` reads its data from two attributes, `headers` and `rows`. Both are JSON. Wrap the attribute values in single quotes so the double quotes inside the JSON stay intact. The element has no body.

```markdown
<wc-table headers='["Command","Description","Default"]' rows='[["init","Scaffold a new project","my-docs"],["dev","Start dev server","port 3000"],["build","Generate static site","dist/"],["validate","Check project health","-"]]'></wc-table>
```

<wc-table headers='["Command","Description","Default"]' rows='[["init","Scaffold a new project","my-docs"],["dev","Start dev server","port 3000"],["build","Generate static site","dist/"],["validate","Check project health","-"]]'></wc-table>

<wc-fields header="wc-table">
<wc-field name="headers" type="string">
A JSON array of header strings, such as `["Name","Type"]`.
</wc-field>
<wc-field name="rows" type="string">
A JSON array of rows, each an array of cell values, such as `[["a","b"]]`.
</wc-field>
</wc-fields>

<wc-callout type="tip" title="When to use which table">
Use Markdown tables for most tables, because they are easier to write and to read in source. Use `wc-table` when the data is already JSON. Use [`wc-asciidoc-table`](asciidoc-tables) when you need AsciiDoc features such as cell spans, column widths, or CSV input.
</wc-callout>

## Mermaid diagrams

Render diagrams with `wc-mermaid`:

```markdown
<wc-mermaid>
graph LR
    A[Write Markdown] --> B[docslit build]
    B --> C[Static HTML]
    B --> D[Search Index]
    B --> E[llms.txt]
</wc-mermaid>
```

<wc-mermaid>
graph LR
    A[Write Markdown] --> B[docslit build]
    B --> C[Static HTML]
    B --> D[Search Index]
    B --> E[llms.txt]
</wc-mermaid>

Mermaid diagrams support flowcharts, sequence diagrams, class diagrams, and more. Click the expand icon to view diagrams in a larger modal.

## Colors

Display color swatches with `wc-color`:

```markdown
<wc-color hex="#3b82f6" variable="--color-primary"></wc-color>
<wc-color hex="#10b981" variable="--color-success"></wc-color>
<wc-color hex="#f59e0b" variable="--color-warning"></wc-color>
<wc-color hex="#ef4444" variable="--color-danger"></wc-color>
```

<wc-color hex="#3b82f6" variable="--color-primary"></wc-color>
<wc-color hex="#10b981" variable="--color-success"></wc-color>
<wc-color hex="#f59e0b" variable="--color-warning"></wc-color>
<wc-color hex="#ef4444" variable="--color-danger"></wc-color>

Click a swatch to copy the hex value. Use this component for design system documentation and style guides.

<wc-fields header="wc-color">
<wc-field name="hex" type="string" required>
The color in hex format (e.g., `#3b82f6`).
</wc-field>
<wc-field name="name" type="string">
The display name shown next to the swatch.
</wc-field>
<wc-field name="variable" type="string">
The CSS custom property name for this color.
</wc-field>
</wc-fields>

## Version-specific content

Show different content based on the selected version with `wc-versions` and `wc-version`:

```markdown
<wc-versions>
<wc-version name="0.2">

The `build` command now generates `llms.txt` and `llms-full.txt` automatically.

</wc-version>
<wc-version name="0.1">

Run `docslit build` to generate your static site.

</wc-version>
</wc-versions>
```

<wc-versions>
<wc-version name="0.2">

The `build` command now generates `llms.txt` and `llms-full.txt` automatically.

</wc-version>
<wc-version name="0.1">

Run `docslit build` to generate your static site.

</wc-version>
</wc-versions>

<wc-fields header="wc-version">
<wc-field name="name" type="string" required>
The label on the switcher button, such as `0.2`. The attribute is `name`, not `version`.
</wc-field>
</wc-fields>

<wc-fields header="wc-versions">
<wc-field name="default" type="string">
The `name` of the version shown first. Defaults to the first child.
</wc-field>
</wc-fields>

## Visibility badges

Show feature availability with `wc-visibility`:

```markdown
<wc-visibility version="0.2"></wc-visibility>
<wc-visibility role="admin"></wc-visibility>
```

<wc-visibility version="0.2"></wc-visibility>
<wc-visibility role="admin"></wc-visibility>

## Page metadata

Display structured metadata at the top of a page:

```markdown
<wc-page-meta tag="Component" component="Lit" readtime="3 min" updated="May 2025"></wc-page-meta>
```

<wc-page-meta tag="Component" component="Lit" readtime="3 min" updated="May 2025"></wc-page-meta>
