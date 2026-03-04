import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StatusBar } from '../components/StatusBar'
import { useTheme } from '../design-system/context/ThemeProvider'

export default function CreateScreen({ type }) {
  const { colors } = useTheme()
  const navigate = useNavigate()
  const isEvent = type === 'event'

  // Form state
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [link, setLink] = useState('')
  const [displayCreator, setDisplayCreator] = useState(true)
  const [expirationDate, setExpirationDate] = useState('')

  // Event-only state
  const [eventDate, setEventDate] = useState('')
  const [eventTime, setEventTime] = useState('')

  // Tab visibility
  const [showParticipants, setShowParticipants] = useState(true)
  const [showEvents, setShowEvents] = useState(true)
  const [showChat, setShowChat] = useState(true)

  const canCreate = name.trim().length > 0

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: colors.grey0,
      overflow: 'hidden',
    }}>
      <StatusBar />

      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '12px 16px',
        flexShrink: 0,
      }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 8,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <BackArrow color={colors.grey1000} />
        </button>
        <div style={{
          flex: 1,
          textAlign: 'center',
          fontSize: 18,
          fontWeight: 700,
          color: colors.grey1000,
          fontFamily: "'Goldman Sans Bold', 'Goldman Sans', sans-serif",
        }}>
          Create {isEvent ? 'Event' : 'Group'}
        </div>
        <button
          style={{
            background: 'none',
            border: 'none',
            cursor: canCreate ? 'pointer' : 'default',
            padding: 8,
            fontSize: 16,
            fontWeight: 700,
            color: canCreate ? colors.brandPrimary : colors.grey400,
            fontFamily: "'Goldman Sans Bold', 'Goldman Sans', sans-serif",
            transition: 'color 0.2s ease',
          }}
        >
          Create
        </button>
      </div>

      {/* Divider */}
      <div style={{ height: 1, backgroundColor: colors.grey100, flexShrink: 0 }} />

      {/* Scrollable form */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 20px', paddingBottom: 100 }}>

        {/* 1. Name */}
        <SectionLabel colors={colors} text={isEvent ? 'Event Name' : 'Group Name'} />
        <FormInput
          placeholder="Give it a name"
          value={name}
          onChange={setName}
          colors={colors}
        />

        {/* 2. Photo Upload */}
        <SectionLabel colors={colors} text="Photo" />
        <div style={{
          height: 160,
          borderRadius: 14,
          border: `2px dashed ${colors.grey200}`,
          backgroundColor: colors.grey50,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          cursor: 'pointer',
        }}>
          <CameraIcon color={colors.grey400} />
          <div style={{
            fontSize: 14,
            fontWeight: 500,
            color: colors.grey400,
            fontFamily: "'Goldman Sans Medium', 'Goldman Sans', sans-serif",
          }}>
            Add Photo
          </div>
        </div>

        {/* 3. Date & Time (events only) */}
        {isEvent && (
          <>
            <SectionLabel colors={colors} text="Date & Time" />
            <div style={{ display: 'flex', gap: 10 }}>
              <div style={{ flex: 1.2 }}>
                <input
                  type="date"
                  value={eventDate}
                  onChange={e => setEventDate(e.target.value)}
                  style={{
                    width: '100%',
                    height: 44,
                    borderRadius: 10,
                    border: `1.5px solid ${colors.grey200}`,
                    backgroundColor: colors.grey0,
                    padding: '0 12px',
                    fontSize: 15,
                    fontWeight: 400,
                    color: eventDate ? colors.grey1000 : colors.grey400,
                    fontFamily: "'Goldman Sans', sans-serif",
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
              <div style={{ flex: 0.8 }}>
                <input
                  type="time"
                  value={eventTime}
                  onChange={e => setEventTime(e.target.value)}
                  style={{
                    width: '100%',
                    height: 44,
                    borderRadius: 10,
                    border: `1.5px solid ${colors.grey200}`,
                    backgroundColor: colors.grey0,
                    padding: '0 12px',
                    fontSize: 15,
                    fontWeight: 400,
                    color: eventTime ? colors.grey1000 : colors.grey400,
                    fontFamily: "'Goldman Sans', sans-serif",
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            </div>
            <div style={{
              marginTop: 8,
              display: 'flex',
              gap: 8,
            }}>
              {['MST', 'EST', 'CST', 'PST'].map(tz => (
                <div
                  key={tz}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 8,
                    backgroundColor: tz === 'MST' ? colors.grey1000 : colors.grey50,
                    color: tz === 'MST' ? colors.grey0 : colors.grey600,
                    fontSize: 13,
                    fontWeight: 600,
                    fontFamily: "'Goldman Sans Bold', 'Goldman Sans', sans-serif",
                    cursor: 'pointer',
                  }}
                >
                  {tz}
                </div>
              ))}
            </div>
          </>
        )}

        {/* 4. Location */}
        <SectionLabel colors={colors} text="Location" optional />
        <FormInput
          placeholder="Add a place"
          value={location}
          onChange={setLocation}
          colors={colors}
        />

        {/* 5. Description */}
        <SectionLabel colors={colors} text="Description" optional />
        <FormTextarea
          placeholder="What should people know about this?"
          value={description}
          onChange={setDescription}
          colors={colors}
        />

        {/* 6. Link for More Info */}
        <SectionLabel colors={colors} text="Link for More Info" />
        <FormInput
          placeholder="https://"
          value={link}
          onChange={setLink}
          colors={colors}
        />

        {/* 7. Add to Group (events only) */}
        {isEvent && (
          <>
            <SectionLabel colors={colors} text="Add to Group" />
            <div style={{
              display: 'flex',
              alignItems: 'center',
              height: 50,
              borderRadius: 10,
              border: `1.5px solid ${colors.grey200}`,
              backgroundColor: colors.grey0,
              padding: '0 14px',
              cursor: 'pointer',
            }}>
              <GroupLinkIcon color={colors.grey400} />
              <div style={{
                flex: 1,
                fontSize: 15,
                fontWeight: 400,
                color: colors.grey400,
                fontFamily: "'Goldman Sans', sans-serif",
                marginLeft: 12,
              }}>
                Choose a Group
              </div>
              <ChevronRight color={colors.grey300} />
            </div>
          </>
        )}

        {/* Divider before toggles */}
        <div style={{ height: 1, backgroundColor: colors.grey100, marginTop: 24 }} />

        {/* 8. Display Creator */}
        <ToggleRow
          label="Display Creator"
          description="Show who created this on the detail page"
          value={displayCreator}
          onChange={setDisplayCreator}
          colors={colors}
        />

        {/* 9. Expiration Date */}
        <div style={{ padding: '14px 0', borderBottom: `1px solid ${colors.grey100}` }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div>
              <div style={{
                fontSize: 15,
                fontWeight: 500,
                color: colors.grey1000,
                fontFamily: "'Goldman Sans Medium', 'Goldman Sans', sans-serif",
              }}>
                Expiration Date
              </div>
              <div style={{
                fontSize: 13,
                color: colors.grey400,
                fontFamily: "'Goldman Sans', sans-serif",
                marginTop: 2,
              }}>
                When this listing should expire
              </div>
            </div>
          </div>
          <div style={{ marginTop: 10 }}>
            <input
              type="date"
              value={expirationDate}
              onChange={e => setExpirationDate(e.target.value)}
              style={{
                width: '100%',
                height: 44,
                borderRadius: 10,
                border: `1.5px solid ${colors.grey200}`,
                backgroundColor: colors.grey0,
                padding: '0 14px',
                fontSize: 15,
                fontWeight: 400,
                color: expirationDate ? colors.grey1000 : colors.grey400,
                fontFamily: "'Goldman Sans', sans-serif",
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>
        </div>

        {/* 10. Tab Visibility */}
        <div style={{ marginTop: 4 }}>
          <div style={{
            fontSize: 13,
            fontWeight: 500,
            color: colors.grey400,
            fontFamily: "'Goldman Sans Medium', 'Goldman Sans', sans-serif",
            padding: '14px 0 4px',
          }}>
            Visible Tabs on Detail Page
          </div>
          <ToggleRow
            label="Participants"
            value={showParticipants}
            onChange={setShowParticipants}
            colors={colors}
          />
          {!isEvent && (
            <ToggleRow
              label="Events"
              value={showEvents}
              onChange={setShowEvents}
              colors={colors}
            />
          )}
          <ToggleRow
            label="Chat"
            value={showChat}
            onChange={setShowChat}
            colors={colors}
          />
        </div>

      </div>
    </div>
  )
}

// ─── Form Helpers ────────────────────────────────────────────────

function SectionLabel({ colors, text, optional }) {
  return (
    <div style={{
      fontSize: 14,
      fontWeight: 700,
      color: colors.grey1000,
      fontFamily: "'Goldman Sans Bold', 'Goldman Sans', sans-serif",
      marginBottom: 8,
      marginTop: 20,
    }}>
      {text}
      {optional && (
        <span style={{
          fontWeight: 400,
          color: colors.grey400,
          fontFamily: "'Goldman Sans', sans-serif",
          fontSize: 13,
        }}>
          {' '}(optional)
        </span>
      )}
    </div>
  )
}

function FormInput({ placeholder, value, onChange, colors }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{
        width: '100%',
        height: 44,
        borderRadius: 10,
        border: `1.5px solid ${colors.grey200}`,
        backgroundColor: colors.grey0,
        padding: '0 14px',
        fontSize: 15,
        fontWeight: 400,
        color: colors.grey1000,
        fontFamily: "'Goldman Sans', sans-serif",
        outline: 'none',
        boxSizing: 'border-box',
      }}
    />
  )
}

function FormTextarea({ placeholder, value, onChange, colors }) {
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{
        width: '100%',
        minHeight: 100,
        borderRadius: 10,
        border: `1.5px solid ${colors.grey200}`,
        backgroundColor: colors.grey0,
        padding: '12px 14px',
        fontSize: 15,
        fontWeight: 400,
        color: colors.grey1000,
        fontFamily: "'Goldman Sans', sans-serif",
        outline: 'none',
        resize: 'none',
        boxSizing: 'border-box',
        lineHeight: '22px',
      }}
    />
  )
}

function ToggleSwitch({ value, onChange, colors }) {
  return (
    <button
      onClick={() => onChange(!value)}
      style={{
        width: 50,
        height: 30,
        borderRadius: 15,
        backgroundColor: value ? colors.brandPrimary : colors.grey200,
        border: 'none',
        cursor: 'pointer',
        position: 'relative',
        transition: 'background-color 0.2s ease',
        flexShrink: 0,
        padding: 0,
      }}
    >
      <div style={{
        width: 26,
        height: 26,
        borderRadius: 13,
        backgroundColor: colors.grey0,
        position: 'absolute',
        top: 2,
        left: value ? 22 : 2,
        transition: 'left 0.2s ease',
        boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
      }} />
    </button>
  )
}

function ToggleRow({ label, description, value, onChange, colors }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '14px 0',
      borderBottom: `1px solid ${colors.grey100}`,
    }}>
      <div style={{ flex: 1, marginRight: 16 }}>
        <div style={{
          fontSize: 15,
          fontWeight: 500,
          color: colors.grey1000,
          fontFamily: "'Goldman Sans Medium', 'Goldman Sans', sans-serif",
        }}>
          {label}
        </div>
        {description && (
          <div style={{
            fontSize: 13,
            color: colors.grey400,
            fontFamily: "'Goldman Sans', sans-serif",
            marginTop: 2,
            lineHeight: '17px',
          }}>
            {description}
          </div>
        )}
      </div>
      <ToggleSwitch value={value} onChange={onChange} colors={colors} />
    </div>
  )
}

// ─── Icons ───────────────────────────────────────────────────────

function BackArrow({ color }) {
  return (
    <svg width="10" height="18" viewBox="0 0 10 18" fill="none"
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 1L1 9l8 8" />
    </svg>
  )
}

function CameraIcon({ color }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
      stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 10.5A2.5 2.5 0 0 1 6.5 8h2.38a2 2 0 0 0 1.66-.89L12 5.5a2 2 0 0 1 1.66-.89h4.68A2 2 0 0 1 20 5.5l1.46 1.61A2 2 0 0 0 23.12 8H25.5A2.5 2.5 0 0 1 28 10.5V24a2.5 2.5 0 0 1-2.5 2.5h-19A2.5 2.5 0 0 1 4 24V10.5z" />
      <circle cx="16" cy="17" r="4.5" />
    </svg>
  )
}

function GroupLinkIcon({ color }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none"
      stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="7" r="3" />
      <circle cx="16" cy="7" r="2.5" />
      <path d="M2 19c0-2.8 2.7-5 6-5s6 2.2 6 5" />
      <path d="M16 14c2.5 0 4.5 2 4.5 5" />
    </svg>
  )
}

function ChevronRight({ color }) {
  return (
    <svg width="8" height="14" viewBox="0 0 8 14" fill="none"
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 1l6 6-6 6" />
    </svg>
  )
}
