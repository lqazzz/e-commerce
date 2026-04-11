import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CART_STORAGE_KEY = 'ecommerce_cart'

const CartContext = createContext(null)

function readCartStorage() {
  const raw = localStorage.getItem(CART_STORAGE_KEY)

  if (!raw) {
    return []
  }

  try {
    const parsed = JSON.parse(raw)

    if (!Array.isArray(parsed)) {
      return []
    }

    return parsed.filter(
      (item) =>
        typeof item?.productId === 'string' &&
        Number.isFinite(item?.quantity) &&
        item.quantity > 0,
    )
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => readCartStorage())

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const addToCart = (productId, quantity = 1) => {
    const normalizedQty = Math.max(1, Math.floor(quantity))

    setItems((prevItems) => {
      const existing = prevItems.find((item) => item.productId === productId)

      if (!existing) {
        return [...prevItems, { productId, quantity: normalizedQty }]
      }

      return prevItems.map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + normalizedQty }
          : item,
      )
    })
  }

  const updateQuantity = (productId, quantity) => {
    const normalizedQty = Math.max(0, Math.floor(quantity))

    setItems((prevItems) => {
      if (normalizedQty === 0) {
        return prevItems.filter((item) => item.productId !== productId)
      }

      return prevItems.map((item) =>
        item.productId === productId ? { ...item, quantity: normalizedQty } : item,
      )
    })
  }

  const removeFromCart = (productId) => {
    setItems((prevItems) => prevItems.filter((item) => item.productId !== productId))
  }

  const clearCart = () => {
    setItems([])
  }

  const getQuantity = (productId) =>
    items.find((item) => item.productId === productId)?.quantity ?? 0

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)

  const value = useMemo(
    () => ({
      items,
      cartCount,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      getQuantity,
    }),
    [items, cartCount],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart must be used inside CartProvider')
  }

  return context
}
