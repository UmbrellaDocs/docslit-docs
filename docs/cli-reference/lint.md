---
title: Lint
description: Run docslit lint to check documentation quality - descriptions, headings, code block languages, alt text, link text and page length - with configurable rules and disable comments.
tag: CLI reference
readtime: 5 min read
---

# Lint

`docslit lint` checks whether your docs are good, not whether they are broken. [`validate`](validation) finds broken links and unknown components. `lint` finds pages that are hard to read, hard to search, or hard for an AI tool to retrieve.

```bash
docslit lint
docslit lint ./my-docs
docslit lint --format json
docslit lint --strict
```

<wc-fields header="Options">
<wc-field name="--format" type="string" default="pretty">
`pretty`, `json` or `github` (Actions annotations). Any other value exits with code 1. See [Machine-readable CLI](../ai-and-agents/machine-readable-cli#lint) for the JSON shape.
</wc-field>
<wc-field name="--strict" type="flag">
Exit with code 1 when there are warnings, not just errors.
</wc-field>
</wc-fields>

The optional first argument is the project directory. The linter reads every `.md` and `.mdx` file under `docs/`, plus the `docs.<locale>/` folders of an i18n site. Files under `docs/_reusables/` are checked only by rules that apply to any content.

A page that passes looks like this:

```text
  Linting /path/to/project

  ✓ No quality issues in 12 pages.
```

## Rules

Every rule has a level of `info`, `warning` or `error`. No rule is an error by default, so `lint` fails only with `--strict` or after you raise a rule.

| Rule | Default | Checks |
|---|---|---|
| `missing-description` | warning | The frontmatter `description` is absent or empty |
| `description-length` | info | The description is shorter than 30 or longer than 200 characters |
| `title-h1-mismatch` | info | The frontmatter title differs from the first H1 |
| `multiple-h1` | warning | More than one H1 on a page |
| `heading-skip` | warning | A heading level is skipped, such as `##` followed by `####` |
| `duplicate-heading` | warning | The same heading text appears twice under one parent, which makes anchors ambiguous |
| `code-no-language` | warning | A fenced code block or `wc-code-block` has no language |
| `image-missing-alt` | warning | An image has no alt text |
| `link-text-vague` | warning | Link text such as "click here" or a bare URL |
| `page-too-long` | warning | More than 2500 words of prose |
| `page-too-short` | info | Fewer than 30 words of prose |
| `empty-section` | warning | A heading with no content before the next heading |
| `todo-marker` | warning | `TODO`, `FIXME`, `TBD` or `lorem ipsum` left in prose |
| `raw-html-block` | info | Raw `div`, `span`, `table` or `details` HTML where Markdown or a component exists |
| `callout-overuse` | info | More than 5 callouts on a page |
| `long-paragraph` | info | A paragraph longer than 150 words |

Code blocks, inline code, frontmatter and HTML comments are ignored. The short-page rule skips API pages and pages built from tiles, cards or includes.

## Configure rules

Add a `lint` block to `docslit.json`. A rule can be `"off"`, a level, or an object with a level and a number:

```json filename="docslit.json"
{
  "lint": {
    "rules": {
      "page-too-long": { "level": "error", "max": 4000 },
      "callout-overuse": "off",
      "missing-description": "error"
    }
  }
}
```

The numeric options are `min` and `max`, and only some rules use them: `description-length` (`min`, `max`), `page-too-long` (`max`), `page-too-short` (`min`), `callout-overuse` (`max`) and `long-paragraph` (`max`). An unknown rule name or a bad value is reported as a `lint-config-invalid` warning. The `docslit schema` JSON Schema covers this block, so your editor can complete the rule names.

## Disable rules in a page

Use HTML comments, which readers never see. They are ignored inside code, so they must be real comments in the page body:

```markdown
<!-- docslit-lint-disable page-too-long, callout-overuse -->
```

That line turns off the listed rules for the whole file. With no rule names it turns off all rules for the file. To skip one line, put this on the line before it:

```markdown
<!-- docslit-lint-disable-next-line code-no-language -->
```

## Fixing findings

`lint` has no auto-fix. `--fix` is accepted but prints a note and changes nothing, because no rule has a fix that is always safe. Each issue includes a `fix` sentence that says what to change.

Run `lint` together with `validate` in CI:

```bash
docslit validate --strict --format github
docslit lint --strict --format github
```
