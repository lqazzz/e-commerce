import { Link } from 'react-router-dom'
import { formatCurrency } from '../../utils/currency'

function ProductCard({ product, compact = false }) {
  return (
    <article className={`product-card ${compact ? 'product-card-compact' : ''}`}>
      <div className="product-media-wrap">
        <img className="product-media" src={product.image} alt={product.name} />
        <span className="product-badge">{product.badge}</span>
      </div>

      <div className="product-body">
        <p className="product-category">{product.category}</p>
        <h3>{product.name}</h3>
        <p className="product-description">{product.description}</p>

        <div className="product-price-row">
          <strong>{formatCurrency(product.price)}</strong>
          <span>{formatCurrency(product.originalPrice)}</span>
        </div>

        <div className="product-rating-row">
          <span>{product.rating} / 5</span>
          <span>{product.reviews} reviews</span>
        </div>

        <Link className="button button-secondary" to={`/products/${product.id}`}>
          View details
        </Link>
      </div>
    </article>
  )
}

export default ProductCard
