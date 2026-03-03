import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { StatusBar } from '../components/StatusBar'
import { useTheme } from '../design-system/context/ThemeProvider'
import { ThemedButton, SecondaryButton } from '../design-system'

const DEFAULTS = {
  showEvents: true,
  showGroups: true,
  distance: 100,
  minParticipants: '',
  maxParticipants: '',
}

export default function FilterScreen() {
  const { colors } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()
  const incoming = location.state?.filters || DEFAULTS

  const [showEvents, setShowEvents] = useState(incoming.showEvents)
  const [showGroups, setShowGroups] = useState(incoming.showGroups)
  const [distance, setDistance] = useState(incoming.distance)
  const [minParticipants, setMinParticipants] = useState(incoming.minParticipants)
  const [maxParticipants, setMaxParticipants] = useState(incoming.maxParticipants)

  const isDefault =
    showEvents === DEFAULTS.showEvents &&
    showGroups === DEFAULTS.showGroups &&
    distance === DEFAULTS.distance &&
    minParticipants === DEFAULTS.minParticipants &&
    maxParticipants === DEFAULTS.maxParticipants

  const activeCount = [
    showEvents !== DEFAULTS.showEvents || showGroups !== DEFAULTS.showGroups,
    distance !== DEFAULTS.distance,
    minParticipants !== DEFAULTS.minParticipants || maxParticipants !== DEFAULTS.maxParticipants,
  ].filter(Boolean).length

  function handleReset() {
    setShowEvents(DEFAULTS.showEvents)
    setShowGroups(DEFAULTS.showGroups)
    setDistance(DEFAULTS.distance)
    setMinParticipants(DEFAULTS.minParticipants)
    setMaxParticipants(DEFAULTS.maxParticipants)
  }

  function handleApply() {
    navigate('/', {
      state: {
        filters: { showEvents, showGroups, distance, minParticipants, maxParticipants },
      },
    })
  }

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
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
        }}>
          <FilterTitleIcon color={colors.grey1000} />
          <span style={{
            fontSize: 18,
            fontWeight: 700,
            color: colors.grey1000,
            fontFamily: "'Goldman Sans Bold', 'Goldman Sans', sans-serif",
          }}>
            Filter Connect
          </span>
        </div>
        {/* Spacer to balance back arrow */}
        <div style={{ width: 40 }} />
      </div>

      {/* Divider */}
      <div style={{ height: 1, backgroundColor: colors.grey100, flexShrink: 0 }} />

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 20px' }}>

        {/* ── Type ── */}
        <FilterSection
          icon={<TypeIcon color={colors.grey400} />}
          label="Type"
          value={showEvents && showGroups ? 'Events & Groups' : showEvents ? 'Events Only' : showGroups ? 'Groups Only' : 'None'}
          isActive={showEvents !== DEFAULTS.showEvents || showGroups !== DEFAULTS.showGroups}
          colors={colors}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 12 }}>
            <Checkbox
              label="Events"
              checked={showEvents}
              onChange={setShowEvents}
              colors={colors}
            />
            <Checkbox
              label="Groups"
              checked={showGroups}
              onChange={setShowGroups}
              colors={colors}
            />
          </div>
        </FilterSection>

        <Divider color={colors.grey100} />

        {/* ── Distance ── */}
        <FilterSection
          icon={<DistanceIcon color={colors.grey400} />}
          label="Distance"
          value={distance >= 100 ? 'All' : `${distance} mi`}
          isActive={distance !== DEFAULTS.distance}
          colors={colors}
        >
          <div style={{ marginTop: 12 }}>
            <input
              type="range"
              min={1}
              max={100}
              value={distance}
              onChange={e => setDistance(Number(e.target.value))}
              style={{
                width: '100%',
                accentColor: colors.brandPrimary,
                height: 4,
              }}
            />
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 12,
              color: colors.grey400,
              fontFamily: "'Goldman Sans', sans-serif",
              marginTop: 4,
            }}>
              <span>1 mi</span>
              <span>All</span>
            </div>
          </div>
        </FilterSection>

        <Divider color={colors.grey100} />

        {/* ── Participants ── */}
        <FilterSection
          icon={<ParticipantsIcon color={colors.grey400} />}
          label="Participants"
          value={
            minParticipants || maxParticipants
              ? `${minParticipants || '0'} – ${maxParticipants || '∞'}`
              : 'All'
          }
          isActive={minParticipants !== DEFAULTS.minParticipants || maxParticipants !== DEFAULTS.maxParticipants}
          colors={colors}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginTop: 12,
          }}>
            <NumberInput
              placeholder="Min"
              value={minParticipants}
              onChange={setMinParticipants}
              colors={colors}
            />
            <span style={{
              fontSize: 14,
              color: colors.grey400,
              fontFamily: "'Goldman Sans', sans-serif",
            }}>to</span>
            <NumberInput
              placeholder="Max"
              value={maxParticipants}
              onChange={setMaxParticipants}
              colors={colors}
            />
          </div>
        </FilterSection>

        <Divider color={colors.grey100} />
      </div>

      {/* Bottom buttons */}
      <div style={{
        padding: '16px 20px 36px',
        display: 'flex',
        gap: 12,
        flexShrink: 0,
        backgroundColor: colors.grey0,
      }}>
        <div style={{ flex: 1 }}>
          <SecondaryButton
            title="Reset Filters"
            size="large"
            isFullWidth
            onClick={handleReset}
            disabled={isDefault}
          />
        </div>
        <div style={{ flex: 1 }}>
          <ThemedButton
            title={activeCount > 0 ? `Apply Filters (${activeCount})` : 'Apply Filters'}
            buttonStyle="fill"
            color="primary"
            size="large"
            isFullWidth
            onClick={handleApply}
          />
        </div>
      </div>
    </div>
  )
}

// ─── Reusable pieces ───────────────────────────────────────────────

function FilterSection({ icon, label, value, isActive, colors, children }) {
  return (
    <div style={{ padding: '16px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ width: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          {icon}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{
            fontSize: 15,
            fontWeight: 500,
            color: colors.grey1000,
            fontFamily: "'Goldman Sans Medium', 'Goldman Sans', sans-serif",
          }}>
            {label}
          </div>
          <div style={{
            fontSize: 14,
            fontWeight: 400,
            color: isActive ? colors.indicatorError : colors.grey400,
            fontFamily: "'Goldman Sans', sans-serif",
            marginTop: 2,
          }}>
            {value}
          </div>
        </div>
      </div>
      {children}
    </div>
  )
}

function Checkbox({ label, checked, onChange, colors }) {
  return (
    <div
      onClick={() => onChange(!checked)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        cursor: 'pointer',
        paddingLeft: 42,
      }}
    >
      <div style={{
        width: 22,
        height: 22,
        borderRadius: 6,
        border: checked ? 'none' : `2px solid ${colors.grey300}`,
        backgroundColor: checked ? colors.brandPrimary : 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        transition: 'background-color 0.15s',
      }}>
        {checked && (
          <svg width="12" height="10" viewBox="0 0 12 10" fill="none"
            stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 5l3.5 3.5L11 1" />
          </svg>
        )}
      </div>
      <span style={{
        fontSize: 15,
        fontWeight: 400,
        color: colors.grey1000,
        fontFamily: "'Goldman Sans', sans-serif",
      }}>
        {label}
      </span>
    </div>
  )
}

function NumberInput({ placeholder, value, onChange, colors }) {
  return (
    <input
      type="number"
      inputMode="numeric"
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{
        flex: 1,
        height: 40,
        borderRadius: 10,
        border: `1.5px solid ${colors.grey200}`,
        backgroundColor: colors.grey0,
        padding: '0 12px',
        fontSize: 15,
        fontWeight: 400,
        color: colors.grey1000,
        fontFamily: "'Goldman Sans', sans-serif",
        outline: 'none',
        textAlign: 'center',
        minWidth: 0,
      }}
    />
  )
}

function Divider({ color }) {
  return <div style={{ height: 1, backgroundColor: color }} />
}

// ─── Icons ─────────────────────────────────────────────────────────

function BackArrow({ color }) {
  return (
    <svg width="10" height="18" viewBox="0 0 10 18" fill="none"
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 1L1 9l8 8" />
    </svg>
  )
}

function FilterTitleIcon({ color }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
      stroke={color} strokeWidth="1.5" strokeLinecap="round">
      <circle cx="7" cy="5" r="2.5" />
      <circle cx="13" cy="15" r="2.5" />
      <line x1="9.5" y1="5" x2="18" y2="5" />
      <line x1="2" y1="5" x2="4.5" y2="5" />
      <line x1="2" y1="15" x2="10.5" y2="15" />
      <line x1="15.5" y1="15" x2="18" y2="15" />
    </svg>
  )
}

function TypeIcon({ color }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none"
      stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="8" height="8" rx="1.5" />
      <line x1="2" y1="7" x2="10" y2="7" />
      <line x1="5" y1="2" x2="5" y2="5" />
      <line x1="7" y1="2" x2="7" y2="5" />
      <circle cx="16" cy="9" r="2" />
      <circle cx="19" cy="9" r="2" />
      <path d="M12.5 18c0-1.7 1.6-3 3.5-3s3.5 1.3 3.5 3" />
    </svg>
  )
}

function DistanceIcon({ color }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none"
      stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="9" r="3" />
      <path d="M11 20S4.5 14 4.5 9a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11z" />
    </svg>
  )
}

function ParticipantsIcon({ color }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none"
      stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="7" r="3" />
      <circle cx="16" cy="7" r="2.5" />
      <path d="M2 19c0-2.8 2.7-5 6-5s6 2.2 6 5" />
      <path d="M16 14c2.5 0 4.5 2 4.5 5" />
    </svg>
  )
}
