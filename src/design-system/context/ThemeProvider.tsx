/**
 * ThemeProvider - React context equivalent of ThemeManager.swift
 * Provides brand (mutual/ark/tonite) and color mode (light/dark) switching
 * Tonite defaults to dark mode
 */

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import {
  mutualLight, mutualDark, arkLight, arkDark, toniteDark, toniteLight,
  type ThemeColors,
} from '../tokens/colors';
import {
  getButtonPrimary, getButtonSecondary, getButtonTertiary, getButtonDestructive,
  getTextColors, getSurfaces, getBorders, getStatus, getStrokes,
  type ButtonColors, type TextColors, type SurfaceColors,
  type BorderColors, type StatusColors, type StrokeColors,
} from '../tokens/semantic';
import type { AppBrand } from '../tokens/typography';

export type ColorMode = 'light' | 'dark';

// ─── Semantic Tokens (derived from theme) ──────────────────────────
export interface SemanticTokens {
  buttonPrimary: ButtonColors;
  buttonSecondary: ButtonColors;
  buttonTertiary: ButtonColors;
  buttonDestructive: ButtonColors;
  text: TextColors;
  surfaces: SurfaceColors;
  borders: BorderColors;
  status: StatusColors;
  strokes: StrokeColors;
}

function deriveSemanticTokens(colors: ThemeColors): SemanticTokens {
  return {
    buttonPrimary: getButtonPrimary(colors),
    buttonSecondary: getButtonSecondary(colors),
    buttonTertiary: getButtonTertiary(colors),
    buttonDestructive: getButtonDestructive(colors),
    text: getTextColors(colors),
    surfaces: getSurfaces(colors),
    borders: getBorders(colors),
    status: getStatus(colors),
    strokes: getStrokes(colors),
  };
}

// ─── Theme Context ─────────────────────────────────────────────────
interface ThemeContextValue {
  brand: AppBrand;
  colorMode: ColorMode;
  colors: ThemeColors;
  semantic: SemanticTokens;
  setBrand: (brand: AppBrand) => void;
  setColorMode: (mode: ColorMode) => void;
  toggleColorMode: () => void;
  toggleBrand: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getThemeColors(brand: AppBrand, mode: ColorMode): ThemeColors {
  if (brand === 'tonite') return mode === 'light' ? toniteLight : toniteDark;
  if (brand === 'mutual') return mode === 'light' ? mutualLight : mutualDark;
  return mode === 'light' ? arkLight : arkDark;
}

// ─── Provider ──────────────────────────────────────────────────────
interface ThemeProviderProps {
  children: ReactNode;
  defaultBrand?: AppBrand;
  defaultColorMode?: ColorMode;
  followSystem?: boolean;
}

export function ThemeProvider({
  children,
  defaultBrand = 'tonite',
  defaultColorMode = 'dark',
  followSystem = false,
}: ThemeProviderProps) {
  const [brand, setBrand] = useState<AppBrand>(defaultBrand);
  const [colorMode, setColorMode] = useState<ColorMode>(defaultColorMode);

  // Follow system dark mode preference
  useEffect(() => {
    if (!followSystem) return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    setColorMode(mq.matches ? 'dark' : 'light');
    const handler = (e: MediaQueryListEvent) => setColorMode(e.matches ? 'dark' : 'light');
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [followSystem]);

  const colors = getThemeColors(brand, colorMode);
  const semantic = deriveSemanticTokens(colors);

  const toggleColorMode = useCallback(() => {
    setColorMode(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  const toggleBrand = useCallback(() => {
    setBrand(prev => {
      if (prev === 'tonite') return 'mutual';
      if (prev === 'mutual') return 'ark';
      return 'tonite';
    });
  }, []);

  // Apply CSS custom properties to :root for global access
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-brand-primary', colors.brandPrimary);
    root.style.setProperty('--color-brand-secondary', colors.brandSecondary);
    root.style.setProperty('--color-accent-1', colors.brandAccent1);
    root.style.setProperty('--color-accent-5', colors.brandAccent5);
    root.style.setProperty('--color-grey-0', colors.grey0);
    root.style.setProperty('--color-grey-50', colors.grey50);
    root.style.setProperty('--color-grey-100', colors.grey100);
    root.style.setProperty('--color-grey-900', colors.grey900);
    root.style.setProperty('--color-surface-base', semantic.surfaces.base);
    root.style.setProperty('--color-text-primary', semantic.text.primary);
    root.style.setProperty('--color-text-secondary', semantic.text.secondary);

    // Set background and text color on body
    root.style.backgroundColor = semantic.surfaces.base;
    root.style.color = semantic.text.primary;

    // Set primary font family based on brand
    const primaryFont = brand === 'tonite'
      ? "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
      : brand === 'mutual'
      ? "'Goldman Sans', sans-serif"
      : "'DM Sans', sans-serif";
    root.style.setProperty('--font-primary', primaryFont);
    root.style.fontFamily = primaryFont;
  }, [colors, semantic, brand]);

  return (
    <ThemeContext.Provider value={{
      brand, colorMode, colors, semantic,
      setBrand, setColorMode, toggleColorMode, toggleBrand,
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

// ─── Hook ──────────────────────────────────────────────────────────
export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within <ThemeProvider>');
  return ctx;
}
