
import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'icon';
}

const Logo: React.FC<LogoProps> = ({ className = '', variant = 'full' }) => {
  // Assuming the PNG file is named 'logo.png' and placed in the project root/public directory.
  // The 'full' variant shows the complete logo, while 'icon' could be used for smaller headers.
  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      <img 
        src="logo.png" 
        alt="Million Coders Logo" 
        className={`${variant === 'full' ? 'w-48 md:w-64' : 'w-12 md:w-16'} h-auto object-contain transition-transform duration-300 hover:scale-105`}
        onError={(e) => {
          // Fallback if image is missing - useful for initial setup
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          const parent = target.parentElement;
          if (parent) {
            const fallback = document.createElement('div');
            fallback.className = "text-orange-500 font-black text-xl border-2 border-orange-500 p-2 rounded-lg";
            fallback.innerText = "MILLION CODERS";
            parent.appendChild(fallback);
          }
        }}
      />
    </div>
  );
};

export default Logo;
