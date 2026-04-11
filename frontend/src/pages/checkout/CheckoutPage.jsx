import { Link, useNavigate } from 'react-router-dom'
import { mockProducts } from '../../constants/mockProducts'
import { useCart } from '../../context/CartContext'
import { formatCurrency } from '../../utils/currency'

function CheckoutPage() {
  const navigate = useNavigate()
  const { items, clearCart } = useCart()

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

  const subtotal = cartLines.reduce((sum, line) => sum + line.lineTotal, 0)
  const shipping = subtotal > 180 ? 0 : 12
  const tax = Math.round(subtotal * 0.08)
  const total = subtotal + shipping + tax

  const handleCompletePurchase = () => {
    if (cartLines.length === 0) {
      return
    }

    window.alert('Mua hang thanh cong!')
    clearCart()
    navigate('/products')
  }

  return (
    <div className="checkout-layout page-stack">
      <section className="surface-section reveal-up">
        <h2>Checkout</h2>
        <p className="muted">
          Confirm your cart and place order. This demo will only show a success popup.
        </p>

        {cartLines.length > 0 ? (
          <div className="checkout-list">
            {cartLines.map((line) => (
              <article className="checkout-line" key={line.product.id}>
                <div>
                  <h3>{line.product.name}</h3>
                  <p className="muted">Qty: {line.quantity}</p>
                </div>
                <strong>{formatCurrency(line.lineTotal)}</strong>
              </article>
            ))}
          </div>
        ) : (
          <div className="checkout-empty">
            <h3>No items to checkout</h3>
            <p className="muted">Your cart is currently empty.</p>
            <Link className="button button-primary" to="/products">
              Shop now
            </Link>
          </div>
        )}
      </section>

      <aside className="surface-section reveal-up delay-1">
        <h2>Payment summary</h2>
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
            <dt>Tax</dt>
            <dd>{formatCurrency(tax)}</dd>
          </div>
          <div className="summary-total">
            <dt>Total</dt>
            <dd>{formatCurrency(total)}</dd>
          </div>
        </dl>

        <button
          className="button button-primary button-block"
          type="button"
          onClick={handleCompletePurchase}
          disabled={cartLines.length === 0}
        >
          Complete purchase
        </button>
      </aside>
    </div>
  )
}

export default CheckoutPage
