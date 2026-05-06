---
title: Search and SEO
tag: Writing
readtime: 3 min read
---

# Search and SEO

DocsLit generates search indexes, sitemaps, and AI-readable files automatically. You do not need to configure anything — these features work out of the box when you run `docslit build`.

## Built-in search

Every static build generates a `search-index.json` file that powers the client-side search bar. The index includes page titles, descriptions, group names, and full body text.

Readers press `/` or click the search icon to open the search dialog. Results update as they type, with matches ranked by relevance.

<wc-callout type="tip" title="Write good descriptions">
Add a `description` field to your frontmatter. It improves search relevance and appears in the `llms.txt` output for AI agents.
</wc-callout>

## Search engine optimization

### HTML pages

Static builds generate individual HTML pages at `docs/{slug}.html` for every page in your sidebar. These pages contain the fully rendered content, making them crawlable by search engines.

### Sitemap

When you set the `url` field in `docslit.json`, the build generates a `sitemap.xml`:

```json filename="docslit.json"
{
  "name": "My Docs",
  "url": "https://docs.example.com",
  "sidebar": [...]
}
```

Submit this sitemap to Google Search Console and other search engines to improve indexing.

### Robots.txt

The build generates a `robots.txt` file that allows all major search engines and AI crawlers by default.

## AI agent discovery

DocsLit generates two files following the [llmstxt.org](https://llmstxt.org) specification:

<wc-fields header="AI discovery files">
<wc-field name="llms.txt" type="file">
A structured index of all your documentation pages with titles and descriptions. AI agents use this to understand your site structure and decide which pages to read.
</wc-field>
<wc-field name="llms-full.txt" type="file">
The complete text content of every page concatenated into a single file. AI agents can consume your entire documentation in one request.
</wc-field>
</wc-fields>

These files are generated automatically from your page content and frontmatter descriptions.

## Offline search

The offline build mode (`docslit build --offline`) embeds the search index directly into the HTML file. Search works without a server — even when opening the file from your desktop.

## Best practices

<wc-steps>
<wc-step title="Add frontmatter descriptions">

Write a one-sentence `description` for every page. This improves search results, `llms.txt` quality, and helps readers decide if a page is relevant.

</wc-step>
<wc-step title="Set the url field">

Add `"url"` to your `docslit.json` to enable `sitemap.xml` generation with absolute URLs.

</wc-step>
<wc-step title="Use descriptive headings">

Write headings that describe what the section covers. Headings are indexed for search and appear in the table of contents.

</wc-step>
</wc-steps>

## Next steps

- Start adding rich content with [callouts and alerts](components/callouts-and-alerts)
- Deploy your site with [static hosting](deployment/static-hosting) or [DocsLit Cloud](deployment/docslit-cloud)
