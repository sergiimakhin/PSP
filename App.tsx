import React, { useState, useCallback } from 'react';
import { Brain, Search, Loader2, Sparkles, ArrowRight } from './components/Icons';
import { analyzeProfession } from './services/geminiService';
import { ProfessionAnalysis, LoadingState } from './types';
import TrendChart from './components/TrendChart';
import RiskGauge from './components/RiskGauge';
import SubfieldAnalysisCard from './components/SubfieldAnalysisCard';
import SkillsCard from './components/SkillsCard';

const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<LoadingState>(LoadingState.IDLE);
  const [data, setData] = useState<ProfessionAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setStatus(LoadingState.ANALYZING);
    setError(null);
    setData(null);

    try {
      const result = await analyzeProfession(query);
      setData(result);
      setStatus(LoadingState.COMPLETE);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong during analysis.");
      setStatus(LoadingState.ERROR);
    }
  }, [query]);

  return (
    <div className="min-h-screen bg-[#09090b] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))] text-zinc-100 selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* Header */}
      <header className="border-b border-zinc-800 sticky top-0 z-50 bg-[#09090b]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-lg">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">FutureWork<span className="text-indigo-400">AI</span></span>
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-zinc-400">
            <a href="#" className="hover:text-white transition-colors">Methodology</a>
            <a href="#" className="hover:text-white transition-colors">Trends</a>
            <a href="#" className="hover:text-white transition-colors">About</a>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Hero / Search Section */}
        <div className={`transition-all duration-700 ease-in-out flex flex-col items-center ${status === LoadingState.IDLE ? 'min-h-[60vh] justify-center' : 'mb-12'}`}>
          
          {status === LoadingState.IDLE && (
            <div className="text-center mb-10 space-y-4 animate-fade-in-up">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent pb-2">
                Will AI replace you?
              </h1>
              <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto">
                Enter a profession to simulate its future trajectory, analyze displacement risks, and discover survival strategies based on real-world data trends.
              </p>
            </div>
          )}

          <form onSubmit={handleAnalyze} className="w-full max-w-2xl relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative flex items-center bg-zinc-900 rounded-xl border border-zinc-800 shadow-2xl overflow-hidden">
              <Search className="w-6 h-6 text-zinc-500 ml-4" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g., Software Engineer, Truck Driver, Radiologist..."
                className="w-full bg-transparent p-4 text-lg outline-none text-white placeholder-zinc-600"
                disabled={status === LoadingState.ANALYZING}
              />
              <button 
                type="submit" 
                disabled={status === LoadingState.ANALYZING || !query.trim()}
                className="mr-2 px-6 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {status === LoadingState.ANALYZING ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Analyzing</>
                ) : (
                  <><Sparkles className="w-4 h-4" /> Forecast</>
                )}
              </button>
            </div>
          </form>

          {status === LoadingState.ANALYZING && (
            <div className="mt-8 text-zinc-500 flex flex-col items-center animate-pulse">
              <p>Processing employment statistics...</p>
              <p className="text-xs mt-2">Model: Gemini 2.5 Flash</p>
            </div>
          )}
        </div>

        {/* Error State */}
        {status === LoadingState.ERROR && (
           <div className="max-w-2xl mx-auto p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-center">
             {error}
           </div>
        )}

        {/* Results Dashboard */}
        {status === LoadingState.COMPLETE && data && (
          <div className="animate-fade-in space-y-6">
            
            {/* Top Row: Header Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Main Summary Card */}
              <div className="lg:col-span-2 bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-zinc-800 p-6 shadow-lg flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <h2 className="text-3xl font-bold text-white capitalize">{data.jobTitle}</h2>
                    <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-mono">
                      2024-2034 OUTLOOK
                    </span>
                  </div>
                  <p className="text-zinc-400 leading-relaxed text-lg">
                    {data.summary}
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-2 text-indigo-400 font-medium cursor-pointer hover:text-indigo-300 transition-colors group">
                  Read detailed report <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Risk Gauge */}
              <RiskGauge score={data.overallRiskScore} />
            </div>

            {/* Middle Row: Charts & Skills */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <TrendChart data={data.timeline} />
              </div>
              <div className="lg:col-span-1">
                <SkillsCard skills={data.skillsToSurvive} />
              </div>
            </div>

            {/* Bottom Row: Subfield Breakdown */}
            <div className="space-y-4">
              <h3 className="text-zinc-400 text-sm font-medium uppercase tracking-wider pl-1">Subfield Breakdown</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.subfields.map((sub, idx) => (
                  <SubfieldAnalysisCard key={idx} subfield={sub} />
                ))}
              </div>
            </div>

          </div>
        )}
      </main>

      {/* Simple Footer */}
      <footer className="border-t border-zinc-800 mt-20 py-8 text-center text-zinc-600 text-sm">
        <p>Powered by Gemini 2.5 Flash • Data is simulated based on generalized training projections.</p>
      </footer>
    </div>
  );
};

export default App;