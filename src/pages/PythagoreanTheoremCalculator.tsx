import { useState } from 'react';
import { motion } from 'motion/react';

export default function PythagoreanTheoremCalculator() {
  const [a, setA] = useState('3');
  const [b, setB] = useState('4');
  const [c, setC] = useState('');
  const [res, setRes] = useState<any>(null);

  const calculate = () => {
    let aVal = parseFloat(a);
    let bVal = parseFloat(b);
    let cVal = parseFloat(c);

    let count = 0;
    if (!isNaN(aVal)) count++;
    if (!isNaN(bVal)) count++;
    if (!isNaN(cVal)) count++;

    if (count < 2) return setRes({ error: 'Please provide at least 2 values.' });
    if ((!isNaN(aVal) && aVal <= 0) || (!isNaN(bVal) && bVal <= 0) || (!isNaN(cVal) && cVal <= 0)) {
        return setRes({ error: 'Values must be strictly positive.' });
    }

    if (isNaN(cVal)) {
      cVal = Math.sqrt(aVal * aVal + bVal * bVal);
    } else if (isNaN(bVal)) {
      if (cVal <= aVal) return setRes({ error: 'Hypotenuse (c) must be larger than side (a).' });
      bVal = Math.sqrt(cVal * cVal - aVal * aVal);
    } else if (isNaN(aVal)) {
      if (cVal <= bVal) return setRes({ error: 'Hypotenuse (c) must be larger than side (b).' });
      aVal = Math.sqrt(cVal * cVal - bVal * bVal);
    } else {
        if (Math.abs(aVal*aVal + bVal*bVal - cVal*cVal) > 1e-5) {
            return setRes({ error: 'Values do not satisfy the Pythagorean theorem (a² + b² = c²)' });
        }
    }

    setRes({ 
        a: aVal, 
        b: bVal, 
        c: cVal,
        a2: (aVal * aVal),
        b2: (bVal * bVal),
        c2: (cVal * cVal)
    });
  };

  const clear = () => {
    setA(''); setB(''); setC(''); setRes(null);
  };
  
  const fmt = (v: number) => v.toFixed(5).replace(/\.?0+$/, '');

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto w-full space-y-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-4">Pythagorean Theorem Calculator</h1>
        <p className="text-[#94a3b8]">Solve the Pythagorean equation: a² + b² = c²</p>
      </div>

      <div className="glass p-8 max-w-lg mx-auto">
        <div className="space-y-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-[#94a3b8] mb-2">Side a</label>
            <input type="number" value={a} onChange={e => {setA(e.target.value); setRes(null);}} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#38bdf8]/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#94a3b8] mb-2">Side b</label>
            <input type="number" value={b} onChange={e => {setB(e.target.value); setRes(null);}} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#38bdf8]/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#94a3b8] mb-2">Hypotenuse c</label>
            <input type="number" value={c} onChange={e => {setC(e.target.value); setRes(null);}} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#38bdf8]/50" />
          </div>
        </div>

        <div className="flex gap-4">
          <button onClick={calculate} className="flex-1 bg-[#38bdf8] text-[#0f172a] rounded-xl px-4 py-3 font-bold hover:bg-[#0ea5e9] transition-colors">Calculate</button>
          <button onClick={clear} className="flex-1 bg-white/5 text-white border border-white/10 rounded-xl px-4 py-3 font-bold hover:bg-white/10 transition-colors">Clear</button>
        </div>

        {res && (
          <div className="mt-8 bg-black/20 border border-white/10 rounded-xl p-6">
            {res.error ? (
              <p className="text-red-400">{res.error}</p>
            ) : (
              <div className="space-y-4 text-sm">
                <div className="grid grid-cols-2 gap-4 mb-4">
                     <div className="bg-white/5 p-4 rounded-xl text-center">
                         <div className="text-[#94a3b8] mb-1">Side a</div>
                         <div className="text-xl font-mono text-white">{fmt(res.a)}</div>
                     </div>
                     <div className="bg-white/5 p-4 rounded-xl text-center">
                         <div className="text-[#94a3b8] mb-1">Side b</div>
                         <div className="text-xl font-mono text-white">{fmt(res.b)}</div>
                     </div>
                     <div className="bg-white/5 p-4 rounded-xl text-center col-span-2 shadow-lg border-t border-white/10">
                         <div className="text-[#94a3b8] mb-1 font-bold">Hypotenuse c</div>
                         <div className="text-2xl font-mono text-[#38bdf8]">{fmt(res.c)}</div>
                     </div>
                </div>

                <div className="pt-4 border-t border-white/5">
                    <h3 className="font-bold text-white mb-2 pb-2">Calculation Steps</h3>
                    <div className="space-y-2 font-mono text-[#94a3b8]">
                        <div>a² + b² = c²</div>
                        <div>({fmt(res.a)})² + ({fmt(res.b)})² = ({fmt(res.c)})²</div>
                        <div>{fmt(res.a2)} + {fmt(res.b2)} = {fmt(res.c2)}</div>
                    </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
