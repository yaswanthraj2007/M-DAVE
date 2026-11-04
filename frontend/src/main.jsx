import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Generate from './pages/Generate.jsx'
import Detect from './pages/Detect.jsx'
import DashboardLayout from './components/dashboard/DashboardLayout.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Pages that live inside the dashboard shell */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/generate" element={<Generate />} />
        <Route path="/detect" element={<Detect />} />

        {/* Assets, Profile and Settings tabs (rendered by DashboardLayout itself) */}
        <Route path="/dashboard/:tab" element={<DashboardLayout />} />
        <Route path="/assets" element={<Navigate to="/dashboard/assets" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)