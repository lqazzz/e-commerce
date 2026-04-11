import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function ProfilePage() {
  const navigate = useNavigate()
  const { customer, logout, refreshProfile, updateProfile } = useAuth()
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [fullName, setFullName] = useState(customer?.fullName ?? '')
  const [email, setEmail] = useState(customer?.email ?? '')
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')
  const [saveError, setSaveError] = useState('')

  useEffect(() => {
    setFullName(customer?.fullName ?? '')
    setEmail(customer?.email ?? '')
  }, [customer])

  const hasChanges = fullName.trim() !== (customer?.fullName ?? '') || email.trim() !== (customer?.email ?? '')

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

  const handleProfileSubmit = async (event) => {
    event.preventDefault()
    setSaveMessage('')
    setSaveError('')

    if (!hasChanges) {
      setSaveMessage('No changes to save.')
      return
    }

    setIsSaving(true)

    try {
      const updatedProfile = await updateProfile({
        fullName: fullName.trim(),
        email: email.trim(),
      })

      setFullName(updatedProfile.fullName)
      setEmail(updatedProfile.email)
      setSaveMessage('Profile updated successfully.')
    } catch (submitError) {
      setSaveError(submitError.message)
    } finally {
      setIsSaving(false)
    }
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

        <form className="profile-form" onSubmit={handleProfileSubmit}>
          <h3>Update account info</h3>

          <label>
            Full name
            <input
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              placeholder="Your full name"
              required
            />
          </label>

          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              required
            />
          </label>

          {saveError ? <p className="auth-error">{saveError}</p> : null}
          {saveMessage ? <p className="profile-success">{saveMessage}</p> : null}

          <button className="button button-secondary" type="submit" disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save changes'}
          </button>
        </form>

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
