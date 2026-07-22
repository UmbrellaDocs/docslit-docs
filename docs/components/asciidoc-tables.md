---
title: AsciiDoc tables
description: Author rich tables with AsciiDoc syntax — column specs, spans, alignment, cell styles, CSV/DSV, and more.
tag: Components
readtime: 6 min read
---

# AsciiDoc tables

Use `wc-asciidoc-table` when you want readable, hand-authored tables with features Markdown tables do not cover — multi-line cells, column widths, spans, alignment, and CSV/DSV data.

DocsLit parses a focused subset of [AsciiDoc table syntax](https://docs.asciidoctor.org/asciidoc/latest/tables/table-ref/) at build time and emits a real HTML `<table>` (good for SEO and static hosting).

## Basic table

Wrap an AsciiDoc table block in `wc-asciidoc-table`:

```markdown
<wc-asciidoc-table>
[cols="1,2,3",options="header"]
|===
|Method |Path |Description

|GET
|/users
|List users

|POST
|/users
|Create a user
|===
</wc-asciidoc-table>
```

<wc-asciidoc-table>
[cols="1,2,3",options="header"]
|===
|Method |Path |Description

|GET
|/users
|List users

|POST
|/users
|Create a user
|===
</wc-asciidoc-table>

<wc-callout type="tip" title="Which table should I use?">
- **Markdown (GFM)** — small, simple tables
- **`wc-table`** — JSON-driven data with sticky headers
- **`wc-asciidoc-table`** — hand-authored tables with spans, column specs, multi-line cells, or CSV/DSV
</wc-callout>

## Implicit header row

If every cell of the first row is on the line right after `|===`, and the next line is blank, that row becomes the header automatically:

```markdown
<wc-asciidoc-table>
|===
|Name |Role |Team

|Ada |Engineer |Platform
|Grace |Admiral |Navy
|===
</wc-asciidoc-table>
```

<wc-asciidoc-table>
|===
|Name |Role |Team

|Ada |Engineer |Platform
|Grace |Admiral |Navy
|===
</wc-asciidoc-table>

You can also set the header explicitly with `options="header"` or `%header` in the attribute list.

## Column specs

Use `cols` to set column count, relative widths, default alignment, and default cell style:

```markdown
<wc-asciidoc-table>
[cols="2,1,3",options="header"]
|===
|Wide |Narrow |Widest

|Left content
|Mid
|More detail on the right
|===
</wc-asciidoc-table>
```

<wc-asciidoc-table>
[cols="2,1,3",options="header"]
|===
|Wide |Narrow |Widest

|Left content
|Mid
|More detail on the right
|===
</wc-asciidoc-table>

### Multipliers and alignment

| Spec | Meaning |
|------|---------|
| `3*` | Three equal columns |
| `2,3*` | One column width 2, then three equal columns |
| `>` / `<` / `^` | Right / left / center horizontal align |
| `.>` / `.<` / `.^` | Bottom / top / middle vertical align |
| `s` `e` `m` `h` `l` `a` | Strong, emphasis, mono, header, literal, AsciiDoc cell |
| `~` | Autowidth column |

```markdown
<wc-asciidoc-table>
[cols=">s,3*^"]
|===
|Right + strong |Center |Center |Center

|Emphasis
|a
|b
|c
|===
</wc-asciidoc-table>
```

<wc-asciidoc-table>
[cols=">s,3*^"]
|===
|Right + strong |Center |Center |Center

|Emphasis
|a
|b
|c
|===
</wc-asciidoc-table>

## Cell spans, styles, and alignment

Put operators immediately before the cell separator (`|`):

```markdown
<wc-asciidoc-table>
|===
|Feature |Notes

2+|Spans both columns

|Right aligned
>|Aligned to the right

|Strong
s|Bold cell text

|Monospace
m|GET /v1/items

|Emphasis
e|Italic cell text
|===
</wc-asciidoc-table>
```

<wc-asciidoc-table>
|===
|Feature |Notes

2+|Spans both columns

|Right aligned
>|Aligned to the right

|Strong
s|Bold cell text

|Monospace
m|GET /v1/items

|Emphasis
e|Italic cell text
|===
</wc-asciidoc-table>

### Span operators

| Operator | Effect |
|----------|--------|
| `2+|` | Span 2 columns |
| `.2+|` | Span 2 rows |
| `2.2+|` | Span 2 columns and 2 rows |
| `3*|` | Repeat the cell across 3 columns |

```markdown
<wc-asciidoc-table>
[cols="3*"]
|===
|A |B |C

2.2+|Block span
|Row 1 Col 3

|Row 2 Col 3
|D |E |F
|===
</wc-asciidoc-table>
```

<wc-asciidoc-table>
[cols="3*"]
|===
|A |B |C

2.2+|Block span
|Row 1 Col 3

|Row 2 Col 3
|D |E |F
|===
</wc-asciidoc-table>

## Titles, footer, and layout attributes

Add a block title with a leading `.` line. Promote the last row to a footer with `options="footer"`:

```markdown
<wc-asciidoc-table>
.API routes
[cols="2*",options="header,footer",stripes="even"]
|===
|Method |Path
|GET |/users
|POST |/users
|Total |2
|===
</wc-asciidoc-table>
```

<wc-asciidoc-table>
.API routes
[cols="2*",options="header,footer",stripes="even"]
|===
|Method |Path
|GET |/users
|POST |/users
|Total |2
|===
</wc-asciidoc-table>

### Table attributes

You can set these on the tag or in the AsciiDoc attribute list (`[...]`):

<wc-fields header="wc-asciidoc-table">
<wc-field name="cols" type="string">
Comma-separated column specifiers (for example `1,2,3` or `3*`).
</wc-field>
<wc-field name="options" type="string">
Comma-separated options: `header`, `footer`, `autowidth`. Shorthand `%header` is also supported inside `[...]`.
</wc-field>
<wc-field name="format" type="string" default="psv">
Data format: `psv` (default), `csv`, `dsv`, or `tsv`.
</wc-field>
<wc-field name="separator" type="string">
Override the cell separator (useful when cell text contains `|`).
</wc-field>
<wc-field name="stripes" type="string" default="hover">
Row shading: `hover`, `even`, `odd`, `all`, or `none`.
</wc-field>
<wc-field name="frame" type="string">
Outer border: `all`, `ends`, `sides`, or `none`.
</wc-field>
<wc-field name="grid" type="string">
Inner lines: `all`, `rows`, `cols`, or `none`.
</wc-field>
<wc-field name="width" type="string">
Table width (for example `80` or `80%`).
</wc-field>
<wc-field name="caption" type="string">
Table title. Equivalent to a `.Title` line above the attribute list.
</wc-field>
</wc-fields>

## CSV, DSV, and TSV

Set `format="csv"` (or use the `,===` shorthand delimiter) for comma-separated data:

```markdown
<wc-asciidoc-table format="csv" options="header">
|===
Method,Path,Description
GET,/health,Liveness probe
POST,/deploy,Trigger deploy
|===
</wc-asciidoc-table>
```

<wc-asciidoc-table format="csv" options="header">
|===
Method,Path,Description
GET,/health,Liveness probe
POST,/deploy,Trigger deploy
|===
</wc-asciidoc-table>

Quoted CSV fields can contain commas:

```markdown
<wc-asciidoc-table format="csv" options="header">
|===
"Last, First",Role
"Hopper, Grace",Admiral
|===
</wc-asciidoc-table>
```

<wc-asciidoc-table format="csv" options="header">
|===
"Last, First",Role
"Hopper, Grace",Admiral
|===
</wc-asciidoc-table>

Use `format="dsv"` (or `:===`) for colon-separated values, and `format="tsv"` for tabs.

## Escaping pipes

If a PSV cell must contain `|`, escape it with a backslash or use `{vbar}`:

```markdown
<wc-asciidoc-table>
[cols="2*"]
|===
|The default separator is \|
|Also written as {vbar}
|===
</wc-asciidoc-table>
```

<wc-asciidoc-table>
[cols="2*"]
|===
|The default separator is \|
|Also written as {vbar}
|===
</wc-asciidoc-table>

Or change the separator entirely:

```markdown
<wc-asciidoc-table cols="2*" separator="¦">
|===
¦Pipes | are fine here
¦No escaping needed
|===
</wc-asciidoc-table>
```

## MDX-style tag

The MDX bridge also accepts PascalCase:

```markdown
<AsciidocTable cols="2*" options="header">
|===
|Name |Role
|Ada |Engineer
|===
</AsciidocTable>
```

## What's next

- Compare with JSON tables in [Data display](data-display)
- Review GFM Markdown tables in [Markdown basics](../writing-content/markdown-basics)
- Browse the full AsciiDoc table reference at [docs.asciidoctor.org](https://docs.asciidoctor.org/asciidoc/latest/tables/table-ref/)
