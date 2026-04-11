import { Link, useParams } from 'react-router-dom'
import ProductCard from '../../components/common/ProductCard'
import { mockProducts } from '../../constants/mockProducts'
import { formatCurrency } from '../../utils/currency'

function ProductDetailPage() {
  const { productId } = useParams()
  const product = mockProducts.find((item) => item.id === productId)

  if (!product) {
    return (
      <section className="surface-section">
        <h2>Product not found</h2>
        <p>The item may have moved or is no longer available.</p>
        <Link className="button button-primary" to="/products">
          Back to products
        </Link>
      </section>
    )
  }

  const relatedProducts = mockProducts
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, 2)

  return (
    <div className="page-stack">
      <section className="surface-section product-detail-grid reveal-up">
        <div className="product-gallery">
          <img src={product.image} alt={product.name} className="detail-main-image" />
          <div className="detail-thumbs">
            <img src={product.image} alt={`${product.name} view 1`} />
            <img src={product.image} alt={`${product.name} view 2`} />
            <img src={product.image} alt={`${product.name} view 3`} />
          </div>
        </div>

        <div className="product-meta">
          <p className="eyebrow">{product.category}</p>
          <h2>{product.name}</h2>
          <p className="muted">{product.description}</p>

          <div className="product-price-row detail-price">
            <strong>{formatCurrency(product.price)}</strong>
            <span>{formatCurrency(product.originalPrice)}</span>
          </div>

          <p className="muted">
            Rated {product.rating}/5 by {product.reviews} verified customers
          </p>

          <div className="option-row">
            <h3>Colors</h3>
            <div className="chip-row">
              {product.colors.map((color) => (
                <span key={color} className="chip">
                  {color}
                </span>
              ))}
            </div>
          </div>

          <div className="option-row">
            <h3>Size</h3>
            <div className="chip-row">
              {product.sizes.map((size, index) => (
                <button
                  className={`chip-button ${index === 1 ? 'chip-button-active' : ''}`}
                  key={size}
                  type="button"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="option-row">
            <h3>Highlights</h3>
            <ul className="detail-specs">
              {product.specs.map((spec) => (
                <li key={spec}>{spec}</li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="purchase-panel">
          <p className="eyebrow">Quick order</p>
          <h3>Add to cart</h3>
          <p className="muted">Usually delivered in 2-4 business days.</p>

          <div className="qty-control">
            <button type="button">-</button>
            <span>1</span>
            <button type="button">+</button>
          </div>

          <button className="button button-primary button-block" type="button">
            Add to cart
          </button>
          <button className="button button-ghost button-block" type="button">
            Buy now
          </button>
          <p className="muted small-text">SKU: {product.id}</p>
        </aside>
      </section>

      <section className="surface-section reveal-up delay-1">
        <div className="section-head">
          <h2>Related products</h2>
          <Link to="/products">See more</Link>
        </div>
        <div className="product-grid two-col">
          {relatedProducts.map((item) => (
            <ProductCard key={item.id} product={item} compact />
          ))}
        </div>
      </section>
    </div>
  )
}

export default ProductDetailPage
