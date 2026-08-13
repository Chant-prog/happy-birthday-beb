'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Home() {
  const [unlocked, setUnlocked] = useState(false);
  const [passcode, setPasscode] = useState('');

  const handleUnlock = (e) => {
    e.preventDefault();
    setUnlocked(true);
  };

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Background Image with Dark Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 scale-105"
        style={{ backgroundImage: "url('/passkey-pic.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      </div>

      {/* Mobile Card Container */}
      <div className="relative z-10 w-full max-w-sm mx-auto text-center space-y-6">
        {!unlocked ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-btn p-8 rounded-3xl flex flex-col items-center gap-4"
          >
            <h1 className="text-2xl font-bold tracking-wide text-white">
              Happy Birthday Beb! 💕
            </h1>
            <p className="text-sm text-gray-200">Enter secret key to open</p>
            
            <form onSubmit={handleUnlock} className="w-full space-y-4">
              <input 
                type="password" 
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Passcode..."
                className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-gray-300 border border-white/30 text-center focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              <button 
                type="submit"
                className="w-full py-3 rounded-xl bg-pink-500/80 hover:bg-pink-500 text-white font-semibold shadow-lg transition-all"
              >
                Unlock Gift 🎁
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-btn p-6 rounded-3xl space-y-6"
          >
            <h2 className="text-3xl font-extrabold text-pink-300">
              🎉 Happy 19th Birthday! 🎉
            </h2>
            
            {/* Responsive Photo Gallery */}
            <div className="grid grid-cols-3 gap-2 my-4">
              <img src="/photo1.jpg" alt="Memory 1" className="w-full h-24 object-cover rounded-xl border border-white/20 shadow-md" />
              <img src="/photo2.jpg" alt="Memory 2" className="w-full h-24 object-cover rounded-xl border border-white/20 shadow-md" />
              <img src="/photo3.jpg" alt="Memory 3" className="w-full h-24 object-cover rounded-xl border border-white/20 shadow-md" />
            </div>

            <p className="text-sm leading-relaxed text-gray-100">
              Hope your special day is as sweet and beautiful as you are! 💖
            </p>
          </motion.div>
        )}
      </div>
    </main>
  );
}