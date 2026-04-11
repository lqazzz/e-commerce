import { Link } from 'react-router-dom'
import { mockProducts } from '../../constants/mockProducts'
import { useCart } from '../../context/CartContext'
import { formatCurrency } from '../../utils/currency'

function CartPage() {
  const { items, updateQuantity, removeFromCart } = useCart()

  const cartLines = items
    .map((line) => {
      const product = mockProducts.find((item) => item.id === line.productId)

      if (!product) {
        return null
      }

      return {
        ...line,
        product,
        lineTotal: product.price * line.quantity,
      }
    })
    .filter(Boolean)

  const totalItems = cartLines.reduce((sum, line) => sum + line.quantity, 0)
  const subtotal = cartLines.reduce((sum, line) => sum + line.lineTotal, 0)
  const shipping = subtotal > 180 ? 0 : 12
  const tax = Math.round(subtotal * 0.08)
  const total = subtotal + shipping + tax

  return (
    <div className="cart-layout page-stack">
      <section className="surface-section reveal-up">
        <div className="section-head">
          <div>
            <h2>Your cart</h2>
            <p className="muted">{totalItems} items ready for checkout</p>
          </div>
          <Link to="/products">Continue shopping</Link>
        </div>

        {cartLines.length > 0 ? (
          <div className="cart-lines">
            {cartLines.map((line) => (
              <article className="cart-line" key={line.product.id}>
                <img src={line.product.image} alt={line.product.name} />

                <div>
                  <p className="eyebrow">{line.product.category}</p>
                  <h3>{line.product.name}</h3>
                  <p className="muted">{line.product.description}</p>
                  <button
                    className="cart-line-remove"
                    type="button"
                    onClick={() => removeFromCart(line.product.id)}
                  >
                    Remove
                  </button>
                </div>

                <div className="qty-control">
                  <button
                    type="button"
                    onClick={() => updateQuantity(line.product.id, line.quantity - 1)}
                  >
                    -
                  </button>
                  <span>{line.quantity}</span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(line.product.id, line.quantity + 1)}
                  >
                    +
                  </button>
                </div>

                <strong>{formatCurrency(line.lineTotal)}</strong>
              </article>
            ))}
          </div>
        ) : (
          <div className="cart-empty">
            <h3>Your cart is empty</h3>
            <p className="muted">Add products to your cart so you can checkout later.</p>
            <Link className="button button-primary" to="/products">
              Browse products
            </Link>
          </div>
        )}
      </section>

      <aside className="surface-section reveal-up delay-1">
        <h2>Order summary</h2>

        <label className="coupon-field" htmlFor="coupon-code">
          <span className="muted">Promo code</span>
          <div>
            <input id="coupon-code" placeholder="Enter code" />
            <button className="button button-ghost" type="button">
              Apply
            </button>
          </div>
        </label>

        <dl className="summary-list">
          <div>
            <dt>Subtotal</dt>
            <dd>{formatCurrency(subtotal)}</dd>
          </div>
          <div>
            <dt>Shipping</dt>
            <dd>{shipping === 0 ? 'Free' : formatCurrency(shipping)}</dd>
          </div>
          <div>
            <dt>Estimated tax</dt>
            <dd>{formatCurrency(tax)}</dd>
          </div>
          <div className="summary-total">
            <dt>Total</dt>
            <dd>{formatCurrency(total)}</dd>
          </div>
        </dl>

        {cartLines.length > 0 ? (
          <Link className="button button-primary button-block" to="/checkout">
            Proceed to checkout
          </Link>
        ) : (
          <button className="button button-primary button-block" type="button" disabled>
            Proceed to checkout
          </button>
        )}
      </aside>
    </div>
  )
}

export default CartPage
