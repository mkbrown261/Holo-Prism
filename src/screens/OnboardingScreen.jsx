import { useState, useEffect } from 'react'
import StarsBg from '../components/StarsBg'
import CartoonScene1 from '../animations/CartoonScene1'
import CartoonScene2 from '../animations/CartoonScene2'
import CartoonScene3 from '../animations/CartoonScene3'
import CartoonScene4 from '../animations/CartoonScene4'

const SCENES = [
  {
    id: 1,
    text: 'This is not just a card…',
    sub: 'A new kind of greeting is here',
    Component: CartoonScene1,
  },
  {
    id: 2,
    text: 'Place the hologram prism on your phone',
    sub: 'Center it perfectly for the full effect',
    Component: CartoonScene2,
  },
  {
    id: 3,
    text: 'Watch your message come to life',
    sub: 'A full 3D hologram experience',
    Component: CartoonScene3,
  },
  {
    id: 4,
    text: 'Share the moment',
    sub: 'Record and send to anyone, anywhere',
    Component: CartoonScene4,
  },
]

export default function OnboardingScreen({ onComplete }) {
  const [scene, setScene] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [textVisible, setTextVisible] = useState(true)

  const goNext = () => {
    if (animating) return
    if (scene === SCENES.length - 1) { onComplete(); return }
    setAnimating(true)
    setTextVisible(false)
    setTimeout(() => {
      setScene(s => s + 1)
      setTextVisible(true)
      setAnimating(false)
    }, 350)
  }

  const goPrev = () => {
    if (animating || scene === 0) return
    setAnimating(true)
    setTextVisible(false)
    setTimeout(() => {
      setScene(s => s - 1)
      setTextVisible(true)
      setAnimating(false)
    }, 350)
  }

  const SceneComponent = SCENES[scene].Component

  return (
    <div className="screen" style={{
      background: 'radial-gradient(ellipse at 50% 30%, #120828 0%, #0d0720 50%, #05020f 100%)',
      justifyContent: 'space-between',
      padding: '0',
    }}>
      <StarsBg count={40} />

      {/* Skip button */}
      <div style={{ padding: '20px 24px 0', display: 'flex', justifyContent: 'flex-end', position: 'relative', zIndex: 10 }}>
        <button className="btn-ghost" onClick={onComplete} style={{ fontSize: '0.85rem' }}>
          Skip
        </button>
      </div>

      {/* Scene illustration area */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: '0 16px',
      }}>
        <div style={{
          opacity: animating ? 0 : 1,
          transform: animating ? 'scale(0.95)' : 'scale(1)',
          transition: 'all 0.35s ease',
          width: '100%',
          maxWidth: '360px',
        }}>
          <SceneComponent />
        </div>
      </div>

      {/* Text + controls */}
      <div style={{
        padding: '24px 28px 48px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        background: 'linear-gradient(0deg, rgba(5,2,15,0.95) 0%, transparent 100%)',
        position: 'relative',
      }}>
        {/* Text block */}
        <div style={{
          opacity: textVisible ? 1 : 0,
          transform: textVisible ? 'translateY(0)' : 'translateY(10px)',
          transition: 'all 0.4s ease',
          minHeight: '80px',
        }}>
          <h2 style={{
            fontFamily: 'var(--font-main)',
            fontSize: '1.45rem',
            fontWeight: '700',
            lineHeight: 1.3,
            marginBottom: '8px',
            color: 'white',
          }}>
            {SCENES[scene].text}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.5 }}>
            {SCENES[scene].sub}
          </p>
        </div>

        {/* Dots + navigation */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Dots */}
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            {SCENES.map((_, i) => (
              <button key={i} onClick={() => !animating && setScene(i)} style={{
                width: i === scene ? '24px' : '6px',
                height: '6px',
                borderRadius: '3px',
                background: i === scene ? 'linear-gradient(90deg, #7c3aed, #22d3ee)' : 'rgba(255,255,255,0.2)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                padding: 0,
              }} />
            ))}
          </div>

          {/* Nav buttons */}
          <div style={{ display: 'flex', gap: '12px' }}>
            {scene > 0 && (
              <button onClick={goPrev} className="btn-secondary" style={{ padding: '12px 20px', fontSize: '0.9rem' }}>
                ←
              </button>
            )}
            <button onClick={goNext} className="btn-primary" style={{
              padding: '12px 28px',
              fontSize: '0.95rem',
              minWidth: '110px',
            }}>
              {scene === SCENES.length - 1 ? '✨ Begin' : 'Next →'}
            </button>
          </div>
        </div>

        {/* CTA on last scene */}
        {scene === SCENES.length - 1 && (
          <button onClick={onComplete} style={{
            width: '100%',
            padding: '18px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, #7c3aed, #a855f7, #22d3ee)',
            border: 'none',
            color: 'white',
            fontFamily: 'var(--font-main)',
            fontSize: '1.1rem',
            fontWeight: '700',
            cursor: 'pointer',
            letterSpacing: '0.02em',
            boxShadow: '0 4px 24px rgba(124,58,237,0.5)',
            animation: 'pulse-glow 2s ease-in-out infinite',
          }}>
            Create Your First Hologram ✨
          </button>
        )}
      </div>
    </div>
  )
}
