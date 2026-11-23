---
title: Import code from files
description: Pull code samples into a page from real source files with file, lines and region, so examples stay in sync with code that you test.
tag: Writing
readtime: 4 min read
---

# Import code from files

Copy-pasted code samples go stale. Instead, point a fenced code block at a real file in your project and DocsLit inserts its contents at build time. Test the file in CI and the sample is always correct.

## Import a whole file

Add `file="path"` to the opening fence and leave the block empty. The path is relative to the project root, the folder that holds `docslit.json`.

````markdown
```js file="examples/server.js"
```
````

The block takes its language from the fence, or from the file extension when the fence has none. Anything else after the language, such as `filename="server.js"`, is kept.

## Import some lines

Use `lines` for a range, a single line, an open-ended range, or a comma-separated list:

````markdown
```js file="examples/server.js" lines="4-11"
```
````

| Value | Lines imported |
|---|---|
| `lines="10-25"` | 10 to 25 |
| `lines="10"` | line 10 only |
| `lines="10-"` | line 10 to the end |
| `lines="1-3,8-9"` | two ranges, joined in order |

## Import a named region

Line numbers break when the file changes. A region is more stable. Mark it in the source file with `region` and `endregion` comments:

```js
// #region routes
function route(req, res) {
  // ...
}
// #endregion routes
```

Then ask for it by name:

````markdown
```js file="examples/server.js" region="routes"
```
````

This is the result, imported live from `examples/server.js` in this site's repository:

```js file="examples/server.js" region="routes"
```

Region markers use the comment style of the file. `//`, `/* */`, `#`, `<!-- -->`, `--`, `;` and `%` all work, with or without a `#` before `region`. Regions can nest. Marker lines are never included in the output.

## What the importer does to the code

- The common leading indentation is removed, and blank lines at the start and end are trimmed.
- Region markers inside the imported lines are dropped.
- If the code contains a line that looks like a code fence, DocsLit lengthens the outer fence so the block still renders.
- You cannot use `lines` and `region` together.
- Fences nested inside another fence are left alone, which is how this page shows the syntax.

The imported code also appears in the page's Markdown file, `llms-full.txt` and search index, so agents read the real code. In `docslit dev`, saving the imported file reloads the page.

## Errors and limits

An import that cannot be completed fails the check and leaves the empty block in place. Run `docslit validate` to find it. The message names the problem: file not found, region not found, a region without a matching `endregion`, or a line range outside the file.

Paths must stay inside the project. `..`, absolute paths, symlinks that escape the project, `.git`, `node_modules` and `.env*` files are refused.

<wc-callout type="info" title="Issue code for import errors">
Code import failures currently appear in `validate --format json` with the code `other`. Match on the message text, which starts with "Code import" or names the region or line range.
</wc-callout>

## Next steps

- Show several variants with [code groups](../components/code-blocks)
- Keep samples fresh in CI with [validation](../cli-reference/validation)
