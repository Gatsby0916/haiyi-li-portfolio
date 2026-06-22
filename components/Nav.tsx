import { useState, useEffect } from 'react';

interface NavProps {
  language: 'en' | 'zh';
  onToggleLanguage: () => void;
  navItems: { label: string; href: string }[];
}

export default function Nav({ language, onToggleLanguage, navItems }: NavProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0a0a0a]/90 backdrop-blur-sm border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <a
          href="#"
          className="font-playfair text-lg font-bold text-white tracking-tight"
        >
          HL
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map(item => (
            <a
              key={item.href}
              href={item.href}
              className="font-mono text-[11px] tracking-widest text-white/40 hover:text-white/80 transition-colors uppercase"
            >
              {item.label}
            </a>
          ))}
          <button
            onClick={onToggleLanguage}
            className="font-mono text-[11px] text-white/30 hover:text-white/60 transition-colors tracking-widest"
          >
            {language === 'en' ? 'ZH' : 'EN'}
          </button>
        </nav>

        {/* Mobile: compact bottom row */}
        <button
          onClick={onToggleLanguage}
          className="md:hidden font-mono text-[11px] text-white/30 hover:text-white/60 transition-colors tracking-widest"
        >
          {language === 'en' ? 'ZH' : 'EN'}
        </button>
      </div>
    </header>
  );
}
