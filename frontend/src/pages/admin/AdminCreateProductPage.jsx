import { useState } from 'react'
import { createAdminProduct } from '../../services/authApi'
import { useAuth } from '../../context/AuthContext'

function AdminCreateProductPage() {
  const { token } = useAuth()

  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [originalPrice, setOriginalPrice] = useState('')
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')
  const [inStock, setInStock] = useState(true)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const resetForm = () => {
    setName('')
    setCategory('')
    setPrice('')
    setOriginalPrice('')
    setImage('')
    setDescription('')
    setInStock(true)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSuccessMessage('')

    const payload = {
      name: name.trim(),
      category: category.trim(),
      price: Number(price),
      description: description.trim(),
      image: image.trim(),
      inStock,
    }

    if (originalPrice.trim() !== '') {
      payload.originalPrice = Number(originalPrice)
    }

    setIsSubmitting(true)

    try {
      const createdProduct = await createAdminProduct(token, payload)
      setSuccessMessage(`Created product #${createdProduct.id} successfully.`)
      resetForm()
    } catch (submitError) {
      setError(submitError.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="surface-section admin-create-product-page reveal-up">
      <p className="eyebrow">Admin panel</p>
      <h2>Create product</h2>
      <p className="muted">Add a new item so it can be sold in the store.</p>

      <form className="admin-form" onSubmit={handleSubmit}>
        <label>
          Product name
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Urban Commuter Backpack"
            required
          />
        </label>

        <label>
          Category
          <input
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            placeholder="Accessories"
            required
          />
        </label>

        <div className="admin-form-grid">
          <label>
            Price
            <input
              type="number"
              min="0"
              step="0.01"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              placeholder="99"
              required
            />
          </label>

          <label>
            Original price (optional)
            <input
              type="number"
              min="0"
              step="0.01"
              value={originalPrice}
              onChange={(event) => setOriginalPrice(event.target.value)}
              placeholder="129"
            />
          </label>
        </div>

        <label>
          Image URL
          <input
            type="url"
            value={image}
            onChange={(event) => setImage(event.target.value)}
            placeholder="https://images.unsplash.com/..."
            required
          />
        </label>

        <label>
          Description
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Write a short product description"
            rows={4}
            required
          />
        </label>

        <label className="filter-row">
          <input
            type="checkbox"
            checked={inStock}
            onChange={(event) => setInStock(event.target.checked)}
          />
          <span>In stock</span>
        </label>

        {error ? <p className="auth-error">{error}</p> : null}
        {successMessage ? <p className="profile-success">{successMessage}</p> : null}

        <button className="button button-primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating...' : 'Create product'}
        </button>
      </form>
    </section>
  )
}

export default AdminCreateProductPage
