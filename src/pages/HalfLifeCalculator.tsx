import { useState } from 'react';
import { motion } from 'motion/react';

export default function HalfLifeCalculator() {
  const [nt, setNt] = useState('10');
  const [n0, setN0] = useState('100');
  const [t, setT] = useState('50');
  const [t12, setT12] = useState('');

  const calc1 = () => {
    let _nt = parseFloat(nt);
    let _n0 = parseFloat(n0);
    let _t = parseFloat(t);
    let _t12 = parseFloat(t12);

    const isNt = !isNaN(_nt) && nt !== '';
    const isN0 = !isNaN(_n0) && n0 !== '';
    const isT = !isNaN(_t) && t !== '';
    const isT12 = !isNaN(_t12) && t12 !== '';

    if (!isT12 && isNt && isN0 && isT) {
      // Nt = N0 * (0.5)^(t / t1/2)
      // Nt/N0 = 0.5^(t / t1/2)
      // ln(Nt/N0) = (t / t1/2) * ln(0.5)
      // t1/2 = t * ln(0.5) / ln(Nt/N0)
      if (_nt > 0 && _n0 > 0) {
        setT12(String(_t * Math.log(0.5) / Math.log(_nt / _n0)));
      }
    } else if (!isT && isNt && isN0 && isT12) {
      if (_nt > 0 && _n0 > 0) {
        setT(String(_t12 * Math.log(_nt / _n0) / Math.log(0.5)));
      }
    } else if (!isN0 && isNt && isT && isT12) {
      setN0(String(_nt / Math.pow(0.5, _t / _t12)));
    } else if (!isNt && isN0 && isT && isT12) {
      setNt(String(_n0 * Math.pow(0.5, _t / _t12)));
    }
  };

  const clear1 = () => {
    setNt(''); setN0(''); setT(''); setT12('');
  };

  const [tHalf, setTHalf] = useState('');
  const [tau, setTau] = useState('');
  const [lambda, setLambda] = useState('');

  const calc2 = () => {
    const _tHalf = parseFloat(tHalf);
    const _tau = parseFloat(tau);
    const _lambda = parseFloat(lambda);

    const isTHalf = !isNaN(_tHalf) && tHalf !== '';
    const isTau = !isNaN(_tau) && tau !== '';
    const isLambda = !isNaN(_lambda) && lambda !== '';

    if (isTHalf) {
      setTau(String(_tHalf / Math.LN2));
      setLambda(String(Math.LN2 / _tHalf));
    } else if (isTau) {
      setTHalf(String(_tau * Math.LN2));
      setLambda(String(1 / _tau));
    } else if (isLambda) {
      setTHalf(String(Math.LN2 / _lambda));
      setTau(String(1 / _lambda));
    }
  };

  const clear2 = () => {
    setTHalf(''); setTau(''); setLambda('');
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto w-full space-y-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-4">Half-Life Calculator</h1>
        <p className="text-[#94a3b8]">Computes any of the values in the half-life formula given the rest values.</p>
      </div>

      <div className="glass p-8">
        <h2 className="text-xl font-bold text-white mb-6">Half-Life Equation</h2>
        <p className="text-[#94a3b8] mb-6 text-sm">Please provide any three of the following to calculate the fourth value.</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-xs text-center text-[#94a3b8] mb-2">quantity remains (N<sub>t</sub>)</label>
            <input type="number" value={nt} onChange={e => setNt(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl px-3 py-2 text-center text-white outline-none focus:border-[#38bdf8]/50" />
          </div>
          <div>
            <label className="block text-xs text-center text-[#94a3b8] mb-2">initial quantity (N<sub>0</sub>)</label>
            <input type="number" value={n0} onChange={e => setN0(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl px-3 py-2 text-center text-white outline-none focus:border-[#38bdf8]/50" />
          </div>
          <div>
            <label className="block text-xs text-center text-[#94a3b8] mb-2">time (t)</label>
            <input type="number" value={t} onChange={e => setT(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl px-3 py-2 text-center text-white outline-none focus:border-[#38bdf8]/50" />
          </div>
          <div>
            <label className="block text-xs text-center text-[#94a3b8] mb-2">half-life (t<sub>1/2</sub>)</label>
            <input type="number" value={t12} onChange={e => setT12(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl px-3 py-2 text-center text-white outline-none focus:border-[#38bdf8]/50" />
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <button onClick={calc1} className="bg-[#38bdf8] text-[#0f172a] rounded-xl px-8 py-2.5 font-bold hover:bg-[#0ea5e9] transition-colors">Calculate</button>
          <button onClick={clear1} className="bg-white/5 text-white border border-white/10 rounded-xl px-8 py-2.5 font-bold hover:bg-white/10 transition-colors">Clear</button>
        </div>
      </div>

      <div className="glass p-8">
        <h2 className="text-xl font-bold text-white mb-6">Half-Life Constants Conversion</h2>
        <p className="text-[#94a3b8] mb-6 text-sm">Please provide any one of the following to get the other two.</p>
        
        <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
          <div className="flex-1 w-full relative">
            <label className="block text-xs text-center text-[#94a3b8] mb-2">half-life (t<sub>1/2</sub>)</label>
            <input type="number" value={tHalf} onChange={e => setTHalf(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl px-3 py-2 text-center text-white outline-none focus:border-[#38bdf8]/50" />
          </div>
          <div className="text-xl text-white font-bold hidden md:block pt-6">=</div>
          <div className="flex-1 w-full">
            <label className="block text-xs text-center text-[#94a3b8] mb-2">mean lifetime (τ)</label>
            <input type="number" value={tau} onChange={e => setTau(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl px-3 py-2 text-center text-white outline-none focus:border-[#38bdf8]/50" />
          </div>
          <div className="text-xl text-white font-bold hidden md:block pt-6">=</div>
          <div className="flex-1 w-full">
            <label className="block text-xs text-center text-[#94a3b8] mb-2">decay constant (λ)</label>
            <input type="number" value={lambda} onChange={e => setLambda(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl px-3 py-2 text-center text-white outline-none focus:border-[#38bdf8]/50" />
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <button onClick={calc2} className="bg-[#38bdf8] text-[#0f172a] rounded-xl px-8 py-2.5 font-bold hover:bg-[#0ea5e9] transition-colors">Calculate</button>
          <button onClick={clear2} className="bg-white/5 text-white border border-white/10 rounded-xl px-8 py-2.5 font-bold hover:bg-white/10 transition-colors">Clear</button>
        </div>
      </div>
    </motion.div>
  );
}
