'use client';

import { motion } from 'framer-motion';
import { DevotionalIcons } from './DevotionalIcons';

export default function DevotionalBackground() {
  const sacredSymbols = [
    { icon: 'Om', color: 'text-orange-300' },
    { icon: 'Lotus', color: 'text-yellow-300' },
    { icon: 'Flame', color: 'text-red-300' },
    { icon: 'Chakra', color: 'text-blue-300' },
    { icon: 'Sun', color: 'text-orange-400' },
    { icon: 'Moon', color: 'text-indigo-300' },
    { icon: 'Bell', color: 'text-yellow-400' },
    { icon: 'Tree', color: 'text-green-300' }
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Sacred Om Background Animation */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-100/20 to-red-100/20"></div>
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 20% 80%, rgba(249, 115, 22, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 20%, rgba(220, 38, 38, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 40%, rgba(251, 191, 36, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 80%, rgba(249, 115, 22, 0.1) 0%, transparent 50%)"
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Floating Sacred Symbols */}
        {[...Array(12)].map((_, i) => {
          const symbol = sacredSymbols[i % sacredSymbols.length];
          const IconComponent = DevotionalIcons[symbol.icon];
          
          return (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() * 20 - 10, 0],
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 6 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            >
              <IconComponent className={`w-8 h-8 ${symbol.color} opacity-20`} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
} 