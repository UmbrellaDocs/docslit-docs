---
title: Icons
description: Use Lucide and Font Awesome icons by name, Font Awesome class strings, emoji, images or inline SVG anywhere an icon is accepted, resolved at build time so they work offline.
tag: Components
readtime: 5 min read
---

# Icons

Icons are resolved when you build, not when a reader loads the page. DocsLit looks each icon up in two bundled libraries, [Lucide](https://lucide.dev) and Font Awesome Free 6, and writes the SVG straight into the page. There is no CDN request at view time, no flash of missing icons, and every icon works in an offline build opened from disk.

## Ways to write an icon

The same value works in `wc-icon` and in the `icon` attribute of every component that has one.

| You write | You get | Example |
|---|---|---|
| A bare name | The Lucide or Font Awesome icon with that name | `rocket` |
| Font Awesome classes | A specific Font Awesome style | `fa-solid fa-gear`, `fa-regular fa-star`, `fa-brands fa-github` |
| A library prefix | A specific library | `lucide:zap`, `fa:zap` |
| An emoji | The emoji as text | `🚀` |
| An image path or URL | The image, for example an SVG or PNG | `img/mark.svg`, `https://example.com/logo.svg` |
| Inline `<svg>` | Your own SVG, with scripts and event handlers removed | `<svg viewBox="0 0 24 24">…</svg>` |

Image icons are sized to the icon box of the component, or to `size` on `wc-icon`, so an SVG or PNG fits wherever a named icon would.

Here they are, live:

<wc-icon name="rocket"></wc-icon> `rocket` · <wc-icon name="github"></wc-icon> `github` · <wc-icon name="fa-solid fa-gear"></wc-icon> `fa-solid fa-gear` · <wc-icon name="fa-regular fa-star"></wc-icon> `fa-regular fa-star` · <wc-icon name="fa-brands fa-docker"></wc-icon> `fa-brands fa-docker` · <wc-icon name="lucide:zap"></wc-icon> `lucide:zap` · <wc-icon name="🚀"></wc-icon> `🚀`

```markdown
<wc-icon name="rocket"></wc-icon>
<wc-icon name="fa-solid fa-gear"></wc-icon>
<wc-icon name="lucide:zap"></wc-icon>
<wc-icon name="🚀"></wc-icon>
```

## Font Awesome names and styles

Font Awesome icons are in three styles: solid, regular and brands. A bare name picks the first style that has it, and brand names such as `github` and `docker` find the brands set. To choose a style, use classes (`fa-regular fa-star`, or the short forms `fas`, `far` and `fab`), or set `icon-type` next to a bare name:

```markdown
<wc-icon name="star" icon-type="regular"></wc-icon>
<wc-icon name="fa-brands fa-github" size="20"></wc-icon>
```

<wc-icon name="star" icon-type="regular"></wc-icon> <wc-icon name="fa-brands fa-github" size="20"></wc-icon>

Pro-only styles (`fa-light`, `fa-thin`, `fa-duotone`, `fa-sharp`) are not bundled, and they fall back to the free solid icon of the same name. Size and animation classes such as `fa-lg` and `fa-spin` are ignored. Use `size` and `color` instead.

## Choose which library wins

A bare name can exist in both libraries. The `icons.library` setting in `docslit.json` decides which one is tried first:

```json filename="docslit.json"
{
  "icons": { "library": "lucide" }
}
```

| `library` | Bare names are looked up |
|---|---|
| `auto` (default) | The original DocsLit names (`check`, `x`, `info`, `search`, `star`, `zap`, `book`, `settings` and 25 more) in Lucide first, so existing sites look the same. Every other name in Font Awesome first, then Lucide. |
| `fontawesome` | In Font Awesome first, then Lucide. |
| `lucide` | In Lucide first, then Font Awesome. |

A prefix or Font Awesome classes always override the setting. The importer writes `fontawesome` for Mintlify sites that use it.

## Where you can use icons

- **Components:** `wc-icon`, `wc-callout`, `wc-banner`, `wc-badge`, `wc-accordion`, `wc-expandable`, `wc-card`, `wc-tile`, `wc-button` (`icon` and `right-icon`), `wc-tab`, `wc-view-panel`, `wc-step`, `wc-prompt`, `wc-panel` and code blocks (`icon=`).
- **Navigation:** sidebar groups and pages, [tabs and anchors](../customization/tabs-and-anchors), [navbar links and buttons](../customization/site-chrome), and custom [contextual menu](../customization/contextual-menu) options.
- **Frontmatter:** the `icon` key, which sets the sidebar icon of the page.

Components take an `icon-type` attribute (`solid`, `regular` or `brands`) for bare Font Awesome names.

```markdown
<wc-card title="Fast builds" icon="zap" href="../deployment/static-hosting">
Build your entire docs site in seconds.
</wc-card>

<wc-button icon="rocket" right-icon="arrow-right" href="../getting-started/quickstart">Get started</wc-button>
```

<wc-card title="Fast builds" icon="zap" href="../deployment/static-hosting">
Build your entire docs site in seconds.
</wc-card>

<wc-button icon="rocket" right-icon="arrow-right" href="../getting-started/quickstart">Get started</wc-button>

`icon-name` is the older spelling of `icon` on `wc-card` and `wc-tile`. It still works.

## Check your icons

An icon name that exists in neither library renders nothing. `docslit validate` reports it as `unknown-icon` with a line number and the nearest known name, so a typo does not slip through:

```text
⚠ [docs/index.md:16] <wc-icon name="rockett">: unknown icon. Did you mean "rocket"?
```

Browse the available names in the [Lucide](https://lucide.dev/icons) and [Font Awesome Free](https://fontawesome.com/search?o=r&m=free) catalogs. DocsLit bundles Lucide 1.60 and Font Awesome Free 6.7.2. Tabler icons are not bundled, but a Tabler name that also exists in Lucide or Font Awesome still resolves.

## wc-icon attributes

<wc-fields header="wc-icon">
<wc-field name="name" type="string">
The icon, unless you set `src`: a bare name, Font Awesome classes, `lucide:name`, an emoji, an image path or URL, or inline `<svg>`.
</wc-field>
<wc-field name="icon-type" type="string">
The Font Awesome style for a bare name: `solid`, `regular` or `brands`.
</wc-field>
<wc-field name="src" type="string">
An image path or URL to use as the icon. It wins over `name`, so `name` is not needed when you set it, as in `<wc-icon src="img/mark.svg"></wc-icon>`.
</wc-field>
<wc-field name="size" type="number" default="16">
The icon size in pixels.
</wc-field>
<wc-field name="color" type="string">
The icon color, as any CSS color.
</wc-field>
<wc-field name="label" type="string">
An accessible name. Icons are decorative and hidden from screen readers unless you set this.
</wc-field>
</wc-fields>

## Licenses

Lucide is ISC licensed. Font Awesome Free icons are CC BY 4.0, and the attribution is in the `NOTICES` file shipped with the `docslit` package.

## Next steps

- Use icons in [cards and tiles](cards-and-tiles) and [tabs and accordions](tabs-and-accordions)
- Add icons to the sidebar and tabs in [Pages and navigation](../writing-content/pages-and-navigation)
