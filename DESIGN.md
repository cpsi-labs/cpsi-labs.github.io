---
name: CPSI LABS
description: Independent software publishing, presented through focused product showcases.
colors:
  light-bg: "#ffffff"
  light-surface: "#f5f5f7"
  light-raised: "#ffffff"
  light-text: "#1d1d1f"
  light-muted: "#626269"
  light-subtle: "#68686f"
  light-line: "#dcdce1"
  light-accent: "#005bd3"
  light-action: "#0063ed"
  light-action-hover: "#0054ca"
  light-soft: "#edf3fc"
  light-header: "#ffffffd9"
  dark-bg: "#101114"
  dark-surface: "#191a1e"
  dark-raised: "#222329"
  dark-text: "#f5f5f7"
  dark-muted: "#adaeb7"
  dark-subtle: "#a1a3ae"
  dark-line: "#35363e"
  dark-accent: "#74aaff"
  dark-action: "#0867ed"
  dark-action-hover: "#247cff"
  dark-soft: "#1b2a41"
  dark-header: "#101114dc"
  showcase-navy: "#071a38"
  showcase-black: "#08090c"
  precision-black: "#0a0c11"
  showcase-blue: "#7cb2ff"
  showcase-navy-text: "#f5f7fc"
  showcase-navy-muted: "#b1bdd1"
  showcase-navy-line: "#2d405e"
  showcase-black-text: "#f5f5f7"
  showcase-black-muted: "#acafb8"
  showcase-black-line: "#34353b"
typography:
  display:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(56px, 6.4vw, 88px)"
    fontWeight: 600
    lineHeight: 1.06
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(40px, 5vw, 64px)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(32px, 4vw, 52px)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Manrope, sans-serif"
    fontSize: "11px"
    fontWeight: 500
    lineHeight: 1.5
rounded:
  control: "30px"
  card: "16px"
  compact: "12px"
  small: "8px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "40px"
  section: "90px"
components:
  button-primary:
    backgroundColor: "{colors.light-action}"
    textColor: "#ffffff"
    rounded: "{rounded.control}"
    padding: "12px 23px"
    height: "46px"
  button-primary-hover:
    backgroundColor: "{colors.light-action-hover}"
    textColor: "#ffffff"
    rounded: "{rounded.control}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.light-accent}"
    rounded: "{rounded.control}"
    padding: "12px 23px"
    height: "46px"
  card:
    backgroundColor: "{colors.light-surface}"
    textColor: "{colors.light-text}"
    rounded: "{rounded.card}"
---

## Overview

CPSI LABS is an independent software publisher. Present the brand and its real software disciplines with the clarity and restraint of a premium product showcase. Lead with the genuine, original CS monogram, a centered “CPSI LABS” title, the exact slogan “Build. Innovate. Evolve.”, one concise vision statement, and two direct actions. The first viewport stays open and white by default; the large dark navy and blue monogram is the focal artwork. Follow with alternating white, pale gray, black, and navy full-width bands. Product benefits and understandable explanations come before technical detail. Use real product media only when the catalogue supplies it. The light/dark preference and English default are existing user choices and remain respected; French is complete. Do not publish personal identity or contact details. GitHub is the official communication channel.

## Colors

The default canvas is white, with pale gray for quiet grouping and true black or navy for deliberate showcase interludes. Blue marks actions, links, and selected states. The CSS custom properties in `src/styles.css` are the source of truth for light and dark themes; full-width showcase sections also define their own text and line colors in `src/styles/showcase.css`. Keep text readable on each section surface and preserve the explicit theme preference. The translucent header uses the matching `--header` token with saturation and blur. No orbital or neon visual language.

## Typography

Use Manrope, self-hosted locally in weights 400, 500, 600, and 700, with `sans-serif` fallback. Never load or imitate proprietary system typography. Headings use weight 600, tight negative tracking, and balanced wrapping. Body copy uses 16px / 1.65 by default; showcase copy varies by role, including a 30px medium brand slogan and 17px vision text. Buttons are 14px / 500. Navigation is compact, while explanatory copy stays comfortably readable. Code may use the platform monospace stack.

## Layout

The shared content container is `min(1120px, calc(100% - 80px))`. Keep showcase sections spacious, centered, and full width; the brand hero has an 850px minimum height on desktop with a 490px monogram stage. The sticky translucent desktop navigation is 52px tall. Preserve the responsive breakpoints at 1100px, 850px, and 600px; at the narrow breakpoint the navigation is 54px and mobile preference controls have a 56px minimum touch height. Content must remain usable down to 320px. The home story introduces the lab, software across platforms, privacy and precision, then the genuine catalogue and useful links. Explanatory product copy and benefits precede implementation specifics. Never invent product screens, metrics, users, customer marks, or testimonials; an empty catalogue is stated honestly.

## Elevation & Depth

Use the theme shadow token (`--shadow`) for restrained depth. Most layout divisions come from large color bands and hairline borders, not floating cards. The genuine hero monogram may use the implemented subtle drop shadow and ground shadow. The monogram entrance is finite and honors reduced motion. Reveal content uses a finite 700ms upward movement only when motion is allowed and observation is available. The header uses `backdrop-filter: saturate(160%) blur(18px)`.

## Shapes

Actions are capsule-shaped (`30px`); major cards use `16px`, compact surfaces `12px`, and small controls `8px`. Use thin borders and clean alignment. The CS symbol is the only primary brand artwork in the hero. Keep its frame and geometry rectilinear and aligned; do not add ellipses, orbit paths, orbiting nodes, or invented technical ornament. ProductMedia uses its actual `phone`, `browser`, `desktop`, or `none` framing from catalogue data.

## Components

### Actions

Primary actions use the theme’s `--action` fill, white text, a capsule radius, 12px 23px padding, and 46px minimum height. Hover uses `--action-hover`. Secondary actions are transparent with a one-pixel accent border and accent text. Preserve visible keyboard focus styling and clear action labels.

### Navigation

The sticky header is 52px on desktop, translucent, and blurred. Keep links compact, evenly spaced, and easy to scan. At mobile widths, collapse navigation access while preserving language and theme preferences; the mobile header is 54px, with preference controls at a 56px minimum touch height.

### Showcase sections

Use broad, contrasting white, pale gray, black, and navy sections with one genuine focal visual and a concise explanation. Pair privacy and precision as contrasting compositions where the content supports it. The initial hero centers the real CS monogram, brand name, exact slogan, vision, and two actions. Artwork uses a clean rectangular blue frame with deliberate alignment and no orbit motif.

### Product media

`ProductMedia` renders only catalogue-provided local screenshots and alt text, with the declared frame type. Explain the user benefit before platform and implementation details. Do not fabricate media for unreleased products.

## Do's and Don'ts

### Do

- Preserve white-dominant light mode, existing theme choices, English default, and complete French content.
- Use the supplied genuine CS monogram and the exact “Build. Innovate. Evolve.” slogan.
- Keep the hero centered, open, and visually led by the true monogram.
- Explain real user benefits before technical specifications.
- Use locally hosted Manrope and the exact theme tokens from the CSS source.
- Honor keyboard access, readable contrast, and `prefers-reduced-motion`.
- Keep catalogue availability and official GitHub links truthful.

### Don't

- Do not bring back the marine or orbital art direction, ellipses, rings, or orbiting objects.
- Do not use Apple assets, SF fonts, Apple product names, fabricated product imagery, or fake specifications.
- Do not invent apps, customers, metrics, testimonials, contact details, personal names, or user identities.
- Do not override the user’s saved theme or language preference.
- Do not add unrelated colors, neon, or gratuitous gradients.
