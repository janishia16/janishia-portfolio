import { Education } from '../types';

export const education: Education[] = [
  {
    id: 1,
    institution: 'Mangalore Institute of Technology & Engineering',
    degree: 'Bachelor of Computer Science & Engineering',
    field_of_study: 'Computer Science & Engineering',
    gpa: 8.85,
    start_date: '2019-08-01',
    end_date: '2023-06-30',
    description: `Completed comprehensive Computer Science & Engineering program with strong focus on software development, data structures, algorithms, and database management systems. Coursework included Database Management Systems, Data Structures and Algorithms, Software Engineering, and Web Development. Developed strong foundations in programming languages including Python and Java. Achieved CGPA of 8.82, demonstrating consistent academic excellence throughout the program.`,
    created_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 2,
    institution: 'SLJ Pre-University College',
    degree: 'Senior Secondary Education',
    field_of_study: 'Science',
    gpa: 8.82,
    start_date: '2017-06-01',
    end_date: '2019-04-30',
    description: `Completed Pre-University education with focus on Science subjects, laying strong foundation for engineering studies. Achieved CGPA of 8.82, demonstrating strong academic performance and dedication to studies.`,
    created_at: '2024-01-01T00:00:00Z',
  },
];

// Helper functions
export const getEducationByType = (degreeType: string): Education[] => {
  return education.filter(edu => edu.degree.toLowerCase().includes(degreeType.toLowerCase()));
};

export const getEducationWithGPA = (): Education[] => {
  return education.filter(edu => edu.gpa !== undefined);
};

export const getFormalEducation = (): Education[] => {
  return education.filter(edu => edu.degree.toLowerCase().includes('bachelor') || 
                               edu.degree.toLowerCase().includes('master') || 
                               edu.degree.toLowerCase().includes('secondary'));
};
