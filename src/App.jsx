import { useState, useCallback } from 'react'
import Sidebar from './components/Sidebar.jsx'
import Dashboard from './components/Dashboard.jsx'
import PlanView from './components/PlanView.jsx'
import ExercisesView from './components/ExercisesView.jsx'
import SettingsView from './components/SettingsView.jsx'
import Toast from './components/Toast.jsx'
import { useLocalStorage } from './hooks/useLocalStorage.js'
import { defaultDays, makeId } from './utils/helpers.js'

export default function App() {
  const [days, setDays, justSaved] = useLocalStorage('iron-track:days', defaultDays())
  const [page, setPage] = useState('dashboard')
  const [activeDayId, setActiveDayId] = useState(null)
  const [toasts, setToasts] = useState([])

  const pushToast = useCallback((message, type = 'success') => {
    const id = makeId('toast')
    setToasts((t) => [...t, { id, message, type }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2400)
  }, [])

  const resetToDefault = () => {
    const fresh = defaultDays()
    setDays(fresh)
    setActiveDayId(fresh[0]?.id || null)
  }

  return (
    <div className="app-shell">
      <Sidebar active={page} onNavigate={setPage} />

      <main className="main-content">
        {page === 'dashboard' && (
          <Dashboard days={days} onNavigate={setPage} onSelectDay={setActiveDayId} />
        )}

        {(page === 'plan') && (
          <PlanView
            days={days}
            setDays={setDays}
            activeDayId={activeDayId}
            setActiveDayId={setActiveDayId}
            onToast={pushToast}
          />
        )}

        {page === 'exercises' && (
          <ExercisesView days={days} onNavigate={setPage} setActiveDayId={setActiveDayId} />
        )}

        {page === 'settings' && (
          <SettingsView days={days} setDays={setDays} resetToDefault={resetToDefault} onToast={pushToast} />
        )}

        <div className="footer-brand">
          <b>Ahmed Yasser</b><br />
          © 2026 Ahmed Yasser — All Rights Reserved.
        </div>
      </main>

      {justSaved && (
        <div className="saved-badge">
          <i className="bi bi-cloud-check-fill"></i> Changes saved automatically
        </div>
      )}

      <Toast toasts={toasts} />
    </div>
  )
}
