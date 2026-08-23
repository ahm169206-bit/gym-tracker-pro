import { useState, useMemo } from 'react'

export default function ExercisesView({ days, onNavigate, setActiveDayId }) {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all') // all | completed | pending

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    const rows = []
    days.forEach((day) => {
      day.exercises.forEach((ex) => {
        if (q && !ex.name.toLowerCase().includes(q) && !ex.description.toLowerCase().includes(q)) return
        if (filter === 'completed' && !ex.completed) return
        if (filter === 'pending' && ex.completed) return
        rows.push({ day, ex })
      })
    })
    return rows
  }, [days, query, filter])

  return (
    <div>
      <h1 className="page-title">Exercises</h1>
      <p className="page-subtitle">Search across your entire program.</p>

      <div className="search-bar">
        <i className="bi bi-search"></i>
        <input
          placeholder="Search exercises by name or description..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search exercises"
        />
      </div>

      <div className="filter-chips">
        {[
          { id: 'all', label: 'All' },
          { id: 'pending', label: 'Pending' },
          { id: 'completed', label: 'Completed' },
        ].map((f) => (
          <button
            key={f.id}
            className={`chip ${filter === f.id ? 'active' : ''}`}
            onClick={() => setFilter(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {results.length === 0 ? (
        <div className="empty-state">
          <i className="bi bi-search"></i>
          <h4>No Matches</h4>
          <p>Try a different search term or filter.</p>
        </div>
      ) : (
        results.map(({ day, ex }) => (
          <div
            key={ex.id}
            className="card"
            style={{ marginBottom: 12, cursor: 'pointer' }}
            onClick={() => { setActiveDayId(day.id); onNavigate('plan') }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 3 }}>
                  {ex.completed && <i className="bi bi-check-circle-fill" style={{ color: 'var(--green)', marginRight: 6 }}></i>}
                  {ex.name}
                </div>
                <div style={{ color: 'var(--text-dim)', fontSize: 13 }}>{day.name} · {ex.sets.length} sets</div>
              </div>
              <i className="bi bi-chevron-right" style={{ color: 'var(--text-dim)' }}></i>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
