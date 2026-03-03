import { useTheme } from '../design-system/context/ThemeProvider'

const TABS = [
  { id: 'matches',  image: 'tab_bar_icon_2.png' },
  { id: 'likes',    image: 'tab_bar_icon_3.png' },
  { id: 'messages', image: 'tab_bar_icon_5.png', badge: 6 },
  { id: 'connect',  Icon: ConnectIcon },
  { id: 'profile',  image: 'tab_bar_icon_1.png' },
]

export function TabBar({ activeTab = 'connect' }) {
  const { colors } = useTheme()

  return (
    <div style={{
      backgroundColor: '#000000',
      display: 'flex',
      alignItems: 'flex-start',
      paddingTop: 12,
      paddingBottom: 28,
      flexShrink: 0,
    }}>
      {TABS.map(({ id, Icon, image, badge }) => {
        const isActive = id === activeTab
        const iconColor = isActive ? '#FFFFFF' : 'rgba(255,255,255,0.4)'

        return (
          <div key={id} style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            cursor: 'pointer',
            position: 'relative',
          }}>
            {/* Active indicator — red bar at top */}
            {isActive && (
              <div style={{
                position: 'absolute',
                top: -12,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 24,
                height: 3,
                borderRadius: 1.5,
                backgroundColor: colors.brandAccent5,
              }} />
            )}
            <div style={{ position: 'relative' }}>
              {image ? (
                <img
                  src={import.meta.env.BASE_URL + image}
                  alt={id}
                  style={{
                    width: 26,
                    height: 26,
                    objectFit: 'contain',
                    opacity: isActive ? 1 : 0.4,
                  }}
                />
              ) : (
                <Icon color={iconColor} size={26} />
              )}
              {badge && (
                <div style={{
                  position: 'absolute',
                  top: -5,
                  right: -8,
                  backgroundColor: colors.brandAccent5,
                  color: '#FFFFFF',
                  borderRadius: 10,
                  minWidth: 18,
                  height: 18,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 11,
                  fontWeight: 700,
                  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                  padding: '0 4px',
                  boxSizing: 'border-box',
                }}>
                  {badge}
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ─── Tab Icons ──────────────────────────────────────────────────────

// Two people side by side — Connect tab (our new tab, no exported asset)
function ConnectIcon({ color, size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8"  cy="7" r="3" />
      <circle cx="16" cy="7" r="3" />
      <path d="M1 21c0-3 3.1-5.5 7-5.5s7 2.5 7 5.5" />
      <path d="M16 15.5c3.9 0 7 2.5 7 5.5" />
    </svg>
  )
}
