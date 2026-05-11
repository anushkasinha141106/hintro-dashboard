import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useUser } from '../../context/UserContext'
import FeedbackModal from '../Feedback/FeedbackModal'
import useToast from '../../hooks/useToast'
import './Sidebar.css'

const NAV_ITEMS = [
  { label: 'Dashboard', path: '/dashboard', icon: '⊞' },
  { label: 'Call Insights', path: '/call-insights', icon: '📞' },
  { label: 'Knowledge Base', path: '/knowledge-base', icon: '📄' },
  { label: 'Prompts', path: '/prompts', icon: '💬' },
  { label: 'Boxy Controls', path: '/boxy-controls', icon: '⊙' },
]

const Sidebar = () => {
  const { userId, setUserId } = useUser()
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
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
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
          <span className="nav-icon">🕐</span>
          <span>Feedback History</span>
        </NavLink>

        <div
          className="sidebar-nav-item"
          onClick={() => setShowFeedback(true)}
        >
          <span className="nav-icon">🎁</span>
          <span>Feedback</span>
        </div>

        <button
          className="upgrade-btn"
          onClick={() => showToast('Upgrade feature coming soon!')}
        >
          Upgrade
        </button>

        <div className="user-switcher">
          <span>Switch User:</span>
          <div className="switcher-btns">
            <button
              onClick={() => setUserId('u1')}
              className={userId === 'u1' ? 'active' : ''}
            >u1</button>
            <button
              onClick={() => setUserId('u2')}
              className={userId === 'u2' ? 'active' : ''}
            >u2</button>
          </div>
        </div>
      </div>

      {showFeedback && (
        <FeedbackModal onClose={() => setShowFeedback(false)} />
      )}

      {toast && <div className="toast">{toast}</div>}
    </aside>
  )
}

export default Sidebar