export default function Toast({ toasts }) {
  return (
    <div className="toast-stack">
      {toasts.map((t) => (
        <div key={t.id} className={`toast ${t.type === 'error' ? 'error' : ''}`}>
          <i className={`bi ${t.type === 'error' ? 'bi-exclamation-circle' : 'bi-check-circle'}`}></i>
          {t.message}
        </div>
      ))}
    </div>
  )
}
