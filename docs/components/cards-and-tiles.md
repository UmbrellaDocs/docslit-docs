---
title: Cards and tiles
tag: Components
readtime: 3 min read
---

# Cards and tiles

Use cards and tiles to create navigation grids, feature highlights, and content previews.

## Cards

Cards are clickable containers with an optional icon, title, and description:

```markdown
<wc-card icon-name="book" title="Documentation" href="getting-started/introduction">
Learn how to build beautiful documentation sites with DocsLit.
</wc-card>
```

<wc-card icon-name="book" title="Documentation" href="getting-started/introduction">
Learn how to build beautiful documentation sites with DocsLit.
</wc-card>

<wc-fields header="wc-card">
<wc-field name="title" type="string" required>
The card heading.
</wc-field>
<wc-field name="href" type="string">
The link destination. Can be a page slug or an external URL.
</wc-field>
<wc-field name="icon-name" type="string">
A built-in icon name. See [icons](components/icons) for the full list.
</wc-field>
<wc-field name="description" type="string">
A short description. Alternatively, use the slot content (the content between the tags).
</wc-field>
</wc-fields>

## Tiles

Tiles create a grid of linked items. Use `wc-tiles` as the container and `wc-tile` for each item:

```markdown
<wc-tiles>
<wc-tile icon-name="zap" title="Fast" description="Static builds with zero runtime overhead." href="deployment/static-hosting"></wc-tile>
<wc-tile icon-name="palette" title="Themeable" description="Dark and light modes out of the box." href="customization/theming"></wc-tile>
<wc-tile icon-name="search" title="Searchable" description="Full-text search with no external service." href="writing-content/search-and-seo"></wc-tile>
<wc-tile icon-name="blocks" title="Components" description="50+ interactive components built in." href="components/callouts-and-alerts"></wc-tile>
</wc-tiles>
```

<wc-tiles>
<wc-tile icon-name="zap" title="Fast" description="Static builds with zero runtime overhead." href="deployment/static-hosting"></wc-tile>
<wc-tile icon-name="palette" title="Themeable" description="Dark and light modes out of the box." href="customization/theming"></wc-tile>
<wc-tile icon-name="search" title="Searchable" description="Full-text search with no external service." href="writing-content/search-and-seo"></wc-tile>
<wc-tile icon-name="blocks" title="Components" description="50+ interactive components built in." href="components/callouts-and-alerts"></wc-tile>
</wc-tiles>

<wc-fields header="wc-tile">
<wc-field name="title" type="string" required>
The tile heading.
</wc-field>
<wc-field name="description" type="string">
A short description displayed below the title.
</wc-field>
<wc-field name="href" type="string">
The link destination.
</wc-field>
<wc-field name="icon-name" type="string">
A built-in icon name displayed above the title.
</wc-field>
</wc-fields>

<wc-fields header="wc-tiles">
<wc-field name="cols" type="number">
The number of columns in the grid. Defaults to automatic sizing based on content. Collapses to fewer columns on smaller screens.
</wc-field>
</wc-fields>

## Buttons

Use buttons for prominent calls to action:

```markdown
<wc-button href="getting-started/quickstart" variant="primary" label="Get started"></wc-button>
<wc-button href="getting-started/introduction" variant="outline" label="Learn more"></wc-button>
<wc-button href="#" variant="ghost" label="View on GitHub"></wc-button>
```

<wc-button href="getting-started/quickstart" variant="primary" label="Get started"></wc-button>
<wc-button href="getting-started/introduction" variant="outline" label="Learn more"></wc-button>
<wc-button href="#" variant="ghost" label="View on GitHub"></wc-button>

<wc-fields header="wc-button">
<wc-field name="href" type="string">
The link destination.
</wc-field>
<wc-field name="label" type="string" required>
The button text.
</wc-field>
<wc-field name="variant" type="string" default="primary">
The visual style. Options: `primary`, `outline`, `ghost`, `danger`.
</wc-field>
<wc-field name="size" type="string" default="md">
The button size. Options: `sm`, `md`, `lg`.
</wc-field>
</wc-fields>

## When to use each

| Component | Best for |
|---|---|
| `wc-card` | Single featured links with descriptions |
| `wc-tiles` | Navigation grids, feature overviews, landing pages |
| `wc-button` | Primary calls to action, download links |
