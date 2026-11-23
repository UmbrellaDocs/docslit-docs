---
title: Logo
description: Add your logo to the navigation bar, with separate light and dark variants, a custom link target, optional text and a fixed height.
tag: Customization
readtime: 3 min read
---

# Logo

Set a custom logo in the navigation bar with the `logo` field in `docslit.json`. When no logo is configured, DocsLit uses the default favicon next to your site name.

## One logo

Use a path string for a single image. It appears next to the site name:

```json filename="docslit.json"
{
  "name": "My Docs",
  "logo": "logo.svg"
}
```

Place the image file in your project root, or use a path relative to the project root. DocsLit copies it to the build output when you run `docslit build`. Common formats are SVG, PNG and WebP.

## Light and dark logos

A logo that works on a light background rarely works on a dark one. Give the object form a variant for each mode, and DocsLit swaps them when the reader changes mode:

```json filename="docslit.json"
{
  "name": "Orbit",
  "logo": {
    "light": "logo/light.svg",
    "dark": "logo/dark.svg",
    "href": "https://orbit.example.com",
    "height": 28
  }
}
```

<wc-fields header="logo">
<wc-field name="light" type="string">
The image shown in light mode. If you set only one of `light` and `dark`, it is used in both modes.
</wc-field>
<wc-field name="dark" type="string">
The image shown in dark mode.
</wc-field>
<wc-field name="href" type="string">
Where the logo links to. Use it to send readers to your marketing site. By default the logo links to the docs home page.
</wc-field>
<wc-field name="text" type="string">
Text shown beside the image, such as `Docs`.
</wc-field>
<wc-field name="height" type="number">
The image height in pixels, from 1 to 120.
</wc-field>
</wc-fields>

With the object form, the image is treated as a wordmark: the site name is **not** repeated beside it. Include your name in the image, or add it with `text`.

<wc-callout type="tip" title="SVG preferred">
SVG files stay sharp on all screen densities and are usually the smallest. For a square mark with a PNG, use about 32 by 32 or 64 by 64 pixels.
</wc-callout>

## Paths and URLs

A path that starts with `/` is treated as a site-root path, for example when the file is already in your output or served from a CDN. Full `http` and `https` URLs are used as they are, and DocsLit does not copy them.

`docslit validate` reports a logo object that has no `light`, `dark` or `text` as `logo-invalid`.

## Next steps

- Add a site-wide [announcement banner](announcement-banner) for product updates
- Choose colors and fonts in [Palettes and brand colors](palettes-and-brand)
- Set up the header and footer in [Site chrome](site-chrome)
