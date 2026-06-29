---
title: Announcement banner
description: Display a dismissible site-wide banner at the top of your docs for product updates, launches, and important notices.
tag: Customization
readtime: 3 min read
---

# Announcement banner

Use an announcement banner to highlight new features, releases, or important information. The banner appears at the top of every page, above the navigation bar.

<wc-banner type="info">
🚀 Example: **New SDK v2 is live** — <a href="getting-started/quickstart">read the migration guide</a>
</wc-banner>

Readers can dismiss the banner. It stays hidden until you update the message, then reappears automatically.

## Setup

Add an `announcement` object with a `message` to `docslit.json`:

```json filename="docslit.json"
{
  "name": "My Docs",
  "announcement": {
    "message": "🚀 New feature: Announcements are available! (<a href=\"https://docs.docslit.com/customization/announcement-banner\" target=\"_blank\">Learn more</a>) 🚀"
  },
  "sidebar": [...]
}
```

The message supports **Markdown** and **HTML**. You can include links, emphasis, and other inline formatting.

## Configuration options

<wc-fields header="Announcement options">
<wc-field name="message" type="string" required>
The banner text. Supports Markdown and HTML.
</wc-field>
<wc-field name="type" type="string" default="neutral">
Visual style. One of `info`, `warning`, `success`, `error`, or `neutral`.
</wc-field>
<wc-field name="dismissible" type="boolean" default="true">
When `true`, readers can dismiss the banner with the × button. Set to `false` for always-visible notices.
</wc-field>
</wc-fields>

### Banner types

<wc-columns cols="2">
<div>

<wc-banner type="info">Info — product updates and tips</wc-banner>

<wc-banner type="warning">Warning — deprecations and maintenance</wc-banner>

</div>
<div>

<wc-banner type="success">Success — launches and milestones</wc-banner>

<wc-banner type="error">Error — incidents and breaking changes</wc-banner>

</div>
</wc-columns>

## Dismissal behavior

When a reader dismisses the banner, DocsLit stores a hash of the current message in `localStorage`. The banner stays hidden on future visits until you change the `message` in `docslit.json` and rebuild (or refresh in dev mode). Updating the message is how you publish a new announcement.

<wc-callout type="note" title="Per-browser storage">
Dismissal is stored in the reader's browser. Clearing site data or using a different browser shows the banner again.
</wc-callout>

## Version-specific announcements

On [versioned sites](versioning), you can show different announcements per version. A version-level announcement overrides the site-wide fallback.

```json filename="docslit.json"
{
  "announcement": {
    "message": "Welcome to our documentation!"
  },
  "versions": {
    "default": "v2",
    "list": [
      {
        "version": "v1",
        "branch": "docs-v1",
        "announcement": {
          "message": "v1 is in maintenance mode. Upgrade to v2.",
          "type": "warning"
        }
      },
      {
        "version": "v2",
        "branch": "main"
      }
    ]
  },
  "sidebar": [...]
}
```

Version `v1` shows the maintenance notice. Version `v2` inherits the site-wide welcome message.

## Migrating from Fern

When you run `docslit import` on a Fern project, DocsLit reads `announcement.message` from `fern/docs.yml` and adds it to the generated `docslit.json`. See [Migrate from Fern](../migration/from-fern).

## In-page banners vs site-wide banners

DocsLit also includes `<wc-banner>` for banners inside page content. Use `docslit.json` announcement for site-wide notices that appear on every page. Use `<wc-banner>` in Markdown for page-specific callouts.

## Next steps

- Set your site [logo](logo) in the navigation bar
- Configure [versioning](versioning) for multi-release documentation
