import { useState, useEffect } from 'react'

export default function RocketPreview({ isPlaying = false }) {
  const [pos, setPos] = useState(0)
  const [exploded, setExploded] = useState(false)

  useEffect(() => {
    if (!isPlaying) { setPos(0); setExploded(false); return }
    const t1 = setTimeout(() => setPos(1), 100)
    const t2 = setTimeout(() => setExploded(true), 1000)
    const t3 = setTimeout(() => { setPos(0); setExploded(false) }, 2800)
    return () => [t1, t2, t3].forEach(clearTimeout)
  }, [isPlaying])

  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'radial-gradient(circle at 50% 60%, rgba(124,58,237,0.15), transparent 70%)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Stars background */}
      {[...Array(8)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: `${10 + i * 11}%`,
          top: `${15 + (i % 3) * 20}%`,
          width: '2px', height: '2px',
          borderRadius: '50%', background: 'white',
          opacity: 0.4,
          animation: `star-twinkle ${1.5 + i * 0.3}s ease infinite`,
          animationDelay: `${i * 0.2}s`,
        }} />
      ))}

      {!exploded ? (
        <div style={{
          fontSize: '2.5rem',
          position: 'absolute',
          bottom: pos === 0 ? '20%' : '120%',
          left: '50%', transform: 'translateX(-50%) rotate(-45deg)',
          transition: pos === 1 ? 'bottom 0.9s ease' : 'none',
          filter: 'drop-shadow(0 0 8px rgba(168,85,247,0.8))',
        }}>🚀</div>
      ) : (
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {Array.from({ length: 10 }).map((_, i) => {
            const angle = (i / 10) * 360
            const d = 35
            return (
              <div key={i} style={{
                position: 'absolute',
                width: '6px', height: '6px',
                borderRadius: '50%',
                background: ['#fbbf24','#f472b6','#a855f7','#22d3ee','#f97316'][i % 5],
                animation: 'particle-burst 0.7s ease forwards',
                '--tx': `${Math.cos(angle*Math.PI/180)*d}px`,
                '--ty': `${Math.sin(angle*Math.PI/180)*d}px`,
                boxShadow: '0 0 4px currentColor',
              }} />
            )
          })}
          <div style={{
            fontFamily: 'var(--font-main)', fontWeight: '900',
            fontSize: '0.75rem', letterSpacing: '0.06em',
            background: 'linear-gradient(135deg, #fbbf24, #f472b6)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'fade-in-up 0.4s ease',
            filter: 'drop-shadow(0 0 8px rgba(168,85,247,0.5))',
          }}>HAPPY BIRTHDAY</div>
        </div>
      )}
    </div>
  )
}
