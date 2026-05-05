import { useState } from 'react';
import { motion } from 'motion/react';

export default function BinaryCalculator() {
  // Calculator 1: Add, Subtract, Multiply, Divide
  const [b1, setB1] = useState('10101010');
  const [op, setOp] = useState('+');
  const [b2, setB2] = useState('11001100');
  const [res1, setRes1] = useState<string | null>(null);

  const calc1 = () => {
    try {
      const n1 = parseInt(b1, 2);
      const n2 = parseInt(b2, 2);
      if (isNaN(n1) || isNaN(n2)) throw new Error('Invalid binary');
      let result = 0;
      if (op === '+') result = n1 + n2;
      else if (op === '-') result = n1 - n2;
      else if (op === 'x' || op === '*') result = n1 * n2;
      else if (op === '/') result = Math.trunc(n1 / n2);
      
      if (result < 0) {
        setRes1('-' + Math.abs(result).toString(2));
      } else {
        setRes1(result.toString(2));
      }
    } catch(e) {
      setRes1('Error');
    }
  };

  // Calculator 2: Binary to Decimal
  const [b2d, setB2d] = useState('10101010');
  const [res2, setRes2] = useState<string | null>(null);

  const calc2 = () => {
    try {
      const n = parseInt(b2d, 2);
      if (isNaN(n)) throw new Error();
      setRes2(n.toString(10));
    } catch(e) {
      setRes2('Error');
    }
  };

  // Calculator 3: Decimal to Binary
  const [d2b, setD2b] = useState('170');
  const [res3, setRes3] = useState<string | null>(null);

  const calc3 = () => {
    try {
       const n = parseInt(d2b, 10);
       if (isNaN(n)) throw new Error();
       if (n < 0) {
         setRes3('-' + Math.abs(n).toString(2));
       } else {
         setRes3(n.toString(2));
       }
    } catch(e) {
      setRes3('Error');
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto w-full space-y-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-4">Binary Calculator</h1>
        <p className="text-[#94a3b8]">Add, subtract, multiply, or divide two binary values, or convert between binary and decimal.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass p-8 md:col-span-2 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-white mb-6">Binary Calculation</h2>
            <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
              <input type="text" value={b1} onChange={e => setB1(e.target.value.replace(/[^01-]/g, ''))} className="flex-1 min-w-[150px] bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-center text-white outline-none focus:border-[#38bdf8]/50 font-mono text-lg" placeholder="Binary 1" />
              <select value={op} onChange={e => setOp(e.target.value)} className="bg-black/20 border border-white/10 rounded-lg px-3 py-3 text-white outline-none focus:border-[#38bdf8]/50 text-xl font-bold">
                <option value="+">+</option>
                <option value="-">-</option>
                <option value="*">×</option>
                <option value="/">÷</option>
              </select>
              <input type="text" value={b2} onChange={e => setB2(e.target.value.replace(/[^01-]/g, ''))} className="flex-1 min-w-[150px] bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-center text-white outline-none focus:border-[#38bdf8]/50 font-mono text-lg" placeholder="Binary 2" />
              <span className="text-2xl font-bold text-white">=</span>
              <div className="min-w-[100px] text-2xl font-bold font-mono text-[#38bdf8] text-center">{res1 || '?'}</div>
            </div>
          </div>
          <button onClick={calc1} className="bg-[#38bdf8] text-[#0f172a] rounded-xl px-5 py-3 font-bold hover:bg-[#0ea5e9] transition-colors w-full sm:w-auto mx-auto px-12">Calculate</button>
        </div>

        <div className="glass p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold text-white mb-6">Convert Binary to Decimal</h2>
            <div className="flex flex-col gap-4 mb-6">
              <input type="text" value={b2d} onChange={e => setB2d(e.target.value.replace(/[^01-]/g, ''))} placeholder="Binary Value" className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white font-mono outline-none focus:border-[#38bdf8]/50" />
              <div className="flex items-center gap-3 text-[#94a3b8]">
                <span>Decimal:</span>
                <span className="text-2xl font-bold text-[#38bdf8]">{res2 || '?'}</span>
              </div>
            </div>
          </div>
          <button onClick={calc2} className="bg-[#38bdf8] text-[#0f172a] rounded-xl px-5 py-3 font-bold hover:bg-[#0ea5e9] transition-colors w-full">Convert</button>
        </div>

        <div className="glass p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold text-white mb-6">Convert Decimal to Binary</h2>
            <div className="flex flex-col gap-4 mb-6">
              <input type="number" value={d2b} onChange={e => setD2b(e.target.value)} placeholder="Decimal Value" className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-[#38bdf8]/50" />
              <div className="flex items-center gap-3 text-[#94a3b8]">
                <span>Binary:</span>
                <span className="text-2xl font-bold font-mono text-[#38bdf8] break-all">{res3 || '?'}</span>
              </div>
            </div>
          </div>
          <button onClick={calc3} className="bg-[#38bdf8] text-[#0f172a] rounded-xl px-5 py-3 font-bold hover:bg-[#0ea5e9] transition-colors w-full">Convert</button>
        </div>
      </div>
    </motion.div>
  );
}
