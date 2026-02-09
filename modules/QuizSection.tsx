
import React, { useState } from 'react';
import { QuizQuestion } from '../types';
import ClayCard from '../components/ClayCard';
import ClayButton from '../components/ClayButton';

const QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "If you want a score to start at ZERO every time the flag is clicked, which block do you use?",
    options: [
      "Change [Score] by 1",
      "Set [Score] to 0",
      "Hide Variable [Score]"
    ],
    correctIndex: 1,
    hint: "Think about 'Initializing' or starting your box empty!"
  },
  {
    id: 2,
    question: "To make a timer count DOWN, what value should you use in a 'Change variable' block?",
    options: [
      "Add 1",
      "Keep at 0",
      "Subtract -1"
    ],
    correctIndex: 2,
    hint: "If adding 1 makes it go up, doing the opposite makes it go down!"
  },
  {
    id: 3,
    question: "Can you have TWO variables in a game at the same time (like Score AND Timer)?",
    options: [
      "Yes! As many as you need",
      "No! Only one box allowed"
    ],
    correctIndex: 0,
    hint: "Remember our 'Catch the Stars' project had Score, Missed, and Timer!"
  }
];

interface QuizSectionProps {
  onComplete: () => void;
}

const QuizSection: React.FC<QuizSectionProps> = ({ onComplete }) => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const currentQ = QUESTIONS[currentQIndex];

  const handleAnswer = (idx: number) => {
    if (selectedOption !== null) return;
    
    setSelectedOption(idx);
    if (idx === currentQ.correctIndex) {
      setIsCorrect(true);
      setIsWrong(false);
      setTimeout(() => {
        if (currentQIndex < QUESTIONS.length - 1) {
          setCurrentQIndex(currentQIndex + 1);
          setSelectedOption(null);
          setShowHint(false);
          setIsCorrect(false);
        } else {
          onComplete();
        }
      }, 1200);
    } else {
      setIsWrong(true);
      setIsCorrect(false);
      setTimeout(() => {
        setIsWrong(false);
        setSelectedOption(null);
      }, 1000);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-12">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Quiz Time! 🧠</h2>
        <div className="flex justify-center gap-2 mt-4">
          {QUESTIONS.map((_, i) => (
            <div 
              key={i} 
              className={`h-3 w-12 rounded-full transition-all duration-300 ${
                i < currentQIndex ? 'bg-green-500' : (i === currentQIndex ? 'bg-blue-500 scale-110 shadow-lg' : 'bg-slate-700')
              }`}
            />
          ))}
        </div>
      </div>

      <ClayCard className={`transition-all duration-300 ${
        isWrong ? 'border-red-500 animate-[shake_0.5s_ease-in-out]' : 
        isCorrect ? 'border-green-500 scale-[1.02]' : ''
      }`}>
        <h3 className="text-xl md:text-2xl font-bold mb-8 text-center leading-relaxed text-white">
          {currentQ.question}
        </h3>

        <div className="space-y-4">
          {currentQ.options.map((option, idx) => {
            const isCorrectOption = idx === currentQ.correctIndex;
            const isSelected = selectedOption === idx;
            
            return (
              <button
                key={idx}
                disabled={selectedOption !== null}
                onClick={() => handleAnswer(idx)}
                className={`w-full text-left p-6 rounded-3xl border-4 transition-all duration-200 text-lg font-bold flex justify-between items-center group relative overflow-hidden ${
                  isSelected
                    ? (isCorrectOption ? 'bg-green-500/20 border-green-500 text-green-400' : 'bg-red-500/20 border-red-500 text-red-400 animate-pulse')
                    : 'bg-slate-800/50 border-slate-700 hover:border-slate-500 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center border-2 border-inherit text-sm font-black ${isSelected ? 'bg-inherit' : 'bg-slate-900'}`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  {option}
                </div>
                {isSelected && (
                  <span className="text-2xl">{isCorrectOption ? '🌟 Great!' : '❌ Try again'}</span>
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col items-center">
          <button 
            onClick={() => setShowHint(!showHint)}
            className="px-6 py-2 bg-yellow-400/10 text-yellow-400 text-sm font-bold rounded-full border border-yellow-400/20 hover:bg-yellow-400/20 transition-all flex items-center gap-2"
          >
            <span>💡</span> {showHint ? "Click to hide hint" : "Need a hint?"}
          </button>
          {showHint && (
            <div className="mt-4 p-4 bg-yellow-400/10 border border-yellow-400/30 rounded-2xl text-yellow-200 text-sm text-center animate-bounce-short">
              {currentQ.hint}
            </div>
          )}
        </div>
      </ClayCard>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-10px); }
          40% { transform: translateX(10px); }
          60% { transform: translateX(-5px); }
          80% { transform: translateX(5px); }
        }
        @keyframes bounce-short {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
      `}</style>
    </div>
  );
};

export default QuizSection;
