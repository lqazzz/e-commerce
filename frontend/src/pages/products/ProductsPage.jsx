import ProductCard from '../../components/common/ProductCard'
import { mockProducts } from '../../constants/mockProducts'

const categories = ['All', ...new Set(mockProducts.map((item) => item.category))]

function ProductsPage() {
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
            <p className="muted">{mockProducts.length} items found</p>
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

        <div className="product-grid">
          {mockProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default ProductsPage
