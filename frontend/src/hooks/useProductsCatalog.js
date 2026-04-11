import { useEffect, useState } from 'react'
import { getPublicProducts } from '../services/productApi'

export function useProductsCatalog() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    const loadProducts = async () => {
      try {
        const list = await getPublicProducts()

        if (isMounted) {
          setProducts(list)
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError.message)
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadProducts()

    return () => {
      isMounted = false
    }
  }, [])

  return {
    products,
    isLoading,
    error,
  }
}
