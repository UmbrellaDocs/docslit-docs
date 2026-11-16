---
title: Icons
description: Use the 33 built-in icons and any Font Awesome icon by name in DocsLit components or inline.
tag: Components
readtime: 2 min read
---

# Icons

DocsLit includes a set of built-in icons and supports the full Font Awesome library as a fallback.

## Using icons

```markdown
<wc-icon name="zap"></wc-icon>
<wc-icon name="book"></wc-icon>
<wc-icon name="search"></wc-icon>
<wc-icon name="settings"></wc-icon>
<wc-icon name="globe"></wc-icon>
```

<wc-icon name="zap"></wc-icon>
<wc-icon name="book"></wc-icon>
<wc-icon name="search"></wc-icon>
<wc-icon name="settings"></wc-icon>
<wc-icon name="globe"></wc-icon>

## Built-in icons

These 33 icons are built in and render immediately with no network request:

`arrow-down`, `arrow-left`, `arrow-right`, `arrow-up`, `book`, `check`, `chevron-down`, `chevron-right`, `code`, `copy`, `cpu`, `download`, `error`, `external-link`, `eye`, `file`, `folder`, `globe`, `grid`, `home`, `info`, `link`, `list`, `lock`, `package`, `search`, `settings`, `star`, `terminal`, `user`, `warning`, `x`, `zap`

## Font Awesome fallback

If you use an icon name that is not in the built-in set, DocsLit loads the Font Awesome (v6.7.2) icon with that name. Use the plain icon name. Brand names such as `github` and `docker` load from the brands set, and other names load from the solid set. You can also write Font Awesome classes: `fa-brands fa-github`, `fa-solid fa-gear` and `fa-regular fa-star` (or `fab`, `fas` and `far`). Size and animation classes such as `fa-lg` are ignored. Use `size` and `color` instead:

```markdown
<wc-icon name="github"></wc-icon>
<wc-icon name="fa-brands fa-docker"></wc-icon>
<wc-icon name="rocket"></wc-icon>
```

<wc-callout type="info" title="CDN loading">
Font Awesome icons load from the CDN on first use, so they need a network connection and do not render in an offline build opened from disk. Built-in icons render immediately with no network request.
</wc-callout>

## Icons in other components

Many components accept an `icon-name` attribute:

```markdown
<wc-card icon-name="zap" title="Fast builds" href="deployment/static-hosting">
Build your entire docs site in seconds.
</wc-card>

<wc-tiles>
<wc-tile icon-name="search" title="Search" description="Built-in full-text search."></wc-tile>
</wc-tiles>

<wc-panel icon="settings" title="Configuration">
Configure your project with docslit.json.
</wc-panel>
```

<wc-fields header="wc-icon">
<wc-field name="name" type="string" required>
The icon name. Use a built-in icon name, or a Font Awesome icon as a name (`github`) or classes (`fa-brands fa-github`).
</wc-field>
<wc-field name="size" type="number">
The icon size in pixels.
</wc-field>
<wc-field name="color" type="string">
The icon color, as any CSS color.
</wc-field>
</wc-fields>
