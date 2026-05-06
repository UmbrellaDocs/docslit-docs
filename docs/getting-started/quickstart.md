---
title: Quickstart
tag: Getting started
readtime: 3 min read
---

# Quickstart

Create a documentation site and preview it locally in under 3 minutes.

Set your project name: <wc-var name="PROJECT" default="my-docs"></wc-var>

<wc-steps>
<wc-step title="Create your project">

Scaffold a new documentation project:

```bash
npx docslit init {{PROJECT}}
```

This creates a `{{PROJECT}}/` directory with a starter configuration and three example pages.

</wc-step>
<wc-step title="Enter the project directory">

```bash
cd {{PROJECT}}
```

</wc-step>
<wc-step title="Start the dev server">

```bash
npx docslit dev
```

The dev server starts on `http://localhost:3000` with hot reload enabled. Every time you save a file, the browser updates automatically.

</wc-step>
<wc-step title="Edit your first page">

Open `docs/introduction.md` in your editor and make a change. The browser reloads instantly to show your update.

</wc-step>
</wc-steps>

## What was created

After running `init`, your project looks like this:

<wc-files>
<wc-dir name="{{PROJECT}}" open>
<wc-file name="docslit.json" highlight></wc-file>
<wc-dir name="docs" open>
<wc-file name="introduction.md"></wc-file>
<wc-file name="installation.md"></wc-file>
<wc-file name="quickstart.md"></wc-file>
</wc-dir>
<wc-dir name="components">
</wc-dir>
</wc-dir>
</wc-files>

| File | Purpose |
|---|---|
| `docslit.json` | Project configuration — site name and sidebar structure |
| `docs/*.md` | Your documentation pages in Markdown |
| `components/` | Directory for custom web components (optional) |

## Add a new page

<wc-steps>
<wc-step title="Create a Markdown file">

Create `docs/guides.md`:

```markdown
---
title: Guides
---

# Guides

Welcome to the guides section.

<wc-callout type="info" title="Coming soon">
More guides are on the way.
</wc-callout>
```

</wc-step>
<wc-step title="Add it to the sidebar">

Open `docslit.json` and add `"guides"` to the pages array:

```json filename="docslit.json"
{
  "name": "{{PROJECT}}",
  "sidebar": [
    {
      "group": "Getting Started",
      "pages": ["introduction", "installation", "quickstart", "guides"]
    }
  ]
}
```

</wc-step>
<wc-step title="See it live">

The dev server picks up the config change automatically. Your new page appears in the sidebar.

</wc-step>
</wc-steps>

## Build for production

When you are ready to deploy, build a static site:

```bash
npx docslit build
```

This creates a `dist/` directory with everything you need to deploy. See [static hosting](deployment/static-hosting) for deployment guides.

## Next steps

- Learn about [project structure](getting-started/project-structure) to understand how DocsLit organizes your content
- Read [Markdown basics](writing-content/markdown-basics) to start writing effective documentation
- Explore the [components](components/callouts-and-alerts) to add rich interactions to your pages
