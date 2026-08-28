---
name: Argentine Heritage & Modernity
colors:
  surface: '#fff8f5'
  surface-dim: '#dfd9d6'
  surface-bright: '#fff8f5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f9f2f0'
  surface-container: '#f3ecea'
  surface-container-high: '#eee7e4'
  surface-container-highest: '#e8e1df'
  on-surface: '#1d1b1a'
  on-surface-variant: '#4f453f'
  inverse-surface: '#33302e'
  inverse-on-surface: '#f6efed'
  outline: '#81756e'
  outline-variant: '#d2c4bc'
  surface-tint: '#705a4c'
  primary: '#26170c'
  on-primary: '#ffffff'
  primary-container: '#3d2b1f'
  on-primary-container: '#ac9181'
  inverse-primary: '#dec1af'
  secondary: '#605e5b'
  on-secondary: '#ffffff'
  secondary-container: '#e6e2dd'
  on-secondary-container: '#666460'
  tertiary: '#181c0d'
  on-tertiary: '#ffffff'
  tertiary-container: '#2c3120'
  on-tertiary-container: '#949983'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#fbddca'
  primary-fixed-dim: '#dec1af'
  on-primary-fixed: '#28180d'
  on-primary-fixed-variant: '#574335'
  secondary-fixed: '#e6e2dd'
  secondary-fixed-dim: '#c9c6c1'
  on-secondary-fixed: '#1c1c19'
  on-secondary-fixed-variant: '#484743'
  tertiary-fixed: '#e0e5cc'
  tertiary-fixed-dim: '#c4c9b1'
  on-tertiary-fixed: '#191d0e'
  on-tertiary-fixed-variant: '#444937'
  background: '#fff8f5'
  on-background: '#1d1b1a'
  surface-variant: '#e8e1df'
typography:
  headline-display:
    fontFamily: Poiret One
    fontSize: 80px
    fontWeight: '400'
    lineHeight: 88px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Poiret One
    fontSize: 48px
    fontWeight: '400'
    lineHeight: 56px
  headline-lg-mobile:
    fontFamily: Poiret One
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 40px
  headline-md:
    fontFamily: Poiret One
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 40px
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  gutter: 24px
  margin-desktop: 64px
  margin-tablet: 32px
  margin-mobile: 20px
  section-gap: 128px
---

## Brand & Style

The design system is built on a narrative of "Contemporary Craft"—merging the rugged, artisanal heritage of Argentina with a refined, modern luxury aesthetic. The brand personality is authoritative yet welcoming, professional yet deeply rooted in the tactile warmth of natural materials.

The style is a blend of **Minimalism** and **Modern Corporate**, focusing on high-quality editorial layouts that allow photography to lead. It prioritizes clarity, generous whitespace, and a sophisticated rhythm that evokes the calm of a premium interior space. The target audience is discerning, valuing quality over quantity and seeking pieces that represent a legacy of craftsmanship.

- **Minimalism:** Use whitespace to frame content, treating every product shot as a gallery piece.
- **Warmth:** Avoid clinical whites; use soft creams and wood-toned neutrals to create a lived-in luxury feel.
- **Professionalism:** Precise grid alignments and systematic typography scales ensure the brand feels established and reliable.

## Colors

The palette is derived from the Argentine landscape and the workshop floor. The primary color is a deep Walnut Brown, used for text and structural elements to provide a softer, more organic contrast than pure black.

- **Primary (Walnut):** `#3D2B1F` - Used for primary headings and key UI anchors.
- **Secondary (Soft Cream):** `#F9F5F0` - The default background color, providing a warm, parchment-like canvas.
- **Tertiary (Sage):** `#6B705C` - A muted, natural green used for subtle highlights and status indicators.
- **Neutral:** The neutral scale is derived from the primary seed to maintain warmth in the grays.

The default mode is `light`, emphasizing a bright, airy architectural feel.

## Typography

The typography strategy pairs ethereal, geometric elegance with functional clarity.

**Poiret One** is the voice of the brand. Its light, art-deco inspired strokes and geometric forms provide a modern, "boutique" feel that contrasts beautifully with the rugged heritage materials. Use it for all large headlines and "hero" moments.

**Manrope** provides a clean, modern, and highly legible counterpoint. Its geometric yet friendly curves ensure that technical specifications and body copy remain accessible and professional.

- **Display & Headlines:** Always Poiret One. Given its light weight, ensure high contrast against backgrounds to maintain legibility.
- **Body & Captions:** Always Manrope. Ensure line heights are generous (1.5x minimum) to support the minimalist aesthetic.
- **Labels:** Use Manrope in all-caps with increased letter-spacing for navigation and metadata to create a "gallery label" feel.

## Layout & Spacing

The layout utilizes a **Fixed Grid** model (centered, 1280px max-width) to maintain the "luxury boutique" feel. This prevents content from becoming overly stretched on ultra-wide monitors, preserving the intended editorial composition.

- **Desktop (1200px+):** 12-column grid, 24px gutters, 64px outer margins.
- **Tablet (768px - 1199px):** 8-column grid, 24px gutters, 32px outer margins.
- **Mobile (<768px):** 4-column grid, 16px gutters, 20px outer margins.

**Spacing Philosophy:** Use "generous breathing room." Section gaps should be substantial (128px+) to allow the eye to rest between different furniture collections. Use asymmetrical layouts to create a dynamic, editorial rhythm.

## Elevation & Depth

To maintain a premium, tactile feel, this design system avoids heavy drop shadows in favor of **Tonal Layers** and **Subtle Outlines**.

- **Surface Tiers:** Use the Secondary (Cream) color for the base. Use a pure white or a slightly lighter cream for elevated cards and modals to create a "stacked paper" effect.
- **Ghost Outlines:** Instead of shadows, use 1px solid borders in a very light version of the primary Walnut (`#3D2B1F` at 10% opacity) to define boundaries.
- **Soft Ambient Shadows:** Reserved exclusively for floating elements like dropdown menus or primary CTA buttons on hover. Shadows should be highly diffused, using a tint of the Primary color rather than pure black.

## Shapes

The shape language reflects the precision of high-end joinery. While the brand is warm, it is also professional and structured.

- **Base Corner Radius:** 4px (`rounded-sm`). This provides a hint of softness without losing the "architectural" edge.
- **Large Containers:** Image cards and hero sections should maintain this 4px radius to feel like framed portraits.
- **Interactive Elements:** Buttons follow the 4px rule. Avoid pill shapes; the rectangularity reinforces the structural nature of furniture design.

## Components

### Buttons
- **Primary:** Solid Walnut (`#3D2B1F`) background with Cream text. Rectangular with 4px radius. 
- **Secondary:** Transparent background with a 1px Walnut border. 
- **Hover State:** Subtle lift (2px) and a color shift for a touch of warmth.

### Image Containers
- Images are the primary "content." They should always be high-resolution and feature a subtle zoom-on-hover effect within their 4px rounded frames.
- Aspect ratios should be consistent (e.g., 4:5 for product portraits, 16:9 for lifestyle interiors).

### Input Fields & Controls
- **Fields:** Bottom-border only or very light 1px outlines. Focus state uses a slightly thicker Walnut bottom border.
- **Checkboxes/Radios:** Square with sharp-ish corners, using the Walnut color for the active state.

### Cards
- No heavy shadows. Use a subtle background color shift (e.g., a 2% darker cream) or a thin 1px border to distinguish from the background.
- Typography within cards should be strictly hierarchical: Poiret One for the product name, Manrope for price and specs.

### Navigation
- Minimalist top bar. High letter-spaced Manrope labels. On scroll, the bar becomes semi-transparent cream with a background-blur (glassmorphism) to maintain legibility over images.