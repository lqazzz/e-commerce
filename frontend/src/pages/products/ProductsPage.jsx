import ProductCard from '../../components/common/ProductCard'
import { useProductsCatalog } from '../../hooks/useProductsCatalog'

function ProductsPage() {
  const { products, isLoading, error } = useProductsCatalog()
  const categories = ['All', ...new Set(products.map((item) => item.category))]

  return (
    <div className="products-layout page-stack">
      <section className="surface-section products-filter-panel reveal-up">
        <h2>Filter</h2>
        <p className="muted">Browse by category</p>

        <div className="filter-block">
          {categories.map((item) => (
            <label key={item} className="filter-row">
              <input type="checkbox" defaultChecked={item === 'All'} />
              <span>{item}</span>
            </label>
          ))}
        </div>

        <div className="filter-block">
          <p className="muted">Price range</p>
          <input type="range" min="30" max="180" defaultValue="160" />
        </div>
      </section>

      <section className="surface-section reveal-up delay-1">
        <div className="section-head">
          <div>
            <h2>Product list</h2>
            <p className="muted">{products.length} items found</p>
          </div>
          <div className="toolbar">
            <button className="button button-ghost" type="button">
              Newest
            </button>
            <button className="button button-ghost" type="button">
              Price low-high
            </button>
            <button className="button button-ghost" type="button">
              Top rated
            </button>
          </div>
        </div>

        {isLoading ? <p className="muted">Loading products...</p> : null}
        {error ? <p className="auth-error">{error}</p> : null}

        {!isLoading && !error ? (
          products.length > 0 ? (
            <div className="product-grid">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="muted">No products available yet.</p>
          )
        ) : null}
      </section>
    </div>
  )
}

export default ProductsPage
