import { useState } from 'react';
import { motion } from 'motion/react';
import Fraction from 'fraction.js';

export default function FractionCalculator() {
  // basic fraction
  const [f1n, setF1n] = useState('');
  const [f1d, setF1d] = useState('');
  const [f2n, setF2n] = useState('');
  const [f2d, setF2d] = useState('');
  const [op1, setOp1] = useState('+');
  const [r1n, setR1n] = useState<string | null>(null);
  const [r1d, setR1d] = useState<string | null>(null);

  const calc1 = () => {
    try {
      const fr1 = new Fraction(parseInt(f1n || '0'), parseInt(f1d || '1'));
      const fr2 = new Fraction(parseInt(f2n || '0'), parseInt(f2d || '1'));
      let res;
      if (op1 === '+') res = fr1.add(fr2);
      else if (op1 === '-') res = fr1.sub(fr2);
      else if (op1 === '*') res = fr1.mul(fr2);
      else if (op1 === '/') res = fr1.div(fr2);
      if (res) {
        setR1n(String(res.n * res.s));
        setR1d(String(res.d));
      }
    } catch (e) {
      setR1n('Err');
      setR1d('1');
    }
  };

  // Mixed numbers
  const [m1, setM1] = useState('');
  const [m2, setM2] = useState('');
  const [op2, setOp2] = useState('+');
  const [r2, setR2] = useState<string | null>(null);

  const calc2 = () => {
    try {
       // fraction.js can parse '2 3/4' directly!
       const fr1 = new Fraction(m1 || '0');
       const fr2 = new Fraction(m2 || '0');
       let res;
       if (op2 === '+') res = fr1.add(fr2);
       else if (op2 === '-') res = fr1.sub(fr2);
       else if (op2 === '*') res = fr1.mul(fr2);
       else if (op2 === '/') res = fr1.div(fr2);
       if (res) {
         setR2(res.toFraction(true)); // true means mixed number
       }
    } catch(e) {
       setR2('Error');
    }
  };

  // Convert decimal to fraction
  const [d1, setD1] = useState('');
  const [r3, setR3] = useState<string | null>(null);

  const calc3 = () => {
    try {
      const res = new Fraction(d1 || '0');
      setR3(res.toFraction());
    } catch(e) {
      setR3('Error');
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto w-full space-y-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-4">Fraction Calculator</h1>
        <p className="text-[#94a3b8]">Fraction addition, subtraction, multiplication, division, and conversion.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-white mb-6">Basic Fraction Calculator</h2>
            <div className="flex items-center justify-center gap-6 mb-8">
              <div className="flex flex-col items-center gap-2">
                 <input type="number" value={f1n} onChange={e => setF1n(e.target.value)} className="w-16 bg-black/20 border border-white/10 rounded-lg px-2 py-2 text-center text-white outline-none focus:border-[#38bdf8]/50" />
                 <div className="w-full h-px bg-white/30"></div>
                 <input type="number" value={f1d} onChange={e => setF1d(e.target.value)} className="w-16 bg-black/20 border border-white/10 rounded-lg px-2 py-2 text-center text-white outline-none focus:border-[#38bdf8]/50" />
              </div>
              <select value={op1} onChange={e => setOp1(e.target.value)} className="bg-black/20 border border-white/10 rounded-lg px-2 py-2 text-white outline-none focus:border-[#38bdf8]/50 text-xl font-bold h-12">
                <option value="+">+</option>
                <option value="-">-</option>
                <option value="*">×</option>
                <option value="/">÷</option>
              </select>
              <div className="flex flex-col items-center gap-2">
                 <input type="number" value={f2n} onChange={e => setF2n(e.target.value)} className="w-16 bg-black/20 border border-white/10 rounded-lg px-2 py-2 text-center text-white outline-none focus:border-[#38bdf8]/50" />
                 <div className="w-full h-px bg-white/30"></div>
                 <input type="number" value={f2d} onChange={e => setF2d(e.target.value)} className="w-16 bg-black/20 border border-white/10 rounded-lg px-2 py-2 text-center text-white outline-none focus:border-[#38bdf8]/50" />
              </div>
              <div className="text-2xl font-bold text-white">=</div>
              <div className="flex flex-col items-center justify-center min-w-[3rem]">
                {r1n && r1d ? (
                  r1d === '1' ? (
                     <div className="text-2xl font-bold text-[#38bdf8]">{r1n}</div>
                  ) : (
                    <>
                      <div className="text-xl font-bold text-[#38bdf8] pb-1 border-b border-[#38bdf8]/50 px-2">{r1n}</div>
                      <div className="text-xl font-bold text-[#38bdf8] pt-1 px-2">{r1d}</div>
                    </>
                  )
                ) : <div className="text-2xl font-bold text-[#94a3b8]">?</div>}
              </div>
            </div>
          </div>
          <button onClick={calc1} className="bg-[#38bdf8] text-[#0f172a] rounded-xl px-5 py-3 font-bold hover:bg-[#0ea5e9] transition-colors w-full">Calculate</button>
        </div>

        <div className="glass p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-white mb-6">Mixed Numbers Calculator</h2>
            <div className="flex items-center justify-center gap-4 mb-8 flex-wrap">
               <input type="text" value={m1} onChange={e => setM1(e.target.value)} placeholder="ex: 2 3/4" className="w-24 bg-black/20 border border-white/10 rounded-lg px-3 py-3 text-center text-white outline-none focus:border-[#38bdf8]/50" />
               <select value={op2} onChange={e => setOp2(e.target.value)} className="bg-black/20 border border-white/10 rounded-lg px-2 py-3 text-white outline-none focus:border-[#38bdf8]/50 text-xl font-bold">
                 <option value="+">+</option>
                 <option value="-">-</option>
                 <option value="*">×</option>
                 <option value="/">÷</option>
               </select>
               <input type="text" value={m2} onChange={e => setM2(e.target.value)} placeholder="ex: 1 1/2" className="w-24 bg-black/20 border border-white/10 rounded-lg px-3 py-3 text-center text-white outline-none focus:border-[#38bdf8]/50" />
               <div className="text-2xl font-bold text-white">=</div>
               <div className="text-2xl font-bold text-[#38bdf8] min-w-[3rem] text-center">{r2 || '?'}</div>
            </div>
          </div>
          <button onClick={calc2} className="bg-[#38bdf8] text-[#0f172a] rounded-xl px-5 py-3 font-bold hover:bg-[#0ea5e9] transition-colors w-full">Calculate</button>
        </div>

        <div className="glass p-8 md:col-span-2 flex flex-col justify-between">
          <div>
             <h2 className="text-xl font-bold text-white mb-6">Decimal to Fraction</h2>
             <div className="flex items-center gap-6 mb-8">
               <input type="number" step="any" value={d1} onChange={e => setD1(e.target.value)} placeholder="ex: 1.375" className="flex-1 max-w-[200px] bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-[#38bdf8]/50" />
               <div className="text-2xl font-bold text-white">=</div>
               <div className="text-2xl font-bold text-[#38bdf8]">{r3 || '?'}</div>
             </div>
          </div>
          <button onClick={calc3} className="bg-[#38bdf8] text-[#0f172a] rounded-xl px-5 py-3 font-bold hover:bg-[#0ea5e9] transition-colors max-w-[200px]">Convert</button>
        </div>
      </div>
    </motion.div>
  );
}
