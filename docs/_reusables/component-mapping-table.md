### Callouts

| Source | DocsLit result | Notes |
|---|---|---|
| Mintlify: `<Note>Text</Note>` | `<wc-callout type="note">` | No forced title: the icon identifies the type. |
| Mintlify: `<Info>Text</Info>` | `<wc-callout type="info">` |  |
| Mintlify: `<Tip>Text</Tip>` | `<wc-callout type="tip">` |  |
| Mintlify: `<Warning>Text</Warning>` | `<wc-callout type="warning">` |  |
| Mintlify: `<Check>Text</Check>` | `<wc-callout type="check">` |  |
| Mintlify: `<Danger>Text</Danger>` | `<wc-callout type="danger">` | Styled like an error. |
| Mintlify: `<Callout icon="rocket" color="#8b5cf6">Text</Callout>` | `<wc-callout icon="rocket" color="#8b5cf6">` | `color` tints the border, background, icon and title. |
| Fern: `<Success>Text</Success>` | `<wc-callout type="success">` |  |
| Fern: `<Error>Text</Error>` | `<wc-callout type="error">` |  |
| Fern: `<Launch>Text</Launch>` | `<wc-callout type="launch">` |  |
| Fern: `<Callout intent="tip" title="Heads up">Text</Callout>` | `<wc-callout type="tip" title="Heads up">` | `intent` becomes `type`. |

### Accordions, tabs and steps

| Source | DocsLit result | Notes |
|---|---|---|
| Mintlify: `<AccordionGroup>` | `<wc-accordion-group>` |  |
| Mintlify: `<Accordion title="FAQ" defaultOpen icon="circle-help" description="Short">` | `<wc-accordion title="FAQ" open description="Short" icon="circle-help">` | `defaultOpen` becomes `open`. A lone accordion gets a group. |
| Mintlify: `<Expandable title="Properties" defaultOpen>` | `<wc-expandable title="Properties" open>` |  |
| Mintlify: `<Steps titleSize="h3">` | `<wc-steps title-size="h3">` | Numbering is automatic. |
| Mintlify: `<Step title="One" icon="calendar" stepNumber={3} noAnchor>` | `<wc-step title="One" n="3" no-anchor icon="calendar">` | `stepNumber` becomes `n`, `noAnchor` becomes `no-anchor`. |
| Mintlify: `<Tabs>` | `<wc-tabs sync="mintlify">` | Mintlify syncs tabs by default, so `sync="mintlify"` is added. Pass `sync={false}` to opt out. |
| Mintlify: `<Tab title="npm" icon="box">` | `<wc-tab label="npm" icon="box">` | `title` becomes `label`. |
| Mintlify: `<View title="REST" icon="globe">` | `<wc-view-panel label="REST" icon="globe">` | Adjacent views become one `wc-view`. |
| Fern: `<Tab title="npm" language="bash">` | `<wc-tabs sync="fern-language">` | `language` becomes a synced group. |

### Cards, tiles and buttons

| Source | DocsLit result | Notes |
|---|---|---|
| Mintlify: `<CardGroup cols={3}>` | `<wc-tiles cols="3">` |  |
| Mintlify: `<Card title="Quick" icon="rocket" href="/start" horizontal color="#f00" cta="Go">Text</Card>` | `<wc-card title="Quick" href="/start" icon="rocket" icon-color="#f00" horizontal cta="Go">` | `color` becomes `icon-color`. |
| Fern: `<Card title="Quick" icon="fa-solid fa-rocket" iconSize={8} href="/start">Text</Card>` | `<wc-card title="Quick" href="/start" icon="fa-solid fa-rocket" icon-size="32">` | `iconSize` is multiplied by 4 to get pixels. |
| Mintlify: `<Tile href="/x" title="Preview" description="Text">` | `<wc-tile href="/x" title="Preview" description="Text">` |  |
| Fern: `<Button intent="primary" small href="/x" rightIcon="arrow-right">Go</Button>` | `<wc-button variant="primary" href="/x" right-icon="arrow-right" size="sm">Go</wc-button>` | `small` becomes `size="sm"`. |
| Mintlify: `<Columns cols={2}>` | `<wc-columns cols="2">` |  |

### Badges, tooltips and updates

| Source | DocsLit result | Notes |
|---|---|---|
| Mintlify: `<Badge color="green" shape="pill" stroke>New</Badge>` | `<wc-badge variant="success" shape="pill" outlined>New</wc-badge>` | `color` becomes `variant`; `stroke` becomes `outlined`. |
| Fern: `<Badge intent="success" minimal>New</Badge>` | `<wc-badge variant="success" minimal>New</wc-badge>` |  |
| Mintlify: `<Tooltip tip="Tip" headline="Head" cta="More" href="/x">text</Tooltip>` | `<wc-tooltip tip="Tip" headline="Head" cta="More" href="/x">text</wc-tooltip>` |  |
| Mintlify: `<Update label="2026-10-29" description="v1.2.0" tags={["Feature", "Fix"]}>` | `<wc-update label="2026-10-29" description="v1.2.0" tags="Feature, Fix">` | `tags` become a comma-separated string. |
| Mintlify: `<Icon icon="rocket" iconType="solid" size={20} color="#f60" />` | `<wc-icon name="rocket" icon-type="solid" color="#f60" size="20">` |  |
| Fern: `<Icon icon="fa-brands fa-github" size={4} />` | `<wc-icon name="fa-brands fa-github" size="16">` | `size` is multiplied by 4 to get pixels. |

### Layout and media

| Source | DocsLit result | Notes |
|---|---|---|
| Mintlify: `<Frame caption="Dashboard" hint="Click">` | `<wc-frame caption="Dashboard" hint="Click" border>` | Mintlify frames are bordered, so `border` is added. |
| Mintlify: `<Panel>` | `<wc-aside sticky>` | Right-rail content floats right. A warning asks you to check placement. |
| Fern: `<Aside>` | `<wc-aside sticky>` |  |
| Fern: `<Indent>` | `<wc-indent>` |  |
| Fern: `<Anchor id="data">Data</Anchor>` | `<wc-anchor id="data">Data</wc-anchor>` |  |
| Mintlify: `<iframe src="https://www.youtube.com/embed/4KzFe50RQkQ" title="Tour" className="aspect-video"></iframe>` | `<wc-embed src="https://www.youtube.com/embed/4KzFe50RQkQ" title="Tour" ratio="16/9">` |  |
| Mintlify: `<video src="/demo.mp4" controls autoPlay muted loop></video>` | `<wc-embed src="/demo.mp4" autoplay muted loop>` |  |
| Mintlify: `<GitHub.Repo repo="UmbrellaDocs/docslit-cli" variant="flat" />` | `<wc-github-repo repo="UmbrellaDocs/docslit-cli" variant="flat">` |  |
| Fern: `<Copy clipboard="npm i x">npm i x</Copy>` | `<wc-copy clipboard="npm i x">npm i x</wc-copy>` |  |
| Fern: `<Download src="/files/a.pdf" filename="a.pdf">Get the PDF</Download>` | `<wc-download href="/files/a.pdf" filename="a.pdf">Get the PDF</wc-download>` |  |

### Files, color and prompts

| Source | DocsLit result | Notes |
|---|---|---|
| Mintlify: `<Tree>` | `<wc-files>` |  |
| Mintlify: `<Tree.Folder name="src">` | `<wc-dir name="src" collapsed>` | A folder that is not `defaultOpen` becomes `collapsed`. |
| Fern: `<File name="index.js" highlighted comment="# entry" />` | `<wc-file name="index.js" highlight comment="entry">` | `highlighted` becomes `highlight`; a leading `#` is stripped from comments. |
| Mintlify: `<Color variant="table">` | `<wc-colors variant="table">` |  |
| Mintlify: `<Color.Item name="brand" value="#0ea5e9" />` | `<wc-color name="brand" value="#0ea5e9">` |  |
| Mintlify: `<Prompt description="Add auth" icon="sparkles" actions={["copy", "cursor"]}>` | `<wc-prompt description="Add auth" icon="sparkles" actions="cursor">` | `copy` is always present, so it is dropped from `actions`. |
| Fern: `<Prompt title="Ask" actions={["claude", "chatgpt"]} singleLine>` | `<wc-prompt title="Ask" single-line actions="claude, chatgpt">` |  |

### API fields and tables

| Source | DocsLit result | Notes |
|---|---|---|
| Mintlify: `<ParamField path="user_id" type="string" required>` | `<wc-field name="user_id" in="path" type="string" required>` | The location (`path`, `query`, `body`, `header`) becomes `in`. |
| Mintlify: `<ResponseField name="id" type="string">` | `<wc-field name="id" type="string">` |  |
| Fern: `<StickyTable>` | `<wc-table sticky>` |  |
| Fern: `<SearchableTable placeholder="Filter">` | `<wc-table searchable placeholder="Filter">` |  |

### Code

| Source | DocsLit result | Notes |
|---|---|---|
| Mintlify: `<CodeGroup dropdown>` | `<wc-code-group dropdown>` | Fences go straight inside; each title becomes a tab label. |
| Fern: `<CodeBlocks>` | `<wc-code-group>` |  |
| Fern: `<ScrollWalkthrough>` | `<wc-walkthrough>` | See [Walkthrough](../components/walkthrough). |
| Fern: `<Step title="One" file="a.js" focus="1">` | `<wc-walkthrough-step title="One" file="a.js" focus="1">` |  |

### Examples and runnable endpoints

| Source | DocsLit result | Notes |
|---|---|---|
| Mintlify: `<RequestExample>` | `<wc-code-group>` | Placed inline in the page, in order. |
| Fern: `<RunnableEndpoint endpoint="POST /users" />` | `<wc-callout type="info" title="Runnable endpoint">` | Becomes a pointer to the API reference page, plus a warning. |

### Conditional content and versions

| Source | DocsLit result | Notes |
|---|---|---|
| Mintlify: `<Visibility for="agents">` | `<wc-if for="agents">` | See [Conditional content](../components/conditional-content). |
| Fern: `<If versions={["v1"]}>` | `<wc-if version="v1">` |  |
| Fern: `<llms-only>` | `<wc-if for="agents">` |  |
| Fern: `<llms-ignore>` | `<wc-if for="humans">` |  |
| Fern: `<Versions>` | `<wc-versions>` |  |

### Snippets

| Source | DocsLit result | Notes |
|---|---|---|
| Mintlify: `<Status word="bananas" />` | `<wc-include src="status.md" word="bananas" />` | The snippet moves to `docs/_reusables/`, and `{word}` inside it becomes `{{word}}`. |
| Fern: `<Markdown src="/snippets/status.mdx" k="v" />` | `<wc-include src="status.md" k="v" />` |  |

### API snippets with no DocsLit equivalent

| Source | DocsLit result | Notes |
|---|---|---|
| Fern: `<EndpointRequestSnippet endpoint="POST /users" />` | `<wc-callout type="info" title="Request example: see the API reference">` | Replaced with a callout that points to the API reference, plus a warning. |
| Fern: `<Schema type="User" />` | `<wc-callout type="info" title="Schema: see the API reference">` | Replaced with a callout that points to the API reference, plus a warning. |
