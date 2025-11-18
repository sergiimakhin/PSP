import React from 'react';
import { SkillRecommendation } from '../types';

interface Props {
  skills: SkillRecommendation[];
}

const SkillsCard: React.FC<Props> = ({ skills }) => {
  return (
    <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-zinc-800 p-6 shadow-lg h-full">
      <h3 className="text-zinc-400 text-sm font-medium uppercase tracking-wider mb-6">Survival Skill Stack</h3>
      <div className="space-y-4">
        {skills.map((skill, idx) => (
          <div key={idx} className="flex items-center justify-between group">
            <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full 
                    ${skill.category === 'Technical' ? 'bg-blue-500' : 
                      skill.category === 'Soft Skill' ? 'bg-purple-500' : 'bg-amber-500'
                    }`} 
                />
                <span className="text-zinc-200 group-hover:text-white transition-colors">{skill.skill}</span>
            </div>
            <span className={`text-xs px-2 py-0.5 rounded border
                ${skill.relevance === 'High' ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10' :
                  'border-zinc-700 text-zinc-500 bg-zinc-800/50'
                }
            `}>
                {skill.relevance} Priority
            </span>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-zinc-800 flex gap-4 text-xs text-zinc-500">
        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500"></div> Technical</div>
        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-purple-500"></div> Soft Skills</div>
        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-amber-500"></div> Strategic</div>
      </div>
    </div>
  );
};

export default SkillsCard;