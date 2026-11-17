---
title: Themes
description: Pick a prebuilt DocsLit theme with one line of config, preview every theme and palette live, and understand how themes, palettes and brand colors fit together.
tag: Customization
readtime: 7 min read
---

# Themes

A DocsLit site has a complete look out of the box, and you can change it with one line in `docslit.json`. Six prebuilt themes cover the common documentation styles, thirteen palettes cover colors, and brand colors, fonts and radii sit on top of both.

<wc-tiles cols="2">
<wc-tile title="Palettes and brand colors" description="Colors, fonts, radius, appearance and theme files." href="palettes-and-brand" icon="palette"></wc-tile>
<wc-tile title="Design tokens" description="Every CSS variable a theme sets, and how to override it." href="design-tokens" icon="sliders-horizontal"></wc-tile>
</wc-tiles>

## Theme and palette

Two independent choices define the look:

| Choice | What it controls | Examples |
|---|---|---|
| **Theme** | Layout structure, typography, shape (radii), elevation and component styling | `default`, `peppermint`, `frond`, `tonal`, `folio`, `ledger` |
| **Palette** | Colors, with a matching light and dark set | `teal`, `ocean`, `forest`, `slate`, `violet`, `rose`, `amber`, `graphite`, `mint`, `ink`, `paper`, `steel`, `iris` |

Every theme has a **signature palette** that it uses unless you pick another. Any theme works with any palette, and with your own brand colors on top. The ids never overlap, so a single `theme` string is unambiguous: a theme id selects a theme, a palette id selects a palette with the classic look, and a path ending in `.json` loads a theme file.

## Switch themes in one line

Set `theme` in `docslit.json`:

```json filename="docslit.json"
{
  "name": "Orbit Docs",
  "theme": "peppermint"
}
```

To keep the theme but change the colors, use the object form with a `palette`:

```json filename="docslit.json"
{
  "theme": { "name": "tonal", "palette": "ocean" }
}
```

You can also change the theme from the command line. `theme use` edits `docslit.json` in place and keeps your other settings:

```bash
docslit theme use peppermint
docslit theme use tonal --palette ocean
docslit theme use rose
```

The last command passes a palette id, so it changes only the palette and keeps the current theme. A name that matches nothing exits with code 1 and suggests the closest one:

```text
Unknown theme "pepermint". Did you mean "peppermint"?
Themes: default, peppermint, frond, tonal, folio, ledger
Palettes: teal, ocean, forest, slate, violet, rose, amber, graphite, mint, ink, paper, steel, iris
```

A new project can start with a theme too:

```bash
docslit init my-docs --theme folio
```

<wc-callout type="note" title="Existing sites render exactly as before">
`"theme": "ocean"` and the other eight original palette names keep the classic look unchanged, and so do theme objects and theme files from earlier releases. You opt in to a new look only by naming a theme.
</wc-callout>

## List what is available

`docslit theme list` prints every theme with its signature palette, every palette, and the custom color variables. A `*` marks the choice your project currently uses. Add `--json` for agents and scripts:

```bash
docslit theme list
docslit theme list --json
```

The JSON has the shape `{ themes, palettes, radius, appearance, current, config }`. Each palette carries its `accent` for light and dark mode.

## Try themes live

While you write, `docslit dev --theme-picker` adds a floating **Theme** button at the bottom right of every page. It opens a panel with the theme list, palette swatches, a light, dark or system switch, **Reset** and **Copy config**, which copies a `theme` block for `docslit.json`. Everything runs in the browser, so switching is instant, and your choices persist in the browser and in the URL as `?theme=folio&palette=ocean`.

```bash
docslit dev --theme-picker
```

The picker never appears in a build unless you ask for it. To ship it in a built site, for a gallery or a demo, set:

```json filename="docslit.json"
{
  "themePicker": true
}
```

This site does exactly that. Use the **Theme** button at the bottom right of this page to try every theme and palette on the page you are reading. A built site with the picker loads the fonts of every theme, so leave it off for normal production docs.

<wc-callout type="tip" title="Share a combination">
A URL such as `?theme=frond&palette=ocean` opens a site with that combination when the picker is enabled. It is a quick way to show colleagues two options side by side.
</wc-callout>

## The themes

Each screenshot is the same sample page, shown in light and dark mode. The image follows the mode you have selected for this site.

### Default

![The default theme: dark-first, flat surfaces, full-height sidebar with an accent bar](/assets/themes/default-light.webp#dark=/assets/themes/default-dark.webp)

The classic DocsLit look, unchanged: dark-first, flat surfaces and a full-height sidebar with an accent bar. Signature palette `teal`, with Inter and JetBrains Mono. Also available as `classic`.

### Peppermint

![The peppermint theme: fresh green, rounded cards, pill tabs under a frosted header, open sidebar](/assets/themes/peppermint-light.webp#dark=/assets/themes/peppermint-dark.webp)

A clean, airy look for product docs: soft borders, rounded cards, pill tabs under a frosted header, an open sidebar with a tinted pill for the current page, generous whitespace and a subtle gradient at the top. Signature palette `mint`, with Inter and JetBrains Mono. It is the familiar choice for teams coming from Mintlify, and the importer picks it for Mintlify projects.

### Frond

![The frond theme: strong type hierarchy, monochrome surfaces, sharp radii, hairline borders](/assets/themes/frond-light.webp#dark=/assets/themes/frond-dark.webp)

A crisp technical look: a strong type hierarchy, monochrome zinc surfaces with one accent, sharp radii, hairline borders, a filled and tinted sidebar item, bold group titles and an accent eyebrow above the title. Signature palette `ink`, with Inter and JetBrains Mono. It is the familiar choice for teams coming from Fern, and the importer picks it for Fern projects.

### Tonal

![The tonal theme: Material 3 inspired, pill indicators, 20 pixel radii, tonal cards](/assets/themes/tonal-light.webp#dark=/assets/themes/tonal-dark.webp)

Material 3 inspired. Surfaces and accents are derived from one seed color with tonal palettes, so the whole site shifts with a single choice of accent. Pill navigation indicators, 20px radii, borderless tonal cards, hover and press state layers, 3px focus rings and light-weight headings. Signature palette `iris`, with Roboto and Roboto Mono. With any other palette, that palette's accent (or `colors.accent`) is the seed.

### Folio

![The folio theme: narrow reading column, serif headings, outline sidebar](/assets/themes/folio-light.webp#dark=/assets/themes/folio-dark.webp)

A book or knowledge-base look: a 640px reading column, serif headings, 17px body text, an outline sidebar with a rule and an accent bar, quiet uppercase group labels, a large serif title with its description, underlined links and left-bar callouts. Signature palette `paper`, with Source Serif 4 for headings, Inter and JetBrains Mono. The importer picks it for GitBook projects.

### Ledger

![The ledger theme: dense sidebar, wide column, small precise type for API reference](/assets/themes/ledger-light.webp#dark=/assets/themes/ledger-dark.webp)

Built for API reference: a dense 13.5px sidebar, a wide 760px column inside a 1680px page, 15px type, section dividers on `h2`, uppercase table heads and small precise code. Signature palette `steel`, with IBM Plex Sans and IBM Plex Mono.

## Choosing a theme

| If your docs are | Start with |
|---|---|
| Product docs for developers, moving from Mintlify | `peppermint` |
| Technical docs with lots of reference, moving from Fern | `frond` |
| Brand-led docs where one accent color should drive everything | `tonal` |
| Long-form guides, a handbook or a knowledge base | `folio` |
| Parameter tables, endpoints and code samples | `ledger` |
| Already live on DocsLit and you like it as it is | `default` |

## What themes change

- **Tabs.** Themes restyle the header tab bar: pills in `peppermint`, indicator tabs in `tonal`, underlines in the others. `layout.tabsStyle` is ignored by themes that restyle the tabs. Tabs placed in the sidebar keep the shared styling. See [Tabs and anchors](tabs-and-anchors).
- **Layout settings win.** `layout.contentWidth`, `layout.sidebarWidth` and the other [layout settings](page-layout) override a theme's tokens. `peppermint` and `folio` turn on `layout.showDescription` by default.
- **Fonts.** The Google Fonts link is added only for the active theme, and `default` keeps its original link. Offline builds load no remote font. Each font stack ends in system fonts and uses a metric-matched fallback face, so a late font swap does not shift the layout.
- **Components.** Cards, callouts, tabs and code chrome read theme tokens. Themes cannot style inside a component's shadow DOM beyond those tokens.

## Accessibility

Themed sites meet WCAG 2.2 AA contrast for every color DocsLit derives: secondary and muted text, link color, the accent, text on filled accent surfaces and code text. A test checks every theme with every palette in light and dark mode.

- **Your own colors are respected as written.** If an explicit color fails AA, `docslit validate` warns with the code `theme-low-contrast` and tells you which pair to adjust. Run it after changing `colors`.
- **`prefers-contrast: more`** strengthens borders and text in every theme.
- **Focus is always visible.** Themes use a visible focus ring (3px in `tonal`), and you can restyle it with the `--focus-color` and `--focus-w` [tokens](design-tokens).
- **The classic theme keeps its original contrast.** The `default` theme with the eight original palettes is intentionally unchanged, so some pairs, mostly muted text and white text on a bright accent in dark mode, fall short of AA. If contrast is a hard requirement, choose one of the five newer themes, or the `default` theme with one of the newer palettes (`mint`, `ink`, `paper`, `steel`, `iris`).

## Next steps

- Set brand colors, fonts, corner radius and default appearance in [Palettes and brand colors](palettes-and-brand)
- Override individual styles with the [design tokens](design-tokens)
- Add your [logo](logo) and shape the header and footer in [Site chrome](site-chrome)
- Run `docslit validate` to check theme names, theme files and color contrast
