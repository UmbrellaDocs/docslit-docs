---
title: MCP server
description: Run docslit mcp to give an AI agent tools to write and validate pages in your project, or to read and search any published DocsLit site.
tag: AI and agents
readtime: 7 min read
---

# MCP server

`docslit mcp` starts a [Model Context Protocol](https://modelcontextprotocol.io) server over stdio. It has two modes:

| Mode | Command | What it does |
|---|---|---|
| Authoring | `docslit mcp` | Tools, resources and prompts to write, check and edit pages in a DocsLit project |
| Reader | `docslit mcp <url>` | Read-only access to a published DocsLit site: overview, page list, search and page Markdown |

The server needs Node.js 20.19 or later. In authoring mode it only reads and writes files in your project. It writes only JSON-RPC to stdout and sends its own log lines to stderr, so it is safe to wrap in any MCP client.

## Connect your client

Run the server with `npx` so there is nothing to install. `docslit mcp --print-config` prints a ready-to-paste config for a client: `claude`, `cursor` or `vscode`.

<wc-tabs sync="mcp-client">
<wc-tab label="Claude Code">

Add a `.mcp.json` file to your project root. `docslit agents init --tool claude` writes it for you.

```bash
docslit mcp --print-config claude
```

```json filename=".mcp.json"
{
  "mcpServers": {
    "docslit": {
      "command": "npx",
      "args": [
        "-y",
        "docslit",
        "mcp"
      ]
    }
  }
}
```

</wc-tab>
<wc-tab label="Claude Desktop">

Add the same `mcpServers` entry to `claude_desktop_config.json`. Claude Desktop does not start in your project folder, so point the server at it with `--dir`:

```json filename="claude_desktop_config.json"
{
  "mcpServers": {
    "docslit": {
      "command": "npx",
      "args": ["-y", "docslit", "mcp", "--dir", "/absolute/path/to/my-docs"]
    }
  }
}
```

Restart Claude Desktop to load the server.

</wc-tab>
<wc-tab label="Cursor">

Add `.cursor/mcp.json` to your project. `docslit agents init --tool cursor` writes it for you.

```bash
docslit mcp --print-config cursor
```

```json filename=".cursor/mcp.json"
{
  "mcpServers": {
    "docslit": {
      "command": "npx",
      "args": [
        "-y",
        "docslit",
        "mcp"
      ]
    }
  }
}
```

</wc-tab>
<wc-tab label="VS Code">

VS Code uses a `servers` key and a `type` field. `docslit agents init --tool copilot` writes `.vscode/mcp.json` for you.

```bash
docslit mcp --print-config vscode
```

```json filename=".vscode/mcp.json"
{
  "servers": {
    "docslit": {
      "type": "stdio",
      "command": "npx",
      "args": [
        "-y",
        "docslit",
        "mcp"
      ]
    }
  }
}
```

</wc-tab>
<wc-tab label="Other clients">

Any client that can launch a stdio server works. Use `npx` as the command and `-y docslit mcp` as the arguments. Windsurf, Codex and Gemini keep MCP settings at the user level, so `docslit agents init` does not write them. Add the server in each tool's own settings.

</wc-tab>
</wc-tabs>

## Authoring mode

Start the server in a project folder, or pass `--dir <path>`:

```bash
docslit mcp
docslit mcp --dir ../my-docs
```

Without a `docslit.json`, the reference tools (`list_components`, `get_component`, `get_authoring_guide`, `get_schema`, `check_markup`) still work. `get_project_info` explains how to create a project, and the other tools return an error that says the same.

An agent should call `get_project_info` first. It returns the site name, the sidebar tree, enabled features, custom components and a short `howToWork` list. The server also sends instructions at initialization that tell the agent to follow that list.

### Tool reference

| Tool | Arguments | Description |
|---|---|---|
| `get_project_info` | none | Start here. Site name, sidebar tree, page count, versions, i18n, features, the current theme and the available themes and palettes, custom components |
| `list_pages` | none | Every page with `id`, `title`, `description`, `group`, `file` and `inSidebar` |
| `read_page` | `page` | Raw Markdown of one page, with frontmatter |
| `search_docs` | `query`, `limit` (1 to 25, default 8) | Ranked search over the project's source pages, with section, line number and snippet |
| `list_components` | `category` (optional) | Built-in `wc-*` tags with a one-line description |
| `get_component` | `tag` | Attributes, content model, allowed parents and children, and an example |
| `get_authoring_guide` | `topic` | One of `overview`, `frontmatter`, `config`, `components`, `reusables`, `openapi` |
| `get_schema` | `kind` | `config` for `docslit.json` or `frontmatter`: the full JSON Schema |
| `create_page` | `id`, `title`, `content`; optional `description`, `group`, `position` | Create `docs/<id>.md` and add it to the sidebar. Refuses to overwrite |
| `update_page` | `page`, then `content`, or `old_string` with `new_string`, or `frontmatter` | Edit an existing page. A targeted edit must match exactly once |
| `validate` | `page`, `strict` (both optional) | Run the validator and, when available, the linter. Returns issues with code, line and fix |
| `check_markup` | `markdown` | Check a snippet without writing it: unknown tags and attributes, invalid values, nesting, unclosed tags |
| `convert_mdx` | `source`, `from` (optional: `mintlify`, `fern` or `gitbook`) | Convert one Mintlify, Fern or GitBook page or snippet into DocsLit Markdown without writing anything. Returns the Markdown, the `issues` that need a human and the components converted. See [Migrate with your AI agent](../migration/migrate-with-ai) |
| `preview_page` | `page`, `html` (optional) | Render through the real pipeline and return the heading outline, components used and word count |

Five behaviors are worth knowing:

- `create_page` and `update_page` return the markup and validation issues for the page they just wrote, so the agent can fix them in the next call.
- `create_page` leaves an autogenerated sidebar alone. For an explicit sidebar it adds the page to `group`, creating the group if needed, and puts it at `position`.
- Page ids are paths under `docs/` without an extension. Ids that contain `..`, start with `/` or resolve outside `docs/` are rejected.
- Failures a tool expects, such as an unknown page, return `isError: true` with a message. Malformed requests return JSON-RPC error codes.
- `check_markup` checks a snippet before you write it. `validate` runs the same component checks over every page, so unknown attributes, invalid values and bad nesting show up there too, with the same issue codes.

Here is `check_markup` catching three mistakes in a snippet. The agent sends:

```json
{
  "name": "check_markup",
  "arguments": {
    "markdown": "<wc-callout type=\"tipp\">Hi</wc-callout>\n<wc-step>x</wc-step>"
  }
}
```

The tool returns this JSON in the text content. All three problems are warnings, so `ok` stays `true`, and each carries a `fix` the agent can apply:

```json
{
  "ok": true,
  "summary": { "errors": 0, "warnings": 3 },
  "issues": [
    {
      "level": "warning",
      "code": "invalid-attribute-value",
      "message": "<wc-callout type=\"tipp\"> is not valid. Allowed: info, tip, warning, error, danger, success, check, note, launch. Did you mean \"tip\"?",
      "line": 1,
      "tag": "wc-callout",
      "attribute": "type",
      "suggestion": "tip",
      "fix": "Use type=\"tip\"."
    },
    {
      "level": "warning",
      "code": "missing-required-attribute",
      "message": "<wc-step> requires the \"title\" attribute.",
      "line": 2,
      "tag": "wc-step",
      "attribute": "title",
      "fix": "Add title=\"...\" to <wc-step>."
    },
    {
      "level": "warning",
      "code": "invalid-parent",
      "message": "<wc-step> must be placed inside <wc-steps>.",
      "line": 2,
      "tag": "wc-step",
      "fix": "Wrap it in <wc-steps>."
    }
  ],
  "componentsUsed": { "wc-callout": 1, "wc-step": 1 }
}
```

### Resources

Resources let a client attach reference material without a tool call.

| URI | Content |
|---|---|
| `docslit://guide` | The authoring guide, all topics joined |
| `docslit://components` | Every component with its attributes |
| `docslit://schema/config` | JSON Schema for `docslit.json` |
| `docslit://schema/frontmatter` | JSON Schema for page frontmatter |
| `docslit://page/{id}` | Source Markdown of one page. Every page in the project is listed |

### Prompts

Prompts are reusable task templates. A client shows them as slash commands or similar.

| Prompt | Arguments | Task |
|---|---|---|
| `write-page` | `topic` (required), `audience` | Research the project, draft, check and create a new page |
| `document-api-endpoint` | `endpoint` (required), `details` | Write an API reference page with `wc-endpoint` and `wc-fields` |
| `review-page` | `page` (required) | Review a page for accuracy and conventions, then optionally fix it |
| `migrate-page` | `source` (required), `id` | Convert a page from another docs system into DocsLit markup. The prompt tells the agent to start with `convert_mdx` |

## Reader mode

Pass the URL of the site root to let an agent read and search a published DocsLit site. It works with any site that serves `llms.txt` or `.well-known/agent.json`, including your own, DocsLit Cloud sites and the [DocsLit docs](https://docs.docslit.com).

```bash
docslit mcp https://docs.docslit.com
docslit mcp --print-config claude https://docs.docslit.com
```

```json
{
  "mcpServers": {
    "docslit": {
      "command": "npx",
      "args": [
        "-y",
        "docslit",
        "mcp",
        "https://docs.docslit.com"
      ]
    }
  }
}
```

Reader mode exposes four read-only tools:

| Tool | Arguments | Description |
|---|---|---|
| `get_docs_overview` | `version` (optional) | The site's `llms.txt` with name, description and versions. Call this first |
| `list_pages` | `version` | Every page with `slug`, `title`, `description` and `group` |
| `get_page` | `slug`, `version` | Full Markdown of one page. Absolute URLs are rejected |
| `search_docs` | `query`, `limit` (1 to 25, default 8), `version` | Ranked pages with a section and a snippet. Uses `search-index.json`, falling back to `llms-full.txt` |

For versioned sites the `version` argument defaults to `default_version` from `.well-known/agent.json`.

The reader only fetches paths under the URL you give it. It refuses absolute URLs, `..` segments and redirects to another host, caps responses at 8 MB, and caches results for 60 seconds.

<wc-callout type="info" title="Hosted MCP on DocsLit Cloud">
Sites published to [DocsLit Cloud](../deployment/docslit-cloud) already serve an MCP endpoint over HTTP at `/mcp`. Clients that speak Streamable HTTP can connect to it directly. You only need reader mode for clients that launch stdio servers.
</wc-callout>

## The generated mcp-server.js

`docslit build` also writes a standalone `mcp-server.js` at the root of the output folder. It reads the built `.md` files and `search-index.json`, needs only Node.js, and offers `list_pages`, `get_page` and `search_docs`. Run it with `node dist/mcp-server.js`.

It speaks newline-delimited JSON-RPC, the standard MCP stdio framing, and accepts protocol versions 2025-11-25, 2025-06-18, 2025-03-26 and 2024-11-05.

<wc-callout type="info" title="Versioned sites">
In a build that uses `versions`, the Markdown files and search index live in a folder per version. The generated server knows this: every tool takes an optional `version` argument and defaults to the version you marked as `default` in `docslit.json`. Pages that a version shares with the default version are read from the default version's folder. An unknown `version` returns an error that lists the available ones.
</wc-callout>

## Troubleshooting

<wc-accordion-group>
<wc-accordion title="The client shows no tools">

Run `npx docslit mcp` in a terminal. You should see `[docslit-mcp] ready (authoring)` on stderr and the process waiting for input. If `npx` is not found by the client, use the full path to `npx` as the command.

</wc-accordion>
<wc-accordion title="Tools say there is no docslit.json">

The client started the server outside your project. Add `--dir /absolute/path/to/project` to the arguments.

</wc-accordion>
<wc-accordion title="Reader mode says the site does not look like a DocsLit site">

Pass the site root, such as `https://docs.example.com`, not a page URL. The root must serve `llms.txt` or `.well-known/agent.json`.

</wc-accordion>
</wc-accordion-group>

## Next steps

- Set up instruction files for your agent with [Agent setup](agent-setup)
- Script the same checks from a shell with the [Machine-readable CLI](machine-readable-cli)
