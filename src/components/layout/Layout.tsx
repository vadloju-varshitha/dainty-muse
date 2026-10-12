import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-ivory-100">
      <Navbar />
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#FFFFF0',
            color: '#6B4F3A',
            border: '1px solid #F7E7CE',
            fontFamily: 'Jost, sans-serif',
            fontSize: '13px',
            letterSpacing: '0.02em',
          },
          success: {
            iconTheme: { primary: '#C9A96E', secondary: '#FFFFF0' },
          },
        }}
      />
    </div>
  )
}
