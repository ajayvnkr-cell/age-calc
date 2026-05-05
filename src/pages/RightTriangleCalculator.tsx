import { useState } from 'react';
import { motion } from 'motion/react';

export default function RightTriangleCalculator() {
  const [fields, setFields] = useState<Record<string, string>>({
    a: '', b: '', c: '', alpha: '', beta: '', h: '', area: '', p: ''
  });
  const [unit, setUnit] = useState<'d' | 'r'>('d');
  const [res, setRes] = useState<any>(null);

  const calculate = () => {
    let a = fields.a ? parseFloat(fields.a) : null;
    let b = fields.b ? parseFloat(fields.b) : null;
    let c = fields.c ? parseFloat(fields.c) : null;
    let alp = fields.alpha ? parseFloat(fields.alpha) : null;
    let bet = fields.beta ? parseFloat(fields.beta) : null;
    let h = fields.h ? parseFloat(fields.h) : null;
    let area = fields.area ? parseFloat(fields.area) : null;
    let p = fields.p ? parseFloat(fields.p) : null;

    const toRad = unit === 'd' ? Math.PI / 180 : 1;
    const toDeg = unit === 'd' ? 180 / Math.PI : 1;

    if (alp) alp *= toRad;
    if (bet) bet *= toRad;

    const inputs = [a, b, c, alp, bet, h, area, p].filter(x => x !== null).length;
    if (inputs < 2) return setRes({ error: 'Please provide at least 2 values.' });

    let foundA: number | null = null;
    let foundB: number | null = null;

    if (a !== null && b !== null) { foundA = a; foundB = b; }
    else if (a !== null && c !== null) { foundA = a; foundB = Math.sqrt(c*c - a*a); }
    else if (b !== null && c !== null) { foundB = b; foundA = Math.sqrt(c*c - b*b); }

    else if (a !== null && alp !== null) { foundA = a; foundB = a / Math.tan(alp); }
    else if (a !== null && bet !== null) { foundA = a; foundB = a * Math.tan(bet); }
    else if (b !== null && alp !== null) { foundB = b; foundA = b * Math.tan(alp); }
    else if (b !== null && bet !== null) { foundB = b; foundA = b / Math.tan(bet); }

    else if (c !== null && alp !== null) { foundA = c * Math.sin(alp); foundB = c * Math.cos(alp); }
    else if (c !== null && bet !== null) { foundA = c * Math.cos(bet); foundB = c * Math.sin(bet); }

    else if (area !== null && a !== null) { foundA = a; foundB = 2 * area / a; }
    else if (area !== null && b !== null) { foundB = b; foundA = 2 * area / b; }

    else if (area !== null && alp !== null) { foundB = Math.sqrt((2 * area) / Math.tan(alp)); foundA = foundB * Math.tan(alp); }
    else if (area !== null && bet !== null) { foundA = Math.sqrt((2 * area) / Math.tan(bet)); foundB = foundA * Math.tan(bet); }

    else if (h !== null && a !== null) { let x = Math.asin(h/a); foundA = a; foundB = a * Math.tan(x); }
    else if (h !== null && b !== null) { let x = Math.asin(h/b); foundB = b; foundA = b * Math.tan(x); }

    else if (h !== null && alp !== null) { let cc = h / (Math.sin(alp) * Math.cos(alp)); foundA = cc * Math.sin(alp); foundB = cc * Math.cos(alp); }
    else if (h !== null && bet !== null) { let cc = h / (Math.sin(bet) * Math.cos(bet)); foundA = cc * Math.cos(bet); foundB = cc * Math.sin(bet); }

    else if (p !== null && a !== null) { foundA = a; foundB = (p * (p - 2*a)) / (2 * (p - a)); }
    else if (p !== null && b !== null) { foundB = b; foundA = (p * (p - 2*b)) / (2 * (p - b)); }

    else if (p !== null && alp !== null) { foundA = p / (1 + 1/Math.tan(alp) + 1/Math.sin(alp)); foundB = foundA / Math.tan(alp); }
    else if (p !== null && bet !== null) { foundB = p / (1 + 1/Math.tan(bet) + 1/Math.sin(bet)); foundA = foundB / Math.tan(bet); }

    else if (p !== null && c !== null) {
        let sum = p - c;
        let ab = (sum*sum - c*c) / 2;
        let D = sum*sum - 4*ab;
        if (D >= 0) {
            foundA = (sum + Math.sqrt(D))/2;
            foundB = (sum - Math.sqrt(D))/2;
        }
    }

    const resolveQuadratic = (sumAB: number, diffABsq: number) => {
        if (diffABsq >= 0) {
            let diffAB = Math.sqrt(diffABsq);
            foundA = (sumAB + diffAB) / 2;
            foundB = (sumAB - diffAB) / 2;
        }
    }

    if (foundA === null && area !== null && c !== null) {
        let sumAB = Math.sqrt(c*c + 4*area);
        let diffABsq = c*c - 4*area;
        resolveQuadratic(sumAB, diffABsq);
    }
    else if (foundA === null && h !== null && c !== null) {
        let tmpArea = 0.5 * c * h;
        let sumAB = Math.sqrt(c*c + 4*tmpArea);
        let diffABsq = c*c - 4*tmpArea;
        resolveQuadratic(sumAB, diffABsq);
    }
    else if (foundA === null && area !== null && p !== null) {
        let sumAB = (p*p + 4*area) / (2*p);
        let D = sumAB*sumAB - 8*area;
        resolveQuadratic(sumAB, D);
    }
    else if (foundA === null && h !== null && area !== null) {
        let cc = 2 * area / h;
        let sumAB = Math.sqrt(cc*cc + 4*area);
        let diffABsq = cc*cc - 4*area;
        resolveQuadratic(sumAB, diffABsq);
    }
    else if (foundA === null && p !== null && h !== null) {
        let sumAB = (p*p + 2*p*h) / (2 * (p + h));
        let cc = p - sumAB;
        let tmpArea = 0.5 * cc * h;
        let diffABsq = cc*cc - 4*tmpArea;
        resolveQuadratic(sumAB, diffABsq);
    }

    if (foundA === null || foundB === null || isNaN(foundA) || isNaN(foundB)) {
        return setRes({ error: 'Cannot solve triangle with given values.' });
    }

    const nA = foundA;
    const nB = foundB;
    const nC = Math.sqrt(nA*nA + nB*nB);
    const nAlp = Math.atan(nA/nB);
    const nBet = Math.atan(nB/nA);
    const nH = (nA * nB) / nC;
    const nArea = 0.5 * nA * nB;
    const nP = nA + nB + nC;

    setRes({
        a: nA,
        b: nB,
        c: nC,
        alp: nAlp * toDeg,
        bet: nBet * toDeg,
        h: nH,
        area: nArea,
        p: nP
    });
  };

  const clear = () => {
    setFields({ a: '', b: '', c: '', alpha: '', beta: '', h: '', area: '', p: '' });
    setRes(null);
  };
  
  const updateF = (k: string, v: string) => {
      setFields(p => ({...p, [k]: v}));
  };

  const fmt = (v: number) => v.toFixed(5).replace(/\.?0+$/, '');

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto w-full space-y-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-4">Right Triangle Calculator</h1>
        <p className="text-[#94a3b8]">Calculate side length, angle, height, area, and perimeter given 2 values.</p>
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
                <div className="flex items-center gap-4">
                    <label className="w-16 text-[#94a3b8] font-bold">a =</label>
                    <input type="number" value={fields.a} onChange={e => updateF('a', e.target.value)} className="flex-1 bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-[#38bdf8]/50" />
                </div>
                <div className="flex items-center gap-4">
                    <label className="w-16 text-[#94a3b8] font-bold">b =</label>
                    <input type="number" value={fields.b} onChange={e => updateF('b', e.target.value)} className="flex-1 bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-[#38bdf8]/50" />
                </div>
                <div className="flex items-center gap-4">
                    <label className="w-16 text-[#94a3b8] font-bold">c =</label>
                    <input type="number" value={fields.c} onChange={e => updateF('c', e.target.value)} className="flex-1 bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-[#38bdf8]/50" />
                </div>
                <div className="flex items-center gap-4">
                    <label className="w-16 text-[#94a3b8] font-bold">Area =</label>
                    <input type="number" value={fields.area} onChange={e => updateF('area', e.target.value)} className="flex-1 bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-[#38bdf8]/50" />
                </div>
            </div>
            
            <div className="space-y-4">
                <div className="flex items-center gap-4">
                    <label className="w-16 text-[#94a3b8] font-bold">∠α =</label>
                    <input type="number" value={fields.alpha} onChange={e => updateF('alpha', e.target.value)} className="flex-1 bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-[#38bdf8]/50" />
                </div>
                <div className="flex items-center gap-4">
                    <label className="w-16 text-[#94a3b8] font-bold">∠β =</label>
                    <input type="number" value={fields.beta} onChange={e => updateF('beta', e.target.value)} className="flex-1 bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-[#38bdf8]/50" />
                </div>
                <div className="flex items-center gap-4">
                    <label className="w-16 text-[#94a3b8] font-bold">h =</label>
                    <input type="number" value={fields.h} onChange={e => updateF('h', e.target.value)} className="flex-1 bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-[#38bdf8]/50" />
                </div>
                <div className="flex items-center gap-4">
                    <label className="w-16 text-[#94a3b8] font-bold">P =</label>
                    <input type="number" value={fields.p} onChange={e => updateF('p', e.target.value)} className="flex-1 bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-[#38bdf8]/50" />
                </div>
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
              <div className="grid sm:grid-cols-2 gap-8 text-sm">
                <div className="space-y-4">
                    <h3 className="font-bold text-white border-b border-white/5 pb-2">Sides</h3>
                    <div className="flex justify-between items-center"><span className="text-[#94a3b8]">Side a</span><span className="text-white font-mono">{fmt(res.a)}</span></div>
                    <div className="flex justify-between items-center"><span className="text-[#94a3b8]">Side b</span><span className="text-white font-mono">{fmt(res.b)}</span></div>
                    <div className="flex justify-between items-center"><span className="text-[#94a3b8] font-bold">Hypotenuse c</span><span className="text-[#38bdf8] font-mono text-lg">{fmt(res.c)}</span></div>
                </div>
                <div className="space-y-4">
                    <h3 className="font-bold text-white border-b border-white/5 pb-2">Angles ({unit === 'd' ? '°' : 'rad'})</h3>
                    <div className="flex justify-between items-center"><span className="text-[#94a3b8]">Angle α</span><span className="text-white font-mono">{fmt(res.alp)}</span></div>
                    <div className="flex justify-between items-center"><span className="text-[#94a3b8]">Angle β</span><span className="text-white font-mono">{fmt(res.bet)}</span></div>
                </div>
                <div className="space-y-4 sm:col-span-2 border-t border-white/5 pt-4 grid sm:grid-cols-3 gap-8">
                    <div className="flex flex-col"><span className="text-[#94a3b8] mb-1">Height (h)</span><span className="text-white font-mono text-xl">{fmt(res.h)}</span></div>
                    <div className="flex flex-col"><span className="text-[#94a3b8] mb-1">Area</span><span className="text-white font-mono text-xl">{fmt(res.area)}</span></div>
                    <div className="flex flex-col"><span className="text-[#94a3b8] mb-1">Perimeter</span><span className="text-white font-mono text-xl">{fmt(res.p)}</span></div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
