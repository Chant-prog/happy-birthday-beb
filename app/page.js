'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function BirthdayApp() {
  const [screen, setScreen] = useState('lock'); // lock | loading | welcome | counter | gallery | letter
  const [passcode, setPasscode] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [passcodeError, setPasscodeError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Set passcode to her birthday: August 15 (0815)
  const CORRECT_PASSCODE = '0815';

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleKeypadPress = (val) => {
    if (passcode.length < 4) {
      const nextCode = passcode + val;
      setPasscode(nextCode);

      if (nextCode.length === 4) {
        if (nextCode === CORRECT_PASSCODE) {
          setTimeout(() => {
            setScreen('loading');
            if (audioRef.current && !isPlaying) {
              audioRef.current.play().catch(() => {});
              setIsPlaying(true);
            }
            setTimeout(() => setScreen('welcome'), 2200);
          }, 300);
        } else {
          setPasscodeError(true);
          setTimeout(() => {
            setPasscode('');
            setPasscodeError(false);
          }, 600);
        }
      }
    }
  };

  const handleClearPasscode = () => setPasscode('');

  const triggerConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff4d6d', '#ff758f', '#ffb3c1', '#ffffff', '#e0115f']
    });
  };

  return (
    <main className="min-h-screen bg-[#070103] text-[#ffe6e8] flex items-center justify-center p-4 font-sans select-none overflow-hidden relative">
      
      {/* Background Audio */}
      <audio ref={audioRef} src="/bg-music.mp3" loop />

      {/* Subtle Ambient Glows */}
      <div className="absolute w-72 h-72 bg-rose-900/20 rounded-full blur-3xl pointer-events-none -top-10 -left-10" />
      <div className="absolute w-72 h-72 bg-red-900/20 rounded-full blur-3xl pointer-events-none -bottom-10 -right-10" />

      {/* Music Toggle Button (Top Right) */}
      <button 
        onClick={toggleMusic}
        className="absolute top-5 right-5 z-50 bg-[#19060a]/80 border border-red-500/30 px-3 py-1.5 rounded-full text-xs flex items-center gap-1.5 backdrop-blur-md hover:border-red-400/60 transition-all active:scale-95 text-red-200"
      >
        <span>{isPlaying ? '🎵' : '🔇'}</span>
        <span className="text-[10px] uppercase tracking-wider">{isPlaying ? 'Music On' : 'Music Off'}</span>
      </button>

      {/* Main Screen Container - Scaled to sleek phone proportion */}
      <div className="w-full max-w-[360px] bg-[#120407]/80 border border-red-900/40 rounded-[32px] p-6 shadow-[0_0_50px_rgba(150,0,30,0.25)] backdrop-blur-xl relative overflow-hidden flex flex-col items-center justify-center min-h-[540px]">

        <AnimatePresence mode="wait">
          
          {/* 1. LOCK SCREEN */}
          {screen === 'lock' && (
            <motion.div 
              key="lock"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full flex flex-col items-center"
            >
              <button 
                onClick={() => setShowHint(true)}
                className="w-14 h-14 rounded-full border-2 border-rose-500/40 overflow-hidden mb-3 hover:scale-105 transition-transform shadow-[0_0_15px_rgba(255,77,109,0.3)]"
              >
                <img src="/passkey-pic.jpg" alt="Hint" className="w-full h-full object-cover" />
              </button>

              <h2 className="text-base font-light tracking-[0.25em] text-red-200 uppercase mb-1">Passcode</h2>
              <p className="text-[10px] text-rose-300/60 mb-6 cursor-pointer hover:text-rose-200 transition-colors" onClick={() => setShowHint(true)}>
                Tap picture for hint ✨
              </p>

              {/* Passcode Indicators */}
              <div className={`flex gap-3 mb-6 ${passcodeError ? 'animate-shake' : ''}`}>
                {[0, 1, 2, 3].map((i) => (
                  <div 
                    key={i}
                    className={`w-3 h-3 rounded-full border border-rose-500/50 transition-all duration-300 ${
                      passcode.length > i ? 'bg-rose-500 shadow-[0_0_10px_#ff4d6d]' : 'bg-transparent'
                    }`}
                  />
                ))}
              </div>

              {/* Minimal Keypad */}
              <div className="grid grid-cols-3 gap-2.5 w-full max-w-[240px]">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <button
                    key={num}
                    onClick={() => handleKeypadPress(num.toString())}
                    className="h-11 rounded-2xl bg-rose-950/20 border border-red-900/30 text-base font-light text-rose-100 hover:bg-rose-900/40 active:scale-95 transition-all flex items-center justify-center"
                  >
                    {num}
                  </button>
                ))}
                <button 
                  onClick={handleClearPasscode}
                  className="h-11 rounded-2xl bg-rose-950/10 border border-red-900/20 text-xs text-rose-400/60 active:scale-95 transition-all flex items-center justify-center"
                >
                  ✕
                </button>
                <button
                  onClick={() => handleKeypadPress('0')}
                  className="h-11 rounded-2xl bg-rose-950/20 border border-red-900/30 text-base font-light text-rose-100 hover:bg-rose-900/40 active:scale-95 transition-all flex items-center justify-center"
                >
                  0
                </button>
              </div>

              {/* Hint Modal Overlay */}
              {showHint && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 bg-[#0d0205]/95 rounded-[32px] p-5 flex flex-col items-center justify-between z-10 border border-rose-500/40"
                >
                  <button 
                    onClick={() => setShowHint(false)}
                    className="self-end text-xs text-rose-400 border border-rose-500/30 px-2.5 py-0.5 rounded-full"
                  >
                    ✕
                  </button>
                  <div className="w-full h-52 rounded-2xl overflow-hidden border border-rose-900/50 my-2">
                    <img src="/passkey-pic.jpg" alt="Hint details" className="w-full h-full object-cover" />
                  </div>
                  <div className="text-center py-1">
                    <span className="text-[10px] tracking-widest text-rose-300/80 uppercase block">HINT: HER BIRTHDAY (MMDD)</span>
                    <span className="text-base font-bold tracking-widest text-rose-100">{CORRECT_PASSCODE}</span>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* 2. LOADING SCREEN */}
          {screen === 'loading' && (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-3 text-center"
            >
              <div className="text-5xl animate-bounce">🐼</div>
              <p className="text-xs tracking-wider text-rose-200/90 font-light">Unlocking your surprise...</p>
              <span className="text-[9px] tracking-widest text-rose-500/70 uppercase">✨ PREPARING MEMORIES ✨</span>
            </motion.div>
          )}

          {/* 3. WELCOME SCREEN */}
          {screen === 'welcome' && (
            <motion.div 
              key="welcome"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="flex flex-col items-center text-center w-full"
            >
              <div className="text-5xl mb-4">🐼</div>
              <h1 className="text-xl font-serif text-rose-100 mb-2">It's Your 19th Birthday 🌸</h1>
              <p className="text-xs text-rose-300/70 mb-8">I made something special just for you...</p>
              
              <button
                onClick={() => setScreen('counter')}
                className="w-full py-3 rounded-full bg-gradient-to-r from-rose-800 to-red-700 text-xs font-semibold tracking-widest uppercase border border-rose-400/30 shadow-[0_0_20px_rgba(255,77,109,0.3)] active:scale-95 transition-all"
              >
                START ➔
              </button>
            </motion.div>
          )}

          {/* 4. TIME COUNTER */}
          {screen === 'counter' && (
            <motion.div 
              key="counter"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full flex flex-col items-center text-center"
            >
              <div className="text-4xl mb-2">🐱</div>
              <h2 className="text-lg font-serif text-rose-100 mb-1">Happy 19th Birthday 🎀</h2>
              <p className="text-[10px] text-rose-300/60 mb-6 uppercase tracking-wider">You officially completed</p>

              <div className="grid grid-cols-3 gap-2 w-full mb-8">
                <div className="bg-rose-950/30 border border-rose-900/40 rounded-2xl p-3">
                  <span className="text-2xl font-serif text-rose-200 block">19</span>
                  <span className="text-[8px] uppercase tracking-wider text-rose-400/70">Years</span>
                </div>
                <div className="bg-rose-950/30 border border-rose-900/40 rounded-2xl p-3">
                  <span className="text-2xl font-serif text-rose-200 block">0</span>
                  <span className="text-[8px] uppercase tracking-wider text-rose-400/70">Months</span>
                </div>
                <div className="bg-rose-950/30 border border-rose-900/40 rounded-2xl p-3">
                  <span className="text-2xl font-serif text-rose-200 block">0</span>
                  <span className="text-[8px] uppercase tracking-wider text-rose-400/70">Days</span>
                </div>
              </div>

              <button
                onClick={() => setScreen('gallery')}
                className="w-full py-3 rounded-full bg-rose-900/40 border border-rose-500/30 text-xs font-medium tracking-widest uppercase hover:bg-rose-800/50 active:scale-95 transition-all"
              >
                OUR MEMORIES ➔
              </button>
            </motion.div>
          )}

          {/* 5. PHOTO GALLERY */}
          {screen === 'gallery' && (
            <motion.div 
              key="gallery"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full flex flex-col items-center text-center"
            >
              <h2 className="text-lg font-serif text-rose-100 mb-0.5">Special Moments</h2>
              <p className="text-[10px] text-rose-300/50 italic mb-3">Swipe horizontal to view ➔</p>

              {/* Horizontal Scroll Gallery */}
              <div className="w-full flex gap-3 overflow-x-auto snap-x snap-mandatory py-2 no-scrollbar mb-5">
                {['/photo1.jpg', '/photo2.jpg', '/photo3.jpg'].map((img, idx) => (
                  <div 
                    key={idx}
                    className="snap-center shrink-0 w-52 h-64 rounded-2xl overflow-hidden border border-rose-800/40 shadow-xl relative"
                  >
                    <img src={img} alt={`Memory ${idx + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>

              <button
                onClick={() => setScreen('letter')}
                className="w-full py-3 rounded-full bg-rose-900/40 border border-rose-500/30 text-xs font-medium tracking-widest uppercase hover:bg-rose-800/50 active:scale-95 transition-all"
              >
                💌 READ LETTER
              </button>
            </motion.div>
          )}

          {/* 6. LETTER & CELEBRATION */}
          {screen === 'letter' && (
            <motion.div 
              key="letter"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="w-full flex flex-col items-center text-center"
            >
              <h2 className="text-base font-serif tracking-wide text-rose-100 mb-0.5">HAPPY 19TH BIRTHDAY ✨</h2>
              <p className="text-[9px] tracking-widest text-rose-400/60 uppercase mb-3">August 15 • Special Letter</p>

              <div className="w-full bg-rose-950/20 border border-rose-900/30 rounded-2xl p-4 text-left text-xs leading-relaxed text-rose-200/90 mb-5 space-y-2.5 max-h-56 overflow-y-auto">
                <p className="font-semibold text-rose-100">Happy 19th Birthday, My Love ❤️</p>
                <p>
                  Happy 19th Birthday to the most amazing girl in the world! You bring so much joy, love, and light into my life every single day.
                </p>
                <p>
                  As you turn 19, I hope all your dreams come true. I am so lucky and grateful to stand by your side and celebrate you today.
                </p>
                <p>
                  Always keep smiling — your happiness is my favorite thing. I love you so much!
                </p>
              </div>

              <div className="flex gap-2 w-full">
                <button
                  onClick={triggerConfetti}
                  className="flex-1 py-3 rounded-full bg-gradient-to-r from-rose-800 to-red-700 border border-rose-400/40 text-[10px] font-bold tracking-wider uppercase shadow-[0_0_15px_rgba(255,77,109,0.3)] active:scale-95 transition-all"
                >
                  CELEBRATE 🎉
                </button>
                <button
                  onClick={() => setScreen('lock')}
                  className="py-3 px-4 rounded-full bg-rose-950/30 border border-rose-900/30 text-[10px] text-rose-400/70 hover:text-rose-200 active:scale-95 transition-all"
                >
                  ↺
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </main>
  );
}