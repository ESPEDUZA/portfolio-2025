'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const words = ['la photo', 'le dessin', 'le voyage', 'les sciences', 'le design'];

export default function RotatingWords({
  base = 'Je travaille à partir de ',
  interval = 2000,
  className = '',
}: {
  base?: string;
  interval?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(id);
  }, [interval]);

  return (
    <div className={`text-2xl sm:text-3xl font-title leading-snug ${className}`}>
      {base}
      <span className="inline-block relative h-[1.2em] w-[8ch] overflow-hidden align-baseline">
        <AnimatePresence initial={false}>
          <motion.span
            key={words[index]}
            initial={{ y: '100%', rotateX: 90, opacity: 0 }}
            animate={{ y: '0%', rotateX: 0, opacity: 1 }}
            exit={{ y: '-100%', rotateX: -90, opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 text-blue-600"
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </div>
  );
}
