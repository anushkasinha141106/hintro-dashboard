import { useState, useEffect } from 'react'
import './FeedbackHistory.css'

const StarDisplay = ({ rating }) => (
  <div className="star-display">
    {[1, 2, 3, 4, 5].map((star) => (
      <span key={star} className={`star-small ${star <= rating ? 'filled' : ''}`}>★</span>
    ))}
  </div>
)

const FeedbackHistory = () => {
  const [feedbacks, setFeedbacks] = useState([])

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('hintro_feedback') || '[]')
    setFeedbacks(saved)
  }, [])

  const formatFeedbackDate = (isoString) => {
    return new Date(isoString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }) + ' · ' + new Date(isoString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  return (
    <div className="feedback-history">
      <div className="fh-header">
        <h1>Feedback History</h1>
        <p>Review your previous feedbacks.</p>
      </div>

      {feedbacks.length === 0 && (
        <div className="fh-empty">
          <div className="fh-empty-icon">💬</div>
          <p className="fh-empty-title">No feedback yet</p>
          <p className="fh-empty-sub">Your submitted feedbacks will appear here.</p>
        </div>
      )}

      <div className="fh-list">
        {feedbacks.map((fb) => (
          <div key={fb.id} className="fh-card">
            <div className="fh-card-top">
              <div>
                <p className="fh-card-title">
                  {fb.type === 'positive' ? 'Positive Feedback' : 'Negative Feedback'}
                </p>
                <p className="fh-card-date">{formatFeedbackDate(fb.date)}</p>
              </div>
              <StarDisplay rating={fb.rating} />
            </div>
            {fb.text && (
              <p className="fh-card-text">{fb.text}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default FeedbackHistory