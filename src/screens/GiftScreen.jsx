import { useState } from 'react'
import StarsBg from '../components/StarsBg'

const OCCASIONS = [
  { id: 'birthday', label: 'Birthday', emoji: '🎂' },
  { id: 'anniversary', label: 'Anniversary', emoji: '💜' },
  { id: 'graduation', label: 'Graduation', emoji: '🎓' },
  { id: 'justbecause', label: 'Just Because', emoji: '✨' },
]

function generateCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = ''
  for (let i = 0; i < 8; i++) code += chars[Math.floor(Math.random() * chars.length)]
  return code
}

export default function GiftScreen({ appData, onBack, onOrder }) {
  const [recipientName, setRecipientName] = useState('')
  const [contactInfo, setContactInfo] = useState('')
  const [occasion, setOccasion] = useState('')
  const [deliveryDate, setDeliveryDate] = useState('')
  const [giftLink, setGiftLink] = useState(null)
  const [copied, setCopied] = useState(false)
  const [step, setStep] = useState(1) // 1 = form, 2 = preview, 3 = sent

  const { selectedTemplate = 'rocket', customText = 'HAPPY BIRTHDAY' } = appData || {}

  const handleGenerate = () => {
    if (!recipientName.trim()) return
    const code = generateCode()
    setGiftLink(`https://holoprism.app/gift/${code}`)
    setStep(3)
  }

  const handleCopy = () => {
    if (!giftLink) return
    navigator.clipboard?.writeText(giftLink).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const handleShareGift = async () => {
    const shareData = {
      title: `A hologram gift for ${recipientName || 'you'}!`,
      text: `${recipientName ? recipientName + ' has' : 'You have'} a special hologram waiting 🔮`,
      url: giftLink || 'https://holoprism.app',
    }
    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try { await navigator.share(shareData) } catch (e) { /* dismissed */ }
    } else {
      handleCopy()
    }
  }

  const templateEmoji = selectedTemplate === 'rocket' ? '🚀' : selectedTemplate === 'balloon' ? '🎈' : '💜'

  return (
    <div className="screen" style={{
      background: 'radial-gradient(ellipse at 50% 0%, #1a0d2e 0%, #0d0720 50%, #05020f 100%)',
      overflowY: 'auto',
      padding: '0 0 40px',
    }}>
      <StarsBg count={35} />

      {/* Header */}
      <div style={{ padding: '52px 24px 20px' }}>
        <button className="btn-ghost" onClick={onBack} style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          ← Back
        </button>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>🎁</div>
          <h1 style={{ fontFamily: 'var(--font-main)', fontSize: '1.6rem', fontWeight: '900', marginBottom: '6px' }}>
            Send a <span className="text-gradient">Gift Hologram</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
            Create a magical moment for someone special
          </p>
        </div>
      </div>

      {step < 3 && (
        <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: '18px' }}>

          {/* Recipient name */}
          <div>
            <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.82rem', fontWeight: '500', marginBottom: '8px' }}>
              Who is this for? *
            </label>
            <input
              value={recipientName}
              onChange={e => setRecipientName(e.target.value)}
              placeholder="Their name"
              style={{
                width: '100%', padding: '15px 18px', borderRadius: '14px',
                border: '1px solid var(--border)', background: 'rgba(255,255,255,0.05)',
                color: 'white', fontSize: '1rem', fontFamily: 'var(--font-body)', outline: 'none',
              }}
              onFocus={e => e.target.style.border = '1px solid rgba(168,85,247,0.5)'}
              onBlur={e => e.target.style.border = '1px solid var(--border)'}
            />
          </div>

          {/* Contact info */}
          <div>
            <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.82rem', fontWeight: '500', marginBottom: '8px' }}>
              Their phone number or email
            </label>
            <input
              value={contactInfo}
              onChange={e => setContactInfo(e.target.value)}
              placeholder="+1 (555) 000-0000 or email"
              style={{
                width: '100%', padding: '15px 18px', borderRadius: '14px',
                border: '1px solid var(--border)', background: 'rgba(255,255,255,0.05)',
                color: 'white', fontSize: '1rem', fontFamily: 'var(--font-body)', outline: 'none',
              }}
              onFocus={e => e.target.style.border = '1px solid rgba(168,85,247,0.5)'}
              onBlur={e => e.target.style.border = '1px solid var(--border)'}
            />
          </div>

          {/* Occasion */}
          <div>
            <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.82rem', fontWeight: '500', marginBottom: '10px' }}>
              Occasion
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {OCCASIONS.map(occ => (
                <button
                  key={occ.id}
                  onClick={() => setOccasion(occ.id)}
                  style={{
                    padding: '14px 12px',
                    borderRadius: '14px',
                    border: `1px solid ${occasion === occ.id ? 'rgba(244,114,182,0.5)' : 'var(--border)'}`,
                    background: occasion === occ.id ? 'rgba(244,114,182,0.1)' : 'rgba(255,255,255,0.03)',
                    color: occasion === occ.id ? 'white' : 'var(--text-muted)',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-main)',
                    fontWeight: occasion === occ.id ? '700' : '500',
                    fontSize: '0.88rem',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
                    transition: 'all 0.2s',
                  }}
                >
                  <span style={{ fontSize: '1.5rem' }}>{occ.emoji}</span>
                  <span>{occ.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Delivery date */}
          <div>
            <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.82rem', fontWeight: '500', marginBottom: '8px' }}>
              When should they receive it?
            </label>
            <input
              type="date"
              value={deliveryDate}
              onChange={e => setDeliveryDate(e.target.value)}
              style={{
                width: '100%', padding: '15px 18px', borderRadius: '14px',
                border: '1px solid var(--border)', background: 'rgba(255,255,255,0.05)',
                color: 'white', fontSize: '1rem', fontFamily: 'var(--font-body)', outline: 'none',
                colorScheme: 'dark',
              }}
              onFocus={e => e.target.style.border = '1px solid rgba(168,85,247,0.5)'}
              onBlur={e => e.target.style.border = '1px solid var(--border)'}
            />
          </div>

          {/* Hologram preview */}
          <div style={{
            padding: '16px 20px',
            borderRadius: '18px',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid var(--border)',
          }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', fontWeight: '500', marginBottom: '10px' }}>
              THEY&apos;LL SEE
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{
                width: '56px', height: '56px',
                borderRadius: '14px',
                background: 'rgba(124,58,237,0.15)',
                border: '1px solid rgba(168,85,247,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.8rem',
              }}>
                {templateEmoji}
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-main)', fontWeight: '700', fontSize: '0.95rem' }}>
                  {customText}
                </p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: '2px' }}>
                  {selectedTemplate === 'rocket' ? 'Rocket' : selectedTemplate === 'balloon' ? 'Balloon' : 'Heart Firework'} hologram
                </p>
              </div>
            </div>
          </div>

          {/* Upsell */}
          <button
            onClick={onOrder}
            style={{
              width: '100%', padding: '14px 18px',
              borderRadius: '16px',
              border: '1px solid rgba(251,191,36,0.3)',
              background: 'rgba(251,191,36,0.05)',
              color: '#fbbf24',
              fontFamily: 'var(--font-main)',
              fontWeight: '600',
              fontSize: '0.88rem',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              transition: 'all 0.25s',
            }}
          >
            📦 Include a physical prism? Add $12.99 →
          </button>

          {/* Generate button */}
          <button
            onClick={handleGenerate}
            disabled={!recipientName.trim()}
            className="btn-primary"
            style={{
              width: '100%', padding: '18px', fontSize: '1rem',
              opacity: recipientName.trim() ? 1 : 0.5,
            }}
          >
            Generate Gift Link →
          </button>
        </div>
      )}

      {step === 3 && (
        <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: '18px' }}>

          {/* Success state */}
          <div style={{
            padding: '24px 20px',
            borderRadius: '20px',
            background: 'linear-gradient(145deg, rgba(124,58,237,0.15), rgba(244,114,182,0.08))',
            border: '1px solid rgba(168,85,247,0.3)',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🎁✨</div>
            <h2 style={{ fontFamily: 'var(--font-main)', fontWeight: '800', fontSize: '1.3rem', marginBottom: '8px' }}>
              Gift link created!
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.5 }}>
              {recipientName ? `${recipientName} will` : 'They will'} be amazed when they open this ✨
            </p>
          </div>

          {/* Gift link */}
          <div style={{
            padding: '14px 16px',
            borderRadius: '14px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid var(--border)',
          }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.72rem', fontWeight: '500', marginBottom: '6px' }}>
              SHAREABLE GIFT LINK
            </p>
            <p style={{
              fontFamily: 'var(--font-main)', fontWeight: '600', fontSize: '0.88rem',
              color: '#a855f7', wordBreak: 'break-all', lineHeight: 1.4,
            }}>
              {giftLink}
            </p>
          </div>

          {/* Copy button */}
          <button
            onClick={handleCopy}
            style={{
              width: '100%', padding: '14px',
              borderRadius: '16px',
              border: `1px solid ${copied ? 'rgba(34,211,238,0.5)' : 'rgba(168,85,247,0.3)'}`,
              background: copied ? 'rgba(34,211,238,0.1)' : 'rgba(124,58,237,0.1)',
              color: copied ? '#22d3ee' : '#a855f7',
              fontFamily: 'var(--font-main)',
              fontWeight: '700',
              fontSize: '0.95rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            }}
          >
            {copied ? '✓ Copied!' : '🔗 Copy Link'}
          </button>

          {/* Share options */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={handleShareGift}
              className="btn-primary"
              style={{ flex: 2, padding: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              📤 Send via SMS / Email
            </button>
            <button
              onClick={() => {
                const wa = `https://wa.me/?text=${encodeURIComponent(`You have a hologram gift! 🔮 Open it here: ${giftLink}`)}`
                window.open(wa, '_blank')
              }}
              style={{
                flex: 1, padding: '14px',
                borderRadius: '16px',
                border: '1px solid rgba(37,211,102,0.3)',
                background: 'rgba(37,211,102,0.06)',
                color: '#25d366',
                fontFamily: 'var(--font-main)',
                fontWeight: '600',
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
              }}
            >
              WhatsApp
            </button>
          </div>

          {/* Upsell */}
          <button
            onClick={onOrder}
            style={{
              width: '100%', padding: '14px 18px',
              borderRadius: '16px',
              border: '1px solid rgba(251,191,36,0.3)',
              background: 'rgba(251,191,36,0.05)',
              color: '#fbbf24',
              fontFamily: 'var(--font-main)',
              fontWeight: '600',
              fontSize: '0.88rem',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            }}
          >
            📦 Add physical prism to gift — $12.99 →
          </button>

          <button className="btn-ghost" onClick={onBack} style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
            ← Back to home
          </button>
        </div>
      )}
    </div>
  )
}
