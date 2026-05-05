import { useState } from 'react';
import { motion } from 'motion/react';

export default function RatioCalculator() {
  const [a, setA] = useState('3');
  const [b, setB] = useState('4');
  const [c, setC] = useState('600');
  const [d, setD] = useState('');

  const calc1 = () => {
    const _a = parseFloat(a);
    const _b = parseFloat(b);
    const _c = parseFloat(c);
    const _d = parseFloat(d);

    const isA = !isNaN(_a) && a !== '';
    const isB = !isNaN(_b) && b !== '';
    const isC = !isNaN(_c) && c !== '';
    const isD = !isNaN(_d) && d !== '';

    // A/B = C/D
    if (!isD && isA && isB && isC && _a !== 0) {
      setD(String((_b * _c) / _a));
    } else if (!isC && isA && isB && isD && _b !== 0) {
      setC(String((_a * _d) / _b));
    } else if (!isB && isA && isC && isD && _c !== 0) {
      setB(String((_a * _d) / _c));
    } else if (!isA && isB && isC && isD && _d !== 0) {
      setA(String((_b * _c) / _d));
    }
  };

  const clear1 = () => { setA(''); setB(''); setC(''); setD(''); };

  const [sa, setSA] = useState('250');
  const [sb, setSB] = useState('280');
  const [scaleType, setScaleType] = useState('Shrink');
  const [scale, setScale] = useState('2.5');
  const [sResA, setSResA] = useState<string | null>(null);
  const [sResB, setSResB] = useState<string | null>(null);

  const calc2 = () => {
    const _sa = parseFloat(sa);
    const _sb = parseFloat(sb);
    const _sc = parseFloat(scale);

    if (!isNaN(_sa) && !isNaN(_sb) && !isNaN(_sc) && _sc > 0) {
      if (scaleType === 'Enlarge') {
        setSResA(String(_sa * _sc));
        setSResB(String(_sb * _sc));
      } else {
        setSResA(String(_sa / _sc));
        setSResB(String(_sb / _sc));
      }
    } else {
       setSResA('Err'); setSResB('Err');
    }
  };

  const clear2 = () => { setSA(''); setSB(''); setScale(''); setSResA(null); setSResB(null); };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto w-full space-y-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-4">Ratio Calculator</h1>
        <p className="text-[#94a3b8]">Solve ratios, scale ratios, or find missing values.</p>
      </div>

      <div className="glass p-8 text-center flex flex-col items-center">
        <h2 className="text-xl font-bold text-white mb-6 w-full text-left">Solve Ratio (A:B = C:D)</h2>
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-8 text-2xl font-bold text-white flex-wrap">
          <input type="number" value={a} onChange={e => setA(e.target.value)} className="w-20 sm:w-24 bg-black/20 border border-white/10 rounded-lg px-2 py-2 text-center text-[#38bdf8] outline-none focus:border-[#38bdf8]/50" placeholder="A" />
          <span>:</span>
          <input type="number" value={b} onChange={e => setB(e.target.value)} className="w-20 sm:w-24 bg-black/20 border border-white/10 rounded-lg px-2 py-2 text-center text-[#38bdf8] outline-none focus:border-[#38bdf8]/50" placeholder="B" />
          <span className="mx-2">=</span>
          <input type="number" value={c} onChange={e => setC(e.target.value)} className="w-20 sm:w-24 bg-black/20 border border-white/10 rounded-lg px-2 py-2 text-center text-[#38bdf8] outline-none focus:border-[#38bdf8]/50" placeholder="C" />
          <span>:</span>
          <input type="number" value={d} onChange={e => setD(e.target.value)} className="w-20 sm:w-24 bg-black/20 border border-white/10 rounded-lg px-2 py-2 text-center text-[#38bdf8] outline-none focus:border-[#38bdf8]/50" placeholder="D" />
        </div>
        <div className="flex gap-4">
          <button onClick={calc1} className="bg-[#38bdf8] text-[#0f172a] rounded-xl px-8 py-3 font-bold hover:bg-[#0ea5e9] transition-colors">Calculate</button>
          <button onClick={clear1} className="bg-white/5 text-white border border-white/10 rounded-xl px-8 py-3 font-bold hover:bg-white/10 transition-colors">Clear</button>
        </div>
      </div>

      <div className="glass p-8 text-center flex flex-col items-center">
        <h2 className="text-xl font-bold text-white mb-6 w-full text-left">Scale Ratio</h2>
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-8 text-lg sm:text-xl font-bold text-white flex-wrap">
          <input type="number" value={sa} onChange={e => setSA(e.target.value)} className="w-20 sm:w-24 bg-black/20 border border-white/10 rounded-lg px-2 py-2 text-center text-[#38bdf8] outline-none focus:border-[#38bdf8]/50" placeholder="A" />
          <span>:</span>
          <input type="number" value={sb} onChange={e => setSB(e.target.value)} className="w-20 sm:w-24 bg-black/20 border border-white/10 rounded-lg px-2 py-2 text-center text-[#38bdf8] outline-none focus:border-[#38bdf8]/50" placeholder="B" />
          
          <select value={scaleType} onChange={e => setScaleType(e.target.value)} className="bg-black/20 border border-white/10 rounded-lg px-2 py-2 text-white outline-none focus:border-[#38bdf8]/50 text-base">
            <option value="Enlarge">Enlarge</option>
            <option value="Shrink">Shrink</option>
          </select>
          
          <input type="number" value={scale} onChange={e => setScale(e.target.value)} className="w-20 bg-black/20 border border-white/10 rounded-lg px-2 py-2 text-center text-[#38bdf8] outline-none focus:border-[#38bdf8]/50" placeholder="times" />
          <span>times</span>
        </div>
        
        {sResA !== null && (
          <div className="mb-6 text-2xl font-bold text-[#38bdf8]">
            Result = {sResA} : {sResB}
          </div>
        )}

        <div className="flex gap-4">
          <button onClick={calc2} className="bg-[#38bdf8] text-[#0f172a] rounded-xl px-8 py-3 font-bold hover:bg-[#0ea5e9] transition-colors">Calculate</button>
          <button onClick={clear2} className="bg-white/5 text-white border border-white/10 rounded-xl px-8 py-3 font-bold hover:bg-white/10 transition-colors">Clear</button>
        </div>
      </div>
    </motion.div>
  );
}
