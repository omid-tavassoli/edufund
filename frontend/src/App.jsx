import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Landing from './pages/Landing'
import Step1 from './pages/onboarding/Step1'
import Step2 from './pages/onboarding/Step2'
import Step3 from './pages/onboarding/Step3'
import Dashboard from './pages/Dashboard'
import Assistant from './pages/Assistant'
import AutoBewerbung from './pages/AutoBewerbung'
import Profile from './pages/Profile'
import Layout from './components/Layout'

function RequireProfile({ children }) {
  const profile = localStorage.getItem('ff_profile')
  if (!profile) return <Navigate to="/" replace />
  return children
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-bg-primary">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/onboarding/1" element={<Step1 />} />
          <Route path="/onboarding/2" element={<Step2 />} />
          <Route path="/onboarding/3" element={<Step3 />} />
          <Route
            path="/app"
            element={
              <RequireProfile>
                <Layout />
              </RequireProfile>
            }
          >
            <Route index element={<Navigate to="foerderungen" replace />} />
            <Route path="foerderungen" element={<Dashboard />} />
            <Route path="assistent" element={<Assistant />} />
            <Route path="fristen" element={<AutoBewerbung />} />
            <Route path="profil" element={<Profile />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
