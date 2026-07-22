---
title: Site chrome
description: Navbar links, footer, custom CSS, head tags, analytics, favicon, and basePath
---

# Site chrome

Make the docs site yours without forking templates. All of these keys live in `docslit.json`.

## Navbar links

```json
{
  "navbar": {
    "links": [
      { "label": "GitHub", "href": "https://github.com/org/repo", "external": true },
      { "label": "API", "href": "/api/overview" }
    ]
  }
}
```

## Footer

```json
{
  "footer": {
    "copyright": "© 2026 Acme Inc.",
    "links": [
      { "label": "Status", "href": "https://status.example.com", "external": true }
    ],
    "columns": [
      {
        "title": "Product",
        "links": [
          { "label": "Pricing", "href": "https://example.com/pricing", "external": true }
        ]
      }
    ]
  }
}
```

## Custom CSS and head tags

```json
{
  "css": "styles/custom.css",
  "head": [
    "<meta name=\"theme-color\" content=\"#0f172a\">"
  ],
  "favicon": "assets/favicon.png"
}
```

`css` is copied into the build output and linked after the DocsLit theme stylesheet. `head` injects raw trusted HTML into `<head>`.

## Analytics presets

```json
{
  "analytics": {
    "provider": "plausible",
    "domain": "docs.example.com"
  }
}
```

Supported providers: `plausible`, `fathom`, `ga4` (uses `measurementId`), `posthog` (uses `apiKey` / `host`).

## Base path (GitHub Pages)

For project sites like `https://user.github.io/repo/`:

```json
{
  "basePath": "/repo"
}
```

Then run:

```bash
docslit deploy --github-pages
```

## Redirects

```json
{
  "redirects": {
    "/old-guide": "/getting-started/introduction",
    "/legacy": "https://example.com"
  }
}
```

You can also set frontmatter `redirect: /new-path` on a page. Builds emit meta-refresh stubs plus `_redirects` and `vercel.json` entries.
