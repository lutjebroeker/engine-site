import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FlipWordsProps {
  words: string[];
  interval?: number;
  className?: string;
}

export default function FlipWords({ words, interval = 2500, className = '' }: FlipWordsProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [words.length, interval]);

  return (
    <span className={`inline-block relative ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ opacity: 0, y: 20, rotateX: 90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          exit={{ opacity: 0, y: -20, rotateX: -90 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="inline-block text-emerald"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
