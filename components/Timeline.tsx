import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Education, Experience, Award } from '../types';

interface TimelineProps {
  education: Education[];
  experience: Experience[];
  awards: Award[];
}

const EXP_TAG: Record<string, string> = {
  aiml: 'RESEARCH',
  csiro: 'INDUSTRY',
  robinson: 'RESEARCH',
};

function DiamondNode() {
  return (
    <div className="absolute -left-[25px] top-[6px] w-2 h-2 rotate-45 border border-white/30 bg-[#0a0a0a]" />
  );
}

function Row({ date, tag, children, index }: { date: string; tag?: string; children: ReactNode; index: number }) {
  return (
    <motion.div
      className="relative flex gap-6 items-start pl-0"
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.06 }}
    >
      <DiamondNode />
      <span className="font-mono text-xs text-white/28 w-36 shrink-0 pt-0.5 leading-relaxed">
        {date}
      </span>
      <div className="flex-1 min-w-0">
        {tag && (
          <span className="font-mono text-[10px] tracking-widest text-white/22 uppercase block mb-0.5">
            [{tag}]
          </span>
        )}
        {children}
      </div>
    </motion.div>
  );
}

function GroupLabel({ text }: { text: string }) {
  return (
    <p className="font-mono text-[11px] tracking-[0.25em] text-white/22 uppercase mb-7 -ml-6 pt-2">
      {text}
    </p>
  );
}

export default function Timeline({ education, experience, awards }: TimelineProps) {
  return (
    <div className="relative pl-6 border-l border-white/10 space-y-9">
      <GroupLabel text="EDUCATION" />
      {education.map((edu, i) => (
        <Row key={edu.id} date={edu.period} index={i}>
          <p className="font-sans font-semibold text-white text-[1.05rem]">{edu.institution}</p>
          <p className="font-sans text-[0.9rem] text-white/55 mt-1">
            {edu.degree}{edu.ranking ? ` · ${edu.ranking}` : ''}
          </p>
        </Row>
      ))}

      <GroupLabel text="EXPERIENCE" />
      {experience.map((exp, i) => (
        <Row key={exp.id} date={exp.period} tag={EXP_TAG[exp.id]} index={i}>
          <p className="font-sans font-semibold text-white text-[1.05rem]">{exp.institution}</p>
          <p className="font-sans text-[0.9rem] text-white/55 mt-1">{exp.role}</p>
        </Row>
      ))}

      <GroupLabel text="HONORS" />
      {awards.map((award, i) => (
        <Row key={award.id} date={award.year} index={i}>
          <p className="font-sans text-[0.9rem] text-white/80">
            <span className="font-semibold text-white">{award.title}</span>
            <span className="text-white/40"> · {award.issuer}</span>
            {award.selectivity && (
              <span className="font-mono text-[0.7rem] text-white/28 ml-2">{award.selectivity}</span>
            )}
          </p>
        </Row>
      ))}
    </div>
  );
}
