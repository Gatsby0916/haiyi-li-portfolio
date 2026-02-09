
import React from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  title: string;
  children: React.ReactNode;
  id?: string;
  className?: string;
  accentFrom?: string;
  accentTo?: string;
  accentSoft?: string;
}

const Section: React.FC<SectionProps> = ({ title, children, id, className = "", accentFrom, accentTo, accentSoft }) => {
  const style = {
    ['--section-accent-from' as string]: accentFrom ?? '#0c4a6e',
    ['--section-accent-to' as string]: accentTo ?? '#0284c7',
    ['--section-accent-soft' as string]: accentSoft ?? 'rgba(2, 132, 199, 0.08)'
  } as React.CSSProperties & Record<string, string>;

  return (
    <section id={id} style={style} className={`py-24 md:py-32 border-t border-slate-200/60 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="flex flex-col md:flex-row gap-8 md:gap-0">
          <div className="md:w-[250px] shrink-0 relative pr-6 md:pr-12 md:border-r md:border-slate-200/60">
            <div className="sticky top-28">
              <div className="hidden md:block absolute inset-0 -z-10 rounded-3xl bg-[linear-gradient(180deg,var(--section-accent-soft),transparent_65%)]" />
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 leading-tight">
                {title}
              </h2>
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: '40px' }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="h-1 bg-gradient-to-r from-[var(--section-accent-from)] to-[var(--section-accent-to)] mt-4 rounded-full"
              />
            </div>
          </div>
          <div className="flex-1 min-w-0 md:pl-12">
            {children}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Section;
