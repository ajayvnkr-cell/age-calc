import { useState } from 'react';
import { motion } from 'motion/react';

export default function RandomNumberGenerator() {
  const [lower, setLower] = useState('1');
  const [upper, setUpper] = useState('100');
  const [result1, setResult1] = useState<number | null>(null);

  const calc1 = () => {
    const min = parseInt(lower, 10);
    const max = parseInt(upper, 10);
    if (!isNaN(min) && !isNaN(max) && max >= min) {
      setResult1(Math.floor(Math.random() * (max - min + 1)) + min);
    }
  };

  const [clower, setClower] = useState('0.2');
  const [cupper, setCupper] = useState('112.5');
  const [cnums, setCnums] = useState('1');
  const [ctype, setCtype] = useState('d');
  const [cprec, setCprec] = useState('5');
  const [cdup, setCdup] = useState('y');
  const [csort, setCsort] = useState('n');
  const [cres, setCres] = useState<string[]>([]);

  const calc2 = () => {
    const min = parseFloat(clower);
    const max = parseFloat(cupper);
    const count = parseInt(cnums, 10);
    const prec = parseInt(cprec, 10);
    
    if (isNaN(min) || isNaN(max) || isNaN(count) || count < 1 || min > max) return;
    
    let generated: number[] = [];
    let attempts = 0;
    const maxAttempts = count * 10;
    
    while(generated.length < count && attempts < maxAttempts) {
      attempts++;
      let rand = Math.random() * (max - min) + min;
      if (ctype === 'i') rand = Math.round(rand);
      
      if (cdup === 'n') {
        // basic dedup (hard for decimals unless formatted, but ok for basic impl)
        const formatted = ctype === 'd' ? parseFloat(rand.toFixed(prec)) : rand;
        if (!generated.includes(formatted)) generated.push(formatted);
      } else {
        generated.push(ctype === 'd' ? parseFloat(rand.toFixed(prec)) : rand);
      }
    }
    
    if (csort === 'a') generated.sort((a, b) => a - b);
    if (csort === 'd') generated.sort((a, b) => b - a);
    
    setCres(generated.map(n => ctype === 'd' ? n.toFixed(prec) : String(n)));
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto w-full space-y-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-white">Random Number Generator</h1>
        <p className="mt-4 text-lg text-[#94a3b8]">Generate random integers and decimal numbers in range.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-white mb-6">Basic Generator</h2>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#94a3b8] mb-2">Lower Limit</label>
                <input type="number" value={lower} onChange={e => setLower(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-[#38bdf8]/50" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#94a3b8] mb-2">Upper Limit</label>
                <input type="number" value={upper} onChange={e => setUpper(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-[#38bdf8]/50" />
              </div>
            </div>
            
            {result1 !== null && (
              <div className="mb-6 p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                <span className="text-[#94a3b8] text-sm block mb-1">Result</span>
                <span className="text-4xl font-bold text-[#38bdf8]">{result1}</span>
              </div>
            )}
          </div>
          <button onClick={calc1} className="bg-[#38bdf8] text-[#0f172a] rounded-xl px-5 py-3 font-bold hover:bg-[#0ea5e9] transition-colors w-full">Generate Integer</button>
        </div>

        <div className="glass p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-white mb-6">Comprehensive Generator</h2>
            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#94a3b8] mb-2">Lower Limit</label>
                  <input type="number" step="any" value={clower} onChange={e => setClower(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white outline-none focus:border-[#38bdf8]/50" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#94a3b8] mb-2">Upper Limit</label>
                  <input type="number" step="any" value={cupper} onChange={e => setCupper(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white outline-none focus:border-[#38bdf8]/50" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#94a3b8] mb-2">Generate Count</label>
                  <input type="number" value={cnums} onChange={e => setCnums(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white outline-none focus:border-[#38bdf8]/50" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#94a3b8] mb-2">Number Type</label>
                  <select value={ctype} onChange={e => setCtype(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white outline-none focus:border-[#38bdf8]/50">
                    <option value="i">Integer</option>
                    <option value="d">Decimal</option>
                  </select>
                </div>
              </div>

              {ctype === 'd' && (
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#94a3b8] mb-2">Precision (digits max)</label>
                  <input type="number" value={cprec} onChange={e => setCprec(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white outline-none focus:border-[#38bdf8]/50" />
                </div>
              )}

              {parseInt(cnums) > 1 && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#94a3b8] mb-2">Allow Duplicates?</label>
                    <select value={cdup} onChange={e => setCdup(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white outline-none focus:border-[#38bdf8]/50">
                      <option value="y">Yes</option>
                      <option value="n">No</option>
                    </select>
                  </div>
                  <div>
                     <label className="block text-xs uppercase tracking-wider text-[#94a3b8] mb-2">Sort Results?</label>
                     <select value={csort} onChange={e => setCsort(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white outline-none focus:border-[#38bdf8]/50">
                       <option value="n">No</option>
                       <option value="a">Ascending</option>
                       <option value="d">Descending</option>
                     </select>
                  </div>
                </div>
              )}
            </div>

            {cres.length > 0 && (
              <div className="mb-6 p-4 rounded-xl bg-white/5 border border-white/10 max-h-[150px] overflow-y-auto">
                <span className="text-[#94a3b8] text-sm block mb-2">Results ({cres.length})</span>
                <div className="text-lg font-mono text-[#38bdf8] break-words">
                  {cres.join(', ')}
                </div>
              </div>
            )}
          </div>
          <button onClick={calc2} className="bg-[#38bdf8] text-[#0f172a] rounded-xl px-5 py-3 font-bold hover:bg-[#0ea5e9] transition-colors w-full mt-4">Generate Numbers</button>
        </div>
      </div>
    </motion.div>
  );
}
