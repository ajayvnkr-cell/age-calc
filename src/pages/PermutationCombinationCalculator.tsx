import { useState } from 'react';
import { motion } from 'motion/react';

export default function PermutationCombinationCalculator() {
  const [nStr, setNStr] = useState('6');
  const [rStr, setRStr] = useState('2');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const n = parseInt(nStr);
    const r = parseInt(rStr);

    if (isNaN(n) || isNaN(r) || n < 0 || r < 0) {
      setResult({ error: 'Please enter valid non-negative integers for n and r.' });
      return;
    }
    if (r > n) {
      setResult({ error: 'r cannot be greater than n.' });
      return;
    }

    let p = 1;
    for (let i = 0; i < r; i++) {
        p *= (n - i);
    }
    
    let factR = 1;
    for (let i = 1; i <= r; i++) {
        factR *= i;
    }

    const c = p / factR;

    setResult({
        n, r,
        p: p > Number.MAX_SAFE_INTEGER ? p.toExponential(4) : p,
        c: c > Number.MAX_SAFE_INTEGER ? c.toExponential(4) : c,
    });
  };

  const clear = () => {
    setNStr(''); setRStr(''); setResult(null);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto w-full space-y-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-4">Permutation & Combination</h1>
        <p className="text-[#94a3b8]">Compute the number of possible permutations and combinations.</p>
      </div>

      <div className="glass p-8">
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-[#94a3b8] mb-2">Total Amount in a Set (n)</label>
            <input type="number" value={nStr} onChange={(e) => setNStr(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#38bdf8]/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#94a3b8] mb-2">Amount in each Sub-Set (r)</label>
            <input type="number" value={rStr} onChange={(e) => setRStr(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#38bdf8]/50" />
          </div>
        </div>

        <div className="flex gap-4">
          <button onClick={calculate} className="flex-1 bg-[#38bdf8] text-[#0f172a] rounded-xl px-4 py-3 font-bold hover:bg-[#0ea5e9] transition-colors">Calculate</button>
          <button onClick={clear} className="flex-1 bg-white/5 text-white border border-white/10 rounded-xl px-4 py-3 font-bold hover:bg-white/10 transition-colors">Clear</button>
        </div>

        {result && (
            <div className="mt-8 bg-black/20 border border-white/10 rounded-xl p-6 space-y-4">
                {result.error ? (
                    <p className="text-red-400">{result.error}</p>
                ) : (
                    <>
                        <div className="flex items-center justify-between border-b border-white/5 pb-4">
                            <div>
                                <h3 className="text-lg font-bold text-white">Permutations</h3>
                                <p className="text-sm text-[#94a3b8]"><sub>{result.n}</sub>P<sub>{result.r}</sub></p>
                            </div>
                            <div className="text-2xl font-bold text-[#38bdf8]">{result.p}</div>
                        </div>
                        <div className="flex items-center justify-between pt-2">
                            <div>
                                <h3 className="text-lg font-bold text-white">Combinations</h3>
                                <p className="text-sm text-[#94a3b8]"><sub>{result.n}</sub>C<sub>{result.r}</sub></p>
                            </div>
                            <div className="text-2xl font-bold text-[#38bdf8]">{result.c}</div>
                        </div>
                    </>
                )}
            </div>
        )}
      </div>
    </motion.div>
  );
}
