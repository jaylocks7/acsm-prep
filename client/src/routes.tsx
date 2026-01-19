import { Routes, Route } from 'react-router-dom'
import AnalyzePage from './AnalyzePage'
import HistoryPage from './HistoryPage'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AnalyzePage />} />
      <Route path="/history" element={<HistoryPage />} />
    </Routes>
  )
}

export default AppRoutes
