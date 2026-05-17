import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (!username || !password) {
      setError('Username dan password wajib diisi.')
      return
    }
    const success = login(username, password)
    if (success) {
      const role = username === 'admin' && password === 'admin' ? 'admin' : 'member'
      navigate(role === 'admin' ? '/admin' : '/about')
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F5F0] flex">
      {/* Left decorative panel */}
      <div className="hidden lg:flex w-1/2 bg-primary flex-col justify-center gap-16 p-16">
        <div className="font-display text-2xl font-bold text-[#F5F5F0] tracking-tight">
          THE Store<span className="text-accent"></span>
        </div>
        <div>
          <p className="font-display text-5xl font-bold text-[#F5F5F0] leading-tight mb-6">
            Satu toko<br />Semua<br /><span className="text-accent">Ada</span>
          </p>
          <p className="text-[#F5F5F0]/50 text-sm">
            Ribuan produk pilihan menanti kamu.
          </p>
        </div>

      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm animate-slide-up">
          <div className="lg:hidden font-display text-2xl font-bold mb-10">
            TokoHappy<span className="bg-primary text-accent px-1">.</span>
          </div>
          <h2 className="font-display text-3xl font-bold mb-2">Masuk</h2>
          <p className="text-muted text-sm mb-8">Selamat datang di THE Store</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium uppercase tracking-widest mb-2 text-muted">Username</label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full border border-black/20 bg-transparent rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                placeholder="Masukkan username"
              />
            </div>
            <div>
              <label className="block text-xs font-medium uppercase tracking-widest mb-2 text-muted">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full border border-black/20 bg-transparent rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                placeholder="Masukkan password"
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-primary text-[#F5F5F0] py-3 rounded-lg font-medium hover:bg-primary/80 transition-colors"
            >
              Masuk
            </button>
          </form>

          <p className="text-xs text-muted mt-8 text-center">
            Login sebagai admin: gunakan username & password "admin"
          </p>
        </div>
      </div>
    </div>
  )
}
