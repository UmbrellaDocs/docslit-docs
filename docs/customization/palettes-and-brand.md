---
title: Palettes and brand colors
description: Choose a color palette, set brand colors, fonts and corner radius, control light and dark appearance, and share a brand theme file across projects.
tag: Customization
readtime: 7 min read
---

# Palettes and brand colors

A [theme](theming) sets the look. A **palette** sets the colors, and your **brand settings** override the parts that must match your style guide. Everything on this page goes in the `theme` key of `docslit.json`, as an inline object or in a separate theme file.

## Palettes

Thirteen palettes ship with DocsLit. Each has a light and a dark set, and the swatches show each palette's accent. Any palette works with any theme.

<wc-include src="palette-swatches.md" />

Use a palette on its own to keep the classic look and change only the colors:

```json filename="docslit.json"
{ "theme": "ocean" }
```

Use it with a theme to get a different look in your colors:

```json filename="docslit.json"
{
  "theme": { "name": "peppermint", "palette": "ocean" }
}
```

<wc-callout type="tip" title="Start from a neutral palette for corporate brands">
`slate`, `graphite` and `ink` are quiet, so your brand accent carries the page. Pick one as the base and override only `accent`.
</wc-callout>

## Brand colors

Override any color in `colors`, which applies to both modes, or in `dark` and `light`, which apply to one:

```json filename="docslit.json"
{
  "theme": {
    "name": "peppermint",
    "colors": { "accent": "#e11d48" },
    "dark": { "accent": "#fb7185" }
  }
}
```

Keys accept camelCase (`accentLight`) or kebab-case (`accent-light`).

| Color | Used for |
|---|---|
| `accent` | Primary brand color: active navigation, buttons, focus rings |
| `accentLight` | Link and hover color (lighter in dark mode, darker in light mode) |
| `accentDim`, `accentDim2` | Translucent accent for subtle backgrounds |
| `onAccent` | Text on filled accent surfaces such as buttons |
| `bg` | Page background |
| `surface`, `surface2`, `surface3` | Cards and panels, inputs and chips, hover states |
| `border`, `border2` | Default and stronger borders |
| `text`, `text2`, `text3` | Primary, secondary and muted text |
| `sidebarBg` | Sidebar background |
| `codeBg`, `codeText` | Code block background and text |

When you set only `accent`, DocsLit derives `accentLight`, `accentDim`, `accentDim2`, `onAccent`, the muted text colors and the code text colors for you, and repairs them to meet WCAG 2.2 AA contrast. Colors you set yourself are used exactly as written, and `docslit validate` warns with `theme-low-contrast` if one fails AA. See [Accessibility](theming#accessibility).

With the `tonal` theme, the accent is the seed for the whole site: surfaces and neutrals are derived from it.

## Fonts and shape

```json filename="docslit.json"
{
  "theme": {
    "name": "frond",
    "fonts": {
      "sans": "'Acme Sans', system-ui, sans-serif",
      "heading": "'Acme Display', Georgia, serif",
      "mono": "'Acme Mono', ui-monospace, monospace",
      "radius": "8px",
      "radiusLg": "12px"
    }
  }
}
```

<wc-fields header="theme.fonts">
<wc-field name="sans" type="string">
Body font stack.
</wc-field>
<wc-field name="heading" type="string">
Heading font stack. Defaults to the body font, except in `folio`, which uses a serif.
</wc-field>
<wc-field name="mono" type="string">
Monospace font stack for code.
</wc-field>
<wc-field name="radius" type="string">
Default corner radius, such as `6px`.
</wc-field>
<wc-field name="radiusLg" type="string">
Large corner radius, used by cards and panels.
</wc-field>
</wc-fields>

DocsLit does not download custom fonts. Load yours with your own `css` file or a `head` tag, as described in [Site chrome](site-chrome#custom-css-and-head-tags), and name them in the stack.

### Corner radius scale

`radius` scales every corner in the theme at once. It is a separate key from `fonts.radius`:

```json filename="docslit.json"
{
  "theme": { "name": "peppermint", "radius": "lg" }
}
```

Allowed values are `none`, `sm`, `md`, `lg`, `xl`, `full`, or a length such as `"6px"`. Use `none` for a sharp look and `full` for pill shapes.

## Light and dark appearance

By default readers see their system preference and can switch with the toggle in the header. Their choice is saved in the browser's `localStorage` under `docslit-theme` and persists across visits.

- **`appearance`** sets the mode first-time visitors see: `system`, `light` or `dark`. A reader's own choice still wins.
- **`strict: true`** hides the toggle and always uses `appearance`.

```json filename="docslit.json"
{
  "theme": { "name": "folio", "appearance": "light", "strict": true }
}
```

The five newer themes follow the operating system by default. The classic `default` theme keeps its original behavior, dark unless the reader chose light, until you set `appearance` explicitly. Set `"appearance": "system"` to make it follow the operating system.

## Pin a component to a mode

Any component with a `theme` attribute can ignore the page mode:

```markdown
<wc-panel title="Always dark" theme="dark">
This panel always uses the dark theme.
</wc-panel>
```

<wc-panel title="Always dark" theme="dark">
This panel always uses the dark theme.
</wc-panel>

<wc-panel title="Always light" theme="light">
This panel always uses the light theme.
</wc-panel>

Use it to show both appearances side by side. See [Code blocks](../components/code-blocks) for code-specific theme controls.

## Theme files

A **theme file** is a JSON file you can version, share across projects and hand to a design team. It takes the same keys as the inline object.

```bash
docslit theme init
docslit theme init acme-theme.json
```

`docslit theme init` writes `brand-theme.json` (or the path you give) and, when no theme is configured yet, adds `"theme": "./brand-theme.json"` to `docslit.json`.

```json filename="brand-theme.json"
{
  "name": "peppermint",
  "palette": "slate",
  "light": { "accent": "#003366", "accentLight": "#0066cc" },
  "dark": { "accent": "#4d94ff" },
  "fonts": { "sans": "'Acme Sans', 'Inter', sans-serif" },
  "radius": "md",
  "appearance": "system"
}
```

<wc-fields header="Theme file and inline theme keys">
<wc-field name="name" type="string">
A theme id (`peppermint`, `tonal` and so on) to layer your settings on that theme. Any other string is a free brand label, and then you name the theme with `theme`.
</wc-field>
<wc-field name="theme" type="string">
An explicit theme id, for when `name` is a brand label such as `"Acme Brand"`.
</wc-field>
<wc-field name="palette" type="string">
The palette to start from. Defaults to the theme's signature palette. Legacy aliases: `extends` and `preset`.
</wc-field>
<wc-field name="colors" type="object">
Color overrides for both modes.
</wc-field>
<wc-field name="dark" type="object">
Color overrides for dark mode only.
</wc-field>
<wc-field name="light" type="object">
Color overrides for light mode only.
</wc-field>
<wc-field name="fonts" type="object">
`sans`, `heading`, `mono`, `radius` and `radiusLg`.
</wc-field>
<wc-field name="radius" type="string">
Corner radius scale: `none`, `sm`, `md`, `lg`, `xl`, `full` or a length.
</wc-field>
<wc-field name="appearance" type="string" default="system">
The mode first-time visitors see: `system`, `light` or `dark`.
</wc-field>
<wc-field name="strict" type="boolean" default="false">
Hide the light and dark toggle and always use `appearance`.
</wc-field>
<wc-field name="id" type="string">
An identifier for the custom theme. Defaults to a slug of `name` or the file name.
</wc-field>
<wc-field name="file" type="string">
A theme file to merge into an inline object.
</wc-field>
</wc-fields>

Reference the file from `docslit.json`:

```json filename="docslit.json"
{ "theme": "./brand-theme.json" }
```

The dev server reloads when you edit the theme file or `docslit.json`.

## Check your theme

`docslit validate` checks the whole theme configuration and gives each problem a stable code, with the nearest valid name for a typo:

| Code | Meaning |
|---|---|
| `theme-unknown`, `theme-unknown-theme`, `theme-unknown-palette`, `theme-unknown-preset` | A theme, palette or preset name is not recognised. The message suggests the nearest name. |
| `theme-name-typo` | A `name` looks like a mistyped theme id (warning). |
| `theme-appearance-invalid`, `theme-strict-invalid`, `theme-radius-invalid` | A value is not one of the allowed ones. |
| `theme-low-contrast` | One of your explicit colors fails WCAG AA (warning). |
| `theme-file-missing`, `theme-file-invalid` | A theme file path or JSON is wrong. |
| `theme-invalid-value`, `theme-invalid-type` | A key has the wrong type or an unusable value. |

## Next steps

- Browse every CSS variable in the [design tokens reference](design-tokens)
- Add your [logo](logo) in light and dark variants
- Return to the [theme overview](theming)
