import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HelmetProvider } from 'react-helmet-async'
import { Layout } from './components/layout/Layout'
import { AdminLayout } from './components/layout/AdminLayout'
import { PageSpinner } from './components/ui/Spinner'

// Lazy-loaded pages for code splitting
const Home = lazy(() => import('./pages/Home'))
const Products = lazy(() => import('./pages/Products'))
const Category = lazy(() => import('./pages/Category'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const Cart = lazy(() => import('./pages/Cart'))
const Wishlist = lazy(() => import('./pages/Wishlist'))
const Checkout = lazy(() => import('./pages/Checkout'))
const OrderConfirmation = lazy(() => import('./pages/OrderConfirmation'))
const Policy = lazy(() => import('./pages/Policy'))
const NotFound = lazy(() => import('./pages/NotFound'))

// Admin pages
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'))
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))
const AdminProducts = lazy(() => import('./pages/admin/AdminProducts'))
const AdminOrders = lazy(() => import('./pages/admin/AdminOrders'))
const AdminPolicies = lazy(() => import('./pages/admin/AdminPolicies'))

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 5,
    },
  },
})

export default function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Suspense fallback={<PageSpinner />}>
            <Routes>
              {/* Store routes */}
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:slug" element={<ProductDetail />} />
                <Route path="/category/:slug" element={<Category />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-confirmation" element={<OrderConfirmation />} />
                <Route path="/policies/:slug" element={<Policy />} />
                <Route path="*" element={<NotFound />} />
              </Route>

              {/* Admin routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route element={<AdminLayout />}>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/products" element={<AdminProducts />} />
                <Route path="/admin/orders" element={<AdminOrders />} />
                <Route path="/admin/policies" element={<AdminPolicies />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </QueryClientProvider>
    </HelmetProvider>
  )
}
