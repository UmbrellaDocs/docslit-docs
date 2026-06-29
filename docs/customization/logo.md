---
title: Logo
description: Replace the default favicon in the navigation bar with your own logo image.
tag: Customization
readtime: 2 min read
---

# Logo

Set a custom logo in the navigation bar by adding a `logo` field to `docslit.json`. When no logo is configured, DocsLit uses the default favicon.

## Configuration

```json filename="docslit.json"
{
  "name": "My Docs",
  "logo": "logo.svg",
  "sidebar": [...]
}
```

Place the image file in your project root (or use a path relative to the project root). DocsLit copies it to the build output automatically when you run `docslit build`.

<wc-fields header="Logo configuration">
<wc-field name="logo" type="string">
Path to an image file in your project. Common formats include SVG, PNG, and WebP. The image appears next to your site name in the navigation bar.
</wc-field>
</wc-fields>

## Recommended image size

Use a square image around **32×32 px** or **64×64 px** for crisp display on retina screens. SVG logos scale cleanly at any size.

<wc-callout type="tip" title="SVG preferred">
SVG files stay sharp on all screen densities and typically produce the smallest file size.
</wc-callout>

## Absolute paths

If your logo path starts with `/`, DocsLit treats it as a site-root path (for example, when the file is already in your `dist/` output or served from a CDN).

## Next steps

- Add a site-wide [announcement banner](announcement-banner) for product updates
- Customize colors and themes in [theming](theming)
