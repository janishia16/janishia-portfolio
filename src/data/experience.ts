import { Experience } from '../types';
import { skills } from './skills';

// Helper function to get skills by names
const getSkillsByNames = (names: string[]) => {
  return skills.filter(skill => names.includes(skill.name));
};

export const experience: Experience[] = [
  {
    id: 1,
    company: 'Cognizant Technology Solutions',
    position: 'Programmer Analyst Trainee',
    description: `Currently working as a Programmer Analyst Trainee focusing on frontend and backend development. Developing and maintaining scalable applications using React and Spring Boot, ensuring seamless integration between components. Actively involved in bug fixing and debugging to ensure smooth application functionality. Managing and maintaining detailed workflows, which has improved operational processes and enhanced team collaboration. Gaining hands-on experience in managing development tasks effectively while contributing to multiple client projects.`,
    location: 'Bangalore, India',
    start_date: '2024-09-01',
    end_date: undefined,
    is_current: true,
    skills_used: getSkillsByNames(['React', 'Spring Boot', 'Java', 'JavaScript', 'HTML5', 'CSS3']),
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 2,
    company: 'Cognizant Technology Solutions',
    position: 'Full-Stack Intern',
    description: `Developed a comprehensive full-stack application using Angular for the frontend and Spring Boot for the backend, with H2 database for efficient data storage. Conducted extensive unit testing with Mockito and JUnit, achieving a 95% score in SonarQube for code quality and covering over 90% of the codebase with tests. Created comprehensive API documentation using Swagger, detailing 10+ endpoints, and produced detailed Java documentation for all major components. Gained valuable experience in full-stack development, testing methodologies, and documentation best practices.`,
    location: 'Maharashtra, Pune',
    start_date: '2023-11-01',
    end_date: '2024-05-31',
    is_current: false,
    skills_used: getSkillsByNames(['Angular', 'Spring Boot', 'Java', 'H2 Database', 'JUnit', 'Mockito', 'Swagger', 'SonarQube']),
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
];

// Helper functions
export const getCurrentExperience = (): Experience[] => {
  return experience.filter(exp => exp.is_current);
};

export const getPastExperience = (): Experience[] => {
  return experience.filter(exp => !exp.is_current);
};
