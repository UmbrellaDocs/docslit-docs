---
title: Code blocks
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

### Fenced code block filename

You can add a filename directly in the fenced code block info string:

````markdown
```javascript filename="config.js"
export default { name: "My Docs" };
```
````

This is equivalent to using the `filename` attribute on `wc-code-block`.

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

<wc-fields header="wc-code-block">
<wc-field name="language" type="string">
The syntax highlighting language. Examples: `javascript`, `python`, `bash`, `json`, `html`, `css`.
</wc-field>
<wc-field name="filename" type="string">
A filename displayed in the header bar above the code.
</wc-field>
</wc-fields>

## Code block with line numbers
Add the `linenumbers` attribute to show line numbers alongside the code:

```markdown
<wc-code-block language="python" linenumbers="true">
def greet(name):
    print(f"Hello, {name}!")
</wc-code-block>
```
<wc-code-block language="python" linenumbers="true">
def greet(name):
    print(f"Hello, {name}!")
</wc-code-block>

## Code groups

Group related code examples in tabs using `wc-code-group` and `wc-code-tab`:

```markdown
<wc-code-group>
<wc-code-tab label="JavaScript">

\```javascript
console.log("Hello from JS");
\```

</wc-code-tab>
<wc-code-tab label="Python">

\```python
print("Hello from Python")
\```

</wc-code-tab>
<wc-code-tab label="Go">

\```go
fmt.Println("Hello from Go")
\```

</wc-code-tab>
</wc-code-group>
```

<wc-code-group>
<wc-code-tab label="JavaScript">

```javascript
console.log("Hello from JS");
```

</wc-code-tab>
<wc-code-tab label="Python">

```python
print("Hello from Python")
```

</wc-code-tab>
<wc-code-tab label="Go">

```go
fmt.Println("Hello from Go")
```

</wc-code-tab>
</wc-code-group>

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
<wc-field name="default" type="string" required>
The default value shown before the reader edits it.
</wc-field>
</wc-fields>

<wc-callout type="tip" title="Use variables in quickstart guides">
Editable variables make setup instructions personal. Instead of asking readers to "replace `YOUR_API_KEY`", give them a field to type it once and see it everywhere.
</wc-callout>

## Copy button on code groups

Code groups include a copy button that copies the active tab's content. Readers can copy code from any tab without selecting text manually.

## Supported languages

DocsLit uses Shiki for syntax highlighting, which supports all common programming languages including JavaScript, TypeScript, Python, Go, Rust, Java, C, C++, Ruby, PHP, Shell/Bash, SQL, HTML, CSS, JSON, YAML, TOML, Markdown, and more.

<wc-callout type="info" title="Variables and highlighting">
Code blocks containing `{{VAR}}` variable placeholders use plain text highlighting so that interactive variable substitution continues to work. Blocks without variables get full Shiki highlighting.
</wc-callout>
