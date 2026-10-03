import { motion } from 'framer-motion';
import { NewsItem, NewsType } from '../types';

interface NewsProps {
  items: NewsItem[];
  language: 'en' | 'zh';
}

const TYPE_STYLE: Record<NewsType, { en: string; zh: string; color: string }> = {
  admission: { en: 'Admission', zh: '录取', color: '#e0566b' },
  talk: { en: 'Talk', zh: '报告', color: '#c4a5ff' },
  paper: { en: 'Paper', zh: '论文', color: '#7cc4ff' },
  award: { en: 'Award', zh: '获奖', color: '#f2c46d' },
  research: { en: 'Research', zh: '科研', color: '#6fdcb0' },
};

const MONTHS_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function formatMonth(date: string, language: 'en' | 'zh') {
  const month = Number(date.slice(5, 7));
  return language === 'zh' ? `${month} 月` : MONTHS_EN[month - 1];
}

export default function News({ items, language }: NewsProps) {
  const years = items.reduce<{ year: string; items: NewsItem[] }[]>((groups, item) => {
    const year = item.date.slice(0, 4);
    const last = groups[groups.length - 1];
    if (last && last.year === year) last.items.push(item);
    else groups.push({ year, items: [item] });
    return groups;
  }, []);

  let index = 0;

  return (
    <div className="space-y-14">
      {years.map(group => (
        <div key={group.year} className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-4 md:gap-10">
          {/* Year marker */}
          <div className="md:sticky md:top-24 self-start">
            <p className="font-serif text-5xl md:text-6xl font-bold leading-none text-transparent bg-clip-text bg-gradient-to-b from-white/45 to-white/5 select-none">
              {group.year}
            </p>
          </div>

          {/* Entries */}
          <div className="relative">
            <div
              className="absolute left-[5px] top-2 bottom-2 w-px"
              style={{ background: 'linear-gradient(to bottom, rgba(165,28,48,0.7), rgba(255,255,255,0.08) 60%, rgba(255,255,255,0.03))' }}
              aria-hidden="true"
            />

            <div className="space-y-3">
              {group.items.map(item => {
                const i = index++;
                const style = TYPE_STYLE[item.type];
                const isLatest = i === 0;

                return (
                  <motion.div
                    key={item.id}
                    className="relative pl-9"
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.5, ease: 'easeOut', delay: (i % 4) * 0.07 }}
                  >
                    {/* Node */}
                    <span className="absolute left-0 top-[22px] flex h-[11px] w-[11px]" aria-hidden="true">
                      {isLatest && (
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ background: style.color }} />
                      )}
                      <span
                        className="relative inline-flex h-[11px] w-[11px] rounded-full border-2 bg-[#0a0a0a]"
                        style={{ borderColor: style.color, boxShadow: item.highlight ? `0 0 12px ${style.color}` : undefined }}
                      />
                    </span>

                    <div
                      className={`group relative rounded-lg px-5 py-4 border transition-all duration-300 hover:translate-x-1 ${
                        item.highlight
                          ? 'border-white/10 bg-white/[0.035] hover:bg-white/[0.06] hover:border-white/20'
                          : 'border-transparent hover:border-white/10 hover:bg-white/[0.03]'
                      }`}
                    >
                      {item.highlight && (
                        <span
                          className="absolute left-0 top-3 bottom-3 w-[2px] rounded-full"
                          style={{ background: style.color }}
                          aria-hidden="true"
                        />
                      )}

                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-1.5">
                        <span className="font-mono text-xs tracking-widest uppercase text-white/40 w-12">
                          {formatMonth(item.date, language)}
                        </span>
                        <span
                          className="font-mono text-[10px] tracking-[0.2em] uppercase px-2 py-[2px] rounded-sm border"
                          style={{ color: style.color, borderColor: `${style.color}55`, background: `${style.color}12` }}
                        >
                          {style[language]}
                        </span>
                        {item.place && (
                          <span className="font-mono text-[11px] text-white/30">
                            ◦ {item.place}
                          </span>
                        )}
                      </div>

                      <p className={`font-sans leading-relaxed ${item.highlight ? 'text-[1.05rem] text-white/90 font-medium' : 'text-base text-white/65 group-hover:text-white/80'} transition-colors`}>
                        {item.title}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
