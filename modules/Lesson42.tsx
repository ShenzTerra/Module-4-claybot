
import React, { useState, useEffect } from 'react';
import ClayCard from '../components/ClayCard';
import ClayButton from '../components/ClayButton';
import VariableBox from '../components/VariableBox';
import ScratchBlock from '../components/ScratchBlock';

interface Lesson42Props {
  onNext: () => void;
}

const Lesson42: React.FC<Lesson42Props> = ({ onNext }) => {
  const [activeTab, setActiveTab] = useState<'score' | 'timer' | 'state'>('score');
  const [timerVal, setTimerVal] = useState(10);
  const [isStarted, setIsStarted] = useState(0);

  useEffect(() => {
    let interval: number;
    if (activeTab === 'timer' && timerVal > 0) {
      interval = window.setInterval(() => setTimerVal(v => v - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [activeTab, timerVal]);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-black mb-4 text-purple-400">Lesson 4.2: What can we track?</h2>
        <p className="text-slate-400">Variables aren't just for points! They can store anything.</p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {(['score', 'timer', 'state'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-8 py-3 rounded-2xl font-bold transition-all border-b-4 capitalize ${
              activeTab === tab 
                ? 'bg-purple-500 text-white border-purple-700 -translate-y-1' 
                : 'bg-slate-800 text-slate-500 border-slate-900'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <ClayCard>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            {activeTab === 'score' && (
              <div className="animate-in fade-in slide-in-from-left-4">
                <h3 className="text-2xl font-bold mb-4">Keeping Score</h3>
                <p className="text-slate-400 mb-6">Every time your player touches a "good" object, we increment (add to) the variable.</p>
                <div className="space-y-2">
                  <ScratchBlock type="event">when green flag clicked</ScratchBlock>
                  <ScratchBlock type="variable" className="ml-4">set [Score] to [0]</ScratchBlock>
                  <ScratchBlock type="control" className="ml-4">forever</ScratchBlock>
                  <ScratchBlock type="control" className="ml-8">if [touching star?] then</ScratchBlock>
                  <ScratchBlock type="variable" className="ml-12">change [Score] by [1]</ScratchBlock>
                </div>
              </div>
            )}
            {activeTab === 'timer' && (
              <div className="animate-in fade-in slide-in-from-left-4">
                <h3 className="text-2xl font-bold mb-4">Countdown Timers</h3>
                <p className="text-slate-400 mb-6">Start at 10 and subtract 1 every second. When it hits 0, the game stops!</p>
                <div className="space-y-2">
                  <ScratchBlock type="variable">set [Time] to [10]</ScratchBlock>
                  <ScratchBlock type="control">repeat until [Time = 0]</ScratchBlock>
                  <ScratchBlock type="control" className="ml-4">wait [1] seconds</ScratchBlock>
                  <ScratchBlock type="variable" className="ml-4">change [Time] by [-1]</ScratchBlock>
                  <ClayButton onClick={() => setTimerVal(10)} color="purple" size="sm" className="mt-4">Reset Timer</ClayButton>
                </div>
              </div>
            )}
            {activeTab === 'state' && (
              <div className="animate-in fade-in slide-in-from-left-4">
                <h3 className="text-2xl font-bold mb-4">Simple State</h3>
                <p className="text-slate-400 mb-6">Is the game on or off? 0 = NO, 1 = YES. This helps the computer remember what's happening!</p>
                <div className="space-y-4">
                  <ScratchBlock type="variable">set [GameStarted] to [{isStarted}]</ScratchBlock>
                  <ClayButton onClick={() => setIsStarted(isStarted === 0 ? 1 : 0)} color="orange" size="sm">
                    Toggle Game State
                  </ClayButton>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-center p-12 bg-slate-950/40 rounded-[3rem] border-4 border-slate-800">
             {activeTab === 'score' && <VariableBox label="Score" value="???" color="green" />}
             {activeTab === 'timer' && <VariableBox label="Time" value={timerVal} color="purple" />}
             {activeTab === 'state' && <VariableBox label="GameStarted" value={isStarted} color="orange" />}
          </div>
        </div>
      </ClayCard>

      <div className="flex justify-center">
        <ClayButton onClick={onNext} color="blue" size="lg">
          Go to Project Lab!
        </ClayButton>
      </div>
    </div>
  );
};

export default Lesson42;
