import { motion } from 'motion/react';
import { Leaf, ShieldCheck, Users } from 'lucide-react';

export default function About() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-10 w-full"
    >
      <div className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-white">About Us</h1>
        <p className="mt-4 text-lg text-[#94a3b8]">
          We build simple, fast, and reliable tools to make your daily calculations easier.
        </p>
      </div>

      <div className="glass p-8 md:p-10 text-[#cbd5e1] space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">Our Mission</h2>
          <p className="leading-relaxed">
            At AgeCalc, our mission is to provide accurate and easy-to-use digital calculators for everyone. We noticed that many online tools are cluttered with ads and complex interfaces. We decided to build a clean, ad-free, and lightning-fast alternative.
          </p>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">Why Choose Us?</h2>
          <p className="leading-relaxed">
            Whether you are figuring out your exact age in seconds, planning for an upcoming milestone, or calculating date differences for official documents, our tools are built to give you precise answers instantly.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="glass p-8 text-center flex flex-col items-center">
          <div className="w-12 h-12 bg-[#38bdf8]/20 text-[#38bdf8] rounded-xl flex items-center justify-center mb-5">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h3 className="font-bold text-white mb-2 text-lg">Privacy First</h3>
          <p className="text-sm text-[#94a3b8] leading-relaxed">We do not store or track your dates of birth or calculation queries.</p>
        </div>
        <div className="glass p-8 text-center flex flex-col items-center">
          <div className="w-12 h-12 bg-[#38bdf8]/20 text-[#38bdf8] rounded-xl flex items-center justify-center mb-5">
            <Leaf className="h-6 w-6" />
          </div>
          <h3 className="font-bold text-white mb-2 text-lg">Clean Design</h3>
          <p className="text-sm text-[#94a3b8] leading-relaxed">A clutter-free interface that focuses solely on giving you the information you need.</p>
        </div>
        <div className="glass p-8 text-center flex flex-col items-center">
          <div className="w-12 h-12 bg-[#38bdf8]/20 text-[#38bdf8] rounded-xl flex items-center justify-center mb-5">
            <Users className="h-6 w-6" />
          </div>
          <h3 className="font-bold text-white mb-2 text-lg">User Centric</h3>
          <p className="text-sm text-[#94a3b8] leading-relaxed">Constantly improving based on user feedback to add the features you actually want.</p>
        </div>
      </div>
    </motion.div>
  );
}
