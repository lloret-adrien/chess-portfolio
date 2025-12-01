
import React from 'react';
import { PROJECTS } from '../constants';
import { ArrowUpRight, Lock, Construction, Clock } from 'lucide-react';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-32 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <h3 className="font-serif text-4xl md:text-5xl text-center mb-4 text-white">Selected Works</h3>
        <p className="text-center text-gray-400 mb-20 max-w-2xl mx-auto">
          Strategic moves across various industries.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project) => {
            const isSecret = !project.link;
            const ProjectWrapper = isSecret ? 'div' : 'a';
            const wrapperProps = isSecret
              ? { className: "group glass-panel rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full cursor-not-allowed" }
              : {
                  href: project.link!,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "group glass-panel rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full"
                };

            return (
              <ProjectWrapper
                key={project.id}
                {...wrapperProps}
              >
                <div className="h-52 overflow-hidden relative shrink-0">
                  <img
                    src={project.image}
                    alt={project.title}
                    className={`w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110 ${isSecret ? 'grayscale blur-sm' : 'grayscale group-hover:grayscale-0'}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-100" />

                  <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
                    {isSecret && (
                      <span className="bg-amber-500/90 text-black text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 uppercase tracking-wider shadow-lg">
                        <Construction className="w-3 h-3" /> In Progress
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">{project.role}</span>
                    {project.time && (
                       <span className="text-gray-400 text-xs flex items-center gap-1 bg-black/40 px-2 py-1 rounded backdrop-blur-sm">
                         <Clock className="w-3 h-3" /> {project.time}
                       </span>
                    )}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className={`text-xl font-serif transition-colors ${isSecret ? 'text-gray-300 italic' : 'text-white group-hover:text-amber-200'}`}>
                      {project.title || "Confidential Project"}
                    </h4>

                    {isSecret ? (
                      <div className="text-gray-600 cursor-not-allowed" title="Confidential Project">
                        <Lock size={18} />
                      </div>
                    ) : (
                      <div className="text-gray-500 group-hover:text-white transition-colors">
                        <ArrowUpRight size={20} />
                      </div>
                    )}
                  </div>

                  <p className="text-gray-400 text-sm mb-6 leading-relaxed flex-grow">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.map((t, i) => (
                      <span key={i} className="text-xs text-gray-500 border border-gray-800 px-2 py-1 rounded bg-black/20">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </ProjectWrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
