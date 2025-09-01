import React from 'react';

interface StatCardProps {
  title: string;
  value: number | string;
  // FIX: The type for 'icon' was changed from React.ReactNode to React.ReactElement.
  // React.ReactElement is more specific and ensures the prop is a clonable
  // element that can accept props like className, which resolves the TypeScript error.
  icon: React.ReactElement;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => {
  return (
    <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700/50 flex items-center gap-5">
      <div className="p-3 bg-slate-700/50 rounded-lg text-cyan-400">
        {React.cloneElement(icon, { className: 'w-6 h-6' })}
      </div>
      <div>
        <p className="text-sm text-slate-400 font-medium">{title}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
    </div>
  );
};