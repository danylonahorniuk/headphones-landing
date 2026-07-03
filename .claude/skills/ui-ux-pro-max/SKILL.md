# UI/UX Pro Max - Comprehensive Design Intelligence Skill

## Overview

This is a complete design system skill providing "50+ styles, 161 color palettes, 57 font pairings, 161 product types with reasoning rules, 99 UX guidelines, and 25 chart types across 10 technology stacks."

## Core Decision Framework

The skill organizes design guidance into **10 priority-ranked rule categories**:

1. **Accessibility** (CRITICAL) — contrast, focus states, alt text, keyboard navigation
2. **Touch & Interaction** (CRITICAL) — 44×44px targets, spacing, loading feedback
3. **Performance** (HIGH) — image optimization, font loading, layout shift prevention
4. **Style Selection** (HIGH) — matching design patterns to product type
5. **Layout & Responsive** (HIGH) — mobile-first, breakpoints, no horizontal scroll
6. **Typography & Color** (MEDIUM) — readable scales, semantic tokens, dark mode parity
7. **Animation** (MEDIUM) — 150–300ms timing, transform-only, respecting reduced-motion
8. **Forms & Feedback** (MEDIUM) — visible labels, error placement, progressive disclosure
9. **Navigation Patterns** (HIGH) — bottom nav limits, back behavior, deep linking
10. **Charts & Data** (LOW) — accessible colors, tooltips, responsive charts

## Workflow (4 Steps)

**Step 1:** Analyze requirements (product type, audience, style keywords, stack)
**Step 2:** Run `--design-system` to get complete recommendations with reasoning
**Step 2b/c:** Optionally persist design system to files or adjust with "design dials" (variance, motion, density)
**Step 3:** Supplement with detailed `--domain` searches as needed
**Step 4:** Apply stack-specific guidelines using `--stack`

## Key Usage Pattern

```bash
python3 skills/ui-ux-pro-max/scripts/search.py "<query>" --design-system -p "Project Name"
```

This returns a full design system covering pattern, style, colors, typography, effects, and anti-patterns in one command.

## Professional UI Checklist Highlights

- **No emoji as icons** — use SVG (Lucide, react-native-vector-icons)
- **Tap feedback within 80–150ms** with ripple or opacity shift
- **Touch targets ≥44×44pt** (iOS) or ≥48×48dp (Android)
- **Contrast ≥4.5:1** for text in both light and dark modes independently tested
- **Safe area compliance** — respect notches, status bars, gesture areas
- **8dp spacing rhythm** throughout layout

## Available Domains & Stacks

**Domains:** product, style, typography, color, landing, chart, ux, gsap, google-fonts, react, web, prompt
**Stacks:** React, Next.js, Vue, Svelte, Astro, shadcn/ui, SwiftUI, Flutter, React Native, and others

The skill emphasizes that "if the task will change how a feature looks, feels, moves, or is interacted with," this guidance should be applied.
