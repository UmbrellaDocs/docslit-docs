---
title: Markdown basics
tag: Writing
readtime: 4 min read
---

# Markdown basics

DocsLit uses standard GitHub Flavored Markdown (GFM) with one superpower: you can drop web components directly into your Markdown without imports or configuration.

## Text formatting

```markdown
**Bold text** for emphasis.
*Italic text* for secondary emphasis.
~~Strikethrough~~ for removed content.
`inline code` for code references.
[Link text](https://example.com) for hyperlinks.
```

**Bold text** for emphasis.
*Italic text* for secondary emphasis.
~~Strikethrough~~ for removed content.
`inline code` for code references.
[Link text](https://example.com) for hyperlinks.

## Headings

Use `##` and `###` headings to structure your content. DocsLit generates a table of contents from these headings automatically.

```markdown
## Second-level heading
### Third-level heading
```

<wc-callout type="tip" title="Use sentence case">
Write headings in sentence case: "Getting started with components" not "Getting Started With Components". Reserve `#` (H1) for the page title only.
</wc-callout>

## Lists

```markdown
- First item
- Second item
  - Nested item
- Third item

1. First step
2. Second step
3. Third step
```

- First item
- Second item
  - Nested item
- Third item

1. First step
2. Second step
3. Third step

## Tables

```markdown
| Feature | Status |
|---|---|
| Markdown | Supported |
| Web components | Supported |
| JSX | Not needed |
```

| Feature | Status |
|---|---|
| Markdown | Supported |
| Web components | Supported |
| JSX | Not needed |

## Code blocks

Use fenced code blocks with a language identifier for syntax highlighting:

````markdown
```javascript
const greeting = "Hello, world!";
console.log(greeting);
```
````

```javascript
const greeting = "Hello, world!";
console.log(greeting);
```

See [code blocks](../components/code-blocks) for advanced features like filenames, tabs, and editable variables.

## Images

```markdown
![Alt text](https://example.com/image.png)
```

Place image files in your `docs/` directory and reference them with relative paths.

## Internal links

Link to other pages using the page slug:

```markdown
Read the [installation guide](../getting-started/installation) to get started.
```

DocsLit resolves these links in both dev and static build modes.

## Using web components

Drop any `<wc-*>` tag directly into your Markdown. No imports, no configuration:

<wc-columns cols="2">
<div>

**Markdown source:**

```markdown
<wc-callout type="info" title="Note">
This is a web component inside
your Markdown content.
</wc-callout>
```

</div>
<div>

**Rendered output:**

<wc-callout type="info" title="Note">
This is a web component inside your Markdown content.
</wc-callout>

</div>
</wc-columns>

You can write Markdown inside most components:

```markdown
<wc-callout type="tip" title="Markdown works inside">

You can use **bold**, *italic*, `code`, and even:

- Bullet lists
- [Links](../getting-started/introduction)
- Other components

</wc-callout>
```

<wc-callout type="tip" title="Markdown works inside">

You can use **bold**, *italic*, `code`, and even:

- Bullet lists
- [Links](../getting-started/introduction)
- Other components

</wc-callout>

## MDX compatibility

DocsLit recognizes PascalCase component names from Mintlify and MDX projects. Tags like `<Tip>`, `<Card>`, `<Steps>`, and `<CardGroup>` are automatically rewritten to their `wc-*` equivalents at parse time. This means most Mintlify projects work without changing source files.

Both styles can be mixed in a single file. The canonical `wc-*` syntax continues to work unchanged.

```markdown
<!-- Both of these render the same component -->
<Tip>This uses the Mintlify-style name.</Tip>

<wc-callout type="tip">This uses the DocsLit name.</wc-callout>
```

Any unmapped PascalCase tag is converted to `wc-kebab-case` automatically, so a custom `<MyWidget>` becomes `<wc-my-widget>`.

<wc-callout type="info" title="Validation catches unmapped tags">
Run `docslit validate` to get warnings about PascalCase tags that resolve to a component that is not registered.
</wc-callout>

## Inline variable references

Use `{{VAR_NAME}}` in regular Markdown text to display a live variable value. These references update automatically when the variable is changed elsewhere on the page using a `wc-var` input.

```markdown
Set your key: <wc-var name="API_KEY" default="sk-demo"></wc-var>

Your key is **{{API_KEY}}** and it will update as you type above.
```

See [Code blocks](../components/code-blocks) for using variables inside code blocks.

## HTML pass-through

Standard HTML tags work in your Markdown. Use them for layout or styling that Markdown does not cover:

```html
<div style="text-align: center;">
  <strong>Centered bold text</strong>
</div>
```

## Next steps

- Set up page metadata with [frontmatter](frontmatter)
- Organize your sidebar with [pages and navigation](pages-and-navigation)
- Add rich interactions with [components](../components/callouts-and-alerts)
