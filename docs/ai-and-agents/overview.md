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

<wc-callout type="warning" title="Attribute checks live in the MCP server">
`docslit validate` flags unknown `wc-*` tags, but it does not check attribute names or values. The MCP tool `check_markup` does, and so do `create_page` and `update_page`. Without MCP, check each attribute you use with `docslit components <tag> --json`.
</wc-callout>

## Pick an interface

<wc-tiles cols="2">
<wc-tile icon-name="link" title="MCP server" description="Typed tools, resources and prompts for Claude, Cursor, VS Code and any MCP client." href="mcp-server"></wc-tile>
<wc-tile icon-name="file" title="Agent setup" description="One command writes AGENTS.md, Claude skills, editor rules and MCP config." href="agent-setup"></wc-tile>
<wc-tile icon-name="terminal" title="Machine-readable CLI" description="JSON output for components, schemas, validation, lint and page creation." href="machine-readable-cli"></wc-tile>
<wc-tile icon-name="globe" title="How agents read your site" description="llms.txt, Markdown URLs, content negotiation and a hosted MCP endpoint." href="reading-agents"></wc-tile>
</wc-tiles>

| Situation | Use |
|---|---|
| Your agent supports MCP and you want the shortest path | [MCP server](mcp-server): `npx docslit mcp` |
| Your agent reads instruction files (Claude Code, Cursor, Copilot, Windsurf, Codex, Gemini) | [`docslit agents init`](agent-setup) |
| Your agent runs shell commands, or you want to script checks in CI | [Machine-readable CLI](machine-readable-cli) |
| You want an agent to answer questions from published docs | [Reader mode](mcp-server#reader-mode) |

## What a published site exposes

Every `docslit build` also produces files for reading agents:

- `llms.txt` and `llms-full.txt` for the page index and the full text
- a `.md` file next to every page
- `.well-known/agent.json` listing those endpoints
- `search-index.json` for search
- `mcp-server.js`, a standalone MCP server over stdio

Sites on [DocsLit Cloud](../deployment/docslit-cloud) also get a hosted MCP endpoint and `Accept: text/markdown` negotiation with no extra setup. [How agents read your site](reading-agents) covers each file.

## Get started in two commands

```bash
npx docslit agents init
npx docslit mcp --print-config claude
```

The first writes `AGENTS.md` and any tool files it detects. The second prints the MCP server config to paste into your client.
