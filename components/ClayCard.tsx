
import React from 'react';

interface ClayCardProps {
  children: React.ReactNode;
  className?: string;
}

const ClayCard: React.FC<ClayCardProps> = ({ children, className = '' }) => {
  return (
    <div className={`clay-card p-8 md:p-12 relative overflow-hidden ${className}`}>
      {/* Glossy overlay effect */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default ClayCard;
