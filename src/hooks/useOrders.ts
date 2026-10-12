import { useMutation, useQuery } from '@tanstack/react-query'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import type { Order } from '../types'
import toast from 'react-hot-toast'

// ─── Admin: fetch all orders ──────────────────────────────────────────────────

async function fetchAllOrders(): Promise<Order[]> {
  if (!isSupabaseConfigured || !supabase) return []

  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as Order[]
}

export function useAllOrders() {
  return useQuery({
    queryKey: ['orders', 'all'],
    queryFn: fetchAllOrders,
    staleTime: 1000 * 30,
  })
}

// ─── Create order ─────────────────────────────────────────────────────────────

export function useCreateOrder() {
  return useMutation({
    mutationFn: async (
      order: Omit<Order, 'id' | 'created_at' | 'updated_at'>
    ): Promise<Order> => {
      if (!isSupabaseConfigured || !supabase) {
        // Demo mode: return a fake order
        const fakeOrder: Order = {
          ...order,
          id: `demo-order-${Date.now()}`,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
        return fakeOrder
      }

      const { data, error } = await supabase
        .from('orders')
        .insert([order])
        .select()
        .single()

      if (error) throw error
      return data as Order
    },
    onError: () => {
      toast.error('Failed to place order. Please try again.')
    },
  })
}

// ─── Update order status (admin) ──────────────────────────────────────────────

export function useUpdateOrderStatus() {
  return useMutation({
    mutationFn: async ({
      orderId,
      status,
    }: {
      orderId: string
      status: Order['status']
    }) => {
      if (!isSupabaseConfigured || !supabase) return

      const { error } = await supabase
        .from('orders')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', orderId)

      if (error) throw error
    },
    onSuccess: () => toast.success('Order status updated'),
    onError: () => toast.error('Failed to update order status'),
  })
}
