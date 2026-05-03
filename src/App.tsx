/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Gamepad2, 
  Eye, 
  EyeOff, 
  RefreshCcw, 
  ChevronRight, 
  Trophy, 
  Info,
  UserCircle2,
  AlertCircle,
  Plus,
  X
} from 'lucide-react';

// --- Types ---

enum GameState {
  SETUP = 'setup',
  REVEAL = 'reveal',
  PLAYING = 'playing',
  VOTING = 'voting',
  RESULTS = 'results'
}

interface Player {
  id: number;
  name: string;
  role: 'innocent' | 'imposter';
  hasSeenRole: boolean;
}

interface GameData {
  word: string;
  hint: string;
  category: string;
}

// --- Nepali Cultural Data ---

const NEPALI_PROMPTS: GameData[] = [
  { word: "Momo", hint: "A beloved Nepali snack often served with chutney.", category: "Khana (Food)" },
  { word: "Dhaka Topi", hint: "A traditional Nepali headgear worn with pride.", category: "Poshak (Clothing)" },
  { word: "Mt. Everest", hint: "A world-famous landmark that defines Nepal.", category: "Bhugol (Geography)" },
  { word: "Khukuri", hint: "A traditional knife used by brave Gurkhas.", category: "Auzar (Tool/Weapon)" },
  { word: "Dashain", hint: "The biggest Hindu festival celebrated in Nepal.", category: "Chad (Festival)" },
  { word: "Dal Bhat", hint: "The staple meal consumed twice a day in every household.", category: "Khana (Food)" },
  { word: "Madal", hint: "A double-headed drum used in folk music.", category: "Baja (Instrument)" },
  { word: "Pashupatinath", hint: "A sacred religious site in Kathmandu.", category: "Dharma (Religion)" },
  { word: "Gundruk", hint: "Fermented leafy greens, a unique Nepali delicacy.", category: "Khana (Food)" },
  { word: "Tihar", hint: "The festival of lights, flowers, and brothers.", category: "Chad (Festival)" },
  { word: "Ason Market", hint: "A busy, historic bazaar in central Kathmandu.", category: "Thau (Place)" },
  { word: "Ratnapark Taxi Queue", hint: "A common scenario of waiting for transport.", category: "Anubhavi (Scenario)" },
  { word: "Microbus", hint: "A crowded but essential transport mode in the city.", category: "Yatayat (Transport)" },
  { word: "Swayambhunath", hint: "The Monkey Temple, overlooking the valley.", category: "Dharma (Religion)" },
  { word: "Bargaining", hint: "A common skill used when shopping in local markets.", category: "Parampara (Tradition)" },
  { word: "Lhosar", hint: "The New Year festival for various ethnic groups.", category: "Chad (Festival)" },
  { word: "Yarchagumba", hint: "A valuable Himalayan herb.", category: "Jadibuti (Nature)" },
];

// --- Components ---

export default function App() {
  const [gameState, setGameState] = useState<GameState>(GameState.SETUP);
  const [playerNames, setPlayerNames] = useState<string[]>([]);
  const [newName, setNewName] = useState('');
  const [imposterCount, setImposterCount] = useState(1);
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentGameData, setCurrentGameData] = useState<GameData | null>(null);
  const [revealIndex, setRevealIndex] = useState(0);
  const [isRevealing, setIsRevealing] = useState(false);

  // Initialize game
  const startGame = () => {
    if (playerNames.length < 3) return;

    const randomPrompt = NEPALI_PROMPTS[Math.floor(Math.random() * NEPALI_PROMPTS.length)];
    setCurrentGameData(randomPrompt);

    const newPlayers: Player[] = [];
    const roles: ('innocent' | 'imposter')[] = [];
    
    // Fill roles
    for (let i = 0; i < imposterCount; i++) roles.push('imposter');
    for (let i = 0; i < playerNames.length - imposterCount; i++) roles.push('innocent');
    
    // Shuffle roles
    roles.sort(() => Math.random() - 0.5);

    for (let i = 0; i < playerNames.length; i++) {
      newPlayers.push({
        id: i,
        name: playerNames[i],
        role: roles[i],
        hasSeenRole: false,
      });
    }

    setPlayers(newPlayers);
    setRevealIndex(0);
    setIsRevealing(false);
    setGameState(GameState.REVEAL);
  };

  const addPlayer = () => {
    if (newName.trim() && playerNames.length < 12) {
      if (!playerNames.includes(newName.trim())) {
        setPlayerNames([...playerNames, newName.trim()]);
        setNewName('');
      }
    }
  };

  const removePlayer = (name: string) => {
    const updated = playerNames.filter(n => n !== name);
    setPlayerNames(updated);
    // Adjust imposter count if it exceeds half
    if (imposterCount > Math.floor(updated.length / 2)) {
      setImposterCount(Math.max(1, Math.floor(updated.length / 2)));
    }
  };

  const nextReveal = () => {
    if (revealIndex < players.length - 1) {
      setRevealIndex(prev => prev + 1);
      setIsRevealing(false);
    } else {
      setGameState(GameState.PLAYING);
    }
  };

  const resetGame = () => {
    setGameState(GameState.SETUP);
    setPlayers([]);
    setCurrentGameData(null);
  };

  // --- Screens ---

  const SetupScreen = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-6 p-4 md:p-8 max-w-4xl mx-auto min-h-full justify-center py-10"
    >
      <div className="text-center space-y-4 md:space-y-6 mb-4 md:mb-8">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-natural-accent rounded-full flex items-center justify-center text-white font-bold text-3xl md:text-4xl mx-auto shadow-2xl">छ</div>
        <div>
          <h1 className="text-5xl md:text-8xl font-black text-natural-heading tracking-tighter leading-none">
            CHHAL <span className="text-natural-accent font-serif font-normal text-4xl md:text-7xl">छल</span>
          </h1>
          <p className="text-natural-muted font-sans font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] text-[9px] md:text-sm mt-3 md:mt-4">Hamro Imposter: Nepali Edition</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
        <div className="bg-white/60 p-6 md:p-8 rounded-[32px] md:rounded-[40px] border border-natural-border shadow-2xl backdrop-blur-md space-y-6 md:space-y-8">
          <div className="space-y-4">
            <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-natural-muted">
              <Users size={14} /> Add Players ({playerNames.length}/12)
            </label>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Enter villager name..."
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addPlayer();
                  }
                }}
                className="flex-1 px-4 py-3 bg-white border border-natural-border rounded-xl focus:ring-2 focus:ring-natural-accent/50 outline-none text-sm transition-shadow shadow-sm"
              />
              <button 
                type="button"
                onClick={addPlayer}
                className="p-3 bg-natural-heading text-white rounded-xl hover:bg-black transition-all active:scale-95 shadow-lg"
              >
                <Plus size={20} />
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2 pt-2 min-h-12 content-start">
              <AnimatePresence>
                {playerNames.map(name => (
                  <motion.span 
                    key={name}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="px-4 py-2 bg-white border border-natural-border rounded-full text-xs font-bold text-natural-heading flex items-center gap-2 shadow-sm"
                  >
                    {name}
                    <button type="button" onClick={() => removePlayer(name)} className="text-natural-muted hover:text-natural-accent transition-colors">
                      <X size={14} />
                    </button>
                  </motion.span>
                ))}
              </AnimatePresence>
              {playerNames.length === 0 && <p className="text-xs italic text-natural-muted opacity-60">Add at least 3 players to begin the shabha...</p>}
            </div>
          </div>

          <div className="space-y-4 pt-6 border-t border-natural-border/50">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-natural-muted">
                <AlertCircle size={14} /> Total Imposters
              </label>
              <span className="text-2xl font-serif font-bold text-natural-accent">{imposterCount}</span>
            </div>
            <input 
              type="range" min="1" max={Math.max(1, Math.floor(playerNames.length / 2))} value={imposterCount}
              disabled={playerNames.length < 3}
              onChange={(e) => setImposterCount(parseInt(e.target.value))}
              className="w-full h-1.5 bg-natural-border rounded-lg appearance-none cursor-pointer accent-natural-accent disabled:opacity-30 transition-opacity"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-natural-secondary p-8 rounded-[40px] text-white shadow-xl flex gap-5 items-start">
            <Info className="opacity-60 shrink-0 mt-1" size={24} />
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-widest opacity-60">The Keeper's Tip</p>
              <p className="text-sm leading-relaxed italic opacity-95">
                "Words are like grains of rice—measure them carefully. Too much, and you feed the outsider; too little, and the villagers go hungry."
              </p>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <button 
              type="button"
              id="start-game-btn"
              disabled={playerNames.length < 3}
              onClick={startGame}
              className="w-full py-6 bg-natural-heading text-white font-black rounded-3xl shadow-[0_20px_50px_-10px_rgba(45,31,22,0.4)] hover:bg-black transition-all flex items-center justify-center gap-4 text-xl disabled:opacity-50 disabled:grayscale transform-gpu active:scale-[0.98]"
            >
              <Gamepad2 size={24} />
              Saru Garaun ({playerNames.length} Players)
            </button>
            {playerNames.length < 3 && (
              <p className="text-xs text-center text-natural-accent font-black uppercase tracking-[0.2em] animate-pulse">Minimum 3 villagers required</p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );

  const RevealScreen = () => {
    const currentPlayer = players[revealIndex];
    
    return (
      <motion.div 
        key={`reveal-${revealIndex}`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.1 }}
        className="flex flex-col items-center justify-center min-h-full p-6 md:p-8 text-center max-w-md mx-auto py-12 md:py-20"
      >
        {!isRevealing ? (
          <div className="bg-white rounded-[40px] border border-natural-border shadow-2xl p-12 w-full space-y-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-natural-accent" />
            <div className="w-24 h-24 bg-natural-bg rounded-full flex items-center justify-center mx-auto text-natural-accent border border-natural-border shadow-inner">
              <UserCircle2 size={56} strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="text-5xl font-serif font-bold text-natural-heading">{currentPlayer.name}</h2>
              <p className="text-natural-muted font-sans font-bold uppercase tracking-widest text-[10px] mt-2 italic">Tap to reveal the truth</p>
            </div>
            <button 
              id="reveal-btn"
              onClick={() => setIsRevealing(true)}
              className="w-full py-5 bg-natural-heading text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-xl"
            >
              <Eye size={20} /> Reveal Role
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-[40px] shadow-2xl border border-natural-border p-12 w-full space-y-10 relative">
            <div className="absolute top-8 left-1/2 -translate-x-1/2 px-6 py-2 bg-natural-bg border border-natural-border rounded-full">
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] font-black text-natural-muted">Your Identity</span>
            </div>
            
            <div className="pt-8">
              <h2 className={`text-6xl font-black mb-4 ${currentPlayer.role === 'innocent' ? 'text-natural-heading' : 'text-natural-accent'}`}>
                {currentPlayer.role === 'innocent' ? 'Innocent' : 'Imposter'}
              </h2>
              <p className="text-natural-muted leading-relaxed italic max-w-xs mx-auto">
                {currentPlayer.role === 'innocent' 
                  ? 'You belong to the village. Use your words to find the outsider.'
                  : 'You are the outsider. Listen carefully and blend in.'}
              </p>
            </div>

            <div className="py-12 px-8 bg-natural-bg rounded-[32px] border-2 border-dashed border-natural-accent/40">
              <p className="text-[10px] uppercase font-black tracking-widest text-natural-accent mb-3">
                {currentPlayer.role === 'innocent' ? 'The Secret Word' : 'The Secret Hint'}
              </p>
              <p className="text-5xl font-serif font-bold tracking-tighter text-natural-heading leading-tight">
                {currentPlayer.role === 'innocent' ? currentGameData?.word : currentGameData?.hint}
              </p>
              {currentPlayer.role === 'innocent' && (
                <p className="mt-4 text-natural-muted font-sans font-bold uppercase tracking-widest text-[10px] opacity-60">Category: {currentGameData?.category}</p>
              )}
            </div>

            <button 
              id="confirm-reveal-btn"
              onClick={nextReveal}
              className="w-full py-5 bg-natural-accent text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-natural-accent/20"
            >
              <EyeOff size={20} /> I've Seen It
            </button>
          </div>
        )}
      </motion.div>
    );
  };

  const PlayingScreen = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col p-4 md:p-8 min-h-full max-w-6xl mx-auto pb-20"
    >
      <header className="flex justify-between items-end mb-8 md:mb-12 pb-6 md:pb-8 border-b border-natural-border flex-wrap gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-natural-accent rounded-full flex items-center justify-center text-white text-base md:text-lg font-bold shadow-lg">छ</div>
            <p className="text-[9px] md:text-[11px] font-sans font-black uppercase tracking-[0.2em] md:tracking-[0.4em] text-natural-muted">Active Discussion</p>
          </div>
          <h2 className="text-4xl md:text-7xl font-serif font-bold text-natural-heading tracking-tight leading-none">Vocal Testimony</h2>
        </div>
        <div className="flex gap-4">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-[9px] uppercase tracking-widest text-natural-muted font-black">Context Location</span>
            <span className="text-lg md:text-xl font-serif font-bold text-natural-heading">Patan Durbar Square</span>
          </div>
          <button 
            type="button"
            onClick={resetGame} 
            className="p-3 md:p-5 bg-white border border-natural-border rounded-2xl md:rounded-3xl text-natural-muted shadow-sm hover:text-natural-accent hover:border-natural-accent transition-all active:scale-95"
          >
            <RefreshCcw size={18} />
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        <div className="lg:col-span-4 space-y-6 md:space-y-8 flex flex-col">
          <div className="bg-white rounded-[32px] md:rounded-[48px] p-8 md:p-12 shadow-[0_30px_60px_-15px_rgba(45,31,22,0.1)] border border-natural-border relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 md:w-48 md:h-48 bg-natural-accent opacity-[0.04] rounded-full -mr-16 -mt-16 md:-mr-24 md:-mt-24 group-hover:scale-125 transition-transform duration-1000" />
            <p className="text-[10px] md:text-[11px] font-sans font-black uppercase tracking-[0.4em] text-natural-muted mb-2 md:mb-4 opacity-60">Thematic Category</p>
            <p className="text-4xl md:text-6xl font-serif font-bold text-natural-heading tracking-tighter leading-tight">{currentGameData?.category}</p>
            <div className="mt-8 md:mt-12 pt-6 md:pt-10 border-t border-natural-border flex items-center justify-between">
              <div className="flex -space-x-3 md:-space-x-4">
                {players.slice(0, 5).map((_, i) => (
                  <div key={i} className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 md:border-4 border-white bg-natural-bg shadow-md" />
                ))}
              </div>
              <span className="text-[10px] md:text-[11px] font-black text-natural-muted uppercase tracking-[0.2em]">{players.length} Active Voices</span>
            </div>
          </div>

          <div className="bg-natural-secondary p-8 md:p-10 rounded-[32px] md:rounded-[48px] text-natural-bg shadow-xl border border-white/5 relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-24 h-24 md:w-32 md:h-32 bg-white/5 rounded-full -ml-12 -mb-12 md:-ml-16 md:-mb-16" />
            <h3 className="text-[9px] md:text-[10px] uppercase font-black tracking-widest mb-4 md:mb-6 opacity-60">The Speaker's Oath</h3>
            <p className="italic text-xl md:text-2xl font-serif leading-relaxed opacity-95">"Describe with shadows, for the light reveals all. Speak of the spice, but hide the leaf. Speak of the god, but hide the temple."</p>
          </div>
        </div>

        <div className="lg:col-span-8 flex flex-col gap-8">
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-4 px-4 md:px-10">
              <h3 className="text-[10px] md:text-[11px] font-black text-natural-muted uppercase tracking-[0.3em] md:tracking-[0.5em]">Witness Sequence</h3>
              <div className="px-3 md:px-5 py-1 md:py-2 bg-natural-accent/10 rounded-full border border-natural-accent/10">
                <span className="text-[9px] md:text-[11px] text-natural-accent font-black uppercase tracking-widest leading-none">Shabha</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
              {players.map((p, idx) => (
                <motion.div 
                  key={p.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center gap-4 md:gap-8 p-4 md:p-8 bg-white/40 hover:bg-white rounded-[24px] md:rounded-[40px] border border-transparent hover:border-natural-border transition-all group shadow-sm hover:shadow-xl"
                >
                  <span className="w-10 h-10 md:w-16 md:h-16 shrink-0 rounded-full bg-natural-border/40 text-natural-muted flex items-center justify-center text-xs md:text-sm font-black font-sans group-hover:bg-natural-heading group-hover:text-white transition-all duration-700 shadow-inner group-hover:scale-110">
                    {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                  </span>
                  <div className="flex-1 flex items-center justify-between">
                    <div className="space-y-0.5">
                      <span className="font-black text-xl md:text-3xl text-natural-heading tracking-tighter leading-none">{p.name}</span>
                      <p className="text-[9px] md:text-[11px] text-natural-muted font-sans font-black uppercase tracking-[0.2em] opacity-60">Verified</p>
                    </div>
                    <ChevronRight className="text-natural-border group-hover:text-natural-heading group-hover:translate-x-1 md:group-hover:translate-x-2 transition-all" size={20} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-natural-border">
            <button 
              type="button"
              id="go-to-voting-btn"
              onClick={() => setGameState(GameState.VOTING)}
              className="w-full py-6 md:py-8 bg-natural-heading text-natural-bg font-black rounded-[24px] md:rounded-[40px] flex items-center justify-center gap-4 md:gap-6 text-xl md:text-2xl shadow-2xl hover:bg-black hover:scale-[1.01] transition-all"
            >
              Start Vote <ChevronRight size={28} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const VotingScreen = () => (
    <motion.div 
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="flex flex-col p-6 md:p-8 min-h-full max-w-md mx-auto justify-center text-center space-y-12 py-12"
    >
      <div className="space-y-6">
        <div className="w-24 h-24 bg-natural-accent/10 rounded-full flex items-center justify-center mx-auto text-natural-accent border border-natural-accent/20 scale-110">
          <AlertCircle size={48} strokeWidth={1.5} />
        </div>
        <div className="space-y-2">
          <h2 className="text-6xl font-black text-natural-heading tracking-tight leading-none">Who is छल?</h2>
          <p className="text-natural-muted italic leading-relaxed text-lg">Discuss among the villagers. When a decision is reached, reveal the imposters.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <button 
          id="reveal-results-btn"
          onClick={() => setGameState(GameState.RESULTS)}
          className="w-full py-6 bg-natural-accent text-white font-black text-xl rounded-3xl shadow-3xl active:scale-95 transition-transform"
        >
          Reveal Real Identities
        </button>
        <button 
          onClick={resetGame}
          className="w-full py-4 text-natural-muted font-bold text-sm hover:text-natural-heading transition-colors"
        >
          Cancal & Exit Session
        </button>
      </div>
    </motion.div>
  );

  const ResultsScreen = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col p-6 md:p-8 min-h-full max-w-md mx-auto py-10 md:py-12"
    >
      <div className="text-center mb-10 py-10 bg-white rounded-[40px] border border-natural-border shadow-xl space-y-4">
        <Trophy className="mx-auto text-natural-accent" size={64} strokeWidth={1} />
        <div>
          <h2 className="text-5xl font-serif font-bold text-natural-heading">Session Closed</h2>
          <div className="mt-6 inline-block py-3 px-8 bg-natural-bg rounded-2xl border border-natural-border">
            <p className="text-[10px] font-black uppercase tracking-widest text-natural-accent mb-1">The Word Was</p>
            <p className="text-3xl font-black text-natural-heading">{currentGameData?.word}</p>
          </div>
        </div>
      </div>

      <div className="space-y-3 flex-1 overflow-y-auto scrollbar-hide">
        <h3 className="text-[10px] font-black text-natural-muted uppercase tracking-[0.2em] mb-3 px-2">Final Standings</h3>
        {players.map((p) => (
          <div key={p.id} className={`flex items-center justify-between p-5 rounded-3xl border transition-all ${p.role === 'imposter' ? 'bg-white border-natural-accent/40 shadow-lg shadow-natural-accent/5' : 'bg-white/40 border-natural-border'}`}>
            <div className="flex items-center gap-4">
              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black font-sans ${p.role === 'imposter' ? 'bg-natural-accent text-white' : 'bg-natural-border text-natural-muted'}`}>
                {p.id + 1}
              </span>
              <div>
                <span className="font-black text-lg block leading-none">{p.name}</span>
                <span className={`text-[10px] font-bold uppercase tracking-widest mt-1 block ${p.role === 'imposter' ? 'text-natural-accent' : 'text-natural-muted opacity-60'}`}>
                  {p.role === 'imposter' ? 'Chalaakh (Imposter)' : 'Sajilo (Innocent)'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button 
        id="play-again-btn"
        onClick={resetGame}
        className="mt-8 w-full py-5 bg-natural-heading text-white font-bold rounded-[22px] shadow-2xl flex items-center justify-center gap-3 text-lg"
      >
        <RefreshCcw size={22} /> Pheri Khelaun (Play Again)
      </button>
    </motion.div>
  );

  // --- Layout Wrapper ---

  return (
    <div className="min-h-screen bg-natural-bg text-natural-text font-sans selection:bg-natural-accent/20 flex flex-col relative overflow-x-hidden">
      <main className="flex-1 overflow-x-hidden">
        <AnimatePresence mode="wait">
          {gameState === GameState.SETUP && <SetupScreen key="setup" />}
          {gameState === GameState.REVEAL && <RevealScreen key="reveal" />}
          {gameState === GameState.PLAYING && <PlayingScreen key="playing" />}
          {gameState === GameState.VOTING && <VotingScreen key="voting" />}
          {gameState === GameState.RESULTS && <ResultsScreen key="results" />}
        </AnimatePresence>
      </main>

      {/* Decorative Background Elements */}
      <div className="fixed top-0 right-0 w-64 h-64 bg-natural-accent/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-natural-secondary/5 rounded-full blur-3xl -ml-48 -mb-48 pointer-events-none" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border-[8px] md:border-[32px] border-natural-border/10 pointer-events-none rounded-[32px] md:rounded-[80px]" />
    </div>
  );
}
