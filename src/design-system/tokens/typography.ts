/**
 * Typography system converted from Typography.swift
 * Font families per brand + type scale
 */

export type AppBrand = 'mutual' | 'ark' | 'tonite';

// ─── Font Family Definitions ───────────────────────────────────────

export interface FontFamilyWeights {
  thin?: string;
  light?: string;
  regular: string;
  medium?: string;
  semibold?: string;
  bold?: string;
  black?: string;
  italic?: string;
  mediumItalic?: string;
  boldItalic?: string;
}

// Goldman Sans - Mutual Primary
const goldmanSans: FontFamilyWeights = {
  thin: "'Goldman Sans Thin', 'Goldman Sans', sans-serif",
  light: "'Goldman Sans Light', 'Goldman Sans', sans-serif",
  regular: "'Goldman Sans', sans-serif",
  medium: "'Goldman Sans Medium', 'Goldman Sans', sans-serif",
  bold: "'Goldman Sans Bold', 'Goldman Sans', sans-serif",
  black: "'Goldman Sans Black', 'Goldman Sans', sans-serif",
  italic: "'Goldman Sans Italic', 'Goldman Sans', sans-serif",
  mediumItalic: "'Goldman Sans Medium Italic', 'Goldman Sans', sans-serif",
  boldItalic: "'Goldman Sans Bold Italic', 'Goldman Sans', sans-serif",
};

// Gramatika - Mutual Secondary
const gramatika: FontFamilyWeights = {
  regular: "'Gramatika Black', 'Gramatika', serif",
  bold: "'Gramatika Black', 'Gramatika', serif",
  black: "'Gramatika Black', 'Gramatika', serif",
};

// DM Sans - Ark Primary
const dmSans: FontFamilyWeights = {
  light: "'DM Sans Light', 'DM Sans', sans-serif",
  regular: "'DM Sans', sans-serif",
  medium: "'DM Sans Medium', 'DM Sans', sans-serif",
  semibold: "'DM Sans SemiBold', 'DM Sans', sans-serif",
  bold: "'DM Sans Bold', 'DM Sans', sans-serif",
  italic: "'DM Sans Italic', 'DM Sans', sans-serif",
};

// DM Serif Display - Ark Secondary
const dmSerifDisplay: FontFamilyWeights = {
  regular: "'DM Serif Display', serif",
  italic: "'DM Serif Display Italic', 'DM Serif Display', serif",
};

// Inter / System Sans - Tonite Primary (clean, modern geometric sans)
const systemSans: FontFamilyWeights = {
  thin: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  light: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  regular: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  medium: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  semibold: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  bold: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  black: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  italic: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  mediumItalic: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  boldItalic: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
};

// Tonite Display - clean serif for secondary/display headings
const toniteDisplay: FontFamilyWeights = {
  regular: "'DM Serif Display', Georgia, 'Times New Roman', serif",
  italic: "'DM Serif Display Italic', 'DM Serif Display', Georgia, serif",
};

export function getPrimaryFont(brand: AppBrand): FontFamilyWeights {
  if (brand === 'tonite') return systemSans;
  return brand === 'mutual' ? goldmanSans : dmSans;
}

export function getSecondaryFont(brand: AppBrand): FontFamilyWeights {
  if (brand === 'tonite') return toniteDisplay;
  return brand === 'mutual' ? gramatika : dmSerifDisplay;
}

// ─── Typography Scale ──────────────────────────────────────────────

export type TypographyStyle =
  | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'h7'
  | 'secondaryTitle'
  | 'bodyLarge' | 'bodyMedium' | 'bodyBase' | 'bodySmall'
  | 'buttonLarge' | 'buttonSmall';

export interface TypographyDef {
  fontSize: number;
  lineHeight: number;
  fontWeight: number;
  usesSecondaryFont: boolean;
}

export const typographyScale: Record<TypographyStyle, TypographyDef> = {
  h1:             { fontSize: 44, lineHeight: 48, fontWeight: 700, usesSecondaryFont: false },
  h2:             { fontSize: 32, lineHeight: 36, fontWeight: 700, usesSecondaryFont: false },
  h3:             { fontSize: 24, lineHeight: 28, fontWeight: 700, usesSecondaryFont: false },
  h4:             { fontSize: 20, lineHeight: 26, fontWeight: 700, usesSecondaryFont: false },
  h5:             { fontSize: 16, lineHeight: 20, fontWeight: 500, usesSecondaryFont: false },
  h6:             { fontSize: 14, lineHeight: 18, fontWeight: 500, usesSecondaryFont: false },
  h7:             { fontSize: 12, lineHeight: 16, fontWeight: 500, usesSecondaryFont: false },
  secondaryTitle: { fontSize: 32, lineHeight: 36, fontWeight: 400, usesSecondaryFont: true },
  bodyLarge:      { fontSize: 20, lineHeight: 22, fontWeight: 400, usesSecondaryFont: false },
  bodyMedium:     { fontSize: 18, lineHeight: 20, fontWeight: 400, usesSecondaryFont: false },
  bodyBase:       { fontSize: 16, lineHeight: 18, fontWeight: 400, usesSecondaryFont: false },
  bodySmall:      { fontSize: 13, lineHeight: 14, fontWeight: 400, usesSecondaryFont: false },
  buttonLarge:    { fontSize: 16, lineHeight: 16, fontWeight: 500, usesSecondaryFont: false },
  buttonSmall:    { fontSize: 14, lineHeight: 13, fontWeight: 500, usesSecondaryFont: false },
};

/** Map numeric font-weight to the correct font-family string for a given brand */
export function getFontFamily(
  brand: AppBrand,
  weight: number,
  usesSecondaryFont: boolean,
  italic = false,
): string {
  const family = usesSecondaryFont ? getSecondaryFont(brand) : getPrimaryFont(brand);

  if (italic) {
    if (weight >= 700) return family.boldItalic ?? family.italic ?? family.regular;
    if (weight >= 500) return family.mediumItalic ?? family.italic ?? family.regular;
    return family.italic ?? family.regular;
  }

  if (weight >= 900) return family.black ?? family.bold ?? family.regular;
  if (weight >= 700) return family.bold ?? family.semibold ?? family.medium ?? family.regular;
  if (weight >= 600) return family.semibold ?? family.bold ?? family.medium ?? family.regular;
  if (weight >= 500) return family.medium ?? family.regular;
  if (weight >= 300) return family.light ?? family.regular;
  if (weight >= 100) return family.thin ?? family.light ?? family.regular;
  return family.regular;
}
