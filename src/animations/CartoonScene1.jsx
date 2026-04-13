import { useState, useEffect } from 'react'

// Scene 1: Cartoon man places phone flat on table
export default function CartoonScene1() {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const t = setTimeout(() => setStep(1), 600)
    return () => clearTimeout(t)
  }, [])

  return (
    <div style={{
      width: '100%',
      height: '280px',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 24px 20px',
    }}>
      {/* Room background */}
      <div style={{
        position: 'absolute', inset: 0,
        borderRadius: '24px',
        background: 'linear-gradient(180deg, #1a0d35 0%, #0d0720 70%, #12082a 100%)',
        overflow: 'hidden',
      }}>
        {/* Floor */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: '35%',
          background: 'linear-gradient(0deg, rgba(124,58,237,0.08), transparent)',
          borderTop: '1px solid rgba(124,58,237,0.15)',
        }} />
        {/* Wall decor dots */}
        {[[20,40],[75,25],[50,15],[85,55]].map(([x,y],i) => (
          <div key={i} style={{
            position: 'absolute', left: `${x}%`, top: `${y}%`,
            width: '4px', height: '4px', borderRadius: '50%',
            background: 'rgba(168,85,247,0.3)',
            animation: `star-twinkle ${2+i*0.3}s ease infinite`,
            animationDelay: `${i*0.4}s`,
          }} />
        ))}
      </div>

      {/* TABLE */}
      <div style={{
        position: 'absolute',
        bottom: '44px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '200px',
        zIndex: 3,
      }}>
        {/* Table top */}
        <div style={{
          height: '10px',
          background: 'linear-gradient(180deg, #3d2060, #2a1545)',
          borderRadius: '6px 6px 0 0',
          boxShadow: '0 -2px 8px rgba(124,58,237,0.2)',
          border: '1px solid rgba(168,85,247,0.2)',
        }} />
        {/* Legs */}
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 20px' }}>
          <div style={{ width: '8px', height: '30px', background: '#2a1545', borderRadius: '0 0 4px 4px' }} />
          <div style={{ width: '8px', height: '30px', background: '#2a1545', borderRadius: '0 0 4px 4px' }} />
        </div>
      </div>

      {/* PHONE on table */}
      <div style={{
        position: 'absolute',
        bottom: '52px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 4,
        transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
        opacity: step >= 1 ? 1 : 0,
      }}>
        <div style={{
          width: '50px',
          height: '28px',
          borderRadius: '5px',
          background: 'linear-gradient(135deg, #1e1035, #0d0720)',
          border: '1.5px solid rgba(168,85,247,0.5)',
          boxShadow: '0 0 12px rgba(124,58,237,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            width: '38px', height: '20px',
            borderRadius: '3px',
            background: 'radial-gradient(circle at 50% 30%, rgba(168,85,247,0.3), rgba(0,0,0,0.8))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{ fontSize: '0.6rem', filter: 'drop-shadow(0 0 4px #a855f7)' }}>✦</div>
          </div>
        </div>
        {/* Screen glow */}
        <div style={{
          position: 'absolute', inset: '-4px',
          borderRadius: '8px',
          background: 'radial-gradient(circle, rgba(124,58,237,0.15), transparent 70%)',
          filter: 'blur(6px)',
        }} />
      </div>

      {/* CARTOON PERSON */}
      <CartoonPerson step={step} />
    </div>
  )
}

function CartoonPerson({ step }) {
  return (
    <div style={{
      position: 'absolute',
      right: '16%',
      bottom: '42px',
      zIndex: 5,
      transition: 'all 0.5s ease',
    }}>
      {/* Body group — SVG cartoon */}
      <svg width="70" height="130" viewBox="0 0 70 130" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Shadow */}
        <ellipse cx="35" cy="126" rx="20" ry="4" fill="rgba(0,0,0,0.3)" />

        {/* LEGS */}
        <rect x="22" y="90" width="10" height="35" rx="5" fill="#5b21b6" />
        <rect x="38" y="90" width="10" height="35" rx="5" fill="#4c1d95" />
        {/* Shoes */}
        <ellipse cx="27" cy="124" rx="9" ry="5" fill="#2e1065" />
        <ellipse cx="43" cy="124" rx="9" ry="5" fill="#2e1065" />

        {/* BODY */}
        <rect x="18" y="55" width="34" height="38" rx="10" fill="#7c3aed" />
        {/* Shirt accent */}
        <rect x="30" y="55" width="10" height="38" rx="4" fill="rgba(255,255,255,0.06)" />

        {/* LEFT ARM (raised, placing phone) */}
        <g style={{ transition: 'transform 0.6s ease', transformOrigin: '18px 62px', transform: step >= 1 ? 'rotate(-30deg)' : 'rotate(0deg)' }}>
          <rect x="5" y="58" width="13" height="32" rx="6" fill="#6d28d9" transform="rotate(15,11,74)" />
          <ellipse cx="9" cy="88" rx="7" ry="7" fill="#f3d9c4" />
        </g>

        {/* RIGHT ARM (at side) */}
        <rect x="52" y="58" width="13" height="28" rx="6" fill="#6d28d9" transform="rotate(-10,58,72)" />
        <ellipse cx="60" cy="84" rx="6" ry="6" fill="#f3d9c4" />

        {/* NECK */}
        <rect x="29" y="45" width="12" height="13" rx="5" fill="#f3d9c4" />

        {/* HEAD */}
        <ellipse cx="35" cy="35" rx="18" ry="19" fill="#f3d9c4" />
        {/* Ear */}
        <ellipse cx="17" cy="35" rx="4" ry="5" fill="#e8c9ad" />
        <ellipse cx="53" cy="35" rx="4" ry="5" fill="#e8c9ad" />

        {/* HAIR */}
        <ellipse cx="35" cy="18" rx="18" ry="10" fill="#1e0c3a" />
        <rect x="17" y="14" width="36" height="10" rx="5" fill="#1e0c3a" />

        {/* EYES */}
        <ellipse cx="28" cy="34" rx="4" ry="4.5" fill="white" />
        <ellipse cx="42" cy="34" rx="4" ry="4.5" fill="white" />
        <circle cx="29" cy="35" r="2" fill="#1e0c3a" />
        <circle cx="43" cy="35" r="2" fill="#1e0c3a" />
        {/* Eye shine */}
        <circle cx="30" cy="33.5" r="0.8" fill="white" />
        <circle cx="44" cy="33.5" r="0.8" fill="white" />

        {/* SMILE */}
        <path d="M29 42 Q35 47 41 42" stroke="#c07040" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      </svg>
    </div>
  )
}
