import { useParams } from 'react-router-dom'

function ProductDetailPage() {
  const { productId } = useParams()

  return (
    <section>
      <h2>Product Detail</h2>
      <p>Current product id: {productId}</p>
    </section>
  )
}

export default ProductDetailPage
