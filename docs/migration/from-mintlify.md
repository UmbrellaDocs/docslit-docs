---
title: Migrate from Mintlify
description: Move a Mintlify docs.json or mint.json project to DocsLit with one command that converts pages, components, code blocks, navigation, branding and redirects, and lists what still needs a human.
tag: Migration
readtime: 7 min read
---

# Migrate from Mintlify

DocsLit is open source, built for AI agents, and designed so that a Mintlify project moves over in one command. The importer reads your `docs.json` (or legacy `mint.json`), converts every MDX page and component, rewrites links and assets, maps your navigation, branding and redirects, validates the result and writes a report of everything that needs a human.

## Quick start

<wc-var name="MINTLIFY_DIR" default="my-mintlify-docs"></wc-var>

<wc-steps>
<wc-step title="Run the importer">

Point it at the folder that holds `docs.json`:

```bash
docslit import {{MINTLIFY_DIR}}
```

DocsLit detects Mintlify from `docs.json` or `mint.json`, converts the project into `{{MINTLIFY_DIR}}-docslit/`, and never touches the source. Use `--out` to choose another folder.

</wc-step>
<wc-step title="Read the report">

The command prints a summary and writes `MIGRATION.md` into the output. It lists every error, warning and note with a file, a line, what the importer did instead and how to fix it. See [the import reference](import-reference#the-migration-report).

</wc-step>
<wc-step title="Preview and validate">

```bash
cd {{MINTLIFY_DIR}}-docslit
docslit dev
docslit validate
```

Check the pages that the report flagged, and run `docslit validate` until it is clean.

</wc-step>
<wc-step title="Publish">

Delete `MIGRATION.md` when you are done, then [build and host the site anywhere](../deployment/static-hosting), or publish it with [DocsLit Cloud](../deployment/docslit-cloud).

</wc-step>
</wc-steps>

<wc-callout type="tip" title="Try it without writing anything">
Add `--dry-run` to convert everything in memory and print the report. Nothing is written, so you can see how much work the move is before you start.

```bash
docslit import {{MINTLIFY_DIR}} --dry-run
```

</wc-callout>

Prefer to have an agent drive the move page by page? See [Migrate with your AI agent](migrate-with-ai).

## What is converted

| Area | Result |
|---|---|
| **Pages** | Every `.mdx` page becomes Markdown with `wc-*` components. Imports and exports are removed, JSX props become attributes, and links and assets are rewritten. |
| **Components** | All Mintlify components are converted: callouts, accordions, cards, tabs, steps, code groups, request and response examples, fields, frames, badges, expandables, updates, tooltips, tree, color, view, prompt, panels, icons, embeds and conditional content. See [the full component mapping](component-mapping). |
| **Code blocks** | Mintlify fence options (`{1,3-5}`, `focus`, `lines`, `wrap`, `expandable`, `icon`, `nocopy`, and the `[!code ++]` notation) work as they are. See [Code blocks](../components/code-blocks). |
| **Snippets** | `/snippets/*.mdx` files become reusable includes in `docs/_reusables/`, with props mapped to `{{prop}}` placeholders. Exported variables become `attributes`. |
| **Navigation** | Tabs, groups, nested groups, anchors, dropdowns, products and external page links become `tabs`, `sidebar` and `anchors`. |
| **Branding** | Name, description, logo (light and dark), favicon, colors and fonts become a theme with your brand colors on top. |
| **Site chrome** | Navbar links and the primary button, footer socials and columns, the banner, redirects, SEO meta tags, the contextual menu and analytics. |
| **API** | An OpenAPI spec is copied in and API pages are generated, so the spec keeps working. |
| **Frontmatter** | `sidebarTitle`, `tag`, `mode`, `hidden`, `noindex`, `icon`, `deprecated` and the other page keys are mapped. See [the key changes](#what-changes-and-why). |

## Your look

Mintlify sites move to the `peppermint` theme, which has the same airy, product-docs feel, with your brand colors, fonts and logo applied on top. Choose another look at import time, or skip theming:

```bash
docslit import {{MINTLIFY_DIR}} --theme ledger
docslit import {{MINTLIFY_DIR}} --no-theme
```

With `--no-theme` your brand colors are still applied. You can switch later with `docslit theme use`. See [Themes](../customization/theming).

## Configuration mapping

`docs.json` keys become `docslit.json` keys. Run the importer with `--json` to see the exact mapping for your project.

| Mintlify `docs.json` | DocsLit `docslit.json` |
|---|---|
| `name`, `description`, `favicon` | `name`, `description`, `favicon` |
| `logo` (`light`, `dark`, `href`) | `logo` with the same keys |
| `colors` (`primary`, `light`, `dark`) | `theme` colors: `accent` in light and dark mode, plus a derived link color |
| `fonts` | `theme.fonts.sans`, plus a `head` link for Google fonts |
| `icons.library` | `icons.library` |
| `navigation.tabs`, `groups`, `pages`, `products` | `tabs` and `sidebar`. See [Tabs and anchors](../customization/tabs-and-anchors). |
| `navigation.global.anchors`, `anchors` | `anchors` |
| `navigation.versions` | `tabs`, one per version, or only the default version with `--versions latest` |
| `navbar.links`, `navbar.primary` | `navbar.links` and `navbar.primary`, including `github` and `discord` types |
| `footer.socials`, `footer.links` | `footer.socials` and `footer.columns` |
| `banner` | `announcement` |
| `redirects` | `redirects` |
| `seo.metatags` | `head` meta tags |
| `contextual.options` | `contextual`. See [Contextual menu](../customization/contextual-menu). |
| `integrations` (`ga4`, `posthog`, `plausible`, `fathom`) | `analytics`. `gtm` becomes a script in `head`. |
| `openapi`, `api` | `openapi` and `playground` settings |

Page frontmatter changes as well:

| Mintlify page key | DocsLit frontmatter |
|---|---|
| `sidebarTitle` | `sidebar_title` |
| `tag` | `badge`. Frontmatter `tag` means the page-header category in DocsLit. |
| `mode: wide`, `custom`, `frame`, `center` | `layout` with the same values |
| `hideFooterPagination` | `hide_nav` |
| `icon` and `iconType` | `icon` |
| `hidden`, `noindex`, `deprecated`, `contextual` | The same keys |
| `searchable: false` | `searchable: false` |

## What changes and why

- **Callouts have no forced title.** `<Note>` becomes `<wc-callout type="note">`, because the icon already says what it is. Add a `title` when you want a heading.
- **Steps number themselves.** The importer no longer writes step numbers. It only writes `n` when your source set `stepNumber`.
- **Tabs sync by default in Mintlify.** The importer adds `sync="mintlify"` to every `Tabs` so readers keep their choice across the site. Pass `sync={false}` in your source to opt out.
- **Icons are resolved at build time.** Lucide and Font Awesome names, `fa-brands fa-github` classes and emoji pass through unchanged. See [Icons](../components/icons).
- **Hidden pages are built.** A page with `hidden: true` is kept, built and reachable, but left out of the sidebar, search and sitemap.
- **A new look.** Colors and fonts become a theme, not CSS variables. Google font families from `fonts` get a `<link>` in `head`. Custom CSS written against Mintlify's `--mint-*` variables or class names does not carry over, so restyle with [design tokens](../customization/design-tokens).

## Known limits

The importer is honest about what it cannot convert. Each of these appears in `MIGRATION.md` with a fix.

- **Versions become tabs.** DocsLit versions are git branches. The default import makes one tab per Mintlify version in a single site. To get a version selector, split each version onto its own branch and configure `versions`. See [Versioning](../customization/versioning).
- **Languages.** The first language is converted, and the pages of the others are kept as hidden pages. DocsLit uses a `docs.<locale>/` folder per language. See [Internationalization](../customization/i18n).
- **Wildcard redirects.** Patterns such as `/old/:slug*` are skipped. Add one explicit redirect per path.
- **Custom JavaScript and React components.** A component with no DocsLit equivalent stays in the page inside a warning callout titled "Unconverted component", never dropped. Replace it with Markdown, a reusable snippet, or a [custom component](../customization/custom-components).
- **Analytics and integrations without a preset** (such as Intercom) are listed. Paste the vendor's snippet into `head`.
- **Content gated by login, roles or groups** cannot exist on a static site. It is removed and reported.
- **Contextual menu options** for Cursor, Devin, Grok, AI Studio and the download actions are dropped. See [Contextual menu](../customization/contextual-menu) for the supported options.
- **Appearance settings.** The importer does not convert `appearance`. Set `theme.appearance` and `theme.strict` yourself. See [Palettes and brand colors](../customization/palettes-and-brand#light-and-dark-appearance).
- **Search prompt, background images, `directory` and drilldown navigation, and the `boost` page key** have no equivalent. Each is listed in the report.

## After the move

- Run `docslit lint` for a quality pass over descriptions, headings and alt text.
- Run `docslit agents init` to add an `AGENTS.md` and MCP configuration, so agents can maintain the docs. See [Agent setup](../ai-and-agents/agent-setup).
- Every published DocsLit site serves Markdown, `llms.txt` and an MCP endpoint without extra setup. See [Reading docs as an agent](../ai-and-agents/reading-agents).

## Next steps

- Check each converted component in [the mapping reference](component-mapping)
- Learn every importer flag and the report format in [the import reference](import-reference)
- Let an agent finish the job with [Migrate with your AI agent](migrate-with-ai)
