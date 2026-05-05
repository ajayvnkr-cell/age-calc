import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import * as math from 'mathjs';

export default function ScientificCalculator() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('0');
  const [isRad, setIsRad] = useState(true); // degrees vs radians
  
  const historyRef = useRef<HTMLDivElement>(null);

  const handleInput = (val: string) => {
    if (val === 'AC') {
      setExpression('');
      setResult('0');
    } else if (val === 'Back') {
      setExpression(prev => prev.slice(0, -1));
    } else if (val === '=') {
      try {
        let evalExpr = expression.replace(/×/g, '*').replace(/÷/g, '/');
        // Handle degrees vs rad
        if (!isRad && (evalExpr.includes('sin') || evalExpr.includes('cos') || evalExpr.includes('tan'))) {
          // crude replace for demo, mathjs allows configuring units but eval handles raw string
          // a simple replace isn't perfect for nested expressions but suffices for simple ones
          evalExpr = evalExpr.replace(/(sin|cos|tan)\((.*?)\)/g, '$1($2 deg)');
        }
        const res = math.evaluate(evalExpr);
        setResult(math.format(res, { precision: 14 }));
      } catch (e) {
        setResult('Error');
      }
    } else if (val === 'Ans') {
      setExpression(prev => prev + (result !== 'Error' ? result : ''));
    } else {
      setExpression(prev => prev + val);
    }
  };

  const handleFunc = (func: string) => {
    if (func === '1/x') {
      setExpression(prev => prev + '1/(');
    } else if (func === 'EXP') {
      setExpression(prev => prev + 'E');
    } else if (func === 'π') {
      setExpression(prev => prev + 'pi');
    } else if (func === 'x²') {
      setExpression(prev => prev + '^2');
    } else if (func === 'x³') {
      setExpression(prev => prev + '^3');
    } else if (func === 'xʸ') {
      setExpression(prev => prev + '^');
    } else if (func === '√x') {
      setExpression(prev => prev + 'sqrt(');
    } else if (func === '³√x') {
      setExpression(prev => prev + 'cbrt(');
    } else if (func === '10ˣ') {
      setExpression(prev => prev + '10^(');
    } else if (func === 'eˣ') {
      setExpression(prev => prev + 'e^(');
    } else if (func === 'sin⁻¹') {
      setExpression(prev => prev + 'asin(');
    } else if (func === 'cos⁻¹') {
      setExpression(prev => prev + 'acos(');
    } else if (func === 'tan⁻¹') {
      setExpression(prev => prev + 'atan(');
    } else if (func === 'n!') {
      setExpression(prev => prev + '!');
    } else {
      setExpression(prev => prev + func + (func.length > 1 && func !== 'e' && func !== 'pi' ? '(' : ''));
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto w-full flex flex-col items-center">
       <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-4">Scientific Calculator</h1>
        <p className="text-[#94a3b8]">Powerful online scientific calculator with full precision.</p>
      </div>

      <div className="glass p-6 md:p-8 w-full max-w-[800px]">
        <div className="bg-black/30 rounded-2xl p-6 mb-6 border border-white/10 min-h-[120px] flex flex-col justify-between text-right overflow-hidden shadow-inner">
          <div className="text-[#94a3b8] text-lg lg:text-xl h-8 tracking-wide truncate font-mono">{expression}</div>
          <div className="text-white text-4xl lg:text-5xl font-bold mt-2 tracking-tight truncate font-mono">{result}</div>
        </div>

        <div className="flex justify-between items-center bg-white/5 p-2 rounded-xl border border-white/10 mb-4 h-12 w-48">
          <button onClick={() => setIsRad(false)} className={`flex-1 flex justify-center py-1.5 rounded-lg text-sm font-bold transition-colors ${!isRad ? 'bg-[#38bdf8] text-[#0f172a]' : 'text-white hover:bg-white/10'}`}>Deg</button>
          <button onClick={() => setIsRad(true)} className={`flex-1 flex justify-center py-1.5 rounded-lg text-sm font-bold transition-colors ${isRad ? 'bg-[#38bdf8] text-[#0f172a]' : 'text-white hover:bg-white/10'}`}>Rad</button>
        </div>

        <div className="grid grid-cols-[3fr_2fr] gap-4 md:gap-8">
          {/* Scientific Functions */}
          <div className="grid grid-cols-5 gap-2 md:gap-3">
             <SciBtn val="sin" onClick={handleFunc} />
             <SciBtn val="cos" onClick={handleFunc} />
             <SciBtn val="tan" onClick={handleFunc} />
             <SciBtn val="sin⁻¹" onClick={handleFunc} />
             <SciBtn val="cos⁻¹" onClick={handleFunc} />
             
             <SciBtn val="tan⁻¹" onClick={handleFunc} />
             <SciBtn val="π" onClick={handleFunc} />
             <SciBtn val="e" onClick={handleFunc} />
             <SciBtn val="xʸ" onClick={handleFunc} />
             <SciBtn val="x³" onClick={handleFunc} />

             <SciBtn val="x²" onClick={handleFunc} />
             <SciBtn val="eˣ" onClick={handleFunc} />
             <SciBtn val="10ˣ" onClick={handleFunc} />
             <SciBtn val="³√x" onClick={handleFunc} />
             <SciBtn val="√x" onClick={handleFunc} />

             <SciBtn val="ln" onClick={handleFunc} />
             <SciBtn val="log" onClick={handleFunc} />
             <SciBtn val="(" onClick={handleInput} />
             <SciBtn val=")" onClick={handleInput} />
             <SciBtn val="1/x" onClick={handleFunc} />
             
             <SciBtn val="%" onClick={handleInput} />
             <SciBtn val="n!" onClick={handleFunc} />
             <SciBtn val="EXP" onClick={handleFunc} />
             <SciBtn val="," onClick={handleInput} />
             <SciBtn val="^" onClick={handleInput} />
          </div>

          {/* Numpad */}
          <div className="grid grid-cols-4 gap-2 md:gap-3">
             <NumBtn val="7" onClick={handleInput} />
             <NumBtn val="8" onClick={handleInput} />
             <NumBtn val="9" onClick={handleInput} />
             <OpBtn val="+" onClick={handleInput} />

             <NumBtn val="4" onClick={handleInput} />
             <NumBtn val="5" onClick={handleInput} />
             <NumBtn val="6" onClick={handleInput} />
             <OpBtn val="-" onClick={handleInput} />

             <NumBtn val="1" onClick={handleInput} />
             <NumBtn val="2" onClick={handleInput} />
             <NumBtn val="3" onClick={handleInput} />
             <OpBtn val="×" onClick={handleInput} />

             <NumBtn val="0" onClick={handleInput} />
             <NumBtn val="." onClick={handleInput} />
             <SciBtn val="Ans" onClick={handleInput} />
             <OpBtn val="÷" onClick={handleInput} />

             <OpBtn val="AC" onClick={handleInput} className="text-red-400 bg-red-400/10 hover:bg-red-400/20 border-red-400/20" />
             <OpBtn val="Back" onClick={handleInput} />
             <div className="col-span-2">
                <OpBtn val="=" onClick={handleInput} className="bg-[#38bdf8] text-[#0f172a] hover:bg-[#0ea5e9] w-full h-full" />
             </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SciBtn({ val, onClick, className = '' }: { val: string, onClick: (v: string) => void, className?: string }) {
  return (
    <div onClick={() => onClick(val)} className={`h-10 md:h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-sm font-medium hover:bg-white/10 cursor-pointer select-none active:scale-95 transition-all text-[#94a3b8] ${className}`}>
      {val}
    </div>
  );
}

function NumBtn({ val, onClick, className = '' }: { val: string, onClick: (v: string) => void, className?: string }) {
  return (
    <div onClick={() => onClick(val)} className={`h-10 md:h-12 bg-white/10 border border-white/5 rounded-xl flex items-center justify-center text-lg md:text-xl font-bold hover:bg-white/20 cursor-pointer select-none active:scale-95 transition-all text-white ${className}`}>
      {val}
    </div>
  );
}

function OpBtn({ val, onClick, className = '' }: { val: string, onClick: (v: string) => void, className?: string }) {
  return (
    <div onClick={() => onClick(val)} className={`h-10 md:h-12 bg-[#38bdf8]/10 border border-[#38bdf8]/20 rounded-xl flex items-center justify-center text-lg md:text-xl font-bold hover:bg-[#38bdf8]/20 cursor-pointer select-none active:scale-95 transition-all text-[#38bdf8] ${className}`}>
      {val}
    </div>
  );
}
