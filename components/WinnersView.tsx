
import React from 'react';
import { Project, ProjectStatus } from '../types';
import { TrophyIcon } from './icons/Icons';

interface WinnersViewProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

const WinnerCard: React.FC<{ project: Project; onSelectProject: (project: Project) => void; }> = ({ project, onSelectProject }) => {
  const isWinner = project.status === ProjectStatus.Winner;
  const borderColor = isWinner ? 'border-yellow-400/80' : 'border-green-400/80';
  const textColor = isWinner ? 'text-yellow-300' : 'text-green-300';
  const bgColor = isWinner ? 'bg-yellow-400/10' : 'bg-green-400/10';

  return (
    <div className={`bg-slate-800/50 rounded-xl border border-slate-700/50 flex flex-col overflow-hidden transition-all duration-300 hover:border-cyan-400/50 hover:shadow-2xl hover:shadow-cyan-500/10`}>
        <div className={`p-5 border-b-2 ${borderColor}`}>
            <div className="flex items-center gap-3">
                <TrophyIcon className={`w-6 h-6 ${textColor}`} />
                <h3 className={`text-lg font-bold ${textColor}`}>{project.status}</h3>
            </div>
            <h2 className="text-xl font-semibold text-white mt-1">{project.name}</h2>
        </div>
        <div className="p-5 flex-grow">
            <p className="text-slate-400 text-sm mb-2">Team: {project.teamMembers.join(', ')}</p>
            <p className="text-slate-300 text-sm line-clamp-3">{project.description}</p>
        </div>
        <div className="p-5 mt-auto bg-slate-900/40">
            <button
                onClick={() => onSelectProject(project)}
                className="w-full px-4 py-2 text-sm font-semibold bg-cyan-500/20 text-cyan-300 rounded-lg hover:bg-cyan-500/30 transition-colors"
            >
                View Full Analysis
            </button>
        </div>
    </div>
  );
};


export const WinnersView: React.FC<WinnersViewProps> = ({ projects, onSelectProject }) => {
  const winners = projects.filter(p => p.status === ProjectStatus.Winner);
  const finalists = projects.filter(p => p.status === ProjectStatus.Finalist);
  
  return (
    <div className="space-y-8">
        <div>
            <h2 className="text-2xl font-bold text-white mb-1">Hackathon Winners</h2>
            <p className="text-slate-400">Celebrating the top projects of the event.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {winners.map(project => (
                <WinnerCard key={project.id} project={project} onSelectProject={onSelectProject} />
            ))}
            {finalists.map(project => (
                <WinnerCard key={project.id} project={project} onSelectProject={onSelectProject} />
            ))}
        </div>
        {projects.length === 0 && (
            <div className="flex flex-col items-center justify-center text-center text-slate-500 bg-slate-800/50 rounded-xl p-12 border border-slate-700/50">
                <TrophyIcon className="w-16 h-16 mb-4"/>
                <h3 className="text-xl font-semibold text-white">No Winners Announced Yet</h3>
                <p>The judging process is underway. Check back soon to see the winning projects!</p>
            </div>
        )}
    </div>
  );
};
