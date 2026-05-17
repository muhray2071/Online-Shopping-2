import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

const stats = [
  { label: 'Produk Tersedia', value: '1000+' },
  { label: 'Pelanggan Puas', value: '500K+' },
  { label: 'Kota Terjangkau', value: '1000+' },
]

const features = [
  {
    icon: '🛍️',
    title: 'Pilihan Terlengkap',
    desc: 'Dari elektronik, fashion, furnitur, hingga kebutuhan sehari-hari, semua ada di THE Store.',
  },
  {
    icon: '🚀',
    title: 'Pengiriman Cepat',
    desc: 'Estimasi tiba 1–3 hari kerja ke seluruh Indonesia.',
  },
  {
    icon: '🔒',
    title: 'Aman & Terpercaya',
    desc: 'Transaksi 100% aman dengan enkripsi data terbaru.',
  },
  {
    icon: '💬',
    title: 'Dukungan 24/7',
    desc: 'Tim kami siap membantu kamu kapan saja dan di mana saja.',
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      <Navbar />

      <section className="pt-32 pb-24 px-6 max-w-6xl mx-auto">
        <div className="animate-slide-up">
          <span className="inline-block text-xs font-medium uppercase tracking-widest bg-primary text-accent px-3 py-1 rounded-full mb-6">
            Tentang Kami
          </span>
          <h1 className="font-display text-6xl md:text-8xl font-bold leading-none mb-8 max-w-3xl">
            Satu tempat<br />
            <span className="italic font-display">Semua</span>{' '}
            <span className="relative inline-block">
              kebutuhan
              <span className="absolute -bottom-2 left-0 right-0 h-3 bg-accent -z-10 skew-x-3"></span>
            </span>
          </h1>
          <p className="text-muted text-lg max-w-xl leading-relaxed">
            THE Store hadir sebagai destinasi belanja terlengkap. Apapun yang kamu cari, ada di sini.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-6 mt-16 border-t border-black/10 pt-12">
          {stats.map((s, i) => (
            <div key={i} className="animate-slide-up" style={{ animationDelay: `${i * 0.1}s`, animationFillMode: 'both' }}>
              <p className="font-display text-4xl font-bold mb-1">{s.value}</p>
              <p className="text-sm text-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 pb-24 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((f, i) => (
            <div key={i} className="bg-white rounded-2xl p-8 border border-black/5 hover:border-black/20 transition-all duration-300 hover:-translate-y-1 animate-slide-up" style={{ animationDelay: `${0.3 + i * 0.1}s`, animationFillMode: 'both' }}>
              <span className="text-3xl mb-4 block">{f.icon}</span>
              <h3 className="font-display text-xl font-bold mb-2">{f.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-6 mb-16 max-w-6xl md:mx-auto">
        <div className="bg-primary rounded-3xl p-12 md:p-16 flex flex-col md:flex-row md:items-center justify-between gap-8 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
          <div>
            <h2 className="font-display text-4xl font-bold text-[#F5F5F0] mb-3">
              Apapun yang<br />kamu cari, ada.
            </h2>
            <p className="text-white/50 text-sm">Dari elektronik sampai fashion, semua lengkap.</p>
          </div>
          <Link to="/products" className="inline-flex items-center gap-2 bg-accent text-primary font-bold px-8 py-4 rounded-full hover:bg-accent/80 transition-colors whitespace-nowrap">
            Mulai Belanja →
          </Link>
        </div>
      </section>
    </div>
  )
}
