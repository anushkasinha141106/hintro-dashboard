import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Dashboard from './pages/Dashboard'
import FeedbackHistory from './pages/FeedbackHistory'
import ComingSoon from './pages/ComingSoon'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="feedback-history" element={<FeedbackHistory />} />
          <Route path="call-insights" element={<ComingSoon pageName="Call Insights" />} />
          <Route path="knowledge-base" element={<ComingSoon pageName="Knowledge Base" />} />
          <Route path="prompts" element={<ComingSoon pageName="Prompts" />} />
          <Route path="boxy-controls" element={<ComingSoon pageName="Boxy Controls" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App