---
title: Versioning
description: Serve multiple documentation versions side by side with branch-based versioning and a version selector.
tag: Customization
readtime: 4 min read
---

# Versioning

DocsLit supports multi-version documentation using git branches. Each version maps to a branch, and readers can switch between versions using a dropdown in the site header.

## How it works

DocsLit's versioning is branch-based. Each version of your documentation lives on a separate git branch. When you build the site, DocsLit checks out each branch and builds the pages for that version.

<wc-mermaid>
graph LR
    A[main branch] -->|"Latest (0.2)"| B[Build v0.2]
    C[v0.1 branch] -->|"Previous"| D[Build v0.1]
    B --> E[dist/]
    D --> E
</wc-mermaid>

## Configuration

Add a `versions` object to your `docslit.json`:

```json filename="docslit.json"
{
  "name": "My Product",
  "versions": {
    "default": "0.2",
    "list": [
      {
        "version": "0.2",
        "branch": "main",
        "tag": "Latest"
      },
      {
        "version": "0.1",
        "branch": "v0.1",
        "tag": "Previous"
      }
    ]
  },
  "sidebar": [...]
}
```

<wc-fields header="Version configuration">
<wc-field name="default" type="string" required>
The version shown by default when a reader visits your site.
</wc-field>
<wc-field name="list" type="array" required>
An array of version objects, each specifying a version number, git branch, and display tag.
</wc-field>
<wc-field name="list[].version" type="string" required>
The version identifier (e.g., `0.2`, `1.0`, `2.0`).
</wc-field>
<wc-field name="list[].branch" type="string" required>
The git branch containing the docs for this version.
</wc-field>
<wc-field name="list[].tag" type="string">
A display label shown in the version dropdown (e.g., `Latest`, `Beta`, `LTS`).
</wc-field>
</wc-fields>

## Recommended workflow

<wc-steps>
<wc-step title="Develop on main">

Write and update documentation on the `main` branch. This always represents the latest version.

</wc-step>
<wc-step title="Cut a version branch on release">

When you release a new version of your product, create a branch from `main`:

```bash
git checkout -b v0.2
git push origin v0.2
```

</wc-step>
<wc-step title="Update the config">

On `main`, update `docslit.json` to add the new frozen version and point `main` to the next version:

```json filename="docslit.json"
{
  "versions": {
    "default": "0.3",
    "list": [
      { "version": "0.3", "branch": "main", "tag": "Latest" },
      { "version": "0.2", "branch": "v0.2", "tag": "Previous" },
      { "version": "0.1", "branch": "v0.1" }
    ]
  }
}
```

</wc-step>
<wc-step title="Build">

Run `docslit build`. DocsLit checks out each branch and builds only the pages that changed between versions.

</wc-step>
</wc-steps>

<wc-callout type="tip" title="Version on minor releases only">
Patch releases (0.1.5 to 0.1.6) rarely change documentation. Cut version branches on minor or major releases to avoid unnecessary maintenance overhead.
</wc-callout>

## Build output

Versioned builds produce a directory structure with each version in its own folder:

<wc-files>
<wc-dir name="dist" open>
<wc-file name="index.html"></wc-file>
<wc-dir name="0.2" open>
<wc-file name="index.html"></wc-file>
<wc-dir name="docs">
<wc-file name="introduction.html"></wc-file>
</wc-dir>
</wc-dir>
<wc-dir name="0.1">
<wc-file name="index.html"></wc-file>
<wc-dir name="docs">
<wc-file name="introduction.html"></wc-file>
</wc-dir>
</wc-dir>
</wc-dir>
</wc-files>

The root `index.html` redirects to the default version. Only pages that differ between versions are rebuilt — unchanged pages are shared to keep build times fast.

## Version-specific content

Use `wc-versions` to show different content depending on the selected version. See [data display](../components/data-display) for details.
