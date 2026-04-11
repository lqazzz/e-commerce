import { Link } from 'react-router-dom'
import { formatCurrency } from '../../utils/currency'
import { useCart } from '../../context/CartContext'

function ProductCard({ product, compact = false }) {
  const { addToCart, getQuantity } = useCart()
  const currentQty = getQuantity(product.id)
  const badge = product.badge || (product.inStock ? 'In Stock' : 'Sold Out')
  const hasDiscount = Number(product.originalPrice) > Number(product.price)
  const rating = product.rating ?? 4.5
  const reviews = product.reviews ?? 0

  return (
    <article className={`product-card ${compact ? 'product-card-compact' : ''}`}>
      <div className="product-media-wrap">
        <img className="product-media" src={product.image} alt={product.name} />
        <span className="product-badge">{badge}</span>
      </div>

      <div className="product-body">
        <p className="product-category">{product.category}</p>
        <h3>{product.name}</h3>
        <p className="product-description">{product.description}</p>

        <div className="product-price-row">
          <strong>{formatCurrency(product.price)}</strong>
          {hasDiscount ? <span>{formatCurrency(product.originalPrice)}</span> : null}
        </div>

        <div className="product-rating-row">
          <span>{rating} / 5</span>
          <span>{reviews} reviews</span>
        </div>

        <div className="product-actions">
          <button
            className="button button-primary"
            type="button"
            onClick={() => addToCart(product.id, 1)}
          >
            Add to cart
          </button>
          <Link className="button button-secondary" to={`/products/${product.id}`}>
            View details
          </Link>
        </div>

        {currentQty > 0 ? (
          <p className="small-text muted">In cart: {currentQty}</p>
        ) : null}
      </div>
    </article>
  )
}

export default ProductCard
