---
title: DocsLit Cloud
tag: Deployment
readtime: 3 min read
---

# DocsLit Cloud

DocsLit Cloud is a managed hosting service for your documentation. Build and deploy with a single command — no hosting configuration, no CI/CD setup, no infrastructure management.

## Get started

<wc-steps>
<wc-step title="Log in">

```bash
npx docslit login
```

This opens your browser to authenticate. Your token is stored securely at `~/.docslit/config.json`.

</wc-step>
<wc-step title="Publish">

```bash
npx docslit publish
```

DocsLit builds your site, compresses it, and uploads it to the cloud. Your docs are live in seconds.

</wc-step>
</wc-steps>

## Commands

<wc-fields header="Cloud commands">
<wc-field name="login" type="command">
Authenticate with DocsLit Cloud. Opens a browser window for OAuth sign-in.
</wc-field>
<wc-field name="publish" type="command">
Build and deploy your documentation. Runs `build` internally, then uploads the result.
</wc-field>
<wc-field name="projects" type="command">
List all your published documentation projects.
</wc-field>
<wc-field name="whoami" type="command">
Display the currently authenticated user.
</wc-field>
<wc-field name="rollback &lt;slug&gt;" type="command">
Restore the previous deployment for a project.
</wc-field>
<wc-field name="delete &lt;slug&gt;" type="command">
Remove a published project from DocsLit Cloud.
</wc-field>
</wc-fields>

## How it works

When you run `docslit publish`:

1. DocsLit runs a full `build` of your site
2. The `dist/` directory is compressed using fflate
3. The compressed archive is uploaded to the DocsLit Cloud API
4. Your site is live at your project URL

<wc-callout type="info" title="Security">
Auth tokens are stored at `~/.docslit/config.json` with file permissions set to `0o600` (owner read/write only). Tokens are never stored in your project directory or committed to git.
</wc-callout>

## When to use cloud vs self-hosting

| Feature | DocsLit Cloud | Self-hosting |
|---|---|---|
| Setup time | Instant | Varies |
| CI/CD required | No | Yes |
| Custom domain | Coming soon | Yes |
| Rollback | Built-in | Manual |
| Cost | Managed pricing | Your hosting cost |

For self-hosting options, see [static hosting](static-hosting).
