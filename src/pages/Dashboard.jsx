import { useUser } from '../context/UserContext'
import useFetch from '../hooks/useFetch'
import { formatDuration, formatLastSession, formatDate } from '../utils/formatters'
import { PieChart, Clock, Sparkles, CalendarDays } from 'lucide-react'
import useToast from '../hooks/useToast'
import './Dashboard.css'

const StatCard = ({ icon, label, value, iconBg, iconColor }) => (
  <div className="stat-card">
    <div className="stat-icon" style={{ backgroundColor: iconBg }}>
      {icon(iconColor)}
    </div>
    <div className="stat-info">
      <span className="stat-label">{label}</span>
      <span className="stat-value">{value}</span>
    </div>
  </div>
)

const Dashboard = () => {
  const { client, userId } = useUser()
  const { toast, showToast } = useToast()

  const { data: profileData } = useFetch(
    () => client.get('/api/auth/profile'),
    [userId]
  )

  const { data: statsData, loading: statsLoading } = useFetch(
    () => client.get('/api/call-sessions/stats'),
    [userId]
  )

  const { data: sessionsData, loading: sessionsLoading } = useFetch(
    () => client.get('/api/call-sessions?limit=10'),
    [userId]
  )

  const groupByDate = (sessions) => {
    const groups = {}
    sessions.forEach(session => {
      const date = formatDate(session.started_at)
      if (!groups[date]) groups[date] = []
      groups[date].push(session)
    })
    return groups
  }

  const stats = [
    {
      label: 'Total Sessions',
      value: statsLoading ? '...' : statsData?.totalSessions ?? 0,
      icon: (color) => <PieChart size={20} color={color} />,
      iconBg: '#fde8e8',
      iconColor: '#e05252'
    },
    {
      label: 'Average Duration',
      value: statsLoading ? '...' : formatDuration(statsData?.averageDuration),
      icon: (color) => <Clock size={20} color={color} />,
      iconBg: '#e0f4f4',
      iconColor: '#3a9ea5'
    },
    {
      label: 'AI Used',
      value: statsLoading ? '...' : `${statsData?.totalAIInteractions ?? 0} times`,
      icon: (color) => <Sparkles size={20} color={color} />,
      iconBg: '#e6f9e6',
      iconColor: '#3a9a3a'
    },
    {
      label: 'Last Session',
      value: statsLoading ? '...' : formatLastSession(statsData?.lastSession),
      icon: (color) => <CalendarDays size={20} color={color} />,
      iconBg: '#ede8fb',
      iconColor: '#7c52cc'
    }
  ]

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="header-right">
          <button
            className="watch-btn"
            onClick={() => showToast('Tutorial coming soon!')}
          >
            ▶ Watch Tutorial
          </button>
          <div className="avatar">
            {profileData?.firstName?.[0] || 'U'}
          </div>
        </div>
      </div>

      <div className="welcome-section">
        <div>
          <h2>Hi, {profileData?.firstName || '...'} 👋 Welcome to Hintro</h2>
          <p>Ready to make your next call smarter?</p>
        </div>
        <button
          className="start-call-btn"
          onClick={() => showToast('Starting a new call...')}
        >
          Start New Call
        </button>
      </div>

      <div className="stats-grid">
        {stats.map((stat) => (
          <StatCard
            key={stat.label}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
            iconBg={stat.iconBg}
            iconColor={stat.iconColor}
          />
        ))}
      </div>

      <div className="recent-calls">
        <h3>Recent calls</h3>

        {sessionsLoading && <p className="loading-text">Loading...</p>}

        {!sessionsLoading && sessionsData?.callSessions?.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">
              <CalendarDays size={40} color="#7c52cc" />
            </div>
            <p className="empty-title">No Recent Calls</p>
            <p className="empty-sub">
              Connect your Google Calendar to see your upcoming meetings
              and start calls directly from there.
            </p>
            <button
              className="start-call-btn"
              onClick={() => showToast('Starting a new call...')}
            >
              Start a Call
            </button>
          </div>
        )}

        {!sessionsLoading && sessionsData?.callSessions?.length > 0 && (
          Object.entries(groupByDate(sessionsData.callSessions)).map(([date, sessions]) => (
            <div key={date} className="date-group">
              <p className="date-label">{date}</p>
              {sessions.map(session => (
                <div key={session._id} className="call-row">
                  <div className="call-avatar">
                    {session.client?.[0] || 'K'}
                  </div>
                  <div className="call-info">
                    <p className="call-name">{session.description || 'Design Call'}</p>
                    <p className="call-participants">
                      {session.participants?.map(p => p.name).join(', ')}
                    </p>
                  </div>
                  <div className="call-meta">
                    <span className="call-time">
                      {new Date(session.started_at).toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true
                      })}
                    </span>
                    <button className="call-menu">⋮</button>
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
      </div>

      {toast && <div className="toast">{toast}</div>}
    </div>
  )
}

export default Dashboard