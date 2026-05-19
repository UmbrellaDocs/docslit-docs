---
title: Offline builds
description: Generate a self-contained documentation site that works offline, from a file:// URL, or on air-gapped networks — with no external dependencies.
tag: Deployment
readtime: 3 min read
---

# Offline builds

DocsLit can build your entire documentation site as a self-contained folder. No server required — readers open `index.html` in their browser by double-clicking it. Pages load lazily for fast startup, and zero network requests are made.

## Build an offline site

```bash
npx docslit build --offline
```

This produces a `dist/` folder with everything needed to run offline:

- `index.html` — the main entry point with all styles and components inline
- `pages/*.js` — individual page content, loaded on demand as readers navigate
- `search-index.js` — the search index, loaded when search is first used

All navigation, search, and theme switching work without a server or internet connection.

## When to use offline builds

<wc-tiles cols="2">
<wc-tile icon-name="lock" title="Air-gapped environments" description="Distribute docs where internet access is not available."></wc-tile>
<wc-tile icon-name="download" title="USB distribution" description="Copy the dist folder to a USB drive for offline access."></wc-tile>
<wc-tile icon-name="archive" title="Archival" description="Create a self-contained snapshot of your docs at a point in time."></wc-tile>
<wc-tile icon-name="shield" title="Secure environments" description="No inline event handlers, no external requests, XSS-safe output."></wc-tile>
</wc-tiles>

## Offline vs static builds

| Feature | Static build | Offline build |
|---|---|---|
| Output | Multiple files in `dist/` | Self-contained `dist/` folder |
| Server required | Yes (any static host) | No (`file://` works) |
| SEO pages | Yes (`docs/*.html`) | No |
| Sitemap | Yes | No |
| Search | Yes | Yes |
| llms.txt | Yes | No |
| External requests | Google Fonts | None |

<wc-callout type="info" title="Use static for production, offline for distribution">
Static builds are better for production websites because they produce SEO-friendly pages and sitemaps. Offline builds are best for distributing docs in environments without internet access.
</wc-callout>

## Security

Offline builds are hardened for safe use in restricted environments:

- **No inline event handlers** — all interactivity uses event delegation instead of `onclick`/`oninput` attributes, making the output compatible with strict Content Security Policies
- **XSS protection** — all user-facing interpolated values (page IDs, navigation text) are HTML-escaped before insertion into the DOM
- **No external requests** — Google Fonts and other external resources are excluded; the site makes zero network requests
- **Self-contained** — all styles, components, and application logic are bundled inline; only page content and the search index are loaded as separate local files

## Custom output directory

```bash
npx docslit build --offline --out my-offline-docs
```
