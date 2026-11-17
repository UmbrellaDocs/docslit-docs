---
title: Migrate from Fern
description: Move a Fern docs.yml project to DocsLit with one command that converts pages, components, code blocks, navigation, branding, API reference and redirects, and lists what still needs a human.
tag: Migration
readtime: 7 min read
---

# Migrate from Fern

DocsLit is open source, built for AI agents, and easy to move to from Fern. The importer reads `fern/docs.yml`, converts every MDX page and Fern component, rewrites links and assets, maps your navigation, branding, changelog and OpenAPI reference, validates the result and writes a report of everything that needs a human.

## Quick start

<wc-var name="FERN_DIR" default="my-fern-docs"></wc-var>

<wc-steps>
<wc-step title="Run the importer">

Point it at the project root, the folder that contains `fern/`, or at the `fern/` folder itself:

```bash
docslit import {{FERN_DIR}}
```

DocsLit detects Fern from `fern/docs.yml` and writes a new project to `{{FERN_DIR}}-docslit/`. The source is never modified. Use `--out` to choose another folder.

</wc-step>
<wc-step title="Read the report">

The command prints a summary and writes `MIGRATION.md` into the output, with a file, a line, what was done instead and how to fix it for each item. See [the import reference](import-reference#the-migration-report).

</wc-step>
<wc-step title="Preview and validate">

```bash
cd {{FERN_DIR}}-docslit
docslit dev
docslit validate
```

</wc-step>
</wc-steps>

<wc-callout type="tip" title="Dry run first">
Use `--dry-run` to see the report without writing files:

```bash
docslit import {{FERN_DIR}} --dry-run
```

</wc-callout>

To have an AI agent drive the move, see [Migrate with your AI agent](migrate-with-ai).

## What is converted

| Area | Result |
|---|---|
| **Pages** | Every `.mdx` page becomes Markdown with `wc-*` components. Frontmatter, links, snippets and assets are rewritten, and Fern slug overrides are honored. |
| **Components** | Callouts, accordions, anchors, asides, badges, buttons, cards, color, copy, download, files, frames, `If`, prompts, tables, tabs, tiles, tooltips, updates, versions and `ScrollWalkthrough`. See [the full component mapping](component-mapping). |
| **Code blocks** | Fern fence options are read natively. Fern shows line numbers by default and DocsLit does not, so the importer adds `lines` to each block unless it has `showLineNumbers={false}`. `<Code src>` files are copied into `snippets/` and referenced with `file=`, and URLs are downloaded at import time. |
| **Navigation** | Tabs, sections, pages, folders, links, products and versions become `tabs`, groups and `sidebar` entries. An `api` section becomes an OpenAPI tab. |
| **Branding** | Title, logo (light and dark, with `href` and `height`), favicon, accent and background colors and typography become a theme with your brand colors. |
| **Site chrome** | Navbar links, footer links, the announcement, layout settings, redirects and analytics. |
| **Changelog** | A `changelog` folder becomes a changelog page built from `wc-update` entries. |
| **API reference** | OpenAPI specs referenced in `generators.yml` are copied and API pages generated. |

## Your look

Fern sites move to the `frond` theme, which has the same crisp, technical feel, with your accent and background colors applied on top. Choose another look, or none:

```bash
docslit import {{FERN_DIR}} --theme ledger
docslit import {{FERN_DIR}} --no-theme
```

See [Themes](../customization/theming).

## Configuration mapping

| Fern `docs.yml` | DocsLit `docslit.json` |
|---|---|
| `title`, `favicon`, `redirects` | `name`, `favicon`, `redirects` |
| `instances[].custom-domain` | `url`. Fern's URL prefix is dropped, so add redirects at your host if old URLs had one. |
| `logo` (`light`, `dark`, `href`, `height`) | `logo` with the same keys |
| `colors` (`accent-primary`, `background`) and `typography` | `theme` colors and fonts. The importer reports the colors it cannot theme separately. |
| `tabs` and `navigation` | `tabs`. See [Tabs and anchors](../customization/tabs-and-anchors). |
| `section` and `contents` | A group, with `pages` and nested groups. A section `path` becomes the group `root`. |
| `page` (`path`, `icon`, `hidden`, `availability`) | A page entry with `icon`, `hidden` and `availability` |
| `folder` | A group that lists the pages found in the folder |
| `link` | A link entry with `href` and `title` |
| `collapsed` | `collapsed` |
| `api` | An OpenAPI tab, with `openapi` set to the spec |
| `navbar-links` (`minimal`, `filled`, `outlined`, `github`, `dropdown`) | `navbar.links` types `link`, `filled`, `outlined`, `github` and `dropdown`. See [Site chrome](../customization/site-chrome#navbar). |
| `footer-links` | `footer.socials` |
| `announcement` | `announcement` |
| `layout` (`page-width`, `content-width`, `sidebar-width`, `header-height`, `tabs-placement`, `hide-feedback`) | `layout` (`pageWidth`, `contentWidth`, `sidebarWidth`, `headerHeight`, `tabsPlacement`, `hideFeedback`). See [Page layout](../customization/page-layout). |
| `analytics` (`ga4`, `posthog`, `gtm`) | `analytics`. `gtm` becomes a script in `head`. |
| `page-actions` | `contextual`. See [Contextual menu](../customization/contextual-menu). |

Fern page frontmatter changes as follows:

| Fern frontmatter | DocsLit |
|---|---|
| `sidebar-title`, `subtitle`, `headline` | `sidebar_title`, `subtitle`, `headline` |
| `hide-toc`, `max-toc-depth` | `hide_toc`, `toc_depth` |
| `hide-nav-links`, `hide-feedback`, `hide-page-actions` | `hide_nav`, `hide_feedback`, `hide_actions` |
| `layout: guide`, `overview`, `reference`, `page`, `custom` | `layout` with the same values |
| `availability`, `noindex`, `last-updated` | `availability`, `noindex`, `updated` |

## What changes and why

- **Line numbers.** Fern turns them on by default. The importer adds `lines` so your code looks the same.
- **Language sync.** Fern synchronizes tabs by language. Code groups in DocsLit sync by default, and `for="npm"` tokens on fences keep working. Tabs with a `language` become a synced group, and the importer warns when the labels differ from your code block titles.
- **API snippets.** Components that render from a Fern API definition, `EndpointRequestSnippet`, `EndpointResponseSnippet`, `Schema`, `WebhookPayloadSnippet` and `RunnableEndpoint`, have no inline equivalent. Each becomes a callout that points to the generated API reference, and the report lists it.
- **Rendering differences.** `Aside` and `Panel` float right in DocsLit. `If versions` becomes `wc-if version`, `llms-only` becomes `wc-if for="agents"`, and `llms-ignore` becomes `wc-if for="humans"`. See [Conditional content](../components/conditional-content).
- **Scroll walkthroughs** convert to [`wc-walkthrough`](../components/walkthrough), without `stickyHeaders` and `substepStyle`.

## Known limits

- **Versions and products become tabs.** DocsLit versions are git branches. Fern `versions` become one tab each by default, or only the default version with `--versions latest`. To get a version selector, put each version on its own branch. See [Versioning](../customization/versioning). Products have no equivalent and become tabs.
- **Tab variants** are flattened into one sidebar. Split them into separate tabs if the groups collide.
- **Fern Definition.** Only OpenAPI is converted. If the API is written in Fern Definition (`definition/*.yml`), no API pages are generated. Run `fern export openapi` and then `docslit openapi scaffold <spec>`.
- **AsyncAPI, proto and Conjure specs** are not converted, and only one OpenAPI spec per project is supported.
- **Custom JavaScript** from `js` in `docs.yml` is not carried over. Add a `<script>` to `head` if you still need it.
- **Wildcard redirects** such as `/docs/legacy/:slug*` are skipped. Add one explicit redirect per path.
- **Code deep links.** `CodeBlock` `links` are dropped, and the block is kept without them.
- **Code tooltips** are dropped and the code is rendered as plain code.
- **Analytics providers** with no preset, such as Segment, are listed. Paste the snippet into `head`.
- **Content gated by roles or login** cannot exist on a static site. It is removed and reported.
- **Slugs, `edit-this-page-url`, `og:*`, `image`, `canonical-url` and `keywords`** frontmatter have no equivalent.

## After the move

- Run `docslit lint` for a quality pass.
- Run `docslit agents init` to add `AGENTS.md` and MCP configuration. See [Agent setup](../ai-and-agents/agent-setup).
- Publish anywhere with [static hosting](../deployment/static-hosting) or [DocsLit Cloud](../deployment/docslit-cloud). Every published site serves Markdown, `llms.txt` and an MCP endpoint. See [Reading docs as an agent](../ai-and-agents/reading-agents).

## Next steps

- Check each converted component in [the mapping reference](component-mapping)
- Learn every importer flag and the report format in [the import reference](import-reference)
- Let an agent finish the job with [Migrate with your AI agent](migrate-with-ai)
