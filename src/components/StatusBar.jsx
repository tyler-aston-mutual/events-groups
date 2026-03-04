import { useTheme } from '../design-system/context/ThemeProvider'
import { useIsMobile } from '../hooks/useIsMobile'

export function StatusBar() {
  const { colors } = useTheme()
  const isMobile = useIsMobile()

  if (isMobile) return null

  return (
    <div style={{
      position: 'relative',
      height: 50,
      backgroundColor: colors.grey0,
      display: 'flex',
      alignItems: 'center',
      paddingLeft: 24,
      paddingRight: 20,
      flexShrink: 0,
    }}>
      {/* Time */}
      <span style={{
        fontSize: 15,
        fontWeight: 600,
        fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
        color: colors.grey1000,
        letterSpacing: '-0.3px',
        lineHeight: 1,
        position: 'relative',
        zIndex: 2,
      }}>
        9:41
      </span>

      {/* Dynamic Island */}
      <div style={{
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        top: 8,
        width: 120,
        height: 34,
        backgroundColor: '#000000',
        borderRadius: 20,
        zIndex: 1,
      }} />

      {/* Signal / WiFi / Battery */}
      <div style={{
        marginLeft: 'auto',
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        position: 'relative',
        zIndex: 2,
      }}>
        <SignalIcon color={colors.grey1000} />
        <WifiIcon color={colors.grey1000} />
        <BatteryIcon color={colors.grey1000} />
      </div>
    </div>
  )
}

function SignalIcon({ color }) {
  return (
    <svg width="17" height="12" viewBox="0 0 17 12" fill={color}>
      <rect x="0"     y="9" width="3" height="3"  rx="0.75" opacity="0.3" />
      <rect x="4.75"  y="6" width="3" height="6"  rx="0.75" opacity="0.3" />
      <rect x="9.5"   y="3" width="3" height="9"  rx="0.75" />
      <rect x="14.25" y="0" width="3" height="12" rx="0.75" />
    </svg>
  )
}

function WifiIcon({ color }) {
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
      <circle cx="8" cy="11" r="1.5" fill={color} />
      <path d="M5.2 8.2a4 4 0 0 1 5.6 0"        stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M2.6 5.6a7.5 7.5 0 0 1 10.8 0"   stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M0 3a11.2 11.2 0 0 1 16 0"       stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function BatteryIcon({ color }) {
  return (
    <svg width="26" height="12" viewBox="0 0 26 12" fill="none">
      <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke={color} />
      <rect x="2"   y="2"   width="15" height="8"  rx="2"   fill={color} />
      <rect x="22.5" y="3.5" width="2.5" height="5" rx="1.25" fill={color} fillOpacity="0.4" />
    </svg>
  )
}
