import { useState } from 'react'
import StarsBg from '../components/StarsBg'

const PLANS = [
  {
    id: 'digital',
    name: 'Digital',
    price: 'Free',
    priceNote: 'Always free',
    icon: '📱',
    color: '#22d3ee',
    border: 'rgba(34,211,238,0.3)',
    bg: 'rgba(34,211,238,0.06)',
    popular: false,
    features: [
      'All hologram templates',
      'Custom text messages',
      'Share to social media',
      'AR preview mode',
      'QR code generator',
    ],
    cta: 'Get Started Free',
    ctaStyle: 'secondary',
  },
  {
    id: 'starter',
    name: 'Prism Starter',
    price: '$12.99',
    priceNote: 'One-time · ships free',
    icon: '🔮',
    color: '#a855f7',
    border: 'rgba(168,85,247,0.5)',
    bg: 'rgba(124,58,237,0.1)',
    popular: true,
    features: [
      'Everything in Digital',
      'Small prism device (ships to you)',
      'Premium template library',
      'Priority customer support',
      '30-day satisfaction guarantee',
    ],
    cta: 'Order Now →',
    ctaStyle: 'primary',
  },
  {
    id: 'pro',
    name: 'Prism Pro',
    price: '$24.99',
    priceNote: 'Device + 1yr premium',
    icon: '💎',
    color: '#fbbf24',
    border: 'rgba(251,191,36,0.4)',
    bg: 'rgba(251,191,36,0.06)',
    popular: false,
    features: [
      'Everything in Starter',
      'Large prism device (6.5"+)',
      'All premium animations',
      'Voice message support',
      'Media upload (photo/video)',
      '1 year premium membership',
    ],
    cta: 'Get Pro →',
    ctaStyle: 'gold',
  },
]

const FAQS = [
  {
    q: 'What phones work with HoloPrism?',
    a: 'HoloPrism works with virtually any modern smartphone — iPhone 12 and later, Samsung Galaxy S21+, Google Pixel 6+, and most Android phones from 2020 onwards. The app runs in your mobile browser with no download required.',
  },
  {
    q: 'How does the hologram effect work?',
    a: 'Place your phone flat on a surface, open HoloPrism, and set the transparent pyramid prism in the center of your screen. Light from all four mirrored panels reflects into the prism, creating a stunning 3D floating hologram visible from any angle.',
  },
  {
    q: 'Can I use it as a gift?',
    a: 'Absolutely! HoloPrism was built for gifting. You can create a custom hologram, generate a shareable gift link, and even include a physical prism with your order. Perfect for birthdays, anniversaries, and any celebration.',
  },
]

export default function PricingScreen({ onBack, onOrder }) {
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <div className="screen" style={{
      background: 'radial-gradient(ellipse at 50% 0%, #1a0d35 0%, #0d0720 50%, #05020f 100%)',
      overflowY: 'auto',
      padding: '0 0 40px',
    }}>
      <StarsBg count={40} />

      {/* Header */}
      <div style={{ padding: '52px 24px 24px' }}>
        <button className="btn-ghost" onClick={onBack} style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          ← Back
        </button>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{
            fontFamily: 'var(--font-main)',
            fontSize: '1.8rem',
            fontWeight: '900',
            lineHeight: 1.2,
            marginBottom: '8px',
          }}>
            Turn Any Phone Into
            <br />
            <span className="text-gradient">a Hologram</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5 }}>
            Choose the plan that&apos;s right for you
          </p>
        </div>
      </div>

      {/* Social proof */}
      <div style={{
        margin: '0 16px 24px',
        padding: '14px 20px',
        borderRadius: '16px',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}>
        {[
          { value: '50K+', label: 'holograms created' },
          { value: '4.9★', label: 'average rating' },
          { value: '2 days', label: 'ships in' },
        ].map(stat => (
          <div key={stat.label} style={{ textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--font-main)', fontWeight: '800', fontSize: '1.1rem', color: '#a855f7', marginBottom: '2px' }}>
              {stat.value}
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Pricing cards */}
      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
        {PLANS.map(plan => (
          <div
            key={plan.id}
            style={{
              borderRadius: '20px',
              border: `1px solid ${plan.border}`,
              background: plan.popular
                ? 'linear-gradient(145deg, rgba(124,58,237,0.15), rgba(168,85,247,0.08))'
                : plan.bg,
              padding: '20px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Popular badge */}
            {plan.popular && (
              <div style={{
                position: 'absolute', top: '14px', right: '14px',
                padding: '4px 12px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
                fontSize: '0.7rem',
                fontWeight: '800',
                color: 'white',
                fontFamily: 'var(--font-main)',
                letterSpacing: '0.05em',
              }}>
                MOST POPULAR
              </div>
            )}

            {/* Plan header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
              <span style={{ fontSize: '2rem' }}>{plan.icon}</span>
              <div>
                <p style={{ fontFamily: 'var(--font-main)', fontWeight: '700', fontSize: '1rem', color: plan.color, marginBottom: '2px' }}>
                  {plan.name}
                </p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                  <span style={{ fontFamily: 'var(--font-main)', fontWeight: '900', fontSize: '1.6rem', color: 'white' }}>
                    {plan.price}
                  </span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>{plan.priceNote}</span>
                </div>
              </div>
            </div>

            {/* Features */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '18px' }}>
              {plan.features.map(f => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: plan.color, fontSize: '0.9rem', flexShrink: 0 }}>✓</span>
                  <span style={{ color: 'rgba(248,250,252,0.85)', fontSize: '0.85rem' }}>{f}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            {plan.ctaStyle === 'primary' && (
              <button className="btn-primary" onClick={onOrder} style={{ width: '100%', padding: '14px' }}>
                {plan.cta}
              </button>
            )}
            {plan.ctaStyle === 'secondary' && (
              <button className="btn-secondary" onClick={onBack} style={{ width: '100%', padding: '14px' }}>
                {plan.cta}
              </button>
            )}
            {plan.ctaStyle === 'gold' && (
              <button
                onClick={onOrder}
                style={{
                  width: '100%', padding: '14px',
                  borderRadius: '16px',
                  border: '1px solid rgba(251,191,36,0.4)',
                  background: 'linear-gradient(135deg, rgba(251,191,36,0.2), rgba(244,114,182,0.1))',
                  color: '#fbbf24',
                  fontFamily: 'var(--font-main)',
                  fontSize: '1rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.25s',
                }}
              >
                {plan.cta}
              </button>
            )}
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div style={{ padding: '0 16px', marginBottom: '24px' }}>
        <h2 style={{ fontFamily: 'var(--font-main)', fontWeight: '800', fontSize: '1.2rem', marginBottom: '16px', textAlign: 'center' }}>
          Frequently Asked Questions
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {FAQS.map((faq, i) => (
            <div
              key={i}
              style={{
                borderRadius: '16px',
                border: `1px solid ${openFaq === i ? 'rgba(168,85,247,0.35)' : 'var(--border)'}`,
                background: openFaq === i ? 'rgba(124,58,237,0.06)' : 'rgba(255,255,255,0.02)',
                overflow: 'hidden',
                transition: 'all 0.25s',
              }}
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{
                  width: '100%',
                  padding: '16px 18px',
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  fontFamily: 'var(--font-main)',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '12px',
                  textAlign: 'left',
                }}
              >
                <span>{faq.q}</span>
                <span style={{
                  flexShrink: 0,
                  color: '#a855f7',
                  transform: openFaq === i ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.25s',
                  fontSize: '1.1rem',
                }}>
                  ▾
                </span>
              </button>
              {openFaq === i && (
                <div style={{
                  padding: '0 18px 16px',
                  color: 'var(--text-muted)',
                  fontSize: '0.85rem',
                  lineHeight: 1.6,
                  animation: 'fade-in-up 0.2s ease',
                }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div style={{ padding: '0 16px' }}>
        <button
          onClick={onBack}
          className="btn-secondary"
          style={{ width: '100%', padding: '16px', fontSize: '0.95rem' }}
        >
          ← Back to Creating
        </button>
      </div>
    </div>
  )
}
