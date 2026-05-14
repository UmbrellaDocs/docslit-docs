---
title: Layout
tag: Components
readtime: 4 min read
---

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
An icon name displayed next to the title.
</wc-field>
</wc-fields>

## Frames

Frames wrap images or media with an optional caption:

```markdown
<wc-frame caption="The DocsLit dashboard">

![Dashboard screenshot](https://placehold.co/600x300)

</wc-frame>
```

<wc-frame caption="The DocsLit dashboard">

![Dashboard screenshot](https://placehold.co/600x300)

</wc-frame>

<wc-fields header="wc-frame">
<wc-field name="caption" type="string">
A caption displayed below the content.
</wc-field>
</wc-fields>

## Aside

Float supplementary content to the side of your main text:

```markdown
<wc-aside>

**Related:** See [theming](../customization/theming) for customization options.

</wc-aside>
```

<wc-aside>

**Related:** See [theming](../customization/theming) for customization options.

</wc-aside>

The aside floats to the right on wide screens and collapses to full width on mobile.

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
