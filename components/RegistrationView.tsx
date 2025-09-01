
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

export const RegistrationView: React.FC = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        teamName: '',
        skills: '',
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Registration data:', formData);
        setIsSubmitted(true);
        setFormData({
            fullName: '',
            email: '',
            teamName: '',
            skills: '',
        });
        setTimeout(() => setIsSubmitted(false), 5000); // Hide message after 5 seconds
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6 lg:p-8">
                <h2 className="text-2xl font-bold text-white mb-2">Participant Registration</h2>
                <p className="text-slate-400 mb-6">Join the hackathon by filling out the form below.</p>
                
                {isSubmitted && (
                    <div className="bg-green-500/20 text-green-300 border border-green-500/30 rounded-lg p-4 mb-6 text-center">
                        Thank you for registering! We're excited to have you.
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <FormInput 
                        label="Full Name"
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        placeholder="e.g., Ada Lovelace"
                    />
                    <FormInput 
                        label="Email Address"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="e.g., ada@example.com"
                    />
                    <FormInput 
                        label="Team Name (Optional)"
                        type="text"
                        name="teamName"
                        value={formData.teamName}
                        onChange={handleChange}
                        placeholder="e.g., The Innovators"
                    />
                    <FormInput 
                        label="Skills (Optional)"
                        type="text"
                        name="skills"
                        value={formData.skills}
                        onChange={handleChange}
                        placeholder="e.g., React, Python, Figma"
                    />
                    <div className="pt-2">
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-slate-900 bg-cyan-500 hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-500 transition-colors"
                        >
                            Register Now
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
