# DocsLit Documentation

This repository contains the documentation site for [DocsLit](https://github.com/UmbrellaDocs/docslit-cli), an open-source documentation platform built for the web and AI agents. Write pages in Markdown, add interactive `<wc-*>` web components, and publish a self-hosted site that is straightforward for both people and agents to read.

DocsLit helps agents author accurate documentation with discoverable component references and machine-readable validation and lint results. Built sites include agent-friendly page content and search data; DocsLit Cloud also provides a hosted MCP endpoint.

## Getting started

Preview this documentation site locally:

```bash
npx docslit dev
```

Open `http://localhost:3000` to view the site. To create a separate DocsLit project instead:

```bash
npx docslit init my-docs
cd my-docs
npx docslit dev
```

## Documentation

The guides cover getting started, writing content, components, themes and site customization, deployment, migrations, integrations, and the CLI. AI-agent guides explain how to connect to DocsLit’s MCP server and use its authoring tools.

## Project structure

```
docs/               Markdown source files
  getting-started/  Installation, quickstart, and project structure
  writing-content/  Markdown, frontmatter, navigation, and SEO
  components/       Built-in web components with live examples
  customization/    Themes, palettes, tokens, tabs, layout, and site chrome
  deployment/       Static hosting, offline builds, and DocsLit Cloud
  migration/        Migration guides, import reference, and component mapping
  cli-reference/    CLI commands and validation
  changelog/        Release notes
docs/_reusables/    Reusable and generated reference snippets
scripts/            Generators for reference tables
docslit.json        Site configuration, including sidebar and theme
```

## Generated reference snippets

The design-token table, palette swatches, and migration component mapping in `docs/_reusables/` are generated from the CLI. Regenerate them after upgrading `docslit`:

```bash
node scripts/gen-design-tokens.mjs
node scripts/gen-component-mapping.mjs
```

The design-token script uses the `docslit` command on your `PATH`; set `DOCSLIT_BIN` to a local build's `bin/docslit.js` path to use it instead. The mapping script imports `docslit/src/import.js` from an installed CLI package; set `DOCSLIT_CLI_DIR` to a CLI checkout to use a local build.

## Contributing

1. Edit or add Markdown pages in `docs/`.
2. Run `npx docslit dev` to preview your changes.
3. Check documentation structure and quality:

   ```bash
   npx docslit validate --format json
   npx docslit lint --format json
   ```

4. Submit a pull request.
