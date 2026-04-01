import { useState, useRef } from 'react'
import StarsBg from '../components/StarsBg'
import RocketPreview from '../animations/RocketPreview'
import BalloonPreview from '../animations/BalloonPreview'
import HeartFireworkPreview from '../animations/HeartFireworkPreview'

const STYLES = [
  { id: 'sparkle', label: 'Sparkle', icon: '✨', desc: 'Glittering particles' },
  { id: 'soft-glow', label: 'Soft Glow', icon: '🌟', desc: 'Warm ambient light' },
  { id: 'neon', label: 'Neon', icon: '⚡', desc: 'Electric neon pulses' },
]

const TEMPLATE_PREVIEWS = {
  rocket: RocketPreview,
  balloon: BalloonPreview,
  'heart-firework': HeartFireworkPreview,
}

const DEVICES = [
  'iPhone 14', 'iPhone 15', 'iPhone 15 Pro', 'iPhone 16',
  'Samsung Galaxy S24', 'Samsung Galaxy S23', 'Google Pixel 8',
  'OnePlus 12', 'Other Android',
]

export default function CustomizeScreen({ template = 'rocket', appData, onChange, onPreview, onBack }) {
  const [text, setText] = useState(appData?.customText || 'HAPPY BIRTHDAY')
  const [style, setStyle] = useState(appData?.animationStyle || 'sparkle')
  const [device, setDevice] = useState(appData?.selectedDevice || '')
  const [isRecording, setIsRecording] = useState(false)
  const [hasVoice, setHasVoice] = useState(false)
  const [uploadedFile, setUploadedFile] = useState(null)
  const [activeTab, setActiveTab] = useState('text')
  const fileRef = useRef()

  const PreviewComp = TEMPLATE_PREVIEWS[template] || RocketPreview

  const handleTextChange = (val) => {
    setText(val)
    onChange({ customText: val })
  }

  const handleStyleChange = (s) => {
    setStyle(s)
    onChange({ animationStyle: s })
  }

  const handleDeviceChange = (d) => {
    setDevice(d)
    onChange({ selectedDevice: d })
  }

  const handleRecord = () => {
    setIsRecording(true)
    setTimeout(() => {
      setIsRecording(false)
      setHasVoice(true)
    }, 2500)
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) setUploadedFile(file.name)
  }

  return (
    <div className="screen" style={{
      background: 'radial-gradient(ellipse at 50% 0%, #0f0a20 0%, #0d0720 60%, #05020f 100%)',
      overflowY: 'auto',
      padding: '0 0 100px',
    }}>
      <StarsBg count={30} />

      {/* Header */}
      <div style={{ padding: '52px 24px 16px' }}>
        <button className="btn-ghost" onClick={onBack} style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          ← Back
        </button>
        <h1 style={{ fontFamily: 'var(--font-main)', fontSize: '1.5rem', fontWeight: '800', marginBottom: '4px' }}>
          Customize
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
          Your changes update the preview live
        </p>
      </div>

      {/* Live preview */}
      <div style={{
        margin: '0 16px 20px',
        height: '200px',
        borderRadius: '20px',
        background: 'rgba(0,0,0,0.6)',
        border: '1px solid rgba(168,85,247,0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Hologram screen effect */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: '-10%',
          width: '100%', height: '4px',
          background: 'linear-gradient(90deg, transparent, rgba(34,211,238,0.3), transparent)',
          animation: 'scan-line 3s linear infinite',
        }} />

        <PreviewComp isPlaying={true} customText={text} animStyle={style} />

        {/* Live badge */}
        <div style={{
          position: 'absolute', top: '10px', right: '10px',
          display: 'flex', alignItems: 'center', gap: '5px',
          background: 'rgba(0,0,0,0.7)', borderRadius: '8px', padding: '4px 10px',
          fontSize: '0.72rem', fontWeight: '700', color: '#22d3ee',
        }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22d3ee', animation: 'pulse-glow 1s ease infinite' }} />
          LIVE
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        margin: '0 16px 16px',
        display: 'flex',
        background: 'rgba(255,255,255,0.04)',
        borderRadius: '14px',
        padding: '4px',
        gap: '4px',
        border: '1px solid var(--border)',
      }}>
        {['text', 'media', 'voice', 'device'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{
            flex: 1,
            padding: '9px 4px',
            borderRadius: '10px',
            border: 'none',
            background: activeTab === tab ? 'linear-gradient(135deg, #7c3aed, #a855f7)' : 'transparent',
            color: activeTab === tab ? 'white' : 'var(--text-muted)',
            fontSize: '0.78rem',
            fontWeight: activeTab === tab ? '700' : '500',
            fontFamily: 'var(--font-main)',
            cursor: 'pointer',
            transition: 'all 0.25s ease',
            textTransform: 'capitalize',
          }}>
            {tab === 'text' ? '✏️ Text' : tab === 'media' ? '🖼️ Media' : tab === 'voice' ? '🎤 Voice' : '📱 Device'}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div style={{ padding: '0 16px' }}>

        {/* TEXT TAB */}
        {activeTab === 'text' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '8px', fontWeight: '500' }}>
                Message Text
              </label>
              <input
                value={text}
                onChange={e => handleTextChange(e.target.value.toUpperCase())}
                maxLength={24}
                placeholder="HAPPY BIRTHDAY"
                style={{
                  width: '100%',
                  padding: '16px 18px',
                  borderRadius: '14px',
                  border: '1px solid rgba(168,85,247,0.3)',
                  background: 'rgba(255,255,255,0.05)',
                  color: 'white',
                  fontSize: '1.1rem',
                  fontFamily: 'var(--font-main)',
                  fontWeight: '700',
                  outline: 'none',
                  letterSpacing: '0.06em',
                }}
              />
              <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '5px', textAlign: 'right' }}>
                {text.length}/24
              </p>
            </div>

            <div>
              <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '12px', fontWeight: '500' }}>
                Animation Style
              </label>
              <div style={{ display: 'flex', gap: '10px' }}>
                {STYLES.map(s => (
                  <button key={s.id} onClick={() => handleStyleChange(s.id)} style={{
                    flex: 1,
                    padding: '12px 8px',
                    borderRadius: '14px',
                    border: `1px solid ${style === s.id ? 'rgba(168,85,247,0.6)' : 'var(--border)'}`,
                    background: style === s.id ? 'rgba(124,58,237,0.15)' : 'rgba(255,255,255,0.03)',
                    color: style === s.id ? 'white' : 'var(--text-muted)',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    boxShadow: style === s.id ? '0 0 12px rgba(124,58,237,0.3)' : 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px',
                  }}>
                    <span style={{ fontSize: '1.4rem' }}>{s.icon}</span>
                    <span style={{ fontFamily: 'var(--font-main)', fontSize: '0.78rem', fontWeight: '600' }}>{s.label}</span>
                    <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{s.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* MEDIA TAB */}
        {activeTab === 'media' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.5 }}>
              Upload a photo or short video to add a personal touch to your hologram.
            </p>
            <input type="file" ref={fileRef} accept="image/*,video/*" onChange={handleFileUpload} style={{ display: 'none' }} />
            <button
              onClick={() => fileRef.current?.click()}
              style={{
                padding: '24px',
                borderRadius: '18px',
                border: '1.5px dashed rgba(168,85,247,0.4)',
                background: 'rgba(124,58,237,0.05)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px',
                color: 'var(--text-muted)',
                transition: 'all 0.25s',
              }}
            >
              <span style={{ fontSize: '2.5rem' }}>📁</span>
              <span style={{ fontFamily: 'var(--font-main)', fontWeight: '600', color: '#a855f7' }}>
                {uploadedFile ? uploadedFile : 'Tap to upload'}
              </span>
              <span style={{ fontSize: '0.78rem' }}>Photo or video · Max 50MB</span>
            </button>
            {uploadedFile && (
              <div style={{
                padding: '12px 16px',
                borderRadius: '12px',
                background: 'rgba(34,211,238,0.08)',
                border: '1px solid rgba(34,211,238,0.2)',
                display: 'flex', alignItems: 'center', gap: '10px',
                color: '#22d3ee',
                fontSize: '0.85rem',
              }}>
                ✅ Media will be 4-way mirrored for hologram format
              </div>
            )}
          </div>
        )}

        {/* VOICE TAB */}
        {activeTab === 'voice' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', paddingTop: '16px' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textAlign: 'center', lineHeight: 1.5 }}>
              Record a personal voice message to play with your hologram
            </p>
            <button
              onClick={handleRecord}
              disabled={isRecording}
              style={{
                width: '100px', height: '100px',
                borderRadius: '50%',
                background: isRecording
                  ? 'rgba(239,68,68,0.2)'
                  : hasVoice ? 'rgba(34,211,238,0.15)' : 'rgba(124,58,237,0.15)',
                border: isRecording
                  ? '2px solid #ef4444'
                  : hasVoice ? '2px solid #22d3ee' : '2px solid rgba(168,85,247,0.5)',
                cursor: isRecording ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '2.5rem',
                transition: 'all 0.3s ease',
                animation: isRecording ? 'pulse-glow 0.8s ease infinite' : 'none',
                boxShadow: isRecording ? '0 0 24px rgba(239,68,68,0.4)' : hasVoice ? '0 0 16px rgba(34,211,238,0.3)' : 'none',
              }}
            >
              {isRecording ? '⏺' : hasVoice ? '✅' : '🎤'}
            </button>
            <p style={{ fontFamily: 'var(--font-main)', fontWeight: '600', fontSize: '0.9rem', color: isRecording ? '#ef4444' : hasVoice ? '#22d3ee' : 'var(--text-muted)' }}>
              {isRecording ? 'Recording…' : hasVoice ? 'Voice message saved!' : 'Tap to record'}
            </p>
            {hasVoice && (
              <div style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: 'rgba(34,211,238,0.06)', border: '1px solid rgba(34,211,238,0.15)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem' }}>🎵 Voice message (2.5s)</span>
                <button className="btn-ghost" style={{ color: '#ef4444', padding: '4px 8px', fontSize: '0.8rem' }} onClick={() => setHasVoice(false)}>Delete</button>
              </div>
            )}
          </div>
        )}

        {/* DEVICE TAB */}
        {activeTab === 'device' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.5 }}>
              Select your phone model so we can optimize the hologram scale and recommend the right prism size.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {DEVICES.map(d => (
                <button key={d} onClick={() => handleDeviceChange(d)} style={{
                  padding: '14px 18px',
                  borderRadius: '14px',
                  border: `1px solid ${device === d ? 'rgba(168,85,247,0.5)' : 'var(--border)'}`,
                  background: device === d ? 'rgba(124,58,237,0.12)' : 'rgba(255,255,255,0.03)',
                  color: device === d ? 'white' : 'var(--text-muted)',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-main)',
                  fontWeight: device === d ? '600' : '400',
                  fontSize: '0.9rem',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  transition: 'all 0.2s ease',
                }}>
                  <span>📱 {d}</span>
                  {device === d && <span style={{ color: '#a855f7', fontSize: '1.1rem' }}>✓</span>}
                </button>
              ))}
            </div>
            {device && (
              <div style={{ padding: '14px 16px', borderRadius: '14px', background: 'rgba(34,211,238,0.06)', border: '1px solid rgba(34,211,238,0.15)' }}>
                <p style={{ fontWeight: '600', fontSize: '0.88rem', marginBottom: '6px', color: '#22d3ee' }}>
                  Recommended Prism Size
                </p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                  {device.includes('Pro') || device.includes('15') || device.includes('16') || device.includes('S24') ? '🔷 Large Prism (6.5"+)' : '🔶 Medium Prism (6.0"–6.5")'}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Fixed bottom CTA */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: '430px',
        padding: '16px',
        background: 'linear-gradient(0deg, rgba(5,2,15,0.98) 0%, transparent 100%)',
        backdropFilter: 'blur(10px)',
      }}>
        <button
          onClick={onPreview}
          className="btn-primary"
          style={{ width: '100%', fontSize: '1rem', padding: '18px' }}
        >
          Preview Hologram →
        </button>
      </div>
    </div>
  )
}
