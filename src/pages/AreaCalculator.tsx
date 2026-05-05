import { useState } from 'react';
import { motion } from 'motion/react';

export default function AreaCalculator() {
  const [activeTab, setActiveTab] = useState('rectangle');

  // Rectangle
  const [rectL, setRectL] = useState('30');
  const [rectW, setRectW] = useState('20');
  const [rectArea, setRectArea] = useState<string | null>(null);

  const calcRect = () => {
    const l = parseFloat(rectL);
    const w = parseFloat(rectW);
    if (isNaN(l) || isNaN(w) || l < 0 || w < 0) return setRectArea('Invalid');
    setRectArea((l * w).toFixed(5).replace(/\.?0+$/, ''));
  };

  // Triangle
  const [triA, setTriA] = useState('30');
  const [triB, setTriB] = useState('45');
  const [triC, setTriC] = useState('50');
  const [triArea, setTriArea] = useState<string | null>(null);

  const calcTri = () => {
    const a = parseFloat(triA);
    const b = parseFloat(triB);
    const c = parseFloat(triC);
    if (isNaN(a) || isNaN(b) || isNaN(c) || a <= 0 || b <= 0 || c <= 0) return setTriArea('Invalid');
    if (a + b <= c || a + c <= b || b + c <= a) return setTriArea('Invalid');
    const s = (a + b + c) / 2;
    const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
    setTriArea(area.toFixed(5).replace(/\.?0+$/, ''));
  };

  // Trapezoid
  const [trapB1, setTrapB1] = useState('30');
  const [trapB2, setTrapB2] = useState('45');
  const [trapH, setTrapH] = useState('20');
  const [trapArea, setTrapArea] = useState<string | null>(null);

  const calcTrap = () => {
    const b1 = parseFloat(trapB1);
    const b2 = parseFloat(trapB2);
    const h = parseFloat(trapH);
    if (isNaN(b1) || isNaN(b2) || isNaN(h) || b1 < 0 || b2 < 0 || h < 0) return setTrapArea('Invalid');
    setTrapArea((((b1 + b2) / 2) * h).toFixed(5).replace(/\.?0+$/, ''));
  };

  // Circle
  const [circR, setCircR] = useState('30');
  const [circArea, setCircArea] = useState<string | null>(null);

  const calcCirc = () => {
    const r = parseFloat(circR);
    if (isNaN(r) || r < 0) return setCircArea('Invalid');
    setCircArea((Math.PI * r * r).toFixed(5).replace(/\.?0+$/, ''));
  };

  // Sector
  const [sectR, setSectR] = useState('30');
  const [sectA, setSectA] = useState('90');
  const [sectUnit, setSectUnit] = useState<'d' | 'r'>('d');
  const [sectArea, setSectArea] = useState<string | null>(null);

  const calcSect = () => {
    const r = parseFloat(sectR);
    const angle = parseFloat(sectA);
    if (isNaN(r) || isNaN(angle) || r < 0) return setSectArea('Invalid');
    let area = 0;
    if (sectUnit === 'd') {
      area = (angle / 360) * Math.PI * r * r;
    } else {
      area = 0.5 * angle * r * r;
    }
    setSectArea(area.toFixed(5).replace(/\.?0+$/, ''));
  };

  // Ellipse
  const [ellA, setEllA] = useState('30');
  const [ellB, setEllB] = useState('20');
  const [ellArea, setEllArea] = useState<string | null>(null);

  const calcEll = () => {
    const a = parseFloat(ellA);
    const b = parseFloat(ellB);
    if (isNaN(a) || isNaN(b) || a < 0 || b < 0) return setEllArea('Invalid');
    setEllArea((Math.PI * a * b).toFixed(5).replace(/\.?0+$/, ''));
  };

  // Parallelogram
  const [parB, setParB] = useState('30');
  const [parH, setParH] = useState('20');
  const [parArea, setParArea] = useState<string | null>(null);

  const calcPar = () => {
    const b = parseFloat(parB);
    const h = parseFloat(parH);
    if (isNaN(b) || isNaN(h) || b < 0 || h < 0) return setParArea('Invalid');
    setParArea((b * h).toFixed(5).replace(/\.?0+$/, ''));
  };

  const tabs = [
    { id: 'rectangle', name: 'Rectangle' },
    { id: 'triangle', name: 'Triangle' },
    { id: 'trapezoid', name: 'Trapezoid' },
    { id: 'circle', name: 'Circle' },
    { id: 'sector', name: 'Sector' },
    { id: 'ellipse', name: 'Ellipse' },
    { id: 'parallelogram', name: 'Parallelogram' },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto w-full space-y-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-4">Area Calculator</h1>
        <p className="text-[#94a3b8]">Calculate the area of common shapes.</p>
      </div>

      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              activeTab === tab.id ? 'bg-[#38bdf8] text-[#0f172a]' : 'bg-white/5 text-[#94a3b8] hover:text-white'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      <div className="glass p-8 max-w-xl mx-auto">
        {activeTab === 'rectangle' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white text-center">Rectangle</h2>
            <div>
              <label className="block text-sm text-[#94a3b8] mb-1">Length (l)</label>
              <input type="number" value={rectL} onChange={e => setRectL(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white" />
            </div>
            <div>
              <label className="block text-sm text-[#94a3b8] mb-1">Width (w)</label>
              <input type="number" value={rectW} onChange={e => setRectW(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white" />
            </div>
            <button onClick={calcRect} className="w-full bg-[#38bdf8] text-[#0f172a] rounded-xl py-3 font-bold hover:bg-[#0ea5e9]">Calculate</button>
            {rectArea && <div className="text-center text-3xl font-bold text-[#38bdf8] mt-6">Area: {rectArea}</div>}
          </div>
        )}

        {activeTab === 'triangle' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white text-center">Triangle</h2>
            <div>
              <label className="block text-sm text-[#94a3b8] mb-1">Edge 1 (a)</label>
              <input type="number" value={triA} onChange={e => setTriA(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white" />
            </div>
            <div>
              <label className="block text-sm text-[#94a3b8] mb-1">Edge 2 (b)</label>
              <input type="number" value={triB} onChange={e => setTriB(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white" />
            </div>
            <div>
              <label className="block text-sm text-[#94a3b8] mb-1">Edge 3 (c)</label>
              <input type="number" value={triC} onChange={e => setTriC(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white" />
            </div>
            <button onClick={calcTri} className="w-full bg-[#38bdf8] text-[#0f172a] rounded-xl py-3 font-bold hover:bg-[#0ea5e9]">Calculate</button>
            {triArea && <div className="text-center text-3xl font-bold text-[#38bdf8] mt-6">Area: {triArea}</div>}
          </div>
        )}

        {activeTab === 'trapezoid' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white text-center">Trapezoid</h2>
            <div>
              <label className="block text-sm text-[#94a3b8] mb-1">Base 1 (b₁)</label>
              <input type="number" value={trapB1} onChange={e => setTrapB1(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white" />
            </div>
            <div>
              <label className="block text-sm text-[#94a3b8] mb-1">Base 2 (b₂)</label>
              <input type="number" value={trapB2} onChange={e => setTrapB2(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white" />
            </div>
            <div>
              <label className="block text-sm text-[#94a3b8] mb-1">Height (h)</label>
              <input type="number" value={trapH} onChange={e => setTrapH(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white" />
            </div>
            <button onClick={calcTrap} className="w-full bg-[#38bdf8] text-[#0f172a] rounded-xl py-3 font-bold hover:bg-[#0ea5e9]">Calculate</button>
            {trapArea && <div className="text-center text-3xl font-bold text-[#38bdf8] mt-6">Area: {trapArea}</div>}
          </div>
        )}

        {activeTab === 'circle' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white text-center">Circle</h2>
            <div>
              <label className="block text-sm text-[#94a3b8] mb-1">Radius (r)</label>
              <input type="number" value={circR} onChange={e => setCircR(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white" />
            </div>
            <button onClick={calcCirc} className="w-full bg-[#38bdf8] text-[#0f172a] rounded-xl py-3 font-bold hover:bg-[#0ea5e9]">Calculate</button>
            {circArea && <div className="text-center text-3xl font-bold text-[#38bdf8] mt-6">Area: {circArea}</div>}
          </div>
        )}

        {activeTab === 'sector' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white text-center">Sector</h2>
            <div>
               <label className="block text-sm text-[#94a3b8] mb-1">Radius (r)</label>
               <input type="number" value={sectR} onChange={e => setSectR(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white" />
            </div>
            <div className="flex gap-4">
                <div className="flex-1">
                   <label className="block text-sm text-[#94a3b8] mb-1">Angle (A)</label>
                   <input type="number" value={sectA} onChange={e => setSectA(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-[#38bdf8]/50" />
                </div>
                <div className="w-1/3">
                    <label className="block text-sm text-[#94a3b8] mb-1">Unit</label>
                    <select value={sectUnit} onChange={e => setSectUnit(e.target.value as 'd' | 'r')} className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-[#38bdf8]/50">
                        <option value="d">Degrees</option>
                        <option value="r">Radians</option>
                    </select>
                </div>
            </div>
            <button onClick={calcSect} className="w-full bg-[#38bdf8] text-[#0f172a] rounded-xl py-3 font-bold hover:bg-[#0ea5e9]">Calculate</button>
            {sectArea && <div className="text-center text-3xl font-bold text-[#38bdf8] mt-6">Area: {sectArea}</div>}
          </div>
        )}

        {activeTab === 'ellipse' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white text-center">Ellipse</h2>
            <div>
              <label className="block text-sm text-[#94a3b8] mb-1">Semi-major Axis (a)</label>
              <input type="number" value={ellA} onChange={e => setEllA(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white" />
            </div>
            <div>
              <label className="block text-sm text-[#94a3b8] mb-1">Semi-minor Axis (b)</label>
              <input type="number" value={ellB} onChange={e => setEllB(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white" />
            </div>
            <button onClick={calcEll} className="w-full bg-[#38bdf8] text-[#0f172a] rounded-xl py-3 font-bold hover:bg-[#0ea5e9]">Calculate</button>
            {ellArea && <div className="text-center text-3xl font-bold text-[#38bdf8] mt-6">Area: {ellArea}</div>}
          </div>
        )}

        {activeTab === 'parallelogram' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white text-center">Parallelogram</h2>
            <div>
              <label className="block text-sm text-[#94a3b8] mb-1">Base (b)</label>
              <input type="number" value={parB} onChange={e => setParB(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white" />
            </div>
            <div>
              <label className="block text-sm text-[#94a3b8] mb-1">Height (h)</label>
              <input type="number" value={parH} onChange={e => setParH(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white" />
            </div>
            <button onClick={calcPar} className="w-full bg-[#38bdf8] text-[#0f172a] rounded-xl py-3 font-bold hover:bg-[#0ea5e9]">Calculate</button>
            {parArea && <div className="text-center text-3xl font-bold text-[#38bdf8] mt-6">Area: {parArea}</div>}
          </div>
        )}
      </div>

    </motion.div>
  );
}
