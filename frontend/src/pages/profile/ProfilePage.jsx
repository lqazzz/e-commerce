import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function ProfilePage() {
  const navigate = useNavigate()
  const { customer, logout, refreshProfile } = useAuth()
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)

    try {
      await refreshProfile()
    } finally {
      setIsRefreshing(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="page-stack">
      <section className="surface-section profile-panel">
        <p className="eyebrow">Customer dashboard</p>
        <h2>Welcome back, {customer?.fullName}</h2>
        <p className="muted">Manage account details and continue your shopping journey.</p>

        <dl className="profile-info-grid">
          <div>
            <dt>Email</dt>
            <dd>{customer?.email}</dd>
          </div>
          <div>
            <dt>Customer ID</dt>
            <dd>#{customer?.id}</dd>
          </div>
          <div>
            <dt>Created</dt>
            <dd>{customer?.createdAt ? new Date(customer.createdAt).toLocaleString() : '-'}</dd>
          </div>
          <div>
            <dt>Last updated</dt>
            <dd>{customer?.updatedAt ? new Date(customer.updatedAt).toLocaleString() : '-'}</dd>
          </div>
        </dl>

        <div className="action-row">
          <button className="button button-ghost" type="button" onClick={handleRefresh}>
            {isRefreshing ? 'Refreshing...' : 'Refresh profile'}
          </button>
          <Link className="button button-primary" to="/checkout">
            Continue to checkout
          </Link>
          <button className="button button-danger" type="button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </section>
    </div>
  )
}

export default ProfilePage
