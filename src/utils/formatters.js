export const formatDuration = (seconds) => {
  if (!seconds) return '0'
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  if (h > 0) return `${h}h ${m}m ${s}sec`
  if (m > 0) return `${m}m ${s}sec`
  return `${s}sec`
}

export const formatDate = (isoString) => {
  if (!isoString) return '—'
  return new Date(isoString).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric'
  })
}

export const formatLastSession = (lastSession) => {
  if (!lastSession || lastSession.length === 0) return '—'
  const diff = Date.now() - new Date(lastSession[0])
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  return `${days} days ago`
}