
import React, { useState } from 'react';
import { Project, GeminiAnalysis } from '../types';
import { analyzeProjectWithGemini, generateTaglineWithGemini } from '../services/geminiService';
import { CloseIcon, LinkIcon, RepoIcon, WandIcon, SparklesIcon } from './icons/Icons';

interface ProjectDetailModalProps {
  project: Project;
  onClose: () => void;
}

const ScoreCircle: React.FC<{ score: number; label: string }> = ({ score, label }) => {
    const circumference = 2 * Math.PI * 20;
    const offset = circumference - (score / 10) * circumference;
    
    return (
        <div className="flex flex-col items-center">
            <div className="relative w-24 h-24">
                <svg className="w-full h-full" viewBox="0 0 50 50">
                    <circle className="text-slate-700" strokeWidth="5" stroke="currentColor" fill="transparent" r="20" cx="25" cy="25"/>
                    <circle
                        className="text-cyan-400"
                        strokeWidth="5"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r="20"
                        cx="25"
                        cy="25"
                        style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%', transition: 'stroke-dashoffset 0.5s ease-in-out' }}
                    />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-xl font-bold text-white">{score}</span>
            </div>
            <p className="mt-2 text-sm text-slate-400">{label}</p>
        </div>
    );
};

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  const [analysis, setAnalysis] = useState<GeminiAnalysis | null>(null);
  const [isAnalysisLoading, setIsAnalysisLoading] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  const [tagline, setTagline] = useState<string | null>(null);
  const [isTaglineLoading, setIsTaglineLoading] = useState(false);
  const [taglineError, setTaglineError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    setIsAnalysisLoading(true);
    setAnalysisError(null);
    setAnalysis(null);
    try {
      const result = await analyzeProjectWithGemini(project);
      setAnalysis(result);
    } catch (err) {
      setAnalysisError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsAnalysisLoading(false);
    }
  };
  
  const handleGenerateTagline = async () => {
    setIsTaglineLoading(true);
    setTaglineError(null);
    setTagline(null);
    try {
      const result = await generateTaglineWithGemini(project);
      setTagline(result);
    } catch (err) {
      setTaglineError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsTaglineLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div 
        className="bg-slate-800/80 border border-slate-700/50 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="p-6 flex justify-between items-center border-b border-slate-700/50">
          <div>
            <h2 className="text-2xl font-bold text-white">{project.name}</h2>
            <p className="text-slate-400">Team: {project.teamMembers.join(', ')}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-700/50 text-slate-400 transition-colors">
            <CloseIcon className="w-6 h-6" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Project Info Section */}
          <div className="space-y-6">
            <div>
                <h3 className="font-semibold text-cyan-400 mb-2">Project Description</h3>
                <p className="text-slate-300">{project.description}</p>
            </div>
            <div className="flex space-x-4">
                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-colors">
                    <RepoIcon className="w-5 h-5"/> Repository
                </a>
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-colors">
                    <LinkIcon className="w-5 h-5"/> Live Demo
                </a>
            </div>
          </div>
          
          {/* AI Analysis Section */}
          <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-700/50 flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-white">AI-Powered Tools</h3>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
                 <button
                    onClick={handleAnalyze}
                    disabled={isAnalysisLoading || isTaglineLoading}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-cyan-500 text-slate-900 rounded-lg hover:bg-cyan-400 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
                >
                    <WandIcon className="w-4 h-4" />
                    {isAnalysisLoading ? 'Analyzing...' : 'Analyze Project'}
                </button>
                <button
                    onClick={handleGenerateTagline}
                    disabled={isAnalysisLoading || isTaglineLoading}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-purple-500/80 text-white rounded-lg hover:bg-purple-500 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
                >
                    <SparklesIcon className="w-4 h-4" />
                    {isTaglineLoading ? 'Generating...' : 'Generate Tagline'}
                </button>
            </div>

            {isAnalysisLoading && (
                <div className="flex-1 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
                </div>
            )}
            
            {taglineError && <p className="text-red-400 text-center my-2">{taglineError}</p>}
            {tagline && (
                <div className="bg-slate-800/50 p-3 rounded-lg text-center my-4 animate-fade-in">
                    <p className="text-lg italic text-purple-300">"{tagline}"</p>
                </div>
            )}
            
            {analysisError && <p className="text-red-400 text-center">{analysisError}</p>}
            {analysis && (
                 <div className="space-y-6 animate-fade-in">
                    <p className="text-slate-300 italic">"{analysis.summary}"</p>
                    <div className="flex justify-around pt-4">
                        <ScoreCircle score={analysis.innovationScore} label="Innovation"/>
                        <ScoreCircle score={analysis.technicalComplexityScore} label="Technical"/>
                        <ScoreCircle score={analysis.businessPotentialScore} label="Potential"/>
                    </div>
                     <div>
                        <h4 className="font-semibold text-green-400 mb-1">Strengths</h4>
                        <ul className="list-disc list-inside text-slate-300 space-y-1">
                            {analysis.strengths.map((s, i) => <li key={i}>{s}</li>)}
                        </ul>
                    </div>
                     <div>
                        <h4 className="font-semibold text-yellow-400 mb-1">Weaknesses</h4>
                        <ul className="list-disc list-inside text-slate-300 space-y-1">
                            {analysis.weaknesses.map((w, i) => <li key={i}>{w}</li>)}
                        </ul>
                    </div>
                     <div>
                        <h4 className="font-semibold text-blue-400 mb-1">Suggested Questions</h4>
                        <ul className="list-disc list-inside text-slate-300 space-y-1">
                            {analysis.suggestedQuestions.map((q, i) => <li key={i}>{q}</li>)}
                        </ul>
                    </div>
                </div>
            )}
            {!analysis && !isAnalysisLoading && !analysisError && (
                <div className="flex-1 flex flex-col items-center justify-center text-center text-slate-500">
                    <WandIcon className="w-12 h-12 mb-2"/>
                    <p>Click an AI tool above to evaluate this project with Gemini.</p>
                </div>
            )}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};
