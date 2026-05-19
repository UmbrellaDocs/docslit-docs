---
title: Theming
description: Customize colors, fonts, and dark/light mode behavior for your DocsLit site using CSS variables.
tag: Customization
readtime: 3 min read
---

# Theming

DocsLit supports dark and light themes with automatic system preference detection. Readers can toggle between themes at any time.

## How themes work

DocsLit checks the reader's system preference (`prefers-color-scheme`) on first visit and applies the matching theme. The reader can override this using the theme toggle in the site header. Their choice is saved in `localStorage` and persists across visits.

Every built-in component automatically adapts to the active theme. You do not need to specify theme-specific styles.

## Pinning component themes

You can force a specific theme on any component, regardless of the page theme:

```markdown
<wc-panel title="Always dark" theme="dark">
This panel always uses the dark theme.
</wc-panel>

<wc-panel title="Always light" theme="light">
This panel always uses the light theme.
</wc-panel>
```

<wc-columns cols="2">
<div>

<wc-panel title="Dark panel" theme="dark">
This panel uses the dark theme regardless of the page setting.
</wc-panel>

</div>
<div>

<wc-panel title="Light panel" theme="light">
This panel uses the light theme regardless of the page setting.
</wc-panel>

</div>
</wc-columns>

This is useful for showing both appearances side by side in documentation or for ensuring code blocks match a specific style.

## Theme attribute

The `theme` attribute works on all `wc-*` components:

<wc-fields header="Theme attribute">
<wc-field name="theme" type="string">
Pin the component to a specific theme. Options: `dark`, `light`. When omitted, the component follows the page theme.
</wc-field>
</wc-fields>

## Theme-aware content

Use columns to show how content looks in both themes:

<wc-columns cols="2">
<div>

<wc-callout type="info" title="Light mode" theme="light">
This callout is always in light mode.
</wc-callout>

</div>
<div>

<wc-callout type="info" title="Dark mode" theme="dark">
This callout is always in dark mode.
</wc-callout>

</div>
</wc-columns>
