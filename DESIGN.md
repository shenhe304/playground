# DESIGN.md — The Ethereal Archive

## Overview
An editorial-first invitation experience designed to feel like a digital heirloom. The personality is warm, romantic, and intentionally non-utilitarian — closer to high-end stationery than a typical app. Layouts embrace intentional asymmetry: overlapping decorative elements, expansive white space, and organic composition over rigid grids. Every screen should feel "Instagram-worthy" through sophisticated tonal layering. The overall mood is soft, airy, and celebratory.

## Colors
- **Primary** (#785252): CTAs, active states, brand accents, pull quotes, link text
- **Secondary** (#e8dff0): RSVP toggle active state, soft highlight backgrounds, secondary containers
- **Tertiary** (#fecbcb): Decorative elements, gradient endpoint, primary container fills
- **Neutral** (#adadab): Outline variants, ghost borders, disabled states

Surface hierarchy (light to dark layering):
- **surface-container-lowest** (#ffffff): Floating cards, modals, elevated content
- **surface** (#f7f6f3): Base page background
- **surface-container-low** (#f1f1ee): Section backgrounds, input fields
- **surface-container** (#e8e8e5): Recessed areas
- **surface-container-highest** (#ddddd9): Secondary button fill, depth-of-field effect
- **on-surface** (#2e2f2d): All body text — never use pure black

## Typography
- **Headline Font**: Noto Serif
- **Body Font**: Plus Jakarta Sans
- **Label Font**: Plus Jakarta Sans

Display and headline scales use Noto Serif Regular — these carry the emotional weight of the design. Use for names, dates, section titles, and pull quotes. Apply −2% letter-spacing on display/lg for a custom editorial feel.

Title, body, and label scales use Plus Jakarta Sans. Medium weight for titles and labels; Regular for body copy. This sans-serif counterpart keeps logistical details (venues, RSVP instructions) highly legible and functional.

Mix type sizes dramatically: a large display/lg header next to a tiny label/sm subheader creates high-end visual tension.

## Elevation
Depth is conveyed through tonal surface layering, not generic drop shadows. Stacking a white card on an ivory background creates natural lift without any shadow.

When a float is required (navigation bars, modals, floating cards), use ambient shadows only:
- Small lift: 16px blur, y 4px, 5% opacity
- Medium float: 40px blur, y 8px, 5% opacity
- Large float (nav/modal): 60px blur, y 16px, 6% opacity

Shadow color must be a tinted warm charcoal (#2e2f2d) — never pure black. If the shadow looks like a soft glow rather than a dark halo, it's correct.

Floating navigation bars and modals additionally use glassmorphism: semi-transparent surface fill at 80–85% opacity with 12–20px backdrop blur.

## Components

- **Buttons**: Three variants. Primary: 135° gradient from #785252 to #fecbcb, white text, 24px corner radius. Secondary: surface-container-highest fill, primary-colored text, no border, 24px radius. Tertiary: text-only with 2px underline in primary-fixed-dim, no background.
- **Inputs**: surface-container-low background, 16px corner radius (radius/DEFAULT). On focus, background shifts to surface-container-lowest and a Ghost Border appears (outline-variant at 10% opacity). Floating label in primary color above the input value.
- **Cards**: 32px corner radius (radius/lg) for a "framed portrait" feel. White fill on ivory background creates lift without explicit shadow. Use elevation/md shadow for floating cards. No dividers between stacked cards — use 24–32px vertical white space instead.
- **RSVP Toggle**: Segment control, 24px corner radius. Active segment uses secondary-container fill with on-surface text. Inactive segment uses surface-container-low fill with on-surface-variant text.
- **Navigation Bar**: Pill-shaped (fully rounded), glassmorphism fill (surface at ~82% opacity + 16px blur), elevation/sm shadow. Brand name in Noto Serif, nav links in Plus Jakarta Sans.
- **Lists**: No horizontal dividers between items. Separate content with 24–32px vertical spacing or alternating surface/surface-container-low row backgrounds.

## Do's and Don'ts
- Do embrace white space — if a screen feels crowded, double the padding
- Do use radius/md (24px) or radius/lg (32px) for containers; sharp corners break the soft aesthetic
- Do mix type scales dramatically (display/lg hero next to label/sm subheader) for editorial tension
- Do let decorative elements (blush circles, floral SVGs) break container bounds into the gutter
- Do use on-surface (#2e2f2d) for all text — never pure black on pastel backgrounds
- Don't use 1px borders to separate sections — use background color shifts instead
- Don't use dividers between list items — use vertical white space only
- Don't use small, dark, "muddy" drop shadows — ambient glows only
- Don't hardcode colors — always reference design tokens
- Don't use more than two typefaces; the Noto Serif / Plus Jakarta Sans pairing is fixed
