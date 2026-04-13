import { useState, useEffect } from 'react'

export default function HeartHologram({ customText = 'HAPPY BIRTHDAY', animStyle = 'sparkle', isPlaying = true, compact = false }) {
  const [phase, setPhase] = useState(0) // 0=fireworks, 1=heart, 2=text

  useEffect(() => {
    if (!isPlaying) { setPhase(0); return }
    const t1 = setTimeout(() => setPhase(1), 1400)
    const t2 = setTimeout(() => setPhase(2), 2500)
    const t3 = setTimeout(() => setPhase(0), 5200)
    return () => [t1, t2, t3].forEach(clearTimeout)
  }, [isPlaying])

  const scale = compact ? 0.5 : 1

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
      <div style={{ transform: `scale(${scale})`, transformOrigin: 'center', position: 'relative', width: '200px', height: '240px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

        {/* Firework launches */}
        {phase === 0 && <FireworkLaunch />}

        {/* Heart */}
        {(phase === 1) && (
          <div style={{
            fontSize: '5rem',
            animation: 'heartbeat 1.2s ease infinite, fade-in-up 0.5s ease',
            filter: 'drop-shadow(0 0 20px rgba(244,114,182,0.8))',
          }}>
            💜
          </div>
        )}

        {/* Text */}
        {phase === 2 && (
          <HeartText text={customText} animStyle={animStyle} />
        )}
      </div>
    </div>
  )
}

function FireworkLaunch() {
  const launches = [
    { x: '20%', color: '#f472b6', delay: '0s' },
    { x: '50%', color: '#a855f7', delay: '0.2s' },
    { x: '80%', color: '#22d3ee', delay: '0.1s' },
  ]
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      {launches.map((fw, i) => (
        <div key={i} style={{ position: 'absolute', left: fw.x, bottom: '20px' }}>
          {/* Streak going up */}
          <div style={{
            width: '2px',
            height: '60px',
            background: `linear-gradient(0deg, transparent, ${fw.color})`,
            animation: `rise 0.6s ease forwards`,
            animationDelay: fw.delay,
            marginLeft: '-1px',
          }} />
          {/* Burst at top */}
          <div style={{
            position: 'absolute',
            top: '-60px', left: '-20px',
            width: '42px', height: '42px',
          }}>
            {Array.from({ length: 8 }).map((_, j) => {
              const angle = (j / 8) * 360
              const tx = Math.cos((angle * Math.PI) / 180) * 24
              const ty = Math.sin((angle * Math.PI) / 180) * 24
              return (
                <div key={j} style={{
                  position: 'absolute',
                  left: '50%', top: '50%',
                  width: '4px', height: '4px',
                  borderRadius: '50%',
                  background: fw.color,
                  animation: `particle-burst 0.7s ease forwards`,
                  '--tx': `${tx}px`,
                  '--ty': `${ty}px`,
                  animationDelay: fw.delay,
                  boxShadow: `0 0 4px ${fw.color}`,
                }} />
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

function HeartText({ text, animStyle }) {
  const shadows = {
    sparkle: 'rgba(244,114,182,0.6)',
    'soft-glow': 'rgba(196,181,253,0.5)',
    neon: 'rgba(34,211,238,0.6)',
  }
  const gradients = {
    sparkle: 'linear-gradient(135deg, #f472b6, #a855f7, #fbbf24)',
    'soft-glow': 'linear-gradient(135deg, #c4b5fd, #fbcfe8)',
    neon: 'linear-gradient(135deg, #f472b6, #22d3ee)',
  }
  return (
    <div style={{
      position: 'absolute',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '8px',
      animation: 'fade-in-up 0.6s ease',
    }}>
      <span style={{ fontSize: '2.5rem', animation: 'heartbeat 1.5s ease infinite', filter: `drop-shadow(0 0 12px ${shadows[animStyle]})` }}>💜</span>
      <div style={{
        fontFamily: 'var(--font-main)',
        fontWeight: '900',
        fontSize: '0.9rem',
        background: gradients[animStyle] || gradients.sparkle,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        letterSpacing: '0.08em',
        maxWidth: '140px',
        textAlign: 'center',
        filter: `drop-shadow(0 0 8px ${shadows[animStyle]})`,
      }}>
        {text}
      </div>
    </div>
  )
}
