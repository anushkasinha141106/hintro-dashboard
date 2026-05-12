import { CalendarDays, MoreVertical } from 'lucide-react'
import PageHeader from '../components/Layout/PageHeader'
import { useUser } from '../context/UserContext'
import useFetch from '../hooks/useFetch'
import useToast from '../hooks/useToast'
import { formatDuration, formatLastSession, formatDate } from '../utils/formatters'
import './Dashboard.css'

const STAT_ITEMS = [
  {
    label: 'Total Sessions',
    key: 'totalSessions',
    icon: 'totalsessionslogo.svg',
  },
  {
    label: 'Average Duration',
    key: 'averageDuration',
    icon: 'averagedurationlogo.svg',
  },
  {
    label: 'AI Used',
    key: 'totalAIInteractions',
    icon: 'aiusedlogo.svg',
  },
  {
    label: 'Last Session',
    key: 'lastSession',
    icon: 'LastSessionlogo.svg',
  },
]

const StatCard = ({ item, value }) => {
  return (
    <div className="stat-card">
      <img className="stat-icon" src={`/assets/dashboard/${item.icon}`} alt="" />
      <div className="stat-copy">
        <span className="stat-label">{item.label}</span>
        <strong className="stat-value">{value}</strong>
      </div>
    </div>
  )
}

const getStatValue = (item, statsData, loading) => {
  if (loading) return '...'
  if (item.key === 'averageDuration') return formatDuration(statsData?.averageDuration)
  if (item.key === 'totalAIInteractions') return `${statsData?.totalAIInteractions ?? 0} times`
  if (item.key === 'lastSession') return formatLastSession(statsData?.lastSession)
  return statsData?.totalSessions ?? 0
}

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

  const sessions = sessionsData?.callSessions ?? []
  const firstName = profileData?.firstName || profileData?.name || '{{Name}}'

  const groupedSessions = sessions.reduce((groups, session) => {
    const date = formatDate(session.started_at)
    if (!groups[date]) groups[date] = []
    groups[date].push(session)
    return groups
  }, {})

  return (
    <div className="page-shell dashboard">
      <PageHeader title="Dashboard" />

      <section className="dashboard-content">
        <div className="welcome-section">
          <div>
            <h2>Hi, {firstName} <span aria-hidden="true">👋</span> Welcome to Hintro</h2>
            <p>Ready to make your next call smarter ?</p>
          </div>
          <button
            className="start-call-btn"
            onClick={() => showToast('Starting a new call...')}
          >
            Start New Call
          </button>
        </div>

        <div className="stats-grid">
          {STAT_ITEMS.map((item) => (
            <StatCard
              key={item.label}
              item={item}
              value={getStatValue(item, statsData, statsLoading)}
            />
          ))}
        </div>

        <section className="recent-calls">
          <h3>Recent calls</h3>

          {sessionsLoading && <p className="loading-text">Loading...</p>}

          {!sessionsLoading && sessions.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">
                <CalendarDays size={22} strokeWidth={2.2} />
              </div>
              <p className="empty-title">No Recent Calls</p>
              <p className="empty-sub">
                Connect your Google Calendar to see upcoming meetings,
                get reminders, and join calls directly from Hintro.
              </p>
              <button
                className="empty-call-btn"
                onClick={() => showToast('Starting a new call...')}
              >
                Start a Call
              </button>
            </div>
          )}

          {!sessionsLoading && sessions.length > 0 && (
            <div className="call-list">
              {Object.entries(groupedSessions).map(([date, dateSessions]) => (
                <div key={date} className="date-group">
                  <p className="date-label">{date}</p>
                  {dateSessions.map((session) => (
                    <div key={session._id || session.id} className="call-row">
                      <div className="call-avatar">
                        {(session.client || session.title || 'K')[0]}
                      </div>
                      <div className="call-info">
                        <p className="call-name">{session.description || session.title || 'Design Call'}</p>
                        <div className="participant-stack">
                          {(session.participants?.length ? session.participants : [{ name: 'A' }, { name: 'B' }, { name: 'C' }])
                            .slice(0, 3)
                            .map((participant, index) => (
                              <span key={`${participant.name}-${index}`} className="participant-avatar">
                                <img src="/assets/dashboard/profilepicutre.png" alt="" />
                              </span>
                            ))}
                        </div>
                      </div>
                      <div className="call-meta">
                        <span>
                          {new Date(session.started_at).toLocaleTimeString('en-US', {
                            hour: 'numeric',
                            minute: '2-digit',
                            hour12: true,
                          }).toLowerCase()}
                        </span>
                        <button className="call-menu" aria-label="Call menu">
                          <MoreVertical size={19} strokeWidth={3} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </section>
      </section>

      {toast && <div className="toast">{toast}</div>}
    </div>
  )
}

export default Dashboard
