import { useState } from 'react';
import { motion } from 'motion/react';

export default function VolumeCalculator() {
  const [activeTab, setActiveTab] = useState('sphere');

  const [sphereR, setSphereR] = useState('');
  const [sphereVol, setSphereVol] = useState<string | null>(null);

  const calcSphere = () => {
      const r = parseFloat(sphereR);
      if (isNaN(r) || r < 0) return setSphereVol('Invalid');
      setSphereVol(((4/3)*Math.PI*Math.pow(r,3)).toFixed(5));
  };

  const [coneR, setConeR] = useState('');
  const [coneH, setConeH] = useState('');
  const [coneVol, setConeVol] = useState<string | null>(null);

  const calcCone = () => {
    const r = parseFloat(coneR); const h = parseFloat(coneH);
    if (isNaN(r) || isNaN(h) || r < 0 || h < 0) return setConeVol('Invalid');
    setConeVol(((1/3)*Math.PI*r*r*h).toFixed(5));
  };

  const [cubeA, setCubeA] = useState('');
  const [cubeVol, setCubeVol] = useState<string | null>(null);

  const calcCube = () => {
    const a = parseFloat(cubeA);
    if (isNaN(a) || a < 0) return setCubeVol('Invalid');
    setCubeVol((a*a*a).toFixed(5));
  };

  const [cylR, setCylR] = useState('');
  const [cylH, setCylH] = useState('');
  const [cylVol, setCylVol] = useState<string | null>(null);

  const calcCyl = () => {
    const r = parseFloat(cylR); const h = parseFloat(cylH);
    if (isNaN(r) || isNaN(h) || r < 0 || h < 0) return setCylVol('Invalid');
    setCylVol((Math.PI*r*r*h).toFixed(5));
  };

  const [rectL, setRectL] = useState('');
  const [rectW, setRectW] = useState('');
  const [rectH, setRectH] = useState('');
  const [rectVol, setRectVol] = useState<string | null>(null);

  const calcRect = () => {
    const l = parseFloat(rectL); const w = parseFloat(rectW); const h = parseFloat(rectH);
    if (isNaN(l) || isNaN(w) || isNaN(h) || l < 0 || w < 0 || h < 0) return setRectVol('Invalid');
    setRectVol((l*w*h).toFixed(5));
  };

  const [capR, setCapR] = useState('');
  const [capH, setCapH] = useState('');
  const [capVol, setCapVol] = useState<string | null>(null);

  const calcCapsule = () => {
    const r = parseFloat(capR); const h = parseFloat(capH);
    if (isNaN(r) || isNaN(h) || r < 0 || h < 0) return setCapVol('Invalid');
    setCapVol((Math.PI*r*r*h + (4/3)*Math.PI*r*r*r).toFixed(5));
  };

  const [sCapR, setSCapR] = useState('');
  const [sCapBallR, setSCapBallR] = useState('');
  const [sCapH, setSCapH] = useState('');
  const [sCapVol, setSCapVol] = useState<string | null>(null);

  const calcSCap = () => {
    let r = parseFloat(sCapR); let R = parseFloat(sCapBallR); let h = parseFloat(sCapH);
    let validCount = 0;
    if (!isNaN(r)) validCount++; if (!isNaN(R)) validCount++; if (!isNaN(h)) validCount++;
    if (validCount < 2) return setSCapVol('Provide any 2 values');

    if (isNaN(h)) h = R - Math.sqrt(R*R - r*r);
    if (isNaN(R)) R = (h*h + r*r) / (2*h);
    if (isNaN(r)) r = Math.sqrt(2*R*h - h*h);

    if (isNaN(r) || isNaN(R) || isNaN(h) || r < 0 || R < 0 || h < 0) return setSCapVol('Invalid');
    setSCapVol(((1/3)*Math.PI*h*h*(3*R - h)).toFixed(5));
  };

  const [cFrustRt, setCFrustRt] = useState('');
  const [cFrustRb, setCFrustRb] = useState('');
  const [cFrustH, setCFrustH] = useState('');
  const [cFrustVol, setCFrustVol] = useState<string | null>(null);

  const calcCFrust = () => {
    const r = parseFloat(cFrustRt); const R = parseFloat(cFrustRb); const h = parseFloat(cFrustH);
    if (isNaN(r) || isNaN(R) || isNaN(h) || r < 0 || R < 0 || h < 0) return setCFrustVol('Invalid');
    setCFrustVol(((1/3)*Math.PI*h*(r*r + r*R + R*R)).toFixed(5));
  };

  const [elA, setElA] = useState('');
  const [elB, setElB] = useState('');
  const [elC, setElC] = useState('');
  const [elVol, setElVol] = useState<string | null>(null);

  const calcEl = () => {
    const a = parseFloat(elA); const b = parseFloat(elB); const c = parseFloat(elC);
    if (isNaN(a) || isNaN(b) || isNaN(c) || a < 0 || b < 0 || c < 0) return setElVol('Invalid');
    setElVol(((4/3)*Math.PI*a*b*c).toFixed(5));
  };

  const [spA, setSpA] = useState('');
  const [spH, setSpH] = useState('');
  const [spVol, setSpVol] = useState<string | null>(null);

  const calcSp = () => {
    const a = parseFloat(spA); const h = parseFloat(spH);
    if (isNaN(a) || isNaN(h) || a < 0 || h < 0) return setSpVol('Invalid');
    setSpVol(((1/3)*a*a*h).toFixed(5));
  };

  const [tubeD1, setTubeD1] = useState('');
  const [tubeD2, setTubeD2] = useState('');
  const [tubeL, setTubeL] = useState('');
  const [tubeVol, setTubeVol] = useState<string | null>(null);

  const calcTube = () => {
    const d1 = parseFloat(tubeD1); const d2 = parseFloat(tubeD2); const l = parseFloat(tubeL);
    if (isNaN(d1) || isNaN(d2) || isNaN(l) || d1 < 0 || d2 < 0 || l < 0 || d2 > d1) return setTubeVol('Invalid');
    setTubeVol((Math.PI * (d1*d1 - d2*d2) / 4 * l).toFixed(5));
  };


  const tabs = [
    { id: 'sphere', name: 'Sphere' },
    { id: 'cone', name: 'Cone' },
    { id: 'cube', name: 'Cube' },
    { id: 'cylinder', name: 'Cylinder' },
    { id: 'rectangular', name: 'Rect. Tank' },
    { id: 'capsule', name: 'Capsule' },
    { id: 'spherical-cap', name: 'Spherical Cap' },
    { id: 'conical-frustum', name: 'Conical Frustum' },
    { id: 'ellipsoid', name: 'Ellipsoid' },
    { id: 'square-pyramid', name: 'Square Pyramid' },
    { id: 'tube', name: 'Tube' },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto w-full space-y-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-4">Volume Calculator</h1>
        <p className="text-[#94a3b8]">Computes the volumes of common shapes.</p>
      </div>

      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              activeTab === tab.id ? 'bg-[#38bdf8] text-[#0f172a]' : 'bg-white/5 text-[#94a3b8] hover:text-white'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      <div className="glass p-8 max-w-xl mx-auto">
        {activeTab === 'sphere' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white text-center">Sphere</h2>
            <div>
              <label className="block text-sm text-[#94a3b8] mb-1">Radius (r)</label>
              <input type="number" value={sphereR} onChange={e => setSphereR(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white" />
            </div>
            <button onClick={calcSphere} className="w-full bg-[#38bdf8] text-[#0f172a] rounded-xl py-3 font-bold hover:bg-[#0ea5e9]">Calculate</button>
            {sphereVol && <div className="text-center text-3xl font-bold text-[#38bdf8] mt-6">Volume: {sphereVol}</div>}
          </div>
        )}

        {activeTab === 'cone' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white text-center">Cone</h2>
            <div>
              <label className="block text-sm text-[#94a3b8] mb-1">Base Radius (r)</label>
              <input type="number" value={coneR} onChange={e => setConeR(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white" />
            </div>
            <div>
              <label className="block text-sm text-[#94a3b8] mb-1">Height (h)</label>
              <input type="number" value={coneH} onChange={e => setConeH(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white" />
            </div>
            <button onClick={calcCone} className="w-full bg-[#38bdf8] text-[#0f172a] rounded-xl py-3 font-bold hover:bg-[#0ea5e9]">Calculate</button>
            {coneVol && <div className="text-center text-3xl font-bold text-[#38bdf8] mt-6">Volume: {coneVol}</div>}
          </div>
        )}

        {activeTab === 'cube' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white text-center">Cube</h2>
            <div>
              <label className="block text-sm text-[#94a3b8] mb-1">Edge Length (a)</label>
              <input type="number" value={cubeA} onChange={e => setCubeA(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white" />
            </div>
            <button onClick={calcCube} className="w-full bg-[#38bdf8] text-[#0f172a] rounded-xl py-3 font-bold hover:bg-[#0ea5e9]">Calculate</button>
            {cubeVol && <div className="text-center text-3xl font-bold text-[#38bdf8] mt-6">Volume: {cubeVol}</div>}
          </div>
        )}

        {activeTab === 'cylinder' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white text-center">Cylinder</h2>
            <div>
              <label className="block text-sm text-[#94a3b8] mb-1">Base Radius (r)</label>
              <input type="number" value={cylR} onChange={e => setCylR(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white" />
            </div>
            <div>
              <label className="block text-sm text-[#94a3b8] mb-1">Height (h)</label>
              <input type="number" value={cylH} onChange={e => setCylH(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white" />
            </div>
            <button onClick={calcCyl} className="w-full bg-[#38bdf8] text-[#0f172a] rounded-xl py-3 font-bold hover:bg-[#0ea5e9]">Calculate</button>
            {cylVol && <div className="text-center text-3xl font-bold text-[#38bdf8] mt-6">Volume: {cylVol}</div>}
          </div>
        )}

        {activeTab === 'rectangular' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white text-center">Rectangular Tank</h2>
            <div>
              <label className="block text-sm text-[#94a3b8] mb-1">Length (l)</label>
              <input type="number" value={rectL} onChange={e => setRectL(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white" />
            </div>
            <div>
              <label className="block text-sm text-[#94a3b8] mb-1">Width (w)</label>
              <input type="number" value={rectW} onChange={e => setRectW(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white" />
            </div>
            <div>
              <label className="block text-sm text-[#94a3b8] mb-1">Height (h)</label>
              <input type="number" value={rectH} onChange={e => setRectH(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white" />
            </div>
            <button onClick={calcRect} className="w-full bg-[#38bdf8] text-[#0f172a] rounded-xl py-3 font-bold hover:bg-[#0ea5e9]">Calculate</button>
            {rectVol && <div className="text-center text-3xl font-bold text-[#38bdf8] mt-6">Volume: {rectVol}</div>}
          </div>
        )}

        {activeTab === 'capsule' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white text-center">Capsule</h2>
            <div>
              <label className="block text-sm text-[#94a3b8] mb-1">Base Radius (r)</label>
              <input type="number" value={capR} onChange={e => setCapR(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white" />
            </div>
            <div>
              <label className="block text-sm text-[#94a3b8] mb-1">Height (h)</label>
              <input type="number" value={capH} onChange={e => setCapH(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white" />
            </div>
            <button onClick={calcCapsule} className="w-full bg-[#38bdf8] text-[#0f172a] rounded-xl py-3 font-bold hover:bg-[#0ea5e9]">Calculate</button>
            {capVol && <div className="text-center text-3xl font-bold text-[#38bdf8] mt-6">Volume: {capVol}</div>}
          </div>
        )}

        {activeTab === 'spherical-cap' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white text-center">Spherical Cap</h2>
            <p className="text-sm text-[#94a3b8] text-center">Provide any 2 values.</p>
            <div>
              <label className="block text-sm text-[#94a3b8] mb-1">Base Radius (r)</label>
              <input type="number" value={sCapR} onChange={e => setSCapR(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white" />
            </div>
            <div>
              <label className="block text-sm text-[#94a3b8] mb-1">Ball Radius (R)</label>
              <input type="number" value={sCapBallR} onChange={e => setSCapBallR(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white" />
            </div>
            <div>
              <label className="block text-sm text-[#94a3b8] mb-1">Height (h)</label>
              <input type="number" value={sCapH} onChange={e => setSCapH(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white" />
            </div>
            <button onClick={calcSCap} className="w-full bg-[#38bdf8] text-[#0f172a] rounded-xl py-3 font-bold hover:bg-[#0ea5e9]">Calculate</button>
            {sCapVol && <div className="text-center text-3xl font-bold text-[#38bdf8] mt-6">Volume: {sCapVol}</div>}
          </div>
        )}

        {activeTab === 'conical-frustum' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white text-center">Conical Frustum</h2>
            <div>
              <label className="block text-sm text-[#94a3b8] mb-1">Top Radius (r)</label>
              <input type="number" value={cFrustRt} onChange={e => setCFrustRt(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white" />
            </div>
            <div>
              <label className="block text-sm text-[#94a3b8] mb-1">Bottom Radius (R)</label>
              <input type="number" value={cFrustRb} onChange={e => setCFrustRb(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white" />
            </div>
            <div>
              <label className="block text-sm text-[#94a3b8] mb-1">Height (h)</label>
              <input type="number" value={cFrustH} onChange={e => setCFrustH(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white" />
            </div>
            <button onClick={calcCFrust} className="w-full bg-[#38bdf8] text-[#0f172a] rounded-xl py-3 font-bold hover:bg-[#0ea5e9]">Calculate</button>
            {cFrustVol && <div className="text-center text-3xl font-bold text-[#38bdf8] mt-6">Volume: {cFrustVol}</div>}
          </div>
        )}

        {activeTab === 'ellipsoid' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white text-center">Ellipsoid</h2>
            <div>
              <label className="block text-sm text-[#94a3b8] mb-1">Axis 1 (a)</label>
              <input type="number" value={elA} onChange={e => setElA(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white" />
            </div>
            <div>
              <label className="block text-sm text-[#94a3b8] mb-1">Axis 2 (b)</label>
              <input type="number" value={elB} onChange={e => setElB(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white" />
            </div>
            <div>
              <label className="block text-sm text-[#94a3b8] mb-1">Axis 3 (c)</label>
              <input type="number" value={elC} onChange={e => setElC(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white" />
            </div>
            <button onClick={calcEl} className="w-full bg-[#38bdf8] text-[#0f172a] rounded-xl py-3 font-bold hover:bg-[#0ea5e9]">Calculate</button>
            {elVol && <div className="text-center text-3xl font-bold text-[#38bdf8] mt-6">Volume: {elVol}</div>}
          </div>
        )}

        {activeTab === 'square-pyramid' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white text-center">Square Pyramid</h2>
            <div>
              <label className="block text-sm text-[#94a3b8] mb-1">Base Edge (a)</label>
              <input type="number" value={spA} onChange={e => setSpA(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white" />
            </div>
            <div>
              <label className="block text-sm text-[#94a3b8] mb-1">Height (h)</label>
              <input type="number" value={spH} onChange={e => setSpH(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white" />
            </div>
            <button onClick={calcSp} className="w-full bg-[#38bdf8] text-[#0f172a] rounded-xl py-3 font-bold hover:bg-[#0ea5e9]">Calculate</button>
            {spVol && <div className="text-center text-3xl font-bold text-[#38bdf8] mt-6">Volume: {spVol}</div>}
          </div>
        )}

        {activeTab === 'tube' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white text-center">Tube</h2>
            <div>
              <label className="block text-sm text-[#94a3b8] mb-1">Outer Diameter (d1)</label>
              <input type="number" value={tubeD1} onChange={e => setTubeD1(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white" />
            </div>
            <div>
              <label className="block text-sm text-[#94a3b8] mb-1">Inner Diameter (d2)</label>
              <input type="number" value={tubeD2} onChange={e => setTubeD2(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white" />
            </div>
            <div>
              <label className="block text-sm text-[#94a3b8] mb-1">Length (l)</label>
              <input type="number" value={tubeL} onChange={e => setTubeL(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white" />
            </div>
            <button onClick={calcTube} className="w-full bg-[#38bdf8] text-[#0f172a] rounded-xl py-3 font-bold hover:bg-[#0ea5e9]">Calculate</button>
            {tubeVol && <div className="text-center text-3xl font-bold text-[#38bdf8] mt-6">Volume: {tubeVol}</div>}
          </div>
        )}
      </div>

    </motion.div>
  );
}
