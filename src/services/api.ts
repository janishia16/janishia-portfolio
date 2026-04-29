// Static API service - no backend required!
import emailjs from '@emailjs/browser';
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

  sendContactMessage: async (message: ContactMessage): Promise<{ message: string }> => {
    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey ||
        serviceId === 'YOUR_SERVICE_ID' ||
        templateId === 'YOUR_TEMPLATE_ID' ||
        publicKey === 'YOUR_PUBLIC_KEY') {
      throw new Error('EmailJS credentials are not configured.');
    }

    await emailjs.send(
      serviceId,
      templateId,
      {
        from_name: message.name,
        from_email: message.email,
        subject: message.subject,
        message: message.message,
      },
      publicKey
    );

    return { message: "Thank you for your message! I'll get back to you soon." };
  },
};