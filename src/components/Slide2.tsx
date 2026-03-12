import React from 'react';
import { motion } from 'motion/react';
import { Droplet, Snowflake, ThermometerSnowflake } from 'lucide-react';

export default function Slide2({ text }: { text: string }) {
  const types = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  
  return (
    <div className="w-full max-w-6xl h-full flex flex-col md:flex-row items-center justify-center gap-12">
      <div className="flex-1 space-y-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          whileHover={{ scale: 1.05, y: -2 }}
          className="inline-flex items-center space-x-3 bg-sky-100 px-6 py-3 rounded-full text-sky-700 font-bold tracking-wide uppercase text-sm cursor-default shadow-sm"
        >
          <motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 3, repeat: Infinity }}>
            <ThermometerSnowflake className="w-5 h-5" />
          </motion.div>
          <span>Types & Storage</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, x: -30, filter: 'blur(8px)' }}
          animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
          className="text-5xl font-black text-stone-900 leading-tight tracking-tight"
        >
          Blood Types & <br/>
          <span className="text-sky-600">Preservation</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
          className="text-xl text-stone-600 leading-relaxed font-medium"
        >
          {text}
        </motion.p>
      </div>
      <div className="flex-1 flex flex-col gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
          whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
          className="bg-white p-6 rounded-[2rem] shadow-xl border-4 border-stone-50 transition-all duration-300"
        >
          <h3 className="text-xl font-bold text-stone-800 mb-4 flex items-center gap-2">
            <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <Droplet className="w-5 h-5 text-rose-500"/>
            </motion.div>
            8 Main Types
          </h3>
          <div className="grid grid-cols-4 gap-3">
            {types.map((t, i) => (
              <motion.div 
                key={t} 
                initial={{opacity:0, scale:0, y: 20}} 
                animate={{opacity:1, scale:1, y: 0}} 
                whileHover={{ scale: 1.15, backgroundColor: '#ffe4e6', color: '#e11d48', y: -5, boxShadow: "0 10px 15px -3px rgba(225, 29, 72, 0.2)" }}
                transition={{delay: 0.4 + i*0.08, type: "spring", stiffness: 250}} 
                className="bg-rose-50 text-rose-700 font-black py-2 rounded-xl text-center border border-rose-100 cursor-default transition-colors"
              >
                {t}
              </motion.div>
            ))}
          </div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
          whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(14, 165, 233, 0.2)" }}
          className="bg-sky-50 p-6 rounded-[2rem] shadow-xl border-4 border-white relative overflow-hidden transition-all duration-300"
        >
          <motion.div 
            animate={{x: [0, -20, 0], rotate: 360}} 
            transition={{duration: 20, repeat: Infinity, ease: "linear"}} 
            className="absolute -right-10 -top-10 opacity-20"
          >
            <Snowflake className="w-40 h-40 text-sky-400" />
          </motion.div>
          <h3 className="text-xl font-bold text-sky-900 mb-2 flex items-center gap-2 relative z-10">
            <ThermometerSnowflake className="w-5 h-5"/> Cold Storage
          </h3>
          <p className="text-sky-700 font-medium relative z-10">
            Blood is kept in specialized refrigerators at 2°C to 6°C to prevent bacterial growth and maintain life-saving properties for up to 42 days.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
