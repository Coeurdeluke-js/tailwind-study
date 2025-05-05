import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import InitiateDashboard from './components/dashboard/InitiateDashboard';
import AuthHandler from './components/auth/AuthHandler';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ErrorBoundary from './components/shared/ErrorBoundary';

// Componente para rutas protegidas
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div>Cargando...</div>;
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

function App() {
  return (
    <AuthProvider>
      <ErrorBoundary>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/auth/callback" element={<AuthHandler />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <InitiateDashboard />
                </ProtectedRoute>
              } 
            />
            {/* Ruta para manejar el hash con el token */}
            <Route path="/#access_token=*" element={<AuthHandler />} />
          </Routes>
        </Router>
      </ErrorBoundary>
    </AuthProvider>
  );
}

export default App;
