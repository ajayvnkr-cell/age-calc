import { Outlet, Link, useLocation } from 'react-router-dom';
import { Calculator, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Layout() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/math', label: 'Math Calculators' },
    { path: '/about', label: 'About Us' },
    { path: '/contact', label: 'Contact Us' },
    { path: '/privacy', label: 'Privacy Policy' },
  ];

  return (
    <div className="min-h-screen bg-[#0f172a] text-[#f8fafc] flex flex-col font-sans relative overflow-hidden">
      {/* Mesh gradients */}
      <div className="absolute w-[600px] h-[600px] rounded-full blur-[120px] -top-[200px] -left-[100px] bg-sky-400/30 z-0 pointer-events-none"></div>
      <div className="absolute w-[600px] h-[600px] rounded-full blur-[120px] -bottom-[200px] -right-[100px] bg-violet-500/30 z-0 pointer-events-none"></div>

      <header className="relative z-20 h-20 flex items-center px-4 sm:px-10 border-b border-white/5 bg-[#0f172a]/80 backdrop-blur-md">
        <div className="flex w-full justify-between items-center max-w-7xl mx-auto">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#38bdf8] rounded-lg grid place-items-center">
              <Calculator className="h-[18px] w-[18px] text-[#0f172a]" strokeWidth={2.5} />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-white">agecalculator<span className="text-[#38bdf8]">.co.in</span></span>
          </Link>
          
          <nav className="hidden sm:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-[#38bdf8]'
                    : 'text-[#94a3b8] hover:text-[#38bdf8]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button 
            className="sm:hidden text-[#94a3b8] hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="sm:hidden absolute top-20 left-0 w-full z-50 bg-[#0f172a] shadow-2xl border-b border-white/5">
          <nav className="flex flex-col p-4 gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'bg-[#38bdf8]/10 text-[#38bdf8]'
                    : 'text-[#94a3b8] hover:bg-white/5 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-10 py-10 relative z-10 flex flex-col">
        <Outlet />
      </main>

      <footer className="relative z-10 min-h-[60px] py-4 px-4 sm:px-10 flex items-center justify-between border-t border-white/5 text-xs text-[#64748b]">
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            &copy; {new Date().getFullYear()} Calculator.net &bull; Precision matters.
          </div>
          <div className="flex gap-5">
            <Link to="/privacy" className="text-[#94a3b8] hover:text-[#38bdf8] transition-colors">Privacy Policy</Link>
            <Link to="/contact" className="text-[#94a3b8] hover:text-[#38bdf8] transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
