import { Certification } from '../types';

export const certifications: Certification[] = [
  {
    id: 1,
    institution: 'Coursera',
    name: 'Machine Learning Certification',
    field: 'Machine Learning',
    issue_year: '2023',
    credential_url: 'https://drive.google.com/file/d/1ikSvxwws7yHjWLD4zyjkGksBZ2_7TxXK/view?usp=drive_link', // Replace with your actual certificate URL
    description: `Completed comprehensive Machine Learning course covering fundamental concepts, algorithms, and practical applications.`,
  },
  {
    id: 2,
    institution: 'Coursera',
    name: 'Big data, artificial intelligence, and ethics',
    field: 'Data Analysis',
    issue_year: '2021',
    credential_url: 'https://drive.google.com/file/d/1hcGQzRp5QyYcD12x03blqpT-S3YJEQ0k/view?usp=drive_link', // Replace with your actual certificate URL
    description: `Acquired skills in data analysis using Python, including data manipulation, visualization, and statistical analysis.`,
  },
  {
    id: 3,
    institution: 'Cisco',
    name: 'Data Analytics Essentials',
    field: 'Data Analytics',
    issue_year: '2023',
    credential_url: 'https://drive.google.com/file/d/1_9lHwrcMpaiqxmxGyjiokswLEgD_0wq9/view?usp=drive_link', // Replace with your actual certificate URL
    description: `Completed comprehensive certification in data analytics fundamentals, covering data collection and analysis techniques.`,
  },
  {
    id: 4,
    institution: 'NPTEL',
    name: 'The Joy of Computing using Python',
    field: 'Programming',
    issue_year: '2023',
    credential_url: 'https://drive.google.com/file/d/1qpIKaxt8bEMLIQ8cGUlcntZVsHEq719q/view', // Replace with your actual certificate URL
    description: `Completed NPTEL course focusing on computational thinking and programming with Python.`,
  }
];

// Helper functions
export const getCertificationsByField = (field: string): Certification[] => {
  return certifications.filter(cert => 
    cert.field.toLowerCase().includes(field.toLowerCase())
  );
};

export const getActiveCertifications = (): Certification[] => {
  const now = new Date();
  return certifications.filter(cert => 
    new Date(cert.issue_year) > now
  );
};
