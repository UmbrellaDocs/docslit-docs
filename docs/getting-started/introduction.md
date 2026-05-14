---
title: Introduction
tag: Overview
readtime: 2 min read
---

# Introduction

DocsLit is a documentation framework that combines Markdown with interactive web components. You write content in Markdown, drop in `<wc-*>` components for rich interactions, and deploy a fast static site — no build tools, no JSX, no imports.

<wc-tiles>
<wc-tile icon-name="zap" title="Zero config" description="Write Markdown, run one command, get a production-ready docs site." href="getting-started/quickstart"></wc-tile>
<wc-tile icon-name="plus" title="40+ components" description="Callouts, code blocks, tabs, API testers, and more, all built in." href="components/callouts-and-alerts"></wc-tile>
<wc-tile icon-name="globe" title="Static or cloud" description="Deploy anywhere as static files, or publish instantly with DocsLit Cloud." href="deployment/static-hosting"></wc-tile>
<wc-tile icon-name="right-left" title="Easy migration" description="Move from Mintlify, Fern, or GitBook with a single command." href="migration/from-mintlify"></wc-tile>
</wc-tiles>

## Try it now

Set your project name: <wc-var name="PROJECT" default="my-docs"></wc-var>

```bash
npx docslit init {{PROJECT}}
cd {{PROJECT}}
npx docslit dev
```

Open `http://localhost:3000` to see your **{{PROJECT}}** site running locally.

## How it works

DocsLit takes a different approach from tools that require JSX, MDX, or framework-specific syntax. You write standard Markdown and enhance it with HTML-native web components.

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

No imports. No build step. No configuration. The components just work because they are standard web components rendered by the browser.

## What you get

<wc-accordion-group>
<wc-accordion title="Full-text search">

Every build generates a search index automatically. Your readers can find content instantly with the built-in search bar — no external service required.

</wc-accordion>
<wc-accordion title="Dark and light themes">

DocsLit respects system preferences and lets readers toggle between themes. Every component adapts automatically.

</wc-accordion>
<wc-accordion title="SEO and AI discovery">

Static builds produce individual HTML pages for search engines, `sitemap.xml` for crawlers, and `llms.txt` / `llms-full.txt` for AI agents.

</wc-accordion>
<wc-accordion title="Hot reload">

The dev server watches your files and reloads the browser instantly when you save. No manual refresh needed.

</wc-accordion>
</wc-accordion-group>

## Next steps

<wc-steps>
<wc-step title="Install DocsLit">

Follow the [installation guide](installation) to set up DocsLit on your machine.

</wc-step>
<wc-step title="Build your first site">

Walk through the [quickstart](quickstart) to create and preview a documentation site in under 3 minutes.

</wc-step>
<wc-step title="Explore components">

Browse the [components section](../components/callouts-and-alerts) to see everything you can use in your docs.

</wc-step>
</wc-steps>
