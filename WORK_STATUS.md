# Work Status

## Current State
Project scaffolded and live. No screens built yet — waiting on Figma designs and interview task definition.

## Live URL
https://tyler-aston-mutual.github.io/events-groups/

## Screens
| Screen | Status | Notes |
|--------|--------|-------|
| Home | Placeholder | Just a heading, no real content |

## Decisions Made
- **HashRouter** over BrowserRouter — GitHub Pages has no server-side routing, hash-based URLs work without config
- **Tailwind v3** — more stable than v4 for a quick prototype build
- **Hardcoded data** — no backend needed, all content will be faked for interviews
- **`max-w-sm mx-auto`** on root — constrains layout to phone width even if opened on desktop

## What's Fake vs Real
- Everything is fake at this stage

## Next Up
- Share Figma designs
- Define interview tasks / flows to prototype
- Build design system tokens into Tailwind config
- Build first screen
