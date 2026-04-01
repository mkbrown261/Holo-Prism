import { useState } from 'react'
import StarsBg from '../components/StarsBg'
import RocketPreview from '../animations/RocketPreview'
import BalloonPreview from '../animations/BalloonPreview'
import HeartFireworkPreview from '../animations/HeartFireworkPreview'

const TEMPLATES = {
  birthday: [
    { id: 'rocket', label: 'Rocket Launch', emoji: '🚀', desc: 'Rocket blasts off → explodes into "Happy Birthday"', tag: 'VIRAL', Preview: RocketPreview },
    { id: 'balloon', label: 'Balloon Rise', emoji: '🎈', desc: 'Balloons float up and cluster into your message', tag: 'CLASSIC', Preview: BalloonPreview },
    { id: 'heart-firework', label: 'Firework Heart', emoji: '💖', desc: 'Fireworks burst into a glowing heart message', tag: 'ROMANTIC', Preview: HeartFireworkPreview },
  ],
  holidays: [
    { id: 'rocket', label: 'Starburst', emoji: '⭐', desc: 'Radiant star explosion with festive message', tag: 'FESTIVE', Preview: RocketPreview },
    { id: 'balloon', label: 'Snow Globe', emoji: '❄️', desc: 'Snowflakes swirl into your season\'s greeting', tag: 'WINTER', Preview: BalloonPreview },
    { id: 'heart-firework', label: 'Firework Show', emoji: '🎆', desc: 'Multi-color fireworks light up the sky', tag: 'EPIC', Preview: HeartFireworkPreview },
  ],
  congrats: [
    { id: 'rocket', label: 'Trophy Launch', emoji: '🏆', desc: 'Rocket carries your trophy to the stars', tag: 'WINNER', Preview: RocketPreview },
    { id: 'balloon', label: 'Confetti Rain', emoji: '🎊', desc: 'Confetti showers celebrate your milestone', tag: 'FUN', Preview: BalloonPreview },
    { id: 'heart-firework', label: 'Golden Burst', emoji: '✨', desc: 'Golden particles spell out your achievement', tag: 'PREMIUM', Preview: HeartFireworkPreview },
  ],
  love: [
    { id: 'heart-firework', label: 'Heart Burst', emoji: '💜', desc: 'Fireworks form a glowing heart with your message', tag: 'FAVORITE', Preview: HeartFireworkPreview },
    { id: 'balloon', label: 'Rose Garden', emoji: '🌹', desc: 'Petals float up to form your love message', tag: 'ROMANTIC', Preview: BalloonPreview },
    { id: 'rocket', label: 'Love Rocket', emoji: '🚀', desc: 'Launch your love to infinity and beyond', tag: 'BOLD', Preview: RocketPreview },
  ],
}

const CATEGORY_LABELS = {
  birthday: 'Birthdays',
  holidays: 'Holidays',
  congrats: 'Congrats',
  love: 'Love & Personal',
}

export default function TemplateSelectScreen({ category = 'birthday', onSelect, onBack }) {
  const [activePreview, setActivePreview] = useState(null)
  const templates = TEMPLATES[category] || TEMPLATES.birthday

  return (
    <div className="screen" style={{
      background: 'radial-gradient(ellipse at 50% 0%, #0f0a20 0%, #0d0720 60%, #05020f 100%)',
      overflowY: 'auto',
      padding: '0 0 40px',
    }}>
      <StarsBg count={40} />

      {/* Header */}
      <div style={{ padding: '52px 24px 24px', position: 'relative' }}>
        <button className="btn-ghost" onClick={onBack} style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          ← Back
        </button>
        <h1 style={{ fontFamily: 'var(--font-main)', fontSize: '1.6rem', fontWeight: '800', marginBottom: '4px' }}>
          {CATEGORY_LABELS[category] || 'Templates'}
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
          Tap a template to preview the hologram
        </p>
      </div>

      {/* Template cards */}
      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {templates.map((tpl, idx) => {
          const PreviewComp = tpl.Preview
          const isActive = activePreview === tpl.id
          return (
            <div
              key={tpl.id + idx}
              style={{
                borderRadius: '24px',
                border: `1px solid ${isActive ? 'rgba(168,85,247,0.5)' : 'rgba(255,255,255,0.07)'}`,
                background: isActive ? 'rgba(124,58,237,0.1)' : 'rgba(255,255,255,0.03)',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                boxShadow: isActive ? '0 4px 30px rgba(124,58,237,0.25)' : 'none',
              }}
            >
              {/* Preview area */}
              <div
                style={{
                  height: isActive ? '220px' : '140px',
                  background: 'rgba(0,0,0,0.5)',
                  position: 'relative',
                  cursor: 'pointer',
                  transition: 'height 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}
                onClick={() => setActivePreview(isActive ? null : tpl.id)}
              >
                {/* Scanline effect */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)',
                  pointerEvents: 'none',
                }} />

                <PreviewComp isPlaying={isActive} />

                {!isActive && (
                  <div style={{
                    position: 'absolute', inset: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(0,0,0,0.3)',
                  }}>
                    <div style={{
                      width: '48px', height: '48px',
                      borderRadius: '50%',
                      background: 'rgba(124,58,237,0.8)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: '0 0 20px rgba(124,58,237,0.5)',
                    }}>
                      <PlayIcon />
                    </div>
                  </div>
                )}

                {/* Tag */}
                <div style={{
                  position: 'absolute', top: '10px', left: '10px',
                  background: 'rgba(0,0,0,0.7)',
                  border: '1px solid rgba(168,85,247,0.4)',
                  borderRadius: '8px',
                  padding: '3px 10px',
                  fontSize: '0.68rem',
                  fontWeight: '700',
                  color: '#a855f7',
                  letterSpacing: '0.1em',
                  backdropFilter: 'blur(8px)',
                }}>
                  {tpl.tag}
                </div>
              </div>

              {/* Info + CTA */}
              <div style={{ padding: '16px 18px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ fontSize: '2rem', flexShrink: 0 }}>{tpl.emoji}</div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: 'var(--font-main)', fontWeight: '700', fontSize: '1rem', marginBottom: '3px' }}>
                    {tpl.label}
                  </p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', lineHeight: 1.4 }}>
                    {tpl.desc}
                  </p>
                </div>
                <button
                  onClick={() => onSelect(tpl.id)}
                  style={{
                    padding: '10px 18px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
                    border: 'none',
                    color: 'white',
                    fontSize: '0.85rem',
                    fontWeight: '700',
                    fontFamily: 'var(--font-main)',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 2px 12px rgba(124,58,237,0.4)',
                    flexShrink: 0,
                    transition: 'transform 0.2s, box-shadow 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(124,58,237,0.6)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(124,58,237,0.4)' }}
                >
                  Use →
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function PlayIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><polygon points="5,3 19,12 5,21"/></svg>
}
