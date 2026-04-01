import { useState, useEffect } from 'react'

// Scene 4: Second person enters, records moment
export default function CartoonScene4() {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 300)
    const t2 = setTimeout(() => setStep(2), 1000)
    const t3 = setTimeout(() => setStep(3), 1800)
    return () => [t1, t2, t3].forEach(clearTimeout)
  }, [])

  return (
    <div style={{
      width: '100%',
      height: '290px',
      position: 'relative',
      overflow: 'hidden',
      borderRadius: '24px',
    }}>
      {/* Background */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 50% 60%, #1a0d35 0%, #07041a 100%)',
      }}>
        {/* Stars */}
        {[[10,10],[80,15],[60,30],[25,45],[90,50],[40,8]].map(([x,y],i) => (
          <div key={i} style={{
            position: 'absolute', left: `${x}%`, top: `${y}%`,
            width: '2px', height: '2px', borderRadius: '50%', background: 'white',
            animation: `star-twinkle ${2+i*0.4}s ease infinite`, animationDelay: `${i*0.3}s`,
          }} />
        ))}
        {/* Share icons floating up */}
        {step >= 3 && ['TikTok','Instagram','Snap'].map((p, i) => (
          <div key={p} style={{
            position: 'absolute',
            right: `${15 + i * 15}%`,
            bottom: step >= 3 ? `${70 + i * 20}px` : '20px',
            transition: `all ${0.6 + i * 0.2}s ease`,
            transitionDelay: `${i * 0.15}s`,
            opacity: step >= 3 ? 1 : 0,
            animation: step >= 3 ? `float ${2 + i * 0.3}s ease-in-out infinite` : 'none',
            animationDelay: `${i * 0.2}s`,
          }}>
            <div style={{
              background: ['rgba(0,0,0,0.7)','rgba(225,48,108,0.15)','rgba(255,252,0,0.1)'][i],
              border: `1px solid ${['rgba(255,255,255,0.2)','rgba(225,48,108,0.4)','rgba(255,252,0,0.3)'][i]}`,
              borderRadius: '8px',
              padding: '4px 8px',
              fontSize: '0.6rem',
              fontFamily: 'var(--font-main)',
              fontWeight: '700',
              color: ['white','#e1306c','#ccc'][i],
              display: 'flex', alignItems: 'center', gap: '3px',
              backdropFilter: 'blur(8px)',
            }}>
              {['🎵','📸','👻'][i]} {p}
            </div>
          </div>
        ))}
      </div>

      {/* Floor */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '35%',
        background: 'linear-gradient(0deg, rgba(124,58,237,0.06), transparent)',
        borderTop: '1px solid rgba(124,58,237,0.1)',
      }} />

      {/* TABLE + SETUP */}
      <div style={{ position: 'absolute', bottom: '36px', left: '28px', zIndex: 3 }}>
        <div style={{ height: '8px', width: '100px', background: 'linear-gradient(180deg, #3d2060, #2a1545)', borderRadius: '4px 4px 0 0', border: '1px solid rgba(168,85,247,0.2)' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 12px' }}>
          <div style={{ width: '6px', height: '20px', background: '#2a1545', borderRadius: '0 0 3px 3px' }} />
          <div style={{ width: '6px', height: '20px', background: '#2a1545', borderRadius: '0 0 3px 3px' }} />
        </div>
      </div>

      {/* Phone + pyramid on table */}
      <div style={{ position: 'absolute', bottom: '42px', left: '50px', zIndex: 4 }}>
        <div style={{ width: '50px', height: '28px', borderRadius: '5px', background: '#1e1035', border: '1.5px solid rgba(168,85,247,0.5)', boxShadow: '0 0 12px rgba(124,58,237,0.5)' }}>
          <div style={{ width: '100%', height: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', borderRadius: '3px', overflow: 'hidden' }}>
            {[0,90,270,180].map((r,i) => <div key={i} style={{ background: 'rgba(124,58,237,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.35rem', transform: `rotate(${r}deg)` }}>🚀</div>)}
          </div>
        </div>
        {/* Pyramid on top */}
        <div style={{ position: 'absolute', bottom: '16px', left: '14px', filter: 'drop-shadow(0 0 8px rgba(34,211,238,0.7))' }}>
          <svg width="22" height="20" viewBox="0 0 36 36" fill="none">
            <polygon points="18,3 3,33 33,33" fill="rgba(168,85,247,0.06)" stroke="#22d3ee" strokeWidth="1.5" />
            <polygon points="18,3 3,33 18,37 18,3" fill="rgba(124,58,237,0.1)" stroke="#7c3aed" strokeWidth="1" />
            <polygon points="18,3 33,33 18,37 18,3" fill="rgba(34,211,238,0.06)" stroke="#0e7490" strokeWidth="1" />
            <circle cx="18" cy="3" r="2.5" fill="#22d3ee">
              <animate attributeName="r" values="2;3;2" dur="1.5s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>
        {/* Hologram text floating */}
        <div style={{
          position: 'absolute',
          bottom: '44px', left: '-15px',
          fontFamily: 'var(--font-main)',
          fontWeight: '900',
          fontSize: '0.45rem',
          background: 'linear-gradient(135deg, #fbbf24, #f472b6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          letterSpacing: '0.08em',
          whiteSpace: 'nowrap',
          filter: 'drop-shadow(0 0 4px rgba(168,85,247,0.7))',
          animation: 'float 2s ease-in-out infinite',
        }}>
          HAPPY BIRTHDAY
        </div>
      </div>

      {/* PERSON 1 (original, on left watching) */}
      <div style={{
        position: 'absolute', left: '6px', bottom: '32px', zIndex: 5,
        opacity: step >= 1 ? 1 : 0,
        transition: 'opacity 0.4s ease',
      }}>
        <Person1 excitement={step >= 2} />
      </div>

      {/* PERSON 2 (enters from right, holding phone to record) */}
      <div style={{
        position: 'absolute', right: step >= 1 ? '8px' : '-80px', bottom: '32px', zIndex: 5,
        transition: 'right 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}>
        <Person2 recording={step >= 2} />
      </div>

      {/* REC indicator */}
      {step >= 2 && (
        <div style={{
          position: 'absolute', top: '14px', right: '14px',
          display: 'flex', alignItems: 'center', gap: '5px',
          background: 'rgba(0,0,0,0.7)',
          borderRadius: '8px', padding: '4px 10px',
          animation: 'fade-in-up 0.3s ease',
        }}>
          <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#ef4444', animation: 'pulse-glow 0.8s ease infinite' }} />
          <span style={{ color: 'white', fontSize: '0.65rem', fontWeight: '700', fontFamily: 'var(--font-main)' }}>REC</span>
        </div>
      )}
    </div>
  )
}

function Person1({ excitement }) {
  return (
    <svg width="58" height="115" viewBox="0 0 58 115" fill="none">
      <ellipse cx="29" cy="112" rx="16" ry="3.5" fill="rgba(0,0,0,0.25)" />
      <rect x="16" y="79" width="9" height="28" rx="4" fill="#5b21b6" />
      <rect x="30" y="79" width="9" height="28" rx="4" fill="#4c1d95" />
      <ellipse cx="20" cy="107" rx="7" ry="4" fill="#2e1065" />
      <ellipse cx="35" cy="107" rx="7" ry="4" fill="#2e1065" />
      <rect x="14" y="46" width="30" height="35" rx="9" fill="#7c3aed" />
      {/* Arms spread in excitement */}
      <g style={{ transformOrigin: '14px 52px', transform: excitement ? 'rotate(-40deg)' : 'rotate(10deg)', transition: 'transform 0.4s ease' }}>
        <rect x="2" y="48" width="12" height="22" rx="5" fill="#6d28d9" />
        <ellipse cx="8" cy="68" rx="6" ry="5.5" fill="#f3d9c4" />
      </g>
      <g style={{ transformOrigin: '44px 52px', transform: excitement ? 'rotate(40deg)' : 'rotate(-10deg)', transition: 'transform 0.4s ease' }}>
        <rect x="44" y="48" width="12" height="22" rx="5" fill="#6d28d9" />
        <ellipse cx="50" cy="68" rx="6" ry="5.5" fill="#f3d9c4" />
      </g>
      <rect x="24" y="37" width="10" height="11" rx="5" fill="#f3d9c4" />
      <ellipse cx="29" cy="28" rx="15" ry="16" fill="#f3d9c4" />
      <ellipse cx="14" cy="28" rx="3" ry="4.5" fill="#e8c9ad" />
      <ellipse cx="44" cy="28" rx="3" ry="4.5" fill="#e8c9ad" />
      <ellipse cx="29" cy="13" rx="15" ry="8" fill="#1e0c3a" />
      <rect x="14" y="10" width="30" height="8" rx="4" fill="#1e0c3a" />
      <ellipse cx="23" cy="27" rx="3.5" ry="4" fill="white" />
      <ellipse cx="35" cy="27" rx="3.5" ry="4" fill="white" />
      <circle cx="24" cy="28" r="1.8" fill="#1e0c3a" />
      <circle cx="36" cy="28" r="1.8" fill="#1e0c3a" />
      {/* Excited open mouth */}
      <ellipse cx="29" cy={excitement ? "36" : "35"} rx="3" ry={excitement ? "2.5" : "1.5"} fill="#c07040" style={{ transition: 'all 0.3s ease' }} />
      {/* Excitement stars */}
      {excitement && <>
        <text x="2" y="22" fontSize="7" fill="#fbbf24" style={{ animation: 'sparkle 0.8s ease infinite' }}>✦</text>
        <text x="50" y="18" fontSize="7" fill="#f472b6" style={{ animation: 'sparkle 1.1s ease infinite' }}>✦</text>
      </>}
    </svg>
  )
}

function Person2({ recording }) {
  return (
    <svg width="58" height="115" viewBox="0 0 58 115" fill="none">
      <ellipse cx="29" cy="112" rx="16" ry="3.5" fill="rgba(0,0,0,0.25)" />
      <rect x="16" y="79" width="9" height="28" rx="4" fill="#0e7490" />
      <rect x="30" y="79" width="9" height="28" rx="4" fill="#0c6075" />
      <ellipse cx="20" cy="107" rx="7" ry="4" fill="#083344" />
      <ellipse cx="35" cy="107" rx="7" ry="4" fill="#083344" />
      <rect x="14" y="46" width="30" height="35" rx="9" fill="#0e7490" />
      {/* Arms holding phone up to record */}
      <g style={{ transformOrigin: '14px 52px', transform: 'rotate(-50deg)' }}>
        <rect x="2" y="48" width="11" height="20" rx="5" fill="#0c6075" />
        <ellipse cx="8" cy="66" rx="5.5" ry="5" fill="#f3c4a0" />
      </g>
      <g style={{ transformOrigin: '44px 52px', transform: 'rotate(-20deg)' }}>
        <rect x="44" y="48" width="11" height="20" rx="5" fill="#0c6075" />
        <ellipse cx="50" cy="66" rx="5.5" ry="5" fill="#f3c4a0" />
      </g>
      {/* Phone being held up */}
      <rect x="16" y="22" width="26" height="18" rx="4" fill="#111" stroke={recording ? '#ef4444' : '#333'} strokeWidth="1.5" style={{ filter: recording ? 'drop-shadow(0 0 4px rgba(239,68,68,0.5))' : 'none' }}>
        {recording && <animate attributeName="stroke" values="#ef4444;#ff7070;#ef4444" dur="0.8s" repeatCount="indefinite" />}
      </rect>
      {/* Camera lens */}
      <circle cx="29" cy="31" r="5" fill="#222" stroke="#444" strokeWidth="1" />
      <circle cx="29" cy="31" r="3" fill="#0d0d0d" />
      <circle cx="27.5" cy="29.5" r="1" fill="rgba(100,200,255,0.5)" />
      {recording && <circle cx="33" cy="25" r="2" fill="#ef4444">
        <animate attributeName="opacity" values="1;0.3;1" dur="0.6s" repeatCount="indefinite" />
      </circle>}
      <rect x="24" y="42" width="10" height="7" rx="3" fill="#f3c4a0" />
      <ellipse cx="29" cy="57" rx="14" ry="15" fill="#f3c4a0" />
      <ellipse cx="15" cy="57" rx="3" ry="4" fill="#e0b38a" />
      <ellipse cx="43" cy="57" rx="3" ry="4" fill="#e0b38a" />
      <ellipse cx="29" cy="44" rx="14" ry="8" fill="#2d1b00" />
      <rect x="15" y="41" width="28" height="8" rx="4" fill="#2d1b00" />
      <ellipse cx="23" cy="56" rx="3" ry="3.5" fill="white" />
      <ellipse cx="35" cy="56" rx="3" ry="3.5" fill="white" />
      <circle cx="24" cy="57" r="1.8" fill="#1e0c3a" />
      <circle cx="36" cy="57" r="1.8" fill="#1e0c3a" />
      <path d="M25 64 Q29 68 33 64" stroke="#a07040" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  )
}
