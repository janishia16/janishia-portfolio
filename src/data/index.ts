// Export all static data
export { personalInfo } from './personalInfo';
export { skills, getSkillsByCategory, getFeaturedSkills } from './skills';
export { projects, getFeaturedProjects, getProjectsByTechnology } from './projects';
export { experience, getCurrentExperience, getPastExperience } from './experience';
export { education, getEducationByType, getEducationWithGPA, getFormalEducation } from './education';
export { certifications, getCertificationsByField, getActiveCertifications } from './certifications';

// Re-export types for convenience
export type {
  PersonalInfo,
  Skill,
  Project,
  Experience,
  Education,
  Certification,
  ContactMessage,
} from '../types';
