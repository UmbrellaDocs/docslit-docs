---
title: Contextual menu
description: Configure the Copy page menu on every page, with options to copy Markdown, open the page in an AI assistant, copy an MCP install command, or run a custom link.
tag: Customization
readtime: 4 min read
---

# Contextual menu

The **Copy page** button in every page header is a split button with a dropdown. It is how readers hand a page to an AI assistant: copy it as Markdown, open it in ChatGPT or Claude, or install the site's MCP server. You choose which options appear, in which order, and you can add your own links.

## Choose the options

Set `contextual` in `docslit.json` to a list. The first option is the main button, and the rest fill the dropdown:

```json filename="docslit.json"
{
  "url": "https://docs.example.com",
  "contextual": ["copy", "view-markdown", "claude", "chatgpt", "mcp"]
}
```

| Option | What it does | Needs `url` |
|---|---|---|
| `copy` | Copies the page as Markdown | No |
| `view-markdown` | Opens the page's `.md` source in a new tab | No |
| `chatgpt` | Opens ChatGPT with a prompt that points at the published page | Yes |
| `claude` | Opens Claude with a prompt that points at the published page | Yes |
| `perplexity` | Opens Perplexity with a prompt that points at the published page | Yes |
| `mcp` | Copies an `npx` command that installs the site's [MCP server](../ai-and-agents/mcp-server) | Yes |

The assistant options link to the published page, so they need `url` in `docslit.json`. Without it they are left out. The spellings `copy-page`, `view`, `view-as-markdown`, `markdown` and `add-mcp` are accepted as aliases.

If you do not set `contextual`, readers get `copy`, `chatgpt`, `claude` and `mcp`.

## Add a custom option

A custom option is an object with a `title` and an `href`. Add a `description` and an `icon` if you like:

```json filename="docslit.json"
{
  "contextual": [
    "copy",
    "claude",
    {
      "title": "Open in Linear",
      "description": "Create an issue about this page",
      "icon": "link",
      "href": "https://linear.app/new?title={title}&description={url}"
    }
  ]
}
```

The `href` can use these placeholders, which are URL-encoded for you:

| Placeholder | Value |
|---|---|
| `{url}` | The published URL of the page |
| `{markdown_url}` | The URL of the page's Markdown source |
| `{title}` | The page title |
| `{path}` | The page path, such as `/guides/install` |

The `icon` takes any [icon](../components/icons). When you omit it, a link icon is used. Links that start with `http` open in a new tab.

## Change it for one page

A page can replace the menu with its own `contextual` list in frontmatter:

```yaml
---
title: Install
contextual:
  - view-markdown
  - claude
---
```

Use `contextual: false` to remove the menu from a page, or `hide_actions: true`, which also hides the rest of the page actions.

```yaml
---
title: Pricing
contextual: false
---
```

## Turn it off everywhere

```json filename="docslit.json"
{
  "contextual": false
}
```

The object form `{ "options": [...] }` is accepted too.

## Check the configuration

`docslit validate` reports an unknown option name or a custom option without a `title` or `href` as `contextual-option-invalid`, and tells you which entry to fix.

## Next steps

- Let agents read your docs directly with the [MCP server](../ai-and-agents/mcp-server)
- See how agents consume Markdown in [Reading docs as an agent](../ai-and-agents/reading-agents)
- Adjust the rest of the page header in [Page layout](page-layout)
