---
title: Code blocks
description: Display syntax-highlighted code with copy buttons, filenames, line numbers, code groups, and theme toggles.
tag: Components
readtime: 5 min read
---

# Code blocks

DocsLit provides enhanced code blocks with syntax highlighting, filenames, copy buttons, tabbed groups, and editable variables.

## Basic code block

Use standard fenced code blocks with a language identifier:

````markdown
```javascript
const config = { name: "My Docs" };
```
````

```javascript
const config = { name: "My Docs" };
```

Every code block includes a copy button automatically.

## Syntax highlighting

DocsLit uses [Shiki](https://shiki.style) for build-time syntax highlighting. Code blocks are highlighted at parse time, so there is no client-side rendering cost. Shiki supports dual themes -- your code blocks automatically match the page's light or dark mode.

### Code theme toggle

Every code block and code group includes a kebab menu that lets readers switch all code blocks between light and dark mode. This setting is independent of the page theme and is saved to the browser for future visits.

You can also force a specific theme on any individual code block:

```markdown
<wc-code-block language="javascript" theme="dark">
const alwaysDark = true;
</wc-code-block>
```

## Fence options

Everything after the language in the opening fence is read as options. The same options exist as attributes on the `wc-code-block` element, so you can write whichever form you like.

| Fence | Attribute | Effect |
|---|---|---|
| `title="app.js"`, `filename="app.js"`, or bare words after the language | `filename` | Header title |
| `icon=code` | `icon` | Icon in the header (a [wc-icon](./icons) name) |
| `{1,3-5}` or `highlight={1,3-5}` | `highlight="1,3-5"` | Highlight lines |
| `focus=2,4-5` | `focus="2,4-5"` | Dim every other line |
| `lines` or `linenumbers="true"` | `linenumbers="true"` | Line numbers |
| `startLine={10}` | `start-line="10"` | First line number |
| `wrap` or `wordWrap` | `wrap` | Wrap long lines |
| `expandable` | `expandable` | Collapse long blocks behind "Show more" (10 lines) |
| `maxLines=5` | `max-lines="5"` | Collapse after N lines |
| `nocopy` | `nocopy` | Hide the copy button |
| `for="npm"` | `for="npm"` | Sync token inside a code group |

Mintlify and Fern spellings are accepted as they are, so content moved from those platforms keeps working.

### Title and icon

````markdown
```js title="utils/hello.js" icon=code
const hello = "world";
```
````

```js title="utils/hello.js" icon=code
const hello = "world";
```

A fence with only a language still shows a small header with the language name and the copy button. A fence with no language and no title gets a copy button that appears on hover.

### Line highlighting

Use braces or `highlight=`. Ranges and lists mix freely.

````markdown
```js {1,3-4}
const a = 1;
const b = 2;
const c = 3;
const d = 4;
const e = 5;
```
````

```js {1,3-4}
const a = 1;
const b = 2;
const c = 3;
const d = 4;
const e = 5;
```

### Focus

`focus` dims the other lines. Hovering or focusing the block brings them back, and touch devices keep the dimming.

````markdown
```js focus=2,3
const a = 1;
const b = 2;
const c = 3;
const d = 4;
```
````

```js focus=2,3
const a = 1;
const b = 2;
const c = 3;
const d = 4;
```

### Diff, highlight and focus comments

Add a comment at the end of a line to mark it. This is the Shiki notation, so the same markers work in code copied from Mintlify or Fern docs. The marker comment is removed from the display and from the copy button.

| Marker | Effect |
|---|---|
| `[!code ++]` | Added line (green, `+` in the gutter) |
| `[!code --]` | Removed line (red, minus in the gutter) |
| `[!code highlight]` | Highlighted line |
| `[!code focus]` | Focused line |
| `[!code error]`, `[!code warning]` | Error or warning line |
| `[!code ++:3]` | This line and the next two |

Use the comment syntax of the language (`//`, `#`, `--`, `/* */`, `<!-- -->`). A marker on a line of its own is removed and applies to the lines after it.

```text
const greeting = "Hello, World!"; // [!code ++]
function sayHello() {
  console.log("Hello, World!"); // [!code --]
  console.log(greeting); // [!code ++]
}
```

```js lines
const greeting = "Hello, World!"; // [!code ++]
function sayHello() {
  console.log("Hello, World!"); // [!code --]
  console.log(greeting); // [!code ++]
}
```

Languages without comments (`text`, `markdown`, `json`) are never scanned, so you can show the notation itself in a `text` block as above. The `diff` language is rendered as a diff too, and keeps its `+` and `-` signs when copied:

```diff
@@ -1,3 +1,3 @@
 const a = 1;
-const b = 2;
+const b = 3;
```

### Line numbers

````markdown
```ts lines startLine={8}
export function add(a: number, b: number) {
  return a + b;
}
```
````

```ts lines startLine={8}
export function add(a: number, b: number) {
  return a + b;
}
```

Numbers are drawn by CSS, so they are never selected or copied.

### Wrapping and collapsing

Long lines scroll horizontally by default; add `wrap` to wrap them. Long blocks can collapse behind a "Show more" button (a real button with `aria-expanded`):

````markdown
```js wrap lines maxLines=3
const message = "A very long line of text that wraps onto the next line instead of scrolling sideways.";
const a = 1;
const b = 2;
const c = 3;
const d = 4;
```
````

```js wrap lines maxLines=3
const message = "A very long line of text that wraps onto the next line instead of scrolling sideways.";
const a = 1;
const b = 2;
const c = 3;
const d = 4;
```

`expandable` alone collapses after 10 lines. Blocks shorter than the limit are never collapsed.

### Hide the copy button

```text nocopy title="No copy"
User --> CDN --> Origin
```

### What copying does

The copy button copies the code as written: no line numbers, no gutter signs, no `[!code ...]` markers, and `{{VARIABLES}}` replaced by their current values. In a `diff` block the `+` and `-` signs are part of the code and are kept.

### Importing code

Options combine with [code import](../writing-content/code-import). Fence options other than the import keys (`file`, `lines`, `region`) are passed through:

````markdown
```js file="examples/server.js" region="routes" title="routes" {2}
```
````

### Generated Markdown and llms.txt

The `.md` pages and `llms.txt` contain the code without presentation markers: `[!code highlight]`, `focus`, `error` and `warning` comments are removed, and a block that uses `[!code ++]` / `[!code --]` is written as a `diff` block with `+` and `-` prefixes.

### Twoslash

`twoslash` (interactive type hovers) is not supported. The flag is accepted and ignored, so the block renders as normal highlighted code.

## Code block with filename

Add a `filename` attribute to show a file header:

```markdown
<wc-code-block language="json" filename="docslit.json">
{
  "name": "My Docs",
  "sidebar": []
}
</wc-code-block>
```

<wc-code-block language="json" filename="docslit.json">
{
  "name": "My Docs",
  "sidebar": []
}
</wc-code-block>

Hand-written blocks are highlighted at build time just like fences, and support every option as an attribute:

<wc-code-block language="python" filename="greet.py" linenumbers="true" highlight="2">
def greet(name):
    print(f"Hello, {name}!")
</wc-code-block>

<wc-fields header="wc-code-block">
<wc-field name="language" type="string">
The syntax highlighting language. Examples: `javascript`, `python`, `bash`, `json`, `html`, `css`. Shown as a label in the header.
</wc-field>
<wc-field name="filename" type="string">
A filename or title displayed in the header bar above the code.
</wc-field>
<wc-field name="icon" type="string">
An icon name shown before the filename.
</wc-field>
<wc-field name="linenumbers" type="string">
`true` or `false`. Set to `true` to show line numbers.
</wc-field>
<wc-field name="start-line" type="number">
The number of the first line when line numbers are shown. Default `1`.
</wc-field>
<wc-field name="highlight" type="string">
Lines to highlight, for example `1,3-5`.
</wc-field>
<wc-field name="focus" type="string">
Lines to focus; the others are dimmed.
</wc-field>
<wc-field name="wrap" type="boolean">
Wrap long lines instead of scrolling.
</wc-field>
<wc-field name="expandable" type="boolean">
Collapse blocks longer than 10 lines behind a "Show more" button.
</wc-field>
<wc-field name="max-lines" type="number">
Collapse after this many lines (implies `expandable`).
</wc-field>
<wc-field name="nocopy" type="boolean">
Hide the copy button.
</wc-field>
<wc-field name="for" type="string">
Sync token inside a code group. See [Code groups](#code-groups).
</wc-field>
<wc-field name="theme" type="string">
`dark` or `light`. Pins the block to a color scheme.
</wc-field>
<wc-field name="highlighted" type="boolean">
Marks content that is already highlighted HTML. DocsLit sets this at build time; you rarely write it by hand.
</wc-field>
</wc-fields>

## Code groups

Group related code examples in tabs. The simplest form puts fences straight inside `wc-code-group`; each fence's title (or its language) becomes the tab label:

````markdown
<wc-code-group>

```javascript helloWorld.js
console.log("Hello World");
```

```python hello_world.py
print('Hello World!')
```

```java HelloWorld.java lines
class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

</wc-code-group>
````

<wc-code-group>

```javascript helloWorld.js
console.log("Hello World");
```

```python hello_world.py
print('Hello World!')
```

```java HelloWorld.java lines
class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

</wc-code-group>

Each fence keeps its own options (`lines`, `{2}`, `nocopy`, ...). You can also give the tab a label with `wc-code-tab`. Its content can be a fence, or plain text with a `language` attribute, which is highlighted at build time:

````markdown
<wc-code-group>
<wc-code-tab label="npm" language="bash">npm install docslit</wc-code-tab>
<wc-code-tab label="pnpm" language="bash">pnpm add docslit</wc-code-tab>
<wc-code-tab label="yarn" language="bash">yarn add docslit</wc-code-tab>
</wc-code-group>
````

<wc-code-group>
<wc-code-tab label="npm" language="bash">npm install docslit</wc-code-tab>
<wc-code-tab label="pnpm" language="bash">pnpm add docslit</wc-code-tab>
<wc-code-tab label="yarn" language="bash">yarn add docslit</wc-code-tab>
</wc-code-group>

### Dropdown

Add `dropdown` to replace the tab bar with a native select, handy for long language lists:

````markdown
<wc-code-group dropdown>

```javascript helloWorld.js
console.log("Hello World");
```

```python hello_world.py
print('Hello World!')
```

</wc-code-group>
````

<wc-code-group dropdown>

```javascript helloWorld.js
console.log("Hello World");
```

```python hello_world.py
print('Hello World!')
```

</wc-code-group>

### Synced groups

Code groups on the same page sync by default. When a reader picks Python in one group, every group that has a Python tab switches too, and the choice is remembered across pages. A tab matches by its `for` token, its label, or its language (`js` and `javascript` are the same language). Opening a page with `?language=python` preselects Python.

Use `for` when the tabs are not about a language, for example package managers. Tabs with the same `for` value switch together:

````markdown
<wc-code-group>

```bash title="Install using npm" for="npm"
npm install plantstore
```

```bash title="Install using pnpm" for="pnpm"
pnpm add plantstore
```

</wc-code-group>
````

Set `sync="my-key"` to keep a set of groups (and `wc-tabs` with the same key) separate from the rest, or `sync="off"` to opt out.

Tab bars follow the WAI-ARIA tabs pattern: Left and Right arrows, Home and End move between tabs.

<wc-fields header="wc-code-group">
<wc-field name="dropdown" type="boolean">
Show a language dropdown instead of tabs.
</wc-field>
<wc-field name="sync" type="string">
Sync key. Defaults to `code`; `off` disables syncing.
</wc-field>
<wc-field name="nocopy" type="boolean">
Hide the copy button for the whole group.
</wc-field>
</wc-fields>

<wc-fields header="wc-code-tab">
<wc-field name="label" type="string" required>
Tab label.
</wc-field>
<wc-field name="language" type="string">
Highlighting language for plain-text content; also used for language sync.
</wc-field>
<wc-field name="icon" type="string">
Icon shown in the tab.
</wc-field>
<wc-field name="for" type="string">
Sync token (read from the tab or from a fence inside it).
</wc-field>
</wc-fields>

## Editable variables

Use `wc-var` to create interactive variables that update across all code blocks on the page. Readers click the variable, type their value, and every `{{VAR_NAME}}` placeholder updates instantly.

Set your API key: <wc-var name="API_KEY" default="sk-your-api-key"></wc-var>

Set your base URL: <wc-var name="BASE_URL" default="https://api.example.com"></wc-var>

```bash
curl -H "Authorization: Bearer {{API_KEY}}" {{BASE_URL}}/v1/docs
```

```javascript
const client = new DocsClient({
  apiKey: "{{API_KEY}}",
  baseUrl: "{{BASE_URL}}"
});
```

Click the variable values above and type your own — watch both code blocks update in real time.

<wc-fields header="wc-var">
<wc-field name="name" type="string" required>
The variable name. Use `UPPER_SNAKE_CASE` by convention. Reference it in code blocks with `{{NAME}}`.
</wc-field>
<wc-field name="default" type="string">
The default value shown before the reader edits it.
</wc-field>
<wc-field name="value" type="string">
Compile-time form only: `<wc-var name="X" value="Y" />` declares a page-level variable. See [Variables and precedence](../writing-content/variables-and-precedence).
</wc-field>
<wc-field name="readonly" type="boolean">
Prevent the reader from editing the value.
</wc-field>
</wc-fields>

<wc-callout type="tip" title="Use variables in quickstart guides">
Editable variables make setup instructions personal. Instead of asking readers to "replace `YOUR_API_KEY`", give them a field to type it once and see it everywhere.
</wc-callout>

## Copy button on code groups

Code groups include a copy button that copies the active tab's code.

## Supported languages

DocsLit uses Shiki for syntax highlighting, which supports all common programming languages including JavaScript, TypeScript, Python, Go, Rust, Java, C, C++, Ruby, PHP, Shell/Bash, SQL, HTML, CSS, JSON, YAML, TOML, Markdown, and more.

## Variables and highlighting

Code blocks that contain `{{VAR}}` placeholders are fully highlighted. The placeholders become editable spans that update as readers change the variable, and copying uses the current values. In the rare case where a placeholder cannot be kept in one piece by the highlighter, the block falls back to plain text so substitution keeps working.
