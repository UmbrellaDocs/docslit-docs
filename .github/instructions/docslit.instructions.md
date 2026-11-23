---
applyTo: "docs/**/*.md"
---
<!-- docslit:generated -->

## DocsLit docs

This project is a DocsLit site: Markdown pages in `docs/` with embeddable `<wc-*>` web components, configured by `docslit.json`.

- Pages: `docs/**/*.md`. A page id is its path without `.md` (`guides/setup` is `docs/guides/setup.md`).
- Sidebar: explicit, in `docslit.json`. New pages must be added to a group (`docslit new --group` does it). Groups: "Getting started", "AI & agents", "Writing content", "Components", "Customization", "Deployment", "Migration", "Integrations", "CLI reference", "Changelog".
- Versioned docs (git-branch based): 0.1. Edit the branch for the version you mean to change.
- Reusable snippets live in `docs/_reusables/` and are included with `<wc-include src="name.md" />`.
- Commands: `docslit dev` (preview), `docslit build` (static site to `dist/`).

### Authoring loop

1. Discover, never guess: `docslit components --json` (all components), `docslit components <tag> --json` (attributes, nesting, example), `docslit schema` / `docslit schema frontmatter`.
2. Create the page: `docslit new <page-id> --title "..." --description "..." --json` (add `--group "<sidebar group>"` to register it in the sidebar).
3. Write the content in `docs/<page-id>.md`.
4. Check: `docslit validate --format json` (is it broken?) and `docslit lint --format json` (is it good?). Fix every error and warning; each issue has a `file`, `line` and `fix`. Repeat until both are clean.

### Rules

- Frontmatter needs `title` and a one-sentence `description` (30 to 200 chars).
- One `# H1` matching the title; do not skip heading levels; no duplicate headings on a page.
- Fenced code blocks always have a language. Images always have alt text. Link text is descriptive, not "click here".
- Blank line before and after every `<wc-*>` block and after its opening tag, or the Markdown body will not render.
- Close components explicitly (`<wc-tile ...></wc-tile>`); only `<wc-include src="..." />` is self-closing.
- Respect nesting: `wc-tabs` > `wc-tab`, `wc-steps` > `wc-step`, `wc-code-group` > `wc-code-tab`, `wc-fields` > `wc-field`, `wc-tiles` > `wc-tile`. Code bodies are raw text, not Markdown.
- Cards, tiles, buttons, callouts and steps take `icon` (a Lucide / Font Awesome name, emoji, image path or URL; `icon-name` is an accepted alias); tabs use `label`. Do not invent attributes; check the manifest.
- Keep pages under about 2500 words and link to related pages with relative slugs (`[Setup](setup)`).
- No TODO/TBD text in prose.

Full reference: `npx docslit agents print author` (prints the complete component reference, generated from the CLI version you are running).
