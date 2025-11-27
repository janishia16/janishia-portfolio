import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Briefcase, Award, ExternalLink } from 'lucide-react';
import { Experience, Education, Certification } from '../types';
import { portfolioAPI } from '../services/api';

const ExperienceSection: React.FC = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'experience' | 'education' | 'certifications'>('experience');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [expData, eduData, certData] = await Promise.all([
          portfolioAPI.getExperience(),
          portfolioAPI.getEducation(),
          portfolioAPI.getCertifications(),
        ]);
        setExperiences(expData);
        setEducation(eduData);
        setCertifications(certData);
      } catch (error) {
        console.error('Error fetching experience/education/certifications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };

  const calculateDuration = (startDate: string, endDate?: string) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (years > 0 && remainingMonths > 0) {
      return `${years} year${years > 1 ? 's' : ''} ${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`;
    } else if (years > 0) {
      return `${years} year${years > 1 ? 's' : ''}`;
    } else {
      return `${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`;
    }
  };

  return (
    <section id="experience" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Experience, Education & Certifications
          </h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            My professional journey, educational background, and professional certifications
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="bg-white rounded-lg p-2 shadow-lg flex flex-wrap justify-center">
            <button
              onClick={() => setActiveTab('experience')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === 'experience'
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              Work Experience
            </button>
            <button
              onClick={() => setActiveTab('education')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === 'education'
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              Education
            </button>
            <button
              onClick={() => setActiveTab('certifications')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === 'certifications'
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              Certifications
            </button>
          </div>
        </motion.div>

        {loading ? (
          <div className="max-w-4xl mx-auto space-y-8">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg animate-pulse">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-gray-300 rounded-full flex-shrink-0"></div>
                  <div className="flex-1">
                    <div className="h-6 bg-gray-300 rounded mb-2 w-2/3"></div>
                    <div className="h-4 bg-gray-300 rounded mb-4 w-1/2"></div>
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            {/* Experience Tab */}
            {activeTab === 'experience' && (
              <div className="space-y-8">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Briefcase className="w-8 h-8 text-primary-600" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-1">
                              {exp.position}
                            </h3>
                            <h4 className="text-xl text-primary-600 font-semibold">
                              {exp.company}
                            </h4>
                          </div>
                          
                          <div className="flex flex-col lg:items-end mt-2 lg:mt-0">
                            <div className="flex items-center text-gray-600 mb-1">
                              <Calendar size={16} className="mr-2" />
                              {formatDate(exp.start_date)} - {exp.is_current ? 'Present' : formatDate(exp.end_date!)}
                            </div>
                            <div className="text-sm text-gray-500">
                              {calculateDuration(exp.start_date, exp.end_date)}
                            </div>
                            {exp.location && (
                              <div className="flex items-center text-gray-600 mt-1">
                                <MapPin size={16} className="mr-2" />
                                {exp.location}
                              </div>
                            )}
                          </div>
                        </div>

                        <p className="text-gray-700 leading-relaxed mb-4">
                          {exp.description}
                        </p>

                        {exp.skills_used.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {exp.skills_used.map((skill) => (
                              <span
                                key={skill.id}
                                className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                              >
                                {skill.name}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {experiences.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-600 text-lg">
                      No work experience available.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Education Tab */}
            {activeTab === 'education' && (
              <div className="space-y-8">
                {education.map((edu, index) => (
                  <motion.div
                    key={edu.id}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">🎓</span>
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-1">
                              {edu.degree}
                            </h3>
                            {edu.field_of_study && (
                              <p className="text-lg text-gray-600 mb-2">
                                {edu.field_of_study}
                              </p>
                            )}
                            <h4 className="text-xl text-blue-600 font-semibold">
                              {edu.institution}
                            </h4>
                          </div>
                          
                          <div className="flex flex-col lg:items-end mt-2 lg:mt-0">
                            <div className="flex items-center text-gray-600 mb-1">
                              <Calendar size={16} className="mr-2" />
                              {formatDate(edu.start_date)} - {edu.end_date ? formatDate(edu.end_date) : 'Present'}
                            </div>
                            {edu.gpa && (
                              <div className="text-sm text-gray-500">
                                GPA: {edu.gpa}
                              </div>
                            )}
                          </div>
                        </div>

                        {edu.description && (
                          <p className="text-gray-700 leading-relaxed">
                            {edu.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {education.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-600 text-lg">
                      No education information available.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Certifications Tab - Compact Grid Layout */}
            {activeTab === 'certifications' && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={cert.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary-200 group flex flex-col h-full"
                  >
                    {/* Header with Icon and Institution */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition-colors duration-300">
                        <Award className="w-6 h-6 text-primary-600" />
                      </div>
                      <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded-full">
                        {cert.field}
                      </span>
                    </div>

                    {/* Certification Details */}
                    <div className="mb-4 flex-1">
                      <h3 className="text-base font-bold text-gray-900 mb-2 leading-tight min-h-[3rem] flex items-center">
                        <span className="line-clamp-2">
                          {cert.name}
                        </span>
                      </h3>
                      <h4 className="text-sm font-semibold text-primary-600 mb-3">
                        {cert.institution}
                      </h4>
                      
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar size={14} className="mr-2" />
                          <span>Issued: {formatDate(cert.issue_year)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Certificate Action Button */}
                    <div className="mt-auto">
                      {cert.credential_url && (
                        <a
                          href={cert.credential_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                        >
                          <Award size={16} />
                          View Certificate
                          <ExternalLink size={14} />
                        </a>
                      )}

                    </div>
                  </motion.div>
                ))}
                
                {certifications.length === 0 && (
                  <div className="col-span-full text-center py-12">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Award className="w-8 h-8 text-primary-400" />
                    </div>
                    <p className="text-gray-600 text-lg">
                      No certifications available.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ExperienceSection;