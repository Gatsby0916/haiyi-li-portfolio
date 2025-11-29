
import React from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  title: string;
  children: React.ReactNode;
  id?: string;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ title, children, id, className = "" }) => {
  return (
    <section id={id} className={`py-24 md:py-32 border-t border-slate-200/60 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="flex flex-col md:flex-row gap-8 md:gap-20">
          <div className="md:w-1/5 shrink-0 relative">
            <div className="sticky top-28">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">
                {title}
              </h2>
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: '40px' }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="h-1 bg-primary-900 mt-4 rounded-full"
              />
            </div>
          </div>
          <div className="md:w-4/5">
            {children}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Section;
