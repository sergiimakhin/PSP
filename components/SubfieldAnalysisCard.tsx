import React from 'react';
import { SubfieldAnalysis } from '../types';
import { AlertTriangle, CheckCircle, TrendingUp } from './Icons';

interface Props {
  subfield: SubfieldAnalysis;
}

const SubfieldAnalysisCard: React.FC<Props> = ({ subfield }) => {
  const getIcon = () => {
    switch (subfield.automationType) {
      case 'Replacement': return <AlertTriangle className="w-4 h-4 text-red-400" />;
      case 'Augmentation': return <CheckCircle className="w-4 h-4 text-emerald-400" />;
      case 'New Creation': return <TrendingUp className="w-4 h-4 text-blue-400" />;
      default: return <TrendingUp className="w-4 h-4" />;
    }
  };

  const getBadgeColor = () => {
    switch (subfield.automationType) {
      case 'Replacement': return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'Augmentation': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'New Creation': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      default: return 'bg-zinc-800 text-zinc-400';
    }
  };

  return (
    <div className="p-4 rounded-lg bg-zinc-900/30 border border-zinc-800 hover:border-zinc-700 transition-colors">
      <div className="flex justify-between items-start mb-2">
        <h4 className="text-zinc-200 font-semibold">{subfield.name}</h4>
        <span className={`text-xs px-2 py-1 rounded-full border flex items-center gap-1 ${getBadgeColor()}`}>
          {getIcon()}
          {subfield.automationType}
        </span>
      </div>
      
      <div className="flex items-center gap-2 mb-3">
        <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-indigo-500 rounded-full" 
            style={{ width: `${subfield.riskScore}%` }}
          />
        </div>
        <span className="text-xs text-zinc-500 font-mono">{subfield.riskScore}% Risk</span>
      </div>
      
      <p className="text-sm text-zinc-400 leading-relaxed">
        {subfield.impactDescription}
      </p>
    </div>
  );
};

export default SubfieldAnalysisCard;