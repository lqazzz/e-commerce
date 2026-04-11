import { useState } from 'react'
import { Link } from 'react-router-dom'
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

    const formData = new FormData(event.currentTarget)
    const formName = String(formData.get('name') ?? '').trim()
    const formCategory = String(formData.get('category') ?? '').trim()
    const formPrice = String(formData.get('price') ?? '').trim()
    const formOriginalPrice = String(formData.get('originalPrice') ?? '').trim()
    const formImage = String(formData.get('image') ?? '').trim()
    const formDescription = String(formData.get('description') ?? '').trim()
    const formInStock = formData.get('inStock') === 'on'

    const payload = {
      name: formName,
      productName: formName,
      category: formCategory,
      categoryName: formCategory,
      price: formPrice,
      description: formDescription,
      image: formImage,
      inStock: formInStock,
    }

    if (formOriginalPrice !== '') {
      payload.originalPrice = formOriginalPrice
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

      <div className="action-row">
        <Link className="button button-ghost" to="/admin/products">
          Back to product list
        </Link>
      </div>

      <form className="admin-form" onSubmit={handleSubmit}>
        <label>
          Product name
          <input
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Urban Commuter Backpack"
            required
          />
        </label>

        <label>
          Category
          <input
            name="category"
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
              name="price"
              type="text"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              placeholder="99"
              required
            />
          </label>

          <label>
            Original price (optional)
            <input
              name="originalPrice"
              type="text"
              value={originalPrice}
              onChange={(event) => setOriginalPrice(event.target.value)}
              placeholder="129"
            />
          </label>
        </div>

        <label>
          Image URL
          <input
            name="image"
            type="text"
            value={image}
            onChange={(event) => setImage(event.target.value)}
            placeholder="Image URL or any image path"
          />
        </label>

        <label>
          Description
          <textarea
            name="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Write a short product description"
            rows={4}
          />
        </label>

        <label className="filter-row">
          <input
            name="inStock"
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
