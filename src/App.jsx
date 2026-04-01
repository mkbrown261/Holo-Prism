import { useState, useEffect } from 'react'
import SplashScreen from './screens/SplashScreen'
import AuthScreen from './screens/AuthScreen'
import OnboardingScreen from './screens/OnboardingScreen'
import HomeScreen from './screens/HomeScreen'
import TemplateSelectScreen from './screens/TemplateSelectScreen'
import CustomizeScreen from './screens/CustomizeScreen'
import HologramPreviewScreen from './screens/HologramPreviewScreen'
import UserGuideScreen from './screens/UserGuideScreen'
import OrderScreen from './screens/OrderScreen'

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
    home: <HomeScreen onSelect={(category) => navigate('templates', { selectedCategory: category })} />,
    templates: <TemplateSelectScreen category={appData.selectedCategory} onSelect={(template) => navigate('customize', { selectedTemplate: template })} onBack={() => navigate('home')} />,
    customize: <CustomizeScreen template={appData.selectedTemplate} appData={appData} onChange={(data) => setAppData(prev => ({ ...prev, ...data }))} onPreview={() => navigate('hologram-preview')} onBack={() => navigate('templates')} />,
    'hologram-preview': <HologramPreviewScreen appData={appData} onGuide={() => navigate('user-guide')} onOrder={() => navigate('order')} onBack={() => navigate(appData.isDemo ? 'auth' : 'customize')} />,
    'user-guide': <UserGuideScreen onPlay={() => navigate('hologram-preview')} onBack={() => navigate('hologram-preview')} />,
    order: <OrderScreen appData={appData} onBack={() => navigate('hologram-preview')} />,
  }

  return (
    <div className="app-container">
      {screens[currentScreen] || screens['splash']}
    </div>
  )
}
