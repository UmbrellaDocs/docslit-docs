---
title: Project structure
description: Understand the file and folder layout of a DocsLit project, including docslit.json, the docs directory, and build output.
tag: Getting started
readtime: 3 min read
---

# Project structure

Every DocsLit project follows a simple, flat structure. There are no deeply nested configuration directories or framework-specific folders.

## Directory layout

<wc-files>
<wc-dir name="my-docs" open>
<wc-file name="docslit.json" highlight></wc-file>
<wc-dir name="docs" open>
<wc-file name="introduction.md"></wc-file>
<wc-file name="installation.md"></wc-file>
<wc-file name="quickstart.md"></wc-file>
<wc-file name="guides.md"></wc-file>
<wc-dir name="_reusables">
<wc-file name="shared/install-cli.md"></wc-file>
</wc-dir>
</wc-dir>
<wc-dir name="components">
<wc-file name="my-widget.js"></wc-file>
</wc-dir>
<wc-dir name="dist">
<wc-file name="index.html"></wc-file>
<wc-file name="sitemap.xml"></wc-file>
<wc-file name="llms.txt"></wc-file>
</wc-dir>
</wc-dir>
</wc-files>

## Key files and directories

<wc-fields header="Files">
<wc-field name="docslit.json" type="file" required>
Project configuration. Defines your site name, sidebar navigation, and optional versioning. This is the only required configuration file.
</wc-field>
<wc-field name="docs/" type="directory" required>
Contains all your Markdown documentation pages. Each `.md` file becomes a page on your site. The filename (without extension) is the page slug used in URLs.
</wc-field>
<wc-field name="docs/_reusables/" type="directory">
Reusable markdown fragments for `<wc-include />`. Include targets must live under this directory.
</wc-field>
<wc-field name="components/" type="directory">
Optional directory for custom Lit web components. Any `.js` file here is automatically loaded alongside the built-in components.
</wc-field>
<wc-field name="dist/" type="directory">
Generated output directory. Created when you run `docslit build`. Deploy this directory to any static hosting provider.
</wc-field>
</wc-fields>

## Configuration file

The `docslit.json` file controls your site's name, description, and sidebar navigation:

```json filename="docslit.json"
{
  "name": "My Docs",
  "description": "Documentation for my product",
  "sidebar": [
    {
      "group": "Getting started",
      "pages": ["introduction", "installation", "quickstart"]
    },
    {
      "group": "Guides",
      "pages": ["authentication", "deployment"]
    }
  ]
}
```

<wc-fields header="Configuration options">
<wc-field name="name" type="string" required>
The site title displayed in the header and browser tab.
</wc-field>
<wc-field name="description" type="string">
A short description of your documentation site. Used in `llms.txt` for AI discovery.
</wc-field>
<wc-field name="url" type="string">
The base URL where your docs are hosted. Used to generate absolute links in `sitemap.xml` and `llms.txt`.
</wc-field>
<wc-field name="sidebar" type="array" required>
An array of groups, each containing a `group` name and a `pages` array of page slugs. The order defines the sidebar navigation and pagination.
</wc-field>
<wc-field name="versions" type="object">
Multi-version configuration. See [versioning](../customization/versioning) for details.
</wc-field>
<wc-field name="logo" type="string">
Path to a custom logo image for the navigation bar. See [logo](../customization/logo).
</wc-field>
<wc-field name="announcement" type="object">
Site-wide announcement banner with a `message` string and optional `type` and `dismissible` fields. See [announcement banner](../customization/announcement-banner).
</wc-field>
<wc-field name="theme" type="string | object">
A theme (`peppermint`, `frond`, `tonal`, `folio`, `ledger` or `default`), a palette name (e.g. `ocean`), a path to a brand theme JSON file (e.g. `./brand-theme.json`), or an inline theme object with `name`, `palette`, `colors`, `fonts`, `radius`, `appearance` and `strict`. See [Themes](../customization/theming).
</wc-field>
<wc-field name="openapi" type="string | object">
Path to an OpenAPI 3.x spec file, or an object with `spec` and `overlay` keys. Enables spec-driven API reference generation. See [OpenAPI integration](../integrations/openapi) for details.
</wc-field>
<wc-field name="python" type="object">
Python API reference settings: `packages` (package names, with data in `api/python/<name>.json`), `docstringStyle` (`google`, `numpy` or `sphinx`) and `options` (default options for `:::` directives). See [Python API reference](../integrations/python-api).
</wc-field>
<wc-field name="ogImage" type="boolean" default="false">
Set to `true` to generate an Open Graph image for every page at build time. Off by default. Pages keep their `og:title` and `og:description` tags either way. A page can opt out with `ogImage: false` in its frontmatter.
</wc-field>
<wc-field name="build" type="object">
Build switches, equivalent to the `docslit build` flags. `ogImages` (default `false`) turns OG images on. `searchIndex`, `llmsTxt`, `mcp` and `sitemap` (default `true`) turn a generator off when `false`. `cache` (default `false`) enables incremental builds. See [Commands](../cli-reference/commands#faster-builds).

```json
{ "build": { "ogImages": true, "searchIndex": true, "llmsTxt": true, "mcp": true, "sitemap": true, "cache": true } }
```
</wc-field>
</wc-fields>

## Page slugs

Page slugs are the filenames without the `.md` extension. They determine the URL path for each page.

| File path | Slug | URL |
|---|---|---|
| `docs/introduction.md` | `introduction` | `/introduction` |
| `docs/getting-started.md` | `getting-started` | `/getting-started` |
| `docs/api-reference.md` | `api-reference` | `/api-reference` |

<wc-callout type="tip" title="Naming convention">
Use lowercase kebab-case for file names. DocsLit automatically converts slugs to title case in the sidebar — `getting-started` displays as "Getting Started".
</wc-callout>

## Build output

When you run `docslit build`, the `dist/` directory contains:

<wc-fields header="Build output files">
<wc-field name="index.html" type="file">
Redirects to the first page in the sidebar and carries a canonical link to it.
</wc-field>
<wc-field name="{slug}.html" type="file">
Pre-rendered HTML pages for each documentation page. These are crawlable by search engines.
</wc-field>
<wc-field name="{slug}.md" type="file">
Raw Markdown source files. Available for programmatic consumption by other tools.
</wc-field>
<wc-field name="search-index.json" type="file">
Full-text search index built at compile time. Powers the client-side search with no external service.
</wc-field>
<wc-field name="sitemap.xml" type="file">
XML sitemap for search engine crawlers. Generated when `url` is set in your configuration.
</wc-field>
<wc-field name="llms.txt" type="file">
LLM-friendly site index following the llmstxt.org specification. Lists all pages with descriptions.
</wc-field>
<wc-field name="llms-full.txt" type="file">
Complete documentation corpus as plain text. AI agents can consume your entire docs in one request.
</wc-field>
<wc-field name="docslit-vendor/" type="directory">
The Lit runtime the components use, copied from the DocsLit package. Pages load it from here, so the site makes no CDN request for Lit and always runs the Lit version DocsLit was tested with.
</wc-field>
<wc-field name="robots.txt" type="file">
Allows all major search engines and AI crawlers by default and points them at `sitemap.xml`.
</wc-field>
</wc-fields>

## Next steps

- Learn how to write content in [Markdown basics](../writing-content/markdown-basics)
- Configure page metadata with [frontmatter](../writing-content/frontmatter)
- Understand [pages and navigation](../writing-content/pages-and-navigation) to structure your sidebar
