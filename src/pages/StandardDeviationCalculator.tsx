import { useState } from 'react';
import { motion } from 'motion/react';

export default function StandardDeviationCalculator() {
  const [data, setData] = useState('10, 12, 23, 23, 16, 23, 21, 16');
  const [type, setType] = useState('population');
  const [result, setResult] = useState<{
    n: number;
    sum: number;
    mean: number;
    variance: number;
    stdDev: number;
    marginOfError: number;
    error?: string;
  } | null>(null);

  const calculate = () => {
    const nums = data.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
    if (nums.length === 0) {
      setResult({ error: 'Please enter valid numbers separated by commas.', n: 0, sum: 0, mean: 0, variance: 0, stdDev: 0, marginOfError: 0 });
      return;
    }

    const n = nums.length;
    const sum = nums.reduce((a, b) => a + b, 0);
    const mean = sum / n;
    
    const sumSqDiff = nums.reduce((a, b) => a + Math.pow(b - mean, 2), 0);
    
    let variance = 0;
    
    if (type === 'population') {
      variance = sumSqDiff / n;
    } else {
      if (n <= 1) {
        setResult({ error: 'Sample calculation requires at least 2 numbers.', n: 0, sum: 0, mean: 0, variance: 0, stdDev: 0, marginOfError: 0 });
        return;
      }
      variance = sumSqDiff / (n - 1);
    }
    
    const stdDev = Math.sqrt(variance);
    const marginOfError = 1.96 * (stdDev / Math.sqrt(n)); // 95% CI Margin of Error

    setResult({
      n,
      sum,
      mean,
      variance,
      stdDev,
      marginOfError
    });
  };

  const clear = () => {
    setData('');
    setResult(null);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto w-full space-y-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-4">Standard Deviation Calculator</h1>
        <p className="text-[#94a3b8]">Computes the standard deviation, variance, mean, sum, and error margin.</p>
      </div>

      <div className="glass p-8">
        <div className="mb-6">
          <label className="block text-sm font-medium text-[#94a3b8] mb-2 uppercase tracking-wider">Data Set (Comma Separated)</label>
          <textarea 
            value={data} 
            onChange={(e) => setData(e.target.value)}
            className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-[#38bdf8]/50 min-h-[100px] resize-y"
            placeholder="e.g. 10, 12, 23, 23, 16, 23, 21, 16"
          ></textarea>
        </div>

        <div className="flex items-center gap-6 mb-8 text-[#94a3b8]">
          <span className="text-sm font-medium uppercase tracking-wider">It is a:</span>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="type" value="population" checked={type === 'population'} onChange={(e) => setType(e.target.value)} className="text-[#38bdf8] focus:ring-[#38bdf8] bg-black/20 border-white/10" />
            <span>Population</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="type" value="sample" checked={type === 'sample'} onChange={(e) => setType(e.target.value)} className="text-[#38bdf8] focus:ring-[#38bdf8] bg-black/20 border-white/10" />
            <span>Sample</span>
          </label>
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
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-black/20 p-4 rounded-lg border border-white/5">
                  <div className="text-xs text-[#94a3b8] uppercase tracking-wider mb-1">Standard Deviation</div>
                  <div className="text-2xl font-bold text-[#38bdf8]">{result.stdDev.toPrecision(6)}</div>
                </div>
                <div className="bg-black/20 p-4 rounded-lg border border-white/5">
                  <div className="text-xs text-[#94a3b8] uppercase tracking-wider mb-1">Variance</div>
                  <div className="text-2xl font-bold text-white">{result.variance.toPrecision(6)}</div>
                </div>
                <div className="bg-black/20 p-4 rounded-lg border border-white/5">
                  <div className="text-xs text-[#94a3b8] uppercase tracking-wider mb-1">Mean</div>
                  <div className="text-xl font-medium text-white">{result.mean.toPrecision(6)}</div>
                </div>
                <div className="bg-black/20 p-4 rounded-lg border border-white/5">
                  <div className="text-xs text-[#94a3b8] uppercase tracking-wider mb-1">Sum</div>
                  <div className="text-xl font-medium text-white">{result.sum.toPrecision(6)}</div>
                </div>
                <div className="bg-black/20 p-4 rounded-lg border border-white/5">
                  <div className="text-xs text-[#94a3b8] uppercase tracking-wider mb-1">Count</div>
                  <div className="text-xl font-medium text-white">{result.n}</div>
                </div>
                <div className="bg-black/20 p-4 rounded-lg border border-white/5">
                  <div className="text-xs text-[#94a3b8] uppercase tracking-wider mb-1">Margin of Error (95%)</div>
                  <div className="text-xl font-medium text-white">±{result.marginOfError.toPrecision(6)}</div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
