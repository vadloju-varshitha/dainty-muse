import { useState } from 'react'
import { SeoHead } from '../../components/ui/SeoHead'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useAllOrders, useUpdateOrderStatus } from '../../hooks/useOrders'
import { formatPrice, formatDate } from '../../lib/utils'
import { Badge } from '../../components/ui/Badge'
import type { OrderStatus } from '../../types'

const STATUS_OPTIONS: OrderStatus[] = [
  'pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded',
]

const STATUS_BADGE: Record<OrderStatus, 'gold' | 'green' | 'brown' | 'red' | 'gray'> = {
  pending: 'gold',
  confirmed: 'green',
  processing: 'brown',
  shipped: 'brown',
  delivered: 'green',
  cancelled: 'red',
  refunded: 'gray',
}

export default function AdminOrders() {
  const { data: orders = [], isLoading } = useAllOrders()
  const updateStatus = useUpdateOrderStatus()
  const [expandedId, setExpandedId] = useState<string | null>(null)

  return (
    <>
      <SeoHead title="Orders — Admin" noindex />

      <h2 className="text-lg font-serif text-warmBrown-600 mb-6">
        Orders ({orders.length})
      </h2>

      {orders.length === 0 && !isLoading && (
        <div className="bg-white border border-gray-100 rounded p-10 text-center">
          <p className="text-sm font-sans text-gray-400">No orders yet.</p>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {orders.map((order) => (
          <div key={order.id} className="bg-white border border-gray-100 rounded overflow-hidden">
            {/* Order header row */}
            <button
              className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-gray-50 transition-colors"
              onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}
              aria-expanded={expandedId === order.id}
            >
              <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm font-sans">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest mb-0.5">Order</p>
                  <p className="text-gray-700 font-mono text-xs">{order.id.slice(0, 10)}…</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest mb-0.5">Customer</p>
                  <p className="text-gray-700">{order.customer_name}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest mb-0.5">Total</p>
                  <p className="text-gray-700">{formatPrice(order.total)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest mb-0.5">Status</p>
                  <Badge variant={STATUS_BADGE[order.status]}>{order.status}</Badge>
                </div>
              </div>
              {expandedId === order.id ? (
                <ChevronUp size={16} className="text-gray-400 flex-shrink-0" />
              ) : (
                <ChevronDown size={16} className="text-gray-400 flex-shrink-0" />
              )}
            </button>

            {/* Expanded details */}
            {expandedId === order.id && (
              <div className="border-t border-gray-100 px-5 py-5 flex flex-col gap-6">
                {/* Items */}
                <div>
                  <p className="text-xs font-sans uppercase tracking-widest text-gray-400 mb-3">Items</p>
                  <div className="flex flex-col gap-2">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm font-sans">
                        <img
                          src={item.product_image}
                          alt={item.product_name}
                          className="w-10 h-12 object-cover bg-champagne-50"
                        />
                        <div className="flex-1">
                          <p className="text-gray-700">{item.product_name}</p>
                          <p className="text-gray-400 text-xs">
                            {item.quantity} × {formatPrice(item.price)}
                          </p>
                        </div>
                        <p className="text-gray-700">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Customer details */}
                  <div>
                    <p className="text-xs font-sans uppercase tracking-widest text-gray-400 mb-2">Customer</p>
                    <p className="text-sm font-sans text-gray-700">{order.customer_name}</p>
                    <p className="text-sm font-sans text-gray-500">{order.customer_email}</p>
                    <p className="text-sm font-sans text-gray-500">{order.customer_phone}</p>
                    <p className="text-xs font-sans text-gray-400 mt-1">
                      Placed: {formatDate(order.created_at)}
                    </p>
                  </div>

                  {/* Shipping */}
                  <div>
                    <p className="text-xs font-sans uppercase tracking-widest text-gray-400 mb-2">Shipping Address</p>
                    <p className="text-sm font-sans text-gray-700">
                      {order.shipping_address.line1}
                      {order.shipping_address.line2 && `, ${order.shipping_address.line2}`}
                    </p>
                    <p className="text-sm font-sans text-gray-700">
                      {order.shipping_address.city}, {order.shipping_address.state} — {order.shipping_address.pincode}
                    </p>
                    <p className="text-sm font-sans text-gray-500">{order.shipping_address.country}</p>
                  </div>
                </div>

                {/* Status updater */}
                <div className="flex items-center gap-4 pt-2 border-t border-gray-100">
                  <p className="text-xs font-sans uppercase tracking-widest text-gray-400">
                    Update Status
                  </p>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateStatus.mutate({
                        orderId: order.id,
                        status: e.target.value as OrderStatus,
                      })
                    }
                    className="border border-gray-200 text-sm font-sans text-gray-700 px-3 py-1.5 outline-none focus:border-champagne-gold rounded"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  )
}
