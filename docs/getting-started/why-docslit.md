---
title: Why DocsLit
description: How DocsLit compares to React-based documentation tools like Docusaurus, Nextra, and Mintlify on bundle size, build speed, and authoring experience.
tag: Overview
readtime: 5 min read
---

# Why DocsLit

Most documentation tools are built on React. That means your docs site ships a JavaScript framework, hydrates static content the browser already rendered, and asks you to learn JSX just to add a callout. DocsLit takes a different approach: standard Markdown, native web components, and zero framework runtime.

## The numbers

<wc-tiles>
<wc-tile icon-name="package" title="16 KB total" description="Lit runtime + all 54 components, gzipped. No React, no router, no hydration layer."></wc-tile>
<wc-tile icon-name="zap" title="0 s build" description="No webpack, no Vite, no bundler. Plain HTML served from the edge."></wc-tile>
<wc-tile icon-name="blocks" title="54 components" description="Callouts, tabs, code blocks, API explorer, file trees, and more — all built in."></wc-tile>
<wc-tile icon-name="right-left" title="11 migration paths" description="One command converts Mintlify, Docusaurus, Nextra, GitBook, MkDocs, and more."></wc-tile>
</wc-tiles>

## Client-side JavaScript

This is the JavaScript your readers download on every page load. Less JS means faster Time to Interactive, better Lighthouse scores, and lower mobile data costs.

<wc-table>
[
  { "Framework": "DocsLit", "Client JS (gzipped)": "16 KB", "React required": "No", "Hydration": "None" },
  { "Framework": "Nextra 4", "Client JS (gzipped)": "106 KB", "React required": "Yes (React 19)", "Hydration": "Full page" },
  { "Framework": "Fumadocs", "Client JS (gzipped)": "161 KB", "React required": "Yes (React 19)", "Hydration": "Partial (RSC)" },
  { "Framework": "Docusaurus 3", "Client JS (gzipped)": "250–400 KB", "React required": "Yes (React 18)", "Hydration": "Full page" },
  { "Framework": "Mintlify", "Client JS (gzipped)": "~100+ KB", "React required": "Yes (Next.js)", "Hydration": "Full page" }
]
</wc-table>

<wc-callout type="info" title="Where does 16 KB come from?">
DocsLit ships Lit (the web component library) plus all 54 built-in components as a single ES module. There is no virtual DOM, no router library, no framework runtime. The browser loads 16,036 bytes gzipped from a CDN, and every component works immediately.
</wc-callout>

## Why the gap is so large

React-based documentation tools pay three taxes that DocsLit avoids entirely:

<wc-steps>
<wc-step title="Framework runtime">

React + ReactDOM is ~28 KB gzipped before your docs site adds a single word. Then add a client-side router, state management, and the framework's own bootstrapping code. Docusaurus bundles webpack runtime, route manifests, and the entire SPA shell — on a 4,000-page site, `main.js` alone reached 10 MB uncompressed.

DocsLit loads Lit from a CDN import map. Lit is 5 KB gzipped. There is no router library, no state management layer, and no bootstrapping overhead.

</wc-step>
<wc-step title="Hydration cost">

React SSR renders your page to HTML on the server, then the browser downloads JavaScript to "hydrate" that HTML — recreating the virtual DOM, attaching event listeners, and diffing against what's already on screen. For a documentation page, 75% or more of this work is wasted: static headings, paragraphs, and lists gain nothing from hydration.

DocsLit produces plain HTML at build time. Web components upgrade themselves in place — no virtual DOM, no diffing, no wasted work. Only interactive elements (tabs, accordions, code blocks) run JavaScript.

</wc-step>
<wc-step title="Build toolchain">

MDX compilation requires a dedicated pipeline: `@mdx-js/mdx` (25 dependencies), a bundler integration (webpack or Vite), and a JSX runtime. Docusaurus pulls 1,000+ npm packages into `node_modules` (300–500 MB on disk).

DocsLit uses `unified` + `remark` + `rehype` — the same Markdown pipeline — but outputs plain HTML instead of JSX. Components are concatenated strings, minified with a single `esbuild` call. Total production dependencies: 20 packages.

</wc-step>
</wc-steps>

## Build performance

<wc-columns cols="2">
<div>

### React-based tools

Docusaurus builds a 50-page site in **30 seconds to 2 minutes**. A 1,500-page site takes 5 minutes cold. A 2,000-page site can take 20 minutes.

Each build runs webpack (or Rspack), Babel (or SWC), the MDX compiler, and React's server-side renderer. The output is a full SPA with code-split route bundles.

</div>
<div>

### DocsLit

DocsLit renders Markdown to HTML with `unified`, writes files to disk, and is done. No bundler runs. No framework compiles.

The build produces individual `.html` files, one CSS file, one JS file, and a search index. Static hosting serves these directly — no Node.js server required.

</div>
</wc-columns>

## What you don't need

<wc-table>
[
  { "Concept": "JSX / MDX", "React tools": "Required for any component", "DocsLit": "Standard Markdown + HTML tags" },
  { "Concept": "Import statements", "React tools": "Every page needs component imports", "DocsLit": "None — components are globally available" },
  { "Concept": "Webpack / Vite config", "React tools": "Often customized for plugins", "DocsLit": "No bundler at all" },
  { "Concept": "node_modules (300–500 MB)", "React tools": "React, webpack, Babel, MDX, etc.", "DocsLit": "20 production dependencies" },
  { "Concept": "React knowledge", "React tools": "Needed for custom components", "DocsLit": "Standard web components (Lit or vanilla)" },
  { "Concept": "Hydration debugging", "React tools": "Common source of SSR/client mismatches", "DocsLit": "No hydration to debug" }
]
</wc-table>

## What you get for free

Features that require plugins, configuration, or paid tiers on other platforms are built into every DocsLit site:

<wc-accordion-group>
<wc-accordion title="AI agent discovery">

Every static build generates `llms.txt`, `llms-full.txt`, and a working MCP server (`mcp-server.js`) that AI agents can use to search, list, and read your documentation. No plugin, no configuration, no third-party service.

</wc-accordion>
<wc-accordion title="Full-text search">

A search index is generated at build time and loaded client-side. No Algolia account, no DocSearch application, no external API calls.

</wc-accordion>
<wc-accordion title="Content negotiation">

Request any page with `Accept: text/markdown` and get raw Markdown back. APIs and AI agents can consume your docs as structured content without scraping HTML.

</wc-accordion>
<wc-accordion title="Offline builds">

Run `docslit build --offline` to produce a self-contained site with lazy-loaded pages. Works without a server, from a `file://` URL, or on an air-gapped network. No external requests, no inline event handlers — hardened for secure environments.

</wc-accordion>
<wc-accordion title="11-format migration">

`docslit import` auto-detects and converts projects from Mintlify, Docusaurus, Nextra, GitBook, MkDocs, Sphinx, ReadMe, VuePress, VitePress, Starlight, and Fern. One command, no manual rewriting.

</wc-accordion>
</wc-accordion-group>

## The authoring experience

With React-based tools, adding a callout to a documentation page looks like this:

```jsx title="React / MDX"
import { Callout } from '@/components/Callout'

<Callout type="warning">
  You need to restart the server after changing config.
</Callout>
```

With DocsLit, you write:

```markdown title="DocsLit"
<wc-callout type="warning" title="Restart required">
You need to restart the server after changing config.
</wc-callout>
```

No import. No JSX. No file-level configuration. The component is available everywhere because it is a web component registered in the browser, not a framework-specific module.

## When React-based tools make sense

DocsLit is not the right choice for every project:

- **You need deeply custom interactive pages** — if your docs include full React applications (embedded playgrounds, drag-and-drop editors), a React-based tool gives you direct access to the React ecosystem.
- **Your team already maintains a React design system** — if you want to reuse existing React components without porting them to web components, staying in React avoids duplication.
- **You need ISR or server-side logic per request** — tools like Mintlify and Nextra can run server-side code on each page load. DocsLit produces static files.

For documentation sites that prioritize speed, simplicity, and portability, DocsLit delivers a faster site with less complexity.
