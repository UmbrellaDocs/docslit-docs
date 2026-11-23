---
title: Tabs and accordions
description: Organize content into switchable tabs, view toggles and collapsible accordion sections, with icons, deep links, default selection and synced choices.
tag: Components
readtime: 4 min read
---

# Tabs and accordions

Use tabs to organize alternative content (like platform-specific instructions) and accordions for expandable sections (like FAQs).

## Tabs

Tabs let readers switch between related content panels without leaving the page:

````markdown
<wc-tabs>
<wc-tab label="macOS">

Install with Homebrew:

```bash
brew install node
```

</wc-tab>
<wc-tab label="Linux">

Install with your package manager:

```bash
sudo apt install nodejs
```

</wc-tab>
<wc-tab label="Windows">

Download the installer from [nodejs.org](https://nodejs.org).

</wc-tab>
</wc-tabs>
````

<wc-tabs>
<wc-tab label="macOS">

Install with Homebrew:

```bash
brew install node
```

</wc-tab>
<wc-tab label="Linux">

Install with your package manager:

```bash
sudo apt install nodejs
```

</wc-tab>
<wc-tab label="Windows">

Download the installer from [nodejs.org](https://nodejs.org).

</wc-tab>
</wc-tabs>

<wc-fields header="wc-tabs">
<wc-field name="default-tab" type="number" default="0">
The zero-based index of the tab shown first.
</wc-field>
<wc-field name="border-bottom" type="boolean">
Add a bottom border and spacing below the tabs, to separate them from the content that follows.
</wc-field>
<wc-field name="sync" type="string">
A key shared by groups that should switch together. See [Synced tabs](#synced-tabs).
</wc-field>
<wc-field name="theme" type="string">
Pin the tabs to `dark` or `light`.
</wc-field>
</wc-fields>

<wc-fields header="wc-tab">
<wc-field name="label" type="string" required>
The text on the tab button. Inline Markdown works. It is also the deep-link id: its slug opens the tab.
</wc-field>
<wc-field name="icon" type="string">
An [icon](icons) before the label.
</wc-field>
</wc-fields>

Arrow keys, Home and End move between tabs, and a `#` fragment in the URL that matches a tab's slug opens that tab. For example, `#windows` opens the Windows tab above. Tabs with icons and a default tab:

```markdown
<wc-tabs default-tab="1">
<wc-tab label="npm" icon="box">

Install with npm.

</wc-tab>
<wc-tab label="Docker" icon="fa-brands fa-docker">

Run the image. This tab is open first.

</wc-tab>
</wc-tabs>
```

<wc-tabs default-tab="1">
<wc-tab label="npm" icon="box">

Install with npm.

</wc-tab>
<wc-tab label="Docker" icon="fa-brands fa-docker">

Run the image. This tab is open first.

</wc-tab>
</wc-tabs>

### Synced tabs

Give several tab groups the same `sync` key and they switch together. A reader who picks "pnpm" in one place sees "pnpm" everywhere on the site. Tabs match by label, so the label text must be identical, and a group without a matching label stays as it is.

````markdown
<wc-tabs sync="pkg">
<wc-tab label="npm">

```bash
npm install docslit
```

</wc-tab>
<wc-tab label="pnpm">

```bash
pnpm add docslit
```

</wc-tab>
</wc-tabs>
````

`sync` works on `wc-tabs` and on `wc-code-group`, and a `wc-tabs` can sync with a `wc-code-group` that uses the same key and labels. The choice is saved in the reader's browser. Try it here: switch either group and the other follows.

<wc-tabs sync="demo-os">
<wc-tab label="macOS">

Use Homebrew on macOS.

</wc-tab>
<wc-tab label="Linux">

Use your distribution's package manager.

</wc-tab>
</wc-tabs>

<wc-code-group sync="demo-os">
<wc-code-tab label="macOS">brew install node</wc-code-tab>
<wc-code-tab label="Linux">sudo apt install nodejs</wc-code-tab>
</wc-code-group>

### When to use tabs

- Platform-specific instructions (macOS, Linux, Windows)
- Package manager alternatives (npm, pnpm, yarn)
- Language variants (JavaScript, Python, Go)
- Framework-specific examples (React, Vue, Angular)

## Accordions

Accordions hide content behind a clickable title. Readers expand only the sections they need:

```markdown
<wc-accordion-group>
<wc-accordion title="How do I install DocsLit?">

Run `npm install -g docslit` or use `npx` to run it without installing.

</wc-accordion>

<wc-accordion title="What Node.js version do I need?">

DocsLit requires Node.js 22.22.0 or later.

</wc-accordion>
</wc-accordion-group>
```

<wc-accordion-group>
<wc-accordion title="How do I install DocsLit?">

Run `npm install -g docslit` or use `npx` to run it without installing.

</wc-accordion>

<wc-accordion title="What Node.js version do I need?">

DocsLit requires Node.js 22.22.0 or later.

</wc-accordion>
</wc-accordion-group>

<wc-fields header="wc-accordion">
<wc-field name="title" type="string" required>
The clickable heading text that toggles the section. Inline Markdown works.
</wc-field>
<wc-field name="description" type="string">
Smaller text under the title.
</wc-field>
<wc-field name="icon" type="string">
A leading [icon](icons).
</wc-field>
<wc-field name="open" type="boolean">
Expand the item by default.
</wc-field>
<wc-field name="id" type="string">
The anchor id. A URL that ends in `#id` opens the item. Without it, the slug of the title is used.
</wc-field>
</wc-fields>

An accordion is a real button with `aria-expanded`, so it works from the keyboard and with screen readers, and the in-page search can find text inside a closed item. Here is one with a description, an icon and a deep link:

```markdown
<wc-accordion-group>
<wc-accordion title="Which Node.js version do I need?" description="Short answer: 22.22 or later" icon="circle-help" id="node-version">

DocsLit requires Node.js 22.22.0 or later.

</wc-accordion>
</wc-accordion-group>
```

<wc-accordion-group>
<wc-accordion title="Which Node.js version do I need?" description="Short answer: 22.22 or later" icon="circle-help" id="node-version">

DocsLit requires Node.js 22.22.0 or later.

</wc-accordion>
</wc-accordion-group>

## Accordion groups

Wrap accordions in `wc-accordion-group` for a visually connected set with continuous borders:

```markdown
<wc-accordion-group>
<wc-accordion title="Can I use custom components?">

Yes. Place `.js` files in the `components/` directory and they load automatically.

</wc-accordion>
<wc-accordion title="Does DocsLit support versioning?">

Yes. Configure `versions` in `docslit.json` to maintain docs for multiple releases.

</wc-accordion>
<wc-accordion title="Can I deploy to any hosting provider?">

Yes. The `docslit build` output is a standard static site that works anywhere.

</wc-accordion>
</wc-accordion-group>
```

<wc-accordion-group>
<wc-accordion title="Can I use custom components?">

Yes. Place `.js` files in the `components/` directory and they load automatically.

</wc-accordion>
<wc-accordion title="Does DocsLit support versioning?">

Yes. Configure `versions` in `docslit.json` to maintain docs for multiple releases.

</wc-accordion>
<wc-accordion title="Can I deploy to any hosting provider?">

Yes. The `docslit build` output is a standard static site that works anywhere.

</wc-accordion>
</wc-accordion-group>

## Expandable sections

Use `wc-expandable` for a simpler collapsible section:

```markdown
<wc-expandable title="Show advanced options">

These options are for advanced users who need fine-grained control over the build output.

- `--offline` — Build a self-contained offline site
- `--out <dir>` — Custom output directory

</wc-expandable>
```

<wc-expandable title="Show advanced options">

These options are for advanced users who need fine-grained control over the build output.

- `--offline` — Build a self-contained offline site
- `--out <dir>` — Custom output directory

</wc-expandable>

<wc-fields header="wc-expandable">
<wc-field name="title" type="string">
The clickable heading that toggles the section.
</wc-field>
<wc-field name="description" type="string">
Smaller text under the title.
</wc-field>
<wc-field name="icon" type="string">
A leading [icon](icons).
</wc-field>
<wc-field name="open" type="boolean">
Expand the section by default.
</wc-field>
</wc-fields>

`wc-expandable` behaves like `wc-accordion`. It is meant for nested content, such as the properties of an object in an [API field list](data-display#fields).

## Views

`wc-view` is a switcher for alternative views of the same content, such as a language or a platform. Its panels are `wc-view-panel` elements with a `label` and an optional `icon`. Give several view groups the same `sync` key, and they switch together.

````markdown
<wc-view sync="api-style">
<wc-view-panel label="REST" icon="globe">

Call the HTTP API directly.

```bash
curl https://api.example.com/events
```

</wc-view-panel>
<wc-view-panel label="SDK" icon="package">

Use the client library.

```js
await client.events.list();
```

</wc-view-panel>
</wc-view>
````

<wc-view sync="api-style">
<wc-view-panel label="REST" icon="globe">

Call the HTTP API directly.

```bash
curl https://api.example.com/events
```

</wc-view-panel>
<wc-view-panel label="SDK" icon="package">

Use the client library.

```js
await client.events.list();
```

</wc-view-panel>
</wc-view>

<wc-fields header="wc-view">
<wc-field name="sync" type="string">
A key shared by view groups that switch together. Panels match by label.
</wc-field>
</wc-fields>

<wc-fields header="wc-view-panel">
<wc-field name="label" type="string" required>
The text on the toggle button.
</wc-field>
<wc-field name="icon" type="string">
An [icon](icons) before the label.
</wc-field>
</wc-fields>

Use tabs for content that readers pick once, and views when the choice is a preference that applies across the page.
