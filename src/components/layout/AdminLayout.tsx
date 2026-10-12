import { useState } from 'react'
import { Outlet, Link, useLocation, Navigate } from 'react-router-dom'
import { LayoutDashboard, Package, ShoppingCart, FileText, LogOut, Menu, X } from 'lucide-react'
import { Logo } from '../ui/Logo'
import { useAuth } from '../../hooks/useAuth'
import { PageSpinner } from '../ui/Spinner'

const NAV = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Products', href: '/admin/products', icon: Package },
  { label: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { label: 'Policies', href: '/admin/policies', icon: FileText },
]

export function AdminLayout() {
  const { user, loading, signOut } = useAuth()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (loading) return <PageSpinner />
  if (!user) return <Navigate to="/admin/login" replace />

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-warmBrown-700 text-ivory-100 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Admin sidebar"
      >
        <div className="p-6 border-b border-warmBrown-600">
          <Logo size="sm" />
          <p className="text-xs font-sans uppercase tracking-widest text-warmBrown-300 mt-1">
            Admin
          </p>
        </div>

        <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
          {NAV.map(({ label, href, icon: Icon }) => {
            const active =
              href === '/admin'
                ? location.pathname === '/admin'
                : location.pathname.startsWith(href)
            return (
              <Link
                key={href}
                to={href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 text-sm font-sans rounded transition-colors ${
                  active
                    ? 'bg-champagne-gold/20 text-champagne-200'
                    : 'text-warmBrown-300 hover:bg-warmBrown-600 hover:text-ivory-100'
                }`}
                aria-current={active ? 'page' : undefined}
              >
                <Icon size={16} />
                {label}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-warmBrown-600">
          <p className="text-xs font-sans text-warmBrown-400 mb-3 truncate">{user.email}</p>
          <button
            onClick={signOut}
            className="flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-warmBrown-300 hover:text-red-300 transition-colors"
          >
            <LogOut size={14} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Main */}
      <div className="flex-1 lg:ml-64 flex flex-col">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3 lg:px-8 sticky top-0 z-30">
          <button
            className="lg:hidden p-1.5 text-gray-500 hover:text-gray-700"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <h1 className="text-sm font-sans text-gray-600 font-medium">
            {NAV.find((n) =>
              n.href === '/admin'
                ? location.pathname === '/admin'
                : location.pathname.startsWith(n.href)
            )?.label ?? 'Admin'}
          </h1>
          <Link
            to="/"
            className="ml-auto text-xs font-sans text-gray-400 hover:text-champagne-gold transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Store ↗
          </Link>
        </header>

        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
