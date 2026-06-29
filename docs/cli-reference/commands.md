---
title: Commands
description: Complete reference for all DocsLit CLI commands including dev, build, init, import, publish, and validate.
tag: CLI reference
readtime: 5 min read
---

# Commands

DocsLit provides a set of CLI commands for creating, developing, building, and deploying documentation sites.

## Usage

```bash
docslit <command> [options]
```

Or if installed globally:

```bash
docslit <command> [options]
```

## Global options

<wc-fields header="Global options">
<wc-field name="--help, -h" type="flag">
Display help information for any command.
</wc-field>
<wc-field name="--version, -v" type="flag">
Print the DocsLit version number.
</wc-field>
</wc-fields>

## init

Scaffold a new documentation project with starter pages and configuration.

<wc-endpoint method="GET" url="docslit init [directory]"></wc-endpoint>

```bash
docslit init my-docs
```

Creates a project directory with `docslit.json`, three starter pages in `docs/`, and a `components/` directory.

<wc-fields header="Arguments">
<wc-field name="directory" type="string" default="my-docs">
The directory name for the new project.
</wc-field>
</wc-fields>

## dev

Start a development server with hot reload.

<wc-endpoint method="GET" url="docslit dev"></wc-endpoint>

```bash
docslit dev
docslit dev --port 4000
```

The server watches `docs/`, `components/`, `docslit.json`, and your brand theme file (if configured) for changes. The browser reloads automatically via WebSocket when any file is saved.

<wc-fields header="Options">
<wc-field name="--port" type="number" default="3000">
The port number for the dev server.
</wc-field>
</wc-fields>

## build

Generate a static site for deployment.

<wc-endpoint method="GET" url="docslit build"></wc-endpoint>

```bash
docslit build
docslit build --offline
docslit build --out public
docslit build --pdf
```

Produces HTML pages, search index, sitemap, and AI discovery files in the output directory. With `--pdf`, also generates chapter, page, and full documentation PDFs in `dist/pdf/`. See [Chapter PDF export](../deployment/chapter-pdf-export).

<wc-fields header="Options">
<wc-field name="--out" type="string" default="dist">
The output directory for the built site.
</wc-field>
<wc-field name="--offline" type="flag">
Build a self-contained offline site with lazy-loaded pages. No server needed — works from `file://` URLs.
</wc-field>
<wc-field name="--pdf" type="flag">
Generate chapter, page, and full documentation PDFs. Requires Playwright (`npm install -D playwright` and `npx playwright install chromium`).
</wc-field>
<wc-field name="--no-pdf" type="flag">
Skip PDF generation even when `pdf.enabled` is `true` in `docslit.json`.
</wc-field>
<wc-field name="--pdf-dir" type="string" default="pdf">
PDF output directory inside `--out`. Overrides `pdf.outputDir` in config.
</wc-field>
</wc-fields>

## validate

Check your project for errors and warnings.

<wc-endpoint method="GET" url="docslit validate [directory]"></wc-endpoint>

```bash
docslit validate
docslit validate --strict
```

See [validation](validation) for details on what gets checked.

<wc-fields header="Options">
<wc-field name="--strict" type="flag">
Treat warnings as errors. Exits with code 1 if any warnings are found.
</wc-field>
</wc-fields>

## import

Migrate documentation from another platform.

<wc-endpoint method="GET" url="docslit import <source-dir>"></wc-endpoint>

```bash
docslit import ./my-mintlify-docs
docslit import ./my-fern-docs --out converted
docslit import ./my-gitbook --dry-run
```

Automatically detects the source platform (Mintlify, Fern, GitBook, or generic Markdown).

<wc-fields header="Options">
<wc-field name="--out" type="string">
Custom output directory. Defaults to `{source-dir}-docslit`.
</wc-field>
<wc-field name="--dry-run" type="flag">
Scan and report without writing any files.
</wc-field>
</wc-fields>

## theme

Manage color presets and corporate brand themes.

<wc-endpoint method="GET" url="docslit theme init [file]"></wc-endpoint>

```bash
docslit theme init
docslit theme init themes/acme.json
docslit theme list
```

`theme init` scaffolds a `brand-theme.json` file with starter brand colors and fonts, and wires it into `docslit.json` when no theme is set. `theme list` prints built-in presets and overridable theme variables.

See [Theming](../customization/theming) for the full guide.

## openapi scaffold

Generate API reference pages from an OpenAPI 3.x specification.

<wc-endpoint method="GET" url="docslit openapi scaffold <spec.yaml>"></wc-endpoint>

```bash
docslit openapi scaffold api-spec.yaml
docslit openapi scaffold api-spec.yaml --overlay overlay.yaml
docslit openapi scaffold api-spec.yaml --new-only
```

Creates a Markdown page per endpoint in `docs/api/`, an `introduction.md` from the spec's `info` block, and updates `docslit.json` with the OpenAPI config and sidebar structure. Tags and `x-tagGroups` in the spec are used to build sidebar hierarchy with method badges.

<wc-fields header="Options">
<wc-field name="--overlay" type="string">
Path to an OpenAPI overlay file to apply on top of the spec.
</wc-field>
<wc-field name="--new-only" type="flag">
Only create pages for operations not already documented. Scans existing files for `wc-endpoint ref` tags.
</wc-field>
</wc-fields>

See [OpenAPI integration](../integrations/openapi) for the full guide.

## Cloud commands

These commands require authentication. Run `docslit login` first.

<wc-fields header="Cloud commands">
<wc-field name="login" type="command">
Authenticate with DocsLit Cloud via browser OAuth.
</wc-field>
<wc-field name="publish" type="command">
Build and deploy your site to DocsLit Cloud.
</wc-field>
<wc-field name="projects" type="command">
List all published documentation projects.
</wc-field>
<wc-field name="whoami" type="command">
Display the authenticated user.
</wc-field>
<wc-field name="rollback <slug>" type="command">
Restore the previous deployment for a project.
</wc-field>
<wc-field name="delete <slug>" type="command">
Remove a project from DocsLit Cloud.
</wc-field>
</wc-fields>

See [DocsLit Cloud](../deployment/docslit-cloud) for details.
