import { useState } from 'react';
import { motion } from 'motion/react';

export default function StatisticsCalculator() {
  const [data, setData] = useState('10, 2, 38, 23, 38, 23, 21, 23');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const nums = data.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
    if (nums.length === 0) {
      setResult({ error: 'Please enter valid numbers separated by commas.' });
      return;
    }

    const n = nums.length;
    const sum = nums.reduce((a, b) => a + b, 0);
    const sumSq = nums.reduce((a, b) => a + b * b, 0);
    const mean = sum / n;

    // Geometric Mean
    const product = nums.reduce((a, b) => a * b, 1);
    const geoMean = nums.every(x => x > 0) ? Math.pow(product, 1 / n) : NaN;

    const sorted = [...nums].sort((a, b) => a - b);
    const min = sorted[0];
    const max = sorted[n - 1];
    const range = max - min;

    const mid = Math.floor(n / 2);
    const median = n % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;

    const counts: Record<number, number> = {};
    let maxCount = 0;
    nums.forEach(num => {
      counts[num] = (counts[num] || 0) + 1;
      if (counts[num] > maxCount) maxCount = counts[num];
    });

    const modes = Object.keys(counts).filter(k => counts[parseFloat(k)] === maxCount).map(k => parseFloat(k));
    const modeStr = modes.length === n ? 'None' : modes.join(', ');

    const sumSqDiff = nums.reduce((a, b) => a + Math.pow(b - mean, 2), 0);
    const popVar = sumSqDiff / n;
    const popStd = Math.sqrt(popVar);
    
    const sampleVar = n > 1 ? sumSqDiff / (n - 1) : 0;
    const sampleStd = n > 1 ? Math.sqrt(sampleVar) : 0;

    setResult({
      n, sum, sumSq, mean, geoMean, min, max, range, median, modeStr, popVar, popStd, sampleVar, sampleStd
    });
  };

  const clear = () => {
    setData('');
    setResult(null);
  };

  const toFixedIfNec = (num: number, digits: number = 6) => {
    if (isNaN(num)) return 'NaN';
    return Number.isInteger(num) ? String(num) : num.toPrecision(digits);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto w-full space-y-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-4">Statistics Calculator</h1>
        <p className="text-[#94a3b8]">Computes statistical values such as mean, standard deviation, and geometric mean.</p>
      </div>

      <div className="glass p-8">
        <div className="mb-6">
          <label className="block text-sm font-medium text-[#94a3b8] mb-2 uppercase tracking-wider">Provide Values Separated by Comma</label>
          <textarea 
            value={data} 
            onChange={(e) => setData(e.target.value)}
            className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-[#38bdf8]/50 min-h-[120px] resize-y"
            placeholder="e.g. 10, 2, 38, 23, 38, 23, 21, 23"
          ></textarea>
        </div>

        <div className="flex gap-4 mb-8">
          <button onClick={calculate} className="bg-[#38bdf8] text-[#0f172a] rounded-xl px-8 py-3 font-bold hover:bg-[#0ea5e9] transition-colors w-full sm:w-auto">Calculate</button>
          <button onClick={clear} className="bg-white/5 text-white border border-white/10 rounded-xl px-8 py-3 font-bold hover:bg-white/10 transition-colors w-full sm:w-auto">Clear</button>
        </div>

        {result && (
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            {result.error ? (
              <div className="text-red-400 text-center">{result.error}</div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-black/20 p-4 rounded-lg border border-white/5">
                  <div className="text-xs text-[#94a3b8] uppercase tracking-wider mb-1">Count (N)</div>
                  <div className="text-xl font-bold text-white">{result.n}</div>
                </div>
                <div className="bg-black/20 p-4 rounded-lg border border-white/5">
                  <div className="text-xs text-[#94a3b8] uppercase tracking-wider mb-1">Sum (Σx)</div>
                  <div className="text-xl font-bold text-white">{toFixedIfNec(result.sum)}</div>
                </div>
                <div className="bg-black/20 p-4 rounded-lg border border-white/5">
                  <div className="text-xs text-[#94a3b8] uppercase tracking-wider mb-1">Mean (μ or x̄)</div>
                  <div className="text-xl font-bold text-[#38bdf8]">{toFixedIfNec(result.mean)}</div>
                </div>
                <div className="bg-black/20 p-4 rounded-lg border border-white/5">
                  <div className="text-xs text-[#94a3b8] uppercase tracking-wider mb-1">Median</div>
                  <div className="text-xl font-bold text-[#38bdf8]">{toFixedIfNec(result.median)}</div>
                </div>
                <div className="bg-black/20 p-4 rounded-lg border border-white/5">
                  <div className="text-xs text-[#94a3b8] uppercase tracking-wider mb-1">Mode</div>
                  <div className="text-xl font-bold text-[#38bdf8] truncate" title={result.modeStr}>{result.modeStr}</div>
                </div>
                <div className="bg-black/20 p-4 rounded-lg border border-white/5">
                  <div className="text-xs text-[#94a3b8] uppercase tracking-wider mb-1">Largest</div>
                  <div className="text-xl font-bold text-white">{toFixedIfNec(result.max)}</div>
                </div>
                <div className="bg-black/20 p-4 rounded-lg border border-white/5">
                  <div className="text-xs text-[#94a3b8] uppercase tracking-wider mb-1">Smallest</div>
                  <div className="text-xl font-bold text-white">{toFixedIfNec(result.min)}</div>
                </div>
                <div className="bg-black/20 p-4 rounded-lg border border-white/5">
                  <div className="text-xs text-[#94a3b8] uppercase tracking-wider mb-1">Range</div>
                  <div className="text-xl font-bold text-white">{toFixedIfNec(result.range)}</div>
                </div>
                <div className="bg-black/20 p-4 rounded-lg border border-white/5">
                  <div className="text-xs text-[#94a3b8] uppercase tracking-wider mb-1">Geometric Mean</div>
                  <div className="text-xl font-bold text-white">{toFixedIfNec(result.geoMean)}</div>
                </div>
                <div className="bg-black/20 p-4 rounded-lg border border-white/5">
                  <div className="text-xs text-[#94a3b8] uppercase tracking-wider mb-1">Sample Std Dev (s)</div>
                  <div className="text-xl font-bold text-white">{toFixedIfNec(result.sampleStd)}</div>
                </div>
                <div className="bg-black/20 p-4 rounded-lg border border-white/5">
                  <div className="text-xs text-[#94a3b8] uppercase tracking-wider mb-1">Sample Variance (s²)</div>
                  <div className="text-xl font-bold text-white">{toFixedIfNec(result.sampleVar)}</div>
                </div>
                <div className="bg-black/20 p-4 rounded-lg border border-white/5">
                  <div className="text-xs text-[#94a3b8] uppercase tracking-wider mb-1">Pop Std Dev (σ)</div>
                  <div className="text-xl font-bold text-white">{toFixedIfNec(result.popStd)}</div>
                </div>
                <div className="bg-black/20 p-4 rounded-lg border border-white/5">
                  <div className="text-xs text-[#94a3b8] uppercase tracking-wider mb-1">Pop Variance (σ²)</div>
                  <div className="text-xl font-bold text-white">{toFixedIfNec(result.popVar)}</div>
                </div>
                <div className="bg-black/20 p-4 rounded-lg border border-white/5">
                  <div className="text-xs text-[#94a3b8] uppercase tracking-wider mb-1">Sum of Squares (Σx²)</div>
                  <div className="text-xl font-bold text-white">{toFixedIfNec(result.sumSq)}</div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
