---
title: Embeds and media
description: Embed videos and iframes with a fixed aspect ratio, lazy loading and a privacy-friendly facade, and show a GitHub repository card that updates itself.
tag: Components
readtime: 5 min read
---

# Embeds and media

Two components bring outside content into a page without hurting load time or reader privacy: `wc-embed` for video and iframes, and `wc-github-repo` for a repository card.

## Embeds

`wc-embed` shows a video or any iframe with a fixed aspect ratio, so nothing shifts while it loads. It lazy-loads, and for YouTube, Vimeo and Loom it starts as a **facade**: a play button on a poster. Nothing is requested from the provider until the reader presses play, so the page sets no third-party cookies and loads no third-party scripts by itself.

```markdown
<wc-embed src="https://www.youtube.com/embed/jNQXAC9IVRw" title="The first video on YouTube"></wc-embed>
```

<wc-embed src="https://www.youtube.com/embed/jNQXAC9IVRw" title="The first video on YouTube"></wc-embed>

Add a `poster` image of your own, such as `poster="/assets/tour.webp"`, to put a picture behind the play button. A local poster keeps the facade free of any request to the video provider. YouTube embeds use the `youtube-nocookie.com` domain once playback starts.

### Embed anything else

Any other URL is placed in a lazy-loaded iframe. Set the shape with `ratio`, or a fixed `height`:

```markdown
<wc-embed src="https://example.com/demo" title="Interactive demo" ratio="4/3"></wc-embed>

<wc-embed src="https://example.com/form" title="Contact form" height="480"></wc-embed>
```

Allowed ratios are written as `width/height`, such as `16/9` (the default), `4/3`, `1/1` or `21/9`.

### Self-hosted video

A `src` that ends in `.mp4`, `.webm`, `.ogv`, `.mov` or `.m4v` plays in a native video element with controls:

```markdown
<wc-embed src="/assets/tour.mp4" poster="/assets/tour.webp" title="Product tour" muted loop></wc-embed>
```

Autoplay only works for muted video, and it is ignored for readers who prefer reduced motion. Set `controls="false"` to hide the controls.

### Raw iframes and videos

You do not have to rewrite existing HTML. The build turns a raw `<iframe>` that points at YouTube, Vimeo or Loom into a `wc-embed` facade, and it adds `loading="lazy"` and a strict referrer policy to every other iframe. The importer does the same for `iframe` and `video` tags from Mintlify and Fern.

<wc-fields header="wc-embed">
<wc-field name="src" type="string" required>
The embed URL (a YouTube, Vimeo or Loom link, or any iframe URL), or a video file.
</wc-field>
<wc-field name="title" type="string">
The accessible title of the embed. It is also shown on the facade.
</wc-field>
<wc-field name="ratio" type="string" default="16/9">
The aspect ratio, such as `16/9`, `4/3`, `1/1` or `21/9`.
</wc-field>
<wc-field name="height" type="string">
A fixed height, in pixels or any CSS length, instead of an aspect ratio.
</wc-field>
<wc-field name="poster" type="string">
A poster image. It sits behind the facade, or is the poster of a video file.
</wc-field>
<wc-field name="allow" type="string">
The iframe `allow` attribute, which sets the permissions policy.
</wc-field>
<wc-field name="autoplay" type="boolean">
Video files only: start playing automatically. It needs `muted`.
</wc-field>
<wc-field name="muted" type="boolean">
Video files only: start muted.
</wc-field>
<wc-field name="loop" type="boolean">
Video files only: loop the video.
</wc-field>
<wc-field name="controls" type="string" default="true">
Video files only: set to `false` to hide the controls.
</wc-field>
</wc-fields>

## GitHub repository cards

`wc-github-repo` shows a repository with its description, language, stars and forks. The card renders immediately from its attributes, with space reserved so nothing shifts, and then fills in live numbers from the public GitHub API. The result is cached in the browser for an hour. If the request fails, or the reader is offline, the card keeps what it has.

```markdown
<wc-github-repo repo="UmbrellaDocs/docslit-cli"></wc-github-repo>
```

<wc-github-repo repo="UmbrellaDocs/docslit-cli"></wc-github-repo>

The `flat` variant drops the inset look. Add static values to override or replace what the API returns, and `live="false"` to never contact GitHub, which suits private docs and offline builds:

```markdown
<wc-github-repo repo="UmbrellaDocs/docslit-cli" variant="flat" description="The DocsLit command-line tool" language="JavaScript" live="false"></wc-github-repo>
```

<wc-github-repo repo="UmbrellaDocs/docslit-cli" variant="flat" description="The DocsLit command-line tool" language="JavaScript" live="false"></wc-github-repo>

<wc-fields header="wc-github-repo">
<wc-field name="repo" type="string" required>
The repository as `owner/name`, or a full `github.com` URL.
</wc-field>
<wc-field name="variant" type="string" default="inset">
The card style: `inset` or `flat`.
</wc-field>
<wc-field name="description" type="string">
A static description. It overrides the fetched one.
</wc-field>
<wc-field name="stars" type="string">
A static star count. It overrides the fetched one.
</wc-field>
<wc-field name="forks" type="string">
A static fork count.
</wc-field>
<wc-field name="language" type="string">
A static primary language.
</wc-field>
<wc-field name="live" type="string" default="true">
Set to `false` to never call the GitHub API.
</wc-field>
</wc-fields>

For a star count in the header instead, see the `github` link type in [Site chrome](../customization/site-chrome#navbar).

## Next steps

- Style images, frames and zoom in [Layout](layout#frames) and [Markdown basics](../writing-content/markdown-basics#images)
- Offer files with [download links](file-trees#download-links)
