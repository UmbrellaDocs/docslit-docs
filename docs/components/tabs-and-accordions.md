---
title: Tabs and accordions
tag: Components
readtime: 4 min read
---

# Tabs and accordions

Use tabs to organize alternative content (like platform-specific instructions) and accordions for expandable sections (like FAQs).

## Tabs

Tabs let readers switch between related content panels without leaving the page:

```markdown
<wc-tabs>
<wc-tab label="macOS">

Install with Homebrew:

\```bash
brew install node
\```

</wc-tab>
<wc-tab label="Linux">

Install with your package manager:

\```bash
sudo apt install nodejs
\```

</wc-tab>
<wc-tab label="Windows">

Download the installer from [nodejs.org](https://nodejs.org).

</wc-tab>
</wc-tabs>
```

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

<wc-fields header="wc-tab">
<wc-field name="label" type="string" required>
The text displayed on the tab button.
</wc-field>
</wc-fields>

### When to use tabs

- Platform-specific instructions (macOS, Linux, Windows)
- Package manager alternatives (npm, pnpm, yarn)
- Language variants (JavaScript, Python, Go)
- Framework-specific examples (React, Vue, Angular)

## Accordions

Accordions hide content behind a clickable title. Readers expand only the sections they need:

```markdown
<wc-accordion title="How do I install DocsLit?">

Run `npm install -g docslit` or use `npx` to run it without installing.

</wc-accordion>

<wc-accordion title="What Node.js version do I need?">

DocsLit requires Node.js 24.0.0 or later.

</wc-accordion>
```

<wc-accordion title="How do I install DocsLit?">

Run `npm install -g docslit` or use `npx` to run it without installing.

</wc-accordion>

<wc-accordion title="What Node.js version do I need?">

DocsLit requires Node.js 24.0.0 or later.

</wc-accordion>

<wc-fields header="wc-accordion">
<wc-field name="title" type="string" required>
The clickable heading text that toggles the section.
</wc-field>
<wc-field name="open" type="boolean" default="false">
Set to `true` to expand the accordion by default.
</wc-field>
</wc-fields>

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

- `--offline` — Build a single HTML file
- `--out <dir>` — Custom output directory

</wc-expandable>
```

<wc-expandable title="Show advanced options">

These options are for advanced users who need fine-grained control over the build output.

- `--offline` — Build a single HTML file
- `--out <dir>` — Custom output directory

</wc-expandable>
