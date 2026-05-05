import { useState } from 'react';
import { motion } from 'motion/react';

export default function DistanceCalculator() {
  const [activeTab, setActiveTab] = useState('2d');

  // 2D Distance
  const [x11, setX11] = useState('1');
  const [y11, setY11] = useState('1');
  const [x12, setX12] = useState('4');
  const [y12, setY12] = useState('5');
  const [res2D, setRes2D] = useState<any>(null);

  const calc2D = () => {
    const x1 = parseFloat(x11);
    const y1 = parseFloat(y11);
    const x2 = parseFloat(x12);
    const y2 = parseFloat(y12);

    if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2)) return setRes2D({ error: 'Invalid input' });

    const d = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    setRes2D({ d: d.toFixed(5).replace(/\.?0+$/, '') });
  };

  // 3D Distance
  const [x21, setX21] = useState('1');
  const [y21, setY21] = useState('1');
  const [z21, setZ21] = useState('1');
  const [x22, setX22] = useState('2');
  const [y22, setY22] = useState('2');
  const [z22, setZ22] = useState('2');
  const [res3D, setRes3D] = useState<any>(null);

  const calc3D = () => {
    const x1 = parseFloat(x21); const y1 = parseFloat(y21); const z1 = parseFloat(z21);
    const x2 = parseFloat(x22); const y2 = parseFloat(y22); const z2 = parseFloat(z22);

    if ([x1, y1, z1, x2, y2, z2].some(isNaN)) return setRes3D({ error: 'Invalid input' });

    const d = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2));
    setRes3D({ d: d.toFixed(5).replace(/\.?0+$/, '') });
  };

  // Latitude and Longitude
  const [geoMode, setGeoMode] = useState<'dec' | 'dms'>('dec');

  // Decimal
  const [la1, setLa1] = useState('38.8976');
  const [lo1, setLo1] = useState('-77.0366');
  const [la2, setLa2] = useState('39.9496');
  const [lo2, setLo2] = useState('-75.1503');

  // DMS
  const [lad1, setLad1] = useState('38'); const [lam1, setLam1] = useState('53'); const [las1, setLas1] = useState('51.36'); const [lau1, setLau1] = useState('n');
  const [lod1, setLod1] = useState('77'); const [lom1, setLom1] = useState('2'); const [los1, setLos1] = useState('11.76'); const [lou1, setLou1] = useState('w');
  const [lad2, setLad2] = useState('39'); const [lam2, setLam2] = useState('56'); const [las2, setLas2] = useState('58.56'); const [lau2, setLau2] = useState('n');
  const [lod2, setLod2] = useState('75'); const [lom2, setLom2] = useState('9'); const [los2, setLos2] = useState('1.08'); const [lou2, setLou2] = useState('w');

  const [resGeo, setResGeo] = useState<any>(null);

  const calcGeo = () => {
    let lat1 = 0, lon1 = 0, lat2 = 0, lon2 = 0;

    if (geoMode === 'dec') {
      lat1 = parseFloat(la1); lon1 = parseFloat(lo1);
      lat2 = parseFloat(la2); lon2 = parseFloat(lo2);
    } else {
      lat1 = (parseFloat(lad1||'0') + parseFloat(lam1||'0')/60 + parseFloat(las1||'0')/3600) * (lau1 === 'n' ? 1 : -1);
      lon1 = (parseFloat(lod1||'0') + parseFloat(lom1||'0')/60 + parseFloat(los1||'0')/3600) * (lou1 === 'e' ? 1 : -1);
      lat2 = (parseFloat(lad2||'0') + parseFloat(lam2||'0')/60 + parseFloat(las2||'0')/3600) * (lau2 === 'n' ? 1 : -1);
      lon2 = (parseFloat(lod2||'0') + parseFloat(lom2||'0')/60 + parseFloat(los2||'0')/3600) * (lou2 === 'e' ? 1 : -1);
    }

    if (isNaN(lat1) || isNaN(lon1) || isNaN(lat2) || isNaN(lon2)) return setResGeo({ error: 'Invalid input' });

    // Lambert Method
    const f = 1/298.257;
    let la1uLambert = lat1 * Math.PI / 180;
    let la2uLambert = lat2 * Math.PI / 180;
    
    if (Math.abs(lat1) < 90) la1uLambert = Math.atan((1 - f) * Math.tan(la1uLambert));
    if (Math.abs(lat2) < 90) la2uLambert = Math.atan((1 - f) * Math.tan(la2uLambert));
    
    const lo1u = lon1 * Math.PI / 180;
    const lo2u = lon2 * Math.PI / 180;

    const deltaLat = la2uLambert - la1uLambert;
    const deltaLon = lo2u - lo1u;
    
    const a = Math.sin(deltaLat/2) * Math.sin(deltaLat/2) + Math.cos(la1uLambert) * Math.cos(la2uLambert) * Math.sin(deltaLon/2) * Math.sin(deltaLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
    const P = (la1uLambert + la2uLambert) / 2;
    const Q = (la2uLambert - la1uLambert) / 2;
    
    const X = (c - Math.sin(c)) * Math.sin(P) * Math.sin(P) * Math.cos(Q) * Math.cos(Q) / Math.cos(c/2) / Math.cos(c/2);
    const Y = (c + Math.sin(c)) * Math.sin(Q) * Math.sin(Q) * Math.cos(P) * Math.cos(P) / Math.sin(c/2) / Math.sin(c/2);
    
    const resultkm = 6378.1 * (c - f * (X + Y) / 2);
    const resultmile = resultkm / 1.609344; // Using standard conversion factor

    setResGeo({
      km: resultkm.toFixed(3),
      mi: resultmile.toFixed(3)
    });
  };

  const tabs = [
    { id: '2d', name: '2D Distance' },
    { id: '3d', name: '3D Distance' },
    { id: 'geo', name: 'Lat/Long Distance' },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto w-full space-y-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-4">Distance Calculator</h1>
        <p className="text-[#94a3b8]">Calculate the distance between points in 2D, 3D, or on Earth.</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id); setRes2D(null); setRes3D(null); setResGeo(null); }}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              activeTab === tab.id ? 'bg-[#38bdf8] text-[#0f172a]' : 'bg-white/5 text-[#94a3b8] hover:text-white'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      <div className="glass p-8 max-w-2xl mx-auto">
        {activeTab === '2d' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-white text-center">2D Coordinate Plane</h2>
            <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="font-bold text-white mb-2 pb-2 border-b border-white/5">Point 1</h3>
                  <div>
                    <label className="block text-sm text-[#94a3b8] mb-1">X₁</label>
                    <input type="number" value={x11} onChange={e => setX11(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white" />
                  </div>
                  <div>
                    <label className="block text-sm text-[#94a3b8] mb-1">Y₁</label>
                    <input type="number" value={y11} onChange={e => setY11(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white" />
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-bold text-white mb-2 pb-2 border-b border-white/5">Point 2</h3>
                  <div>
                    <label className="block text-sm text-[#94a3b8] mb-1">X₂</label>
                    <input type="number" value={x12} onChange={e => setX12(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white" />
                  </div>
                  <div>
                    <label className="block text-sm text-[#94a3b8] mb-1">Y₂</label>
                    <input type="number" value={y12} onChange={e => setY12(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white" />
                  </div>
                </div>
            </div>
            <button onClick={calc2D} className="w-full bg-[#38bdf8] text-[#0f172a] rounded-xl py-3 font-bold hover:bg-[#0ea5e9]">Calculate</button>
            {res2D && (
              <div className="mt-8 bg-black/20 border border-white/10 rounded-xl p-6 text-center">
                {res2D.error ? <span className="text-red-400">{res2D.error}</span> : <div className="text-3xl font-bold text-[#38bdf8]">Distance = {res2D.d}</div>}
              </div>
            )}
          </div>
        )}

        {activeTab === '3d' && (
           <div className="space-y-8">
             <h2 className="text-2xl font-bold text-white text-center">3D Coordinate Space</h2>
             <div className="grid grid-cols-2 gap-8">
                 <div className="space-y-4">
                   <h3 className="font-bold text-white mb-2 pb-2 border-b border-white/5">Point 1</h3>
                   <div>
                     <label className="block text-sm text-[#94a3b8] mb-1">X₁</label>
                     <input type="number" value={x21} onChange={e => setX21(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl p-2 text-white" />
                   </div>
                   <div>
                     <label className="block text-sm text-[#94a3b8] mb-1">Y₁</label>
                     <input type="number" value={y21} onChange={e => setY21(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl p-2 text-white" />
                   </div>
                   <div>
                     <label className="block text-sm text-[#94a3b8] mb-1">Z₁</label>
                     <input type="number" value={z21} onChange={e => setZ21(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl p-2 text-white" />
                   </div>
                 </div>
                 <div className="space-y-4">
                   <h3 className="font-bold text-white mb-2 pb-2 border-b border-white/5">Point 2</h3>
                   <div>
                     <label className="block text-sm text-[#94a3b8] mb-1">X₂</label>
                     <input type="number" value={x22} onChange={e => setX22(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl p-2 text-white" />
                   </div>
                   <div>
                     <label className="block text-sm text-[#94a3b8] mb-1">Y₂</label>
                     <input type="number" value={y22} onChange={e => setY22(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl p-2 text-white" />
                   </div>
                   <div>
                     <label className="block text-sm text-[#94a3b8] mb-1">Z₂</label>
                     <input type="number" value={z22} onChange={e => setZ22(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl p-2 text-white" />
                   </div>
                 </div>
             </div>
             <button onClick={calc3D} className="w-full bg-[#38bdf8] text-[#0f172a] rounded-xl py-3 font-bold hover:bg-[#0ea5e9]">Calculate</button>
             {res3D && (
               <div className="mt-8 bg-black/20 border border-white/10 rounded-xl p-6 text-center">
                 {res3D.error ? <span className="text-red-400">{res3D.error}</span> : <div className="text-3xl font-bold text-[#38bdf8]">Distance = {res3D.d}</div>}
               </div>
             )}
           </div>
        )}

        {activeTab === 'geo' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-white text-center">Latitude and Longitude</h2>
            
            <div className="flex justify-center gap-2">
              <button onClick={() => setGeoMode('dec')} className={`px-4 py-2 rounded-lg text-sm font-medium ${geoMode === 'dec' ? 'bg-[#38bdf8] text-[#0f172a]' : 'bg-white/5 text-[#94a3b8]'}`}>Decimal</button>
              <button onClick={() => setGeoMode('dms')} className={`px-4 py-2 rounded-lg text-sm font-medium ${geoMode === 'dms' ? 'bg-[#38bdf8] text-[#0f172a]' : 'bg-white/5 text-[#94a3b8]'}`}>Degree-Minute-Second</button>
            </div>

            {geoMode === 'dec' ? (
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="font-bold text-white mb-2 pb-2 border-b border-white/5">Point 1</h3>
                  <div><label className="block text-sm text-[#94a3b8] mb-1">Latitude 1</label><input type="number" value={la1} onChange={e => setLa1(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white" /></div>
                  <div><label className="block text-sm text-[#94a3b8] mb-1">Longitude 1</label><input type="number" value={lo1} onChange={e => setLo1(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white" /></div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-bold text-white mb-2 pb-2 border-b border-white/5">Point 2</h3>
                  <div><label className="block text-sm text-[#94a3b8] mb-1">Latitude 2</label><input type="number" value={la2} onChange={e => setLa2(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white" /></div>
                  <div><label className="block text-sm text-[#94a3b8] mb-1">Longitude 2</label><input type="number" value={lo2} onChange={e => setLo2(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white" /></div>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="space-y-4">
                  <h3 className="font-bold text-white pb-2 border-b border-white/5">Point 1</h3>
                  <div className="grid grid-cols-12 gap-2 items-end">
                    <div className="col-span-3"><label className="block text-xs text-[#94a3b8] mb-1">Lat: Deg</label><input type="number" value={lad1} onChange={e => setLad1(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl p-2 text-white" /></div>
                    <div className="col-span-3"><label className="block text-xs text-[#94a3b8] mb-1">Min</label><input type="number" value={lam1} onChange={e => setLam1(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl p-2 text-white" /></div>
                    <div className="col-span-3"><label className="block text-xs text-[#94a3b8] mb-1">Sec</label><input type="number" step="0.01" value={las1} onChange={e => setLas1(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl p-2 text-white" /></div>
                    <div className="col-span-3"><label className="block text-xs text-[#94a3b8] mb-1">Dir</label><select value={lau1} onChange={e => setLau1(e.target.value as any)} className="w-full bg-black/20 border border-white/10 rounded-xl p-2 text-white"><option value="n">N</option><option value="s">S</option></select></div>
                  </div>
                  <div className="grid grid-cols-12 gap-2 items-end">
                    <div className="col-span-3"><label className="block text-xs text-[#94a3b8] mb-1">Lon: Deg</label><input type="number" value={lod1} onChange={e => setLod1(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl p-2 text-white" /></div>
                    <div className="col-span-3"><label className="block text-xs text-[#94a3b8] mb-1">Min</label><input type="number" value={lom1} onChange={e => setLom1(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl p-2 text-white" /></div>
                    <div className="col-span-3"><label className="block text-xs text-[#94a3b8] mb-1">Sec</label><input type="number" step="0.01" value={los1} onChange={e => setLos1(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl p-2 text-white" /></div>
                    <div className="col-span-3"><label className="block text-xs text-[#94a3b8] mb-1">Dir</label><select value={lou1} onChange={e => setLou1(e.target.value as any)} className="w-full bg-black/20 border border-white/10 rounded-xl p-2 text-white"><option value="e">E</option><option value="w">W</option></select></div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-bold text-white pb-2 border-b border-white/5">Point 2</h3>
                  <div className="grid grid-cols-12 gap-2 items-end">
                    <div className="col-span-3"><label className="block text-xs text-[#94a3b8] mb-1">Lat: Deg</label><input type="number" value={lad2} onChange={e => setLad2(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl p-2 text-white" /></div>
                    <div className="col-span-3"><label className="block text-xs text-[#94a3b8] mb-1">Min</label><input type="number" value={lam2} onChange={e => setLam2(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl p-2 text-white" /></div>
                    <div className="col-span-3"><label className="block text-xs text-[#94a3b8] mb-1">Sec</label><input type="number" step="0.01" value={las2} onChange={e => setLas2(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl p-2 text-white" /></div>
                    <div className="col-span-3"><label className="block text-xs text-[#94a3b8] mb-1">Dir</label><select value={lau2} onChange={e => setLau2(e.target.value as any)} className="w-full bg-black/20 border border-white/10 rounded-xl p-2 text-white"><option value="n">N</option><option value="s">S</option></select></div>
                  </div>
                  <div className="grid grid-cols-12 gap-2 items-end">
                    <div className="col-span-3"><label className="block text-xs text-[#94a3b8] mb-1">Lon: Deg</label><input type="number" value={lod2} onChange={e => setLod2(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl p-2 text-white" /></div>
                    <div className="col-span-3"><label className="block text-xs text-[#94a3b8] mb-1">Min</label><input type="number" value={lom2} onChange={e => setLom2(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl p-2 text-white" /></div>
                    <div className="col-span-3"><label className="block text-xs text-[#94a3b8] mb-1">Sec</label><input type="number" step="0.01" value={los2} onChange={e => setLos2(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl p-2 text-white" /></div>
                    <div className="col-span-3"><label className="block text-xs text-[#94a3b8] mb-1">Dir</label><select value={lou2} onChange={e => setLou2(e.target.value as any)} className="w-full bg-black/20 border border-white/10 rounded-xl p-2 text-white"><option value="e">E</option><option value="w">W</option></select></div>
                  </div>
                </div>
              </div>
            )}

            <button onClick={calcGeo} className="w-full bg-[#38bdf8] text-[#0f172a] rounded-xl py-3 font-bold hover:bg-[#0ea5e9]">Calculate</button>
            {resGeo && (
              <div className="mt-8 bg-black/20 border border-white/10 rounded-xl p-6 text-center">
                {resGeo.error ? <span className="text-red-400">{resGeo.error}</span> : (
                  <div className="space-y-2">
                     <div className="text-3xl font-bold text-[#38bdf8]">{resGeo.km} km</div>
                     <div className="text-xl text-[#94a3b8]">or {resGeo.mi} miles</div>
                  </div>
                )}
              </div>
            )}

          </div>
        )}
      </div>

    </motion.div>
  );
}
