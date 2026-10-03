import { motion } from 'framer-motion';
import { NewsItem } from '../types';

interface NewsProps {
  items: NewsItem[];
}

export default function News({ items }: NewsProps) {
  return (
    <div className="relative pl-6 border-l border-white/10 space-y-7">
      {items.map((item, i) => (
        <motion.div
          key={item.id}
          className="relative flex flex-col sm:flex-row gap-1 sm:gap-6 items-start"
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.06 }}
        >
          <div className="absolute -left-[25px] top-[6px] w-2 h-2 rotate-45 border border-white/30 bg-[#0a0a0a]" />
          <span className="font-mono text-sm text-white/28 sm:w-36 shrink-0 pt-0.5 leading-relaxed">
            {item.date}
          </span>
          <p className="flex-1 min-w-0 font-sans text-base text-white/80 leading-relaxed">
            {item.title}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
