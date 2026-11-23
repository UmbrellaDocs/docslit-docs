---
title: Built for AI agents
description: How DocsLit lets AI tools write, check and read documentation - a machine-readable authoring loop, an MCP server, and agent-friendly published sites.
tag: AI and agents
readtime: 5 min read
---

# Built for AI agents

DocsLit is designed to be the documentation platform that AI tools generate docs with. An agent can learn the whole component set from the CLI, write a page, check it, and fix what the checks report, all without guessing and without a browser. A published site is just as easy for an agent to read.

Everything on this page is open source and runs locally. DocsLit does not call a language model itself. It gives your agent accurate reference data and strict, machine-readable feedback.

## The authoring loop

Agents write better docs when they can look things up and get precise errors back. DocsLit gives them four steps:

<wc-steps>
<wc-step title="Discover components and config">

Ask the CLI instead of relying on training data. The component list is generated from the same manifest the validators use.

```bash
docslit components --json          # every wc-* component
docslit components wc-tabs --json  # attributes, nesting, a working example
docslit schema                     # JSON Schema for docslit.json
docslit schema frontmatter         # JSON Schema for page frontmatter
```

</wc-step>
<wc-step title="Create and write the page">

`docslit new` never prompts and can print JSON, so an agent can script it.

```bash
docslit new guides/webhooks --title "Webhooks" \
  --description "How to receive and verify webhook events." \
  --group "Guides" --json
```

```json
{
  "id": "guides/webhooks",
  "file": "docs/guides/webhooks.md",
  "sidebarUpdated": true,
  "group": "Guides"
}
```

The agent then writes the Markdown in `docs/guides/webhooks.md`.

</wc-step>
<wc-step title="Check it as JSON">

`validate` answers "is it broken?" and `lint` answers "is it good?". Both print one JSON document with stable issue codes, a line number and a suggested fix.

```bash
docslit validate --format json
docslit lint --format json
```

</wc-step>
<wc-step title="Fix and repeat">

The agent edits the file at the reported `file` and `line`, then runs both commands again until `ok` is `true`. Both commands exit with code 1 when they find errors, so the loop is easy to script.

</wc-step>
</wc-steps>

See [Machine-readable CLI](machine-readable-cli) for real output and the full list of issue codes.

<wc-callout type="info" title="Attribute checks">
`docslit validate` flags unknown `wc-*` tags, unknown attributes, invalid attribute values, missing required attributes, bad nesting and unclosed tags. The MCP tool `check_markup` runs the same checks on a snippet before you write it, and `create_page` and `update_page` run them on what they write. Check an attribute you are unsure of with `docslit components <tag> --json`.
</wc-callout>

## Pick an interface

<wc-tiles cols="2">
<wc-tile icon="link" title="MCP server" description="Typed tools, resources and prompts for Claude, Cursor, VS Code and any MCP client." href="mcp-server"></wc-tile>
<wc-tile icon="file" title="Agent setup" description="One command writes AGENTS.md, Claude skills, editor rules and MCP config." href="agent-setup"></wc-tile>
<wc-tile icon="terminal" title="Machine-readable CLI" description="JSON output for components, schemas, validation, lint and page creation." href="machine-readable-cli"></wc-tile>
<wc-tile icon="globe" title="How agents read your site" description="llms.txt, Markdown URLs, content negotiation and a hosted MCP endpoint." href="reading-agents"></wc-tile>
</wc-tiles>

| Situation | Use |
|---|---|
| Your agent supports MCP and you want the shortest path | [MCP server](mcp-server): `npx docslit mcp` |
| Your agent reads instruction files (Claude Code, Cursor, Copilot, Windsurf, Codex, Gemini) | [`docslit agents init`](agent-setup) |
| Your agent runs shell commands, or you want to script checks in CI | [Machine-readable CLI](machine-readable-cli) |
| You want an agent to answer questions from published docs | [Reader mode](mcp-server#reader-mode) |
| You are moving docs over from Mintlify, Fern, GitBook or MkDocs | [Migrate with your AI agent](../migration/migrate-with-ai): `docslit import`, then the MCP tool `convert_mdx` |

## What a published site exposes

Every `docslit build` also produces files for reading agents:

- `llms.txt` and `llms-full.txt` for the page index and the full text
- a `.md` file next to every page
- `.well-known/agent.json` listing those endpoints
- `search-index.json` for search
- `mcp-server.js`, a standalone MCP server over stdio

Sites on [DocsLit Cloud](../deployment/docslit-cloud) also get a hosted MCP endpoint and `Accept: text/markdown` negotiation with no extra setup. [How agents read your site](reading-agents) covers each file.

## Write for agents and people differently

Some context helps a model but would clutter the page for a person, and some page elements mean nothing in plain Markdown. The `wc-if` component includes content only for agents (`for="agents"`) or only for people (`for="humans"`), decided at build time. See [Conditional content](../components/conditional-content).

The MCP server also knows your look and your migration path. `get_project_info` reports the current theme and the available themes and palettes, so an agent can change them with `docslit theme use`, and `convert_mdx` converts a Mintlify, Fern, GitBook or MkDocs page without writing anything.

## Get started in two commands

```bash
npx docslit agents init
npx docslit mcp --print-config claude
```

The first writes `AGENTS.md` and any tool files it detects. The second prints the MCP server config to paste into your client.
