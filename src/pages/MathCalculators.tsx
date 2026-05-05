import { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function MathCalculators() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('0');

  const handleInput = (val: string) => {
    if (val === 'AC') {
      setExpression('');
      setResult('0');
    } else if (val === 'Back') {
      setExpression(prev => prev.slice(0, -1));
    } else if (val === '=') {
      try {
        // Safe evaluation simulation for basic math
        // eslint-disable-next-line no-new-func
        const res = new Function(`return ${expression.replace(/×/g, '*').replace(/÷/g, '/')}`)();
        setResult(String(res));
      } catch (e) {
        setResult('Error');
      }
    } else {
      setExpression(prev => prev + val);
    }
  };

  const getLinks = (category: string) => {
    switch(category) {
      case 'general':
        return [
          { name: 'Scientific Calculator', path: '/math/scientific' },
          { name: 'Fraction Calculator', path: '/math/fraction' },
          { name: 'Percentage Calculator', path: '/math/percentage' },
          { name: 'Random Number Generator', path: '/math/random' },
          { name: 'Percent Error Calculator', path: '/math/percent-error' },
          { name: 'Exponent Calculator', path: '/math/exponent' },
          { name: 'Binary Calculator', path: '/math/binary' },
          { name: 'Hex Calculator', path: '/math/hex' },
          { name: 'Half-Life Calculator', path: '/math/half-life' },
          { name: 'Quadratic Formula Calculator', path: '/math/quadratic' },
          { name: 'Log Calculator', path: '/math/log' },
          { name: 'Ratio Calculator', path: '/math/ratio' },
          { name: 'Root Calculator', path: '/math/root' },
        ];
      case 'statistics':
        return [
          { name: 'Standard Deviation Calculator', path: '/math/standard-deviation' },
          { name: 'Number Sequence Calculator', path: '/math/number-sequence' },
          { name: 'Sample Size Calculator', path: '/math/sample-size' },
          { name: 'Probability Calculator', path: '/math/probability' },
          { name: 'Statistics Calculator', path: '/math/statistics' },
          { name: 'Mean, Median, Mode, Range Calculator', path: '/math/mean-median-mode' },
          { name: 'Permutation and Combination Calculator', path: '/math/permutation-combination' },
          { name: 'Z-score Calculator', path: '/math/z-score' },
          { name: 'Confidence Interval Calculator', path: '/math/confidence-interval' },
        ];
      case 'geometry':
        return [
          { name: 'Triangle Calculator', path: '/math/triangle' },
          { name: 'Volume Calculator', path: '/math/volume' },
          { name: 'Slope Calculator', path: '/math/slope' },
          { name: 'Area Calculator', path: '/math/area' },
          { name: 'Distance Calculator', path: '/math/distance' },
          { name: 'Circle Calculator', path: '/math/circle' },
          { name: 'Surface Area Calculator', path: '/math/surface-area' },
          { name: 'Pythagorean Theorem Calculator', path: '/math/pythagorean-theorem' },
          { name: 'Right Triangle Calculator', path: '/math/right-triangle' },
        ];
      default: return [];
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto w-full flex flex-col md:flex-row gap-8 items-start"
    >
      <div className="flex-1 flex flex-col gap-8 w-full">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight mb-4 text-white">Math Calculators</h1>
          <p className="text-[#94a3b8] leading-relaxed mb-8">
            Use the basic math calculator to do simple calculations or use one of the following calculators.
          </p>
        </div>

        <div className="glass p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {getLinks('general').map((link, idx) => (
              <Link key={idx} to={link.path} className="text-[#38bdf8] hover:text-white transition-colors text-sm">
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="glass p-8">
          <h2 className="text-xl font-bold text-white mb-6">Statistics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {getLinks('statistics').map((link, idx) => (
              <Link key={idx} to={link.path} className="text-[#38bdf8] hover:text-white transition-colors text-sm">
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="glass p-8">
          <h2 className="text-xl font-bold text-white mb-6">Geometry</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {getLinks('geometry').map((link, idx) => (
              <Link key={idx} to={link.path} className="text-[#38bdf8] hover:text-white transition-colors text-sm">
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="glass p-6 md:p-8 shrink-0 w-full md:w-[320px] md:sticky md:top-24">
        <div className="bg-black/30 rounded-xl p-4 mb-6 border border-white/10 min-h-[100px] flex flex-col justify-end text-right overflow-hidden shadow-inner">
          <div className="text-[#94a3b8] text-sm h-6 tracking-wide truncate">{expression}</div>
          <div className="text-white text-4xl font-bold mt-1 tracking-tight truncate">{result}</div>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {['7', '8', '9', '+'].map(btn => (
             <CalcButton key={btn} val={btn} onClick={handleInput} op={btn === '+'} />
          ))}
          {['4', '5', '6', '-'].map(btn => (
             <CalcButton key={btn} val={btn} onClick={handleInput} op={btn === '-'} />
          ))}
          {['1', '2', '3', '×'].map(btn => (
             <CalcButton key={btn} val={btn} onClick={handleInput} op={btn === '×'} />
          ))}
          {['C', '0', '.', '÷'].map(btn => (
             <CalcButton key={btn} val={btn === 'C' ? 'AC' : btn} onClick={handleInput} op={btn === '÷'} special={btn === 'C'} />
          ))}
          <div className="col-span-4 grid grid-cols-2 gap-3 mt-1">
             <CalcButton val="Back" onClick={handleInput} special />
             <CalcButton val="=" onClick={handleInput} op className="bg-[#38bdf8] text-[#0f172a] hover:bg-[#0ea5e9]" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function CalcButton({ val, onClick, op, special, className }: { key?: string | number, val: string, onClick: (val: string) => void, op?: boolean, special?: boolean, className?: string }) {
  const isOp = op;
  const isSpecial = special;
  
  let baseClass = "h-12 rounded-xl text-lg font-bold transition-all flex items-center justify-center cursor-pointer select-none active:scale-95 ";
  
  if (className) {
    baseClass += className;
  } else if (isSpecial) {
    baseClass += "bg-white/10 text-white hover:bg-white/20 border border-white/5";
  } else if (isOp) {
    baseClass += "bg-[#38bdf8]/20 text-[#38bdf8] hover:bg-[#38bdf8]/30 border border-[#38bdf8]/20";
  } else {
    baseClass += "bg-white/5 text-white hover:bg-white/10 border border-white/5";
  }
  
  return (
    <div className={baseClass} onClick={() => onClick(val)}>
      {val}
    </div>
  );
}
