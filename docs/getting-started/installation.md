---
title: Installation
description: Install DocsLit and set up your development environment to start building documentation sites.
tag: Getting started
readtime: 2 min read
---

# Installation

DocsLit requires Node.js 24 or later. You can run it directly with `npx` or install it globally.

## Prerequisites

Check your Node.js version:

```bash
node --version
```

<wc-callout type="warning" title="Node.js 24 required">
DocsLit uses top-level await and modern ES module features that require Node.js 24.0.0 or later. If you see syntax errors, upgrade your Node.js installation.
</wc-callout>

## Install with npx (recommended)

You do not need to install anything globally. Use `npx` to run DocsLit commands directly:

```bash
npx docslit init my-docs
npx docslit dev
```

This always uses the latest version.

## Install globally

If you prefer a shorter command, install DocsLit globally:

<wc-tabs>
<wc-tab label="npm">

```bash
npm install -g docslit
```

</wc-tab>
<wc-tab label="pnpm">

```bash
pnpm add -g docslit
```

</wc-tab>
<wc-tab label="yarn">

```bash
yarn global add docslit
```

</wc-tab>
</wc-tabs>

After installing globally, you can use `docslit` directly:

```bash
docslit init my-docs
docslit dev
```

## Verify the installation

Run the version command to confirm everything is working:

```bash
npx docslit --version
```

You should see the current version number printed in your terminal.

## Next steps

Now that DocsLit is installed, follow the [quickstart](quickstart) to create your first documentation site.
