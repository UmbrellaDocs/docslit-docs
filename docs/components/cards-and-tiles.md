---
title: Cards and tiles
description: Create clickable cards with icons, images and call-to-action text, tile grids with previews, and buttons with icons, sizes and states.
tag: Components
readtime: 3 min read
---

# Cards and tiles

Use cards and tiles to create navigation grids, feature highlights, and content previews.

## Cards

Cards are clickable containers with an optional icon, image and title. The text inside the tags is the description:

```markdown
<wc-card icon="book" title="Documentation" href="getting-started/introduction">
Learn how to build beautiful documentation sites with DocsLit.
</wc-card>
```

<wc-card icon="book" title="Documentation" href="getting-started/introduction">
Learn how to build beautiful documentation sites with DocsLit.
</wc-card>

A card has no `description` attribute. The text between the tags is the description, and it can use Markdown. Without an `href` the card is a plain box.

<wc-fields header="wc-card">
<wc-field name="title" type="string">
The card heading. Inline Markdown works.
</wc-field>
<wc-field name="href" type="string">
The link destination: a page slug or an external URL. External links open in a new tab.
</wc-field>
<wc-field name="icon" type="string">
An [icon](icons): a Lucide or Font Awesome name, an emoji, an image or inline SVG. `icon-name` is an older alias.
</wc-field>
<wc-field name="icon-color" type="string">
The icon color, as any CSS color.
</wc-field>
<wc-field name="icon-color-dark" type="string">
The icon color in dark mode. `icon-color` is then the light-mode color.
</wc-field>
<wc-field name="icon-size" type="number" default="36">
The size of the icon box in pixels.
</wc-field>
<wc-field name="icon-position" type="string" default="top">
Where the icon sits: `top` or `left`.
</wc-field>
<wc-field name="horizontal" type="boolean">
A compact horizontal layout, with the icon on the left.
</wc-field>
<wc-field name="img" type="string">
An image URL or path shown on the card.
</wc-field>
<wc-field name="img-position" type="string" default="top">
Where the image sits: `top`, `left`, `right` or `bottom`.
</wc-field>
<wc-field name="cta" type="string">
Call-to-action text at the bottom of the card, with an arrow.
</wc-field>
<wc-field name="arrow" type="string">
`true` or `false` to show or hide the corner arrow. By default it shows for external links only.
</wc-field>
<wc-field name="type" type="string">
A callout-style color theme for the card: `info`, `warning`, `note`, `tip`, `check` or `danger`.
</wc-field>
</wc-fields>

### Card variations

```markdown
<wc-tiles cols="2">
<wc-card title="Quickstart" icon="rocket" icon-color="#0d9488" href="getting-started/quickstart" cta="Start now">
Go from zero to a live site in minutes.
</wc-card>
<wc-card title="Heads up" icon="triangle-alert" type="warning" horizontal>
A horizontal card with a warning color.
</wc-card>
<wc-card title="GitHub" icon="fa-brands fa-github" href="https://github.com/UmbrellaDocs/docslit-cli" arrow="true">
External cards show an arrow.
</wc-card>
<wc-card title="Always visible" icon="eye" icon-position="left" arrow="false">
A card with the icon on the left and no arrow.
</wc-card>
</wc-tiles>
```

<wc-tiles cols="2">
<wc-card title="Quickstart" icon="rocket" icon-color="#0d9488" href="getting-started/quickstart" cta="Start now">
Go from zero to a live site in minutes.
</wc-card>
<wc-card title="Heads up" icon="triangle-alert" type="warning" horizontal>
A horizontal card with a warning color.
</wc-card>
<wc-card title="GitHub" icon="fa-brands fa-github" href="https://github.com/UmbrellaDocs/docslit-cli" arrow="true">
External cards show an arrow.
</wc-card>
<wc-card title="Always visible" icon="eye" icon-position="left" arrow="false">
A card with the icon on the left and no arrow.
</wc-card>
</wc-tiles>

## Tiles

Tiles create a grid of linked items. Use `wc-tiles` as the container and `wc-tile` for each item:

```markdown
<wc-tiles>
<wc-tile icon="zap" title="Fast" description="Static builds with zero runtime overhead." href="deployment/static-hosting"></wc-tile>
<wc-tile icon="palette" title="Themeable" description="Six themes and thirteen palettes." href="customization/theming"></wc-tile>
<wc-tile icon="search" title="Searchable" description="Full-text search with no external service." href="writing-content/search-and-seo"></wc-tile>
<wc-tile icon="blocks" title="Components" description="Every component, with live examples." href="components/callouts-and-alerts"></wc-tile>
</wc-tiles>
```

<wc-tiles>
<wc-tile icon="zap" title="Fast" description="Static builds with zero runtime overhead." href="deployment/static-hosting"></wc-tile>
<wc-tile icon="palette" title="Themeable" description="Six themes and thirteen palettes." href="customization/theming"></wc-tile>
<wc-tile icon="search" title="Searchable" description="Full-text search with no external service." href="writing-content/search-and-seo"></wc-tile>
<wc-tile icon="blocks" title="Components" description="Every component, with live examples." href="components/callouts-and-alerts"></wc-tile>
</wc-tiles>

A tile is compact by default. Put an image or an SVG inside it, with blank lines around, and it becomes a larger visual preview above the title:

````markdown
<wc-tiles cols="2">
<wc-tile title="Dashboard" description="With a preview." href="getting-started/introduction">

![Dashboard preview](/assets/themes/peppermint-light.webp)

</wc-tile>
</wc-tiles>
````

<wc-fields header="wc-tile">
<wc-field name="title" type="string" required>
The tile heading. Inline Markdown works.
</wc-field>
<wc-field name="description" type="string">
A short description displayed below the title.
</wc-field>
<wc-field name="href" type="string">
The link destination.
</wc-field>
<wc-field name="icon" type="string">
An [icon](icons) displayed above the title. `icon-name` is an older alias.
</wc-field>
</wc-fields>

<wc-fields header="wc-tiles">
<wc-field name="cols" type="number">
The number of columns in the grid. Defaults to automatic sizing. A `wc-tiles` can hold `wc-tile` or `wc-card` children.
</wc-field>
</wc-fields>

## Columns

`wc-columns` lays out arbitrary content in a grid when you do not need links. See [Layout](layout#columns).

## Buttons

Use buttons for prominent calls to action. They link when you give an `href`:

```markdown
<wc-button href="getting-started/quickstart" icon="rocket" right-icon="arrow-right">Get started</wc-button>
<wc-button href="getting-started/introduction" variant="outline">Learn more</wc-button>
<wc-button href="https://github.com/UmbrellaDocs/docslit-cli" variant="ghost" icon="fa-brands fa-github" target="_blank">View on GitHub</wc-button>
<wc-button variant="success" rounded>Rounded</wc-button>
<wc-button variant="primary" outlined size="sm">Small outlined</wc-button>
<wc-button variant="warning" minimal mono>Mono minimal</wc-button>
<wc-button variant="danger" disabled>Disabled</wc-button>
```

<wc-button href="getting-started/quickstart" icon="rocket" right-icon="arrow-right">Get started</wc-button>
<wc-button href="getting-started/introduction" variant="outline">Learn more</wc-button>
<wc-button href="https://github.com/UmbrellaDocs/docslit-cli" variant="ghost" icon="fa-brands fa-github" target="_blank">View on GitHub</wc-button>
<wc-button variant="success" rounded>Rounded</wc-button>
<wc-button variant="primary" outlined size="sm">Small outlined</wc-button>
<wc-button variant="warning" minimal mono>Mono minimal</wc-button>
<wc-button variant="danger" disabled>Disabled</wc-button>

<wc-fields header="wc-button">
<wc-field name="label" type="string">
The button text. When omitted, the text between the tags is used.
</wc-field>
<wc-field name="href" type="string">
The link destination. With an `href`, the button renders as a link.
</wc-field>
<wc-field name="variant" type="string" default="primary">
The color intent: `primary`, `outline`, `ghost`, `danger`, `success`, `warning` or `none`.
</wc-field>
<wc-field name="size" type="string" default="md">
The button size: `sm`, `md` or `lg`.
</wc-field>
<wc-field name="target" type="string">
The link target. `_blank` adds `rel="noopener noreferrer"`.
</wc-field>
<wc-field name="outlined" type="boolean">
A transparent background with a colored border.
</wc-field>
<wc-field name="minimal" type="boolean">
A subtle tinted background and no border.
</wc-field>
<wc-field name="full" type="boolean">
A full-width button.
</wc-field>
<wc-field name="rounded" type="boolean">
Pill-shaped corners.
</wc-field>
<wc-field name="mono" type="boolean">
A monospace label.
</wc-field>
<wc-field name="active" type="boolean">
Show the pressed ring.
</wc-field>
<wc-field name="disabled" type="boolean">
Disable the button.
</wc-field>
<wc-field name="icon" type="string">
An [icon](icons) before the label.
</wc-field>
<wc-field name="right-icon" type="string">
An [icon](icons) after the label.
</wc-field>
</wc-fields>

## When to use each

| Component | Best for |
|---|---|
| `wc-card` | Single featured links with descriptions, images or a call to action |
| `wc-tiles` | Navigation grids, feature overviews, landing pages |
| `wc-button` | Primary calls to action, download links |
