export default function HoloPrismLogo({ size = 'medium' }) {
  const sizes = {
    small: { text: '1rem', sub: '0.6rem', icon: 28 },
    medium: { text: '1.6rem', sub: '0.7rem', icon: 40 },
    large: { text: '2.2rem', sub: '0.85rem', icon: 56 },
  }
  const s = sizes[size] || sizes.medium

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {/* Prism icon */}
        <svg width={s.icon} height={s.icon} viewBox="0 0 40 40" fill="none" style={{ filter: 'drop-shadow(0 0 8px rgba(168,85,247,0.6))' }}>
          <defs>
            <linearGradient id="prism-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="50%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#f472b6" />
            </linearGradient>
          </defs>
          <polygon points="20,4 4,34 36,34" stroke="url(#prism-grad)" strokeWidth="1.5" fill="none" />
          <polygon points="20,4 4,34 20,38 20,4" fill="rgba(168,85,247,0.12)" stroke="url(#prism-grad)" strokeWidth="1" />
          <polygon points="20,4 36,34 20,38 20,4" fill="rgba(34,211,238,0.1)" stroke="url(#prism-grad)" strokeWidth="1" />
          <circle cx="20" cy="4" r="2.5" fill="url(#prism-grad)" />
        </svg>
        <span style={{
          fontFamily: 'var(--font-main)',
          fontWeight: '800',
          fontSize: s.text,
          background: 'linear-gradient(135deg, #a855f7, #22d3ee, #f472b6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          letterSpacing: '-0.02em',
        }}>
          HoloPrism
        </span>
      </div>
      {size === 'large' && (
        <span style={{
          color: 'rgba(168,85,247,0.6)',
          fontSize: s.sub,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          fontFamily: 'var(--font-main)',
        }}>
          by Mason
        </span>
      )}
    </div>
  )
}
