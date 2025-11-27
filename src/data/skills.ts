import { Skill } from '../types';

export const skills: Skill[] = [
  // Programming Languages
  { id: 1, name: 'Python', category: 'languages' },
  { id: 2, name: 'Java', category: 'languages' },
  { id: 5, name: 'SQL', category: 'languages' },
  
  // Frontend Technologies
  { id: 6, name: 'React', category: 'frontend' },
  
  // Backend Technologies & Frameworks
  { id: 10, name: 'Django', category: 'backend' },
  { id: 11, name: 'Spring Boot', category: 'backend' },
  { id: 12, name: 'REST APIs', category: 'backend' },
  { id: 13, name: 'Data Structures', category: 'backend' },
  { id: 14, name: 'Algorithms', category: 'backend' },
  
  // Database Technologies
  { id: 15, name: 'PostgreSQL', category: 'database' },
  { id: 16, name: 'MySQL', category: 'database' },
  { id: 18, name: 'Database Management', category: 'database' },
  
  // Developer Tools & Testing
  { id: 19, name: 'Visual Studio Code', category: 'tools' },
  { id: 20, name: 'Git', category: 'tools' },
  { id: 21, name: 'Postman', category: 'tools' },
  { id: 22, name: 'Tableau', category: 'tools' },
  { id: 23, name: 'JUnit & Mockito', category: 'tools' },
  { id: 25, name: 'SonarQube', category: 'tools' },
  { id: 27, name: 'Data Analysis', category: 'tools' },
  { id: 28, name: 'Machine Learning', category: 'tools' },
  
  // DevOps & CI/CD
  { id: 29, name: 'Jenkins', category: 'devops' },
];

// Helper functions
export const getSkillsByCategory = (category?: string): Skill[] => {
  if (!category) return skills;
  return skills.filter(skill => skill.category === category);
};

export const getFeaturedSkills = (): Skill[] => {
  // Return the most important/core skills
  const featuredSkillNames = ['Python', 'Java', 'React', 'Django', 'Spring Boot', 'PostgreSQL', 'JavaScript', 'Angular'];
  return skills.filter(skill => featuredSkillNames.includes(skill.name));
};
