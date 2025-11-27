import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PersonalInfo } from '../types';
import { portfolioAPI } from '../services/api';

const About: React.FC = () => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPersonalInfo = async () => {
      try {
        const data = await portfolioAPI.getPersonalInfo();
        if (data.length > 0) {
          setPersonalInfo(data[0]);
        }
      } catch (error) {
        console.error('Error fetching personal info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPersonalInfo();
  }, []);


  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            About Me
          </h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto"></div>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
                Passionate Developer & Problem Solver
              </h3>
              
              {loading ? (
                <div className="space-y-4">
                  <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-300 rounded animate-pulse w-5/6"></div>
                  <div className="h-4 bg-gray-300 rounded animate-pulse w-4/6"></div>
                </div>
              ) : (
                <div className="text-gray-700 text-lg leading-relaxed space-y-4">
                  <p>
                    I'm a Computer Science Engineer and Programmer Analyst at Cognizant Technology Solutions with expertise in full-stack development and data analysis.
                  </p>
                  <p>
                    I work with technologies like React, Angular, Spring Boot, Django, and have experience in data visualization using Tableau. I've built projects ranging from analytics dashboards to innovative assistive technologies.
                  </p>
                  <p>
                    I'm passionate about creating solutions that solve real problems and make a positive impact through technology.
                  </p>
                </div>
              )}

              <div className="mt-8 flex flex-wrap gap-4">
                {personalInfo?.location && (
                  <div className="flex items-center text-gray-600">
                    <span className="font-medium">📍 Location:</span>
                    <span className="ml-2">{personalInfo.location}</span>
                  </div>
                )}
                {personalInfo?.email && (
                  <div className="flex items-center text-gray-600">
                    <span className="font-medium">📧 Email:</span>
                    <span className="ml-2">{personalInfo.email}</span>
                  </div>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-primary-50 to-blue-100 rounded-2xl p-8 shadow-lg">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-600 mb-2">1.5+</div>
                    <div className="text-gray-700">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-600 mb-2">232K+</div>
                    <div className="text-gray-700">Data Points Analyzed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-600 mb-2">95%</div>
                    <div className="text-gray-700">Code Quality Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-600 mb-2">6+</div>
                    <div className="text-gray-700">Certifications</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;