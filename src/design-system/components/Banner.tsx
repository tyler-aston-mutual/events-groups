/**
 * Banner - Converted from Banner.swift
 * Themed banner for tips, alerts, promos, and info messages
 */

import type { ReactNode } from 'react';
import { useTheme } from '../context/ThemeProvider';
import { typographyScale, getFontFamily } from '../tokens/typography';
import { radius, spacing } from '../tokens/spacing';

// ─── Types ─────────────────────────────────────────────────────────

export type BannerStyleType = 'card' | 'cardFilled' | 'fullWidth';
export type BannerFillColor = 'secondary' | 'accent1' | 'accent5' | 'grey';
export type BannerTrailing = 'none' | 'dismiss' | 'chevron' | 'info';

interface BannerProps {
  title?: string;
  description?: string;
  icon?: ReactNode;
  bannerStyle?: BannerStyleType;
  fillColor?: BannerFillColor;
  trailing?: BannerTrailing;
  onDismiss?: () => void;
  onClick?: () => void;
}

// ─── Component ─────────────────────────────────────────────────────

export function Banner({
  title,
  description,
  icon,
  bannerStyle = 'card',
  fillColor = 'secondary',
  trailing = 'none',
  onDismiss,
  onClick,
}: BannerProps) {
  const { colors, semantic, brand } = useTheme();
  const h5 = typographyScale.h5;
  const body = typographyScale.bodySmall;
  const titleFont = getFontFamily(brand, h5.fontWeight, false);
  const bodyFont = getFontFamily(brand, body.fontWeight, false);

  const bgColor = resolveFillColor(colors, fillColor);
  const isCard = bannerStyle === 'card' || bannerStyle === 'cardFilled';
  const isFilled = bannerStyle === 'cardFilled';

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: spacing.base,
    padding: `${spacing.base}px ${spacing.m}px`,
    borderRadius: isCard ? radius.medium : 0,
    backgroundColor: isFilled ? bgColor : semantic.surfaces.elevated,
    border: bannerStyle === 'card' ? `1px solid ${semantic.borders.default}` : 'none',
    cursor: onClick ? 'pointer' : undefined,
    width: '100%',
    boxSizing: 'border-box',
  };

  return (
    <div style={containerStyle} onClick={onClick} role={onClick ? 'button' : undefined}>
      {/* Icon */}
      {icon && (
        <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
          {icon}
        </div>
      )}

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {title && (
          <div style={{
            fontFamily: titleFont,
            fontSize: h5.fontSize,
            lineHeight: `${h5.lineHeight}px`,
            fontWeight: h5.fontWeight,
            color: semantic.text.primary,
          }}>
            {title}
          </div>
        )}
        {description && (
          <div style={{
            fontFamily: bodyFont,
            fontSize: body.fontSize,
            lineHeight: `${body.lineHeight}px`,
            fontWeight: body.fontWeight,
            color: semantic.text.secondary,
            marginTop: title ? 2 : 0,
          }}>
            {description}
          </div>
        )}
      </div>

      {/* Trailing */}
      {trailing === 'dismiss' && onDismiss && (
        <button
          onClick={(e) => { e.stopPropagation(); onDismiss(); }}
          style={{
            border: 'none',
            background: 'none',
            color: semantic.text.secondary,
            fontSize: 16,
            cursor: 'pointer',
            padding: 4,
            flexShrink: 0,
          }}
        >
          &times;
        </button>
      )}
      {trailing === 'chevron' && (
        <span style={{ color: semantic.text.tertiary, fontSize: 16, flexShrink: 0 }}>&rsaquo;</span>
      )}
      {trailing === 'info' && (
        <span style={{
          width: 20, height: 20, borderRadius: 10,
          border: `1px solid ${semantic.text.tertiary}`,
          color: semantic.text.tertiary,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 12, fontWeight: 700, flexShrink: 0,
        }}>
          ?
        </span>
      )}
    </div>
  );
}

// ─── Color Resolution ──────────────────────────────────────────────

function resolveFillColor(
  t: typeof import('../tokens/colors').mutualLight,
  fill: BannerFillColor,
): string {
  switch (fill) {
    case 'secondary': return t.brandSecondary;
    case 'accent1': return t.brandAccent1;
    case 'accent5': return t.brandAccent5;
    case 'grey': return t.grey50;
  }
}
