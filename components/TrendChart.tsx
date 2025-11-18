import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TimelineDataPoint } from '../types';

interface TrendChartProps {
  data: TimelineDataPoint[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-zinc-900 border border-zinc-700 p-3 rounded shadow-xl text-sm">
        <p className="text-zinc-300 font-bold mb-1">{label}</p>
        <p className="text-indigo-400">AI Share: {payload[0].value}%</p>
        <p className="text-emerald-400">Human Share: {payload[1].value}%</p>
        {payload[0].payload.description && (
            <p className="text-zinc-500 text-xs mt-2 max-w-[200px] italic border-t border-zinc-800 pt-2">
                {payload[0].payload.description}
            </p>
        )}
      </div>
    );
  }
  return null;
};

const TrendChart: React.FC<TrendChartProps> = ({ data }) => {
  return (
    <div className="w-full h-[350px] bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-zinc-800 p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-zinc-400 text-sm font-medium uppercase tracking-wider">Task Composition Forecast</h3>
            <div className="text-xs text-zinc-500">2024 - 2034</div>
        </div>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorAi" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorHuman" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#34d399" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#34d399" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
          <XAxis 
            dataKey="year" 
            stroke="#71717a" 
            tick={{fontSize: 12}} 
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            stroke="#71717a" 
            tick={{fontSize: 12}} 
            tickLine={false}
            axisLine={false}
            unit="%"
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ paddingTop: '10px' }}/>
          <Area 
            type="monotone" 
            dataKey="aiShare" 
            name="AI Contribution"
            stroke="#818cf8" 
            fillOpacity={1} 
            fill="url(#colorAi)" 
            strokeWidth={2}
            stackId="1"
          />
          <Area 
            type="monotone" 
            dataKey="humanShare" 
            name="Human Contribution"
            stroke="#34d399" 
            fillOpacity={1} 
            fill="url(#colorHuman)" 
            strokeWidth={2}
            stackId="1"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrendChart;