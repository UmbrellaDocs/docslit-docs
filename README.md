# DocsLit Documentation

Documentation source for [DocsLit](https://github.com/UmbrellaDocs/docslit-cli). A documentation framework for the web platform era.

## Getting started

Install DocsLit and start a local preview:

```bash
npx docslit init my-docs
cd my-docs
npx docslit dev
```

Open `http://localhost:3000` to view the site locally.

## Project structure

```
docs/               Markdown source files
  getting-started/  Installation, quickstart, and project structure
  writing-content/  Markdown, frontmatter, navigation, and SEO
  components/       Built-in web components with live examples
  customization/    Themes, palettes, tokens, tabs, layout, site chrome, versioning
  deployment/       Static hosting, offline builds, DocsLit Cloud
  migration/        Guides for Mintlify, Fern, and GitBook, the import reference and component mapping
  cli-reference/    CLI commands and validation
  changelog/        Release notes
dist/               Built static site output
docs/_reusables/    Snippets, three of them generated (see below)
scripts/            Generators for reference tables
docslit.json        Site configuration (sidebar, versioning, themePicker)
```

## Generated reference pages

Three snippets in `docs/_reusables/` are generated from the CLI, so they match the version you run. Regenerate them after upgrading `docslit`:

```bash
# design tokens table and palette swatches (from `docslit theme tokens --json` and `theme list --json`)
node scripts/gen-design-tokens.mjs

# migration component mapping (real conversions through the importer)
node scripts/gen-component-mapping.mjs
```

The first script runs the `docslit` command from your `PATH`. The second imports `docslit/src/import.js` from an installed copy of the package. For either, set `DOCSLIT_BIN` (path to `bin/docslit.js`) or `DOCSLIT_CLI_DIR` (path to a CLI checkout) to use a local build of the CLI.

## Contributing

1. Edit or add Markdown files in the `docs/` directory.
2. Run `npx docslit dev` to preview changes locally.
3. Submit a pull request.
