
import React, { useState } from 'react';

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
        <label htmlFor={name} className="block text-sm font-medium text-slate-300 mb-2">
            {label}
        </label>
        <input
            type={type}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            placeholder={placeholder}
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
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            placeholder={placeholder}
            rows={rows}
            className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
        />
    </div>
);


export const CreateHackathonView: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        theme: '',
        startDate: '',
        endDate: '',
        description: '',
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('New Hackathon Data:', formData);
        setIsSubmitted(true);
        setFormData({
            name: '',
            theme: '',
            startDate: '',
            endDate: '',
            description: '',
        });
        setTimeout(() => setIsSubmitted(false), 5000); // Hide message after 5 seconds
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6 lg:p-8">
                <h2 className="text-2xl font-bold text-white mb-2">Create a New Hackathon</h2>
                <p className="text-slate-400 mb-6">Fill in the details below to set up your next event.</p>
                
                {isSubmitted && (
                    <div className="bg-green-500/20 text-green-300 border border-green-500/30 rounded-lg p-4 mb-6 text-center">
                        Hackathon created successfully!
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <FormInput 
                        label="Hackathon Name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="e.g., Gemini API Challenge"
                    />
                    <FormInput
                        label="Theme / Topic"
                        type="text"
                        name="theme"
                        value={formData.theme}
                        onChange={handleChange}
                        placeholder="e.g., AI for Social Good"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <FormInput 
                            label="Start Date"
                            type="date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            required
                        />
                        <FormInput 
                            label="End Date"
                            type="date"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <FormTextarea
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        placeholder="Describe the goals, rules, and prizes for your hackathon."
                    />
                    <div className="pt-2">
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-slate-900 bg-cyan-500 hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-500 transition-colors"
                        >
                            Create Hackathon
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
