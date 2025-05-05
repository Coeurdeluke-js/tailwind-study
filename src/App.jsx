import React, { useState } from 'react'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import ErrorBoundary from './components/shared/ErrorBoundary'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import InitiateDashboard from './components/dashboard/InitiateDashboard'

function PrivateRoute({ children }) {
  const { user } = useAuth()
  return user ? children : <Navigate to="/" />
}

function App() {
  const [isLogin, setIsLogin] = useState(true)
  
  const handleSwitchMode = () => {
    setIsLogin(!isLogin)
  }
  
  return (
    <AuthProvider>
      <Router>
        <ErrorBoundary>
          <div className="min-h-screen bg-dark">
            <Routes>
              <Route path="/" element={
                <div className="container mx-auto px-4 py-8">
                  <div className="max-w-md mx-auto bg-dark rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-sith/20">
                    {isLogin ? 
                      <Login onSwitchMode={handleSwitchMode} /> : 
                      <Register onSwitchMode={handleSwitchMode} />
                    }
                  </div>
                </div>
              } />
              <Route path="/dashboard" element={
                <PrivateRoute>
                  <InitiateDashboard />
                </PrivateRoute>
              } />
            </Routes>
          </div>
        </ErrorBoundary>
      </Router>
    </AuthProvider>
  )
}

export default App
