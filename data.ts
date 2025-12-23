
import { Award, Education, Experience, Publication } from './types';

export const personalInfo = {
  name: "Haiyi Li",
  title: "Mathematical Sciences Honours Student",
  institution: "University of Adelaide",
  email: "haiyi.li@student.adelaide.edu.au",
  phone: import.meta.env.VITE_PHONE_NUMBER ?? "",
  location: "Adelaide City, SA, Australia",
  github: "https://github.com/Gatsby0916",
  about: `I am motivated to pursue advanced training in Computational Science and Engineering. My research interests lie at the intersection of applied analysis and PDEs, numerical methods, computer vision, and data-driven human–AI interaction. My goal is to develop mathematically principled, stable, and interpretable models for real-world uncertainty modeling.`
};

export const publications: Publication[] = [
  {
    id: "ougs-2026",
    title: "OUGS: Active View Selection via Object-aware Uncertainty Estimation in 3DGS",
    authors: ["Haiyi Li", "Qi Chen", "Denis Kalkofen", "Hsiang-Ting Chen"],
    venue: "Conditionally Accepted to EuroGraphics 2026",
    status: "Conditionally Accepted",
    year: "2026",
    description: "Developed an interpretable, object-aware uncertainty evaluation method for 3D Gaussian Splatting, proposing a novel active view selection strategy. Conditionally accepted to EuroGraphics 2026.",
    tags: ["Computer Vision", "3D Gaussian Splatting", "Uncertainty Estimation", "First Author"],
    image: "images/ougs.png",
    imageFit: "cover", // 3D Renders look best covering the whole area
    links: {
      arxiv: "https://arxiv.org/abs/2511.09397"
    }
  },
  {
    id: "isbi-2026",
    title: "Evaluating Local Large Language Models for Structured Extraction from Endometriosis-Specific Transvaginal Ultrasound Reports",
    authors: ["Haiyi Li", "Yutong Li", "et al."],
    venue: "Submitted to ISBI",
    status: "Under Review",
    year: "2026",
    description: "Developed a privacy-preserving pipeline using on-premise LLMs for structured data extraction from unstructured eTVUS scan reports, proposing a synergistic workflow.",
    tags: ["LLMs", "Medical Imaging", "NLP", "Privacy", "First Author"],
    image: "images/llm-pipeline.png",
    imageFit: "contain" // Diagrams need to be contained to see labels
  },
  {
    id: "amm-2025",
    title: "A Variational Path to Laplace’s Equation via Complex Analysis",
    authors: ["Haiyi Li"],
    venue: "Submitted to American Mathematical Monthly",
    status: "Under Review",
    year: "2025",
    description: "Established a novel framework linking a degenerate variational principle to Laplace’s equation.",
    tags: ["Applied Mathematics", "Complex Analysis", "PDEs", "Sole Author"],
    image: "images/Variantion.png",
    imageFit: "contain" // Mathematical diagrams need to be fully visible
  },
  {
    id: "chi-2026",
    title: "To Know or Not to Know?: How User Awareness of Physiological Sensing Impacts AI Persuasion and User Experience",
    authors: ["Xiaoyan Wei", "Yutong Qu", "Yutong Li", "Haiyi Li", "et al."],
    venue: "Submitted to CHI",
    status: "Under Review",
    year: "2026",
    description: "Conducted rigorous statistical analysis (repeated-measures ANOVA, Wilcoxon) demonstrating the trade-off between perceived persuasiveness and user negative affect.",
    tags: ["HCI", "AI Persuasion", "Statistical Analysis"],
    image: "images/InterfaceNew.png",
    imageFit: "contain"
  }
];

export const education: Education[] = [
  {
    id: "adelaide",
    degree: "Honours Degree of Bachelor of Mathematical Sciences",
    institution: "University of Adelaide",
    period: "July 2024 - Present",
    ranking: "Top 1% of cohort",
    courses: ["Modelling with ODE", "Random Processes", "PDEs and Waves", "Applied Probability"]
  },
  {
    id: "ocean",
    degree: "Mathematics and Applied Mathematics",
    institution: "Ocean University of China",
    period: "Aug 2022 - July 2024",
    ranking: "Top 1% of cohort",
    courses: ["Optimisation", "Numerical Methods", "Algorithm & Data Structure", "Real Analysis"]
  }
];

export const experience: Experience[] = [
  {
    id: "csiro",
    role: "Industrial Trainee",
    institution: "CSIRO",
    location: "Advisor: Dr Matthew Rees",
    period: "Aug 2025 – Present",
    description: [
      "Investigated how initial class structure influences outbreak trajectories in population models.",
      "Bridged industry data and dynamical systems analysis."
    ]
  },
  {
    id: "robinson",
    role: "Research Assistant",
    institution: "IMAGENDO Project, Robinson Research Institute",
    location: "",
    period: "Mar 2025 – Nov 2025",
    description: [
      "AI-assisted gynecological ultrasound: built preprocessing/data tooling and lesion-detection prototypes."
    ]
  },
  {
    id: "kumon",
    role: "Math Tutor",
    institution: "Kumon Home-based Program",
    location: "",
    period: "Jan 2025",
    description: [
      "Provided mathematical instruction and mentorship to students aged 5 to 16."
    ]
  }
];

export const awards: Award[] = [
  {
    id: "national-scholarship",
    title: "National Scholarship of China",
    issuer: "Ministry of Education of the P.R.C",
    year: "2024",
    selectivity: "< 1%"
  },
  {
    id: "hurd-prize",
    title: "Mark Edwin Hurd Memorial Prize",
    issuer: "University of Adelaide",
    year: "2024",
    selectivity: "Awarded to 1 student/year"
  },
  {
    id: "summer-research",
    title: "Summer Research Scholarship",
    issuer: "University of Adelaide",
    year: "2024",
    selectivity: "< 5%"
  },
  {
    id: "global-citizen",
    title: "Global Citizen Scholarship",
    issuer: "University of Adelaide",
    year: "2024",
    selectivity: "< 10%"
  },
  {
    id: "icm",
    title: "Interdisciplinary Contest in Modeling (ICM) Finalist",
    issuer: "COMAP",
    year: "2024",
    selectivity: "< 2%"
  },
  {
    id: "outstanding-student",
    title: "Outstanding Student Award",
    issuer: "Ocean University of China",
    year: "2023 & 2024",
    selectivity: "< 10%"
  },
  {
    id: "math-modeling-national",
    title: "National Statistical Modeling Competition - Third Prize",
    issuer: "China Statistical Education Society",
    year: "2024",
    selectivity: "< 10%"
  },
  {
    id: "mathorcup-2024",
    title: "China Mathorcup Mathematical Modeling Challenge - Second Prize",
    issuer: "Chinese Society of Optimization",
    year: "2024",
    selectivity: "< 10%"
  },
  {
    id: "cp-market",
    title: "“正大杯”市场调研分析大赛国家三等奖",
    issuer: "中国商业统计学会",
    year: "2024",
    selectivity: "< 10%"
  },
  {
    id: "mathorcup-bigdata",
    title: "Mathorcup Big Data Challenge - Second Prize",
    issuer: "Chinese Society of Optimization",
    year: "2023",
    selectivity: "< 10%"
  }
];

export const skills = {
  programming: ["Python", "MATLAB", "R", "SQL"],
  stack: ["PyTorch", "scikit-learn", "OpenCV", "Docker", "Git"],
  viz: ["Matplotlib", "Gephi", "Tableau", "Seaborn"],
  languages: ["English (TOEFL)", "GRE", "Mandarin (Native)"]
};
