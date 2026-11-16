---
title: Page feedback widget
description: Add a Was this page helpful widget to every page, send responses to your own endpoint or analytics provider, and listen for the docslit:feedback browser event.
tag: Customization
readtime: 4 min read
---

# Page feedback widget

The feedback widget asks readers "Was this page helpful?" at the bottom of each page. It is off by default. DocsLit does not store responses. It forwards each one to places you control: your own endpoint, your analytics provider, or a browser event.

## Turn it on

```json filename="docslit.json"
{
  "feedback": true
}
```

Customize the question, and send responses to an endpoint:

```json filename="docslit.json"
{
  "feedback": {
    "question": "Did this answer your question?",
    "url": "https://example.com/api/docs-feedback"
  }
}
```

<wc-fields header="feedback options">
<wc-field name="question" type="string" default="Was this page helpful?">
The question shown above the Yes and No buttons.
</wc-field>
<wc-field name="url" type="string">
An `http(s)` endpoint that receives a JSON `POST` for each response. Other values are ignored.
</wc-field>
</wc-fields>

Hide the widget on one page with frontmatter:

```yaml
---
title: Changelog
feedback: false
---
```

## How readers use it

A reader clicks **Yes** or **No**. Yes shows a thank-you message. No opens an optional comment box with **Send** and **Skip** buttons. The widget remembers the answer in the reader's browser, per page, version and locale, so it shows the thank-you message on later visits instead of asking again.

## What gets sent

Each response sends a payload like this:

```json
{
  "page": "getting-started/quickstart",
  "title": "Quickstart",
  "helpful": false,
  "url": "https://docs.example.com/0.1/getting-started/quickstart",
  "version": "0.1",
  "comment": "The install step failed on Windows."
}
```

`version` appears on versioned sites. `comment` is sent only with a written comment, in a second request after the first one that carried `helpful`.

To your endpoint, DocsLit sends a `POST` with `Content-Type: application/json`, without cookies, and ignores the response. The endpoint must allow cross-origin requests from your docs site.

## Analytics and events

When you configure no `url`, the widget is still useful if you use an analytics provider or listen for the event. On the Yes or No click, DocsLit calls whichever of these is present on the page:

| Provider | Call |
|---|---|
| Plausible | `plausible('Page Feedback', { props: { page, helpful } })` with `helpful` set to `yes` or `no` |
| Google Analytics 4 | `gtag('event', 'page_feedback', { page_path, helpful })` |
| PostHog | `posthog.capture('page_feedback', { page, helpful, version })` with a boolean `helpful` |
| Fathom | `fathom.trackEvent('page feedback yes: <page>')` |

The widget also fires a `docslit:feedback` event on `window` for every response and every comment. Its `detail` is the payload above. Use it to send data anywhere:

```js
window.addEventListener('docslit:feedback', (event) => {
  const { page, helpful, comment } = event.detail;
  console.log(page, helpful, comment);
});
```

Add the script with the [`head` option](site-chrome). The [analytics presets](site-chrome) in `docslit.json` load the provider scripts above.

<wc-callout type="warning" title="Without a destination, nothing is recorded">
With `feedback: true` and no `url`, no analytics provider and no listener, a reader's click is saved only in their own browser. Configure at least one destination before you turn the widget on.
</wc-callout>
