import { useState, useEffect } from 'react'

export default function BalloonPreview({ isPlaying = false }) {
  const [risen, setRisen] = useState(false)
  const [showText, setShowText] = useState(false)

  useEffect(() => {
    if (!isPlaying) { setRisen(false); setShowText(false); return }
    const t1 = setTimeout(() => setRisen(true), 200)
    const t2 = setTimeout(() => setShowText(true), 1500)
    const t3 = setTimeout(() => { setRisen(false); setShowText(false) }, 3500)
    return () => [t1, t2, t3].forEach(clearTimeout)
  }, [isPlaying])

  const balloons = ['🎈','🎊','🎉','🎈','🎀']
  const xPos = [-40, -20, 0, 20, 40]

  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'radial-gradient(circle at 50% 30%, rgba(244,114,182,0.1), transparent 70%)',
      position: 'relative', overflow: 'hidden',
    }}>
      {!showText ? (
        balloons.map((b, i) => (
          <div key={i} style={{
            position: 'absolute',
            bottom: risen ? `${55 + (i % 2) * 12}%` : '-20%',
            left: `calc(50% + ${xPos[i]}px)`,
            fontSize: '1.6rem',
            transition: `bottom ${0.7 + i * 0.1}s cubic-bezier(0.34, 1.56, 0.64, 1)`,
            transitionDelay: `${i * 0.07}s`,
            filter: 'drop-shadow(0 0 6px rgba(244,114,182,0.6))',
            animation: risen ? `float ${1.5 + i * 0.2}s ease-in-out infinite` : 'none',
            animationDelay: `${i * 0.1}s`,
          }}>{b}</div>
        ))
      ) : (
        <div style={{
          fontFamily: 'var(--font-main)', fontWeight: '900',
          fontSize: '0.8rem', letterSpacing: '0.06em', textAlign: 'center',
          background: 'linear-gradient(135deg, #f472b6, #fbbf24, #22d3ee)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          animation: 'fade-in-up 0.5s ease',
          filter: 'drop-shadow(0 0 8px rgba(244,114,182,0.5))',
        }}>HAPPY BIRTHDAY</div>
      )}
    </div>
  )
}
