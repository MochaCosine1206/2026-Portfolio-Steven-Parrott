import React from 'react';
import { Github, Linkedin, Mail, MapPin, Download, Terminal, FolderGit2 } from 'lucide-react';
import Timeline from './components/Timeline';
import Skills from './components/Skills';
import FeaturedProjects from './components/FeaturedProjects';
import { EXPERIENCE, EDUCATION, EMAIL, FEATURED_PROJECTS } from './constants';

function App() {
  return (
    <div className="min-h-screen bg-neon-bg text-white selection:bg-neon-pink selection:text-white pb-20">
      
      {/* Background Grid Effect */}
      <div className="fixed inset-0 z-0 pointer-events-none" 
           style={{
             backgroundImage: 'radial-gradient(circle at 1px 1px, #1a1a1a 1px, transparent 0)',
             backgroundSize: '40px 40px'
           }} 
      />

      {/* Hero Section */}
      <header className="relative z-10 pt-20 pb-16 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan text-xs font-mono mb-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-cyan"></span>
                </span>
                Available for new opportunities
             </div>
             <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
               Steven <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple">Parrott</span>
             </h1>
             <h2 className="text-xl md:text-2xl text-gray-400 font-mono mb-6">
               Full-Stack Software Developer & Founder
             </h2>
             <p className="max-w-2xl text-gray-400 leading-relaxed mb-8 border-l-4 border-neon-pink pl-4">
               Architecting scalable SaaS platforms and delivering complex enterprise solutions. 
               Founder of Plyne.io. Expert in React, Python, AWS, and AI integrations.
             </p>

             <div className="flex flex-wrap gap-4">
               <a href={`mailto:${EMAIL}`} className="px-6 py-3 bg-white text-black font-bold rounded hover:bg-neon-cyan hover:text-white transition-colors flex items-center gap-2">
                 <Mail size={18} />
                 Contact Me
               </a>
               <a href="https://github.com/MochaCosine1206" target="_blank" rel="noreferrer" className="px-6 py-3 bg-gray-900 border border-gray-700 text-white font-bold rounded hover:border-neon-purple hover:text-neon-purple transition-colors flex items-center gap-2">
                 <Github size={18} />
                 GitHub
               </a>
               <a href="https://www.linkedin.com/in/steven-parrott-95925235/" target="_blank" rel="noreferrer" className="px-6 py-3 bg-gray-900 border border-gray-700 text-white font-bold rounded hover:border-blue-500 hover:text-blue-500 transition-colors flex items-center gap-2">
                 <Linkedin size={18} />
                 LinkedIn
               </a>
             </div>
          </div>
          
          {/* Abstract Terminal Visual */}
          <div className="hidden lg:block w-1/3 bg-gray-900 rounded-lg border border-gray-800 p-4 font-mono text-xs opacity-80 shadow-2xl shadow-neon-cyan/10 transform rotate-2 hover:rotate-0 transition-transform duration-500">
             <div className="flex gap-2 mb-4">
               <div className="w-3 h-3 rounded-full bg-red-500"/>
               <div className="w-3 h-3 rounded-full bg-yellow-500"/>
               <div className="w-3 h-3 rounded-full bg-green-500"/>
             </div>
             <div className="space-y-2">
               <div className="text-green-400">$ npx create-portfolio steven-parrott</div>
               <div className="text-blue-400">ℹ Installing dependencies...</div>
               <div className="text-gray-400">... react</div>
               <div className="text-gray-400">... aws-sdk</div>
               <div className="text-green-400">✔ Success! Portfolio initialized.</div>
               <div className="text-gray-500">Current Status: <span className="text-white">Building Plyne.io</span></div>
               <div className="mt-4 border-t border-gray-800 pt-2">
                  <span className="text-neon-pink">const</span> stack = [<span className="text-yellow-200">'React'</span>, <span className="text-yellow-200">'Python'</span>, <span className="text-yellow-200">'AWS'</span>];
               </div>
             </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 space-y-32">
        
        {/* Skills Section */}
        <section>
          <div className="flex items-center gap-4 mb-12">
            <Terminal className="text-neon-pink" size={32} />
            <h2 className="text-3xl font-bold">Technical Arsenal</h2>
          </div>
          <Skills />
        </section>

        {/* Experience Timeline */}
        <section>
           <div className="flex items-center gap-4 mb-16 justify-center">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
              Professional Journey
            </h2>
          </div>
          <Timeline jobs={EXPERIENCE} />
        </section>

        {/* Featured Projects */}
        <section>
           <div className="flex items-center gap-4 mb-12">
             <FolderGit2 className="text-neon-cyan" size={32} />
             <h2 className="text-3xl font-bold">Featured Projects</h2>
           </div>
           <FeaturedProjects projects={FEATURED_PROJECTS} />
        </section>

        {/* Education & Other */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
           <div>
              <h3 className="text-2xl font-bold mb-8 text-neon-cyan">Education</h3>
              <div className="space-y-6">
                 {EDUCATION.map((edu, idx) => {
                    return (
                     <div key={idx} className="flex items-center gap-4 border-l-2 border-gray-700 pl-4 py-2 hover:border-neon-cyan transition-colors group">
                        <div>
                          <h4 className="text-lg font-bold text-white group-hover:text-neon-cyan transition-colors">{edu.school}</h4>
                          <p className="text-gray-400">{edu.degree}</p>
                        </div>
                     </div>
                   );
                 })}
              </div>
           </div>
           <div className="bg-gray-900/50 p-8 rounded-xl border border-gray-800 flex flex-col justify-center items-center text-center">
              <h3 className="text-2xl font-bold mb-4 text-white">Let's Build Something Amazing</h3>
              <p className="text-gray-400 mb-8 max-w-md">
                Currently based in Oak Ridge, TN. Open to discussing new opportunities or consulting on AI-driven architecture.
              </p>
              <a href={`mailto:${EMAIL}`} className="px-8 py-4 bg-neon-cyan hover:bg-cyan-400 text-black font-bold rounded shadow-lg shadow-cyan-500/20 transition-all transform hover:-translate-y-1">
                Get In Touch
              </a>
           </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-32 border-t border-gray-900 py-12 text-center text-gray-600 text-sm">
        <p>&copy; {new Date().getFullYear()} Steven Parrott. Built with React & Tailwind.</p>
      </footer>
    </div>
  );
}

export default App;
