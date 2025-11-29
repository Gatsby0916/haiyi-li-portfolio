export interface Publication {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  status: 'Published' | 'Under Review' | 'Submitted';
  year: string;
  description: string;
  tags: string[];
  image?: string;
  imageFit?: 'contain' | 'cover';
  links?: {
    pdf?: string;
    code?: string;
    project?: string;
    arxiv?: string;
  };
}

export interface Experience {
  id: string;
  role: string;
  institution: string;
  location: string;
  period: string;
  description: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  ranking?: string;
  courses: string[];
}

export interface Award {
  id: string;
  title: string;
  issuer: string;
  year: string;
  description?: string;
  selectivity?: string;
}