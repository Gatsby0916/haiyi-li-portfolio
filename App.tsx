
import React, { useState, useEffect } from 'react';
import { Mail, Github, Link, MapPin, Menu, X, GraduationCap, Building2, Code2, Layers, Palette, Sparkles, Brain, Globe, Calculator, type LucideIcon } from 'lucide-react';
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
    heroTagline: "Incoming Master of Computational Science and Engineering student at Harvard University; Mathematical Sciences Honours student at the University of Adelaide.",
    heroStats: {
      research: { label: "Research threads", detail: "CG · 3DGS · HCI" },
      awards: { label: "Awards & honors", detail: "Selective scholarships + prizes" },
      experience: { label: "Industry & lab roles", detail: "AIML, CSIRO, IMAGENDO" }
    },
    heroFocusTags: ["3D Gaussian Splatting", "Variational PDEs", "Human-centered AI"],
    skillTiles: {
      languages: {
        title: "Computational Languages",
        description: "Translate PDE intuition into reproducible code for modeling and experimentation."
      },
      stack: {
        title: "CG & System Stack",
        description: "Ship experiments that bridge prototypes with production-friendly tooling."
      },
      viz: {
        title: "Storytelling & Visualization",
        description: "Communicate evidence through rigorous plots, dashboards, and graph tooling."
      },
      math: {
        title: "Mathematical Foundations",
        description: "Bring advanced analysis insight into modeling and algorithms."
      }
    },
    workflowNotes: [
      { id: "model", title: "Model-first reasoning", text: "Variational analysis informs which inductive biases enter CG and 3DGS systems." },
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
    heroTagline: "哈佛大学计算科学与工程硕士新生；阿德莱德大学数学科学荣誉项目学生，专注于计算机图形学、3DGS、应用数学与人机协同 AI。",
    heroStats: {
      research: { label: "研究方向", detail: "计算机图形学 / 3DGS / 人机交互" },
      awards: { label: "获奖次数", detail: "国家与校级奖学金" },
      experience: { label: "合作经历", detail: "AIML、CSIRO、IMAGENDO 等机构" }
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
      },
      math: {
        title: "数学基础",
        description: "用高等分析的思维驱动建模与算法。"
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
type SkillTileId = 'languages' | 'stack' | 'viz' | 'math';

const mathCourses = [
  { en: "Modelling with ODE", zh: "常微分方程建模" },
  { en: "Random Processes", zh: "随机过程" },
  { en: "Partial Differential Equations and Waves", zh: "偏微分方程与波动" },
  { en: "Applied Probability", zh: "应用概率" },
  { en: "Optimisation", zh: "最优化方法" },
  { en: "Numerical Methods", zh: "数值方法" },
  { en: "Real Analysis", zh: "实分析" }
];

interface SkillTileConfig {
  id: SkillTileId;
  accent: string;
  Icon: LucideIcon;
  iconColor: string;
  items?: string[];
  getItems?: (lang: Language) => string[];
}

const aboutTextZh = "我即将于 2026 年秋季进入哈佛大学攻读计算科学与工程硕士，目前就读于阿德莱德大学数学科学荣誉学士项目。我的研究兴趣位于应用分析与偏微分方程、数值方法、计算机图形学、三维高斯点渲染以及数据驱动的人机协作交互的交汇处。在 2026 年秋季研究生申请季中，我收到了来自哈佛大学、卡内基梅隆大学、宾夕法尼亚大学和西北大学等顶尖计算机科学或数学项目的录取。我的目标是构建在数学上可靠、稳定且可解释的模型，用于真实世界中的不确定性建模。";

const educationZh: Record<string, Partial<typeof education[number]>> = {
  harvard: {
    institution: "哈佛大学",
    degree: "计算科学与工程硕士",
    ranking: "2026 年秋季入学录取",
    courses: ["计算科学", "科学计算", "应用数学", "机器学习"]
  },
  adelaide: {
    institution: "阿德莱德大学",
    degree: "数学科学荣誉学士学位",
    ranking: "年级排名第 1",
    courses: ["常微分方程建模", "随机过程", "偏微分方程与波动", "应用概率"]
  },
  ocean: {
    institution: "中国海洋大学",
    degree: "数学与应用数学专业",
    ranking: "专业排名 1 / 38",
    courses: ["最优化方法", "数值方法", "算法与数据结构", "实变函数"]
  }
};

const experienceZh: Record<string, Partial<typeof experience[number]>> = {
  aiml: {
    role: "科研助理",
    institution: "阿德莱德大学澳大利亚机器学习研究院（AIML）",
    location: "澳大利亚南澳州阿德莱德 Lot Fourteen",
    description: [
      "在 AIML 的计算机图形学与三维视觉研究环境中担任 RA，聚焦 3D Gaussian Splatting 与场景重建。",
      "围绕几何感知视觉计算，参与机器学习、三维视觉与深度学习相关工作流。"
    ]
  },
  csiro: {
    role: "工业见习生",
    institution: "澳大利亚联邦科学与工业研究组织（CSIRO）",
    location: "导师：Matthew Rees 博士",
    description: [
      "研究初始类别结构如何影响群体模型的疫情轨迹。",
      "搭建产业数据与动力系统分析之间的桥梁。"
    ]
  },
  robinson: {
    role: "科研助理",
    institution: "IMAGENDO 项目，罗宾逊研究院",
    description: [
      "面向妇科超声的 AI 流程：负责预处理/数据工具链与病灶检测原型。"
    ]
  },
  kumon: {
    role: "数学导师",
    institution: "公文式教育家庭辅导项目",
    description: [
      "为 5–16 岁学生提供数学教学与学术辅导。"
    ]
  }
};

const awardsZh: Record<string, Partial<typeof awards[number]>> = {
  "national-scholarship": {
    title: "国家奖学金",
    issuer: "中华人民共和国教育部",
    selectivity: "获奖率 < 1%"
  },
  "hurd-prize": {
    title: "马克·埃德温·赫德纪念奖",
    issuer: "阿德莱德大学",
    selectivity: "每年 1 名学生"
  },
  "summer-research": {
    title: "暑期科研奖学金",
    issuer: "阿德莱德大学",
    selectivity: "录取率 < 5%"
  },
  "global-citizen": {
    title: "全球公民卓越奖学金",
    issuer: "阿德莱德大学",
    selectivity: "录取率 < 10%"
  },
  "icm": {
    title: "2024 ICM 美国大学生数学建模大赛 F 奖",
    issuer: "COMAP",
    selectivity: "优胜队 < 2%"
  },
  "math-modeling-national": {
    title: "全国统计建模大赛国家三等奖、省一等奖",
    issuer: "中国统计教育学会",
    selectivity: "录取率 < 10%"
  },
  "mathorcup-2024": {
    title: "中国 2024 Mathorcup 数学建模挑战赛国家二等奖",
    issuer: "中国运筹学会",
    selectivity: "录取率 < 10%"
  },
  "cp-market": {
    title: "“正大杯”市场调研分析大赛",
    issuer: "中国商业统计学会",
    selectivity: "录取率 < 10%"
  },
  "mathorcup-bigdata": {
    title: "2023 Mathorcup 大数据挑战赛国家二等奖",
    issuer: "中国运筹学会",
    selectivity: "录取率 < 10%"
  },
  "outstanding-student": {
    title: "优秀学生奖",
    issuer: "中国海洋大学",
    selectivity: "录取率 < 10%"
  }
};

const locationZh = "澳大利亚南澳州阿德莱德市";

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState<Language>('en');

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

  const skillTileConfig: SkillTileConfig[] = [
    {
      id: 'languages' as const,
      items: skills.programming,
      accent: "from-primary-50/80 via-white to-primary-100/40",
      Icon: Code2,
      iconColor: "text-primary-800"
    },
    {
      id: 'stack' as const,
      items: skills.stack,
      accent: "from-emerald-50/70 via-white to-emerald-100/40",
      Icon: Layers,
      iconColor: "text-emerald-800"
    },
    {
      id: 'viz' as const,
      items: skills.viz,
      accent: "from-amber-50/70 via-white to-amber-100/40",
      Icon: Palette,
      iconColor: "text-amber-800"
    },
    {
      id: 'math' as const,
      accent: "from-slate-50/80 via-white to-slate-100/50",
      Icon: Calculator,
      iconColor: "text-slate-700",
      getItems: (lang: Language) => mathCourses.map(course => lang === 'zh' ? course.zh : course.en)
    }
  ];

  const skillTiles = skillTileConfig.map(tile => ({
    ...tile,
    title: t.skillTiles[tile.id].title,
    description: t.skillTiles[tile.id].description,
    items: tile.getItems ? tile.getItems(language) : (tile.items ?? [])
  }));

  const workflowNotes = t.workflowNotes;
  const languageLabelMap = t.languageLabels;
  const toggleLanguage = () => setLanguage(prev => (prev === 'en' ? 'zh' : 'en'));
  const toggleLabel = language === 'en' ? '中文' : 'EN';
  const mobileToggleText = language === 'en' ? '切换到中文' : 'Switch to English';
  const aboutContent = language === 'zh' ? aboutTextZh : personalInfo.about;
  const locationText = language === 'zh' ? locationZh : personalInfo.location;
  const keyCoursesLabel = language === 'zh' ? "核心课程" : "Key Courses";

  const localizedEducation = language === 'zh'
    ? education.map(item => ({ ...item, ...(educationZh[item.id] || {}) }))
    : education;

  const localizedExperience = language === 'zh'
    ? experience.map(item => ({ ...item, ...(experienceZh[item.id] || {}) }))
    : experience;

  const localizedAwards = language === 'zh'
    ? awards.map(item => ({ ...item, ...(awardsZh[item.id] || {}) }))
    : awards;

  const languageProficiency: Record<string, number> = {
    "Mandarin (Native)": 96,
    "English (TOEFL)": 82,
    "GRE": 65
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fbfbfa] via-white to-primary-50/25 text-slate-900 font-sans selection:bg-primary-100 selection:text-primary-900 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 right-[-12%] w-[440px] h-[440px] bg-primary-200/26 blur-[150px]" />
        <div className="absolute top-28 left-[-34%] w-[560px] h-[560px] bg-emerald-200/18 blur-[180px]" />
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
               <a href={personalInfo.orcid} target="_blank" rel="noreferrer" className="hover:text-primary-900 transition-colors flex items-center gap-2 group">
                  <span className="p-2 bg-slate-50 rounded-full group-hover:bg-primary-50 transition-colors"><Link size={16} /></span>
                  ORCID
               </a>
               <span className="flex items-center gap-2">
                  <span className="p-2 bg-slate-50 rounded-full"><MapPin size={16} /></span>
                  {locationText}
               </span>
            </div>

            <div className="relative max-w-4xl rounded-3xl border border-slate-900/10 bg-gradient-to-br from-[#020617] via-[#0b1220] to-[#020617] p-8 sm:p-10 shadow-[0_30px_80px_rgba(2,6,23,0.30)] overflow-hidden">
              <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-primary-300/90 to-transparent" />
              <p className="text-base sm:text-lg text-slate-100/90 leading-relaxed">
                {aboutContent}
              </p>
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
        <Section
          title={t.sections.education}
          id="education"
          accentFrom="#0f766e"
          accentTo="#059669"
          accentSoft="rgba(5, 150, 105, 0.08)"
        >
          <div className="relative border-l border-slate-200/70 ml-3 md:ml-0 space-y-12 max-w-4xl">
            {localizedEducation.map((edu, idx) => (
              <div key={idx} className="relative pl-8 md:pl-12">
                {/* Timeline Dot */}
                <div className="absolute -left-[6px] top-8 h-3 w-3 rounded-full bg-white border-2 border-[var(--section-accent-to)]"></div>

                <div className="rounded-2xl border border-white/10 bg-[#0b1220] p-6 md:p-7 shadow-[0_24px_70px_rgba(2,6,23,0.18)] hover:border-white/20 hover:bg-[#0f172a] transition-colors border-l-4 border-l-[var(--section-accent-to)]">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-2">
                     <h3 className="text-xl font-bold text-slate-50">{edu.institution}</h3>
                     <span className="text-sm font-mono text-slate-200/70 bg-white/5 px-2.5 py-1 rounded border border-white/10 inline-block w-fit">
                       {edu.period}
                     </span>
                  </div>

                  <div className="text-lg text-slate-200/80 font-serif italic mb-3">{edu.degree}</div>

                  {edu.ranking && (
                    <div className="mb-4">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-200 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
                        <GraduationCap size={14} /> {edu.ranking}
                      </span>
                    </div>
                  )}

                  <div className="text-sm text-slate-200/80">
                    <span className="font-semibold text-slate-50/90 mr-2">{keyCoursesLabel}:</span>
                    <span className="font-mono text-xs text-slate-200/60 leading-6">
                      {edu.courses.join("  //  ")}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Publications */}
        <Section
          title={t.sections.research}
          id="publications"
          accentFrom="#0c4a6e"
          accentTo="#0284c7"
          accentSoft="rgba(2, 132, 199, 0.08)"
        >
           <div className="space-y-16">
             {publications.map((pub) => (
               <PublicationCard key={pub.id} pub={pub} />
             ))}
           </div>
        </Section>

        {/* Experience - Timeline Style */}
        <Section
          title={t.sections.experience}
          id="experience"
          accentFrom="#1d4ed8"
          accentTo="#6366f1"
          accentSoft="rgba(99, 102, 241, 0.08)"
        >
          <div className="relative border-l border-slate-200/70 ml-3 md:ml-0 space-y-12 max-w-4xl">
            {localizedExperience.map((exp) => (
              <div key={exp.id} className="relative pl-8 md:pl-12">
                {/* Timeline Dot */}
                <div className="absolute -left-[6px] top-8 h-3 w-3 rounded-full bg-white border-2 border-[var(--section-accent-to)]"></div>

                <div className="rounded-2xl border border-white/10 bg-[#0b1220] p-6 md:p-7 shadow-[0_24px_70px_rgba(2,6,23,0.18)] hover:border-white/20 hover:bg-[#0f172a] transition-colors border-l-4 border-l-[var(--section-accent-to)]">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-1">
                    <h3 className="text-lg font-bold text-slate-50">{exp.role}</h3>
                    <span className="text-sm font-mono text-slate-200/70">{exp.period}</span>
                  </div>

                  <div className="text-base text-slate-200/80 font-medium mb-4 flex items-center gap-2">
                    <span className="text-slate-300/60"><Building2 size={14} /></span>
                    <span className="text-slate-50 font-semibold">{exp.institution}</span>
                    {exp.location && <span className="text-slate-300/60 font-normal text-sm border-l border-white/10 pl-2 ml-1">{exp.location}</span>}
                  </div>

                  <ul className="space-y-2 text-slate-200/75 text-sm leading-relaxed marker:text-white/10 list-disc pl-4">
                    {exp.description.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Awards - Clean List */}
        <Section
          title={t.sections.awards}
          id="awards"
          accentFrom="#a16207"
          accentTo="#d97706"
          accentSoft="rgba(217, 119, 6, 0.08)"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {localizedAwards.map((award, idx) => (
              <motion.div 
                key={award.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                viewport={{ once: true }}
                className={`group flex flex-col justify-between p-5 rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-sm hover:bg-white transition-all duration-300 border-l-4 border-l-[var(--section-accent-to)] ${idx % 3 === 0 ? 'bg-white' : idx % 3 === 1 ? 'bg-amber-50/50' : 'bg-primary-50/40'}`}
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-mono text-slate-500">{award.year}</span>
                    {award.selectivity && (
                      <span className="text-[10px] font-mono font-bold text-slate-500 bg-white px-2 py-1 rounded border border-slate-100">
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
        <Section
          title={t.sections.skills}
          id="skills"
          accentFrom="#0f172a"
          accentTo="#075985"
          accentSoft="rgba(15, 23, 42, 0.06)"
        >
           <div className="space-y-10">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {skillTiles.map((card, idx) => (
                 <motion.div
                   key={card.id}
                   initial={{ opacity: 0, y: 10 }}
                   whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: idx * 0.1 }}
               viewport={{ once: true }}
                   className={`p-6 rounded-3xl border border-slate-200/70 bg-gradient-to-br ${card.accent} shadow-[0_20px_55px_rgba(15,23,42,0.08)] ${card.id === 'math' ? 'md:col-span-3' : ''}`}
                 >
                   <div className="flex items-center gap-3">
                     <span className={`w-11 h-11 rounded-2xl bg-white/70 border border-white/80 flex items-center justify-center ${card.iconColor}`}>
                       <card.Icon size={20} />
                     </span>
                     <div>
                       <p className="font-semibold text-slate-900">{card.title}</p>
                       <p className="text-xs text-slate-500">{card.description}</p>
                     </div>
                   </div>
                   {card.id === 'math' ? (
                     <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs sm:text-sm text-slate-700">
                       {card.items.map(item => (
                         <span key={item} className="inline-flex items-center justify-center rounded-2xl border border-slate-200/70 bg-white/80 px-3 py-2 font-medium shadow-sm text-center">
                           {item}
                         </span>
                       ))}
                     </div>
                   ) : (
                     <div className="flex flex-wrap gap-2 mt-4">
                       {card.items.map(item => (
                         <span key={item} className="px-3 py-1.5 rounded-full bg-white/80 border border-slate-200 text-sm font-medium text-slate-700 shadow-sm">
                           {item}
                         </span>
                       ))}
                     </div>
                   )}
                 </motion.div>
               ))}
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="p-8 rounded-3xl border border-slate-200 bg-white shadow-[0_25px_60px_rgba(15,23,42,0.08)]">
                 <div className="flex items-center gap-3">
                   <Brain size={20} className="text-emerald-700" />
                   <div>
                     <p className="text-lg font-semibold text-slate-900">{t.skillsExtra.researchTitle}</p>
                     <p className="text-sm text-slate-500">{t.skillsExtra.researchDesc}</p>
                   </div>
                 </div>
                 <ul className="mt-6 space-y-4">
                   {workflowNotes.map(note => (
                     <li key={note.title} className="border border-slate-200 rounded-2xl p-4 bg-slate-50">
                       <p className="text-sm font-semibold text-slate-900">{note.title}</p>
                       <p className="text-xs text-slate-600 mt-1">{note.text}</p>
                     </li>
                   ))}
                 </ul>
               </div>

               <div className="p-8 rounded-3xl border border-slate-200 bg-white shadow-[0_25px_60px_rgba(15,23,42,0.08)]">
                 <div className="flex items-center gap-3">
                   <Globe size={20} className="text-primary-800" />
                   <div>
                     <p className="text-lg font-semibold text-slate-900">{t.skillsExtra.communicationTitle}</p>
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
        <footer className="pt-20 pb-12 text-center -mx-6 sm:-mx-8 px-6 sm:px-8 mt-24 bg-gradient-to-b from-white to-slate-50 border-t border-slate-200 rounded-t-[48px]">
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
