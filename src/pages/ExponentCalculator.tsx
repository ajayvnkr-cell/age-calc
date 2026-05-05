import { useState } from 'react';
import { motion } from 'motion/react';

export default function ExponentCalculator() {
  const [base, setBase] = useState('2');
  const [exponent, setExponent] = useState('5');
  const [result, setResult] = useState('');

  const calculate = () => {
    const b = base === 'e' ? Math.E : parseFloat(base);
    const e = parseFloat(exponent);
    const r = parseFloat(result);

    const isB = base === 'e' || !isNaN(b);
    const isE = !isNaN(e) && exponent !== '';
    const isR = !isNaN(r) && result !== '';

    if (isB && isE) {
      setResult(String(Math.pow(b, e)));
    } else if (isB && isR) {
      setExponent(String(Math.log(r) / Math.log(b)));
    } else if (isE && isR) {
       // if evaluating base, handle even/odd roots simplistically
       setBase(String(Math.pow(r, 1 / e)));
    }
  };

  const clear = () => {
    setBase('');
    setExponent('');
    setResult('');
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto w-full space-y-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-4">Exponent Calculator</h1>
        <p className="text-[#94a3b8]">Enter values into any two of the input fields to solve for the third.</p>
      </div>

      <div className="glass p-8">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-10 mt-4">
          <div className="flex flex-col items-center">
            <input type="text" value={base} onChange={e => setBase(e.target.value)} className="w-32 bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-center text-2xl text-white outline-none focus:border-[#38bdf8]/50" placeholder="Base" />
            <button onClick={() => setBase('e')} className="mt-2 text-sm text-[#38bdf8] hover:text-[#0ea5e9]">use e as base</button>
          </div>
          <div className="text-4xl font-bold text-white mb-8">^</div>
          <div className="flex flex-col items-center pb-8">
            <input type="text" value={exponent} onChange={e => setExponent(e.target.value)} className="w-32 bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-center text-2xl text-white outline-none focus:border-[#38bdf8]/50" placeholder="Exp" />
          </div>
          <div className="text-4xl font-bold text-white mb-8">=</div>
          <div className="flex flex-col items-center pb-8">
             <input type="text" value={result} onChange={e => setResult(e.target.value)} className="w-48 bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-center text-2xl text-[#38bdf8] outline-none focus:border-[#38bdf8]/50" placeholder="Result" />
          </div>
        </div>

        <div className="flex gap-4 max-w-md mx-auto">
          <button onClick={calculate} className="flex-1 bg-[#38bdf8] text-[#0f172a] rounded-xl px-5 py-3 font-bold hover:bg-[#0ea5e9] transition-colors">Calculate</button>
          <button onClick={clear} className="flex-1 bg-white/5 text-white border border-white/10 rounded-xl px-5 py-3 font-bold hover:bg-white/10 transition-colors">Clear</button>
        </div>
      </div>
    </motion.div>
  );
}
