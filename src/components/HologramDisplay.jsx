import { useState, useEffect } from 'react'
import RocketHologram from '../animations/RocketHologram'
import BalloonHologram from '../animations/BalloonHologram'
import HeartHologram from '../animations/HeartHologram'

const HOLOGRAM_MAP = {
  rocket: RocketHologram,
  balloon: BalloonHologram,
  'heart-firework': HeartHologram,
}

export default function HologramDisplay({ template = 'rocket', customText = 'HAPPY BIRTHDAY', animStyle = 'sparkle', isPlaying = true }) {
  const HologramComp = HOLOGRAM_MAP[template] || RocketHologram

  return (
    <div style={{
      width: '100%',
      maxWidth: '380px',
      position: 'relative',
    }}>
      {/* Phone frame */}
      <div style={{
        borderRadius: '28px',
        background: '#040010',
        border: '2px solid rgba(168,85,247,0.3)',
        overflow: 'hidden',
        boxShadow: '0 0 40px rgba(124,58,237,0.3), inset 0 0 60px rgba(0,0,0,0.5)',
        position: 'relative',
        aspectRatio: '1/1',
      }}>
        {/* 4-way hologram grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: '1fr 1fr',
          width: '100%',
          height: '100%',
          background: '#000',
          position: 'relative',
        }}>
          {/* Top-left: rotate 0deg */}
          <QuadrantView HologramComp={HologramComp} rotation={0} customText={customText} animStyle={animStyle} isPlaying={isPlaying} />
          {/* Top-right: rotate 90deg */}
          <QuadrantView HologramComp={HologramComp} rotation={90} customText={customText} animStyle={animStyle} isPlaying={isPlaying} />
          {/* Bottom-left: rotate 270deg */}
          <QuadrantView HologramComp={HologramComp} rotation={270} customText={customText} animStyle={animStyle} isPlaying={isPlaying} />
          {/* Bottom-right: rotate 180deg */}
          <QuadrantView HologramComp={HologramComp} rotation={180} customText={customText} animStyle={animStyle} isPlaying={isPlaying} />

          {/* Center cross dividers */}
          <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '1px', background: 'rgba(168,85,247,0.3)', transform: 'translateX(-50%)' }} />
          <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: 'rgba(168,85,247,0.3)', transform: 'translateY(-50%)' }} />

          {/* Center prism guide */}
          <div style={{
            position: 'absolute',
            left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)',
            width: '36px', height: '36px',
            borderRadius: '50%',
            border: '1px solid rgba(168,85,247,0.5)',
            background: 'rgba(0,0,0,0.8)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'rgba(168,85,247,0.4)', animation: 'pulse-glow 2s ease infinite' }} />
          </div>
        </div>

        {/* Scan line effect */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px)',
          pointerEvents: 'none',
          borderRadius: 'inherit',
        }} />

        {/* Moving scan line */}
        <div style={{
          position: 'absolute',
          left: 0, right: 0, height: '2px',
          background: 'linear-gradient(90deg, transparent, rgba(34,211,238,0.4), transparent)',
          animation: 'scan-line 4s linear infinite',
          pointerEvents: 'none',
        }} />
      </div>

      {/* Label below */}
      <p style={{
        textAlign: 'center',
        marginTop: '10px',
        color: 'rgba(148,163,184,0.5)',
        fontSize: '0.72rem',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        fontFamily: 'var(--font-main)',
      }}>
        4-Way Hologram Format · Place prism in center
      </p>
    </div>
  )
}

function QuadrantView({ HologramComp, rotation, customText, animStyle, isPlaying }) {
  return (
    <div style={{
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#000',
      position: 'relative',
    }}>
      <div style={{
        transform: `rotate(${rotation}deg)`,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transformOrigin: 'center center',
      }}>
        <HologramComp customText={customText} animStyle={animStyle} isPlaying={isPlaying} compact />
      </div>
    </div>
  )
}
