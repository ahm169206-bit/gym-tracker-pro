import { useState } from 'react'
import SetRow from './SetRow.jsx'
import { newSet } from '../utils/helpers.js'

export default function ExerciseCard({ exercise, onUpdate, onDelete, onToast }) {
  const [confirmDelete, setConfirmDelete] = useState(false)

  const update = (patch) => onUpdate({ ...exercise, ...patch })

  const addSet = () => {
    const sets = [...exercise.sets, newSet(exercise.sets.length)]
    update({ sets })
    onToast('Set added')
  }

  const updateSet = (id, newValues) => {
    update({ sets: exercise.sets.map((s) => (s.id === id ? newValues : s)) })
  }

  const removeSet = (id) => {
    update({ sets: exercise.sets.filter((s) => s.id !== id).map((s, i) => ({ ...s, index: i })) })
  }

  const toggleComplete = () => update({ completed: !exercise.completed })

  return (
    <div className="exercise-card">
      <div className="exercise-head">
        <div className="exercise-title-row">
          <button
            className={`exercise-check ${exercise.completed ? 'done' : ''}`}
            onClick={toggleComplete}
            aria-label={exercise.completed ? 'Mark exercise incomplete' : 'Mark exercise complete'}
            title={exercise.completed ? 'Completed' : 'Mark complete'}
          >
            <i className="bi bi-check-lg"></i>
          </button>
          <input
            className={`exercise-name-input ${exercise.completed ? 'done-text' : ''}`}
            value={exercise.name}
            onChange={(e) => update({ name: e.target.value })}
            aria-label="Exercise name"
            placeholder="Exercise name"
          />
        </div>
        {confirmDelete ? (
          <div style={{ display: 'flex', gap: 6 }}>
            <button className="btn btn-sm btn-danger" onClick={() => { onDelete(); onToast('Exercise deleted') }}>Confirm</button>
            <button className="btn btn-sm btn-ghost" onClick={() => setConfirmDelete(false)}>Cancel</button>
          </div>
        ) : (
          <button className="btn btn-icon btn-ghost" onClick={() => setConfirmDelete(true)} aria-label="Delete exercise" title="Delete exercise">
            <i className="bi bi-trash3"></i>
          </button>
        )}
      </div>

      <textarea
        className="exercise-desc-input"
        rows={1}
        placeholder="Add a description (muscle group, cues, tempo)..."
        value={exercise.description}
        onChange={(e) => update({ description: e.target.value })}
        aria-label="Exercise description"
      />

      {exercise.sets.length > 0 && <div className="sets-label">SETS</div>}

      {exercise.sets.map((set, i) => (
        <SetRow
          key={set.id}
          set={set}
          index={i}
          onChange={(v) => updateSet(set.id, v)}
          onRemove={() => removeSet(set.id)}
        />
      ))}

      <div className="exercise-footer">
        <button className="btn btn-sm btn-outline" onClick={addSet}>
          <i className="bi bi-plus-lg"></i> Add Set
        </button>
        <span style={{ color: 'var(--text-dim)', fontSize: 12 }}>
          {exercise.sets.length} set{exercise.sets.length !== 1 ? 's' : ''}
        </span>
      </div>
    </div>
  )
}
