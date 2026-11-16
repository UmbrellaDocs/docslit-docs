---
title: File trees
description: Display interactive file and directory trees with icons, highlighting, and collapsible folders.
tag: Components
readtime: 3 min read
---

# File trees

Display directory structures and hierarchical data with file tree and generic tree components.

## File tree

Use `wc-files`, `wc-dir`, and `wc-file` to render a directory structure:

```markdown
<wc-files>
<wc-dir name="my-docs" open>
<wc-file name="docslit.json" highlight></wc-file>
<wc-dir name="docs" open>
<wc-file name="introduction.md"></wc-file>
<wc-file name="quickstart.md"></wc-file>
</wc-dir>
<wc-dir name="components">
<wc-file name="my-widget.js"></wc-file>
</wc-dir>
<wc-dir name="dist">
<wc-file name="index.html"></wc-file>
</wc-dir>
</wc-dir>
</wc-files>
```

<wc-files>
<wc-dir name="my-docs" open>
<wc-file name="docslit.json" highlight></wc-file>
<wc-dir name="docs" open>
<wc-file name="introduction.md"></wc-file>
<wc-file name="quickstart.md"></wc-file>
</wc-dir>
<wc-dir name="components">
<wc-file name="my-widget.js"></wc-file>
</wc-dir>
<wc-dir name="dist">
<wc-file name="index.html"></wc-file>
</wc-dir>
</wc-dir>
</wc-files>

<wc-fields header="wc-dir">
<wc-field name="name" type="string" required>
The directory name.
</wc-field>
<wc-field name="open" type="boolean" default="false">
Expand the directory by default.
</wc-field>
</wc-fields>

<wc-fields header="wc-file">
<wc-field name="name" type="string" required>
The file name.
</wc-field>
<wc-field name="highlight" type="boolean" default="false">
Highlight this file to draw attention to it.
</wc-field>
<wc-field name="comment" type="string">
A short comment displayed after the file name.
</wc-field>
</wc-fields>

## Generic tree

For non-file hierarchies, use `wc-tree` and `wc-tree-item`:

```markdown
<wc-tree>
<wc-tree-item title="Organization" open>
<wc-tree-item title="Engineering" open>
<wc-tree-item title="Frontend"></wc-tree-item>
<wc-tree-item title="Backend"></wc-tree-item>
<wc-tree-item title="Infrastructure"></wc-tree-item>
</wc-tree-item>
<wc-tree-item title="Design">
<wc-tree-item title="Product design"></wc-tree-item>
<wc-tree-item title="Brand"></wc-tree-item>
</wc-tree-item>
</wc-tree-item>
</wc-tree>
```

<wc-tree>
<wc-tree-item title="Organization" open>
<wc-tree-item title="Engineering" open>
<wc-tree-item title="Frontend"></wc-tree-item>
<wc-tree-item title="Backend"></wc-tree-item>
<wc-tree-item title="Infrastructure"></wc-tree-item>
</wc-tree-item>
<wc-tree-item title="Design">
<wc-tree-item title="Product design"></wc-tree-item>
<wc-tree-item title="Brand"></wc-tree-item>
</wc-tree-item>
</wc-tree-item>
</wc-tree>

## Download links

Provide file downloads with `wc-download`:

```markdown
<wc-download href="/files/sample.pdf" filename="sample.pdf" label="Download the sample PDF"></wc-download>
```

<wc-download href="/files/sample.pdf" filename="sample.pdf" label="Download the sample PDF"></wc-download>

The link text comes from the `label` attribute, not from the body. The element has no content.

<wc-fields header="wc-download">
<wc-field name="href" type="string" required>
The URL or path of the file.
</wc-field>
<wc-field name="filename" type="string">
The suggested file name for the download.
</wc-field>
<wc-field name="label" type="string">
The link text. Defaults to the file name, then "Download".
</wc-field>
<wc-field name="size" type="string">
File size text shown in parentheses, such as `2.4 MB`.
</wc-field>
</wc-fields>

## Copy button

Add a standalone copy-to-clipboard button:

```markdown
<wc-copy text="docslit init my-docs" label="Copy install command"></wc-copy>
```

<wc-copy text="docslit init my-docs" label="Copy install command"></wc-copy>

The button text comes from `label`, not from the body.

<wc-fields header="wc-copy">
<wc-field name="text" type="string" required>
The text copied to the clipboard.
</wc-field>
<wc-field name="label" type="string">
The button label. Defaults to the copied text.
</wc-field>
</wc-fields>
