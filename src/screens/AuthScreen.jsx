import { useState, useEffect } from 'react'
import StarsBg from '../components/StarsBg'
import HoloPrismLogo from '../components/HoloPrismLogo'

export default function AuthScreen({ onAuth, onDemo }) {
  const [mode, setMode] = useState('select') // select | email | phone | verify
  const [input, setInput] = useState('')
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [verifying, setVerifying] = useState(false)
  const [codeSent, setCodeSent] = useState(false)
  const [error, setError] = useState('')
  const [resendCountdown, setResendCountdown] = useState(60)
  const [resendDisabled, setResendDisabled] = useState(true)

  const handleSendCode = () => {
    if (!input.trim()) { setError('Please enter your email or phone'); return }
    setError('')
    setCodeSent(true)
    setMode('verify')
  }

  // Start countdown when entering verify mode
  useEffect(() => {
    if (mode === 'verify') {
      setResendCountdown(60)
      setResendDisabled(true)
      const t = setInterval(() => {
        setResendCountdown(c => {
          if (c <= 1) { clearInterval(t); setResendDisabled(false); return 0 }
          return c - 1
        })
      }, 1000)
      return () => clearInterval(t)
    }
  }, [mode])

  const handleResend = () => {
    if (resendDisabled) return
    setResendCountdown(60)
    setResendDisabled(true)
    setCode(['', '', '', '', '', ''])
    setError('')
    // Restart countdown
    const t = setInterval(() => {
      setResendCountdown(c => {
        if (c <= 1) { clearInterval(t); setResendDisabled(false); return 0 }
        return c - 1
      })
    }, 1000)
  }

  const handleCodeChange = (val, idx) => {
    const next = [...code]
    next[idx] = val.replace(/[^0-9]/g, '').slice(-1)
    setCode(next)
    setError('')
    if (val && idx < 5) {
      document.getElementById(`code-${idx + 1}`)?.focus()
    }
    if (next.every(d => d !== '') && idx === 5) {
      // Validate: codes starting with 0000 are invalid
      const fullCode = next.join('')
      setTimeout(() => {
        if (fullCode.startsWith('0000')) {
          setError('Invalid code. Please try again.')
          setCode(['', '', '', '', '', ''])
          setTimeout(() => document.getElementById('code-0')?.focus(), 50)
          return
        }
        setVerifying(true)
        setTimeout(() => { setVerifying(false); onAuth() }, 1000)
      }, 200)
    }
  }

  const handleKeyDown = (e, idx) => {
    if (e.key === 'Backspace' && !code[idx] && idx > 0) {
      document.getElementById(`code-${idx - 1}`)?.focus()
    }
  }

  return (
    <div className="screen" style={{
      background: 'radial-gradient(ellipse at 50% 0%, #1a0d35 0%, #0d0720 50%, #05020f 100%)',
      justifyContent: 'flex-start',
      padding: '0 24px 40px',
      overflowY: 'auto',
    }}>
      <StarsBg count={50} />

      {/* Top decoration */}
      <div style={{
        position: 'absolute',
        top: -80,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 280,
        height: 280,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)',
        filter: 'blur(40px)',
        pointerEvents: 'none',
      }} />

      {/* Logo header */}
      <div style={{ textAlign: 'center', paddingTop: '64px', paddingBottom: '40px', position: 'relative' }}>
        <HoloPrismLogo size="medium" />
        <p style={{ color: 'var(--text-muted)', marginTop: '8px', fontSize: '0.9rem' }}>
          {mode === 'verify' ? 'Enter verification code' : 'Sign in to start creating'}
        </p>
      </div>

      {/* Auth content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative' }}>

        {mode === 'select' && (
          <>
            <button className="btn-primary" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
              onClick={() => setMode('email')}>
              <EmailIcon /> Continue with Email
            </button>
            <button className="btn-secondary" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
              onClick={() => setMode('phone')}>
              <PhoneIcon /> Continue with Phone
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '8px 0' }}>
              <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
              <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>or</span>
              <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
            </div>

            {/* DEMO button — most prominent */}
            <button onClick={onDemo} style={{
              width: '100%',
              padding: '18px',
              borderRadius: '20px',
              border: '1.5px solid rgba(34,211,238,0.4)',
              background: 'linear-gradient(135deg, rgba(34,211,238,0.08), rgba(124,58,237,0.08))',
              color: '#22d3ee',
              fontFamily: 'var(--font-main)',
              fontSize: '1rem',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              boxShadow: '0 0 20px rgba(34,211,238,0.15)',
              letterSpacing: '0.02em',
            }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 30px rgba(34,211,238,0.3)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 20px rgba(34,211,238,0.15)'}
            >
              <SparkIcon />
              Try Demo Experience
            </button>
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.78rem' }}>
              No account needed — jump straight to the magic ✨
            </p>
          </>
        )}

        {(mode === 'email' || mode === 'phone') && (
          <>
            <button className="btn-ghost" style={{ alignSelf: 'flex-start', padding: '0 0 8px' }}
              onClick={() => { setMode('select'); setInput(''); setError('') }}>
              ← Back
            </button>
            <div style={{ marginBottom: '8px' }}>
              <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '8px', fontWeight: '500' }}>
                {mode === 'email' ? 'Email Address' : 'Phone Number'}
              </label>
              <input
                type={mode === 'email' ? 'email' : 'tel'}
                value={input}
                onChange={e => { setInput(e.target.value); setError('') }}
                placeholder={mode === 'email' ? 'you@example.com' : '+1 (555) 000-0000'}
                autoFocus
                style={{
                  width: '100%',
                  padding: '16px 18px',
                  borderRadius: '14px',
                  border: error ? '1px solid #f87171' : '1px solid var(--border)',
                  background: 'rgba(255,255,255,0.05)',
                  color: 'white',
                  fontSize: '1rem',
                  fontFamily: 'var(--font-body)',
                  outline: 'none',
                  transition: 'border 0.2s',
                }}
                onFocus={e => !error && (e.target.style.border = '1px solid rgba(168,85,247,0.5)')}
                onBlur={e => !error && (e.target.style.border = '1px solid var(--border)')}
                onKeyDown={e => e.key === 'Enter' && handleSendCode()}
              />
              {error && <p style={{ color: '#f87171', fontSize: '0.8rem', marginTop: '6px' }}>{error}</p>}
            </div>
            <button className="btn-primary" style={{ width: '100%' }} onClick={handleSendCode}>
              Send Code →
            </button>
          </>
        )}

        {mode === 'verify' && (
          <>
            <button className="btn-ghost" style={{ alignSelf: 'flex-start', padding: '0 0 8px' }}
              onClick={() => { setMode(input.includes('@') ? 'email' : 'phone'); setCode(['','','','','','']); setError('') }}>
              ← Back
            </button>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.5 }}>
              We sent a 6-digit code to <strong style={{ color: 'white' }}>{input}</strong>
            </p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', margin: '16px 0' }}>
              {code.map((digit, i) => (
                <input
                  key={i}
                  id={`code-${i}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={e => handleCodeChange(e.target.value, i)}
                  onKeyDown={e => handleKeyDown(e, i)}
                  style={{
                    width: '46px',
                    height: '58px',
                    textAlign: 'center',
                    fontSize: '1.4rem',
                    fontWeight: '700',
                    fontFamily: 'var(--font-main)',
                    borderRadius: '12px',
                    border: error ? '1.5px solid #f87171' : digit ? '1.5px solid rgba(168,85,247,0.6)' : '1px solid var(--border)',
                    background: digit ? 'rgba(124,58,237,0.15)' : 'rgba(255,255,255,0.04)',
                    color: 'white',
                    outline: 'none',
                    transition: 'all 0.2s',
                    boxShadow: digit ? '0 0 12px rgba(124,58,237,0.3)' : 'none',
                    animation: verifying && digit ? 'pulse-glow 0.5s ease infinite' : 'none',
                  }}
                />
              ))}
            </div>
            {error && (
              <div style={{ textAlign: 'center', color: '#f87171', fontSize: '0.88rem', animation: 'fade-in-up 0.2s ease' }}>
                ✗ {error}
              </div>
            )}
            {verifying && (
              <div style={{ textAlign: 'center', color: '#a855f7', fontSize: '0.9rem', animation: 'pulse-glow 1s ease infinite' }}>
                ✓ Verifying...
              </div>
            )}
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
              Didn&apos;t receive it?{' '}
              <button
                onClick={handleResend}
                disabled={resendDisabled}
                style={{
                  background: 'none',
                  border: 'none',
                  color: resendDisabled ? 'var(--text-muted)' : '#a855f7',
                  padding: '0',
                  display: 'inline',
                  cursor: resendDisabled ? 'default' : 'pointer',
                  fontFamily: 'inherit',
                  fontSize: 'inherit',
                  fontWeight: '600',
                  textDecoration: resendDisabled ? 'none' : 'underline',
                }}
              >
                {resendDisabled ? `Resend in ${resendCountdown}s` : 'Resend code'}
              </button>
            </p>
          </>
        )}
      </div>

      {/* Terms */}
      <p style={{ textAlign: 'center', color: 'rgba(148,163,184,0.5)', fontSize: '0.72rem', marginTop: '24px', lineHeight: 1.6 }}>
        By continuing you agree to our <span style={{ color: 'var(--text-muted)' }}>Terms of Service</span> &amp; <span style={{ color: 'var(--text-muted)' }}>Privacy Policy</span>
      </p>
    </div>
  )
}

function EmailIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
}

function PhoneIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.1 19.79 19.79 0 0 1 1.61 4.5 2 2 0 0 1 3.6 2.32h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.06 6.06l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
}

function SparkIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>
}
