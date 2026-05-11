import { useState } from 'react'
import './FeedbackModal.css'

const FeedbackModal = ({ onClose }) => {
  const [rating, setRating] = useState(0)
  const [hovered, setHovered] = useState(0)
  const [text, setText] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (rating === 0) return
    const feedback = {
      id: Date.now(),
      rating,
      text,
      type: rating <= 3 ? 'negative' : 'positive',
      date: new Date().toISOString()
    }
    const existing = JSON.parse(localStorage.getItem('hintro_feedback') || '[]')
    localStorage.setItem('hintro_feedback', JSON.stringify([feedback, ...existing]))
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="modal-overlay">
        <div className="modal">
          <button className="modal-close" onClick={onClose}>✕</button>
          <div className="success-screen">
            <div className="success-star">⭐</div>
            <h3>Thank you for your feedback!!</h3>
            <p>Our team reviews every suggestion to improve AI responses, workflows, and overall experience.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3 className="modal-title">Give Feedback</h3>
        <p className="modal-subtitle">Describe your experience using Hintro...</p>

        <div className="star-rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star ${star <= (hovered || rating) ? 'filled' : ''}`}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(0)}
            >★</span>
          ))}
        </div>

        {rating > 0 && (
          <div className="feedback-form">
            <label>
              {rating <= 3
                ? 'What frustrated you or felt confusing?'
                : 'What did you like the most?'}
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write your feedback here..."
              rows={4}
            />
          </div>
        )}

        <div className="modal-actions">
          <button className="back-btn" onClick={onClose}>← Back</button>
          <button
            className="submit-btn"
            onClick={handleSubmit}
            disabled={rating === 0}
          >Submit</button>
        </div>
      </div>
    </div>
  )
}

export default FeedbackModal