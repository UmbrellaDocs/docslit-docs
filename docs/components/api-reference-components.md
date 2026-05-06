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

<wc-fields header="wc-endpoint">
<wc-field name="method" type="string" required>
The HTTP method. Options: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`.
</wc-field>
<wc-field name="url" type="string" required>
The endpoint URL path.
</wc-field>
</wc-fields>

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

Document request parameters with `wc-fields` and `wc-field`:

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
