
import { Award, Education, Experience, NewsItem, Publication } from './types';

export const personalInfo = {
  name: "Haiyi Li",
  title: "Incoming Master of Computational Science and Engineering Student",
  institution: "Harvard University",
  email: "gatsbyli@g.harvard.edu",
  phone: import.meta.env.VITE_PHONE_NUMBER ?? "",
  location: "Adelaide City, SA, Australia",
  github: "https://github.com/Gatsby0916",
  orcid: "https://orcid.org/0009-0004-6914-8457",
  about: `I am an incoming Master of Computational Science and Engineering student at Harvard University and a Mathematical Sciences Honours student at the University of Adelaide. My research interests lie at the intersection of applied analysis and PDEs, numerical methods, computer graphics, 3D Gaussian Splatting, and data-driven human-AI interaction. In the 2026 Fall postgraduate admissions cycle, I received offers from leading CS and mathematics programs including Harvard, Carnegie Mellon, Penn, and Northwestern. My goal is to develop mathematically principled, stable, and interpretable models for real-world uncertainty modeling.`
};

export const publications: Publication[] = [
  {
    id: "ougs-2026",
    title: "OUGS: Active View Selection via Object-aware Uncertainty Estimation in 3DGS",
    authors: ["Haiyi Li", "Qi Chen", "Denis Kalkofen", "Hsiang-Ting Chen"],
    venue: "Computer Graphics Forum (Eurographics 2026)",
    status: "Published",
    year: "2026",
    description: "Introduces OUGS, an object-aware uncertainty framework for 3D Gaussian Splatting that derives uncertainty from Gaussian primitive parameters and propagates covariances through the rendering Jacobian. Integrating segmentation masks enables targeted uncertainty scoring and more efficient active view selection for improved object fidelity.",
    tags: ["Computer Graphics", "3D Gaussian Splatting", "Uncertainty Estimation", "First Author"],
    image: "images/ougs.png",
    imageFit: "contain",
    imageMaxHeight: 320,
    links: {
      arxiv: "https://arxiv.org/abs/2511.09397"
    }
  },
  {
    id: "isbi-2026",
    title: "Who Fails Where? LLM and Human Error Patterns in Endometriosis Ultrasound Report Extraction",
    authors: ["Haiyi Li", "Yutong Li", "Yiheng Chi", "Alison Deslandes", "Mathew Leonardi", "Shay Freger", "Yuan Zhang", "Jodie Avery", "M. Louise Hull", "Hsiang-Ting Chen"],
    venue: "CHI 2026 Posters",
    status: "Accepted",
    year: "2026",
    description: "Evaluates on-premise LLMs for converting endometriosis transvaginal ultrasound reports into structured data, comparing multiple model scales against expert extraction across 49 reports. Finds complementary LLM–human error profiles and motivates a human-in-the-loop workflow where the LLM handles routine structuring and supports semantic validation.",
    tags: ["LLMs", "Medical Imaging", "NLP", "HCI", "First Author"],
    image: "images/WhoFails.png",
    imageFit: "contain", // Diagrams need to be contained to see labels
    links: {
      arxiv: "https://arxiv.org/abs/2601.09053"
    }
  },
  {
    id: "chi-posters-2026-endoextract",
    title: "EndoExtract: Co-Designing Structured Text Extraction from Endometriosis Ultrasound Reports",
    authors: ["Haiyi Li", "Yiyang Zhao", "Yutong Li", "Alison Deslandes", "Jodie Avery", "Mathew Leonardi", "M. Louise Hull", "Hsiang-Ting Chen"],
    venue: "Interactive Health 2026",
    status: "Accepted",
    year: "2026",
    description: "Presents EndoExtract, an on-premise LLM system for extracting structured fields from free-text endometriosis ultrasound reports and surfacing interpretive fields for mandatory human review. Grounded in contextual inquiry and formative evaluation, the interface shifts work from manual data entry to supervisory validation with evidence highlighting.",
    tags: ["LLMs", "Medical Imaging", "NLP", "HCI", "Co-design", "First Author"],
    image: "images/EndoExtract.png",
    imageFit: "contain",
    links: {
      arxiv: "https://arxiv.org/abs/2601.18154"
    }
  }
];

export const education: Education[] = [
  {
    id: "harvard",
    degree: "Master of Computational Science and Engineering",
    institution: "Harvard University",
    period: "Aug 2026 - Incoming",
    ranking: "Admitted for Fall 2026",
    courses: ["Computational Science", "Scientific Computing", "Applied Mathematics", "Machine Learning"]
  },
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
    id: "aiml",
    role: "Research Assistant",
    institution: "Australian Institute for Machine Learning (AIML), University of Adelaide",
    location: "Lot Fourteen, Adelaide, South Australia",
    period: "Nov 2024 – Present",
    description: [
      "Research assistant in AIML's computer graphics and 3D vision research context, focusing on 3D Gaussian Splatting and scene reconstruction.",
      "Work across machine learning, 3D vision, and deep learning workflows for geometry-aware visual computing."
    ]
  },
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
    id: "eg-widening-participation",
    title: "EG Widening Participation Scholarship",
    issuer: "Eurographics Association",
    year: "2026",
    selectivity: "Eurographics 2026, Aachen"
  },
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
    id: "mathorcup-2024",
    title: "China Mathorcup Mathematical Modeling Challenge - Second Prize",
    issuer: "Chinese Society of Optimization",
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

export const news: NewsItem[] = [
  {
    id: "ih-porto",
    date: "Jul 2026",
    title: "EndoExtract at ACM Interactive Health 2026, Porto",
    description: "EndoExtract, an on-premise LLM system for endometriosis ultrasound report extraction, at ACM Interactive Health 2026 (Porto, Portugal; Jul 5-8).",
    type: "paper"
  },
  {
    id: "eg-aachen",
    date: "May 4-8, 2026",
    title: "Oral presentation at Eurographics 2026 in Aachen, Germany",
    description: "Presented OUGS and received the EG Widening Participation Scholarship.",
    type: "conference"
  },
  {
    id: "cmu-offer",
    date: "Apr 2026",
    title: "Admitted to Carnegie Mellon University",
    type: "admission"
  },
  {
    id: "chi-posters-accept",
    date: "Feb 19, 2026",
    title: "Who Fails Where? accepted to CHI 2026 Posters",
    description: "Evaluation of on-premise LLMs vs. human experts on endometriosis ultrasound report extraction (CHI 2026, Barcelona).",
    type: "paper"
  },
  {
    id: "harvard-offer",
    date: "Feb 2026",
    title: "Admitted to Harvard University (M.S. in Computational Science and Engineering)",
    description: "Will join the program in Fall 2026.",
    type: "admission"
  },
  {
    id: "endoextract-arxiv",
    date: "Jan 26, 2026",
    title: "EndoExtract released on arXiv",
    description: "A co-designed interface that surfaces interpretive fields for mandatory human review.",
    type: "research"
  },
  {
    id: "whofails-arxiv",
    date: "Jan 14, 2026",
    title: "Who Fails Where? released on arXiv",
    description: "Complementary error patterns between LLMs and human experts across 49 reports.",
    type: "research"
  },
  {
    id: "ougs-accept",
    date: "Dec 15, 2025",
    title: "OUGS accepted to Eurographics 2026 (Computer Graphics Forum)",
    description: "First-author paper from my research at AIML.",
    type: "paper"
  },
  {
    id: "ougs-arxiv",
    date: "Nov 2025",
    title: "OUGS released on arXiv",
    description: "Object-aware uncertainty estimation for active view selection in 3D Gaussian Splatting.",
    type: "research"
  },
  {
    id: "aiml-join",
    date: "Nov 2024",
    title: "Joined AIML as a Research Assistant",
    description: "Started working on 3D Gaussian Splatting and scene reconstruction at the Australian Institute for Machine Learning.",
    type: "research"
  }
];

export const skills = {
  programming: ["Python", "MATLAB", "R", "SQL"],
  stack: ["PyTorch", "OpenCV", "3DGS", "NeRF", "SfM", "Docker", "Git"],
  viz: ["Matplotlib", "Gephi", "Tableau", "Seaborn"],
  languages: ["English (TOEFL)", "GRE", "Mandarin (Native)"]
};

