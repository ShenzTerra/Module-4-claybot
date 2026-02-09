
import React, { useState } from 'react';
import ClayCard from '../components/ClayCard';
import ClayButton from '../components/ClayButton';
import VariableBox from '../components/VariableBox';
import ScratchBlock from '../components/ScratchBlock';

interface Lesson41Props {
  onNext: () => void;
}

const Lesson41: React.FC<Lesson41Props> = ({ onNext }) => {
  const [varName, setVarName] = useState('');
  const [created, setCreated] = useState(false);
  const [val, setVal] = useState(0);

  return (
    <div className="space-y-8">
      <ClayCard>
        <div className="max-w-2xl mx-auto text-center mb-10">
          <h2 className="text-4xl font-black mb-4 text-orange-400">Lesson 4.1: The Labeled Box</h2>
          <p className="text-slate-300 text-lg">
            In coding, a <strong>Variable</strong> is like a box where we store a piece of information. 
            To use it, we first have to give it a name!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="bg-slate-900/60 p-6 rounded-[2rem] border-2 border-slate-700">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-4">Step 1: Create it</h3>
              {!created ? (
                <div className="space-y-4">
                  <p className="text-sm text-slate-400">Type a name for your new variable:</p>
                  <input 
                    type="text" 
                    placeholder="e.g. Apples, Score, Lives"
                    className="w-full bg-slate-800 border-2 border-slate-700 rounded-xl px-4 py-3 text-white focus:border-orange-500 outline-none transition-all"
                    value={varName}
                    onChange={(e) => setVarName(e.target.value)}
                  />
                  <ClayButton 
                    onClick={() => varName && setCreated(true)} 
                    color="orange" 
                    className="w-full"
                    disabled={!varName}
                  >
                    Make a Variable
                  </ClayButton>
                </div>
              ) : (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                  <ScratchBlock type="variable">set [{varName}] to [0]</ScratchBlock>
                  <p className="text-sm text-green-400">✨ You created the <strong>{varName}</strong> variable!</p>
                  <ClayButton onClick={() => {setCreated(false); setVarName(''); setVal(0);}} color="slate" size="sm">
                    Reset
                  </ClayButton>
                </div>
              )}
            </div>

            <div className={`bg-slate-900/60 p-6 rounded-[2rem] border-2 border-slate-700 transition-opacity ${!created ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-4">Step 2: Change it</h3>
              <div className="flex flex-col gap-3">
                <ScratchBlock type="variable">change [{varName}] by [1]</ScratchBlock>
                <ClayButton onClick={() => setVal(v => v + 1)} color="green" size="sm">Click to run block</ClayButton>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center p-12 bg-slate-800/40 rounded-[3rem] border-4 border-dashed border-slate-700 relative min-h-[300px]">
            {created ? (
              <div className="animate-in zoom-in duration-500">
                <VariableBox label={varName} value={val} color="orange" />
                <div className="mt-4 text-center">
                  <p className="text-xs text-slate-500 italic">This is how your variable looks in the game's memory!</p>
                </div>
              </div>
            ) : (
              <div className="text-center text-slate-600">
                <div className="text-6xl mb-4">📭</div>
                <p className="font-bold">No variable created yet...</p>
              </div>
            )}
          </div>
        </div>
      </ClayCard>

      <div className="flex justify-center">
        <ClayButton onClick={onNext} color="blue" size="lg" disabled={!created}>
          Next: Timers & Logic
        </ClayButton>
      </div>
    </div>
  );
};

export default Lesson41;
