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
docslit init my-docs
\```

</wc-step>
<wc-step title="Start the server">

Launch the development server.

\```bash
docslit dev
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
docslit init my-docs
```

</wc-step>
<wc-step title="Start the server">

Launch the development server.

```bash
docslit dev
```

</wc-step>
<wc-step title="Open your browser">

Visit `http://localhost:3000` to see your site.

</wc-step>
</wc-steps>

## Attributes

<wc-fields header="wc-steps">
<wc-field name="title-size" type="string" default="p">
The level of the step titles: `p`, `h2`, `h3` or `h4`. With `h2`, `h3` or `h4`, each title is a real heading, so it appears in the page table of contents and gets an anchor.
</wc-field>
</wc-fields>

<wc-fields header="wc-step">
<wc-field name="title" type="string" required>
The step heading displayed next to the step marker. Inline Markdown works.
</wc-field>
<wc-field name="icon" type="string">
An [icon](icons) shown in the marker instead of the number.
</wc-field>
<wc-field name="n" type="number">
Override the generated step number. Use this when you need non-sequential numbering.
</wc-field>
<wc-field name="title-size" type="string">
The title level for this step. It overrides the value on `wc-steps`.
</wc-field>
<wc-field name="no-anchor" type="boolean">
Hide the hover anchor link on a plain-text (`p`) title.
</wc-field>
</wc-fields>

## Icons and headings

Replace the number with an icon, and make titles real headings so readers can jump to a step from the table of contents:

```markdown
<wc-steps title-size="h3">
<wc-step title="Build the site" icon="hammer">

Run `docslit build`.

</wc-step>
<wc-step title="Publish it" icon="rocket">

Run `docslit publish`.

</wc-step>
</wc-steps>
```

<wc-steps title-size="h3">
<wc-step title="Build the site" icon="hammer">

Run `docslit build`.

</wc-step>
<wc-step title="Publish it" icon="rocket">

Run `docslit publish`.

</wc-step>
</wc-steps>

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
