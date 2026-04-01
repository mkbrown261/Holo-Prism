import { useState, useEffect } from 'react'

export default function BalloonHologram({ customText = 'HAPPY BIRTHDAY', animStyle = 'sparkle', isPlaying = true, compact = false }) {
  const [phase, setPhase] = useState(0) // 0=rising, 1=cluster, 2=text

  useEffect(() => {
    if (!isPlaying) { setPhase(0); return }
    const t1 = setTimeout(() => setPhase(1), 1600)
    const t2 = setTimeout(() => setPhase(2), 2800)
    const t3 = setTimeout(() => setPhase(0), 5000)
    return () => [t1, t2, t3].forEach(clearTimeout)
  }, [isPlaying])

  const scale = compact ? 0.5 : 1
  const BALLOONS = ['🎈', '🎀', '🎊', '🎉', '🎈', '🎈']
  const colors = ['#f472b6', '#a855f7', '#fbbf24', '#22d3ee', '#f97316', '#84fab0']

  return (
    <div style={{
      width: '100%',
      height: compact ? '100%' : '280px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{ transform: `scale(${scale})`, transformOrigin: 'center', position: 'relative', width: '180px', height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

        {/* Balloons */}
        {phase < 2 && BALLOONS.map((b, i) => {
          const xPositions = [-55, -30, -5, 20, 45, 0]
          const targetY = phase === 0 ? 100 : (i < 3 ? -40 : -20)
          const delays = [0, 0.15, 0.08, 0.22, 0.1, 0.3]
          return (
            <div key={i} style={{
              position: 'absolute',
              fontSize: phase === 1 ? '1.6rem' : '2rem',
              left: `calc(50% + ${xPositions[i]}px)`,
              bottom: `${targetY}px`,
              transition: `bottom ${0.9 + delays[i]}s cubic-bezier(0.34, 1.56, 0.64, 1), font-size 0.4s ease`,
              transitionDelay: `${delays[i]}s`,
              filter: `drop-shadow(0 0 6px ${colors[i]}80)`,
              animation: phase === 1 ? `float ${2 + i * 0.2}s ease-in-out infinite` : 'none',
            }}>
              {b}
              {/* String */}
              <div style={{
                position: 'absolute',
                top: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '1px',
                height: '30px',
                background: `linear-gradient(180deg, ${colors[i]}60, transparent)`,
              }} />
            </div>
          )
        })}

        {/* Text */}
        {phase === 2 && (
          <BalloonText text={customText} animStyle={animStyle} />
        )}

        {/* Confetti when clustered */}
        {phase >= 1 && phase < 2 && (
          <ConfettiRain />
        )}
      </div>
    </div>
  )
}

function ConfettiRain() {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {Array.from({ length: 12 }).map((_, i) => {
        const colors = ['#f472b6', '#fbbf24', '#22d3ee', '#a855f7', '#84fab0']
        return (
          <div key={i} style={{
            position: 'absolute',
            left: `${(i / 12) * 100}%`,
            top: '-10px',
            width: '6px', height: '8px',
            borderRadius: '1px',
            background: colors[i % colors.length],
            opacity: 0.8,
            animation: `rise ${1.5 + Math.random() * 0.8}s ease forwards`,
            animationDelay: `${i * 0.08}s`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }} />
        )
      })}
    </div>
  )
}

function BalloonText({ text, animStyle }) {
  const colors = {
    sparkle: 'linear-gradient(135deg, #f472b6, #fbbf24, #22d3ee)',
    'soft-glow': 'linear-gradient(135deg, #c4b5fd, #fbcfe8)',
    neon: 'linear-gradient(135deg, #22d3ee, #f472b6)',
  }
  return (
    <div style={{
      position: 'absolute',
      textAlign: 'center',
      fontFamily: 'var(--font-main)',
      fontWeight: '900',
      fontSize: '0.95rem',
      background: colors[animStyle] || colors.sparkle,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      letterSpacing: '0.08em',
      maxWidth: '140px',
      animation: 'fade-in-up 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
      filter: 'drop-shadow(0 0 10px rgba(244,114,182,0.5))',
    }}>
      {text}
    </div>
  )
}
