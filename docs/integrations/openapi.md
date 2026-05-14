---
title: OpenAPI integration
tag: Integrations
readtime: 8 min read
description: Generate API reference documentation from an OpenAPI 3.x spec with automatic parameter extraction, response schemas, and sidebar hierarchy
---

# OpenAPI integration

DocsLit can generate full API reference documentation from an OpenAPI 3.x specification file. It extracts endpoints, parameters, request bodies, response schemas, and examples, then renders them using the built-in API components.

## Quick start

<wc-steps>
<wc-step title="Scaffold from your spec" n="1">

Run the `openapi scaffold` command with your OpenAPI spec file:

```bash
npx docslit openapi scaffold api-spec.yaml
```

This creates one Markdown page per endpoint in `docs/api/`, generates an `introduction.md` from the spec's `info` block, and updates `docslit.json` with the `openapi` config and sidebar structure.

</wc-step>
<wc-step title="Preview your docs" n="2">

Start the dev server to see the generated API reference:

```bash
npx docslit dev
```

The dev server loads the OpenAPI spec, resolves all `<wc-endpoint ref="...">` tags, and renders the full endpoint documentation with parameters, request bodies, and response schemas.

</wc-step>
<wc-step title="Build for production" n="3">

```bash
npx docslit build
```

The static build enriches all API pages with full spec data and generates Markdown files with complete endpoint documentation for AI agents.

</wc-step>
</wc-steps>

## Configuration

The scaffold command adds an `openapi` field to your `docslit.json`:

```json filename="docslit.json"
{
  "name": "My API",
  "openapi": "api-spec.yaml",
  "sidebar": [...]
}
```

If you use an overlay file, the config is an object:

```json filename="docslit.json"
{
  "openapi": {
    "spec": "api-spec.yaml",
    "overlay": "overlay.yaml"
  }
}
```

<wc-fields header="OpenAPI config options">
<wc-field name="openapi" type="string | object" required>
Path to your OpenAPI 3.x spec file (YAML or JSON). When using an overlay, pass an object with `spec` and `overlay` keys.
</wc-field>
<wc-field name="openapi.spec" type="string">
Path to the OpenAPI spec file.
</wc-field>
<wc-field name="openapi.overlay" type="string">
Path to an OpenAPI overlay file. Applied after the spec is bundled and dereferenced.
</wc-field>
</wc-fields>

## The scaffold command

```bash
npx docslit openapi scaffold <spec.yaml> [options]
```

<wc-fields header="Options">
<wc-field name="--overlay" type="string">
Path to an OpenAPI overlay file to apply on top of the spec.
</wc-field>
<wc-field name="--new-only" type="flag">
Only create pages for operations that are not already documented. Scans existing `docs/` files for `<wc-endpoint ref="...">` tags to detect what's already covered.
</wc-field>
</wc-fields>

### What gets generated

For each endpoint in the spec, the scaffold command creates a Markdown file in `docs/api/`:

```markdown filename="docs/api/create-user.md"
---
title: Create a user
description: Create a new user account
layout: api
---

# Create a user

<wc-endpoint ref="createUser">

</wc-endpoint>
```

The `ref` attribute links the component to the operation by its `operationId`. At build time (and in the dev server), DocsLit resolves this ref against the loaded spec and injects all endpoint data: method, URL, parameters, request body fields, response schemas, and examples.

### Introduction page

If the spec has an `info` block with a title, the scaffold command also generates an `introduction.md` page with the API title, version, contact details, license, and description.

### Sidebar structure

The scaffold command builds the sidebar from your spec's metadata:

- **`x-tagGroups`** create top-level sidebar groups
- **Tags** create sub-sections within groups
- **Operations** appear as individual pages with method badges

Each sidebar entry includes the operation's summary as the display title and an HTTP method badge (GET, POST, PUT, DELETE, PATCH) aligned to the right.

```json
{
  "sidebar": [
    {
      "group": "Authentication",
      "pages": [
        { "id": "api/issue-token", "title": "Get an access token", "method": "POST" }
      ]
    }
  ]
}
```

## How spec resolution works

When the dev server or build process encounters a `<wc-endpoint ref="operationId">` tag, it:

1. Loads and bundles the OpenAPI spec using Redocly, fully dereferencing all `$ref` pointers
2. Applies the overlay file if configured
3. Extracts all endpoints with their parameters, request bodies, and responses
4. Matches each `ref` attribute to an `operationId` in the spec
5. Injects the full endpoint data into the HTML as web component attributes and child elements

### What gets extracted

<wc-fields header="Extracted data">
<wc-field name="Path-level parameters" type="auto">
Parameters defined at the path level (e.g., shared headers like `X-Request-ID`) are merged into every operation on that path, following the OpenAPI specification rules. Operation-level parameters override path-level ones with the same name and location.
</wc-field>
<wc-field name="All content types" type="auto">
Request bodies are not limited to `application/json`. DocsLit picks the first content type with a schema, whether it's `application/x-www-form-urlencoded`, `multipart/form-data`, or any other type. The content type is displayed in the field group title.
</wc-field>
<wc-field name="Nested schemas" type="auto">
Object properties and array items are recursively walked up to 4 levels deep. Nested fields render as collapsible sections in the documentation.
</wc-field>
<wc-field name="Schema composition" type="auto">
`allOf`, `anyOf`, and `oneOf` schemas are resolved and merged into a flat structure so all properties display correctly.
</wc-field>
<wc-field name="Field constraints" type="auto">
`maxLength`, `minLength`, `minimum`, `maximum`, `pattern`, `enum`, `format`, `default`, `example`, and `deprecated` are all extracted and displayed as constraints on each field.
</wc-field>
<wc-field name="Response schemas" type="auto">
Response body schemas for success responses (2xx) are extracted and rendered as a separate "Response body" field group with the same nested/collapsible treatment as request fields.
</wc-field>
<wc-field name="Examples" type="auto">
Response and request body examples defined in the spec are rendered in the examples panel.
</wc-field>
<wc-field name="Security" type="auto">
Operation-level and global security requirements are passed through to the endpoint component.
</wc-field>
</wc-fields>

### Field grouping

Parameters are grouped by their location into separate sections:

- **Headers** — parameters with `in: header`
- **Path Parameters** — parameters with `in: path`
- **Query Parameters** — parameters with `in: query`
- **Cookie Parameters** — parameters with `in: cookie`
- **Body** — request body fields, with the content type shown in the title

Each group renders as its own `<wc-fields>` block with a descriptive title.

## The `layout: api` frontmatter

Pages with `layout: api` in their frontmatter get the API-specific three-column layout with a wider content area and an examples panel on the right. The scaffold command sets this automatically.

```yaml
---
title: Create a user
layout: api
---
```

## Markdown output for AI agents

API pages serve enriched Markdown instead of raw `<wc-endpoint ref="...">` tags. When an AI agent requests a page via `Accept: text/markdown` or fetches the `.md` file directly, it receives fully rendered documentation with parameter tables, request body field trees, response schemas, and code examples.

This works in both the dev server and static builds. Non-API pages serve their original Markdown source as before.

## Overlays

OpenAPI overlays let you customize the spec without modifying the original file. This is useful when you're working with an auto-generated spec and want to add descriptions, examples, or custom extensions.

```yaml filename="overlay.yaml"
overlay: 1.0.0
info:
  title: Documentation overlay
actions:
  - target: $.paths['/users'].post.description
    update: Create a new user account with the specified details.
  - target: $.paths['/users'].post.x-docslit-examples
    update:
      - label: cURL
        lang: bash
        code: |
          curl -X POST https://api.example.com/users \
            -H "Content-Type: application/json" \
            -d '{"name": "Alice"}'
```

## Custom code examples

Add code examples to any endpoint using the `x-docslit-examples` extension in your spec or overlay:

```yaml
paths:
  /users:
    post:
      x-docslit-examples:
        - label: cURL
          lang: bash
          code: |
            curl -X POST https://api.example.com/users \
              -H "Content-Type: application/json" \
              -d '{"name": "Alice"}'
        - label: Python
          lang: python
          code: |
            import requests
            resp = requests.post("https://api.example.com/users",
                                 json={"name": "Alice"})
```

These examples appear as tabbed code blocks in the examples panel alongside any spec-defined request/response examples.

## Next steps

- Learn about the [API reference components](../components/api-reference-components) used to render endpoint documentation
- Set up [AI agent discovery](../writing-content/search-and-seo) for your API docs
- Deploy your API reference with [static hosting](../deployment/static-hosting)
