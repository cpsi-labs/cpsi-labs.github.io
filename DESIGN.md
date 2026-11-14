---
name: CPSI LABS
description: Independent software publishing, presented through focused product showcases.
colors:
  light-bg: '#ffffff'
  light-surface: '#f5f5f7'
  light-raised: '#ffffff'
  light-text: '#1d1d1f'
  light-muted: '#626269'
  light-subtle: '#68686f'
  light-line: '#dcdce1'
  light-accent: '#005bd3'
  light-action: '#0063ed'
  light-action-hover: '#0054ca'
  light-soft: '#edf3fc'
  light-header: '#ffffffd9'
  dark-bg: '#101114'
  dark-surface: '#191a1e'
  dark-raised: '#222329'
  dark-text: '#f5f5f7'
  dark-muted: '#adaeb7'
  dark-subtle: '#a1a3ae'
  dark-line: '#35363e'
  dark-accent: '#74aaff'
  dark-action: '#0867ed'
  dark-action-hover: '#247cff'
  dark-soft: '#1b2a41'
  dark-header: '#101114dc'
  showcase-navy: '#071a38'
  showcase-black: '#08090c'
  precision-black: '#0a0c11'
  showcase-blue: '#7cb2ff'
  showcase-navy-text: '#f5f7fc'
  showcase-navy-muted: '#b1bdd1'
  showcase-navy-line: '#2d405e'
  showcase-black-text: '#f5f5f7'
  showcase-black-muted: '#acafb8'
  showcase-black-line: '#34353b'
typography:
  display:
    fontFamily: 'Geist Variable, sans-serif'
    fontSize: 'clamp(56px, 6.4vw, 88px)'
    fontWeight: 600
    lineHeight: 1.06
    letterSpacing: '-0.04em'
  headline:
    fontFamily: 'Geist Variable, sans-serif'
    fontSize: 'clamp(40px, 5vw, 64px)'
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: '-0.035em'
  title:
    fontFamily: 'Geist Variable, sans-serif'
    fontSize: 'clamp(32px, 4vw, 52px)'
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: '-0.035em'
  body:
    fontFamily: 'Geist Variable, sans-serif'
    fontSize: '16px'
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: 'Geist Variable, sans-serif'
    fontSize: '11px'
    fontWeight: 500
    lineHeight: 1.5
rounded:
  control: '30px'
  card: '16px'
  compact: '12px'
  small: '8px'
spacing:
  xs: '8px'
  sm: '12px'
  md: '16px'
  lg: '24px'
  xl: '40px'
  section: '90px'
components:
  button-primary:
    backgroundColor: '{colors.light-action}'
    textColor: '#ffffff'
    rounded: '{rounded.control}'
    padding: '12px 23px'
    height: '46px'
  button-primary-hover:
    backgroundColor: '{colors.light-action-hover}'
    textColor: '#ffffff'
    rounded: '{rounded.control}'
  button-secondary:
    backgroundColor: 'transparent'
    textColor: '{colors.light-accent}'
    rounded: '{rounded.control}'
    padding: '12px 23px'
    height: '46px'
  card:
    backgroundColor: '{colors.light-surface}'
    textColor: '{colors.light-text}'
    rounded: '{rounded.card}'
---

## Overview

CPSI LABS is an independent software publisher. The home page follows the approved “Apple-inspired” direction (November 2026): a white, software-centred product page. Lead with a short honesty ribbon about the first releases, a small app-icon eyebrow (genuine CS symbol), a concrete headline (“Software. Mobile apps. Digital tools.”), one sentence on platforms and GitHub publication, and two actions. The focal visual is the site’s own real catalogue and downloads pages shown on a laptop and a phone over a generated light-field backdrop. Follow with Apple-style discipline tiles, the catalogue (real cards when published, otherwise a clearly labelled template), an “Under the hood” band (verification, bilingual, discreet), and the publication process. Use real product media only when the catalogue supplies it. The light/dark preference and English default are existing user choices and remain respected; French is complete. Do not publish personal identity or contact details. GitHub is the official communication channel.

## Colors

The default canvas is white, with `#f5f5f7` pale gray tiles and true black (light theme) or deep navy (dark theme) for contrast tiles. Blue marks actions, links, and selected states. The CSS custom properties in `src/styles.css` are the source of truth for both themes; `src/styles/home.css` defines home-only tile and stage variables per theme. Keep text readable on each surface and preserve the explicit theme preference. The translucent header uses `--header` with saturation and blur and a hairline border. No orbital or neon visual language.

## Typography

Use Geist and Geist Mono (OFL), self-hosted through `@fontsource-variable`, with system fallbacks. Never load or imitate proprietary system typography. Headings use weight 600, tight negative tracking (−0.03 to −0.035em) and balanced wrapping; display lines may use 1.04–1.1 leading. Body copy is 16px / 1.65; ledes 19–24px / 1.35–1.4. Navigation is 12.5px. Code samples and labels use Geist Mono.

## Layout

The shared content container is `min(1120px, calc(100% - 80px))`. Home tiles are full-bleed with 12px gutters (two columns, then three), collapsing to one column on phones. The device stage is at most 1240px wide and 600px tall on desktop, 500px on tablet, 360px on phones; the miniature screens are rendered at full size and scaled per breakpoint. The sticky header is 52px; category links (Mobile, Desktop, Web & API) hide below 1100px and the menu takes over below 850px. Content must remain usable down to 320px. Never invent product screens, metrics, users, customer marks, or testimonials; an empty catalogue is stated honestly.

## Elevation & Depth

Depth comes from devices (drop shadows on the laptop and phones) and from colour contrast between tiles, not from floating cards. Reveal content uses a finite 700ms upward movement only when motion is allowed and observation is available. The header uses `backdrop-filter: saturate(180%) blur(20px)`.

## Shapes

Actions are capsule-shaped; the stage and template card use 28–30px radii, cards 24px, small controls pills. Device frames are generic (no vendor hardware details). ProductMedia uses its actual `phone`, `browser`, `desktop`, or `none` framing from catalogue data.

## Components

### Actions

Primary actions use `--action`, white text and a capsule radius; secondary actions are outlined in the accent colour. Text links use the accent colour with a trailing `›`. Preserve visible keyboard focus styling and clear action labels.

### Navigation

Sticky 52px translucent header: symbol and wordmark (light and dark variants), centred links, then search, an EN/FR segmented switch, theme toggle, GitHub and (mobile) menu. The footer repeats the language switch and theme toggle with distinct accessible names.

### Imagery

Backdrops and tile art are generated by `scripts/visuals/silk.html` (procedural WebGL, CPSI LABS palette) and stored with provenance sidecars in `public/brand/visuals/`. They are never presented as photographs or as product screenshots.

### Product media

`ProductMedia` renders only catalogue-provided local screenshots and alt text, with the declared frame type. Explain the user benefit before platform and implementation details. Do not fabricate media for unreleased products.

## Do's and Don'ts

### Do

- Preserve white-dominant light mode, existing theme choices, English default, and complete French content.
- Use the genuine CS symbol and wordmark at navigation and icon scale.
- Show the real site UI, real code and real verification steps as visuals.
- Use Geist / Geist Mono and the exact theme tokens from the CSS source.
- Honor keyboard access, readable contrast, and `prefers-reduced-motion`.
- Keep catalogue availability and official GitHub links truthful.

### Don't

- Do not return to a giant CS monogram hero, stacked CSS rectangles, shields, padlocks or chips as main illustrations.
- Do not repeat abstract slogans; keep copy concrete.
- Do not use Apple assets, SF fonts, Apple product names, fabricated product imagery, or fake specifications.
- Do not invent apps, customers, metrics, testimonials, contact details, personal names, or user identities.
- Do not override the user’s saved theme or language preference.
