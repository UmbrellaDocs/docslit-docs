---
title: Why DocsLit
description: How DocsLit compares to React-based documentation tools like Docusaurus, Nextra, and Mintlify on bundle size, build speed, and authoring experience.
tag: Overview
readtime: 5 min read
---

<!-- docslit-lint-disable raw-html-block -->

# Why DocsLit

Most documentation tools are built on React. That means your docs site ships a JavaScript framework, hydrates static content the browser already rendered, and asks you to learn JSX just to add a callout. DocsLit takes a different approach: standard Markdown, native web components, and zero framework runtime.

## The numbers

<wc-tiles>
<wc-tile icon-name="package" title="16 KB total" description="Lit runtime + all 54 components, gzipped. No React, no router, no hydration layer."></wc-tile>
<wc-tile icon-name="zap" title="0 s build" description="No webpack, no Vite, no bundler. Plain HTML served from the edge."></wc-tile>
<wc-tile icon-name="blocks" title="54 components" description="Callouts, tabs, code blocks, API explorer, file trees, and more — all built in."></wc-tile>
<wc-tile icon="right-left" title="One-command migration" description="Move from Mintlify, Fern, GitBook or MkDocs with one command and a report of what needs a human."></wc-tile>
</wc-tiles>

## Client-side JavaScript

This is the JavaScript your readers download on every page load. Less JS means faster Time to Interactive, better Lighthouse scores, and lower mobile data costs.

| Framework | Client JS (gzipped) | React required | Hydration |
|---|---|---|---|
| DocsLit | 16 KB | No | None |
| Nextra 4 | 106 KB | Yes (React 19) | Full page |
| Fumadocs | 161 KB | Yes (React 19) | Partial (RSC) |
| Docusaurus 3 | 250–400 KB | Yes (React 18) | Full page |
| Mintlify | ~100+ KB | Yes (Next.js) | Full page |

<wc-callout type="info" title="Where does 16 KB come from?">
DocsLit ships Lit (the web component library) plus all 54 built-in components as a single ES module. There is no virtual DOM, no router library, no framework runtime. The browser loads 16,036 bytes gzipped from your own site, with no CDN request, and every component works immediately.
</wc-callout>

## Why the gap is so large

React-based documentation tools pay three taxes that DocsLit avoids entirely:

<wc-steps>
<wc-step title="Framework runtime">

React + ReactDOM is ~28 KB gzipped before your docs site adds a single word. Then add a client-side router, state management, and the framework's own bootstrapping code. Docusaurus bundles webpack runtime, route manifests, and the entire SPA shell — on a 4,000-page site, `main.js` alone reached 10 MB uncompressed.

DocsLit ships Lit with your site in `docslit-vendor/` and loads it through an import map. Lit is 5 KB gzipped. There is no router library, no state management layer, and no bootstrapping overhead.

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

## Built for AI agents

Docs are now written and read by AI tools as often as by people. Many docs frameworks treat that as an add-on. DocsLit treats it as a design goal, so its agent features are part of the CLI and work offline:

| Capability | What DocsLit provides |
|---|---|
| Learn the component set | `docslit components --json` and `docslit schema` print attributes, allowed values, nesting and examples from the same manifest the validators use |
| Write pages | `docslit new --json`, or the `create_page` tool in the MCP server |
| Check the result | `docslit validate --format json` and `docslit lint --format json` return stable issue codes with a line number and a suggested fix |
| Check markup before writing | The `check_markup` MCP tool flags unknown tags, bad attribute values and wrong nesting |
| Set up any AI tool | `docslit agents init` writes `AGENTS.md`, Claude Code skills, Cursor, Copilot, Windsurf and Gemini files, and MCP config |
| Read published docs | `llms.txt`, `.md` URLs, `Accept: text/markdown`, `agent.json` and an MCP server, hosted for you on DocsLit Cloud |

The whole toolchain is open source. DocsLit does not call a language model and does not send your content anywhere. Start with [Built for AI agents](../ai-and-agents/overview).

## What you don't need

| Concept | React tools | DocsLit |
|---|---|---|
| JSX / MDX | Required for any component | Standard Markdown + HTML tags |
| Import statements | Every page needs component imports | None — components are globally available |
| Webpack / Vite config | Often customized for plugins | No bundler at all |
| node_modules (300–500 MB) | React, webpack, Babel, MDX, etc. | 20 production dependencies |
| React knowledge | Needed for custom components | Standard web components (Lit or vanilla) |
| Hydration debugging | Common source of SSR/client mismatches | No hydration to debug |

## What you get for free

Features that require plugins, configuration, or paid tiers on other platforms are built into every DocsLit site:

<wc-accordion-group>
<wc-accordion title="AI agent discovery">

Every static build generates `llms.txt`, `llms-full.txt`, a `.md` file for every page, `.well-known/agent.json` and a standalone MCP server (`mcp-server.js`). No plugin, no configuration, no third-party service. See [How agents read your site](../ai-and-agents/reading-agents).

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
<wc-accordion title="One-command migration">

`docslit import` auto-detects and converts Mintlify, Fern, GitBook and MkDocs projects: pages, components, code blocks, navigation, branding and redirects, with a `MIGRATION.md` report for everything that needs a human. Other Markdown or MDX folders import with an automatic sidebar. See [Migrate from Mintlify](../migration/from-mintlify).

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
