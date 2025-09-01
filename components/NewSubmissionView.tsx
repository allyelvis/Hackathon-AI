
import React, { useState } from 'react';
import { Project, ProjectStatus } from '../types';

interface NewSubmissionViewProps {
    onAddProject: (project: Project) => void;
}

const FormInput: React.FC<{
    label: string;
    type: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    placeholder?: string;
}> = ({ label, type, name, value, onChange, required, placeholder }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-slate-300 mb-2">{label}</label>
        <input
            type={type} id={name} name={name} value={value} onChange={onChange} required={required} placeholder={placeholder}
            className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
        />
    </div>
);

const FormTextarea: React.FC<{
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    required?: boolean;
    placeholder?: string;
    rows?: number;
}> = ({ label, name, value, onChange, required, placeholder, rows = 4 }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-slate-300 mb-2">{label}</label>
        <textarea
            id={name} name={name} value={value} onChange={onChange} required={required} placeholder={placeholder} rows={rows}
            className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
        />
    </div>
);

export const NewSubmissionView: React.FC<NewSubmissionViewProps> = ({ onAddProject }) => {
    const [formData, setFormData] = useState({
        projectName: '',
        description: '',
        teamMembers: '',
        repoUrl: '',
        demoUrl: '',
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const newProject: Project = {
            id: `proj-${Math.random().toString(36).substr(2, 9)}`,
            name: formData.projectName,
            description: formData.description,
            teamMembers: formData.teamMembers.split(',').map(s => s.trim()).filter(Boolean),
            submissionTime: new Date(),
            status: ProjectStatus.Submitted,
            repoUrl: formData.repoUrl,
            demoUrl: formData.demoUrl,
        };

        onAddProject(newProject);
        
        setIsSubmitted(true);
        setFormData({
            projectName: '',
            description: '',
            teamMembers: '',
            repoUrl: '',
            demoUrl: '',
        });
        setTimeout(() => setIsSubmitted(false), 5000);
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6 lg:p-8">
                <h2 className="text-2xl font-bold text-white mb-2">Submit a New Project</h2>
                <p className="text-slate-400 mb-6">Fill in the details of your project to submit it for judging.</p>

                {isSubmitted && (
                    <div className="bg-green-500/20 text-green-300 border border-green-500/30 rounded-lg p-4 mb-6 text-center">
                        Project submitted successfully! You can view it in the Submissions list.
                    </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <FormInput 
                        label="Project Name" type="text" name="projectName" value={formData.projectName} onChange={handleChange} required
                        placeholder="e.g., AI-Powered Code Reviewer"
                    />
                    <FormTextarea
                        label="Project Description" name="description" value={formData.description} onChange={handleChange} required
                        placeholder="A brief summary of what your project does."
                    />
                    <FormInput
                        label="Team Members" type="text" name="teamMembers" value={formData.teamMembers} onChange={handleChange} required
                        placeholder="e.g., Alice Johnson, Bob Williams (comma-separated)"
                    />
                    <FormInput
                        label="Repository URL" type="url" name="repoUrl" value={formData.repoUrl} onChange={handleChange} required
                        placeholder="https://github.com/..."
                    />
                    <FormInput
                        label="Demo URL" type="url" name="demoUrl" value={formData.demoUrl} onChange={handleChange} required
                        placeholder="https://your-demo-link.com"
                    />
                    <div className="pt-2">
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-slate-900 bg-cyan-500 hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-500 transition-colors"
                        >
                            Submit Project
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
