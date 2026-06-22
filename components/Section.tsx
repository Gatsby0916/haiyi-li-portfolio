import { type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  id: string;
  label: string;
  children: ReactNode;
}

export default function Section({ id, label, children }: SectionProps) {
  return (
    <section id={id} className="max-w-5xl mx-auto px-6 py-28 border-t border-white/8">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
      >
        <p className="font-mono text-[13px] tracking-[0.3em] text-white/35 uppercase mb-14">
          {label}
        </p>
        {children}
      </motion.div>
    </section>
  );
}
