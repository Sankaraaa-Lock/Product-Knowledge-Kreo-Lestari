/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  PiggyBank, 
  CreditCard, 
  BadgePercent, 
  ChevronRight, 
  Phone, 
  MapPin, 
  Info,
  CheckCircle2,
  Wallet,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Product {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  benefits: string[];
}

const PRODUCTS: Record<string, Product[]> = {
  tabungan: [
    {
      id: 'tabungan-sukarela',
      title: 'Tabungan Sukarela',
      description: 'Tabungan fleksibel yang dapat diambil kapan saja untuk kebutuhan sehari-hari Anda.',
      icon: <PiggyBank className="w-6 h-6" />,
      features: ['Bebas biaya administrasi bulanan', 'Setoran awal ringan', 'Bunga kompetitif'],
      benefits: ['Keamanan terjamin oleh LPS', 'Proses pembukaan rekening cepat', 'Layanan ramah dan personal']
    },
    {
      id: 'tabungan-pendidikan',
      title: 'Tabungan Pendidikan',
      description: 'Solusi tepat dalam merencanakan masa depan pendidikan buah hati Anda.',
      icon: <Wallet className="w-6 h-6" />,
      features: ['Suku bunga lebih tinggi', 'Target dana terencana', 'Jangka waktu fleksibel'],
      benefits: ['Membantu kedisiplinan menabung', 'Kepastian dana pendidikan', 'Bonus menarik saat target tercapai']
    }
  ],
  deposito: [
    {
      id: 'deposito-berjangka',
      title: 'Deposito Berjangka',
      description: 'Investasi aman dengan suku bunga tinggi untuk pertumbuhan kekayaan Anda.',
      icon: <BadgePercent className="w-6 h-6" />,
      features: ['Pilihan jangka waktu 1, 3, 6, 12 bulan', 'Bunga dapat diinvestasikan kembali', 'Bisa dijadikan agunan kredit'],
      benefits: ['Suku bunga di atas tabungan biasa', 'Keamanan investasi dijamin LPS', 'Pendapatan tetap setiap bulan']
    }
  ],
  kredit: [
    {
      id: 'kredit-modal-kerja',
      title: 'Kredit Modal Kerja',
      description: 'Dukungan pembiayaan untuk mengembangkan usaha Mikro, Kecil, dan Menengah.',
      icon: <CreditCard className="w-6 h-6" />,
      features: ['Proses cepat dan mudah', 'Persyaratan dokumen sederhana', 'Jangka waktu hingga 36 bulan'],
      benefits: ['Meningkatkan kapasitas produksi', 'Membantu arus kas usaha', 'Pendampingan usaha dari tim ahli']
    },
    {
      id: 'kredit-konsumtif',
      title: 'Kredit Konsumtif',
      description: 'Solusi kebutuhan pribadi seperti renovasi rumah, pendidikan, atau pembelian kendaraan.',
      icon: <ArrowRight className="w-6 h-6" />,
      features: ['Suku bunga bersaing', 'Plafond hingga ratusan juta', 'Cicilan tetap setiap bulan'],
      benefits: ['Mempercepat pemenuhan kebutuhan', 'Proses verifikasi yang humanis', 'Tanpa biaya tersembunyi']
    }
  ]
};

export default function App() {
  const [activeCategory, setActiveCategory] = useState<'tabungan' | 'deposito' | 'kredit'>('tabungan');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const getCategoryLabel = (id: string) => {
    if (id === 'tabungan') return 'Produk Simpanan';
    if (id === 'deposito') return 'Deposito Berjangka';
    return 'Produk Kredit';
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col overflow-x-hidden">
      {/* Top Navigation Bar */}
      <nav className="h-20 bg-[#004A99] border-b-4 border-[#FFD700] flex items-center justify-between px-8 shrink-0 shadow-lg z-30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-[#004A99] border-2 border-[#FFD700]">KL</div>
          <div>
            <h1 className="text-white font-bold text-xl leading-none">BPR KREO LESTARI</h1>
            <p className="text-[#FFD700] text-[10px] tracking-widest font-semibold uppercase">Solusi Keuangan Terpercaya</p>
          </div>
        </div>
        <div className="hidden md:flex gap-8 text-white/90 font-medium text-sm">
          <span className="text-white border-b-2 border-white pb-1">Katalog Produk</span>
          <span className="hover:text-white cursor-pointer transition-colors">Simulasi Pinjaman</span>
          <span className="hover:text-white cursor-pointer transition-colors">Tentang Kami</span>
          <span className="hover:text-white cursor-pointer text-[#FFD700] transition-colors">Layanan OJK</span>
        </div>
      </nav>

      <div className="flex-1 flex flex-col md:flex-row p-6 gap-6 max-w-[1400px] mx-auto w-full">
        
        {/* Left Sidebar: Menu */}
        <aside className="w-full md:w-64 flex flex-col gap-6 shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Kategori Utama</h2>
            <ul className="space-y-2">
              {[
                { id: 'tabungan', label: 'Produk Simpanan', count: 2 },
                { id: 'deposito', label: 'Deposito Berjangka', count: 1 },
                { id: 'kredit', label: 'Produk Kredit', count: 2 }
              ].map((cat) => (
                <li 
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id as any);
                    setSelectedProduct(null);
                  }}
                  className={`p-3 rounded-lg font-semibold flex justify-between items-center cursor-pointer transition-all ${
                    activeCategory === cat.id 
                    ? 'bg-[#004A99] text-white shadow-md' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                  id={`side-tab-${cat.id}`}
                >
                  <span className="text-sm">{cat.label}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                    activeCategory === cat.id ? 'bg-[#FFD700] text-blue-900' : 'bg-slate-300 text-slate-700'
                  }`}>
                    {cat.count}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#004A99] rounded-xl p-5 text-white shadow-lg mt-auto hidden md:block">
            <p className="text-[10px] uppercase tracking-widest opacity-70 mb-1 font-bold">Layanan Nasabah</p>
            <p className="text-lg font-bold">(021) 732 1234</p>
            <div className="mt-4 pt-4 border-t border-white/20 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[10px] font-medium">
                <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.5)]"></div> Terdaftar di OJK
              </div>
              <div className="flex items-center gap-2 text-[10px] font-medium">
                <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.5)]"></div> Peserta Penjaminan LPS
              </div>
            </div>
          </div>
        </aside>

        {/* Right: Product Grid Area */}
        <main className="flex-1 flex flex-col gap-6">
          <header className="flex justify-between items-end pb-2 border-b border-slate-200">
            <div>
              <h3 className="text-2xl font-bold text-slate-800">{getCategoryLabel(activeCategory)}</h3>
              <p className="text-slate-500 text-sm">Wujudkan masa depan aman dengan solusi perbankan terpercaya kami.</p>
            </div>
            <div className="hidden sm:flex gap-2 mb-1">
              <div className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center text-slate-400 cursor-not-allowed opacity-50">&larr;</div>
              <div className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center text-slate-400 cursor-not-allowed opacity-50">&rarr;</div>
            </div>
          </header>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pb-8">
            <AnimatePresence mode="wait">
              {PRODUCTS[activeCategory].map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300 group"
                  id={`card-${product.id}`}
                >
                  <div className={`h-36 ${
                    activeCategory === 'kredit' ? 'bg-gradient-to-br from-blue-900 to-indigo-700' : 
                    activeCategory === 'deposito' ? 'bg-gradient-to-br from-emerald-800 to-emerald-600' :
                    'bg-gradient-to-br from-[#004A99] to-blue-600'
                  } p-6 flex flex-col justify-between relative overflow-hidden shrink-0`}>
                    <div className="relative z-10">
                      <span className="bg-white/20 backdrop-blur-md text-white text-[10px] px-2 py-1 rounded uppercase font-bold tracking-widest border border-white/10">
                        {activeCategory === 'tabungan' ? 'Personal' : activeCategory === 'deposito' ? 'Investasi' : 'Pembiayaan'}
                      </span>
                      <h4 className="text-white text-2xl font-bold mt-2 leading-tight group-hover:translate-x-1 transition-transform">{product.title}</h4>
                    </div>
                    <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full group-hover:scale-110 transition-transform duration-500"></div>
                    <p className="text-white/80 text-xs font-medium relative z-10 max-w-[80%] line-clamp-1">{product.description}</p>
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="border-r border-slate-100">
                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Highlight</p>
                        <p className="text-sm font-bold text-blue-900">{product.features[0]}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Status</p>
                        <p className="text-sm font-bold text-emerald-600 flex items-center gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Aktif
                        </p>
                      </div>
                    </div>

                    <ul className="text-sm text-slate-600 space-y-2 mb-8 flex-1">
                      {product.features.slice(1, 3).map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#004A99]/40" />
                          <span className="text-xs">{feat}</span>
                        </li>
                      ))}
                    </ul>

                    <button 
                      onClick={() => setSelectedProduct(product)}
                      className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-[#004A99] hover:shadow-lg transition-all active:scale-[0.98]"
                    >
                      Pelajari Detail
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* Bottom Status Bar */}
      <footer className="h-12 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between px-8 text-[11px] text-slate-400 shrink-0 font-medium z-10">
        <div className="flex gap-4 sm:gap-6 py-2 sm:py-0">
          <span>PT BPR KREO LESTARI &copy; 2024</span>
          <span className="hidden sm:inline text-slate-300">|</span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" /> Cipadu, Tangerang
          </span>
        </div>
        <div className="flex gap-4 py-2 sm:py-0">
          <span className="text-[#004A99] hover:underline cursor-pointer transition-all">Kebijakan Privasi</span>
          <span className="text-[#004A99] hover:underline cursor-pointer transition-all">Syarat & Ketentuan</span>
        </div>
      </footer>

      {/* Product Details Modal - Restyled */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
              onClick={() => setSelectedProduct(null)}
            />
            <motion.div 
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              className="relative bg-white w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] border border-white/20"
              id="product-modal"
            >
              <div className="bg-[#004A99] px-8 py-5 text-white flex justify-between items-center border-b-4 border-[#FFD700]">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-lg border border-white/10">
                    {selectedProduct.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{selectedProduct.title}</h3>
                    <p className="text-[#FFD700] text-[10px] font-bold uppercase tracking-widest">Detail Informasi Produk</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
                >
                  <ArrowRight className="w-5 h-5 rotate-180" />
                </button>
              </div>
              
              <div className="p-8 overflow-y-auto bg-gradient-to-b from-slate-50 to-white">
                <p className="text-lg font-medium text-slate-800 mb-8 border-l-4 border-[#FFD700] pl-4 italic">
                  {selectedProduct.description}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                    <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                      <Info className="w-4 h-4 text-[#004A99]" />
                      Fitur Utama
                    </h4>
                    <ul className="space-y-3">
                      {selectedProduct.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-2 text-slate-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                    <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                      <BadgePercent className="w-4 h-4 text-[#004A99]" />
                      Keuntungan
                    </h4>
                    <ul className="space-y-3">
                      {selectedProduct.benefits.map((b, i) => (
                        <li key={i} className="flex items-start gap-2 text-slate-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-6 bg-[#004A99] border border-blue-800 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-white shadow-lg">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/10 rounded-xl">
                      <Phone className="w-6 h-6 text-[#FFD700]" />
                    </div>
                    <div className="text-center sm:text-left">
                      <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest leading-none mb-1">Customer Care</p>
                      <p className="text-xl font-bold">(021) 732 1234</p>
                    </div>
                  </div>
                  <button className="w-full sm:w-auto bg-[#FFD700] text-blue-900 px-8 py-3 rounded-xl font-bold hover:bg-yellow-400 transition-all shadow-md active:scale-95">
                    Ajukan Sekarang
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
