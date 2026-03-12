import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Droplet, Apple, Activity, Wine, Cigarette, UtensilsCrossed, ShieldCheck, AlertTriangle, Leaf, Flame } from 'lucide-react';

export default function Slide4({ text }: { text: string }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 100, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Leaf moves slightly opposite to mouse (feels further back)
  const leafX = useTransform(springX, [-0.5, 0.5], [30, -30]);
  const leafY = useTransform(springY, [-0.5, 0.5], [30, -30]);

  // Flame moves slightly with mouse (feels closer)
  const flameX = useTransform(springX, [-0.5, 0.5], [-40, 40]);
  const flameY = useTransform(springY, [-0.5, 0.5], [-40, 40]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const dos = [
    { name: "Stay Hydrated", icon: Droplet },
    { name: "Balanced Diet", icon: Apple },
    { name: "Regular Exercise", icon: Activity }
  ];
  const donts = [
    { name: "Limit Alcohol", icon: Wine },
    { name: "Avoid Smoking", icon: Cigarette },
    { name: "Minimize Salt", icon: UtensilsCrossed }
  ];

  return (
    <div 
      className="w-full max-w-6xl h-full flex flex-col items-center justify-center gap-8"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
      }}
    >
      <div className="text-center space-y-4 max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: -30, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ type: "spring", stiffness: 120 }}
          className="text-4xl font-black text-stone-900 tracking-tight"
        >
          How to Keep Your Blood <span className="text-emerald-600">Healthy</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
          className="text-lg text-stone-600 leading-relaxed font-medium"
        >
          {text}
        </motion.p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 w-full mt-4">
        {/* DOs */}
        <motion.div 
          initial={{ opacity: 0, x: -80, rotate: -2 }} 
          animate={{ opacity: 1, x: 0, rotate: 0 }} 
          whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(16, 185, 129, 0.2)" }}
          transition={{ delay: 0.3, type: "spring", bounce: 0.4 }} 
          className="flex-1 bg-emerald-50 p-8 rounded-[3rem] border-4 border-emerald-100 transition-all duration-300 relative overflow-hidden"
        >
          <motion.div 
            style={{ x: leafX, y: leafY }}
            animate={{ rotate: 360 }} 
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }} 
            className="absolute -right-12 -bottom-12 opacity-[0.05] pointer-events-none"
          >
            <Leaf className="w-64 h-64 text-emerald-600" />
          </motion.div>
          <div className="flex items-center gap-3 mb-6 relative z-10">
            <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 2.5, repeat: Infinity }}>
              <ShieldCheck className="w-8 h-8 text-emerald-600" />
            </motion.div>
            <h3 className="text-2xl font-black text-emerald-800">Adopt Habits</h3>
          </div>
          <div className="space-y-4 relative z-10">
            {dos.map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.15, type: "spring", stiffness: 150 }}
                whileHover={{ scale: 1.05, x: 12, boxShadow: "0 10px 15px -3px rgba(16, 185, 129, 0.15)" }}
                className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm cursor-default transition-colors"
              >
                <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
                  <item.icon className="w-6 h-6"/>
                </div>
                <span className="font-bold text-stone-700">{item.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* DONTs */}
        <motion.div 
          initial={{ opacity: 0, x: 80, rotate: 2 }} 
          animate={{ opacity: 1, x: 0, rotate: 0 }} 
          whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(225, 29, 72, 0.2)" }}
          transition={{ delay: 0.5, type: "spring", bounce: 0.4 }} 
          className="flex-1 bg-rose-50 p-8 rounded-[3rem] border-4 border-rose-100 transition-all duration-300 relative overflow-hidden"
        >
          <motion.div 
            style={{ x: flameX, y: flameY }}
            animate={{ rotate: -360, scale: [1, 1.1, 1] }} 
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }} 
            className="absolute -left-12 -bottom-12 opacity-[0.04] pointer-events-none"
          >
            <Flame className="w-64 h-64 text-rose-600" />
          </motion.div>
          <div className="flex items-center gap-3 mb-6 relative z-10">
            <motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 2.5, repeat: Infinity }}>
              <AlertTriangle className="w-8 h-8 text-rose-600" />
            </motion.div>
            <h3 className="text-2xl font-black text-rose-800">Avoid Practices</h3>
          </div>
          <div className="space-y-4 relative z-10">
            {donts.map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + i * 0.15, type: "spring", stiffness: 150 }}
                whileHover={{ scale: 1.05, x: -12, boxShadow: "0 10px 15px -3px rgba(225, 29, 72, 0.15)" }}
                className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm cursor-default transition-colors"
              >
                <div className="p-3 bg-rose-100 text-rose-600 rounded-xl">
                  <item.icon className="w-6 h-6"/>
                </div>
                <span className="font-bold text-stone-700">{item.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
