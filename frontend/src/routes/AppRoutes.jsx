import { Navigate, Route, Routes } from 'react-router-dom'
import MainLayout from '../components/layout/MainLayout'
import HomePage from '../pages/home/HomePage'
import ProductsPage from '../pages/products/ProductsPage'
import ProductDetailPage from '../pages/product-detail/ProductDetailPage'
import CartPage from '../pages/cart/CartPage'
import CheckoutPage from '../pages/checkout/CheckoutPage'
import LoginPage from '../pages/auth/LoginPage'
import ProfilePage from '../pages/profile/ProfilePage'

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/:productId" element={<ProductDetailPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default AppRoutes
