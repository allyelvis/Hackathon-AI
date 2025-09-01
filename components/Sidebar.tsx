
import React from 'react';
import { View } from '../types';
import { DashboardIcon, SubmissionsIcon, AnalyticsIcon, SettingsIcon, LogoIcon, TrophyIcon } from './icons/Icons';

interface SidebarProps {
  activeView: View;
  setActiveView: (view: View) => void;
}

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: View;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors duration-200 ${
      isActive
        ? 'bg-cyan-500/20 text-cyan-400'
        : 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'
    }`}
  >
    <div className="w-6 h-6 mr-4">{icon}</div>
    <span className="font-semibold">{label}</span>
  </button>
);

export const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {
  return (
    <aside className="w-64 bg-slate-800/50 border-r border-slate-700/50 p-6 flex flex-col">
      <div className="flex items-center gap-3 mb-10">
        <LogoIcon className="w-8 h-8 text-cyan-400" />
        <h1 className="text-xl font-bold text-white">Hackathon AI</h1>
      </div>
      <nav className="flex flex-col gap-2">
        <NavItem
          icon={<DashboardIcon />}
          label={View.Dashboard}
          isActive={activeView === View.Dashboard}
          onClick={() => setActiveView(View.Dashboard)}
        />
        <NavItem
          icon={<SubmissionsIcon />}
          label={View.Submissions}
          isActive={activeView === View.Submissions}
          onClick={() => setActiveView(View.Submissions)}
        />
        <NavItem
          icon={<TrophyIcon />}
          label={View.Winners}
          isActive={activeView === View.Winners}
          onClick={() => setActiveView(View.Winners)}
        />
        <NavItem
          icon={<AnalyticsIcon />}
          label={View.Analytics}
          isActive={activeView === View.Analytics}
          onClick={() => setActiveView(View.Analytics)}
        />
      </nav>
      <div className="mt-auto">
        <NavItem
            icon={<SettingsIcon />}
            label={View.Settings}
            isActive={activeView === View.Settings}
            onClick={() => setActiveView(View.Settings)}
        />
      </div>
    </aside>
  );
};
