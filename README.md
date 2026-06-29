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
  components/       40+ built-in web components
  customization/    Theming, logo, announcement banner, custom components, versioning
  deployment/       Static hosting, offline builds, DocsLit Cloud
  migration/        Guides for Mintlify, Fern, and GitBook
  cli-reference/    CLI commands and validation
  changelog/        Release notes
dist/               Built static site output
docslit.json        Site configuration (sidebar, versioning)
```

## Contributing

1. Edit or add Markdown files in the `docs/` directory.
2. Run `npx docslit dev` to preview changes locally.
3. Submit a pull request.
