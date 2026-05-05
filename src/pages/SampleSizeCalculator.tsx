import { useState } from 'react';
import { motion } from 'motion/react';

export default function SampleSizeCalculator() {
  const zScores: Record<string, number> = {
    '70': 1.036,
    '75': 1.150,
    '80': 1.282,
    '85': 1.440,
    '90': 1.645,
    '95': 1.960,
    '98': 2.326,
    '99': 2.576,
    '99.9': 3.291,
    '99.99': 3.891,
    '99.999': 4.417
  };

  // Find Sample Size
  const [ssConf, setSsConf] = useState('95');
  const [ssMargin, setSsMargin] = useState('5');
  const [ssProp, setSsProp] = useState('50');
  const [ssPop, setSsPop] = useState('');
  const [sampleSizeRes, setSampleSizeRes] = useState<string | null>(null);

  const calcSampleSize = () => {
    const z = zScores[ssConf];
    const e = parseFloat(ssMargin) / 100;
    const p = parseFloat(ssProp) / 100;
    const n = parseFloat(ssPop);
    
    if (isNaN(e) || isNaN(p) || e <= 0 || p <= 0 || p >= 1) {
      setSampleSizeRes('Invalid input');
      return;
    }

    let result = (Math.pow(z, 2) * p * (1 - p)) / Math.pow(e, 2);
    
    if (!isNaN(n) && n > 0 && String(ssPop).trim() !== '') {
      result = (n * result) / (n + result - 1);
    }
    
    setSampleSizeRes(String(Math.ceil(result)));
  };

  // Find Margin of Error
  const [meConf, setMeConf] = useState('95');
  const [meSample, setMeSample] = useState('100');
  const [meProp, setMeProp] = useState('60');
  const [mePop, setMePop] = useState('');
  const [marginErrorRes, setMarginErrorRes] = useState<string | null>(null);

  const calcMarginOfError = () => {
    const z = zScores[meConf];
    const s = parseFloat(meSample);
    const p = parseFloat(meProp) / 100;
    const n = parseFloat(mePop);

    if (isNaN(s) || isNaN(p) || s <= 0 || p <= 0 || p >= 1) {
      setMarginErrorRes('Invalid input');
      return;
    }

    let result = z * Math.sqrt((p * (1 - p)) / s);

    if (!isNaN(n) && n > 0 && String(mePop).trim() !== '') {
      // Finite population correction
      result *= Math.sqrt((n - s) / (n - 1));
    }

    setMarginErrorRes((result * 100).toFixed(4) + '%');
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto w-full space-y-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-4">Sample Size Calculator</h1>
        <p className="text-[#94a3b8]">Determine the sample size or margin of error for statistical research.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Find Sample Size */}
        <div className="glass p-8 flex flex-col">
          <h2 className="text-xl font-bold text-white mb-6 text-center">Find Out The Sample Size</h2>
          
          <div className="space-y-4 mb-6 flex-1">
            <div className="flex flex-col gap-1">
              <label className="text-sm text-[#94a3b8]">Confidence Level (%)</label>
              <select value={ssConf} onChange={e => setSsConf(e.target.value)} className="bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white outline-none focus:border-[#38bdf8]/50">
                {Object.keys(zScores).map(k => <option key={k} value={k}>{k}%</option>)}
              </select>
            </div>
            
            <div className="flex flex-col gap-1">
              <label className="text-sm text-[#94a3b8]">Margin of Error (%)</label>
              <input type="number" value={ssMargin} onChange={e => setSsMargin(e.target.value)} className="bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white outline-none focus:border-[#38bdf8]/50" />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm text-[#94a3b8]">Population Proportion (%)</label>
              <input type="number" value={ssProp} onChange={e => setSsProp(e.target.value)} className="bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white outline-none focus:border-[#38bdf8]/50" placeholder="Use 50 if not sure" />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm text-[#94a3b8]">Population Size</label>
              <input type="number" value={ssPop} onChange={e => setSsPop(e.target.value)} className="bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white outline-none focus:border-[#38bdf8]/50" placeholder="Leave blank if unlimited" />
            </div>
          </div>

          <button onClick={calcSampleSize} className="w-full bg-[#38bdf8] text-[#0f172a] rounded-xl px-4 py-3 font-bold hover:bg-[#0ea5e9] transition-colors mb-6">Calculate Sample Size</button>
          
          {sampleSizeRes && (
            <div className="mt-auto bg-white/5 border border-[#38bdf8]/30 rounded-xl p-6 text-center">
              <div className="text-[#94a3b8] uppercase text-xs font-bold mb-2 tracking-wider">Required Sample Size</div>
              <div className="text-4xl font-bold text-[#38bdf8]">{sampleSizeRes}</div>
            </div>
          )}
        </div>

        {/* Find Margin of Error */}
        <div className="glass p-8 flex flex-col">
          <h2 className="text-xl font-bold text-white mb-6 text-center">Find Out the Margin of Error</h2>
          
          <div className="space-y-4 mb-6 flex-1">
            <div className="flex flex-col gap-1">
              <label className="text-sm text-[#94a3b8]">Confidence Level (%)</label>
              <select value={meConf} onChange={e => setMeConf(e.target.value)} className="bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white outline-none focus:border-[#38bdf8]/50">
                {Object.keys(zScores).map(k => <option key={k} value={k}>{k}%</option>)}
              </select>
            </div>
            
            <div className="flex flex-col gap-1">
              <label className="text-sm text-[#94a3b8]">Sample Size</label>
              <input type="number" value={meSample} onChange={e => setMeSample(e.target.value)} className="bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white outline-none focus:border-[#38bdf8]/50" />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm text-[#94a3b8]">Population Proportion (%)</label>
              <input type="number" value={meProp} onChange={e => setMeProp(e.target.value)} className="bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white outline-none focus:border-[#38bdf8]/50" />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm text-[#94a3b8]">Population Size</label>
              <input type="number" value={mePop} onChange={e => setMePop(e.target.value)} className="bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white outline-none focus:border-[#38bdf8]/50" placeholder="Leave blank if unlimited" />
            </div>
          </div>

          <button onClick={calcMarginOfError} className="w-full bg-[#38bdf8] text-[#0f172a] rounded-xl px-4 py-3 font-bold hover:bg-[#0ea5e9] transition-colors mb-6">Calculate Margin of Error</button>
          
          {marginErrorRes && (
            <div className="mt-auto bg-white/5 border border-[#38bdf8]/30 rounded-xl p-6 text-center">
              <div className="text-[#94a3b8] uppercase text-xs font-bold mb-2 tracking-wider">Margin of Error</div>
              <div className="text-4xl font-bold text-[#38bdf8]">±{marginErrorRes}</div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
