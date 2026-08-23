import StatsCard from './StatsCard.jsx'
import { globalStats, dayStats } from '../utils/helpers.js'

const HERO_IMG = 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1600&q=70'

export default function Dashboard({ days, onNavigate, onSelectDay }) {
  const stats = globalStats(days)

  return (
    <div>
      <div className="hero" style={{ '--hero-img': `url(${HERO_IMG})` }}>
        <div>
          <div className="hero-eyebrow">Workout Program</div>
          <h1 className="hero-title">BUILD YOUR<br /><em>STRONGER SELF</em></h1>
          <p className="hero-copy">Plan your workouts. Track every set. Record every kilogram.</p>
          <button className="btn btn-primary" onClick={() => onNavigate('plan')}>
            <i className="bi bi-play-fill"></i> Start Workout
          </button>
        </div>
      </div>

      <div className="stat-grid">
        <StatsCard icon="bi-calendar3" value={stats.totalDays} label="Total Days" />
        <StatsCard icon="bi-list-check" value={stats.totalExercises} label="Total Exercises" />
        <StatsCard icon="bi-stack" value={stats.totalSets} label="Total Sets" />
        <StatsCard icon="bi-graph-up-arrow" value={`${stats.workoutCompletion}%`} label="Workout Completion" />
      </div>

      <div className="section-head">
        <h3>Your Week</h3>
        <button className="btn btn-sm btn-outline" onClick={() => onNavigate('plan')}>
          View full plan <i className="bi bi-arrow-right"></i>
        </button>
      </div>

      <div className="day-nav">
        {days.map((day) => {
          const s = dayStats(day)
          return (
            <button
              key={day.id}
              className={`day-pill status-${day.status}`}
              onClick={() => { onSelectDay(day.id); onNavigate('plan') }}
            >
              <span className="dot"></span>
              {day.name}
              <span style={{ opacity: 0.6, fontWeight: 500 }}>· {s.totalExercises}ex</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
