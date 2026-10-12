import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { SeoHead } from '../../components/ui/SeoHead'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { Logo } from '../../components/ui/Logo'
import { useAuth } from '../../hooks/useAuth'
import { isSupabaseConfigured } from '../../lib/supabase'
import toast from 'react-hot-toast'

export default function AdminLogin() {
  const { user, loading, signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (loading) return null
  if (user) return <Navigate to="/admin" replace />

  // Demo mode: if Supabase is not configured, show a warning
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isSupabaseConfigured) {
      toast.error('Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.')
      return
    }

    setSubmitting(true)
    try {
      await signIn(email, password)
      toast.success('Welcome back')
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Login failed'
      toast.error(msg)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <SeoHead title="Admin Login" noindex />
      <div className="min-h-screen bg-ivory-100 flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-10">
            <Logo size="lg" className="justify-center" />
            <p className="text-xs font-sans uppercase tracking-widest text-warmBrown-300 mt-3">
              Admin Dashboard
            </p>
          </div>

          {!isSupabaseConfigured && (
            <div className="bg-amber-50 border border-amber-200 text-amber-700 text-xs font-sans p-3 mb-6 leading-relaxed">
              Supabase is not configured. The admin dashboard requires Supabase Auth.
              Add credentials to your <code className="font-mono">.env</code> file to enable login.
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
            <Button
              type="submit"
              size="lg"
              fullWidth
              loading={submitting}
              disabled={!isSupabaseConfigured}
              className="mt-2"
            >
              Sign In
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
