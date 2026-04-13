import { useState } from 'react'
import StarsBg from '../components/StarsBg'

const SIZES = [
  { id: 'small', label: 'Small', desc: 'For phones under 6"', price: '$9.99', icon: '🔹', phones: 'iPhone SE, Pixel 7' },
  { id: 'medium', label: 'Medium', desc: '6.0" – 6.5" phones', price: '$12.99', icon: '🔷', phones: 'iPhone 14, Galaxy S23', popular: true },
  { id: 'large', label: 'Large', desc: '6.5"+ phones', price: '$14.99', icon: '💠', phones: 'iPhone 15 Pro Max, S24+' },
]

export default function OrderScreen({ appData, onBack }) {
  const [size, setSize] = useState('medium')
  const [step, setStep] = useState('sizing') // sizing | shipping | confirm | success
  const [shipping, setShipping] = useState({ name: '', address: '', city: '', zip: '', email: '' })
  const [errors, setErrors] = useState({})
  const [ordered, setOrdered] = useState(false)

  const selectedSize = SIZES.find(s => s.id === size)

  const validateShipping = () => {
    const e = {}
    if (!shipping.name.trim()) e.name = 'Required'
    if (!shipping.address.trim()) e.address = 'Required'
    if (!shipping.city.trim()) e.city = 'Required'
    if (!shipping.zip.trim()) e.zip = 'Required'
    if (!shipping.email.trim()) e.email = 'Required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handlePlaceOrder = () => {
    setOrdered(true)
    setStep('success')
  }

  if (step === 'success') {
    return (
      <div className="screen" style={{
        background: 'radial-gradient(ellipse at 50% 30%, #1a0d35 0%, #0d0720 50%, #05020f 100%)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '32px',
        gap: '24px',
      }}>
        <StarsBg count={80} />
        <div style={{ animation: 'bounce-subtle 1s ease infinite', fontSize: '5rem' }}>🎉</div>
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h1 style={{ fontFamily: 'var(--font-main)', fontSize: '2rem', fontWeight: '900' }}>
            <span className="text-gradient">Order Placed!</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
            Your <strong style={{ color: 'white' }}>HoloPrism {selectedSize?.label}</strong> is on its way!
          </p>
        </div>
        <div style={{
          width: '100%',
          padding: '20px',
          borderRadius: '20px',
          background: 'rgba(34,211,238,0.06)',
          border: '1px solid rgba(34,211,238,0.2)',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}>
          {[
            { icon: '📦', label: 'Order Confirmed', status: '✓ Done', color: '#22d3ee' },
            { icon: '🏭', label: 'Processing', status: '⏳ 1-2 days', color: '#a855f7' },
            { icon: '🚚', label: 'Shipping', status: '3-5 days', color: 'var(--text-muted)' },
            { icon: '🏠', label: 'Delivered', status: '5-7 days', color: 'var(--text-muted)' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
              <span style={{ flex: 1, fontSize: '0.88rem', color: i < 2 ? 'white' : 'var(--text-muted)' }}>{item.label}</span>
              <span style={{ fontSize: '0.8rem', fontWeight: '600', color: item.color }}>{item.status}</span>
            </div>
          ))}
        </div>
        <button onClick={onBack} className="btn-primary" style={{ width: '100%', padding: '18px' }}>
          Back to Hologram ✨
        </button>
      </div>
    )
  }

  return (
    <div className="screen" style={{
      background: 'radial-gradient(ellipse at 50% 0%, #0f0a20 0%, #0d0720 60%, #05020f 100%)',
      overflowY: 'auto',
      padding: '0 0 100px',
    }}>
      <StarsBg count={30} />

      {/* Header */}
      <div style={{ padding: '52px 24px 20px' }}>
        <button className="btn-ghost" onClick={step === 'sizing' ? onBack : () => setStep(step === 'confirm' ? 'shipping' : 'sizing')}
          style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          ← {step === 'sizing' ? 'Back' : 'Previous'}
        </button>
        <div style={{ display: 'flex', gap: '6px', marginBottom: '16px' }}>
          {['sizing', 'shipping', 'confirm'].map((s, i) => (
            <div key={s} style={{ flex: 1, height: '3px', borderRadius: '2px', background: step === s ? 'linear-gradient(90deg, #7c3aed, #22d3ee)' : i < ['sizing','shipping','confirm'].indexOf(step) ? '#a855f7' : 'rgba(255,255,255,0.1)' }} />
          ))}
        </div>
        <h1 style={{ fontFamily: 'var(--font-main)', fontSize: '1.5rem', fontWeight: '800', marginBottom: '4px' }}>
          {step === 'sizing' ? 'Choose Prism Size' : step === 'shipping' ? 'Shipping Info' : 'Confirm Order'}
        </h1>
      </div>

      <div style={{ padding: '0 20px' }}>

        {/* SIZING STEP */}
        {step === 'sizing' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {SIZES.map(s => (
              <button key={s.id} onClick={() => setSize(s.id)} style={{
                padding: '18px',
                borderRadius: '18px',
                border: `1.5px solid ${size === s.id ? 'rgba(168,85,247,0.6)' : 'var(--border)'}`,
                background: size === s.id ? 'rgba(124,58,237,0.12)' : 'rgba(255,255,255,0.03)',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.25s ease',
                boxShadow: size === s.id ? '0 4px 20px rgba(124,58,237,0.25)' : 'none',
                position: 'relative',
              }}>
                {s.popular && (
                  <div style={{
                    position: 'absolute', top: '-10px', left: '16px',
                    background: 'linear-gradient(135deg, #7c3aed, #22d3ee)',
                    borderRadius: '6px', padding: '3px 10px',
                    fontSize: '0.68rem', fontWeight: '800', color: 'white',
                  }}>
                    MOST POPULAR
                  </div>
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <span style={{ fontSize: '2rem' }}>{s.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                      <span style={{ fontFamily: 'var(--font-main)', fontWeight: '700', fontSize: '1rem' }}>{s.label}</span>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>{s.desc}</span>
                    </div>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>e.g. {s.phones}</span>
                  </div>
                  <span style={{ fontFamily: 'var(--font-main)', fontWeight: '800', fontSize: '1.1rem', color: size === s.id ? '#a855f7' : 'white' }}>
                    {s.price}
                  </span>
                </div>
              </button>
            ))}

            <div style={{ padding: '14px 16px', borderRadius: '14px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', marginTop: '4px' }}>
              <p style={{ fontWeight: '600', fontSize: '0.85rem', marginBottom: '8px' }}>What's included</p>
              {['Transparent pyramid prism', 'Scratch-resistant sleeve', 'Branded unboxing box', 'Setup guide booklet'].map(item => (
                <p key={item} style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '4px' }}>✓ {item}</p>
              ))}
            </div>
          </div>
        )}

        {/* SHIPPING STEP */}
        {step === 'shipping' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {[
              { key: 'name', label: 'Full Name', placeholder: 'Mason Brown', type: 'text' },
              { key: 'email', label: 'Email', placeholder: 'mason@example.com', type: 'email' },
              { key: 'address', label: 'Street Address', placeholder: '123 Main St', type: 'text' },
              { key: 'city', label: 'City', placeholder: 'New York', type: 'text' },
              { key: 'zip', label: 'ZIP / Postal Code', placeholder: '10001', type: 'text' },
            ].map(field => (
              <div key={field.key}>
                <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '6px', fontWeight: '500' }}>
                  {field.label}
                </label>
                <input
                  type={field.type}
                  value={shipping[field.key]}
                  onChange={e => { setShipping(p => ({ ...p, [field.key]: e.target.value })); setErrors(er => ({ ...er, [field.key]: '' })) }}
                  placeholder={field.placeholder}
                  style={{
                    width: '100%', padding: '14px 16px', borderRadius: '12px',
                    border: `1px solid ${errors[field.key] ? '#f87171' : 'var(--border)'}`,
                    background: 'rgba(255,255,255,0.04)', color: 'white',
                    fontSize: '0.95rem', fontFamily: 'var(--font-body)', outline: 'none',
                  }}
                />
                {errors[field.key] && <p style={{ color: '#f87171', fontSize: '0.75rem', marginTop: '4px' }}>{errors[field.key]}</p>}
              </div>
            ))}
          </div>
        )}

        {/* CONFIRM STEP */}
        {step === 'confirm' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ padding: '18px', borderRadius: '18px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)' }}>
              <p style={{ fontWeight: '600', marginBottom: '12px', fontFamily: 'var(--font-main)' }}>Order Summary</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>HoloPrism {selectedSize?.label}</span>
                <span style={{ fontWeight: '600' }}>{selectedSize?.price}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Shipping</span>
                <span style={{ color: '#22d3ee', fontWeight: '600' }}>FREE</span>
              </div>
              <div style={{ height: '1px', background: 'var(--border)', margin: '12px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: '700', fontFamily: 'var(--font-main)' }}>Total</span>
                <span style={{ fontWeight: '800', fontFamily: 'var(--font-main)', color: '#a855f7', fontSize: '1.1rem' }}>{selectedSize?.price}</span>
              </div>
            </div>
            <div style={{ padding: '16px', borderRadius: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)' }}>
              <p style={{ fontWeight: '600', marginBottom: '8px', fontSize: '0.88rem', fontFamily: 'var(--font-main)' }}>Shipping to:</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.6 }}>
                {shipping.name}<br />
                {shipping.address}<br />
                {shipping.city} {shipping.zip}
              </p>
            </div>
            <div style={{ padding: '12px 14px', borderRadius: '12px', background: 'rgba(34,211,238,0.06)', border: '1px solid rgba(34,211,238,0.15)', fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              🔒 Secure checkout · Free returns within 30 days · Ships in 1-2 business days
            </div>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div style={{
        position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: '100%', maxWidth: '430px',
        padding: '16px', background: 'linear-gradient(0deg, rgba(5,2,15,0.98), transparent)',
        backdropFilter: 'blur(10px)',
      }}>
        <button
          onClick={() => {
            if (step === 'sizing') setStep('shipping')
            else if (step === 'shipping') { if (validateShipping()) setStep('confirm') }
            else if (step === 'confirm') handlePlaceOrder()
          }}
          className="btn-primary"
          style={{ width: '100%', padding: '18px', fontSize: '1rem' }}
        >
          {step === 'sizing' ? `Continue with ${selectedSize?.label} →` : step === 'shipping' ? 'Continue to Confirm →' : `Place Order · ${selectedSize?.price} 🚀`}
        </button>
      </div>
    </div>
  )
}
