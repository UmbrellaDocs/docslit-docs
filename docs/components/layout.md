---
title: Layout
description: Structure page content with columns, panels, frames, indented blocks and floating aside boxes.
tag: Components
readtime: 4 min read
---

<!-- docslit-lint-disable raw-html-block -->

# Layout

DocsLit provides layout components for multi-column grids, panels, frames, and side content.

## Columns

Create multi-column layouts with `wc-columns`:

```markdown
<wc-columns cols="2">
<div>

**Column one**

Content for the left column with Markdown support.

</div>
<div>

**Column two**

Content for the right column.

</div>
</wc-columns>
```

<wc-columns cols="2">
<div>

**Column one**

Content for the left column with Markdown support.

</div>
<div>

**Column two**

Content for the right column.

</div>
</wc-columns>

<wc-fields header="wc-columns">
<wc-field name="cols" type="number" default="2">
The number of columns. Columns collapse to a single column on mobile screens.
</wc-field>
<wc-field name="gap" type="string" default="1.5rem">
The gap between columns. Accepts any CSS value.
</wc-field>
</wc-fields>

### Three columns

```markdown
<wc-columns cols="3">
<div>

**Install**

Set up DocsLit in your project.

</div>
<div>

**Write**

Create pages in Markdown.

</div>
<div>

**Deploy**

Build and publish your site.

</div>
</wc-columns>
```

<wc-columns cols="3">
<div>

**Install**

Set up DocsLit in your project.

</div>
<div>

**Write**

Create pages in Markdown.

</div>
<div>

**Deploy**

Build and publish your site.

</div>
</wc-columns>

## Panels

Panels are bordered containers with a header:

```markdown
<wc-panel title="Configuration">

Set `name` in your `docslit.json` to change the site title.

</wc-panel>
```

<wc-panel title="Configuration">

Set `name` in your `docslit.json` to change the site title.

</wc-panel>

<wc-fields header="wc-panel">
<wc-field name="title" type="string">
The panel header text.
</wc-field>
<wc-field name="icon" type="string">
An [icon](icons) displayed next to the title: a Lucide or Font Awesome name, or an emoji.
</wc-field>
<wc-field name="theme" type="string">
Pin the panel to `dark` or `light`.
</wc-field>
</wc-fields>

## Frames

Frames wrap images or media with an optional caption and hint:

```markdown
<wc-frame caption="The DocsLit dashboard" hint="Click to enlarge" border background="subtle">

![Dashboard screenshot](https://placehold.co/600x300)

</wc-frame>
```

<wc-frame caption="The DocsLit dashboard" hint="Click to enlarge" border background="subtle">

![Dashboard screenshot](https://placehold.co/600x300)

</wc-frame>

<wc-fields header="wc-frame">
<wc-field name="caption" type="string">
A caption displayed below the content. Inline Markdown works.
</wc-field>
<wc-field name="hint" type="string">
Text shown above the frame. Inline Markdown works, including links. Links can be relative paths, `#anchors`, `http(s):` or `mailto:` URLs; any other link target, such as `javascript:`, is shown as plain text.
</wc-field>
<wc-field name="border" type="boolean">
Draw a border around the framed content.
</wc-field>
<wc-field name="background" type="string" default="default">
The frame background: `default` or `subtle`.
</wc-field>
<wc-field name="theme" type="string">
Pin the frame to `dark` or `light`.
</wc-field>
</wc-fields>

Images inside a frame keep their click-to-zoom behavior. See [Images](../writing-content/markdown-basics#images) for dark-mode variants and how to turn zoom off.

## Aside

Float supplementary content to the side of your main text. Add `sticky` to keep it in view while the reader scrolls:

```markdown
<wc-aside title="Related" sticky>

See [theming](../customization/theming) for customization options.

</wc-aside>
```

<wc-fields header="wc-aside">
<wc-field name="title" type="string">
A heading for the aside.
</wc-field>
<wc-field name="sticky" type="boolean">
Pin the aside below the header while the page scrolls.
</wc-field>
<wc-field name="theme" type="string">
Pin the aside to `dark` or `light`.
</wc-field>
</wc-fields>

<wc-aside title="Related" sticky>

See [theming](../customization/theming) for customization options.

</wc-aside>

The aside floats to the right on wide screens and sits inline on small screens. Put it near the top of the section it belongs to, because it floats next to the text that follows it.

## Indent

Add a colored left border for visual grouping:

```markdown
<wc-indent color="#3b82f6">

This content has a blue left border to set it apart from the surrounding text.

</wc-indent>
```

<wc-indent color="#3b82f6">

This content has a blue left border to set it apart from the surrounding text.

</wc-indent>

<wc-fields header="wc-indent">
<wc-field name="level" type="number" default="1">
The indentation depth.
</wc-field>
<wc-field name="color" type="string">
The border color. Accepts any CSS color value.
</wc-field>
</wc-fields>
