---
name: CPSI LABS
description: Independent software publishing with a precise, premium technical identity.
colors:
  navy: "#080e1c"
  surface: "#0c1425"
  raised: "#101c30"
  text: "#f2f5fc"
  muted: "#9eaac0"
  subtle: "#7586a2"
  line: "#253147"
  accent: "#5291ff"
  action: "#0660f5"
  action-hover: "#2878ff"
  soft: "#142648"
  hero-lines: "#263d63"
  light-bg: "#f7f9fd"
  light-surface: "#eef3fb"
  light-raised: "#ffffff"
  light-text: "#10213c"
  light-muted: "#52627b"
  light-subtle: "#566984"
  light-line: "#d4dfed"
  light-accent: "#0058dd"
  light-action: "#065ee9"
  light-action-hover: "#004abd"
  light-soft: "#e4edff"
  light-hero-lines: "#c4d4eb"
typography:
  display:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(68px, 7.8vw, 96px)"
    fontWeight: 600
    lineHeight: 1.04
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(40px, 5.2vw, 65px)"
    fontWeight: 600
    lineHeight: 1.18
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(28px, 3vw, 40px)"
    fontWeight: 600
    lineHeight: 1.18
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.75
  label:
    fontFamily: "Manrope, sans-serif"
    fontSize: "10px"
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: "0.09em"
rounded:
  xs: "4px"
  sm: "6px"
  button: "7px"
  md: "8px"
  lg: "12px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "40px"
components:
  button-primary:
    backgroundColor: "{colors.action}"
    textColor: "#ffffff"
    rounded: "{rounded.button}"
    padding: "12px 20px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.action-hover}"
    textColor: "#ffffff"
    rounded: "{rounded.button}"
  button-secondary:
    backgroundColor: "{colors.raised}"
    textColor: "{colors.text}"
    rounded: "{rounded.button}"
    padding: "12px 20px"
    height: "48px"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.lg}"
---

# Design System: CPSI LABS

## Overview

**Creative North Star: "The Independent Systems Atelier"**

CPSI LABS presents an independent software lab through the confidence of a considered technical publisher. The actual interlocking CS mark is the identity's hero artifact; orbital linework echoes its connected geometry. Wide, direct typography and precise hairlines give the work presence while quiet surfaces keep the content in focus.

The system supports an honest catalogue, technical documentation, company information, support, and legal content across English and French. Dark navy is the primary environment; a pale blue-white light theme carries the same hierarchy and electric-blue identity. Components stay familiar and restrained, while page sections vary their composition to suit their content. English is the default language, and both themes are first-class.

**Key Characteristics:**
- Premium independent technology publisher, centered on the real CS symbol.
- Deep navy, electric blue, cool whites, and disciplined hairlines.
- Broad Manrope typography, calm surfaces, and varied section compositions.
- Responsive bilingual experience with dark and light themes.
- Motion is finite and purposeful; reduced-motion preferences are honored.

## Colors

The palette moves from deep blue-black and cool white to a clear, electric blue used for identity emphasis and actions.

### Primary
- **Electric Blue** (`#5291ff` dark / `#0058dd` light): Accent text, selected states, orbital nodes, and identity details. Use the theme-specific value so contrast remains legible.
- **Action Blue** (`#0660f5` dark / `#065ee9` light): Primary calls to action; hover shifts to `#2878ff` dark and `#004abd` light.

### Neutral
- **Night Navy** (`#080e1c`): Main dark canvas and dark header tint.
- **Deep Surface** (`#0c1425`): Dark cards and structural bands.
- **Raised Navy** (`#101c30`): Dark raised controls and secondary buttons.
- **Cool White** (`#f2f5fc`): Dark-theme primary text.
- **Muted Blue Gray** (`#9eaac0`): Supporting copy in dark mode.
- **Subtle Blue Gray** (`#7586a2`): Tertiary labels and quiet metadata in dark mode.
- **Navy Hairline** (`#253147`): Dark-mode dividers and borders.
- **Pale Blue White** (`#f7f9fd`): Light-theme canvas and header tint.
- **Light Surface** (`#eef3fb`) and **White Raised Surface** (`#ffffff`): Light cards and elevated areas.
- **Ink Navy** (`#10213c`): Light-theme primary text.
- **Muted Slate** (`#52627b`) and **Subtle Slate** (`#566984`): Supporting and tertiary light-theme text.
- **Pale Divider** (`#d4dfed`): Light-mode borders and dividers.

**The Theme-Paired Accent Rule.** Use the dark or light accent/action values with their corresponding theme; do not carry dark-theme blue onto light surfaces when the light token is defined.

## Typography

**Display Font:** Manrope (sans-serif fallback; self-hosted through bundled `@fontsource/manrope` weights 400, 500, 600, and 700)
**Body Font:** Manrope (sans-serif fallback; self-hosted through bundled `@fontsource/manrope` weights 400, 500, 600, and 700)
**Label/Mono Font:** Manrope; code samples use the platform monospace stack.

**Character:** Manrope is broad, clean, and contemporary, with tight tracking on display and headline text. Body copy remains open and readable; small uppercase labels are reserved for compact metadata and section cues.

### Hierarchy
- **Display** (600, `clamp(68px, 7.8vw, 96px)`, 1.04, `-0.04em`): The home hero's three-part slogan; scales down at tablet and mobile widths.
- **Headline** (600, `clamp(40px, 5.2vw, 65px)`, 1.18, `-0.035em`): Page-level headings.
- **Title** (600, `clamp(28px, 3vw, 40px)`, 1.18, `-0.035em`): Section headings. Card `h3` titles are `19px`, weight 600, line-height 1.18, and `-0.02em` tracking.
- **Body** (400, `14px`, 1.75): Default text; documentation paragraphs use `15px` with `1.95` line-height for sustained reading.
- **Label** (600, `10px`, 1.5, `0.09em`): Small uppercase metadata and technical annotations.

## Layout

The desktop content container is capped at `1200px` and uses `calc(100% - 96px)` gutters. At `1100px` gutters become `64px`, at `850px` `48px`, and at `600px` `40px`; the page remains usable down to `320px`. Compose sections with a varied editorial rhythm: asymmetric hero, discipline selector beside its illustration, split principles, and simpler stacked reading layouts. At `850px`, navigation becomes a menu and multi-column areas begin to collapse; at `600px`, the hero, documentation, support, and editorial layouts become single-column. Preserve generous section spacing on desktop and tighten it deliberately on smaller screens.

## Elevation & Depth

Depth combines quiet tonal layering, hairline borders, and a small set of ambient shadows. The token shadow is `0 24px 55px #00000025` in dark mode and `0 24px 55px #13376712` in light mode. Use it for floating or emphasized surfaces; controls and cards generally rely on surface contrast and borders. The hero illustration adds its own restrained radial highlight and orbit geometry.

## Shapes

The shape language is controlled and mostly rounded: shared surfaces use `12px`, primary buttons `7px`, icon buttons and compact chips `6px`, and small code or metadata elements `4px`. Borders are usually one-pixel hairlines. Clip diagrams and image treatments to their intended geometry; reserve circular silhouettes for the CS mark and orbital nodes.

## Components

### Buttons
- **Character:** Direct, compact actions with clear contrast and restrained state changes.
- **Shape:** `7px` radius; minimum height `48px`; padding `12px 20px`.
- **Primary:** Action blue background, white text, Manrope `13px`/`600`; subtle blue shadow. Hover uses the theme's action-hover blue and a slightly stronger shadow.
- **Secondary:** Raised surface, one-pixel line border, primary text; hover shifts border and text to the theme accent.
- **Focus:** A visible `2px` accent outline with `5px` offset is applied to focused interactive elements.

### Chips
- **Style:** Catalogue filters use `8px 13px` padding, `12px` text, `6px` corners, and a transparent one-pixel border at rest.
- **State:** Selected filters use the soft theme surface and line border with accent text; hover uses the surface and primary text. Focus has the shared `2px` accent outline with `5px` offset.

### Cards / Containers
- **Corner Style:** `12px` for major content cards and panels; compact elements may use `6px` or `8px`.
- **Background:** Use surface/raised theme layers with a hairline border where the layout needs separation.
- **Shadow Strategy:** Ambient shadow is reserved for floating or emphasized elements; most cards stay flat.
- **Internal Padding:** Application cards use `25px` padding, reduced for tighter mobile layouts.

### Inputs / Fields
- **Style:** Inherit Manrope; use the theme surface, line border, and compact rounded corners.
- **Focus:** Shift border to accent and retain the visible `2px` focus outline.
- **Disabled:** Use subdued theme text and the default cursor; preserve contrast sufficient to identify the control.

### Navigation
- **Style:** A restrained horizontal header with compact Manrope labels, subtle separators, and direct routes to catalogue, downloads, resources, and preferences.
- **States:** Hover and current states use the theme accent; focus remains visibly outlined.
- **Mobile:** At `850px`, the links move into a collapsible vertical menu beneath the `72px` header; at `600px`, the header is `68px` tall.

### Orbital CS Hero
Use the supplied, genuine CS mark as the centerpiece in an asymmetric orbit composition. Thin elliptical paths, measured coordinate annotations, and restrained accent nodes support the mark rather than replacing it. The entrance is finite; honor reduced-motion settings.

## Do's and Don'ts

### Do
- **Do** use the supplied, real CS symbol as the identity mark and preserve its proportions.
- **Do** pair theme-specific colors and maintain readable contrast in both themes.
- **Do** use Manrope and the observed display, headline, title, body, and label hierarchy.
- **Do** vary page section compositions while preserving the shared palette, typography, hairlines, and controlled radii.
- **Do** honor English-default/French-complete content and `prefers-reduced-motion`.
- **Do** keep primary actions clear and use `#0660f5` dark / `#065ee9` light with their defined hover colors.

### Don't
- **Don't** invent product dashboards, apps, customer logos, metrics, or testimonials for an empty catalogue.
- **Don't** substitute a fabricated monogram or unrelated symbol for the supplied CS mark.
- **Don't** use the dark accent as the light-theme accent; use `#0058dd` in light mode.
- **Don't** add decorative motion that competes with the content or persists under reduced-motion preferences.
- **Don't** introduce unrelated accent colors, heavy gradients, or oversized shadows into the quiet technical palette.
