---
title: Installation
description: Install DocsLit and set up your development environment to start building documentation sites.
tag: Getting started
readtime: 2 min read
---

# Installation

DocsLit requires Node.js 22.22 or later.

## Prerequisites

Check your Node.js version:

```bash
node --version
```

<wc-callout type="warning" title="Node.js 22.22 or later">
DocsLit is an ES module package that needs Node.js 22.22.0 or later. If you see syntax errors, upgrade your Node.js installation.
</wc-callout>

## Install DocsLit

<wc-tabs sync="pkg">
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
<wc-tab label="npx">

```bash
npx docslit init my-docs
```

Run any command through `npx` without a global install, for example `npx docslit dev`.

</wc-tab>
</wc-tabs>

## Verify the installation

Run the version command to confirm everything is working:

```bash
docslit --version
```

You should see the current version number printed in your terminal.

## Next steps

Now that DocsLit is installed, follow the [quickstart](quickstart) to create your first documentation site.
