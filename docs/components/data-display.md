---
title: Data display
description: Render sortable-style tables with sticky headers and search, color palettes, Mermaid diagrams and version-specific content from structured data.
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

### Sticky header and search

Wrap an ordinary Markdown table in `wc-table` to add a sticky header, a live search box, or both. Leave a blank line between the tags and the table. Type in the box to filter rows:

```markdown
<wc-table sticky searchable placeholder="Filter plants" max-height="14rem">

| Plant | Light | Water |
| --- | --- | --- |
| Fern | Partial shade | Weekly |
| Monstera | Bright indirect | Weekly |
| Snake plant | Low to bright | Every 2 weeks |
| Pothos | Low to bright | Weekly |
| Peace lily | Partial shade | Weekly |
| Aloe | Bright direct | Every 3 weeks |
| Rubber plant | Bright indirect | Every 2 weeks |

</wc-table>
```

<wc-table sticky searchable placeholder="Filter plants" max-height="14rem">

| Plant | Light | Water |
| --- | --- | --- |
| Fern | Partial shade | Weekly |
| Monstera | Bright indirect | Weekly |
| Snake plant | Low to bright | Every 2 weeks |
| Pothos | Low to bright | Weekly |
| Peace lily | Partial shade | Weekly |
| Aloe | Bright direct | Every 3 weeks |
| Rubber plant | Bright indirect | Every 2 weeks |

</wc-table>

<wc-fields header="More wc-table attributes">
<wc-field name="sticky" type="boolean">
Keep the header row visible while the table body scrolls. The scroll area height is `max-height`.
</wc-field>
<wc-field name="searchable" type="boolean">
Show a search box that filters rows as you type, as a case-insensitive substring match.
</wc-field>
<wc-field name="placeholder" type="string" default="Filter rows…">
The placeholder and accessible label of the search box.
</wc-field>
<wc-field name="max-height" type="string">
The maximum height of the scroll area, as any CSS length. With `sticky` the default is `70vh`.
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

Show swatches with `wc-color`, grouped in a `wc-colors` container. Click a swatch, or focus it and press Enter, to copy its value.

```markdown
<wc-colors>
<wc-color value="#3b82f6" name="Primary" variable="--color-primary"></wc-color>
<wc-color value="#10b981" name="Success" variable="--color-success"></wc-color>
<wc-color light="#ffffff" dark="#0b0b0b" name="Surface"></wc-color>
</wc-colors>
```

<wc-colors>
<wc-color value="#3b82f6" name="Primary" variable="--color-primary"></wc-color>
<wc-color value="#10b981" name="Success" variable="--color-success"></wc-color>
<wc-color light="#ffffff" dark="#0b0b0b" name="Surface"></wc-color>
</wc-colors>

<wc-fields header="wc-color">
<wc-field name="value" type="string">
The color in any CSS format: hex, `rgb()`, `hsl()`, `oklch()` and so on. `hex` is an older alias.
</wc-field>
<wc-field name="light" type="string">
The color shown, and copied, in light mode.
</wc-field>
<wc-field name="dark" type="string">
The color shown, and copied, in dark mode.
</wc-field>
<wc-field name="name" type="string">
The display name shown next to the swatch.
</wc-field>
<wc-field name="variable" type="string">
A CSS custom property name for the color. It is copied instead of the value.
</wc-field>
</wc-fields>

### Layouts

`wc-colors` has two layouts. The default `compact` variant is a grid:

```markdown
<wc-colors>
<wc-color name="primary" value="#16a34a"></wc-color>
<wc-color name="surface" light="#ffffff" dark="#0b0b0b"></wc-color>
<wc-color name="accent" value="oklch(0.7 0.15 250)"></wc-color>
</wc-colors>
```

<wc-colors>
<wc-color name="primary" value="#16a34a"></wc-color>
<wc-color name="surface" light="#ffffff" dark="#0b0b0b"></wc-color>
<wc-color name="accent" value="oklch(0.7 0.15 250)"></wc-color>
</wc-colors>

The `table` variant adds a titled row per group, which suits design-system pages with scales:

```markdown
<wc-colors variant="table">
<wc-color-row title="Brand">
<wc-color name="brand-500" value="#0ea5e9"></wc-color>
<wc-color name="brand-700" value="#0369a1"></wc-color>
</wc-color-row>
<wc-color-row title="Neutral">
<wc-color name="gray-100" value="#f3f4f6"></wc-color>
<wc-color name="gray-900" value="#111827"></wc-color>
</wc-color-row>
</wc-colors>
```

<wc-colors variant="table">
<wc-color-row title="Brand">
<wc-color name="brand-500" value="#0ea5e9"></wc-color>
<wc-color name="brand-700" value="#0369a1"></wc-color>
</wc-color-row>
<wc-color-row title="Neutral">
<wc-color name="gray-100" value="#f3f4f6"></wc-color>
<wc-color name="gray-900" value="#111827"></wc-color>
</wc-color-row>
</wc-colors>

<wc-fields header="wc-colors">
<wc-field name="variant" type="string" default="compact">
The layout: `compact` for a swatch grid, or `table` for titled rows made of `wc-color-row`.
</wc-field>
</wc-fields>

<wc-fields header="wc-color-row">
<wc-field name="title" type="string">
The label of the row. Inline Markdown works.
</wc-field>
</wc-fields>

The [palette reference](../customization/palettes-and-brand#palettes) is built with these components.

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
