import './LogoutModal.css'

const LogoutModal = ({ onCancel, onLogout }) => {
  return (
    <div className="modal-overlay">
      <div className="logout-modal">
        <h2>Leaving already?</h2>
        <p>You can log back in anytime to continue your meetings with Hintro.</p>
        <div className="logout-actions">
          <button type="button" className="logout-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button type="button" className="logout-confirm" onClick={onLogout}>
            Log out
          </button>
        </div>
      </div>
    </div>
  )
}

export default LogoutModal
