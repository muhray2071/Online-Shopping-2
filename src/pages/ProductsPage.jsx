import { useEffect, useState } from 'react'
import { useCart } from '../context/CartContext'
import Navbar from '../components/Navbar'

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [quantities, setQuantities] = useState({})
  const [toast, setToast] = useState('')
  const [search, setSearch] = useState('')
  const { addToCart } = useCart()

  useEffect(() => {
    fetch('https://api.escuelajs.co/api/v1/products?limit=20')
      .then(r => r.json())
      .then(data => {
        setProducts(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(''), 2500)
  }

  const handleAdd = (product) => {
    const qty = parseInt(quantities[product.id] || 1)
    if (!qty || qty <= 0) {
      showToast('Jumlah harus lebih dari 0!')
      return
    }
    addToCart(product, qty)
    showToast(`${product.title} ditambahkan ke keranjang!`)
  }

  const filtered = products.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      <Navbar />

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-primary text-[#F5F5F0] px-6 py-3 rounded-full text-sm font-medium shadow-lg animate-slide-up">
          {toast}
        </div>
      )}

      <div className="max-w-6xl mx-auto px-6 pt-28 pb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <h1 className="font-display text-5xl font-bold mb-2">Produk</h1>
            <p className="text-muted text-sm">{filtered.length} produk tersedia</p>
          </div>
          <input
            type="text"
            placeholder="Cari produk..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border border-black/20 bg-white rounded-full px-5 py-2.5 text-sm focus:outline-none focus:border-primary w-full md:w-64"
          />
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array(8).fill(0).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl h-72 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {filtered.map((product, i) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden border border-black/5 hover:border-black/20 hover:-translate-y-1 transition-all duration-300 animate-slide-up flex flex-col"
                style={{ animationDelay: `${i * 0.03}s`, animationFillMode: 'both' }}
              >
                <div className="relative overflow-hidden h-44 bg-gray-50">
                  <img
                    src={Array.isArray(product.images) ? product.images[0] : product.images}
                    alt={product.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    onError={e => { e.target.src = 'https://placehold.co/400x300/f5f5f0/888?text=No+Image' }}
                  />
                  <span className="absolute top-2 right-2 bg-white/90 text-xs px-2 py-0.5 rounded-full font-medium">
                    {product.category?.name || 'Umum'}
                  </span>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="text-sm font-medium line-clamp-2 mb-1">{product.title}</h3>
                  <p className="font-display font-bold text-base mb-3">
                    Rp {product.price.toLocaleString('id-ID')}
                  </p>
                  <div className="mt-auto flex gap-2">
                    <input
                      type="number"
                      min="1"
                      defaultValue="1"
                      onChange={e => setQuantities(q => ({ ...q, [product.id]: e.target.value }))}
                      className="border border-black/20 rounded-lg px-2 py-1.5 text-sm w-14 focus:outline-none focus:border-primary text-center"
                    />
                    <button
                      onClick={() => handleAdd(product)}
                      className="flex-1 bg-primary text-[#F5F5F0] text-xs font-medium py-1.5 rounded-lg hover:bg-primary/80 transition-colors"
                    >
                      + Keranjang
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
