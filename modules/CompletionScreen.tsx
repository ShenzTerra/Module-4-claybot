
import React from 'react';
import ClayButton from '../components/ClayButton';

interface CompletionScreenProps {
  onRestart: () => void;
}

const CompletionScreen: React.FC<CompletionScreenProps> = ({ onRestart }) => {
  return (
    <div className="flex flex-col items-center text-center py-12">
      <div className="relative mb-12">
        <div className="w-48 h-48 bg-green-500 rounded-full animate-morph flex items-center justify-center shadow-2xl">
          <span className="text-8xl">🏆</span>
        </div>
        <div className="absolute top-0 right-0 text-4xl animate-bounce">✨</div>
        <div className="absolute bottom-4 left-0 text-4xl animate-bounce" style={{ animationDelay: '0.5s' }}>✨</div>
      </div>

      <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
        Master of Variables!
      </h2>
      
      <p className="text-xl text-slate-300 max-w-xl mb-12 leading-relaxed">
        Great job, Logic Labber! You've learned how to name data, set initial values, and change them in real-time. 
        You're one step closer to building your own complex games!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl mb-12">
        <div className="bg-slate-800/50 p-6 rounded-3xl border border-slate-700 text-left">
          <h4 className="text-green-400 font-bold mb-2 uppercase text-xs tracking-widest">Completed</h4>
          <p className="font-semibold">Module 4: Variables</p>
        </div>
        <div className="bg-slate-800/50 p-6 rounded-3xl border border-slate-700 text-left">
          <h4 className="text-blue-400 font-bold mb-2 uppercase text-xs tracking-widest">New Skill</h4>
          <p className="font-semibold">Data Persistence & State</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <ClayButton onClick={() => window.location.reload()} color="blue" size="lg">
          Explore Other Modules
        </ClayButton>
        <ClayButton onClick={onRestart} color="slate" size="lg">
          Review Variables
        </ClayButton>
      </div>
    </div>
  );
};

export default CompletionScreen;
