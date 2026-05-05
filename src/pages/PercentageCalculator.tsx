import { useState } from 'react';
import { motion } from 'motion/react';

export default function PercentageCalculator() {
  // Calculator 1: What is x% of y?
  const [c1p1, setC1p1] = useState('');
  const [c1p2, setC1p2] = useState('');
  const [c1res, setC1res] = useState('');

  const calc1 = () => {
    const v1 = parseFloat(c1p1);
    const v2 = parseFloat(c1p2);
    if (!isNaN(v1) && !isNaN(v2)) setC1res(String((v1 / 100) * v2));
    else setC1res('');
  };

  // Calculator 2: x is what % of y?
  const [c2p1, setC2p1] = useState('');
  const [c2p2, setC2p2] = useState('');
  const [c2res, setC2res] = useState('');

  const calc2 = () => {
    const v1 = parseFloat(c2p1);
    const v2 = parseFloat(c2p2);
    if (!isNaN(v1) && !isNaN(v2) && v2 !== 0) setC2res(String((v1 / v2) * 100));
    else setC2res('');
  };

  // Calculator 3: x is y% of what?
  const [c3p1, setC3p1] = useState('');
  const [c3p2, setC3p2] = useState('');
  const [c3res, setC3res] = useState('');

  const calc3 = () => {
    const v1 = parseFloat(c3p1);
    const v2 = parseFloat(c3p2);
    if (!isNaN(v1) && !isNaN(v2) && v2 !== 0) setC3res(String((v1 / (v2 / 100))));
    else setC3res('');
  };

  // Calculator 4: Percentage Difference
  const [c4p1, setC4p1] = useState('');
  const [c4p2, setC4p2] = useState('');
  const [c4res, setC4res] = useState('');

  const calc4 = () => {
    const v1 = parseFloat(c4p1);
    const v2 = parseFloat(c4p2);
    if (!isNaN(v1) && !isNaN(v2)) {
      const diff = Math.abs(v1 - v2);
      const avg = (v1 + v2) / 2;
      setC4res(String((diff / avg) * 100));
    } else setC4res('');
  };

  // Calculator 5: Percentage Change
  const [c5p1, setC5p1] = useState('');
  const [c5type, setC5type] = useState('increase');
  const [c5p2, setC5p2] = useState('');
  const [c5res, setC5res] = useState('');

  const calc5 = () => {
    const v1 = parseFloat(c5p1);
    const pct = parseFloat(c5p2);
    if (!isNaN(v1) && !isNaN(pct)) {
      if (c5type === 'increase') {
        setC5res(String(v1 * (1 + pct / 100)));
      } else {
        setC5res(String(v1 * (1 - pct / 100)));
      }
    } else setC5res('');
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto w-full space-y-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-white">Percentage Calculator</h1>
        <p className="mt-4 text-lg text-[#94a3b8]">Calculate percentages, differences, and changes.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-white mb-6">Percentage Value</h2>
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <span className="text-[#94a3b8]">What is</span>
              <input type="number" value={c1p1} onChange={e => setC1p1(e.target.value)} className="w-24 bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white outline-none focus:border-[#38bdf8]/50" placeholder="%" />
              <span className="text-[#94a3b8]">% of</span>
              <input type="number" value={c1p2} onChange={e => setC1p2(e.target.value)} className="w-32 bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white outline-none focus:border-[#38bdf8]/50" />
              <span className="text-[#94a3b8]">=</span>
              <span className="text-2xl font-bold text-[#38bdf8]">{c1res || '?'}</span>
            </div>
          </div>
          <button onClick={calc1} className="bg-[#38bdf8] text-[#0f172a] rounded-xl px-5 py-2.5 font-bold hover:bg-[#0ea5e9] transition-colors w-full">Calculate</button>
        </div>

        <div className="glass p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-white mb-6">Find the Percentage</h2>
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <input type="number" value={c2p1} onChange={e => setC2p1(e.target.value)} className="w-24 bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white outline-none focus:border-[#38bdf8]/50" />
              <span className="text-[#94a3b8]">is what % of</span>
              <input type="number" value={c2p2} onChange={e => setC2p2(e.target.value)} className="w-32 bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white outline-none focus:border-[#38bdf8]/50" />
              <span className="text-[#94a3b8]">=</span>
              <span className="text-2xl font-bold text-[#38bdf8]">{c2res ? `${c2res}%` : '?'}</span>
            </div>
          </div>
          <button onClick={calc2} className="bg-[#38bdf8] text-[#0f172a] rounded-xl px-5 py-2.5 font-bold hover:bg-[#0ea5e9] transition-colors w-full">Calculate</button>
        </div>

        <div className="glass p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-white mb-6">Find the Whole</h2>
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <input type="number" value={c3p1} onChange={e => setC3p1(e.target.value)} className="w-24 bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white outline-none focus:border-[#38bdf8]/50" />
              <span className="text-[#94a3b8]">is</span>
              <input type="number" value={c3p2} onChange={e => setC3p2(e.target.value)} className="w-24 bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white outline-none focus:border-[#38bdf8]/50" placeholder="%" />
              <span className="text-[#94a3b8]">% of what?</span>
            </div>
            <div className="text-[#94a3b8] mb-6 flex items-center gap-3">
              <span>Result =</span>
              <span className="text-2xl font-bold text-[#38bdf8]">{c3res || '?'}</span>
            </div>
          </div>
          <button onClick={calc3} className="bg-[#38bdf8] text-[#0f172a] rounded-xl px-5 py-2.5 font-bold hover:bg-[#0ea5e9] transition-colors w-full">Calculate</button>
        </div>

        <div className="glass p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-white mb-6">Percentage Difference</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#94a3b8] mb-2">Value 1</label>
                <input type="number" value={c4p1} onChange={e => setC4p1(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white outline-none focus:border-[#38bdf8]/50" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#94a3b8] mb-2">Value 2</label>
                <input type="number" value={c4p2} onChange={e => setC4p2(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white outline-none focus:border-[#38bdf8]/50" />
              </div>
            </div>
            <div className="text-[#94a3b8] mb-6 flex items-center gap-3">
              <span>Difference =</span>
              <span className="text-2xl font-bold text-[#38bdf8]">{c4res ? `${c4res}%` : '?'}</span>
            </div>
          </div>
          <button onClick={calc4} className="bg-[#38bdf8] text-[#0f172a] rounded-xl px-5 py-2.5 font-bold hover:bg-[#0ea5e9] transition-colors w-full">Calculate</button>
        </div>

        <div className="glass p-8 md:col-span-2 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-white mb-6">Percentage Change</h2>
            <div className="flex items-center gap-4 mb-6 flex-wrap">
              <input type="number" value={c5p1} onChange={e => setC5p1(e.target.value)} className="w-32 bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white outline-none focus:border-[#38bdf8]/50" />
              <select value={c5type} onChange={e => setC5type(e.target.value)} className="bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white outline-none focus:border-[#38bdf8]/50">
                <option value="increase">Increase</option>
                <option value="decrease">Decrease</option>
              </select>
              <span className="text-[#94a3b8]">by</span>
              <input type="number" value={c5p2} onChange={e => setC5p2(e.target.value)} className="w-24 bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white outline-none focus:border-[#38bdf8]/50" placeholder="%" />
              <span className="text-[#94a3b8]">=</span>
              <span className="text-2xl font-bold text-[#38bdf8]">{c5res || '?'}</span>
            </div>
          </div>
          <button onClick={calc5} className="bg-[#38bdf8] text-[#0f172a] rounded-xl px-5 py-2.5 font-bold hover:bg-[#0ea5e9] transition-colors md:w-1/2">Calculate</button>
        </div>
      </div>
    </motion.div>
  );
}
