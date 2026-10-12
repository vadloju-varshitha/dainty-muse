import { useState, useEffect } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { SeoHead } from '../components/ui/SeoHead'
import { PageSpinner } from '../components/ui/Spinner'
import { DEMO_POLICIES } from '../data/mockData'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { formatDate } from '../lib/utils'
import type { StorePolicy } from '../types'

export default function Policy() {
  const { slug } = useParams<{ slug: string }>()
  const [policy, setPolicy] = useState<StorePolicy | null | undefined>(undefined)

  useEffect(() => {
    if (!slug) return

    if (!isSupabaseConfigured || !supabase) {
      const found = DEMO_POLICIES.find((p) => p.slug === slug)
      setPolicy(found ?? null)
      return
    }

    supabase
      .from('store_policies')
      .select('*')
      .eq('slug', slug)
      .single()
      .then(({ data }) => setPolicy((data as StorePolicy) ?? null))
  }, [slug])

  if (policy === undefined) return <PageSpinner />
  if (policy === null) return <Navigate to="/" replace />

  // Simple markdown-style rendering for headings and paragraphs
  const renderContent = (content: string) => {
    const lines = content.split('\n')
    return lines.map((line, i) => {
      if (line.startsWith('## ')) {
        return (
          <h2 key={i} className="font-serif text-2xl text-warmBrown-600 mt-8 mb-3">
            {line.replace('## ', '')}
          </h2>
        )
      }
      if (line.startsWith('**') && line.endsWith('**')) {
        return (
          <p key={i} className="font-sans font-medium text-warmBrown-600 mt-4 mb-1">
            {line.replace(/\*\*/g, '')}
          </p>
        )
      }
      if (line.startsWith('- ')) {
        return (
          <li key={i} className="text-sm font-sans text-warmBrown-400 ml-4 leading-relaxed">
            {line.replace('- ', '')}
          </li>
        )
      }
      if (line.trim() === '') return <br key={i} />
      return (
        <p key={i} className="text-sm font-sans text-warmBrown-400 leading-relaxed">
          {line}
        </p>
      )
    })
  }

  return (
    <>
      <SeoHead title={policy.title} noindex />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-12">
          <p className="text-xs font-sans uppercase tracking-ultra text-champagne-gold mb-2">
            Legal
          </p>
          <h1 className="font-serif text-4xl text-warmBrown-600">{policy.title}</h1>
          <p className="text-xs font-sans text-warmBrown-300 mt-3">
            Last updated: {formatDate(policy.updated_at)}
          </p>
        </div>

        <article className="flex flex-col gap-2">{renderContent(policy.content)}</article>
      </div>
    </>
  )
}
