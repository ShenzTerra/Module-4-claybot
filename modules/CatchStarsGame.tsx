
import React, { useState, useEffect, useRef, useCallback } from 'react';
import ClayCard from '../components/ClayCard';
import ClayButton from '../components/ClayButton';
import VariableBox from '../components/VariableBox';
import ScratchBlock from '../components/ScratchBlock';

interface CatchStarsGameProps {
  onNext: () => void;
}

const CatchStarsGame: React.FC<CatchStarsGameProps> = ({ onNext }) => {
  const [phase, setPhase] = useState<'config' | 'play' | 'over'>('config');
  const [initialScore, setInitialScore] = useState(0);
  const [initialTime, setInitialTime] = useState(20);
  
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);
  const [playerPosition, setPlayerPosition] = useState(50);
  const [starX, setStarX] = useState(50);
  const [starY, setStarY] = useState(-10);
  const [missed, setMissed] = useState(0);
  
  const gameRef = useRef<HTMLDivElement>(null);

  const startProgram = () => {
    setScore(initialScore);
    setTimer(initialTime);
    setMissed(0);
    setPhase('play');
    setStarY(-10);
    setStarX(Math.random() * 80 + 10);
  };

  const handleMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (phase !== 'play' || !gameRef.current) return;
    const rect = gameRef.current.getBoundingClientRect();
    let clientX = 'touches' in e ? (e as React.TouchEvent).touches[0].clientX : (e as React.MouseEvent).clientX;
    const relativeX = ((clientX - rect.left) / rect.width) * 100;
    setPlayerPosition(Math.max(5, Math.min(95, relativeX)));
  }, [phase]);

  // Timer Loop - Separate from game loop to avoid resets
  useEffect(() => {
    if (phase !== 'play') return;

    const timerLoop = setInterval(() => {
      setTimer(t => {
        if (t <= 1) {
          setPhase('over');
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timerLoop);
  }, [phase]);

  // Game Loop - Physics and Collision
  useEffect(() => {
    if (phase !== 'play') return;

    const gameLoop = setInterval(() => {
      setStarY(prev => {
        let nextY = prev + 3;
        // Collision detection
        if (nextY > 82 && nextY < 92 && Math.abs(starX - playerPosition) < 12) {
          setScore(s => s + 1);
          setStarX(Math.random() * 80 + 10);
          return -10;
        }
        // Missed detection
        if (nextY > 100) {
          setMissed(m => m + 1);
          setStarX(Math.random() * 80 + 10);
          return -10;
        }
        return nextY;
      });
    }, 30);

    return () => clearInterval(gameLoop);
  }, [phase, starX, playerPosition]);

  return (
    <div className="space-y-8">
      {phase === 'config' && (
        <ClayCard className="animate-in fade-in zoom-in-95">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-blue-400 mb-2">Project: Catch the Stars</h2>
            <p className="text-slate-400">Initialize your variables before running the program!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
               <div>
                  <label className="block text-sm font-bold text-slate-500 uppercase mb-4 tracking-widest">Initialization Blocks</label>
                  <div className="space-y-4">
                     <div className="flex items-center gap-4 bg-slate-900/40 p-4 rounded-2xl border border-slate-800">
                        <ScratchBlock type="variable">set [Score] to</ScratchBlock>
                        <input 
                          type="number" 
                          value={initialScore} 
                          onChange={(e) => setInitialScore(parseInt(e.target.value) || 0)}
                          className="w-20 bg-white text-black font-bold rounded-lg px-2 py-1 text-center"
                        />
                     </div>
                     <div className="flex items-center gap-4 bg-slate-900/40 p-4 rounded-2xl border border-slate-800">
                        <ScratchBlock type="variable">set [Time] to</ScratchBlock>
                        <input 
                          type="number" 
                          value={initialTime} 
                          onChange={(e) => setInitialTime(parseInt(e.target.value) || 0)}
                          className="w-20 bg-white text-black font-bold rounded-lg px-2 py-1 text-center"
                        />
                     </div>
                  </div>
               </div>
               
               <div className="p-6 bg-blue-500/10 rounded-3xl border-2 border-dashed border-blue-500/30">
                  <p className="text-sm text-blue-300 italic">
                    "Setting variables at the start ensures your game always begins exactly how you want!"
                  </p>
               </div>
            </div>

            <div className="flex flex-col items-center justify-center bg-slate-950/40 rounded-[3rem] p-10 border-4 border-slate-800">
                <div className="text-6xl mb-6">🚀</div>
                <ClayButton onClick={startProgram} color="green" size="lg" className="w-full">
                   Run Program
                </ClayButton>
            </div>
          </div>
        </ClayCard>
      )}

      {phase !== 'config' && (
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-56 space-y-3 shrink-0">
             <VariableBox label="Score" value={score} color="green" />
             <VariableBox label="Time" value={timer} color="purple" />
             <VariableBox label="Missed" value={missed} color="red" />
             {phase === 'over' && (
               <ClayButton onClick={() => setPhase('config')} color="blue" className="w-full">
                 Back to Editor
               </ClayButton>
             )}
          </div>

          <div 
            ref={gameRef}
            onMouseMove={handleMove}
            onTouchMove={handleMove}
            className="flex-1 relative h-[450px] bg-[#020617] rounded-[2.5rem] border-8 border-slate-800 overflow-hidden cursor-none shadow-2xl"
          >
             {phase === 'play' ? (
               <>
                 <div className="absolute bottom-10 w-24 h-12 bg-blue-500 rounded-b-3xl rounded-t-lg shadow-[0_6px_0_#1d4ed8] z-20"
                      style={{ left: `${playerPosition}%`, transform: 'translateX(-50%)' }} />
                 <div className="absolute text-5xl z-10 select-none"
                      style={{ top: `${starY}%`, left: `${starX}%`, transform: 'translateX(-50%)' }}>⭐</div>
               </>
             ) : (
               <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-black/60 backdrop-blur-md">
                  <h3 className="text-5xl font-black text-yellow-400 mb-4 animate-bounce">FINISHED!</h3>
                  <p className="text-xl text-white mb-8">Score: {score} | Missed: {missed}</p>
                  <ClayButton onClick={onNext} color="green" size="lg">Final Quiz</ClayButton>
               </div>
             )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CatchStarsGame;
