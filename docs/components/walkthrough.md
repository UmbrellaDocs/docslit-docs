---
title: Walkthrough
description: Explain code step by step with prose beside a sticky code panel that follows the reader's scroll, focusing or highlighting the lines each step is about.
tag: Components
readtime: 5 min read
---

# Walkthrough

A walkthrough pairs a column of explanation with a **sticky code panel**. As the reader scrolls through the steps, the panel switches to the file each step is about and focuses the lines it describes. It is the best way to explain a real program without breaking it into disconnected snippets.

<wc-walkthrough>
<wc-walkthrough-step title="Create the client" file="client.js" focus="1-3">

Import the SDK and construct a client with your API key. The rest of the file is dimmed while you read this step.

</wc-walkthrough-step>
<wc-walkthrough-step title="Send a request" file="client.js" highlight="5-8">

Call the API and wait for the result. These lines are highlighted instead of dimming the others.

<wc-walkthrough-substep title="Handle the response" focus="7-8">

A substep takes over the panel for a finer point, here the two lines that use the response.

</wc-walkthrough-substep>
</wc-walkthrough-step>
<wc-walkthrough-step title="Read the settings" file="config.json" focus="1-4">

Steps can point at other files. The panel switches to `config.json`.

</wc-walkthrough-step>

```js title="client.js"
import { Client } from "orbit-sdk";

const client = new Client({ key: process.env.ORBIT_KEY });

const events = await client.events.list({ limit: 10 });

for (const event of events.data) {
  console.log(event.title);
}
```

```json title="config.json"
{
  "region": "eu-west-1",
  "retries": 3,
  "timeout": 30
}
```

</wc-walkthrough>

## How to write one

Put `wc-walkthrough-step` elements first, one per idea, and then one fenced code block for each file. Give every fence a `title`, which is the name the steps refer to:

````markdown
<wc-walkthrough>
<wc-walkthrough-step title="Create the client" file="client.js" focus="1-3">

Import the SDK and construct a client.

</wc-walkthrough-step>
<wc-walkthrough-step title="Send a request" file="client.js" highlight="5-8">

Call the API and wait for the result.

</wc-walkthrough-step>

```js title="client.js"
import { Client } from "orbit-sdk";
// ...
```

</wc-walkthrough>
````

Each step names the file it targets and the lines to show:

- **`focus`** dims every other line, so the reader's eye goes to the lines it names.
- **`highlight`** keeps all lines at full strength and adds an accent background to the lines it names.
- **`file`** is a file title, or its zero-based index. When a step leaves it out, it keeps the previous step's file.
- **`start-line`** is the line the panel scrolls to. By default that is the first focused or highlighted line.

Line lists use the same syntax as [code blocks](code-blocks): a comma-separated mix of numbers and ranges, such as `1-5,8`.

A **substep** is a finer target inside a step. While it is in view it takes over the panel, with its own `file`, `focus`, `highlight` and `start-line`, and it inherits the step's file when it omits `file`.

## Layout and behavior

<wc-fields header="wc-walkthrough">
<wc-field name="layout" type="string" default="default">
The column split. `wide` gives the code panel more room.
</wc-field>
<wc-field name="panel-height" type="string" default="min(70vh, 34rem)">
The height of the code panel, as any CSS length.
</wc-field>
<wc-field name="dim" type="string" default="true">
Fade the steps that are not in view. Set `false` to keep them fully visible.
</wc-field>
</wc-fields>

<wc-fields header="wc-walkthrough-step">
<wc-field name="title" type="string">
The step heading. Inline Markdown works.
</wc-field>
<wc-field name="description" type="string">
A short summary under the title.
</wc-field>
<wc-field name="file" type="string">
The target file: a file title or its zero-based index.
</wc-field>
<wc-field name="focus" type="string">
Lines to focus, dimming the rest, such as `1-5,8`.
</wc-field>
<wc-field name="highlight" type="string">
Lines to highlight with an accent background, such as `3,5-6`.
</wc-field>
<wc-field name="start-line" type="string">
The line the panel scrolls to.
</wc-field>
</wc-fields>

<wc-fields header="wc-walkthrough-substep">
<wc-field name="title" type="string">
A short heading above the substep text.
</wc-field>
<wc-field name="file" type="string">
The target file. Defaults to the parent step's file.
</wc-field>
<wc-field name="focus" type="string">
Lines to focus, such as `1-5,8`.
</wc-field>
<wc-field name="highlight" type="string">
Lines to highlight.
</wc-field>
<wc-field name="start-line" type="string">
The line the panel scrolls to.
</wc-field>
</wc-fields>

On narrow screens there is no room for two columns, so each step shows its own code inline beneath the text. The panel respects reduced motion, and the prose reads fine without JavaScript, because the steps are ordinary page content.

<wc-callout type="tip" title="Keep walkthroughs focused">
Aim for three to seven steps over one or two short files. If a step needs more than a few lines of explanation, split it into a substep or its own page.
</wc-callout>

## From Fern

Fern's `ScrollWalkthrough` converts to this component. The importer maps its steps and substeps, and drops two options that have no equivalent, `stickyHeaders` and `substepStyle`. See [the component mapping](../migration/component-mapping).

## Next steps

- Show full files with [code blocks](code-blocks) and [code import](../writing-content/code-import)
- Explain a procedure with [steps](steps)
