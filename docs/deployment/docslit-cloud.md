---
title: DocsLit Cloud
description: Publish your documentation to DocsLit Cloud with docslit login and docslit publish, with a hosted MCP endpoint, Markdown negotiation, atomic releases, rollback and plan limits.
tag: Deployment
readtime: 8 min read
---

# DocsLit Cloud

DocsLit Cloud is a managed hosting service for your documentation. Build and publish with one command. There is no hosting configuration, no CI/CD to set up and no infrastructure to run. Each site also gets a hosted MCP endpoint for AI agents.

## Get started

<wc-steps>
<wc-step title="Create and verify an account">

Sign up on the DocsLit website and confirm your email address. The CLI cannot create accounts, and an account with an unverified email cannot log in or publish.

</wc-step>
<wc-step title="Log in">

```bash
docslit login
```

The command asks for your email and password. The password is not echoed. It exchanges them for an API token, saves the token to `~/.docslit/config.json`, and prints who you are.

</wc-step>
<wc-step title="Publish">

```bash
docslit publish
```

DocsLit builds your site, compresses it and uploads it. Your docs are live in seconds, and the command prints the URL.

</wc-step>
</wc-steps>

## Log in

<wc-tabs sync="login-mode">
<wc-tab label="Email and password">

```bash
docslit login
docslit login --email you@example.com
```

Interactive login needs a terminal. A wrong email and a wrong password get the same error, so the CLI never reveals whether an account exists. Each login creates a new token labeled `CLI on <your hostname>`. Use `--label "my laptop"` to choose the label.

</wc-tab>
<wc-tab label="Dashboard token">

Create a token in the dashboard under API Tokens, then store it:

```bash
docslit login --token <token>
```

The CLI checks the token with the server before it saves it.

</wc-tab>
<wc-tab label="CI">

Set `DOCSLIT_TOKEN` and skip the login step entirely:

```yaml filename=".github/workflows/publish.yml"
- run: npx docslit publish
  env:
    DOCSLIT_TOKEN: ${{ secrets.DOCSLIT_TOKEN }}
```

</wc-tab>
</wc-tabs>

Credentials are read in this order: the `DOCSLIT_TOKEN` environment variable, then the stored `~/.docslit/config.json`. When `DOCSLIT_TOKEN` is set, `docslit whoami` says so.

`docslit logout` deletes the stored config and revokes that token on the server, so a copied config file stops working. It does not unset `DOCSLIT_TOKEN`.

<wc-fields header="Login options and environment variables">
<wc-field name="--email" type="string">
Skip the email prompt.
</wc-field>
<wc-field name="--token" type="string">
Store a token that you created in the dashboard instead of prompting for a password.
</wc-field>
<wc-field name="--label" type="string">
The label for the new token. Default: `CLI on <hostname>`.
</wc-field>
<wc-field name="--api-url" type="string">
The API base URL. Default: `https://docslit.com/api`. It must use `https`, except for `localhost`.
</wc-field>
<wc-field name="DOCSLIT_TOKEN" type="env">
An API token. It takes priority over the stored login and works in non-interactive environments.
</wc-field>
<wc-field name="DOCSLIT_API_URL" type="env">
Overrides the API base URL for every cloud command.
</wc-field>
</wc-fields>

<wc-callout type="info" title="Where tokens are stored">
The config file is `~/.docslit/config.json`, in a folder only you can access, with file mode `0600`. Tokens are never written to your project directory. An account can hold up to 25 tokens, so revoke ones you no longer use.
</wc-callout>

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

Limits per plan:

| | Free | Starter | Pro |
|---|---|---|---|
| Projects | 1 | 1 | Unlimited |
| Deploys per month | 10 | Unlimited | Unlimited |
| Rollback | No | Yes | Yes |
| Deploy history kept | 3 | 100 | 100 |

The monthly count covers successful and pending deploys in the current UTC month. Failed deploys do not count. Enterprise plans use the same limits as Pro.

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
<wc-field name="login" type="command">
Authenticate with your email and password, or with `--token`.
</wc-field>
<wc-field name="logout" type="command">
Remove the stored credentials and revoke the token.
</wc-field>
<wc-field name="publish" type="command">
Build if needed, then upload the site.
</wc-field>
<wc-field name="projects" type="command">
List your published projects with URLs and status.
</wc-field>
<wc-field name="whoami" type="command">
Show the authenticated user, API URL and token source.
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
| Setup time | Instant | Varies |
| CI/CD required | No | Yes |
| Hosted MCP endpoint | Built in | Run `docslit mcp <url>` yourself |
| Markdown negotiation | Built in | Needs host middleware |
| Custom domain | Coming soon | Yes |
| Rollback | Paid plans | Manual |
| Cost | Managed pricing | Your hosting cost |

For self-hosting options, see [static hosting](static-hosting).
