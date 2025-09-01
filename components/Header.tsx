
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="flex-shrink-0 bg-slate-800/50 border-b border-slate-700/50 px-6 lg:px-8 py-4 flex items-center justify-between">
      <div>
        <h2 className="text-lg font-semibold text-white">Welcome, Organizer!</h2>
        <p className="text-sm text-slate-400">Here's what's happening with your hackathon today.</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-slate-700 rounded-full overflow-hidden">
            <img src="https://picsum.photos/40/40" alt="User Avatar" className="w-full h-full object-cover" />
        </div>
      </div>
    </header>
  );
};
