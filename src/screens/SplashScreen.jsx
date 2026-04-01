import { useEffect, useState } from 'react'
import StarsBg from '../components/StarsBg'
import HoloPrismLogo from '../components/HoloPrismLogo'
import PrismAnimation from '../animations/PrismAnimation'

export default function SplashScreen({ onComplete }) {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 300)
    const t2 = setTimeout(() => setPhase(2), 900)
    const t3 = setTimeout(() => setPhase(3), 1800)
    const t4 = setTimeout(() => onComplete(), 2800)
    return () => [t1, t2, t3, t4].forEach(clearTimeout)
  }, [onComplete])

  return (
    <div className="screen" style={{
      background: 'radial-gradient(ellipse at 50% 40%, #1a0d35 0%, #0d0720 40%, #05020f 100%)',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '0',
    }}>
      <StarsBg count={80} />

      {/* Outer ambient rings */}
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}>
        {[180, 260, 340].map((size, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: size,
            height: size,
            borderRadius: '50%',
            border: `1px solid rgba(168,85,247,${0.15 - i * 0.04})`,
            animation: `rotate-slow ${20 + i * 8}s linear infinite ${i % 2 ? 'reverse' : ''}`,
            opacity: phase >= 1 ? 1 : 0,
            transition: 'opacity 0.8s ease',
          }} />
        ))}
        {/* Glow core */}
        <div style={{
          position: 'absolute',
          width: 120,
          height: 120,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.35) 0%, transparent 70%)',
          filter: 'blur(20px)',
          animation: 'pulse-glow 2s ease-in-out infinite',
        }} />
      </div>

      {/* Main prism animation */}
      <div style={{
        opacity: phase >= 1 ? 1 : 0,
        transform: phase >= 1 ? 'scale(1) translateY(0)' : 'scale(0.7) translateY(20px)',
        transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
        marginBottom: '32px',
      }}>
        <PrismAnimation size={120} />
      </div>

      {/* Logo */}
      <div style={{
        opacity: phase >= 2 ? 1 : 0,
        transform: phase >= 2 ? 'translateY(0)' : 'translateY(16px)',
        transition: 'all 0.6s ease',
        textAlign: 'center',
      }}>
        <HoloPrismLogo size="large" />
      </div>

      {/* Tagline */}
      <div style={{
        opacity: phase >= 3 ? 1 : 0,
        transform: phase >= 3 ? 'translateY(0)' : 'translateY(10px)',
        transition: 'all 0.5s ease',
        marginTop: '12px',
        textAlign: 'center',
      }}>
        <p style={{
          color: 'rgba(168,85,247,0.8)',
          fontSize: '0.85rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          fontFamily: 'var(--font-main)',
        }}>
          Magic in every message
        </p>
      </div>

      {/* Loading bar */}
      <div style={{
        position: 'absolute',
        bottom: '48px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '120px',
        height: '2px',
        background: 'rgba(255,255,255,0.08)',
        borderRadius: '2px',
        overflow: 'hidden',
        opacity: phase >= 1 ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }}>
        <div style={{
          height: '100%',
          width: phase >= 3 ? '100%' : phase >= 2 ? '66%' : '33%',
          background: 'linear-gradient(90deg, #7c3aed, #22d3ee)',
          borderRadius: '2px',
          transition: 'width 0.6s ease',
          boxShadow: '0 0 8px rgba(34,211,238,0.6)',
        }} />
      </div>
    </div>
  )
}
