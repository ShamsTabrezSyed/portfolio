'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GlitchLogoProps {
  baseName: string;
  className?: string;
}

const suffixes = ['.AI', '.ML', '.Dev', '.Engineer'];

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

function scrambleText(text: string, progress: number): string {
  if (progress >= 1) return text;
  return text
    .split('')
    .map((char, i) => {
      if (char === ' ' || char === '.') return char;
      if (i < text.length * progress) {
        return char;
      }
      return letters[Math.floor(Math.random() * letters.length)];
    })
    .join('');
}

export function GlitchLogo({ baseName, className = '' }: GlitchLogoProps) {
  const [currentSuffix, setCurrentSuffix] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [scrambleProgress, setScrambleProgress] = useState(0);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    setScrambleProgress(0);
    const randomSuffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    
    const interval = setInterval(() => {
      setScrambleProgress((prev) => {
        if (prev >= 1) {
          clearInterval(interval);
          setCurrentSuffix(randomSuffix);
          return 1;
        }
        return prev + 0.15;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setCurrentSuffix('');
    setScrambleProgress(0);
  }, []);

  const displaySuffix = isHovered ? currentSuffix : '';

  return (
    <motion.div
      className={`inline-flex items-center gap-0.5 cursor-pointer ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <span className="relative text-lg font-bold text-primary">
        {baseName}
        
        <AnimatePresence mode="wait">
          {isHovered && (
            <motion.span
              key="suffix"
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 5 }}
              transition={{ duration: 0.15 }}
              className="text-primary"
            >
              {scrambleProgress > 0 && scrambleProgress < 1
                ? scrambleText(displaySuffix, scrambleProgress)
                : displaySuffix}
            </motion.span>
          )}
        </AnimatePresence>

        <motion.span
          className="absolute -bottom-0.5 left-0 h-0.5 bg-primary"
          initial={{ width: 0 }}
          animate={{ width: isHovered ? '100%' : 0 }}
          transition={{ duration: 0.2 }}
        />
      </span>
    </motion.div>
  );
}

export default GlitchLogo;