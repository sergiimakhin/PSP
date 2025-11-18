import React from 'react';

interface RiskGaugeProps {
  score: number;
}

const RiskGauge: React.FC<RiskGaugeProps> = ({ score }) => {
  // Determine color based on score
  let colorClass = 'text-green-500';
  let label = 'Low Risk';
  
  if (score > 30) {
    colorClass = 'text-yellow-400';
    label = 'Moderate Risk';
  }
  if (score > 70) {
    colorClass = 'text-red-500';
    label = 'High Risk';
  }

  // Calculate circumference for SVG circle
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-zinc-800 shadow-lg">
      <h3 className="text-zinc-400 text-sm font-medium uppercase tracking-wider mb-4">Automation Probability</h3>
      <div className="relative w-32 h-32">
        {/* Background Circle */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="64"
            cy="64"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-zinc-800"
          />
          {/* Progress Circle */}
          <circle
            cx="64"
            cy="64"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className={`transition-all duration-1000 ease-out ${colorClass}`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
          <span className={`text-3xl font-bold ${colorClass}`}>{score}%</span>
        </div>
      </div>
      <span className={`mt-2 font-medium ${colorClass}`}>{label}</span>
    </div>
  );
};

export default RiskGauge;