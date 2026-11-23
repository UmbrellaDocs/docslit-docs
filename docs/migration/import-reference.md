---
title: Import reference
description: Every flag of docslit import, how format detection works, what MIGRATION.md and the JSON report contain, the issue codes you will meet, and the known limits of the importer.
tag: Migration
readtime: 7 min read
---

# Import reference

`docslit import` converts a Mintlify, Fern, GitBook or MkDocs project into a DocsLit project. This page is the reference for the command: its flags, how it picks a format, the report it writes and the limits you should plan for. For a walkthrough, start with the guide for your platform: [Mintlify](from-mintlify), [Fern](from-fern), [GitBook](from-gitbook) or [MkDocs](from-mkdocs).

```bash
docslit import <source-dir> [options]
```

## Flags

| Flag | What it does |
|---|---|
| `--out <dir>` | The output directory. The default is `<source-dir>-docslit`. It is never the source folder, and it is refused when it is not empty unless you pass `--force`. |
| `--from <mintlify\|fern\|gitbook\|mkdocs>` | Skip detection and treat the source as this format. Any other value exits with an error. |
| `--dry-run` | Convert and report everything without writing files. |
| `--theme <name>` | The built-in theme or palette to apply, plus your brand colors. The default is `peppermint` for Mintlify, `frond` for Fern and `folio` for GitBook. An unknown name gets a warning with the nearest match, and the default theme is used. See [Themes](../customization/theming). |
| `--no-theme` | Do not select a built-in theme. Brand colors are still applied. |
| `--versions <tabs\|latest>` | How to treat versioned navigation: one tab per version, which is the default, or only the default version. |
| `--force` | Overwrite a non-empty output directory. |
| `--json` | Print the migration report as JSON instead of text. |

The source folder is never modified, and the output is deterministic, so re-running an import with the same input regenerates the same files.

```bash
docslit import ./my-mintlify-docs --out ./docs-site
docslit import ./fern --from fern --theme frond --json
docslit import ./site --dry-run
```

## How the format is detected

Point the command at the folder that holds the project config. DocsLit checks, in order:

| Format | Detected by |
|---|---|
| Mintlify | `docs.json`, or the legacy `mint.json` |
| Fern | `fern/docs.yml`, in the folder you pass, or in the `fern/` folder you pass |
| GitBook | `SUMMARY.md` or `.gitbook.yaml`, including its `root` setting |
| MkDocs, Material for MkDocs, Zensical | `mkdocs.yml`, `mkdocs.yaml` or `zensical.toml` |
| Markdown folder | None of the above. Every `.md` and `.mdx` file is imported with an automatic sidebar. |

The detection is printed at the start of the run, for example `Detected: Mintlify (docs.json)`.

## What the output looks like

```text
my-docs-docslit/
├── docslit.json        site config: name, theme, tabs or sidebar, navbar, footer, redirects
├── MIGRATION.md        everything that needs a human
├── docs/               pages as Markdown, plus images and other assets
│   └── _reusables/     snippets, included with wc-include
├── logo/               copied logos and favicon
└── api-reference/      a copied OpenAPI spec, when there is one
```

## The migration report

Every run prints a summary. This is the real output of importing the Mintlify fixture that ships with the DocsLit CLI:

```text
  DocsLit — importing from my-mintlify-docs
  Detected: Mintlify (docs.json)

  ✓ Pages converted: 11   Snippets: 3   Assets: 8

  Components converted:
    <Card>                     → wc-card                ×6
    <ParamField>               → wc-field               ×4
    <Badge>                    → wc-badge               ×3
    <Step>                     → wc-step                ×3
    … and 44 more

  Config keys mapped: 16   not converted: 3
  Theme: peppermint, brand colours from source, fonts Inter, system mode by default

  Needs attention: 2 errors, 3 warnings, 4 notes
    ✗ components/layout.mdx:31 Component <MyChart> is not a known Mintlify/Fern component and has no DocsLit equivalent.
    ✗ installation.mdx:30 Component <Status> is not a known Mintlify/Fern component and has no DocsLit equivalent.
    ! components/layout.mdx:21 <Panel> (right-rail content) becomes a floating <wc-aside>; keep it near the top of the page.
    ! docs.json Analytics/integration "intercom" has no DocsLit equivalent.
    ! docs.json Redirect "/old/:slug*" -> "/guides/:slug*" uses a wildcard/pattern, which DocsLit redirects do not support.

  Validation of the result: 0 errors, 0 warnings
```

The same data is written to `MIGRATION.md` in the output, grouped as **Must fix** (errors), **Review** (warnings) and **For your information** (notes), followed by tables of the components converted and the config keys mapped or not converted. Each item in it has this shape:

```markdown
- **`components/layout.mdx:31`** [`unknown-component`] <MyChart> Component <MyChart> is not a known Mintlify/Fern component and has no DocsLit equivalent.
  - Done instead: Replaced with a warning callout marked "Unconverted component".
  - How to fix: Replace the callout with the intended content, or build a DocsLit custom component (components/my-chart.js).
```

An unknown or custom component is never silently dropped. It stays in the page inside a warning callout titled "Unconverted component", so you can find it and replace it. Delete `MIGRATION.md` when you have worked through it.

### Severity and exit codes

| Severity | Meaning |
|---|---|
| Error | Content that could not be converted and was replaced by a placeholder. Fix these first. |
| Warning | A conversion that probably needs a look, or a setting that was skipped. |
| Info | A note, such as a key that has no equivalent. |

After converting, the importer runs `docslit validate` on the result and reports the numbers. The command exits with code `1` when that validation finds errors, and with `0` otherwise, even when the report contains conversion errors. An invalid `--from` or `--versions` value, or a non-empty output without `--force`, also exits with `1`.

## JSON report

`--json` prints the report as one JSON document, for agents and CI. With `--dry-run` it also describes what would be written:

```json
{
  "tool": "docslit import",
  "version": "0.2.0",
  "source": { "dir": "my-mintlify-docs", "format": "mintlify", "formatLabel": "Mintlify", "detectedBy": "docs.json" },
  "out": "my-mintlify-docs-docslit",
  "dryRun": false,
  "summary": { "pages": 11, "pagesFailed": 0, "snippets": 3, "assets": 8, "components": 67 },
  "counts": { "error": 2, "warning": 3, "info": 4 },
  "components": [{ "from": "Card", "to": "wc-card", "count": 6 }],
  "config": {
    "mapped": [{ "from": "docs.json name", "to": "name" }],
    "unmapped": [{ "from": "docs.json theme", "note": "Mintlify theme \"mint\" is replaced by the DocsLit \"peppermint\" theme" }]
  },
  "items": [
    {
      "severity": "error",
      "code": "unknown-component",
      "file": "components/layout.mdx",
      "line": 31,
      "component": "MyChart",
      "message": "Component <MyChart> is not a known Mintlify/Fern component and has no DocsLit equivalent.",
      "action": "Replaced with a warning callout marked \"Unconverted component\".",
      "fix": "Replace the callout with the intended content, or build a DocsLit custom component (components/my-chart.js)."
    }
  ],
  "validation": { "errors": 0, "warnings": 0, "infos": 0, "issues": [] },
  "markup": { "errors": 0, "warnings": 0 }
}
```

<wc-fields header="Report keys">
<wc-field name="items" type="array">
The things that need attention, sorted by severity. Each has a `severity`, a stable `code`, the `file` and `line` it came from (`null` for config), the `component` involved, a `message`, `action` (what the importer did instead) and `fix` (what you should do).
</wc-field>
<wc-field name="components" type="array">
Each source component or element, the DocsLit component it became, and a count.
</wc-field>
<wc-field name="config" type="object">
`mapped` lists the source config keys and where they went. `unmapped` lists the keys with no equivalent and why.
</wc-field>
<wc-field name="validation" type="object">
The result of `docslit validate` on the converted project.
</wc-field>
<wc-field name="markup" type="object">
The counts from the component markup check over every converted page.
</wc-field>
</wc-fields>

Work through `items` in order, then run `docslit validate --strict` and `docslit lint`.

## Issue codes

| Code | Meaning | What to do |
|---|---|---|
| `unknown-component`, `custom-component` | A React or JSX component that cannot run on a static site | Replace the "Unconverted component" callout with Markdown, a reusable snippet or a [custom component](../customization/custom-components) |
| `component-prop-dropped`, `component-value-dropped`, `component-prop-dynamic` | A prop or value has no DocsLit equivalent, or is computed | Usually nothing. Check how the page looks. |
| `mintlify-panel` | A right-rail `Panel` became a floating `wc-aside` | Check where it sits |
| `fern-api-snippet`, `fern-runnable-endpoint` | An API snippet component that renders from the Fern definition | Link to the generated API page, or paste an example |
| `fern-codeblock-links`, `fern-if-products`, `fern-tab-language-sync` | A Fern feature with a different shape in DocsLit | Read the message for the fix |
| `code-src-downloaded`, `code-src-url` | A Fern `<Code src>` URL was downloaded at import time, or could not be | Keep a copy in sync, or download the file into `snippets/` and use `file=` |
| `redirect-wildcard` | A pattern redirect such as `/old/:slug*` | Add one entry per path under `redirects` |
| `integration-unsupported`, `fern-js`, `css-missing` | An analytics provider, script or stylesheet with no preset | Paste the vendor snippet into `head` |
| `nav-versions` | Versions were converted to tabs or the default version only | Optionally move each version to a branch. See [Versioning](../customization/versioning). |
| `nav-languages` | Only the first language was converted | Move each language into `docs.<locale>/`. See [Internationalization](../customization/i18n). |
| `nav-products`, `nav-flattened`, `nav-tab-empty`, `nav-page-missing` | Navigation that was reshaped, or a page that could not be found | Read the message |
| `auth-content-dropped` | Content gated by login, roles or groups was removed | Move it to a public page if it should be visible |
| `openapi-multiple`, `openapi-remote`, `fern-definition`, `fern-spec-unsupported`, `fern-api-no-spec` | An API spec that cannot be wired up | Merge specs, download remote specs, or export OpenAPI. See [OpenAPI integration](../integrations/openapi). |
| `snippet-exports`, `snippet-prop-dynamic`, `export-dropped`, `global-variable` | Exported constants or props in a snippet | Define the values under `attributes` in `docslit.json`. See [Variables and precedence](../writing-content/variables-and-precedence). |
| `contextual-unsupported`, `config-unmapped` | A contextual menu option or config key with no equivalent | Informational |
| `frontmatter-dropped`, `frontmatter-lenient` | A page key with no equivalent, or frontmatter that needed repair | Check the page |
| `mdx-parse-error`, `legacy-conversion`, `yaml-invalid` | A page or file that is not valid MDX or YAML | Fix the source, or review the converted page by hand |
| `broken-link`, `missing-asset` | A link or image target that is not in the project | Point it at a real page, or add the file |
| `gitbook-openapi`, `gitbook-tag-unsupported` | A GitBook block that has no equivalent | Read the message |

## Known limits

- **Versions become tabs.** DocsLit versions are git branches. See [Versioning](../customization/versioning).
- **Languages.** Only the first language is converted. See [Internationalization](../customization/i18n).
- **Wildcard redirects** are skipped.
- **Custom JavaScript and custom React components** are reported, never converted.
- **API snippet components** from Fern are replaced by pointers to the API reference.
- **Login, role and group content** is removed.
- **One OpenAPI spec** per project is wired up.

## Convert one page at a time

The MCP tool `convert_mdx` runs the same converter on a single page or snippet. See [Migrate with your AI agent](migrate-with-ai#convert-one-page-with-convert_mdx).

## Next steps

- See every converted component in [the component mapping](component-mapping)
- Let an agent work through the report with [Migrate with your AI agent](migrate-with-ai)
