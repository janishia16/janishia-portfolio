import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Calendar, FileText, Image, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Project } from '../types';
import { portfolioAPI } from '../services/api';

// Project Image Component with loading states and error handling
interface ProjectImageProps {
  project: Project;
  className?: string;
}

const ProjectImage: React.FC<ProjectImageProps> = ({ project, className = '' }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const getInitials = (title: string) => {
    return title.split(' ').map(word => word.charAt(0)).join('').slice(0, 2);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Loading skeleton */}
      {imageLoading && project.image && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />
      )}

      {/* Image or fallback */}
      {project.image && !imageError ? (
        <img
          src={project.image}
          alt={project.title}
          className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-white">
          <div className="text-center">
            <div className="text-2xl font-bold opacity-80 mb-1">
              {getInitials(project.title)}
            </div>
            <div className="text-xs opacity-60 px-2">
              {project.title}
            </div>
          </div>
        </div>
      )}
      
      {/* Published Badge */}
      {project.paper_published && (
        <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium shadow-lg">
          Published
        </div>
      )}
    </div>
  );
};

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [selectedImage, setSelectedImage] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setError(null);
        const data = await portfolioAPI.getProjects();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setError('Failed to load projects. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Keyboard navigation for gallery
  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeGallery();
      } else if (event.key === 'ArrowLeft') {
        prevImage();
      } else if (event.key === 'ArrowRight') {
        nextImage();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [selectedImage, currentImageIndex]);

  const displayedProjects = showAll ? projects : projects.slice(0, 8);

  // Gallery functions
  const openGallery = (project: Project) => {
    setSelectedImage(project);
    setCurrentImageIndex(0);
  };

  const closeGallery = () => {
    setSelectedImage(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedImage && selectedImage.images) {
      setCurrentImageIndex((prev) => 
        prev === selectedImage.images!.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedImage && selectedImage.images) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedImage.images!.length - 1 : prev - 1
      );
    }
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Here are some of the projects I've worked on that showcase my skills and experience
          </p>
        </motion.div>

        {/* Search and Filter Controls - Commented for now */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <Filter className="w-5 h-5" />
              Filters
              {(searchTerm || selectedTechnology) && (
                <span className="bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {[searchTerm, selectedTechnology].filter(Boolean).length}
                </span>
              )}
            </button>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-white p-4 rounded-lg shadow-lg border border-gray-200"
              >
                <div className="flex flex-wrap gap-4 items-center">
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-700">Technology:</label>
                    <select
                      value={selectedTechnology}
                      onChange={(e) => setSelectedTechnology(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">All Technologies</option>
                      {allTechnologies.map(tech => (
                        <option key={tech} value={tech}>{tech}</option>
                      ))}
                    </select>
                  </div>

                  {(searchTerm || selectedTechnology) && (
                    <button
                      onClick={clearFilters}
                      className="flex items-center gap-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200"
                    >
                      <X className="w-4 h-4" />
                      Clear Filters
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {(searchTerm || selectedTechnology) && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-600 mt-4"
            >
              {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} found
            </motion.p>
          )}
        </motion.div> */}

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8"
          >
            <p className="text-red-800 text-center">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 mx-auto block px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
            >
              Try Again
            </button>
          </motion.div>
        )}

        {loading ? (
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                <div className="h-40 bg-gray-300"></div>
                <div className="p-4">
                  <div className="h-5 bg-gray-300 rounded mb-3 w-3/4"></div>
                  <div className="h-3 bg-gray-300 rounded mb-1"></div>
                  <div className="h-3 bg-gray-300 rounded mb-3 w-4/5"></div>
                  <div className="flex gap-1 mb-3">
                    <div className="h-5 bg-gray-300 rounded w-12"></div>
                    <div className="h-5 bg-gray-300 rounded w-16"></div>
                  </div>
                  <div className="h-3 bg-gray-300 rounded mb-3 w-2/3"></div>
                  <div className="flex gap-2">
                    <div className="h-6 bg-gray-300 rounded w-12"></div>
                    <div className="h-6 bg-gray-300 rounded w-12"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : !error ? (
          <>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
              <AnimatePresence mode="wait">
              {displayedProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    layout
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 group border border-gray-100"
                >
                  {/* Project Image */}
                    <ProjectImage 
                      project={project} 
                      className="h-40 bg-gradient-to-br from-primary-400 to-primary-600 overflow-hidden"
                    />

                  {/* Project Content */}
                    <div className="p-4">
                      <div className="mb-3">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-200 leading-tight">
                      {project.title}
                    </h3>
                    
                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                      {project.short_description}
                    </p>
                      </div>

                    {/* Technologies */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {project.technologies.slice(0, 2).map((tech) => (
                        <span
                          key={tech.id}
                            className="px-2 py-1 bg-primary-50 text-primary-700 rounded text-xs font-medium"
                        >
                          {tech.name}
                        </span>
                      ))}
                        {project.technologies.length > 2 && (
                          <span className="px-2 py-1 bg-gray-50 text-gray-600 rounded text-xs font-medium">
                            +{project.technologies.length - 2}
                        </span>
                      )}
                    </div>

                    {/* Date */}
                      <div className="flex items-center text-gray-500 text-xs mb-3">
                        <Calendar size={12} className="mr-1" />
                        <span>
                      {formatDate(project.start_date)}
                      {project.end_date && ` - ${formatDate(project.end_date)}`}
                        </span>
                    </div>

                    {/* Links */}
                      <div className="flex gap-2">
                      {project.demo_url && (
                        <a
                          href={project.demo_url}
                          target="_blank"
                          rel="noopener noreferrer"
                            className="flex items-center gap-1 px-2 py-1 bg-primary-600 text-white rounded hover:bg-primary-700 font-medium transition-colors duration-200 text-xs"
                        >
                            <ExternalLink size={12} />
                            Demo
                        </a>
                      )}
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                            className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 font-medium transition-colors duration-200 text-xs"
                        >
                            <Github size={12} />
                          Code
                        </a>
                      )}
                        {project.paper_published && (
                          <a
                            href={project.paper_published}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 font-medium transition-colors duration-200 text-xs"
                          >
                            <FileText size={12} />
                            Paper
                          </a>
                        )}
                        {project.images && project.images.length > 0 && (
                          <button
                            onClick={() => openGallery(project)}
                            className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 font-medium transition-colors duration-200 text-xs"
                          >
                            <Image size={12} />
                            Images ({project.images.length})
                          </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
              </AnimatePresence>
            </div>

            {/* Show More Button */}
            {projects.length > 8 && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="bg-primary-600 text-white px-8 py-4 rounded-xl hover:bg-primary-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  {showAll 
                    ? 'Show Less' 
                    : `View All Projects (${projects.length})`
                  }
                </button>
              </motion.div>
            )}
          </>
        ) : null}

        {/* Empty States */}
        {!loading && !error && projects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Github className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Projects Found</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Projects are currently being updated. Please check back soon to see my latest work.
            </p>
          </motion.div>
        )}

        {/* No Matching Projects section - commented out with search/filter */}
        {/* {!loading && !error && projects.length > 0 && filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-primary-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Matching Projects</h3>
            <p className="text-gray-600 max-w-md mx-auto mb-6">
              Try adjusting your search terms or filters to find more projects.
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 font-medium"
            >
              Clear All Filters
            </button>
          </motion.div>
        )} */}
      </div>

      {/* Image Gallery Dialog Modal */}
      <AnimatePresence>
        {selectedImage && selectedImage.images && selectedImage.images.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={closeGallery}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[85vh] flex flex-col overflow-hidden border border-gray-100"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header with title and close button */}
              <div className="flex justify-between items-center p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{selectedImage.title}</h3>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      Image {currentImageIndex + 1} of {selectedImage.images.length}
                    </span>
                    <span className="text-sm text-gray-500">Project Gallery</span>
                  </div>
                </div>
                <button
                  onClick={closeGallery}
                  className="p-3 text-gray-400 hover:text-gray-600 hover:bg-white hover:shadow-md rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Main Image */}
              <div className="relative flex-1 bg-gradient-to-br from-gray-50 to-gray-100 p-6">
                <div className="relative h-[500px] bg-white rounded-xl shadow-inner overflow-hidden border border-gray-200">
                  <motion.img
                    key={currentImageIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    src={selectedImage.images[currentImageIndex]}
                    alt={`${selectedImage.title} - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-contain p-4"
                    loading="lazy"
                  />
                  
                  {/* Navigation arrows */}
                  {selectedImage.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-white hover:text-blue-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 border border-gray-200"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-white hover:text-blue-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 border border-gray-200"
                      >
                        <ChevronRight size={24} />
                      </button>
                    </>
                  )}

                  {/* Image loading indicator */}
                  <div className="absolute bottom-3 right-3 px-3 py-1 bg-black/20 backdrop-blur-sm text-white text-xs rounded-full">
                    {selectedImage.images.length > 1 ? 'Click arrows or dots to navigate' : 'Single image'}
                  </div>
                </div>
              </div>

              {/* Image indicators/dots */}
              {selectedImage.images.length > 1 && (
                <div className="flex justify-center items-center gap-3 p-6 bg-gradient-to-r from-gray-50 to-blue-50 border-t border-gray-100">
                  <span className="text-sm text-gray-600 font-medium mr-2">Navigate:</span>
                  {selectedImage.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToImage(index)}
                      className={`relative transition-all duration-300 transform hover:scale-125 ${
                        index === currentImageIndex
                          ? 'w-8 h-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full shadow-lg'
                          : 'w-3 h-3 bg-gray-300 hover:bg-blue-400 rounded-full shadow-sm hover:shadow-md'
                      }`}
                    >
                      <span className="sr-only">Go to image {index + 1}</span>
                    </button>
                  ))}
                  <span className="text-xs text-gray-500 ml-2">
                    Use ← → keys or click dots
                  </span>
          </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;