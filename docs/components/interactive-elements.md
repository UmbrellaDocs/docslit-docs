---
title: Interactive elements
description: Add editable variables, tooltips, anchors, changelog updates and copyable AI prompts that respond to reader input.
tag: Components
readtime: 3 min read
---

# Interactive elements

Components that respond to reader input: editable variables, tooltips, anchors, changelog entries and copyable prompts.

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
<wc-field name="default" type="string">
The default value shown before the reader edits it.
</wc-field>
<wc-field name="value" type="string">
Compile-time form only: `<wc-var name="X" value="Y" />` declares a page-level variable. See [Variables and precedence](../writing-content/variables-and-precedence).
</wc-field>
<wc-field name="readonly" type="boolean">
Prevent the reader from editing the value.
</wc-field>
</wc-fields>

<wc-callout type="tip" title="Great for onboarding">
Use editable variables in quickstart guides and setup pages. Readers type their API key, project name, or domain once and every command on the page becomes copy-paste ready.
</wc-callout>

## Tooltips

Add hover tooltips to provide extra context without cluttering the page. The text is keyboard focusable, Escape closes the tooltip, and it flips to stay on screen.

```markdown
DocsLit uses <wc-tooltip tip="A lightweight library for building web components">Lit</wc-tooltip> for its component system.

Read the <wc-tooltip tip="Every component, attribute and example" headline="Reference" cta="Open reference" href="callouts-and-alerts" position="bottom">component docs</wc-tooltip>.
```

DocsLit uses <wc-tooltip tip="A lightweight library for building web components">Lit</wc-tooltip> for its component system.

Read the <wc-tooltip tip="Every component, attribute and example" headline="Reference" cta="Open reference" href="callouts-and-alerts" position="bottom">component docs</wc-tooltip>.

<wc-fields header="wc-tooltip">
<wc-field name="tip" type="string" required>
The tooltip content. Inline Markdown works. `text` is accepted as an older alias.
</wc-field>
<wc-field name="headline" type="string">
A bold line shown before the tip text.
</wc-field>
<wc-field name="cta" type="string">
Call-to-action link text. It needs `href`.
</wc-field>
<wc-field name="href" type="string">
The URL for the call-to-action link.
</wc-field>
<wc-field name="position" type="string" default="top">
The preferred side: `top`, `bottom`, `left` or `right`. It flips automatically when there is no room.
</wc-field>
<wc-field name="theme" type="string">
Pin the tooltip to `dark` or `light`.
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

Display changelog entries. There are two layouts. The **timeline** layout uses `label`, `description` and `tags`, and the label doubles as an anchor link. The **boxed** layout uses `version`, `date` and `type`.

```markdown
<wc-update label="2026-10-29" description="v1.2.0" tags="Feature, Fix">
New `--json` flag for the `validate` command.
</wc-update>

<wc-update version="0.2.0" date="November 2026" type="added">
Accordion group component for visually connected collapsible sections.
</wc-update>
```

<wc-update label="2026-10-29" description="v1.2.0" tags="Feature, Fix">
New `--json` flag for the `validate` command.
</wc-update>

<wc-update version="0.2.0" date="November 2026" type="added">
Accordion group component for visually connected collapsible sections.
</wc-update>

<wc-fields header="wc-update">
<wc-field name="label" type="string">
The entry label, usually a date or version. It is also the anchor: `label="2026-10-29"` links as `#2026-10-29`. Timeline layout.
</wc-field>
<wc-field name="description" type="string">
Text under the label, such as a version. Timeline layout.
</wc-field>
<wc-field name="tags" type="string">
Comma-separated tags shown as chips under the label. Timeline layout.
</wc-field>
<wc-field name="version" type="string">
The version number for this change. Boxed layout.
</wc-field>
<wc-field name="date" type="string">
The release date, as free text. Boxed layout.
</wc-field>
<wc-field name="type" type="string">
The change type badge: `added`, `changed`, `fixed`, `removed`, `deprecated` or `security`. Boxed layout.
</wc-field>
</wc-fields>

Pages whose id starts with `changelog/` or `blog/` also get RSS and Atom feeds. See [What's new](../changelog/whats-new) for a full example.

## Copyable prompts

`wc-prompt` shows a prompt that readers can copy into an AI assistant, or open directly in one. The text between the tags is what gets copied.

```markdown
<wc-prompt title="Ask your assistant" actions="claude,chatgpt">
Write a quickstart page for my project using DocsLit components. Run docslit components --json first.
</wc-prompt>
```

<wc-prompt title="Ask your assistant" actions="claude,chatgpt">
Write a quickstart page for my project using DocsLit components. Run docslit components --json first.
</wc-prompt>

Use `description` when the card should show a short summary and the long prompt should stay hidden. The body is then what gets copied and sent:

```markdown
<wc-prompt title="Migrate my docs" description="Convert a Mintlify project with the importer" icon="sparkles" actions="claude">
Run docslit import ./my-mintlify-docs, then fix everything listed in MIGRATION.md.
</wc-prompt>
```

<wc-prompt title="Migrate my docs" description="Convert a Mintlify project with the importer" icon="sparkles" actions="claude">
Run docslit import ./my-mintlify-docs, then fix everything listed in MIGRATION.md.
</wc-prompt>

<wc-fields header="wc-prompt">
<wc-field name="title" type="string" default="AI Prompt">
The header label.
</wc-field>
<wc-field name="description" type="string">
Text shown in the card, with inline Markdown. When set, the body is not shown, but it is still what gets copied.
</wc-field>
<wc-field name="icon" type="string">
An [icon](icons) before the title. Defaults to a sparkle.
</wc-field>
<wc-field name="actions" type="string">
Open-in buttons. A comma-separated list of `cursor`, `claude` and `chatgpt`, or a JSON array that can also hold custom objects with `label`, `url` and `icon`. A `{prompt}` placeholder in `url` is replaced by the URL-encoded prompt. The **Copy** button is always there.
</wc-field>
<wc-field name="single-line" type="boolean">
Truncate the preview to one line.
</wc-field>
<wc-field name="hide-prompt" type="boolean">
Hide the prompt body and show only the header with its actions.
</wc-field>
</wc-fields>

A custom action uses a JSON array in single quotes:

```markdown
<wc-prompt actions='[{"label":"Open in Perplexity","url":"https://www.perplexity.ai/search?q={prompt}"}]'>
Explain how DocsLit builds a sidebar.
</wc-prompt>
```
