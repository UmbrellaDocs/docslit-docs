### Typography

Font, size, weight, spacing and colour of headings and body text.

| Token | Default | What it controls |
|---|---|---|
| `--font-heading` | `var(--font-sans)` | Font stack for h1-h4 (defaults to the body font) |
| `--heading-color` | `var(--text)` | Heading text colour |
| `--heading-features` | `'ss01'` | font-feature-settings for headings |
| `--content-fs` | `1rem` | Base font size of the article column |
| `--body-lh` | `1.6` | Body line height |
| `--prose-color` | `var(--text2)` | Paragraph and list text colour |
| `--p-mb` | `16px` | Space below paragraphs and lists |
| `--li-mb` | `6px` | Space between list items |
| `--h1-size` | `3rem` | h1 size (desktop) |
| `--h1-size-md` | `2.25rem` | h1 size (&lt;=768px) |
| `--h1-size-sm` | `1.875rem` | h1 size (&lt;=640px) |
| `--h1-size-xs` | `1.625rem` | h1 size (&lt;=400px) |
| `--h1-weight` | `500` | h1 weight |
| `--h1-tracking` | `-.04em` | h1 letter-spacing |
| `--h1-lh` | `1.1` | h1 line height |
| `--h1-mb` | `20px` | Space below h1 |
| `--h2-size` | `1.875rem` | h2 size (desktop) |
| `--h2-size-md` | `1.5rem` | h2 size (&lt;=768px) |
| `--h2-size-sm` | `1.375rem` | h2 size (&lt;=640px) |
| `--h2-weight` | `500` | h2 weight |
| `--h2-tracking` | `-.03em` | h2 letter-spacing |
| `--h2-lh` | `1.2` | h2 line height |
| `--h2-mt` | `56px` | Space above h2 |
| `--h2-mb` | `16px` | Space below h2 |
| `--h3-size` | `1.375rem` | h3 size (desktop) |
| `--h3-size-md` | `1.125rem` | h3 size (&lt;=768px) |
| `--h3-size-sm` | `1.0625rem` | h3 size (&lt;=640px) |
| `--h3-weight` | `500` | h3 weight |
| `--h3-tracking` | `-.02em` | h3 letter-spacing |
| `--h3-lh` | `1.3` | h3 line height |
| `--h3-mt` | `40px` | Space above h3 |
| `--h3-mb` | `12px` | Space below h3 |
| `--h4-size` | `1.125rem` | h4 size |
| `--h4-weight` | `500` | h4 weight |
| `--h4-tracking` | `-.01em` | h4 letter-spacing |
| `--h4-lh` | `1.4` | h4 line height |
| `--h4-mt` | `32px` | Space above h4 |
| `--h4-mb` | `8px` | Space below h4 |
| `--logo-weight` | `700` | Weight of the text logo |
| `--logo-tracking` | `normal` | Letter-spacing of the text logo |

### Code

Code blocks and inline code.

| Token | Default | What it controls |
|---|---|---|
| `--code-fs` | `14px` | Font size of code in plain &lt;pre> blocks |
| `--code-block-fs` | `13px` | Font size of wc-code-block / wc-code-group |
| `--code-radius` | `var(--radius-lg)` | Corner radius of code blocks |
| `--code-border` | `(unset)` | Code block border colour (unset = border) |
| `--code-bar-bg` | `(unset)` | Code block header bar background (unset = surface) |
| `--code-head-h` | `40px` | Code block header height |
| `--code-shadow` | `none` | Code block elevation |
| `--inline-code-fs` | `.8125em` | Inline code size (relative) |
| `--inline-code-bg` | `var(--surface2)` | Inline code background |
| `--inline-code-border` | `var(--border)` | Inline code border colour |
| `--inline-code-color` | `var(--accent-light)` | Inline code text colour |

### Links and focus

Link colours, underlines and the keyboard focus ring.

| Token | Default | What it controls |
|---|---|---|
| `--link-color` | `var(--accent-light)` | Article link colour |
| `--link-hover-color` | `var(--link-color)` | Article link hover colour |
| `--link-decoration` | `underline` | text-decoration of article links at rest (underline \| none) |
| `--link-underline-color` | `var(--accent-dim2)` | Underline colour at rest |
| `--link-underline-hover` | `var(--accent-light)` | Underline colour on hover |
| `--link-underline-offset` | `2px` | Underline offset |
| `--focus-color` | `var(--accent)` | Keyboard focus ring colour |
| `--focus-w` | `2px` | Keyboard focus ring width |

### Shape and elevation

Radii, cards, callouts, tables, tab buttons and shadows.

| Token | Default | What it controls |
|---|---|---|
| `--radius` | `8px` | Default corner radius (controls, small surfaces) |
| `--radius-lg` | `12px` | Large corner radius (cards, code, tables, dialogs) |
| `--r-xs` | `(unset)` | Radius scale: chips, inline code (unset = components keep 3-4px) |
| `--r-sm` | `(unset)` | Radius scale: small controls (unset = 6px) |
| `--r-md` | `(unset)` | Radius scale: buttons, inputs (unset = 8px) |
| `--r-lg` | `(unset)` | Radius scale: panels, callouts (unset = 10px) |
| `--r-xl` | `(unset)` | Radius scale: large cards (unset = 12px) |
| `--r-pill` | `(unset)` | Radius scale: pills (unset = 100px) |
| `--card-bg` | `(unset)` | Card background (unset = surface) |
| `--card-border` | `(unset)` | Card border colour (unset = border) |
| `--card-radius` | `var(--radius-lg)` | Card and prev/next radius |
| `--card-shadow` | `none` | Card elevation at rest |
| `--card-shadow-hover` | `(unset)` | Card elevation on hover (unset = soft shadow) |
| `--card-lift` | `(unset)` | Card translateY on hover (unset = -2px) |
| `--card-pad` | `(unset)` | Card inner padding (unset = 22px) |
| `--callout-radius` | `(unset)` | Callout radius (unset = radius-lg) |
| `--callout-bg-mix` | `(unset)` | Callout tint strength (unset = 9%) |
| `--callout-border-mix` | `(unset)` | Callout border strength (unset = 32%) |
| `--callout-bar-w` | `(unset)` | Callout left bar width (unset = 1px, same as border) |
| `--callout-bar-mix` | `(unset)` | Callout left bar strength (unset = 32%) |
| `--table-radius` | `var(--radius-lg)` | Table wrapper radius |
| `--table-border` | `var(--border)` | Table wrapper border colour |
| `--table-line` | `var(--border)` | Table row/column line colour |
| `--table-col-line-w` | `1px` | Table vertical line width |
| `--table-head-bg` | `var(--surface)` | Table header background |
| `--table-head-color` | `var(--text2)` | Table header text colour |
| `--table-pad-y` | `12px` | Table cell vertical padding |
| `--table-fs` | `15px` | Table font size |
| `--shadow-modal` | `0 20px 60px rgba(0,0,0,.4)` | Elevation of the search dialog |

### Chrome

Header, sidebar, table of contents and page background.

| Token | Default | What it controls |
|---|---|---|
| `--nav-bg` | `rgba(10,10,10,.92)` (light: `rgba(255,255,255,.93)`) | Top bar background |
| `--nav-border` | `var(--border)` | Top bar bottom border colour |
| `--nav-blur` | `12px` | Top bar backdrop blur |
| `--nav-shadow` | `none` | Top bar elevation |
| `--sidebar-fs` | `14px` | Sidebar item font size |
| `--sidebar-border` | `var(--border)` | Sidebar right border colour |
| `--sidebar-border-w` | `1px` | Sidebar right border width |
| `--sb-item-radius` | `0` | Sidebar item radius (0 = full-bleed row) |
| `--sb-item-mx` | `0px` | Sidebar item horizontal inset (pill style) |
| `--sb-item-pl` | `20px` | Sidebar item left padding |
| `--sb-group-pl` | `18px` | Sidebar group title left padding (align with item text) |
| `--sb-item-lh` | `1.4` | Sidebar item line height |
| `--sb-bar-w` | `2px` | Sidebar active bar width (0 = pill without bar) |
| `--sb-active-bg` | `var(--accent-dim)` | Sidebar active item background |
| `--sb-active-fg` | `var(--accent-light)` | Sidebar active item text |
| `--sb-active-bar` | `var(--accent)` | Sidebar active bar colour |
| `--sb-active-weight` | `500` | Sidebar active item weight |
| `--sb-hover-bg` | `var(--surface2)` | Sidebar hover background |
| `--sb-group-fs` | `11px` | Sidebar group title size |
| `--sb-group-weight` | `700` | Sidebar group title weight |
| `--sb-group-transform` | `uppercase` | Sidebar group title text-transform |
| `--sb-group-tracking` | `.1em` | Sidebar group title letter-spacing |
| `--sb-group-color` | `var(--text3)` | Sidebar group title colour |
| `--sb-group-pt` | `18px` | Space above sidebar group titles |
| `--sb-group-pb` | `5px` | Space below sidebar group titles |
| `--toc-fs` | `13px` | Table of contents font size |
| `--toc-title-fs` | `11px` | "On this page" title size |
| `--toc-title-transform` | `uppercase` | "On this page" text-transform |
| `--toc-title-tracking` | `.1em` | "On this page" letter-spacing |
| `--toc-line` | `var(--border)` | TOC rail colour |
| `--toc-line-w` | `1px` | TOC rail width (0 = no rail) |
| `--toc-bar-w` | `2px` | TOC active bar width |
| `--toc-active-fg` | `var(--accent-light)` | TOC active item colour |
| `--toc-active-bar` | `var(--accent)` | TOC active bar colour |
| `--page-bg-image` | `none` | Decorative page background (gradient / grid), or none |
| `--on-accent` | `#fff` | Text colour on filled accent surfaces (buttons) |
