---
title: Frontmatter
tag: Writing
readtime: 3 min read
---

# Frontmatter

Every Markdown page can include YAML frontmatter at the top of the file. Frontmatter controls the page title, metadata, and behavior.

## Basic frontmatter

Add a YAML block between `---` delimiters at the top of your `.md` file:

```markdown filename="docs/my-page.md"
---
title: My page title
tag: Guide
readtime: 3 min read
---

# My page title

Your content starts here.
```

## Available fields

<wc-fields header="Frontmatter options">
<wc-field name="title" type="string" required>
The page title. Displayed in the browser tab and used by search indexing. Every page should have a title.
</wc-field>
<wc-field name="description" type="string">
A short summary of the page content. Used in `llms.txt` and the search index to help readers and AI agents find your page.
</wc-field>
<wc-field name="tag" type="string">
A category label displayed as a badge next to the page title. Common values: `Guide`, `Reference`, `Tutorial`, `API`.
</wc-field>
<wc-field name="readtime" type="string">
Estimated reading time displayed in the page header. Use a human-readable format like `3 min read`.
</wc-field>
<wc-field name="updated" type="string">
The date this page was last updated. Displayed in the page metadata. Use a readable format like `May 2025`.
</wc-field>
<wc-field name="sidebar_title" type="string">
Override the title displayed in the sidebar navigation. Useful when the full title is too long for the sidebar.
</wc-field>
<wc-field name="component" type="string">
A technology or category tag displayed in the page metadata. Examples: `React`, `Node.js`, `CLI`.
</wc-field>
<wc-field name="draft" type="boolean" default="false">
Set to `true` to hide this page from the built site and sidebar. The page is still accessible in dev mode for preview.
</wc-field>
<wc-field name="redirect" type="string">
Redirect visitors to another page. Use a page slug like `/other-page`. Useful when you rename or reorganize pages.
</wc-field>
<wc-field name="layout" type="string">
Set to `api` for API reference pages. Uses a three-column layout with a wider content area and an examples panel on the right. Set automatically by the `openapi scaffold` command.
</wc-field>
</wc-fields>

## Examples

### Minimal frontmatter

```yaml
---
title: Installation
---
```

### Full frontmatter

```yaml
---
title: Authentication guide
description: Learn how to set up authentication with API keys and OAuth
tag: Guide
readtime: 5 min read
updated: January 2026
component: Auth
---
```

### Draft page

```yaml
---
title: Upcoming features
draft: true
---
```

<wc-callout type="info" title="Draft pages in dev mode">
Pages with `draft: true` are visible when you run `docslit dev` so you can preview them. They are excluded from `docslit build` output and hidden from the sidebar in production.
</wc-callout>

### API reference page

```yaml
---
title: Create a user
description: Create a new user account
layout: api
---
```

Pages with `layout: api` use a wider three-column layout with an examples panel. See [OpenAPI integration](integrations/openapi) for the full workflow.

### Sidebar title override

```yaml
---
title: Comprehensive API reference for all endpoints
sidebar_title: API reference
---
```

The sidebar shows "API reference" while the page heading shows the full title.

## Metadata display

When you include `tag`, `readtime`, `updated`, or `component` in your frontmatter, DocsLit automatically renders a metadata bar below the page title. You do not need to add any extra markup.

## Next steps

- Learn how to organize pages in the [sidebar](writing-content/pages-and-navigation)
- Make your content searchable with [search and SEO](writing-content/search-and-seo)
