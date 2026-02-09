
import React from 'react';

interface ClayButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  color?: 'red' | 'blue' | 'green' | 'yellow' | 'purple' | 'orange' | 'slate';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
}

const ClayButton: React.FC<ClayButtonProps> = ({ 
  children, 
  onClick, 
  color = 'blue', 
  size = 'md', 
  disabled = false,
  className = ''
}) => {
  const colorMap = {
    red: 'bg-[#FF6B6B] shadow-[#c94b4b]',
    blue: 'bg-[#4D96FF] shadow-[#3b75c9]',
    green: 'bg-[#6BCB77] shadow-[#54a15e]',
    yellow: 'bg-[#FFD93D] shadow-[#c9ab30]',
    purple: 'bg-[#927DFF] shadow-[#7462c9]',
    orange: 'bg-[#FF9F43] shadow-[#c97e34]',
    slate: 'bg-slate-700 shadow-slate-900',
  };

  const sizeMap = {
    sm: 'px-4 py-2 text-sm rounded-xl',
    md: 'px-8 py-3 text-lg rounded-2xl',
    lg: 'px-12 py-5 text-2xl rounded-3xl',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`clay-btn font-bold text-white transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${colorMap[color]} ${sizeMap[size]} ${className}`}
    >
      <div className="absolute inset-0 bg-white/10 rounded-inherit opacity-0 hover:opacity-100 transition-opacity"></div>
      {children}
    </button>
  );
};

export default ClayButton;
