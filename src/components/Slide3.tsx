import React from 'react';
import { motion } from 'motion/react';
import { HeartHandshake, Gift, Clock, Droplet } from 'lucide-react';

export default function Slide3({ text }: { text: string }) {
  return (
    <div className="w-full max-w-6xl h-full flex flex-col md:flex-row items-center justify-center gap-12">
      <div className="flex-1 space-y-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          whileHover={{ scale: 1.05, y: -2 }}
          className="inline-flex items-center space-x-3 bg-rose-100 px-6 py-3 rounded-full text-rose-700 font-bold tracking-wide uppercase text-sm cursor-default shadow-sm"
        >
          <motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <HeartHandshake className="w-5 h-5" />
          </motion.div>
          <span>The Process</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, x: -30, filter: 'blur(8px)' }}
          animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
          className="text-6xl font-black text-stone-900 leading-tight tracking-tight"
        >
          Blood <br/>
          <span className="text-rose-600">Donation</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
          className="text-2xl text-stone-600 leading-relaxed font-medium"
        >
          {text}
        </motion.p>
      </div>
      <div className="flex-1 flex justify-center relative">
         <motion.div 
            animate={{ y: [-15, 15, -15], rotate: [0, 5, -5, 0] }} 
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none z-0"
          >
            <Droplet className="w-[30rem] h-[30rem] text-rose-600" />
         </motion.div>
         <div className="grid grid-cols-1 gap-6 w-full max-w-md relative z-10">
            <motion.div 
              initial={{x: 100, opacity: 0, rotate: 5}} 
              animate={{x: 0, opacity: 1, rotate: 0}} 
              whileHover={{ scale: 1.05, x: -15, boxShadow: "0 25px 50px -12px rgba(16, 185, 129, 0.25)" }}
              transition={{delay: 0.3, type: "spring", stiffness: 100, damping: 12}} 
              className="bg-white p-6 rounded-3xl shadow-lg border-2 border-stone-50 flex items-center gap-6 cursor-default transition-all duration-300"
            >
              <motion.div 
                animate={{ y: [0, -6, 0] }} 
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="p-4 bg-emerald-100 text-emerald-600 rounded-2xl shadow-inner flex items-center justify-center"
              >
                <motion.div
                  animate={{ rotate: [-15, 15, -15] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Clock className="w-8 h-8"/>
                </motion.div>
              </motion.div>
              <div>
                <h4 className="font-black text-xl text-stone-800">Quick & Easy</h4>
                <p className="text-stone-500">Takes only 10-15 minutes.</p>
              </div>
            </motion.div>
            <motion.div 
              initial={{x: 100, opacity: 0, rotate: 5}} 
              animate={{x: 0, opacity: 1, rotate: 0}} 
              whileHover={{ scale: 1.05, x: -15, boxShadow: "0 25px 50px -12px rgba(225, 29, 72, 0.25)" }}
              transition={{delay: 0.5, type: "spring", stiffness: 100, damping: 12}} 
              className="bg-white p-6 rounded-3xl shadow-lg border-2 border-stone-50 flex items-center gap-6 cursor-default transition-all duration-300"
            >
              <motion.div 
                animate={{ y: [0, -6, 0] }} 
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="p-4 bg-rose-100 text-rose-600 rounded-2xl shadow-inner flex items-center justify-center"
              >
                <motion.div
                  animate={{ y: [0, -4, 0], scale: [1, 1.1, 1], rotate: [-5, 5, -5] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Gift className="w-8 h-8"/>
                </motion.div>
              </motion.div>
              <div>
                <h4 className="font-black text-xl text-stone-800">Heroic Impact</h4>
                <p className="text-stone-500">1 donation saves up to 3 lives.</p>
              </div>
            </motion.div>
         </div>
      </div>
    </div>
  );
}
