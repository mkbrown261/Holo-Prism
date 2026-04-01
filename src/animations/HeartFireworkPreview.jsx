import { useState, useEffect } from 'react'

export default function HeartFireworkPreview({ isPlaying = false }) {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    if (!isPlaying) { setPhase(0); return }
    const t1 = setTimeout(() => setPhase(1), 300)
    const t2 = setTimeout(() => setPhase(2), 1400)
    const t3 = setTimeout(() => setPhase(0), 3500)
    return () => [t1, t2, t3].forEach(clearTimeout)
  }, [isPlaying])

  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'radial-gradient(circle at 50% 40%, rgba(244,114,182,0.12), transparent 70%)',
      position: 'relative', overflow: 'hidden',
    }}>
      {phase === 0 && (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
          opacity: 0.5,
        }}>
          <span style={{ fontSize: '2rem' }}>💜</span>
        </div>
      )}
      {phase === 1 && (
        <div style={{ position: 'relative', width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i / 8) * 360
            const d = 32
            const colors = ['#f472b6','#fbbf24','#a855f7','#22d3ee']
            return (
              <div key={i} style={{
                position: 'absolute',
                width: '5px', height: '5px', borderRadius: '50%',
                background: colors[i % 4],
                animation: 'particle-burst 0.6s ease forwards',
                '--tx': `${Math.cos(angle*Math.PI/180)*d}px`,
                '--ty': `${Math.sin(angle*Math.PI/180)*d}px`,
                animationDelay: `${i * 0.03}s`,
                boxShadow: `0 0 4px ${colors[i%4]}`,
              }} />
            )
          })}
        </div>
      )}
      {phase === 2 && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', animation: 'fade-in-up 0.5s ease' }}>
          <span style={{
            fontSize: '2.2rem',
            filter: 'drop-shadow(0 0 14px rgba(244,114,182,0.9))',
            animation: 'heartbeat 1.2s ease infinite',
          }}>💜</span>
          <div style={{
            fontFamily: 'var(--font-main)', fontWeight: '900',
            fontSize: '0.72rem', letterSpacing: '0.06em',
            background: 'linear-gradient(135deg, #f472b6, #a855f7)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 0 6px rgba(244,114,182,0.5))',
          }}>I LOVE YOU</div>
        </div>
      )}
    </div>
  )
}
