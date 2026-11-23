#!/usr/bin/env node
// Regenerates docs/_reusables/component-mapping-table.md by running REAL conversions through the
// importer (the same code behind `docslit import` and the MCP `convert_mdx` tool), so the table shows
// what the CLI version you have actually produces.
//
//   DOCSLIT_CLI_DIR=/path/to/docslit-cli node scripts/gen-component-mapping.mjs
//   (or, with docslit installed from npm: node scripts/gen-component-mapping.mjs)
//
// Each sample is [platform, MDX source, wc-tag to show, note]. The source column shows the
// opening tag of the sample, the DocsLit column shows the opening tag the importer wrote.
import { writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { pathToFileURL, fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
let importerUrl;
if (process.env.DOCSLIT_CLI_DIR) importerUrl = pathToFileURL(path.join(process.env.DOCSLIT_CLI_DIR, 'src/import.js')).href;
else importerUrl = pathToFileURL(createRequire(path.join(root, 'package.json')).resolve('docslit/src/import.js')).href;
const { convertMdxSource } = await import(importerUrl);

const CALLOUT_NOTE = 'No forced title: the icon identifies the type.';
const SAMPLES = {
  Callouts: [
    ['mintlify', '<Note>Text</Note>', 'wc-callout', CALLOUT_NOTE],
    ['mintlify', '<Info>Text</Info>', 'wc-callout'],
    ['mintlify', '<Tip>Text</Tip>', 'wc-callout'],
    ['mintlify', '<Warning>Text</Warning>', 'wc-callout'],
    ['mintlify', '<Check>Text</Check>', 'wc-callout'],
    ['mintlify', '<Danger>Text</Danger>', 'wc-callout', 'Styled like an error.'],
    ['mintlify', '<Callout icon="rocket" color="#8b5cf6">Text</Callout>', 'wc-callout', '`color` tints the border, background, icon and title.'],
    ['fern', '<Success>Text</Success>', 'wc-callout'],
    ['fern', '<Error>Text</Error>', 'wc-callout'],
    ['fern', '<Launch>Text</Launch>', 'wc-callout'],
    ['fern', '<Callout intent="tip" title="Heads up">Text</Callout>', 'wc-callout', '`intent` becomes `type`.'],
  ],
  'Accordions, tabs and steps': [
    ['mintlify', '<AccordionGroup>\n<Accordion title="FAQ">\nText\n</Accordion>\n</AccordionGroup>', 'wc-accordion-group'],
    ['mintlify', '<Accordion title="FAQ" defaultOpen icon="circle-help" description="Short">\nText\n</Accordion>', 'wc-accordion', '`defaultOpen` becomes `open`. A lone accordion gets a group.'],
    ['mintlify', '<Expandable title="Properties" defaultOpen>\nText\n</Expandable>', 'wc-expandable'],
    ['mintlify', '<Steps titleSize="h3">\n<Step title="One">\nText\n</Step>\n</Steps>', 'wc-steps', 'Numbering is automatic.'],
    ['mintlify', '<Steps>\n<Step title="One" icon="calendar" stepNumber={3} noAnchor>\nText\n</Step>\n</Steps>', 'wc-step', '`stepNumber` becomes `n`, `noAnchor` becomes `no-anchor`.', '<Step title="One" icon="calendar" stepNumber={3} noAnchor>'],
    ['mintlify', '<Tabs>\n<Tab title="npm" icon="box">\nText\n</Tab>\n</Tabs>', 'wc-tabs', 'Mintlify syncs tabs by default, so `sync="mintlify"` is added. Pass `sync={false}` to opt out.', '<Tabs>'],
    ['mintlify', '<Tabs>\n<Tab title="npm" icon="box">\nText\n</Tab>\n</Tabs>', 'wc-tab', '`title` becomes `label`.', '<Tab title="npm" icon="box">'],
    ['mintlify', '<View title="REST" icon="globe">\nText\n</View>', 'wc-view-panel', 'Adjacent views become one `wc-view`.'],
    ['fern', '<Tabs>\n<Tab title="npm" language="bash">\nText\n</Tab>\n</Tabs>', 'wc-tabs', '`language` becomes a synced group.', '<Tab title="npm" language="bash">'],
  ],
  'Cards, tiles and buttons': [
    ['mintlify', '<CardGroup cols={3}>\n<Card title="A">\nText\n</Card>\n</CardGroup>', 'wc-tiles'],
    ['mintlify', '<Card title="Quick" icon="rocket" href="/start" horizontal color="#f00" cta="Go">Text</Card>', 'wc-card', '`color` becomes `icon-color`.'],
    ['fern', '<Card title="Quick" icon="fa-solid fa-rocket" iconSize={8} href="/start">Text</Card>', 'wc-card', '`iconSize` is multiplied by 4 to get pixels.'],
    ['mintlify', '<Tile href="/x" title="Preview" description="Text">\n<img src="/a.png" alt="A" />\n</Tile>', 'wc-tile'],
    ['fern', '<Button intent="primary" small href="/x" rightIcon="arrow-right">Go</Button>', 'wc-button', '`small` becomes `size="sm"`.'],
    ['mintlify', '<Columns cols={2}>\n<Column>One</Column>\n<Column>Two</Column>\n</Columns>', 'wc-columns'],
  ],
  'Badges, tooltips and updates': [
    ['mintlify', '<Badge color="green" shape="pill" stroke>New</Badge>', 'wc-badge', '`color` becomes `variant`; `stroke` becomes `outlined`.'],
    ['fern', '<Badge intent="success" minimal>New</Badge>', 'wc-badge'],
    ['mintlify', '<Tooltip tip="Tip" headline="Head" cta="More" href="/x">text</Tooltip>', 'wc-tooltip'],
    ['mintlify', '<Update label="2026-10-29" description="v1.2.0" tags={["Feature", "Fix"]}>\nText\n</Update>', 'wc-update', '`tags` become a comma-separated string.'],
    ['mintlify', '<Icon icon="rocket" iconType="solid" size={20} color="#f60" />', 'wc-icon'],
    ['fern', '<Icon icon="fa-brands fa-github" size={4} />', 'wc-icon', '`size` is multiplied by 4 to get pixels.'],
  ],
  'Layout and media': [
    ['mintlify', '<Frame caption="Dashboard" hint="Click">\n<img src="/a.png" alt="A" />\n</Frame>', 'wc-frame', 'Mintlify frames are bordered, so `border` is added.'],
    ['mintlify', '<Panel>\nText\n</Panel>', 'wc-aside', 'Right-rail content floats right. A warning asks you to check placement.'],
    ['fern', '<Aside>\nText\n</Aside>', 'wc-aside'],
    ['fern', '<Indent>\nText\n</Indent>', 'wc-indent'],
    ['fern', '<Anchor id="data">Data</Anchor>', 'wc-anchor'],
    ['mintlify', '<iframe src="https://www.youtube.com/embed/4KzFe50RQkQ" title="Tour" className="aspect-video"></iframe>', 'wc-embed'],
    ['mintlify', '<video src="/demo.mp4" controls autoPlay muted loop></video>', 'wc-embed'],
    ['mintlify', '<GitHub.Repo repo="UmbrellaDocs/docslit-cli" variant="flat" />', 'wc-github-repo'],
    ['fern', '<Copy clipboard="npm i x">npm i x</Copy>', 'wc-copy'],
    ['fern', '<Download src="/files/a.pdf" filename="a.pdf">Get the PDF</Download>', 'wc-download'],
  ],
  'Files, color and prompts': [
    ['mintlify', '<Tree>\n<Tree.Folder name="src" defaultOpen>\n<Tree.File name="index.js" highlight />\n</Tree.Folder>\n</Tree>', 'wc-files'],
    ['mintlify', '<Tree>\n<Tree.Folder name="src">\n<Tree.File name="index.js" highlight />\n</Tree.Folder>\n</Tree>', 'wc-dir', 'A folder that is not `defaultOpen` becomes `collapsed`.', '<Tree.Folder name="src">'],
    ['fern', '<Files>\n<Folder name="src" defaultOpen>\n<File name="index.js" highlighted comment="# entry" />\n</Folder>\n</Files>', 'wc-file', '`highlighted` becomes `highlight`; a leading `#` is stripped from comments.', '<File name="index.js" highlighted comment="# entry" />'],
    ['mintlify', '<Color variant="table">\n<Color.Row title="Brand">\n<Color.Item name="brand" value="#0ea5e9" />\n</Color.Row>\n</Color>', 'wc-colors'],
    ['mintlify', '<Color variant="table">\n<Color.Row title="Brand">\n<Color.Item name="brand" value="#0ea5e9" />\n</Color.Row>\n</Color>', 'wc-color', '', '<Color.Item name="brand" value="#0ea5e9" />'],
    ['mintlify', '<Prompt description="Add auth" icon="sparkles" actions={["copy", "cursor"]}>\nText\n</Prompt>', 'wc-prompt', '`copy` is always present, so it is dropped from `actions`.'],
    ['fern', '<Prompt title="Ask" actions={["claude", "chatgpt"]} singleLine>\nText\n</Prompt>', 'wc-prompt'],
  ],
  'API fields and tables': [
    ['mintlify', '<ParamField path="user_id" type="string" required>\nText\n</ParamField>', 'wc-field', 'The location (`path`, `query`, `body`, `header`) becomes `in`.'],
    ['mintlify', '<ResponseField name="id" type="string">\nText\n</ResponseField>', 'wc-field'],
    ['fern', '<StickyTable>\n\n| A | B |\n|---|---|\n| 1 | 2 |\n\n</StickyTable>', 'wc-table'],
    ['fern', '<SearchableTable placeholder="Filter">\n\n| A | B |\n|---|---|\n| 1 | 2 |\n\n</SearchableTable>', 'wc-table'],
  ],
  'Code': [
    ['mintlify', '<CodeGroup dropdown>\n\n```js JavaScript\nlet a = 1;\n```\n\n```python Python\na = 1\n```\n\n</CodeGroup>', 'wc-code-group', 'Fences go straight inside; each title becomes a tab label.'],
    ['fern', '<CodeBlocks>\n\n```js\nlet a = 1;\n```\n\n</CodeBlocks>', 'wc-code-group'],
    ['fern', '<ScrollWalkthrough>\n<Step title="One" file="a.js" focus="1">\nText\n</Step>\n</ScrollWalkthrough>\n\n```js title="a.js"\nlet a = 1;\n```', 'wc-walkthrough', 'See [Walkthrough](../components/walkthrough).'],
    ['fern', '<ScrollWalkthrough>\n<Step title="One" file="a.js" focus="1">\nText\n</Step>\n</ScrollWalkthrough>\n\n```js title="a.js"\nlet a = 1;\n```', 'wc-walkthrough-step', '', '<Step title="One" file="a.js" focus="1">'],
  ],
  'Examples and runnable endpoints': [
    ['mintlify', '<RequestExample>\n\n```bash\ncurl https://api.example.com/users\n```\n\n</RequestExample>', 'wc-code-group', 'Placed inline in the page, in order.'],
    ['fern', '<RunnableEndpoint endpoint="POST /users" />', 'wc-callout', 'Becomes a pointer to the API reference page, plus a warning.'],
  ],
  'Conditional content and versions': [
    ['mintlify', '<Visibility for="agents">\nText\n</Visibility>', 'wc-if', 'See [Conditional content](../components/conditional-content).'],
    ['fern', '<If versions={["v1"]}>\nText\n</If>', 'wc-if'],
    ['fern', '<llms-only>\nText\n</llms-only>', 'wc-if'],
    ['fern', '<llms-ignore>\nText\n</llms-ignore>', 'wc-if'],
    ['fern', '<Versions>\n<Version version="v2" title="2.0">\nText\n</Version>\n</Versions>', 'wc-versions'],
  ],
  'Snippets': [
    ['mintlify', 'import Status from "/snippets/status.mdx";\n\n<Status word="bananas" />', 'wc-include', 'The snippet moves to `docs/_reusables/`, and `{word}` inside it becomes `{{word}}`.', '<Status word="bananas" />'],
    ['fern', '<Markdown src="/snippets/status.mdx" k="v" />', 'wc-include'],
  ],
  'API snippets with no DocsLit equivalent': [
    ['fern', '<EndpointRequestSnippet endpoint="POST /users" />', 'wc-callout', 'Replaced with a callout that points to the API reference, plus a warning.'],
    ['fern', '<Schema type="User" />', 'wc-callout', 'Replaced with a callout that points to the API reference, plus a warning.'],
  ],
};

const openingLine = (text) => {
  const first = String(text).trim().split('\n')[0];
  return first.trim();
};
const esc = (s) => String(s).replace(/\|/g, '\\|');

function openingTag(body, tag) {
  const re = new RegExp(`<${tag.replace('.', '\\.')}(\\s[^>]*)?>`);
  const m = re.exec(body);
  if (!m) return null;
  const full = m[0];
  // Inline components keep their text; show the whole element when it is one line.
  const line = body.split('\n').find((l) => l.includes(full)) || full;
  return /^<wc-[a-z-]+[^>]*>[^<]+<\/wc-[a-z-]+>$/.test(line.trim()) && line.length < 150 ? line.trim() : full;
}

let md = '';
let rows = 0;
for (const [group, samples] of Object.entries(SAMPLES)) {
  md += `### ${group}\n\n| Source | DocsLit result | Notes |\n|---|---|---|\n`;
  for (const [from, src, showTag, note = '', srcOverride] of samples) {
    const r = await convertMdxSource(src, { from });
    const shown = openingTag(r.body, showTag);
    if (!shown) throw new Error(`Sample did not produce <${showTag}>:\n${src}\n---\n${r.body}`);
    const srcTag = srcOverride || openingLine(src);
    const platform = from === 'mintlify' ? 'Mintlify' : 'Fern';
    const srcShown = srcTag.length > 110 ? srcTag.slice(0, srcTag.indexOf('>') + 1) : srcTag;
    md += `| ${platform}: \`${esc(srcShown)}\` | \`${esc(shown)}\` | ${esc(note)} |\n`;
    rows++;
  }
  md += '\n';
}
writeFileSync(path.join(root, 'docs/_reusables/component-mapping-table.md'), md.trimEnd() + '\n');
console.log(`Wrote ${rows} conversions to docs/_reusables/component-mapping-table.md`);
