---
title: Steps
description: Present sequential instructions as numbered steps with titles and rich content for tutorials and guides.
tag: Components
readtime: 3 min read
---

# Steps

Use steps to guide readers through sequential procedures. Steps auto-number themselves and provide clear visual structure for tutorials and setup guides.

## Basic steps

```markdown
<wc-steps>
<wc-step title="Create a project">

Run the init command to scaffold a new project.

\```bash
npx docslit init my-docs
\```

</wc-step>
<wc-step title="Start the server">

Launch the development server.

\```bash
npx docslit dev
\```

</wc-step>
<wc-step title="Open your browser">

Visit `http://localhost:3000` to see your site.

</wc-step>
</wc-steps>
```

<wc-steps>
<wc-step title="Create a project">

Run the init command to scaffold a new project.

```bash
npx docslit init my-docs
```

</wc-step>
<wc-step title="Start the server">

Launch the development server.

```bash
npx docslit dev
```

</wc-step>
<wc-step title="Open your browser">

Visit `http://localhost:3000` to see your site.

</wc-step>
</wc-steps>

## Attributes

<wc-fields header="wc-step">
<wc-field name="title" type="string" required>
The step heading displayed next to the step number.
</wc-field>
<wc-field name="n" type="number">
Override the auto-generated step number. Use this when you need non-sequential numbering.
</wc-field>
</wc-fields>

## Rich content in steps

Each step supports full Markdown content — code blocks, callouts, lists, tables, and other components:

<wc-steps>
<wc-step title="Configure your project">

Open `docslit.json` and set your site name:

```json filename="docslit.json"
{
  "name": "My Product Docs"
}
```

<wc-callout type="tip">
Choose a name that matches your product branding.
</wc-callout>

</wc-step>
<wc-step title="Add your first page">

Create `docs/getting-started.md` with the following content:

```markdown filename="docs/getting-started.md"
---
title: Getting started
---

# Getting started

Welcome to the docs!
```

</wc-step>
<wc-step title="Verify it works">

Check that your new page appears in the sidebar and renders correctly.

</wc-step>
</wc-steps>

## When to use steps

Use steps for any sequential procedure where order matters:

- Installation and setup guides
- Tutorial walkthroughs
- Deployment checklists
- Migration procedures

For non-sequential content, use [accordions](tabs-and-accordions) or standard headings instead.
