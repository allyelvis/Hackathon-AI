
import React, { useState, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { SubmissionsView } from './components/SubmissionsView';
import { WinnersView } from './components/WinnersView';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { RegistrationView } from './components/RegistrationView';
import { NewSubmissionView } from './components/NewSubmissionView';
import { View, Project, ProjectStatus } from './types';
import { mockProjects } from './constants';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>(View.Dashboard);
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | 'All'>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const stats = useMemo(() => {
    const totalProjects = projects.length;
    const totalParticipants = projects.reduce((sum, p) => sum + p.teamMembers.length, 0);
    const submissionsReceived = projects.filter(p => p.status !== ProjectStatus.InProgress).length;
    const judgingCount = projects.filter(p => p.status === ProjectStatus.Judging).length;
    return { totalProjects, totalParticipants, submissionsReceived, judgingCount };
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects
      .filter(p => statusFilter === 'All' || p.status === statusFilter)
      .filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.teamMembers.join(', ').toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [projects, statusFilter, searchTerm]);
  
  const winnerProjects = useMemo(() => {
    return projects.filter(p => p.status === ProjectStatus.Winner || p.status === ProjectStatus.Finalist);
  }, [projects]);

  const handleAddProject = (project: Project) => {
    setProjects(prevProjects => [project, ...prevProjects]);
    setActiveView(View.Submissions);
  };

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  const renderContent = () => {
    switch (activeView) {
      case View.Dashboard:
        return <DashboardView stats={stats} projects={projects} />;
      case View.Submissions:
        return (
          <SubmissionsView 
            projects={filteredProjects} 
            onSelectProject={handleSelectProject}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            searchTerm={searchTerm}
            onSearchTermChange={setSearchTerm}
          />
        );
      case View.Winners:
        return <WinnersView projects={winnerProjects} onSelectProject={handleSelectProject} />;
      case View.Registration:
        return <RegistrationView />;
      case View.NewSubmission:
        return <NewSubmissionView onAddProject={handleAddProject} />;
      default:
        return <DashboardView stats={stats} projects={projects}/>;
    }
  };

  return (
    <div className="flex h-screen bg-slate-900 text-slate-200 font-sans">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-900 p-6 lg:p-8">
          {renderContent()}
        </main>
      </div>
      {selectedProject && (
        <ProjectDetailModal project={selectedProject} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default App;
