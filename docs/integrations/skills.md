---
title: AI Skills
tag: Integrations
readtime: 4 min read
description: Install DocsLit skills into your AI agent so it can write correct docslit markup and migrate existing docs
---

# AI Skills

DocsLit ships two skill files that you can install into AI coding agents. Once installed, the agent knows every `wc-*` component, the correct attribute names, nesting rules, and frontmatter format — so it can write valid DocsLit pages without guessing.

## Available skills

<wc-fields>
<wc-field name="docslit-author" type="skill">
Teaches the agent how to write DocsLit pages from scratch. Covers all 51 web components with syntax, attributes, and nesting rules. Includes the frontmatter schema and `docslit.json` config format.
</wc-field>
<wc-field name="docslit-migrate" type="skill">
Teaches the agent how to convert MDX and Mintlify docs into DocsLit format. Covers the full component mapping, attribute renames, icon conversions, and common pitfalls.
</wc-field>
</wc-fields>

## Installing skills

Skills are Markdown files that live in the [DocsLit GitHub repository](https://github.com/nicholasgousis/docslit-cli/tree/main/skills). Install them by downloading the file and pointing your agent at it.

<wc-tabs>
<wc-tab label="Claude Code">

Add the skill file to your project's `.claude/` directory:

```bash
mkdir -p .claude/skills
curl -o .claude/skills/docslit-author.md https://raw.githubusercontent.com/nicholasgousis/docslit-cli/main/skills/docslit-author.md
curl -o .claude/skills/docslit-migrate.md https://raw.githubusercontent.com/nicholasgousis/docslit-cli/main/skills/docslit-migrate.md
```

Then reference them from your `CLAUDE.md`:

```markdown filename="CLAUDE.md"
Read and follow the instructions in `.claude/skills/docslit-author.md` when writing documentation pages.
Read and follow the instructions in `.claude/skills/docslit-migrate.md` when converting MDX or Mintlify docs.
```

</wc-tab>
<wc-tab label="Cursor">

Add the skill file as a Cursor rule:

```bash
mkdir -p .cursor/rules
curl -o .cursor/rules/docslit-author.mdc https://raw.githubusercontent.com/nicholasgousis/docslit-cli/main/skills/docslit-author.md
curl -o .cursor/rules/docslit-migrate.mdc https://raw.githubusercontent.com/nicholasgousis/docslit-cli/main/skills/docslit-migrate.md
```

Cursor picks up `.mdc` files from the rules directory automatically.

</wc-tab>
<wc-tab label="Windsurf">

Add the skill file as a Windsurf rule:

```bash
curl -o .windsurfrules https://raw.githubusercontent.com/nicholasgousis/docslit-cli/main/skills/docslit-author.md
```

Or append it to an existing `.windsurfrules` file. For migration support, concatenate both skill files.

</wc-tab>
<wc-tab label="Other agents">

Most AI coding agents support a system prompt or rules file. Download the skill Markdown file and include it in whatever mechanism your agent uses for persistent instructions.

The skill files are plain Markdown with no special syntax — they work with any agent that reads instruction files.

</wc-tab>
</wc-tabs>

## Using the authoring skill

Once the authoring skill is installed, your agent can write valid DocsLit pages. Ask it to create pages and it will use the correct components and syntax.

<wc-callout type="tip" title="Be specific about what you want">
The more context you give, the better the output. Instead of "write a page about authentication," try "write a getting started page for our OAuth2 flow with code examples in Python and Node.js, using steps and code groups."
</wc-callout>

### Example prompts

<wc-accordion-group>
<wc-accordion title="Create a new documentation page">

<wc-prompt>
Write a DocsLit page for our REST API authentication flow. Include steps for getting an API key, making a first request, and handling errors. Use code examples in curl, Python, and JavaScript.
</wc-prompt>

The agent will produce a `.md` file with proper frontmatter, `<wc-steps>` for the flow, `<wc-code-group>` for multi-language examples, and `<wc-callout>` blocks for important notes.

</wc-accordion>
<wc-accordion title="Document API endpoints">

<wc-prompt>
Create an API reference page for our /users endpoints. We have GET /users (list), POST /users (create), GET /users/:id (get one), and DELETE /users/:id (delete). Each endpoint needs parameters documented.
</wc-prompt>

The agent will use `<wc-endpoint>`, `<wc-fields>`, and `<wc-field>` components with the correct attributes like `method`, `url`, `type`, and `required`.

</wc-accordion>
<wc-accordion title="Build a landing page with cards">

<wc-prompt>
Create a documentation landing page with a 3-column tile grid linking to our guides: Quick Start, Configuration, Deployment, API Reference, Migration, and Troubleshooting.
</wc-prompt>

The agent will use `<wc-tiles cols="3">` with `<wc-tile>` children, each with `title`, `description`, `href`, and `icon-name` attributes.

</wc-accordion>
</wc-accordion-group>

## Using the migration skill

The migration skill teaches the agent the exact mapping from MDX components to DocsLit `wc-*` components. Point it at your existing docs and let it convert them.

<wc-steps>
<wc-step title="Install the migration skill" n="1">

Follow the installation steps above for your agent.

</wc-step>
<wc-step title="Initialize a DocsLit project" n="2">

Set up a new DocsLit project to receive the converted files:

```bash
npx @docslit/cli init my-docs
```

</wc-step>
<wc-step title="Ask the agent to convert" n="3">

Point the agent at your existing docs directory:

> Convert all the MDX files in ../old-docs/pages/ to DocsLit format. Put the output in docs/. Update docslit.json with the correct sidebar structure.

The agent will handle component conversion, attribute renames, frontmatter normalization, and config generation.

</wc-step>
<wc-step title="Review and validate" n="4">

Run the DocsLit validator to catch any issues:

```bash
npx @docslit/cli validate
```

The validator checks for broken links, unknown components, missing frontmatter, and orphaned files.

</wc-step>
</wc-steps>

<wc-callout type="info" title="Automated import also available">
DocsLit has a built-in `import` command that handles migration programmatically. See the [migration guides](../migration/from-mintlify) for details. The skill is useful when you want AI-assisted migration with more control over the output, or when converting from platforms the import command does not support.
</wc-callout>

### What the migration skill converts

<wc-accordion-group>
<wc-accordion title="Callout components">

MDX callouts like `<Note>`, `<Tip>`, `<Warning>`, `<Danger>`, `<Info>`, `<Check>`, and `<Success>` convert to `<wc-callout>` with the appropriate `type` and `title` attributes.

</wc-accordion>
<wc-accordion title="Card and layout components">

`<Card>` becomes `<wc-card>` with `icon` renamed to `icon-name`. `<CardGroup>` becomes `<wc-tiles>`. `<Columns>` becomes `<wc-columns>` and `<Column>` wrappers are removed.

</wc-accordion>
<wc-accordion title="Navigation components">

`<Tabs>` and `<Tab>` convert to `<wc-tabs>` and `<wc-tab>`, with `title` renamed to `label`. `<Steps>` and `<Step>` convert to `<wc-steps>` and `<wc-step>` with auto-numbering.

</wc-accordion>
<wc-accordion title="API reference components">

`<ParamField>` becomes `<wc-field>` with location attributes (`path`, `query`, `body`, `header`) flattened to `name`. `<ResponseField>` also becomes `<wc-field>`.

</wc-accordion>
<wc-accordion title="Removed or flattened components">

`<Tooltip>` tags are removed but inner text is kept. `<Icon>` tags are removed entirely. `<Snippet>` tags are flattened. These may need manual replacement with DocsLit equivalents.

</wc-accordion>
</wc-accordion-group>

## Keeping skills up to date

The skill files track the latest DocsLit component set. When DocsLit adds new components or changes attributes, update your local copies:

```bash
curl -o .claude/skills/docslit-author.md https://raw.githubusercontent.com/nicholasgousis/docslit-cli/main/skills/docslit-author.md
```

## Next steps

- Learn about [MCP server integration](../writing-content/search-and-seo) for giving agents live access to your docs
- Explore all available [components](../components/callouts-and-alerts)
- Try the built-in [import command](../migration/from-mintlify) for automated migration
