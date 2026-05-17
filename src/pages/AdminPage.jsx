import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'

const API = 'https://api.escuelajs.co/api/v1/products'

const CATEGORIES = [
  { id: 1, name: 'Clothes' },
  { id: 2, name: 'Electronics' },
  { id: 3, name: 'Furniture' },
  { id: 4, name: 'Shoes' },
  { id: 5, name: 'Others' },
]

const emptyForm = { title: '', price: '', description: '', categoryId: 1, images: ['https://placehold.co/400x300'] }

export default function AdminPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null) // null | 'add' | 'edit'
  const [form, setForm] = useState(emptyForm)
  const [editId, setEditId] = useState(null)
  const [toast, setToast] = useState('')
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [search, setSearch] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(''), 2500)
  }

  const fetchProducts = () => {
    setLoading(true)
    fetch(`${API}?limit=20`)
      .then(r => r.json())
      .then(data => { setProducts(data); setLoading(false) })
      .catch(() => setLoading(false))
  }

  useEffect(() => { fetchProducts() }, [])

  const openAdd = () => {
    setForm(emptyForm)
    setEditId(null)
    setModal('add')
  }

  const openEdit = (product) => {
    setForm({
      title: product.title,
      price: product.price,
      description: product.description,
      categoryId: product.category?.id || 1,
      images: product.images || ['https://placehold.co/400x300'],
    })
    setEditId(product.id)
    setModal('edit')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title || !form.price) return
    setSubmitting(true)
    const body = {
      title: form.title,
      price: Number(form.price),
      description: form.description,
      categoryId: Number(form.categoryId),
      images: Array.isArray(form.images) ? form.images : [form.images],
    }
    try {
      if (modal === 'add') {
        const r = await fetch(API, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        const data = await r.json()
        setProducts(prev => [data, ...prev])
        showToast('Produk berhasil ditambahkan!')
      } else {
        const r = await fetch(`${API}/${editId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        const data = await r.json()
        setProducts(prev => prev.map(p => p.id === editId ? data : p))
        showToast('Produk berhasil diperbarui!')
      }
      setModal(null)
    } catch {
      showToast('Terjadi kesalahan, coba lagi.')
    }
    setSubmitting(false)
  }

  const handleDelete = async (id) => {
    try {
      await fetch(`${API}/${id}`, { method: 'DELETE' })
      setProducts(prev => prev.filter(p => p.id !== id))
      showToast('Produk berhasil dihapus!')
    } catch {
      showToast('Gagal menghapus produk.')
    }
    setDeleteConfirm(null)
  }

  const filtered = products.filter(p =>
    p.title?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      <Navbar />

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-primary text-[#F5F5F0] px-6 py-3 rounded-full text-sm font-medium shadow-lg animate-slide-up">
          {toast}
        </div>
      )}

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full mx-4 animate-slide-up shadow-2xl text-center">
            <p className="text-4xl mb-4">🗑️</p>
            <h3 className="font-display text-xl font-bold mb-2">Hapus Produk?</h3>
            <p className="text-muted text-sm mb-6">Tindakan ini tidak bisa dibatalkan.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 border border-black/20 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
              >Batal</button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 bg-red-500 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-red-600 transition-colors"
              >Hapus</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Add/Edit */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto animate-slide-up shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl font-bold">
                {modal === 'add' ? 'Tambah Produk' : 'Edit Produk'}
              </h2>
              <button
                onClick={() => setModal(null)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors text-sm"
              >✕</button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { key: 'title', label: 'Nama Produk', required: true },
                { key: 'price', label: 'Harga', type: 'number', required: true },
                { key: 'description', label: 'Deskripsi' },
              ].map(f => (
                <div key={f.key}>
                  <label className="block text-xs font-medium uppercase tracking-widest mb-1.5 text-muted">
                    {f.label}{f.required && ' *'}
                  </label>
                  <input
                    type={f.type || 'text'}
                    value={form[f.key]}
                    required={f.required}
                    onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                    className="w-full border border-black/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              ))}
              <div>
                <label className="block text-xs font-medium uppercase tracking-widest mb-1.5 text-muted">Kategori</label>
                <select
                  value={form.categoryId}
                  onChange={e => setForm(prev => ({ ...prev, categoryId: e.target.value }))}
                  className="w-full border border-black/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors bg-white"
                >
                  {CATEGORIES.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium uppercase tracking-widest mb-1.5 text-muted">URL Gambar</label>
                <input
                  type="text"
                  value={form.images[0]}
                  onChange={e => setForm(prev => ({ ...prev, images: [e.target.value] }))}
                  className="w-full border border-black/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-primary text-[#F5F5F0] py-3 rounded-xl font-medium hover:bg-primary/80 transition-colors disabled:opacity-50"
              >
                {submitting ? 'Menyimpan...' : modal === 'add' ? 'Tambah Produk' : 'Simpan Perubahan'}
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-6 pt-28 pb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <h1 className="font-display text-5xl font-bold mb-2">Admin Panel</h1>
            <p className="text-muted text-sm">{filtered.length} produk</p>
          </div>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Cari produk..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="border border-black/20 bg-white rounded-full px-5 py-2.5 text-sm focus:outline-none focus:border-primary w-52"
            />
            <button
              onClick={openAdd}
              className="bg-primary text-[#F5F5F0] px-5 py-2.5 rounded-full text-sm font-medium hover:bg-primary/80 transition-colors whitespace-nowrap"
            >
              + Tambah
            </button>
          </div>
        </div>

        {loading ? (
          <div className="space-y-3">
            {Array(6).fill(0).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl h-20 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-black/5 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-black/5 bg-gray-50/50">
                  <th className="text-left px-6 py-4 text-xs font-medium uppercase tracking-widest text-muted">Produk</th>
                  <th className="text-left px-6 py-4 text-xs font-medium uppercase tracking-widest text-muted hidden md:table-cell">Kategori</th>
                  <th className="text-left px-6 py-4 text-xs font-medium uppercase tracking-widest text-muted">Harga</th>
                  <th className="text-right px-6 py-4 text-xs font-medium uppercase tracking-widest text-muted">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p, i) => (
                  <tr
                    key={p.id}
                    className="border-b border-black/5 last:border-0 hover:bg-gray-50/50 transition-colors animate-slide-in"
                    style={{ animationDelay: `${i * 0.02}s`, animationFillMode: 'both' }}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={Array.isArray(p.images) ? p.images[0] : p.images}
                          alt={p.title}
                          className="w-10 h-10 rounded-lg object-cover bg-gray-100"
                          onError={e => { e.target.src = 'https://placehold.co/40x40/f5f5f0/888?text=?' }}
                        />
                        <span className="font-medium truncate max-w-[160px]">{p.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-muted hidden md:table-cell">{p.category?.name || '-'}</td>
                    <td className="px-6 py-4 font-medium">Rp {p.price?.toLocaleString('id-ID')}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => openEdit(p)}
                          className="px-3 py-1.5 border border-black/20 rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors"
                        >Edit</button>
                        <button
                          onClick={() => setDeleteConfirm(p.id)}
                          className="px-3 py-1.5 bg-red-50 text-red-500 border border-red-100 rounded-lg text-xs font-medium hover:bg-red-100 transition-colors"
                        >Hapus</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
