---
title: What's new
description: Latest features, improvements, and fixes in DocsLit releases.
tag: Changelog
date: 2026-11-16
readtime: 3 min read
---

# What's new

All notable changes to DocsLit, organized by release.

## 0.2.0

<wc-update version="0.2.0" date="November 2026" type="added">
**Themes:** six prebuilt looks, `default`, `peppermint`, `frond`, `tonal`, `folio` and `ledger`, with thirteen palettes, brand colors, fonts, corner radius and appearance settings. Switch with `"theme": "peppermint"` or `docslit theme use`, try every combination live with `docslit dev --theme-picker` or the built-in `themePicker`, and read the design tokens with `docslit theme tokens`. Derived colors meet WCAG AA, and existing configs render exactly as before. See [Themes](../customization/theming), [Palettes and brand colors](../customization/palettes-and-brand) and [Design tokens](../customization/design-tokens).
</wc-update>

<wc-update version="0.2.0" date="November 2026" type="added">
**Switch from Mintlify or Fern in one command:** `docslit import` was rewritten on a real MDX parser. It converts every Mintlify and Fern component, code block, snippet, link and asset, maps `docs.json`, `mint.json` and `docs.yml` navigation, branding, redirects and analytics, picks a matching theme, validates the result and writes `MIGRATION.md` with a file, line and fix for everything that needs a human. New flags are `--from`, `--theme`, `--no-theme`, `--versions`, `--force` and `--json`, and GitBook projects are covered too. See [Migrate from Mintlify](../migration/from-mintlify), [Migrate from Fern](../migration/from-fern), [Migrate from GitBook](../migration/from-gitbook) and the [component mapping](../migration/component-mapping).
</wc-update>

<wc-update version="0.2.0" date="November 2026" type="added">
**Agent-driven migration:** the MCP tool `convert_mdx` converts one Mintlify, Fern or GitBook page without writing anything and returns the issues to fix. `get_project_info` now reports the theme and the available themes and palettes. See [Migrate with your AI agent](../migration/migrate-with-ai).
</wc-update>

<wc-update version="0.2.0" date="November 2026" type="added">
**Component parity with Mintlify and Fern:** new `wc-embed`, `wc-github-repo`, `wc-walkthrough`, `wc-colors` and `wc-if`, and new attributes across callouts (`danger`, `check`, `launch`, `icon`, `color`), banners, badges, tooltips, updates, frames, accordions, asides, steps, tabs, views, file trees, cards, tiles, buttons, prompts, tables, fields, downloads, copy chips, images and includes with props. See [Callouts and alerts](../components/callouts-and-alerts), [Embeds and media](../components/embeds-and-media), [Walkthrough](../components/walkthrough) and [Cards and tiles](../components/cards-and-tiles).
</wc-update>

<wc-update version="0.2.0" date="November 2026" type="added">
**Conditional content:** `wc-if` includes or removes content at build time by version, locale, variable or audience. `for="agents"` appears only in the Markdown that AI agents read, and `for="humans"` only on the web. See [Conditional content](../components/conditional-content).
</wc-update>

<wc-update version="0.2.0" date="November 2026" type="added">
**Build-time icons:** icons resolve to inline SVG from Lucide and Font Awesome Free, with no CDN request, so they work offline. Write a bare name, Font Awesome classes such as `fa-solid fa-gear`, `lucide:zap`, an emoji, an image or inline SVG, and set `icons.library` to choose which library wins. `docslit validate` flags unknown icons with a suggestion. See [Icons](../components/icons).
</wc-update>

<wc-update version="0.2.0" date="November 2026" type="added">
**Code block features:** highlighted and focused lines, diff and error notation, line numbers with a start line, collapsible long blocks, wrapping, icons, and dropdown code groups that sync by language. Mintlify and Fern fence options work as they are. See [Code blocks](../components/code-blocks).
</wc-update>

<wc-update version="0.2.0" date="November 2026" type="added">
**Navigation parity:** top-level `tabs` in the header or the sidebar, `anchors`, sidebar icons, badges, availability and hidden pages, external links in the sidebar, groups with a linked `root`, navbar dropdowns, buttons, a primary button and a GitHub star count, light and dark logos, footer columns and social icons, site layout settings, seven page layouts with `hide_toc`, `toc_depth` and more, and a configurable contextual menu. See [Tabs and anchors](../customization/tabs-and-anchors), [Page layout](../customization/page-layout), [Site chrome](../customization/site-chrome) and [Contextual menu](../customization/contextual-menu).
</wc-update>

<wc-update version="0.2.0" date="November 2026" type="changed">
**Behavior changes for Mintlify-style tags:** the build step that reads Mintlify tags written in Markdown no longer adds a title to callouts (`<Note>` is a plain `note` callout) and no longer numbers steps, because both are automatic. `Panel` becomes `wc-aside`, `Tabs` sync with each other, and `Icon` and `Tooltip` convert instead of being removed.
</wc-update>

<wc-update version="0.2.0" date="November 2026" type="changed">
**Hidden pages are built:** a page with `hidden: true` is built and reachable even when no sidebar lists it, and it stays out of the sidebar, search, `llms.txt` and the sitemap. Sidebar links are written as absolute paths, so they work from any page depth. `layout: changelog`, `blog` and `post` (and the aliases `landing` and `centre`) are valid page layouts. In frontmatter, `tag` still means the page-header category, and the sidebar badge is `badge`. See [Pages and navigation](../writing-content/pages-and-navigation#hidden-pages).
</wc-update>

<wc-update version="0.2.0" date="November 2026" type="added">
**MCP server:** `docslit mcp` runs a Model Context Protocol server over stdio. In a project it offers 14 authoring tools, resources and prompts. With a URL it reads and searches any published DocsLit site. `docslit mcp --print-config` prints client config. See [MCP server](../ai-and-agents/mcp-server).
</wc-update>

<wc-update version="0.2.0" date="November 2026" type="added">
**Agent setup:** `docslit agents init` writes `AGENTS.md`, Claude Code skills, Cursor, Copilot, Windsurf and Gemini files, and merges MCP config. `docslit init` now writes `AGENTS.md` too. `docslit agents print` prints the skills. See [Agent setup](../ai-and-agents/agent-setup).
</wc-update>

<wc-update version="0.2.0" date="November 2026" type="added">
**Machine-readable CLI:** `docslit components [tag] --json`, `docslit schema [config|frontmatter]`, `docslit new --json --description --position`, and a `$schema` key in new `docslit.json` files. See [Machine-readable CLI](../ai-and-agents/machine-readable-cli).
</wc-update>

<wc-update version="0.2.0" date="November 2026" type="added">
**Validation as JSON:** `docslit validate --format json` prints `{ ok, summary, issues }` with a stable `code` and a `fix` for every issue. Line numbers now count from the first line of the file, including frontmatter. See [Validation](../cli-reference/validation).
</wc-update>

<wc-update version="0.2.0" date="November 2026" type="added">
**Lint:** `docslit lint` checks documentation quality with 16 configurable rules, `--format pretty|json|github`, and disable comments. See [Lint](../cli-reference/lint).
</wc-update>

<wc-update version="0.2.0" date="November 2026" type="added">
**Autogenerated sidebars:** `"sidebar": "auto"` or `autogenerate` on a group builds the sidebar from `docs/`. Order with `sidebar_position`, hide with `sidebar: false`, and label with `_category.json`. See [Autogenerated sidebars](../writing-content/autogenerated-sidebars).
</wc-update>

<wc-update version="0.2.0" date="November 2026" type="added">
**Collapsible sidebar groups:** add `collapsed` to any group. The reader's choice is remembered.
</wc-update>

<wc-update version="0.2.0" date="November 2026" type="added">
**Code import:** fence meta `file=`, `lines=` and `region=` pull code from real source files at build time. See [Import code from files](../writing-content/code-import).
</wc-update>

<wc-update version="0.2.0" date="November 2026" type="added">
**Math:** `$$...$$` and `math` fences render with KaTeX at build time. Opt in to `$...$` with `math.singleDollar`, or turn math off with `"math": false`. See [Math](../writing-content/math).
</wc-update>

<wc-update version="0.2.0" date="November 2026" type="added">
**Synced tabs:** give `wc-tabs` and `wc-code-group` the same `sync` key and they switch together, remembered across pages. See [Tabs and accordions](../components/tabs-and-accordions).
</wc-update>

<wc-update version="0.2.0" date="November 2026" type="added">
**Page feedback widget:** the `feedback` option adds "Was this page helpful?" with an optional endpoint, analytics events and a `docslit:feedback` browser event. See [Page feedback widget](../customization/feedback-widget).
</wc-update>

<wc-update version="0.2.0" date="November 2026" type="added">
**Reader polish:** headings show a copy-link icon, and `kbd` and `details` elements have styles.
</wc-update>

<wc-update version="0.2.0" date="November 2026" type="added">
**DocsLit Cloud for agents:** every published site has a hosted MCP endpoint at `/mcp`, a `/.well-known/mcp.json` descriptor, and `Accept: text/markdown` negotiation. See [DocsLit Cloud](../deployment/docslit-cloud).
</wc-update>

<wc-update version="0.2.0" date="November 2026" type="changed">
**Breaking: `docslit build` no longer writes `functions/` into your project.** It writes only into the output folder and refreshes an existing generated `functions/_middleware.js`. Run `docslit deploy --cloudflare` after a build to install it for Cloudflare Pages.
</wc-update>

<wc-update version="0.2.0" date="November 2026" type="changed">
**Breaking: `docslit login` uses your account password or a dashboard token.** It prompts for email and a hidden password, or takes `--token <token>`. It no longer creates accounts: sign up on the website and verify your email first. Use `DOCSLIT_TOKEN` and `DOCSLIT_API_URL` in CI, and `docslit logout` to remove and revoke the token. `docslit rollback` takes a deploy id. See [DocsLit Cloud](../deployment/docslit-cloud).
</wc-update>

<wc-update version="0.2.0" date="November 2026" type="changed">
**Cloud publishing limits:** uploads are limited in zip size, file count and file size, and plans limit projects, monthly deploys and rollback. Hosting files such as `_middleware.js`, `functions/`, `vercel.json`, `_headers`, `_redirects` and `mcp-server.js` are not served.
</wc-update>

<wc-update version="0.2.0" date="November 2026" type="changed">
**Importer mappings:** Mintlify `Danger` becomes a callout of type `error`. `Badge` `color` becomes `variant`. `Expandable` `defaultOpen` becomes `open`. `Update` `label` becomes `version`. `ParamField` keeps its location as `in`. Unsupported attributes such as `Card` `color` and `Frame` `type` are dropped.
</wc-update>

<wc-update version="0.2.0" date="November 2026" type="fixed">
**Search:** the bundled FlexSearch now keeps its default export, and `--offline` builds ship a classic-script copy, so search works again, including from `file://`.
</wc-update>

<wc-update version="0.2.0" date="November 2026" type="fixed">
**Generated `mcp-server.js`:** it now uses newline-delimited JSON-RPC, the standard MCP stdio framing, and negotiates protocol versions correctly.
</wc-update>

<wc-update version="0.2.0" date="November 2026" type="fixed">
**Code blocks:** multi-line code blocks no longer render double-spaced, and line numbers no longer count a phantom last line. Fenced `filename` and `linenumbers` now take effect.
</wc-update>

<wc-update version="0.2.0" date="November 2026" type="fixed">
**Versioned `mcp-server.js`:** the generated server now reads each version's folder, takes an optional `version` argument and defaults to your default version.
</wc-update>

<wc-update version="0.2.0" date="November 2026" type="fixed">
**Validation:** `validate` now checks component attributes, values and nesting, reports code-import failures and invalid math with their own codes, understands runtime `wc-var` variables, and checks bare relative image paths. `lint --fix` is gone, and `sidebar_title`, `new --position` and `deploy --out` work as documented.
</wc-update>

<wc-update version="0.2.0" date="November 2026" type="fixed">
**Asset paths:** `logo`, `favicon` and `css` files are copied to the same relative path the HTML references, including files in subfolders.
</wc-update>

<wc-update version="0.2.0" date="November 2026" type="changed">
**Docs:** the AI Skills page moved to [Agent setup](../ai-and-agents/agent-setup). The old URL redirects there.
</wc-update>

## 0.1.11

<wc-update version="0.1.11" date="August 2026" type="added">
**AsciiDoc tables:** author tables with AsciiDoc syntax via `<wc-asciidoc-table>`. Column specs, spans, alignment, cell styles, CSV/DSV/TSV, titles, and footers. Parsed at build time into real HTML tables. See [AsciiDoc tables](../components/asciidoc-tables).
</wc-update>

<wc-update version="0.1.11" date="August 2026" type="changed">
**Apache-2.0 license:** the DocsLit CLI is now licensed under Apache-2.0 (was AGPL-3.0). DocsLit Cloud remains a separate proprietary product.
</wc-update>

<wc-update version="0.1.11" date="August 2026" type="changed">
**Node.js `>=20.19.0`:** engines no longer require Node 24. Installs work on common CI images and corporate machines running Node 20 or 22.
</wc-update>

<wc-update version="0.1.11" date="August 2026" type="changed">
**Vendored FlexSearch:** client search loads a local FlexSearch bundle instead of `esm.sh`, so air-gapped and CSP-restricted environments work reliably.
</wc-update>

<wc-update version="0.1.11" date="August 2026" type="added">
**Site chrome:** configure `navbar`, `footer`, `head`, `css`, `analytics` (Plausible, PostHog, GA4, Fathom), and `favicon` in `docslit.json`. See [Site chrome](../customization/site-chrome).
</wc-update>

<wc-update version="0.1.11" date="August 2026" type="added">
**`basePath`:** deploy under a subpath such as GitHub Pages project sites (`https://user.github.io/repo/`). Asset URLs, SPA navigation, and sitemaps respect the prefix.
</wc-update>

<wc-update version="0.1.11" date="August 2026" type="added">
**Redirects:** site-level `redirects` in `docslit.json` and frontmatter `redirect` emit meta-refresh stubs plus `_redirects` / `vercel.json` entries for Netlify, Vercel, and Cloudflare.
</wc-update>

<wc-update version="0.1.11" date="August 2026" type="added">
**API playground:** `<wc-playground>` lets readers try OpenAPI endpoints from the docs (auth, params, live response). Scaffold and `ref` resolution wire it automatically. Optional `playground.proxyUrl` for CORS proxies. See [OpenAPI integration](../integrations/openapi).
</wc-update>

<wc-update version="0.1.11" date="August 2026" type="added">
**Changelog / blog + RSS:** pages with `layout: changelog|blog` (or under `changelog/` / `blog/`) get dated collection support and build-time `rss.xml` / `atom.xml` feeds when `url` is set.
</wc-update>

<wc-update version="0.1.11" date="August 2026" type="added">
**Images:** lazy loading, lightbox zoom via `<wc-image>`, dark-mode variants (`#dark=` / `dark-src`), and build-time width/height for CLS. Docs assets are served in `dev` and copied on build.
</wc-update>

<wc-update version="0.1.11" date="August 2026" type="added">
**Social / OG images:** each page gets a build-time card (`og/{page}.png`) with title and site name; `og:image` and `twitter:card=summary_large_image` are set automatically. Opt out with `ogImage: false`.
</wc-update>

<wc-update version="0.1.11" date="August 2026" type="changed">
**Section search:** headings get stable IDs at build time; the search index returns `Page → Heading` chunks with anchor links, and page bodies are trimmed to keep the index smaller.
</wc-update>

<wc-update version="0.1.11" date="August 2026" type="changed">
**Sitemap `lastmod`:** uses git history (mtime fallback) per page instead of stamping today’s date on every URL.
</wc-update>

<wc-update version="0.1.11" date="August 2026" type="added">
**i18n:** locale trees like `docs.fr/` / `docs.ja/`, locale switcher, `hreflang` tags, and per-locale sidebars. See [Internationalization](../customization/i18n).
</wc-update>

<wc-update version="0.1.11" date="August 2026" type="added">
**`docslit new` and `docslit deploy`:** scaffold pages into the sidebar; write GitHub Pages, Netlify, or Cloudflare recipe files. See [Commands](../cli-reference/commands) and [Static hosting](../deployment/static-hosting).
</wc-update>

<wc-update version="0.1.11" date="August 2026" type="added">
**Validate for CI:** `docslit validate --external` checks outbound links; `--format github` prints Actions annotations for inline PR feedback. See [Validation](../cli-reference/validation).
</wc-update>

<wc-update version="0.1.11" date="August 2026" type="added">
**Plugin hooks:** optional `docslit.config.js` with `transformPage` and `onBuildEnd` escape hatches. Shiki highlighting now persists a disk cache across runs for faster rebuilds.
</wc-update>

<wc-update version="0.1.11" date="August 2026" type="added">
**Copy page dropdown:** the per-page action bar replaces the old copy/view Markdown buttons with a split **Copy page** dropdown. Options: copy the page as Markdown for LLMs, open the page in ChatGPT, open in Claude, and copy the `npx` MCP install command for the site's MCP server.
</wc-update>

<wc-update version="0.1.11" date="August 2026" type="added">
**Agent directives and root `llms.txt` for versioned sites:** every HTML page and Markdown output file now includes an in-band agent directive pointing to the documentation index. Versioned sites get a root `/llms.txt` that acts as a version index, listing each version with a link to its own `llms.txt`. Follows the [Agent-Friendly Documentation Spec](https://agentdocsspec.com/spec/).
</wc-update>

<wc-update version="0.1.11" date="August 2026" type="fixed">
**Frontmatter titles in sidebar:** pages now use their frontmatter `title` in the sidebar instead of falling back to the filename when a title is set.
</wc-update>

<wc-update version="0.1.11" date="August 2026" type="fixed">
**Versioned doc links:** links inside web components in versioned sites now resolve correctly relative to the page's URL rather than the site root.
</wc-update>

## 0.1.10

<wc-update version="0.1.10" date="June 2026" type="added">
**Custom logo:** set `"logo": "logo.svg"` in `docslit.json` to replace the default favicon in the navigation bar with your own logo. Place the image file in your project root and it will be copied to the build output automatically. See [Logo](../customization/logo).
</wc-update>

<wc-update version="0.1.10" date="June 2026" type="added">
**Chapter PDF export:** run `docslit build --pdf` to generate chapter PDFs (one per sidebar group), per-page PDFs, and a full documentation PDF in `dist/pdf/`. Readers get a **Download PDF** dropdown on each page. Configure via the `pdf` block in `docslit.json`, or enable permanently with `"enabled": true`. Requires Playwright as an optional peer dependency. See [Chapter PDF export](../deployment/chapter-pdf-export).
</wc-update>

<wc-update version="0.1.10" date="June 2026" type="added">
**Color presets and brand themes:** set `"theme": "ocean"` (or `teal`, `slate`, `forest`, `violet`, `rose`, `amber`, `graphite`) in `docslit.json` to apply a professional color palette with full light and dark support. Define corporate branding with `docslit theme init`, which scaffolds a `brand-theme.json` file you can extend from any preset and override accent colors, surfaces, fonts, and radius. See [Theming](../customization/theming).
</wc-update>

<wc-update version="0.1.10" date="June 2026" type="added">
**Announcement banner:** add an `announcement` block to `docslit.json` to show a dismissible site-wide banner at the top of every page. The message supports Markdown and HTML. Readers can dismiss it; updating the message brings it back. Version-specific overrides are supported in `versions.list`. Fern imports pick up `announcement` from `docs.yml`. See [Announcement banner](../customization/announcement-banner).
</wc-update>

## 0.1.9

<wc-update version="0.1.9" date="June 2026" type="added">
**Accessibility settings widget:** a new accessibility button in the navbar opens a settings panel with text size adjustment, high contrast mode, grayscale mode, and underline links toggle. Settings are stored in localStorage and persist across page reloads. The widget works in all three modes (dev, static, offline) and respects the offline security model with event delegation.
</wc-update>

<wc-update version="0.1.9" date="June 2026" type="added">
**Favicon and edit-this-page link:** static builds now include a favicon and an "Edit this page" link on every page. The edit URL is auto-detected from your Git remote, so no manual configuration is needed for GitHub-hosted projects.
</wc-update>

<wc-update version="0.1.9" date="June 2026" type="changed">
**Typography refinements:** text rendering is improved across all platforms with font smoothing, OpenType features (ligatures, kerning, contextual alternates), and refined letter and word spacing for body text, headings, and code blocks.
</wc-update>

<wc-update version="0.1.9" date="June 2026" type="fixed">
`wc-tree-item` now accepts a `title` attribute as an alias for `label`, improving compatibility with imported content.
</wc-update>

## 0.1.8

<wc-update version="0.1.8" date="May 2026" type="added">
**Multi-file offline builds with lazy loading:** offline mode now splits into per-page JS files that load on demand via script injection, working directly from `file://` URLs without a server. Vendor JS is inlined as data URIs to avoid CORS restrictions. Hash-based navigation handles `file://` with History API fallback, and delegated click handlers support links inside web components. SEO-only artifacts are skipped in offline mode. See [Offline builds](../deployment/offline-builds).
</wc-update>

<wc-update version="0.1.8" date="May 2026" type="added">
**Parallel builds and caching:** page builds now run in parallel, Shiki syntax highlighting results are cached, and languages load lazily on demand. The dev server caches build artifacts for faster reloads. Build timing is reported so you can see where time is spent.
</wc-update>

<wc-update version="0.1.8" date="May 2026" type="added">
**Reduced layout shift and faster loading:** `docslit-app.js` is now deferred and Google Fonts CSS loads asynchronously with metric-matched fallback fonts. Layout space is reserved for `wc-columns`, `wc-tiles`, `wc-tabs`, and `wc-accordion` before component upgrade to eliminate cumulative layout shift.
</wc-update>

<wc-update version="0.1.8" date="May 2026" type="added">
**Dynamic meta descriptions:** the SPA shell now includes a `<meta name="description">` tag that updates dynamically during navigation across all three modes. Falls back to `config.description` when pages lack a frontmatter description.
</wc-update>

<wc-update version="0.1.8" date="May 2026" type="added">
**Reusable content includes:** DocsLit now supports compile-time includes with `pass:[<wc-include src="..."/>]`. Includes are intentionally strict: targets must be Markdown files under `docs/_reusables/**`, include tags must be self-closing, and unsafe paths are blocked.
</wc-update>

<wc-update version="0.1.8" date="May 2026" type="added">
**Variable precedence for compile-time rendering:** `pass:[{{VAR}}]` placeholders in prose now resolve with clear precedence: global `attributes` in `docslit.json`, then page frontmatter `attributes`, then page-local `pass:[<wc-var name="X" value="Y" />]` declarations.
</wc-update>

<wc-update version="0.1.8" date="May 2026" type="added">
**Pass-through escape syntax:** use `pass:[pass:[...]]` to render syntax literally when you are documenting templates or components. Example: `pass:[{{TOKEN}}]` or `pass:[<wc-include src="..." />]`.
</wc-update>

<wc-update version="0.1.8" date="May 2026" type="added">
**Expanded Markdown for AI consumers:** markdown output now uses preprocessed content (includes and compile-time variables resolved), improving quality for `llms-full.txt`, search indexing, and markdown-based AI ingestion.
</wc-update>

<wc-update version="0.1.8" date="May 2026" type="added">
**Version-aware global variables:** two built-in globals are now available on every page: `{{DOCSLIT_VERSION}}` and `{{DOCSLIT_BRANCH}}`.
</wc-update>

<wc-update version="0.1.8" date="May 2026" type="changed">
**Offline build security hardening:** offline builds are now hardened for secure, air-gapped environments. All inline event handlers (`onclick`, `oninput`, etc.) are replaced with event delegation. User-facing values are HTML-escaped to prevent DOM-based XSS. Google Fonts and all external requests are removed.
</wc-update>

<wc-update version="0.1.8" date="May 2026" type="changed">
**WCAG contrast improvements:** light-mode text and accent colors are darkened for WCAG AA compliance. Theme toggle and copy buttons get proper `aria-label` attributes, and the menu button meets minimum touch target size requirements.
</wc-update>

<wc-update version="0.1.8" date="May 2026" type="fixed">
Nested include checks no longer fail when reusable files contain include syntax only inside fenced code examples.
</wc-update>

<wc-update version="0.1.8" date="May 2026" type="fixed">
Inline literal rendering now uses explicit `pass:[...]` behavior, avoiding accidental formatting regressions while keeping variable syntax usable in normal prose.
</wc-update>

<wc-update version="0.1.8" date="May 2026" type="fixed">
Validator now resolves relative internal links correctly and excludes reusable files under `docs/_reusables/` from validation.
</wc-update>

<wc-update version="0.1.8" date="May 2026" type="fixed">
Versioned offline builds no longer write null shared files to disk.
</wc-update>

<wc-update version="0.1.8" date="May 2026" type="fixed">
Mobile sidebar now extends to the full viewport height instead of stopping short on pages with little content.
</wc-update>

## 0.1.7

<wc-update version="0.1.7" date="May 2026" type="added">
**Syntax highlighting with Shiki:** code blocks now use Shiki for build-time highlighting with dual-theme support. Blocks automatically match your page's light or dark theme, and a kebab menu on every code block lets readers switch code between light and dark mode independently of the page theme. The preference is saved for future visits. See [Code blocks](../components/code-blocks).
</wc-update>

<wc-update version="0.1.7" date="May 2026" type="added">
**Copy button on code groups:** tabbed code groups now include a copy button matching individual code blocks, so readers can copy the active tab's code without selecting text.
</wc-update>

<wc-update version="0.1.7" date="May 2026" type="added">
**Opt-in line numbers:** add `linenumbers="true"` to any code block to display a non-selectable line number gutter. Line numbers are off by default and only appear when explicitly requested.
</wc-update>

<wc-update version="0.1.7" date="May 2026" type="added">
**Save as PDF:** a "Save as PDF" button now appears in the page toolbar alongside "Copy as Markdown" and "View as Markdown". It produces clean print output with all accordions and tabs expanded, page chrome hidden, and page breaks prevented inside code blocks and tables.
</wc-update>

<wc-update version="0.1.7" date="May 2026" type="added">
**Generate API docs from OpenAPI specs:** point DocsLit at your OpenAPI 3.x spec and run `docslit openapi scaffold` to generate a complete API reference site. Every endpoint gets its own page with parameters, request bodies, response fields, and examples pulled directly from the spec. See [OpenAPI integration](../integrations/openapi).
</wc-update>

<wc-update version="0.1.7" date="May 2026" type="added">
**API reference layout:** API pages now use a dedicated three-column layout with your endpoint documentation on the left and code examples on the right, similar to Stripe and Twilio docs.
</wc-update>

<wc-update version="0.1.7" date="May 2026" type="added">
**Organized API sidebar:** the sidebar automatically mirrors your spec's tag structure with nested groups and color-coded HTTP method badges (GET, POST, PUT, DELETE) next to each endpoint.
</wc-update>

<wc-update version="0.1.7" date="May 2026" type="added">
**Rich parameter documentation:** request parameters and body fields display their type, format, constraints (min/max length, allowed values, patterns), defaults, and examples. Nested objects and arrays are rendered as collapsible sections.
</wc-update>

<wc-update version="0.1.7" date="May 2026" type="added">
**Response schema documentation:** response body fields are extracted from the spec and displayed with the same rich formatting as request parameters, including nested structures.
</wc-update>

<wc-update version="0.1.7" date="May 2026" type="added">
**Redesigned parameter fields:** the `wc-field` component now uses a single-column Stripe-style layout with inline expand/collapse for nested fields and a dedicated box for enum values. New attributes let you display parameter location, format, constraints, and inline Markdown descriptions.
</wc-update>

<wc-update version="0.1.7" date="May 2026" type="added">
**Hybrid sidebar:** sites with both regular documentation and an OpenAPI spec now get separate "API Reference" and "Documentation" sidebars with toggle links in the nav bar.
</wc-update>

<wc-update version="0.1.7" date="May 2026" type="added">
**Mobile API examples:** on smaller screens (1280px and below), API examples now appear below the main content instead of being hidden.
</wc-update>

<wc-update version="0.1.7" date="May 2026" type="added">
**AI-readable API docs:** when AI agents request your API pages, they get clean Markdown with parameter tables, field descriptions, and JSON examples instead of raw component tags. Works with any agent that reads Markdown.
</wc-update>

<wc-update version="0.1.7" date="May 2026" type="added">
**MCP server for AI tools:** every build generates an MCP server that AI tools like Claude Desktop and Cursor can connect to. Agents can list pages, read full content, and search your docs without leaving their workflow.
</wc-update>

<wc-update version="0.1.7" date="May 2026" type="added">
**Content negotiation:** AI agents can request any page URL with `Accept: text/markdown` to get raw Markdown instead of HTML. Works out of the box on Cloudflare Pages, Vercel, and Netlify.
</wc-update>

<wc-update version="0.1.7" date="May 2026" type="added">
**AI authoring and migration skills:** install skill files into Claude Code, Cursor, or Windsurf so your AI assistant knows how to write correct DocsLit pages and convert existing MDX docs. See [Agent setup](../ai-and-agents/agent-setup).
</wc-update>

<wc-update version="0.1.7" date="May 2026" type="fixed">
Sidebar search no longer breaks method badges -- filtering and clearing the search input keeps badges intact.
</wc-update>

<wc-update version="0.1.7" date="May 2026" type="fixed">
Switching between API pages no longer shows leftover request and response examples from the previous page.
</wc-update>

<wc-update version="0.1.7" date="May 2026" type="fixed">
Code group theme toggle dropdown no longer gets clipped by the tab bar.
</wc-update>

<wc-update version="0.1.7" date="May 2026" type="fixed">
OpenAPI scaffold now properly escapes frontmatter values containing special YAML characters.
</wc-update>

## 0.1.6

<wc-update version="0.1.6" date="April 2026" type="added">
**Drop-in MDX support:** PascalCase component names like `<Tip>`, `<Card>`, and `<Steps>` now work directly in Markdown files. DocsLit recognizes roughly 25 Mintlify and MDX component names and rewrites them to their DocsLit equivalents at parse time. Most Mintlify projects can be moved over without changing source files. See [Markdown basics](../writing-content/markdown-basics).
</wc-update>

<wc-update version="0.1.6" date="April 2026" type="added">
**Full-text search:** press Cmd+K (or Ctrl+K) to open a search dialog that searches across all pages with instant results as you type. Results are grouped by sidebar section with highlighted matches and full keyboard navigation.
</wc-update>

<wc-update version="0.1.6" date="April 2026" type="added">
**Multi-version documentation:** host multiple versions of your documentation on a single site with a version selector. Versions map to git branches, so teams can maintain separate branches for each product release and build them into a unified site with versioned URLs. See [Versioning](../customization/versioning).
</wc-update>

<wc-update version="0.1.6" date="April 2026" type="added">
**Active section tracking:** the table of contents on the right now shows a colored guide line that follows you as you scroll. The active section updates smoothly, and clicking a heading highlights it instantly.
</wc-update>

<wc-update version="0.1.6" date="April 2026" type="added">
**Fenced code block variables:** `{{VAR}}` placeholders in fenced code blocks now update in real time when readers edit a variable on the page. All fenced code blocks also get copy buttons automatically.
</wc-update>

<wc-update version="0.1.6" date="April 2026" type="added">
**Inline variable references:** `{{VAR}}` patterns in regular Markdown text are automatically converted to live variable displays that update when the variable is changed elsewhere on the page.
</wc-update>

<wc-update version="0.1.6" date="April 2026" type="added">
**Copy as Markdown and View as Markdown:** every page now shows buttons to copy the raw Markdown source to your clipboard or open it in a new tab.
</wc-update>

<wc-update version="0.1.6" date="April 2026" type="added">
**Per-route HTML pages:** static builds now generate a full HTML file for every page route instead of a single SPA shell. Your site works on any static host without rewrite rules or fallback configuration.
</wc-update>

<wc-update version="0.1.6" date="April 2026" type="added">
**SEO improvements:** static builds now generate `robots.txt`, `sitemap.xml`, Open Graph and Twitter Card meta tags, canonical URLs, and JSON-LD structured data automatically. See [Search and SEO](../writing-content/search-and-seo).
</wc-update>

<wc-update version="0.1.6" date="April 2026" type="added">
**Accordion group component:** a new `wc-accordion-group` component visually connects adjacent accordions into a unified group with shared borders.
</wc-update>

<wc-update version="0.1.6" date="April 2026" type="added">
**Custom 404 page:** navigating to a non-existent page now shows a styled error page with a search button and a link back to your docs.
</wc-update>

<wc-update version="0.1.6" date="April 2026" type="added">
**Sidebar keyboard navigation:** arrow keys, Home, End, Enter, and Escape now work in the sidebar filter for fast navigation without a mouse.
</wc-update>

<wc-update version="0.1.6" date="April 2026" type="added">
**Expanded import detection:** the import tool now recognizes 11 documentation frameworks including Docusaurus, MkDocs, Sphinx, ReadMe, VuePress, VitePress, Starlight, and Nextra, in addition to Mintlify, Fern, and GitBook.
</wc-update>

<wc-update version="0.1.6" date="April 2026" type="added">
**Import versioning:** importing a Mintlify project with multiple versions now offers four strategies: branch-based versioning, keep only latest, merge all versions, or skip for manual setup.
</wc-update>

<wc-update version="0.1.6" date="April 2026" type="added">
**Icon support:** built-in Lucide icons are available via `wc-icon`, and Font Awesome icons from imported projects are fetched from CDN and rendered inline.
</wc-update>

<wc-update version="0.1.6" date="April 2026" type="added">
**Nested page IDs:** page slugs in `docslit.json` now support folder paths (e.g., `getting-started/introduction`) for organizing pages in subdirectories.
</wc-update>

<wc-update version="0.1.6" date="April 2026" type="added">
**Accessibility improvements:** skip-to-content link, focus traps in search, `prefers-reduced-motion` and `prefers-contrast` support, ARIA tab patterns with arrow key navigation, visible focus indicators, and semantic landmarks across all components.
</wc-update>

<wc-update version="0.1.6" date="April 2026" type="fixed">
Search result navigation no longer stacks path segments on nested page IDs.
</wc-update>

<wc-update version="0.1.6" date="April 2026" type="fixed">
Web components are no longer stripped during client-side navigation.
</wc-update>

<wc-update version="0.1.6" date="April 2026" type="fixed">
Tiles grid layout no longer overlaps when using auto-fill columns.
</wc-update>

## 0.1.5

<wc-update version="0.1.5" date="April 2026" type="added">
**Client-side Markdown rendering:** published sites now fetch and render Markdown in the browser, so pages load without a server-side rendering step.
</wc-update>

<wc-update version="0.1.5" date="April 2026" type="added">
**llms.txt improvements:** generated `llms.txt` files now include clearer instructions showing where to fetch raw Markdown for each page.
</wc-update>

<wc-update version="0.1.5" date="April 2026" type="added">
**Import resilience:** the import tool now handles malformed frontmatter, invalid YAML, and inline JSX expressions without crashing.
</wc-update>

## Earlier releases

<wc-accordion-group>
<wc-accordion title="0.1.4 — Component polish and shareable links">

- Fixed padding in tabbed panels, file tree lines, highlighted filenames in light mode, and inline anchor layout
- Shareable anchor links — clicking any heading in the "On this page" sidebar updates the URL so you can copy and share a direct link to any section
- Security hardening for the dev server and auth token storage

</wc-accordion>

<wc-accordion title="0.1.3 — Open source license">

- DocsLit is now open source under the AGPL-3.0 license
- Free for personal and open source projects — the docs you generate are always yours

</wc-accordion>

<wc-accordion title="0.1.2 — Dark mode, mobile sidebar, and icons">

- Cards and tiles now support icons via the `iconName` attribute
- Dark and light mode works across all components — switching themes updates everything instantly
- Mobile sidebar with hamburger menu, slide-in overlay, and tap-outside-to-close
- Browser back/forward button works correctly when navigating between pages
- Lit vendor bundles ship locally — no CDN requests, fully offline capable

</wc-accordion>

<wc-accordion title="0.1.1 — Code blocks and new components">

- Code blocks display source text correctly — no more disappearing angle brackets
- New components: file trees, visual trees, download buttons, copy-to-clipboard, anchor links, and version badges
- Built-in preview server for browsing component examples locally

</wc-accordion>

<wc-accordion title="0.1.0 — Initial release">

The first public release of DocsLit with:

- Markdown rendering with web component preservation
- 39 built-in Lit web components
- Dev server with hot reload
- Static site builder
- Offline single-file builds
- Mintlify, Fern, and GitBook migration
- Project validation
- DocsLit Cloud deployment

</wc-accordion>
</wc-accordion-group>
