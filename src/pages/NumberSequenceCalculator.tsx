import { useState } from 'react';
import { motion } from 'motion/react';

export default function NumberSequenceCalculator() {
  const [aFirst, setAFirst] = useState('2');
  const [aDiff, setADiff] = useState('5');
  const [aNth, setANth] = useState('20');
  const [aResult, setAResult] = useState<{ value: string, sum: string } | null>(null);

  const calcArithmetic = () => {
    const a1 = parseFloat(aFirst);
    const d = parseFloat(aDiff);
    const n = parseFloat(aNth);
    if (!isNaN(a1) && !isNaN(d) && !isNaN(n) && n > 0) {
      const an = a1 + d * (n - 1);
      const s = (n * (a1 + an)) / 2;
      setAResult({ value: String(an), sum: String(s) });
    } else setAResult(null);
  };

  const [gFirst, setGFirst] = useState('2');
  const [gRatio, setGRatio] = useState('5');
  const [gNth, setGNth] = useState('12');
  const [gResult, setGResult] = useState<{ value: string, sum: string } | null>(null);

  const calcGeometric = () => {
    const a = parseFloat(gFirst);
    const r = parseFloat(gRatio);
    const n = parseFloat(gNth);
    if (!isNaN(a) && !isNaN(r) && !isNaN(n) && n > 0) {
      const an = a * Math.pow(r, n - 1);
      let s;
      if (r === 1) s = a * n;
      else s = a * (1 - Math.pow(r, n)) / (1 - r);
      setGResult({ value: String(an), sum: String(s) });
    } else setGResult(null);
  };

  const [fNth, setFNth] = useState('10');
  const [fResult, setFResult] = useState<string | null>(null);

  const calcFibonacci = () => {
    const n = parseInt(fNth);
    if (!isNaN(n) && n >= 0) {
      if (n === 0) setFResult('0');
      else if (n === 1) setFResult('1');
      else {
        let a = 0, b = 1, temp;
        for (let i = 2; i <= n; i++) {
          temp = a + b;
          a = b;
          b = temp;
        }
        setFResult(String(b));
      }
    } else setFResult(null);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto w-full space-y-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-4">Number Sequence Calculator</h1>
        <p className="text-[#94a3b8]">Determine the terms of arithmetic, geometric, or Fibonacci sequences.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Arithmetic Sequence */}
        <div className="glass p-8 flex flex-col items-center">
          <h2 className="text-xl font-bold text-white mb-2 text-center">Arithmetic Sequence</h2>
          <div className="text-xs text-[#94a3b8] mb-6 text-center font-mono bg-black/20 px-3 py-1 rounded">
            aₙ = a₁ + d × (n - 1)
          </div>
          
          <div className="w-full space-y-4 mb-6">
            <label className="flex items-center justify-between text-[#94a3b8] text-sm">
              <span className="mr-4">First number (a₁)</span>
              <input type="number" value={aFirst} onChange={e => setAFirst(e.target.value)} className="w-24 bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-right text-white outline-none focus:border-[#38bdf8]/50" />
            </label>
            <label className="flex items-center justify-between text-[#94a3b8] text-sm">
              <span className="mr-4">Common difference (d)</span>
              <input type="number" value={aDiff} onChange={e => setADiff(e.target.value)} className="w-24 bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-right text-white outline-none focus:border-[#38bdf8]/50" />
            </label>
            <label className="flex items-center justify-between text-[#94a3b8] text-sm">
              <span className="mr-4">n<sup>th</sup> number to obtain (n)</span>
              <input type="number" value={aNth} onChange={e => setANth(e.target.value)} className="w-24 bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-right text-white outline-none focus:border-[#38bdf8]/50" />
            </label>
          </div>

          <button onClick={calcArithmetic} className="w-full bg-[#38bdf8] text-[#0f172a] rounded-xl px-4 py-2 font-bold hover:bg-[#0ea5e9] transition-colors mb-6">Calculate</button>
          
          {aResult && (
            <div className="w-full bg-white/5 border border-[#38bdf8]/30 rounded-xl p-4 text-center">
              <div className="mb-2">
                <span className="text-[#94a3b8] uppercase text-xs font-bold mr-2 tracking-wider">Value (aₙ)</span>
                <span className="text-xl font-bold text-white">{aResult.value}</span>
              </div>
              <div>
                <span className="text-[#94a3b8] uppercase text-xs font-bold mr-2 tracking-wider">Sum</span>
                <span className="text-xl font-bold text-[#38bdf8]">{aResult.sum}</span>
              </div>
            </div>
          )}
        </div>

        {/* Geometric Sequence */}
        <div className="glass p-8 flex flex-col items-center">
          <h2 className="text-xl font-bold text-white mb-2 text-center">Geometric Sequence</h2>
          <div className="text-xs text-[#94a3b8] mb-6 text-center font-mono bg-black/20 px-3 py-1 rounded">
            aₙ = a₁ × rⁿ⁻¹
          </div>
          
          <div className="w-full space-y-4 mb-6">
            <label className="flex items-center justify-between text-[#94a3b8] text-sm">
              <span className="mr-4">First number (a₁)</span>
              <input type="number" value={gFirst} onChange={e => setGFirst(e.target.value)} className="w-24 bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-right text-white outline-none focus:border-[#38bdf8]/50" />
            </label>
            <label className="flex items-center justify-between text-[#94a3b8] text-sm">
              <span className="mr-4">Common ratio (r)</span>
              <input type="number" value={gRatio} onChange={e => setGRatio(e.target.value)} className="w-24 bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-right text-white outline-none focus:border-[#38bdf8]/50" />
            </label>
            <label className="flex items-center justify-between text-[#94a3b8] text-sm">
              <span className="mr-4">n<sup>th</sup> number to obtain (n)</span>
              <input type="number" value={gNth} onChange={e => setGNth(e.target.value)} className="w-24 bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-right text-white outline-none focus:border-[#38bdf8]/50" />
            </label>
          </div>

          <button onClick={calcGeometric} className="w-full bg-[#38bdf8] text-[#0f172a] rounded-xl px-4 py-2 font-bold hover:bg-[#0ea5e9] transition-colors mb-6">Calculate</button>
          
          {gResult && (
            <div className="w-full bg-white/5 border border-[#38bdf8]/30 rounded-xl p-4 text-center">
              <div className="mb-2">
                <span className="text-[#94a3b8] uppercase text-xs font-bold mr-2 tracking-wider">Value (aₙ)</span>
                <span className="text-xl font-bold text-white break-all">{gResult.value}</span>
              </div>
              <div>
                <span className="text-[#94a3b8] uppercase text-xs font-bold mr-2 tracking-wider">Sum</span>
                <span className="text-xl font-bold text-[#38bdf8] break-all">{gResult.sum}</span>
              </div>
            </div>
          )}
        </div>

        {/* Fibonacci Sequence */}
        <div className="glass p-8 flex flex-col items-center md:col-span-2 max-w-xl mx-auto w-full">
          <h2 className="text-xl font-bold text-white mb-2 text-center">Fibonacci Sequence</h2>
          <div className="text-xs text-[#94a3b8] mb-6 text-center font-mono bg-black/20 px-3 py-1 rounded">
            aₙ = aₙ₋₁ + aₙ₋₂
          </div>
          
          <div className="w-full space-y-4 mb-6">
            <label className="flex items-center justify-between text-[#94a3b8] text-sm">
              <span className="mr-4">n<sup>th</sup> number to obtain (n)</span>
              <input type="number" value={fNth} onChange={e => setFNth(e.target.value)} className="w-24 bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-right text-white outline-none focus:border-[#38bdf8]/50" />
            </label>
          </div>

          <button onClick={calcFibonacci} className="w-full bg-[#38bdf8] text-[#0f172a] rounded-xl px-4 py-2 font-bold hover:bg-[#0ea5e9] transition-colors mb-6">Calculate</button>
          
          {fResult && (
            <div className="w-full bg-white/5 border border-[#38bdf8]/30 rounded-xl p-4 text-center">
              <span className="text-[#94a3b8] uppercase text-xs font-bold mr-2 tracking-wider">Value (Fₙ)</span>
              <span className="text-2xl font-bold text-[#38bdf8] break-all">{fResult}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
