import { useNavigate, useLocation } from 'react-router-dom'
import { StatusBar } from '../components/StatusBar'
import { useTheme } from '../design-system/context/ThemeProvider'

const TOPICS = [
  'How to improve Mutual',
  'Weekend hiking plans',
  'Best restaurants in Utah',
  'Favorite travel destinations',
  'What you do for fun',
  'Your favorite book or podcast',
  'Dream date ideas',
  'Hidden gems in your city',
]

const RESPONSES = [
  "I'd love to hear different perspectives on this! I think there's a lot we could talk about.",
  "This is something I'm really passionate about. Would love to chat!",
  "I've been thinking about this a lot lately and would love to hear your take.",
  "Honestly one of my favorite topics. Let's talk!",
  "I have some strong opinions on this one 😂 what do you think?",
  "Been exploring this recently and I'm hooked. Would love recommendations!",
  "This is such a great conversation starter. I'm all ears!",
  "Always down to talk about this. Hit me up!",
]

export default function ProfileScreen() {
  const { colors } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()
  const { participant } = location.state || {}

  if (!participant) return null

  const topic = TOPICS[participant.id % TOPICS.length]
  const response = RESPONSES[participant.id % RESPONSES.length]

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: colors.grey0,
      overflow: 'hidden',
    }}>
      <StatusBar />

      {/* Scrollable content */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
      }}>
        {/* Photo section with floating header */}
        <div style={{ position: 'relative' }}>
          {/* Full-bleed photo */}
          <img
            src={participant.image}
            alt={participant.name}
            style={{
              width: '100%',
              aspectRatio: '3 / 4',
              objectFit: 'cover',
              display: 'block',
            }}
          />

          {/* Floating header bar */}
          <div style={{
            position: 'absolute',
            top: 12,
            left: 12,
            right: 12,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}>
            {/* Back button */}
            <button
              onClick={() => navigate(-1)}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 1px 4px rgba(0,0,0,0.12)',
              }}
            >
              <BackArrow />
            </button>

            {/* Name pill */}
            <div style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              backgroundColor: 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              borderRadius: 24,
              padding: '6px 16px 6px 6px',
              boxShadow: '0 1px 4px rgba(0,0,0,0.12)',
            }}>
              <img
                src={participant.image}
                alt=""
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  objectFit: 'cover',
                }}
              />
              <span style={{
                fontSize: 16,
                fontWeight: 700,
                color: colors.grey1000,
                fontFamily: "'Goldman Sans Bold', 'Goldman Sans', sans-serif",
              }}>
                {participant.name}
              </span>
            </div>

            {/* More button */}
            <button style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 1px 4px rgba(0,0,0,0.12)',
            }}>
              <MoreDots />
            </button>
          </div>
        </div>

        {/* Note section */}
        <div style={{
          padding: '20px 16px 32px',
        }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 12,
          }}>
            <HeartSpeechIcon color={colors.brandPrimary} />
            <span style={{
              fontSize: 17,
              fontWeight: 700,
              color: colors.grey1000,
              fontFamily: "'Goldman Sans Bold', 'Goldman Sans', sans-serif",
            }}>
              Note from {participant.name}:
            </span>
          </div>

          {/* Prompt card */}
          <div style={{
            backgroundColor: colors.grey50,
            borderRadius: 14,
            padding: 14,
            marginBottom: 10,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}>
            <div style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: colors.grey200,
              flexShrink: 0,
            }} />
            <div>
              <div style={{
                fontSize: 15,
                fontWeight: 700,
                color: colors.grey1000,
                fontFamily: "'Goldman Sans Bold', 'Goldman Sans', sans-serif",
                lineHeight: '20px',
              }}>
                Let's talk about
              </div>
              <div style={{
                fontSize: 14,
                color: colors.grey600,
                fontFamily: "'Goldman Sans', sans-serif",
                lineHeight: '18px',
                marginTop: 2,
              }}>
                {topic}
              </div>
            </div>
          </div>

          {/* Response card */}
          <div style={{
            backgroundColor: colors.grey50,
            borderRadius: 14,
            padding: 14,
            display: 'flex',
            alignItems: 'flex-start',
            gap: 12,
            borderLeft: `3px solid ${colors.brandPrimary}`,
          }}>
            <img
              src={participant.image}
              alt=""
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                objectFit: 'cover',
                flexShrink: 0,
              }}
            />
            <div style={{
              fontSize: 14,
              color: colors.grey900,
              fontFamily: "'Goldman Sans', sans-serif",
              lineHeight: '20px',
            }}>
              {response}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Inline icons ──────────────────────────────────────────────── */

function BackArrow() {
  return (
    <svg width="10" height="18" viewBox="0 0 10 18" fill="none"
      stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 1L1 9l8 8" />
    </svg>
  )
}

function MoreDots() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="#1a1a1a">
      <circle cx="4" cy="10" r="2" />
      <circle cx="10" cy="10" r="2" />
      <circle cx="16" cy="10" r="2" />
    </svg>
  )
}

function HeartSpeechIcon({ color }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      {/* Speech bubble */}
      <path
        d="M4 4h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-4l-4 3.5L8 17H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
        fill={color}
      />
      {/* Heart inside */}
      <path
        d="M12 14.5l-3.5-3.5a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.67.67.67-.67a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83L12 14.5Z"
        fill="white"
      />
    </svg>
  )
}
