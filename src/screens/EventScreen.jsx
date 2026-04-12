import { useState } from 'react'
import StarsBg from '../components/StarsBg'

const PACKAGES = [
  {
    id: 'birthday',
    name: 'Birthday Party Pack',
    price: '$49.99',
    icon: '🎂',
    color: '#f472b6',
    border: 'rgba(244,114,182,0.35)',
    bg: 'rgba(244,114,182,0.07)',
    features: [
      '5 premium prism devices',
      'Custom branded app experience',
      'All premium hologram templates',
      'Setup guide & support',
      'Ships in 2 business days',
    ],
  },
  {
    id: 'wedding',
    name: 'Wedding / Event Pack',
    price: '$149.99',
    icon: '💍',
    color: '#a855f7',
    border: 'rgba(168,85,247,0.45)',
    bg: 'rgba(124,58,237,0.1)',
    popular: true,
    features: [
      '20 premium prism devices',
      'Custom text per table/guest',
      'Event coordinator support',
      'Branded welcome screen',
      'Day-of technical assistance',
    ],
  },
  {
    id: 'brand',
    name: 'Brand Activation',
    price: '$499+',
    icon: '🏢',
    color: '#fbbf24',
    border: 'rgba(251,191,36,0.4)',
    bg: 'rgba(251,191,36,0.06)',
    features: [
      'Custom logo holograms',
      'Bulk prism devices (50+)',
      'White-label app experience',
      'Custom animations & branding',
      'Dedicated account manager',
    ],
  },
]

const TESTIMONIALS = [
  {
    name: 'Sarah M.',
    role: 'Wedding Planner · Los Angeles',
    avatar: '👰',
    quote: 'Our guests absolutely lost their minds. We had 20 prisms on the tables and every single person was trying to figure out how it worked. HoloPrism made our wedding completely unforgettable.',
    rating: 5,
  },
  {
    name: 'Marcus T.',
    role: 'Corporate Events · New York',
    avatar: '🎩',
    quote: 'We used Brand Activation for our product launch and it stopped everyone in their tracks. The CEO said it was the best activation we\'d ever done. Already booked our next event.',
    rating: 5,
  },
  {
    name: 'Jenny K.',
    role: 'Party Host · Chicago',
    avatar: '🎉',
    quote: 'Got the Birthday Party Pack for my daughter\'s sweet 16. All 5 prisms were passed around all night. Worth every penny — total showstopper.',
    rating: 5,
  },
]

export default function EventScreen({ onBack }) {
  const [formData, setFormData] = useState({ name: '', email: '', eventType: '', guests: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (!formData.name || !formData.email) return
    const subject = encodeURIComponent(`HoloPrism Event Inquiry — ${formData.eventType || 'Event'}`)
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nEvent Type: ${formData.eventType}\nExpected Guests: ${formData.guests}\n\nI'm interested in HoloPrism for my event!`
    )
    window.location.href = `mailto:events@holoprism.app?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  const handleBookDemo = () => {
    window.location.href = 'mailto:events@holoprism.app?subject=HoloPrism%20Demo%20Request&body=Hi%2C%20I%27d%20like%20to%20book%20a%20demo%20for%20my%20event!'
  }

  return (
    <div className="screen" style={{
      background: 'radial-gradient(ellipse at 50% 0%, #1a100d 0%, #0d0720 50%, #05020f 100%)',
      overflowY: 'auto',
      padding: '0 0 40px',
    }}>
      <StarsBg count={40} />

      {/* Header */}
      <div style={{ padding: '52px 24px 20px' }}>
        <button className="btn-ghost" onClick={onBack} style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          ← Back
        </button>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>🎊</div>
          <h1 style={{
            fontFamily: 'var(--font-main)',
            fontSize: '1.8rem',
            fontWeight: '900',
            lineHeight: 1.2,
            marginBottom: '8px',
          }}>
            <span className="text-gradient-gold">Unforgettable</span>
            <br />at Scale
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5 }}>
            Events, weddings, and brand activations that people will talk about forever
          </p>
        </div>
      </div>

      {/* Demo CTA banner */}
      <div style={{
        margin: '0 16px 24px',
        padding: '18px 20px',
        borderRadius: '18px',
        background: 'linear-gradient(135deg, rgba(251,191,36,0.12), rgba(244,114,182,0.08))',
        border: '1px solid rgba(251,191,36,0.3)',
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
      }}>
        <span style={{ fontSize: '1.8rem' }}>📞</span>
        <div style={{ flex: 1 }}>
          <p style={{ fontFamily: 'var(--font-main)', fontWeight: '700', fontSize: '0.95rem', marginBottom: '3px' }}>
            Let&apos;s make your event legendary
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
            Book a free 15-min demo call
          </p>
        </div>
        <button
          onClick={handleBookDemo}
          style={{
            padding: '10px 16px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #fbbf24, #f472b6)',
            border: 'none',
            color: '#05020f',
            fontFamily: 'var(--font-main)',
            fontWeight: '800',
            fontSize: '0.82rem',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          Book Demo
        </button>
      </div>

      {/* Packages */}
      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
        <h2 style={{ fontFamily: 'var(--font-main)', fontWeight: '800', fontSize: '1.1rem', marginBottom: '4px' }}>
          Event Packages
        </h2>
        {PACKAGES.map(pkg => (
          <div
            key={pkg.id}
            style={{
              borderRadius: '20px',
              border: `1px solid ${pkg.border}`,
              background: pkg.popular
                ? 'linear-gradient(145deg, rgba(124,58,237,0.15), rgba(168,85,247,0.08))'
                : pkg.bg,
              padding: '20px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {pkg.popular && (
              <div style={{
                position: 'absolute', top: '14px', right: '14px',
                padding: '4px 12px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
                fontSize: '0.7rem',
                fontWeight: '800',
                color: 'white',
                fontFamily: 'var(--font-main)',
              }}>
                POPULAR
              </div>
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
              <span style={{ fontSize: '2rem' }}>{pkg.icon}</span>
              <div>
                <p style={{ fontFamily: 'var(--font-main)', fontWeight: '700', color: pkg.color, fontSize: '0.95rem', marginBottom: '2px' }}>
                  {pkg.name}
                </p>
                <p style={{ fontFamily: 'var(--font-main)', fontWeight: '900', fontSize: '1.5rem', color: 'white' }}>
                  {pkg.price}
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', marginBottom: '16px' }}>
              {pkg.features.map(f => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: pkg.color, fontSize: '0.85rem', flexShrink: 0 }}>✓</span>
                  <span style={{ color: 'rgba(248,250,252,0.85)', fontSize: '0.83rem' }}>{f}</span>
                </div>
              ))}
            </div>
            <button
              onClick={handleBookDemo}
              style={{
                width: '100%', padding: '13px',
                borderRadius: '14px',
                border: `1px solid ${pkg.border}`,
                background: `rgba(${pkg.color.replace('#','').match(/../g).map(x=>parseInt(x,16)).join(',')},0.15)`,
                color: pkg.color,
                fontFamily: 'var(--font-main)',
                fontWeight: '700',
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              Get This Package →
            </button>
          </div>
        ))}
      </div>

      {/* Testimonials */}
      <div style={{ padding: '0 16px', marginBottom: '28px' }}>
        <h2 style={{ fontFamily: 'var(--font-main)', fontWeight: '800', fontSize: '1.1rem', marginBottom: '16px' }}>
          What organizers say
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              style={{
                padding: '18px',
                borderRadius: '18px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid var(--border)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <div style={{
                  width: '40px', height: '40px',
                  borderRadius: '50%',
                  background: 'rgba(124,58,237,0.2)',
                  border: '1px solid rgba(168,85,247,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.2rem', flexShrink: 0,
                }}>
                  {t.avatar}
                </div>
                <div>
                  <p style={{ fontFamily: 'var(--font-main)', fontWeight: '700', fontSize: '0.88rem' }}>{t.name}</p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.74rem' }}>{t.role}</p>
                </div>
                <div style={{ marginLeft: 'auto', color: '#fbbf24', fontSize: '0.8rem', letterSpacing: '1px' }}>
                  {'★'.repeat(t.rating)}
                </div>
              </div>
              <p style={{ color: 'rgba(248,250,252,0.75)', fontSize: '0.83rem', lineHeight: 1.6, fontStyle: 'italic' }}>
                &quot;{t.quote}&quot;
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Lead capture form */}
      <div style={{ padding: '0 16px' }}>
        <div style={{
          padding: '22px 20px',
          borderRadius: '20px',
          background: 'linear-gradient(145deg, rgba(124,58,237,0.1), rgba(244,114,182,0.06))',
          border: '1px solid rgba(168,85,247,0.25)',
        }}>
          <h2 style={{ fontFamily: 'var(--font-main)', fontWeight: '800', fontSize: '1.1rem', marginBottom: '6px' }}>
            Get a Custom Quote
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '18px', lineHeight: 1.5 }}>
            Tell us about your event and we&apos;ll put together a perfect package.
          </p>

          {submitted ? (
            <div style={{ textAlign: 'center', padding: '16px' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>✅</div>
              <p style={{ fontFamily: 'var(--font-main)', fontWeight: '700', color: '#22d3ee' }}>Email client opened!</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: '4px' }}>We typically respond within 2 hours.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { key: 'name', label: 'Your Name', placeholder: 'Jane Smith', type: 'text' },
                { key: 'email', label: 'Email Address', placeholder: 'jane@example.com', type: 'email' },
                { key: 'eventType', label: 'Event Type', placeholder: 'Wedding, corporate, birthday…', type: 'text' },
                { key: 'guests', label: 'Expected Guests', placeholder: '50', type: 'number' },
              ].map(field => (
                <div key={field.key}>
                  <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.78rem', fontWeight: '500', marginBottom: '6px' }}>
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    value={formData[field.key]}
                    onChange={e => setFormData(prev => ({ ...prev, [field.key]: e.target.value }))}
                    placeholder={field.placeholder}
                    style={{
                      width: '100%', padding: '13px 16px', borderRadius: '12px',
                      border: '1px solid var(--border)', background: 'rgba(255,255,255,0.04)',
                      color: 'white', fontSize: '0.9rem', fontFamily: 'var(--font-body)', outline: 'none',
                    }}
                    onFocus={e => e.target.style.border = '1px solid rgba(168,85,247,0.5)'}
                    onBlur={e => e.target.style.border = '1px solid var(--border)'}
                  />
                </div>
              ))}
              <button
                onClick={handleSubmit}
                disabled={!formData.name || !formData.email}
                className="btn-primary"
                style={{
                  width: '100%', padding: '16px', marginTop: '6px',
                  opacity: formData.name && formData.email ? 1 : 0.5,
                }}
              >
                Get a Quote →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
