---
title: Python API reference
tag: Integrations
readtime: 8 min read
description: Document a Python package from its docstrings with mkdocstrings-style directives, cross-references and an objects.inv inventory, without running Python at build time
---

# Python API reference

DocsLit renders the API reference of a Python package from its docstrings. You write a `:::` line in a Markdown page, exactly as you would with mkdocstrings, and DocsLit expands it into headings, signatures, parameter tables and cross-reference links.

## Why no Python at build time

DocsLit never imports your package or runs Python when it builds. The API data comes from a JSON file produced by [Griffe](https://mkdocstrings.github.io/griffe/), the same analyser mkdocstrings uses. You commit that file, so:

- `docslit build` and `docslit dev` work on any machine with Node.js, with no virtual environment or package dependencies installed.
- Builds are reproducible, because the reference only changes when the JSON changes.
- Python is needed only to refresh the data, on your machine or in CI.

## Quick start

<wc-steps>
<wc-step title="Install Griffe" n="1">

Griffe is only needed when you create or refresh the data.

```bash
pip install griffe
# or
uv tool install griffe
```

DocsLit looks for `griffe`, then `uvx griffe`, then `python -m griffe`.

</wc-step>
<wc-step title="Dump your package" n="2">

Run the command from your project root. Add `--search src` if your package lives in a `src/` folder.

```bash
docslit api python mypkg --pages
```

This writes `api/python/mypkg.json`, adds `mypkg` to `python.packages` in `docslit.json`, and, because of `--pages`, creates `docs/api/mypkg/` with one page per public module plus an index, and an "API reference" sidebar group. Existing pages are never overwritten.

</wc-step>
<wc-step title="Commit the data" n="3">

```bash
git add api/python/mypkg.json docs/api docslit.json
git commit -m "docs: add Python API reference"
```

Run `docslit dev` to preview. Every page that contains a `:::` line shows the rendered reference.

</wc-step>
</wc-steps>

See [`docslit api python`](../cli-reference/commands#api-python) for every flag, including `--docstyle`, `--search` and `--from` (use an existing Griffe dump instead of running Griffe).

## Configuration

Add a `python` object to `docslit.json`. The command writes `packages` and `docstringStyle` for you.

```json filename="docslit.json"
{
  "python": {
    "packages": ["mypkg"],
    "docstringStyle": "google",
    "options": {
      "show_root_heading": true,
      "members_order": "alphabetical"
    }
  }
}
```

<wc-fields>
<wc-field name="packages" type="string[]">
Top-level package names. The data for each one is read from `api/python/<name>.json`. A directive whose first name segment is not listed here shows a placeholder and a build warning.
</wc-field>
<wc-field name="docstringStyle" type="string" default="google">
`google`, `numpy` or `sphinx`. Used when the data is generated. Change it and run `docslit api python` again to apply it.
</wc-field>
<wc-field name="options" type="object">
Default [directive options](#directive-options) for every `:::` block. Options written under a directive override them.
</wc-field>
</wc-fields>

## Directives

Put `::: dotted.identifier` alone on a line, at the start of the line or indented inside a container such as a tab or list item. It can be a module, a class, a function or an attribute. An optional indented YAML block with an `options:` key follows.

````markdown
::: mypkg.client

::: mypkg.client.Client
    options:
      members:
        - get
        - post
      show_root_heading: true
      heading_level: 3
````

The first block documents a whole module. The second documents one class, with only the listed members, and a heading for the class itself.

A `:::` line inside a fenced code block is shown as text and is not expanded.

### Directive options

The option names match mkdocstrings-python, so pages imported from MkDocs work unchanged. Options that mkdocstrings has but DocsLit does not act on, such as `docstring_style` or `merge_init_into_class`, are accepted and ignored. Any other unknown option is ignored with a build warning.

| Option | Default | Meaning |
|---|---|---|
| `members` | `true` | A list of member names to show, `true` for all public members, or `false` for none. |
| `filters` | `["!^_[^_]"]` | A list of regular expressions matched against member names. A leading `!` excludes matches. The default hides single-underscore names and keeps dunder methods. |
| `show_root_heading` | `false` | Show a heading for the object itself. Without it, only its members get headings. |
| `show_root_toc_entry` | `true` | Include the root heading in the page outline. |
| `heading_level` | `2` | Heading level of the root object (1 to 6). Members go one level deeper. |
| `show_source` | `false` | Show the source code of the object. Ignored when the data has no source. |
| `show_signature` | `true` | Show the signature in a Python code block. |
| `show_signature_annotations` | `false` | Include type annotations in the signature. They always appear in the parameter table. |
| `separate_signature` | `false` | Put the signature in its own code block under the heading instead of in the heading. |
| `members_order` | `source` | `source` keeps the order of the code, `alphabetical` sorts by name. |
| `inherited_members` | `false` | Also show members inherited from base classes. |
| `docstring_section_style` | `table` | `table` or `list`, the layout of Parameters, Returns and similar sections. |
| `show_if_no_docstring` | `false` | Show objects that have no docstring. |
| `show_bases` | `true` | List base classes under a class heading. |
| `group_by_category` | `true` | Group members under attributes, classes, functions and modules. |

### What gets rendered

Each object gets a heading with an anchor equal to its full dotted path (for example `mypkg.client.Client.get`), its signature, and its docstring as Markdown. Parsed docstring sections become Parameters (a table with name, type, description and default), Returns, Yields, Raises and Attributes. Examples render as Python code and admonition sections such as Note and Warning render as callouts. Type annotations that name another documented object become links. A docstring that Griffe could not split into sections is shown as plain Markdown.

## Cross-references

Link to any documented object by its full path, in the same page or another:

```markdown
Create a client with [mypkg.client.Client][], then call
[its get method][mypkg.client.Client.get] or [`mypkg.client.Client.post`][].
```

Both forms from mkdocs-autorefs work: `[text][mypkg.Obj]` and `[mypkg.Obj][]` (backticks around the path are allowed). The link points to the page that renders the object. If several pages render it, the first one wins. A reference definition with the same label in your page takes priority.

A reference that looks like a Python path in a configured package but matches no rendered object is left as plain text and reported as `api-ref-unresolved`. Make sure the page that renders the object has a `:::` directive for it.

## objects.inv and intersphinx

When `python.packages` is set, the build writes `objects.inv` at the root of the output, a Sphinx inventory (version 2) with an entry for every rendered object. Other projects can link to your reference by adding your site to their intersphinx mapping:

```python filename="conf.py"
intersphinx_mapping = {
    "mypkg": ("https://docs.example.com", None),
}
```

mkdocstrings users can add the same URL to `inventories` in their handler options. The build prints how many objects it wrote.

## Keep the data fresh in CI

Because the JSON is committed, it can drift from the code. This GitHub Actions workflow regenerates it and fails when it differs from what is committed.

```yaml filename=".github/workflows/api-docs.yml"
name: API docs data
on:
  pull_request:
  push:
    branches: [main]

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - uses: astral-sh/setup-uv@v5
      - run: uv tool install griffe
      - run: npm install -g docslit
      - run: docslit api python mypkg --search src
      - name: Fail if the committed API data is stale
        run: git diff --exit-code -- api/python
```

If you document code that imports heavy dependencies, Griffe analyses the source statically and does not import it, so you rarely need to install the package itself.

## Versions

With [branch-based versioning](../customization/versioning), every version builds from its own branch, so each branch holds its own `api/python/<package>.json`. Regenerate the file on each release branch (for example when you cut `v1.2`) and the version selector shows the reference that matches that release.

## Troubleshooting

Each problem is a build warning with a code. Run `docslit validate` to list them with file and line.

| Code | Cause | Fix |
|---|---|---|
| `api-data-missing` | The directive's package is not in `python.packages`, or `api/python/<package>.json` does not exist or cannot be read. The page shows a placeholder callout. | Add the package to `python.packages` and run `docslit api python <package>`, then commit the JSON. |
| `api-object-missing` | The identifier is not in the JSON, for example a misspelling, a renamed object, or stale data. | Check the spelling, then regenerate with `docslit api python <package>`. Private names need a `filters` entry to show up. |
| `api-ref-unresolved` | An autoref such as `[text][mypkg.Missing]` matches no rendered object. | Render the object with a `:::` directive on some page, or fix the path. |
| `api-render` | The renderer reported a problem, such as an unknown directive option or an invalid `members_order`. | Fix the option named in the message. |

Other things to check:

- **Griffe not found.** Install it with `pip install griffe` or `uv tool install griffe`, or pass `--from dump.json` with a dump you created elsewhere.
- **Package not found by Griffe.** Pass `--search` with the folder that contains the package, for example `--search src`. You can repeat it.
- **Docstrings render as plain text.** Check that `docstringStyle` matches your docstrings, then regenerate.
- **A `:::` line is shown literally.** It must be alone on its line and outside a fenced code block.

See also [Migrate from MkDocs](../migration/from-mkdocs) and [Commands](../cli-reference/commands#api-python).
