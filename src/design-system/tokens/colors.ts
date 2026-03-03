/**
 * Color tokens converted from Swift Design System
 * 4 themes: Mutual Light, Mutual Dark, Ark Light, Ark Dark
 */

export interface ThemeColors {
  // Brand Info
  appName: string;
  premiumName: string;
  isDarkMode: boolean;

  // Brand Colors
  brandPrimary: string;
  brandSecondary: string;
  brandAccent1: string;
  brandAccent2: string;
  brandAccent3: string;
  brandAccent4: string;
  brandAccent5: string;
  brandAccent6: string;
  brandAccent7: string;

  // Grey Scale (semantic - inverts in dark mode)
  grey0: string;
  grey50: string;
  grey100: string;
  grey200: string;
  grey400: string;
  grey600: string;
  grey900: string;
  grey1000: string;

  // Accessible Text Greys (AA compliant)
  textTertiary: string;
  textDisabled: string;

  // Constant Colors (don't change with mode)
  constantWhite: string;
  constantLightGrey: string;
  constantGrey: string;
  constantMiddleGrey: string;
  constantDarkGrey: string;
  constantBlack: string;
  constantPrimary: string;
  constantSecondary: string;

  // Indicator Colors
  indicatorInfo: string;
  indicatorSuccess: string;
  indicatorAlert: string;
  indicatorError: string;
  indicatorBadge: string;
}

// ─── Mutual Light Theme ────────────────────────────────────────────
export const mutualLight: ThemeColors = {
  appName: 'Mutual',
  premiumName: 'Premium',
  isDarkMode: false,

  brandPrimary: '#000080',
  brandSecondary: '#E9E4EE',
  brandAccent1: '#FEB95F',
  brandAccent2: '#F8AFDC',
  brandAccent3: '#FF806D',
  brandAccent4: '#C2185B',
  brandAccent5: '#F60063',
  brandAccent6: '#3845E7',
  brandAccent7: '#3845E7',

  grey0: '#FFFFFF',
  grey50: '#ECECEC',
  grey100: '#D9D9D9',
  grey200: '#BAB7B7',
  grey400: '#959699',
  grey600: '#454545',
  grey900: '#272525',
  grey1000: '#000000',

  textTertiary: '#767676',
  textDisabled: '#757575',

  constantWhite: '#FFFFFF',
  constantLightGrey: '#ECECEC',
  constantGrey: '#BCBCBC',
  constantMiddleGrey: '#959699',
  constantDarkGrey: '#272525',
  constantBlack: '#000000',
  constantPrimary: '#000080',
  constantSecondary: '#E9E4EE',

  indicatorInfo: '#16B1FF',
  indicatorSuccess: '#56CA00',
  indicatorAlert: '#F5B02B',
  indicatorError: '#FE6767',
  indicatorBadge: '#FF3B30',
};

// ─── Mutual Dark Theme ─────────────────────────────────────────────
export const mutualDark: ThemeColors = {
  appName: 'Mutual',
  premiumName: 'Premium',
  isDarkMode: true,

  brandPrimary: '#7B8FE0',
  brandSecondary: '#3D3650',
  brandAccent1: '#FFCA7A',
  brandAccent2: '#F8AFDC',
  brandAccent3: '#FF9A8A',
  brandAccent4: '#E54D85',
  brandAccent5: '#FF4081',
  brandAccent6: '#6C7AFF',
  brandAccent7: '#6C7AFF',

  grey0: '#1A1A1E',
  grey50: '#252529',
  grey100: '#3A3A42',
  grey200: '#6B6B73',
  grey400: '#9E9EA6',
  grey600: '#CCCCD1',
  grey900: '#F2F2F5',
  grey1000: '#FFFFFF',

  textTertiary: '#767676',
  textDisabled: '#757575',

  constantWhite: '#FFFFFF',
  constantLightGrey: '#ECECEC',
  constantGrey: '#BCBCBC',
  constantMiddleGrey: '#959699',
  constantDarkGrey: '#272525',
  constantBlack: '#000000',
  constantPrimary: '#000080',
  constantSecondary: '#E9E4EE',

  indicatorInfo: '#4DC3FF',
  indicatorSuccess: '#7ED957',
  indicatorAlert: '#FFBE4D',
  indicatorError: '#FF7A7A',
  indicatorBadge: '#FF5147',
};

// ─── Ark Light Theme ───────────────────────────────────────────────
export const arkLight: ThemeColors = {
  appName: 'Ark',
  premiumName: 'First Class',
  isDarkMode: false,

  brandPrimary: '#394C9B',
  brandSecondary: '#C0DBF3',
  brandAccent1: '#F8CF6E',
  brandAccent2: '#F2B0E7',
  brandAccent3: '#E89A9A',
  brandAccent4: '#6B4D99',
  brandAccent5: '#5B24C7',
  brandAccent6: '#101D3F',
  brandAccent7: '#4A87C4',

  grey0: '#FFFFFF',
  grey50: '#F0F0F0',
  grey100: '#DADBDB',
  grey200: '#B0B0B0',
  grey400: '#6D6E71',
  grey600: '#454545',
  grey900: '#272525',
  grey1000: '#000000',

  textTertiary: '#767676',
  textDisabled: '#757575',

  constantWhite: '#FFFFFF',
  constantLightGrey: '#B0B0B0',
  constantGrey: '#BCBCBC',
  constantMiddleGrey: '#959699',
  constantDarkGrey: '#272525',
  constantBlack: '#000000',
  constantPrimary: '#394C9B',
  constantSecondary: '#C0DBF3',

  indicatorInfo: '#0CA3C6',
  indicatorSuccess: '#56CA00',
  indicatorAlert: '#EAA829',
  indicatorError: '#FE6767',
  indicatorBadge: '#FF3B30',
};

// ─── Ark Dark Theme ────────────────────────────────────────────────
export const arkDark: ThemeColors = {
  appName: 'Ark',
  premiumName: 'First Class',
  isDarkMode: true,

  brandPrimary: '#6B7FD9',
  brandSecondary: '#3D5A7A',
  brandAccent1: '#F8CF6E',
  brandAccent2: '#F2B0E7',
  brandAccent3: '#F0BABA',
  brandAccent4: '#9B7BC8',
  brandAccent5: '#8B5CF6',
  brandAccent6: '#6B7FD9',
  brandAccent7: '#7FBAE8',

  grey0: '#141416',
  grey50: '#1E1E22',
  grey100: '#2D2D33',
  grey200: '#6D6E71',
  grey400: '#B0B0B0',
  grey600: '#DADBDB',
  grey900: '#F0F0F0',
  grey1000: '#FFFFFF',

  textTertiary: '#767676',
  textDisabled: '#757575',

  constantWhite: '#FFFFFF',
  constantLightGrey: '#B0B0B0',
  constantGrey: '#BCBCBC',
  constantMiddleGrey: '#959699',
  constantDarkGrey: '#272525',
  constantBlack: '#000000',
  constantPrimary: '#394C9B',
  constantSecondary: '#C0DBF3',

  indicatorInfo: '#2DC4E8',
  indicatorSuccess: '#6EE830',
  indicatorAlert: '#F5BE4A',
  indicatorError: '#FF7A7A',
  indicatorBadge: '#FF5147',
};

// ═══════════════════════════════════════════════════════════════════
// Tonite — Dark mode first, warm amber/gold accent
// ═══════════════════════════════════════════════════════════════════

// ─── Tonite Dark Theme (PRIMARY) ──────────────────────────────────
export const toniteDark: ThemeColors = {
  appName: 'ToNite',
  premiumName: 'Date Pass',
  isDarkMode: true,

  // Warm amber gold — the signature Tonite accent
  brandPrimary: '#E8A838',      // warm amber gold — buttons, links, accents
  brandSecondary: '#2A2318',    // dark warm surface for secondary elements
  brandAccent1: '#F5C842',      // bright yellow — highlights, hover states
  brandAccent2: '#FF9F43',      // warm orange — secondary accent
  brandAccent3: '#FF6B6B',      // coral red — hearts, errors
  brandAccent4: '#A78BFA',      // soft purple — badges, tags
  brandAccent5: '#E8A838',      // gold — pass/deals (matches primary intentionally)
  brandAccent6: '#34D399',      // mint green — success, verified
  brandAccent7: '#60A5FA',      // sky blue — info, links alternate

  // Grey scale — warm-tinted darks
  grey0: '#0E0E12',             // deepest background
  grey50: '#1A1A22',            // elevated surface (cards, modals)
  grey100: '#262630',           // borders, input backgrounds
  grey200: '#3A3A48',           // subtle borders
  grey400: '#7A7A8A',           // placeholder text
  grey600: '#B0B0BC',           // secondary text
  grey900: '#EEEEF2',           // primary text (near white)
  grey1000: '#FFFFFF',          // absolute white

  // Accessible text greys (AA compliant on dark)
  textTertiary: '#6E6E7C',
  textDisabled: '#4A4A56',

  // Constant colors
  constantWhite: '#FFFFFF',
  constantLightGrey: '#B0B0BC',
  constantGrey: '#7A7A8A',
  constantMiddleGrey: '#5A5A66',
  constantDarkGrey: '#1A1A22',
  constantBlack: '#000000',
  constantPrimary: '#E8A838',
  constantSecondary: '#2A2318',

  // Indicators
  indicatorInfo: '#60A5FA',
  indicatorSuccess: '#34D399',
  indicatorAlert: '#FBBF24',
  indicatorError: '#F87171',
  indicatorBadge: '#EF4444',
};

// ─── Tonite Light Theme ───────────────────────────────────────────
export const toniteLight: ThemeColors = {
  appName: 'ToNite',
  premiumName: 'Date Pass',
  isDarkMode: false,

  // Deeper amber for contrast on white backgrounds
  brandPrimary: '#B07A18',      // rich amber — AA accessible on white
  brandSecondary: '#FFF8ED',    // warm cream background
  brandAccent1: '#D49520',      // warm gold
  brandAccent2: '#E68A00',      // deep orange
  brandAccent3: '#E53935',      // red
  brandAccent4: '#7C3AED',      // purple
  brandAccent5: '#B07A18',      // warm gold — pass/deals
  brandAccent6: '#059669',      // emerald green
  brandAccent7: '#2563EB',      // blue

  // Warm-tinted light greys
  grey0: '#FFFFFF',             // base background
  grey50: '#F8F6F2',            // warm sunken surface
  grey100: '#EBE7E0',           // borders
  grey200: '#C8C2B8',           // medium grey
  grey400: '#8A8478',           // placeholder
  grey600: '#504A3E',           // secondary text
  grey900: '#1C1812',           // primary text (near black)
  grey1000: '#000000',          // absolute black

  // Accessible text greys (AA compliant on light)
  textTertiary: '#7A7468',
  textDisabled: '#A8A49A',

  // Constant colors
  constantWhite: '#FFFFFF',
  constantLightGrey: '#E8E4DE',
  constantGrey: '#B0AAA0',
  constantMiddleGrey: '#8A8478',
  constantDarkGrey: '#2A2620',
  constantBlack: '#000000',
  constantPrimary: '#B07A18',
  constantSecondary: '#FFF8ED',

  // Indicators
  indicatorInfo: '#2563EB',
  indicatorSuccess: '#059669',
  indicatorAlert: '#D97706',
  indicatorError: '#DC2626',
  indicatorBadge: '#EF4444',
};
