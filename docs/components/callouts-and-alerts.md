---
title: Callouts and alerts
tag: Components
readtime: 4 min read
---

# Callouts and alerts

Use callouts to highlight important information, warnings, tips, and notes. They draw attention to content that readers should not miss.

## Basic callout

```markdown
<wc-callout type="info" title="Good to know">
DocsLit generates a search index automatically on every build.
</wc-callout>
```

<wc-callout type="info" title="Good to know">
DocsLit generates a search index automatically on every build.
</wc-callout>

## Callout types

<wc-callout type="info" title="Info">
Use info callouts for supplementary information that adds context.
</wc-callout>

<wc-callout type="tip" title="Tip">
Use tip callouts for best practices and recommendations.
</wc-callout>

<wc-callout type="warning" title="Warning">
Use warning callouts for potential issues the reader should be aware of.
</wc-callout>

<wc-callout type="error" title="Error">
Use error callouts for critical issues that can cause failures.
</wc-callout>

<wc-callout type="success" title="Success">
Use success callouts to confirm that something works as expected.
</wc-callout>

<wc-callout type="note" title="Note">
Use note callouts for general remarks and observations.
</wc-callout>

## Attributes

<wc-fields header="wc-callout">
<wc-field name="type" type="string" required>
The visual style of the callout. Options: `info`, `tip`, `warning`, `error`, `success`, `note`.
</wc-field>
<wc-field name="title" type="string">
The heading text displayed at the top of the callout. If omitted, the callout shows only the body content.
</wc-field>
</wc-fields>

## Without a title

You can omit the title for a simpler presentation:

```markdown
<wc-callout type="tip">
Write one idea per sentence. Your readers will thank you.
</wc-callout>
```

<wc-callout type="tip">
Write one idea per sentence. Your readers will thank you.
</wc-callout>

## Markdown inside callouts

Callouts support full Markdown content including bold, italic, lists, links, and code:

```markdown
<wc-callout type="info" title="Supported Markdown">

You can use:

- **Bold** and *italic* text
- `inline code` and [links](../getting-started/introduction)
- Nested lists and other formatting

</wc-callout>
```

<wc-callout type="info" title="Supported Markdown">

You can use:

- **Bold** and *italic* text
- `inline code` and [links](../getting-started/introduction)
- Nested lists and other formatting

</wc-callout>

## Banners

Banners are dismissible notifications that span the full width of the content area. Use them for announcements or temporary notices.

```markdown
<wc-banner type="info">
DocsLit v0.2 is now available. See the changelog for details.
</wc-banner>
```

<wc-banner type="info">
DocsLit v0.2 is now available. See the changelog for details.
</wc-banner>

<wc-fields header="wc-banner">
<wc-field name="type" type="string">
The visual style. Options: `info`, `warning`, `error`, `success`, `neutral`. Defaults to `neutral`.
</wc-field>
</wc-fields>

## Badges

Inline badges for labeling and categorization:

```markdown
<wc-badge>Default</wc-badge>
<wc-badge variant="success">Stable</wc-badge>
<wc-badge variant="warning">Beta</wc-badge>
<wc-badge variant="danger">Deprecated</wc-badge>
<wc-badge variant="info">New</wc-badge>
<wc-badge variant="purple">Enterprise</wc-badge>
```

<wc-badge>Default</wc-badge>
<wc-badge variant="success">Stable</wc-badge>
<wc-badge variant="warning">Beta</wc-badge>
<wc-badge variant="danger">Deprecated</wc-badge>
<wc-badge variant="info">New</wc-badge>
<wc-badge variant="purple">Enterprise</wc-badge>

<wc-fields header="wc-badge">
<wc-field name="variant" type="string">
The color scheme. Options: `default`, `success`, `warning`, `danger`, `info`, `neutral`, `purple`.
</wc-field>
</wc-fields>

## When to use each type

| Type | Use for |
|---|---|
| `info` | Supplementary context, prerequisites |
| `tip` | Best practices, recommendations |
| `warning` | Potential gotchas, compatibility notes |
| `error` | Breaking changes, critical requirements |
| `success` | Confirmed behavior, completed steps |
| `note` | General remarks, asides |
