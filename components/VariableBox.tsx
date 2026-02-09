
import React from 'react';

interface VariableBoxProps {
  label: string;
  value: string | number;
  color?: 'red' | 'blue' | 'green' | 'yellow' | 'purple' | 'orange';
}

const VariableBox: React.FC<VariableBoxProps> = ({ label, value, color = 'blue' }) => {
  const colorMap = {
    red: 'border-red-500/50 bg-red-500/10 text-red-400',
    blue: 'border-blue-500/50 bg-blue-500/10 text-blue-400',
    green: 'border-green-500/50 bg-green-500/10 text-green-400',
    yellow: 'border-yellow-500/50 bg-yellow-500/10 text-yellow-400',
    purple: 'border-purple-500/50 bg-purple-500/10 text-purple-400',
    orange: 'border-orange-500/50 bg-orange-500/10 text-orange-400',
  };

  return (
    <div className={`w-full flex flex-col items-stretch border-4 rounded-3xl overflow-hidden shadow-lg ${colorMap[color]}`}>
      <div className="bg-slate-950/40 px-4 py-2 text-[10px] uppercase tracking-tighter font-bold border-b-2 border-inherit text-center">
        {label}
      </div>
      <div className="p-4 flex items-center justify-center min-h-[64px]">
        <span className="text-3xl font-bold code-font">{value}</span>
      </div>
    </div>
  );
};

export default VariableBox;
