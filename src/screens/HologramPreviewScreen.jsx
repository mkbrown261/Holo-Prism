import { useState, useEffect } from 'react'
import StarsBg from '../components/StarsBg'
import HologramDisplay from '../components/HologramDisplay'

export default function HologramPreviewScreen({ appData, onGuide, onOrder, onBack }) {
  const [viewMode, setViewMode] = useState('screen') // screen | ar
  const [isPlaying, setIsPlaying] = useState(true)
  const [showShare, setShowShare] = useState(false)
  const [recording, setRecording] = useState(false)
  const [shareSuccess, setShareSuccess] = useState('')
  const { isDemo, selectedTemplate = 'rocket', customText = 'HAPPY BIRTHDAY', animationStyle = 'sparkle' } = appData || {}

  const handleRecord = () => {
    setRecording(true)
    setTimeout(() => {
      setRecording(false)
      setShowShare(true)
    }, 2000)
  }

  const handleShare = (platform) => {
    setShareSuccess(platform)
    setTimeout(() => { setShareSuccess(''); setShowShare(false) }, 2000)
  }

  return (
    <div className="screen" style={{
      background: '#010008',
      justifyContent: 'space-between',
      padding: '0',
    }}>
      <StarsBg count={30} />

      {/* Header */}
      <div style={{
        padding: '52px 20px 12px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        zIndex: 10,
      }}>
        <button className="btn-ghost" onClick={onBack} style={{ fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
          ←
        </button>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            onClick={() => setViewMode('screen')}
            style={{
              padding: '7px 14px',
              borderRadius: '10px',
              border: `1px solid ${viewMode === 'screen' ? 'rgba(168,85,247,0.5)' : 'var(--border)'}`,
              background: viewMode === 'screen' ? 'rgba(124,58,237,0.2)' : 'transparent',
              color: viewMode === 'screen' ? 'white' : 'var(--text-muted)',
              fontSize: '0.78rem',
              fontWeight: '600',
              fontFamily: 'var(--font-main)',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            📱 Screen
          </button>
          <button
            onClick={() => setViewMode('ar')}
            style={{
              padding: '7px 14px',
              borderRadius: '10px',
              border: `1px solid ${viewMode === 'ar' ? 'rgba(34,211,238,0.5)' : 'var(--border)'}`,
              background: viewMode === 'ar' ? 'rgba(34,211,238,0.1)' : 'transparent',
              color: viewMode === 'ar' ? '#22d3ee' : 'var(--text-muted)',
              fontSize: '0.78rem',
              fontWeight: '600',
              fontFamily: 'var(--font-main)',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            🔮 AR View
          </button>
        </div>
        {isDemo && (
          <div style={{
            padding: '5px 10px',
            borderRadius: '8px',
            background: 'rgba(251,191,36,0.1)',
            border: '1px solid rgba(251,191,36,0.3)',
            fontSize: '0.72rem',
            fontWeight: '700',
            color: '#fbbf24',
          }}>
            DEMO
          </div>
        )}
      </div>

      {/* Main hologram display */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', padding: '8px 16px' }}>
        {viewMode === 'screen' ? (
          <HologramDisplay
            template={selectedTemplate}
            customText={customText}
            animStyle={animationStyle}
            isPlaying={isPlaying}
          />
        ) : (
          <ARView template={selectedTemplate} customText={customText} />
        )}

        {/* Play/pause overlay */}
        {!isPlaying && viewMode === 'screen' && (
          <button
            onClick={() => setIsPlaying(true)}
            style={{
              position: 'absolute',
              width: '64px', height: '64px',
              borderRadius: '50%',
              background: 'rgba(124,58,237,0.8)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 30px rgba(124,58,237,0.5)',
              fontSize: '1.5rem',
            }}
          >
            ▶
          </button>
        )}
      </div>

      {/* Controls */}
      <div style={{ padding: '12px 16px 0', position: 'relative', zIndex: 10 }}>

        {/* Guide button */}
        <button
          onClick={onGuide}
          style={{
            width: '100%',
            padding: '14px',
            borderRadius: '16px',
            background: 'rgba(34,211,238,0.08)',
            border: '1px solid rgba(34,211,238,0.25)',
            color: '#22d3ee',
            fontFamily: 'var(--font-main)',
            fontSize: '0.92rem',
            fontWeight: '600',
            cursor: 'pointer',
            marginBottom: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'all 0.25s',
          }}
        >
          🔮 Step-by-Step Setup Guide
        </button>

        {/* Action row */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
          <button
            onClick={() => setIsPlaying(p => !p)}
            className="btn-secondary"
            style={{ flex: 1, padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
          >
            {isPlaying ? '⏸ Pause' : '▶ Play'}
          </button>
          <button
            onClick={handleRecord}
            disabled={recording}
            style={{
              flex: 1, padding: '12px',
              borderRadius: '16px',
              border: '1px solid rgba(244,114,182,0.3)',
              background: recording ? 'rgba(239,68,68,0.1)' : 'rgba(244,114,182,0.08)',
              color: recording ? '#ef4444' : '#f472b6',
              fontFamily: 'var(--font-main)',
              fontSize: '0.88rem',
              fontWeight: '600',
              cursor: recording ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
              transition: 'all 0.2s',
              animation: recording ? 'pulse-glow 0.8s ease infinite' : 'none',
            }}
          >
            {recording ? '⏺ Rec…' : '📹 Record'}
          </button>
        </div>

        {/* Share sheet */}
        {showShare && (
          <div style={{
            padding: '16px',
            borderRadius: '18px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid var(--border)',
            marginBottom: '12px',
            animation: 'fade-in-up 0.3s ease',
          }}>
            <p style={{ fontFamily: 'var(--font-main)', fontWeight: '600', fontSize: '0.9rem', marginBottom: '12px', textAlign: 'center' }}>
              Share Your Hologram ✨
            </p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              {[
                { name: 'TikTok', color: '#010101', bg: 'rgba(255,255,255,0.08)', icon: '🎵' },
                { name: 'Instagram', color: '#e1306c', bg: 'rgba(225,48,108,0.08)', icon: '📸' },
                { name: 'Snapchat', color: '#fffc00', bg: 'rgba(255,252,0,0.08)', icon: '👻' },
              ].map(p => (
                <button key={p.name} onClick={() => handleShare(p.name)} style={{
                  flex: 1,
                  padding: '12px 8px',
                  borderRadius: '14px',
                  border: `1px solid ${shareSuccess === p.name ? p.color : 'var(--border)'}`,
                  background: shareSuccess === p.name ? p.bg : 'rgba(255,255,255,0.03)',
                  color: 'white',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-main)',
                  fontSize: '0.78rem',
                  fontWeight: '600',
                  transition: 'all 0.25s',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
                }}>
                  <span style={{ fontSize: '1.3rem' }}>{p.icon}</span>
                  <span>{shareSuccess === p.name ? '✓ Shared!' : p.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Order CTA */}
        {!isDemo && (
          <button
            onClick={onOrder}
            className="btn-primary"
            style={{ width: '100%', padding: '18px', fontSize: '1rem', marginBottom: '16px' }}
          >
            Order HoloPrism Device →
          </button>
        )}

        {isDemo && (
          <div style={{ marginBottom: '16px', display: 'flex', gap: '10px' }}>
            <button
              onClick={onBack}
              className="btn-primary"
              style={{ flex: 1, padding: '16px' }}
            >
              Create Yours →
            </button>
            <button
              onClick={onOrder}
              className="btn-secondary"
              style={{ flex: 1, padding: '16px' }}
            >
              Order Device
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function ARView({ template, customText }) {
  return (
    <div style={{
      width: '100%',
      maxWidth: '360px',
      aspectRatio: '9/16',
      borderRadius: '24px',
      background: 'linear-gradient(160deg, #1a1035, #0a0518)',
      border: '1px solid rgba(168,85,247,0.2)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '16px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Simulated room */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '40%',
        background: 'linear-gradient(0deg, rgba(20,10,40,0.8), transparent)',
      }} />
      {/* Floor grid */}
      <div style={{
        position: 'absolute', bottom: '15%', left: '50%',
        transform: 'translateX(-50%) perspective(200px) rotateX(60deg)',
        width: '200px', height: '200px',
        backgroundImage: 'linear-gradient(rgba(124,58,237,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.2) 1px, transparent 1px)',
        backgroundSize: '30px 30px',
      }} />
      {/* Floating hologram */}
      <div style={{
        position: 'relative',
        zIndex: 5,
        textAlign: 'center',
        animation: 'float 3s ease-in-out infinite',
      }}>
        <div style={{
          fontSize: '4rem',
          filter: 'drop-shadow(0 0 20px rgba(168,85,247,0.8))',
          marginBottom: '12px',
          animation: 'hologram-spin 8s linear infinite',
        }}>
          {template === 'rocket' ? '🚀' : template === 'balloon' ? '🎈' : '💜'}
        </div>
        <div style={{
          fontFamily: 'var(--font-main)',
          fontWeight: '900',
          fontSize: '1.1rem',
          background: 'linear-gradient(135deg, #a855f7, #22d3ee)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: 'none',
          filter: 'drop-shadow(0 0 12px rgba(168,85,247,0.6))',
          letterSpacing: '0.1em',
        }}>
          {customText}
        </div>
      </div>
      {/* AR label */}
      <div style={{
        position: 'absolute', top: '14px', left: '50%', transform: 'translateX(-50%)',
        padding: '5px 14px',
        borderRadius: '8px',
        background: 'rgba(34,211,238,0.1)',
        border: '1px solid rgba(34,211,238,0.3)',
        fontSize: '0.72rem',
        fontWeight: '700',
        color: '#22d3ee',
        whiteSpace: 'nowrap',
      }}>
        🔮 AR SIMULATION
      </div>
    </div>
  )
}
