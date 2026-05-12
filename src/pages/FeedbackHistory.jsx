import { useState } from 'react'
import PageHeader from '../components/Layout/PageHeader'
import './FeedbackHistory.css'

const TABLE_HEADINGS = ['Title', 'Type', 'Rating', 'Description', 'Date', 'Time']

const getOrdinal = (day) => {
  if (day > 3 && day < 21) return 'th'
  return ['th', 'st', 'nd', 'rd'][day % 10] || 'th'
}

const formatFeedbackDate = (isoString) => {
  const date = new Date(isoString)
  const day = date.getDate()
  return `${day}${getOrdinal(day)} ${date.toLocaleDateString('en-GB', {
    month: 'long',
    year: 'numeric',
  })}`
}

const formatFeedbackTime = (isoString) => (
  new Date(isoString)
    .toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
    .toLowerCase()
)

const FeedbackHistory = () => {
  const [feedbacks] = useState(() => {
    const saved = JSON.parse(localStorage.getItem('hintro_feedback') || '[]')
    return saved
  })

  return (
    <div className="page-shell feedback-history">
      <PageHeader title="Feedback History" />

      <main className="fh-content">
        <p className="fh-subtitle">Browse your previous feedback submissions</p>

        {feedbacks.length === 0 ? (
          <div className="fh-empty-table">
            <p>No feedback submissions yet.</p>
          </div>
        ) : (
          <div className="fh-table" role="table">
            <div className="fh-table-head" role="row">
              {TABLE_HEADINGS.map((heading) => (
                <span key={heading} role="columnheader">{heading}</span>
              ))}
            </div>
            {feedbacks.map((feedback) => (
              <div key={feedback.id} className="fh-table-row" role="row">
                <span>{feedback.title || 'My First Call'}</span>
                <span>{feedback.type ? feedback.type.charAt(0).toUpperCase() + feedback.type.slice(1) : (feedback.rating <= 3 ? 'Negative' : 'Positive')}</span>
                <span>{feedback.rating}/5</span>
                <span>- {feedback.text ? `${feedback.text.slice(0, 22)}${feedback.text.length > 22 ? '...' : ''}` : 'No details...'}</span>
                <span>{formatFeedbackDate(feedback.date)}</span>
                <span>{formatFeedbackTime(feedback.date)}</span>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default FeedbackHistory
