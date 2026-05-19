---
title: Custom components
description: Build your own web components with Lit or vanilla JS and use them alongside the built-in DocsLit components.
tag: Customization
readtime: 4 min read
---

# Custom components

You can extend DocsLit with your own Lit web components. Place a `.js` file in the `components/` directory and it loads automatically alongside the built-in components.

## Create a custom component

<wc-steps>
<wc-step title="Create the component file">

Create a file in `components/` with your component definition:

```javascript filename="components/wc-status.js"
class WcStatus extends LitElement {
  static properties = {
    type: { type: String }
  };

  static styles = css\`
    :host { display: inline-flex; align-items: center; gap: 6px; }
    .dot { width: 8px; height: 8px; border-radius: 50%; }
    .dot.up { background: #10b981; }
    .dot.down { background: #ef4444; }
    .dot.maintenance { background: #f59e0b; }
  \`;

  render() {
    return html\`
      <span class="dot \${this.type || 'up'}"></span>
      <slot></slot>
    \`;
  }
}
customElements.define('wc-status', WcStatus);
```

</wc-step>
<wc-step title="Use it in your Markdown">

Reference the component in any page — no imports needed:

```markdown
Service status: <wc-status type="up">Operational</wc-status>
```

</wc-step>
<wc-step title="Test in dev mode">

Run `docslit dev`. The dev server loads custom components from `components/` automatically and hot-reloads when you change them.

</wc-step>
</wc-steps>

## Component guidelines

<wc-callout type="info" title="Lit is available globally">
DocsLit bundles Lit and makes `LitElement`, `html`, and `css` available globally. You do not need to import them in your component files.
</wc-callout>

Follow these conventions for custom components:

- **Prefix with `wc-`** — All component tag names must start with `wc-` to work with the DocsLit rendering pipeline.
- **Use `LitElement`** — Extend `LitElement` for shadow DOM encapsulation and reactive properties.
- **Register with `customElements.define`** — Always define your element at the bottom of the file.
- **Keep components self-contained** — Include styles within the component using `static styles`.

## File structure

<wc-files>
<wc-dir name="components" open>
<wc-file name="wc-status.js" highlight></wc-file>
<wc-file name="wc-pricing.js"></wc-file>
<wc-file name="wc-changelog.js"></wc-file>
</wc-dir>
</wc-files>

Each `.js` file can contain one or more component definitions. DocsLit concatenates all files in `components/` into a single script and loads it after the built-in components.

## Validation

The `docslit validate` command knows about custom components. It scans `components/` for `customElements.define` calls and treats those tags as valid. Any `<wc-*>` tag that is not built-in or defined in `components/` triggers a warning.

## Build output

Custom components are included in both static and offline builds automatically. The `components/` directory is copied to `dist/components/` during the build.
