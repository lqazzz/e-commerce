const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    },
    ...options,
  })

  let data = null

  try {
    data = await response.json()
  } catch {
    data = null
  }

  if (!response.ok) {
    const message = data?.message
    throw new Error(Array.isArray(message) ? message.join(', ') : message || 'Request failed')
  }

  return data
}

function normalizeProduct(rawProduct) {
  const id = String(rawProduct.id)
  const price = Number(rawProduct.price ?? 0)
  const originalPrice =
    rawProduct.originalPrice == null ? Number((price * 1.18).toFixed(2)) : Number(rawProduct.originalPrice)

  const ratingSeed = Number(rawProduct.id) || 1

  return {
    id,
    name: rawProduct.name,
    category: rawProduct.category,
    price,
    originalPrice,
    image: rawProduct.image,
    description: rawProduct.description,
    inStock: Boolean(rawProduct.inStock),
    badge: rawProduct.inStock ? 'In Stock' : 'Sold Out',
    rating: Number((4 + (ratingSeed % 10) * 0.08).toFixed(1)),
    reviews: 40 + ratingSeed * 7,
    colors: ['Standard'],
    sizes: ['One size'],
    specs: ['Curated by admin', 'Newly added item', 'Fast dispatch available'],
    createdAt: rawProduct.createdAt,
    updatedAt: rawProduct.updatedAt,
  }
}

export async function getPublicProducts() {
  const data = await request('/products', { method: 'GET' })

  if (!Array.isArray(data)) {
    return []
  }

  return data.map(normalizeProduct)
}

export async function getPublicProductById(productId) {
  const data = await request(`/products/${productId}`, { method: 'GET' })
  return normalizeProduct(data)
}
