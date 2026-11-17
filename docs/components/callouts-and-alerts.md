---
title: Callouts and alerts
description: Highlight important information with callout and alert components for tips, warnings, errors, and notes.
tag: Components
readtime: 4 min read
---

<!-- docslit-lint-disable callout-overuse -->

# Callouts and alerts

Use callouts to highlight important information, warnings, tips, and notes. They draw attention to content that readers should not miss.

## Basic callout

```markdown
<wc-callout type="info" title="Good to know">
DocsLit generates a search index automatically on every build.
</wc-callout>
```

<wc-callout type="info" title="Good to know">
DocsLit generates a search index automatically on every build.
</wc-callout>

## Callout types

Each type has its own color and default icon. Use `type` to pick one, and add a `title` when a heading helps.

<wc-callout type="info" title="Info">
Use info callouts for supplementary information that adds context.
</wc-callout>

<wc-callout type="note" title="Note">
Use note callouts for general remarks and observations.
</wc-callout>

<wc-callout type="tip" title="Tip">
Use tip callouts for best practices and recommendations.
</wc-callout>

<wc-callout type="warning" title="Warning">
Use warning callouts for potential issues the reader should be aware of.
</wc-callout>

<wc-callout type="error" title="Error">
Use error callouts for critical issues that can cause failures. The alias `danger` looks the same.
</wc-callout>

<wc-callout type="success" title="Success">
Use success callouts to confirm that something works as expected.
</wc-callout>

<wc-callout type="check" title="Check">
Use check callouts for a verified state or a passing condition.
</wc-callout>

<wc-callout type="launch" title="Launch">
Use launch callouts to announce something new.
</wc-callout>

## Attributes

<wc-fields header="wc-callout">
<wc-field name="type" type="string" default="info">
The visual style and default icon. Options: `info`, `tip`, `warning`, `error`, `danger`, `success`, `check`, `note`, `launch`. `danger` is an alias of `error` styling.
</wc-field>
<wc-field name="title" type="string">
The heading text displayed at the top of the callout. Inline Markdown works. If omitted, the callout shows only the body content.
</wc-field>
<wc-field name="icon" type="string">
A custom icon that replaces the one for the type. Use any [icon](icons) form, or `none` to hide the icon.
</wc-field>
<wc-field name="icon-type" type="string">
The Font Awesome style for a bare icon name: `solid`, `regular` or `brands`.
</wc-field>
<wc-field name="color" type="string">
A custom accent color, as a hex value or any CSS color. It tints the border, background, icon and title.
</wc-field>
</wc-fields>

`wc-alert` is an alias of `wc-callout` with the same attributes.

## Custom icon and color

Pass `icon` and `color`, and leave out `type`, to make a callout that matches your own palette:

```markdown
<wc-callout icon="rocket" color="#8b5cf6" title="Launch day">
A custom icon and color.
</wc-callout>

<wc-callout icon="fa-brands fa-github" color="#0ea5e9">
Any icon form works, including Font Awesome classes.
</wc-callout>

<wc-callout type="note" icon="none">
A note with no icon.
</wc-callout>
```

<wc-callout icon="rocket" color="#8b5cf6" title="Launch day">
A custom icon and color.
</wc-callout>

<wc-callout icon="fa-brands fa-github" color="#0ea5e9">
Any icon form works, including Font Awesome classes.
</wc-callout>

<wc-callout type="note" icon="none">
A note with no icon.
</wc-callout>

## Without a title

You can omit the title for a simpler presentation:

```markdown
<wc-callout type="tip">
Write one idea per sentence. Your readers will thank you.
</wc-callout>
```

<wc-callout type="tip">
Write one idea per sentence. Your readers will thank you.
</wc-callout>

## Markdown inside callouts

Callouts support full Markdown content including bold, italic, lists, links, and code:

```markdown
<wc-callout type="info" title="Supported Markdown">

You can use:

- **Bold** and *italic* text
- `inline code` and [links](../getting-started/introduction)
- Nested lists and other formatting

</wc-callout>
```

<wc-callout type="info" title="Supported Markdown">

You can use:

- **Bold** and *italic* text
- `inline code` and [links](../getting-started/introduction)
- Nested lists and other formatting

</wc-callout>

## Banners

Banners are notices that span the full width of the content area. Use them for announcements or temporary notices inside a page. For a site-wide banner above the navbar, see the [announcement banner](../customization/announcement-banner).

```markdown
<wc-banner type="info" dismissible>
DocsLit v0.2 is now available. See the changelog for details.
</wc-banner>
```

<wc-banner type="info" dismissible>
DocsLit v0.2 is now available. See the changelog for details.
</wc-banner>

<wc-banner type="warning" icon="triangle-alert">
Scheduled maintenance on Saturday. Builds may be delayed.
</wc-banner>

<wc-banner color="#7c3aed" dark-color="#6d28d9">
A solid brand color, with its own shade in dark mode.
</wc-banner>

<wc-fields header="wc-banner">
<wc-field name="type" type="string" default="neutral">
The visual style. Options: `info`, `warning`, `error`, `critical`, `success`, `neutral`.
</wc-field>
<wc-field name="dismissible" type="boolean">
Show a close button. A dismissed banner stays hidden until its text changes.
</wc-field>
<wc-field name="color" type="string">
A solid background color with white text, in light mode and, unless `dark-color` is set, in dark mode.
</wc-field>
<wc-field name="dark-color" type="string">
A solid background color used in dark mode.
</wc-field>
<wc-field name="icon" type="string">
A leading [icon](icons).
</wc-field>
</wc-fields>

## Badges

Inline badges for labeling and categorization:

```markdown
<wc-badge>Default</wc-badge>
<wc-badge variant="success" icon="check" shape="pill">Stable</wc-badge>
<wc-badge variant="warning">Beta</wc-badge>
<wc-badge variant="danger" outlined>Deprecated</wc-badge>
<wc-badge variant="info" size="sm">New</wc-badge>
<wc-badge variant="purple" minimal>Enterprise</wc-badge>
<wc-badge variant="neutral" disabled>Retired</wc-badge>
```

<wc-badge>Default</wc-badge>
<wc-badge variant="success" icon="check" shape="pill">Stable</wc-badge>
<wc-badge variant="warning">Beta</wc-badge>
<wc-badge variant="danger" outlined>Deprecated</wc-badge>
<wc-badge variant="info" size="sm">New</wc-badge>
<wc-badge variant="purple" minimal>Enterprise</wc-badge>
<wc-badge variant="neutral" disabled>Retired</wc-badge>

<wc-fields header="wc-badge">
<wc-field name="variant" type="string" default="default">
The color. Options: `default`, `success`, `warning`, `orange`, `danger`, `error`, `info`, `neutral`, `purple`, `note`, `tip`, `launch`, `check`, `white`, `surface`.
</wc-field>
<wc-field name="label" type="string">
The badge text. When omitted, the text between the tags is used.
</wc-field>
<wc-field name="size" type="string" default="md">
The size. Options: `xs`, `sm`, `md`, `lg`.
</wc-field>
<wc-field name="shape" type="string" default="rounded">
The corner shape. Options: `rounded`, `pill`.
</wc-field>
<wc-field name="icon" type="string">
A leading [icon](icons).
</wc-field>
<wc-field name="outlined" type="boolean">
A transparent background with a border.
</wc-field>
<wc-field name="minimal" type="boolean">
A very subtle background and no border.
</wc-field>
<wc-field name="disabled" type="boolean">
A reduced-opacity look for retired or unavailable items.
</wc-field>
</wc-fields>

## When to use each type

| Type | Use for |
|---|---|
| `info` | Supplementary context, prerequisites |
| `tip` | Best practices, recommendations |
| `warning` | Potential gotchas, compatibility notes |
| `error` | Breaking changes, critical requirements |
| `success` | Confirmed behavior, completed steps |
| `check` | A verified state, a passing condition |
| `launch` | New features and announcements |
| `note` | General remarks, asides |
