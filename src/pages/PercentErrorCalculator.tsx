import { useState } from 'react';
import { motion } from 'motion/react';

export default function PercentErrorCalculator() {
  const [observed, setObserved] = useState('10');
  const [trueVal, setTrueVal] = useState('11');
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    const o = parseFloat(observed);
    const t = parseFloat(trueVal);
    if (!isNaN(o) && !isNaN(t) && t !== 0) {
      const err = (Math.abs(o - t) / t) * 100;
      setResult(err.toPrecision(10).replace(/(?:\.0+|(\.\d+?)0+)$/, "$1"));
    } else {
      setResult('Error');
    }
  };

  const clear = () => {
    setObserved('');
    setTrueVal('');
    setResult(null);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto w-full space-y-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-4">Percent Error Calculator</h1>
        <p className="text-[#94a3b8]">Computes the percentage error between an observed value and the true value.</p>
      </div>

      <div className="glass p-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm uppercase tracking-wider text-[#94a3b8] mb-2 font-medium">Observed Value</label>
            <input type="number" value={observed} onChange={e => setObserved(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#38bdf8]/50" />
          </div>
          <div>
            <label className="block text-sm uppercase tracking-wider text-[#94a3b8] mb-2 font-medium">True Value</label>
            <input type="number" value={trueVal} onChange={e => setTrueVal(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#38bdf8]/50" />
          </div>

          {result !== null && (
            <div className="p-6 rounded-xl bg-white/5 border border-white/10 text-center mt-6">
              <span className="text-[#94a3b8] text-sm block mb-1 uppercase tracking-wider">Percentage Error</span>
              <span className="text-4xl font-bold text-[#38bdf8]">{result === 'Error' ? 'Error' : `${result}%`}</span>
            </div>
          )}

          <div className="flex gap-4 pt-4">
            <button onClick={calculate} className="flex-1 bg-[#38bdf8] text-[#0f172a] rounded-xl px-5 py-3 font-bold hover:bg-[#0ea5e9] transition-colors">Calculate</button>
            <button onClick={clear} className="flex-1 bg-white/5 text-white border border-white/10 rounded-xl px-5 py-3 font-bold hover:bg-white/10 transition-colors">Clear</button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
