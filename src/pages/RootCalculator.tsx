import { useState } from 'react';
import { motion } from 'motion/react';

export default function RootCalculator() {
  // Square root
  const [sq, setSq] = useState('');
  const [sqRes, setSqRes] = useState<string | null>(null);

  const calc1 = () => {
    const v = parseFloat(sq);
    if (!isNaN(v) && v >= 0) setSqRes(String(Math.sqrt(v)));
    else setSqRes('Error');
  };

  // Cube root
  const [cb, setCb] = useState('');
  const [cbRes, setCbRes] = useState<string | null>(null);

  const calc2 = () => {
    const v = parseFloat(cb);
    if (!isNaN(v)) setCbRes(String(Math.cbrt(v)));
    else setCbRes('Error');
  };

  // General root
  const [gn, setGn] = useState('3'); // degree
  const [gv, setGv] = useState(''); // value
  const [gRes, setGRes] = useState<string | null>(null);

  const calc3 = () => {
    const n = parseFloat(gn);
    const v = parseFloat(gv);
    if (!isNaN(n) && !isNaN(v) && n !== 0) {
      if (v < 0 && n % 2 === 0) setGRes('Error (Imaginary)');
      else {
        const res = v < 0 ? -Math.pow(-v, 1/n) : Math.pow(v, 1/n);
        setGRes(String(res));
      }
    } else setGRes('Error');
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto w-full space-y-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-4">Root Calculator</h1>
        <p className="text-[#94a3b8]">Determines the roots of numbers, including square, cube, and n-th roots.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-white mb-6">Square Root</h2>
            <div className="flex items-center gap-4 mb-8 text-3xl text-white font-serif">
              <span>√</span>
              <input type="number" value={sq} onChange={e => setSq(e.target.value)} className="w-full bg-black/20 border-b-2 border-t-0 border-l-0 border-r-0 border-white focus:border-[#38bdf8] focus:ring-0 px-2 flex-1 rounded-none font-sans text-2xl outline-none" placeholder="x" />
              <span>=</span>
              <span className="text-[#38bdf8] font-bold font-sans">{sqRes || '?'}</span>
            </div>
          </div>
          <button onClick={calc1} className="bg-[#38bdf8] text-[#0f172a] rounded-xl px-5 py-3 font-bold hover:bg-[#0ea5e9] transition-colors w-full">Calculate</button>
        </div>

        <div className="glass p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-white mb-6">Cube Root</h2>
            <div className="flex items-center gap-4 mb-8 text-3xl text-white font-serif">
              <span>³√</span>
              <input type="number" value={cb} onChange={e => setCb(e.target.value)} className="w-full bg-black/20 border-b-2 border-t-0 border-l-0 border-r-0 border-white focus:border-[#38bdf8] focus:ring-0 px-2 flex-1 rounded-none font-sans text-2xl outline-none" placeholder="x" />
              <span>=</span>
              <span className="text-[#38bdf8] font-bold font-sans">{cbRes || '?'}</span>
            </div>
          </div>
          <button onClick={calc2} className="bg-[#38bdf8] text-[#0f172a] rounded-xl px-5 py-3 font-bold hover:bg-[#0ea5e9] transition-colors w-full">Calculate</button>
        </div>

        <div className="glass p-8 md:col-span-2 flex flex-col justify-between items-center text-center">
          <div className="w-full">
            <h2 className="text-xl font-bold text-white mb-6 text-left">General Root</h2>
            <div className="flex items-end justify-center gap-4 mb-8 text-4xl text-white font-serif max-w-md mx-auto">
              <div className="flex flex-col items-end mr-[-8px] mb-4">
                <input type="number" value={gn} onChange={e => setGn(e.target.value)} className="w-16 bg-black/20 border border-white/10 rounded px-1 py-1 text-center font-sans text-sm outline-none focus:border-[#38bdf8]" placeholder="n" />
              </div>
              <span>√</span>
              <input type="number" value={gv} onChange={e => setGv(e.target.value)} className="bg-black/20 border-b-2 border-t-0 border-l-0 border-r-0 border-white focus:border-[#38bdf8] focus:ring-0 px-2 w-32 rounded-none font-sans text-2xl outline-none" placeholder="x" />
              <span className="mb-2">=</span>
              <span className="text-[#38bdf8] font-bold font-sans mb-2 break-all">{gRes || '?'}</span>
            </div>
          </div>
          <button onClick={calc3} className="bg-[#38bdf8] text-[#0f172a] rounded-xl px-12 py-3 font-bold hover:bg-[#0ea5e9] transition-colors">Calculate</button>
        </div>
      </div>
    </motion.div>
  );
}
