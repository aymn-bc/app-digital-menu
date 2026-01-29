import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import './i18n'
import App from './App.tsx'
import { useAppStore, selectSetOnline } from '@/store/useStore'
import { registerSW } from '@/pwa/registerServiceWorker'
import useSync from '@/hooks/useSync'
import { fetchThemeOnlineFirst, applyTheme } from '@/app/theme'

function AppWrapper() {
  const setOnline = useAppStore(selectSetOnline)
  useEffect(() => {
    const onOnline = () => setOnline(true)
    const onOffline = () => setOnline(false)
    window.addEventListener('online', onOnline)
    window.addEventListener('offline', onOffline)
    return () => {
      window.removeEventListener('online', onOnline)
      window.removeEventListener('offline', onOffline)
    }
  }, [setOnline])

  useEffect(() => registerSW(), [])
  useSync()

  useEffect(() => {
    ;(async () => {
      const vars = await fetchThemeOnlineFirst()
      applyTheme(vars)
    })()
  }, [])

  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>,
)
