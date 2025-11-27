// Static API service - no backend required!
import { 
  PersonalInfo, 
  Skill, 
  Project, 
  Experience, 
  Education,
  Certification, 
  ContactMessage 
} from '../types';

import {
  personalInfo,
  skills,
  getSkillsByCategory,
  projects,
  getFeaturedProjects as getStaticFeaturedProjects,
  experience,
  education,
} from '../data';

import { certifications } from '../data/certifications';

// Simulate async behavior for consistent interface
const simulateAsyncCall = <T>(data: T, delay: number = 100): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay);
  });
};

export const portfolioAPI = {
  // Personal Info
  getPersonalInfo: async (): Promise<PersonalInfo[]> => {
    return simulateAsyncCall([personalInfo]);
  },

  // Skills
  getSkills: async (category?: string): Promise<Skill[]> => {
    const filteredSkills = category ? getSkillsByCategory(category) : skills;
    return simulateAsyncCall(filteredSkills);
  },

  // Projects
  getProjects: async (featured?: boolean): Promise<Project[]> => {
    const filteredProjects = featured ? getStaticFeaturedProjects() : projects;
    return simulateAsyncCall(filteredProjects);
  },

  getFeaturedProjects: async (): Promise<Project[]> => {
    return simulateAsyncCall(getStaticFeaturedProjects());
  },

  // Experience
  getExperience: async (): Promise<Experience[]> => {
    return simulateAsyncCall(experience);
  },

  // Education
  getEducation: async (): Promise<Education[]> => {
    return simulateAsyncCall(education);
  },

  // Certifications
  getCertifications: async (): Promise<Certification[]> => {
    return simulateAsyncCall(certifications);
  },

  // Contact - For now, just log the message (you can integrate with a service like Formspree, Netlify Forms, etc.)
  sendContactMessage: async (message: ContactMessage): Promise<{ message: string }> => {
    console.log('Contact form submission:', message);
    
    // You can integrate with services like:
    // - Formspree: https://formspree.io/
    // - Netlify Forms: https://www.netlify.com/products/forms/
    // - EmailJS: https://www.emailjs.com/
    // - Or any other form handling service
    
    return simulateAsyncCall(
      { message: 'Thank you for your message! I\'ll get back to you soon.' },
      500
    );
  },
};