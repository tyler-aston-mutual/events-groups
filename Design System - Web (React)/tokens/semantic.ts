/**
 * Semantic color tokens - derived from theme colors
 * Matches SemanticColors.swift exactly
 */

import type { ThemeColors } from './colors';

// ─── Button Colors ─────────────────────────────────────────────────
export interface ButtonColors {
  background: string;
  foreground: string;
  pressedBackground: string;
  disabledBackground: string;
  disabledForeground: string;
}

export function getButtonPrimary(t: ThemeColors): ButtonColors {
  // For Tonite, primary buttons are gold with dark text
  const isTonite = t.appName === 'ToNite';
  return {
    background: isTonite ? t.brandPrimary : t.brandAccent5,
    foreground: isTonite ? t.constantBlack : t.constantWhite,
    pressedBackground: (isTonite ? t.brandPrimary : t.brandAccent5) + 'CC',
    disabledBackground: t.grey200,
    disabledForeground: t.grey400,
  };
}

export function getButtonSecondary(t: ThemeColors): ButtonColors {
  return {
    background: t.brandSecondary,
    foreground: t.isDarkMode ? t.constantWhite : t.grey900,
    pressedBackground: t.brandSecondary + 'CC',
    disabledBackground: t.grey100,
    disabledForeground: t.grey400,
  };
}

export function getButtonTertiary(t: ThemeColors): ButtonColors {
  return {
    background: 'transparent',
    foreground: t.brandPrimary,
    pressedBackground: t.brandPrimary + '1A', // 0.1 opacity
    disabledBackground: 'transparent',
    disabledForeground: t.grey400,
  };
}

export function getButtonDestructive(t: ThemeColors): ButtonColors {
  return {
    background: t.indicatorError,
    foreground: t.constantWhite,
    pressedBackground: t.indicatorError + 'CC',
    disabledBackground: t.grey200,
    disabledForeground: t.grey400,
  };
}

// ─── Text Colors ───────────────────────────────────────────────────
export interface TextColors {
  primary: string;
  secondary: string;
  tertiary: string;
  disabled: string;
  inverse: string;
  link: string;
  error: string;
  success: string;
}

export function getTextColors(t: ThemeColors): TextColors {
  return {
    primary: t.grey900,
    secondary: t.grey600,
    tertiary: t.textTertiary,
    disabled: t.textDisabled,
    inverse: t.constantWhite,
    link: t.brandPrimary,
    error: t.indicatorError,
    success: t.indicatorSuccess,
  };
}

// ─── Surface Colors ────────────────────────────────────────────────
export interface SurfaceColors {
  base: string;
  elevated: string;
  sunken: string;
  overlay: string;
  scrim: string;
}

export function getSurfaces(t: ThemeColors): SurfaceColors {
  return {
    base: t.grey0,
    elevated: t.isDarkMode ? t.grey50 : t.constantWhite,
    sunken: t.grey50,
    overlay: t.isDarkMode ? t.grey100 : t.constantWhite,
    scrim: t.constantBlack + 'A6', // 0.65 opacity
  };
}

// ─── Border Colors ─────────────────────────────────────────────────
export interface BorderColors {
  default: string;
  strong: string;
  subtle: string;
  focus: string;
}

export function getBorders(t: ThemeColors): BorderColors {
  return {
    default: t.grey200,    // strokeBase
    strong: t.grey600,     // strokeDark
    subtle: t.grey50,      // strokeLight
    focus: t.brandPrimary,
  };
}

// ─── Status Colors ─────────────────────────────────────────────────
export interface StatusColors {
  info: string;
  infoSubtle: string;
  success: string;
  successSubtle: string;
  warning: string;
  warningSubtle: string;
  error: string;
  errorSubtle: string;
}

export function getStatus(t: ThemeColors): StatusColors {
  return {
    info: t.indicatorInfo,
    infoSubtle: t.indicatorInfo + '26', // 0.15 opacity
    success: t.indicatorSuccess,
    successSubtle: t.indicatorSuccess + '26',
    warning: t.indicatorAlert,
    warningSubtle: t.indicatorAlert + '26',
    error: t.indicatorError,
    errorSubtle: t.indicatorError + '26',
  };
}

// ─── Stroke Colors ─────────────────────────────────────────────────
export interface StrokeColors {
  dark: string;
  medium: string;
  base: string;
  light: string;
  outline: string;
}

export function getStrokes(t: ThemeColors): StrokeColors {
  return {
    dark: t.grey600,
    medium: t.grey400,
    base: t.grey200,
    light: t.grey50,
    outline: t.isDarkMode ? t.grey1000 : t.grey0,
  };
}
