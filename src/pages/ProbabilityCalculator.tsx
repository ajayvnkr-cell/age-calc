import { useState } from 'react';
import { motion } from 'motion/react';

function erf(x: number) {
  const sign = x >= 0 ? 1 : -1;
  x = Math.abs(x);
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;
  const t = 1.0 / (1.0 + p * x);
  const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
  return sign * y;
}

function cdf(x: number, mean: number, std: number) {
  if (x === Infinity) return 1;
  if (x === -Infinity) return 0;
  return 0.5 * (1 + erf((x - mean) / (Math.sqrt(2) * std)));
}

function formatProb(p: number) {
  if (p === 0) return '0';
  if (p === 1) return '1';
  if (p < 0.0001 || p > 0.9999) return p.toExponential(4);
  return p.toFixed(4);
}

export default function ProbabilityCalculator() {
  const [fields, setFields] = useState<Record<string, string>>({
    A: '0.5', B: '0.4', notA: '', notB: '', and: '', or: '', xor: '', neither: ''
  });
  const [resTwo, setResTwo] = useState<Record<string, string> | null>(null);
  const [errTwo, setErrTwo] = useState<string | null>(null);

  const handleFieldChange = (k: string, v: string) => {
    setFields(prev => ({ ...prev, [k]: v }));
  };

  const calcTwo = () => {
    const vals: Record<string, number | null> = {};
    let count = 0;
    for (const key of Object.keys(fields)) {
      if (fields[key].trim() !== '') {
        const num = parseFloat(fields[key]);
        if (!isNaN(num) && num >= 0 && num <= 1) {
          vals[key] = num;
          count++;
        } else {
          setErrTwo('Probabilities must be between 0 and 1');
          return;
        }
      } else {
        vals[key] = null;
      }
    }

    if (count < 2) {
      setErrTwo('Please provide at least 2 values to calculate the rest.');
      return;
    }

    let A: number | null = vals.A ?? (vals.notA !== null ? 1 - vals.notA : null);
    let B: number | null = vals.B ?? (vals.notB !== null ? 1 - vals.notB : null);

    const AND = vals.and;
    const OR = vals.or ?? (vals.neither !== null ? 1 - vals.neither : null);
    const XOR = vals.xor;

    if (A === null || B === null) {
      if (A !== null) {
        if (AND !== null) B = AND / A;
        else if (OR !== null) B = (OR - A) / (1 - A);
        else if (XOR !== null) B = (XOR - A) / (1 - 2 * A);
      } else if (B !== null) {
        if (AND !== null) A = AND / B;
        else if (OR !== null) A = (OR - B) / (1 - B);
        else if (XOR !== null) A = (XOR - B) / (1 - 2 * B);
      } else {
        let andVal = AND;
        let orVal = OR;
        if (XOR !== null) {
          if (andVal !== null && orVal === null) orVal = XOR + andVal;
          else if (orVal !== null && andVal === null) andVal = orVal - XOR;
        }
        if (andVal !== null && orVal !== null) {
          const sum = orVal + andVal;
          const product = andVal;
          const desc = sum * sum - 4 * product;
          if (desc >= -1e-9) {
            A = (sum + Math.sqrt(Math.max(0, desc))) / 2;
            B = (sum - Math.sqrt(Math.max(0, desc))) / 2;
          }
        }
      }
    }

    if (A !== null && B !== null && !isNaN(A) && !isNaN(B) && A >= -1e-9 && A <= 1.000000001 && B >= -1e-9 && B <= 1.000000001) {
      A = Math.max(0, Math.min(1, A));
      B = Math.max(0, Math.min(1, B));
      setErrTwo(null);
      setResTwo({
        A: formatProb(A),
        B: formatProb(B),
        notA: formatProb(1 - A),
        notB: formatProb(1 - B),
        and: formatProb(A * B),
        or: formatProb(A + B - A * B),
        xor: formatProb(A + B - 2 * A * B),
        neither: formatProb((1 - A) * (1 - B))
      });
    } else {
      setErrTwo('Cannot solve with given values or values are inconsistent.');
      setResTwo(null);
    }
  };

  const clearTwo = () => {
    setFields({ A: '', B: '', notA: '', notB: '', and: '', or: '', xor: '', neither: '' });
    setResTwo(null);
    setErrTwo(null);
  };

  // Series
  const [psA, setPsA] = useState('0.6');
  const [psB, setPsB] = useState('0.3');
  const [psRepA, setPsRepA] = useState('5');
  const [psRepB, setPsRepB] = useState('3');
  const [resSeries, setResSeries] = useState<Record<string, string> | null>(null);

  const calcSeries = () => {
    const pa = parseFloat(psA); const pb = parseFloat(psB);
    const ra = parseInt(psRepA); const rb = parseInt(psRepB);
    if ([pa, pb, ra, rb].some(isNaN) || pa < 0 || pa > 1 || pb < 0 || pb > 1 || ra < 0 || rb < 0) {
      return;
    }
    
    setResSeries({
      aAlways: formatProb(Math.pow(pa, ra)),
      aNever: formatProb(Math.pow(1 - pa, ra)),
      aAtLeastOnce: formatProb(1 - Math.pow(1 - pa, ra)),
      bAlways: formatProb(Math.pow(pb, rb)),
      bNever: formatProb(Math.pow(1 - pb, rb)),
      bAtLeastOnce: formatProb(1 - Math.pow(1 - pb, rb)),
    });
  };
  
  const clearSeries = () => {
    setPsA(''); setPsB(''); setPsRepA(''); setPsRepB('');
    setResSeries(null);
  }

  // Normal Distribution
  const [ndMean, setNdMean] = useState('0');
  const [ndSd, setNdSd] = useState('1');
  const [ndLb, setNdLb] = useState('-1');
  const [ndRb, setNdRb] = useState('1');
  const [resNd, setResNd] = useState<string | null>(null);

  const calcNd = () => {
    let m = parseFloat(ndMean);
    let sd = parseFloat(ndSd);
    let lb = ndLb === '-inf' || ndLb === '-infinity' ? -Infinity : parseFloat(ndLb);
    let rb = ndRb === 'inf' || ndRb === 'infinity' ? Infinity : parseFloat(ndRb);
    
    if (isNaN(m) || isNaN(sd) || isNaN(lb) || isNaN(rb) || sd <= 0) {
      setResNd('Invalid inputs');
      return;
    }
    const prob = cdf(rb, m, sd) - cdf(lb, m, sd);
    setResNd(Math.max(0, prob).toFixed(5));
  };
  
  const clearNd = () => {
    setNdMean(''); setNdSd(''); setNdLb(''); setNdRb(''); setResNd(null);
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto w-full space-y-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-4">Probability Calculator</h1>
        <p className="text-[#94a3b8]">Calculate the probability of two events, series, and normal distributions.</p>
      </div>

      <div className="glass p-8">
        <h2 className="text-xl font-bold text-white mb-2">Probability Solver for Two Events</h2>
        <p className="text-sm text-[#94a3b8] mb-6">Provide any 2 values to calculate the rest probabilities of two independent events.</p>
        
        {errTwo && <p className="text-red-400 mb-4">{errTwo}</p>}
        <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 mb-6">
          {[
            { id: 'A', label: 'Probability of A: P(A)' },
            { id: 'B', label: 'Probability of B: P(B)' },
            { id: 'notA', label: "Probability of A NOT occurring: P(A')" },
            { id: 'notB', label: "Probability of B NOT occurring: P(B')" },
            { id: 'and', label: 'Probability of A and B both occurring: P(A∩B)' },
            { id: 'or', label: 'Probability that A or B or both occur: P(A∪B)' },
            { id: 'xor', label: 'Probability that A or B occurs but NOT both: P(AΔB)' },
            { id: 'neither', label: "Probability of neither A nor B occurring: P((A∪B)')" },
          ].map(f => (
            <div key={f.id} className="flex items-center justify-between border-b border-white/5 pb-2">
              <label className="text-sm text-[#94a3b8]">{f.label}</label>
              <input 
                type="text" 
                value={resTwo ? resTwo[f.id] : fields[f.id]} 
                onChange={e => {
                    if (resTwo) clearTwo();
                    handleFieldChange(f.id, e.target.value);
                }} 
                className={`w-24 bg-black/20 border border-white/10 rounded-lg px-2 py-1 text-right outline-none focus:border-[#38bdf8]/50 ${resTwo ? 'text-[#38bdf8] font-bold' : 'text-white'}`} 
                readOnly={!!resTwo}
              />
            </div>
          ))}
        </div>

        <div className="flex gap-4">
          {!resTwo ? (
            <button onClick={calcTwo} className="bg-[#38bdf8] text-[#0f172a] rounded-xl px-8 py-2 font-bold hover:bg-[#0ea5e9] transition-colors">Calculate</button>
          ) : (
            <button onClick={clearTwo} className="bg-white/5 text-white border border-white/10 rounded-xl px-8 py-2 font-bold hover:bg-white/10 transition-colors">Clear</button>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
         {/* Series */}
         <div className="glass p-8 flex flex-col">
            <h2 className="text-xl font-bold text-white mb-6">Series of Independent Events</h2>
            
            <div className="grid grid-cols-[auto_1fr_1fr] gap-4 mb-6 text-sm text-[#94a3b8] items-center">
                <div></div>
                <div className="text-center font-bold uppercase tracking-wider text-xs">Probability</div>
                <div className="text-center font-bold uppercase tracking-wider text-xs">Repeat Times</div>
                
                <div className="font-bold text-white">Event A</div>
                <input type="number" step="0.1" value={psA} onChange={e => setPsA(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-lg px-2 py-2 text-center text-white outline-none focus:border-[#38bdf8]/50" />
                <input type="number" value={psRepA} onChange={e => setPsRepA(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-lg px-2 py-2 text-center text-white outline-none focus:border-[#38bdf8]/50" />

                <div className="font-bold text-white">Event B</div>
                <input type="number" step="0.1" value={psB} onChange={e => setPsB(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-lg px-2 py-2 text-center text-white outline-none focus:border-[#38bdf8]/50" />
                <input type="number" value={psRepB} onChange={e => setPsRepB(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-lg px-2 py-2 text-center text-white outline-none focus:border-[#38bdf8]/50" />
            </div>

            <div className="flex gap-4 mb-6">
              <button onClick={calcSeries} className="flex-1 bg-[#38bdf8] text-[#0f172a] rounded-xl px-4 py-2 font-bold hover:bg-[#0ea5e9] transition-colors">Calculate</button>
              <button onClick={clearSeries} className="flex-1 bg-white/5 text-white border border-white/10 rounded-xl px-4 py-2 font-bold hover:bg-white/10 transition-colors">Clear</button>
            </div>

            {resSeries && (
               <div className="bg-black/20 rounded-xl p-4 border border-white/5 text-sm space-y-2 text-[#94a3b8] mt-auto">
                 <div className="flex justify-between"><span>A happens every time:</span><span className="text-[#38bdf8] font-bold">{resSeries.aAlways}</span></div>
                 <div className="flex justify-between"><span>A never happens:</span><span className="text-[#38bdf8] font-bold">{resSeries.aNever}</span></div>
                 <div className="flex justify-between"><span>A happens ≥1 times:</span><span className="text-[#38bdf8] font-bold">{resSeries.aAtLeastOnce}</span></div>
                 <div className="border-t border-white/5 my-2"></div>
                 <div className="flex justify-between"><span>B happens every time:</span><span className="text-[#38bdf8] font-bold">{resSeries.bAlways}</span></div>
                 <div className="flex justify-between"><span>B never happens:</span><span className="text-[#38bdf8] font-bold">{resSeries.bNever}</span></div>
                 <div className="flex justify-between"><span>B happens ≥1 times:</span><span className="text-[#38bdf8] font-bold">{resSeries.bAtLeastOnce}</span></div>
               </div>
            )}
         </div>

         {/* Normal Dist */}
         <div className="glass p-8 flex flex-col">
            <h2 className="text-xl font-bold text-white mb-6">Normal Distribution</h2>
            
            <div className="grid grid-cols-[1fr_auto] gap-y-4 gap-x-4 mb-6 items-center flex-1 pr-2">
                <span className="text-sm text-[#94a3b8]">Mean: (µ)</span>
                <input type="number" value={ndMean} onChange={e => setNdMean(e.target.value)} className="w-24 bg-black/20 border border-white/10 rounded-lg px-2 py-2 text-center text-white outline-none focus:border-[#38bdf8]/50" />
                
                <span className="text-sm text-[#94a3b8]">Standard Deviation (σ):</span>
                <input type="number" value={ndSd} onChange={e => setNdSd(e.target.value)} className="w-24 bg-black/20 border border-white/10 rounded-lg px-2 py-2 text-center text-white outline-none focus:border-[#38bdf8]/50" />
                
                <span className="text-sm text-[#94a3b8] flex flex-col">Left Bound (L<sub>b</sub>): <span className="text-xs opacity-60">use '-inf'</span></span>
                <input type="text" value={ndLb} onChange={e => setNdLb(e.target.value)} className="w-24 bg-black/20 border border-white/10 rounded-lg px-2 py-2 text-center text-white outline-none focus:border-[#38bdf8]/50" />
                
                <span className="text-sm text-[#94a3b8] flex flex-col">Right Bound (R<sub>b</sub>): <span className="text-xs opacity-60">use 'inf'</span></span>
                <input type="text" value={ndRb} onChange={e => setNdRb(e.target.value)} className="w-24 bg-black/20 border border-white/10 rounded-lg px-2 py-2 text-center text-white outline-none focus:border-[#38bdf8]/50" />
            </div>

            <div className="flex gap-4 mb-6">
              <button onClick={calcNd} className="flex-1 bg-[#38bdf8] text-[#0f172a] rounded-xl px-4 py-2 font-bold hover:bg-[#0ea5e9] transition-colors">Calculate</button>
              <button onClick={clearNd} className="flex-1 bg-white/5 text-white border border-white/10 rounded-xl px-4 py-2 font-bold hover:bg-white/10 transition-colors">Clear</button>
            </div>

            {resNd && (
               <div className="bg-black/20 rounded-xl p-4 border border-[#38bdf8]/30 flex flex-col items-center mt-auto">
                 <div className="text-xs font-bold text-[#94a3b8] uppercase tracking-wider mb-1">Probability (Area)</div>
                 <div className={`text-2xl font-bold ${resNd === 'Invalid inputs' ? 'text-red-400' : 'text-[#38bdf8]'}`}>{resNd}</div>
               </div>
            )}
         </div>
      </div>
    </motion.div>
  );
}
