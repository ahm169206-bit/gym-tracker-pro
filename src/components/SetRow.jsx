export default function SetRow({ set, index, onChange, onRemove }) {
  const handleWeight = (e) => {
    const v = e.target.value
    if (v === '' || /^\d*\.?\d*$/.test(v)) onChange({ ...set, weight: v })
  }
  const handleReps = (e) => {
    const v = e.target.value
    if (v === '' || /^\d*$/.test(v)) onChange({ ...set, reps: v })
  }

  return (
    <div className="set-row">
      <div className="set-index">{index + 1}</div>
      <div className="set-field">
        <label>KG</label>
        <input
          className="set-input"
          type="text"
          inputMode="decimal"
          placeholder="0"
          value={set.weight}
          onChange={handleWeight}
          aria-label={`Set ${index + 1} weight in kilograms`}
        />
      </div>
      <div className="set-field">
        <label>REPS</label>
        <input
          className="set-input"
          type="text"
          inputMode="numeric"
          placeholder="0"
          value={set.reps}
          onChange={handleReps}
          aria-label={`Set ${index + 1} reps`}
        />
      </div>
      <div className="set-field set-notes">
        <label>NOTES</label>
        <input
          className="set-input notes"
          type="text"
          placeholder="Optional"
          value={set.notes}
          onChange={(e) => onChange({ ...set, notes: e.target.value })}
          aria-label={`Set ${index + 1} notes`}
        />
      </div>
      <button className="set-remove" onClick={onRemove} aria-label={`Delete set ${index + 1}`} title="Delete set">
        <i className="bi bi-x-lg"></i>
      </button>
    </div>
  )
}
