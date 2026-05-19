---
title: What's new
description: Latest features, improvements, and fixes in DocsLit releases.
tag: Changelog
readtime: 3 min read
---

# What's new

All notable changes to DocsLit, organized by release.

## 0.1.8

<wc-update version="0.1.8" date="May 2026" type="added">
**Reusable content includes**

DocsLit now supports compile-time includes with `pass:[<wc-include src="..."/>]`. Includes are intentionally strict: targets must be Markdown files under `docs/_reusables/**`, include tags must be self-closing, and unsafe paths are blocked.
</wc-update>

<wc-update version="0.1.8" date="May 2026" type="added">
**Variable precedence for compile-time rendering**

`pass:[{{VAR}}]` placeholders in prose now resolve with clear precedence: global `attributes` in `docslit.json`, then page frontmatter `attributes`, then page-local `pass:[<wc-var name="X" value="Y" />]` declarations.
</wc-update>

<wc-update version="0.1.8" date="May 2026" type="added">
**Pass-through escape syntax**

Use `pass:[pass:[...]]` to render syntax literally when you are documenting templates or components. Example: `pass:[{{TOKEN}}]` or `pass:[<wc-include src="..." />]`.
</wc-update>

<wc-update version="0.1.8" date="May 2026" type="added">
**Expanded Markdown for AI consumers**

Markdown output now uses preprocessed content (includes and compile-time variables resolved), improving quality for `llms-full.txt`, search indexing, and markdown-based AI ingestion.
</wc-update>

<wc-update version="0.1.8" date="May 2026" type="added">
**Version-aware global variables**

Two built-in globals are now available on every page: `{{DOCSLIT_VERSION}}` and `{{DOCSLIT_BRANCH}}`.
</wc-update>

<wc-update version="0.1.8" date="May 2026" type="improved">
**Offline build security hardening**

Offline builds are now hardened for secure, air-gapped environments. All inline event handlers (`onclick`, `oninput`, etc.) are replaced with event delegation. User-facing values are HTML-escaped to prevent DOM-based XSS. Google Fonts and all external requests are removed. Pages load lazily from local files for faster startup. See [Offline builds](../deployment/offline-builds).
</wc-update>

<wc-update version="0.1.8" date="May 2026" type="fixed">
Nested include checks no longer fail when reusable files contain include syntax only inside fenced code examples.
</wc-update>

<wc-update version="0.1.8" date="May 2026" type="fixed">
Inline literal rendering now uses explicit `pass:[...]` behavior, avoiding accidental formatting regressions while keeping variable syntax usable in normal prose.
</wc-update>

## 0.1.7

<wc-update version="0.1.7" date="May 2025" type="added">
**Syntax highlighting with Shiki** -- code blocks now use Shiki for build-time highlighting with dual-theme support. Blocks automatically match your page's light or dark theme, and a kebab menu on every code block lets readers switch code between light and dark mode independently of the page theme. The preference is saved for future visits. See [Code blocks](../components/code-blocks).
</wc-update>

<wc-update version="0.1.7" date="May 2025" type="added">
**Copy button on code groups** -- tabbed code groups now include a copy button matching individual code blocks, so readers can copy the active tab's code without selecting text.
</wc-update>

<wc-update version="0.1.7" date="May 2025" type="added">
**Opt-in line numbers** -- add `linenumbers="true"` to any code block to display a non-selectable line number gutter. Line numbers are off by default and only appear when explicitly requested.
</wc-update>

<wc-update version="0.1.7" date="May 2025" type="added">
**Save as PDF** -- a "Save as PDF" button now appears in the page toolbar alongside "Copy as Markdown" and "View as Markdown". It produces clean print output with all accordions and tabs expanded, page chrome hidden, and page breaks prevented inside code blocks and tables.
</wc-update>

<wc-update version="0.1.7" date="May 2025" type="added">
**Generate API docs from OpenAPI specs** -- point DocsLit at your OpenAPI 3.x spec and run `docslit openapi scaffold` to generate a complete API reference site. Every endpoint gets its own page with parameters, request bodies, response fields, and examples pulled directly from the spec. See [OpenAPI integration](../integrations/openapi).
</wc-update>

<wc-update version="0.1.7" date="May 2025" type="added">
**API reference layout** -- API pages now use a dedicated three-column layout with your endpoint documentation on the left and code examples on the right, similar to Stripe and Twilio docs.
</wc-update>

<wc-update version="0.1.7" date="May 2025" type="added">
**Organized API sidebar** -- the sidebar automatically mirrors your spec's tag structure with nested groups and color-coded HTTP method badges (GET, POST, PUT, DELETE) next to each endpoint.
</wc-update>

<wc-update version="0.1.7" date="May 2025" type="added">
**Rich parameter documentation** -- request parameters and body fields display their type, format, constraints (min/max length, allowed values, patterns), defaults, and examples. Nested objects and arrays are rendered as collapsible sections.
</wc-update>

<wc-update version="0.1.7" date="May 2025" type="added">
**Response schema documentation** -- response body fields are extracted from the spec and displayed with the same rich formatting as request parameters, including nested structures.
</wc-update>

<wc-update version="0.1.7" date="May 2025" type="added">
**Redesigned parameter fields** -- the `wc-field` component now uses a single-column Stripe-style layout with inline expand/collapse for nested fields and a dedicated box for enum values. New attributes let you display parameter location, format, constraints, and inline Markdown descriptions.
</wc-update>

<wc-update version="0.1.7" date="May 2025" type="added">
**Hybrid sidebar** -- sites with both regular documentation and an OpenAPI spec now get separate "API Reference" and "Documentation" sidebars with toggle links in the nav bar.
</wc-update>

<wc-update version="0.1.7" date="May 2025" type="added">
**Mobile API examples** -- on smaller screens (1280px and below), API examples now appear below the main content instead of being hidden.
</wc-update>

<wc-update version="0.1.7" date="May 2025" type="added">
**AI-readable API docs** -- when AI agents request your API pages, they get clean Markdown with parameter tables, field descriptions, and JSON examples instead of raw component tags. Works with any agent that reads Markdown.
</wc-update>

<wc-update version="0.1.7" date="May 2025" type="added">
**MCP server for AI tools** -- every build generates an MCP server that AI tools like Claude Desktop and Cursor can connect to. Agents can list pages, read full content, and search your docs without leaving their workflow.
</wc-update>

<wc-update version="0.1.7" date="May 2025" type="added">
**Content negotiation** -- AI agents can request any page URL with `Accept: text/markdown` to get raw Markdown instead of HTML. Works out of the box on Cloudflare Pages, Vercel, and Netlify.
</wc-update>

<wc-update version="0.1.7" date="May 2025" type="added">
**AI authoring and migration skills** -- install skill files into Claude Code, Cursor, or Windsurf so your AI assistant knows how to write correct DocsLit pages and convert existing MDX docs. See [AI Skills](../integrations/skills).
</wc-update>

<wc-update version="0.1.7" date="May 2025" type="fixed">
Sidebar search no longer breaks method badges -- filtering and clearing the search input keeps badges intact.
</wc-update>

<wc-update version="0.1.7" date="May 2025" type="fixed">
Switching between API pages no longer shows leftover request and response examples from the previous page.
</wc-update>

<wc-update version="0.1.7" date="May 2025" type="fixed">
Code group theme toggle dropdown no longer gets clipped by the tab bar.
</wc-update>

<wc-update version="0.1.7" date="May 2025" type="fixed">
OpenAPI scaffold now properly escapes frontmatter values containing special YAML characters.
</wc-update>

## 0.1.6

<wc-update version="0.1.6" date="April 2025" type="added">
**Drop-in MDX support** -- PascalCase component names like `<Tip>`, `<Card>`, and `<Steps>` now work directly in Markdown files. DocsLit recognizes roughly 25 Mintlify and MDX component names and rewrites them to their DocsLit equivalents at parse time. Most Mintlify projects can be moved over without changing source files. See [Markdown basics](../writing-content/markdown-basics).
</wc-update>

<wc-update version="0.1.6" date="April 2025" type="added">
**Full-text search** -- press Cmd+K (or Ctrl+K) to open a search dialog that searches across all pages with instant results as you type. Results are grouped by sidebar section with highlighted matches and full keyboard navigation.
</wc-update>

<wc-update version="0.1.6" date="April 2025" type="added">
**Multi-version documentation** -- host multiple versions of your documentation on a single site with a version selector. Versions map to git branches, so teams can maintain separate branches for each product release and build them into a unified site with versioned URLs. See [Versioning](../customization/versioning).
</wc-update>

<wc-update version="0.1.6" date="April 2025" type="added">
**Active section tracking** -- the table of contents on the right now shows a colored guide line that follows you as you scroll. The active section updates smoothly, and clicking a heading highlights it instantly.
</wc-update>

<wc-update version="0.1.6" date="April 2025" type="added">
**Fenced code block variables** -- `{{VAR}}` placeholders in fenced code blocks now update in real time when readers edit a variable on the page. All fenced code blocks also get copy buttons automatically.
</wc-update>

<wc-update version="0.1.6" date="April 2025" type="added">
**Inline variable references** -- `{{VAR}}` patterns in regular Markdown text are automatically converted to live variable displays that update when the variable is changed elsewhere on the page.
</wc-update>

<wc-update version="0.1.6" date="April 2025" type="added">
**Copy as Markdown and View as Markdown** -- every page now shows buttons to copy the raw Markdown source to your clipboard or open it in a new tab.
</wc-update>

<wc-update version="0.1.6" date="April 2025" type="added">
**Per-route HTML pages** -- static builds now generate a full HTML file for every page route instead of a single SPA shell. Your site works on any static host without rewrite rules or fallback configuration.
</wc-update>

<wc-update version="0.1.6" date="April 2025" type="added">
**SEO improvements** -- static builds now generate `robots.txt`, `sitemap.xml`, Open Graph and Twitter Card meta tags, canonical URLs, and JSON-LD structured data automatically. See [Search and SEO](../writing-content/search-and-seo).
</wc-update>

<wc-update version="0.1.6" date="April 2025" type="added">
**Accordion group component** -- a new `wc-accordion-group` component visually connects adjacent accordions into a unified group with shared borders.
</wc-update>

<wc-update version="0.1.6" date="April 2025" type="added">
**Custom 404 page** -- navigating to a non-existent page now shows a styled error page with a search button and a link back to your docs.
</wc-update>

<wc-update version="0.1.6" date="April 2025" type="added">
**Sidebar keyboard navigation** -- arrow keys, Home, End, Enter, and Escape now work in the sidebar filter for fast navigation without a mouse.
</wc-update>

<wc-update version="0.1.6" date="April 2025" type="added">
**Expanded import detection** -- the import tool now recognizes 11 documentation frameworks including Docusaurus, MkDocs, Sphinx, ReadMe, VuePress, VitePress, Starlight, and Nextra, in addition to Mintlify, Fern, and GitBook.
</wc-update>

<wc-update version="0.1.6" date="April 2025" type="added">
**Import versioning** -- importing a Mintlify project with multiple versions now offers four strategies: branch-based versioning, keep only latest, merge all versions, or skip for manual setup.
</wc-update>

<wc-update version="0.1.6" date="April 2025" type="added">
**Icon support** -- built-in Lucide icons are available via `wc-icon`, and Font Awesome icons from imported projects are fetched from CDN and rendered inline.
</wc-update>

<wc-update version="0.1.6" date="April 2025" type="added">
**Nested page IDs** -- page slugs in `docslit.json` now support folder paths (e.g., `getting-started/introduction`) for organizing pages in subdirectories.
</wc-update>

<wc-update version="0.1.6" date="April 2025" type="added">
**Accessibility improvements** -- skip-to-content link, focus traps in search, `prefers-reduced-motion` and `prefers-contrast` support, ARIA tab patterns with arrow key navigation, visible focus indicators, and semantic landmarks across all components.
</wc-update>

<wc-update version="0.1.6" date="April 2025" type="fixed">
Search result navigation no longer stacks path segments on nested page IDs.
</wc-update>

<wc-update version="0.1.6" date="April 2025" type="fixed">
Web components are no longer stripped during client-side navigation.
</wc-update>

<wc-update version="0.1.6" date="April 2025" type="fixed">
Tiles grid layout no longer overlaps when using auto-fill columns.
</wc-update>

## 0.1.5

<wc-update version="0.1.5" date="April 2025" type="added">
**Client-side Markdown rendering** -- published sites now fetch and render Markdown in the browser, so pages load without a server-side rendering step.
</wc-update>

<wc-update version="0.1.5" date="April 2025" type="added">
**llms.txt improvements** -- generated `llms.txt` files now include clearer instructions showing where to fetch raw Markdown for each page.
</wc-update>

<wc-update version="0.1.5" date="April 2025" type="added">
**Import resilience** -- the import tool now handles malformed frontmatter, invalid YAML, and inline JSX expressions without crashing.
</wc-update>

## Earlier releases

<wc-accordion title="0.1.4 — Component polish and shareable links">

- Fixed padding in tabbed panels, file tree lines, highlighted filenames in light mode, and inline anchor layout
- Shareable anchor links — clicking any heading in the "On this page" sidebar updates the URL so you can copy and share a direct link to any section
- Security hardening for the dev server and auth token storage

</wc-accordion>

<wc-accordion title="0.1.3 — Open source license">

- DocsLit is now open source under the AGPL-3.0 license
- Free for personal and open source projects — the docs you generate are always yours

</wc-accordion>

<wc-accordion title="0.1.2 — Dark mode, mobile sidebar, and icons">

- Cards and tiles now support icons via the `iconName` attribute
- Dark and light mode works across all components — switching themes updates everything instantly
- Mobile sidebar with hamburger menu, slide-in overlay, and tap-outside-to-close
- Browser back/forward button works correctly when navigating between pages
- Lit vendor bundles ship locally — no CDN requests, fully offline capable

</wc-accordion>

<wc-accordion title="0.1.1 — Code blocks and new components">

- Code blocks display source text correctly — no more disappearing angle brackets
- New components: file trees, visual trees, download buttons, copy-to-clipboard, anchor links, and version badges
- Built-in preview server for browsing component examples locally

</wc-accordion>

<wc-accordion title="0.1.0 — Initial release">

The first public release of DocsLit with:

- Markdown rendering with web component preservation
- 39 built-in Lit web components
- Dev server with hot reload
- Static site builder
- Offline single-file builds
- Mintlify, Fern, and GitBook migration
- Project validation
- DocsLit Cloud deployment

</wc-accordion>
