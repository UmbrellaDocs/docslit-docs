---
title: Migrate from MkDocs
description: Move a MkDocs, Material for MkDocs or Zensical project to DocsLit with one command that converts mkdocs.yml, navigation, admonitions, tabs, snippets and branding, and lists what still needs a human.
tag: Migration
readtime: 7 min read
---

# Migrate from MkDocs

DocsLit imports MkDocs, Material for MkDocs and Zensical projects. The importer reads `mkdocs.yml` (or `zensical.toml`), converts your pages to plain Markdown with DocsLit components, maps the navigation and branding, validates the result and writes a report of everything that needs a human.

Material for MkDocs is in maintenance mode until May 2027, so this is a good time to move if you want a docs tool that is still under active development.

## Quick start

<wc-var name="MKDOCS_DIR" default="my-mkdocs-project"></wc-var>

<wc-steps>
<wc-step title="Run the importer">

Point it at the folder that holds `mkdocs.yml` or `zensical.toml`:

```bash
docslit import ./{{MKDOCS_DIR}} --out ./my-docs
```

The source is never modified. Without `--out`, the new project is written to `{{MKDOCS_DIR}}-docslit/`.

</wc-step>
<wc-step title="Read the report">

```bash
cd my-docs
```

Open `MIGRATION.md`. It lists every item that needs attention, with the file and line, what was done instead and how to fix it. See [the import reference](import-reference#the-migration-report) for its format.

</wc-step>
<wc-step title="Preview">

```bash
docslit dev
```

</wc-step>
</wc-steps>

DocsLit detects MkDocs from `mkdocs.yml`, `mkdocs.yaml` or `zensical.toml`. These flags are useful:

| Flag | What it does |
|---|---|
| `--from mkdocs` | Skip detection and treat the source as MkDocs |
| `--theme <name>` | Apply a built-in theme or palette, plus your brand colors. Without it, DocsLit uses the default theme with the brand colors and fonts from your config. See [Themes](../customization/theming). |
| `--dry-run` | Convert and report without writing any files |
| `--json` | Print the report as JSON, for agents and CI |

```bash
docslit import ./{{MKDOCS_DIR}} --dry-run
```

See [the import reference](import-reference) for every flag.

## What is converted

### Configuration

| MkDocs / Material | DocsLit |
|---|---|
| `docs_dir` | The folder the pages are read from |
| `nav` | The `sidebar` in `docslit.json`, or `tabs` when `navigation.tabs` is on. Without a `nav`, the sidebar follows your folders. |
| `site_name`, `site_url` | `name`, `url` and `basePath` |
| `repo_url`, `copyright`, `extra.social` | `navbar` and `footer` links |
| `extra.analytics` (Google Analytics) | `analytics` |
| Palette colors, scheme and fonts | `theme`, with your brand colors |
| `theme.logo`, `theme.favicon` | `logo` and `favicon` |
| `extra_css`, `extra_javascript` | Copied and linked |
| `exclude_docs` | Matching files are skipped |
| `redirects` plugin | `redirects` |
| `INHERIT`, `!ENV` and Python YAML tags | Read, so a config that uses them still imports |

### Page syntax

| MkDocs / Material | DocsLit |
|---|---|
| `!!!` admonitions and `/// note` blocks | `<wc-callout>` |
| `???` and `???+` collapsibles, `/// details` | `<wc-accordion>` |
| `=== "Tab"` content tabs and `/// tab` | `<wc-tabs>` and `<wc-tab>`. With `content.tabs.link`, the tabs are synced. |
| `--8<--` snippets | The text is inlined. A fence that holds one snippet becomes a `file=` code import. |
| FastAPI-style `{* file *}` includes | A `file=` code import |
| Fence `title=`, `hl_lines=` and `linenums=` | `title=`, `{1,3}` and `lines startLine=` |
| A `mermaid` fence | `<wc-mermaid>` |
| `{ #id }` after a heading | An anchor |
| `{ .md-button }` | `<wc-button>` |
| `{ width=... }` on an image | `<img width>` |
| `++ctrl+c++`, `==mark==`, `^^ins^^`, `^sup^`, `~sub~` | `<kbd>`, `<mark>`, `<ins>`, `<sup>`, `<sub>` |
| Definition lists and abbreviations | `<dl>` and `<abbr>` |
| `\( \)` and `\[ \]` math | KaTeX. See [Math](../writing-content/math). |
| `:material-*:`, `:fontawesome-*:`, `:octicons-*:`, `:simple-*:` icons | `<wc-icon>`, mapped to the closest bundled Lucide or Font Awesome icon (see below) |
| `:smile:` and other emoji shortcodes | The Unicode emoji |
| `<div class="grid cards" markdown>`, as a list or `{ .card }` blocks | `<wc-tiles>` of `<wc-card>`. Other grids keep compatibility CSS. |
| Code annotations (`{ .annotate }` or `content.code.annotate`) | The `annotate` fence flag, `(N)` markers and the ordered list. See [Code annotations](../components/code-blocks#code-annotations). |
| `{{ some_value }}` where `some_value` is set under `extra:` | A [variable](../writing-content/variables-and-precedence) |

A page that uses MkDocs syntax looks like this before the import:

````markdown
!!! warning "Check your firewall"
    Port 8080 must be open.

=== "pip"

    ```bash
    pip install lantern
    ```

=== "uv"

    ```bash
    uv add lantern
    ```
````

The importer converts it to a `wc-callout` and a `wc-tabs` group. Pages stay plain Markdown, never MDX, so a stray `<` or `{` does not break the import.

### Links, snippets, blog posts and pages outside the nav

- **Links** follow MkDocs rules. A link to a `.md` file is resolved relative to the file that contains it. Any other link is resolved relative to the page URL, as the browser did on your old site.
- **Snippets.** Files in a snippet folder (`_snippets`, `snippets`, `includes` and similar, or any folder you set in `pymdownx.snippets`) are used as include-only text. They are not published as pages.
- **Icons.** Material Design, Octicons and Simple Icons shortcodes, and `icon:` in front matter, are mapped to the closest bundled Lucide or Font Awesome icon, for example `material-information-outline` becomes `info` and `octicons-mark-github` becomes `github`. An icon with no faithful match is removed and listed in `MIGRATION.md`, so you can pick a replacement. See [Icons](../components/icons).
- **Blog posts** from the blog plugin are imported as pages under `blog/` with their `date` (and `date.updated`) and a `post` layout. The blog index lists them newest first with author names (from `.authors.yml`) and excerpts, and DocsLit generates category and archive pages and an RSS feed. The old dated Material URLs redirect to the new pages. Pagination, pinned posts and related-post links are not supported.
- **Pages outside `nav`** are still built. They go into a hidden sidebar group, so they can be linked but are left out of search and the sitemap. Move them into a visible group if readers should find them.

### mkdocstrings API pages

`::: package.module.Class` blocks are not converted to anything else. They stay in the page, and the `options:` block under each one is normalised: old `selection:` and `rendering:` blocks are merged, and keys DocsLit does not support are dropped and reported once in `MIGRATION.md`. The package names, `docstring_style` and global handler `options` from `mkdocs.yml` are written to the `python` setting of `docslit.json`. `MIGRATION.md` gets one warning with the exact `docslit api python <package>` command to run. DocsLit then renders the reference from a committed Griffe JSON file, with no Python at build time. See [Python API reference](../integrations/python-api).

## What is not carried over

Nothing is dropped silently. Each item below is listed in `MIGRATION.md` with its location.

| Source | What happens | What to do |
|---|---|---|
| **Jinja macros** beyond simple `{{ extra }}` values | Only plain values from `extra:` become variables. Logic, loops and macro calls are not run. | Replace the expression with its output, or move repeated text into a [reusable snippet](../writing-content/reusable-content). |
| **Theme overrides** (`custom_dir`) | Jinja templates are not copied. | Use `docslit.json` instead: `announcement` for the banner, `head` for extra tags, `footer` for links, `css` for styles. For anything richer, build a [custom component](../customization/custom-components). |
| **Material CSS and JavaScript** | Copied as is, with a warning when the CSS targets `.md-*` classes or `--md-*` variables, which do not exist in DocsLit. | Rewrite the rules against DocsLit theme tokens, or delete them. See [Design tokens](../customization/design-tokens). |
| **mike** versions | Not imported. | Use branch-based versions. See [Versioning](../customization/versioning). |
| **i18n** plugins | Not imported. | Use the DocsLit layout with a `docs.<locale>/` folder per language. See [Internationalization](../customization/i18n). |
| **Jupyter notebooks** (`.ipynb`) | Not imported. | Export them first, for example with `jupyter nbconvert --to markdown`, and run the import again. |
| **gen-files** and **markdown-exec** | Pages generated by scripts are not imported, and executed code blocks become plain code. | Run the scripts once and import their output. |
| **tags** | Tag index pages are not generated. Tags stay in the frontmatter. | Create a page that lists them by hand. |
| **Blog extras** | Blog pagination, pinned posts and related-post links are not supported. | Link to the posts you want to feature from the blog index or another page. |
| **social** (Material social cards) | Mapped to `"ogImage": true`, so the build generates Open Graph images. | Nothing. Build with `--no-og-images` to skip them. |
| **Unknown plugins** | Ignored, with a warning. | Check what the plugin added to your pages and recreate the parts you still need. |

Many common plugins need no action. Search, offline, social cards, minify, privacy, `git-revision-date-localized`, `llmstxt`, `awesome-pages`, `literate-nav` and `glightbox` have a built-in DocsLit equivalent, and the report notes them as mapped.

## URLs

MkDocs serves a page at `/page/`, with a trailing slash. DocsLit serves it at `/page`. The page paths themselves do not change.

Whether `/page/` still works depends on your host. Vercel and Cloudflare Pages redirect it to `/page`. GitHub Pages does not, so old links with a trailing slash return 404 there. After you deploy, open a few of your old URLs. If they fail, turn on your host's trailing-slash redirect, or add [redirects](../customization/site-chrome) for the pages that matter.

## After importing

<wc-steps>
<wc-step title="Fix the errors first">

Work through the **Must fix** section of `MIGRATION.md`, then **Review**. If you used mkdocstrings, run `docslit api python <package>` first (see the next step). Delete the file when you are done.

</wc-step>
<wc-step title="Create the Python API data (mkdocstrings only)">

mkdocstrings `::: module.Class` directives are kept, with their options converted to mkdocstrings-python names, and `docslit.json` gets a `python` setting with your packages, docstring style and default options. `[text][pkg.Obj]` cross-reference links keep working. Until the API data exists, each directive shows a placeholder callout and a build warning, not an error. Create the data once:

```bash
pip install griffe   # or: uv tool install griffe
docslit api python mypkg --search src
```

Commit `api/python/mypkg.json`. Builds never run Python. See [Python API reference](../integrations/python-api).

</wc-step>
<wc-step title="Run the checks">

```bash
docslit validate
docslit dev
```

Click through the main pages, tabs, collapsibles and code blocks.

</wc-step>
<wc-step title="Check navigation and look">

Confirm the sidebar order, move pages that landed in the hidden group, and pick a theme if the default is not what you want. See [Themes](../customization/theming).

</wc-step>
<wc-step title="Deploy and test old URLs">

Build with `docslit build` and deploy. Then open several old URLs, with and without the trailing slash, and set up redirects where they fail. See [Static hosting](../deployment/static-hosting).

</wc-step>
</wc-steps>

## Next steps

- Learn every importer flag and the report format in [the import reference](import-reference)
- Use an agent for the rest with [Migrate with your AI agent](migrate-with-ai)
- See the full list of supported components in [Component mapping](component-mapping)
