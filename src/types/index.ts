export interface PersonalInfo {
  id: number;
  name: string;
  title: string;
  email: string;
  phone?: string;
  location?: string;
  bio: string;
  profile_image?: string;
  resume?: string;
  linkedin_url?: string;
  github_url?: string;
  website_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Skill {
  id: number;
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'tools' | 'languages';
}

export interface Project {
  id: number;
  title: string;
  description: string;
  short_description: string;
  image?: string;
  images?: string[]; // Multiple images for gallery
  demo_url?: string;
  github_url?: string;
  technologies: Skill[];
  start_date: string;
  end_date?: string;
  is_featured: boolean;
  order: number;
  created_at: string;
  updated_at: string;
  paper_published?: string;
}

export interface Experience {
  id: number;
  company: string;
  position: string;
  description: string;
  location?: string;
  start_date: string;
  end_date?: string;
  is_current: boolean;
  skills_used: Skill[];
  created_at: string;
  updated_at: string;
}

export interface Education {
  id: number;
  institution: string;
  degree: string;
  field_of_study?: string;
  gpa?: number;
  start_date: string;
  end_date?: string;
  description?: string;
  created_at: string;
}

export interface Certification {
  id: number;
  institution: string;
  name: string;
  field: string;
  issue_year: string;
  credential_url?: string;
  description?: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}