import { useState, useEffect } from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Section from './components/Section';
import PublicationEntry from './components/PublicationCard';
import Timeline from './components/Timeline';
import { GitHubIcon, LinkedInIcon, GoogleScholarIcon, OrcidIcon } from './components/Icons';
import { personalInfo, publications, education, experience, awards, skills } from './data';
import { Education, Experience, Award } from './types';

// ─── Translations ────────────────────────────────────────────────────────────

const translations = {
  en: {
    heroPill: 'Academic Portfolio',
    heroTagline: 'Incoming M.S. Computational Science and Engineering · Harvard University',
    nav: {
      about: 'About',
      research: 'Research',
      background: 'Background',
      skills: 'Skills',
    },
    sections: {
      research: 'PUBLICATIONS',
      background: 'BACKGROUND',
      skills: 'SKILLS',
    },
  },
  zh: {
    heroPill: '学术主页',
    heroTagline: '哈佛大学计算科学与工程硕士新生',
    nav: {
      about: '关于我',
      research: '科研成果',
      background: '经历',
      skills: '技能',
    },
    sections: {
      research: '论文',
      background: '学习与工作',
      skills: '技能',
    },
  },
} as const;

type Language = keyof typeof translations;

// ─── ZH overrides ────────────────────────────────────────────────────────────

const aboutTextZh =
  '我即将于 2026 年秋季进入哈佛大学攻读计算科学与工程硕士，目前就读于阿德莱德大学数学科学荣誉学士项目及中国海洋大学数学与应用数学专业。我的研究兴趣位于应用分析与偏微分方程、数值方法、计算机图形学、三维高斯点渲染以及数据驱动的人机协作交互的交汇处。我的目标是构建在数学上可靠、稳定且可解释的模型，用于真实世界中的不确定性建模。';

const educationZh: Record<string, Partial<Education>> = {
  harvard: { institution: '哈佛大学', degree: '计算科学与工程硕士', ranking: '2026 年秋季入学录取', period: '2026 →' },
  adelaide: { institution: '阿德莱德大学', degree: '数学科学荣誉学士学位', ranking: '年级排名第 1' },
  ocean: { institution: '中国海洋大学', degree: '数学与应用数学专业', ranking: '专业排名前 1%' },
};

const experienceZh: Record<string, Partial<Experience>> = {
  aiml: {
    role: '科研助理',
    institution: '阿德莱德大学澳大利亚机器学习研究院（AIML）',
    description: ['在 AIML 的计算机图形学与三维视觉研究环境中担任 RA，聚焦 3D Gaussian Splatting 与场景重建。'],
  },
  csiro: {
    role: '工业见习生',
    institution: '澳大利亚联邦科学与工业研究组织（CSIRO）',
    description: ['研究初始类别结构如何影响群体模型的疫情轨迹。'],
  },
  robinson: {
    role: '科研助理',
    institution: 'IMAGENDO 项目，罗宾逊研究院',
    description: ['面向妇科超声的 AI 流程：负责预处理/数据工具链与病灶检测原型。'],
  },
};

const awardsZh: Record<string, Partial<Award>> = {
  'national-scholarship': { title: '国家奖学金', issuer: '中华人民共和国教育部', selectivity: '获奖率 < 1%' },
  'hurd-prize': { title: '马克·埃德温·赫德纪念奖', issuer: '阿德莱德大学', selectivity: '每年 1 名学生' },
  'summer-research': { title: '暑期科研奖学金', issuer: '阿德莱德大学', selectivity: '录取率 < 5%' },
  'global-citizen': { title: '全球公民卓越奖学金', issuer: '阿德莱德大学', selectivity: '录取率 < 10%' },
  icm: { title: '2024 ICM 美国大学生数学建模大赛 F 奖', issuer: 'COMAP', selectivity: '优胜队 < 2%' },
  'outstanding-student': { title: '优秀学生奖', issuer: '中国海洋大学', selectivity: '录取率 < 10%' },
  'math-modeling-national': { title: '全国统计建模大赛三等奖', issuer: '中国统计教育学会', selectivity: '录取率 < 10%' },
  'mathorcup-2024': { title: 'Mathorcup 数学建模挑战赛国家二等奖', issuer: '中国运筹学会', selectivity: '录取率 < 10%' },
  'cp-market': { title: '"正大杯"市场调研分析大赛', issuer: '中国商业统计学会', selectivity: '录取率 < 10%' },
  'mathorcup-bigdata': { title: '2023 Mathorcup 大数据挑战赛国家二等奖', issuer: '中国运筹学会', selectivity: '录取率 < 10%' },
};

// ─── App ─────────────────────────────────────────────────────────────────────

const ALL_SKILLS = [
  ...skills.programming,
  'SEPARATOR',
  ...skills.stack,
  'SEPARATOR',
  ...skills.viz,
];

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [spotlight, setSpotlight] = useState({ x: -9999, y: -9999 });

  useEffect(() => {
    const handler = (e: MouseEvent) => setSpotlight({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, []);
  const t = translations[language];
  const isZh = language === 'zh';

  const localizedEducation = isZh
    ? education.map(e => ({ ...e, ...(educationZh[e.id] ?? {}) }))
    : education;

  const localizedExperience = isZh
    ? experience.map(e => ({ ...e, ...(experienceZh[e.id] ?? {}) }))
    : experience;

  const localizedAwards = isZh
    ? awards.map(a => ({ ...a, ...(awardsZh[a.id] ?? {}) }))
    : awards;

  const navItems = [
    { label: t.nav.about, href: '#about' },
    { label: t.nav.research, href: '#publications' },
    { label: t.nav.background, href: '#background' },
    { label: t.nav.skills, href: '#skills' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Film-grain noise overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Photographer spotlight — follows cursor */}
      <div
        className="fixed inset-0 pointer-events-none z-[9998]"
        aria-hidden="true"
        style={{
          background: `radial-gradient(360px circle at ${spotlight.x}px ${spotlight.y}px, rgba(255,255,255,0.13), transparent 80%)`
        }}
      />

      <Nav
        language={language}
        onToggleLanguage={() => setLanguage(l => l === 'en' ? 'zh' : 'en')}
        navItems={navItems}
      />

      <Hero
        heroPill={t.heroPill}
        heroTagline={t.heroTagline}
        aboutContent={isZh ? aboutTextZh : personalInfo.about}
        email={personalInfo.email}
        github={personalInfo.github}
        linkedin={personalInfo.linkedin}
        googleScholar={personalInfo.googleScholar}
        orcid={personalInfo.orcid}
      />

      <Section id="publications" label={t.sections.research}>
        <div>
          {publications.map((pub, i) => (
            <PublicationEntry key={pub.id} pub={pub} index={i} />
          ))}
        </div>
      </Section>

      <Section id="background" label={t.sections.background}>
        <Timeline
          education={localizedEducation}
          experience={localizedExperience}
          awards={localizedAwards}
        />
      </Section>

      <Section id="skills" label={t.sections.skills}>
        <div className="flex flex-wrap items-center gap-2.5">
          {ALL_SKILLS.map((item, i) =>
            item === 'SEPARATOR' ? (
              <span key={`sep-${i}`} className="text-white/20 text-base mx-2 select-none">—</span>
            ) : (
              <span
                key={item}
                className="font-sans text-sm font-medium text-white/55 border border-white/10 bg-white/[0.03] px-4 py-1.5 rounded-sm cursor-default transition-all duration-200 hover:text-white/85 hover:border-white/25 hover:bg-white/[0.07]"
              >
                {item}
              </span>
            )
          )}
        </div>
      </Section>

      <footer className="border-t border-white/8 py-10">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-white/25">
            © 2026 Haiyi Li
          </p>
          <div className="flex items-center gap-5">
            <a
              href={`mailto:${personalInfo.email}`}
              className="font-mono text-xs text-white/25 hover:text-white/55 transition-colors"
            >
              {personalInfo.email}
            </a>
            <span className="text-white/10 select-none">|</span>
            <a href={personalInfo.github} target="_blank" rel="noreferrer" title="GitHub"
              className="text-white/25 hover:text-white/60 transition-colors">
              <GitHubIcon className="w-4 h-4" />
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" title="LinkedIn"
              className="text-white/25 hover:text-white/60 transition-colors">
              <LinkedInIcon className="w-4 h-4" />
            </a>
            <a href={personalInfo.googleScholar} target="_blank" rel="noreferrer" title="Google Scholar"
              className="text-white/25 hover:text-white/60 transition-colors">
              <GoogleScholarIcon className="w-4 h-4" />
            </a>
            <a href={personalInfo.orcid} target="_blank" rel="noreferrer" title="ORCID"
              className="text-white/25 hover:text-white/60 transition-colors">
              <OrcidIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
