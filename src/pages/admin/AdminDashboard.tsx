import { SeoHead } from '../../components/ui/SeoHead'
import { Package, ShoppingCart, TrendingUp, AlertCircle } from 'lucide-react'
import { useProducts } from '../../hooks/useProducts'
import { useAllOrders } from '../../hooks/useOrders'
import { formatPrice } from '../../lib/utils'
import { isSupabaseConfigured } from '../../lib/supabase'
import { Badge } from '../../components/ui/Badge'

export default function AdminDashboard() {
  const { data: products = [] } = useProducts()
  const { data: orders = [] } = useAllOrders()

  const totalRevenue = orders
    .filter((o) => o.status === 'confirmed' || o.status === 'delivered')
    .reduce((sum, o) => sum + o.total, 0)

  const pendingOrders = orders.filter((o) => o.status === 'pending').length
  const lowStockProducts = products.filter((p) => p.stock > 0 && p.stock <= 5)

  const STATS = [
    {
      label: 'Total Products',
      value: products.length,
      icon: Package,
      sub: `${products.filter((p) => p.is_active).length} active`,
    },
    {
      label: 'Total Orders',
      value: orders.length,
      icon: ShoppingCart,
      sub: `${pendingOrders} pending`,
    },
    {
      label: 'Revenue',
      value: formatPrice(totalRevenue),
      icon: TrendingUp,
      sub: 'Confirmed + delivered',
    },
  ]

  return (
    <>
      <SeoHead title="Admin Dashboard" noindex />

      {!isSupabaseConfigured && (
        <div className="bg-amber-50 border border-amber-200 text-amber-700 text-xs font-sans p-3 mb-6 rounded flex gap-2">
          <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
          <span>
            Supabase is not configured — showing demo data. Set <code className="font-mono">VITE_SUPABASE_URL</code> and <code className="font-mono">VITE_SUPABASE_ANON_KEY</code> in your <code className="font-mono">.env</code> file.
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        {STATS.map(({ label, value, icon: Icon, sub }) => (
          <div key={label} className="bg-white p-6 border border-gray-100 rounded">
            <div className="flex items-start justify-between mb-3">
              <p className="text-xs font-sans uppercase tracking-widest text-gray-400">{label}</p>
              <Icon size={18} className="text-champagne-gold" />
            </div>
            <p className="text-2xl font-serif text-warmBrown-600">{value}</p>
            <p className="text-xs font-sans text-gray-400 mt-1">{sub}</p>
          </div>
        ))}
      </div>

      {/* Low stock warning */}
      {lowStockProducts.length > 0 && (
        <div className="bg-white border border-gray-100 rounded p-6 mb-8">
          <h2 className="text-sm font-sans font-medium text-gray-700 mb-4 flex items-center gap-2">
            <AlertCircle size={16} className="text-amber-500" />
            Low Stock Alert
          </h2>
          <div className="flex flex-col gap-2">
            {lowStockProducts.map((p) => (
              <div key={p.id} className="flex items-center justify-between text-sm font-sans">
                <span className="text-gray-600">{p.name}</span>
                <Badge variant="brown">{p.stock} left</Badge>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent orders */}
      <div className="bg-white border border-gray-100 rounded p-6">
        <h2 className="text-sm font-sans font-medium text-gray-700 mb-4">Recent Orders</h2>
        {orders.length === 0 ? (
          <p className="text-xs font-sans text-gray-400">No orders yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-sans">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-2 text-xs uppercase tracking-widest text-gray-400 font-normal pr-4">
                    Order ID
                  </th>
                  <th className="text-left py-2 text-xs uppercase tracking-widest text-gray-400 font-normal pr-4">
                    Customer
                  </th>
                  <th className="text-left py-2 text-xs uppercase tracking-widest text-gray-400 font-normal pr-4">
                    Total
                  </th>
                  <th className="text-left py-2 text-xs uppercase tracking-widest text-gray-400 font-normal">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 10).map((order) => (
                  <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-2 pr-4 text-gray-500 font-mono text-xs">
                      {order.id.slice(0, 8)}…
                    </td>
                    <td className="py-2 pr-4 text-gray-700">{order.customer_name}</td>
                    <td className="py-2 pr-4 text-gray-700">{formatPrice(order.total)}</td>
                    <td className="py-2">
                      <Badge
                        variant={
                          order.status === 'delivered'
                            ? 'green'
                            : order.status === 'cancelled'
                            ? 'red'
                            : 'gold'
                        }
                      >
                        {order.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  )
}
