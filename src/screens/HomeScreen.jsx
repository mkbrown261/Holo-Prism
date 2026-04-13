import { useState } from 'react'
import StarsBg from '../components/StarsBg'
import HoloPrismLogo from '../components/HoloPrismLogo'
import PrismAnimation from '../animations/PrismAnimation'

const CATEGORIES = [
  {
    id: 'birthday',
    label: 'Birthdays',
    emoji: '🎂',
    color: '#f472b6',
    glow: 'rgba(244,114,182,0.3)',
    bg: 'rgba(244,114,182,0.08)',
    border: 'rgba(244,114,182,0.25)',
    desc: 'Rockets, balloons & more',
    animDelay: '0s',
  },
  {
    id: 'holidays',
    label: 'Holidays',
    emoji: '✨',
    color: '#fbbf24',
    glow: 'rgba(251,191,36,0.3)',
    bg: 'rgba(251,191,36,0.08)',
    border: 'rgba(251,191,36,0.25)',
    desc: 'Seasonal celebrations',
    animDelay: '0.1s',
  },
  {
    id: 'congrats',
    label: 'Congrats',
    emoji: '🏆',
    color: '#22d3ee',
    glow: 'rgba(34,211,238,0.3)',
    bg: 'rgba(34,211,238,0.08)',
    border: 'rgba(34,211,238,0.25)',
    desc: 'Achievements & milestones',
    animDelay: '0.2s',
  },
  {
    id: 'love',
    label: 'Love & Personal',
    emoji: '💜',
    color: '#a855f7',
    glow: 'rgba(168,85,247,0.3)',
    bg: 'rgba(168,85,247,0.08)',
    border: 'rgba(168,85,247,0.25)',
    desc: 'Heartfelt & romantic',
    animDelay: '0.3s',
  },
]

export default function HomeScreen({ onSelect, onNavigate }) {
  const [hoveredId, setHoveredId] = useState(null)

  return (
    <div className="screen" style={{
      background: 'radial-gradient(ellipse at 50% 0%, #1a0d35 0%, #0d0720 50%, #05020f 100%)',
      overflowY: 'auto',
      padding: '0 0 40px',
    }}>
      <StarsBg count={60} />

      {/* Header */}
      <div style={{
        padding: '52px 24px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
        position: 'relative',
      }}>
        {/* Top ambient glow */}
        <div style={{
          position: 'absolute',
          top: 0, left: '50%',
          transform: 'translateX(-50%)',
          width: '200px', height: '200px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 70%)',
          filter: 'blur(30px)',
          pointerEvents: 'none',
        }} />

        <div style={{ animation: 'float 3s ease-in-out infinite' }}>
          <PrismAnimation size={64} />
        </div>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{
            fontFamily: 'var(--font-main)',
            fontSize: '1.7rem',
            fontWeight: '800',
            lineHeight: 1.2,
          }}>
            <span className="text-gradient">HoloPrism</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Choose your occasion
          </p>
        </div>
      </div>

      {/* Featured banner */}
      <div style={{
        margin: '0 16px 20px',
        padding: '16px 20px',
        borderRadius: '20px',
        background: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(34,211,238,0.08))',
        border: '1px solid rgba(124,58,237,0.25)',
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.05), transparent)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 3s linear infinite',
        }} />
        <div style={{ fontSize: '2rem' }}>🚀</div>
        <div style={{ flex: 1 }}>
          <p style={{ fontFamily: 'var(--font-main)', fontWeight: '700', fontSize: '0.95rem', marginBottom: '2px' }}>
            New: Rocket Experience
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
            Our most viral hologram — 3M+ shares
          </p>
        </div>
        <span style={{
          background: 'linear-gradient(135deg, #7c3aed, #22d3ee)',
          borderRadius: '8px',
          padding: '4px 10px',
          fontSize: '0.72rem',
          fontWeight: '700',
          color: 'white',
          whiteSpace: 'nowrap',
        }}>NEW</span>
      </div>

      {/* Category grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '14px',
        padding: '0 16px',
        position: 'relative',
      }}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            onMouseEnter={() => setHoveredId(cat.id)}
            onMouseLeave={() => setHoveredId(null)}
            style={{
              background: hoveredId === cat.id
                ? `rgba(${cat.color.replace('#','').match(/../g).map(x=>parseInt(x,16)).join(',')},0.15)`
                : cat.bg,
              border: `1px solid ${hoveredId === cat.id ? cat.color.replace(')', ', 0.5)').replace('rgb(', 'rgba(') : cat.border}`,
              borderRadius: '20px',
              padding: '20px 16px 16px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              transform: hoveredId === cat.id ? 'scale(1.03) translateY(-2px)' : 'scale(1)',
              boxShadow: hoveredId === cat.id ? `0 8px 24px ${cat.glow}` : 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '10px',
              animationDelay: cat.animDelay,
              animation: 'fade-in-up 0.5s ease forwards',
              textAlign: 'left',
              minHeight: '130px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Card shimmer */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.03) 50%, transparent 60%)',
              backgroundSize: '200% 200%',
              animation: hoveredId === cat.id ? 'shimmer 1.5s ease infinite' : 'none',
            }} />

            <div style={{
              fontSize: '2.2rem',
              lineHeight: 1,
              animation: hoveredId === cat.id ? 'bounce-subtle 0.8s ease infinite' : 'none',
            }}>
              {cat.emoji}
            </div>
            <div>
              <p style={{
                fontFamily: 'var(--font-main)',
                fontWeight: '700',
                fontSize: '1rem',
                color: cat.color,
                marginBottom: '3px',
              }}>
                {cat.label}
              </p>
              <p style={{ color: 'rgba(148,163,184,0.7)', fontSize: '0.75rem', lineHeight: 1.4 }}>
                {cat.desc}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Navigation row — Gift & Events */}
      <div style={{ display: 'flex', gap: '10px', margin: '16px 16px 0' }}>
        <button
          onClick={() => onNavigate('gift')}
          style={{
            flex: 1, padding: '14px', borderRadius: '16px',
            border: '1px solid rgba(244,114,182,0.3)',
            background: 'rgba(244,114,182,0.06)',
            color: '#f472b6', fontFamily: 'var(--font-main)',
            fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
          }}
        >
          🎁 Send a Gift
        </button>
        <button
          onClick={() => onNavigate('events')}
          style={{
            flex: 1, padding: '14px', borderRadius: '16px',
            border: '1px solid rgba(251,191,36,0.3)',
            background: 'rgba(251,191,36,0.06)',
            color: '#fbbf24', fontFamily: 'var(--font-main)',
            fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
          }}
        >
          🎊 Events
        </button>
      </div>

      {/* Bottom section — prism order CTA */}
      <div style={{
        margin: '16px 16px 0',
        padding: '20px',
        borderRadius: '20px',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '14px',
          background: 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(34,211,238,0.2))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.4rem',
          flexShrink: 0,
        }}>
          📦
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ fontFamily: 'var(--font-main)', fontWeight: '600', fontSize: '0.9rem', marginBottom: '2px' }}>
            Don&apos;t have a prism?
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
            Order the HoloPrism device from $12.99
          </p>
        </div>
        <button
          onClick={() => onNavigate('pricing')}
          style={{
            padding: '10px 16px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
            border: 'none',
            color: 'white',
            fontSize: '0.82rem',
            fontWeight: '600',
            fontFamily: 'var(--font-main)',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            boxShadow: '0 2px 12px rgba(124,58,237,0.4)',
          }}
        >
          View Plans →
        </button>
      </div>
    </div>
  )
}
