import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Skill } from '../types';
import { portfolioAPI } from '../services/api';

const Skills: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  // Function to get category-specific colors
  const getCategoryColors = (category: string) => {
    const colorMap = {
      languages: 'bg-blue-100 text-blue-800 hover:bg-blue-200 hover:text-blue-900',
      frontend: 'bg-green-100 text-green-800 hover:bg-green-200 hover:text-green-900',
      backend: 'bg-purple-100 text-purple-800 hover:bg-purple-200 hover:text-purple-900',
      database: 'bg-orange-100 text-orange-800 hover:bg-orange-200 hover:text-orange-900',
      tools: 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200 hover:text-indigo-900',
      devops: 'bg-red-100 text-red-800 hover:bg-red-200 hover:text-red-900',
    };
    return colorMap[category as keyof typeof colorMap] || 'bg-gray-100 text-gray-800 hover:bg-gray-200 hover:text-gray-900';
  };

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await portfolioAPI.getSkills();
        setSkills(data);
      } catch (error) {
        console.error('Error fetching skills:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  return (
    <section id="skills" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Skills & Technologies
          </h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Here are the technologies and tools I work with to bring ideas to life
          </p>
        </motion.div>

        {/* Simple Skills Tags */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          {loading ? (
            <div className="flex flex-wrap justify-center gap-4">
              {[...Array(15)].map((_, index) => (
                <div 
                  key={index} 
                  className="h-12 w-24 bg-gray-200 rounded-full animate-pulse shadow-md"
                ></div>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -2,
                    transition: { duration: 0.2 }
                  }}
                  className={`px-5 py-3 rounded-full text-sm font-semibold cursor-pointer 
                    shadow-md hover:shadow-lg transform transition-all duration-300 
                    ${getCategoryColors(skill.category)}`}
                >
                  {skill.name}
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;