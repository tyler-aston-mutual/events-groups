/**
 * Spacing, padding, radius, icon sizes, blur, and opacity tokens
 * Converted from Spacing.swift - shared across all themes
 */

// ─── Spacing (gap between elements) ────────────────────────────────
export const spacing = {
  xs: 4,
  s: 8,
  base: 12,
  m: 16,
  l: 20,
  xl: 24,
  xxl: 30,
  xxxl: 50,
  xxxxl: 80,
} as const;

// ─── Padding (internal element padding) ────────────────────────────
export const padding = {
  xsmall: 8,
  small: 12,
  base: 16,
  medium: 24,
  large: 30,
  xlarge: 50,
  xxlarge: 80,
} as const;

// ─── Corner Radius ─────────────────────────────────────────────────
export const radius = {
  small: 12,
  medium: 16,
  large: 20,
  xl: 24,
  round: 100,
} as const;

// ─── Icon Sizes ────────────────────────────────────────────────────
export const iconSize = {
  s: 16,
  base: 20,
  m: 30,
  l: 40,
  xl: 60,
} as const;

// ─── Blur Radius ───────────────────────────────────────────────────
export const blur = {
  light: 8,
  base: 12,
  heavy: 20,
} as const;

// ─── Opacity ───────────────────────────────────────────────────────
export const opacity = {
  full: 1.0,
  scrim: 0.65,
  fade: 0.4,
  light: 0.15,
} as const;
