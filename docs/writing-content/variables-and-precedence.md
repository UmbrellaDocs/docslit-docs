---
title: Variables and precedence
description: Use inline variables in your docs that readers can edit, with cascading precedence rules for defaults and overrides.
tag: Writing
readtime: 4 min read
---

# Variables and precedence

DocsLit resolves placeholders like `pass:[{{NAME}}]` at compile time in prose.

## Resolution order

From lowest to highest priority:

1. global `attributes` in `docslit.json`
2. page frontmatter `attributes`
3. page-local `pass:[<wc-var name="X" value="Y" />]`

If the same key is defined more than once, the later layer overrides the earlier one.

## Global variables

Define shared attributes in `docslit.json`:

```json filename="docslit.json"
{
  "name": "My Docs",
  "attributes": {
    "PRODUCT": "DocsLit",
    "API_BASE": "https://api.example.com"
  }
}
```

## Page-level overrides

Override on a page with frontmatter:

```markdown
---
title: Enterprise guide
attributes:
  PRODUCT: DocsLit Enterprise
---
```

Or override locally in page body:

```markdown
<wc-var name="PRODUCT" value="DocsLit Cloud" />
```

## Built-in version variables

DocsLit injects these variables on every page:

- `{{DOCSLIT_VERSION}}` — current docs version
- `{{DOCSLIT_BRANCH}}` — source branch for that version

For versioned docs, these values follow the active version/branch. For unversioned docs, they fall back to `unversioned` and `working-tree`.

```markdown
You are reading version **{{DOCSLIT_VERSION}}** from branch `{{DOCSLIT_BRANCH}}`.
```

## Notes

- variable keys should use `UPPER_SNAKE_CASE`
- placeholders inside fenced code blocks are not substituted
- use `pass:[{{NAME}}]` when you want to show a placeholder literally in prose
- use `pass:[<wc-var name="X" value="Y" />]` to show literal component syntax
- use [Reusable content](reusable-content) for include-specific rules

