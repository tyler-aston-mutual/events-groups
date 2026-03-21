/**
 * ThemedDialog - Converted from ThemedDialog.swift
 * Modal dialog with icon, title, message, and action buttons
 */

import type { ReactNode } from 'react';
import { useTheme } from '../context/ThemeProvider';
import { typographyScale, getFontFamily } from '../tokens/typography';
import { radius, spacing, opacity } from '../tokens/spacing';

// ─── Types ─────────────────────────────────────────────────────────

export type DialogAlignment = 'leading' | 'center';
export type DialogButtonLayout = 'single' | 'stacked';

interface DialogButtonConfig {
  title: string;
  variant: 'primary' | 'secondary' | 'destructive';
  onClick: () => void;
  bgOverride?: string;
}

interface ThemedDialogProps {
  open: boolean;
  onClose?: () => void;
  icon?: ReactNode;
  title: string;
  message?: string;
  alignment?: DialogAlignment;
  buttonLayout?: DialogButtonLayout;
  buttons?: DialogButtonConfig[];
  showCloseButton?: boolean;
}

// ─── Component ─────────────────────────────────────────────────────

export function ThemedDialog({
  open,
  onClose,
  icon,
  title,
  message,
  alignment = 'center',
  buttonLayout = 'stacked',
  buttons = [],
  showCloseButton = true,
}: ThemedDialogProps) {
  const { colors, semantic, brand } = useTheme();

  if (!open) return null;

  const h3 = typographyScale.h3;
  const body = typographyScale.bodyBase;
  const btnTypo = typographyScale.buttonLarge;
  const titleFont = getFontFamily(brand, h3.fontWeight, false);
  const bodyFont = getFontFamily(brand, body.fontWeight, false);
  const btnFont = getFontFamily(brand, btnTypo.fontWeight, false);

  const textAlign = alignment === 'center' ? 'center' as const : 'left' as const;

  return (
    <>
      {/* Scrim */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: `rgba(0,0,0,${opacity.scrim})`,
          backdropFilter: 'blur(4px)',
          zIndex: 999,
        }}
        onClick={onClose}
      />

      {/* Dialog */}
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1000,
        backgroundColor: semantic.surfaces.elevated,
        borderRadius: 28,
        padding: spacing.xxl,
        maxWidth: 340,
        width: 'calc(100% - 48px)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
      }}>
        {/* Close button */}
        {showCloseButton && onClose && (
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: 16,
              right: 16,
              width: 28,
              height: 28,
              border: 'none',
              background: 'none',
              color: semantic.text.secondary,
              fontSize: 18,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: radius.round,
              padding: 0,
            }}
          >
            &times;
          </button>
        )}

        {/* Content */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: alignment === 'center' ? 'center' : 'flex-start', gap: spacing.m }}>
          {/* Icon */}
          {icon && (
            <div style={{
              width: 56,
              height: 56,
              borderRadius: radius.round,
              backgroundColor: colors.brandSecondary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {icon}
            </div>
          )}

          {/* Title */}
          <h3 style={{
            fontFamily: titleFont,
            fontSize: h3.fontSize,
            lineHeight: `${h3.lineHeight}px`,
            fontWeight: h3.fontWeight,
            color: semantic.text.primary,
            textAlign,
            margin: 0,
          }}>
            {title}
          </h3>

          {/* Message */}
          {message && (
            <p style={{
              fontFamily: bodyFont,
              fontSize: body.fontSize,
              lineHeight: `${body.lineHeight}px`,
              fontWeight: body.fontWeight,
              color: semantic.text.secondary,
              textAlign,
              margin: 0,
            }}>
              {message}
            </p>
          )}

          {/* Buttons */}
          {buttons.length > 0 && (
            <div style={{
              display: 'flex',
              flexDirection: buttonLayout === 'stacked' ? 'column' : 'row',
              gap: spacing.s,
              width: '100%',
              marginTop: spacing.s,
            }}>
              {buttons.map((btn, i) => {
                const isPrimary = btn.variant === 'primary';
                const isDestructive = btn.variant === 'destructive';
                const bg = btn.bgOverride
                  ? btn.bgOverride
                  : isDestructive
                    ? colors.indicatorError
                    : isPrimary
                      ? colors.brandAccent5
                      : colors.brandSecondary;
                const fg = isDestructive || isPrimary
                  ? colors.constantWhite
                  : colors.isDarkMode ? colors.constantWhite : colors.grey900;

                return (
                  <button
                    key={i}
                    onClick={btn.onClick}
                    style={{
                      height: 50,
                      borderRadius: radius.medium,
                      border: 'none',
                      backgroundColor: bg,
                      color: fg,
                      fontFamily: btnFont,
                      fontSize: btnTypo.fontSize,
                      lineHeight: `${btnTypo.lineHeight}px`,
                      fontWeight: btnTypo.fontWeight,
                      cursor: 'pointer',
                      flex: buttonLayout === 'single' ? 1 : undefined,
                      width: buttonLayout === 'stacked' ? '100%' : undefined,
                    }}
                  >
                    {btn.title}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
