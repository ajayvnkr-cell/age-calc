import { Outlet, Link, useLocation } from 'react-router-dom';
import { Calculator } from 'lucide-react';

export default function Layout() {
  const location = useLocation();

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

      <header className="relative z-10 h-20 flex items-center px-4 sm:px-10 border-b border-white/5">
        <div className="flex w-full justify-between items-center max-w-7xl mx-auto">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#38bdf8] rounded-lg grid place-items-center">
              <Calculator className="h-[18px] w-[18px] text-[#0f172a]" strokeWidth={2.5} />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-white">AgeCalc<span className="text-[#38bdf8]">.net</span></span>
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
        </div>
      </header>

      {/* Mobile Navigation */}
      <div className="sm:hidden relative z-10 border-b border-white/5 pb-2 px-2 pt-2">
        <nav className="flex space-x-1 overflow-x-auto p-2 hide-scrollbar">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`whitespace-nowrap px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === link.path
                  ? 'bg-white/10 text-[#38bdf8]'
                  : 'text-[#94a3b8] hover:text-[#38bdf8]'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-10 py-10 relative z-10 flex flex-col">
        <Outlet />
      </main>

      <footer className="relative z-10 h-[60px] px-4 sm:px-10 flex items-center justify-between border-t border-white/5 text-xs text-[#64748b]">
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-center">
          <div className="mb-2 md:mb-0">
            &copy; {new Date().getFullYear()} AgeCalc.net &bull; Precision matters.
          </div>
          <div className="flex gap-5">
            <Link to="/privacy" className="text-[#94a3b8] hover:text-[#38bdf8] transition-colors">Privacy Policy</Link>
            <Link to="/contact" className="text-[#94a3b8] hover:text-[#38bdf8] transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
