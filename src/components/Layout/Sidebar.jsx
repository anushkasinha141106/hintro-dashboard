import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Info } from 'lucide-react'
import FeedbackModal from '../Feedback/FeedbackModal'
import useToast from '../../hooks/useToast'
import './Sidebar.css'

const ASSET_BASE = '/assets/dashboard/'

const NAV_ITEMS = [
  { label: 'Dashboard', path: '/dashboard', icon: 'dashboardicon.svg' },
  { label: 'Call Insights', path: '/call-insights', icon: 'phone.svg' },
  { label: 'Knowledge Base', path: '/knowledge-base', icon: 'knowledgebaselogo.svg', info: true },
  { label: 'Prompts', path: '/prompts', icon: 'promptslogo.svg', info: true },
  { label: 'Boxy Controls', path: '/boxy-controls', icon: 'boxycontrolslogo.svg', info: true },
]

const Sidebar = () => {
  const [showFeedback, setShowFeedback] = useState(false)
  const { toast, showToast } = useToast()

  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <div className="sidebar-logo">Hintro</div>
        <nav className="sidebar-nav">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `sidebar-nav-item ${isActive ? 'active' : ''}`
              }
            >
              <img className="nav-icon" src={`${ASSET_BASE}${item.icon}`} alt="" />
              <span>{item.label}</span>
              {item.info && <Info className="nav-info" size={16} strokeWidth={2.3} />}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="sidebar-bottom">
        <NavLink
          to="/feedback-history"
          className={({ isActive }) =>
            `sidebar-nav-item ${isActive ? 'active' : ''}`
          }
        >
          <img className="nav-icon" src={`${ASSET_BASE}feedbackhistorylogo.svg`} alt="" />
          <span>Feedback History</span>
        </NavLink>

        <button
          type="button"
          className="sidebar-nav-item sidebar-action"
          onClick={() => setShowFeedback(true)}
        >
          <img className="nav-icon" src={`${ASSET_BASE}feedbacklogo.svg`} alt="" />
          <span>Feedback</span>
        </button>

        <button
          className="upgrade-btn"
          onClick={() => showToast('Upgrade feature coming soon!')}
        >
          Upgrade
        </button>
      </div>

      {showFeedback && (
        <FeedbackModal onClose={() => setShowFeedback(false)} />
      )}

      {toast && <div className="toast">{toast}</div>}
    </aside>
  )
}

export default Sidebar
