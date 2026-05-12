const getOrdinal = (day) => {
  if (day > 3 && day < 21) return 'th'
  return ['th', 'st', 'nd', 'rd'][day % 10] || 'th'
}

export const formatDuration = (seconds) => {
  if (!seconds) return '0'
  const roundedSeconds = Math.round(seconds)
  const hours = Math.floor(roundedSeconds / 3600)
  const minutes = Math.floor((roundedSeconds % 3600) / 60)
  const remainingSeconds = roundedSeconds % 60

  if (hours > 0) return `${hours}h ${minutes}m ${remainingSeconds}sec`
  if (minutes > 0) return `${minutes}m ${remainingSeconds}sec`
  return `${remainingSeconds}sec`
}

export const formatDate = (isoString) => {
  if (!isoString) return '-'
  const date = new Date(isoString)
  const day = date.getDate()
  const month = date.toLocaleDateString('en-US', { month: 'long' })
  return `${month} ${day}${getOrdinal(day)}`
}

export const formatLastSession = (lastSession) => {
  const sessionDate = Array.isArray(lastSession) ? lastSession[0] : lastSession
  if (!sessionDate) return '-'

  const diff = Date.now() - new Date(sessionDate).getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  if (days <= 0) return 'Today'
  if (days === 1) return 'Yesterday'
  return `${days} days ago`
}
