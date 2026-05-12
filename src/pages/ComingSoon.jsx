import PageHeader from '../components/Layout/PageHeader'
import './ComingSoon.css'

const ComingSoon = ({ pageName }) => {
  return (
    <div className="page-shell coming-soon-page">
      <PageHeader title={pageName} />
      <main className="coming-soon">
        <div className="cs-icon">!</div>
        <h2>{pageName}</h2>
        <p>This section is coming soon.</p>
      </main>
    </div>
  )
}

export default ComingSoon
