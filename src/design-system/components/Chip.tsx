/**
 * Chip - Converted from Chip.swift
 * Themed chip for tags, traits, and callouts with 8 variants
 */

import type { ReactNode } from 'react';
import { useTheme } from '../context/ThemeProvider';
import { typographyScale, getFontFamily } from '../tokens/typography';
import { radius as radiusTokens } from '../tokens/spacing';

// ─── Types ─────────────────────────────────────────────────────────

export type ChipVariant =
  | 'primary'
  | 'light'
  | 'dark'
  | 'accent1'
  | 'accent5'
  | 'constantPrimary'
  | 'constantSecondary'
  | 'transparent';

export type ChipSize = 'regular' | 'compact';

interface ChipProps {
  text: string;
  variant?: ChipVariant;
  size?: ChipSize;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  fixedWidth?: number;
  outline?: 'none' | { type: 'solid'; color?: string } | { type: 'gradient'; colors: string[]; angle?: number };
  onClick?: () => void;
}

// ─── Size Config ───────────────────────────────────────────────────

const sizeConfig = {
  regular: { height: 30, typography: 'h6' as const, iconSize: 20, hPadding: 10 },
  compact: { height: 24, typography: 'h7' as const, iconSize: 16, hPadding: 8 },
};

// ─── Component ─────────────────────────────────────────────────────

export function Chip({
  text,
  variant = 'primary',
  size = 'regular',
  leadingIcon,
  trailingIcon,
  fixedWidth,
  outline = 'none',
  onClick,
}: ChipProps) {
  const { colors, brand } = useTheme();
  const config = sizeConfig[size];
  const typo = typographyScale[config.typography];
  const fontFamily = getFontFamily(brand, typo.fontWeight, false);
  const resolved = resolveColors(colors, variant);

  const borderStyle = outline === 'none'
    ? 'none'
    : outline.type === 'solid'
      ? `2px solid ${outline.color ?? 'rgba(255,255,255,0.3)'}`
      : 'none';

  const backgroundImage = outline !== 'none' && outline.type === 'gradient'
    ? `conic-gradient(from ${outline.angle ?? 0}deg, ${outline.colors.join(', ')})`
    : undefined;

  const containerStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    height: config.height,
    paddingLeft: config.hPadding,
    paddingRight: config.hPadding,
    borderRadius: radiusTokens.small,
    backgroundColor: variant === 'transparent' ? 'rgba(0,0,0,0.6)' : resolved.background,
    backdropFilter: variant === 'transparent' ? 'blur(8px)' : undefined,
    color: resolved.foreground,
    fontFamily,
    fontSize: typo.fontSize,
    lineHeight: `${typo.lineHeight}px`,
    fontWeight: typo.fontWeight,
    border: borderStyle,
    width: fixedWidth,
    maxWidth: fixedWidth ? undefined : 250,
    cursor: onClick ? 'pointer' : 'default',
    boxSizing: 'border-box',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    position: backgroundImage ? 'relative' : undefined,
  };

  return (
    <span style={containerStyle} onClick={onClick} role={onClick ? 'button' : undefined}>
      {leadingIcon && (
        <span style={{ display: 'flex', width: config.iconSize, height: config.iconSize, flexShrink: 0 }}>
          {leadingIcon}
        </span>
      )}

      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {text}
      </span>

      {fixedWidth && <span style={{ flex: 1 }} />}

      {trailingIcon && (
        <span style={{ display: 'flex', width: config.iconSize, height: config.iconSize, flexShrink: 0 }}>
          {trailingIcon}
        </span>
      )}
    </span>
  );
}

// ─── Color Resolution ──────────────────────────────────────────────

function resolveColors(
  t: typeof import('../tokens/colors').mutualLight,
  variant: ChipVariant,
) {
  switch (variant) {
    case 'primary':
      return { background: t.brandPrimary, foreground: t.constantWhite };
    case 'light':
      return { background: t.isDarkMode ? t.grey100 : t.grey50, foreground: t.grey600 };
    case 'dark':
      return { background: t.constantBlack, foreground: t.constantWhite };
    case 'accent1':
      return { background: t.brandAccent1, foreground: t.constantBlack };
    case 'accent5':
      return { background: t.brandAccent5, foreground: t.constantWhite };
    case 'constantPrimary':
      return { background: t.constantPrimary, foreground: t.constantWhite };
    case 'constantSecondary':
      return { background: t.constantSecondary, foreground: t.constantDarkGrey };
    case 'transparent':
      return { background: 'transparent', foreground: t.constantWhite };
  }
}

// ─── Chip Stack ────────────────────────────────────────────────────

interface ChipStackProps {
  children: ReactNode;
  gap?: number;
  maxWidth?: number;
}

export function ChipStack({ children, gap = 6, maxWidth }: ChipStackProps) {
  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap,
      maxWidth,
    }}>
      {children}
    </div>
  );
}
