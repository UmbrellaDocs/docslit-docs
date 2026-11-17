---
title: File trees
description: Display interactive file and directory trees with file-type icons, highlighting, comments and collapsible folders, plus download links and copy chips.
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

A directory is open by default. Add `collapsed` to start it closed, `highlight` to draw attention to a row, `comment` for a short note after the name, and `href` to make a name a link. Files get an icon that follows their type.

```markdown
<wc-files>
<wc-dir name="src" comment="sources" highlight>
<wc-file name="index.js" href="../getting-started/quickstart"></wc-file>
<wc-file name="config.json" comment="settings"></wc-file>
<wc-dir name="legacy" collapsed>
<wc-file name="old.js"></wc-file>
</wc-dir>
</wc-dir>
</wc-files>
```

<wc-files>
<wc-dir name="src" comment="sources" highlight>
<wc-file name="index.js" href="../getting-started/quickstart"></wc-file>
<wc-file name="config.json" comment="settings"></wc-file>
<wc-dir name="legacy" collapsed>
<wc-file name="old.js"></wc-file>
</wc-dir>
</wc-dir>
</wc-files>

<wc-fields header="wc-dir">
<wc-field name="name" type="string" required>
The directory name.
</wc-field>
<wc-field name="open" type="boolean" default="true">
Expand the directory. This is the default.
</wc-field>
<wc-field name="collapsed" type="boolean">
Start the directory closed.
</wc-field>
<wc-field name="openable" type="string" default="true">
Set to `false` for a non-interactive folder that is always open.
</wc-field>
<wc-field name="href" type="string">
Make the directory name a link.
</wc-field>
<wc-field name="comment" type="string">
A short comment displayed after the name.
</wc-field>
<wc-field name="highlight" type="boolean">
Highlight the directory row.
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
<wc-field name="href" type="string">
Make the file name a link.
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
<wc-download href="/assets/themes/peppermint-light.webp" filename="peppermint-light.webp" label="Download the screenshot" size="16 KB"></wc-download>
```

<wc-download href="/assets/themes/peppermint-light.webp" filename="peppermint-light.webp" label="Download the screenshot" size="16 KB"></wc-download>

The link text comes from `label`, or from the text between the tags, then the file name, then "Download".

To bundle several files into one ZIP that is built in the reader's browser, use `sources` instead of `href`. The files must be readable from the page, which means the same origin or CORS enabled:

```markdown
<wc-download sources="/assets/themes/frond-light.webp, /assets/themes/frond-dark.webp" filename="frond-screenshots.zip" label="Download both screenshots"></wc-download>
```

<wc-fields header="wc-download">
<wc-field name="href" type="string" required>
The URL or path of the file. Not needed when you use `sources`.
</wc-field>
<wc-field name="sources" type="string">
Comma-separated, space-separated or JSON-array URLs to bundle into one ZIP, instead of `href`.
</wc-field>
<wc-field name="filename" type="string">
The suggested file name. With `sources`, it is the name of the ZIP, `download.zip` by default.
</wc-field>
<wc-field name="label" type="string">
The link text.
</wc-field>
<wc-field name="size" type="string">
File size text shown in parentheses, such as `2.4 MB`.
</wc-field>
</wc-fields>

## Copy chip

Add a standalone copy-to-clipboard chip. It fits inline, so use it for versions, commands and keys:

```markdown
Install with <wc-copy text="npm install -g docslit">npm install -g docslit</wc-copy>, or copy a different value than the one shown: <wc-copy clipboard="docslit init my-docs">docslit init</wc-copy>.
```

Install with <wc-copy text="npm install -g docslit">npm install -g docslit</wc-copy>, or copy a different value than the one shown: <wc-copy clipboard="docslit init my-docs">docslit init</wc-copy>.

<wc-fields header="wc-copy">
<wc-field name="text" type="string">
The text copied to the clipboard. Defaults to the text shown.
</wc-field>
<wc-field name="label" type="string">
The displayed text. Defaults to the text between the tags, then `text`.
</wc-field>
<wc-field name="clipboard" type="string">
Copy this value instead of the displayed text.
</wc-field>
</wc-fields>
