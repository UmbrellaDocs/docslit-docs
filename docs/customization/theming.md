---
title: Theming
description: Choose a color preset, define a corporate brand theme, and control dark/light mode for your DocsLit site.
tag: Customization
readtime: 6 min read
---

# Theming

DocsLit lets you customize the look and feel of your documentation site — colors, fonts, and borders — while keeping light and dark mode support built in. Pick a professional preset or define a brand theme that matches your corporate style.

## Built-in color presets

Set a preset name in `docslit.json`:

```json filename="docslit.json"
{
  "name": "My Docs",
  "theme": "ocean",
  "sidebar": [...]
}
```

| Preset | Description |
|--------|-------------|
| `teal` | Default DocsLit branding |
| `ocean` | Professional blue |
| `forest` | Emerald green |
| `slate` | Neutral gray — good base for corporate themes |
| `violet` | Purple |
| `rose` | Warm red/rose |
| `amber` | Warm gold |
| `graphite` | High-contrast monochrome |

Run `docslit theme list` to print all presets and available theme variables.

<wc-callout type="tip" title="Start from slate for corporate brands">
Neutral presets like `slate` or `graphite` work well as a base when you only need to override accent colors to match your brand.
</wc-callout>

## Corporate brand themes

For teams that need colors, fonts, and spacing aligned to a brand guide, use a **brand theme file** — a JSON file you can version control and share across documentation projects.

### Scaffold a theme file

```bash
docslit theme init
```

This creates `brand-theme.json` and adds `"theme": "./brand-theme.json"` to `docslit.json` if no theme is configured yet.

You can pass a custom filename:

```bash
docslit theme init themes/acme.json
```

### Brand theme file format

```json filename="brand-theme.json"
{
  "name": "Acme Brand",
  "extends": "slate",
  "colors": {
    "accent": "#003366",
    "accentLight": "#0066cc"
  },
  "dark": {
    "accent": "#4d94ff"
  },
  "light": {
    "accent": "#003366"
  },
  "fonts": {
    "sans": "'Acme Sans', 'Inter', sans-serif",
    "mono": "'Acme Mono', 'JetBrains Mono', monospace",
    "radius": "6px"
  }
}
```

<wc-fields header="Theme file fields">
<wc-field name="name" type="string">
Display name for your brand. Used to derive the theme ID (`acme-brand`) unless you set `id` explicitly.
</wc-field>
<wc-field name="extends" type="string" default="teal">
Built-in preset to inherit from. Alias: `preset`.
</wc-field>
<wc-field name="id" type="string">
Optional theme ID for the `data-theme` attribute. Defaults to a slug from `name` or the filename.
</wc-field>
<wc-field name="colors" type="object">
Shared overrides applied in both light and dark mode.
</wc-field>
<wc-field name="dark" type="object">
Overrides applied only in dark mode.
</wc-field>
<wc-field name="light" type="object">
Overrides applied only in light mode.
</wc-field>
<wc-field name="fonts" type="object">
Optional `sans`, `mono`, `radius`, and `radiusLg` values.
</wc-field>
</wc-fields>

Reference the file from `docslit.json`:

```json filename="docslit.json"
{
  "theme": "./brand-theme.json"
}
```

The dev server hot-reloads when you edit the theme file or `docslit.json`.

### Inline brand theme

You can also define a theme directly in `docslit.json` without a separate file:

```json filename="docslit.json"
{
  "theme": {
    "extends": "slate",
    "colors": {
      "accent": "#003366",
      "accentLight": "#0066cc"
    }
  }
}
```

Use a theme file when the theme is large, shared across repos, or maintained by a design team separately from site navigation.

## Theme variables

Override any of these keys in `colors`, `dark`, or `light`. Keys accept camelCase (`accentLight`) or kebab-case (`accent-light`).

<wc-table>
[
  { "Variable": "accent", "Description": "Primary brand color — links, active nav, buttons" },
  { "Variable": "accentLight", "Description": "Lighter or darker accent for hover and emphasis" },
  { "Variable": "accentDim", "Description": "Translucent accent for subtle backgrounds" },
  { "Variable": "accentDim2", "Description": "Slightly stronger translucent accent" },
  { "Variable": "bg", "Description": "Page background" },
  { "Variable": "surface", "Description": "Card and panel background" },
  { "Variable": "surface2", "Description": "Secondary surface (inputs, chips)" },
  { "Variable": "surface3", "Description": "Tertiary surface (hover states)" },
  { "Variable": "border", "Description": "Default border color" },
  { "Variable": "border2", "Description": "Stronger border color" },
  { "Variable": "text", "Description": "Primary text" },
  { "Variable": "text2", "Description": "Secondary text" },
  { "Variable": "text3", "Description": "Muted text" },
  { "Variable": "sidebarBg", "Description": "Sidebar background" },
  { "Variable": "codeBg", "Description": "Code block background" },
  { "Variable": "codeText", "Description": "Code block text" },
  { "Variable": "fontSans", "Description": "Body font stack (or use fonts.sans)" },
  { "Variable": "fontMono", "Description": "Monospace font stack (or use fonts.mono)" },
  { "Variable": "radius", "Description": "Default border radius" },
  { "Variable": "radiusLg", "Description": "Large border radius" }
]
</wc-table>

When you set `accent` to a hex color and omit `accentDim` / `accentDim2`, DocsLit derives translucent accent backgrounds automatically.

## Light and dark mode

DocsLit checks the reader's system preference (`prefers-color-scheme`) on first visit and applies the matching mode. Readers can override this with the theme toggle in the site header. Their choice is saved in `localStorage` and persists across visits.

Every built-in component adapts to the active mode. Color presets and brand themes define separate palettes for light and dark.

## Pinning component themes

You can force a specific mode on any component, regardless of the site theme:

```markdown
<wc-panel title="Always dark" theme="dark">
This panel always uses the dark theme.
</wc-panel>

<wc-panel title="Always light" theme="light">
This panel always uses the light theme.
</wc-panel>
```

<wc-fields header="Component theme attribute">
<wc-field name="theme" type="string">
Pin the component to `dark` or `light`. When omitted, the component follows the page mode.
</wc-field>
</wc-fields>

This is useful for showing both appearances side by side or ensuring code blocks match a specific style. See [code blocks](../components/code-blocks) for code-specific theme controls.

## Next steps

- Add your [logo](logo) to the navigation bar
- Show site-wide notices with the [announcement banner](announcement-banner)
- Run `docslit validate` to check theme file paths and preset names
