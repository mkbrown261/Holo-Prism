import { useState, Component } from 'react'
import SplashScreen from './screens/SplashScreen'
import AuthScreen from './screens/AuthScreen'
import OnboardingScreen from './screens/OnboardingScreen'
import HomeScreen from './screens/HomeScreen'
import TemplateSelectScreen from './screens/TemplateSelectScreen'
import CustomizeScreen from './screens/CustomizeScreen'
import HologramPreviewScreen from './screens/HologramPreviewScreen'
import UserGuideScreen from './screens/UserGuideScreen'
import OrderScreen from './screens/OrderScreen'
import PricingScreen from './screens/PricingScreen'
import GiftScreen from './screens/GiftScreen'
import EventScreen from './screens/EventScreen'

class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { hasError: false } }
  static getDerivedStateFromError() { return { hasError: true } }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          minHeight: '100vh', background: '#05020f', color: 'white',
          gap: '16px', padding: '32px', textAlign: 'center',
        }}>
          <div style={{ fontSize: '3rem' }}>🔮</div>
          <h2 style={{ fontFamily: 'var(--font-main)', fontSize: '1.4rem' }}>Something went wrong</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Tap below to restart HoloPrism</p>
          <button
            className="btn-primary"
            style={{ padding: '14px 28px' }}
            onClick={() => { this.setState({ hasError: false }); window.location.reload() }}
          >
            Restart App
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('splash')
  const [appData, setAppData] = useState({
    isDemo: false,
    selectedCategory: null,
    selectedTemplate: null,
    customText: 'HAPPY BIRTHDAY',
    animationStyle: 'sparkle',
    selectedDevice: null,
  })

  const navigate = (screen, data = {}) => {
    setAppData(prev => ({ ...prev, ...data }))
    setCurrentScreen(screen)
  }

  const screens = {
    splash: <SplashScreen onComplete={() => navigate('auth')} />,
    auth: <AuthScreen onAuth={() => navigate('onboarding')} onDemo={() => navigate('hologram-preview', { isDemo: true })} />,
    onboarding: <OnboardingScreen onComplete={() => navigate('home')} />,
    home: (
      <HomeScreen
        onSelect={(category) => navigate('templates', { selectedCategory: category })}
        onNavigate={(screen) => navigate(screen)}
      />
    ),
    templates: (
      <TemplateSelectScreen
        category={appData.selectedCategory}
        onSelect={(template) => navigate('customize', { selectedTemplate: template })}
        onBack={() => navigate('home')}
      />
    ),
    customize: (
      <CustomizeScreen
        template={appData.selectedTemplate}
        appData={appData}
        onChange={(data) => setAppData(prev => ({ ...prev, ...data }))}
        onPreview={() => navigate('hologram-preview')}
        onBack={() => navigate('templates')}
      />
    ),
    'hologram-preview': (
      <HologramPreviewScreen
        appData={appData}
        onGuide={() => navigate('user-guide')}
        onOrder={() => navigate('order')}
        onBack={() => navigate(appData.isDemo ? 'auth' : 'customize')}
        onGift={() => navigate('gift')}
      />
    ),
    'user-guide': (
      <UserGuideScreen
        onPlay={() => navigate('hologram-preview')}
        onBack={() => navigate('hologram-preview')}
      />
    ),
    order: (
      <OrderScreen
        appData={appData}
        onBack={() => navigate('hologram-preview')}
      />
    ),
    pricing: (
      <PricingScreen
        onBack={() => navigate('home')}
        onOrder={() => navigate('order')}
      />
    ),
    gift: (
      <GiftScreen
        appData={appData}
        onBack={() => navigate('home')}
        onOrder={() => navigate('order')}
      />
    ),
    events: (
      <EventScreen
        onBack={() => navigate('home')}
      />
    ),
  }

  return (
    <div className="app-container">
      <ErrorBoundary>
        {screens[currentScreen] || screens['splash']}
      </ErrorBoundary>
    </div>
  )
}
