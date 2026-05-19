---
title: Icons
description: Use built-in Lucide icons and Font Awesome brand icons by name in any DocsLit component or inline.
tag: Components
readtime: 2 min read
---

# Icons

DocsLit includes a set of built-in Lucide icons and supports the full Font Awesome library as a fallback.

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

The following Lucide icons are included and load instantly with no external requests:

<wc-columns cols="3">
<div>

- `zap`
- `book`
- `search`
- `settings`
- `globe`
- `code`
- `terminal`
- `file`
- `folder`
- `package`

</div>
<div>

- `blocks`
- `palette`
- `eye`
- `lock`
- `unlock`
- `check`
- `x`
- `plus`
- `minus`
- `arrow-right`

</div>
<div>

- `arrow-left`
- `arrow-up`
- `arrow-down`
- `external-link`
- `copy`
- `download`
- `upload`
- `warning`
- `info`
- `heart`

</div>
</wc-columns>

## Font Awesome fallback

If you use an icon name that is not in the built-in set, DocsLit automatically loads it from Font Awesome (v6.7.2):

```markdown
<wc-icon name="fa-brands fa-github"></wc-icon>
<wc-icon name="fa-brands fa-docker"></wc-icon>
```

<wc-callout type="info" title="CDN loading">
Font Awesome icons load from the CDN on first use. Built-in Lucide icons render immediately with no network request.
</wc-callout>

## Icons in other components

Many components accept an `icon-name` attribute:

```markdown
<wc-card icon-name="zap" title="Fast builds" href="deployment/static-hosting">
Build your entire docs site in seconds.
</wc-card>

<wc-tile icon-name="search" title="Search" description="Built-in full-text search."></wc-tile>

<wc-panel icon="settings" title="Configuration">
Configure your project with docslit.json.
</wc-panel>
```

<wc-fields header="wc-icon">
<wc-field name="name" type="string" required>
The icon name. Use a built-in Lucide name or a Font Awesome class like `fa-brands fa-github`.
</wc-field>
</wc-fields>
