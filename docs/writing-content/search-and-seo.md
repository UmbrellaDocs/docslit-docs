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

DocsLit generates several files to make your documentation accessible to AI agents:

<wc-fields header="AI discovery files">
<wc-field name="llms.txt" type="file">
A structured index of all your documentation pages with titles and descriptions. AI agents use this to understand your site structure and decide which pages to read. Follows the [llmstxt.org](https://llmstxt.org) specification.
</wc-field>
<wc-field name="llms-full.txt" type="file">
The complete text content of every page concatenated into a single file. AI agents can consume your entire documentation in one request.
</wc-field>
<wc-field name=".well-known/agent.json" type="file">
A machine-readable discovery file listing all available endpoints — `llms.txt`, search index, Markdown URLs, and content negotiation support. Agents can fetch this single file to learn how to interact with your docs.
</wc-field>
<wc-field name="mcp-server.js" type="file">
A standalone MCP server that agents like Claude Desktop can connect to over stdio. Provides `list_pages`, `get_page`, and `search_docs` tools with no additional dependencies.
</wc-field>
</wc-fields>

These files are generated automatically from your page content and frontmatter descriptions.

### MCP server

The generated `mcp-server.js` is a self-contained Node script that implements the Model Context Protocol over stdio. It requires no additional dependencies — just Node.js. It provides three tools:

| Tool | Description |
|---|---|
| `list_pages` | List all pages with titles and descriptions |
| `get_page` | Get the full Markdown content of a page by slug |
| `search_docs` | Search documentation by keyword with excerpts |

After building your site with `docslit build`, the MCP server is ready to use at `dist/mcp-server.js`.

<wc-tabs>
<wc-tab label="Claude Code">

Add it to your project's `.claude/settings.json`:

```json filename=".claude/settings.json"
{
  "mcpServers": {
    "my-docs": {
      "command": "node",
      "args": ["dist/mcp-server.js"]
    }
  }
}
```

Then ask Claude Code to search or read your docs directly from the conversation.

</wc-tab>
<wc-tab label="Claude Desktop">

Add it to your Claude Desktop configuration:

```json filename="claude_desktop_config.json"
{
  "mcpServers": {
    "my-docs": {
      "command": "node",
      "args": ["/absolute/path/to/dist/mcp-server.js"]
    }
  }
}
```

Restart Claude Desktop to pick up the new server.

</wc-tab>
<wc-tab label="Cursor">

Add it to your project's `.cursor/mcp.json`:

```json filename=".cursor/mcp.json"
{
  "mcpServers": {
    "my-docs": {
      "command": "node",
      "args": ["dist/mcp-server.js"]
    }
  }
}
```

</wc-tab>
<wc-tab label="Other MCP clients">

Any MCP client that supports stdio transport can use the server. Point it at `node dist/mcp-server.js` as the command.

</wc-tab>
</wc-tabs>

<wc-callout type="tip" title="Keep it in your repo">
Commit `dist/mcp-server.js` to your repository so that contributors and AI tools can use it without needing to rebuild. The server reads from the sibling `.md` and `search-index.json` files in the same directory.
</wc-callout>

### Content negotiation

AI agents can request any page URL with an `Accept: text/markdown` header to receive raw Markdown instead of HTML. This works automatically in the dev server and in static builds deployed to platforms that support edge middleware.

```bash
# Returns raw Markdown instead of the HTML page
curl -H "Accept: text/markdown" https://docs.example.com/quickstart
```

For static builds, DocsLit generates platform-specific files to handle this negotiation automatically.

<wc-tabs>
<wc-tab label="Cloudflare Pages">

DocsLit generates a `_middleware.js` that Cloudflare Pages picks up automatically from your output directory. No additional configuration is needed.

</wc-tab>
<wc-tab label="Vercel">

DocsLit generates a `vercel.json` with header-based rewrites. Copy it to your project root before deploying:

```bash
cp dist/vercel.json vercel.json
```

Or if you already have a `vercel.json`, merge the `rewrites` array into it.

</wc-tab>
<wc-tab label="Netlify">

Move `_middleware.js` into your `netlify/edge-functions/` directory, or reference it in your `netlify.toml`:

```toml filename="netlify.toml"
[[edge_functions]]
  path = "/*"
  function = "markdown-negotiation"
```

</wc-tab>
<wc-tab label="Other platforms">

On platforms without middleware support (GitHub Pages, S3), agents can request Markdown directly at `/{slug}.md`. The `llms.txt` file lists these URLs for discovery.

</wc-tab>
</wc-tabs>

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
