---
title: Data display
description: Render tables, key-value lists, color swatches, and Mermaid diagrams from structured data in your docs.
tag: Components
readtime: 4 min read
---

# Data display

Components for displaying structured data — tables, diagrams, colors, and version-specific content.

## Tables

Create tables from JSON data with `wc-table`:

```markdown
<wc-table>
[
  { "Command": "init", "Description": "Scaffold a new project", "Default": "my-docs" },
  { "Command": "dev", "Description": "Start dev server", "Default": "port 3000" },
  { "Command": "build", "Description": "Generate static site", "Default": "dist/" },
  { "Command": "validate", "Description": "Check project health", "Default": "-" }
]
</wc-table>
```

<wc-table>
[
  { "Command": "init", "Description": "Scaffold a new project", "Default": "my-docs" },
  { "Command": "dev", "Description": "Start dev server", "Default": "port 3000" },
  { "Command": "build", "Description": "Generate static site", "Default": "dist/" },
  { "Command": "validate", "Description": "Check project health", "Default": "-" }
]
</wc-table>

<wc-callout type="tip" title="When to use wc-table vs Markdown tables">
Use `wc-table` for large datasets that benefit from sticky headers. Use standard Markdown tables for small, simple data.
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
<wc-field name="variable" type="string">
The CSS custom property name for this color.
</wc-field>
</wc-fields>

## Version-specific content

Show different content based on the selected version with `wc-versions` and `wc-version`:

```markdown
<wc-versions>
<wc-version version="0.2">

The `build` command now generates `llms.txt` and `llms-full.txt` automatically.

</wc-version>
<wc-version version="0.1">

Run `docslit build` to generate your static site.

</wc-version>
</wc-versions>
```

<wc-versions>
<wc-version version="0.2">

The `build` command now generates `llms.txt` and `llms-full.txt` automatically.

</wc-version>
<wc-version version="0.1">

Run `docslit build` to generate your static site.

</wc-version>
</wc-versions>

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
