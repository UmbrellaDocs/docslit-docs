---
title: Markdown basics
description: Learn the Markdown syntax supported by DocsLit, including headings, lists, links, images, and GFM extensions.
tag: Writing
readtime: 4 min read
---

<!-- docslit-lint-disable raw-html-block -->

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

For larger or more structured tables, use [`wc-table`](../components/data-display) (JSON) or [`wc-asciidoc-table`](../components/asciidoc-tables) (AsciiDoc syntax with spans, column specs, and CSV/DSV).

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

Place image files in your `docs/` directory and reference them with relative paths. On a site with [versioned docs](../customization/versioning), the build copies media into every version folder, so relative paths work in each version. Non-default versions use the media in your working tree. Images load lazily, readers can click one to zoom it, and the build adds width and height so the page does not jump while it loads.

### Dark-mode variants

Add `#dark=` and the path of a second image. DocsLit shows the first in light mode and the second in dark mode:

```markdown
![Peppermint theme](/assets/themes/peppermint-light.webp#dark=/assets/themes/peppermint-dark.webp)
```

![Peppermint theme in light and dark mode](/assets/themes/peppermint-light.webp#dark=/assets/themes/peppermint-dark.webp)

### Turn zoom off or set a size

An image inside a link does not zoom. To turn zoom off for any image, use an HTML `img` with `noZoom`. For a fixed width, an alternate dark image or a size without HTML, use the `wc-image` component:

```markdown
<img src="/assets/themes/frond-light.webp" alt="Frond theme" noZoom />

<wc-image src="/assets/themes/frond-light.webp" dark-src="/assets/themes/frond-dark.webp" alt="Frond theme" width="480" no-zoom></wc-image>
```

<wc-fields header="wc-image">
<wc-field name="src" type="string" required>
The image URL or path.
</wc-field>
<wc-field name="alt" type="string">
Alternative text. Always provide it.
</wc-field>
<wc-field name="dark-src" type="string">
The image shown when the dark theme is active.
</wc-field>
<wc-field name="width" type="number">
The width in pixels.
</wc-field>
<wc-field name="height" type="number">
The height in pixels.
</wc-field>
<wc-field name="no-zoom" type="boolean">
Disable the click-to-zoom lightbox.
</wc-field>
</wc-fields>

Video and other embeds have their own component. See [Embeds and media](../components/embeds-and-media).

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

Use `{{VAR_NAME}}` in regular Markdown prose for compile-time variable substitution. Values come from global attributes, page frontmatter attributes, and page-local `wc-var` declarations.

```markdown
<wc-var name="API_KEY" value="sk-demo" />

Your key is **{{API_KEY}}**.
```

See [Variables and precedence](variables-and-precedence) for variable resolution rules, and [Code blocks](../components/code-blocks) for runtime interactive variable workflows.

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
