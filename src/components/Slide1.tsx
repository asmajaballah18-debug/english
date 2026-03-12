import React from 'react';
import { motion } from 'motion/react';
import { HeartPulse, Droplet } from 'lucide-react';

export default function Slide1({ text }: { text: string }) {
  return (
    <div className="w-full max-w-6xl h-full flex flex-col md:flex-row items-center justify-center gap-12">
      <div className="flex-1 space-y-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          whileHover={{ scale: 1.05, y: -2 }}
          className="inline-flex items-center space-x-3 bg-rose-100 px-6 py-3 rounded-full text-rose-700 font-bold tracking-wide uppercase text-sm cursor-default shadow-sm"
        >
          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>
            <HeartPulse className="w-5 h-5" />
          </motion.div>
          <span>The Spark of Life</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, x: -30, filter: 'blur(8px)' }}
          animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
          className="text-6xl font-black text-stone-900 leading-tight tracking-tight"
        >
          The Importance of <br/>
          <span className="text-rose-600">Blood</span>
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
          className="my-6 border-l-4 border-rose-500 pl-6 py-2"
        >
          <p className="text-3xl font-bold text-stone-800 italic">
            "Every 2 seconds, someone needs blood."
          </p>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
          className="text-xl text-stone-600 leading-relaxed font-medium"
        >
          {text}
        </motion.p>
      </div>
      <div className="flex-1 flex justify-center relative items-center">
        {/* Concentric pulsing rings for a heartbeat effect */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`ring-${i}`}
            initial={{ opacity: 0.6, scale: 0.5 }}
            animate={{ opacity: 0, scale: 2.5 }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeOut",
              delay: i * 0.8
            }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-rose-300 pointer-events-none"
            style={{ width: '200px', height: '200px' }}
          />
        ))}

        {/* Main Visual Element */}
        <motion.div
          initial={{ scale: 0, rotate: -15 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, type: "spring", bounce: 0.5 }}
          className="relative z-10 w-96 h-96 bg-gradient-to-br from-rose-50 to-rose-100 rounded-full flex items-center justify-center shadow-[0_20px_80px_rgba(225,29,72,0.3)] border-8 border-white overflow-hidden"
        >
          <motion.div
            animate={{ y: [-15, 15, -15] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-rose-300 via-transparent to-transparent pointer-events-none"
          />
          <motion.div
            animate={{ scale: [1, 1.15, 1], y: [0, -8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="relative flex flex-col items-center justify-center"
          >
            <Droplet className="w-56 h-56 text-rose-600 drop-shadow-2xl fill-rose-500" />
            <HeartPulse className="w-20 h-20 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/4 drop-shadow-md" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
