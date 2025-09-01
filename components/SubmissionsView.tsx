
import React from 'react';
import { Project, ProjectStatus } from '../types';
import { SearchIcon } from './icons/Icons';

interface SubmissionsViewProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  statusFilter: ProjectStatus | 'All';
  onStatusFilterChange: (status: ProjectStatus | 'All') => void;
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
}

const statusColorMap: Record<ProjectStatus, string> = {
  [ProjectStatus.Winner]: 'bg-yellow-400/20 text-yellow-300 border-yellow-400/30',
  [ProjectStatus.Finalist]: 'bg-green-400/20 text-green-300 border-green-400/30',
  [ProjectStatus.Judging]: 'bg-blue-400/20 text-blue-300 border-blue-400/30',
  [ProjectStatus.Submitted]: 'bg-purple-400/20 text-purple-300 border-purple-400/30',
  [ProjectStatus.InProgress]: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
};

const filterOptions: (ProjectStatus | 'All')[] = ['All', ...Object.values(ProjectStatus)];

const FilterButton: React.FC<{
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-colors ${
      isActive ? 'bg-cyan-500 text-slate-900' : 'bg-slate-700/50 hover:bg-slate-600/50'
    }`}
  >
    {label}
  </button>
);

export const SubmissionsView: React.FC<SubmissionsViewProps> = ({ projects, onSelectProject, statusFilter, onStatusFilterChange, searchTerm, onSearchTermChange }) => {
  return (
    <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 overflow-hidden">
      <div className="p-5 border-b border-slate-700/50">
        <h3 className="text-lg font-semibold text-white">All Submissions</h3>
        <p className="text-sm text-slate-400">Review and manage all projects submitted to the hackathon.</p>
        <div className="mt-4 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon className="w-5 h-5 text-slate-400" />
                </div>
                <input
                    type="text"
                    placeholder="Search by name or team..."
                    value={searchTerm}
                    onChange={(e) => onSearchTermChange(e.target.value)}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
                {filterOptions.map(option => (
                    <FilterButton 
                        key={option} 
                        label={option} 
                        isActive={statusFilter === option} 
                        onClick={() => onStatusFilterChange(option)}
                    />
                ))}
            </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-900/50">
            <tr>
              <th className="p-4 font-semibold text-sm text-slate-400">Project Name</th>
              <th className="p-4 font-semibold text-sm text-slate-400">Team Members</th>
              <th className="p-4 font-semibold text-sm text-slate-400">Submission Time</th>
              <th className="p-4 font-semibold text-sm text-slate-400">Status</th>
              <th className="p-4 font-semibold text-sm text-slate-400"></th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="border-t border-slate-700/50 hover:bg-slate-800/40">
                <td className="p-4 font-medium text-white">{project.name}</td>
                <td className="p-4 text-slate-300">{project.teamMembers.join(', ')}</td>
                <td className="p-4 text-slate-300">{project.submissionTime.toLocaleString()}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${statusColorMap[project.status]}`}>
                    {project.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => onSelectProject(project)}
                    className="px-4 py-2 text-sm font-semibold bg-cyan-500/20 text-cyan-300 rounded-lg hover:bg-cyan-500/30 transition-colors"
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
             {projects.length === 0 && (
                <tr className="border-t border-slate-700/50">
                    <td colSpan={5} className="text-center p-8 text-slate-500">
                        No projects found matching your criteria.
                    </td>
                </tr>
             )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
