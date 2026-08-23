import { useEffect } from 'react'
import DayCard from './DayCard.jsx'
import { makeId } from '../utils/helpers.js'

export default function PlanView({ days, setDays, activeDayId, setActiveDayId, onToast }) {
  useEffect(() => {
    if (!activeDayId && days.length > 0) setActiveDayId(days[0].id)
  }, [days, activeDayId, setActiveDayId])

  const activeDay = days.find((d) => d.id === activeDayId) || days[0]

  const addDay = () => {
    const newDay = {
      id: makeId('day'),
      name: `Day ${days.length + 1}`,
      description: '',
      status: 'not-started',
      exercises: [],
    }
    setDays([...days, newDay])
    setActiveDayId(newDay.id)
    onToast('Day added')
  }

  const updateDay = (updated) => {
    setDays(days.map((d) => (d.id === updated.id ? updated : d)))
  }

  const deleteDay = (id) => {
    const remaining = days.filter((d) => d.id !== id)
    setDays(remaining)
    if (activeDayId === id) setActiveDayId(remaining[0]?.id || null)
  }

  if (!activeDay) {
    return (
      <div className="empty-state">
        <i className="bi bi-calendar-plus"></i>
        <h4>No Days Yet</h4>
        <p>Add your first training day to start building your program.</p>
        <button className="btn btn-primary" style={{ marginTop: 14 }} onClick={addDay}>
          <i className="bi bi-plus-lg"></i> Add Day
        </button>
      </div>
    )
  }

  return (
    <div>
      <h1 className="page-title">Workout Plan</h1>
      <p className="page-subtitle">Your weekly training program — fully customizable.</p>

      <div className="day-nav">
        {days.map((day) => (
          <button
            key={day.id}
            className={`day-pill status-${day.status} ${day.id === activeDayId ? 'active' : ''}`}
            onClick={() => setActiveDayId(day.id)}
          >
            <span className="dot"></span>
            {day.name}
          </button>
        ))}
        <button className="day-pill day-pill-add" onClick={addDay}>
          <i className="bi bi-plus-lg"></i> Add Day
        </button>
      </div>

      <div className="card">
        <DayCard
          day={activeDay}
          onUpdateDay={updateDay}
          onDeleteDay={() => deleteDay(activeDay.id)}
          onToast={onToast}
        />
      </div>
    </div>
  )
}
