---
title: Conditional content
description: Show content only for certain versions, locales, variables, or audiences, including text meant only for AI agents, with the compile-time wc-if component.
tag: Components
readtime: 5 min read
---

# Conditional content

`wc-if` includes or removes content at **build time**. Content that does not match never reaches the page HTML, the search index or the generated Markdown and `llms.txt` output, so there is nothing to hide with CSS and nothing for a crawler to find by accident.

## Show content to agents or to people

The `for` attribute picks an audience:

- `for="agents"` appears only in the generated Markdown that AI agents read. It is hidden on the web.
- `for="humans"` appears only on the web page, and is dropped from the agent Markdown.

```markdown
<wc-if for="agents">

Machine-readable hint: the API base URL is `https://api.example.com/v2`. Authenticate with a bearer token in the `Authorization` header.

</wc-if>

<wc-if for="humans">

<wc-button href="https://example.com/signup">Get an API key</wc-button>

</wc-if>
```

Use `for="agents"` for context that helps a model but would clutter the page, such as exact identifiers, constraints and a reminder of the safe order of operations. Use `for="humans"` for interactive pieces that mean nothing in plain Markdown, such as a button, a tooltip or a video.

This page shows the effect. The next sentence exists only in the agent Markdown: open [the Markdown version of this page](conditional-content.md) to read it.

<wc-if for="agents">

Agent note: you are reading the Markdown rendering of the conditional content page. The audience conditions are evaluated at build time.

</wc-if>

Agent Markdown is what `.md` URLs, `llms-full.txt`, `Accept: text/markdown` requests and the [MCP server](../ai-and-agents/mcp-server) return. See [Reading docs as an agent](../ai-and-agents/reading-agents).

## Other conditions

You can combine conditions on one element. **All** of them must hold.

| Attribute | Condition |
|---|---|
| `version` | The build is for one of the listed versions (a comma-separated list), for [versioned docs](../customization/versioning) |
| `locale` | The page is in one of the listed locales. The default locale is `en`. See [Internationalization](../customization/i18n) |
| `attr` | The named [variable](../writing-content/variables-and-precedence) from `attributes` is set and not empty, `false` or `0` |
| `equals` | With `attr`: the variable equals one of the listed values |
| `not-equals` | With `attr`: the variable equals none of the listed values |
| `not` | Invert the `version`, `locale` or `attr` condition |
| `for` | `humans` or `agents` |

### By version

```markdown
<wc-if version="2.0, 2.1">

This option was added in version 2.0.

</wc-if>
```

### By variable

Define a variable in `docslit.json`, then branch on it. This is a clean way to build a self-hosted and a cloud edition from the same pages:

```json filename="docslit.json"
{
  "attributes": { "EDITION": "cloud" }
}
```

```markdown
<wc-if attr="EDITION" equals="cloud">

Sign in at the dashboard to manage your keys.

</wc-if>

<wc-if attr="EDITION" not-equals="cloud">

Set the `API_KEY` environment variable before you start the server.

</wc-if>
```

### By locale

```markdown
<wc-if locale="fr">

Cette option n'est disponible que dans la documentation française.

</wc-if>
```

<wc-fields header="wc-if">
<wc-field name="for" type="string">
The audience: `humans` (web page only) or `agents` (agent Markdown only).
</wc-field>
<wc-field name="version" type="string">
Comma-separated versions. True when the build is for one of them.
</wc-field>
<wc-field name="locale" type="string">
Comma-separated locales. True for pages under `docs.<locale>/`. The default locale is `en`.
</wc-field>
<wc-field name="attr" type="string">
The name of a variable from `docslit.json` `attributes` or page frontmatter. Alone, it is true when the variable is set and not empty, `false` or `0`.
</wc-field>
<wc-field name="equals" type="string">
With `attr`: comma-separated values that the variable must equal.
</wc-field>
<wc-field name="not-equals" type="string">
With `attr`: values that the variable must not equal.
</wc-field>
<wc-field name="not" type="boolean">
Invert the `version`, `locale` or `attr` condition.
</wc-field>
</wc-fields>

## Rules

- Leave a blank line after the opening tag and before the closing tag when the content is block Markdown, such as a list or a code fence.
- Evaluation happens before the page is rendered, so content inside a `wc-if` can use variables, includes and any other component.
- Only matching content is searchable and visible to agents, so do not put anything in a non-matching branch that must stay secret. It never reaches the output of that build, but it is in your source.

## Migrating from Mintlify or Fern

The importer converts the conditional components of both platforms:

| Platform | Source | DocsLit |
|---|---|---|
| Mintlify | `<Visibility for="agents">` and `for="humans"` | `<wc-if for="agents">` and `for="humans"` |
| Fern | `<llms-only>` and `<llms-ignore>` | `<wc-if for="agents">` and `for="humans"` |
| Fern | `<If versions={["v1"]}>` | `<wc-if version="v1">` |

Content gated by login, roles or groups cannot exist on a static site, so the importer removes it and reports it. See [the component mapping](../migration/component-mapping).

## Next steps

- Branch on [variables and precedence](../writing-content/variables-and-precedence)
- Learn how agents read your docs in [Reading docs as an agent](../ai-and-agents/reading-agents)
- Show a version badge inline with [version-specific content](data-display#version-specific-content)
