# CLAUDE.md

## Project
Wedding invitation mini-app for a Medium article.
Comparing output quality across Stitch / Lovable / Claude Code using the same DESIGN.md.

## Design System
See DESIGN.md for all design decisions.
Always read it before writing any styles.
Never hardcode colors, fonts, spacing, or border-radius.

## Rules
- All colors must reference CSS variables mapped from DESIGN.md tokens
- Mobile-first. Base layout at 375px
- Noto Serif for headlines and names only. Plus Jakarta Sans for everything else
- Generous white space — when in doubt, add more padding
- No 1px dividers. No pure black. No sharp corners

## Stack
- React + TypeScript
- Tailwind CSS

## Scope
- Template selection screen
- Customization panel (names, date, venue, photo upload)
- Invitation preview
- RSVP form
