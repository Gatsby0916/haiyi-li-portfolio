
import React, { useState, useEffect } from 'react';
import { Mail, Github, MapPin, Menu, X, GraduationCap, Building2, Code2, Layers, Palette, Sparkles, Brain, Globe } from 'lucide-react';
import Section from './components/Section';
import PublicationCard from './components/PublicationCard';
import { personalInfo, publications, education, experience, awards, skills } from './data';
import { motion, AnimatePresence } from 'framer-motion';

const translations = {
  en: {
    nav: {
      about: "About",
      education: "Education",
      research: "Research",
      experience: "Experience",
      awards: "Awards",
      skills: "Skills"
    },
    sections: {
      education: "Education",
      research: "Research",
      experience: "Experience",
      awards: "Honors",
      skills: "Skills"
    },
    heroPill: "Academic Portfolio",
    heroTagline: "Mathematical Sciences Honours Student at the University of Adelaide.",
    heroStats: {
      research: { label: "Research threads", detail: "CV · HCI · Applied Maths" },
      awards: { label: "Awards & honors", detail: "Selective scholarships + prizes" },
      experience: { label: "Industry & lab roles", detail: "CSIRO, IMAGENDO, Kumon" }
    },
    heroFocusTags: ["3D Gaussian Splatting", "Variational PDEs", "Human-centered AI"],
    skillTiles: {
      languages: {
        title: "Computational Languages",
        description: "Translate PDE intuition into reproducible code for modeling and experimentation."
      },
      stack: {
        title: "ML & Systems Stack",
        description: "Ship experiments that bridge prototypes with production-friendly tooling."
      },
      viz: {
        title: "Storytelling & Visualization",
        description: "Communicate evidence through rigorous plots, dashboards, and graph tooling."
      }
    },
    workflowNotes: [
      { id: "model", title: "Model-first reasoning", text: "Variational analysis informs which inductive biases enter CV systems." },
      { id: "privacy", title: "Privacy-aware ML", text: "Design on-premise LLM workflows for medical imaging partners." },
      { id: "human", title: "Human factors", text: "Quantitative UX pipelines (ANOVA, Wilcoxon) close the loop with users." }
    ],
    skillsExtra: {
      researchTitle: "Research Playbook",
      researchDesc: "Choreographing experiments end-to-end.",
      communicationTitle: "Communication Channels",
      communicationDesc: "Bicultural storytelling for papers, grants, and workshops.",
      badge: "academic & industry"
    },
    languageLabels: {
      "English (TOEFL)": "English (TOEFL)",
      "GRE": "GRE",
      "Mandarin (Native)": "Mandarin (Native)"
    },
    footer: {
      tagline: "Designed with academic rigor."
    }
  },
  zh: {
    nav: {
      about: "关于我",
      education: "教育背景",
      research: "科研成果",
      experience: "经历",
      awards: "荣誉",
      skills: "能力概览"
    },
    sections: {
      education: "教育背景",
      research: "科研成果",
      experience: "实践经历",
      awards: "荣誉奖项",
      skills: "能力概览"
    },
    heroPill: "学术主页",
    heroTagline: "阿德莱德大学数学科学荣誉项目学生，专注于计算机视觉、应用数学与人机协同 AI。",
    heroStats: {
      research: { label: "研究方向", detail: "计算机视觉 / 人机交互 / 应用数学" },
      awards: { label: "获奖次数", detail: "国家与校级奖学金" },
      experience: { label: "合作经历", detail: "CSIRO、IMAGENDO 等机构" }
    },
    heroFocusTags: ["三维高斯点渲染", "变分偏微分方程", "人机协同 AI"],
    skillTiles: {
      languages: {
        title: "计算建模语言",
        description: "让偏微分方程直觉转化为可复现的实验代码。"
      },
      stack: {
        title: "机器学习与系统栈",
        description: "把原型与工程化工具链衔接起来。"
      },
      viz: {
        title: "可视化叙事",
        description: "用图表、图谱与仪表盘讲述证据。"
      }
    },
    workflowNotes: [
      { id: "model", title: "模型先行", text: "以变分分析决定视觉模型的归纳偏置。"},
      { id: "privacy", title: "隐私敏感工作流", text: "为医学影像伙伴设计本地化 LLM 流程。"},
      { id: "human", title: "人因验证", text: "ANOVA / Wilcoxon 等量化 UX 闭环。"}
    ],
    skillsExtra: {
      researchTitle: "研究方法笔记",
      researchDesc: "串联假设、实验与验证闭环。",
      communicationTitle: "沟通渠道",
      communicationDesc: "中英双语写作、提案与讲演。",
      badge: "学术 / 工业"
    },
    languageLabels: {
      "English (TOEFL)": "英语（TOEFL）",
      "GRE": "GRE 写作",
      "Mandarin (Native)": "普通话（母语）"
    },
    footer: {
      tagline: "以学术严谨完成设计。"
    }
  }
} as const;

type Language = keyof typeof translations;
const heroStatKeys = ['research', 'awards', 'experience'] as const;
type HeroStatKey = typeof heroStatKeys[number];
type SkillTileId = 'languages' | 'stack' | 'viz';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState<Language>('en');

  // Soft accent palettes for experience and awards cards
  const expColors = [
    'border-l-4 border-primary-700/60 bg-primary-50/50',
    'border-l-4 border-amber-600/60 bg-amber-50/60',
    'border-l-4 border-emerald-700/60 bg-emerald-50/60',
    'border-l-4 border-indigo-700/60 bg-indigo-50/60'
  ];

  const awardColors = [
    'bg-white border-slate-200',
    'bg-primary-50/80 border-primary-100',
    'bg-amber-50/80 border-amber-100',
    'bg-emerald-50/80 border-emerald-100',
    'bg-indigo-50/80 border-indigo-100'
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const t = translations[language];

  const navItems = [
    { label: t.nav.about, href: "#about" },
    { label: t.nav.education, href: "#education" },
    { label: t.nav.research, href: "#publications" },
    { label: t.nav.experience, href: "#experience" },
    { label: t.nav.awards, href: "#awards" },
    { label: t.nav.skills, href: "#skills" }
  ];

  const heroStatsValues: Record<HeroStatKey, number> = {
    research: publications.length,
    awards: awards.length,
    experience: experience.length
  };

  const heroStats = heroStatKeys.map((key) => ({
    value: heroStatsValues[key],
    ...t.heroStats[key]
  }));

  const heroFocusTags = t.heroFocusTags;

  const skillTileConfig = [
    {
      id: 'languages' as const,
      items: skills.programming,
      accent: "from-primary-50/80 via-white to-primary-100/40",
      Icon: Code2
    },
    {
      id: 'stack' as const,
      items: skills.stack,
      accent: "from-emerald-50/70 via-white to-emerald-100/40",
      Icon: Layers
    },
    {
      id: 'viz' as const,
      items: skills.viz,
      accent: "from-amber-50/70 via-white to-amber-100/40",
      Icon: Palette
    }
  ];

  const skillTiles = skillTileConfig.map(tile => ({
    ...tile,
    title: t.skillTiles[tile.id].title,
    description: t.skillTiles[tile.id].description
  }));

  const workflowNotes = t.workflowNotes;
  const languageLabelMap = t.languageLabels;
  const toggleLanguage = () => setLanguage(prev => (prev === 'en' ? 'zh' : 'en'));
  const toggleLabel = language === 'en' ? '中文' : 'EN';
  const mobileToggleText = language === 'en' ? '切换到中文' : 'Switch to English';

  const languageProficiency: Record<string, number> = {
    "Mandarin (Native)": 96,
    "English (TOEFL)": 82,
    "GRE": 65
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-primary-50/20 text-slate-900 font-sans selection:bg-primary-100 selection:text-primary-900 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-32 right-[-10%] w-[420px] h-[420px] bg-primary-200/40 blur-[140px]" />
        <div className="absolute top-20 left-[-30%] w-[520px] h-[520px] bg-emerald-200/30 blur-[160px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.8),_rgba(255,255,255,0))]" />
      </div>
      
      {/* Navigation - Clean Academic Style */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
           <a href="#" className="text-xl font-bold font-serif text-slate-900 tracking-tight flex items-center gap-2">
             Haiyi Li
           </a>
           
           {/* Desktop Nav */}
           <div className="hidden md:flex items-center gap-6">
             {navItems.map(item => (
               <a key={item.label} href={item.href} className="text-sm font-medium text-slate-500 hover:text-primary-900 transition-colors hover-underline-animation">
                 {item.label}
               </a>
             ))}
             <button
               onClick={toggleLanguage}
               className="px-3 py-1 text-xs font-semibold border border-slate-300 rounded-full text-slate-600 hover:text-primary-900 hover:border-primary-700 transition-colors"
             >
               {toggleLabel}
             </button>
           </div>

           {/* Mobile Toggle */}
           <button className="md:hidden text-slate-600" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
             {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
           </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-16 left-0 right-0 z-40 bg-white border-b border-slate-200 md:hidden overflow-hidden shadow-lg"
          >
             <div className="flex flex-col p-6 gap-4">
               {navItems.map(item => (
                  <a 
                    key={item.label} 
                    href={item.href} 
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg font-serif text-slate-800 border-b border-slate-100 pb-2"
                  >
                    {item.label}
                  </a>
                ))}
                <button
                  onClick={() => { toggleLanguage(); }}
                  className="mt-2 px-4 py-2 text-sm font-medium border border-slate-200 rounded-full text-slate-600 hover:border-primary-700 hover:text-primary-900 transition-colors"
                >
                  {mobileToggleText}
                </button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 pb-32">
        <div className="absolute inset-x-0 top-20 mx-auto max-w-5xl h-[1px] bg-gradient-to-r from-transparent via-primary-200/60 to-transparent"></div>
        
        {/* Hero Section */}
        <section id="about" className="pt-36 pb-20 md:pt-52 md:pb-36 relative">
          <div className="absolute inset-0 -z-10">
            <div className="absolute right-0 top-10 w-32 h-32 border border-primary-200/40 rounded-full blur-[2px]" />
            <div className="absolute left-6 top-32 w-16 h-16 border border-emerald-200/60 rounded-3xl rotate-6" />
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="mb-6 inline-block">
              <span className="font-mono text-sm text-primary-800 bg-primary-50 px-3 py-1 rounded-full border border-primary-100">
                {t.heroPill}
              </span>
            </div>
            <h1 className="text-5xl sm:text-7xl font-serif font-bold text-slate-900 tracking-tight mb-8 leading-tight">
              Haiyi Li
            </h1>
            <p className="text-xl sm:text-2xl text-slate-600 font-light max-w-3xl leading-relaxed mb-10">
              {t.heroTagline}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 text-sm font-medium text-slate-500 font-mono mb-12">
               <a href={`mailto:${personalInfo.email}`} className="hover:text-primary-900 transition-colors flex items-center gap-2 group">
                  <span className="p-2 bg-slate-50 rounded-full group-hover:bg-primary-50 transition-colors"><Mail size={16} /></span> 
                  {personalInfo.email}
               </a>
               <a href={personalInfo.github} target="_blank" rel="noreferrer" className="hover:text-primary-900 transition-colors flex items-center gap-2 group">
                  <span className="p-2 bg-slate-50 rounded-full group-hover:bg-primary-50 transition-colors"><Github size={16} /></span>
                  GitHub
               </a>
               <span className="flex items-center gap-2">
                  <span className="p-2 bg-slate-50 rounded-full"><MapPin size={16} /></span>
                  {personalInfo.location}
               </span>
            </div>

            <div className="prose prose-lg prose-slate text-slate-600 leading-relaxed max-w-4xl border-l-4 border-slate-200 pl-6">
               <p>{personalInfo.about}</p>
            </div>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {heroStats.map(stat => (
                <div key={stat.label} className="p-5 rounded-2xl border border-slate-200/70 bg-white/80 shadow-[0_10px_40px_rgba(15,23,42,0.04)]">
                  <p className="text-4xl font-serif font-semibold text-slate-900">{stat.value}</p>
                  <p className="text-xs font-mono tracking-wide text-primary-800 uppercase mt-1">{stat.label}</p>
                  <p className="text-sm text-slate-500 mt-2">{stat.detail}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {heroFocusTags.map(tag => (
                <span key={tag} className="px-4 py-2 rounded-full bg-white border border-slate-200 text-sm text-slate-700 flex items-center gap-2">
                  <Sparkles size={14} className="text-primary-700" />
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Education - Timeline Style */}
        <Section title={t.sections.education} id="education">
          <div className="relative border-l border-slate-200 ml-3 md:ml-0 space-y-12 max-w-4xl">
            {education.map((edu, idx) => (
              <div key={idx} className="relative pl-8 md:pl-12">
                {/* Timeline Dot */}
                <div className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-white border-2 border-primary-800"></div>
                
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                   <h3 className="text-xl font-bold text-slate-900">{edu.institution}</h3>
                   <span className="text-sm font-mono text-slate-500 bg-slate-50 px-2 py-1 rounded inline-block w-fit">
                     {edu.period}
                   </span>
                </div>
                
                <div className="text-lg text-slate-700 font-serif italic mb-3">{edu.degree}</div>
                
                {edu.ranking && (
                  <div className="mb-4">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-800 bg-primary-50 px-2.5 py-1 rounded border border-primary-100">
                      <GraduationCap size={14} /> {edu.ranking}
                    </span>
                  </div>
                )}
                
                <div className="text-sm text-slate-600">
                  <span className="font-semibold text-slate-900 mr-2">Key Courses:</span>
                  <span className="font-mono text-xs text-slate-500 leading-6">
                    {edu.courses.join("  //  ")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Publications */}
        <Section title={t.sections.research} id="publications">
           <div className="space-y-16">
             {publications.map((pub) => (
               <PublicationCard key={pub.id} pub={pub} />
             ))}
           </div>
        </Section>

        {/* Experience - Timeline Style */}
        <Section title={t.sections.experience} id="experience">
          <div className="relative border-l border-slate-200 ml-3 md:ml-0 space-y-12 max-w-4xl">
            {experience.map((exp, idx) => (
              <div key={exp.id} className={`relative pl-8 md:pl-12 rounded-lg ${expColors[idx % expColors.length]} transition-shadow duration-300 hover:shadow-sm`}>
                {/* Timeline Dot */}
                <div className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-slate-300"></div>

                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                  <h3 className="text-lg font-bold text-slate-900">{exp.role}</h3>
                  <span className="text-sm font-mono text-slate-500">{exp.period}</span>
                </div>
                
                <div className="text-base text-slate-700 font-medium mb-4 flex items-center gap-2">
                   <span className="text-slate-400"><Building2 size={14} /></span> 
                   <span className="text-slate-900 font-semibold">{exp.institution}</span>
                   {exp.location && <span className="text-slate-400 font-normal text-sm border-l border-slate-300 pl-2 ml-1">{exp.location}</span>}
                </div>
                
                <ul className="space-y-2 text-slate-600 text-sm leading-relaxed marker:text-slate-300 list-disc pl-4">
                  {exp.description.map((desc, i) => (
                    <li key={i}>{desc}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        {/* Awards - Clean List */}
        <Section title={t.sections.awards} id="awards">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {awards.map((award, idx) => (
              <motion.div 
                key={award.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                viewport={{ once: true }}
                className={`group flex flex-col justify-between p-5 border hover:border-slate-300 hover:shadow-sm hover:bg-white rounded-lg transition-all duration-300 ${awardColors[idx % awardColors.length]}`}
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-mono text-slate-400 group-hover:text-slate-600 transition-colors">{award.year}</span>
                    {award.selectivity && (
                      <span className="text-[10px] font-mono font-bold text-slate-400 bg-white px-2 py-1 rounded border border-slate-100">
                        {award.selectivity}
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-slate-900 text-base mb-1">{award.title}</h3>
                  <div className="text-xs text-slate-900 font-semibold">{award.issuer}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Skills */}
        <Section title={t.sections.skills} id="skills">
           <div className="space-y-10">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {skillTiles.map((card, idx) => (
                 <motion.div
                   key={card.id}
                   initial={{ opacity: 0, y: 10 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ delay: idx * 0.1 }}
                   viewport={{ once: true }}
                   className={`p-6 rounded-3xl border border-slate-200/70 bg-gradient-to-br ${card.accent} shadow-[0_20px_55px_rgba(15,23,42,0.08)]`}
                 >
                   <div className="flex items-center gap-3">
                     <span className="w-11 h-11 rounded-2xl bg-white/70 border border-white/80 flex items-center justify-center text-primary-800">
                       <card.Icon size={20} />
                     </span>
                     <div>
                       <p className="font-semibold text-slate-900">{card.title}</p>
                       <p className="text-xs text-slate-500">{card.description}</p>
                     </div>
                   </div>
                   <div className="flex flex-wrap gap-2 mt-4">
                     {card.items.map(item => (
                       <span key={item} className="px-3 py-1.5 rounded-full bg-white/80 border border-slate-200 text-sm font-medium text-slate-700 shadow-sm">
                         {item}
                       </span>
                     ))}
                   </div>
                 </motion.div>
               ))}
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="p-8 rounded-3xl border border-slate-200 bg-slate-900 text-white shadow-[0_25px_60px_rgba(15,23,42,0.35)]">
                 <div className="flex items-center gap-3">
                   <Brain size={20} className="text-emerald-300" />
                   <div>
                     <p className="text-lg font-semibold">{t.skillsExtra.researchTitle}</p>
                     <p className="text-sm text-slate-300">{t.skillsExtra.researchDesc}</p>
                   </div>
                 </div>
                 <ul className="mt-6 space-y-4">
                   {workflowNotes.map(note => (
                     <li key={note.title} className="border border-white/10 rounded-2xl p-4 bg-white/5 backdrop-blur">
                       <p className="text-sm font-semibold">{note.title}</p>
                       <p className="text-xs text-slate-200 mt-1">{note.text}</p>
                     </li>
                   ))}
                 </ul>
               </div>

               <div className="p-8 rounded-3xl border border-slate-200 bg-white shadow-[0_25px_60px_rgba(15,23,42,0.08)]">
                 <div className="flex items-center gap-3">
                   <Globe size={20} className="text-primary-800" />
                   <div>
                     <p className="text-lg font-semibold">{t.skillsExtra.communicationTitle}</p>
                     <p className="text-sm text-slate-500">{t.skillsExtra.communicationDesc}</p>
                   </div>
                 </div>
                 <div className="mt-6 space-y-3">
                   {skills.languages.map((lang, idx) => (
                     <div key={lang}>
                        <div className="flex justify-between text-sm text-slate-600 mb-1">
                          <span className="font-medium">{languageLabelMap[lang] ?? lang}</span>
                          <span className="text-slate-400">{t.skillsExtra.badge}</span>
                        </div>
                        <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-primary-500 to-primary-800" style={{ width: `${languageProficiency[lang] ?? 70}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
             </div>
           </div>
        </Section>

        {/* Footer */}
        <footer className="pt-24 pb-12 text-center">
           <div className="w-12 h-1 bg-slate-100 mx-auto mb-8 rounded-full"></div>
           <p className="text-slate-400 text-xs font-mono">
             © {new Date().getFullYear()} Haiyi Li. <br className="sm:hidden"/> {t.footer.tagline}
           </p>
        </footer>

      </main>
    </div>
  );
}

export default App;
