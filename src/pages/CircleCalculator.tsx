import { useState } from 'react';
import { motion } from 'motion/react';

export default function CircleCalculator() {
  const [fields, setFields] = useState({
    radius: '',
    diameter: '',
    circumference: '',
    area: '100'
  });
  const [res, setRes] = useState<any>(null);

  const calculate = () => {
    const r = parseFloat(fields.radius);
    const d = parseFloat(fields.diameter);
    const c = parseFloat(fields.circumference);
    const a = parseFloat(fields.area);

    let finalR = NaN;

    if (!isNaN(r)) finalR = r;
    else if (!isNaN(d)) finalR = d / 2;
    else if (!isNaN(c)) finalR = c / (2 * Math.PI);
    else if (!isNaN(a)) finalR = Math.sqrt(a / Math.PI);

    if (isNaN(finalR)) {
      setRes({ error: 'Please provide at least one valid number.' });
      return;
    }
    if (finalR < 0) {
      setRes({ error: 'Values cannot be negative.' });
      return;
    }

    setRes({
      r: finalR,
      d: finalR * 2,
      c: 2 * Math.PI * finalR,
      a: Math.PI * finalR * finalR
    });
  };

  const clear = () => {
    setFields({ radius: '', diameter: '', circumference: '', area: '' });
    setRes(null);
  };

  const fmt = (v: number) => v.toFixed(5).replace(/\.?0+$/, '');

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto w-full space-y-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-4">Circle Calculator</h1>
        <p className="text-[#94a3b8]">Calculate the remaining values of a circle from any given parameter.</p>
      </div>

      <div className="glass p-8 max-w-xl mx-auto">
        <div className="space-y-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-[#94a3b8] mb-2">Radius (R)</label>
            <input 
                type="number" 
                value={fields.radius} 
                onChange={e => {setFields({radius: e.target.value, diameter: '', circumference: '', area: ''}); setRes(null);}} 
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#38bdf8]/50" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#94a3b8] mb-2">Diameter (D)</label>
            <input 
                type="number" 
                value={fields.diameter} 
                onChange={e => {setFields({radius: '', diameter: e.target.value, circumference: '', area: ''}); setRes(null);}} 
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#38bdf8]/50" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#94a3b8] mb-2">Circumference (C)</label>
            <input 
                type="number" 
                value={fields.circumference} 
                onChange={e => {setFields({radius: '', diameter: '', circumference: e.target.value, area: ''}); setRes(null);}} 
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#38bdf8]/50" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#94a3b8] mb-2">Area (A)</label>
            <input 
                type="number" 
                value={fields.area} 
                onChange={e => {setFields({radius: '', diameter: '', circumference: '', area: e.target.value}); setRes(null);}} 
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#38bdf8]/50" 
            />
          </div>
        </div>

        <div className="flex gap-4">
          <button onClick={calculate} className="flex-1 bg-[#38bdf8] text-[#0f172a] rounded-xl px-4 py-3 font-bold hover:bg-[#0ea5e9] transition-colors">Calculate</button>
          <button onClick={clear} className="flex-1 bg-white/5 text-white border border-white/10 rounded-xl px-4 py-3 font-bold hover:bg-white/10 transition-colors">Clear</button>
        </div>

        {res && (
          <div className="mt-8 bg-black/20 border border-white/10 rounded-xl p-6">
            {res.error ? (
              <p className="text-red-400">{res.error}</p>
            ) : (
              <div className="space-y-4 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-[#94a3b8]">Radius (R)</span>
                  <span className="text-xl font-mono text-white">{fmt(res.r)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-[#94a3b8]">Diameter (D)</span>
                  <span className="text-xl font-mono text-white">{fmt(res.d)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-[#94a3b8]">Circumference (C)</span>
                  <span className="text-xl font-mono text-white">{fmt(res.c)}</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-[#94a3b8]">Area (A)</span>
                  <span className="text-xl font-mono text-white">{fmt(res.a)}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
