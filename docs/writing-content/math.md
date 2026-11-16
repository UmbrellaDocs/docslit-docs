---
title: Math
description: Write LaTeX math in DocsLit pages with double-dollar delimiters or math code fences, rendered at build time with KaTeX and no client-side JavaScript.
tag: Writing
readtime: 3 min read
---

# Math

DocsLit renders LaTeX math with [KaTeX](https://katex.org) when it builds a page. The result is plain HTML and CSS, so there is no math JavaScript in the browser. Math is on by default.

## Inline and display math

Wrap a formula in double dollar signs. In a sentence it renders inline:

```markdown
The Pythagorean theorem is $$a^2 + b^2 = c^2$$ for a right triangle.
```

The Pythagorean theorem is $$a^2 + b^2 = c^2$$ for a right triangle.

A paragraph that contains only a `$$` formula renders as display math. So does a `$$` block over several lines:

```markdown
$$
\int_0^1 x^2\,dx = \tfrac{1}{3}
$$
```

$$
\int_0^1 x^2\,dx = \tfrac{1}{3}
$$

A fenced block with the `math` language is also display math:

````markdown
```math
E = mc^2
```
````

```math
E = mc^2
```

## Single dollar signs

A single `$` is not a delimiter by default, because prices and shell variables use it. Turn it on if your content needs it:

```json filename="docslit.json"
{
  "math": { "singleDollar": true }
}
```

With that setting, `$x_i$` is inline math. Double dollar signs keep working.

## Turn math off

Set `"math": false` in `docslit.json`, or `"math": { "enabled": false }`. Then `$$` is ordinary text.

## Good to know

- KaTeX and its fonts are copied into the build output only when a page uses math.
- Text inside math is never treated as a `{{VARIABLE}}` placeholder, so LaTeX with double braces is safe.
- A formula KaTeX cannot parse still builds. The page shows the source text with a `katex-error` class and the parse error as a tooltip. `validate` does not report it, so look at the page.
- To show a literal double dollar sign in prose, put it in inline code.
