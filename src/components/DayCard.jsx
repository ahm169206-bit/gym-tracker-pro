import { useState } from 'react'
import ExerciseCard from './ExerciseCard.jsx'
import { newExercise, dayStats } from '../utils/helpers.js'

const STATUS_LABELS = {
  'not-started': 'Not Started',
  'in-progress': 'In Progress',
  'completed': 'Completed',
}

export default function DayCard({ day, onUpdateDay, onDeleteDay, onToast }) {
  const [confirmDeleteDay, setConfirmDeleteDay] = useState(false)
  const stats = dayStats(day)

  const updateDay = (patch) => onUpdateDay({ ...day, ...patch })

  const addExercise = () => {
    updateDay({ exercises: [...day.exercises, newExercise()] })
    onToast('Exercise added successfully')
  }

  const updateExercise = (id, updated) => {
    updateDay({ exercises: day.exercises.map((ex) => (ex.id === id ? updated : ex)) })
  }

  const deleteExercise = (id) => {
    updateDay({ exercises: day.exercises.filter((ex) => ex.id !== id) })
  }

  return (
    <div>
      <div className="day-header">
        <div style={{ flex: 1, minWidth: 220 }}>
          <input
            className="day-name-input"
            value={day.name}
            onChange={(e) => updateDay({ name: e.target.value })}
            aria-label="Day name"
          />
          <textarea
            className="day-desc-input"
            rows={1}
            placeholder="Optional description for this day..."
            value={day.description}
            onChange={(e) => updateDay({ description: e.target.value })}
            aria-label="Day description"
          />
          <div className="day-meta-row">
            <span><b>{stats.totalExercises}</b> exercises</span>
            <span><b>{stats.totalSets}</b> sets</span>
            <span><b>{stats.completion}%</b> complete</span>
          </div>
          <div className="progress-bar-track" style={{ maxWidth: 320, marginTop: 6 }}>
            <div className="progress-bar-fill" style={{ width: `${stats.completion}%` }} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <select
            className="status-select"
            value={day.status}
            onChange={(e) => updateDay({ status: e.target.value })}
            aria-label="Workout status"
          >
            {Object.entries(STATUS_LABELS).map(([val, label]) => (
              <option key={val} value={val}>{label}</option>
            ))}
          </select>
          {confirmDeleteDay ? (
            <>
              <button className="btn btn-sm btn-danger" onClick={() => { onDeleteDay(); onToast('Day deleted') }}>Confirm delete</button>
              <button className="btn btn-sm btn-ghost" onClick={() => setConfirmDeleteDay(false)}>Cancel</button>
            </>
          ) : (
            <button className="btn btn-sm btn-ghost" onClick={() => setConfirmDeleteDay(true)} title="Delete day">
              <i className="bi bi-trash3"></i>
            </button>
          )}
        </div>
      </div>

      {day.exercises.length === 0 ? (
        <div className="empty-state">
          <i className="bi bi-clipboard-x"></i>
          <h4>No Exercises Yet</h4>
          <p>Build your workout by adding your first exercise.</p>
          <button className="btn btn-primary" style={{ marginTop: 14 }} onClick={addExercise}>
            <i className="bi bi-plus-lg"></i> Add Exercise
          </button>
        </div>
      ) : (
        <>
          {day.exercises.map((ex) => (
            <ExerciseCard
              key={ex.id}
              exercise={ex}
              onUpdate={(updated) => updateExercise(ex.id, updated)}
              onDelete={() => deleteExercise(ex.id)}
              onToast={onToast}
            />
          ))}
          <button className="btn btn-outline" onClick={addExercise}>
            <i className="bi bi-plus-lg"></i> Add Exercise
          </button>
        </>
      )}
    </div>
  )
}
