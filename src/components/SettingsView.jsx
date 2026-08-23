import { useRef, useState } from 'react'
import Modal from './Modal.jsx'
import { isValidWorkoutData } from '../utils/helpers.js'

export default function SettingsView({ days, setDays, resetToDefault, onToast }) {
  const fileInputRef = useRef(null)
  const [confirmReset, setConfirmReset] = useState(false)

  const exportData = () => {
    const payload = { days, exportedAt: new Date().toISOString() }
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `iron-track-backup-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
    onToast('Workout exported')
  }

  const triggerImport = () => fileInputRef.current?.click()

  const handleImport = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result)
        if (!isValidWorkoutData(parsed)) {
          onToast('Invalid workout file', 'error')
          return
        }
        setDays(parsed.days)
        onToast('Workout imported successfully')
      } catch {
        onToast('Could not read that file', 'error')
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  return (
    <div>
      <h1 className="page-title">Settings</h1>
      <p className="page-subtitle">Manage your data and preferences.</p>

      <div className="card">
        <div className="settings-row">
          <div>
            <h4>Export Workout</h4>
            <p>Download your full program — days, exercises, and sets — as a JSON file.</p>
          </div>
          <button className="btn btn-outline" onClick={exportData}>
            <i className="bi bi-download"></i> Export
          </button>
        </div>

        <div className="settings-row">
          <div>
            <h4>Import Workout</h4>
            <p>Restore a previously exported JSON backup. This replaces your current program.</p>
          </div>
          <button className="btn btn-outline" onClick={triggerImport}>
            <i className="bi bi-upload"></i> Import
          </button>
          <input ref={fileInputRef} type="file" accept="application/json" hidden onChange={handleImport} />
        </div>

        <div className="settings-row">
          <div>
            <h4>Reset All Workout Data</h4>
            <p>Wipes every day, exercise, and set back to the default 7-day empty program. This cannot be undone.</p>
          </div>
          <button className="btn btn-danger" onClick={() => setConfirmReset(true)}>
            <i className="bi bi-arrow-counterclockwise"></i> Reset
          </button>
        </div>
      </div>

      {confirmReset && (
        <Modal
          title="Reset everything?"
          message="This will permanently delete all your days, exercises, and sets, and restore the default 7-day program. This action cannot be undone."
          confirmLabel="Yes, Reset"
          onConfirm={() => { resetToDefault(); setConfirmReset(false); onToast('Workout data reset') }}
          onCancel={() => setConfirmReset(false)}
        />
      )}
    </div>
  )
}
