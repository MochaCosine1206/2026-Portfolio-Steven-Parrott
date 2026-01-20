import React from 'react';
import { ExternalLink, Layers, Cpu, Code2, Database } from 'lucide-react';
import { FeaturedProject } from '../types';

interface FeaturedProjectsProps {
  projects: FeaturedProject[];
}

const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ projects }) => {
  return (
    <div className="space-y-16">
      {projects.map((project, index) => (
        <div 
          key={index} 
          className="bg-neon-card border border-gray-800 rounded-xl overflow-hidden relative group hover:border-neon-purple/50 transition-all duration-300"
        >
          {/* Top accent line */}
          <div className="h-1 w-full bg-gradient-to-r from-neon-pink via-neon-purple to-neon-cyan" />
          
          <div className="p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div>
                <h3 className="text-3xl font-bold text-white group-hover:text-neon-cyan transition-colors mb-2">
                  {project.title}
                </h3>
                <h4 className="text-neon-purple font-mono text-sm md:text-base">
                  {project.subtitle}
                </h4>
              </div>
              
              {project.url && (
                <a 
                  href={project.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan rounded-full hover:bg-neon-cyan hover:text-white transition-all transform hover:-translate-y-1 font-bold text-sm"
                >
                   <span>Visit Project</span>
                   <ExternalLink size={16} />
                </a>
              )}
            </div>

            <p className="text-gray-300 leading-relaxed mb-8 max-w-4xl border-l-4 border-gray-700 pl-4">
              {project.description}
            </p>

            {/* Tech Stack Grid */}
            <div className="mb-8">
               <h5 className="text-white font-bold mb-4 flex items-center gap-2">
                 <Code2 size={18} className="text-neon-pink" />
                 <span>Tech Stack & Architecture</span>
               </h5>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {project.techStack.map((cat, i) => (
                    <div key={i} className="bg-black/40 p-4 rounded border border-gray-800">
                      <span className="text-xs font-mono text-gray-500 uppercase tracking-wider block mb-2">{cat.category}</span>
                      <div className="flex flex-wrap gap-2">
                        {cat.items.map((item, j) => (
                          <span key={j} className="text-sm text-neon-cyan/90">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
               </div>
            </div>

            {/* Key Features */}
            <div>
               <h5 className="text-white font-bold mb-4 flex items-center gap-2">
                 <Cpu size={18} className="text-neon-green" />
                 <span>Key Features</span>
               </h5>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                 {project.features.map((feature, i) => (
                   <div key={i} className="flex items-start gap-3 text-sm text-gray-400">
                     <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-neon-purple shrink-0" />
                     <span>{feature}</span>
                   </div>
                 ))}
               </div>
            </div>

          </div>
          
          {/* Decorative background glow */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-neon-purple/10 rounded-full blur-3xl pointer-events-none group-hover:bg-neon-purple/20 transition-all duration-500" />
        </div>
      ))}
    </div>
  );
};

export default FeaturedProjects;
