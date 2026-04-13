import { useState, useEffect } from 'react'

// Scene 2: Person places pyramid on phone
export default function CartoonScene2() {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 400)
    const t2 = setTimeout(() => setStep(2), 1200)
    return () => [t1, t2].forEach(clearTimeout)
  }, [])

  return (
    <div style={{
      width: '100%',
      height: '280px',
      position: 'relative',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
    }}>
      {/* Background */}
      <div style={{
        position: 'absolute', inset: 0,
        borderRadius: '24px',
        background: 'linear-gradient(180deg, #0d0828 0%, #150d35 70%, #0a0618 100%)',
      }}>
        {/* Subtle grid floor */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: '40%',
          backgroundImage: 'linear-gradient(rgba(124,58,237,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.1) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          transform: 'perspective(200px) rotateX(45deg)',
          transformOrigin: 'bottom',
          opacity: 0.6,
        }} />
      </div>

      {/* Table */}
      <div style={{
        position: 'absolute',
        bottom: '44px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '220px',
        zIndex: 3,
      }}>
        <div style={{
          height: '10px',
          background: 'linear-gradient(180deg, #3d2060, #2a1545)',
          borderRadius: '6px 6px 0 0',
          border: '1px solid rgba(168,85,247,0.25)',
        }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 22px' }}>
          <div style={{ width: '8px', height: '28px', background: '#2a1545', borderRadius: '0 0 4px 4px' }} />
          <div style={{ width: '8px', height: '28px', background: '#2a1545', borderRadius: '0 0 4px 4px' }} />
        </div>
      </div>

      {/* PHONE (flat on table) */}
      <div style={{
        position: 'absolute',
        bottom: '52px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 4,
      }}>
        <div style={{
          width: '64px', height: '36px',
          borderRadius: '6px',
          background: 'linear-gradient(135deg, #1e1035, #0d0720)',
          border: '1.5px solid rgba(168,85,247,0.5)',
          boxShadow: '0 0 14px rgba(124,58,237,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            width: '52px', height: '28px',
            borderRadius: '4px',
            background: 'radial-gradient(circle at 50% 50%, rgba(168,85,247,0.4), rgba(0,0,0,0.7))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {step >= 2 && (
              <div style={{
                width: '14px', height: '14px',
                borderRadius: '2px',
                border: '1.5px dashed rgba(168,85,247,0.8)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                animation: 'pulse-glow 1s ease infinite',
              }}>
                <div style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#a855f7' }} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* PYRAMID - moves from hand down to phone */}
      <div style={{
        position: 'absolute',
        bottom: step >= 2 ? '60px' : step >= 1 ? '110px' : '160px',
        left: step >= 2 ? 'calc(50% - 12px)' : 'calc(50% + 30px)',
        zIndex: 6,
        transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
        opacity: step >= 1 ? 1 : 0,
      }}>
        <PrismSVG small glowing={step >= 2} />
      </div>

      {/* ALIGNMENT INDICATORS when placed */}
      {step >= 2 && (
        <>
          <div style={{
            position: 'absolute',
            bottom: '62px',
            left: 'calc(50% - 22px)',
            zIndex: 7,
            display: 'flex',
            gap: '2px',
            animation: 'fade-in-up 0.4s ease',
          }}>
            {['←', '→'].map((a, i) => (
              <span key={i} style={{ color: '#22d3ee', fontSize: '0.55rem', fontWeight: '700', opacity: 0.8, animation: `bounce-subtle 1s ease infinite`, animationDelay: `${i*0.2}s` }}>{a}</span>
            ))}
          </div>
          <div style={{
            position: 'absolute',
            bottom: '67px',
            left: 'calc(50%)',
            transform: 'translateX(-50%)',
            width: '40px', height: '40px',
            borderRadius: '50%',
            border: '1px dashed rgba(34,211,238,0.4)',
            zIndex: 5,
            animation: 'pulse-glow 1.5s ease infinite',
          }} />
        </>
      )}

      {/* PERSON holding pyramid */}
      <div style={{ position: 'absolute', right: '8%', bottom: '42px', zIndex: 5 }}>
        <svg width="65" height="125" viewBox="0 0 65 125" fill="none">
          <ellipse cx="32" cy="122" rx="18" ry="4" fill="rgba(0,0,0,0.3)" />
          <rect x="19" y="88" width="10" height="30" rx="5" fill="#5b21b6" />
          <rect x="35" y="88" width="10" height="30" rx="5" fill="#4c1d95" />
          <ellipse cx="24" cy="119" rx="8" ry="4" fill="#2e1065" />
          <ellipse cx="40" cy="119" rx="8" ry="4" fill="#2e1065" />
          <rect x="16" y="53" width="32" height="38" rx="10" fill="#7c3aed" />
          {/* Left arm raised holding pyramid */}
          <g style={{ transformOrigin: '16px 58px', transform: 'rotate(-60deg)' }}>
            <rect x="4" y="54" width="12" height="26" rx="6" fill="#6d28d9" />
            <ellipse cx="10" cy="78" rx="6" ry="6" fill="#f3d9c4" />
          </g>
          <rect x="48" y="56" width="12" height="26" rx="6" fill="#6d28d9" transform="rotate(-8,54,69)" />
          <ellipse cx="56" cy="80" rx="6" ry="5" fill="#f3d9c4" />
          <rect x="27" y="43" width="11" height="13" rx="5" fill="#f3d9c4" />
          <ellipse cx="32" cy="33" rx="17" ry="18" fill="#f3d9c4" />
          <ellipse cx="15" cy="33" rx="3.5" ry="5" fill="#e8c9ad" />
          <ellipse cx="49" cy="33" rx="3.5" ry="5" fill="#e8c9ad" />
          <ellipse cx="32" cy="16" rx="17" ry="9" fill="#1e0c3a" />
          <rect x="15" y="13" width="34" height="9" rx="4" fill="#1e0c3a" />
          <ellipse cx="25" cy="32" rx="3.5" ry="4" fill="white" />
          <ellipse cx="39" cy="32" rx="3.5" ry="4" fill="white" />
          <circle cx="26" cy="33" r="1.8" fill="#1e0c3a" />
          <circle cx="40" cy="33" r="1.8" fill="#1e0c3a" />
          <circle cx="27" cy="31.5" r="0.7" fill="white" />
          <circle cx="41" cy="31.5" r="0.7" fill="white" />
          <path d="M26 40 Q32 45 38 40" stroke="#c07040" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </svg>
      </div>
    </div>
  )
}

function PrismSVG({ small, glowing }) {
  const s = small ? 24 : 36
  return (
    <svg width={s} height={s} viewBox="0 0 36 36" fill="none" style={{ filter: glowing ? 'drop-shadow(0 0 10px rgba(34,211,238,0.8))' : 'none' }}>
      <polygon points="18,3 3,33 33,33" fill="rgba(168,85,247,0.08)" stroke={glowing ? '#22d3ee' : '#a855f7'} strokeWidth="1.5" />
      <polygon points="18,3 3,33 18,37 18,3" fill="rgba(124,58,237,0.1)" stroke={glowing ? '#22d3ee' : '#7c3aed'} strokeWidth="1" />
      <polygon points="18,3 33,33 18,37 18,3" fill="rgba(34,211,238,0.08)" stroke={glowing ? '#22d3ee' : '#0e7490'} strokeWidth="1" />
      <circle cx="18" cy="3" r="2.5" fill={glowing ? '#22d3ee' : '#a855f7'}>
        {glowing && <animate attributeName="r" values="2;3.5;2" dur="1s" repeatCount="indefinite" />}
      </circle>
    </svg>
  )
}
