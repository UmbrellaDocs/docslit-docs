---
title: Interactive elements
description: Add buttons, tooltips, badges, copy-to-clipboard prompts, and other interactive elements to your documentation.
tag: Components
readtime: 3 min read
---

# Interactive elements

Components that respond to reader input — editable variables, tooltips, and anchors.

## Editable variables

The `wc-var` component creates an inline editable field. When the reader changes the value, every `{{VAR_NAME}}` placeholder on the page updates instantly.

Set your domain: <wc-var name="DOMAIN" default="docs.example.com"></wc-var>

Set your project: <wc-var name="NAME" default="my-product"></wc-var>

```json filename="docslit.json"
{
  "name": "{{NAME}}",
  "url": "https://{{DOMAIN}}"
}
```

```bash
docslit build
rsync -avz dist/ deploy@{{DOMAIN}}:/var/www/html/
```

Click the variable values above and type your own to see both code blocks update.

<wc-fields header="wc-var">
<wc-field name="name" type="string" required>
The variable name. Use `UPPER_SNAKE_CASE`. Referenced in code blocks as `{{NAME}}`.
</wc-field>
<wc-field name="default" type="string" required>
The default value shown before the reader edits it.
</wc-field>
</wc-fields>

<wc-callout type="tip" title="Great for onboarding">
Use editable variables in quickstart guides and setup pages. Readers type their API key, project name, or domain once and every command on the page becomes copy-paste ready.
</wc-callout>

## Tooltips

Add hover tooltips to provide extra context without cluttering the page:

```markdown
DocsLit uses <wc-tooltip text="A lightweight framework for building web components">Lit</wc-tooltip> for its component system.
```

DocsLit uses <wc-tooltip text="A lightweight framework for building web components">Lit</wc-tooltip> for its component system.

<wc-fields header="wc-tooltip">
<wc-field name="text" type="string" required>
The tooltip content shown on hover.
</wc-field>
<wc-field name="position" type="string" default="top">
Where the tooltip appears. Options: `top`, `bottom`.
</wc-field>
</wc-fields>

## Anchors

Create linkable sections with auto-generated IDs:

```markdown
<wc-anchor>Important section</wc-anchor>
```

<wc-anchor>Important section</wc-anchor>

Hovering over an anchor reveals a link icon. Readers click it to copy the direct URL to that section.

## Update entries

Display changelog entries with type badges:

```markdown
<wc-update version="0.1.6" date="April 2025" type="added">
Accordion group component for visually connected collapsible sections.
</wc-update>

<wc-update version="0.1.6" date="April 2025" type="fixed">
Search result navigation no longer stacks path segments on nested pages.
</wc-update>
```

<wc-update version="0.1.6" date="April 2025" type="added">
Accordion group component for visually connected collapsible sections.
</wc-update>

<wc-update version="0.1.6" date="April 2025" type="fixed">
Search result navigation no longer stacks path segments on nested pages.
</wc-update>

<wc-fields header="wc-update">
<wc-field name="version" type="string" required>
The version number for this change.
</wc-field>
<wc-field name="date" type="string">
The release date.
</wc-field>
<wc-field name="type" type="string">
The change type badge. Options: `added`, `changed`, `fixed`, `removed`, `deprecated`, `security`.
</wc-field>
</wc-fields>
