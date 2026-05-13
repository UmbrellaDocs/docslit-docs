---
title: API reference components
tag: Components
readtime: 5 min read
---

# API reference components

DocsLit includes purpose-built components for documenting APIs — endpoints, parameters, response fields, and interactive API testers.

## Endpoints

Display an API endpoint with its HTTP method and URL:

```markdown
<wc-endpoint method="GET" url="/api/v1/users"></wc-endpoint>
<wc-endpoint method="POST" url="/api/v1/users"></wc-endpoint>
<wc-endpoint method="PUT" url="/api/v1/users/:id"></wc-endpoint>
<wc-endpoint method="DELETE" url="/api/v1/users/:id"></wc-endpoint>
```

<wc-endpoint method="GET" url="/api/v1/users"></wc-endpoint>
<wc-endpoint method="POST" url="/api/v1/users"></wc-endpoint>
<wc-endpoint method="PUT" url="/api/v1/users/:id"></wc-endpoint>
<wc-endpoint method="DELETE" url="/api/v1/users/:id"></wc-endpoint>

<wc-fields header="wc-endpoint attributes">
<wc-field name="method" type="string" required>
The HTTP method. Options: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`.
</wc-field>
<wc-field name="url" type="string" required>
The endpoint URL path.
</wc-field>
<wc-field name="ref" type="string">
An OpenAPI `operationId` to resolve against the loaded spec. When set, DocsLit automatically populates `method`, `url`, `summary`, `description`, parameters, request body, and response fields from the spec data.
</wc-field>
<wc-field name="summary" type="string">
A short one-line summary of what the endpoint does. Rendered in bold above the description.
</wc-field>
<wc-field name="description" type="string">
A longer description of the endpoint. Supports inline Markdown (bold, italic, code, links).
</wc-field>
<wc-field name="security" type="string">
JSON-encoded security requirements for the endpoint.
</wc-field>
</wc-fields>

### OpenAPI-driven endpoints

When you have an OpenAPI spec configured, use `ref` to pull all endpoint data from the spec automatically:

```markdown
<wc-endpoint ref="createUser">
</wc-endpoint>
```

DocsLit resolves the ref at build time and injects all parameters, request body fields, response schemas, and examples. See [OpenAPI integration](integrations/openapi) for setup details.

## Interactive API tester

Use `wc-runnable-endpoint` to create an interactive API tester where readers can edit the request and see live responses:

```markdown
<wc-runnable-endpoint method="GET" url="https://jsonplaceholder.typicode.com/posts/1">
</wc-runnable-endpoint>
```

<wc-runnable-endpoint method="GET" url="https://jsonplaceholder.typicode.com/posts/1">
</wc-runnable-endpoint>

<wc-callout type="info" title="Live requests">
The interactive API tester sends real HTTP requests from the reader's browser. Use it with public APIs or your own staging endpoints.
</wc-callout>

## Parameter fields

Document request parameters with `wc-fields` and `wc-field`. The `title` attribute controls the section header (defaults to "Parameter"):

<wc-fields header="wc-fields attributes">
<wc-field name="title" type="string" default="Parameter">
The section header text. When populated from an OpenAPI spec, this is set automatically to values like "Headers", "Query Parameters", or "Body application/json".
</wc-field>
</wc-fields>

```markdown
<wc-fields header="Request parameters">
<wc-field name="name" type="string" required>
The user's full name.
</wc-field>
<wc-field name="email" type="string" required>
A valid email address. Must be unique across all accounts.
</wc-field>
<wc-field name="role" type="string" default="viewer">
The user's role. Options: `admin`, `editor`, `viewer`.
</wc-field>
<wc-field name="notify" type="boolean" default="true">
Send a welcome email to the new user.
</wc-field>
</wc-fields>
```

<wc-fields header="Request parameters">
<wc-field name="name" type="string" required>
The user's full name.
</wc-field>
<wc-field name="email" type="string" required>
A valid email address. Must be unique across all accounts.
</wc-field>
<wc-field name="role" type="string" default="viewer">
The user's role. Options: `admin`, `editor`, `viewer`.
</wc-field>
<wc-field name="notify" type="boolean" default="true">
Send a welcome email to the new user.
</wc-field>
</wc-fields>

<wc-fields header="wc-field attributes">
<wc-field name="name" type="string" required>
The parameter name.
</wc-field>
<wc-field name="type" type="string">
The data type (e.g., `string`, `number`, `boolean`, `array`, `object`).
</wc-field>
<wc-field name="required" type="boolean">
Mark the field as required.
</wc-field>
<wc-field name="default" type="string">
The default value if the field is omitted.
</wc-field>
<wc-field name="deprecated" type="boolean">
Mark the field as deprecated.
</wc-field>
<wc-field name="in" type="string">
The parameter location. Options: `header`, `path`, `query`, `cookie`, `body`. Displayed as a badge next to the field name.
</wc-field>
<wc-field name="description" type="string">
A description of the field. Supports inline Markdown (bold, italic, code, links).
</wc-field>
<wc-field name="format" type="string">
The data format (e.g., `uuid`, `email`, `date-time`). Displayed alongside the type.
</wc-field>
<wc-field name="enum" type="string">
Comma-separated list of allowed values. Displayed as a constraint.
</wc-field>
<wc-field name="pattern" type="string">
A regex pattern the value must match.
</wc-field>
<wc-field name="minimum" type="string">
Minimum numeric value.
</wc-field>
<wc-field name="maximum" type="string">
Maximum numeric value.
</wc-field>
<wc-field name="minlength" type="string">
Minimum string length. Displayed as a character count constraint.
</wc-field>
<wc-field name="maxlength" type="string">
Maximum string length. Displayed as a character count constraint.
</wc-field>
<wc-field name="example" type="string">
An example value for the field.
</wc-field>
<wc-field name="collapsible" type="boolean">
When set, the field becomes a collapsible section. Nested `wc-field` children are hidden until the user expands it. Used automatically for nested object and array schemas from OpenAPI specs.
</wc-field>
</wc-fields>

## Response fields

Document response data with `wc-response-fields`:

```markdown
<wc-response-fields header="Response">
<wc-field name="id" type="number">
The unique identifier for the created user.
</wc-field>
<wc-field name="created_at" type="string">
ISO 8601 timestamp of when the user was created.
</wc-field>
<wc-field name="status" type="string">
The account status. Always `active` for new users.
</wc-field>
</wc-response-fields>
```

<wc-response-fields header="Response">
<wc-field name="id" type="number">
The unique identifier for the created user.
</wc-field>
<wc-field name="created_at" type="string">
ISO 8601 timestamp of when the user was created.
</wc-field>
<wc-field name="status" type="string">
The account status. Always `active` for new users.
</wc-field>
</wc-response-fields>

## Schema

Display type definitions with `wc-schema`:

```markdown
<wc-schema name="User" extends="BaseModel">
<wc-field name="id" type="number" required>
Unique identifier.
</wc-field>
<wc-field name="name" type="string" required>
The user's display name.
</wc-field>
<wc-field name="permissions" type="string[]">
List of permission slugs.
</wc-field>
</wc-schema>
```

<wc-schema name="User" extends="BaseModel">
<wc-field name="id" type="number" required>
Unique identifier.
</wc-field>
<wc-field name="name" type="string" required>
The user's display name.
</wc-field>
<wc-field name="permissions" type="string[]">
List of permission slugs.
</wc-field>
</wc-schema>

## Prompt component

Display AI prompts with a copy button:

```markdown
<wc-prompt>
You are a documentation assistant. Help users find the right page for their question. Be concise and link to specific sections.
</wc-prompt>
```

<wc-prompt>
You are a documentation assistant. Help users find the right page for their question. Be concise and link to specific sections.
</wc-prompt>
