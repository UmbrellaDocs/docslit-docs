#!/usr/bin/env node
// Regenerates two snippets from the CLI's JSON output:
//   docs/_reusables/design-tokens-table.md  from `docslit theme tokens --json`  (included by customization/design-tokens.md)
//   docs/_reusables/palette-swatches.md     from `docslit theme list --json`    (included by customization/palettes-and-brand.md)
//
//   node scripts/gen-design-tokens.mjs                      # uses `docslit` from PATH
//   DOCSLIT_BIN=/path/to/docslit/bin/docslit.js node scripts/gen-design-tokens.mjs
import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const bin = process.env.DOCSLIT_BIN;
const [cmd, args] = bin ? ['node', [bin]] : ['docslit', []];
const out = execFileSync(cmd, [...args, 'theme', 'tokens', '--json', '--theme', 'default'], { cwd: root, encoding: 'utf8' });
const { tokens } = JSON.parse(out);

const GROUPS = [
  ['typography', 'Typography', 'Font, size, weight, spacing and colour of headings and body text.'],
  ['code', 'Code', 'Code blocks and inline code.'],
  ['links', 'Links and focus', 'Link colours, underlines and the keyboard focus ring.'],
  ['shape', 'Shape and elevation', 'Radii, cards, callouts, tables, tab buttons and shadows.'],
  ['chrome', 'Chrome', 'Header, sidebar, table of contents and page background.'],
];
const esc = (s) => String(s).replace(/\|/g, '\\|').replace(/</g, '&lt;');
const code = (s) => '`' + String(s).replace(/`/g, '') + '`';

let md = '';
for (const [id, title, blurb] of GROUPS) {
  const rows = tokens.filter((t) => t.group === id);
  if (!rows.length) continue;
  md += `### ${title}\n\n${blurb}\n\n| Token | Default | What it controls |\n|---|---|---|\n`;
  for (const t of rows) {
    const def = t.light ? `${code(t.default)} (light: ${code(t.light)})` : code(t.default);
    md += `| ${code(t.name)} | ${esc(def)} | ${esc(t.description)} |\n`;
  }
  md += '\n';
}
const known = new Set(GROUPS.map((g) => g[0]));
const extra = tokens.filter((t) => !known.has(t.group));
if (extra.length) throw new Error('New token groups need a heading: ' + [...new Set(extra.map((t) => t.group))].join(', '));

writeFileSync(path.join(root, 'docs/_reusables/design-tokens-table.md'), md.trimEnd() + '\n');
console.log(`Wrote ${tokens.length} tokens to docs/_reusables/design-tokens-table.md`);

// Palette swatches: one row per palette with its accent in light and dark mode.
const list = JSON.parse(execFileSync(cmd, [...args, 'theme', 'list', '--json'], { cwd: root, encoding: 'utf8' }));
const signature = new Map(list.themes.map((t) => [t.palette, t.id]));
let sw = '<wc-colors variant="table">\n';
for (const p of list.palettes) {
  const sig = signature.get(p.id);
  const title = `\`${p.id}\`${sig ? ` (signature palette of \`${sig}\`)` : ''}`;
  sw += `<wc-color-row title="${title}">\n<wc-color name="Light accent" value="${p.accent.light}"></wc-color>\n<wc-color name="Dark accent" value="${p.accent.dark}"></wc-color>\n</wc-color-row>\n`;
}
sw += '</wc-colors>\n\n| Palette | Description |\n|---|---|\n';
for (const p of list.palettes) sw += `| \`${p.id}\` | ${esc(p.description)} |\n`;
writeFileSync(path.join(root, 'docs/_reusables/palette-swatches.md'), sw);
console.log(`Wrote ${list.palettes.length} palettes to docs/_reusables/palette-swatches.md`);
