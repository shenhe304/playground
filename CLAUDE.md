# Design System: The Ethereal Archive

See DESIGN.md for all design tokens and design system specifications.
Always use these tokens. Never hardcode colors.

---

## 1. Overview & Creative North Star: "The Digital Heirloom"

This design system moves away from the transactional nature of utility apps and positions itself as a digital keepsake. The Creative North Star is **The Digital Heirloom**—an editorial-first experience that mimics the tactile, layered feeling of high-end stationery.

By breaking away from rigid, boxy grids, we embrace **Intentional Asymmetry**. Layouts should feel organic, using overlapping elements and expansive white space to evoke a sense of "air." We are not just building an interface; we are curating a gallery of moments. The goal is to make every screen feel "Instagram-worthy" through sophisticated tonal layering and a rejection of traditional UI boundaries.

---

## 2. Colors & The Surface Manifesto

The palette is a sophisticated blend of warm ivories, muted pastels, and earthy terracottas. It is designed to feel warm and human, rather than clinical.

### The "No-Line" Rule
**Traditional 1px borders are strictly prohibited.** To define sections, use background color shifts. For example, a `surface-container-low` section should sit against a `surface` background. This creates a soft, "molded" look rather than a segmented one.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—stacked sheets of fine paper.
- **Base Layer:** `surface` (#f7f6f3)
- **Primary Content Area:** `surface-container-low` (#f1f1ee)
- **Floating High-Priority Elements:** `surface-container-lowest` (#ffffff)
- **Interactive Depth:** Use `surface-container-highest` (#ddddd9) for subtle recessed states or depth-of-field effects.

### The Glass & Gradient Rule
To achieve a "light and airy" feel, floating elements (like navigation bars or modals) must use **Glassmorphism**. Apply a semi-transparent `surface` color with a `backdrop-blur` of 12px–20px.

**Signature Textures:** For primary CTAs, use a subtle linear gradient from `primary` (#785252) to `primary-container` (#fecbcb) at a 135-degree angle. This provides a "glow" that flat hex codes cannot replicate.

---

## 3. Typography: The Editorial Contrast

We use a high-contrast pairing to balance romance with modern legibility.

- **The Serif (Noto Serif):** Used for `display` and `headline` scales. Carries the emotional weight. Use for names, dates, and celebratory headers. Should feel grand and intentional.
- **The Sans (Plus Jakarta Sans):** Used for `title`, `body`, and `label` scales. Provides a modern, clean counterpoint to the serif. Ensures logistical details (locations, RSVPs) remain highly legible.

**Pro-Tip:** Use `display-lg` for hero typography with a slightly tighter letter-spacing (−2%) to give it a custom, high-end editorial feel.

---

## 4. Elevation & Depth: Tonal Layering

We do not use shadows to represent "height" in a generic way. We use them to represent "light."

- **The Layering Principle:** Depth is achieved by stacking. A `surface-container-lowest` card placed on a `surface-container` background creates a natural lift.
- **Ambient Shadows:** When a float is required, use a shadow with a 40px–60px blur and 4%–6% opacity. The shadow color must be a tinted version of `on-surface` (#2e2f2d), never pure black.
- **The "Ghost Border" Fallback:** If a container needs more definition, use `outline-variant` (#adadab) at **10% opacity**. It should be felt, not seen.

---

## 5. Components

### Buttons
- **Primary:** Gradient fill (`primary` → `primary-container`), `on-primary` text, `md` (1.5rem) corner radius.
- **Secondary:** `surface-container-highest` background with `primary` text. No border.
- **Tertiary:** Text-only with `label-md` styling and a 2px underline in `primary_fixed_dim`.

### Input Fields
- **Styling:** Soft `surface-container-low` backgrounds.
- **States:** On focus, transition the background to `surface-container-lowest` and add a "Ghost Border."
- **Corner Radius:** Always use `DEFAULT` (1rem) for inputs to maintain the soft aesthetic.

### Cards & Lists
- **The "No-Divider" Rule:** Forbid horizontal lines between list items. Use vertical white space (24px–32px) or alternating subtle background shifts (`surface` to `surface-container-low`) to separate content.
- **Imagery:** Cards containing photos should use the `lg` (2rem) corner radius to create a "framed" portrait look.

### Specialized Components: "The Invitation Suite"
- **RSVP Toggle:** A custom-styled segment control using `secondary-container` for the active state and `md` corner radius.
- **Floral Overlays:** Decorative SVG elements that break the container bounds, overlapping from the edge of a card into the gutter to emphasize the "non-grid" feel.

---

## 6. Do's and Don'ts

### Do
- **Embrace White Space:** If a screen feels crowded, double the padding. This system thrives on "breathing room."
- **Use Large Radii:** Stick to `md` (1.5rem) and `lg` (2rem) for containers. Sharp corners break the "soft and airy" promise.
- **Mix Type Sizes:** Use a massive `display-lg` header next to a tiny `label-sm` subheader for high-end visual interest.

### Don't
- **Don't use 100% Black:** Always use `on-surface` (#2e2f2d) for text. Pure black is too harsh for pastel palettes.
- **Don't use Dividers:** Never use a solid 1px line to separate content. It kills the "organic" flow.
- **Don't use Standard Shadows:** Avoid small, dark, "muddy" shadows. If the shadow looks like a "glow," you're doing it right.
