import { useState, useEffect } from 'react'

export default function RocketHologram({ customText = 'HAPPY BIRTHDAY', animStyle = 'sparkle', isPlaying = true, compact = false }) {
  const [phase, setPhase] = useState(0) // 0=rocket, 1=explode, 2=text, 3=reset

  useEffect(() => {
    if (!isPlaying) { setPhase(0); return }
    const timings = [0, 1800, 2600, 4000]
    const timers = timings.map((t, i) => setTimeout(() => setPhase(i), t))
    const loop = setTimeout(() => { setPhase(0) }, 5500)
    return () => { timers.forEach(clearTimeout); clearTimeout(loop) }
  }, [isPlaying])

  const scale = compact ? 0.52 : 1

  return (
    <div style={{
      width: compact ? '100%' : '100%',
      height: compact ? '100%' : '280px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{ transform: `scale(${scale})`, transformOrigin: 'center', position: 'relative', width: '180px', height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

        {/* Rocket */}
        {(phase === 0 || phase === 1) && (
          <div style={{
            position: 'absolute',
            fontSize: '3rem',
            bottom: phase === 0 ? '20px' : '200px',
            left: '50%',
            transform: 'translateX(-50%)',
            transition: phase === 1 ? 'bottom 0.8s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
            filter: `drop-shadow(0 0 12px rgba(168,85,247,0.8))`,
            zIndex: 5,
          }}>
            🚀
            {/* Flame trail */}
            {phase === 1 && (
              <div style={{
                position: 'absolute',
                bottom: '-30px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
                alignItems: 'center',
              }}>
                {['#fbbf24', '#f97316', '#ef4444'].map((c, i) => (
                  <div key={i} style={{
                    width: `${14 - i * 3}px`,
                    height: `${10 + i * 6}px`,
                    borderRadius: '50%',
                    background: c,
                    opacity: 0.8 - i * 0.15,
                    filter: `blur(${i + 1}px)`,
                    animation: `pulse-glow 0.2s ease infinite`,
                    animationDelay: `${i * 0.05}s`,
                  }} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Explosion burst */}
        {phase === 2 && (
          <div style={{ position: 'absolute', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Burst ring */}
            {[0, 1, 2].map(i => (
              <div key={i} style={{
                position: 'absolute',
                width: `${(i + 1) * 50}px`,
                height: `${(i + 1) * 50}px`,
                borderRadius: '50%',
                border: `2px solid rgba(251,191,36,${0.8 - i * 0.25})`,
                animation: `explode 0.6s ease forwards`,
                animationDelay: `${i * 0.08}s`,
              }} />
            ))}
            {/* Particles */}
            {Array.from({ length: 14 }).map((_, i) => {
              const angle = (i / 14) * 360
              const dist = 50 + Math.random() * 30
              const tx = Math.cos((angle * Math.PI) / 180) * dist
              const ty = Math.sin((angle * Math.PI) / 180) * dist
              const colors = ['#fbbf24', '#f97316', '#a855f7', '#22d3ee', '#f472b6', '#fff']
              return (
                <div key={i} style={{
                  position: 'absolute',
                  width: '6px', height: '6px',
                  borderRadius: '50%',
                  background: colors[i % colors.length],
                  animation: `particle-burst 0.7s ease forwards`,
                  '--tx': `${tx}px`,
                  '--ty': `${ty}px`,
                  filter: `blur(0.5px)`,
                  boxShadow: `0 0 4px ${colors[i % colors.length]}`,
                  animationDelay: `${i * 0.02}s`,
                }} />
              )
            })}
          </div>
        )}

        {/* Text reveal */}
        {(phase === 2 || phase === 3) && (
          <HologramText text={customText} animStyle={animStyle} />
        )}
      </div>
    </div>
  )
}

function HologramText({ text, animStyle }) {
  const colors = {
    sparkle: 'linear-gradient(135deg, #fbbf24, #f472b6, #a855f7)',
    'soft-glow': 'linear-gradient(135deg, #c084fc, #93c5fd)',
    neon: 'linear-gradient(135deg, #22d3ee, #a855f7)',
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
      lineHeight: 1.2,
      maxWidth: '140px',
      wordBreak: 'break-word',
      textAlign: 'center',
      animation: 'fade-in-up 0.5s ease',
      filter: 'drop-shadow(0 0 8px rgba(168,85,247,0.6))',
      textShadow: 'none',
    }}>
      {text}
      {animStyle === 'sparkle' && (
        <div style={{ position: 'absolute', inset: '-10px', pointerEvents: 'none' }}>
          {[['-8px','-5px'], ['105%','10%'], ['50%','-12px'], ['-10px','80%']].map(([l, t], i) => (
            <div key={i} style={{
              position: 'absolute',
              left: l, top: t,
              fontSize: '0.7rem',
              animation: `sparkle ${1 + i * 0.3}s ease-in-out infinite`,
              animationDelay: `${i * 0.25}s`,
            }}>✦</div>
          ))}
        </div>
      )}
      {animStyle === 'neon' && (
        <div style={{ position: 'absolute', inset: 0, animation: 'neon-flicker 4s ease infinite', borderRadius: '4px', boxShadow: '0 0 8px rgba(34,211,238,0.3)' }} />
      )}
    </div>
  )
}
