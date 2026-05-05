import { useState } from 'react';
import { motion } from 'motion/react';

function normSInv(p: number) {
    if (p <= 0 || p >= 1) return NaN;
    const a1 = -39.6968302866538, a2 = 220.946098424521, a3 = -275.928510446969;
    const a4 = 138.357751867269, a5 = -30.6647980661472, a6 = 2.50662827745924;
    const b1 = -54.4760987982241, b2 = 161.585836858041, b3 = -155.698979859887;
    const b4 = 66.8013118877197, b5 = -13.2806815528857, c1 = -0.00778489400243029;
    const c2 = -0.322396458041136, c3 = -2.40075827716184, c4 = -2.54973253934373;
    const c5 = 4.37466414146497, c6 = 2.93816398269878, d1 = 0.00778469570904146;
    const d2 = 0.32246712907004, d3 = 2.445134137143, d4 = 3.75440866190742;
    const p_low = 0.02425, p_high = 1 - p_low;
    let q, r;

    if (p < p_low) {
        q = Math.sqrt(-2 * Math.log(p));
        return (((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) /
               ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
    }
    if (p <= p_high) {
        q = p - 0.5;
        r = q * q;
        return (((((a1 * r + a2) * r + a3) * r + a4) * r + a5) * r + a6) * q /
               (((((b1 * r + b2) * r + b3) * r + b4) * r + b5) * r + 1);
    }
    q = Math.sqrt(-2 * Math.log(1 - p));
    return -(((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) /
            ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
}

export default function ConfidenceIntervalCalculator() {
  const [size, setSize] = useState('50');
  const [mean, setMean] = useState('20.6');
  const [sd, setSd] = useState('3.2');
  const [cl, setCl] = useState('95');
  const [res, setRes] = useState<any>(null);

  const calculate = () => {
    const n = parseFloat(size);
    const m = parseFloat(mean);
    const s = parseFloat(sd);
    const c = parseFloat(cl);

    if (isNaN(n) || isNaN(m) || isNaN(s) || isNaN(c) || n <= 0 || s <= 0 || c <= 0 || c >= 100) {
      setRes({ error: 'Please enter valid inputs. Confidence Level must be between 0 and 100.' });
      return;
    }

    const z = normSInv(0.5 + (c / 100) / 2);
    const moe = z * (s / Math.sqrt(n));

    setRes({
      m: m.toFixed(5).replace(/\.?0+$/, ''),
      moe: moe.toFixed(5),
      lower: (m - moe).toFixed(5),
      upper: (m + moe).toFixed(5),
      z: z.toFixed(5),
      pct: ((moe / Math.abs(m)) * 100).toFixed(5)
    });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto w-full space-y-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-4">Confidence Interval Calculator</h1>
        <p className="text-[#94a3b8]">Compute the confidence interval or margin of error of a sample.</p>
      </div>

      <div className="glass p-8">
        <div className="grid sm:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-[#94a3b8] mb-2">Sample size (amount), n</label>
            <input type="number" value={size} onChange={(e) => setSize(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#38bdf8]/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#94a3b8] mb-2">Sample Mean (average), X̄</label>
            <input type="number" value={mean} onChange={(e) => setMean(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#38bdf8]/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#94a3b8] mb-2">Standard Deviation, σ or s</label>
            <input type="number" value={sd} onChange={(e) => setSd(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#38bdf8]/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#94a3b8] mb-2">Confidence Level (%)</label>
            <input type="number" value={cl} onChange={(e) => setCl(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#38bdf8]/50" />
          </div>
        </div>

        <div className="flex gap-4">
          <button onClick={calculate} className="flex-1 bg-[#38bdf8] text-[#0f172a] rounded-xl px-4 py-3 font-bold hover:bg-[#0ea5e9] transition-colors">Calculate</button>
          <button onClick={() => {setSize(''); setMean(''); setSd(''); setCl(''); setRes(null);}} className="flex-1 bg-white/5 text-white border border-white/10 rounded-xl px-4 py-3 font-bold hover:bg-white/10 transition-colors">Clear</button>
        </div>

        {res && (
          <div className="mt-8 bg-black/20 border border-white/10 rounded-xl p-6">
            {res.error ? <p className="text-red-400">{res.error}</p> : (
              <div className="space-y-6">
                <div className="text-center">
                    <div className="text-sm text-[#94a3b8] uppercase tracking-widest mb-2">Confidence Interval</div>
                    <div className="text-3xl font-bold text-[#38bdf8]">{res.m} ± {res.moe}</div>
                    <div className="text-sm text-[#94a3b8] mt-2">or {res.m} ± {res.pct}%</div>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
                    <div className="text-xs text-[#94a3b8] uppercase tracking-wider mb-1">Lower Bound</div>
                    <div className="text-xl font-bold text-white">{res.lower}</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
                    <div className="text-xs text-[#94a3b8] uppercase tracking-wider mb-1">Upper Bound</div>
                    <div className="text-xl font-bold text-white">{res.upper}</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
                    <div className="text-xs text-[#94a3b8] uppercase tracking-wider mb-1">Margin of Error</div>
                    <div className="text-xl font-bold text-white">{res.moe}</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
                    <div className="text-xs text-[#94a3b8] uppercase tracking-wider mb-1">Z Value</div>
                    <div className="text-xl font-bold text-white">{res.z}</div>
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
