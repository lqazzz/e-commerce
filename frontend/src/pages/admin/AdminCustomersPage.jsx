import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAdminCustomerList } from '../../services/authApi'
import { useAuth } from '../../context/AuthContext'

function AdminCustomersPage() {
  const { token } = useAuth()
  const [customers, setCustomers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    const fetchCustomers = async () => {
      if (!token) {
        setIsLoading(false)
        return
      }

      try {
        const list = await getAdminCustomerList(token)

        if (isMounted) {
          setCustomers(list)
        }
      } catch (fetchError) {
        if (isMounted) {
          setError(fetchError.message)
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchCustomers()

    return () => {
      isMounted = false
    }
  }, [token])

  return (
    <section className="surface-section admin-customers-page reveal-up">
      <p className="eyebrow">Admin panel</p>
      <h2>Customer list</h2>
      <p className="muted">View all registered customers for user management.</p>

      <div className="action-row">
        <Link className="button button-primary" to="/admin/products/create">
          Create product
        </Link>
      </div>

      {isLoading ? <p className="muted">Loading customers...</p> : null}
      {error ? <p className="auth-error">{error}</p> : null}

      {!isLoading && !error ? (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Full name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Created at</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td>#{customer.id}</td>
                  <td>{customer.fullName}</td>
                  <td>{customer.email}</td>
                  <td>{customer.role}</td>
                  <td>{new Date(customer.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </section>
  )
}

export default AdminCustomersPage
