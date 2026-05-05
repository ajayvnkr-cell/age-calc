import { useState } from 'react';
import { motion } from 'motion/react';

export default function LogCalculator() {
  const [base, setBase] = useState('e');
  const [xVal, setXVal] = useState('100');
  const [yVal, setYVal] = useState('');

  const calculate = () => {
    let b = base === 'e' ? Math.E : parseFloat(base);
    let x = parseFloat(xVal);
    let y = parseFloat(yVal);

    const isB = (base === 'e' || !isNaN(b)) && base !== '';
    const isX = !isNaN(x) && xVal !== '';
    const isY = !isNaN(y) && yVal !== '';

    if (isB && isX && !isY) {
      if (b > 0 && b !== 1 && x > 0) {
        setYVal(String(Math.log(x) / Math.log(b)));
      } else {
        setYVal('Error');
      }
    } else if (isB && isY && !isX) {
      if (b > 0) {
        setXVal(String(Math.pow(b, y)));
      } else {
        setXVal('Error');
      }
    } else if (isX && isY && !isB) {
      if (x > 0 && x !== 1) {
        setBase(String(Math.pow(x, 1 / y)));
      } else {
        setBase('Error');
      }
    }
  };

  const clear = () => {
    setBase(''); setXVal(''); setYVal('');
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto w-full space-y-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-4">Log Calculator</h1>
        <p className="text-[#94a3b8]">Provide any two values to calculate the third in log<sub>b</sub>x = y.</p>
      </div>

      <div className="glass p-8 text-center flex flex-col items-center">
        <div className="flex items-center justify-center gap-4 sm:gap-6 mb-10 mt-6 text-2xl sm:text-3xl font-bold text-white flex-wrap">
          <div className="flex items-end">
            <span>log</span>
            <input type="text" value={base} onChange={e => setBase(e.target.value)} className="w-16 sm:w-20 bg-black/20 border border-white/10 rounded-lg px-2 py-1 text-center text-sm font-normal text-[#38bdf8] outline-none focus:border-[#38bdf8]/50 ml-1 mb-[-4px]" placeholder="base" />
          </div>
          <div>
            <input type="text" value={xVal} onChange={e => setXVal(e.target.value)} className="w-24 sm:w-32 bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-center text-white outline-none focus:border-[#38bdf8]/50" placeholder="x" />
          </div>
          <span>=</span>
          <div>
             <input type="text" value={yVal} onChange={e => setYVal(e.target.value)} className="w-24 sm:w-32 bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-center text-[#38bdf8] outline-none focus:border-[#38bdf8]/50" placeholder="y" />
          </div>
        </div>

        <div className="flex gap-4">
          <button onClick={calculate} className="bg-[#38bdf8] text-[#0f172a] rounded-xl px-8 py-3 font-bold hover:bg-[#0ea5e9] transition-colors">Calculate</button>
          <button onClick={clear} className="bg-white/5 text-white border border-white/10 rounded-xl px-8 py-3 font-bold hover:bg-white/10 transition-colors">Clear</button>
        </div>
      </div>
    </motion.div>
  );
}
