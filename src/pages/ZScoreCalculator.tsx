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

function cdf(z: number) {
    let x = z / Math.sqrt(2);
    const sign = (x >= 0) ? 1 : -1;
    x = Math.abs(x);
    const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741;
    const a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911;
    const t = 1.0 / (1.0 + p * x);
    const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
    return 0.5 * (1.0 + sign * y);
}

export default function ZScoreCalculator() {
  const [raw, setRaw] = useState('5');
  const [mean, setMean] = useState('3');
  const [sd, setSd] = useState('2');
  const [resZ, setResZ] = useState<string | null>(null);

  const calcZ = () => {
    const x = parseFloat(raw); const m = parseFloat(mean); const s = parseFloat(sd);
    if (isNaN(x) || isNaN(m) || isNaN(s) || s <= 0) return setResZ('Invalid inputs');
    setResZ(((x - m) / s).toFixed(5));
  };

  const [cFields, setCFields] = useState<Record<string, string>>({
    z: '2', pLtZ: '', pGtZ: '', p0toZ: '', pInZ: '', pOutZ: ''
  });
  const [resConv, setResConv] = useState<Record<string, string> | null>(null);

  const calcConv = () => {
    let zVal: number | null = null;
    if (cFields.z) zVal = parseFloat(cFields.z);
    else if (cFields.pLtZ) zVal = normSInv(parseFloat(cFields.pLtZ));
    else if (cFields.pGtZ) zVal = normSInv(1 - parseFloat(cFields.pGtZ));
    else if (cFields.p0toZ) {
      let p = parseFloat(cFields.p0toZ);
      zVal = normSInv(p + 0.5);
    }
    else if (cFields.pInZ) {
      zVal = normSInv(0.5 + parseFloat(cFields.pInZ)/2);
    }
    else if (cFields.pOutZ) {
      zVal = normSInv(1 - parseFloat(cFields.pOutZ)/2);
    }

    if (zVal === null || isNaN(zVal)) {
      setResConv({ error: 'Please provide at least one valid value.' });
      return;
    }

    const pLtZ = cdf(zVal);
    const pGtZ = 1 - pLtZ;
    const p0toZ = Math.abs(pLtZ - 0.5);
    const pInZ = 2 * p0toZ;
    const pOutZ = 1 - pInZ;

    setResConv({
      z: Math.abs(zVal) < 1e-9 ? '0' : zVal.toFixed(5),
      pLtZ: pLtZ.toFixed(5),
      pGtZ: pGtZ.toFixed(5),
      p0toZ: p0toZ.toFixed(5),
      pInZ: pInZ.toFixed(5),
      pOutZ: pOutZ.toFixed(5)
    });
  };

  const [z1, setZ1] = useState('-1');
  const [z2, setZ2] = useState('0');
  const [resRange, setResRange] = useState<string | null>(null);

  const calcRange = () => {
    const a = parseFloat(z1); const b = parseFloat(z2);
    if (isNaN(a) || isNaN(b)) return setResRange('Invalid inputs');
    const p1 = cdf(a); const p2 = cdf(b);
    setResRange(Math.abs(p2 - p1).toFixed(5));
  };


  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto w-full space-y-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-4">Z-score Calculator</h1>
        <p className="text-[#94a3b8]">Convert between z-score and probability, compute raw scores, and ranges.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="glass p-8">
          <h2 className="text-xl font-bold text-white mb-4">Find Z-score from Raw Score</h2>
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm text-[#94a3b8] mb-1">Raw Score, x</label>
              <input type="number" value={raw} onChange={e => setRaw(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl p-2 text-white" />
            </div>
            <div>
              <label className="block text-sm text-[#94a3b8] mb-1">Population Mean, μ</label>
              <input type="number" value={mean} onChange={e => setMean(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl p-2 text-white" />
            </div>
            <div>
              <label className="block text-sm text-[#94a3b8] mb-1">Standard Deviation, σ</label>
              <input type="number" value={sd} onChange={e => setSd(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl p-2 text-white" />
            </div>
          </div>
          <div className="flex gap-4 mb-4">
            <button onClick={calcZ} className="flex-1 bg-[#38bdf8] text-[#0f172a] rounded-xl py-2 font-bold hover:bg-[#0ea5e9]">Calculate</button>
            <button onClick={() => {setRaw(''); setMean(''); setSd(''); setResZ(null);}} className="flex-1 bg-white/5 text-white border border-white/10 rounded-xl py-2 font-bold hover:bg-white/10">Clear</button>
          </div>
          {resZ && <div className="text-center text-2xl font-bold text-[#38bdf8]">Z-score = {resZ}</div>}
        </div>

        <div className="glass p-8 flex flex-col">
          <h2 className="text-xl font-bold text-white mb-4">Probability between Two Z-scores</h2>
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm text-[#94a3b8] mb-1">Left Bound, Z₁</label>
              <input type="number" value={z1} onChange={e => setZ1(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl p-2 text-white" />
            </div>
            <div>
              <label className="block text-sm text-[#94a3b8] mb-1">Right Bound, Z₂</label>
              <input type="number" value={z2} onChange={e => setZ2(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl p-2 text-white" />
            </div>
          </div>
          <div className="flex gap-4 mb-4 mt-auto">
            <button onClick={calcRange} className="flex-1 bg-[#38bdf8] text-[#0f172a] rounded-xl py-2 font-bold hover:bg-[#0ea5e9]">Calculate</button>
            <button onClick={() => {setZ1(''); setZ2(''); setResRange(null);}} className="flex-1 bg-white/5 text-white border border-white/10 rounded-xl py-2 font-bold hover:bg-white/10">Clear</button>
          </div>
          {resRange && <div className="text-center text-2xl font-bold text-[#38bdf8] mt-4">Probability = {resRange}</div>}
        </div>
      </div>

      <div className="glass p-8">
        <h2 className="text-xl font-bold text-white mb-2">Z-score and Probability Converter</h2>
        <p className="text-sm text-[#94a3b8] mb-6">Provide any one value to convert between the others.</p>
        
        {resConv?.error && <p className="text-red-400 mb-4">{resConv.error}</p>}
        
        <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 mb-6">
          {[
            { id: 'z', label: 'Z-score, Z' },
            { id: 'pLtZ', label: 'Probability, P(x < Z)' },
            { id: 'pGtZ', label: 'Probability, P(x > Z)' },
            { id: 'p0toZ', label: 'Probability, P(0 to Z or Z to 0)' },
            { id: 'pInZ', label: 'Probability, P(-Z < x < Z)' },
            { id: 'pOutZ', label: 'Probability, P(x < -Z or x > Z)' },
          ].map(f => (
            <div key={f.id} className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-2">
              <label className="text-sm text-[#94a3b8] mb-1 sm:mb-0">{f.label}</label>
              <input 
                type="text" 
                value={resConv && !resConv.error ? resConv[f.id] : cFields[f.id]} 
                onChange={e => {
                    if (resConv) {
                      setCFields({ z: '', pLtZ: '', pGtZ: '', p0toZ: '', pInZ: '', pOutZ: '', [f.id]: e.target.value });
                      setResConv(null);
                    } else {
                      setCFields(prev => ({ ...prev, [f.id]: e.target.value }));
                    }
                }} 
                className={`w-full sm:w-32 bg-black/20 border border-white/10 rounded-lg px-2 py-1 text-right outline-none focus:border-[#38bdf8]/50 ${resConv && !resConv.error ? 'text-[#38bdf8] font-bold' : 'text-white'}`} 
                readOnly={!!resConv && !resConv.error}
              />
            </div>
          ))}
        </div>

        <div className="flex gap-4">
          {(!resConv || resConv.error) ? (
            <button onClick={calcConv} className="bg-[#38bdf8] text-[#0f172a] rounded-xl px-8 py-2 font-bold hover:bg-[#0ea5e9]">Calculate</button>
          ) : (
            <button onClick={() => {setCFields({z: '', pLtZ: '', pGtZ: '', p0toZ: '', pInZ: '', pOutZ: ''}); setResConv(null);}} className="bg-white/5 text-white border border-white/10 rounded-xl px-8 py-2 font-bold hover:bg-white/10">Clear</button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
