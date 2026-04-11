import { Link } from 'react-router-dom'
import ProductCard from '../../components/common/ProductCard'
import { useProductsCatalog } from '../../hooks/useProductsCatalog'

const trustSignals = [
  { title: '48h dispatch', text: 'Orders before 3pm ship same business day.' },
  { title: 'Easy returns', text: 'Return or exchange in 30 days with one click.' },
  { title: 'Curated quality', text: 'Every item tested by our internal team.' },
]

function HomePage() {
  const { products, isLoading, error } = useProductsCatalog()
  const featuredProducts = products.slice(0, 4)

  return (
    <div className="page-stack">
      <section className="home-hero">
        <div className="home-hero-content reveal-up">
          <p className="eyebrow">Spring 2026 collection</p>
          <h2>Everyday essentials with premium durability</h2>
          <p>
            Build your setup with apparel, footwear, and accessories designed for
            long city days and short weekend escapes.
          </p>
          <div className="action-row">
            <Link className="button button-primary" to="/products">
              Shop collection
            </Link>
            <Link className="button button-ghost" to="/cart">
              Review cart
            </Link>
          </div>
        </div>

        <div className="home-hero-panel reveal-up delay-1">
          <p className="eyebrow">This week highlights</p>
          <ul>
            <li>
              20% off selected outerwear with code <strong>URBAN20</strong>
            </li>
            <li>Free shipping for every order over $180</li>
            <li>New arrivals drop every Friday at 10:00 AM</li>
          </ul>
        </div>
      </section>

      <section className="surface-section reveal-up delay-2">
        <div className="section-head">
          <h2>Featured picks</h2>
          <Link to="/products">See all products</Link>
        </div>
        {isLoading ? <p className="muted">Loading products...</p> : null}
        {error ? <p className="auth-error">{error}</p> : null}
        {!isLoading && !error ? (
          <div className="product-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} compact />
            ))}
          </div>
        ) : null}
      </section>

      <section className="surface-section reveal-up delay-3">
        <div className="section-head">
          <h2>Why customers come back</h2>
        </div>
        <div className="signal-grid">
          {trustSignals.map((item) => (
            <article key={item.title} className="signal-card">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default HomePage
