import './ComingSoon.css'

const ComingSoon = ({ pageName }) => {
  return (
    <div className="coming-soon">
      <div className="cs-icon">🚧</div>
      <h2>{pageName}</h2>
      <p>This section is coming soon.</p>
    </div>
  )
}

export default ComingSoon