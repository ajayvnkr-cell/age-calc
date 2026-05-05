import { useState } from 'react';
import { motion } from 'motion/react';
import Fraction from 'fraction.js';

export default function QuadraticFormulaCalculator() {
  const [a, setA] = useState('1');
  const [b, setB] = useState('1');
  const [c, setC] = useState('1/4');
  const [result, setResult] = useState<{ x1: string, x2: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculate = () => {
    setError(null);
    setResult(null);
    try {
      const parseVal = (v: string) => {
        if (!v) return 0;
        return new Fraction(v).valueOf();
      };
      
      const av = parseVal(a);
      const bv = parseVal(b);
      const cv = parseVal(c);

      if (av === 0) {
        setError("Coefficient 'a' cannot be 0 for a quadratic equation.");
        return;
      }

      const discriminant = (bv * bv) - (4 * av * cv);
      
      if (discriminant < 0) {
        // Complex roots
        const real = -bv / (2 * av);
        const imag = Math.sqrt(-discriminant) / (2 * av);
        const r1 = `${real !== 0 ? real : ''} + ${Math.abs(imag)}i`;
        const r2 = `${real !== 0 ? real : ''} - ${Math.abs(imag)}i`;
        setResult({ x1: r1.replace(/^\s*\+\s*/, ''), x2: r2.replace(/^\s*\-\s*/, '-') });
      } else if (discriminant === 0) {
        // One real root
        const r = -bv / (2 * av);
        setResult({ x1: String(r), x2: String(r) });
      } else {
        // Two real roots
        const r1 = (-bv + Math.sqrt(discriminant)) / (2 * av);
        const r2 = (-bv - Math.sqrt(discriminant)) / (2 * av);
        setResult({ x1: String(r1), x2: String(r2) });
      }

    } catch (err) {
      setError('Invalid input. Please enter valid numbers or fractions (e.g., 3/4).');
    }
  };

  const clear = () => {
    setA(''); setB(''); setC('');
    setResult(null); setError(null);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto w-full space-y-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-4">Quadratic Formula Calculator</h1>
        <p className="text-[#94a3b8]">Solves the quadratic equation ax² + bx + c = 0</p>
      </div>

      <div className="glass p-8">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-8 text-xl text-white font-bold">
          <div className="flex items-center gap-3">
            <span>a =</span>
            <input type="text" value={a} onChange={e => setA(e.target.value)} className="w-24 bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-center outline-none focus:border-[#38bdf8]/50" />
          </div>
          <div className="flex items-center gap-3">
            <span>b =</span>
            <input type="text" value={b} onChange={e => setB(e.target.value)} className="w-24 bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-center outline-none focus:border-[#38bdf8]/50" />
          </div>
          <div className="flex items-center gap-3">
            <span>c =</span>
            <input type="text" value={c} onChange={e => setC(e.target.value)} className="w-24 bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-center outline-none focus:border-[#38bdf8]/50" />
          </div>
        </div>

        <p className="text-center text-[#94a3b8] text-sm mb-6">Fractional values such as 3/4 can be used.</p>

        {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-center mb-6">{error}</div>}

        {result && (
          <div className="p-6 rounded-xl bg-white/5 border border-white/10 mb-6 text-center">
            <h3 className="text-[#94a3b8] mb-4 uppercase tracking-wider text-sm font-bold">Roots</h3>
            <div className="text-3xl font-mono text-[#38bdf8] flex flex-col gap-2">
              <div>x₁ = {result.x1}</div>
              {result.x1 !== result.x2 && <div>x₂ = {result.x2}</div>}
            </div>
          </div>
        )}

        <div className="flex gap-4 justify-center">
          <button onClick={calculate} className="bg-[#38bdf8] text-[#0f172a] rounded-xl px-8 py-3 font-bold hover:bg-[#0ea5e9] transition-colors w-full md:w-auto">Calculate</button>
          <button onClick={clear} className="bg-white/5 text-white border border-white/10 rounded-xl px-8 py-3 font-bold hover:bg-white/10 transition-colors w-full md:w-auto">Clear</button>
        </div>
      </div>
    </motion.div>
  );
}
