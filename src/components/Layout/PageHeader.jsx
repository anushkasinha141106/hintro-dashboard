import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, ChevronDown, LogOut, Play } from 'lucide-react'
import { useUser } from '../../context/UserContext'
import LogoutModal from '../LogoutModal/LogoutModal'
import useToast from '../../hooks/useToast'

const PageHeader = ({ title }) => {
  const { userId, setUserId } = useUser()
  const { toast, showToast } = useToast()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [showLogout, setShowLogout] = useState(false)

  const switchUser = (nextUserId) => {
    setUserId(nextUserId)
    setMenuOpen(false)
  }

  return (
    <header className="page-header">
      <h1>{title}</h1>
      <div className="page-header-actions">
        <button className="watch-btn" onClick={() => showToast('Tutorial coming soon!')}>
          <Play size={16} />
          Watch Tutorial
        </button>

        <button
          type="button"
          className="profile-trigger"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Open profile menu"
        >
          {userId === 'u2' ? (
            <img
              className="profile-avatar profile-avatar-img"
              src="/assets/dashboard/profilepicutre.png"
              alt="Profile"
            />
          ) : (
            <>
              <span className="profile-avatar profile-avatar-empty" />
              <ChevronDown size={18} strokeWidth={1.8} />
            </>
          )}
        </button>

        {menuOpen && (
          <div className="profile-menu">
            <div className="profile-menu-label">Review state</div>
            {['u1', 'u2'].map((id) => (
              <button
                key={id}
                type="button"
                className={`profile-menu-row ${userId === id ? 'active' : ''}`}
                onClick={() => switchUser(id)}
              >
                {id === 'u1' ? 'Empty user' : 'Active user'}
                {userId === id && <Check size={14} />}
              </button>
            ))}
            <button
              type="button"
              className="profile-menu-row danger"
              onClick={() => {
                setMenuOpen(false)
                setShowLogout(true)
              }}
            >
              <LogOut size={15} />
              Log out
            </button>
          </div>
        )}
      </div>

      {showLogout && (
        <LogoutModal
          onCancel={() => setShowLogout(false)}
          onLogout={() => {
            setShowLogout(false)
            navigate('/login')
          }}
        />
      )}
      {toast && <div className="toast">{toast}</div>}
    </header>
  )
}

export default PageHeader
