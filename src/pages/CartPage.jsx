import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'

export default function CartPage() {
  const { cart, removeFromCart, clearCart, totalPrice } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [showCheckout, setShowCheckout] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [successData, setSuccessData] = useState(null)
  const [errors, setErrors] = useState({})

  const [form, setForm] = useState({
    username: user?.username || '',
    fullName: '',
    phone: '',
    email: '',
    address: '',
    accountNumber: '',
  })

  const validate = () => {
    const e = {}
    if (!form.fullName) e.fullName = 'Wajib diisi'
    if (!form.phone) e.phone = 'Wajib diisi'
    if (!form.email) e.email = 'Wajib diisi'
    if (!form.address) e.address = 'Wajib diisi'
    if (!form.accountNumber) e.accountNumber = 'Wajib diisi'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleCheckout = (e) => {
    e.preventDefault()
    if (!validate()) return
    setSuccessData({ name: form.fullName, total: totalPrice })
    setShowCheckout(false)
    setShowSuccess(true)
  }

  const handleDone = () => {
    clearCart()
    setShowSuccess(false)
    navigate('/about')
  }

  const fields = [
    { key: 'username', label: 'Username', disabled: true },
    { key: 'fullName', label: 'Nama Lengkap' },
    { key: 'phone', label: 'Nomor Telepon', type: 'tel' },
    { key: 'email', label: 'Alamat Email', type: 'email' },
    { key: 'address', label: 'Alamat Rumah' },
    { key: 'accountNumber', label: 'Nomor Rekening' },
  ]

  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      <Navbar />

      {/* Success Popup */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-10 max-w-md w-full mx-4 animate-slide-up text-center shadow-2xl">
            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
              ✓
            </div>
            <h2 className="font-display text-2xl font-bold mb-3">Berhasil!</h2>
            <p className="text-muted leading-relaxed mb-8">
              Transaction success by <strong className="text-primary">{successData?.name}</strong> with total price{' '}
              <strong className="text-primary">Rp {successData?.total.toLocaleString('id-ID')}</strong>
            </p>
            <button
              onClick={handleDone}
              className="w-full bg-primary text-[#F5F5F0] py-3 rounded-full font-medium hover:bg-primary/80 transition-colors"
            >
              Selesai
            </button>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto animate-slide-up shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl font-bold">Checkout</h2>
              <button
                onClick={() => setShowCheckout(false)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors text-sm"
              >✕</button>
            </div>
            <form onSubmit={handleCheckout} className="space-y-4">
              {fields.map(f => (
                <div key={f.key}>
                  <label className="block text-xs font-medium uppercase tracking-widest mb-1.5 text-muted">
                    {f.label}
                  </label>
                  <input
                    type={f.type || 'text'}
                    value={form[f.key]}
                    disabled={f.disabled}
                    onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                    className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors
                      ${f.disabled ? 'bg-gray-50 text-muted cursor-not-allowed border-black/10' : 'border-black/20 focus:border-primary'}
                      ${errors[f.key] ? 'border-red-400' : ''}`}
                  />
                  {errors[f.key] && <p className="text-red-500 text-xs mt-1">{errors[f.key]}</p>}
                </div>
              ))}
              <div className="border-t border-black/10 pt-4 flex items-center justify-between">
                <span className="text-sm font-medium">Total</span>
                <span className="font-display font-bold text-xl">
                  Rp {totalPrice.toLocaleString('id-ID')}
                </span>
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-[#F5F5F0] py-3 rounded-xl font-medium hover:bg-primary/80 transition-colors"
              >
                Konfirmasi Pembayaran
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto px-6 pt-28 pb-16">
        <h1 className="font-display text-5xl font-bold mb-10">Keranjang</h1>

        {cart.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-6xl mb-4">🛒</p>
            <p className="text-muted mb-6">Keranjangmu masih kosong.</p>
          <Link to="/products" className="inline-block bg-primary text-[#F5F5F0] px-6 py-3 rounded-full font-medium hover:bg-primary/80 transition-colors text-sm">
            Mulai Belanja
          </Link>
          </div>
        ) : (
          <>
            <div className="space-y-3 mb-8">
              {cart.map(item => (
                <div key={item.id} className="bg-white rounded-2xl p-4 flex items-center gap-4 border border-black/5 animate-slide-in">
                  <img
                    src={Array.isArray(item.images) ? item.images[0] : item.images}
                    alt={item.title}
                    className="w-16 h-16 rounded-xl object-cover bg-gray-50"
                    onError={e => { e.target.src = 'https://placehold.co/64x64/f5f5f0/888?text=?' }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.title}</p>
                    <p className="text-muted text-xs">Qty: {item.qty}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm">Rp {(item.price * item.qty).toLocaleString('id-ID')}</p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-xs text-red-400 hover:text-red-600 transition-colors mt-1"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl p-6 border border-black/5">
              <div className="flex items-center justify-between mb-6">
                <span className="font-medium">Total Belanja</span>
                <span className="font-display font-bold text-2xl">
                  Rp {totalPrice.toLocaleString('id-ID')}
                </span>
              </div>
              <button
                onClick={() => setShowCheckout(true)}
                className="w-full bg-primary text-[#F5F5F0] py-3.5 rounded-xl font-medium hover:bg-primary/80 transition-colors"
              >
                Checkout Sekarang
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
