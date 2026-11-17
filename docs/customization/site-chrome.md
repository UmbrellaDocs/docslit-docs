---
title: Site chrome
description: Configure the navbar with links, dropdowns, buttons and a GitHub star count, the footer with columns and social icons, plus custom CSS, head tags, analytics, base path and redirects.
tag: Customization
readtime: 6 min read
---

# Site chrome

Make the docs site yours without forking templates. The header, footer and page shell are configured in `docslit.json`. For the logo, see [Logo](logo). For top-level sections, see [Tabs and anchors](tabs-and-anchors).

## Navbar

`navbar.links` adds entries to the header, left of the search box. Each entry has a `type`, and a plain link is the default:

```json filename="docslit.json"
{
  "navbar": {
    "links": [
      { "label": "Support", "href": "https://example.com/support" },
      { "type": "github", "href": "https://github.com/UmbrellaDocs/docslit-cli" },
      {
        "type": "dropdown",
        "label": "Resources",
        "links": [
          { "label": "Blog", "href": "https://example.com/blog", "icon": "newspaper" },
          { "label": "Community", "href": "https://example.com/community", "icon": "fa-brands fa-discord" }
        ]
      },
      { "type": "outlined", "label": "Sign in", "href": "https://app.example.com/login" }
    ],
    "primary": { "type": "button", "label": "Get started", "href": "https://app.example.com/signup" }
  }
}
```

| Type | Renders as | Notes |
|---|---|---|
| `link` | A text link | The default. Aliases: `minimal`, `text`. |
| `github` | The repository name with a star count | `href` must be a `github.com/owner/repo` URL. Set `"stars": false` to hide the count. |
| `discord` | A link with the Discord icon | The label defaults to "Discord". It shows no member count. |
| `dropdown` | A menu button | Holds a `links` array of `label`, `href` and `icon` items. Alias: `menu`. |
| `filled` | A solid button | Aliases: `button`, `primary`. Buttons sit at the right edge, after the other links. |
| `outlined` | An outlined button | Alias: `outline`. |

<wc-fields header="Navbar entry keys">
<wc-field name="label" type="string">
The text. Aliases: `text`, `title`.
</wc-field>
<wc-field name="href" type="string" required>
The destination. Aliases: `value`, `url`. Internal paths and external URLs both work, and external ones open in a new tab.
</wc-field>
<wc-field name="icon" type="string">
An icon before the label. See [Icons](../components/icons).
</wc-field>
<wc-field name="rightIcon" type="string">
An icon after the label.
</wc-field>
<wc-field name="rounded" type="boolean">
Pill-shaped corners, for `filled` and `outlined` buttons.
</wc-field>
<wc-field name="target" type="string">
The link target, such as `_blank`.
</wc-field>
<wc-field name="stars" type="boolean" default="true">
For `github` entries: show the star count.
</wc-field>
</wc-fields>

### Primary button

`navbar.primary` is the call to action at the right edge of the header. Its `type` is `button` (a solid button, the default), `outlined`, or `github`:

```json filename="docslit.json"
{
  "navbar": {
    "primary": { "type": "button", "label": "Dashboard", "href": "https://app.example.com" }
  }
}
```

### GitHub stars

A `github` entry shows the repository's star count. The count is fetched in the reader's browser from the public GitHub API, cached in the browser for an hour and shown only when the request works. Offline builds and blocked requests show the link without a count, so the header never waits on it.

On narrow screens the navbar links move into the navigation drawer. Dropdown items are listed as plain links there, and the star count is left out.

## Footer

```json filename="docslit.json"
{
  "footer": {
    "copyright": "© 2026 Acme Inc.",
    "socials": {
      "github": "https://github.com/acme",
      "x": "https://x.com/acme",
      "discord": "https://discord.gg/acme"
    },
    "columns": [
      {
        "title": "Product",
        "links": [{ "label": "Pricing", "href": "https://example.com/pricing" }]
      },
      {
        "title": "Company",
        "links": [{ "label": "About", "href": "https://example.com/about" }]
      }
    ],
    "links": [{ "label": "Status", "href": "https://status.example.com" }]
  }
}
```

<wc-fields header="footer">
<wc-field name="copyright" type="string">
The copyright line in the bottom bar.
</wc-field>
<wc-field name="columns" type="array">
Link columns above the bottom bar. Each has a `title` and a `links` array of `label` and `href`.
</wc-field>
<wc-field name="links" type="array">
A row of links in the bottom bar.
</wc-field>
<wc-field name="socials" type="object">
Social icons, by platform name. The value is the profile URL.
</wc-field>
</wc-fields>

External footer links open in a new tab. The `socials` keys that get their own icon and label are `github`, `x` (also `twitter`), `discord`, `slack`, `linkedin`, `youtube`, `facebook`, `instagram`, `reddit`, `twitch`, `mastodon`, `bluesky`, `threads`, `telegram`, `whatsapp`, `medium`, `dev`, `hacker-news`, `stack-overflow`, `gitlab`, `npm`, `website`, `rss` and `email`. Any other key is looked up as an [icon](../components/icons) name, so a Font Awesome brand name works too.

## Custom CSS and head tags

```json
{
  "css": "styles/custom.css",
  "head": [
    "<meta name=\"theme-color\" content=\"#0f172a\">"
  ],
  "favicon": "assets/favicon.png"
}
```

`css` is copied into the build output and linked after the DocsLit theme stylesheet. `head` injects raw trusted HTML into `<head>`.

## Analytics presets

```json
{
  "analytics": {
    "provider": "plausible",
    "domain": "docs.example.com"
  }
}
```

Supported providers: `plausible`, `fathom`, `ga4` (uses `measurementId`), `posthog` (uses `apiKey` / `host`).

## Base path (GitHub Pages)

For project sites like `https://user.github.io/repo/`:

```json
{
  "basePath": "/repo"
}
```

Then run:

```bash
docslit deploy --github-pages
```

## Redirects

```json
{
  "redirects": {
    "/old-guide": "/getting-started/introduction",
    "/legacy": "https://example.com"
  }
}
```

You can also set frontmatter `redirect: /new-path` on a page. Builds emit meta-refresh stubs plus `_redirects` and `vercel.json` entries.
