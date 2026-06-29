---
title: Pages and navigation
description: Organize your documentation with sidebar groups, page ordering, and navigation links in docslit.json.
tag: Writing
readtime: 4 min read
---

# Pages and navigation

DocsLit generates your site navigation from `docslit.json`. You control the sidebar structure, page ordering, and pagination through a single configuration file.

## Sidebar structure

The `sidebar` array in `docslit.json` defines groups of pages:

```json filename="docslit.json"
{
  "sidebar": [
    {
      "group": "Getting started",
      "pages": ["introduction", "installation", "quickstart"]
    },
    {
      "group": "Guides",
      "pages": ["authentication", "deployment", "custom-domains"]
    }
  ]
}
```

Each group creates a collapsible section in the sidebar. Pages appear in the order you list them.

## Page slugs

Each entry in the `pages` array is a slug — the filename without the `.md` extension:

| Slug | File | Sidebar label |
|---|---|---|
| `introduction` | `docs/introduction.md` | Introduction |
| `getting-started` | `docs/getting-started.md` | Getting Started |
| `api-reference` | `docs/api-reference.md` | Api Reference |

DocsLit converts kebab-case slugs to title case automatically. To override the sidebar label, use the `sidebar_title` frontmatter field.

## Nested page IDs

You can organize pages in subdirectories within `docs/`:

```json filename="docslit.json"
{
  "sidebar": [
    {
      "group": "API",
      "pages": ["api/overview", "api/authentication", "api/endpoints"]
    }
  ]
}
```

This maps to files at `docs/api/overview.md`, `docs/api/authentication.md`, and so on.

## Pagination

DocsLit automatically adds previous and next navigation links at the bottom of each page. The order follows the sidebar — the page after the last entry in a group continues to the first page of the next group.

<wc-callout type="tip" title="Logical ordering">
Arrange your pages in the order a new reader would follow. The sidebar defines both navigation and learning path.
</wc-callout>

## Sidebar features

### Collapsible groups

Each sidebar group is collapsible. Readers can expand or collapse sections to focus on the content that matters to them.

### Keyboard navigation

The sidebar supports full keyboard navigation:

| Key | Action |
|---|---|
| `↑` `↓` | Move between sidebar items |
| `Enter` | Navigate to the selected page |
| `Home` | Jump to the first item |
| `End` | Jump to the last item |

### Filter

The sidebar includes a search filter at the top. Readers type to filter pages by title, making it easy to find pages in large documentation sites.

## Table of contents

DocsLit generates a table of contents from `##` and `###` headings on each page. This appears as a right-side panel on wide screens.

Write descriptive headings that help readers scan the page. Each heading becomes a clickable anchor link.

### Active section tracking

The table of contents highlights the current section as readers scroll. A colored guide line follows the active heading, and sub-headings (h3) are visually indented under their parent h2. Clicking a heading highlights it instantly without waiting for the smooth scroll to finish.

## Page toolbar

Every page displays a toolbar below the title with actions for Markdown and PDF:

| Button | Description |
|---|---|
| **Copy as Markdown** | Copies the raw Markdown source of the page to your clipboard |
| **View as Markdown** | Opens the `.md` source file in a new browser tab |
| **Save as PDF** | Opens the browser print dialog with optimized print styles (default when PDFs are not built at deploy time) |
| **Download PDF** | Dropdown with print, chapter download, and full documentation download — shown when you build with `--pdf` or `pdf.enabled` |

When you run `docslit build --pdf`, sidebar groups also become downloadable chapter PDFs. See [Chapter PDF export](../deployment/chapter-pdf-export).

## Next steps

- Generate downloadable manuals with [Chapter PDF export](../deployment/chapter-pdf-export)
- Optimize for search and AI agents with [search and SEO](search-and-seo)
- Start adding components to your pages — begin with [callouts and alerts](../components/callouts-and-alerts)
