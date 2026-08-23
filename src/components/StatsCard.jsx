export default function StatsCard({ icon, value, label }) {
  return (
    <div className="stat-card">
      <div className="stat-icon"><i className={`bi ${icon}`}></i></div>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  )
}
