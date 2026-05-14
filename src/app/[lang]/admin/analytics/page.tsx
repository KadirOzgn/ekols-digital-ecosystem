'use client';

import { useEffect, useState } from 'react';

interface AnalyticsEvent {
  type: 'click' | 'scroll' | 'move';
  x?: number;
  y?: number;
  scrollDepth?: number;
  path: string;
  timestamp: number;
  location?: {
    country: string;
    city: string;
  };
}

export default function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterPath, setFilterPath] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/analytics');
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error('Failed to fetch analytics:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredData = filterPath ? data.filter(d => d.path.includes(filterPath)) : data;
  const clicks = filteredData.filter(d => d.type === 'click');
  const moves = filteredData.filter(d => d.type === 'move');
  
  const paths = Array.from(new Set(data.map(d => d.path)));

  if (loading) return <div className="p-20 text-white">Veriler yükleniyor...</div>;

  return (
    <div className="min-h-screen bg-[#0d0e0f] pt-32 pb-20 px-6 text-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 font-sans tracking-tight">Kullanıcı Hareket Analizi</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="bg-[#1a1c1c] p-6 border border-white/10 rounded-lg">
            <p className="text-white/50 text-sm mb-1">Toplam Etkinlik</p>
            <p className="text-3xl font-bold">{data.length}</p>
          </div>
          <div className="bg-[#1a1c1c] p-6 border border-white/10 rounded-lg">
            <p className="text-white/50 text-sm mb-1">Tıklamalar</p>
            <p className="text-3xl font-bold">{data.filter(d => d.type === 'click').length}</p>
          </div>
          <div className="bg-[#1a1c1c] p-6 border border-white/10 rounded-lg">
            <p className="text-white/50 text-sm mb-1">Sayfa Görüntüleme</p>
            <p className="text-3xl font-bold">{paths.length}</p>
          </div>
          <div className="bg-[#1a1c1c] p-6 border border-white/10 rounded-lg">
            <p className="text-white/50 text-sm mb-1">Ort. Kaydırma</p>
            <p className="text-3xl font-bold">
              {Math.round(data.filter(d => d.type === 'scroll').reduce((acc, curr) => acc + (curr.scrollDepth || 0), 0) / (data.filter(d => d.type === 'scroll').length || 1))}%
            </p>
          </div>
        </div>

        <div className="mb-8">
          <label className="block text-sm font-medium text-white/50 mb-2">Sayfa Filtrele</label>
          <select 
            className="bg-[#1a1c1c] border border-white/10 rounded px-4 py-2 text-white outline-none"
            value={filterPath}
            onChange={(e) => setFilterPath(e.target.value)}
          >
            <option value="">Tüm Sayfalar</option>
            {paths.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>

        <div className="bg-[#1a1c1c] border border-white/10 rounded-lg overflow-hidden">
          <div className="p-6 border-b border-white/10 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Isı Haritası (Sayfa Üzerinde)</h2>
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-yellow-400"></span> Tıklama
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-white/20"></span> Hareket
              </div>
            </div>
          </div>
          
          <div className="relative w-full h-[600px] bg-[#0d0e0f] overflow-hidden border-4 border-dashed border-white/5 m-4 rounded">
             {/* Background Page Visualization */}
             {filterPath && (
               <iframe 
                src={filterPath} 
                className="absolute inset-0 w-[2000px] h-[2000px] origin-top-left pointer-events-none opacity-40 grayscale"
                style={{ transform: 'scale(0.6)' }} // Adjusted for a reasonable view
               />
             )}
             {!filterPath && (
               <div className="absolute inset-0 flex items-center justify-center text-white/20 uppercase tracking-widest font-bold text-center p-20">
                 Lütfen Isı Haritasını Görmek İçin Yukarıdan Bir Sayfa Seçin
               </div>
             )}

             {/* Heatmap Overlay */}
             <div className="absolute inset-0 w-[2000px] h-[2000px] origin-top-left" style={{ transform: 'scale(0.6)' }}>
               {clicks.map((c, i) => (
                 <div 
                   key={`click-${i}`}
                   className="absolute w-6 h-6 bg-yellow-400/80 rounded-full blur-[4px] pointer-events-none z-10 shadow-[0_0_15px_rgba(250,204,21,0.5)]"
                   style={{ left: `${c.x}px`, top: `${c.y}px`, transform: 'translate(-50%, -50%)' }}
                 />
               ))}
               {moves.map((m, i) => (
                 <div 
                   key={`move-${i}`}
                   className="absolute w-2 h-2 bg-white/10 rounded-full pointer-events-none"
                   style={{ left: `${m.x}px`, top: `${m.y}px`, transform: 'translate(-50%, -50%)' }}
                 />
               ))}
             </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Son Etkinlikler</h2>
          <div className="bg-[#1a1c1c] border border-white/10 rounded-lg overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10 text-white/50 text-sm">
                  <th className="p-4">Zaman</th>
                  <th className="p-4">Tip</th>
                  <th className="p-4">Sayfa</th>
                  <th className="p-4">Detay</th>
                  <th className="p-4">Konum</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.slice(-20).reverse().map((d, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-4 text-xs font-mono">{new Date(d.timestamp).toLocaleTimeString()}</td>
                    <td className="p-4 uppercase text-xs tracking-wider">{d.type}</td>
                    <td className="p-4 text-sm text-white/70">{d.path}</td>
                    <td className="p-4 text-sm">
                      {d.type === 'scroll' ? `%${d.scrollDepth}` : `${Math.round(d.x || 0)}, ${Math.round(d.y || 0)}`}
                    </td>
                    <td className="p-4 text-xs text-white/50">
                      {d.location ? `${d.location.city}, ${d.location.country}` : 'Yerel / Bilinmiyor'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
