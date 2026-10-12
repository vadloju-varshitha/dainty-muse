import React, { useState } from 'react'
import { SeoHead } from '../../components/ui/SeoHead'
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase, isSupabaseConfigured } from '../../lib/supabase'
import { DEMO_PRODUCTS } from '../../data/mockData'
import { formatPrice, slugify } from '../../lib/utils'
import { Badge } from '../../components/ui/Badge'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import type { Product, Category } from '../../types'
import toast from 'react-hot-toast'

const EMPTY_PRODUCT: Omit<Product, 'id' | 'created_at' | 'updated_at'> = {
  name: '',
  slug: '',
  description: '',
  price: 0,
  images: [''],
  category: 'rings',
  tags: [],
  material: '',
  finish: 'Anti-tarnish coated',
  stock: 0,
  is_featured: false,
  is_active: true,
}

const CATEGORIES: Category[] = ['rings', 'necklaces', 'earrings', 'bracelets', 'anklets', 'sets']

async function fetchAdminProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured || !supabase) return DEMO_PRODUCTS

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as Product[]
}

export default function AdminProducts() {
  const qc = useQueryClient()
  const { data: products = [] } = useQuery({
    queryKey: ['admin-products'],
    queryFn: fetchAdminProducts,
  })

  const [showForm, setShowForm] = useState(false)
  const [editProduct, setEditProduct] = useState<Product | null>(null)
  const [form, setForm] = useState(EMPTY_PRODUCT)

  const upsertMutation = useMutation({
    mutationFn: async (product: typeof EMPTY_PRODUCT & { id?: string }) => {
      if (!isSupabaseConfigured || !supabase) {
        toast.error('Supabase not configured — cannot save in demo mode')
        throw new Error('Not configured')
      }
      const payload = { ...product, slug: slugify(product.name) }
      if (product.id) {
        const { error } = await supabase.from('products').update(payload).eq('id', product.id)
        if (error) throw error
      } else {
        const { error } = await supabase.from('products').insert([payload])
        if (error) throw error
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-products'] })
      qc.invalidateQueries({ queryKey: ['products'] })
      toast.success('Product saved')
      setShowForm(false)
      setEditProduct(null)
      setForm(EMPTY_PRODUCT)
    },
    onError: (err: Error) => toast.error(err.message),
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      if (!isSupabaseConfigured || !supabase) {
        toast.error('Supabase not configured — cannot delete in demo mode')
        throw new Error('Not configured')
      }
      const { error } = await supabase.from('products').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-products'] })
      qc.invalidateQueries({ queryKey: ['products'] })
      toast.success('Product deleted')
    },
    onError: () => toast.error('Failed to delete product'),
  })

  const openEdit = (p: Product) => {
    setEditProduct(p)
    setForm({
      name: p.name,
      slug: p.slug,
      description: p.description,
      price: p.price,
      images: p.images,
      category: p.category,
      tags: p.tags,
      material: p.material,
      finish: p.finish,
      stock: p.stock,
      is_featured: p.is_featured,
      is_active: p.is_active,
    })
    setShowForm(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    upsertMutation.mutate(editProduct ? { ...form, id: editProduct.id } : form)
  }

  return (
    <>
      <SeoHead title="Products — Admin" noindex />

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-serif text-warmBrown-600">Products</h2>
        <Button
          size="sm"
          onClick={() => {
            setEditProduct(null)
            setForm(EMPTY_PRODUCT)
            setShowForm(true)
          }}
        >
          <Plus size={14} /> Add Product
        </Button>
      </div>

      {/* Product form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 overflow-y-auto py-8 px-4">
          <div className="bg-white w-full max-w-2xl p-6 shadow-xl relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              aria-label="Close form"
            >
              <X size={20} />
            </button>
            <h3 className="text-lg font-serif text-warmBrown-600 mb-6">
              {editProduct ? 'Edit Product' : 'New Product'}
            </h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Name"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                required
                className="sm:col-span-2"
              />
              <div className="sm:col-span-2 flex flex-col gap-1">
                <label className="text-xs font-sans uppercase tracking-widest text-warmBrown-400">
                  Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  className="w-full bg-ivory-100 border border-champagne-200 text-warmBrown-700 text-sm font-sans px-4 py-2.5 outline-none focus:border-champagne-gold min-h-[80px] resize-vertical"
                  required
                />
              </div>
              <Input
                label="Price (₹)"
                type="number"
                value={form.price / 100}
                onChange={(e) =>
                  setForm((f) => ({ ...f, price: Math.round(parseFloat(e.target.value) * 100) }))
                }
                min={0}
                step={1}
                required
              />
              <Input
                label="Stock"
                type="number"
                value={form.stock}
                onChange={(e) => setForm((f) => ({ ...f, stock: parseInt(e.target.value) }))}
                min={0}
                required
              />
              <div className="flex flex-col gap-1">
                <label className="text-xs font-sans uppercase tracking-widest text-warmBrown-400">
                  Category
                </label>
                <select
                  value={form.category}
                  onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as Category }))}
                  className="bg-ivory-100 border border-champagne-200 text-warmBrown-700 text-sm font-sans px-4 py-2.5 outline-none focus:border-champagne-gold"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <Input
                label="Material"
                value={form.material}
                onChange={(e) => setForm((f) => ({ ...f, material: e.target.value }))}
              />
              <Input
                label="Image URL"
                value={form.images[0]}
                onChange={(e) => setForm((f) => ({ ...f, images: [e.target.value] }))}
                className="sm:col-span-2"
              />
              <Input
                label="Tags (comma-separated)"
                value={form.tags.join(', ')}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    tags: e.target.value.split(',').map((t) => t.trim()).filter(Boolean),
                  }))
                }
                className="sm:col-span-2"
              />
              <div className="flex items-center gap-4 sm:col-span-2">
                <label className="flex items-center gap-2 text-sm font-sans text-warmBrown-500 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.is_featured}
                    onChange={(e) => setForm((f) => ({ ...f, is_featured: e.target.checked }))}
                    className="accent-champagne-gold"
                  />
                  Featured
                </label>
                <label className="flex items-center gap-2 text-sm font-sans text-warmBrown-500 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.is_active}
                    onChange={(e) => setForm((f) => ({ ...f, is_active: e.target.checked }))}
                    className="accent-champagne-gold"
                  />
                  Active
                </label>
              </div>
              <div className="sm:col-span-2 flex justify-end gap-3 pt-2">
                <Button type="button" variant="secondary" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
                <Button type="submit" loading={upsertMutation.isPending}>
                  <Check size={14} /> Save Product
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Products table */}
      <div className="bg-white border border-gray-100 rounded overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-sans">
            <thead className="bg-gray-50">
              <tr>
                {['Product', 'Category', 'Price', 'Stock', 'Status', ''].map((h) => (
                  <th
                    key={h}
                    className="text-left py-3 px-4 text-xs uppercase tracking-widest text-gray-400 font-normal"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t border-gray-50 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-10 h-12 object-cover bg-champagne-50 flex-shrink-0"
                      />
                      <span className="text-gray-700 font-medium">{product.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-500 capitalize">{product.category}</td>
                  <td className="py-3 px-4 text-gray-700">{formatPrice(product.price)}</td>
                  <td className="py-3 px-4">
                    <Badge variant={product.stock === 0 ? 'red' : product.stock <= 5 ? 'brown' : 'green'}>
                      {product.stock}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant={product.is_active ? 'green' : 'gray'}>
                      {product.is_active ? 'Active' : 'Draft'}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2 justify-end">
                      <button
                        onClick={() => openEdit(product)}
                        className="p-1.5 text-gray-400 hover:text-champagne-gold transition-colors"
                        aria-label={`Edit ${product.name}`}
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete "${product.name}"?`)) {
                            deleteMutation.mutate(product.id)
                          }
                        }}
                        className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                        aria-label={`Delete ${product.name}`}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
