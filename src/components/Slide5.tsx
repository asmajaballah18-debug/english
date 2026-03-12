import React from 'react';
import { motion } from 'motion/react';
import { Code, Database, HeartHandshake, Lightbulb, Rocket } from 'lucide-react';
import { sfx } from '../services/soundEffects';

export default function Slide5({ text }: { text: string }) {
  const team = [
    { name: "Youssef Babba", icon: Code, color: "bg-emerald-100 text-emerald-700" },
    { name: "Hamza Hamzaoui", icon: Database, color: "bg-indigo-100 text-indigo-700" },
    { name: "Youssef Mazhoud", icon: HeartHandshake, color: "bg-amber-100 text-amber-700" },
    { name: "Adem Mzali", icon: Lightbulb, color: "bg-rose-100 text-rose-700" },
    { name: "Iyed Kileni", icon: Rocket, color: "bg-sky-100 text-sky-700" }
  ];

  return (
    <div className="w-full max-w-6xl h-full flex flex-col items-center justify-center gap-12 text-center">
      <motion.h2 
        initial={{ opacity: 0, y: -30, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ type: "spring", stiffness: 120 }}
        className="text-5xl font-black text-stone-900 tracking-tight"
      >
        Made by our team
      </motion.h2>

      <div className="flex flex-wrap justify-center gap-6 w-full mt-8">
        {team.map((member, i) => (
          <motion.div
            key={i}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
            variants={{
              initial: { opacity: 0, y: 60, scale: 0.8 },
              animate: { opacity: 1, y: 0, scale: 1, transition: { delay: 0.2 + i * 0.1, type: "spring", stiffness: 150 } },
              hover: { 
                scale: 1.08, 
                y: -15, 
                rotate: i % 2 === 0 ? 3 : -3,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)" 
              },
              tap: { scale: 0.95 }
            }}
            onMouseEnter={() => sfx.playHover()}
            className="bg-white p-8 rounded-[3rem] shadow-xl border-4 border-stone-50 flex flex-col items-center gap-4 transition-colors duration-300 cursor-pointer group w-56"
          >
            <motion.div 
              variants={{
                hover: {
                  scale: [1, 1.15, 1.1],
                  transition: {
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }
              }}
              className={`p-6 rounded-[2rem] ${member.color} shadow-sm group-hover:shadow-[0_0_25px_currentColor] transition-shadow duration-500`}
            >
              <member.icon className="w-10 h-10" />
            </motion.div>
            <div>
              <h3 className="text-xl font-black text-stone-900 text-center">{member.name}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, type: "spring", stiffness: 100 }}
        className="text-xl text-stone-600 max-w-4xl mt-8 font-medium"
      >
        {text}
      </motion.p>
    </div>
  );
}
