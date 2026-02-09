
import React, { useState, useCallback } from 'react';
import { ModuleStep } from './types';
import Intro from './modules/Intro';
import Lesson41 from './modules/Lesson41';
import Lesson42 from './modules/Lesson42';
import CatchStarsGame from './modules/CatchStarsGame';
import QuizSection from './modules/QuizSection';
import CompletionScreen from './modules/CompletionScreen';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<ModuleStep>(ModuleStep.INTRO);

  const navigateTo = useCallback((step: ModuleStep) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentStep(step);
  }, []);

  const renderStep = () => {
    switch (currentStep) {
      case ModuleStep.INTRO:
        return <Intro onStart={() => navigateTo(ModuleStep.LESSON_4_1)} />;
      case ModuleStep.LESSON_4_1:
        return <Lesson41 onNext={() => navigateTo(ModuleStep.LESSON_4_2)} />;
      case ModuleStep.LESSON_4_2:
        return <Lesson42 onNext={() => navigateTo(ModuleStep.PROJECT)} />;
      case ModuleStep.PROJECT:
        return <CatchStarsGame onNext={() => navigateTo(ModuleStep.QUIZ)} />;
      case ModuleStep.QUIZ:
        return <QuizSection onComplete={() => navigateTo(ModuleStep.COMPLETED)} />;
      case ModuleStep.COMPLETED:
        return <CompletionScreen onRestart={() => navigateTo(ModuleStep.INTRO)} />;
      default:
        return <Intro onStart={() => navigateTo(ModuleStep.LESSON_4_1)} />;
    }
  };

  return (
    <div className="min-h-screen relative pb-20">
      {/* Header */}
      <header className="pt-8 px-6 text-center">
        <div className="inline-flex items-center gap-4 px-6 py-2 bg-slate-800/50 rounded-full border border-slate-700 backdrop-blur-md">
          <div className="w-4 h-4 rounded-full bg-yellow-400 animate-pulse shadow-[0_0_10px_rgba(250,204,21,0.5)]"></div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight">
            ClayBot Logic Lab <span className="text-slate-500 mx-2">•</span> 
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Module 4: Variables
            </span>
          </h1>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1.5 bg-slate-800 z-50">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-500"
          style={{ 
            width: `${(Object.values(ModuleStep).indexOf(currentStep) / (Object.values(ModuleStep).length - 1)) * 100}%` 
          }}
        />
      </div>

      <main className="max-w-4xl mx-auto px-4 mt-12">
        {renderStep()}
      </main>

      {/* Persistent Nav (Optional/Contextual) */}
      <footer className="fixed bottom-6 left-1/2 -translate-x-1/2 flex gap-4 pointer-events-none">
        {currentStep !== ModuleStep.INTRO && currentStep !== ModuleStep.COMPLETED && (
           <div className="pointer-events-auto bg-slate-900/80 backdrop-blur-xl border border-slate-700 px-6 py-3 rounded-full shadow-2xl flex items-center gap-6">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Currently Learning</span>
                <span className="text-sm font-semibold">{currentStep.replace('_', ' ')}</span>
              </div>
           </div>
        )}
      </footer>
    </div>
  );
};

export default App;
