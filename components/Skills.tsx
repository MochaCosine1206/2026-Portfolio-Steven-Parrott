import React from 'react';
import { SKILLS } from '../constants';

const Skills: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {SKILLS.map((category, idx) => (
        <div key={idx} className="bg-neon-card border border-gray-800 p-6 rounded-xl hover:border-neon-purple/50 transition-all duration-300 group">
          <h3 className="text-neon-cyan font-mono font-bold text-lg mb-4 border-b border-gray-800 pb-2 group-hover:border-neon-purple/30">
            {category.title}
          </h3>
          <div className="flex flex-wrap gap-2">
            {category.skills.map((skill, sIdx) => (
              <span 
                key={sIdx} 
                className="px-3 py-1 bg-gray-900 text-gray-300 text-xs rounded border border-gray-700 hover:text-white hover:border-neon-pink transition-colors cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Skills;
