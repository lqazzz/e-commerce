import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function ProtectedRoute({ children, requireAdmin = false }) {
  const location = useLocation()
  const { isAuthenticated, isLoading, isAdmin } = useAuth()

  if (isLoading) {
    return (
      <section className="surface-section">
        <h2>Loading account</h2>
        <p>Please wait while we verify your session.</p>
      </section>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  if (requireAdmin && !isAdmin) {
    return (
      <section className="surface-section">
        <h2>Access denied</h2>
        <p>Only admin accounts can access this page.</p>
      </section>
    )
  }

  return children
}

export default ProtectedRoute
