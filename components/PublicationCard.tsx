import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Publication } from '../types';

interface PublicationEntryProps {
  pub: Publication;
  index: number;
}

export default function PublicationEntry({ pub, index }: PublicationEntryProps) {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative py-8 border-b border-white/8 first:border-t first:border-white/8 transition-colors duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Left accent bar */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-px bg-white/40 origin-top"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      />

      <div className="flex gap-6 items-start">
        <span className="font-mono text-sm text-white/25 w-8 shrink-0 pt-[3px]">
          [{String(index + 1).padStart(2, '0')}]
        </span>

        <div className="flex-1 min-w-0">
          <button
            onClick={() => setExpanded(v => !v)}
            className="text-left w-full group"
          >
            <h3 className="font-serif italic text-2xl text-white/85 group-hover:text-white transition-colors leading-snug">
              {pub.title}
            </h3>
          </button>

          <p className="font-sans text-sm text-white/45 mt-2.5 leading-relaxed">
            {pub.authors.map((author, i) => (
              <span key={i}>
                {i > 0 && <span className="text-white/20">, </span>}
                <span className={author === 'Haiyi Li' ? 'text-white/85 font-semibold' : ''}>
                  {author}
                </span>
              </span>
            ))}
          </p>

          <div className="flex items-center flex-wrap gap-x-3 gap-y-1 mt-2.5">
            <span className="font-mono text-xs text-white/40">{pub.venue}</span>
            {pub.status !== 'Accepted' && pub.status !== 'Published' && (
              <>
                <span className="font-mono text-xs text-white/20">·</span>
                <span className="font-mono text-xs text-white/40">{pub.status}</span>
              </>
            )}
            <span className="font-mono text-xs text-white/20">·</span>
            <span className="font-mono text-xs text-white/40">{pub.year}</span>
            {pub.links?.doi && (
              <>
                <span className="font-mono text-xs text-white/20">·</span>
                <a
                  href={pub.links.doi}
                  target="_blank"
                  rel="noreferrer"
                  onClick={e => e.stopPropagation()}
                  className="font-mono text-xs text-white/45 hover:text-white/75 transition-colors"
                >
                  ↗ Paper
                </a>
              </>
            )}
            {pub.showArxiv && pub.links?.arxiv && (
              <>
                <span className="font-mono text-xs text-white/20">·</span>
                <a
                  href={pub.links.arxiv}
                  target="_blank"
                  rel="noreferrer"
                  onClick={e => e.stopPropagation()}
                  className="font-mono text-xs text-white/45 hover:text-white/75 transition-colors"
                >
                  ↗ arXiv
                </a>
              </>
            )}
          </div>

          <AnimatePresence>
            {expanded && (
              <motion.div
                key="desc"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <p className="font-sans text-[0.95rem] text-white/50 mt-5 leading-relaxed">
                  {pub.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
