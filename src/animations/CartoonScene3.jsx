import { useState, useEffect } from 'react'

// Scene 3: Hologram moment - rocket launches from pyramid
export default function CartoonScene3() {
  const [phase, setPhase] = useState(0) // 0=phone lights up, 1=rocket, 2=explode, 3=text

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 500)
    const t2 = setTimeout(() => setPhase(2), 1600)
    const t3 = setTimeout(() => setPhase(3), 2400)
    return () => [t1, t2, t3].forEach(clearTimeout)
  }, [])

  return (
    <div style={{
      width: '100%',
      height: '300px',
      position: 'relative',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      padding: '0 12px 16px',
    }}>
      {/* Dark room bg */}
      <div style={{
        position: 'absolute', inset: 0,
        borderRadius: '24px',
        background: 'radial-gradient(ellipse at 50% 80%, #1a0d35 0%, #07041a 100%)',
        overflow: 'hidden',
      }}>
        {/* ambient glow from phone */}
        {phase >= 0 && (
          <div style={{
            position: 'absolute',
            bottom: '50px', left: '50%',
            transform: 'translateX(-50%)',
            width: '180px', height: '60px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(124,58,237,0.3), transparent 70%)',
            filter: 'blur(20px)',
            animation: 'pulse-glow 1.5s ease infinite',
            transition: 'opacity 0.5s',
            opacity: phase >= 1 ? 1 : 0,
          }} />
        )}
      </div>

      {/* Table */}
      <div style={{
        position: 'absolute', bottom: '36px', left: '50%',
        transform: 'translateX(-50%)', width: '200px', zIndex: 3,
      }}>
        <div style={{ height: '10px', background: 'linear-gradient(180deg, #3d2060, #2a1545)', borderRadius: '6px 6px 0 0', border: '1px solid rgba(168,85,247,0.25)' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 20px' }}>
          <div style={{ width: '8px', height: '24px', background: '#2a1545', borderRadius: '0 0 4px 4px' }} />
          <div style={{ width: '8px', height: '24px', background: '#2a1545', borderRadius: '0 0 4px 4px' }} />
        </div>
      </div>

      {/* PHONE SCREEN (lit up) */}
      <div style={{
        position: 'absolute', bottom: '44px', left: '50%',
        transform: 'translateX(-50%)', zIndex: 4,
      }}>
        <div style={{
          width: '72px', height: '40px',
          borderRadius: '7px',
          background: phase >= 1
            ? 'linear-gradient(135deg, #0a0030, #1a0050)'
            : 'linear-gradient(135deg, #1e1035, #0d0720)',
          border: `1.5px solid ${phase >= 1 ? 'rgba(168,85,247,0.8)' : 'rgba(168,85,247,0.3)'}`,
          boxShadow: phase >= 1 ? '0 0 20px rgba(124,58,237,0.6)' : '0 0 8px rgba(124,58,237,0.2)',
          transition: 'all 0.5s ease',
          overflow: 'hidden',
        }}>
          {/* 4-way hologram on screen */}
          {phase >= 1 && (
            <div style={{
              width: '100%', height: '100%',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gridTemplateRows: '1fr 1fr',
              gap: '0',
            }}>
              {[0, 90, 270, 180].map((rot, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(124,58,237,0.06)',
                  fontSize: '0.5rem',
                  transform: `rotate(${rot}deg)`,
                  color: '#a855f7',
                }}>🚀</div>
              ))}
              <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '1px', background: 'rgba(168,85,247,0.3)', transform: 'translateX(-50%)' }} />
              <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: 'rgba(168,85,247,0.3)', transform: 'translateY(-50%)' }} />
            </div>
          )}
        </div>
      </div>

      {/* PYRAMID on phone */}
      <div style={{ position: 'absolute', bottom: '52px', left: 'calc(50% - 10px)', zIndex: 5 }}>
        <svg width="22" height="22" viewBox="0 0 36 36" fill="none" style={{ filter: phase >= 1 ? 'drop-shadow(0 0 8px rgba(34,211,238,0.8))' : 'none', transition: 'filter 0.5s' }}>
          <polygon points="18,3 3,33 33,33" fill="rgba(168,85,247,0.06)" stroke={phase >= 1 ? '#22d3ee' : '#a855f7'} strokeWidth="1.5" />
          <polygon points="18,3 3,33 18,37 18,3" fill="rgba(124,58,237,0.1)" stroke="#7c3aed" strokeWidth="1" />
          <polygon points="18,3 33,33 18,37 18,3" fill="rgba(34,211,238,0.06)" stroke="#0e7490" strokeWidth="1" />
          <circle cx="18" cy="3" r="2.5" fill={phase >= 1 ? '#22d3ee' : '#a855f7'} />
        </svg>
      </div>

      {/* HOLOGRAM ROCKET floating above pyramid */}
      {phase >= 1 && (
        <div style={{
          position: 'absolute',
          bottom: phase === 1 ? '80px' : phase === 2 ? '160px' : '80px',
          left: 'calc(50% - 12px)',
          zIndex: 8,
          transition: phase === 2 ? 'bottom 0.7s ease' : 'none',
          fontSize: '1.8rem',
          filter: 'drop-shadow(0 0 14px rgba(168,85,247,0.9))',
          animation: phase === 1 ? 'float 1.5s ease-in-out infinite' : 'none',
          opacity: phase === 2 ? 0 : 1,
          transitionProperty: 'bottom, opacity',
        }}>
          🚀
        </div>
      )}

      {/* EXPLOSION */}
      {phase === 2 && (
        <div style={{
          position: 'absolute',
          bottom: '150px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 9,
        }}>
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i / 12) * 360
            const dist = 40
            const tx = Math.cos((angle * Math.PI) / 180) * dist
            const ty = Math.sin((angle * Math.PI) / 180) * dist
            const colors = ['#fbbf24', '#f472b6', '#a855f7', '#22d3ee']
            return (
              <div key={i} style={{
                position: 'absolute',
                width: '7px', height: '7px',
                borderRadius: '50%',
                background: colors[i % 4],
                animation: 'particle-burst 0.6s ease forwards',
                '--tx': `${tx}px`, '--ty': `${ty}px`,
                boxShadow: `0 0 5px ${colors[i % 4]}`,
              }} />
            )
          })}
        </div>
      )}

      {/* TEXT REVEAL */}
      {phase >= 3 && (
        <div style={{
          position: 'absolute',
          bottom: '120px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 9,
          textAlign: 'center',
          animation: 'fade-in-up 0.5s ease',
          whiteSpace: 'nowrap',
        }}>
          <div style={{
            fontFamily: 'var(--font-main)',
            fontWeight: '900',
            fontSize: '0.9rem',
            background: 'linear-gradient(135deg, #fbbf24, #f472b6, #a855f7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '0.1em',
            filter: 'drop-shadow(0 0 8px rgba(168,85,247,0.6))',
            animation: 'float 2s ease-in-out infinite',
          }}>
            HAPPY BIRTHDAY
          </div>
          {/* Sparkles around text */}
          {['✦','✦','✦'].map((s, i) => (
            <span key={i} style={{
              position: 'absolute',
              top: i === 0 ? '-8px' : '100%',
              left: `${20 + i * 30}%`,
              fontSize: '0.55rem',
              color: ['#fbbf24','#22d3ee','#f472b6'][i],
              animation: `sparkle ${1+i*0.3}s ease infinite`,
              animationDelay: `${i*0.2}s`,
            }}>{s}</span>
          ))}
        </div>
      )}

      {/* GLOW REFLECTION on pyramid edges */}
      {phase >= 1 && (
        <div style={{
          position: 'absolute',
          bottom: '50px',
          left: 'calc(50% - 15px)',
          width: '30px', height: '30px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.4), transparent 70%)',
          filter: 'blur(8px)',
          animation: 'pulse-glow 1s ease infinite',
          zIndex: 4,
        }} />
      )}
    </div>
  )
}
