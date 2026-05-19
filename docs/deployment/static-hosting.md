---
title: Static hosting
description: Deploy your DocsLit site as static files to Netlify, Vercel, Cloudflare Pages, GitHub Pages, or any CDN.
tag: Deployment
readtime: 4 min read
---

# Static hosting

DocsLit builds a standard static site that you can deploy to any hosting provider. Run `docslit build` and upload the `dist/` directory.

## Build your site

```bash
npx docslit build
```

This generates a `dist/` directory with HTML pages, a search index, sitemap, and AI discovery files.

<wc-callout type="tip" title="Set the url field">
Add `"url": "https://docs.example.com"` to your `docslit.json` before building. This enables absolute URLs in your sitemap and `llms.txt`.
</wc-callout>

## Deploy to a hosting provider

<wc-tabs>
<wc-tab label="Vercel">

<wc-steps>
<wc-step title="Install the Vercel CLI">

```bash
npm install -g vercel
```

</wc-step>
<wc-step title="Deploy">

```bash
npx docslit build
cd dist
vercel --prod
```

</wc-step>
</wc-steps>

Alternatively, connect your git repository to Vercel and set the build command to `npx docslit build` with the output directory set to `dist`.

</wc-tab>
<wc-tab label="Netlify">

<wc-steps>
<wc-step title="Install the Netlify CLI">

```bash
npm install -g netlify-cli
```

</wc-step>
<wc-step title="Deploy">

```bash
npx docslit build
netlify deploy --prod --dir=dist
```

</wc-step>
</wc-steps>

For continuous deployment, connect your repository and set the build command to `npx docslit build` with the publish directory set to `dist`.

</wc-tab>
<wc-tab label="GitHub Pages">

<wc-steps>
<wc-step title="Add a GitHub Actions workflow">

Create `.github/workflows/deploy.yml`:

```yaml filename=".github/workflows/deploy.yml"
name: Deploy docs
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      pages: write
      id-token: write
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 24
      - run: npx docslit build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
      - uses: actions/deploy-pages@v4
```

</wc-step>
<wc-step title="Enable GitHub Pages">

Go to your repository **Settings** > **Pages** and set the source to **GitHub Actions**.

</wc-step>
</wc-steps>

</wc-tab>
<wc-tab label="AWS S3">

<wc-steps>
<wc-step title="Build and sync">

```bash
npx docslit build
aws s3 sync dist/ s3://your-bucket-name --delete
```

</wc-step>
<wc-step title="Configure static hosting">

Enable static website hosting on your S3 bucket and set `index.html` as the index document. Optionally, put CloudFront in front for HTTPS and caching.

</wc-step>
</wc-steps>

</wc-tab>
</wc-tabs>

## What gets deployed

Every build produces these files:

| File | Purpose |
|---|---|
| `index.html` | App shell with navigation and components |
| `docs/*.html` | Pre-rendered pages for SEO |
| `docs/*.md` | Raw Markdown for programmatic access |
| `search-index.json` | Client-side full-text search |
| `sitemap.xml` | Search engine sitemap |
| `robots.txt` | Crawler directives |
| `llms.txt` | AI agent discovery index |
| `llms-full.txt` | Complete docs as plain text |
| `_middleware.js` | Content negotiation for AI agents (Cloudflare/Netlify) |
| `vercel.json` | Content negotiation for AI agents (Vercel) |
| `.well-known/agent.json` | Machine-readable agent discovery |
| `mcp-server.js` | MCP server for AI tool integration |

## Custom output directory

Use the `--out` flag to change the output directory:

```bash
npx docslit build --out public
```
