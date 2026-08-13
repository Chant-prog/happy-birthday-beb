'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BirthdayApp() {
  const [step, setStep] = useState('lock'); // lock -> loading -> welcome -> age -> gallery -> letter
  const [pin, setPin] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);

  const handleKeyPress = (num) => {
    if (pin.length < 4) {
      const newPin = pin + num;
      setPin(newPin);
      if (newPin === '2026') {
        setTimeout(() => {
          setStep('loading');
          setTimeout(() => setStep('welcome'), 2500);
        }, 300);
      }
    }
  };

  const handleBackspace = () => {
    setPin(pin.slice(0, -1));
  };

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center p-4 bg-[#0d0204] text-white overflow-hidden">
      {/* Background Red Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-900/30 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-rose-950/40 blur-[140px] rounded-full pointer-events-none" />

      <AnimatePresence mode="wait">
        {/* STEP 1: KEYPAD LOCK SCREEN */}
        {step === 'lock' && (
          <motion.div
            key="lock"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-xs bg-[#160509]/80 backdrop-blur-md p-6 rounded-3xl crimson-glow text-center space-y-5"
          >
            {/* Avatar Icon */}
            <div 
              onClick={() => setShowHint(true)}
              className="w-16 h-16 mx-auto rounded-full overflow-hidden border-2 border-red-500/50 cursor-pointer hover:scale-105 transition-transform"
            >
              <img src="/passkey-pic.jpg" alt="Profile" className="w-full h-full object-cover" />
            </div>

            <div>
              <h2 className="text-xl font-serif tracking-widest text-red-200">LOCKED</h2>
              <p className="text-[11px] text-gray-400 mt-1">Hint: Click on picture to know passcode!</p>
            </div>

            {/* PIN Dots Display */}
            <div className="flex justify-center gap-3 my-4">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full border border-red-500/60 transition-all ${
                    pin.length > i ? 'bg-red-500 shadow-[0_0_8px_#ef4444]' : 'bg-transparent'
                  }`}
                />
              ))}
            </div>

            {/* Numeric Keypad Grid */}
            <div className="grid grid-cols-3 gap-3 text-lg font-medium">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <button
                  key={num}
                  onClick={() => handleKeyPress(num.toString())}
                  className="keypad-btn py-3 rounded-xl hover:bg-red-950/40"
                >
                  {num}
                </button>
              ))}
              <button onClick={() => setPin('')} className="keypad-btn py-3 rounded-xl text-xs text-gray-400">
                CLEAR
              </button>
              <button onClick={() => handleKeyPress('0')} className="keypad-btn py-3 rounded-xl">
                0
              </button>
              <button onClick={handleBackspace} className="keypad-btn py-3 rounded-xl text-xs text-gray-400">
                ⌫
              </button>
            </div>

            {/* Photo Hint Modal */}
            {showHint && (
              <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
                <div className="bg-[#1a080c] p-4 rounded-2xl border border-red-500/40 text-center max-w-xs relative">
                  <button onClick={() => setShowHint(false)} className="absolute top-2 right-3 text-gray-400 text-lg">✕</button>
                  <img src="/passkey-pic.jpg" alt="Passcode Hint" className="w-full h-56 object-cover rounded-xl my-2" />
                  <span className="inline-block px-3 py-1 bg-red-950 text-red-300 text-xs font-mono rounded-full border border-red-500/30">
                    PASSKEY • 2026
                  </span>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* STEP 2: LOADING SCREEN */}
        {step === 'loading' && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center space-y-4"
          >
            <div className="text-5xl animate-bounce">🐼</div>
            <h3 className="text-lg font-serif text-red-200 tracking-wider">Loading something special...</h3>
            <p className="text-xs text-red-400/60 uppercase tracking-widest">• JUST FOR YOU •</p>
          </motion.div>
        )}

        {/* STEP 3: WELCOME INTRO */}
        {step === 'welcome' && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center space-y-6 max-w-xs"
          >
            <div className="text-4xl animate-pulse">🐼</div>
            <h1 className="text-3xl font-serif text-red-100">It's Your Special Day 🌸</h1>
            <p className="text-xs text-gray-300">I made something special for you...</p>
            <button
              onClick={() => setStep('age')}
              className="px-8 py-3 bg-red-900/60 hover:bg-red-800 text-red-100 rounded-full crimson-glow text-xs font-bold tracking-widest transition-all"
            >
              START 🌸
            </button>
          </motion.div>
        )}

        {/* STEP 4: AGE COUNTER */}
        {step === 'age' && (
          <motion.div
            key="age"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center space-y-8 max-w-sm w-full"
          >
            <div className="text-5xl">🐼</div>
            <h2 className="text-2xl font-serif text-red-200">Happy Birthday My Girl 🎀</h2>
            
            <p className="text-xs text-gray-400">You have completed</p>

            <div className="flex justify-center gap-6">
              <div>
                <span className="text-4xl font-bold font-serif text-red-100">19</span>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">YEARS</p>
              </div>
              <div>
                <span className="text-4xl font-bold font-serif text-red-100">0</span>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">MONTHS</p>
              </div>
              <div>
                <span className="text-4xl font-bold font-serif text-red-100">19</span>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">DAYS</p>
              </div>
            </div>

            <button
              onClick={() => setStep('gallery')}
              className="px-8 py-2.5 bg-red-950/80 hover:bg-red-900 text-red-200 rounded-full crimson-glow text-xs tracking-widest transition-all"
            >
              NEXT 🕊️
            </button>
          </motion.div>
        )}

        {/* STEP 5: PHOTO CAROUSEL */}
        {step === 'gallery' && (
          <motion.div
            key="gallery"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center space-y-6 w-full max-w-md"
          >
            <div>
              <h2 className="text-2xl font-serif text-red-200">Special Memories</h2>
              <p className="text-xs text-gray-400 mt-1">Swipe for more ✦</p>
            </div>

            {/* Horizontal Scroll Gallery */}
            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory py-4 px-2 no-scrollbar">
              {['/photo1.jpg', '/photo2.jpg', '/photo3.jpg'].map((src, idx) => (
                <div 
                  key={idx} 
                  className="snap-center shrink-0 w-64 h-80 rounded-2xl overflow-hidden crimson-glow bg-[#1a080c]"
                >
                  <img src={src} alt={`Memory ${idx}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

            <button
              onClick={() => setStep('letter')}
              className="px-8 py-3 bg-red-900/60 hover:bg-red-800 text-red-100 rounded-full crimson-glow text-xs font-bold tracking-widest transition-all"
            >
              💌 ... MESSAGE
            </button>
          </motion.div>
        )}

        {/* STEP 6: LETTER MODAL */}
        {step === 'letter' && (
          <motion.div
            key="letter"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6 max-w-xs w-full"
          >
            {!letterOpen ? (
              <div className="space-y-6">
                <h2 className="text-2xl font-serif text-red-200">A LETTER, JUST FOR YOU</h2>
                <p className="text-xs text-gray-400">Tap the heart to reveal your message...</p>
                <button
                  onClick={() => setLetterOpen(true)}
                  className="w-20 h-20 mx-auto rounded-full bg-red-950/60 crimson-glow flex items-center justify-center text-3xl hover:scale-110 transition-transform"
                >
                  ❤️
                </button>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#1c070b] p-6 rounded-3xl crimson-glow text-left space-y-4 relative"
              >
                <div className="flex justify-between items-center border-b border-red-900/40 pb-2">
                  <h3 className="text-sm font-serif text-red-200">JUST FOR YOU ✨</h3>
                  <p className="text-[10px] text-gray-500">From my heart to yours</p>
                </div>
                
                <p className="text-xs text-gray-200 leading-relaxed font-light">
                  Happy Birthday, Love ❤️
                  <br /><br />
                  You are the most beautiful part of my life, and I'm so lucky to have you. Your smile makes my days better, and your presence makes everything feel special.
                  <br /><br />
                  Always stay happy — because your happiness means a lot to me.
                </p>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => setStep('lock')}
                    className="w-full py-2 bg-red-950/80 hover:bg-red-900 text-red-300 rounded-xl text-[10px] border border-red-500/30"
                  >
                    RESTART 🔄
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}