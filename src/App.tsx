/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Trash2, 
  Play, 
  PhoneForwarded, 
  Eye, 
  EyeOff, 
  MessageSquare, 
  CheckCircle2, 
  Timer, 
  RotateCcw,
  X,
  Volume2
} from 'lucide-react';
import { CATEGORIES, Category, GameEntry } from './constants';

type GameState = 'LOBBY' | 'PASSING' | 'REVEALING' | 'DISCUSSION' | 'VOTING' | 'RESULTS';

interface Player {
  id: string;
  name: string;
  isImposter: boolean;
  isOut: boolean;
  votes: number;
}

export default function App() {
  const [gameState, setGameState] = useState<GameState>('LOBBY');
  const [players, setPlayers] = useState<Player[]>([]);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(CATEGORIES[0]);
  const [currentEntry, setCurrentEntry] = useState<GameEntry | null>(null);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [showSecret, setShowSecret] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [winner, setWinner] = useState<'INNOCENTS' | 'IMPOSTER' | null>(null);
  const [caughtImposter, setCaughtImposter] = useState(false);
  const [imposterCount, setImposterCount] = useState(1);

  // Sound placeholders (could be added later)
  const playSfx = () => {};

  // Lobby Handlers
  const addPlayer = () => {
    const trimmed = newPlayerName.trim();
    if (trimmed && players.length < 12) {
      setPlayers([...players, { 
        id: Math.random().toString(36).substr(2, 9), 
        name: trimmed, 
        isImposter: false, 
        isOut: false,
        votes: 0 
      }]);
      setNewPlayerName('');
      playSfx();
    }
  };

  const removePlayer = (id: string) => {
    setPlayers(players.filter(p => p.id !== id));
  };

  const startGame = () => {
    if (players.length < 3 || !selectedCategory) return;

    // Pick a random entry from category
    const randomEntry = selectedCategory.entries[Math.floor(Math.random() * selectedCategory.entries.length)];
    setCurrentEntry(randomEntry);

    // Pick imposters
    const playerIndices = Array.from({ length: players.length }, (_, i) => i);
    const shuffled = [...playerIndices].sort(() => Math.random() - 0.5);
    const imposterIndices = shuffled.slice(0, Math.min(imposterCount, players.length - 1));

    const updatedPlayers = players.map((p, idx) => ({
      ...p,
      isImposter: imposterIndices.includes(idx),
      isOut: false,
      votes: 0
    }));

    setPlayers(updatedPlayers);
    setCurrentPlayerIndex(0);
    setGameState('PASSING');
    setWinner(null);
    setCaughtImposter(false);
  };

  const resetGame = () => {
    setGameState('LOBBY');
    setPlayers([]);
    setCurrentEntry(null);
    setCurrentPlayerIndex(0);
    setShowSecret(false);
    setTimeLeft(60);
    setIsTimerRunning(false);
    setWinner(null);
  };

  // Turn management
  const handleNextPlayer = () => {
    setShowSecret(false);
    if (currentPlayerIndex < players.length - 1) {
      setCurrentPlayerIndex(prev => prev + 1);
      setGameState('PASSING');
    } else {
      setGameState('DISCUSSION');
      setIsTimerRunning(true);
      setTimeLeft(60);
    }
  };

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft]);

  // Voting logic
  const handleVote = (targetId: string) => {
    const votedPlayer = players.find(p => p.id === targetId);
    if (!votedPlayer) return;

    if (votedPlayer.isImposter) {
      setCaughtImposter(true);
      setWinner('INNOCENTS');
    } else {
      setCaughtImposter(false);
      setWinner('IMPOSTER');
    }
    setGameState('RESULTS');
  };

  // Renderers - Deleted old functions as logic is now inline or updated in bento grid structure

  return (
    <div className="min-h-screen bg-indigo-950 text-slate-50 p-4 md:p-8 font-sans flex flex-col selection:bg-rose-500/30">
      {/* Header */}
      <header className="max-w-7xl w-full mx-auto flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-rose-500 rounded-lg flex items-center justify-center font-bold text-xl shadow-lg">?</div>
          <h1 className="text-3xl font-black tracking-tighter uppercase italic">Imposter's Echo</h1>
        </div>
        {gameState !== 'LOBBY' && (
          <button 
            onClick={resetGame}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-full text-[10px] font-bold uppercase tracking-widest transition-colors"
          >
            Reset Game
          </button>
        )}
      </header>

      <main className="max-w-7xl w-full mx-auto flex-grow flex items-center justify-center">
        <AnimatePresence mode="wait">
          {/* LOBBY STATE - Bento Grid */}
          {gameState === 'LOBBY' && (
            <motion.div 
              key="lobby"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-12 auto-rows-min gap-4 w-full h-full"
            >
              {/* Left: Player Management */}
              <div className="col-span-12 lg:col-span-4 row-span-6 bg-slate-900/50 border border-slate-800 rounded-3xl p-6 flex flex-col shadow-inner min-h-[400px]">
                <h2 className="text-sm font-bold uppercase text-indigo-400 mb-4 tracking-widest flex items-center gap-2">
                  <Users size={16} /> Players ({players.length}/12)
                </h2>
                <div className="flex gap-2 mb-6">
                  <input 
                    type="text"
                    value={newPlayerName}
                    onChange={(e) => setNewPlayerName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addPlayer()}
                    placeholder="Enter name..."
                    className="flex-grow bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-rose-500 transition-colors"
                  />
                  <button 
                    onClick={addPlayer}
                    disabled={players.length >= 12}
                    className="bg-rose-500 hover:bg-rose-400 disabled:opacity-50 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-2xl transition-all"
                  >
                    +
                  </button>
                </div>
                <div className="space-y-2 overflow-y-auto max-h-[300px] pr-2 custom-scrollbar">
                  {players.map((p) => (
                    <div key={p.id} className="flex items-center justify-between bg-slate-800/40 p-3 rounded-xl border border-slate-700/50">
                      <span className="font-medium">{p.name}</span>
                      <button onClick={() => removePlayer(p.id)} className="text-slate-500 hover:text-rose-400">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                  {players.length === 0 && (
                    <p className="text-center py-8 text-slate-600 italic text-sm">Add at least 3 players</p>
                  )}
                </div>
                <div className="mt-auto pt-6">
                  <div className="p-4 bg-indigo-900/30 rounded-2xl border border-indigo-500/20">
                    <p className="text-xs text-indigo-300 leading-relaxed">
                      <span className="font-bold">Rules:</span> Innocents get the Word. Imposter gets a Hint. Guess the mole before the timer ends.
                    </p>
                  </div>
                </div>
              </div>

              {/* Center: Category Selection */}
              <div className="col-span-12 lg:col-span-5 row-span-4 bg-slate-900/50 border border-slate-800 rounded-3xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-sm font-bold uppercase text-indigo-400 tracking-widest">Categories</h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat)}
                      className={`h-28 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all border-2 ${
                        selectedCategory?.id === cat.id 
                        ? 'bg-rose-500/10 border-rose-500' 
                        : 'bg-slate-800/40 border-transparent hover:border-slate-600'
                      }`}
                    >
                      <span className="text-2xl">{cat.name.split(' ')[0]}</span>
                      <span className="font-bold uppercase tracking-tight text-xs">{cat.name.split(' ').slice(1).join(' ')}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Top: Game Settings (Visual only for now) */}
              <div className="col-span-12 lg:col-span-3 row-span-3 bg-slate-900/50 border border-slate-800 rounded-3xl p-6 flex flex-col gap-4">
                <h2 className="text-sm font-bold uppercase text-indigo-400 tracking-widest">Game Settings</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Rounds</label>
                    <div className="flex gap-2 mt-1">
                      <button className="flex-grow py-2 bg-indigo-600 rounded-lg text-sm font-bold">1</button>
                      <button className="flex-grow py-2 bg-slate-800 rounded-lg text-sm font-bold cursor-not-allowed opacity-50">3</button>
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Imposters</label>
                    <div className="flex gap-2 mt-1">
                      {[1, 2, 3].map(count => (
                        <button 
                          key={count}
                          onClick={() => setImposterCount(count)}
                          disabled={count >= players.length && players.length > 0}
                          className={`flex-grow py-2 rounded-lg text-sm font-bold uppercase transition-colors ${
                            imposterCount === count 
                            ? 'bg-rose-500 text-white' 
                            : 'bg-slate-800 text-slate-400 hover:bg-slate-700 disabled:opacity-30'
                          }`}
                        >
                          {count}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Center: Start Button Area */}
              <div className="col-span-12 lg:col-span-5 row-span-2 bg-indigo-600 rounded-3xl p-4 flex items-center justify-center shadow-xl shadow-indigo-900/20 hover:bg-indigo-500 transition-colors group cursor-pointer" onClick={startGame}>
                <button 
                  className="w-full h-full text-4xl font-black uppercase tracking-widest italic"
                >
                  Start Game
                  <span className="block text-[10px] font-normal not-italic tracking-normal mt-1 opacity-80 uppercase">Ready to catch the mole?</span>
                </button>
              </div>

              {/* Right Bottom: Status */}
              <div className={`col-span-12 lg:col-span-3 row-span-3 rounded-3xl p-6 flex flex-col items-center justify-center text-center shadow-xl transition-all ${
                players.length >= 3 ? 'bg-emerald-600 shadow-emerald-950/20' : 'bg-rose-500 shadow-rose-950/20'
              }`}>
                <div className="text-4xl mb-2">{players.length >= 3 ? '✅' : '📱'}</div>
                <h3 className="text-xl font-black uppercase leading-none">
                  {players.length >= 3 ? 'Ready to Go' : 'Pass the Phone'}
                </h3>
                <p className="text-xs mt-3 font-medium opacity-90">
                  {players.length >= 3 
                    ? "Everyone is here. Let the game begin!" 
                    : `Gather at least 3 players to begin the deception.`}
                </p>
              </div>
            </motion.div>
          )}

          {/* OTHER STATES - Styled individually but matching bento cards */}
          {gameState === 'PASSING' && (
            <motion.div 
              key="passing"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-slate-900/80 border border-slate-800 p-12 rounded-[3rem] text-center space-y-8 max-w-sm w-full shadow-2xl"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-rose-500/20 blur-3xl rounded-full" />
                <PhoneForwarded size={84} className="mx-auto text-rose-500 relative animate-bounce" />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-bold text-indigo-300 uppercase tracking-widest">Next Player</h2>
                <div className="text-5xl font-black text-white px-4 py-2 bg-slate-950 rounded-2xl border border-slate-800 italic uppercase">
                  {players[currentPlayerIndex].name}
                </div>
              </div>
              <button
                onClick={() => setGameState('REVEALING')}
                className="w-full bg-rose-500 hover:bg-rose-400 text-white font-black py-4 rounded-2xl text-lg shadow-xl transition-all uppercase tracking-widest"
              >
                Reveal Card
              </button>
            </motion.div>
          )}

          {gameState === 'REVEALING' && (
            <motion.div 
              key="revealing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-slate-900/80 border border-slate-800 p-8 rounded-[3rem] text-center space-y-8 max-w-sm w-full shadow-2xl"
            >
              <div className="space-y-1">
                <p className="text-slate-500 uppercase tracking-widest font-bold text-[10px]">Your Secret Role</p>
                <h2 className="text-3xl font-black text-white italic">{players[currentPlayerIndex].name}</h2>
              </div>

              <div className="relative aspect-square w-full">
                <motion.div 
                  animate={{ rotateY: showSecret ? 180 : 0 }}
                  transition={{ duration: 0.6, type: "spring" }}
                  style={{ transformStyle: 'preserve-3d' }}
                  className="w-full h-full cursor-pointer relative"
                  onClick={() => setShowSecret(!showSecret)}
                >
                  <div className="absolute inset-0 bg-slate-950 border-2 border-slate-800 rounded-[2.5rem] flex flex-col items-center justify-center space-y-4 backface-hidden shadow-inner">
                    <Eye size={64} className="text-slate-700" />
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Tap to peek</p>
                  </div>
                  
                  <div 
                    className={`absolute inset-0 border-4 rounded-[2.5rem] flex flex-col items-center justify-center p-8 space-y-4 shadow-2xl ${
                      players[currentPlayerIndex].isImposter ? 'bg-rose-600 border-rose-400' : 'bg-indigo-600 border-indigo-400'
                    }`}
                    style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
                  >
                    {players[currentPlayerIndex].isImposter ? (
                      <>
                        <h3 className="text-rose-200 font-black uppercase tracking-tighter text-xl">IMPOSTER</h3>
                        <div className="bg-rose-700/50 p-4 rounded-xl w-full border border-rose-400/30">
                          <p className="text-[10px] text-rose-200 uppercase font-black mb-1 opacity-70">Hint:</p>
                          <p className="text-xl font-black text-white">{currentEntry?.hint}</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <h3 className="text-indigo-200 font-black uppercase tracking-tighter text-xl">INNOCENT</h3>
                        <div className="bg-indigo-700/50 p-4 rounded-xl w-full border border-indigo-400/30">
                          <p className="text-[10px] text-indigo-200 uppercase font-black mb-1 opacity-70">Word:</p>
                          <p className="text-3xl font-black text-white italic">{currentEntry?.word}</p>
                        </div>
                      </>
                    )}
                  </div>
                </motion.div>
              </div>

              <AnimatePresence>
                {showSecret && (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={handleNextPlayer}
                    className="w-full bg-slate-50 text-indigo-950 font-black py-4 rounded-2xl text-lg shadow-xl hover:bg-white transition-colors uppercase tracking-widest"
                  >
                    OK, Pass it!
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {gameState === 'DISCUSSION' && (
            <motion.div 
              key="discussion"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-slate-900/80 border border-slate-800 p-12 rounded-[3rem] text-center space-y-8 max-w-sm w-full shadow-2xl"
            >
              <div className="space-y-2">
                <MessageSquare size={48} className="mx-auto text-indigo-400" />
                <h2 className="text-4xl font-black text-white uppercase italic">Talk Time</h2>
                <p className="text-slate-400 text-sm">Question everything!</p>
              </div>

              <div className="flex flex-col items-center justify-center space-y-4">
                <div className={`text-7xl font-black font-mono tracking-tighter transition-colors ${timeLeft < 10 ? 'text-rose-500 animate-pulse' : 'text-white'}`}>
                  {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                    className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-xl border border-slate-700 text-xs font-bold uppercase"
                  >
                    {isTimerRunning ? 'Pause' : 'Resume'}
                  </button>
                  <button 
                    onClick={() => setTimeLeft(60)}
                    className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-xl border border-slate-700"
                  >
                    <RotateCcw size={16} />
                  </button>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsTimerRunning(false);
                  setGameState('VOTING');
                }}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-4 rounded-2xl text-xl shadow-lg uppercase tracking-widest"
              >
                Go to Voting
              </button>
            </motion.div>
          )}

          {gameState === 'VOTING' && (
            <motion.div 
              key="voting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-slate-900/50 border border-slate-800 p-8 rounded-[3rem] max-w-md w-full shadow-2xl"
            >
              <div className="text-center space-y-2 mb-8">
                <h2 className="text-4xl font-black text-white uppercase italic">Vote Out</h2>
                <p className="text-slate-400 text-sm">Who is acting suspicious?</p>
              </div>

              <div className="grid grid-cols-1 gap-2">
                {players.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleVote(p.id)}
                    className="flex items-center justify-between bg-slate-950 border border-slate-800 hover:border-rose-500 hover:bg-slate-900 p-4 rounded-2xl group transition-all"
                  >
                    <span className="text-lg font-bold text-white group-hover:text-rose-400 transition-colors uppercase italic">{p.name}</span>
                    <CheckCircle2 size={20} className="text-slate-800 group-hover:text-rose-500 transition-colors" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {gameState === 'RESULTS' && (
            <motion.div 
              key="results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6 max-w-md w-full"
            >
              <div className={`p-8 rounded-[3rem] border-4 shadow-2xl relative overflow-hidden ${
                winner === 'INNOCENTS' ? 'bg-emerald-600 border-emerald-400' : 'bg-rose-600 border-rose-400'
              }`}>
                <h2 className="text-sm font-bold text-white/70 uppercase tracking-[0.2em] mb-2">Game Over</h2>
                <h1 className="text-6xl font-black text-white italic mb-6 tracking-tighter">
                  {winner === 'INNOCENTS' ? 'INNOCENTS WIN' : 'IMPOSTER WINS'}
                </h1>
                
                <div className="space-y-4">
                  <div className="bg-black/20 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
                    <p className="text-white/60 text-[10px] uppercase font-black mb-1">
                      {players.filter(p => p.isImposter).length > 1 ? 'The Imposters' : 'The Imposter'}
                    </p>
                    <p className="text-3xl font-black text-white uppercase italic">
                      {players.filter(p => p.isImposter).map(p => p.name).join(', ')}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1 bg-black/20 p-3 rounded-xl backdrop-blur-sm border border-white/10">
                      <p className="text-white/60 text-[10px] uppercase font-bold">Word</p>
                      <p className="font-black text-white text-sm">{currentEntry?.word}</p>
                    </div>
                    <div className="flex-1 bg-black/20 p-3 rounded-xl backdrop-blur-sm border border-white/10">
                      <p className="text-white/60 text-[10px] uppercase font-bold">Hint</p>
                      <p className="font-black text-white text-sm">{currentEntry?.hint}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={startGame}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-black py-4 rounded-2xl text-lg shadow-lg transition-all uppercase italic"
                >
                  Play Again
                </button>
                <button
                  onClick={resetGame}
                  className="bg-slate-800 hover:bg-slate-700 text-white font-black py-4 rounded-2xl text-lg border border-slate-700 shadow-lg transition-all uppercase italic"
                >
                  Main Menu
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Global background glow */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-indigo-500/10 blur-[160px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-rose-500/10 blur-[140px] rounded-full" />
      </div>

      <style>{`
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1e293b;
          border-radius: 10px;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
