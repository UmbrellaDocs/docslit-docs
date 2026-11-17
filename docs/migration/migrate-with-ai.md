---
title: Migrate with your AI agent
description: Let an AI coding agent run the DocsLit importer, work through the migration report, and convert pages one at a time with the convert_mdx MCP tool.
tag: Migration
readtime: 6 min read
---

# Migrate with your AI agent

DocsLit is built for AI agents, and that includes the move to DocsLit. The importer does the mechanical conversion in one command, and an agent can finish the rest, because everything that needs a human is a precise, machine-readable item: a file, a line, what was done instead and how to fix it.

There are two ways to involve an agent. Use the first for a whole project, and the second when you move content a page at a time.

## Let the agent run the importer

<wc-steps>
<wc-step title="Give the agent the migration skill">

`docslit agents init` writes an `AGENTS.md` and, for Claude Code, a `docslit-migrate` skill. To see the skill, or to paste it into a tool that takes a system prompt, print it:

```bash
docslit agents print migrate
```

The skill tells the agent to run the importer first, read the report and fix only what the report lists. See [Agent setup](../ai-and-agents/agent-setup).

</wc-step>
<wc-step title="Start from a dry run">

A dry run costs nothing and shows the agent the size of the job as JSON:

```bash
docslit import ./my-docs --dry-run --json
```

</wc-step>
<wc-step title="Run the import and fix the report">

```bash
docslit import ./my-docs --out ./docs-site --json
cd docs-site
docslit validate --strict
docslit lint
```

The agent works through `items` in order, errors first, and re-runs `docslit validate` after each fix. The [import reference](import-reference#issue-codes) lists every code and the usual fix.

</wc-step>
</wc-steps>

Paste this prompt into your agent, with your source folder in place of `./my-docs`:

<wc-prompt title="Migrate my docs to DocsLit" actions="claude,chatgpt">
Migrate the documentation in ./my-docs to DocsLit. First run `docslit import ./my-docs --out ./docs-site --json` and read the report. Work through every item in `items`, errors first, then warnings. For each one, open the file at the line given, apply the `fix`, and keep all content, code samples and links. Never invent a wc-* component or attribute: run `docslit components <tag> --json` to check. Replace every "Unconverted component" callout with real content. When done, run `docslit validate --strict` and `docslit lint` in ./docs-site until both are clean, and summarize what you changed and anything you could not convert.
</wc-prompt>

## Convert one page with convert_mdx

When you want an agent to move pages individually, for example while you review each one, use the MCP tool `convert_mdx`. It runs the importer's converter on a single page or snippet **without writing anything**, so the agent stays in control of what lands in the project.

Connect the server in your project with [`docslit mcp`](../ai-and-agents/mcp-server#connect-your-client). The tool takes:

<wc-fields header="convert_mdx arguments">
<wc-field name="source" type="string" required>
The page source, with its frontmatter if it has any.
</wc-field>
<wc-field name="from" type="string" default="mintlify">
The source platform: `mintlify`, `fern` or `gitbook`. Fern adds the default code line numbers and Fern-only components, and `gitbook` converts `{% %}` blocks.
</wc-field>
</wc-fields>

For example, an agent sends a Mintlify page with a callout and a component DocsLit does not know:

```json
{
  "name": "convert_mdx",
  "arguments": {
    "from": "mintlify",
    "source": "---\ntitle: Hi\n---\n\n<Note>Hello</Note>\n\n<Frobnicate x=\"1\" />"
  }
}
```

The tool returns the converted page and a list of issues. This is the real response, shortened:

```json
{
  "markdown": "---\ntitle: Hi\n---\n\n<wc-callout type=\"note\">\n\nHello\n\n</wc-callout>\n\n<wc-callout type=\"warning\" title=\"Unconverted component: Frobnicate\">\n\nProps: x. Replace this placeholder.\n\n</wc-callout>\n",
  "frontmatter": { "title": "Hi" },
  "issues": [
    {
      "severity": "error",
      "code": "unknown-component",
      "line": 7,
      "component": "Frobnicate",
      "message": "Component <Frobnicate> is not a known Mintlify/Fern component and has no DocsLit equivalent.",
      "action": "Replaced with a warning callout marked \"Unconverted component\".",
      "fix": "Replace the callout with the intended content, or build a DocsLit custom component (components/frobnicate.js)."
    }
  ],
  "components": [
    { "from": "Frobnicate", "to": "(replaced)", "count": 1 },
    { "from": "Note", "to": "wc-callout", "count": 1 }
  ],
  "reusables": [],
  "markup": { "ok": true, "summary": { "errors": 0, "warnings": 0 }, "issues": [] }
}
```

| Field | Contents |
|---|---|
| `markdown` | The full converted page, frontmatter included |
| `frontmatter`, `body` | The same, split |
| `issues` | Each item has `severity`, `code`, `line`, `component`, `message`, `action` and `fix`. Unknown components are never dropped. They stay in a marked callout. |
| `components` | What each source component became, with counts |
| `reusables` | Snippets the page needs, as `{ path, content }` to save under `docs/_reusables/` |
| `markup` | The result of `check_markup` over the converted page |

The recommended loop for one page is:

1. Call `convert_mdx` with the page source.
2. Apply each `fix` in `issues`, starting with errors.
3. Call `check_markup` on the result until it is clean.
4. Call `create_page`, which adds the page to the sidebar, and then `validate` with `page` set.
5. Save any `reusables` the page referenced.

The MCP prompt `migrate-page` packages this loop. In clients that show prompts as slash commands, run it with the page as `source`. See [Prompts](../ai-and-agents/mcp-server#prompts).

## Tips for better results

- **Run the importer first.** Even for single pages, the importer's conversion is deterministic and checked, and an agent's hand conversion is not.
- **Let the agent check attributes.** `docslit components <tag> --json` and the `get_component` tool show the real attributes. Invented attributes are the most common mistake.
- **Keep the report open.** `MIGRATION.md` is the to-do list, and deleting items as they are fixed shows progress.
- **Review the config by eye.** Navigation, branding and redirects are mapped mechanically. A human should look at the first page of every tab.
- **Finish with the quality checks.** `docslit validate --strict` for correctness, `docslit lint` for quality, and `docslit agents init` so the agent that migrated the docs can keep maintaining them.

## Next steps

- Read the platform guide: [Mintlify](from-mintlify), [Fern](from-fern) or [GitBook](from-gitbook)
- Look up any code in the [import reference](import-reference)
- Set up the MCP server in [MCP server](../ai-and-agents/mcp-server)
