import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  deleteAdminProduct,
  getAdminProductList,
  updateAdminProduct,
} from '../../services/authApi'
import { useAuth } from '../../context/AuthContext'
import { formatCurrency } from '../../utils/currency'

function AdminProductsPage() {
  const { token } = useAuth()
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeId, setActiveId] = useState(null)

  useEffect(() => {
    let isMounted = true

    const fetchProducts = async () => {
      try {
        const list = await getAdminProductList(token)

        if (isMounted) {
          setProducts(list)
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

    fetchProducts()

    return () => {
      isMounted = false
    }
  }, [token])

  const handleToggleStock = async (product) => {
    setActiveId(product.id)
    setError('')

    try {
      const updated = await updateAdminProduct(token, product.id, {
        inStock: !product.inStock,
      })

      setProducts((prev) => prev.map((item) => (item.id === updated.id ? updated : item)))
    } catch (toggleError) {
      setError(toggleError.message)
    } finally {
      setActiveId(null)
    }
  }

  const handleDeleteProduct = async (product) => {
    const isConfirmed = window.confirm(`Delete product \"${product.name}\"?`)

    if (!isConfirmed) {
      return
    }

    setActiveId(product.id)
    setError('')

    try {
      await deleteAdminProduct(token, product.id)
      setProducts((prev) => prev.filter((item) => item.id !== product.id))
    } catch (deleteError) {
      setError(deleteError.message)
    } finally {
      setActiveId(null)
    }
  }

  return (
    <section className="surface-section admin-products-page reveal-up">
      <p className="eyebrow">Admin panel</p>
      <h2>Manage product list</h2>
      <p className="muted">Track inventory and update stock status for products.</p>

      <div className="action-row">
        <Link className="button button-primary" to="/admin/products/create">
          Add new product
        </Link>
      </div>

      {isLoading ? <p className="muted">Loading products...</p> : null}
      {error ? <p className="auth-error">{error}</p> : null}

      {!isLoading && !error ? (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>#{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>{formatCurrency(product.price)}</td>
                  <td>
                    <span className={product.inStock ? 'stock-badge stock-badge-on' : 'stock-badge'}>
                      {product.inStock ? 'In stock' : 'Out of stock'}
                    </span>
                  </td>
                  <td>{new Date(product.updatedAt).toLocaleString()}</td>
                  <td>
                    <div className="admin-actions">
                      <button
                        className="button button-ghost button-sm"
                        type="button"
                        onClick={() => handleToggleStock(product)}
                        disabled={activeId === product.id}
                      >
                        {product.inStock ? 'Mark out' : 'Mark in'}
                      </button>
                      <button
                        className="button button-danger button-sm"
                        type="button"
                        onClick={() => handleDeleteProduct(product)}
                        disabled={activeId === product.id}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </section>
  )
}

export default AdminProductsPage
