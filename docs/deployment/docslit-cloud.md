---
title: DocsLit Cloud
description: Request DocsLit Cloud, then publish with an API token and docslit publish. Covers the hosted MCP endpoint, Markdown negotiation, atomic releases, rollback and limits.
tag: Deployment
readtime: 8 min read
---

# DocsLit Cloud

DocsLit Cloud is a managed hosting service for your documentation. Build and publish with one command. There is no hosting configuration and no infrastructure to run. Each site also gets a hosted MCP endpoint for AI agents.

<wc-callout type="info" title="Early access">
DocsLit Cloud is in early access. We set up each account ourselves, and pricing is on request. [Request DocsLit Cloud](https://docslit.com/pricing/#request) and we reply by email.
</wc-callout>

## Get started

<wc-steps>
<wc-step title="Request access">

Fill in the [request form](https://docslit.com/pricing/#request) with a few details about your docs. We reply by email to agree on a plan and a price.

</wc-step>
<wc-step title="Get your API token">

We create your account and project, and send you an API token that starts with `dlt_`. Treat it like a password: anyone with the token can publish to your project.

</wc-step>
<wc-step title="Publish">

Set the token as `DOCSLIT_TOKEN` and publish:

```bash
DOCSLIT_TOKEN=dlt_your_token docslit publish
```

DocsLit builds your site, compresses it and uploads it. Your docs are live in seconds, and the command prints the URL.

</wc-step>
</wc-steps>

## Authenticate with a token

Every cloud command reads the API token from the `DOCSLIT_TOKEN` environment variable. In CI, store the token as a secret:

```yaml filename=".github/workflows/publish.yml"
- run: npx docslit publish
  env:
    DOCSLIT_TOKEN: ${{ secrets.DOCSLIT_TOKEN }}
```

Run `docslit whoami` to check which account the token belongs to. You can sign in to the [dashboard](https://docslit.com/login/) with the account details we send you to create more tokens or revoke old ones. An account can hold up to 25 tokens.

<wc-fields header="Environment variables">
<wc-field name="DOCSLIT_TOKEN" type="env">
Your API token. Required for every cloud command.
</wc-field>
<wc-field name="DOCSLIT_API_URL" type="env">
Overrides the API base URL for every cloud command. Default: `https://docslit.com/api`.
</wc-field>
</wc-fields>

## Publish

```bash
docslit publish
docslit publish --project my-docs --build
docslit publish --out public
```

<wc-fields header="Publish options">
<wc-field name="--project" type="string">
The project slug. Without it, DocsLit uses `cloud.project` from `docslit.json`, then a slug made from your site `name`.
</wc-field>
<wc-field name="--out" type="string" default="dist">
The build output folder to upload.
</wc-field>
<wc-field name="--build" type="flag">
Build before publishing. Without it, DocsLit builds only when the output folder does not exist.
</wc-field>
</wc-fields>

Pin the slug in your config so every publish goes to the same project:

```json filename="docslit.json"
{
  "cloud": { "project": "my-docs" }
}
```

### Slugs

A slug becomes your site's address. DocsLit lowercases it and replaces other characters with hyphens. It must be 3 to 63 characters. Names that could impersonate the service or its routes are reserved, such as `www`, `api`, `docs`, `mail`, `login` and `docslit`. A slug that another account already uses is rejected.

### Limits

Every publish is checked before anything goes live.

| Limit | Value |
|---|---|
| Uploaded zip | 20 MB |
| One file after extraction | 10 MB |
| All files after extraction | 50 MB |
| Number of files | 5,000 |
| Project name | 100 characters |

We assign your plan when we set up your account. Limits per plan:

| | Free | Starter | Pro |
|---|---|---|---|
| Projects | 1 | 1 | Unlimited |
| Deploys per month | 10 | Unlimited | Unlimited |
| Rollback | No | Yes | Yes |
| Deploy history kept | 3 | 100 | 100 |

The monthly count covers successful and pending deploys in the current UTC month. Failed deploys do not count. Enterprise plans use the same limits as Pro. To change your plan, email hello@docslit.com.

### Files that are not served

Hosting configuration for other platforms is dropped from the upload and never served: `functions/`, `_middleware.*`, `vercel.json`, `_headers`, `_redirects`, `mcp-server.js`, `wrangler.toml`, `netlify.toml`, `.git/` and `.env*` files. DocsLit Cloud does its own content negotiation and hosts its own MCP endpoint, so you do not need them.

## Releases and rollback

Each publish uploads to its own immutable release, then switches a single pointer to it. Visitors see either the old site or the new one, never a half-written site. Sites published before this layout keep working and move over on their next publish.

List and restore deploys with `rollback`:

```bash
docslit rollback my-docs            # choose from a list
docslit rollback my-docs <deploy-id>
docslit rollback my-docs <deploy-id> --yes
```

Rollback asks for confirmation unless you pass `--yes`. These rules apply:

- Your plan must include rollback. The Free plan does not.
- You can restore only successful deploys whose archive is still kept. Only the most recent deploys are kept: 3 on Free, 100 on paid plans.
- The archive is checked again against the current limits, and restoring creates a new deploy rather than rewriting history.

## Commands

<wc-fields header="Cloud commands">
<wc-field name="publish" type="command">
Build if needed, then upload the site.
</wc-field>
<wc-field name="projects" type="command">
List your published projects with URLs and status.
</wc-field>
<wc-field name="whoami" type="command">
Show the account that `DOCSLIT_TOKEN` belongs to and the API URL.
</wc-field>
<wc-field name="rollback &lt;slug&gt; [deploy-id]" type="command">
Restore a project to an earlier deploy.
</wc-field>
<wc-field name="delete &lt;slug&gt;" type="command">
Delete a project and all its files. Asks for confirmation unless you pass `--yes`.
</wc-field>
</wc-fields>

## Built for AI agents

Every site on DocsLit Cloud is ready for AI tools with no extra setup:

- **Hosted MCP endpoint.** `https://{slug}.{base-domain}/mcp` speaks MCP over HTTP with the tools `list_pages`, `get_page`, `search_docs` and `get_docs_overview`. `/.well-known/mcp.json` describes it. No authentication is needed to read published docs.
- **Markdown negotiation.** A request with `Accept: text/markdown` returns the page's Markdown instead of HTML.
- **Agent files.** `llms.txt`, `llms-full.txt`, `.md` pages and `.well-known/agent.json` are served as built.

See [How agents read your site](../ai-and-agents/reading-agents) for the details, and connect a client with the [MCP server](../ai-and-agents/mcp-server) page.

## When to use cloud vs self-hosting

| Feature | DocsLit Cloud | Self-hosting |
|---|---|---|
| Setup | We set it up for you | Varies |
| CI/CD required | No | Yes |
| Hosted MCP endpoint | Built in | Run `docslit mcp <url>` yourself |
| Markdown negotiation | Built in | Needs host middleware |
| Custom domain | Coming soon | Yes |
| Rollback | Paid plans | Manual |
| Cost | Pricing on request | Your hosting cost |

For self-hosting options, see [static hosting](static-hosting).
