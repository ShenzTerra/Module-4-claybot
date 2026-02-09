
import React from 'react';
import ClayButton from '../components/ClayButton';
import Logo from '../components/Logo';

interface IntroProps {
  onStart: () => void;
}

const Intro: React.FC<IntroProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center text-center py-8">
      <div className="relative mb-12">
        <div className="w-44 h-44 bg-slate-800/40 rounded-[3rem] border-4 border-slate-700 flex items-center justify-center shadow-2xl backdrop-blur-md">
          <Logo variant="full" className="scale-125" />
        </div>
        <div className="absolute -top-4 -right-8 bg-yellow-400 text-black font-black px-4 py-2 rounded-2xl rotate-12 shadow-lg animate-bounce">
          Module 4
        </div>
      </div>

      <h2 className="text-5xl md:text-6xl font-black mb-6 text-white leading-tight">
        Variables & <br/>
        <span className="text-orange-400">Simple Memory</span>
      </h2>
      
      <p className="text-xl text-slate-300 max-w-2xl mb-12 leading-relaxed font-medium">
        Welcome to the Million Coders Logic Lab! Today we're learning how computers <strong>remember</strong> things. 
        Think of a variable as a labeled box that holds your game's secrets!
      </p>

      <ClayButton onClick={onStart} color="orange" size="lg" className="px-16 py-6 shadow-[0_10px_0_#c2410c]">
        Start Coding!
      </ClayButton>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        <div className="p-8 bg-slate-800/20 rounded-[2.5rem] border-2 border-slate-700/50 hover:border-orange-500/50 transition-all group">
          <div className="text-4xl mb-4 group-hover:scale-125 transition-transform">📦</div>
          <h3 className="font-black text-xl mb-2 text-white">The Box Meta</h3>
          <p className="text-slate-500 text-sm font-medium">Learn how to create and name your data containers.</p>
        </div>
        <div className="p-8 bg-slate-800/20 rounded-[2.5rem] border-2 border-slate-700/50 hover:border-green-500/50 transition-all group">
          <div className="text-4xl mb-4 group-hover:scale-125 transition-transform">🎮</div>
          <h3 className="font-black text-xl mb-2 text-white">Score Keeping</h3>
          <p className="text-slate-500 text-sm font-medium">Use variables to track points in real-time games.</p>
        </div>
        <div className="p-8 bg-slate-800/20 rounded-[2.5rem] border-2 border-slate-700/50 hover:border-purple-500/50 transition-all group">
          <div className="text-4xl mb-4 group-hover:scale-125 transition-transform">⏳</div>
          <h3 className="font-black text-xl mb-2 text-white">Countdowns</h3>
          <p className="text-slate-500 text-sm font-medium">Master timers and simple game states (On/Off).</p>
        </div>
      </div>
    </div>
  );
};

export default Intro;
