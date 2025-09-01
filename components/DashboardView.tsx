
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { StatCard } from './StatCard';
import { UsersIcon, CodeBracketIcon, DocumentCheckIcon, ScaleIcon, CheckCircleIcon, GavelIcon } from './icons/Icons';
import { Project, ProjectStatus } from '../types';

interface DashboardViewProps {
  stats: {
    totalProjects: number;
    totalParticipants: number;
    submissionsReceived: number;
    judgingCount: number;
  };
  projects: Project[];
}

const submissionData = [
  { name: 'Day 1', submissions: 4 },
  { name: 'Day 2', submissions: 11 },
  { name: 'Day 3', submissions: 27 },
  { name: 'Day 4', submissions: 35 },
  { name: 'Day 5', submissions: 48 },
];

const formatDistanceToNow = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
}

const RecentActivity: React.FC<{ projects: Project[] }> = ({ projects }) => {
    const sortedProjects = [...projects].sort((a, b) => b.submissionTime.getTime() - a.submissionTime.getTime());
    const recentActivities = sortedProjects.slice(0, 5).map(p => {
        const action = p.status === ProjectStatus.Submitted ? "submitted" : "status updated to";
        const icon = p.status === ProjectStatus.Submitted ? <CheckCircleIcon className="w-5 h-5 text-green-400" /> : <GavelIcon className="w-5 h-5 text-blue-400" />;
        return {
            id: p.id,
            icon,
            text: <><span className="font-semibold text-white">{p.name}</span> was {action} <span className="font-semibold text-white">{p.status}</span>.</>,
            time: formatDistanceToNow(p.submissionTime)
        };
    });

    return (
        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
            <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
            <ul className="space-y-4">
                {recentActivities.map(activity => (
                    <li key={activity.id} className="flex items-start gap-4">
                        <div className="mt-1">{activity.icon}</div>
                        <div>
                            <p className="text-sm text-slate-300">{activity.text}</p>
                            <p className="text-xs text-slate-500">{activity.time}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export const DashboardView: React.FC<DashboardViewProps> = ({ stats, projects }) => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Projects" value={stats.totalProjects} icon={<CodeBracketIcon />} />
        <StatCard title="Total Participants" value={stats.totalParticipants} icon={<UsersIcon />} />
        <StatCard title="Submissions Received" value={stats.submissionsReceived} icon={<DocumentCheckIcon />} />
        <StatCard title="Projects in Judging" value={stats.judgingCount} icon={<ScaleIcon />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
            <h3 className="text-lg font-semibold text-white mb-4">Submission Trends</h3>
            <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <BarChart data={submissionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis dataKey="name" tick={{ fill: '#94a3b8' }} />
                <YAxis tick={{ fill: '#94a3b8' }} />
                <Tooltip
                    contentStyle={{
                    backgroundColor: '#1e293b',
                    borderColor: '#334155',
                    color: '#e2e8f0',
                    }}
                />
                <Bar dataKey="submissions" fill="#22d3ee" />
                </BarChart>
            </ResponsiveContainer>
            </div>
        </div>
        <RecentActivity projects={projects} />
      </div>
    </div>
  );
};
