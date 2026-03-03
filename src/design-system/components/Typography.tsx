/**
 * Typography components - ThemedText equivalent
 * Applies themed fonts, sizes, and line heights
 */

import type { HTMLAttributes, ReactNode } from 'react';
import { useTheme } from '../context/ThemeProvider';
import { typographyScale, getFontFamily, type TypographyStyle } from '../tokens/typography';

interface TypographyProps extends HTMLAttributes<HTMLElement> {
  variant: TypographyStyle;
  children: ReactNode;
  color?: string;
  italic?: boolean;
  weight?: number;
  as?: keyof JSX.IntrinsicElements;
}

const defaultElements: Partial<Record<TypographyStyle, keyof JSX.IntrinsicElements>> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  h7: 'span',
  secondaryTitle: 'h2',
  bodyLarge: 'p',
  bodyMedium: 'p',
  bodyBase: 'p',
  bodySmall: 'p',
  buttonLarge: 'span',
  buttonSmall: 'span',
};

export function ThemedText({
  variant,
  children,
  color,
  italic = false,
  weight,
  as,
  style: styleProp,
  ...rest
}: TypographyProps) {
  const { brand, semantic } = useTheme();
  const typo = typographyScale[variant];
  const fontWeight = weight ?? typo.fontWeight;
  const fontFamily = getFontFamily(brand, fontWeight, typo.usesSecondaryFont, italic);

  const Element = as ?? defaultElements[variant] ?? 'span';

  const mergedStyle: React.CSSProperties = {
    fontFamily,
    fontSize: typo.fontSize,
    lineHeight: `${typo.lineHeight}px`,
    fontWeight,
    fontStyle: italic ? 'italic' : undefined,
    color: color ?? semantic.text.primary,
    margin: 0,
    ...styleProp,
  };

  return <Element style={mergedStyle} {...rest}>{children}</Element>;
}

// ─── Convenience Components ────────────────────────────────────────

export function Heading1(props: Omit<TypographyProps, 'variant'>) {
  return <ThemedText variant="h1" {...props} />;
}

export function Heading2(props: Omit<TypographyProps, 'variant'>) {
  return <ThemedText variant="h2" {...props} />;
}

export function Heading3(props: Omit<TypographyProps, 'variant'>) {
  return <ThemedText variant="h3" {...props} />;
}

export function Heading4(props: Omit<TypographyProps, 'variant'>) {
  return <ThemedText variant="h4" {...props} />;
}

export function SecondaryTitle(props: Omit<TypographyProps, 'variant'>) {
  return <ThemedText variant="secondaryTitle" {...props} />;
}

export function BodyText(props: Omit<TypographyProps, 'variant'> & { size?: 'large' | 'medium' | 'base' | 'small' }) {
  const { size = 'base', ...rest } = props;
  const map = { large: 'bodyLarge', medium: 'bodyMedium', base: 'bodyBase', small: 'bodySmall' } as const;
  return <ThemedText variant={map[size]} {...rest} />;
}
