import React, { useState } from 'react';
import { Job } from '../types';
import { Calendar, MapPin, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { getLogo } from './Logos';

interface TimelineProps {
  jobs: Job[];
}

const TimelineItem: React.FC<{ job: Job; index: number }> = ({ job, index }) => {
  // Expand first item (Shaderz) AND Plyne.io by default
  const [isExpanded, setIsExpanded] = useState(index === 0 || job.company === 'Plyne.IO');
  const isEven = index % 2 === 0;

  // Only show the full logo for Plyne.IO, use initials for others
  const logo = job.company === 'Plyne.IO' ? getLogo(job.logoId) : null;

  return (
    <div className={`mb-8 md:mb-12 flex justify-between items-center w-full ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'} group`}>
      {/* Spacer for desktop alignment */}
      <div className="hidden md:block w-5/12" />

      {/* Timeline Node - hidden on mobile */}
      <div className="z-20 hidden md:flex items-center order-1 shadow-xl w-8 h-8 rounded-full bg-neon-card border-2 border-neon-cyan group-hover:scale-125 transition-transform duration-300">
        <div className="mx-auto w-3 h-3 bg-neon-cyan rounded-full animate-pulse" />
      </div>

      {/* Content Card */}
      <div className={`order-1 w-full md:w-5/12 px-1 py-0 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
        <div 
          className="bg-neon-card border border-gray-800 rounded-lg p-6 shadow-lg hover:shadow-neon-cyan/20 hover:border-neon-cyan/50 transition-all duration-300 cursor-pointer relative overflow-hidden"
          onClick={(e) => {
            // Prevent expansion toggle if clicking on the link button
            if ((e.target as HTMLElement).closest('a')) return;
            setIsExpanded(!isExpanded);
          }}
        >
          {/* Decorative Background Gradient */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink opacity-50" />
          
          <div className={`flex items-center gap-4 mb-2 ${isEven ? 'md:flex-row-reverse' : 'flex-row'}`}>
             <div className="w-12 h-12 shrink-0 rounded bg-white/5 p-1 overflow-hidden border border-gray-700 flex items-center justify-center">
                {logo ? (
                  logo
                ) : (
                  <div className="font-mono font-bold text-neon-cyan text-lg">
                    {job.company.substring(0,2).toUpperCase()}
                  </div>
                )}
             </div>
             <div className="flex-1">
                <div className={`flex items-center gap-2 ${isEven ? 'md:flex-row-reverse' : 'flex-row'}`}>
                  <h3 className="text-xl font-bold text-white group-hover:text-neon-cyan transition-colors">{job.company}</h3>
                  {job.url && (
                    <a 
                      href={job.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-neon-pink/10 border border-neon-pink/30 text-neon-pink text-xs hover:bg-neon-pink hover:text-white transition-all transform hover:scale-105"
                      title={`Visit ${job.company}`}
                    >
                      <span>Live</span>
                      <ExternalLink size={10} />
                    </a>
                  )}
                </div>
                <h4 className="text-neon-purple font-mono text-sm">{job.role}</h4>
             </div>
          </div>

          <div className={`flex flex-col gap-1 text-gray-400 text-xs mb-4 ${isEven ? 'md:items-end' : 'md:items-start'}`}>
            <div className="flex items-center gap-1">
              <Calendar size={12} />
              <span>{job.period}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin size={12} />
              <span>{job.location}</span>
            </div>
          </div>

          <p className="text-gray-300 text-sm mb-4 leading-relaxed">
            {job.description}
          </p>

          {/* Expanded Projects Section */}
          <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
            {job.projects && job.projects.length > 0 && (
              <div className="mt-4 border-t border-gray-800 pt-4">
                <h5 className="text-neon-pink text-xs font-bold uppercase tracking-wider mb-3">Key Projects</h5>
                <div className="space-y-4">
                  {job.projects.map((project, idx) => (
                    <div key={idx} className="bg-black/40 p-3 rounded border-l-2 border-neon-cyan text-left">
                      <div className="flex justify-between items-start">
                        <span className="font-bold text-white text-sm block mb-1">{project.name}</span>
                      </div>
                      <p className="text-gray-400 text-xs mb-2">{project.description}</p>
                      <div className="flex flex-wrap gap-1 justify-start">
                        {project.tech?.map((t, tIdx) => (
                          <span key={tIdx} className="text-[10px] bg-gray-800 text-neon-cyan px-1.5 py-0.5 rounded">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className={`mt-4 flex ${isEven ? 'md:justify-end' : 'justify-start'} justify-center`}>
             {isExpanded ? <ChevronUp className="text-gray-500" size={20} /> : <ChevronDown className="text-gray-500" size={20} />}
          </div>

        </div>
      </div>
    </div>
  );
};

const Timeline: React.FC<TimelineProps> = ({ jobs }) => {
  return (
    <div className="relative container mx-auto px-6 flex flex-col space-y-8">
      {/* Central Line - hidden on mobile */}
      <div className="hidden md:block absolute left-1/2 ml-[-1px] w-0.5 h-full bg-gradient-to-b from-neon-cyan via-neon-purple to-neon-pink opacity-30" />
      
      {jobs.map((job, index) => (
        <TimelineItem key={index} job={job} index={index} />
      ))}
    </div>
  );
};

export default Timeline;
