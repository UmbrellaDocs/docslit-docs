# Reusable content

DocsLit supports reusable markdown fragments through compile-time includes. This keeps repeated setup steps and shared notices in one source of truth.

## Opinionated structure

Reusable files must live under `docs/_reusables/`.

```markdown
docs/
  getting-started/
    quickstart.md
  _reusables/
    shared/
      install-cli.md
    notices/
      support-policy.md
```

<wc-callout type="info" title="Strict by design">
Includes are intentionally limited to `docs/_reusables/**` to keep content architecture predictable for teams.
</wc-callout>

## Include syntax

Use the self-closing `wc-include` tag:

```markdown
<wc-include src="shared/install-cli.md" />
```

You can also use an absolute docs path:

```markdown
<wc-include src="/docs/_reusables/shared/install-cli.md" />
```

## Include rules

- only `.md` files can be included
- include targets must be under `docs/_reusables/**`
- include tags must be self-closing
- reusable files cannot include other files (no nested includes)

## Validation

Run validation before building:

```bash
docslit validate
```

Validation reports invalid include paths, nested include usage in reusable files, and undefined variables.

See [Variables and precedence](variables-and-precedence) for variable behavior and built-in version variables.

