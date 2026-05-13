---
title: What's new
tag: Changelog
readtime: 3 min read
---

# What's new

All notable changes to DocsLit, organized by release.

## 0.1.7

<wc-update version="0.1.7" date="May 2025" type="added">
**Generate API docs from OpenAPI specs** — point DocsLit at your OpenAPI 3.x spec and run `docslit openapi scaffold` to generate a complete API reference site. Every endpoint gets its own page with parameters, request bodies, response fields, and examples pulled directly from the spec. See [OpenAPI integration](integrations/openapi).
</wc-update>

<wc-update version="0.1.7" date="May 2025" type="added">
**API reference layout** — API pages now use a dedicated three-column layout with your endpoint documentation on the left and code examples on the right, similar to Stripe and Twilio docs.
</wc-update>

<wc-update version="0.1.7" date="May 2025" type="added">
**Organized API sidebar** — the sidebar automatically mirrors your spec's tag structure with nested groups and color-coded HTTP method badges (GET, POST, PUT, DELETE) next to each endpoint.
</wc-update>

<wc-update version="0.1.7" date="May 2025" type="added">
**Rich parameter documentation** — request parameters and body fields display their type, format, constraints (min/max length, allowed values, patterns), defaults, and examples. Nested objects and arrays are rendered as collapsible sections.
</wc-update>

<wc-update version="0.1.7" date="May 2025" type="added">
**Response schema documentation** — response body fields are extracted from the spec and displayed with the same rich formatting as request parameters, including nested structures.
</wc-update>

<wc-update version="0.1.7" date="May 2025" type="added">
**AI-readable API docs** — when AI agents request your API pages, they get clean Markdown with parameter tables, field descriptions, and JSON examples instead of raw component tags. Works with any agent that reads Markdown.
</wc-update>

<wc-update version="0.1.7" date="May 2025" type="added">
**MCP server for AI tools** — every build generates an MCP server that AI tools like Claude Desktop and Cursor can connect to. Agents can list pages, read full content, and search your docs without leaving their workflow.
</wc-update>

<wc-update version="0.1.7" date="May 2025" type="added">
**Content negotiation** — AI agents can request any page URL with `Accept: text/markdown` to get raw Markdown instead of HTML. Works out of the box on Cloudflare Pages, Vercel, and Netlify.
</wc-update>

<wc-update version="0.1.7" date="May 2025" type="added">
**AI authoring and migration skills** — install skill files into Claude Code, Cursor, or Windsurf so your AI assistant knows how to write correct DocsLit pages and convert existing MDX docs. See [AI Skills](integrations/skills).
</wc-update>

<wc-update version="0.1.7" date="May 2025" type="fixed">
Sidebar search no longer breaks method badges — filtering and clearing the search input keeps badges intact.
</wc-update>

## 0.1.6

<wc-update version="0.1.6" date="April 2025" type="added">
Accordion group component (`wc-accordion-group`) for visually connected collapsible sections.
</wc-update>

<wc-update version="0.1.6" date="April 2025" type="added">
Expanded import detection with support for more component types during migration.
</wc-update>

<wc-update version="0.1.6" date="April 2025" type="added">
Icon support via built-in Lucide icons and Font Awesome CDN fallback.
</wc-update>

<wc-update version="0.1.6" date="April 2025" type="added">
Custom 404 page for static builds.
</wc-update>

<wc-update version="0.1.6" date="April 2025" type="added">
Sidebar keyboard navigation with arrow keys, Home, and End.
</wc-update>

<wc-update version="0.1.6" date="April 2025" type="fixed">
Search result navigation no longer stacks path segments on nested page IDs.
</wc-update>

<wc-update version="0.1.6" date="April 2025" type="fixed">
Nested page IDs (e.g., `commands/check`) now work correctly in build and dev server.
</wc-update>

## 0.1.5

<wc-update version="0.1.5" date="April 2025" type="added">
Accessibility improvements across all components — focus management, ARIA labels, and keyboard interactions.
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
