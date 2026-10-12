import { useState, useEffect } from 'react'
import { SeoHead } from '../../components/ui/SeoHead'
import { Save } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '../../lib/supabase'
import { DEMO_POLICIES } from '../../data/mockData'
import { formatDate } from '../../lib/utils'
import type { StorePolicy } from '../../types'
import toast from 'react-hot-toast'
import { Button } from '../../components/ui/Button'

export default function AdminPolicies() {
  const [policies, setPolicies] = useState<StorePolicy[]>([])
  const [selected, setSelected] = useState<StorePolicy | null>(null)
  const [content, setContent] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setPolicies(DEMO_POLICIES)
      return
    }
    supabase
      .from('store_policies')
      .select('*')
      .order('title')
      .then(({ data }) => {
        if (data) setPolicies(data as StorePolicy[])
      })
  }, [])

  const handleSelect = (policy: StorePolicy) => {
    setSelected(policy)
    setContent(policy.content)
  }

  const handleSave = async () => {
    if (!selected) return

    if (!isSupabaseConfigured || !supabase) {
      toast.error('Supabase not configured — cannot save in demo mode')
      return
    }

    setSaving(true)
    try {
      const { error } = await supabase
        .from('store_policies')
        .update({ content, updated_at: new Date().toISOString() })
        .eq('id', selected.id)

      if (error) throw error
      setPolicies((p) =>
        p.map((pol) => (pol.id === selected.id ? { ...pol, content } : pol))
      )
      setSelected((s) => (s ? { ...s, content } : s))
      toast.success('Policy saved')
    } catch {
      toast.error('Failed to save policy')
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <SeoHead title="Policies — Admin" noindex />

      <h2 className="text-lg font-serif text-warmBrown-600 mb-6">Store Policies</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Policy list */}
        <div className="bg-white border border-gray-100 rounded overflow-hidden lg:col-span-1">
          {policies.map((p) => (
            <button
              key={p.id}
              onClick={() => handleSelect(p)}
              className={`w-full text-left px-4 py-3 border-b border-gray-50 last:border-b-0 text-sm font-sans transition-colors ${
                selected?.id === p.id
                  ? 'bg-champagne-50 text-champagne-dark'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <p className="font-medium">{p.title}</p>
              <p className="text-xs text-gray-400 mt-0.5">Updated: {formatDate(p.updated_at)}</p>
            </button>
          ))}
        </div>

        {/* Editor */}
        <div className="lg:col-span-2">
          {selected ? (
            <div className="bg-white border border-gray-100 rounded p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-serif text-warmBrown-600">{selected.title}</h3>
                <Button size="sm" onClick={handleSave} loading={saving}>
                  <Save size={13} /> Save
                </Button>
              </div>
              <p className="text-xs font-sans text-gray-400 mb-3">
                Supports basic markdown: ## Heading, **Bold**, - list item
              </p>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full border border-gray-200 text-sm font-sans text-gray-700 px-4 py-3 outline-none focus:border-champagne-gold font-mono min-h-[400px] resize-y"
                aria-label="Policy content editor"
              />
            </div>
          ) : (
            <div className="bg-white border border-gray-100 rounded p-10 text-center">
              <p className="text-sm font-sans text-gray-400">Select a policy to edit.</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
