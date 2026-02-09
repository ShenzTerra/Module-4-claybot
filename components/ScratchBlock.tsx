
import React from 'react';

interface ScratchBlockProps {
  type: 'event' | 'control' | 'variable' | 'motion';
  children: React.ReactNode;
  className?: string;
}

const ScratchBlock: React.FC<ScratchBlockProps> = ({ type, children, className = '' }) => {
  const styles = {
    event: 'bg-[#FFBF00] border-[#E6AC00] rounded-t-2xl rounded-b-lg',
    control: 'bg-[#FFAB19] border-[#CF8B17] rounded-lg',
    variable: 'bg-[#FF8C1A] border-[#DB6E00] rounded-lg',
    motion: 'bg-[#4C97FF] border-[#3373CC] rounded-lg',
  };

  return (
    <div className={`inline-flex items-center px-4 py-2 border-l-8 text-white font-bold shadow-sm mb-2 ${styles[type]} ${className} select-none`}>
      {children}
    </div>
  );
};

export default ScratchBlock;
