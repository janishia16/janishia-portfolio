import { Project } from '../types';
import { skills } from './skills';

// Helper function to get skills by name
const getSkillsByNames = (names: string[]) => {
  return skills.filter(skill => names.includes(skill.name));
};

export const projects: Project[] = [
  {
    id: 1,
    title: 'Spotify Data Analytics Dashboard',
    description: `Comprehensive data analytics dashboard analyzing 232,725 Spotify tracks across 25 genres using a Kaggle dataset. Developed interactive visualizations displaying key metrics including total songs, top songs, and audio features such as liveness, loudness, and danceability. Created calculated fields for user-friendly duration formats and implemented advanced visualizations including packed bubble plots and box-and-whisker plots to represent genre distribution and song characteristics. The dashboard highlighted genre relationships and song features, improving data interpretation accuracy by 40% and demonstrating advanced data visualization and analytical skills.`,
    short_description: 'Interactive Tableau dashboard analyzing 232K+ Spotify tracks across 25 genres',
    demo_url: 'https://public.tableau.com/app/profile/janishia.noronha/viz/SpotifyDashboard_16889407309010/Spotify',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&crop=center&auto=format&q=80',
    images: undefined,
    technologies: getSkillsByNames(['Tableau', 'Data Analysis']),
    paper_published: undefined,
    start_date: '2023-10-01',
    end_date: '2023-10-31',
    is_featured: true,
    order: 1,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 2,
    title: 'Smart Glove for Visually Impaired',
    description: `Innovative assistive technology project designed to help visually impaired individuals identify and locate objects in indoor environments. The smart glove integrates voice recognition and response modules, enabling users to issue voice commands with 90% accuracy and receive real-time audible feedback for seamless interaction. Equipped with advanced object detection capabilities using camera and sensors, achieving an object detection range of up to 3 meters. The system achieved approximately 80% accuracy in object detection, significantly enhancing the independence of visually impaired users and reducing reliance on assistance by 50% in indoor navigation tasks.`,
    short_description: 'Voice-controlled smart glove with object detection for visually impaired assistance',
    paper_published: 'https://www.academia.edu/101293824/Vision_Gloves_for_Blinds',
    image: 'https://raw.githubusercontent.com/janishia16/Images/main/IMG_1819_Original.jpeg',
    images: [
      'https://raw.githubusercontent.com/janishia16/Images/main/IMG_1819_Original.jpeg',
      'https://raw.githubusercontent.com/janishia16/Images/main/IMG_1820_Original.jpeg',
      'https://raw.githubusercontent.com/janishia16/Images/main/IMG_1824_Original.jpeg'
    ],
    technologies: getSkillsByNames(['Python', 'Machine Learning']),
    start_date: '2023-01-01',
    end_date: '2024-03-30',
    is_featured: true,
    order: 2,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  }
];

// Helper functions
export const getFeaturedProjects = (): Project[] => {
  return projects.filter(project => project.is_featured);
};

export const getProjectsByTechnology = (technologyName: string): Project[] => {
  return projects.filter(project =>
    project.technologies.some(tech => tech.name === technologyName)
  );
};
