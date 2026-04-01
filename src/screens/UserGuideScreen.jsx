import { useState, useEffect } from 'react'
import StarsBg from '../components/StarsBg'

const STEPS = [
  {
    id: 1,
    icon: '📱',
    title: 'Place your phone flat',
    desc: 'Set your phone face-up on a stable flat surface, like a table.',
    tip: 'A darker surface works best for the hologram effect.',
    color: '#a855f7',
    animation: 'phone-flat',
  },
  {
    id: 2,
    icon: '☀️',
    title: 'Turn brightness to max',
    desc: 'Drag your brightness slider all the way up in Control Center.',
    tip: 'Higher brightness = clearer hologram projection.',
    color: '#fbbf24',
    animation: 'brightness',
  },
  {
    id: 3,
    icon: '🔷',
    title: 'Place prism in center',
    desc: 'Carefully set the transparent pyramid right in the middle of your screen.',
    tip: 'The prism tip should point up. Keep it perfectly centered.',
    color: '#22d3ee',
    animation: 'prism-place',
  },
  {
    id: 4,
    icon: '▶',
    title: 'Press play',
    desc: 'Tap the Play button in the app and watch the magic happen!',
    tip: 'Dim the room lights for the best hologram experience.',
    color: '#f472b6',
    animation: 'play',
  },
]

export default function UserGuideScreen({ onPlay, onBack }) {
  const [activeStep, setActiveStep] = useState(0)
  const [completed, setCompleted] = useState([])
  const [autoPlay, setAutoPlay] = useState(true)

  useEffect(() => {
    if (!autoPlay) return
    const interval = setInterval(() => {
      setActiveStep(prev => {
        if (prev < STEPS.length - 1) {
          setCompleted(c => [...c, prev])
          return prev + 1
        }
        clearInterval(interval)
        setAutoPlay(false)
        return prev
      })
    }, 2200)
    return () => clearInterval(interval)
  }, [autoPlay])

  const step = STEPS[activeStep]

  return (
    <div className="screen" style={{
      background: 'radial-gradient(ellipse at 50% 0%, #0f0820 0%, #0d0720 60%, #05020f 100%)',
      justifyContent: 'space-between',
      padding: '0',
      overflowY: 'auto',
    }}>
      <StarsBg count={30} />

      {/* Header */}
      <div style={{ padding: '52px 24px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button className="btn-ghost" onClick={onBack}>← Back</button>
        <h2 style={{ fontFamily: 'var(--font-main)', fontWeight: '700', fontSize: '1.1rem' }}>Setup Guide</h2>
        <div style={{ width: '48px' }} />
      </div>

      {/* Step progress bar */}
      <div style={{ padding: '0 24px', marginBottom: '8px' }}>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
          {STEPS.map((s, i) => (
            <div key={i} style={{ flex: 1, height: '3px', borderRadius: '2px', overflow: 'hidden', background: 'rgba(255,255,255,0.1)' }}>
              <div style={{
                height: '100%',
                width: completed.includes(i) || i === activeStep ? '100%' : '0%',
                background: i === activeStep ? `linear-gradient(90deg, ${step.color}, white)` : STEPS[i].color,
                transition: 'width 2s linear',
                borderRadius: '2px',
              }} />
            </div>
          ))}
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>Step {activeStep + 1} of {STEPS.length}</p>
      </div>

      {/* Main step display */}
      <div style={{ flex: 1, padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

        {/* Illustration area */}
        <div style={{
          borderRadius: '28px',
          background: `radial-gradient(ellipse at 50% 30%, ${step.color}18, rgba(0,0,0,0.5))`,
          border: `1px solid ${step.color}33`,
          height: '260px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.5s ease',
        }}>
          {/* BG glow */}
          <div style={{
            position: 'absolute',
            width: '180px', height: '180px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${step.color}20, transparent 70%)`,
            filter: 'blur(20px)',
            animation: 'pulse-glow 2s ease infinite',
          }} />

          <StepIllustration step={activeStep} color={step.color} />

          {/* Step number badge */}
          <div style={{
            position: 'absolute', top: '14px', left: '14px',
            width: '32px', height: '32px',
            borderRadius: '50%',
            background: step.color,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-main)',
            fontWeight: '800',
            fontSize: '0.9rem',
            color: 'white',
            boxShadow: `0 0 12px ${step.color}80`,
          }}>
            {step.id}
          </div>
        </div>

        {/* Step text */}
        <div style={{ transition: 'all 0.4s ease', animation: 'fade-in-up 0.4s ease' }}>
          <h2 style={{
            fontFamily: 'var(--font-main)',
            fontSize: '1.5rem',
            fontWeight: '800',
            marginBottom: '8px',
            color: 'white',
          }}>
            {step.title}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '12px' }}>
            {step.desc}
          </p>
          <div style={{
            padding: '12px 14px',
            borderRadius: '12px',
            background: `rgba(${step.color === '#a855f7' ? '168,85,247' : step.color === '#fbbf24' ? '251,191,36' : step.color === '#22d3ee' ? '34,211,238' : '244,114,182'},0.08)`,
            border: `1px solid ${step.color}33`,
            display: 'flex',
            gap: '8px',
            alignItems: 'flex-start',
          }}>
            <span style={{ fontSize: '0.95rem', flexShrink: 0 }}>💡</span>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', lineHeight: 1.5 }}>
              {step.tip}
            </p>
          </div>
        </div>

        {/* Step buttons */}
        <div style={{ display: 'flex', gap: '10px' }}>
          {STEPS.map((s, i) => (
            <button
              key={i}
              onClick={() => { setActiveStep(i); setAutoPlay(false) }}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '14px',
                border: `1px solid ${i === activeStep ? s.color + '80' : 'var(--border)'}`,
                background: i === activeStep ? s.color + '15' : 'rgba(255,255,255,0.02)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
              }}
            >
              <span style={{ fontSize: '1.3rem' }}>{s.icon}</span>
              <span style={{ fontSize: '0.65rem', color: i === activeStep ? 'white' : 'var(--text-muted)', fontWeight: i === activeStep ? '700' : '400' }}>
                {i === activeStep ? 'Now' : completed.includes(i) ? '✓' : `Step ${i + 1}`}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div style={{ padding: '16px 20px 40px', display: 'flex', gap: '10px' }}>
        {activeStep < STEPS.length - 1 ? (
          <>
            <button
              className="btn-secondary"
              style={{ flex: 1 }}
              onClick={() => { setCompleted(c => [...c, activeStep]); setActiveStep(s => s + 1); setAutoPlay(false) }}
            >
              Next Step →
            </button>
            <button className="btn-ghost" onClick={onPlay} style={{ flex: 1 }}>
              Skip to Play
            </button>
          </>
        ) : (
          <button
            onClick={onPlay}
            className="btn-primary"
            style={{
              flex: 1,
              padding: '18px',
              fontSize: '1rem',
              animation: 'pulse-glow 2s ease infinite',
            }}
          >
            ✨ Play the Hologram!
          </button>
        )}
      </div>
    </div>
  )
}

function StepIllustration({ step, color }) {
  const illustrations = [
    // Step 0: Phone flat
    <div key="0" style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        width: '120px', height: '200px',
        borderRadius: '16px',
        background: 'linear-gradient(135deg, #1a0d35, #0d0720)',
        border: `2px solid ${color}60`,
        boxShadow: `0 0 30px ${color}40`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        animation: 'float 3s ease-in-out infinite',
        transform: 'perspective(400px) rotateX(40deg)',
      }}>
        <div style={{ width: '90px', height: '160px', borderRadius: '10px', background: `radial-gradient(circle, ${color}20, rgba(0,0,0,0.8))`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>
          📱
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: '-10px', width: '160px', height: '8px', borderRadius: '50%', background: `radial-gradient(ellipse, ${color}30, transparent 70%)` }} />
    </div>,

    // Step 1: Brightness
    <div key="1" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
      <div style={{ fontSize: '4rem', animation: 'pulse-glow 1.5s ease infinite', filter: `drop-shadow(0 0 20px ${color})` }}>☀️</div>
      <div style={{ width: '180px' }}>
        <div style={{ height: '6px', borderRadius: '3px', background: 'rgba(255,255,255,0.1)', overflow: 'hidden', position: 'relative' }}>
          <div style={{ height: '100%', width: '95%', background: `linear-gradient(90deg, ${color}, white)`, borderRadius: '3px', transition: 'width 0.3s' }} />
          <div style={{ position: 'absolute', right: '2px', top: '50%', transform: 'translateY(-50%)', width: '12px', height: '12px', borderRadius: '50%', background: 'white', boxShadow: `0 0 8px white` }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>🔅</span>
          <span style={{ fontSize: '0.7rem', color: color, fontWeight: '700' }}>MAX</span>
          <span style={{ fontSize: '0.7rem', color: 'white' }}>🔆</span>
        </div>
      </div>
    </div>,

    // Step 2: Prism placement
    <div key="2" style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <PrismSVG color={color} />
    </div>,

    // Step 3: Play
    <div key="3" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
      <div style={{
        width: '80px', height: '80px',
        borderRadius: '50%',
        background: `radial-gradient(circle, ${color}40, rgba(0,0,0,0.6))`,
        border: `2px solid ${color}80`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '2.5rem',
        animation: 'pulse-glow 1.5s ease infinite',
        boxShadow: `0 0 30px ${color}60`,
        cursor: 'pointer',
      }}>
        ▶
      </div>
      <div style={{ display: 'flex', gap: '6px' }}>
        {[1,2,3,4,5].map(i => (
          <div key={i} style={{
            width: '4px',
            borderRadius: '2px',
            background: color,
            height: `${8 + Math.sin(i) * 12}px`,
            animation: `bounce-subtle ${0.3 + i * 0.1}s ease infinite`,
            opacity: 0.7 + i * 0.06,
          }} />
        ))}
      </div>
    </div>,
  ]

  return illustrations[step] || illustrations[0]
}

function PrismSVG({ color }) {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" style={{ filter: `drop-shadow(0 0 16px ${color}80)`, animation: 'float 3s ease-in-out infinite' }}>
      {/* Base phone outline */}
      <rect x="25" y="70" width="70" height="10" rx="4" fill={color + '20'} stroke={color + '60'} strokeWidth="1" />
      {/* Pyramid */}
      <polygon points="60,20 25,75 95,75" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" />
      <polygon points="60,20 25,75 60,85 60,20" fill={color + '10'} stroke={color} strokeWidth="1" />
      <polygon points="60,20 95,75 60,85 60,20" fill={color + '18'} stroke={color} strokeWidth="1" />
      {/* Glow at apex */}
      <circle cx="60" cy="20" r="5" fill={color} opacity="0.8" />
      <circle cx="60" cy="20" r="10" fill={color} opacity="0.15" />
      {/* Center indicator */}
      <circle cx="60" cy="75" r="4" fill={color + '60'} />
      <circle cx="60" cy="75" r="8" fill="none" stroke={color} strokeWidth="1" strokeDasharray="2,3" opacity="0.5">
        <animateTransform attributeName="transform" type="rotate" values="0 60 75;360 60 75" dur="4s" repeatCount="indefinite" />
      </circle>
    </svg>
  )
}
