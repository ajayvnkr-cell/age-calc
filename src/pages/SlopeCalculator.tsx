import { useState } from 'react';
import { motion } from 'motion/react';

export default function SlopeCalculator() {
  const [activeTab, setActiveTab] = useState('two-points');

  // Two Points State
  const [p1x, setP1x] = useState('1');
  const [p1y, setP1y] = useState('1');
  const [p2x, setP2x] = useState('2');
  const [p2y, setP2y] = useState('2');
  const [res1, setRes1] = useState<any>(null);

  const calcTwoPoints = () => {
    const x1 = parseFloat(p1x);
    const y1 = parseFloat(p1y);
    const x2 = parseFloat(p2x);
    const y2 = parseFloat(p2y);

    if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2)) {
      setRes1({ error: 'Please enter valid coordinates.' });
      return;
    }

    if (x1 === x2 && y1 === y2) {
      setRes1({ error: 'Coordinates must be different points.' });
      return;
    }

    const dx = x2 - x1;
    const dy = y2 - y1;
    const d = Math.sqrt(dx * dx + dy * dy);
    
    let m = 'Undefined';
    let thetaRad = 0;
    let thetaDeg = 0;
    let eq = '';

    if (dx === 0) {
      thetaRad = Math.PI / 2 * Math.sign(dy);
      thetaDeg = 90 * Math.sign(dy);
      eq = `x = ${x1}`;
    } else {
      const slope = dy / dx;
      m = slope.toFixed(5).replace(/\.?0+$/, '');
      thetaRad = Math.atan(slope);
      thetaDeg = thetaRad * (180 / Math.PI);
      
      const b = y1 - slope * x1;
      const bStr = b === 0 ? '' : b > 0 ? ` + ${b.toFixed(5).replace(/\.?0+$/, '')}` : ` - ${Math.abs(b).toFixed(5).replace(/\.?0+$/, '')}`;
      const mStr = slope === 0 ? '' : slope === 1 ? 'x' : slope === -1 ? '-x' : `${m}x`;
      
      eq = slope === 0 ? `y = ${y1}` : `y = ${mStr}${bStr}`;
    }

    if (thetaDeg < 0 && dx !== 0) {
        thetaDeg += 180;
        thetaRad += Math.PI;
    }

    setRes1({ dx, dy, d, m, thetaRad, thetaDeg, eq });
  };

  // One Point & Slope State
  const [p3x, setP3x] = useState('1');
  const [p3y, setP3y] = useState('1');
  const [dist, setDist] = useState('5');
  const [inputM, setInputM] = useState('0.75');
  const [inputTheta, setInputTheta] = useState('');
  const [res2, setRes2] = useState<any>(null);

  const calcOnePoint = () => {
    const x1 = parseFloat(p3x);
    const y1 = parseFloat(p3y);
    const d = parseFloat(dist);

    if (isNaN(x1) || isNaN(y1) || isNaN(d)) {
      setRes2({ error: 'Please enter valid coordinates and distance.' });
      return;
    }

    let mParsed = parseFloat(inputM);
    let thetaParsed = parseFloat(inputTheta);
    let slope = 0;
    let thetaRad = 0;
    let thetaDeg = 0;
    let mStr = '0';

    if (inputM !== '' && !isNaN(mParsed)) {
      slope = mParsed;
      thetaRad = Math.atan(slope);
      thetaDeg = thetaRad * (180 / Math.PI);
      mStr = slope.toFixed(5).replace(/\.?0+$/, '');
    } else if (inputTheta !== '' && !isNaN(thetaParsed)) {
      thetaDeg = thetaParsed;
      thetaRad = thetaDeg * (Math.PI / 180);
      if (Math.abs(thetaDeg % 180) === 90) {
        mStr = 'Undefined';
      } else {
        slope = Math.tan(thetaRad);
        mStr = slope.toFixed(5).replace(/\.?0+$/, '');
      }
    } else {
      setRes2({ error: 'Please enter either slope (m) or angle (θ).' });
      return;
    }

    let eq = '';
    let pts = [];

    if (mStr === 'Undefined') {
        eq = `x = ${x1}`;
        pts.push({ x: x1, y: y1 + d });
        pts.push({ x: x1, y: y1 - d });
    } else {
        const b = y1 - slope * x1;
        const bStr = b === 0 ? '' : b > 0 ? ` + ${b.toFixed(5).replace(/\.?0+$/, '')}` : ` - ${Math.abs(b).toFixed(5).replace(/\.?0+$/, '')}`;
        const coeffStr = slope === 0 ? '' : slope === 1 ? 'x' : slope === -1 ? '-x' : `${mStr}x`;
        eq = slope === 0 ? `y = ${y1}` : `y = ${coeffStr}${bStr}`;

        const dx = d * Math.cos(thetaRad);
        const dy = d * Math.sin(thetaRad);

        pts.push({ x: x1 + dx, y: y1 + dy });
        pts.push({ x: x1 - dx, y: y1 - dy });
    }

    setRes2({
      m: mStr,
      thetaDeg,
      thetaRad,
      d,
      eq,
      pts
    });
  };

  const fmt = (v: number) => v.toFixed(5).replace(/\.?0+$/, '');

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto w-full space-y-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-4">Slope Calculator</h1>
        <p className="text-[#94a3b8]">Calculate slope, angle of incline, distance, and equation of a line.</p>
      </div>

      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {[
          { id: 'two-points', name: '2 Points Known' },
          { id: 'one-point', name: '1 Point & Slope Known' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id); setRes1(null); setRes2(null); }}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              activeTab === tab.id ? 'bg-[#38bdf8] text-[#0f172a]' : 'bg-white/5 text-[#94a3b8] hover:text-white'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      <div className="glass p-8">
        {activeTab === 'two-points' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="font-bold text-white mb-2 pb-2 border-b border-white/5">Point 1</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#94a3b8] mb-2">X₁</label>
                    <input type="number" value={p1x} onChange={e => setP1x(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-[#38bdf8]/50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#94a3b8] mb-2">Y₁</label>
                    <input type="number" value={p1y} onChange={e => setP1y(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-[#38bdf8]/50" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-bold text-white mb-2 pb-2 border-b border-white/5">Point 2</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#94a3b8] mb-2">X₂</label>
                    <input type="number" value={p2x} onChange={e => setP2x(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-[#38bdf8]/50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#94a3b8] mb-2">Y₂</label>
                    <input type="number" value={p2y} onChange={e => setP2y(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-[#38bdf8]/50" />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 flex gap-4">
              <button onClick={calcTwoPoints} className="flex-1 bg-[#38bdf8] text-[#0f172a] rounded-xl px-4 py-3 font-bold hover:bg-[#0ea5e9]">Calculate</button>
              <button onClick={() => { setP1x(''); setP1y(''); setP2x(''); setP2y(''); setRes1(null); }} className="px-6 bg-white/5 text-white border border-white/10 rounded-xl font-bold hover:bg-white/10">Clear</button>
            </div>

            {res1 && (
              <div className="mt-8 bg-black/20 border border-white/10 rounded-xl p-6">
                {res1.error ? <p className="text-red-400">{res1.error}</p> : (
                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                      <span className="text-[#94a3b8]">Slope (m)</span>
                      <span className="text-xl font-mono text-white">{res1.m}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                      <span className="text-[#94a3b8]">Angle of incline (θ)</span>
                      <span className="text-white font-mono">{fmt(res1.thetaDeg)}° &nbsp; ({fmt(res1.thetaRad)} rad)</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                      <span className="text-[#94a3b8]">Distance (d)</span>
                      <span className="text-white font-mono">{fmt(res1.d)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                      <span className="text-[#94a3b8]">Change in X (Δx)</span>
                      <span className="text-white font-mono">{fmt(res1.dx)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                      <span className="text-[#94a3b8]">Change in Y (Δy)</span>
                      <span className="text-white font-mono">{fmt(res1.dy)}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-[#94a3b8]">Equation</span>
                      <span className="text-[#38bdf8] font-bold font-mono text-lg">{res1.eq}</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'one-point' && (
          <div className="space-y-6">
            <h3 className="font-bold text-white mb-2 pb-2 border-b border-white/5">Known Details</h3>
            <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#94a3b8] mb-2">X₁</label>
                  <input type="number" value={p3x} onChange={e => setP3x(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-[#38bdf8]/50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#94a3b8] mb-2">Y₁</label>
                  <input type="number" value={p3y} onChange={e => setP3y(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-[#38bdf8]/50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#94a3b8] mb-2">Distance (d)</label>
                  <input type="number" value={dist} onChange={e => setDist(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-[#38bdf8]/50" />
                </div>
            </div>

            <h3 className="font-bold text-white mb-2 pb-2 border-b border-white/5 mt-6">Slope or Angle (Provide one)</h3>
            <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#94a3b8] mb-2">Slope (m)</label>
                  <input type="number" value={inputM} onChange={e => {setInputM(e.target.value); setInputTheta('');}} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-[#38bdf8]/50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#94a3b8] mb-2">Angle (θ) in Degrees</label>
                  <input type="number" value={inputTheta} onChange={e => {setInputTheta(e.target.value); setInputM('');}} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-[#38bdf8]/50" />
                </div>
            </div>

            <div className="pt-4 flex gap-4">
              <button onClick={calcOnePoint} className="flex-1 bg-[#38bdf8] text-[#0f172a] rounded-xl px-4 py-3 font-bold hover:bg-[#0ea5e9]">Calculate</button>
              <button onClick={() => { setP3x(''); setP3y(''); setDist(''); setInputM(''); setInputTheta(''); setRes2(null); }} className="px-6 bg-white/5 text-white border border-white/10 rounded-xl font-bold hover:bg-white/10">Clear</button>
            </div>

            {res2 && (
              <div className="mt-8 bg-black/20 border border-white/10 rounded-xl p-6">
                {res2.error ? <p className="text-red-400">{res2.error}</p> : (
                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                      <span className="text-[#94a3b8]">Slope (m)</span>
                      <span className="text-xl font-mono text-white">{res2.m}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                      <span className="text-[#94a3b8]">Angle of incline (θ)</span>
                      <span className="text-white font-mono">{fmt(res2.thetaDeg)}° &nbsp; ({fmt(res2.thetaRad)} rad)</span>
                    </div>
                    
                    <div className="py-4 border-b border-white/5">
                        <span className="text-[#94a3b8] block mb-2">Possible Points at Distance {fmt(res2.d)}</span>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white/5 p-3 rounded-lg text-center">
                                <span className="block text-xs text-[#94a3b8] mb-1">Point A</span>
                                <span className="font-mono text-white">({fmt(res2.pts[0].x)}, {fmt(res2.pts[0].y)})</span>
                            </div>
                            <div className="bg-white/5 p-3 rounded-lg text-center">
                                <span className="block text-xs text-[#94a3b8] mb-1">Point B</span>
                                <span className="font-mono text-white">({fmt(res2.pts[1].x)}, {fmt(res2.pts[1].y)})</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <span className="text-[#94a3b8]">Equation</span>
                      <span className="text-[#38bdf8] font-bold font-mono text-lg">{res2.eq}</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

    </motion.div>
  );
}
