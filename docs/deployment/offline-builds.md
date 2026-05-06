---
title: Offline builds
tag: Deployment
readtime: 2 min read
---

# Offline builds

DocsLit can build your entire documentation site as a single HTML file. No server required — readers open the file in their browser by double-clicking it.

## Build an offline site

```bash
npx docslit build --offline
```

This produces a `dist/index.html` file with everything inlined:

- All page content embedded in `window.__DOCSLIT_PAGES__`
- The search index embedded in `window.__DOCSLIT_SEARCH_INDEX__`
- All components and styles included inline
- Full navigation and search functionality

## When to use offline builds

<wc-tiles cols="2">
<wc-tile icon-name="mail" title="Email attachments" description="Send docs as a single file that recipients open in any browser."></wc-tile>
<wc-tile icon-name="lock" title="Air-gapped environments" description="Distribute docs where internet access is not available."></wc-tile>
<wc-tile icon-name="download" title="USB distribution" description="Copy a single file to a USB drive for offline access."></wc-tile>
<wc-tile icon-name="archive" title="Archival" description="Create a self-contained snapshot of your docs at a point in time."></wc-tile>
</wc-tiles>

## Offline vs static builds

| Feature | Static build | Offline build |
|---|---|---|
| Output | Multiple files in `dist/` | Single `index.html` |
| Server required | Yes (any static host) | No |
| SEO pages | Yes (`docs/*.html`) | No |
| Sitemap | Yes | No |
| Search | Yes | Yes |
| llms.txt | Yes | No |

<wc-callout type="info" title="Use static for production, offline for distribution">
Static builds are better for production websites because they produce SEO-friendly pages and sitemaps. Offline builds are best for distributing docs as standalone files.
</wc-callout>

## Custom output directory

```bash
npx docslit build --offline --out my-offline-docs
```
