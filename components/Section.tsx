import { type ReactNode } from 'react';

interface SectionProps {
  id: string;
  label: string;
  children: ReactNode;
}

export default function Section({ id, label, children }: SectionProps) {
  return (
    <section id={id} className="max-w-5xl mx-auto px-6 py-24 border-t border-white/8">
      <p className="font-mono text-[11px] tracking-[0.3em] text-white/35 uppercase mb-12">
        {label}
      </p>
      {children}
    </section>
  );
}
