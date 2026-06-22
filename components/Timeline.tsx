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

function Row({ date, tag, children }: { date: string; tag?: string; children: React.ReactNode }) {
  return (
    <div className="relative flex gap-6 items-start pl-0">
      <DiamondNode />
      <span className="font-mono text-[0.7rem] text-white/28 w-32 shrink-0 pt-0.5 leading-relaxed">
        {date}
      </span>
      <div className="flex-1 min-w-0">
        {tag && (
          <span className="font-mono text-[9px] tracking-widest text-white/22 uppercase block mb-0.5">
            [{tag}]
          </span>
        )}
        {children}
      </div>
    </div>
  );
}

function GroupLabel({ text }: { text: string }) {
  return (
    <p className="font-mono text-[10px] tracking-[0.25em] text-white/22 uppercase mb-6 -ml-6 pt-2">
      {text}
    </p>
  );
}

export default function Timeline({ education, experience, awards }: TimelineProps) {
  return (
    <div className="relative pl-6 border-l border-white/10 space-y-8">
      <GroupLabel text="EDUCATION" />
      {education.map(edu => (
        <Row key={edu.id} date={edu.period}>
          <p className="font-sans font-semibold text-white text-[0.95rem]">{edu.institution}</p>
          <p className="font-sans text-sm text-white/55 mt-0.5">
            {edu.degree}{edu.ranking ? ` · ${edu.ranking}` : ''}
          </p>
        </Row>
      ))}

      <GroupLabel text="EXPERIENCE" />
      {experience.map(exp => (
        <Row key={exp.id} date={exp.period} tag={EXP_TAG[exp.id]}>
          <p className="font-sans font-semibold text-white text-[0.95rem]">{exp.institution}</p>
          <p className="font-sans text-sm text-white/55 mt-0.5">{exp.role}</p>
        </Row>
      ))}

      <GroupLabel text="HONORS" />
      {awards.map(award => (
        <Row key={award.id} date={award.year}>
          <p className="font-sans text-sm text-white/80">
            <span className="font-semibold text-white">{award.title}</span>
            <span className="text-white/40"> · {award.issuer}</span>
            {award.selectivity && (
              <span className="font-mono text-[0.65rem] text-white/28 ml-2">{award.selectivity}</span>
            )}
          </p>
        </Row>
      ))}
    </div>
  );
}
