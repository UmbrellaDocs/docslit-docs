---
title: Chapter PDF export
description: Generate chapter, page, and full-documentation PDFs at build time with docslit build --pdf, and let readers download them from your site.
tag: Deployment
readtime: 6 min read
---

# Chapter PDF export

DocsLit can generate real PDF files alongside your static site — one per sidebar chapter, one per page, and a combined full documentation PDF. Readers download them from a **Download PDF** menu on each page.

PDF export is **opt-in** and **disabled by default**. Enable it per build with `--pdf`, or turn it on permanently in `docslit.json`.

## Quick start

Install Playwright in your project (one-time setup):

```bash
npm install -D playwright
npx playwright install chromium
```

Build with PDFs:

```bash
docslit build --pdf
```

Output lands in `dist/pdf/`:

| File | Description |
|---|---|
| `pdf/{chapter-id}.pdf` | One PDF per top-level sidebar group |
| `pdf/pages/{slug}.pdf` | One PDF per page (nested slugs use `--`, e.g. `guides--setup.pdf`) |
| `pdf/full-manual.pdf` | All chapters combined in sidebar order (full documentation) |
| `pdf/manifest.json` | Machine-readable index of generated PDFs |

<wc-callout type="info" title="Requires a standard build">
PDF generation needs pre-rendered `.html` pages and does not run with `--offline`. If you pass both flags, DocsLit skips PDFs and prints a warning.
</wc-callout>

## Reader experience

When PDFs are built, the page meta bar shows a **Download PDF** dropdown instead of a single **Save as PDF** button:

- **This page as PDF** — opens the browser print dialog (same as before)
- **Download this chapter as PDF** — downloads the pre-built chapter PDF for the current page's sidebar group
- **Download full documentation** — downloads the combined documentation PDF

If a page is not part of any chapter (for example, an orphan page or an API reference page excluded from chapters), only **This page as PDF** appears.

When PDFs are not built, the site keeps the original **Save as PDF** print button.

## Configuration

Add a `pdf` block to `docslit.json`:

```json filename="docslit.json"
{
  "name": "My Docs",
  "sidebar": [
    {
      "group": "Getting started",
      "pages": ["introduction", "installation", "quickstart"]
    },
    {
      "group": "Guides",
      "pages": ["guides/authentication", "guides/deployment"]
    }
  ],
  "pdf": {
    "enabled": false,
    "strategy": "sidebar-groups",
    "outputDir": "pdf",
    "include": {
      "pages": true,
      "chapters": true,
      "fullManual": true,
      "apiReference": false
    },
    "ignore": ["licenses"],
    "manual": []
  }
}
```

<wc-fields header="pdf options">
<wc-field name="enabled" type="boolean" default="false">
When `true`, every `docslit build` generates PDFs without needing `--pdf`.
</wc-field>
<wc-field name="strategy" type="string" default="sidebar-groups">
How chapters are grouped. One of `sidebar-groups`, `folders`, or `manual`.
</wc-field>
<wc-field name="outputDir" type="string" default="pdf">
Subdirectory inside `--out` where PDFs are written (e.g. `dist/pdf/`).
</wc-field>
<wc-field name="include.pages" type="boolean" default="true">
Generate a PDF for each individual page.
</wc-field>
<wc-field name="include.chapters" type="boolean" default="true">
Generate one PDF per chapter.
</wc-field>
<wc-field name="include.fullManual" type="boolean" default="true">
Generate a combined full-documentation PDF.
</wc-field>
<wc-field name="include.apiReference" type="boolean" default="false">
Include `api/*` pages in chapter and manual PDFs. Off by default for hybrid docs + OpenAPI sites.
</wc-field>
<wc-field name="ignore" type="string[]" default="[]">
Page IDs excluded from chapter and manual PDFs. Ignored pages still get per-page PDFs when `include.pages` is true.
</wc-field>
<wc-field name="manual" type="array" default="[]">
Custom chapter definitions when `strategy` is `manual`. Each entry: `{ "id", "title", "pages" }`.
</wc-field>
</wc-fields>

### Flag precedence

CLI flags override config:

| Priority | Source |
|---|---|
| 1 (highest) | `--no-pdf` |
| 2 | `--pdf` |
| 3 | `pdf.enabled` in config |
| 4 (default) | Off |

```bash
# One-off PDF build
docslit build --pdf

# Always on via config (pdf.enabled: true)
docslit build

# CI: HTML only despite config
docslit build --no-pdf

# Custom output directory
docslit build --pdf --pdf-dir manuals
```

## Chapter strategies

### sidebar-groups (default)

One PDF per top-level `sidebar[].group`. Pages inside nested subgroups are flattened into the parent group, in sidebar order.

A sidebar like this:

```json
{
  "group": "Getting started",
  "pages": [
    "introduction",
    { "group": "Setup", "pages": ["installation", "quickstart"] }
  ]
}
```

Produces a single chapter PDF titled **Getting started** containing `introduction`, `installation`, and `quickstart` in that order.

### folders

Groups pages by the first path segment of their slug. `guides/setup` and `guides/config` become one **guides** chapter. Top-level pages like `introduction` go into a **docs** chapter.

Useful when your `docs/` folder is organized by directory but the sidebar is flat or minimal.

### manual

Define chapters explicitly:

```json
{
  "pdf": {
    "strategy": "manual",
    "manual": [
      {
        "id": "onboarding",
        "title": "Onboarding Guide",
        "pages": ["introduction", "installation", "quickstart"]
      },
      {
        "id": "admin-handbook",
        "title": "Administrator Handbook",
        "pages": ["guides/authentication", "guides/deployment"]
      }
    ]
  }
}
```

## Versioned sites

When using [versioning](../customization/versioning), PDFs are generated per version under `dist/{version}/pdf/`. Each version gets its own manifest and chapter PDFs based on that version's sidebar.

## CI/CD

Add Playwright to your build pipeline when generating PDFs:

```yaml filename=".github/workflows/deploy.yml"
steps:
  - uses: actions/checkout@v4
  - uses: actions/setup-node@v4
    with:
      node-version: 24
  - run: npm install -g docslit
  - run: npx playwright install --with-deps chromium
  - run: docslit build --pdf
  - run: docslit build --no-pdf  # HTML-only job example
```

<wc-callout type="tip" title="Split HTML and PDF jobs">
Run `docslit build` for fast HTML deploys on every push, and `docslit build --pdf` on a schedule or release tag when you need updated manuals. PDF generation is slower because it launches headless Chromium for each target.
</wc-callout>

## Edge cases

| Situation | Behavior |
|---|---|
| Draft pages | Excluded from all PDFs |
| Empty chapter (all drafts) | Skipped — no empty PDF file |
| Single-page chapter | Still generated as a single-page PDF |
| Page not in sidebar | Per-page PDF only; no chapter item in dropdown |
| `api/*` pages | Excluded from chapters unless `include.apiReference` is true |
| Missing Playwright | Build exits with install instructions |
| `--offline` | PDF generation skipped with a warning |

## Migrating from Docusaurus

If your team used Docusaurus with a PDF plugin (such as Papersaurus), DocsLit provides a similar workflow without a React site:

1. Run `docslit import` to convert your existing Markdown and sidebar.
2. Chapters map to top-level sidebar groups automatically.
3. Run `docslit build --pdf` to produce chapter and manual PDFs.
4. Deploy `dist/` as usual — PDFs are static files alongside HTML.

Your writers keep editing Markdown. PDFs stay in sync with the sidebar structure they already maintain.

## Related

- [Static hosting](static-hosting) — deploy `dist/` including the `pdf/` directory
- [Commands](../cli-reference/commands) — full `--pdf` flag reference
- [Pages and navigation](../writing-content/pages-and-navigation) — how sidebar groups define site structure
