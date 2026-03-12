import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { sfx } from '../services/soundEffects';
import Slide1 from './Slide1';
import Slide2 from './Slide2';
import Slide3 from './Slide3';
import Slide4 from './Slide4';
import Slide5 from './Slide5';
import { ChevronLeft, ChevronRight, Volume2, VolumeX, Music, Music2 } from 'lucide-react';

const slidesData = [
  {
    id: 1,
    component: Slide1,
    text: "Blood is the spark of life. It carries oxygen and nutrients to every part of our body and helps fight infections. Understanding its importance is the first step to saving lives.",
    voice: "Kore"
  },
  {
    id: 2,
    component: Slide2,
    text: "There are eight main blood types, with O-negative being the universal donor. Once donated, blood is carefully tested, separated, and stored in special cold refrigerators to keep it safe.",
    voice: "Puck"
  },
  {
    id: 3,
    component: Slide3,
    text: "Donating blood is a simple, safe process that takes only a few minutes but can save up to three lives. Friendly medical staff ensure your comfort while you make a heroic contribution.",
    voice: "Charon"
  },
  {
    id: 4,
    component: Slide4,
    text: "To maintain healthy blood, it's essential to adopt habits such as staying hydrated by drinking plenty of water daily, eating a balanced diet rich in nutrients like fruits and vegetables, and engaging in regular physical activity. However, it's equally important to avoid harmful practices such as limiting alcohol intake to reduce the risk of high blood pressure, avoiding smoking and secondhand smoke to protect blood vessel health, and minimizing consumption of salty foods to prevent hypertension.",
    voice: "Fenrir"
  },
  {
    id: 5,
    component: Slide5,
    text: "Thank you for watching! This project was made by Youssef Babba, Hamza Hamzaoui, Youssef Mazhoud, Adem Mzali, and Iyed Kileni. Have a great day!",
    voice: "Zephyr"
  }
];

const slideVariants = {
  enter: (direction: number) => ({
    rotateY: direction > 0 ? 60 : -60,
    x: direction > 0 ? '80%' : '-80%',
    z: -800,
    opacity: 0,
    scale: 0.6,
    filter: 'blur(20px)'
  }),
  center: {
    rotateY: 0,
    x: 0,
    z: 0,
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    zIndex: 1
  },
  exit: (direction: number) => ({
    rotateY: direction > 0 ? -60 : 60,
    x: direction > 0 ? '-80%' : '80%',
    z: -800,
    opacity: 0,
    scale: 0.6,
    filter: 'blur(20px)',
    zIndex: 0
  })
};

export default function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [sfxEnabled, setSfxEnabled] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const [bgmEnabled, setBgmEnabled] = useState(false);

  useEffect(() => {
    if (hasStarted && bgmEnabled) {
      sfx.startBackgroundMusic();
    } else {
      sfx.stopBackgroundMusic();
    }
    return () => {
      sfx.stopBackgroundMusic();
    };
  }, [hasStarted, bgmEnabled]);

  const nextSlide = () => {
    if (currentSlide < slidesData.length - 1) {
      setDirection(1);
      setCurrentSlide(c => c + 1);
      sfx.playTransition();
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide(c => c - 1);
      sfx.playTransition();
    }
  };

  const CurrentSlideComponent = slidesData[currentSlide].component;

  return (
    <div className="h-screen w-full bg-stone-50 text-stone-900 overflow-hidden relative flex flex-col font-sans" style={{ perspective: '2000px' }}>
      <AnimatePresence>
        {!hasStarted && (
          <motion.div 
            key="intro"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-stone-50 overflow-hidden"
          >
            <motion.div
              animate={isTransitioning ? { scale: 150, opacity: 1 } : { scale: [1, 1.05, 1], opacity: 1 }}
              transition={isTransitioning ? { duration: 1.2, ease: [0.22, 1, 0.36, 1] } : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="mb-8 relative z-50"
            >
              <svg viewBox="0 0 24 24" className="w-32 h-32 text-rose-600 fill-rose-600 drop-shadow-2xl">
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
              </svg>
            </motion.div>
            
            <motion.div 
              animate={{ opacity: isTransitioning ? 0 : 1, y: isTransitioning ? 20 : 0 }} 
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center relative z-40"
            >
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-bold text-rose-600 mb-4 uppercase tracking-widest"
              >
                English Project Work
              </motion.h2>
              <h1 className="text-5xl font-black text-stone-900 mb-12 tracking-tight flex space-x-3">
                {"Blood Donation".split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    animate={{ y: [0, -15, 0] }}
                    transition={{ delay: 1.2 + i * 0.15, duration: 0.6, ease: "easeInOut" }}
                    className="inline-block"
                  >
                    <motion.span
                      initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      transition={{ delay: 0.2 + i * 0.15, type: "spring", stiffness: 150 }}
                      className="inline-block"
                    >
                      {word}
                    </motion.span>
                  </motion.span>
                ))}
              </h1>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.0, duration: 0.8, ease: "easeOut" }}
              >
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(225, 29, 72, 0.3)", y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setBgmEnabled(true);
                    sfx.getCtx();
                    sfx.playTransition();
                    setIsTransitioning(true);
                    setTimeout(() => {
                      setHasStarted(true);
                    }, 800);
                  }}
                  className="px-10 py-5 bg-rose-600 text-white rounded-[2rem] text-2xl font-bold shadow-xl hover:bg-rose-700 transition-colors tracking-wide flex items-center space-x-3 group"
                >
                  <span>Start Presentation</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ChevronRight className="w-6 h-6 group-hover:scale-125 transition-transform" />
                  </motion.div>
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {hasStarted && (
        <>
          {/* Header / Controls */}
      <div className="absolute top-0 left-0 w-full p-8 flex justify-between items-center z-50">
        <div className="flex items-center space-x-4">
          <div className="flex space-x-3 bg-white p-4 rounded-full shadow-sm border border-stone-100">
            {slidesData.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-3 rounded-full transition-all duration-500 ${idx === currentSlide ? 'w-12 bg-rose-600' : 'w-3 bg-rose-200'}`}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setBgmEnabled(!bgmEnabled)}
            title={bgmEnabled ? "Mute Background Music" : "Play Background Music"}
            className="p-4 bg-white rounded-full shadow-sm border border-stone-100 hover:bg-stone-100 transition-colors text-stone-600"
          >
            {bgmEnabled ? <Music className="w-6 h-6 text-rose-600" /> : <Music2 className="w-6 h-6 opacity-50" />}
          </button>
          <button 
            onClick={() => {
              const newEnabled = !sfxEnabled;
              setSfxEnabled(newEnabled);
              sfx.enabled = newEnabled;
            }}
            title={sfxEnabled ? "Mute SFX" : "Unmute SFX"}
            className="p-4 bg-white rounded-full shadow-sm border border-stone-100 hover:bg-stone-100 transition-colors text-stone-600"
          >
            {sfxEnabled ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Slide Content */}
      <div className="flex-1 relative w-full h-full flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
        <AnimatePresence custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 100, damping: 20, mass: 1 }}
            className="absolute inset-0 flex items-center justify-center p-16 bg-stone-50 origin-center"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <CurrentSlideComponent text={slidesData[currentSlide].text} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="absolute bottom-10 right-10 flex space-x-4 z-50">
        <button 
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="p-5 bg-white rounded-[2rem] shadow-lg border border-stone-100 hover:bg-stone-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-rose-600"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
        <button 
          onClick={nextSlide}
          disabled={currentSlide === slidesData.length - 1}
          className="p-5 bg-rose-600 rounded-[2rem] shadow-lg hover:bg-rose-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-white"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>
        </>
      )}
    </div>
  );
}
