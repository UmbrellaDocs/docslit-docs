---
title: Design tokens
description: Reference for every CSS custom property a DocsLit theme sets, how to override them in your own stylesheet, and how to build your own theme.
tag: Customization
readtime: 6 min read
---

# Design tokens

Every [theme](theming) is a set of CSS custom properties, called design tokens, plus a small amount of structural CSS. Typography, shape, elevation and chrome all read tokens, so you can restyle a site by changing a few variables instead of writing selectors.

Colors live in [palettes](palettes-and-brand). The tokens on this page cover everything else.

## Override a token

Add a stylesheet with the `css` key and set the tokens on `html`:

```json filename="docslit.json"
{
  "theme": "frond",
  "css": "custom.css"
}
```

```css filename="custom.css"
html {
  --h1-size: 2.5rem;
  --card-radius: 4px;
  --sidebar-fs: 0.875rem;
}
```

The stylesheet is linked after the theme CSS, so your values win. Tokens that a theme does not set fall back to the classic defaults in the reference below.

To see the values the current theme actually sets, run:

```bash
docslit theme tokens
docslit theme tokens --theme tonal
docslit theme tokens --json
```

The JSON lists every token with its `group`, `description`, `default`, current `value` and whether the theme overrode it (`overridden`).

## Color variables

Palettes define these variables for light and dark mode. Set them with the [brand color keys](palettes-and-brand#brand-colors) rather than in CSS, so that DocsLit can derive and check the related colors.

`--bg`, `--surface`, `--surface2`, `--surface3`, `--border`, `--border2`, `--text`, `--text2`, `--text3`, `--accent`, `--accent-light`, `--accent-dim`, `--accent-dim2`, `--sidebar-bg`, `--code-bg`, `--code-text` and `--on-accent`.

## Token reference

The defaults below are the classic `default` theme values. Other themes override many of them. This reference is generated from `docslit theme tokens --json`, so it matches the CLI version that built this site.

<wc-include src="design-tokens-table.md" />

## Layout and navigation tokens

Navigation chrome has its own tokens. They are declared before the theme CSS, so themes can override them and so can you. Site [layout settings](page-layout) write some of them for you.

| Token | Default | What it controls |
|---|---|---|
| `--page-w` | `1560px` | Maximum width of sidebar, content and table of contents |
| `--content-text-w` | `668px` | Width of the text column |
| `--content-pad-x` | `56px` | Horizontal padding of the content area |
| `--toc-w` | `216px` | Table of contents width |
| `--tabs-bar-h` | `44px` | Height of the tab bar |
| `--sidebar-pad-x`, `--sidebar-item-pad-y`, `--sidebar-indent`, `--sidebar-icon-size`, `--sidebar-gap` | `18px`, `7px`, `14px`, `16px`, `8px` | Sidebar spacing |
| `--tab-gap`, `--tab-pad-x`, `--tab-radius`, `--tab-font-size` | `2px`, `12px`, `8px`, `14px` | Tab buttons |
| `--tab-color`, `--tab-color-hover`, `--tab-color-active`, `--tab-indicator` | text and accent colors | Tab colors and the active underline |
| `--tab-pill-bg`, `--tab-pill-fg` | accent tints | The active tab in pill style |
| `--btn-filled-bg`, `--btn-filled-fg`, `--btn-filled-hover-bg`, `--btn-outlined-border` | accent colors | Navbar buttons |
| `--dropdown-bg`, `--dropdown-border`, `--dropdown-shadow`, `--dropdown-radius` | surface colors | Navbar dropdown menus |
| `--badge-radius`, `--badge-font-size` | `999px`, `10px` | Sidebar and page badges |
| `--badge-tag-bg`, `--badge-new-bg`, `--badge-beta-bg`, `--badge-dev-bg`, `--badge-deprecated-bg` | tinted colors | Badge backgrounds. Each kind also has `-fg` and `-border` variants. |
| `--subtitle-color`, `--eyebrow-color` | `--text2`, `--accent-light` | Page subtitle and eyebrow text |

## Make your own theme

Pick the smallest tool that does the job.

<wc-steps>
<wc-step title="Start from a theme and palette">

Choose the closest theme and palette. Most sites stop here.

```json filename="docslit.json"
{ "theme": { "name": "frond", "palette": "ocean" } }
```

</wc-step>
<wc-step title="Add your brand">

Set your accent, fonts and radius in the same object, or move them into a [theme file](palettes-and-brand#theme-files) that several projects share.

```json filename="docslit.json"
{
  "theme": {
    "name": "frond",
    "palette": "ocean",
    "colors": { "accent": "#0a7d5a" },
    "fonts": { "heading": "'Acme Display', Georgia, serif" },
    "radius": "md"
  }
}
```

</wc-step>
<wc-step title="Fine-tune with tokens">

Override individual tokens in a stylesheet for the last few details, such as the heading size or the sidebar font size.

</wc-step>
<wc-step title="Validate">

Run `docslit validate` to check names, values and the contrast of your explicit colors, then look at both light and dark mode with `docslit dev`.

</wc-step>
</wc-steps>

### Contribute a theme to DocsLit

A built-in theme is a data entry in the CLI source, which makes it a good open-source contribution:

1. In `src/theme-defs.js`, add an entry to `THEMES` with an `id`, `label`, one-line `description`, signature `palette`, `fonts`, a `tokens` map and optional structural `css`. In the `css`, `&` stands for the theme's `html[data-theme-name="id"]` selector.
2. If the theme needs its own colors, add a palette to `EXTRA_PALETTES` in `src/themes.js`. Every theme can then use it.
3. Run `npx vitest run src/themes.test.js`. The contrast test covers every theme, palette and mode automatically, and the listing test needs the new id added to its expected array.
4. Build a sample site and check light and dark mode at 1440 and 390 pixels wide. Keep structural CSS minimal and prefer tokens.

## Next steps

- Choose colors and fonts in [Palettes and brand colors](palettes-and-brand)
- See the available looks in the [theme gallery](theming#the-themes)
- Adjust widths and tab styles in [Page layout](page-layout)
