import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const { totalItems } = useCart()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F5F5F0]/90 backdrop-blur border-b border-black/10">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to={user?.role === 'admin' ? '/admin' : '/about'} className="font-display text-xl font-bold tracking-tight">
          THE Store
        </Link>

        <div className="flex items-center gap-6">
          {user?.role === 'member' && (
            <>
              <Link to="/about" className="text-sm font-medium hover:opacity-60 transition-opacity">About</Link>
              <Link to="/products" className="text-sm font-medium hover:opacity-60 transition-opacity">Products</Link>
              <Link to="/cart" className="relative text-sm font-medium hover:opacity-60 transition-opacity">
                Cart
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-3 bg-primary text-accent text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {totalItems}
                  </span>
                )}
              </Link>
            </>
          )}
          {user?.role === 'admin' && (
            <Link to="/admin" className="text-sm font-medium hover:opacity-60 transition-opacity">Admin Panel</Link>
          )}
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted">{user?.username}</span>
            <button
              onClick={handleLogout}
              className="text-sm bg-primary text-surface px-4 py-1.5 rounded-full hover:bg-primary/80 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
