import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, MapPin, Send } from 'lucide-react';

export default function Contact() {
  const [status, setStatus] = useState<'' | 'sending' | 'sent'>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate API call
    setTimeout(() => {
      setStatus('sent');
    }, 1000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto w-full"
    >
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-white">Contact Us</h1>
        <p className="mt-4 text-lg text-[#94a3b8]">
          Have a question, feature request, or found a bug? Let us know.
        </p>
      </div>

      <div className="grid md:grid-cols-5 gap-8 glass p-8 md:p-10">
        <div className="md:col-span-2 space-y-8 flex flex-col justify-center">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">Get in Touch</h3>
            <p className="text-sm text-[#94a3b8] mb-8 leading-relaxed">
              We try to respond to all inquiries within 24 hours on business days. Your feedback helps us improve.
            </p>
            <div className="space-y-6">
              <div className="flex items-center text-[#cbd5e1]">
                <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center mr-4 shrink-0">
                  <Mail className="h-5 w-5 text-[#38bdf8]" />
                </div>
                <span className="text-sm">support@agecalc-app.com</span>
              </div>
              <div className="flex items-center text-[#cbd5e1]">
                <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center mr-4 shrink-0">
                  <MapPin className="h-5 w-5 text-[#38bdf8]" />
                </div>
                <span className="text-sm">123 Web Tools St<br />San Francisco, CA 94107</span>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-3">
          {status === 'sent' ? (
            <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center p-8 bg-white/5 rounded-xl border border-white/10">
              <div className="w-16 h-16 bg-[#38bdf8]/20 text-[#38bdf8] rounded-full flex items-center justify-center mb-5">
                <Send className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Message Sent!</h3>
              <p className="text-[#94a3b8] mb-8">Thanks for reaching out. We will get back to you shortly.</p>
              <button 
                onClick={() => setStatus('')}
                className="px-6 py-3 bg-white/10 border border-white/10 rounded-xl text-sm font-medium text-white hover:bg-white/20 transition-colors"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label htmlFor="firstName" className="block text-xs uppercase tracking-[1px] text-[#94a3b8] mb-2">First Name</label>
                  <input type="text" id="firstName" required className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#38bdf8]/50 transition-colors" />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-xs uppercase tracking-[1px] text-[#94a3b8] mb-2">Last Name</label>
                  <input type="text" id="lastName" required className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#38bdf8]/50 transition-colors" />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-xs uppercase tracking-[1px] text-[#94a3b8] mb-2">Email Address</label>
                <input type="email" id="email" required className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#38bdf8]/50 transition-colors" />
              </div>
              <div>
                <label htmlFor="message" className="block text-xs uppercase tracking-[1px] text-[#94a3b8] mb-2">Message</label>
                <textarea id="message" rows={4} required className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#38bdf8]/50 transition-colors resize-none"></textarea>
              </div>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full flex justify-center py-3.5 px-4 border-none rounded-xl text-base font-bold text-[#0f172a] bg-[#38bdf8] hover:bg-[#0ea5e9] disabled:opacity-50 transition-colors cursor-pointer"
              >
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </motion.div>
  );
}
