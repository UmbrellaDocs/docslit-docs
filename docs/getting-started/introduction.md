---
title: Introduction
description: DocsLit helps teams publish beautiful, interactive documentation with plain Markdown and zero framework overhead.
tag: Overview
readtime: 2 min read
---

# Introduction

DocsLit turns plain Markdown into polished, interactive docs that teams actually enjoy writing and users actually enjoy reading.

You stay in Markdown. You drop in powerful `<wc-*>` components when needed. You ship a fast documentation site without wrestling with build tools, JSX, or import chains.

<wc-callout type="tip" title="Built for technical teams">
Ship quickly with a low-friction writing workflow, while still delivering the rich experience modern docs readers expect.
</wc-callout>

<wc-tiles>
<wc-tile icon-name="zap" title="From zero to live in minutes" description="Create a full docs site with one command and start publishing immediately." href="getting-started/quickstart"></wc-tile>
<wc-tile icon-name="plus" title="Rich docs without complexity" description="Use built-in components for alerts, tabs, API references, and interactive UI." href="components/callouts-and-alerts"></wc-tile>
<wc-tile icon-name="globe" title="Deploy your way" description="Generate static files for any host, or publish instantly with DocsLit Cloud." href="deployment/static-hosting"></wc-tile>
<wc-tile icon-name="right-left" title="Migrate without pain" description="Bring existing docs from Mintlify, Fern, or GitBook with minimal effort." href="migration/from-mintlify"></wc-tile>
</wc-tiles>

## Try it now

Pick a project name: <wc-var name="PROJECT" default="my-docs"></wc-var>

```bash
npx docslit init {{PROJECT}}
cd {{PROJECT}}
npx docslit dev
```

Open `http://localhost:3000` and you are live.

In less than a minute, you have a complete docs project with navigation, search, themed UI, and production-ready output.

## How it works

Most docs frameworks ask you to learn framework syntax before you can write great content. DocsLit flips that.

You write standard Markdown first, then enhance key sections with native web components only when you need more expressive UI.

<wc-columns cols="2">
<div>

**You write this:**

```markdown
<wc-callout type="tip" title="Quick start">
Run `npx docslit dev` to start.
</wc-callout>
```

</div>
<div>

**Your readers see this:**

<wc-callout type="tip" title="Quick start">
Run `npx docslit dev` to start.
</wc-callout>

</div>
</wc-columns>

No imports. No JS boilerplate. No component setup. The browser renders standard web components directly, so your authoring workflow stays clean.

## What you get

<wc-accordion-group>
<wc-accordion title="Full-text search">

Search is generated automatically at build time. Readers can find answers instantly with no external indexing service.

</wc-accordion>
<wc-accordion title="Dark and light themes">

Your docs look polished in both dark and light mode, with automatic theme adaptation across all components.

</wc-accordion>
<wc-accordion title="SEO and AI discovery">

Each build outputs SEO-friendly HTML pages, `sitemap.xml` for crawlers, plus `llms.txt` and `llms-full.txt` for AI discovery.

</wc-accordion>
<wc-accordion title="Hot reload">

The dev server watches your files and refreshes instantly on save, so iteration feels fast and effortless.

</wc-accordion>
<wc-accordion title="Scales with your docs">

From a small guide to a full product portal, DocsLit keeps the writing model simple while giving you room to grow.

</wc-accordion>
</wc-accordion-group>

## Next steps

<wc-steps>
<wc-step title="Install DocsLit">

Follow the [installation guide](installation) to set up your environment.

</wc-step>
<wc-step title="Build your first site">

Use the [quickstart](quickstart) to create and preview your first docs site.

</wc-step>
<wc-step title="Explore components">

Explore [components](../components/callouts-and-alerts) to see how far you can push Markdown-powered docs.

</wc-step>
</wc-steps>
