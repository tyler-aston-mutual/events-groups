/**
 * ThemedButton - Converted from ThemedButton.swift
 * Supports fill, outline, and text styles with 8 color variants and 3 sizes
 */

import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import { useTheme } from '../context/ThemeProvider';
import { typographyScale, getFontFamily } from '../tokens/typography';
import { radius } from '../tokens/spacing';

// ─── Types ─────────────────────────────────────────────────────────

export type ButtonStyle = 'fill' | 'outline' | 'text';
export type ButtonColor = 'primary' | 'secondary' | 'white' | 'accent1' | 'accent5' | 'black' | 'destructive' | 'disabled';
export type ButtonSize = 'large' | 'medium' | 'small';
export type ButtonAlignment = 'center' | 'leading';

interface ThemedButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'style' | 'color'> {
  title: string;
  buttonStyle?: ButtonStyle;
  color?: ButtonColor;
  size?: ButtonSize;
  alignment?: ButtonAlignment;
  isFullWidth?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
}

// ─── Size Config ───────────────────────────────────────────────────

const sizeConfig = {
  large:  { height: 50, typography: 'buttonLarge' as const, iconSize: 20 },
  medium: { height: 40, typography: 'buttonLarge' as const, iconSize: 16 },
  small:  { height: 30, typography: 'buttonSmall' as const, iconSize: 14 },
};

// ─── Component ─────────────────────────────────────────────────────

export function ThemedButton({
  title,
  buttonStyle = 'fill',
  color = 'primary',
  size = 'large',
  alignment = 'center',
  isFullWidth = true,
  leadingIcon,
  trailingIcon,
  disabled,
  ...rest
}: ThemedButtonProps) {
  const { colors, brand } = useTheme();
  const config = sizeConfig[size];
  const typo = typographyScale[config.typography];
  const fontFamily = getFontFamily(brand, typo.fontWeight, false);

  const isDisabled = disabled || color === 'disabled';

  // Resolve colors
  const resolved = resolveColors(colors, color, buttonStyle, isDisabled);

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: alignment === 'center' ? 'center' : 'flex-start',
    gap: 8,
    height: config.height,
    width: isFullWidth ? '100%' : undefined,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: radius.medium,
    border: buttonStyle === 'outline' ? `2px solid ${resolved.border}` : 'none',
    backgroundColor: buttonStyle === 'fill' ? resolved.background : 'transparent',
    color: resolved.foreground,
    fontFamily,
    fontSize: typo.fontSize,
    lineHeight: `${typo.lineHeight}px`,
    fontWeight: typo.fontWeight,
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    opacity: isDisabled ? 1 : undefined,
    transition: 'opacity 0.1s ease-in-out',
    boxSizing: 'border-box',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  };

  return (
    <button
      disabled={isDisabled}
      style={containerStyle}
      onMouseDown={(e) => {
        (e.currentTarget as HTMLElement).style.opacity = '0.8';
      }}
      onMouseUp={(e) => {
        (e.currentTarget as HTMLElement).style.opacity = '1';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.opacity = '1';
      }}
      {...rest}
    >
      {alignment === 'center' && isFullWidth && <span style={{ flex: 1 }} />}

      {leadingIcon && (
        <span style={{ display: 'flex', width: config.iconSize, height: config.iconSize, flexShrink: 0 }}>
          {leadingIcon}
        </span>
      )}

      <span style={{
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        maxWidth: '100%',
        textAlign: alignment === 'center' ? 'center' : 'left',
      }}>
        {title}
      </span>

      {alignment === 'leading' && isFullWidth && <span style={{ flex: 1 }} />}

      {trailingIcon && (
        <span style={{ display: 'flex', width: config.iconSize, height: config.iconSize, flexShrink: 0 }}>
          {trailingIcon}
        </span>
      )}

      {alignment === 'center' && isFullWidth && <span style={{ flex: 1 }} />}
    </button>
  );
}

// ─── Color Resolution ──────────────────────────────────────────────

interface ResolvedColors {
  background: string;
  foreground: string;
  border: string;
}

function resolveColors(
  t: typeof import('../tokens/colors').mutualLight,
  color: ButtonColor,
  style: ButtonStyle,
  isDisabled: boolean,
): ResolvedColors {
  if (isDisabled) {
    return {
      background: style === 'fill' ? t.grey200 : 'transparent',
      foreground: t.grey400,
      border: t.grey200,
    };
  }

  switch (color) {
    case 'primary':
      return {
        background: t.brandPrimary,
        foreground: style === 'fill' ? t.constantWhite : t.brandPrimary,
        border: t.brandPrimary,
      };

    case 'secondary': {
      let fg: string;
      if (style === 'fill') {
        fg = t.isDarkMode ? t.constantWhite : t.grey900;
      } else {
        fg = t.isDarkMode ? t.grey400 : t.grey600;
      }
      return { background: t.brandSecondary, foreground: fg, border: t.brandSecondary };
    }

    case 'white':
      return { background: t.grey0, foreground: t.grey900, border: t.grey100 };

    case 'accent1': {
      let fg: string;
      if (style === 'fill') {
        fg = t.constantBlack;
      } else {
        fg = t.isDarkMode ? t.constantWhite : t.brandAccent1;
      }
      return { background: t.brandAccent1, foreground: fg, border: t.brandAccent1 };
    }

    case 'accent5':
      return {
        background: t.brandAccent5,
        foreground: style === 'fill' ? t.constantWhite : t.brandAccent5,
        border: t.brandAccent5,
      };

    case 'black': {
      let fg: string;
      if (style === 'fill') {
        fg = t.constantWhite;
      } else {
        fg = t.isDarkMode ? t.constantWhite : t.constantBlack;
      }
      return { background: t.constantBlack, foreground: fg, border: t.constantBlack };
    }

    case 'destructive':
      return {
        background: t.indicatorError,
        foreground: style === 'fill' ? t.constantWhite : t.indicatorError,
        border: t.indicatorError,
      };

    case 'disabled':
      return { background: t.grey200, foreground: t.grey400, border: t.grey200 };
  }
}

// ─── Convenience Factories ─────────────────────────────────────────

export function PrimaryButton(props: Omit<ThemedButtonProps, 'buttonStyle' | 'color'>) {
  return <ThemedButton {...props} buttonStyle="fill" color="accent5" />;
}

export function SecondaryButton(props: Omit<ThemedButtonProps, 'buttonStyle' | 'color'>) {
  return <ThemedButton {...props} buttonStyle="fill" color="secondary" />;
}

export function OutlineButton(props: Omit<ThemedButtonProps, 'buttonStyle'> & { color?: ButtonColor }) {
  return <ThemedButton {...props} buttonStyle="outline" />;
}

export function TextButton(props: Omit<ThemedButtonProps, 'buttonStyle'> & { color?: ButtonColor }) {
  return <ThemedButton {...props} buttonStyle="text" />;
}

export function DestructiveButton(props: Omit<ThemedButtonProps, 'buttonStyle' | 'color'>) {
  return <ThemedButton {...props} buttonStyle="fill" color="destructive" />;
}
