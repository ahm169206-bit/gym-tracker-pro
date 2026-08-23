const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: 'bi-grid-1x2-fill' },
  { id: 'plan', label: 'Workout Plan', icon: 'bi-calendar-week-fill' },
  { id: 'exercises', label: 'Exercises', icon: 'bi-search' },
  { id: 'settings', label: 'Settings', icon: 'bi-gear-fill' },
]

export default function Sidebar({ active, onNavigate }) {
  return (
    <nav className="sidebar" aria-label="Main navigation">
      <div className="brand">
        <div className="brand-mark"><i className="bi bi-lightning-charge-fill"></i></div>
        <div className="brand-text">IRON <span>TRACK</span></div>
      </div>

      {NAV_ITEMS.map((item) => (
        <button
          key={item.id}
          className={`nav-item ${active === item.id ? 'active' : ''}`}
          onClick={() => onNavigate(item.id)}
          aria-current={active === item.id ? 'page' : undefined}
        >
          <i className={`bi ${item.icon}`}></i>
          <span className="nav-label">{item.label}</span>
        </button>
      ))}

      <div className="sidebar-footer">
        <b>Ahmed Yasser</b><br />
        © 2026 All Rights Reserved.
      </div>
    </nav>
  )
}
