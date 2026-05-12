import { ArrowLeft, Star, X } from 'lucide-react'
import { useState } from 'react'
import './FeedbackModal.css'

const FeedbackModal = ({ onClose }) => {
  const [rating, setRating] = useState(0)
  const [hovered, setHovered] = useState(0)
  const [text, setText] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const activeRating = hovered || rating
  const feedbackTypeLabel = rating > 0 ? (rating <= 3 ? 'Negative feedback' : 'Positive feedback') : ''

  const handleSubmit = () => {
    if (rating === 0) return
    const feedback = {
      id: Date.now(),
      title: 'My First Call',
      rating,
      text,
      type: rating <= 3 ? 'negative' : 'positive',
      date: new Date().toISOString(),
    }
    const existing = JSON.parse(localStorage.getItem('hintro_feedback') || '[]')
    localStorage.setItem('hintro_feedback', JSON.stringify([feedback, ...existing]))
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="modal-overlay">
        <div className="feedback-modal feedback-modal-success">
          <button className="modal-close" onClick={onClose} aria-label="Close feedback">
            <X size={22} strokeWidth={2.2} />
          </button>
          <div className="success-screen">
            <div className="success-star">
              <Star size={38} fill="#ffc400" color="#ffc400" strokeWidth={1.5} />
            </div>
            <h3>Thank you for your feedback!!</h3>
            <p>
              {feedbackTypeLabel} recorded successfully. Our team reviews every suggestion to improve AI responses,
              workflows, and overall experience.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="modal-overlay">
      <div className={`feedback-modal ${rating > 0 ? 'feedback-modal-filled' : ''}`}>
        <h3 className="modal-title">Give Feedback</h3>
        <p className="modal-subtitle">Describe your experience using Hintro...</p>

        <div className="star-rating" aria-label="Rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              type="button"
              key={star}
              className={`star ${star <= activeRating ? 'filled' : ''}`}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(0)}
              aria-label={`${star} star rating`}
            >
              <Star size={39} fill="currentColor" strokeWidth={0} />
            </button>
          ))}
        </div>

        {rating > 0 && (
          <>
            <p className="feedback-type-note">{feedbackTypeLabel} — {rating <= 3 ? '3 stars or less' : 'more than 3 stars'}</p>
            <div className="feedback-form">
              <label htmlFor="feedback-text">
                {rating <= 3
                  ? 'What frustrated you or felt confusing?'
                  : 'What did you like the most?'}
              </label>
              <textarea
                id="feedback-text"
                value={text}
                onChange={(event) => setText(event.target.value)}
                rows={4}
              />
            </div>
          </>
        )}

        <div className="modal-actions">
          <button className="back-btn" onClick={onClose}>
            <ArrowLeft size={20} strokeWidth={2.1} />
            Back
          </button>
          <button
            className="submit-btn"
            onClick={handleSubmit}
            disabled={rating === 0 || text.trim().length === 0}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

export default FeedbackModal
