---
title: Page layout
description: Set site-wide widths and the table of contents depth, choose a layout for each page, and hide the table of contents, pagination or page actions with frontmatter.
tag: Customization
readtime: 5 min read
---

# Page layout

Layout settings work at two levels. The `layout` key in `docslit.json` sets widths and defaults for the whole site. Frontmatter on a page picks one of seven layouts and switches individual parts of the page on or off.

## Site layout settings

```json filename="docslit.json"
{
  "layout": {
    "contentWidth": 720,
    "pageWidth": 1400,
    "sidebarWidth": 280,
    "tocDepth": 3,
    "showDescription": true
  }
}
```

Lengths are numbers, which mean pixels, or CSS lengths such as `"44rem"`. A value that is not a valid length, or an option that is not in the allowed list, is ignored and reported by `docslit validate` as `layout-invalid`.

<wc-fields header="layout">
<wc-field name="contentWidth" type="number | string" default="668px">
Width of the text column.
</wc-field>
<wc-field name="pageWidth" type="number | string" default="1560px">
Maximum width of the sidebar, content and table of contents together. Use `"full"` to run edge to edge.
</wc-field>
<wc-field name="sidebarWidth" type="number | string" default="264px">
Width of the sidebar.
</wc-field>
<wc-field name="tocWidth" type="number | string" default="216px">
Width of the table of contents.
</wc-field>
<wc-field name="headerHeight" type="number | string" default="60px">
Height of the top bar.
</wc-field>
<wc-field name="tocDepth" type="number" default="3">
The deepest heading level in the table of contents: `2`, `3` or `4`. `3` shows `h2` and `h3`.
</wc-field>
<wc-field name="contentAlignment" type="string" default="center">
`center` or `left`. Use `left` to align the column with the sidebar on wide screens.
</wc-field>
<wc-field name="showDescription" type="boolean" default="false">
Show each page's `description` as a subtitle under the title.
</wc-field>
<wc-field name="hideNav" type="boolean" default="false">
Hide the previous and next links on every page.
</wc-field>
<wc-field name="hideFeedback" type="boolean" default="false">
Hide the [feedback widget](feedback-widget) on every page.
</wc-field>
<wc-field name="tabsPlacement" type="string" default="header">
`header` or `sidebar`. See [Tabs and anchors](tabs-and-anchors).
</wc-field>
<wc-field name="tabsStyle" type="string" default="underline">
`underline` or `pill`.
</wc-field>
<wc-field name="tabsAlign" type="string" default="left">
`left` or `center`.
</wc-field>
</wc-fields>

These settings win over a [theme's](theming) own widths. The `peppermint` and `folio` themes turn on `showDescription` by default, and you can turn it off with `"showDescription": false`.

Under the hood each width sets a CSS variable (`--content-text-w`, `--page-w`, `--sidebar-w`, `--toc-w`, `--nav-h`), so you can also set them in your own stylesheet. See [Design tokens](design-tokens#layout-and-navigation-tokens).

## Choose a layout for a page

Set `layout` in a page's frontmatter. Mintlify's `mode` key is accepted as an alias.

```yaml
---
title: Pricing
description: Plans and limits.
layout: full
---
```

| Layout | Aliases | Sidebar | Table of contents | Width | Use it for |
|---|---|---|---|---|---|
| `guide` | `default` | Yes | Yes | Text column | Most pages |
| `overview` | | Yes | Yes | Wider column | Section overviews with tiles or tables |
| `wide` | `reference` | Yes | No | Wide column | Reference tables and long code |
| `center` | `page` | No | No | Centered column | Standalone pages such as a policy |
| `frame` | | Yes | No | Full width | Embedded tools, diagrams and videos |
| `full` | `custom`, `landing` | No | No | Full width | Landing pages: no breadcrumbs, pagination or page actions either |
| `api` | | Yes | No | Three columns with examples | API reference pages, set by `docslit openapi scaffold` |

An unknown layout name is reported as `frontmatter-invalid-layout`.

## Page switches

These frontmatter keys control one part of a page each. They use `snake_case`, and `kebab-case` and `camelCase` spellings are accepted too.

<wc-fields header="Frontmatter switches">
<wc-field name="hide_toc" type="boolean">
Hide the table of contents on this page.
</wc-field>
<wc-field name="toc_depth" type="number">
The deepest heading level in this page's table of contents, from `2` to `6`. The default is `layout.tocDepth`, or `3`.
</wc-field>
<wc-field name="hide_nav" type="boolean">
Hide the previous and next links at the bottom of the page.
</wc-field>
<wc-field name="hide_feedback" type="boolean">
Hide the feedback widget on this page.
</wc-field>
<wc-field name="hide_actions" type="boolean">
Hide the **Copy page** menu in the page header.
</wc-field>
<wc-field name="subtitle" type="string">
Text under the page title. It replaces the description when `layout.showDescription` is on.
</wc-field>
<wc-field name="eyebrow" type="string">
A small label above the title, such as the product area.
</wc-field>
<wc-field name="headline" type="string">
Overrides the `<title>` tag, which is what search results and browser tabs show. The page heading is unchanged.
</wc-field>
</wc-fields>

For example, a reference page with no table of contents, a subtitle and an eyebrow:

```yaml
---
title: CLI reference
description: Every command and flag.
hide_toc: true
subtitle: Every command and flag
eyebrow: Reference
---
```

Pages that must not appear in the sidebar, search, `llms.txt` or the sitemap use `hidden: true`, which also adds a `noindex` tag. `noindex` and `searchable: false` give you finer control. See [Frontmatter](../writing-content/frontmatter) for every key, and [Pages and navigation](../writing-content/pages-and-navigation#hidden-pages) for hidden pages.

## Next steps

- Group pages into sections with [Tabs and anchors](tabs-and-anchors)
- Tune the page actions in the [contextual menu](contextual-menu)
- Read every key in [Frontmatter](../writing-content/frontmatter)
