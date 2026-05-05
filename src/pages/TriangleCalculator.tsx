import { useState } from 'react';
import { motion } from 'motion/react';

export default function TriangleCalculator() {
  const [fields, setFields] = useState<Record<string, string>>({
    a: '', b: '', c: '', A: '', B: '', C: ''
  });
  const [unit, setUnit] = useState<'d' | 'r'>('d');
  const [res, setRes] = useState<any>(null);

  const calculate = () => {
    let a = fields.a ? parseFloat(fields.a) : null;
    let b = fields.b ? parseFloat(fields.b) : null;
    let c = fields.c ? parseFloat(fields.c) : null;
    let A = fields.A ? parseFloat(fields.A) : null;
    let B = fields.B ? parseFloat(fields.B) : null;
    let C = fields.C ? parseFloat(fields.C) : null;

    const toRad = unit === 'd' ? Math.PI / 180 : 1;
    const toDeg = unit === 'd' ? 180 / Math.PI : 1;

    if (A) A *= toRad;
    if (B) B *= toRad;
    if (C) C *= toRad;

    const sides = [a, b, c].filter(x => x !== null).length;
    const angles = [A, B, C].filter(x => x !== null).length;

    if (sides + angles < 3 || sides < 1) {
      setRes({ error: 'Please provide 3 values, including at least one side.' });
      return;
    }

    for (let i = 0; i < 5; i++) {
        // Find 3rd angle
        if (A !== null && B !== null && C === null) C = Math.PI - A - B;
        if (A !== null && C !== null && B === null) B = Math.PI - A - C;
        if (B !== null && C !== null && A === null) A = Math.PI - B - C;

        // Law of sines
        if (A && a) {
            if (B && !b) b = a * Math.sin(B) / Math.sin(A);
            if (C && !c) c = a * Math.sin(C) / Math.sin(A);
        }
        if (B && b) {
            if (A && !a) a = b * Math.sin(A) / Math.sin(B);
            if (C && !c) c = b * Math.sin(C) / Math.sin(B);
        }
        if (C && c) {
            if (B && !b) b = c * Math.sin(B) / Math.sin(C);
            if (A && !a) a = c * Math.sin(A) / Math.sin(C);
        }

        // Law of cosines
        if (a && b && C && !c) c = Math.sqrt(a*a + b*b - 2*a*b*Math.cos(C));
        if (a && c && B && !b) b = Math.sqrt(a*a + c*c - 2*a*c*Math.cos(B));
        if (b && c && A && !a) a = Math.sqrt(b*b + c*c - 2*b*c*Math.cos(A));

        if (a && b && c) {
            if (!A) A = Math.acos(Math.max(-1, Math.min(1, (b*b + c*c - a*a)/(2*b*c))));
            if (!B) B = Math.acos(Math.max(-1, Math.min(1, (a*a + c*c - b*b)/(2*a*c))));
            if (!C) C = Math.acos(Math.max(-1, Math.min(1, (a*a + b*b - c*c)/(2*a*b))));
        }

        // SSA ambiguity simplistic (always chooses acute when not constrained by law of cosines)
        if (!B && b && A && a) { let s = b * Math.sin(A) / a; if (s <= 1) B = Math.asin(s); }
        if (!C && c && A && a) { let s = c * Math.sin(A) / a; if (s <= 1) C = Math.asin(s); }
        if (!A && a && B && b) { let s = a * Math.sin(B) / b; if (s <= 1) A = Math.asin(s); }
        if (!C && c && B && b) { let s = c * Math.sin(B) / b; if (s <= 1) C = Math.asin(s); }
        if (!A && a && C && c) { let s = a * Math.sin(C) / c; if (s <= 1) A = Math.asin(s); }
        if (!B && b && C && c) { let s = b * Math.sin(C) / c; if (s <= 1) B = Math.asin(s); }
    }

    if ([a,b,c,A,B,C].some(x => x === null || isNaN(x as number))) {
        setRes({ error: 'Cannot solve triangle with given values.' });
        return;
    }

    if ((a as number)+(b as number)<=(c as number) || (a as number)+(c as number)<=(b as number) || (b as number)+(c as number)<=(a as number) || Math.abs((A as number)+(B as number)+(C as number) - Math.PI) > 0.05) {
        setRes({ error: 'Invalid triangle values.' });
        return;
    }

    const s = ((a as number) + (b as number) + (c as number)) / 2;
    const area = Math.sqrt(s * (s - (a as number)) * (s - (b as number)) * (s - (c as number)));
    
    setRes({
        a, b, c, 
        A: (A as number) * toDeg, 
        B: (B as number) * toDeg, 
        C: (C as number) * toDeg,
        area, s,
        hA: 2 * area / (a as number),
        hB: 2 * area / (b as number),
        hC: 2 * area / (c as number),
        medA: 0.5 * Math.sqrt(2*(b as number)**2 + 2*(c as number)**2 - (a as number)**2),
        medB: 0.5 * Math.sqrt(2*(a as number)**2 + 2*(c as number)**2 - (b as number)**2),
        medC: 0.5 * Math.sqrt(2*(a as number)**2 + 2*(b as number)**2 - (c as number)**2),
        inRad: area / s,
        cirRad: ((a as number) * (b as number) * (c as number)) / (4 * area)
    });
  };

  const clear = () => {
    setFields({ a: '', b: '', c: '', A: '', B: '', C: '' });
    setRes(null);
  };

  const fmt = (v: number) => v.toFixed(5).replace(/\.?0+$/, '');

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto w-full space-y-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-4">Triangle Calculator</h1>
        <p className="text-[#94a3b8]">Calculate the edges, angles, area, height, perimeter, and median.</p>
      </div>

      <div className="glass p-8">
        <div className="flex justify-center mb-8">
            <div className="inline-flex glass rounded-xl overflow-hidden p-1">
                <button onClick={() => setUnit('d')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${unit === 'd' ? 'bg-[#38bdf8] text-[#0f172a]' : 'text-[#94a3b8] hover:text-white'}`}>Degrees</button>
                <button onClick={() => setUnit('r')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${unit === 'r' ? 'bg-[#38bdf8] text-[#0f172a]' : 'text-[#94a3b8] hover:text-white'}`}>Radians</button>
            </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-4">
                <h3 className="font-bold text-white mb-4">Sides</h3>
                {['a', 'b', 'c'].map(f => (
                    <div key={f} className="flex flex-col">
                        <label className="text-sm font-medium text-[#94a3b8] mb-1 uppercase">Side {f}</label>
                        <input type="number" value={fields[f]} onChange={e => setFields(prev => ({...prev, [f]: e.target.value}))} className="bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-[#38bdf8]/50" />
                    </div>
                ))}
            </div>
            <div className="space-y-4">
                <h3 className="font-bold text-white mb-4">Angles</h3>
                {['A', 'B', 'C'].map(f => (
                    <div key={f} className="flex flex-col">
                        <label className="text-sm font-medium text-[#94a3b8] mb-1 uppercase">Angle {f}</label>
                        <input type="number" value={fields[f]} onChange={e => setFields(prev => ({...prev, [f]: e.target.value}))} className="bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-[#38bdf8]/50" />
                    </div>
                ))}
            </div>
        </div>

        <div className="flex gap-4">
          <button onClick={calculate} className="flex-1 bg-[#38bdf8] text-[#0f172a] rounded-xl px-4 py-3 font-bold hover:bg-[#0ea5e9] transition-colors">Calculate</button>
          <button onClick={clear} className="flex-1 bg-white/5 text-white border border-white/10 rounded-xl px-4 py-3 font-bold hover:bg-white/10 transition-colors">Clear</button>
        </div>

        {res && (
          <div className="mt-8 bg-black/20 border border-white/10 rounded-xl p-6">
            {res.error ? <p className="text-red-400">{res.error}</p> : (
              <div className="grid sm:grid-cols-3 gap-6">
                 <div>
                     <h3 className="text-lg font-bold text-white mb-2 border-b border-white/5 pb-2">Sides</h3>
                     <div className="space-y-1 text-sm">
                         <div className="flex justify-between text-[#94a3b8]"><span>Side a:</span> <span className="text-[#38bdf8] font-mono">{fmt(res.a)}</span></div>
                         <div className="flex justify-between text-[#94a3b8]"><span>Side b:</span> <span className="text-[#38bdf8] font-mono">{fmt(res.b)}</span></div>
                         <div className="flex justify-between text-[#94a3b8]"><span>Side c:</span> <span className="text-[#38bdf8] font-mono">{fmt(res.c)}</span></div>
                     </div>
                 </div>
                 <div>
                     <h3 className="text-lg font-bold text-white mb-2 border-b border-white/5 pb-2">Angles ({unit === 'd' ? '°' : 'rad'})</h3>
                     <div className="space-y-1 text-sm">
                         <div className="flex justify-between text-[#94a3b8]"><span>Angle A:</span> <span className="text-[#38bdf8] font-mono">{fmt(res.A)}</span></div>
                         <div className="flex justify-between text-[#94a3b8]"><span>Angle B:</span> <span className="text-[#38bdf8] font-mono">{fmt(res.B)}</span></div>
                         <div className="flex justify-between text-[#94a3b8]"><span>Angle C:</span> <span className="text-[#38bdf8] font-mono">{fmt(res.C)}</span></div>
                     </div>
                 </div>
                 <div>
                     <h3 className="text-lg font-bold text-white mb-2 border-b border-white/5 pb-2">Properties</h3>
                     <div className="space-y-1 text-sm">
                         <div className="flex justify-between text-[#94a3b8]"><span>Area:</span> <span className="text-white font-mono">{fmt(res.area)}</span></div>
                         <div className="flex justify-between text-[#94a3b8]"><span>Perimeter:</span> <span className="text-white font-mono">{fmt(res.s * 2)}</span></div>
                         <div className="flex justify-between text-[#94a3b8]"><span>Semiperimeter:</span> <span className="text-white font-mono">{fmt(res.s)}</span></div>
                     </div>
                 </div>
                 
                 <div>
                     <h3 className="text-lg font-bold text-white mb-2 border-b border-white/5 pb-2">Heights</h3>
                     <div className="space-y-1 text-sm">
                         <div className="flex justify-between text-[#94a3b8]"><span>hA:</span> <span className="text-white font-mono">{fmt(res.hA)}</span></div>
                         <div className="flex justify-between text-[#94a3b8]"><span>hB:</span> <span className="text-white font-mono">{fmt(res.hB)}</span></div>
                         <div className="flex justify-between text-[#94a3b8]"><span>hC:</span> <span className="text-white font-mono">{fmt(res.hC)}</span></div>
                     </div>
                 </div>
                 <div>
                     <h3 className="text-lg font-bold text-white mb-2 border-b border-white/5 pb-2">Medians</h3>
                     <div className="space-y-1 text-sm">
                         <div className="flex justify-between text-[#94a3b8]"><span>mA:</span> <span className="text-white font-mono">{fmt(res.medA)}</span></div>
                         <div className="flex justify-between text-[#94a3b8]"><span>mB:</span> <span className="text-white font-mono">{fmt(res.medB)}</span></div>
                         <div className="flex justify-between text-[#94a3b8]"><span>mC:</span> <span className="text-white font-mono">{fmt(res.medC)}</span></div>
                     </div>
                 </div>
                 <div>
                     <h3 className="text-lg font-bold text-white mb-2 border-b border-white/5 pb-2">Radii</h3>
                     <div className="space-y-1 text-sm">
                         <div className="flex justify-between text-[#94a3b8]"><span>Inradius:</span> <span className="text-white font-mono">{fmt(res.inRad)}</span></div>
                         <div className="flex justify-between text-[#94a3b8]"><span>Circumradius:</span> <span className="text-white font-mono">{fmt(res.cirRad)}</span></div>
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
